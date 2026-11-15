"""컷 편집: 원본을 조각(unit)으로 나누고, 남길 조각으로 타임라인을 만든다."""
from __future__ import annotations

from fractions import Fraction

from . import subs
from .analyze import overlap
from .probe import Clip
from .timeutil import frames_to_time, to_frames


def build_units(clip: Clip, transcript: dict | None, sounds: list[tuple[float, float]] | None,
                cfg: dict, sub_cfg: dict) -> tuple[list[dict], int]:
    """클립 하나를 조각 목록으로. (조각 목록, 환각으로 보고 버린 구간 수)"""
    ecfg = cfg
    lang = (transcript or {}).get("language", "") or ""
    segments = list((transcript or {}).get("segments", []))

    dropped = 0
    if sounds is not None and clip.has_audio:
        kept = []
        for seg in segments:
            dur = max(seg["end"] - seg["start"], 1e-3)
            if overlap(seg["start"], seg["end"], sounds) / dur < 0.2:
                dropped += 1  # 소리가 없는 곳에 나온 글자는 Whisper 환각으로 본다
            else:
                kept.append(seg)
        segments = kept

    def cues_between(a: float, b: float) -> list[dict]:
        out = []
        for seg in segments:
            for cue in subs.split_segment(seg, lang or "en", sub_cfg):
                mid = (cue["start"] + cue["end"]) / 2
                if a <= mid <= b:
                    out.append({"start": max(a, cue["start"]), "end": min(b, cue["end"]),
                                "text": cue["text"], "lang": lang})
        return out

    def make(idx: int, a: float, b: float, kind: str) -> dict:
        cues = cues_between(a, b)
        return {"id": f"c{clip.index + 1:02d}u{idx:02d}", "clip": clip.index, "kind": kind,
                "src_in": round(a, 3), "src_out": round(b, 3), "dur": round(b - a, 3),
                "lang": lang, "text": " ".join(c["text"] for c in cues), "cues": cues}

    if not segments:  # 말이 없는 클립 (B-roll)
        length = clip.duration if not ecfg["broll_max"] else min(clip.duration, ecfg["broll_max"])
        start = (clip.duration - length) / 2
        return [make(1, start, start + length, "broll")], dropped

    if not ecfg["cut_silence"]:
        return [make(1, 0.0, clip.duration, "speech")], dropped

    # 쉼이 짧은 구간끼리 묶는다
    groups: list[list[dict]] = []
    for seg in segments:
        if groups and seg["start"] - groups[-1][-1]["end"] < ecfg["merge_gap"]:
            groups[-1].append(seg)
        else:
            groups.append([seg])

    spans = []
    for group in groups:
        a = max(0.0, group[0]["start"] - ecfg["pad_before"])
        b = min(clip.duration, group[-1]["end"] + ecfg["pad_after"])
        if sounds:  # 말소리가 조금 더 이어지면 그 끝까지 살린다
            for s, e in sounds:
                if s <= b <= e and e - b <= 0.4:
                    b = min(clip.duration, e + 0.05)
                if s <= a <= e and a - s <= 0.3:
                    a = max(0.0, s - 0.05)
        spans.append([a, b])
    for prev, cur in zip(spans, spans[1:]):  # 겹치면 가운데서 나눈다
        if cur[0] < prev[1]:
            mid = (cur[0] + prev[1]) / 2
            prev[1], cur[0] = mid, mid

    units, idx = [], 1
    for a, b in spans:
        if b - a < ecfg["min_unit"]:
            continue
        units.append(make(idx, a, b, "speech"))
        idx += 1
    return units, dropped


def llm_view(units: list[dict]) -> list[dict]:
    return [{"id": u["id"], "clip": u["clip"], "dur": u["dur"], "text": u["text"]} for u in units]


def apply_plan(units: list[dict], keep_ids: list[str], reorder: bool = False) -> list[dict] | None:
    """LLM 이 고른 id 를 검증. 엉뚱한 답이면 None."""
    by_id = {u["id"]: u for u in units}
    seen, picked = set(), []
    for uid in keep_ids:
        uid = str(uid).strip()
        if uid in by_id and uid not in seen:
            seen.add(uid)
            picked.append(by_id[uid])
    if not picked:
        return None
    if not reorder:
        order = {u["id"]: i for i, u in enumerate(units)}
        picked.sort(key=lambda u: order[u["id"]])
    return picked


