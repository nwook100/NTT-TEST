"""ffprobe 로 클립 정보를 읽는다."""
from __future__ import annotations

import hashlib
import json
from dataclasses import asdict, dataclass, field
from fractions import Fraction
from pathlib import Path

from .timeutil import parse_rate, snap_rate
from .util import VautoError, need, run

VIDEO_EXT = {".mov", ".mp4", ".m4v", ".mxf", ".mts", ".m2ts", ".avi", ".mkv", ".braw", ".insv", ".360"}


@dataclass
class Clip:
    index: int
    path: str
    name: str
    duration: float
    width: int
    height: int
    fps_num: int
    fps_den: int
    raw_fps: float
    codec: str = ""
    pix_fmt: str = ""
    bit_depth: int = 8
    color_transfer: str = ""
    color_primaries: str = ""
    color_space: str = ""
    hdr: str = "sdr"            # sdr | hlg | pq
    rotation: int = 0
    has_audio: bool = False
    audio_rate: int = 0
    audio_channels: int = 0
    timecode: str = ""
    created: str = ""
    size: int = 0
    warnings: list[str] = field(default_factory=list)

    @property
    def fps(self) -> Fraction:
        return Fraction(self.fps_num, self.fps_den)

    @property
    def vertical(self) -> bool:
        return self.height > self.width

    @property
    def key(self) -> str:
        """캐시 키. 경로·크기·길이가 같으면 같은 파일로 본다."""
        raw = f"{self.path}|{self.size}|{self.duration:.3f}"
        return hashlib.sha1(raw.encode()).hexdigest()[:12]

    def to_dict(self) -> dict:
        return asdict(self)


def find_videos(folder: Path) -> list[Path]:
    files = [p for p in sorted(folder.rglob("*"))
             if p.is_file() and p.suffix.lower() in VIDEO_EXT and not p.name.startswith(".")
             and not any(part.startswith("_vauto") for part in p.relative_to(folder).parts)]
    return files


def _rotation(stream: dict) -> int:
    for side in stream.get("side_data_list", []) or []:
        if "rotation" in side:
            try:
                return int(round(float(side["rotation"]))) % 360
            except (TypeError, ValueError):
                pass
    try:
        return int(stream.get("tags", {}).get("rotate", 0)) % 360
    except (TypeError, ValueError):
        return 0


def probe(path: Path, index: int = 0) -> Clip:
    need("ffprobe")
    out = run(["ffprobe", "-v", "error", "-print_format", "json",
               "-show_format", "-show_streams", str(path)]).stdout
    info = json.loads(out)
    streams = info.get("streams", [])
    video = next((s for s in streams if s.get("codec_type") == "video"
                  and s.get("disposition", {}).get("attached_pic", 0) == 0), None)
    if not video:
        raise VautoError(f"영상 스트림이 없습니다: {path}")
    audio = next((s for s in streams if s.get("codec_type") == "audio"), None)
    fmt = info.get("format", {})

    warnings: list[str] = []
    raw = parse_rate(video.get("avg_frame_rate")) or parse_rate(video.get("r_frame_rate"))
    if raw is None or raw <= 0:
        raw = Fraction(30)
        warnings.append("프레임레이트를 읽지 못해 30fps 로 가정")
    fps = snap_rate(raw)
    if abs(float(fps) - float(raw)) / float(fps) > 0.01:
        warnings.append(f"비표준 프레임레이트 {float(raw):.3f} → {float(fps):.3f} 로 맞춤 (가변 프레임레이트일 수 있음)")

    duration = float(video.get("duration") or fmt.get("duration") or 0)
    if duration <= 0:
        raise VautoError(f"길이를 읽지 못했습니다: {path}")

    rotation = _rotation(video)
    width, height = int(video["width"]), int(video["height"])
    if rotation in (90, 270):
        width, height = height, width

    transfer = video.get("color_transfer", "") or ""
    hdr = "hlg" if transfer == "arib-std-b67" else "pq" if transfer == "smpte2084" else "sdr"
    pix = video.get("pix_fmt", "") or ""
    depth = 10 if "10" in pix else 12 if "12" in pix else 8

    timecode = ""
    for s in [video] + [s for s in streams if s.get("codec_tag_string") == "tmcd"]:
        timecode = s.get("tags", {}).get("timecode", "") or timecode
    timecode = timecode or fmt.get("tags", {}).get("timecode", "")

    tags = fmt.get("tags", {})
    created = tags.get("com.apple.quicktime.creationdate") or tags.get("creation_time", "")

    return Clip(
        index=index, path=str(path), name=path.stem, duration=duration,
        width=width, height=height, fps_num=fps.numerator, fps_den=fps.denominator,
        raw_fps=float(raw), codec=video.get("codec_name", ""), pix_fmt=pix, bit_depth=depth,
        color_transfer=transfer, color_primaries=video.get("color_primaries", "") or "",
        color_space=video.get("color_space", "") or "", hdr=hdr, rotation=rotation,
        has_audio=audio is not None,
        audio_rate=int(audio.get("sample_rate", 0)) if audio else 0,
        audio_channels=int(audio.get("channels", 0)) if audio else 0,
        timecode=timecode, created=created, size=path.stat().st_size, warnings=warnings,
    )


def probe_folder(folder: Path) -> list[Clip]:
    files = find_videos(folder)
    if not files:
        raise VautoError(f"영상 파일이 없습니다: {folder}")
    clips = []
    for path in files:
        clips.append(probe(path))
    # 촬영 시각 순, 시각이 없으면 파일 이름 순
    clips.sort(key=lambda c: (c.created or "9999", c.name))
    for i, clip in enumerate(clips):
        clip.index = i
    return clips
