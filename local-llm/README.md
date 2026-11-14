# Mac Studio 로컬 LLM 설치 가이드

맥스튜디오(Apple Silicon)에 **Ollama**(모델 실행 엔진)와 **Open WebUI**(브라우저 채팅 화면)를 설치하는 자료입니다.
인터넷 없이, 외부 서버로 데이터를 보내지 않고 회사 자료(견적서, 사양서, 고객 메일)를 다룰 수 있습니다.

## 1. 빠른 시작 (복붙 3줄)

맥스튜디오에서 **터미널**(Launchpad → 기타 → 터미널)을 열고 아래를 순서대로 실행합니다.

```bash
git clone https://github.com/nwook100/NTT-TEST.git ~/NTT-TEST
```

```bash
cd ~/NTT-TEST/local-llm && git checkout claude/funny-euler-jl40rl
```

```bash
./setup-mac-studio.sh
```

스크립트가 하는 일:

1. 칩 종류, 통합 메모리, 디스크 여유 확인
2. Homebrew 설치 (없을 때만)
3. Ollama 설치 후 백그라운드 서비스로 등록 (재부팅해도 자동 실행)
4. **메모리 용량에 맞는 모델 자동 추천** 후 다운로드 (확인 질문 있음)
5. Open WebUI 설치 및 로그인 시 자동 시작 등록
6. 첫 모델로 한국어 응답 테스트

처음 실행하면 Xcode Command Line Tools 설치 창이 뜰 수 있습니다. 설치가 끝나면 스크립트를 한 번 더 실행하세요.

## 2. 설치 후 사용법

| 하고 싶은 일 | 방법 |
|---|---|
| 브라우저에서 채팅 | http://localhost:3000 접속. 첫 접속 때 만드는 계정이 관리자 |
| 터미널에서 채팅 | `ollama run gpt-oss:20b` |
| 설치된 모델 보기 | `ollama list` |
| 모델 추가 | `ollama pull qwen3.6:27b` |
| 모델 삭제 | `ollama rm <모델명>` |
| 상태 점검 | `./check.sh` |
| 다른 PC(사무실 윈도우)에서 접속 | 브라우저에서 `http://<맥스튜디오IP>:3000` |

## 3. 메모리별 추천 모델

맥스튜디오는 GPU 메모리를 따로 쓰지 않고 **통합 메모리 전체**를 모델에 쓸 수 있습니다.
대략 "모델 용량 + 여유 10~15GB" 가 필요합니다.

| 통합 메모리 | 범용 (한국어 OK) | 추론/긴 문서 | 코딩 | 비고 |
|---|---|---|---|---|
| 36GB | qwen3.5:9b, gemma4:12b | gpt-oss:20b | qwen2.5-coder:14b | 20B급까지 |
| 48GB | qwen3.6:27b, gemma4:26b | gpt-oss:20b | qwen3-coder:30b | 가성비 구간 |
| 64GB | qwen3.6:35b, gemma4:26b | gpt-oss:20b | qwen3-coder:30b | 30B급 여유 |
| 96~128GB | qwen3.6:35b, gemma4:31b | **gpt-oss:120b** | qwen3-coder:30b | 120B급 가능 |
| 192GB+ | qwen3.5:122b | gpt-oss:120b | qwen3-coder:30b | 여러 모델 동시 로드 |

- **Qwen 계열**: 한국어 품질이 좋고 문서 요약, 번역, 이메일 작성에 강합니다.
- **Gemma 4**: 구글 모델. Apple Silicon에서 속도가 빠르고 한국어도 괜찮습니다.
- **gpt-oss**: OpenAI 공개 모델. 복잡한 추론, 계산, 긴 문서 분석에 강합니다.
- **qwen3-coder / qwen2.5-coder**: 코드 작성용. 개발 공부할 때 짝으로 쓰기 좋습니다.
- **bge-m3**: 채팅용이 아니라 문서 검색(RAG)용 임베딩 모델. Open WebUI에 PDF 올려 질문할 때 씁니다.

