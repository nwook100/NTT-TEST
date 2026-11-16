"""ffmpeg 없이 도는 핵심 로직 테스트.  실행: uv run --with pytest pytest"""
import xml.etree.ElementTree as ET
from fractions import Fraction

from vauto import analyze, config, edit, fcpxml, llm, subs
from vauto.probe import Clip
from vauto.timeutil import fcp_time, frames_to_time, snap_rate, srt_time, timecode_to_frames, to_frames

SUB = config.DEFAULTS["subtitles"]
EDIT = config.DEFAULTS["edit"]
NTSC = Fraction(30000, 1001)


def clip(index, name, dur, w=1920, h=1080, fps=NTSC, audio=True, tc="", hdr="sdr"):
    return Clip(index=index, path=f"/Volumes/My SSD/촬영/{name}.mov", name=name, duration=dur, width=w,
                height=h, fps_num=fps.numerator, fps_den=fps.denominator, raw_fps=float(fps),
                has_audio=audio, audio_rate=48000, audio_channels=2, timecode=tc, hdr=hdr)


def seg(start, end, text):
    return {"start": start, "end": end, "text": text, "words": []}


# ---------- 시간 ----------

def test_rates_and_times():
    assert snap_rate(Fraction(2997, 100)) == NTSC
    assert snap_rate(Fraction(60)) == Fraction(60)
    assert fcp_time(Fraction(1001, 30000)) == "1001/30000s"
    assert fcp_time(Fraction(5)) == "5s"
    assert srt_time(3661.5) == "01:01:01,500"


def test_timecode_drop_frame():
    assert timecode_to_frames("01:00:00:00", NTSC) == (108000, False)
    # 드롭프레임 1시간 = 107892 프레임 (SMPTE)
    assert timecode_to_frames("01:00:00;00", NTSC) == (107892, True)
    assert timecode_to_frames("00:01:00;02", NTSC) == (1800, True)
    assert timecode_to_frames("00:00:10:00", Fraction(25)) == (250, False)


# ---------- 자막 ----------

def test_wrap_keeps_words_whole():
    lines = subs.wrap("Hello everyone, today we are visiting the semiconductor exhibition in Seoul.", "en", SUB)
    assert len(lines) == 2 and all(subs.width(x) <= 42 for x in lines)
    assert " ".join(lines) == "Hello everyone, today we are visiting the semiconductor exhibition in Seoul."
    ja = subs.wrap("この製品はウェーファーカセットです。", "ja", SUB)
    assert "".join(ja) == "この製品はウェーファーカセットです。"
    assert not any(line[0] in subs.NO_LINE_START for line in ja)
    assert ja[1].startswith("ウェーファー")           # 가타카나 단어를 쪼개지 않는다
    assert subs.wrap("짧은 문장", "ko", SUB) == ["짧은 문장"]


def test_wrap_respects_screen_width():
    lines = subs.wrap("Hello everyone, today we are visiting the semiconductor exhibition in Seoul.", "en", SUB, 28)
    assert all(subs.width(x) <= 30 for x in lines) and len(lines) == 3


def test_split_long_segment_by_words():
    words = [{"w": f" word{i}", "s": i * 0.5, "e": i * 0.5 + 0.4} for i in range(30)]
    long = {"start": 0, "end": 15, "text": "".join(w["w"] for w in words), "words": words}
    cues = subs.split_segment(long, "en", SUB)
    assert len(cues) >= 3
    assert all(c["end"] - c["start"] <= SUB["max_sec"] + 0.5 for c in cues)
    assert " ".join(c["text"] for c in cues).split() == long["text"].split()


# ---------- 컷 ----------

def test_units_cut_on_pauses_and_drop_hallucination():
    c = clip(0, "A001", 30.0)
    transcript = {"language": "ko", "segments": [
        seg(1.0, 3.0, "안녕하세요."), seg(3.2, 5.0, "오늘은 전시회입니다."),
        seg(9.0, 11.0, "다음 제품입니다."), seg(20.0, 22.0, "시청해 주셔서 감사합니다")]}
    sounds = [(0.8, 5.2), (8.9, 11.3)]                      # 20~22초에는 소리가 없다
    units, dropped = edit.build_units(c, transcript, sounds, EDIT, SUB)
    assert dropped == 1
    assert [u["id"] for u in units] == ["c01u01", "c01u02"]
    assert units[0]["src_in"] < 1.0 and units[0]["src_out"] > 5.0
    assert units[0]["text"] == "안녕하세요. 오늘은 전시회입니다."
    assert all(a["src_out"] <= b["src_in"] for a, b in zip(units, units[1:]))


