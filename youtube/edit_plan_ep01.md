# EP.01 편집 계획서 — The $40 Billion Vanishing Act (Terra-Luna)

대본: `youtube/fraud_ep01_terra_luna_en.md` (약 22분, 16개 섹션) · 편집 프로그램: CapCut PC
목표: **3~5초마다 화면이 바뀌고, 60~90초마다 패턴 인터럽트(전혀 다른 종류의 화면·소리)가 들어가는** 다큐 편집.
화면 속 영어 문구는 대본 그대로 둡니다. 나레이션 녹음 전이므로 아래 타이밍은 대본의 섹션 시간 기준이며, 녹음 후 나레이션 길이에 맞춰 늘리거나 줄이세요.

---

## 0. 파일 경로 약어

| 약어 | 실제 폴더 | 내용 |
|---|---|---|
| `M/` | `youtube/assets/ep01_terra_luna/motion/` | 이번에 만든 모션그래픽 MP4 (목록: `youtube/assets/README_motion.md`) |
| `Z/` | `youtube/assets/ep01_terra_luna/cards/zoom/` | 문서 카드 줌인 클립 (7초. 필요한 만큼 잘라 쓰기) |
| `CARD/` | `youtube/assets/ep01_terra_luna/cards/` | 문서 카드 정지 이미지 PNG |
| `P/` | `youtube/assets/ep01_terra_luna/` | 위키미디어 사진 (`s01_seoul_skyline_1.jpg` 등). 출처 표기는 `CREDITS.md`/`.meta` 기준 |
| `G/` | `youtube/assets/ep01_terra_luna/gov/` | 미국 정부 문서 캡처 (저작권 없음) |
| `AI-xx` | 대본 맨 아래 프롬프트 표 | AI 영상 (직접 생성. Higgsfield는 쓰지 않음) |
| `STOCK:` | Pexels / Pixabay 검색어 | 무료 스톡 영상 (얼굴이 또렷한 클립·로고 노출 클립은 제외) |

> `P/s11_interpol_2.jpg`는 건물 정문에 기관 엠블럼이 보이므로 **사용하지 마세요.** 쓰려면 `s11_interpol_1.jpg`만 (로고 안 보임).
> `P/s12_sec_building_*`(받아지는 경우)도 기관 문장(seal)이 보이면 쓰지 않거나 그 부분을 잘라내세요.

---

## 1. 공통 규칙 (모든 섹션에 적용)

### 1-1. 색보정 (teal & red)
- **조정 레이어 1개를 타임라인 맨 위 트랙 전체에 깔기** (CapCut: 효과 탭 옆 `조정` → `조정 레이어 추가`, 길이를 영상 전체로).
  - 대비 +12, 하이라이트 −10, 그림자 −8, 채도 −15, 온도 −8(살짝 차갑게), 비네팅 +20.
  - HSL: 주황·빨강은 채도 유지(+5), 파랑·청록은 채도 +10, 초록 −30 (화면 속 초록 차트·나무가 튀지 않게).
  - 이유: 사진·스톡·AI 영상의 출처가 제각각이라 색이 따로 놉니다. 같은 LUT 느낌을 한 번에 입혀야 "한 작품"처럼 보입니다.
