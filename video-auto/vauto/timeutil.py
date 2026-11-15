"""시간·프레임 계산. FCPXML 은 모든 시간이 프레임 경계의 유리수여야 한다."""
from __future__ import annotations

import re
from fractions import Fraction

STANDARD_RATES = [
    Fraction(24000, 1001), Fraction(24), Fraction(25),
    Fraction(30000, 1001), Fraction(30),
    Fraction(48000, 1001), Fraction(48), Fraction(50),
    Fraction(60000, 1001), Fraction(60),
    Fraction(100), Fraction(120000, 1001), Fraction(120),
]

# FCPXML conform-rate 의 srcFrameRate 표기
RATE_LABEL = {
    Fraction(24000, 1001): "23.98", Fraction(24): "24", Fraction(25): "25",
    Fraction(30000, 1001): "29.97", Fraction(30): "30",
    Fraction(48000, 1001): "47.95", Fraction(48): "48", Fraction(50): "50",
    Fraction(60000, 1001): "59.94", Fraction(60): "60",
    Fraction(100): "100", Fraction(120000, 1001): "119.88", Fraction(120): "120",
}


def parse_rate(text: str | None) -> Fraction | None:
    """ffprobe 의 '30000/1001' 같은 표기를 Fraction 으로."""
    if not text or text in ("0/0", "N/A"):
        return None
    try:
        if "/" in text:
            n, d = text.split("/")
            if int(d) == 0:
                return None
            return Fraction(int(n), int(d))
        return Fraction(text).limit_denominator(100000)
    except (ValueError, ZeroDivisionError):
        return None


def snap_rate(rate: Fraction) -> Fraction:
    """가변 프레임레이트 등으로 어긋난 값을 가장 가까운 표준 프레임레이트로 맞춘다."""
    return min(STANDARD_RATES, key=lambda r: abs(float(r) - float(rate)))


def to_frames(seconds: float | Fraction, rate: Fraction) -> int:
    return int(round(float(seconds) * float(rate)))


def frames_to_time(frames: int, rate: Fraction) -> Fraction:
    return Fraction(frames * rate.denominator, rate.numerator)


def fcp_time(value: Fraction | int) -> str:
    """FCPXML 시간 문자열. 예: 1001/30000s, 5s"""
    value = Fraction(value)
    if value.denominator == 1:
        return f"{value.numerator}s"
    return f"{value.numerator}/{value.denominator}s"


def timecode_to_frames(tc: str, rate: Fraction) -> tuple[int, bool]:
    """'01:00:00;02' → (프레임 수, 드롭프레임 여부)."""
    drop = ";" in tc or "," in tc
    parts = re.split(r"[:;.,]", tc.strip())
    if len(parts) != 4:
        raise ValueError(f"timecode 형식 오류: {tc}")
    h, m, s, f = (int(p) for p in parts)
    nominal = int(round(float(rate)))
    total = ((h * 60 + m) * 60 + s) * nominal + f
    if drop and rate.denominator == 1001 and nominal in (30, 60):
        per_min = 2 if nominal == 30 else 4
        minutes = h * 60 + m
        total -= per_min * (minutes - minutes // 10)
    else:
        drop = False
    return total, drop


def srt_time(seconds: float) -> str:
    ms = int(round(max(0.0, seconds) * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def ass_time(seconds: float) -> str:
    cs = int(round(max(0.0, seconds) * 100))
    h, cs = divmod(cs, 360000)
    m, cs = divmod(cs, 6000)
    s, cs = divmod(cs, 100)
    return f"{h:d}:{m:02d}:{s:02d}.{cs:02d}"


def clock(seconds: float) -> str:
    seconds = int(round(seconds))
    h, rem = divmod(seconds, 3600)
    m, s = divmod(rem, 60)
    return f"{h:d}:{m:02d}:{s:02d}" if h else f"{m:d}:{s:02d}"
