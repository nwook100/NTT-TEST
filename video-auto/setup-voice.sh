#!/bin/bash
# =============================================================
#  내 목소리 내레이션 기능 설치 (vauto voice)
#  먼저 setup-video.sh 를 실행해 두세요.
#  사용법:  ./setup-voice.sh           # 애플 MLX 방식 (권장, 빠름)
#           ./setup-voice.sh --torch   # MLX 가 안 될 때 쓰는 PyTorch 방식
# =============================================================
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
log()  { printf '\n\033[1;34m[%s]\033[0m %s\n' "$(date +%H:%M:%S)" "$*"; }
ok()   { printf '\033[1;32m  ✔ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m  ! %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m  ✖ %s\033[0m\n' "$*"; exit 1; }

MODE="voice-mlx"
[[ "${1:-}" == "--torch" ]] && MODE="voice-torch"
[[ "$(uname -s)" == "Darwin" && "$(uname -m)" == "arm64" ]] || die "Apple Silicon Mac 전용입니다."
[[ -x /opt/homebrew/bin/brew ]] && eval "$(/opt/homebrew/bin/brew shellenv)"
command -v uv >/dev/null 2>&1 || die "uv 가 없습니다. setup-video.sh 를 먼저 실행하세요."

if [[ "$MODE" == "voice-torch" ]]; then
  log "소리 처리 도구(sox) 설치"
  command -v sox >/dev/null 2>&1 || brew install sox
  MODEL="Qwen/Qwen3-TTS-12Hz-1.7B-Base"
  CHECK="import qwen_tts, torch; print('PyTorch', torch.__version__)"
else
  MODEL="mlx-community/Qwen3-TTS-12Hz-1.7B-Base-bf16"
  CHECK="import mlx_audio, mlx.core as mx; from mlx_audio.tts.utils import load_model; print('mlx-audio 준비됨')"
fi

log "음성 합성 부품 설치 (${MODE})"
uv sync --project "$DIR" --python 3.12 --extra "$MODE"
echo "$MODE" > "$DIR/.voice-extra"
uv run --quiet --project "$DIR" --extra "$MODE" python -c "$CHECK" || die "부품을 불러오지 못했습니다."
ok "설치 완료"

log "음성 모델 내려받기 (수 GB, 처음 한 번)"
uv run --quiet --project "$DIR" --extra "$MODE" python - "$MODEL" <<'PY' || warn "모델 받기 실패. 첫 실행 때 자동으로 다시 받습니다."
import sys
from huggingface_hub import snapshot_download
print("  저장 위치:", snapshot_download(sys.argv[1]))
PY

cat <<SUMMARY

  ───────────────────────────────────────────
   1) 목소리 등록 (한 번):   vauto voice-add ~/Desktop/voice.m4a
   2) 대본으로 만들기:       vauto voice ~/Desktop/대본.txt
      주제만 주고 만들기:    vauto voice --topic "삿포로 여행 첫날, 항구와 시장"
      영상에 입히기:         vauto voice ~/Desktop/대본.txt --video ~/Desktop/영상.mp4
   결과: 대본이 있는 폴더의 _voice/  (한국어·영어·일본어 음성과 자막)
  ───────────────────────────────────────────
SUMMARY