모델 태그는 https://ollama.com/library 에서 최신 목록을 확인할 수 있습니다.

## 4. 영업/업무 활용 예시

- 고객 메일, 영문 사양서를 붙여 넣고 **한국어 요약·답장 초안** 받기
- 견적 조건, 납기, 수량을 주고 **견적 메일 문구** 작성
- 제품 자료(magazine, cassette, ring, pin boat) PDF를 Open WebUI에 올려 **사내 Q&A** 만들기
- PPT 목차 짜기, 슬라이드별 핵심 문장 다듬기
- 개발 공부: 코딩 모델에게 코드 설명 요청, 에러 메시지 붙여 넣고 원인 질문

## 4.5 M5 Ultra 96GB 기준 점검 메모

- 스크립트는 96GB 를 **90GB 이상 구간**으로 판단해 아래 5개를 받습니다. 총 다운로드 약 130GB.

| 모델 | 용량 | 용도 |
|---|---|---|
| gpt-oss:120b | 65GB | 복잡한 추론, 긴 문서 분석 (주력) |
| qwen3.6:35b | 23GB | 한국어 메일, 요약, 번역 (빠름) |
| qwen3-coder:30b | 19GB | 코딩 공부 |
| gemma4:31b | 20GB | 한국어 범용, 이미지 입력 가능 |
| bge-m3 | 1.2GB | PDF 검색용 임베딩 |

- macOS 기본값은 GPU 가 메모리의 약 75%(72GB)만 쓸 수 있습니다. 스크립트가 GPU 한도를 **84GB** 로 올려 gpt-oss:120b 가 여유 있게 올라가도록 합니다. 관리자 비밀번호를 한 번 묻습니다.
- 모델은 한 번에 하나만 메모리에 올라갑니다. gpt-oss:120b(65GB) 와 qwen3.6:35b(23GB) 를 동시에 쓰면 88GB 로 한도를 넘으니, Open WebUI 에서 모델을 바꾸면 Ollama 가 자동으로 이전 모델을 내립니다.
- 예상 속도는 gpt-oss:120b 기준 초당 15~30 토큰(추정치, 실측 자료 아직 없음). 일상 업무에는 qwen3.6:35b 가 체감상 훨씬 빠릅니다.

## 5. 문제 해결

| 증상 | 조치 |
|---|---|
| `ollama: command not found` | 터미널 새로 열기. 그래도 안 되면 `eval "$(/opt/homebrew/bin/brew shellenv)"` |
| 서버 응답 없음 | `brew services restart ollama` |
| Open WebUI 3000번 안 열림 | 첫 실행은 2~5분 소요. `tail -f ~/.open-webui/webui.err` 로 로그 확인 |
| 모델이 너무 느림 | `ollama ps` 로 메모리 확인. 더 작은 모델로 교체 |
| 디스크 부족 | `ollama rm <모델>` 로 안 쓰는 모델 삭제. 모델은 `~/.ollama/models` 에 저장 |
| GPU 한도 되돌리기 | `sudo sysctl -w iogpu.wired_limit_mb=0` 후 `sudo rm /Library/LaunchDaemons/com.local.gpu-wired-limit.plist` |
| 다른 PC에서 접속 안 됨 | 맥 시스템 설정 → 네트워크 → 방화벽에서 포트 허용. `OLLAMA_HOST=0.0.0.0` 설정은 스크립트가 처리 |

## 6. 삭제 (되돌리기)

```bash
launchctl unload ~/Library/LaunchAgents/com.local.open-webui.plist && rm ~/Library/LaunchAgents/com.local.open-webui.plist
```

```bash
brew services stop ollama && brew uninstall ollama && rm -rf ~/.ollama ~/.open-webui
```

## 파일 설명

- `setup-mac-studio.sh` : 설치 스크립트. `-y` 옵션은 확인 없이 진행, `--no-webui` 는 Ollama만 설치
- `check.sh` : 설치 상태와 모델 목록 점검
