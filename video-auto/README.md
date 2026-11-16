# vauto — 촬영 원본 자동 편집 도구

촬영한 영상 폴더를 통째로 넘기면 **컷 편집, 색 보정, 3개 언어 자막, Final Cut 프로젝트, SNS용 완성 파일**을
맥스튜디오 안에서 만들어 줍니다. 영상과 음성은 외부 서버로 나가지 않습니다.

```
촬영 폴더 ─▶ ① 클립 읽기 (4K/8K, HDR, 세로 영상 자동 인식)
           ─▶ ② 음성 인식 (Whisper) · 침묵 감지 · 색 분석
           ─▶ ③ 로컬 LLM 이 편집 판단 (NG 컷 제거, 쇼츠 하이라이트 선택)
           ─▶ ④ 자막 번역 (한국어 ↔ 영어 ↔ 일본어)
           ─▶ ⑤ Final Cut 프로젝트(.fcpxml) + 자막(.srt) + 제목·설명·해시태그
           ─▶ ⑥ 완성 파일: 유튜브 / 쇼츠 / 릴스 / X / 스레드
```

## 1. 설치 (맥스튜디오 터미널)

로컬 LLM(Ollama)이 먼저 깔려 있어야 합니다. 안 했다면 `../local-llm/setup-mac-studio.sh` 부터 실행하세요.

```bash
cd ~/NTT-TEST/video-auto && ./setup-video.sh
```

ffmpeg, 음성 인식 엔진과 모델(약 3GB)을 설치하고 마지막에 점검 결과를 보여 줍니다.

## 2. 사용

```bash
vauto run "/Volumes/외장SSD/촬영/2026-11-전시회"
```

편집 방향을 지시하려면 설정 파일을 촬영 폴더에 복사해 고친 뒤 함께 넘깁니다.

```bash
cp ~/NTT-TEST/video-auto/project.example.toml "/Volumes/외장SSD/촬영/2026-11-전시회/project.toml"
```

```bash
vauto run "/Volumes/외장SSD/촬영/2026-11-전시회" --project "/Volumes/외장SSD/촬영/2026-11-전시회/project.toml" --open-fcp
```

| 옵션 | 뜻 |
|---|---|
| `--open-fcp` | 끝나면 Final Cut Pro 로 바로 열기 |
| `--no-render` | 완성 파일은 건너뛰고 Final Cut 프로젝트와 자막만 (빠름) |
| `--targets youtube,reels` | 고른 대상만 만들기 |
| `--no-llm` | LLM 없이 규칙만으로 (침묵 자르기, 원어 자막만) |
| `vauto doctor` | 설치 상태 점검 |

같은 폴더를 다시 돌리면 음성 인식과 색 분석은 저장된 결과를 재사용해 빨리 끝납니다.

## 3. 결과물 (`촬영폴더/_vauto/`)

| 파일 | 내용 |
|---|---|
| `report.md` | 무엇을 남기고 잘랐는지, 확인할 점. **가장 먼저 볼 파일** |
| `fcp/이름.fcpxml` | Final Cut 프로젝트. 본편(가로)과 쇼츠(세로) 두 개가 들어 있음 |
| `subs/main.ko.srt` 등 | 언어별 자막. 유튜브 자막 트랙으로 그대로 올릴 수 있음 |
| `metadata.md` | 한·영·일 제목, 설명, 해시태그, 유튜브 챕터 |
| `luts/클립이름.cube` | 클립별 자동 색 보정값. Final Cut 에서 쓸 수 있는 LUT |
| `exports/youtube.mp4` | 원본 해상도(4K/8K) HEVC 10비트 |
| `exports/shorts.mp4`, `reels.mp4`, `x.mp4`, `threads.mp4` | 세로 1080x1920, 자막 포함 |
| `edit.json` | 조각별 판단 내역 (문제 추적용) |

## 4. 로컬 LLM 에게 편집을 시키는 법

`project.toml` 의 `brief` 에 평소 말로 적으면 됩니다. LLM 은 이 지시문과 음성 인식 결과를 보고
어떤 조각을 남길지, 쇼츠에 무엇을 넣을지, 제목과 설명을 어떻게 쓸지를 정합니다.

```toml
[project]
brief = """
삿포로 여행 3일차. 먹는 장면과 설명하는 말은 남기고 길 찾는 잡담은 뺀다.
쇼츠는 가장 맛있어 보이는 순간으로 시작. 제목은 일본어 지명을 넣어서.
"""

[edit]
target_sec = 180      # 본편을 3분 안팎으로 줄이기. 0 이면 NG 컷만 제거
```