def test_broll_uses_centre_window():
    units, _ = edit.build_units(clip(2, "B001", 20.0), {"language": "", "segments": []}, [], EDIT, SUB)
    assert len(units) == 1 and units[0]["kind"] == "broll"
    assert abs(units[0]["src_in"] - 7.5) < 1e-6 and abs(units[0]["dur"] - 5.0) < 1e-6


def test_plan_validation_and_limits():
    units = [{"id": f"u{i}", "dur": 10.0, "kind": "speech", "text": "x" * i, "clip": 0} for i in range(1, 6)]
    picked = edit.apply_plan(units, ["u4", "nope", "u2", "u2"])
    assert [u["id"] for u in picked] == ["u2", "u4"]         # 없는 id·중복 제거, 원래 순서
    assert edit.apply_plan(units, ["zzz"]) is None
    assert [u["id"] for u in edit.limit_duration(units, 25)] == ["u1", "u2"]
    assert [u["id"] for u in edit.fallback_short(units, 20)] == ["u4", "u5"]


def _timeline():
    clips = [clip(0, "A001", 30.0, tc="01:00:00;00"), clip(1, "A002", 20.0, 3840, 2160, Fraction(60000, 1001)),
             clip(2, "H001", 8.0, fps=Fraction(25), audio=False, hdr="hlg")]
    units = []
    t0 = {"language": "ko", "segments": [seg(1.0, 4.0, "안녕하세요. 오늘은 전시회입니다."), seg(9.0, 12.0, "다음 제품입니다.")]}
    t1 = {"language": "en", "segments": [seg(0.5, 3.5, "This is a wafer cassette.")]}
    for c, t in ((clips[0], t0), (clips[1], t1), (clips[2], {"language": "", "segments": []})):
        units += edit.build_units(c, t, None, EDIT, SUB)[0]
    for u in units:
        for cue in u["cues"]:
            cue["tr"] = {lang: f"[{lang}] {cue['text']}" for lang in ("ko", "en", "ja") if lang != cue["lang"]}
    return clips, edit.build_timeline("테스트", units, clips, 1920, 1080, NTSC, ["ko", "en", "ja"])


def test_timeline_is_contiguous_and_cues_stay_inside():
    clips, tl = _timeline()
    pos = 0
    for item in tl["items"]:
        assert item["start_f"] == pos
        pos += item["frames"]
        assert float(item["src_in"]) + float(frames_to_time(item["frames"], tl["rate"])) <= clips[item["clip"]].duration + 1e-6
    assert pos == tl["frames"]
    for lang in ("ko", "en", "ja"):
        cues = edit.timeline_cues(tl, lang)
        assert len(cues) == 3
        assert all(0 <= c["start"] < c["end"] <= edit.timeline_seconds(tl) + 1e-6 for c in cues)
        assert all(a["end"] <= b["start"] + 1e-6 for a, b in zip(cues, cues[1:]))
    assert edit.timeline_cues(tl, "ko")[0]["text"] == "안녕하세요. 오늘은 전시회입니다."
    assert edit.timeline_cues(tl, "ko")[2]["text"].startswith("[ko]")
    short, cut = edit.truncate(tl, 5.0)
    assert cut and edit.timeline_seconds(short) <= 5.0


