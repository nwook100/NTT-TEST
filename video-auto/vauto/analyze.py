"""오디오 추출, 침묵 감지, 색 통계."""
from __future__ import annotations

import re
import subprocess
from pathlib import Path

from .probe import Clip
from .util import need, run

STAT_W, STAT_H, STAT_SAMPLES = 64, 36, 8


def extract_audio(clip: Clip, wav: Path) -> Path:
    """음성 인식용 16kHz 모노 WAV."""
    if not wav.exists():
        wav.parent.mkdir(parents=True, exist_ok=True)
        run(["ffmpeg", "-v", "error", "-y", "-i", clip.path, "-vn", "-ac", "1", "-ar", "16000",
             "-c:a", "pcm_s16le", str(wav)])
    return wav


def detect_silence(clip: Clip, noise_db: float = -35.0, min_len: float = 0.35) -> list[tuple[float, float]]:
    """침묵 구간 목록. 소리가 없는 클립은 전체가 침묵."""
    if not clip.has_audio:
        return [(0.0, clip.duration)]
    need("ffmpeg")
    proc = subprocess.run(
        ["ffmpeg", "-v", "info", "-nostats", "-i", clip.path, "-vn",
         "-af", f"silencedetect=noise={noise_db}dB:d={min_len}", "-f", "null", "-"],
        capture_output=True, text=True)
    silences: list[tuple[float, float]] = []
    start = None
    for line in proc.stderr.splitlines():
        m = re.search(r"silence_start: (-?[\d.]+)", line)
        if m:
            start = max(0.0, float(m.group(1)))
        m = re.search(r"silence_end: (-?[\d.]+)", line)
        if m and start is not None:
            silences.append((start, min(clip.duration, float(m.group(1)))))
            start = None
    if start is not None:
        silences.append((start, clip.duration))
    return silences


def sound_intervals(clip: Clip, silences: list[tuple[float, float]]) -> list[tuple[float, float]]:
    out, pos = [], 0.0
    for s, e in silences:
        if s - pos > 0.05:
            out.append((pos, s))
        pos = max(pos, e)
    if clip.duration - pos > 0.05:
        out.append((pos, clip.duration))
    return out


def overlap(a0: float, a1: float, spans: list[tuple[float, float]]) -> float:
    return sum(max(0.0, min(a1, e) - max(a0, s)) for s, e in spans)


# ---------- 색 ----------

def tonemap_chain(clip: Clip) -> list[str]:
    """HDR(HLG/PQ) 원본을 SDR Rec.709 로 내리는 필터."""
    if clip.hdr == "sdr":
        return []
    return ["zscale=t=linear:npl=100", "format=gbrpf32le", "zscale=p=bt709",
            "tonemap=tonemap=hable:desat=0", "zscale=t=bt709:m=bt709:r=tv", "format=yuv420p10le"]


def to_rgb_chain(clip: Clip, pix: str = "gbrp10le") -> list[str]:
    """YUV → RGB. 태그가 없는 HD 영상은 Rec.709 로 해석한다."""
    matrix = "bt709"
    if clip.hdr == "sdr" and clip.color_space in ("bt470bg", "smpte170m"):
        matrix = "bt601"
    # 앞단 형식을 YUV 로 고정해야 바로 다음 scale 이 지정한 행렬로 RGB 변환을 맡는다.
    return ["format=yuv420p10le", f"scale=in_color_matrix={matrix}", f"format={pix}"]


def color_stats(clip: Clip, input_lut: str = "", cwd: Path | None = None) -> dict | None:
    """클립에서 8장을 뽑아 평균색과 밝기 분포를 구한다."""
    need("ffmpeg")
    chain = [f"scale={STAT_W}:{STAT_H}:flags=area"] + tonemap_chain(clip) + to_rgb_chain(clip, "rgb24")
    if input_lut:
        chain.append(f"lut3d=file={input_lut}")
        chain.append("format=rgb24")
    vf = ",".join(chain)
    pixels: list[tuple[float, float, float]] = []
    for i in range(STAT_SAMPLES):
        t = clip.duration * (i + 0.5) / STAT_SAMPLES
        proc = subprocess.run(
            ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", clip.path, "-frames:v", "1",
             "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
            capture_output=True, cwd=cwd)
        data = proc.stdout
        if proc.returncode != 0 or len(data) < STAT_W * STAT_H * 3:
            continue
        for p in range(0, STAT_W * STAT_H * 3, 3):
            pixels.append((data[p] / 255.0, data[p + 1] / 255.0, data[p + 2] / 255.0))
    if not pixels:
        return None
    luma = sorted(0.2126 * r + 0.7152 * g + 0.0722 * b for r, g, b in pixels)
    mids = [(r, g, b) for r, g, b in pixels if 0.05 < 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.95]
    if len(mids) < len(pixels) * 0.1:
        mids = pixels
    n = len(mids)

    def pct(q: float) -> float:
        return luma[min(len(luma) - 1, int(q * len(luma)))]

    return {
        "r": sum(p[0] for p in mids) / n, "g": sum(p[1] for p in mids) / n, "b": sum(p[2] for p in mids) / n,
        "p01": pct(0.01), "p50": pct(0.50), "p99": pct(0.99), "frames": len(pixels) // (STAT_W * STAT_H),
    }