LLM 은 **조각의 번호만 고릅니다.** 시간 계산과 자르기는 프로그램이 하므로 LLM 이 틀려도
영상이 깨지지 않고, 지나치게 많이 잘라낸 답은 버리고 전체를 유지합니다.

## 5. Final Cut Pro 에서

1. `fcp/이름.fcpxml` 을 더블클릭하거나 파일 > 가져오기 > XML. 라이브러리를 고르면 이벤트가 생깁니다.
2. 타임라인은 **원본 파일을 그대로 참조**합니다. 컷 길이, 순서를 자유롭게 고칠 수 있습니다.
3. **자막**은 언어별 캡션으로 들어 있습니다. 타임라인 인덱스 > 캡션에서 언어를 켜고 끕니다.
4. **색 보정**은 두 방법 중 하나를 씁니다.
   - 전체 클립 선택 후 색상 균형(Option+Command+B). Final Cut 자체 자동 보정.
   - 효과 > 색상 > 사용자 설정 LUT 을 클립에 넣고 `luts/클립이름.cube` 를 지정. 완성 파일과 같은 보정.
5. **세로 프로젝트**는 화면 채우기로 가운데를 잘라 둔 상태입니다. 인물이 옆에 있으면 스마트 맞춤을 쓰세요.
6. Motion 템플릿 자막을 쓰려면 `subtitle_mode = "titles"` 로 바꾸고 `title_template_uid` 에 템플릿을 지정합니다.

## 6. 대상별 기본 규격

| 대상 | 화면 | 코덱 | 길이 제한 | 자막 |
|---|---|---|---|---|
| youtube | 원본 그대로 (4K, 8K) | HEVC 10비트, 4K 40~60Mbps, 8K 120~180Mbps | 없음 | 별도 파일 |
| shorts | 1080x1920 | H.264 | 180초 | 화면에 포함 |
| reels | 1080x1920 | H.264 | 180초 | 화면에 포함 |
| x | 1080x1920 | H.264 | 140초 | 화면에 포함 |
| threads | 1080x1920 | H.264 | 300초 | 화면에 포함 |

쇼츠 편집본은 기본 60초라 네 곳에 같은 파일을 올릴 수 있습니다. 플랫폼 제한은 계정 등급과 시기에 따라
바뀌므로 `project.toml` 의 `[targets.이름]` 에서 고치세요. `burn = ["ko","en","ja"]` 로 두면
언어별 파일(`reels.ko.mp4`, `reels.en.mp4`, `reels.ja.mp4`)이 따로 나옵니다.

## 6.5 내 목소리 내레이션 (`vauto voice`)

녹음한 내 목소리를 한 번 등록해 두면, 대본을 그 목소리로 읽은 음성을 한국어·영어·일본어로 만들어 줍니다.
음성 모델(Qwen3-TTS, Apache-2.0)은 맥스튜디오 안에서 돌고 녹음 파일은 밖으로 나가지 않습니다.

**설치 (처음 한 번)**

```bash
~/NTT-TEST/video-auto/setup-voice.sh
```

**1) 목소리 등록.** 조용한 곳에서 10초 이상 읽은 녹음 파일이면 됩니다. 가장 또렷한 6~12초 구간을 자동으로 고릅니다.

```bash
vauto voice-add ~/Desktop/voice.m4a
```

**2) 내레이션 만들기.** 대본 파일을 주거나, 주제만 주고 로컬 LLM 이 대본을 쓰게 합니다.

```bash
vauto voice ~/Desktop/대본.txt
```

```bash
vauto voice --topic "삿포로 여행 첫날. 오타루 항구를 걷고 시장에서 해산물 덮밥을 먹었다" --seconds 40
```

**3) 영상에 입히기.** 원래 소리는 작게 깔리고 화면은 그대로입니다. 언어별 영상이 따로 나옵니다.

```bash
vauto voice ~/Desktop/대본.txt --video ~/Desktop/_vauto/exports/youtube.mp4
```

| 결과 파일 (`_voice/`) | 내용 |
|---|---|
| `narration.ko.wav`, `.en.wav`, `.ja.wav` | 언어별 내레이션 |
| `narration.ko.srt` 등 | 내레이션에 맞춘 자막 |
| `script.ko.txt` 등 | 실제로 읽은 대본 (번역 포함) |
| `영상이름.ko.mp4` 등 | `--video` 를 준 경우, 내레이션을 입힌 영상 |