def test_fcpxml_structure_and_frame_alignment(tmp_path):
    clips, tl = _timeline()
    builder = fcpxml.Builder(clips, dict(config.DEFAULTS["fcp"], event_name="테스트"), SUB)
    builder.add_project(tl, ["ko", "en", "ja"], [{"unit": tl["items"][0]["unit"], "title": "시작"}])
    vertical = dict(tl, name="세로", width=1080, height=1920)
    builder.add_project(vertical, ["ko"], fill=True)
    path = tmp_path / "t.fcpxml"
    builder.write(path)
    text = path.read_text(encoding="utf-8")
    assert text.startswith('<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE fcpxml>')
    root = ET.fromstring(text.split("<!DOCTYPE fcpxml>\n", 1)[1])
    ids = {el.get("id") for el in root.find("resources")}

    def sec(value):
        return Fraction(value[:-1])

    frame = Fraction(1001, 30000)
    for project in root.iter("project"):
        seq = project.find("sequence")
        assert seq.get("format") in ids
        pos = Fraction(0)
        for node in seq.find("spine"):
            assert node.get("ref") in ids
            assert sec(node.get("offset")) == pos                       # 빈틈·겹침 없음
            assert (sec(node.get("offset")) / frame).denominator == 1   # 타임라인 프레임 경계
            assert (sec(node.get("duration")) / frame).denominator == 1
            pos += sec(node.get("duration"))
            lo, hi = sec(node.get("start")), sec(node.get("start")) + sec(node.get("duration"))
            for cap in node.findall("caption"):
                assert lo <= sec(cap.get("offset")) and sec(cap.get("offset")) + sec(cap.get("duration")) <= hi
                assert ((sec(cap.get("offset")) - lo) / frame).denominator == 1
                assert cap.get("role").startswith("iTT?captionFormat=ITT.")
        assert pos == sec(seq.get("duration"))
    first = root.find("event/project/sequence/spine")[0]
    asset = next(a for a in root.iter("asset") if a.get("id") == first.get("ref"))
    assert sec(asset.get("start")) == frames_to_time(107892, NTSC)       # 드롭프레임 타임코드 반영
    assert first.get("tcFormat") == "DF"
    assert asset.find("media-rep").get("src") == "file:///Volumes/My%20SSD/%EC%B4%AC%EC%98%81/A001.mov"
    assert first.find("chapter-marker").get("value") == "시작"
    assert {c.get("role").rsplit(".", 1)[1] for c in first.findall("caption")} == {"ko", "en", "ja"}
    rates = [n.find("conform-rate").get("srcFrameRate") for n in root.find("event/project/sequence/spine")
             if n.find("conform-rate") is not None]
    assert rates == ["59.94", "25"]
    assert len(list(root.iter("adjust-conform"))) == len(tl["items"])    # 세로 프로젝트만 화면 채우기
    assert len({el.get("id") for el in root.iter("text-style-def")}) == len(list(root.iter("text-style-def")))


# ---------- 색 ----------

def test_color_correction_neutralises_cast():
    stats = {"r": 0.50, "g": 0.42, "b": 0.36, "p01": 0.06, "p50": 0.40, "p99": 0.85}
    corr = analyze.correction(stats, 1.0)
    assert corr["gain"][0] < 1 < corr["gain"][2]                # 붉은 기를 줄이고 푸른 기를 올린다
    r, g, b = analyze.apply_correction((0.50, 0.42, 0.36), corr)
    assert abs(r - b) < abs(0.50 - 0.36)
    assert analyze.apply_correction((0.0, 0.0, 0.0), corr) == (0.0, 0.0, 0.0)
    assert analyze.is_identity(analyze.correction(stats, 0.0))
    assert analyze.is_identity(analyze.correction(None, 1.0))


def test_cube_file(tmp_path):
    corr = analyze.correction(None, 0)
    analyze.write_cube(tmp_path / "i.cube", corr, size=5)
    rows = [x for x in (tmp_path / "i.cube").read_text().splitlines() if x and x[0].isdigit()]
    assert len(rows) == 125
    assert rows[1] == "0.250000 0.000000 0.000000"              # R 이 가장 빨리 변한다
    assert rows[-1] == "1.000000 1.000000 1.000000"


# ---------- LLM 응답 처리 ----------

def test_llm_output_cleanup():
    assert llm.parse_json('<think>hmm</think>```json\n{"keep": ["a"]}\n```') == {"keep": ["a"]}
    assert llm.parse_json('Sure! {"items": []} done') == {"items": []}
    assert llm.parse_json("not json") is None
    assert llm._plausible("석영 핀 보트", "quartz pin boat")
    assert not llm._plausible("석영 핀 보트", 'pin boats.”}]} id: 3.png')
    assert not llm._plausible("짧다", "x" * 400)


def test_frames_roundtrip():
    for rate in (NTSC, Fraction(25), Fraction(60000, 1001)):
        for n in (0, 1, 17, 1800):
            assert to_frames(frames_to_time(n, rate), rate) == n


def test_translation_must_be_in_target_language():
    assert llm._plausible("이 제품은 웨이퍼 카세트입니다.", "This product is a wafer cassette.", "en")
    assert not llm._plausible("이 제품은 웨이퍼 카세트입니다.", "이 제품은 웨이퍼 카세트입니다.", "en")   # 원문 그대로
    assert llm._plausible("Hello", "안녕하세요", "ko") and not llm._plausible("Hello", "Hello", "ko")
    assert llm._plausible("Hello", "こんにちは", "ja") and not llm._plausible("Hello", "안녕하세요", "ja")
    assert llm._plausible("2026", "2026", "ko")                                    # 숫자뿐이면 통과
    assert llm._plausible("COEX 전시장", "COEX展示場", "ja")


