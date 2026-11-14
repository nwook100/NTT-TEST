#!/bin/bash
# Mac Studio 로컬 LLM 상태 점검
echo "== 하드웨어 =="
echo "칩      : $(sysctl -n machdep.cpu.brand_string 2>/dev/null)"
echo "메모리  : $(( $(sysctl -n hw.memsize) / 1024 / 1024 / 1024 ))GB"
echo "디스크  : $(df -h / | awk 'NR==2 {print $4}') 여유"
echo
echo "== Ollama =="
if command -v ollama >/dev/null 2>&1; then
  echo "버전    : $(ollama --version 2>/dev/null | head -1)"
  if curl -fsS http://127.0.0.1:11434/api/version >/dev/null 2>&1; then
    echo "서버    : 실행 중 (localhost:11434)"
    echo; echo "-- 설치된 모델 --"; ollama list
    echo; echo "-- 메모리에 올라온 모델 --"; ollama ps
  else
    echo "서버    : 꺼져 있음 → brew services start ollama"
  fi
else
  echo "미설치 → ./setup-mac-studio.sh"
fi
echo
echo "== Open WebUI =="
if curl -fsS -o /dev/null http://127.0.0.1:3000 2>/dev/null; then
  echo "실행 중 → http://localhost:3000"
else
  echo "응답 없음 (첫 실행은 수 분 소요). 로그: tail -f ~/.open-webui/webui.err"
fi
echo
echo "== 모델 저장 용량 =="
du -sh ~/.ollama/models 2>/dev/null || echo "모델 폴더 없음"