동작 방식과 한계:

- 대본은 문장 단위로 만들고, **만든 음성을 다시 받아써서 대본과 다르면 최대 3번까지 다시 만듭니다.** 그래도 다르면 `확인할 점` 에 그 문장을 알려 줍니다.
- 대본의 빈 줄은 문단 구분(조금 긴 쉼)이고, `#` 로 시작하는 줄은 읽지 않습니다.
- `--topic` 으로 쓰는 대본은 LLM 이 **주제 글만 보고** 쓰는 것입니다. 영상 화면을 보고 쓰지는 않습니다.
- 한국어로 녹음한 목소리로 일본어를 읽히면 발음 오류가 한국어·영어보다 많습니다.
- 내레이션 길이를 영상 길이에 맞춰 주지는 않습니다. 길면 뒷부분이 잘리고 경고가 나옵니다.
- 영어·일본어만 다시 만들려면 `--langs en,ja`, 번역 없이 대본 언어만은 `--no-llm`.
- 한 언어만 다시 만들려면 저장된 대본을 그대로 씁니다: `vauto voice ~/_voice/script.ja.txt --script-lang ja --langs ja --out ~/_voice`
- MLX 방식에서 오류가 나면 `setup-voice.sh --torch` 로 바꿔 설치하세요. 같은 모델을 PyTorch 로 돌립니다.

## 6.6 AI 그림과 짧은 영상 (`vauto image`, `vauto clip`)

Draw Things 의 명령줄 도구를 감싼 명령입니다. 모델 파일 이름과 프레임 수를 외울 필요가 없습니다.

```bash
brew install draw-things-cli
```

```bash
vauto image "a chrome toaster on a wooden kitchen table, soft morning light"
```

```bash
vauto clip "slow camera push in, steam rising" --image ~/Documents/vauto/gen/사진.png --seconds 5
```

| 옵션 | 뜻 |
|---|---|
| `--model ltx` (기본) | LTX-2.3. 소리까지 함께 생성 |
| `--model wan` | Wan 2.2 5B. 소리 없음. **현재 맥스튜디오에서 마지막 단계 오류로 실패** |
| `--model wan14` | Wan 2.2 14B 사진→영상. 화질 위주, 시험적 |
| `--seconds 5` | 길이. 2~10초 권장 |
| `--vertical` | 세로(쇼츠용) |
| `--dry-run` | 실행하지 않고 실제 명령만 보여 주기 |

