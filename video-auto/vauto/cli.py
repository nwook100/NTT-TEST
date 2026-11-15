"""명령줄 진입점.  vauto run <촬영폴더>  /  vauto doctor"""
from __future__ import annotations

import argparse
import platform
import shutil
import subprocess
import sys
from collections import Counter
from pathlib import Path

from . import __version__, analyze, config, edit, fcpxml, llm as llm_mod, render, subs, transcribe
from .probe import Clip, probe_folder
from .timeutil import clock, frames_to_time
from .util import VautoError, log, read_json, write_json


def _cached(path: Path, make):
    if path.exists():
        return read_json(path)
    data = make()
    write_json(path, data)
    return data


def analyze_clips(clips: list[Clip], cfg: dict, cache: Path, luts: dict, warnings: list[str],
                  use_whisper: bool) -> tuple[list[dict], dict[int, dict]]:
    backend = transcribe.pick_backend(cfg["whisper"]["backend"]) if use_whisper else "none"
    if backend == "none":
        warnings.append("음성 인식을 건너뜀: 자막이 만들어지지 않고, 컷은 소리 크기만으로 나눔")
    units: list[dict] = []
    corrections: dict[int, dict] = {}
    lut_dir = cache / "luts"
    for clip in clips:
        log(f"  [{clip.index + 1}/{len(clips)}] {clip.name}  {clip.width}x{clip.height} "
            f"{float(clip.fps):.2f}fps {clock(clip.duration)} {clip.hdr.upper()}")
        for w in clip.warnings:
            warnings.append(f"{clip.name}: {w}")
        silences = _cached(cache / "silence" / f"{clip.key}.json", lambda: analyze.detect_silence(clip))
        sounds = analyze.sound_intervals(clip, [tuple(s) for s in silences])

        transcript = None
        if clip.has_audio and backend != "none":
            wav = analyze.extract_audio(clip, cache / "audio" / f"{clip.key}.wav")
            try:
                transcript = transcribe.transcribe(
                    wav, cache / "transcript" / f"{clip.key}.json", cfg["whisper"],
                    cfg["project"]["source_language"],
                    cfg["project"].get("spoken_languages") or cfg["project"]["languages"])
            except VautoError as exc:
                warnings.append(f"{clip.name}: 음성 인식 실패 ({exc})")
        elif clip.has_audio:  # 인식 없이: 소리 나는 구간을 말로 간주
            transcript = {"language": "", "segments": [
                {"start": s, "end": e, "text": "", "words": []} for s, e in sounds if e - s >= 0.5]}

        got, dropped = edit.build_units(clip, transcript, sounds, cfg["edit"], cfg["subtitles"])
        if dropped:
            warnings.append(f"{clip.name}: 소리 없는 구간의 인식 결과 {dropped}개를 버림")
        units.extend(got)

        stats = None
        if cfg["color"]["auto"]:
            stats = _cached(cache / "color" / f"{clip.key}.json",
                            lambda: analyze.color_stats(clip, "input.cube" if luts.get("input") else "", lut_dir))
            if stats is None:
                warnings.append(f"{clip.name}: 색 분석 실패, 보정 없이 진행")
        corrections[clip.index] = analyze.correction(
            stats, cfg["color"]["strength"] if cfg["color"]["auto"] else 0, cfg["color"]["saturation"])
    return units, corrections


