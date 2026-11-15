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

모델을 **외장 SSD** 에 저장하려면 볼륨 이름을 넣어 실행합니다. (Finder 에서 보이는 이름, 띄어쓰기 있으면 따옴표)

```bash
./setup-mac-studio.sh --models-dir "/Volumes/외장SSD이름/ollama"
```

스크립트가 하는 일:

1. 칩 종류, 통합 메모리, 디스크 여유 확인
2. Homebrew 설치 (없을 때만)
3. Ollama 설치 후 백그라운드 서비스로 등록 (재부팅해도 자동 실행, 외장 SSD 마운트를 기다렸다가 시작)
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
| 96~128GB | **qwen3.8:27b**, qwen3.6:35b, gemma4:31b | gpt-oss:120b | qwen3-coder:30b | 여러 모델 동시 로드 |
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

## 4.3 외장 SSD(Thunderbolt 5) 에 모델 저장하기

모델 파일은 **실행 시작 때 한 번 메모리로 읽어 올리고** 그 뒤로는 디스크를 거의 안 씁니다.
그래서 외장 SSD 에 두어도 대화 속도(토큰/초)는 내장과 차이가 없고, 모델을 처음 띄울 때 걸리는 시간만 조금 늘어납니다.

| 항목 | 내장 SSD | Thunderbolt 5 NVMe 외장 |
|---|---|---|
| 65GB 모델(gpt-oss:120b) 첫 로드 | 약 10~15초 | 약 15~30초 |
| 로드 후 대화 속도 | 동일 | 동일 |
| 모델 다운로드 속도 | 인터넷 속도가 병목 | 인터넷 속도가 병목 |

꼭 지킬 것:

1. **APFS 로 포맷** (디스크 유틸리티 → 지우기 → 포맷 APFS). exFAT 는 느리고 권한 오류가 납니다. 스크립트가 포맷을 확인해 경고합니다.
2. **부팅 전에 연결**해 두기. 스크립트가 등록한 서비스는 SSD 가 올라올 때까지 최대 2분 기다렸다가 Ollama 를 시작합니다.
3. **사용 중 뽑지 않기.** 모델이 메모리에 올라간 뒤에는 뽑아도 대화는 되지만, 다음 모델을 띄울 때 오류가 납니다.
4. 시스템 설정 → 에너지 → "가능할 때 하드 디스크 잠자기" 끄기. 켜져 있으면 첫 응답이 수 초 늦어질 수 있습니다.
5. 외장 하나에 **모델만** 두고, Open WebUI 데이터(계정, 대화 기록)는 내장에 그대로 둡니다. 스크립트 기본값입니다.

이미 내장에 받은 모델이 있으면 스크립트가 외장으로 옮겨 줍니다.

## 4.5 M5 Ultra 96GB 기준 점검 메모

- 스크립트는 96GB 를 **90GB 이상 구간**으로 판단해 아래 6개를 받습니다. 총 다운로드 약 146GB.

| 순위 | 모델 | 용량 | 용도 |
|---|---|---|---|
| 1 | qwen3.8:27b | 18GB | **주력.** 최신 Qwen. 한국어 메일, 요약, 보고서, 이미지 입력, 긴 문서(256K) |
| 2 | qwen3.6:35b | 23GB | **빠른 응답.** 짧은 질문, 번역, 초안 |
| 3 | gemma4:31b | 20GB | 다국어 점수 최상위. 스캔 문서, 도면 사진, 표 읽기 |
| 4 | qwen3-coder:30b | 19GB | 코딩 공부 |
| 5 | gpt-oss:120b | 65GB | 대형 추론용(선택). 2025년 8월 모델, 글자 입력만 가능 |
| - | bge-m3 | 1.2GB | PDF 검색용 임베딩 |

- 1~3번을 합쳐도 61GB 라서 **세 모델을 동시에 메모리에 올려 두고** 기다림 없이 바꿔 쓸 수 있습니다. 96GB 의 실질적인 장점입니다.
- gpt-oss:120b 는 혼자 65GB 를 차지해 다른 모델과 같이 못 올립니다. 필요 없으면 `ollama rm gpt-oss:120b` 로 지워도 됩니다.
- qwen3.5:122b 는 81GB 라서 96GB 기기에는 권하지 않습니다. 대화 공간이 거의 안 남습니다.
**96GB 에서 모델별 여유 정도** (받기 전 참고)

| 등급 | 모델 | 용량 | 설명 |
|---|---|---|---|
| 최적 | qwen3.8:27b / qwen3.6:35b / gemma4:31b | 18 / 23 / 20GB | 빠르고 셋을 동시에 올려 둘 수 있음 |
| 최적, 고품질 | qwen3.8:27b-q8_0 | 30GB | 같은 모델의 정밀 버전. 조금 느림 |
| 여유 있음 | llama3.3:70b, qwen3-next:80b | 43 / 50GB | 70~80B급 |
| 빡빡함 | gpt-oss:120b | 65GB | 혼자만 올라감. 긴 문서는 부담 |
| 한계 | qwen3.5:122b | 81GB | 올라가도 대화 공간이 거의 없음 |
| 불가 | 235B 이상 | 140GB 이상 | 메모리 초과 |

처음에는 `ollama pull qwen3.8:27b` 하나만 받아 써 보고, 필요하면 나머지를 추가하세요.

- macOS 기본값은 GPU 가 메모리의 약 75%(72GB)만 쓸 수 있습니다. 스크립트가 GPU 한도를 **84GB** 로 올려 gpt-oss:120b 가 여유 있게 올라가도록 합니다. 관리자 비밀번호를 한 번 묻습니다.
- 속도는 qwen3.6:35b 가 초당 약 150 토큰(커뮤니티 실행 기록), qwen3.8:27b 가 약 50 토큰 수준으로 알려져 있습니다. gpt-oss:120b 는 자료마다 15~146 토큰으로 크게 달라 직접 재 봐야 합니다.

## 5. 문제 해결

| 증상 | 조치 |
|---|---|
| `ollama: command not found` | 터미널 새로 열기. 그래도 안 되면 `eval "$(/opt/homebrew/bin/brew shellenv)"` |
| 서버 응답 없음 | `launchctl unload ~/Library/LaunchAgents/com.local.ollama.plist; launchctl load ~/Library/LaunchAgents/com.local.ollama.plist` 또는 로그 `cat ~/.ollama/server.err` |
| 외장 SSD 를 뺐다 꽂은 뒤 모델 목록이 빔 | 위 명령으로 Ollama 재시작 |
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
launchctl unload ~/Library/LaunchAgents/com.local.ollama.plist && rm ~/Library/LaunchAgents/com.local.ollama.plist ~/.local/bin/ollama-serve.sh
```

```bash
brew uninstall ollama && rm -rf ~/.ollama ~/.open-webui
```

외장 SSD 에 둔 모델 폴더(`--models-dir` 로 지정한 경로)는 직접 삭제하세요.

## 파일 설명

- `setup-mac-studio.sh` : 설치 스크립트. `-y` 는 확인 없이 진행, `--no-webui` 는 Ollama만 설치, `--models-dir 경로` 는 모델을 외장 SSD 에 저장
- `check.sh` : 설치 상태와 모델 목록 점검