# ---------- 목소리 ----------

def test_split_script_into_sentences():
    from vauto import voice

    text = "안녕하세요. 오늘은 삿포로입니다!\n눈이 많이 왔어요.\n\n# 메모는 읽지 않는다\n다음에 또 만나요."
    assert voice.split_script(text) == [["안녕하세요. 오늘은 삿포로입니다!", "눈이 많이 왔어요."], ["다음에 또 만나요."]]
    long = "첫 번째로 항구를 걷고, 두 번째로 시장에서 해산물을 먹고, 세 번째로 전망대에 올라가서, 마지막으로 온천에 들러 하루를 마무리했습니다."
    parts = voice.split_script(long, max_units=60)[0]
    assert len(parts) >= 2 and "".join(parts).replace(" ", "") == long.replace(" ", "")
    assert voice.split_script("  \n\n ") == []


def test_match_ratio_tolerates_spelling_but_catches_wrong_words():
    from vauto import voice

    assert voice.match_ratio("오늘은 홋카이도의 작은 항구 마을을 걸어 봤습니다.", "오늘은 호카이도의 작은 항구마을을 걸어봤습니다", "ko") > 0.9
    assert voice.match_ratio("아침 일곱 시, 창밖으로 산이 보였습니다.", "아침 7시 창밖으로 산이 보였습니다", "ko") > 0.82
    assert voice.match_ratio("The wind was cold, but the sea was beautiful.", "the wind was cold but the sea was beautiful", "en") == 1.0
    assert voice.match_ratio("바다는 정말 아름다웠어요.", "완전히 다른 말을 하고 있습니다", "ko") < 0.5


def test_pick_reference_window():
    from vauto import voice

    segs = [{"start": 1.0, "end": 4.5, "text": "가", "lp": -0.2}, {"start": 4.8, "end": 9.4, "text": "나", "lp": -0.2},
            {"start": 11.5, "end": 14.7, "text": "다", "lp": -0.6}, {"start": 20.0, "end": 22.0, "text": "라", "lp": -0.1}]
    start, end, text = voice.pick_window(segs)
    assert 6.0 <= end - start <= 12.0 and text == "가 나"
    assert voice.pick_window([{"start": 0, "end": 2.0, "text": "짧다", "lp": -0.1}]) is None