def limit_duration(units: list[dict], max_sec: float) -> list[dict]:
    """앞에서부터 max_sec 안에 들어가는 조각만."""
    if not max_sec:
        return list(units)
    out, total = [], 0.0
    for unit in units:
        if total + unit["dur"] > max_sec + 0.05:
            break
        out.append(unit)
        total += unit["dur"]
    return out


def fallback_short(units: list[dict], max_sec: float) -> list[dict]:
    """LLM 없이 쇼츠 고르기: 말이 가장 빽빽하게 이어지는 연속 구간."""
    speech = [u for u in units if u["kind"] == "speech"] or units
    best, best_score = [], -1.0
    for i in range(len(speech)):
        window = limit_duration(speech[i:], max_sec)
        score = sum(subs.width(u["text"]) for u in window)
        if score > best_score:
            best, best_score = window, score
    return best


def sequence_format(clips: list[Clip]) -> tuple[int, int, Fraction]:
    """가장 오래 찍힌 (해상도, 프레임레이트) 조합을 타임라인 규격으로."""
    totals: dict[tuple[int, int, Fraction], float] = {}
    for clip in clips:
        key = (clip.width, clip.height, clip.fps)
        totals[key] = totals.get(key, 0.0) + clip.duration
    return max(totals, key=lambda k: (totals[k], k[0] * k[1]))


def vertical_size(width: int, height: int) -> tuple[int, int]:
    if height > width:
        return width, height
    short = min(width, height, 2160)
    short -= short % 2
    tall = round(short * 16 / 9)
    return short, tall + tall % 2


def build_timeline(name: str, units: list[dict], clips: list[Clip], width: int, height: int,
                   rate: Fraction, langs: list[str]) -> dict:
    """조각을 이어 붙인다. 모든 길이는 타임라인 프레임 단위로 맞춘다."""
    items, pos = [], 0
    for unit in units:
        clip = clips[unit["clip"]]
        in_frame = to_frames(unit["src_in"], clip.fps)
        src_in = frames_to_time(in_frame, clip.fps)
        frames = max(1, to_frames(unit["dur"], rate))
        while frames > 1 and float(src_in) + float(frames_to_time(frames, rate)) > clip.duration:
            frames -= 1
        dur = float(frames_to_time(frames, rate))
        by_lang: dict[str, list[dict]] = {"source": [], **{lang: [] for lang in langs}}
        for cue in unit["cues"]:
            start, end = max(cue["start"], float(src_in)), min(cue["end"], float(src_in) + dur)
            if end - start < 0.3 or not cue["text"].strip():
                continue
            base = {"start": start, "end": end, "lang": cue.get("lang", "")}
            by_lang["source"].append(dict(base, text=cue["text"]))
            for lang in langs:
                text = cue["text"] if lang == cue.get("lang") else cue.get("tr", {}).get(lang)
                if text:
                    by_lang[lang].append(dict(base, text=text, lang=lang))
        items.append({"unit": unit["id"], "clip": unit["clip"], "kind": unit["kind"],
                      "lang": unit["lang"], "src_in": src_in, "start_f": pos, "frames": frames,
                      "cues": by_lang})
        pos += frames
    return {"name": name, "width": width, "height": height, "rate": rate, "items": items, "frames": pos}


def timeline_seconds(tl: dict) -> float:
    return float(frames_to_time(tl["frames"], tl["rate"]))


def timeline_cues(tl: dict, lang: str) -> list[dict]:
    """타임라인 시각 기준 자막 목록."""
    out = []
    for item in tl["items"]:
        base = float(frames_to_time(item["start_f"], tl["rate"])) - float(item["src_in"])
        end_limit = float(frames_to_time(item["start_f"] + item["frames"], tl["rate"]))
        for cue in item["cues"].get(lang, []):
            start, end = cue["start"] + base, min(cue["end"] + base, end_limit)
            if out and start < out[-1]["end"]:
                out[-1]["end"] = start
            if end - start >= 0.25:
                out.append({"start": start, "end": end, "text": cue["text"],
                            "lang": cue.get("lang", lang)})
    return [c for c in out if c["end"] - c["start"] >= 0.2]


def truncate(tl: dict, max_sec: float) -> tuple[dict, bool]:
    """플랫폼 길이 제한에 맞춰 뒤쪽 조각을 잘라낸 사본."""
    if not max_sec or timeline_seconds(tl) <= max_sec + 0.05:
        return tl, False
    limit = to_frames(max_sec, tl["rate"])
    items = [it for it in tl["items"] if it["start_f"] + it["frames"] <= limit]
    frames = items[-1]["start_f"] + items[-1]["frames"] if items else 0
    return dict(tl, items=items, frames=frames), True
