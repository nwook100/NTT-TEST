"""공통 도우미."""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path


class VautoError(RuntimeError):
    pass


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


def need(binary: str) -> str:
    path = shutil.which(binary)
    if not path:
        raise VautoError(f"{binary} 를 찾을 수 없습니다. setup-video.sh 를 먼저 실행하세요.")
    return path


def run(cmd: list[str], cwd: Path | None = None, binary: bool = False) -> subprocess.CompletedProcess:
    """명령 실행. 실패하면 stderr 끝부분을 담아 예외를 던진다."""
    proc = subprocess.run(cmd, cwd=cwd, capture_output=True, text=not binary)
    if proc.returncode != 0:
        err = proc.stderr if isinstance(proc.stderr, str) else proc.stderr.decode("utf-8", "replace")
        tail = "\n".join(err.strip().splitlines()[-12:])
        raise VautoError(f"명령 실패 ({cmd[0]}):\n{tail}")
    return proc


def write_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))
