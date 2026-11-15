"""ffmpeg 로 완성 파일을 만든다 (Final Cut 없이도 바로 올릴 수 있는 파일)."""
from __future__ import annotations

import platform
import shutil
import subprocess
from fractions import Fraction
from functools import lru_cache
from pathlib import Path

from . import analyze, subs
from .probe import Clip
from .timeutil import frames_to_time
from .util import VautoError, log, run


@lru_cache(maxsize=1)
def _encoders() -> str:
    return subprocess.run(["ffmpeg", "-hide_banner", "-encoders"], capture_output=True, text=True).stdout


def pick_encoder(codec: str) -> tuple[str, list[str], str]:
    """(인코더 이름, 추가 옵션, 픽셀 형식)"""
    enc = _encoders()
    if codec == "hevc":
        if " hevc_videotoolbox " in enc:
            return "hevc_videotoolbox", ["-profile:v", "main10", "-allow_sw", "1", "-tag:v", "hvc1"], "p010le"
        if " libx265 " in enc:
            return "libx265", ["-preset", "fast", "-x265-params", "log-level=error", "-tag:v", "hvc1"], "yuv420p10le"
        raise VautoError("HEVC 인코더가 없습니다.")
    if " h264_videotoolbox " in enc:
        return "h264_videotoolbox", ["-profile:v", "high", "-allow_sw", "1"], "yuv420p"
    if " libx264 " in enc:
        return "libx264", ["-preset", "veryfast", "-profile:v", "high"], "yuv420p"
    raise VautoError("H.264 인코더가 없습니다.")


def bitrate(width: int, height: int, rate: Fraction) -> str:
    """유튜브 권장 비트레이트 범위 안에서 고른다 (SDR 기준)."""
    pixels, fast = width * height, float(rate) > 31
    table = [(7680 * 4320, 120, 180), (3840 * 2160, 40, 60), (2560 * 1440, 16, 24),
             (1920 * 1080, 10, 15), (0, 6, 9)]
    for limit, slow_mbps, fast_mbps in table:
        if pixels >= limit * 0.9:
            return f"{fast_mbps if fast else slow_mbps}M"
    return "6M"


def target_size(tcfg: dict, tl: dict) -> tuple[int, int]:
    if tcfg["size"] == "source":
        w, h = tl["width"], tl["height"]
    else:
        w, h = (int(x) for x in tcfg["size"].lower().split("x"))
    return w - w % 2, h - h % 2


def video_filter(clip: Clip, w: int, h: int, rate: Fraction, fit: str, corr_lut: str,
                 pix: str, ass: str | None, input_lut: str = "", look_lut: str = "") -> str:
    chain = []
    if fit == "crop":
        chain += [f"scale={w}:{h}:force_original_aspect_ratio=increase:flags=lanczos", f"crop={w}:{h}"]
    else:
        chain += [f"scale={w}:{h}:force_original_aspect_ratio=decrease:flags=lanczos",
                  f"pad={w}:{h}:(ow-iw)/2:(oh-ih)/2:black"]
    chain += ["setsar=1", f"fps={rate.numerator}/{rate.denominator}"]
    chain += analyze.tonemap_chain(clip)
    color = analyze.color_chain(input_lut, corr_lut, look_lut)
    if color:
        chain += analyze.to_rgb_chain(clip)
        chain += color
        chain += ["scale=out_color_matrix=bt709:out_range=tv", "format=yuv420p10le"]
    if ass:
        chain.append(f"ass={ass}")
    chain.append(f"format={pix}")
    return ",".join(chain)


