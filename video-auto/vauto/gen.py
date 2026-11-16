"""AI 그림·영상 만들기. Draw Things 의 명령줄 도구(draw-things-cli)를 간단한 형태로 감싼다.

모델 파일 이름, 프레임 수, 화면 크기를 외울 필요 없이 `vauto image`, `vauto clip` 으로 부른다.
모델은 처음 쓸 때 자동으로 내려받는다.
"""
from __future__ import annotations

import shutil
import subprocess
import time
from datetime import datetime
from pathlib import Path

from .util import VautoError, log

# 모델별 (초당 프레임, 프레임 수 규칙 n: 프레임 수는 n의 배수 + 1 이어야 한다)
VIDEO_MODELS = {
    "ltx": ("ltx_model", 24, 8),     # LTX-2.3: 소리까지 함께 생성
    "wan": ("wan_model", 24, 4),     # Wan 2.2 5B: 글 또는 사진 → 영상
    "wan14": ("wan14_model", 16, 4), # Wan 2.2 14B 사진 → 영상 (화질 위주, 시험적)
}


def frames_for(seconds: float, fps: int, step: int) -> int:
    """원하는 길이에 가장 가까운 유효 프레임 수."""
    return max(step + 1, step * round(seconds * fps / step) + 1)


def size_for(kind: str, vertical: bool) -> tuple[int, int]:
    """64의 배수인 화면 크기. 영상은 720p급, 그림은 조금 더 크게."""
    w, h = (1280, 704) if kind == "video" else (1344, 768)
    return (h, w) if vertical else (w, h)


def default_output(out_dir: str, prefix: str, ext: str) -> Path:
    folder = Path(out_dir).expanduser()
    folder.mkdir(parents=True, exist_ok=True)
    return folder / f"{prefix}-{datetime.now().strftime('%Y%m%d-%H%M%S')}.{ext}"


def build_image_cmd(cfg: dict, prompt: str, out: Path, vertical: bool = False, refs: list[str] | None = None,
                    seed: int | None = None) -> list[str]:
    w, h = size_for("image", vertical)
    cmd = [cfg["cli"], "generate", "--model", cfg["image_model"], "--prompt", prompt,
           "--width", str(w), "--height", str(h), "--disable-preview", "--output", str(out)]
    for ref in refs or []:
        cmd += ["--image", str(Path(ref).expanduser())]
    if refs:
        cmd.append("--crop")
    if seed is not None:
        cmd += ["--seed", str(seed)]
    return cmd


def build_clip_cmd(cfg: dict, prompt: str, out: Path, model: str = "ltx", seconds: float = 5.0,
                   vertical: bool = False, image: str | None = None, seed: int | None = None) -> list[str]:
    if model not in VIDEO_MODELS:
        raise VautoError(f"모르는 영상 모델: {model} (ltx, wan, wan14 중에서 고르세요)")
    key, fps, step = VIDEO_MODELS[model]
    if model == "wan14" and not image:
        raise VautoError("wan14 는 사진을 움직이는 모델입니다. --image 로 사진을 주세요.")
    w, h = size_for("video", vertical)
    cmd = [cfg["cli"], "generate", "--model", cfg[key], "--prompt", prompt,
           "--width", str(w), "--height", str(h), "--frames", str(frames_for(seconds, fps, step)),
           "--disable-preview", "--output", str(out)]
    if out.suffix.lower() in (".mp4", ".mov"):
        fmt = cfg.get("video_format", "h264")
        if fmt.startswith("prores") and out.suffix.lower() != ".mov":
            raise VautoError("ProRes 는 .mov 로만 저장할 수 있습니다.")
        cmd += ["--video-format", fmt]
    if image:
        path = Path(image).expanduser()
        if not path.is_file():
            raise VautoError(f"사진 파일이 없습니다: {path}")
        cmd += ["--image", str(path), "--crop"]  # 사진 비율이 달라도 가운데를 잘라 첫 화면으로 쓴다
    if seed is not None:
        cmd += ["--seed", str(seed)]
    return cmd


PATCHED_CLI = "draw-things-cli-sdk26"


def resolve_cli(name: str) -> str:
    """기본 도구 이름이면, fix-draw-things-cli.sh 가 만든 고친 사본을 먼저 쓴다."""
    if name == "draw-things-cli" and shutil.which(PATCHED_CLI):
        return PATCHED_CLI
    return name


def run_cli(cmd: list[str], out: Path, dry_run: bool = False) -> float:
    """명령을 실행하고 걸린 시간(초)을 돌려준다. 진행 상황은 그대로 화면에 보인다."""
    cmd = [resolve_cli(cmd[0]), *cmd[1:]]
    shown = " ".join(f'"{c}"' if " " in c else c for c in cmd)
    if dry_run:
        print(shown)
        return 0.0
    if not shutil.which(cmd[0]):
        raise VautoError(f"{cmd[0]} 가 없습니다. 먼저: brew install draw-things-cli")
    log(f"  실행: {shown}")
    started = time.time()
    proc = subprocess.run(cmd)
    elapsed = time.time() - started
    if proc.returncode != 0:
        hint = ""
        if cmd[0] == "draw-things-cli":
            hint = ("\n  'bfloat' 오류라면 Homebrew 판의 알려진 문제입니다. 한 번만 실행하세요: "
                    "~/NTT-TEST/video-auto/fix-draw-things-cli.sh")
        raise VautoError(f"생성 실패 (종료 코드 {proc.returncode}). 위 오류 문구를 확인하세요.{hint}")
    if not out.exists():
        raise VautoError(f"명령은 끝났지만 결과 파일이 없습니다: {out}")
    return elapsed