- 모션그래픽(`M/`)과 카드 줌(`Z/`)은 이미 채널 색(어두운 #0d0e11, 빨강 #d7263d, 종이색 #f3ede2)으로 만들어져 있으니 **조정 레이어 아래가 아니라 위 트랙**에 올리거나, 조정 레이어를 그 구간에서 잘라 내세요(색이 두 번 먹으면 빨강이 탁해짐).
- 붕괴 장면(7장)만 빨강을 한 단계 더: 해당 구간 조정 레이어에서 온도 −12, 빨강 채도 +15.

### 1-2. 페이싱
- **화면 변화 3~5초**: 사진 한 장을 5초 이상 두지 않기. 오래 머물러야 하면 같은 사진에서 줌 방향을 바꿔 두 컷으로 나누기.
- **패턴 인터럽트 60~90초마다**: 챕터 카드, 숫자 카운트업, 스탬프, 검은 화면 인용, 음악 끊기 중 하나. 아래 표의 ★ 표시가 인터럽트 지점입니다.
- **리텐션 훅과 회수 지점** (대본 주석 기준):
  - 훅 ①(2장 끝 "Keep the name Chai in mind", ~3:20) → 회수 12장 SEC/Chai(~17:30)
  - 훅 ②(5장 끝 "Hold on to that question", ~7:55) → 회수 12장 유죄 인정 인용(~18:00)
  - 훅 ③(6장 끝 질문 카드 2장, ~9:45) → 위 두 회수 지점에서 **같은 질문 카드 스타일을 0.5초 플래시**로 다시 보여 주면 시청자가 "아, 그 질문" 하고 연결합니다.
  - Three Arrows: 6장에서 소개 → 9장 회수.

### 1-3. 자막 (일반 자막)
- CapCut `텍스트` → `자동 캡션` → 언어 영어 → 생성 후 스타일 일괄 적용:
  - 위치: **하단 중앙**, 화면 아래에서 약 8% 위.
  - 글꼴: 굵은 산세리프(Arial Bold/Liberation Sans Bold 계열), 흰색, 크기 6~7.
  - 배경: `배경` 켜기 → 검정, 불투명도 60~70%, 모서리 약간 둥글게(상자형).
  - 한 줄 최대 약 42자, 두 줄 넘지 않게. 자동 캡션이 고유명사(Do Kwon, Terraform, Anchor, Podgorica)를 틀리게 받아쓰는지 꼭 검수.
- **핵심 문장은 자막이 아니라 화면 중앙 모션 클립(`M/`)이 대신합니다.** 그 구간에서는 하단 자막을 지우세요(같은 문장이 두 번 보이면 산만함).

### 1-4. 음악·효과음 (무료만: YouTube 오디오 보관함, Pixabay. Artlist 사용 금지)
- **덕킹**: 나레이션 트랙 선택 → 음악 트랙 선택 후 `오디오` → `볼륨`에서 나레이션 구간 −18~−22 dB, 나레이션이 없는 구간(비트, 챕터 카드) −8~−10 dB. 키프레임 2개로 0.3초 안에 올리고 내리기. (CapCut 일부 버전의 `자동 덕킹`이 있으면 그걸 써도 됨.)
- 효과음 검색어 (Pixabay Sound Effects / YouTube 오디오 보관함):
  - `whoosh` (전환·텍스트 등장), `riser`/`cinematic riser` (긴장 고조 1~3초 전), `impact`/`cinematic boom` (스탬프·숫자 착지), `typewriter`/`keyboard typing` (타자기 클립), `heartbeat` (리텐션 훅·체포), `glitch` (붕괴 숫자), `clock ticking` (7장), `gavel` (판결), `camera shutter` (사진 전환 일부), `paper` (문서 카드).
- **무음/음악 드롭**: 가장 중요한 한 문장 직전 0.5~1초 음악을 완전히 끊고(볼륨 0) 효과음 하나만 남기면 그 문장이 꽂힙니다. 아래 표에 "드롭"으로 표시.

### 1-5. 사진 처리 기본값
- **켄 번스**: 모든 정지 사진은 키프레임 2개로 100% → 110~115% 확대 + 살짝 이동(4~5초). 방향을 컷마다 바꾸기(줌인 → 줌아웃 → 좌→우 팬).
- **2.5D 패럴랙스**(중요 사진만, 섹션당 1장 정도): 사진을 두 번 올리고 위 트랙에서 `마스크`로 앞쪽 피사체(건물·비행기 등)만 남김 → 위 트랙은 115%까지, 아래 트랙(배경)은 105%까지만 확대. 앞뒤가 다른 속도로 움직여 입체감이 생깁니다.
- 사람 얼굴이 식별되는 사진은 쓰지 않습니다 (배경 군중은 블러 처리).

---

## 2. 섹션별 편집표

표의 "순서" 칸은 위에서 아래로 타임라인 순서입니다. ★ = 패턴 인터럽트.

### 0. Cold open (0:00–0:53)
| 시간 | 순서 (에셋) | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 0:00–0:04 | ★ `M/s00_countup_40B.mp4` | 첫 화면부터 숫자로 후킹. "May 2022" 나레이션과 동시에 시작 | 낮은 드론 + 숫자 착지 순간 `impact` |
| 0:04–0:14 | `AI-01` (트레이딩룸, 화면이 빨갛게) → `STOCK: stock market red` | AI-01은 처음 3초를 **스피드 램프**(100%→40%)로 느리게. 붕괴 직전의 "정지된 순간" 느낌 | 드론 유지, `riser` 작게 |
| 0:14–0:24 | `P/s07_trading_screens_1.jpg` (켄 번스 줌인) → `P/s07_trading_screens_2.jpg` (좌→우 팬) | 3~5초마다 화면 교체 | — |
| 0:24–0:36 | `AI-02` (밤 아파트, 떨리는 손) → `P/s01_seoul_skyline_1.jpg` (패럴랙스) → `P/s11_singapore_1.jpg` | "Seoul, Singapore, the United States" 단어에 맞춰 컷 (말과 화면 맞추기) | `heartbeat` 시작 |
| 0:36–0:37 | 검은 화면 1초 (비트) | **음악 드롭**: 드론까지 끊고 심장박동만 | heartbeat만 |
| 0:37–0:42 | ★ `M/s00_wordbyword_poor_quote.mp4` | 대본 [SCREEN] "Black screen, white text" 그대로. 하단 자막 지우기 | 단어 등장마다 아주 작은 `typewriter` 클릭(선택) |
| 0:42–0:50 | `AI-08` (공항 실루엣) → `AI-15` (빈 법정) | "arrested at an airport", "New York courtroom"에 맞춰 **J-컷**: 다음 장면의 공항 안내방송/빗소리를 0.5초 먼저 깔기 | `whoosh` |
| 0:50–0:53 | `M/s00_logo_sting.mp4` (2.6초) → 바로 `M/s00_chapter_the_40_billion_vanishing_act.mp4` | 로고 스팅은 3초 미만. 이어지는 타이틀 카드가 "본편 시작" 신호 | 로고에 `cinematic hit` 1발 |

### 1. The golden boy (0:53–2:13)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 0:53–0:57 | ★ `M/s01_chapter_the_golden_boy.mp4` | 챕터 카드는 모든 섹션 첫 4초 고정 → 시청자가 구조를 느낌 | `whoosh` + 밝은 일렉트로닉 시작(몰락 전의 착시) |
| 0:57–1:12 | `P/s01_seoul_skyline_2.jpg` → `P/s01_stanford_1.jpg` → `P/s01_stanford_2.jpg` → `P/s01_gangnam_1.jpg` | 켄 번스, 컷마다 방향 바꾸기. "Stanford", "Microsoft and Apple", "came home"에 컷 | — |
| 1:12–1:25 | `AI-03` (무대 실루엣) | 대본 [SCREEN] 실루엣 카드 2장: CapCut 텍스트로 "DO KWON — the coder" / "DANIEL SHIN — the dealmaker"를 **분할 화면**(좌우)으로. 사진 없이 이름만 | `whoosh` 두 번 |
| 1:25–1:40 | `STOCK: phone scrolling social media` (어둡게) + 팔로워 카운터 | 카운터는 PPT로 만들거나 CapCut 텍스트 키프레임. "~1,000,000" | 알림음 `notification` 2~3번 |
| 1:40–2:13 | 비트코인 vs 스테이블코인 도표(PPT) → `P/s06_bitcoin_1.jpg` → 도표 마지막 "Terra didn't." | "Terra didn't." 직전 0.5초 **음악 드롭** → 다음 섹션으로 **L-컷**(나레이션 끝을 다음 장면 위로 이어 붙임) | 드롭 후 `low boom` |

### 2. Coffee paid in crypto (2:13–3:28)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 2:13–2:17 | ★ `M/s02_chapter_coffee_paid_in_crypto.mp4` | | `whoosh` |
| 2:17–2:35 | `AI-09` (카페 결제 손) → `STOCK: Seoul cafe` → `STOCK: mobile payment` | **매치 컷**: 커피잔 원형 → 다음 장면의 둥근 결제 단말기/코인으로 같은 위치에서 넘기기 | 카페 앰비언스(`cafe ambience`) 낮게 |
| 2:35–2:55 | "Customer pays in won → KRT → Merchant" 도표 (PPT) | 화살표가 하나씩 나타나게(3~4초 간격) | `click` |
| 2:55–3:10 | "Terra said: 500,000 users, 2.7 million transactions" 인용 카드 (PPT, "Terra said" 반드시 표기) | 인용 출처를 화면에 고정 | — |
| 3:10–3:28 | `P/s01_gangnam_2.jpg` 천천히 줌인 → 마지막 문장 "In a courtroom." 에서 **검은 화면 0.5초** | 리텐션 훅 ①. 문장 끝에 음악 드롭 + `heartbeat` 1회 | 드롭 |

### 3. The magic trick (3:28–5:00)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 3:28–3:32 | ★ `M/s03_chapter_the_magic_trick.mp4` | | 가볍고 궁금증을 주는 플럭 음악 |
| 3:32–4:15 | UST ↔ LUNA 교환 애니메이션 (PPT) → 4단계 예시 카드 (PPT: $0.97 → $1.00 → 3¢ → burned) | 설명 구간이라 화면 변화는 "단계가 하나씩 켜지는 것"으로 3~4초 리듬 유지 | 단계마다 `pop` |
| 4:15–4:35 | `AI-04` (유리 기둥 위 코인 탑) | "Just code, and confidence." 에서 1초 정지(**프리즈 프레임**) | `glass crack` 아주 작게 |
| 4:35–5:00 | `STOCK: cryptocurrency` 어둡게 → 검은 화면에 `M/s00_wordbyword_poor_quote.mp4` **재사용**(3초만) | 대본상 같은 인용이 다시 나옴. 콜드오픈과 같은 그래픽이라 "아까 그 말"로 연결 | 드롭 |

### 4. The 20% promise (5:00–6:37)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 5:00–5:04 | ★ `M/s04_chapter_the_20_promise.mp4` | | |
| 5:04–5:09 | ★ `M/s04_countup_20pct.mp4` | 대본 [SCREEN] "Big number, slowly counting up: ~20% per year" | `riser` → 착지 `impact` |
| 5:09–5:25 | `STOCK: bank interest` 류 정지 화면 → 은행 이자 vs 앵커 막대그래프(PPT) + `M/s04_lowerthird_anchor.mp4` (블렌드 `스크린`) | 로어서드는 "Anchor Protocol" 첫 언급 때 | `whoosh` 작게 |
| 5:25–5:45 | `AI-05` (빛나는 문으로 걷는 군중) | **스피드 램프**: 처음 1초 빠르게 → 슬로모션 | 밝은 음악 최고조 |
| 5:45–6:00 | `P/s04_nationals_park_1.jpg` (패럴랙스) → `P/s04_nationals_park_2.jpg` | "Washington Nationals"에 맞춰. 경기장 사진에 선수 얼굴이 보이면 블러 | 관중 함성 `stadium crowd` 아주 작게 |
| 6:00–6:37 | 앵커 준비금 막대 고갈 → "+450M UST" 충전 (PPT) | 막대가 줄어드는 동안 음악을 서서히 낮춤 → 충전 순간 `impact` | `drain`/`low pulse` |

### 5. The hidden rescue (6:37–8:00)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 6:37–6:41 | ★ `M/s05_chapter_the_hidden_rescue.mp4` | | 피아노 한 음, 미스터리 |
| 6:41–6:45 | `M/s05_typewriter_may2021.mp4` | 대본 [SCREEN] "May 2021 — one year earlier" 플래시백. 직전에 **글리치 전환**(CapCut 전환 `글리치`)으로 과거로 | `typewriter` |
| 6:45–7:05 | `AI-06` (커튼 뒤 손) | 화면 가장자리에 `빛 번짐(light leak)` 효과를 아주 약하게(불투명도 20%) → 과거 장면임을 표시 | — |
| 7:05–7:25 | `Z/card_02_sec_order_2024-12-20_zoom.mp4` (7초 전체) | "May 23, 2021", "verbal agreement"에 형광펜이 맞춰지도록 나레이션 위치 조정 | `paper` |
| 7:25–7:30 | ★ `M/s05_countup_20M_UST_sec.mp4` | "ACCORDING TO THE SEC" 문구가 화면에 있음 (법적 표현 유지) | 착지 `impact` |
| 7:30–8:00 | `AI-06` 다른 구간 → 검은 화면 + 하단 자막만 "So who knew?" | 리텐션 훅 ②. 마지막 문장 전 **음악 드롭** | `heartbeat` |

### 6. The bitcoin war chest (8:00–10:05)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 8:00–8:04 | ★ `M/s06_chapter_the_bitcoin_war_chest.mp4` | | 점점 고조되는 신스 시작 |
| 8:04–8:20 | `AI-10` (금고) → `P/s11_singapore_2.jpg` + `M/s06_lowerthird_lfg.mp4` (스크린 블렌드) | "Luna Foundation Guard... Singapore"에서 로어서드 | 금고 문 `metal door` |
| 8:20–8:35 | "$1B LUNA sale, led by Jump Crypto, Three Arrows Capital" 카드 (PPT, 로고 없이 글자만) | "Remember that second name" 때 Three Arrows 글자만 빨강으로 강조 → 9장 회수용 | — |
| 8:35–8:41 | ★ `M/s06_countup_80394_BTC.mp4` | 대본 [SCREEN] "0 → 80,394 BTC, ≈ $2.4B (May 7, 2022)" | 카운트 동안 `cash counter` 짧게 → `impact` |
| 8:41–9:30 | `P/s06_bitcoin_2.jpg` → `P/s06_bitcoin_3.webp` → `STOCK: bitcoin` → "19B UST vs 2.4B reserve" 비교 막대(PPT) | 비교 막대는 **분할 화면**처럼 좌(준비금) 우(UST) | 음악 서서히 상승 |
| 9:30–9:36 | ★ `M/s06_keyphrase_hook_questions.mp4` (5.5초) | 리텐션 훅 ③. 직전 1초 **완전 무음** → 질문 1, 2가 하나씩 뜰 때 심장박동 | 음악 끊고 `heartbeat`만 |
| 9:36–10:05 | 검은 화면 위 같은 질문 카드 정지 프레임(마지막 프레임 연장) → 다음 섹션으로 **휩 팬 전환** | "One by a jury. The other by Do Kwon himself."까지 유지 | `whoosh` |

### 7. Seven days in May (10:05–12:38) — 영상의 클라이맥스
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 10:05–10:09 | ★ `M/s07_chapter_seven_days_in_may.mp4` | | 시계 째깍 `clock ticking` 시작, 이 섹션 내내 유지 |
| 10:09–10:13 | `M/s07_typewriter_sat_may07.mp4` | 요일 스탬프 5개는 모두 같은 그래픽 → 반복이 "카운트다운" 리듬을 만듦 | `typewriter` |
| 10:13–10:45 | `AI-11` (찢기는 달력) → Curve 풀 기울어지는 막대(PPT) → "$0.99" 큰 숫자 | "a penny is a crack in the glass"에서 `AI-04` 유리 기둥 1초 재사용(**매치 컷**) | `glass crack` |
| 10:45–10:48 | `M/s07_typewriter_sun_may08.mp4` | | `typewriter` |
| 10:48–11:05 | `STOCK: people leaving` 어둡게 → "Deploying more capital. Steady lads." 검은 화면 흰 글씨 (CapCut 텍스트, 트윗 캡처 금지) | | — |
| 11:05–11:08 | `M/s07_typewriter_mon_may09.mp4` | | `typewriter` |
| 11:08–11:35 | `AI-07` (붉은 비 내리는 도시) → 앵커 예치금 140억→90억 막대 → UST $0.35 | AI-07에 **글리치 효과**(CapCut 효과 `글리치`/`VHS`) 0.3초씩 2번. 붕괴를 "고장"으로 체감 | `glitch` |
| 11:35–11:55 | 죽음의 소용돌이 도표 (PPT, 4개 화살표가 원을 그리며 점점 빨라지게) | **스피드 램프**를 도표 녹화본에 적용(점점 빠르게) | 저음 `low drone` 상승 |
| 11:55–11:59 | `M/s07_typewriter_tue_wed_may10_11.mp4` | | |
| 11:59–12:10 | `P/s07_trading_screens_3.jpg` + LUNA 발행량 카운터(PPT) | 발행량 숫자 폭증 화면에서 **화면 흔들림**(CapCut 효과 `흔들기`) | `glitch` |
| 12:10–12:14 | `M/s07_typewriter_thu_fri_may12_13.mp4` | | |
| 12:14–12:22 | `STOCK: server room` (어둡게, 색 빼기) → "I am heartbroken…" | ★ `M/s07_wordbyword_heartbroken.mp4` (6초). 직전 **음악 드롭** | 무음 → 피아노 한 음 |
| 12:22–12:27 | ★ `M/s07_countdown_80394_to_313_BTC.mp4` | 숫자가 빨갛게 무너지고 글리치. 이 섹션의 "충격" 지점 | `glitch` + `impact` |
| 12:27–12:38 | `AI-02 variant` (새벽, 엎어 둔 휴대폰) → `P/s01_seoul_skyline_3.jpg` 천천히 줌아웃 | "Around 40 billion dollars of value, gone" 동안 **완전 정적** 1초 뒤 낮은 피아노 | 째깍 소리 여기서 멈춤 |

### 8. The Lunatics (12:38–13:44)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 12:38–12:42 | ★ `M/s08_chapter_the_lunatics.mp4` | | 음악 거의 없음, 조용한 피아노 |
| 12:42–13:05 | `AI-12` (꺼져 가는 채팅 말풍선) → `STOCK: typing phone night` | 화면 변화는 느리게(5초). 피해자 섹션은 일부러 속도를 늦춰 **톤 대비** | — |
| 13:05–13:25 | 포럼 모형 화면 "Support resources" (PPT, 닉네임 없이 회색 박스) → `P/s13_apartments_1.jpg`(받아진 경우) 또는 `STOCK: Seoul apartment night` | | — |
| 13:25–13:44 | 검은 화면 + 하단 자막만 "Their losses are not entertainment." | 효과음·전환 효과 일절 없음 (존중) | 무음 2초 |

### 9. The dominoes (13:44–15:09)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 13:44–13:48 | ★ `M/s09_chapter_the_dominoes.mp4` | | 느린 퍼커션 |
| 13:48–14:05 | `AI-13` (유리 도미노 빌딩) | 도미노 넘어지는 순간마다 **스피드 램프**(넘어지기 직전 슬로 → 충돌 순간 정상) | `impact` 작게 반복 |
| 14:05–14:35 | 도미노 타임라인 (PPT: Terra → Three Arrows → Voyager, Celsius → FTX) | "Remember Three Arrows"에서 6장 카드 1초 플래시백(회수) | `whoosh` |
| 14:35–15:00 | `Z/card_09_sbf_convicted_2023-11-02_zoom.mp4` → `STOCK: legal documents` | | `paper` |
| 15:00–15:09 | `AI-13` 마지막 도미노 정지 프레임 | | — |

### 10. Terra 2.0 (15:09–15:56)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 15:09–15:13 | ★ `M/s10_chapter_terra_2_0.mp4` | | 공허한 앰비언트 |
| 15:13–15:35 | `AI-14` (재 속에서 떠오르는 금 간 코인) → "Terra Classic / LUNC / USTC → new LUNA" 도표 (PPT) | | `ember crackle` |
| 15:35–15:56 | 새 LUNA 가격 하락 그래프 (PPT, 공개 데이터) | "There was no new UST." 문장 직전 **드롭** | 드롭 |

### 11. The chase (15:56–17:06)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 15:56–16:00 | ★ `M/s11_chapter_the_chase.mp4` | | 빠른 박자의 긴장감 있는 곡 |
| 16:00–16:06 | `M/s11_route_seoul_to_montenegro.mp4` | 대본 [SCREEN] 지도 애니메이션 "Seoul → Singapore → Serbia → Montenegro" | 선이 그어질 때 `whoosh` |
| 16:06–16:30 | `P/s11_singapore_3.jpg` (패럴랙스) → `P/s11_interpol_1.jpg` (켄 번스) → `STOCK: passport` | 장면 사이 **휩 팬 전환**(추격 느낌). `s11_interpol_2.jpg`는 사용 금지 | `whoosh` × 2 |
| 16:30–16:45 | `AI-08` (공항 출국장 실루엣) → `P/s11_podgorica_airport_1.jpg` + `M/s11_lowerthird_podgorica.mp4` (스크린) | "It was Do Kwon." 직전 **음악 드롭** + `heartbeat` 1회 | 드롭 |
| 16:45–17:06 | `P/s11_podgorica_city_1.jpg` → `P/s11_podgorica_airport_2.jpg` → 한·미 국기 줄다리기 (직접 제작, 국기 아이콘만) | | — |

### 12. The verdicts (17:06–18:27) — 훅 회수
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 17:06–17:10 | ★ `M/s12_chapter_the_verdicts.mp4` | | `gavel` + 정적 |
| 17:10–17:20 | `AI-15` (빈 법정) → `P/s12_courthouse_ny_1.jpg`(받아진 경우) | | — |
| 17:20–17:27 | `Z/card_01_sec_charges_2023-02-16_zoom.mp4` | | `paper` |
| 17:27–17:34 | `Z/card_03_sec_chai_allegation_zoom.mp4` | **훅 ① 회수**: 들어가기 직전 2장의 Chai 카페 화면(`AI-09`)을 0.5초 플래시 | `whoosh` 역재생 |
| 17:34–17:38 | ★ `M/s12_stamp_liable_for_fraud.mp4` | 배심 평결(민사) 순간. 스탬프 충돌에 맞춰 `impact` | `impact` |
| 17:38–17:50 | `Z/card_04_jury_verdict_2024-04-05_zoom.mp4` → `Z/card_05_sec_settlement_2024-06-13_zoom.mp4` | | `paper` |
| 17:50–17:58 | 검은 화면 (비트) → ★ `M/s12_wordbyword_plea_quote.mp4` (6초) | **훅 ② 회수**: 대본 [SCREEN] "Plea quote on black, white text, slow fade-in". 인용 동안 **완전 무음** | 무음 |
| 17:58–18:05 | `Z/card_06_kwon_plea_2025-08_zoom.mp4` (앞 3~4초) | "That was the hidden rescue." | 피아노 한 음 |
| 18:05–18:10 | ★ `M/s12_stamp_15_years.mp4` | 15년 선고. 스탬프 → 화면 흔들림이 이미 들어 있음 | `gavel` + `impact` |
| 18:10–18:27 | `G/gov_01_doj_kwon_sentenced_2025-12-11.png` (켄 번스) → `Z/card_07_doj_sentence_2025-12-11_zoom.mp4` | 미국 정부 문서는 출처 자막 표기 | — |

### 13. The Korean side of the story (18:27–19:42)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 18:27–18:31 | ★ `M/s13_chapter_the_korean_side_of_the_story.mp4` | | 조용한 피아노 |
| 18:31–18:45 | `AI-02 variant` (서울 아파트 창문들) → `P/s13_apartments_*.jpg` | | — |
| 18:45–18:50 | ★ `M/s13_countup_280000_korea.mp4` | "According to figures from Korean financial authorities" 문구 화면에 포함 | `impact` 작게 |
| 18:50–19:10 | `P/s13_yeouido_*.jpg` (패럴랙스) → 한국 기사 헤드라인 그래픽 (직접 제작, 언론사 로고 없이) | | — |
| 19:10–19:25 | `P/s13_seoul_court_*.jpg` + 하단 자막 | "Shin denies wrongdoing" 문장은 화면에도 그대로 (법적 균형) | — |
| 19:25–19:42 | 지도: New York → Seoul (PPT 화살표) | | `whoosh` |

### 14. Why the dream keeps coming back (19:42–21:10)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 19:42–19:46 | ★ `M/s14_chapter_why_the_dream_keeps_coming_back.mp4` | | |
| 19:46–20:10 | `AI-16` (팽이 위 코인) → Iron Finance 그래프 (PPT) + `G/gov_06_fed_note_algorithmic_stablecoins.png` | | — |
| 20:10–20:15 | ★ `M/s14_keyphrase_confidence_collateral.mp4` | "Confidence is the collateral." 직전 **드롭** | 드롭 → `impact` 작게 |
| 20:15–20:40 | 앵커 이자 계산 카드 (PPT: "14,000,000,000 UST × ~19.5% ≈ $2.7B a year", "illustrative" 표기) | | — |
| 20:40–21:10 | `Z/card_08_genius_act_2025-07-18_zoom.mp4` → `STOCK: capitol building` | | 피아노 |

### 15. Outro (21:10–22:00)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 21:10–21:14 | ★ `M/s15_chapter_outro.mp4` | | 피아노 |
| 21:14–21:35 | `AI-01 variant` (조용해진 트레이딩룸, 화면 하나 깜빡임) — 콜드오픈 AI-01과 **매치 컷**으로 시작 | 처음과 같은 구도라 "한 바퀴 돌았다"는 느낌 | — |
| 21:35–21:45 | 검은 화면 + 하단 자막 "where is the money actually coming from?" | 마지막 질문 전 1초 **완전 정적** | 무음 |
| 21:45–22:00 | EP.02 예고: `STOCK: rain window night` + 텍스트 → 구독 유도 + 엔드스크린 | 엔드스크린 영역(마지막 20초) 확보 | 음악 서서히 페이드아웃 |

---

## 3. CapCut 사용법 (이 편집에 쓰는 기법만)

| 기법 | CapCut PC에서 하는 법 |
|---|---|
| **키프레임 줌(켄 번스)** | 클립 선택 → 오른쪽 `동영상` → `기본` → 재생헤드를 클립 시작에 두고 `크기`·`위치` 옆 ◇(키프레임) 클릭 → 재생헤드를 끝으로 옮겨 크기 110~115%, 위치 살짝 변경. 자동으로 두 번째 키프레임 생성. 키프레임 우클릭(또는 `이징`) → `ease in-out`으로 부드럽게 |
| **2.5D 패럴랙스** | 같은 사진을 두 트랙에 겹쳐 둠 → 위 트랙 선택 → `마스크` → `사각형`/`원형` 또는 `배경 제거`(자동 누끼)로 앞 피사체만 남김 → 위 트랙 115%, 아래 트랙 105%로 각각 키프레임 줌 |
| **J-컷 / L-컷** | 영상과 오디오가 붙어 있는 클립은 우클릭 → `오디오 분리`. J-컷 = 다음 장면 **소리**를 앞으로 0.5~1초 당김. L-컷 = 앞 장면 소리(나레이션 끝, 현장음)를 다음 화면 위로 0.5~1초 늘림 |
| **매치 컷** | 앞 클립 마지막 프레임과 다음 클립 첫 프레임에서 모양·위치가 같은 물체(원형 컵 → 원형 코인)를 찾아, `위치`/`크기`로 두 물체가 화면의 같은 자리에 오게 맞춘 뒤 전환 없이 바로 자르기 |
| **스피드 램프(속도 곡선)** | 클립 선택 → `속도` → `곡선` → `사용자 지정` → 점을 끌어서 "빠름 → 느림 → 빠름" 모양. 슬로 구간이 끊기면 `부드러운 슬로모션(광학 흐름)` 켜기 |
| **휩 팬 전환** | 두 클립 사이 `전환` 탭 → `흐림`/`카메라` 계열의 `휩 팬`(또는 `Pull in`) → 길이 0.3~0.4초. 같은 순간에 `whoosh` 효과음 |
| **빛 번짐(light leak)** | `효과` → `동영상 효과` → 검색 "Light leak"/"빛 번짐" → 클립 위에 올리고 불투명도 20~40%. 또는 Pixabay에서 `light leak` 무료 영상을 받아 위 트랙 + 혼합 `스크린` |
| **글리치 히트** | `효과` → 검색 "Glitch" → 0.2~0.4초만 클립 위에 짧게 배치. 같은 지점에 `glitch` 효과음 |
| **분할 화면** | 두 클립을 위아래 트랙에 겹치고, 각각 `크기` 50%·`위치`로 좌우 배치. 또는 `마스크` → `분할`(직선 마스크)로 화면 반씩 |
| **혼합 모드(로어서드 겹치기)** | `M/*_lowerthird_*.mp4`는 검은 바탕이라 영상 위 트랙에 올리고 → `동영상` → `혼합` → **`스크린`**. 검은 부분이 투명해지고 글자·빨간 막대만 남음 |
| **음악 드롭 / 덕킹** | 음악 클립 선택 → `볼륨` 키프레임. 드롭: 해당 지점 0.1초 앞뒤로 키프레임 두 개 → 0으로. 덕킹: 나레이션 구간 −20dB |
| **자동 캡션 스타일** | `텍스트` → `자동 캡션` → 생성 → 아무 자막 하나 선택 → 글꼴/크기/흰색/`배경`(검정 65%) 설정 → `모든 캡션에 적용`. 위치는 하단 중앙. 모션 클립 구간 자막은 삭제 |
| **조정 레이어(색보정)** | `조정` → `조정 레이어 추가` → 위 1-1 수치 입력 → 타임라인에서 영상 길이만큼 늘리기 |
| **프리즈 프레임** | 재생헤드 위치에서 클립 우클릭 → `프레임 정지` (기본 3초, 필요한 만큼 자르기) |

---

## 4. 업로드 전 체크
- [ ] 화면 어디에도 실존 인물(권도형·신현성·SBF 등)의 얼굴·사진·닮은 AI 이미지 없음
- [ ] 뉴스 영상·통신사 사진·기관 로고(SEC 문장, 인터폴 엠블럼 등) 없음 — `s11_interpol_2.jpg` 제외 확인
- [ ] 법적 표현 유지: "alleged", "according to the SEC", "according to prosecutors", "Shin denies wrongdoing"
- [ ] 위키미디어 사진 출처를 설명란에 표기 (`youtube/assets/CREDITS.md`)
- [ ] 음악·효과음은 YouTube 오디오 보관함 / Pixabay만, '저작자 표시 필요' 곡은 설명란 표기
- [ ] 사실처럼 보일 수 있는 AI 장면(공항·아파트 등)은 업로드 시 "변경되었거나 합성된 콘텐츠" 표시 검토
