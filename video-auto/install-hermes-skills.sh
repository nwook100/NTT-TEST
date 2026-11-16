#!/bin/bash
# 헤르메스 에이전트에 vauto 관련 스킬을 설치(또는 최신으로 교체)한다.
# 사용법:  ./install-hermes-skills.sh      설치 후 헤르메스에서 /reload-skills
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="$HOME/.hermes/skills/media"
[[ -d "$HOME/.hermes" ]] || { echo "헤르메스가 설치되어 있지 않습니다. 먼저: ollama launch hermes"; exit 1; }
mkdir -p "$DEST"
for skill in "$DIR"/hermes-skill/*/; do
  name="$(basename "$skill")"
  rm -rf "$DEST/$name"
  cp -R "$skill" "$DEST/$name"
  echo "  ✔ $name"
done
echo "설치 완료. 헤르메스 창에서 /reload-skills 를 입력하세요."
