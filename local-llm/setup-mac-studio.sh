#!/bin/bash
# =============================================================
#  Mac Studio 로컬 LLM 설치 스크립트 (Ollama + Open WebUI)
#  사용법:
#    chmod +x setup-mac-studio.sh
#    ./setup-mac-studio.sh            # 대화형 (추천 모델 확인 후 설치)
#    ./setup-mac-studio.sh -y         # 묻지 않고 바로 설치
#    ./setup-mac-studio.sh --no-webui # Open WebUI 생략, Ollama만
#    ./setup-mac-studio.sh --models-dir /Volumes/외장SSD/ollama
#                                     # 모델을 외장 SSD 에 저장 (APFS 권장)
# =============================================================
set -euo pipefail

AUTO_YES=0
INSTALL_WEBUI=1
MODELS_DIR=""
while (( $# )); do
  case "$1" in
    -y|--yes) AUTO_YES=1 ;;
    --no-webui) INSTALL_WEBUI=0 ;;
    --models-dir) [[ $# -ge 2 ]] || { echo "--models-dir 뒤에 경로가 필요합니다"; exit 1; }; shift; MODELS_DIR="$1" ;;
    --models-dir=*) MODELS_DIR="${1#*=}" ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "알 수 없는 옵션: $1"; exit 1 ;;
  esac
  shift
done

log()  { printf '\n\033[1;34m[%s]\033[0m %s\n' "$(date +%H:%M:%S)" "$*"; }
ok()   { printf '\033[1;32m  ✔ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m  ! %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m  ✖ %s\033[0m\n' "$*"; exit 1; }

# ---------- 0. 환경 확인 ----------
log "환경 확인"
[[ "$(uname -s)" == "Darwin" ]] || die "macOS 전용 스크립트입니다."
[[ "$(uname -m)" == "arm64" ]]  || die "Apple Silicon(arm64) 전용입니다."

CHIP="$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo 'Apple Silicon')"
MEM_BYTES="$(sysctl -n hw.memsize)"
MEM_GB=$(( MEM_BYTES / 1024 / 1024 / 1024 ))
DISK_FREE_GB="$(df -g / | awk 'NR==2 {print $4}')"
ok "칩: $CHIP"
ok "통합 메모리: ${MEM_GB}GB"
ok "디스크 여유: ${DISK_FREE_GB}GB"
(( DISK_FREE_GB >= 60 )) || warn "디스크 여유가 60GB 미만입니다. 큰 모델은 받지 못할 수 있습니다."

# ---------- 1. Xcode CLT / Homebrew ----------
log "Homebrew 확인"
if ! xcode-select -p >/dev/null 2>&1; then
  warn "Xcode Command Line Tools 설치 창이 뜹니다. 설치 후 스크립트를 다시 실행하세요."
  xcode-select --install || true
  exit 0
fi
if ! command -v brew >/dev/null 2>&1; then
  log "Homebrew 설치 (비밀번호를 물어볼 수 있습니다)"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> "$HOME/.zprofile"
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi
ok "brew $(brew --version | head -1)"

# ---------- 2. Ollama ----------
log "Ollama 설치"
if ! command -v ollama >/dev/null 2>&1; then
  brew install ollama
fi
ok "ollama $(ollama --version 2>/dev/null | head -1)"

# 모델 저장 위치 (기본: ~/.ollama/models, 옵션으로 외장 SSD 지정 가능)
if [[ -n "$MODELS_DIR" ]]; then
  VOL="$(df "$(dirname "$MODELS_DIR")" 2>/dev/null | awk 'NR==2 {print $NF}' || true)"
  [[ -n "$VOL" && -d "$VOL" ]] || die "경로를 찾을 수 없습니다: $MODELS_DIR (외장 SSD 가 연결돼 있나요?)"
  FS="$(diskutil info "$VOL" 2>/dev/null | awk -F': *' '/File System Personality/ {print $2}' || true)"
  if [[ "$FS" == *APFS* ]]; then
    ok "모델 저장 볼륨: $VOL ($FS)"
  else
    warn "볼륨 $VOL 포맷이 '${FS:-알 수 없음}' 입니다. exFAT/NTFS 는 느리고 권한 문제가 생깁니다."
    warn "디스크 유틸리티에서 APFS 로 포맷한 뒤 쓰는 것을 권장합니다."
    if (( AUTO_YES == 0 )); then
      read -r -p "  그래도 이 볼륨을 쓸까요? [y/N] " ans
      [[ "$ans" =~ ^[Yy]$ ]] || die "중단합니다. APFS 포맷 후 다시 실행하세요."
    fi
  fi
  mkdir -p "$MODELS_DIR"
  VOL_FREE_GB="$(df -g "$VOL" | awk 'NR==2 {print $4}')"
  ok "외장 볼륨 여유: ${VOL_FREE_GB}GB"
  DISK_FREE_GB="$VOL_FREE_GB"
  # 내장에 이미 받은 모델이 있으면 옮기기
  if [[ -d "$HOME/.ollama/models" && -n "$(ls -A "$HOME/.ollama/models" 2>/dev/null)" ]]; then
    warn "내장 디스크에 기존 모델이 있습니다. 외장으로 이동합니다 (시간 소요)."
    rsync -a --remove-source-files "$HOME/.ollama/models/" "$MODELS_DIR/" && find "$HOME/.ollama/models" -type d -empty -delete
  fi
else
  MODELS_DIR="$HOME/.ollama/models"
fi

# Ollama 를 우리 LaunchAgent 로 실행 (환경변수를 재부팅 후에도 유지하기 위해 brew services 대신 사용)
brew services stop ollama >/dev/null 2>&1 || true
mkdir -p "$HOME/.local/bin" "$HOME/.ollama"
cat > "$HOME/.local/bin/ollama-serve.sh" <<WRAP_EOF
#!/bin/bash
# 외장 SSD 가 마운트될 때까지 최대 120초 대기 후 Ollama 실행
MODELS_DIR="${MODELS_DIR}"
for i in \$(seq 1 120); do
  [[ -d "\$MODELS_DIR" ]] && break
  sleep 1
done
[[ -d "\$MODELS_DIR" ]] || { echo "모델 폴더 없음: \$MODELS_DIR" >&2; exit 1; }
exec "$(command -v ollama)" serve
WRAP_EOF
chmod +x "$HOME/.local/bin/ollama-serve.sh"

# 외부(같은 네트워크 PC)에서도 접속 가능하도록 0.0.0.0 바인딩.
# 로컬 전용으로만 쓸 거면 OLLAMA_HOST 를 127.0.0.1:11434 로 바꾸세요.
OLLAMA_PLIST="$HOME/Library/LaunchAgents/com.local.ollama.plist"
cat > "$OLLAMA_PLIST" <<PLIST_EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.local.ollama</string>
  <key>ProgramArguments</key>
  <array><string>${HOME}/.local/bin/ollama-serve.sh</string></array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>OLLAMA_HOST</key><string>0.0.0.0:11434</string>
    <key>OLLAMA_MODELS</key><string>${MODELS_DIR}</string>
    <key>OLLAMA_KEEP_ALIVE</key><string>30m</string>
    <key>PATH</key><string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>${HOME}/.ollama/server.log</string>
  <key>StandardErrorPath</key><string>${HOME}/.ollama/server.err</string>
</dict></plist>
PLIST_EOF
launchctl unload "$OLLAMA_PLIST" 2>/dev/null || true
launchctl load "$OLLAMA_PLIST"

# 터미널에서 'ollama pull/list' 를 칠 때도 같은 모델 폴더를 보도록 셸 환경에도 기록
grep -q 'OLLAMA_MODELS=' "$HOME/.zshrc" 2>/dev/null && sed -i '' '/OLLAMA_MODELS=/d' "$HOME/.zshrc"
echo "export OLLAMA_MODELS=\"$MODELS_DIR\"" >> "$HOME/.zshrc"
export OLLAMA_MODELS="$MODELS_DIR"

for i in $(seq 1 30); do
  curl -fsS http://127.0.0.1:11434/api/version >/dev/null 2>&1 && break
  sleep 1
done
curl -fsS http://127.0.0.1:11434/api/version >/dev/null || die "Ollama 서버가 응답하지 않습니다. 로그: ~/.ollama/server.err"
ok "Ollama 서버 실행 중 (http://localhost:11434)"
ok "모델 저장 위치: $MODELS_DIR"

# ---------- 2.5 GPU 메모리 한도 상향 (64GB 이상 기기) ----------
# macOS 는 기본적으로 통합 메모리의 약 75% 만 GPU 에 허용합니다.
# 96GB 기기면 72GB 만 쓸 수 있어 gpt-oss:120b(65GB) 같은 큰 모델이 빡빡합니다.
# 시스템용 12GB 를 남기고 나머지를 GPU 에 허용합니다. (관리자 비밀번호 필요)
if (( MEM_GB >= 64 )); then
  log "GPU 메모리 한도 상향"
  WIRED_MB=$(( (MEM_GB - 12) * 1024 ))
  CUR_LIMIT="$(sysctl -n iogpu.wired_limit_mb 2>/dev/null || echo 0)"
  DO_LIMIT=1
  if (( AUTO_YES == 0 )); then
    read -r -p "  GPU 사용 가능 메모리를 ${WIRED_MB}MB 로 올릴까요? (sudo 필요) [Y/n] " ans
    [[ -z "$ans" || "$ans" =~ ^[Yy]$ ]] || DO_LIMIT=0
  fi
  if (( DO_LIMIT == 1 )); then
    sudo sysctl -w iogpu.wired_limit_mb="$WIRED_MB" >/dev/null && ok "현재 세션 적용: ${CUR_LIMIT} → ${WIRED_MB}MB"
    DAEMON="/Library/LaunchDaemons/com.local.gpu-wired-limit.plist"
    sudo tee "$DAEMON" >/dev/null <<DAEMON_EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.local.gpu-wired-limit</string>
  <key>ProgramArguments</key>
  <array><string>/usr/sbin/sysctl</string><string>-w</string><string>iogpu.wired_limit_mb=${WIRED_MB}</string></array>
  <key>RunAtLoad</key><true/>
</dict></plist>
DAEMON_EOF
    sudo chown root:wheel "$DAEMON" && sudo chmod 644 "$DAEMON"
    sudo launchctl bootstrap system "$DAEMON" 2>/dev/null || true
    ok "재부팅 후에도 유지되도록 LaunchDaemon 등록"
  else
    warn "GPU 한도 상향을 건너뜁니다. 120B급 모델은 느리거나 로드가 안 될 수 있습니다."
  fi
fi

# ---------- 3. 메모리 기준 추천 모델 ----------
log "메모리 ${MEM_GB}GB 기준 추천 모델 선택"
MODELS=()
if   (( MEM_GB >= 180 )); then
  MODELS=(gpt-oss:120b qwen3.6:35b qwen3.5:122b qwen3-coder:30b gemma4:31b bge-m3)
elif (( MEM_GB >= 90 )); then
  # 작은 최신 모델부터 받아 바로 쓸 수 있게 하고, 65GB 대형 모델은 마지막에 받습니다.
  MODELS=(qwen3.8:27b qwen3.6:35b gemma4:31b qwen3-coder:30b bge-m3 gpt-oss:120b)
elif (( MEM_GB >= 60 )); then
  MODELS=(gpt-oss:20b qwen3.6:35b qwen3-coder:30b gemma4:26b bge-m3)
elif (( MEM_GB >= 44 )); then
  MODELS=(gpt-oss:20b qwen3.6:27b qwen3-coder:30b gemma4:26b bge-m3)
else
  MODELS=(gpt-oss:20b qwen3.5:9b gemma4:12b qwen2.5-coder:14b bge-m3)
fi

echo "  설치할 모델:"
for m in "${MODELS[@]}"; do echo "    - $m"; done
echo "  (bge-m3 는 한국어 문서 검색/RAG 용 임베딩 모델)"

if (( AUTO_YES == 0 )); then
  read -r -p "  위 모델을 내려받을까요? 수십 GB, 수십 분 걸릴 수 있습니다. [Y/n] " ans
  [[ -z "$ans" || "$ans" =~ ^[Yy]$ ]] || { warn "모델 다운로드를 건너뜁니다. 나중에 'ollama pull <모델>'"; MODELS=(); }
fi

for m in "${MODELS[@]}"; do
  log "ollama pull $m"
  ollama pull "$m" || warn "$m 다운로드 실패 (태그를 ollama.com/library 에서 확인하세요)"
done

# ---------- 4. Open WebUI (브라우저 채팅 화면) ----------
if (( INSTALL_WEBUI == 1 )); then
  log "Open WebUI 설치 (uv 기반, Docker 불필요)"
  command -v uv >/dev/null 2>&1 || brew install uv
  mkdir -p "$HOME/.open-webui"

  # 로그인 시 자동 시작되는 LaunchAgent 등록
  PLIST="$HOME/Library/LaunchAgents/com.local.open-webui.plist"
  UV_BIN="$(command -v uv)"
  cat > "$PLIST" <<PLIST_EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.local.open-webui</string>
  <key>ProgramArguments</key>
  <array>
    <string>${UV_BIN}</string><string>tool</string><string>run</string>
    <string>--python</string><string>3.12</string>
    <string>open-webui@latest</string><string>serve</string>
    <string>--port</string><string>3000</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>DATA_DIR</key><string>${HOME}/.open-webui</string>
    <key>OLLAMA_BASE_URL</key><string>http://127.0.0.1:11434</string>
    <key>PATH</key><string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>${HOME}/.open-webui/webui.log</string>
  <key>StandardErrorPath</key><string>${HOME}/.open-webui/webui.err</string>
</dict></plist>
PLIST_EOF
  launchctl unload "$PLIST" 2>/dev/null || true
  launchctl load "$PLIST"
  ok "Open WebUI 시작 중. 첫 실행은 패키지 다운로드로 2~5분 걸립니다."
  ok "브라우저: http://localhost:3000  (첫 접속 때 만드는 계정이 관리자)"
fi

# ---------- 5. 동작 테스트 ----------
log "동작 테스트"
FIRST="$(ollama list 2>/dev/null | awk 'NR==2 {print $1}')"
if [[ -n "$FIRST" ]]; then
  echo "  모델 $FIRST 에게 질문 중..."
  ollama run "$FIRST" "한 문장으로 자기소개 해줘." || warn "테스트 실패"
else
  warn "설치된 모델이 없습니다. 'ollama pull gpt-oss:20b' 부터 시작하세요."
fi

log "완료"
cat <<SUMMARY

  ───────────────────────────────────────────
   Ollama API   : http://localhost:11434
   모델 저장 위치 : $MODELS_DIR
   Open WebUI   : http://localhost:3000
   모델 목록     : ollama list
   터미널 채팅   : ollama run <모델명>
   모델 삭제     : ollama rm <모델명>
   상태 점검     : ./check.sh
  ───────────────────────────────────────────
SUMMARY