def decide(units: list[dict], cfg: dict, model: llm_mod.LLM | None, warnings: list[str]) -> tuple[list[dict], list[dict]]:
    """본편과 쇼츠에 남길 조각."""
    ecfg, brief = cfg["edit"], cfg["project"]["brief"]
    total = sum(u["dur"] for u in units)
    main = list(units)
    if model and not ecfg["target_sec"]:
        # 목표 길이가 없으면 "뺄 것"만 묻는다. 절반 넘게 빼라는 답은 믿지 않는다.
        try:
            plan = llm_mod.plan_cleanup(model, edit.llm_view(units), brief)
            ids = {str(r.get("id", "")).strip(): str(r.get("why", "")) for r in plan.get("remove", [])
                   if isinstance(r, dict)}
            ids = {k: v for k, v in ids.items() if any(u["id"] == k for u in units)}
            gone = sum(u["dur"] for u in units if u["id"] in ids)
            if gone > total * 0.5:
                warnings.append("LLM 이 절반 넘게 빼라고 해서 채택하지 않음 (전체 유지)")
            else:
                main = [u for u in units if u["id"] not in ids]
                for uid, why in ids.items():
                    log(f"  LLM 이 뺀 조각 {uid}: {why[:100]}")
                if not ids:
                    log("  LLM 판단: 뺄 조각 없음")
        except llm_mod.LLMError as exc:
            warnings.append(f"LLM 본편 판단 실패, 전체 유지 ({exc})")
    elif model:
        try:
            plan = llm_mod.plan_edit(model, edit.llm_view(units), brief, ecfg["target_sec"], "main")
            picked = edit.apply_plan(units, plan.get("keep", []), ecfg["allow_reorder"])
            if not picked:
                warnings.append("LLM 의 본편 편집안을 해석하지 못해 전체 유지")
            else:
                main = picked
                log(f"  LLM 본편 판단: {len(units)}조각 중 {len(main)}조각 유지. {plan.get('reason', '')[:120]}")
        except llm_mod.LLMError as exc:
            warnings.append(f"LLM 본편 판단 실패, 전체 유지 ({exc})")
    if ecfg["target_sec"] and sum(u["dur"] for u in main) > ecfg["target_sec"] * 1.3:
        if not model:
            main = edit.limit_duration(main, ecfg["target_sec"])
            warnings.append("LLM 없이 목표 길이에 맞추려고 뒤쪽을 잘라냄")
        else:
            warnings.append(f"본편이 목표 길이({ecfg['target_sec']}초)보다 30% 이상 김")

    short: list[dict] = []
    if cfg["short"]["enabled"]:
        max_sec = cfg["short"]["max_sec"]
        if model:
            try:
                plan = llm_mod.plan_edit(model, edit.llm_view(main), brief, max_sec, "short")
                picked = edit.apply_plan(main, plan.get("keep", []))
                if picked:
                    short = edit.limit_duration(picked, max_sec)
            except llm_mod.LLMError as exc:
                warnings.append(f"LLM 쇼츠 판단 실패, 규칙으로 선택 ({exc})")
        if not short:
            short = edit.fallback_short(main, max_sec)
    return main, short


def translate_units(units: list[dict], langs: list[str], model: llm_mod.LLM | None, cfg: dict,
                    warnings: list[str]) -> None:
    cues = [c for u in units for c in u["cues"] if c["text"].strip()]
    for cue in cues:
        cue.setdefault("tr", {})
    if not model:
        if cues and len(langs) > 1:
            warnings.append("LLM 을 쓰지 못해 번역 자막 없음 (말한 언어 자막만 생성)")
        return
    for src in sorted({c.get("lang", "") for c in cues}):
        group = [c for c in cues if c.get("lang", "") == src]
        if not src:
            warnings.append("언어를 알 수 없는 자막은 번역하지 않음")
            continue
        for dst in langs:
            if dst == src:
                continue
            log(f"  번역 {src} → {dst}: {len(group)}문장")
            texts, failed = llm_mod.translate(model, [c["text"] for c in group], src, dst,
                                              cfg["project"]["brief"], cfg["glossary"])
            for cue, text in zip(group, texts):
                cue["tr"][dst] = text
            if failed:
                warnings.append(f"번역 {src}→{dst}: {failed}문장 실패, 원문으로 남김")


def metadata(main: list[dict], tl: dict, langs: list[str], main_lang: str, model: llm_mod.LLM | None,
             cfg: dict, warnings: list[str]) -> dict:
    if not model or not any(u["text"] for u in main):
        return {}
    try:
        meta = llm_mod.make_metadata(model, edit.llm_view(main), cfg["project"]["brief"], langs, main_lang)
    except llm_mod.LLMError as exc:
        warnings.append(f"제목·설명 생성 실패 ({exc})")
        return {}
    starts = {it["unit"]: float(frames_to_time(it["start_f"], tl["rate"])) for it in tl["items"]}
    chapters = []
    for ch in meta.get("chapters", []) if isinstance(meta.get("chapters"), list) else []:
        uid = str(ch.get("id", "")).strip()
        if uid in starts and ch.get("title"):
            chapters.append({"unit": uid, "title": str(ch["title"]).strip(), "at": starts[uid]})
    chapters.sort(key=lambda c: c["at"])
    chapters = [c for i, c in enumerate(chapters) if i == 0 or c["at"] - chapters[i - 1]["at"] >= 10]
    if len(chapters) >= 3:
        first = tl["items"][0]["unit"]
        chapters[0].update(unit=first, at=0.0)
    else:
        chapters = []
    meta["chapters"] = chapters
    return meta


