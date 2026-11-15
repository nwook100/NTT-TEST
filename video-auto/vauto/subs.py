"""자막: 문장 나누기, 줄바꿈, SRT/ASS 쓰기."""
from __future__ import annotations

import math
import unicodedata
from pathlib import Path

from .timeutil import ass_time, srt_time

CJK = {"ko", "ja", "zh"}
BREAK_AFTER = "。、．，,.!?！？…』」)）] "


def width(text: str) -> int:
    """표시 폭. 한글·한자·가나는 2, 영문·숫자는 1."""
    return sum(2 if unicodedata.east_asian_width(ch) in ("W", "F") else 1 for ch in text)


def limit_units(lang: str, cfg: dict) -> int:
    chars = cfg["max_chars"].get(lang, cfg["max_chars"].get("en", 38))
    return chars * 2 if lang in CJK else chars


def split_segment(seg: dict, lang: str, cfg: dict) -> list[dict]:
    """Whisper 구간 하나를 자막 크기(글자 수·길이)로 나눈다."""
    budget = limit_units(lang, cfg) * cfg.get("max_lines", 2)
    max_sec = cfg.get("max_sec", 6.0)
    text = seg["text"].strip()
    dur = seg["end"] - seg["start"]
    if width(text) <= budget and dur <= max_sec:
        return [{"start": seg["start"], "end": seg["end"], "text": text}]

    words = [w for w in seg.get("words", []) if w["w"].strip()]
    if not words:  # 단어 시각이 없으면 글자 수 비례로 나눈다
        parts = _chunks(text, budget)
        total = sum(len(p) for p in parts) or 1
        out, pos = [], seg["start"]
        for part in parts:
            end = pos + dur * len(part) / total
            out.append({"start": pos, "end": end, "text": part})
            pos = end
        return out

    out, cur = [], []

    def flush() -> None:
        if cur:
            out.append({"start": cur[0]["s"], "end": cur[-1]["e"],
                        "text": "".join(w["w"] for w in cur).strip()})
            cur.clear()

    for word in words:
        joined = "".join(w["w"] for w in cur) + word["w"]
        too_long = cur and width(joined.strip()) > budget
        too_slow = cur and word["e"] - cur[0]["s"] > max_sec
        sentence_end = cur and cur[-1]["w"].strip()[-1:] in "。.!?！？" \
            and width("".join(w["w"] for w in cur).strip()) >= budget * 0.4
        if too_long or too_slow or sentence_end:
            flush()
        cur.append(word)
    flush()
    return out


def _chunks(text: str, budget: int) -> list[str]:
    out, cur = [], ""
    for ch in text:
        cur += ch
        if width(cur) >= budget or (width(cur) >= budget * 0.6 and ch in BREAK_AFTER):
            out.append(cur.strip())
            cur = ""
    if cur.strip():
        out.append(cur.strip())
    return out or [text]


NO_LINE_START = set("、。，．,.!?！？…」』）)]ー々ゝゞぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮ・：；:;％%")
NO_LINE_END = set("「『（([")
PARTICLES = set("はがをにでともへ")


def _is_kata(ch: str) -> bool:
    return "\u30a0" <= ch <= "\u30ff"


def _breaks(text: str, lang: str) -> list[tuple[int, float]]:
    """줄을 나눌 수 있는 위치와 선호도(클수록 좋음)."""
    out = []
    for i in range(1, len(text)):
        prev, cur = text[i - 1], text[i]
        if prev == " ":
            out.append((i, 3.0 if i > 1 and text[i - 2] in BREAK_AFTER else 1.0))
            continue
        if lang not in ("ja", "zh") or cur == " ":
            continue
        if cur in NO_LINE_START or prev in NO_LINE_END:
            continue
        if (_is_kata(prev) and _is_kata(cur)) or (prev.isascii() and cur.isascii()
                                                  and prev.isalnum() and cur.isalnum()):
            continue  # 가타카나 단어·영문 단어·숫자 중간에서는 끊지 않는다
        bonus = 3.0 if prev in BREAK_AFTER else 1.5 if prev in PARTICLES else 0.0
        if "\u4e00" <= prev <= "\u9fff" and "\u4e00" <= cur <= "\u9fff":
            bonus = -4.0  # 한자 숙어 중간은 되도록 피한다
        out.append((i, bonus))
    return out


def wrap(text: str, lang: str, cfg: dict, max_units: int | None = None) -> list[str]:
    """화면 표시용 줄바꿈. 줄 길이를 비슷하게 맞추고 단어 중간에서는 끊지 않는다."""
    text = " ".join(text.split())
    limit = limit_units(lang, cfg)
    if max_units:
        limit = max(8, min(limit, max_units))
    if width(text) <= limit:
        return [text]
    lines = max(2, math.ceil(width(text) / limit))
    out, rest = [], text
    while len(out) < lines - 1:
        target = width(rest) / (lines - len(out))
        best, best_cost = None, None
        for pos, bonus in _breaks(rest, lang):
            cost = abs(width(rest[:pos].rstrip()) - target) - bonus * 1.5
            if best_cost is None or cost < best_cost:
                best, best_cost = pos, cost
        if best is None:
            break
        out.append(rest[:best].strip())
        rest = rest[best:].strip()
    out.append(rest)
    return [line for line in out if line]


def write_srt(path: Path, cues: list[dict], lang: str, cfg: dict) -> None:
    lines = []
    for i, cue in enumerate(cues, 1):
        lines.append(str(i))
        lines.append(f"{srt_time(cue['start'])} --> {srt_time(cue['end'])}")
        lines.extend(wrap(cue["text"], cue.get("lang", lang), cfg))
        lines.append("")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines), encoding="utf-8")


def write_ass(path: Path, cues: list[dict], lang: str, cfg: dict, w: int, h: int) -> None:
    """화면에 태워 넣는 자막 (ffmpeg ass 필터용). 세로 영상은 앱 버튼을 피해 더 위에 둔다."""
    vertical = h > w
    size = round(min(w, h) * cfg["size_ratio"] * (1.1 if vertical else 1.0))
    margin_v = round(h * (0.20 if vertical else cfg["margin_v_ratio"]))
    margin_h = round(w * 0.06)
    # 자동 줄바꿈을 끄고 직접 나누므로, 화면 폭에 들어가는 글자 수를 넘지 않게 한다
    fit_units = int((w - 2 * margin_h) / (size * 0.56))
    fonts = cfg["fonts"]
    head = [
        "[Script Info]", "ScriptType: v4.00+", f"PlayResX: {w}", f"PlayResY: {h}",
        "WrapStyle: 2", "ScaledBorderAndShadow: yes", "YCbCr Matrix: TV.709", "",
        "[V4+ Styles]",
        "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, "
        "Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, "
        "Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
    ]
    for code in sorted({lang, *[c.get("lang", lang) for c in cues]}):
        font = fonts.get(code, fonts.get("en", "Helvetica Neue"))
        head.append(f"Style: {code},{font},{size},&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,"
                    f"1,0,0,0,100,100,0,0,1,{max(2, round(size * 0.09))},0,2,"
                    f"{margin_h},{margin_h},{margin_v},1")
    head += ["", "[Events]",
             "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"]
    for cue in cues:
        code = cue.get("lang", lang)
        text = "\\N".join(wrap(cue["text"], code, cfg, fit_units)).replace("{", "(").replace("}", ")")
        head.append(f"Dialogue: 0,{ass_time(cue['start'])},{ass_time(cue['end'])},{code},,0,0,0,,{text}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(head) + "\n", encoding="utf-8")