- 결과는 `~/Documents/vauto/gen/` 에 저장되고, 끝나면 만드는 데 걸린 시간을 알려 줍니다.
- 모델은 처음 쓸 때 자동으로 내려받습니다 (수십 GB).
- 설명은 영어로 쓰면 더 잘 나옵니다.
- 구조를 설명하는 장면에는 쓰지 마세요. 그럴듯하지만 틀린 그림이 나옵니다. 분위기 컷 전용입니다.
- 쓰는 모델은 `project.toml` 의 `[gen]` 에서 바꿀 수 있습니다.
- **`unknown type name 'bfloat'` 오류**: Homebrew 판 draw-things-cli 의 알려진 문제입니다 (draw-things-community 이슈 #152). LTX-2.3 처럼 BF16 을 쓰는 모델에서 납니다. 아래를 한 번 실행하면 SDK 표시만 고친 사본을 만들고, `vauto` 가 자동으로 그것을 씁니다. 원본은 그대로 둡니다.

```bash
~/NTT-TEST/video-auto/fix-draw-things-cli.sh
```

## 6.7 말로 시키기 (Hermes Agent)

채팅창의 LLM 은 글로 답만 하지만, [Hermes Agent](https://github.com/NousResearch/hermes-agent) 같은
에이전트는 터미널 명령을 대신 실행할 수 있습니다. 아래 기술 파일을 넣어 두면
"이 대본을 내 목소리로 만들어 줘" 같은 말로 `vauto` 를 부를 수 있습니다.

```bash
mkdir -p ~/.hermes/skills && cp -R ~/NTT-TEST/video-auto/hermes-skill/vauto ~/.hermes/skills/
```

에이전트는 맥에서 실제 명령을 실행하므로 승인 설정은 기본값(smart)이나 manual 로 두고,
승인 요청이 뜨면 내용을 읽고 허용하세요.

## 7. 자동으로 하는 일과 하지 않는 일

**합니다**

- 4K·8K, 가로·세로, 23.976~120fps, HLG/PQ HDR 원본 인식. HDR 은 SDR 로 변환해 내보냄
- 말 사이 침묵 자르기, 소리 없는 구간에 생긴 잘못된 인식 결과 제거
- 클립별 화이트밸런스·밝기 맞춤, Log 변환 LUT 과 분위기 LUT 적용
- 한·영·일 자막 생성과 줄바꿈 (일본어는 단어 중간에서 끊지 않음)
- 음량을 -14 LUFS 로 맞춤

**하지 않습니다 (이번 버전)**

- 말이 없는 클립의 **내용을 보고** 고르는 일. 가운데 5초를 쓰는 규칙으로 처리합니다
- 배경 음악 넣기, 사진 넣기, 화면 전환 효과
- 세로 영상에서 인물 따라가기 (가운데 자르기만)
- 각 플랫폼에 자동 업로드
- HDR 그대로 내보내기

## 8. 검증 상태

| 항목 | 상태 |
|---|---|
| 클립 분석, 컷, 색 보정, 자막, 번역, 완성 파일 렌더링 | 리눅스에서 합성 영상(한·영·일 음성, 4K, 8K, 세로, HLG)으로 끝까지 실행해 확인 |
| 로컬 LLM 연동 | 맥스튜디오의 Ollama(qwen3.8:27b)로 대본 작성과 번역 확인. 이 모델은 형식 강제 요청을 거부해 일반 글 방식으로 자동 전환됨 |
| Final Cut 가져오기 | **미확인.** 파일 구조와 프레임 정렬은 자동 테스트로 검사했지만 실제 Final Cut 에서 열어 보지 못함 |
| mlx-whisper, VideoToolbox 인코더 | **미확인.** 맥 전용이라 리눅스에서 실행 불가 |
| Motion 템플릿 자막(`titles`) | **미확인** |
| AI 그림 (`vauto image`) | 맥스튜디오(M5 Ultra)에서 확인. FLUX.2 klein 4B, 생성 28초 |
| AI 영상 (`vauto clip`, LTX-2.3) | 맥스튜디오에서 확인. `fix-draw-things-cli.sh` 적용 후 720p 3초 클립에 169초 (모델 불러오기 포함) |
| AI 영상 (Wan 2.2 5B) | **미해결.** 우회 적용 후에도 생성 96% 지점(영상으로 풀어내는 단계)에서 도구 내부 오류로 종료됨 |
| 내 목소리 내레이션 (PyTorch 방식) | 리눅스 CPU 에서 등록, 번역, 합성, 받아쓰기 검수, 영상 입히기까지 실행해 확인 |
| 내 목소리 내레이션 (MLX 방식) | 맥스튜디오(M5 Ultra)에서 실행 확인. 한국어·영어 90~100%, 일본어 74~100% 일치 |

맥스튜디오에서 처음 돌릴 때 짧은 클립 2~3개로 먼저 시험하고, Final Cut 가져오기에서 오류가 나면
오류 문구를 알려 주세요.

## 9. 문제 해결

| 증상 | 조치 |
|---|---|
| `LLM 사용 불가` | `ollama list` 로 모델 이름 확인 후 `project.toml` 의 `[llm] model` 을 맞춤 |
| 자막이 엉뚱한 언어 | `source_language = "ko"` 로 지정 |
| 고유명사를 자꾸 틀림 | `[whisper] vocabulary` 와 `[glossary]` 에 추가 |
| 컷이 너무 잘게 나뉨 | `[edit] merge_gap` 을 1.0 이상으로 |
| 색이 과하게 바뀜 | `[color] strength` 를 0.3 으로, 끄려면 `auto = false` |
| 8K 가 느림 | `--no-render` 로 Final Cut 프로젝트만 받고 Final Cut 에서 내보내기 |
| 처음부터 다시 분석 | `촬영폴더/_vauto/.cache` 폴더 삭제 |

## 개발자용

```bash
uv run --project . --with pytest pytest -q
```

구성: `probe`(클립 정보) → `analyze`(침묵·색) → `transcribe`(Whisper) → `edit`(조각·타임라인) →
`llm`(판단·번역) → `subs`(자막) → `fcpxml`(Final Cut) → `render`(ffmpeg) → `cli`(전체 흐름).
