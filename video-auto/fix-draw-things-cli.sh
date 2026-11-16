#!/bin/bash
# =============================================================
#  draw-things-cli 의 "unknown type name 'bfloat'" 오류 우회
#
#  Homebrew 로 받은 draw-things-cli 는 오래된 SDK 표시로 빌드되어 있어서, LTX-2.3 처럼
#  BF16 을 쓰는 모델에서 Metal 오류로 종료된다 (draw-things-community 이슈 #152).
#  원본은 건드리지 않고, SDK 표시만 고친 사본(draw-things-cli-sdk26)을 만들어 서명한다.
#  vauto 는 이 사본이 있으면 자동으로 그것을 쓴다.
#
#  사용법:  ./fix-draw-things-cli.sh
#  되돌리기: rm "$(which draw-things-cli-sdk26)"
# =============================================================
set -euo pipefail
ok()  { printf '\033[1;32m  ✔ %s\033[0m\n' "$*"; }
die() { printf '\033[1;31m  ✖ %s\033[0m\n' "$*"; exit 1; }

[[ -x /opt/homebrew/bin/brew ]] && eval "$(/opt/homebrew/bin/brew shellenv)"
SRC="$(command -v draw-things-cli || true)"
[[ -n "$SRC" ]] || die "draw-things-cli 가 없습니다. 먼저: brew install draw-things-cli"
command -v vtool >/dev/null 2>&1 || die "vtool 이 없습니다. 먼저: xcode-select --install"

# 심볼릭 링크를 따라가 실제 파일을 찾는다 (자원 파일이 옆에 있을 수 있어 같은 폴더에 사본을 둔다)
REAL="$(python3 -c 'import os,sys; print(os.path.realpath(sys.argv[1]))' "$SRC")"
DEST="$(dirname "$REAL")/draw-things-cli-sdk26"

echo "원본: $REAL"
echo "현재 SDK 표시:"
vtool -show-build "$REAL" | sed -n '1,12p' | sed 's/^/    /'

vtool -set-build-version macos 13.0 26.5 -replace -output "$DEST" "$REAL"
codesign -f -s - "$DEST"
chmod +x "$DEST"
ln -sf "$DEST" /opt/homebrew/bin/draw-things-cli-sdk26
ok "사본 생성: $DEST"

"$DEST" --version >/dev/null 2>&1 && ok "사본 실행 확인 ($("$DEST" --version 2>/dev/null | head -1))" \
  || die "사본이 실행되지 않습니다. 화면을 그대로 보내 주세요."
echo
echo "이제 vauto clip 이 고친 사본을 자동으로 씁니다. 시험:"
echo '  vauto clip "a quiet harbor town at dawn, snow falling, cinematic" --seconds 3'