def write_metadata(path: Path, meta: dict, langs: list[str]) -> None:
    lines = ["# 업로드용 제목·설명", ""]
    for lang in langs:
        block = meta.get(lang) or {}
        if not isinstance(block, dict):
            continue
        lines += [f"## {lang}", "", f"**제목**: {block.get('title', '')}", "",
                  str(block.get("description", "")), "", " ".join(block.get("hashtags", []) or []), ""]
    if meta.get("chapters"):
        lines += ["## 유튜브 챕터 (설명란에 붙여넣기)", ""]
        lines += [f"{clock(c['at'])} {c['title']}" for c in meta["chapters"]]
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def cmd_run(args) -> int:
    cfg = config.load(Path(args.project) if args.project else None)
    footage = Path(args.footage).expanduser().resolve()
    if not footage.is_dir():
        raise VautoError(f"폴더가 아닙니다: {footage}")
    out = Path(args.out).expanduser().resolve() if args.out else footage / "_vauto"
    cache = out / ".cache"
    name = cfg["project"]["name"] or footage.name
    langs = list(cfg["project"]["languages"])
    warnings: list[str] = []

    luts = {}
    for kind in ("input", "look"):
        src = cfg["color"][f"{kind}_lut"]
        if src:
            src_path = Path(src).expanduser()
            if not src_path.is_file():
                raise VautoError(f"LUT 파일이 없습니다: {src}")
            (cache / "luts").mkdir(parents=True, exist_ok=True)
            shutil.copyfile(src_path, cache / "luts" / f"{kind}.cube")
            luts[kind] = str(cache / "luts" / f"{kind}.cube")
    (cache / "luts").mkdir(parents=True, exist_ok=True)

    log(f"[1/6] 영상 읽기: {footage}")
    clips = probe_folder(footage)
    log(f"  {len(clips)}개 클립, 총 {clock(sum(c.duration for c in clips))}")

    log("[2/6] 분석 (음성 인식, 침묵, 색)")
    units, corrections = analyze_clips(clips, cfg, cache, luts, warnings, not args.no_transcribe)
    if not units:
        raise VautoError("쓸 수 있는 구간이 없습니다.")

    model = None
    if cfg["edit"]["use_llm"] and not args.no_llm:
        candidate = llm_mod.LLM(cfg["llm"])
        ok, msg = candidate.available()
        if ok:
            model = candidate
        else:
            warnings.append(f"LLM 사용 불가: {msg}")

    log("[3/6] 편집 판단" + ("" if model else " (LLM 없이 규칙만)"))
    main_units, short_units = decide(units, cfg, model, warnings)

    log("[4/6] 자막 번역")
    translate_units(main_units, langs, model, cfg, warnings)

    width, height, rate = edit.sequence_format(clips)
    main_tl = edit.build_timeline(f"{name} 본편", main_units, clips, width, height, rate, langs)
    timelines = {"main": main_tl}
    if short_units:
        vw, vh = edit.vertical_size(width, height)
        timelines["short"] = edit.build_timeline(f"{name} 쇼츠", short_units, clips, vw, vh, rate, langs)
    lang_time = Counter()
    for u in main_units:
        lang_time[u["lang"] or ""] += u["dur"] if u["text"] else 0
    main_lang = next((code for code, _ in lang_time.most_common() if code), langs[0])
    meta = metadata(main_units, main_tl, langs, main_lang, model, cfg, warnings)

    log("[5/6] 자막·Final Cut 프로젝트 쓰기")
    outputs: list[str] = []
    for key, tl in timelines.items():
        for lang in ["source", *langs]:
            cues = edit.timeline_cues(tl, lang)
            if cues and (lang != "source" or len({c["lang"] for c in cues}) > 1 or lang not in langs):
                path = out / "subs" / f"{key}.{lang}.srt"
                subs.write_srt(path, cues, lang if lang != "source" else main_lang, cfg["subtitles"])
                outputs.append(str(path))
    if cfg["fcp"]["enabled"]:
        fcp_cfg = dict(cfg["fcp"], event_name=name)
        builder = fcpxml.Builder(clips, fcp_cfg, cfg["subtitles"])
        fcp_langs = [lang for lang in langs if any(it["cues"].get(lang) for it in main_tl["items"])]
        builder.add_project(main_tl, fcp_langs, meta.get("chapters"))
        if "short" in timelines and cfg["fcp"]["vertical_project"]:
            builder.add_project(timelines["short"], fcp_langs, fill=True)
        fcp_path = out / "fcp" / f"{name}.fcpxml"
        builder.write(fcp_path)
        outputs.append(str(fcp_path))
    if meta:
        write_json(out / "metadata.json", meta)
        write_metadata(out / "metadata.md", meta, langs)
        outputs.append(str(out / "metadata.md"))
    if cfg["color"]["auto"]:  # Final Cut 의 "사용자 설정 LUT" 효과로 같은 보정을 쓸 수 있게 내보낸다
        used = {u["clip"] for u in main_units}
        for idx in sorted(used):
            if not analyze.is_identity(corrections[idx]):
                analyze.write_cube(out / "luts" / f"{clips[idx].name}.cube", corrections[idx],
                                   title=clips[idx].name)
    write_json(out / "edit.json", {
        "units": [{k: v for k, v in u.items() if k != "cues"} for u in units],
        "main": [u["id"] for u in main_units], "short": [u["id"] for u in short_units],
        "corrections": {clips[i].name: c for i, c in corrections.items()}})

    rendered: list[tuple[str, float]] = []
    if cfg["render"]["enabled"] and not args.no_render:
        log("[6/6] 완성 파일 만들기 (ffmpeg)")
        wanted = set(args.targets.split(",")) if args.targets else None
        done: dict[tuple, Path] = {}
        for tname, tcfg in cfg["targets"].items():
            if wanted is not None and tname not in wanted:
                continue
            tl = timelines.get(tcfg["edit"])
            if not tl or not tl["items"]:
                warnings.append(f"{tname}: 해당 편집본({tcfg['edit']})이 없어 건너뜀")
                continue
            tl, cut = edit.truncate(tl, tcfg.get("max_sec", 0))
            if cut:
                warnings.append(f"{tname}: 길이 제한 {tcfg['max_sec']}초에 맞춰 뒤쪽을 잘라냄")
            if not tl["items"]:
                continue
            for burn in (tcfg.get("burn") or [None]):
                if burn and not any(it["cues"].get(burn) for it in tl["items"]):
                    if burn != "source":
                        warnings.append(f"{tname}: {burn} 자막이 없어 그 버전은 건너뜀")
                        continue
                    burn = None
                suffix = f".{burn}" if burn and burn != "source" else ""
                path = out / "exports" / f"{tname}{suffix}.mp4"
                sig = (tuple(it["unit"] for it in tl["items"]), render.target_size(tcfg, tl),
                       tcfg.get("fit"), tcfg.get("codec"), burn)
                try:
                    if sig in done:
                        shutil.copyfile(done[sig], path)
                    else:
                        render.render_target(tname, tcfg, tl, clips, corrections, cfg, path,
                                             cache / "render" / f"{tname}{suffix}", burn, luts)
                        done[sig] = path
                    rendered.append((str(path), edit.timeline_seconds(tl)))
                    outputs.append(str(path))
                except VautoError as exc:
                    warnings.append(f"{tname}{suffix}: 만들기 실패 — {exc}")
    else:
        log("[6/6] 완성 파일 만들기 건너뜀")

    report = [f"# {name} 자동 편집 결과", "",
              f"- 원본: {len(clips)}개 클립, {clock(sum(c.duration for c in clips))}",
              f"- 본편: {len(main_units)}조각, {clock(edit.timeline_seconds(main_tl))} "
              f"({main_tl['width']}x{main_tl['height']} {float(rate):.2f}fps)"]
    if "short" in timelines:
        report.append(f"- 쇼츠: {len(short_units)}조각, {clock(edit.timeline_seconds(timelines['short']))}")
    report += [f"- LLM: {cfg['llm']['model'] if model else '사용 안 함'}", "", "## 만든 파일", ""]
    report += [f"- `{p}`" for p in outputs]
    if warnings:
        report += ["", "## 확인할 점", ""] + [f"- {w}" for w in warnings]
    report += ["", "## 클립별 처리", "", "| 클립 | 길이 | 쓴 구간 | 언어 | 색 보정(게인 R/G/B, 감마) |", "|---|---|---|---|---|"]
    kept = Counter()
    for u in main_units:
        kept[u["clip"]] += u["dur"]
    for clip in clips:
        corr = corrections[clip.index]
        lang = next((u["lang"] for u in units if u["clip"] == clip.index and u["lang"]), "-")
        report.append(f"| {clip.name} | {clock(clip.duration)} | {clock(kept[clip.index])} | {lang} | "
                      f"{corr['gain'][0]:.2f}/{corr['gain'][1]:.2f}/{corr['gain'][2]:.2f}, {corr['gamma']:.2f} |")
    out.mkdir(parents=True, exist_ok=True)
    (out / "report.md").write_text("\n".join(report) + "\n", encoding="utf-8")

    print(f"\n완료: {out}")
    print(f"  본편 {clock(edit.timeline_seconds(main_tl))}"
          + (f", 쇼츠 {clock(edit.timeline_seconds(timelines['short']))}" if "short" in timelines else ""))
    for path, sec in rendered:
        print(f"  {clock(sec):>6}  {path}")
    if warnings:
        print(f"  확인할 점 {len(warnings)}건 → {out / 'report.md'}")
    if args.open_fcp and cfg["fcp"]["enabled"] and platform.system() == "Darwin":
        subprocess.run(["open", "-a", "Final Cut Pro", str(out / "fcp" / f"{name}.fcpxml")])
    return 0