def render_target(name: str, tcfg: dict, tl: dict, clips: list[Clip], corrections: dict[int, dict],
                  cfg: dict, out_path: Path, work: Path, burn_lang: str | None,
                  luts: dict[str, str] | None = None) -> Path:
    """타임라인 조각을 하나씩 인코딩한 뒤 이어 붙인다."""
    w, h = target_size(tcfg, tl)
    rate = tl["rate"] if float(tl["rate"]) <= 60 else Fraction(60)
    encoder, enc_opts, pix = pick_encoder(tcfg.get("codec", "h264"))
    if encoder.startswith("h264") or encoder == "libx264":
        if w * h > 4096 * 2304:
            raise VautoError(f"{name}: H.264 는 4K 를 넘는 해상도에 맞지 않습니다. codec = \"hevc\" 로 바꾸세요.")
    rate_opt = bitrate(w, h, rate)
    work.mkdir(parents=True, exist_ok=True)
    lut_names = {}
    for kind, src in (luts or {}).items():  # 경로에 공백·한글이 있어도 되도록 작업 폴더로 복사
        if src:
            shutil.copyfile(src, work / f"{kind}.cube")
            lut_names[kind] = f"{kind}.cube"
    hw = ["-hwaccel", "videotoolbox"] if platform.system() == "Darwin" else []

    parts = []
    for i, item in enumerate(tl["items"]):
        clip = clips[item["clip"]]
        frames = item["frames"]
        dur = float(frames_to_time(frames, tl["rate"]))
        out_frames = max(1, round(dur * float(rate)))
        ass_name = None
        if burn_lang:
            cues = [dict(c, start=c["start"] - float(item["src_in"]), end=c["end"] - float(item["src_in"]))
                    for c in item["cues"].get(burn_lang, [])]
            if cues:
                ass_name = f"seg_{i:04d}.ass"
                subs.write_ass(work / ass_name, cues, burn_lang if burn_lang != "source" else (item["lang"] or "en"),
                               cfg["subtitles"], w, h)
        corr = corrections.get(clip.index)
        corr_lut = ""
        if corr and not analyze.is_identity(corr):
            corr_lut = f"corr_{clip.index:03d}.cube"
            if not (work / corr_lut).exists():
                analyze.write_cube(work / corr_lut, corr)
        vf = video_filter(clip, w, h, rate, tcfg.get("fit", "fit"), corr_lut,
                          pix, ass_name, lut_names.get("input", ""), lut_names.get("look", ""))
        fade = min(0.01, dur / 4)
        af = (f"aresample=48000,aformat=sample_fmts=s16:channel_layouts=stereo,apad,atrim=duration={dur:.6f},"
              f"afade=t=in:d={fade},afade=t=out:st={dur - fade:.6f}:d={fade}")
        cmd = ["ffmpeg", "-v", "error", "-y", *hw, "-ss", f"{float(item['src_in']):.6f}",
               "-t", f"{dur + 0.5:.6f}", "-i", clip.path]
        if clip.has_audio:
            graph = f"[0:v:0]{vf}[v];[0:a:0]{af}[a]"
        else:
            cmd += ["-f", "lavfi", "-t", f"{dur:.6f}", "-i", "anullsrc=r=48000:cl=stereo"]
            graph = f"[0:v:0]{vf}[v];[1:a:0]{af}[a]"
        seg = work / f"seg_{i:04d}.mov"
        cmd += ["-filter_complex", graph, "-map", "[v]", "-map", "[a]", "-frames:v", str(out_frames),
                "-c:v", encoder, *enc_opts, "-b:v", rate_opt,
                "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
                "-c:a", "pcm_s16le", "-t", f"{dur:.6f}", seg.name]
        run(cmd, cwd=work)
        parts.append(seg.name)
        log(f"      {name}: {i + 1}/{len(tl['items'])}")

    (work / "list.txt").write_text("".join(f"file '{p}'\n" for p in parts), encoding="utf-8")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    lufs = cfg["render"].get("audio_lufs", -14.0)
    tag = ["-tag:v", "hvc1"] if "hevc" in encoder or encoder == "libx265" else []
    run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", "list.txt",
         "-c:v", "copy", *tag, "-af", f"loudnorm=I={lufs}:TP=-1.5:LRA=11", "-ar", "48000",
         "-c:a", "aac", "-b:a", "320k", "-movflags", "+faststart", str(out_path.resolve())], cwd=work)
    if not cfg["render"].get("keep_segments"):
        shutil.rmtree(work, ignore_errors=True)
    return out_path
