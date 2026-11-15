#!/bin/bash
# =============================================================
#  영상 자동 편집 도구(vauto) 설치 — Mac Studio (Apple Silicon)
#  먼저 ../local-llm/setup-mac-studio.sh 로 Ollama 를 설치해 두세요.
#  사용법:  ./setup-video.sh
# =============================================================
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
log()  { printf '\n\033[1;34m[%s]\033[0m %s\n' "$(date +%H:%M:%S)" "$*"; }
ok()   { printf '\033[1;32m  ✔ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m  ! %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m  ✖ %s\033[0m\n' "$*"; exit 1; }

[[ "$(uname -s)" == "Darwin" && "$(uname -m)" == "arm64" ]] || die "Apple Silicon Mac 전용입니다."
command -v brew >/dev/null 2>&1 || die "Homebrew 가 없습니다. ../local-llm/setup-mac-studio.sh 를 먼저 실행하세요."

log "ffmpeg 설치"
command -v ffmpeg >/dev/null 2>&1 || brew install ffmpeg
has_filters() { "$1" -hide_banner -filters 2>/dev/null | grep -q " zscale " && "$1" -hide_banner -filters 2>/dev/null | grep -q " ass "; }
if has_filters ffmpeg; then
  ok "ffmpeg 필터 확인 (자막, HDR 변환)"
else
  warn "기본 ffmpeg 에 자막/HDR 필터가 없어 전체판(ffmpeg-full)을 설치합니다."
  brew install ffmpeg-full
  has_filters /opt/homebrew/opt/ffmpeg-full/bin/ffmpeg || die "ffmpeg-full 에도 필요한 필터가 없습니다."
  ok "ffmpeg-full 설치 (va 실행 시 자동으로 사용)"
fi

log "uv (파이썬 실행 도구) 설치"
command -v uv >/dev/null 2>&1 || brew install uv
ok "$(uv --version)"

log "파이썬 환경과 음성 인식(mlx-whisper) 설치"
uv sync --project "$DIR" --python 3.12
ok "설치 완료"

log "음성 인식 모델 내려받기 (약 3GB, 처음 한 번)"
uv run --quiet --project "$DIR" python - <<'PY' || warn "모델 받기 실패. 첫 실행 때 자동으로 다시 받습니다."
from huggingface_hub import snapshot_download
print("  저장 위치:", snapshot_download("mlx-community/whisper-large-v3-mlx"))
PY

log "명령어 등록"
chmod +x "$DIR/va"
if [[ -d /opt/homebrew/bin ]]; then
  ln -sf "$DIR/va" /opt/homebrew/bin/vauto && ok "어디서나 'vauto' 로 실행할 수 있습니다."
fi

log "점검"
"$DIR/va" doctor || warn "✖ 항목을 확인하세요. LLM 항목은 Ollama 가 켜져 있고 모델을 받은 뒤 통과합니다."

cat <<SUMMARY

  ───────────────────────────────────────────
   사용법:   vauto run "/Volumes/외장SSD/촬영폴더"
   설정:     cp "$DIR/project.example.toml" 촬영폴더/project.toml
             vauto run 촬영폴더 --project 촬영폴더/project.toml
   결과:     촬영폴더/_vauto/  (report.md 부터 보세요)
  ───────────────────────────────────────────
SUMMARY