def cmd_doctor(args) -> int:
    cfg = config.load(Path(args.project) if args.project else None)
    ok = True

    def line(good: bool, label: str, detail: str = "") -> None:
        nonlocal ok
        ok = ok and good
        print(f"  {'✔' if good else '✖'} {label}" + (f"  — {detail}" if detail else ""))

    print(f"vauto {__version__} 점검")
    for tool in ("ffmpeg", "ffprobe"):
        path = shutil.which(tool)
        line(bool(path), tool, path or "없음 (brew install ffmpeg)")
    if shutil.which("ffmpeg"):
        filters = subprocess.run(["ffmpeg", "-hide_banner", "-filters"], capture_output=True, text=True).stdout
        for flt, why in (("zscale", "HDR→SDR 변환"), ("ass", "자막 태워 넣기"), ("lut3d", "LUT"),
                         ("loudnorm", "음량 맞춤")):
            line(f" {flt} " in filters, f"ffmpeg 필터 {flt}", why)
        for codec in ("hevc", "h264"):
            try:
                line(True, f"{codec} 인코더", render.pick_encoder(codec)[0])
            except VautoError as exc:
                line(False, f"{codec} 인코더", str(exc))
    backend = transcribe.pick_backend(cfg["whisper"]["backend"])
    line(backend != "none", "음성 인식 엔진", backend)
    good, msg = llm_mod.LLM(cfg["llm"]).available()
    line(good, f"로컬 LLM ({cfg['llm']['model']})", msg)
    print("모두 정상" if ok else "✖ 표시된 항목을 먼저 해결하세요")
    return 0 if ok else 1


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="vauto", description="촬영 원본 폴더를 자동 편집합니다.")
    sub = parser.add_subparsers(dest="cmd", required=True)
    run = sub.add_parser("run", help="폴더 하나를 처리")
    run.add_argument("footage", help="촬영 원본이 든 폴더")
    run.add_argument("--project", help="project.toml 경로")
    run.add_argument("--out", help="결과 폴더 (기본: 원본폴더/_vauto)")
    run.add_argument("--targets", help="만들 대상만 고르기. 예: youtube,reels")
    run.add_argument("--no-llm", action="store_true", help="LLM 없이 규칙만으로")
    run.add_argument("--no-transcribe", action="store_true", help="음성 인식 건너뛰기")
    run.add_argument("--no-render", action="store_true", help="완성 파일은 만들지 않고 FCPXML·자막만")
    run.add_argument("--open-fcp", action="store_true", help="끝나면 Final Cut Pro 로 열기")
    run.set_defaults(func=cmd_run)
    doc = sub.add_parser("doctor", help="설치 상태 점검")
    doc.add_argument("--project", help="project.toml 경로")
    doc.set_defaults(func=cmd_doctor)
    args = parser.parse_args(argv)
    try:
        return args.func(args)
    except VautoError as exc:
        print(f"오류: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