def test_llm_falls_back_when_server_rejects_structured_output():
    """Ollama 의 MLX 엔진 모델처럼 response_format 을 501 로 거부하는 서버."""
    import json as jsonlib
    import threading
    from http.server import BaseHTTPRequestHandler, HTTPServer

    seen = []

    class Handler(BaseHTTPRequestHandler):
        def do_POST(self):
            body = jsonlib.loads(self.rfile.read(int(self.headers["Content-Length"])))
            seen.append(body.get("response_format", {}).get("type") if body.get("response_format") else None)
            if "response_format" in body:
                payload, code = {"error": {"message": "structured output is unavailable"}}, 501
            else:
                assert "JSON schema" in body["messages"][0]["content"]
                text = 'Here you go:\n```json\n{"lines": ["첫 문장입니다.", "둘째 문장입니다."]}\n```'
                payload, code = {"choices": [{"message": {"content": text}}]}, 200
            data = jsonlib.dumps(payload).encode()
            self.send_response(code)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        def log_message(self, *args):
            pass

    server = HTTPServer(("127.0.0.1", 0), Handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        model = llm.LLM({"base_url": f"http://127.0.0.1:{server.server_port}/v1", "model": "x", "timeout": 10})
        schema = {"type": "object", "properties": {"lines": {"type": "array"}}}
        assert model.json("sys", "user", schema)["lines"] == ["첫 문장입니다.", "둘째 문장입니다."]
        assert seen == ["json_schema", "json_object", None]
        assert model.json("sys", "user", schema)["lines"][0] == "첫 문장입니다."
        assert seen[3:] == [None]                    # 두 번째 호출부터는 안 되는 방식을 건너뛴다
    finally:
        server.shutdown()


def test_scene_table_groups_sentences_by_paragraph():
    from vauto import voice

    cues = [{"start": 0.0, "end": 4.0, "text": "가.", "scene": 1}, {"start": 4.35, "end": 8.4, "text": "나.", "scene": 1},
            {"start": 9.2, "end": 13.3, "text": "다.", "scene": 2}]
    table = voice.scene_table(cues)
    assert [t["scene"] for t in table] == [1, 2]
    assert table[0] == {"scene": 1, "start": 0.0, "end": 8.4, "seconds": 8.4, "text": "가. 나."}
    assert table[1]["seconds"] == 4.1


def test_run_voice_writes_all_outputs_with_fake_engine(tmp_path):
    """합성 엔진만 가짜로 바꿔 대본 → 음성·자막·장면표 흐름을 확인한다 (ffmpeg 필요)."""
    import shutil

    import pytest

    np = pytest.importorskip("numpy")
    pytest.importorskip("soundfile")
    if not shutil.which("ffmpeg"):
        pytest.skip("ffmpeg 없음")
    from vauto import voice

    class Fake:
        def speak(self, text, lang):
            t = np.arange(int(24000 * 0.05 * max(4, len(text)))) / 24000
            return (0.2 * np.sin(2 * np.pi * 220 * t)).astype(np.float32), 24000

    cfg = config.load(None)
    script = "첫 장면 첫 문장입니다. 첫 장면 둘째 문장입니다.\n\n둘째 장면입니다."
    result = voice.run_voice(script, "ko", ["ko"], "none", cfg, tmp_path / "out", None, verify=False, engine=Fake())
    names = {p.name for p in (tmp_path / "out").iterdir()}
    assert {"narration.ko.wav", "narration.ko.srt", "scenes.ko.json", "script.ko.txt"} <= names
    import json as jsonlib

    scenes = jsonlib.loads((tmp_path / "out" / "scenes.ko.json").read_text(encoding="utf-8"))
    assert [s["scene"] for s in scenes] == [1, 2] and scenes[0]["end"] < scenes[1]["start"]
    assert abs(result["seconds"]["ko"] - scenes[1]["end"]) < 0.11


# ---------- AI 그림·영상 ----------

def test_gen_frame_counts_and_sizes():
    from vauto import gen

    assert gen.frames_for(5, 24, 8) == 121          # LTX: 8n+1
    assert gen.frames_for(2, 24, 8) == 49           # 도구의 예시와 같은 값
    assert gen.frames_for(5, 16, 4) == 81           # Wan 14B: 4n+1, 16fps
    assert gen.frames_for(5, 24, 4) == 121
    assert gen.frames_for(0.1, 24, 8) == 9          # 너무 짧아도 최소 프레임
    for kind in ("video", "image"):
        for vertical in (False, True):
            w, h = gen.size_for(kind, vertical)
            assert w % 64 == 0 and h % 64 == 0 and (h > w) == vertical


def test_gen_builds_documented_cli_arguments(tmp_path):
    from vauto import gen

    cfg = config.load(None)["gen"]
    photo = tmp_path / "my photo.jpg"
    photo.write_bytes(b"x")
    cmd = gen.build_clip_cmd(cfg, "ocean waves at sunset", tmp_path / "c.mp4", "ltx", 5, False, str(photo), 7)
    assert cmd[:2] == ["draw-things-cli", "generate"]
    pairs = dict(zip(cmd[2::], cmd[3::]))
    assert pairs["--model"] == "ltx_2.3_22b_distilled_1.1_q8p.ckpt"
    assert pairs["--frames"] == "121" and pairs["--width"] == "1280" and pairs["--height"] == "704"
    assert pairs["--image"] == str(photo) and "--crop" in cmd and pairs["--seed"] == "7"
    assert pairs["--video-format"] == "h264" and pairs["--output"].endswith("c.mp4")
    vertical = gen.build_clip_cmd(cfg, "x", tmp_path / "v.mp4", "wan", 5, True)
    pairs = dict(zip(vertical[2::], vertical[3::]))
    assert pairs["--model"] == "wan_v2.2_5b_ti2v_q8p.ckpt" and (pairs["--width"], pairs["--height"]) == ("704", "1280")
    image = gen.build_image_cmd(cfg, "a toaster on a kitchen table", tmp_path / "i.png")
    assert "flux_2_klein_4b_q8p.ckpt" in image and "--frames" not in image and "--video-format" not in image
    import pytest

    with pytest.raises(Exception):
        gen.build_clip_cmd(cfg, "x", tmp_path / "w.mp4", "wan14")           # 사진 없이 wan14
    with pytest.raises(Exception):
        gen.build_clip_cmd(dict(cfg, video_format="prores422hq"), "x", tmp_path / "p.mp4")


def test_gen_runs_cli_and_reports_missing_output(tmp_path, monkeypatch):
    """가짜 draw-things-cli 로 실행 흐름을 확인한다."""
    import os
    import stat

    from vauto import cli, gen

    fake = tmp_path / "bin" / "draw-things-cli"
    fake.parent.mkdir()
    fake.write_text('#!/bin/bash\nwhile [ $# -gt 0 ]; do if [ "$1" = "--output" ]; then out="$2"; fi; shift; done\n'
                    'echo "$out" > "$FAKE_LOG"; [ -n "$FAKE_SKIP" ] || echo data > "$out"\n')
    fake.chmod(fake.stat().st_mode | stat.S_IEXEC)
    monkeypatch.setenv("PATH", f"{fake.parent}{os.pathsep}{os.environ['PATH']}")
    monkeypatch.setenv("FAKE_LOG", str(tmp_path / "log.txt"))
    out = tmp_path / "result" / "clip.mp4"
    assert cli.main(["clip", "ocean", "--seconds", "2", "--out", str(out)]) == 0
    assert out.exists() and (tmp_path / "log.txt").read_text().strip() == str(out)
    monkeypatch.setenv("FAKE_SKIP", "1")
    assert cli.main(["image", "toaster", "--out", str(tmp_path / "none.png")]) == 1   # 파일이 안 생기면 실패로 알림


def test_gen_prefers_patched_cli_when_present(tmp_path, monkeypatch):
    import os
    import stat

    from vauto import gen

    monkeypatch.setenv("PATH", str(tmp_path))
    assert gen.resolve_cli("draw-things-cli") == "draw-things-cli"
    fake = tmp_path / "draw-things-cli-sdk26"
    fake.write_text("#!/bin/sh\n")
    fake.chmod(fake.stat().st_mode | stat.S_IEXEC)
    assert gen.resolve_cli("draw-things-cli") == "draw-things-cli-sdk26"
    assert gen.resolve_cli("/custom/path/cli") == "/custom/path/cli"       # 직접 지정한 경로는 그대로
    assert os.environ["PATH"] == str(tmp_path)


def test_gen_quality_and_size_options(tmp_path):
    import pytest

    from vauto import gen

    cfg = config.load(None)["gen"]
    cmd = gen.build_clip_cmd(cfg, "x", tmp_path / "h.mp4", "ltx", 5, False, None, None, "high", 1080)
    pairs = dict(zip(cmd[2::], cmd[3::]))
    assert pairs["--model"] == "ltx_2.3_22b_dev_q8p.ckpt"
    assert (pairs["--width"], pairs["--height"]) == ("1920", "1088") and pairs["--frames"] == "121"
    assert "--steps" not in cmd and "--cfg" not in cmd          # 단계 수와 강도는 도구 권장값에 맡긴다
    tall = gen.build_clip_cmd(cfg, "x", tmp_path / "v.mp4", "ltx", 5, True, None, None, "fast", 1080)
    pairs = dict(zip(tall[2::], tall[3::]))
    assert (pairs["--width"], pairs["--height"]) == ("1088", "1920")
    with pytest.raises(Exception):
        gen.build_clip_cmd(cfg, "x", tmp_path / "w.mp4", "wan", 5, False, None, None, "high")


def test_gen_enhance_prompt_uses_llm_text():
    from vauto import gen

    class Fake:
        def __init__(self, reply):
            self.reply, self.seen = reply, None

        def text(self, system, user, temperature=0.2):
            self.seen = (system, user)
            return self.reply

    good = '"Snow drifts across a small harbor at dawn.\n A fishing boat rocks against the pier while a gull lands on a rope."'
    fake = Fake(good)
    out = gen.enhance_prompt(fake, "눈 내리는 새벽 항구", has_image=True)
    assert out.startswith("Snow drifts") and "\n" not in out and not out.endswith('"')
    assert "Do NOT describe what the image looks like" in fake.seen[0] and fake.seen[1] == "눈 내리는 새벽 항구"
    assert "Do NOT describe" not in (Fake(good).seen or ("", ""))[0]
    import pytest

    with pytest.raises(Exception):
        gen.enhance_prompt(Fake("ok"), "x")