def _clamp(x: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, x))


def correction(stats: dict | None, strength: float, saturation: float = 1.0) -> dict:
    """통계 → 보정값. 화이트밸런스(회색 세계 가정), 레벨, 중간톤 감마."""
    import math

    corr = {"gain": [1.0, 1.0, 1.0], "lo": 0.0, "hi": 1.0, "gamma": 1.0, "saturation": saturation}
    if not stats or strength <= 0:
        return corr
    r, g, b = max(stats["r"], 1e-3), max(stats["g"], 1e-3), max(stats["b"], 1e-3)
    gray = (r + g + b) / 3
    gains = [1 + (_clamp(gray / c, 0.88, 1.12) - 1) * strength for c in (r, g, b)]
    norm = 0.2126 * gains[0] + 0.7152 * gains[1] + 0.0722 * gains[2]
    corr["gain"] = [round(x / norm, 4) for x in gains]

    lo = _clamp(stats["p01"], 0.0, 0.12) * strength if stats["p01"] > 0.03 else 0.0
    hi = 1 - _clamp(1 - stats["p99"], 0.0, 0.25) * strength if stats["p99"] < 0.95 else 1.0
    corr["lo"], corr["hi"] = round(lo, 4), round(hi, 4)

    mid = (stats["p50"] - lo) / max(hi - lo, 1e-3)
    if 0.02 < mid < 0.98:
        gamma = _clamp(math.log(mid) / math.log(0.42), 0.85, 1.25)
        corr["gamma"] = round(1 + (gamma - 1) * strength * 0.6, 4)
    return corr


def apply_correction(rgb: tuple[float, float, float], corr: dict) -> tuple[float, float, float]:
    """보정값을 색 하나에 적용 (0~1, Rec.709 감마 값 기준)."""
    gr, gg, gb = corr["gain"]
    s = corr.get("saturation", 1.0)
    r, g, b = rgb[0] * gr, rgb[1] * gg, rgb[2] * gb
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    out = []
    span = max(corr["hi"] - corr["lo"], 1e-3)
    for value in (r, g, b):
        value = luma + (value - luma) * s
        value = _clamp((value - corr["lo"]) / span, 0.0, 1.0)
        out.append(value ** (1.0 / corr["gamma"]))
    return out[0], out[1], out[2]


def is_identity(corr: dict) -> bool:
    return (all(abs(x - 1) < 1e-4 for x in corr["gain"]) and corr["lo"] == 0 and corr["hi"] == 1
            and abs(corr["gamma"] - 1) < 0.005 and abs(corr.get("saturation", 1.0) - 1) < 1e-4)


def write_cube(path: Path, corr: dict, size: int = 33, title: str = "vauto") -> None:
    """보정값을 3D LUT(.cube) 로 저장. ffmpeg 과 Final Cut(사용자 설정 LUT) 모두에서 쓸 수 있다."""
    lines = [f'TITLE "{title}"', f"LUT_3D_SIZE {size}", "DOMAIN_MIN 0.0 0.0 0.0", "DOMAIN_MAX 1.0 1.0 1.0"]
    step = 1.0 / (size - 1)
    for bi in range(size):          # .cube 는 R 이 가장 빨리 변한다
        for gi in range(size):
            for ri in range(size):
                r, g, b = apply_correction((ri * step, gi * step, bi * step), corr)
                lines.append(f"{r:.6f} {g:.6f} {b:.6f}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="ascii")


def color_chain(input_lut: str = "", corr_lut: str = "", look_lut: str = "") -> list[str]:
    """RGB 상태에서 적용하는 보정 필터. 모두 3D LUT 이라 비트 심도와 ffmpeg 버전에 영향받지 않는다."""
    return [f"lut3d=file={name}:interp=tetrahedral" for name in (input_lut, corr_lut, look_lut) if name]
