# EP.02 편집 계획서 — The Funeral Nobody Believed (Cho Hee-pal)

대본: `youtube/fraud_ep02_cho_hee_pal_en.md` (약 22분, 13개 섹션) · 편집 프로그램: CapCut PC
목표: **3~5초마다 화면 변화, 60~90초마다 패턴 인터럽트**, 그리고 "사망은 공식 발표일 뿐 의혹은 증명되지 않았다"는 법적 균형을 화면에서도 지키기.
화면 속 영어 문구는 대본 그대로 둡니다. 타이밍은 대본 섹션 시간 기준이며 나레이션 녹음 후 맞춰 조정하세요.

---

## 0. 파일 경로 약어

| 약어 | 실제 폴더 | 내용 |
|---|---|---|
| `M/` | `youtube/assets/ep02_cho_hee_pal/motion/` | 모션그래픽 MP4 (목록: `youtube/assets/README_motion.md`) |
| `Z/` | `youtube/assets/ep02_cho_hee_pal/cards/zoom/` | 판결·발표 카드 줌인 클립 (7초, 잘라 쓰기) |
| `P/` | `youtube/assets/ep02_cho_hee_pal/` | 위키미디어 사진. **현재 내려받는 중**이라 파일명은 `fetch_commons.py`의 예정 이름(`s01_daegu_skyline_1.jpg` 등)으로 적었습니다. 없는 파일은 같은 줄의 STOCK으로 대체 |
| `AI-xx` | 대본 맨 아래 프롬프트 표 | AI 영상 (직접 생성. Higgsfield는 쓰지 않음) |
| `STOCK:` | Pexels / Pixabay 검색어 | 무료 스톡 (얼굴이 또렷한 클립·로고 노출 클립 제외) |

> **기관 사진 주의**: `P/s06_police_agency_*`, `P/s06_prosecutors_*`, `P/s08_supreme_court_*`, `P/s08_daegu_court_*`, `P/s10_seoul_court_*` 는 건물 정면에 **경찰·검찰·법원 엠블럼**이 찍혀 있을 가능성이 큽니다. 대본 규칙상 엠블럼은 노출 금지이므로, 엠블럼이 보이면 그 사진은 쓰지 않거나 엠블럼이 프레임 밖으로 나가게 크롭(키프레임 확대)하세요.
> 조희팔·강태용·유죄 공무원의 사진은 어떤 경우에도 쓰지 않습니다. 공무원은 계급만 표기(카드에 이미 반영).

---

## 1. 공통 규칙

### 1-1. 색보정 (teal & red)
- 조정 레이어 1개를 영상 전체에: 대비 +12, 하이라이트 −10, 그림자 −8, 채도 −15, 온도 −8, 비네팅 +20, HSL 초록 −30·청록 +10.
- 이유: 위키미디어 사진(낮 풍경이 많음)과 AI 야간 장면의 온도 차이를 줄여 한 톤으로 묶음.
- 1~3장(사기의 "좋은 시절")은 온도 −4로 덜 차갑게, 4장부터 −10으로 점점 차갑게 → 이야기의 분위기 변화가 색으로도 느껴짐.
- 모션 클립(`M/`)·카드 줌(`Z/`)은 조정 레이어 위 트랙에 두거나 그 구간에서 조정 레이어를 잘라내기.

### 1-2. 페이싱 · 리텐션
- 화면 변화 3~5초, 패턴 인터럽트 60~90초 (아래 ★).
- **훅과 회수** (대본 주석):
  - 훅: 5장 끝(~9:40) "Remember one document" 카드 → `M/s05_keyphrase_remember_document.mp4`
  - 회수 ①: 6장(10:08~) 호텔 커피숍의 수표 → 공무원 판결
  - 회수 ②: 7장(~13:30) 화장 증명서 날짜 → `M/s07_typewriter_cremation_dates.mp4`
  - 회수 지점 직전에 훅 카드를 0.5초 플래시로 다시 보여 주기.
- 7장(3분 29초)은 이 영상에서 가장 긴 섹션 → 내부에 인터럽트를 3번(경찰 발표 카드 → 날짜 타자기 → "never proven" 카드 → 경로 지도 → "CASE CLOSED" 스탬프) 배치해 지루함 방지.

### 1-3. 자막
- 자동 캡션(영어) → 하단 중앙, 흰색 굵은 산세리프, 검정 배경 상자 60~70%, 두 줄 이내.
- 고유명사 검수: Cho Hee-pal, Kang Tae-yong, Daegu, Taean, Miryang, Weihai, Wuxi, Sisa IN, yusa-susin, jjimjilbang.
- 핵심 문장 구간은 하단 자막 대신 중앙 모션 클립.

### 1-4. 음악·효과음 (YouTube 오디오 보관함, Pixabay만. Artlist 금지)
- 덕킹: 나레이션 구간 음악 −18~−22 dB.
- 효과음 검색어: `waves`, `boat engine`, `heartbeat`, `cash counter`, `notification`(+₩35,000 "딩"), `gavel`, `rain city`, `projector`, `whoosh`, `riser`, `impact`, `typewriter`, `paper`, `glitch`.
- 섹션별 음악 분위기는 대본 "Music mood per section"을 그대로 따름.

### 1-5. 사진 처리
- 모든 정지 사진: 켄 번스(100→112%, 4~5초, 컷마다 방향 바꾸기).
- 섹션당 1장은 2.5D 패럴랙스(마스크로 앞 피사체 분리).
- 행인 얼굴이 식별되면 블러(`효과` → `흐림` + 마스크).

---

## 2. 섹션별 편집표 (★ = 패턴 인터럽트)

### 0. Cold open (0:00–0:48)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 0:00–0:04 | `M/s00_typewriter_december_2008.mp4` | 첫 화면을 날짜·장소로 → 다큐 신뢰감 | `typewriter` + 낮은 드론 |
| 0:04–0:16 | `AI-01` (밤바다로 나가는 어선) | **J-컷**: 파도·엔진 소리를 타자기 클립 끝 1초 전부터 깔기. AI-01 앞 2초 **스피드 램프** 슬로 | `waves`, `boat engine` |
| 0:16–0:28 | `AI-02` (여권·통장 든 손) → `STOCK: dark room lamp` | "Retirees. Homemakers. Small shop owners." 단어마다 컷 (3컷) | `heartbeat` |
| 0:28–0:29 | 검은 화면 (비트) | **음악 드롭** | 무음 |
| 0:29–0:34 | ★ `M/s00_wordbyword_died_officially.mp4` | 대본 [SCREEN] "Died: December 2011. Officially." | 단어마다 작은 클릭 |
| 0:34–0:45 | `AI-08` (꽃·빈 액자 제단) → `AI-01` 다른 구간 | "And almost nobody believed it." 직전 정적 0.5초 | 피아노 한 음 |
| 0:45–0:48 | `M/s00_logo_sting.mp4` → `M/s00_chapter_the_funeral_nobody_believed.mp4` | | `cinematic hit` |

### 1. The machine that paid every day (0:48–3:12)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 0:48–0:52 | ★ `M/s01_chapter_the_machine_that_paid_every_day.mp4` | | 가볍고 낙관적인 신스 시작 |
| 0:52–0:56 | `M/s01_typewriter_daegu.mp4` | 대본 [SCREEN] 캡션 "Daegu — one of Korea's largest cities" | `typewriter` |
| 0:56–1:10 | 한국 지도 → 대구 줌 (PPT) → `P/s01_daegu_skyline_1.jpg` (패럴랙스) → `P/s01_daegu_street_1.jpg` | **매치 컷**: 지도의 대구 점 위치 = 다음 사진의 도시 중심 | `whoosh` |
| 1:10–1:35 | `AI-10` (창가 실루엣, 얼굴 없음) | 인물 소개는 실루엣만. "BMC" 언급 때 CapCut 텍스트 "BMC — Daegu, October 2004" | — |
| 1:35–1:55 | `AI-03` (빈 안마의자 찜질방) → `STOCK: massage chair` → `STOCK: karaoke` | 기기 이름 나올 때마다 컷 | 찜질방 앰비언스 |
| 1:55–2:05 | 단계 1 카드 "You pay ₩4,400,000 = 1 machine" (PPT) | | `cash register` |
| 2:05–2:10 | ★ `M/s01_countup_35000_won_a_day.mp4` | 대본 [SCREEN] "+₩35,000 every business day". "according to Korean reporting from the time" 문구 포함 | `notification` 딩 |
| 2:10–2:30 | 단계 3 "166 payments ≈ 8 months → ₩5,810,000 back" (PPT) → `Z/card_02_the_promise_35000_won_zoom.mp4` | 카드 줌은 "fixed 35 percent a year" 문장에 맞춰 | `paper` |
| 2:30–2:50 | 막대그래프 "Advertised 35% (court) / ~48% / ~5%" (PPT) | 은행 5% 막대가 마지막에 작게 올라와 대비 극대화 | — |
| 2:50–3:12 | "유사수신 (yusa-susin) = taking deposits without a license" 텍스트 카드 (PPT. 한글은 PPT의 한글 글꼴 사용) | "the classic shape of a Ponzi scheme" 직전 **드롭** | 드롭 → `low boom` |

### 2. The ladder (3:12–5:02)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 3:12–3:16 | ★ `M/s02_chapter_the_ladder.mp4` | | |
| 3:16–3:45 | 직급 피라미드 (PPT: 부장 → 국장 → 본부장 → 단장 → 사업전무, 영어 병기) | 계단이 한 칸씩 올라가며 3~4초 리듬 | 단계마다 `pop` |
| 3:45–4:10 | 두 줄 × 12대 아이콘 → 280대로 폭발 (PPT) | 280대로 늘어나는 순간 **줌 아웃**(키프레임) → 규모감 | `riser` → `impact` |
| 4:10–4:25 | `AI-05` (세미나장 군중 뒷모습) | "your sister, your old classmates..." 단어마다 **스피드 램프** 짧게 | 박수 `applause` 아주 작게 |
| 4:25–4:40 | 회사 이름이 바뀌는 텍스트 박스 (PPT, 로고 없이) | 이름 바뀔 때 **글리치** 0.2초 | `glitch` |
| 4:40–4:57 | "New investors' money → paid out as 'rental income'" 도표 (PPT) | "According to prosecutors" 화면 표기 | — |
| 4:57–5:02 | ★ `M/s02_keyphrase_product_promise.mp4` | "The product changed. The promise didn't." 직전 드롭 | 드롭 → `impact` |

### 3. From Daegu to everywhere (5:02–6:47)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 5:02–5:06 | ★ `M/s03_chapter_from_daegu_to_everywhere.mp4` | | |
| 5:06–5:30 | `AI-04` (지도 위로 퍼지는 빛 점) → 지역별 지도 + "50+ centers" 카운터 (PPT) | | `whoosh` 작게 반복 |
| 5:30–5:45 | `P/s03_busan_1.jpg` → `STOCK: Seoul` → `STOCK: Incheon`(또는 위키미디어) | 지명 나올 때마다 컷 (**휩 팬**으로 빠르게 이어 확산 느낌) | `whoosh` |
| 5:45–6:10 | `AI-11` (카페 테이블, 여성들의 손) → `STOCK: apartment complex` | "seven in ten investors were homemakers" — 얼굴 없는 손 장면만 | — |
| 6:10–6:47 | `STOCK: bank passbook` / `AI-02` 다른 구간 → 매일 들어오는 입금 알림 반복 (PPT, +₩35,000 × 여러 번) | "Like clockwork." 에 맞춰 알림 반복 → 마지막 "Or it looked like proof." 직전 **드롭** | `notification` 반복 → 무음 |

### 4. The warnings (6:47–8:08)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 6:47–6:51 | ★ `M/s04_chapter_the_warnings.mp4` | | 신스 빠지고 `clock ticking` + 낮은 펄스 |
| 6:51–7:10 | 경고 타임라인 (PPT: 2006 → May 2007 → Aug 2007 → Apr 2008 → Sep 2008 → Oct 2008) | 연도 하나 켜질 때마다 `tick` | — |
| 7:10–7:20 | `STOCK: Korean small city` 또는 위키미디어 Miryang + `M/s04_lowerthird_miryang.mp4` (혼합 `스크린`) | | — |
| 7:20–7:35 | `AI-12` (파일을 닫아 서랍에 넣는 손) | **슬로모션** 50% — 수사가 "덮이는" 순간 강조 | `drawer close` |
| 7:35–7:45 | `Z/card_05_sergeant_district_court_zoom.mp4` (앞 5초) | "investigative convenience" 문장과 동시 | `paper` |
| 7:45–8:08 | "April 2008 — financial regulator alerts police" 카드 (PPT, FSS 로고 없이) + `M/s04_lowerthird_fss.mp4` (스크린) | "By then, it was too late." 직전 **드롭** | 드롭 |

### 5. The collapse and the escape (8:08–10:08)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 8:08–8:12 | ★ `M/s05_chapter_the_collapse_and_the_escape.mp4` | | 낮은 드론 + 바다 |
| 8:12–8:30 | 2008 타임라인 (PPT) → `STOCK: empty office night` → `STOCK: server room` | "systems were wiped" 순간 **글리치 히트** + 화면 꺼짐(검은 화면 3프레임) | `glitch`, `power down` |
| 8:30–8:40 | `STOCK: photocopier` (빈 종이만) | | 복사기 소리 |
| 8:40–8:44 | `M/s05_typewriter_dec9_2008_taean.mp4` | "according to investigators" 포함 | `typewriter` |
| 8:44–9:05 | `AI-01 variant` (해안경비 불빛) → `P/s05_taean_1.jpg` (패럴랙스) → `P/s05_anmyeondo_1.jpg` → `P/s05_yellow_sea_1.jpg` | 밤 장면 ↔ 낮 사진 사이 **디졸브**(0.5초)로 온도 차를 부드럽게 | `waves`, `boat engine` |
| 9:05–9:12 | ★ `M/s05_countup_5_trillion_won.mp4` (5.5초) | 대본 [SCREEN] "₩5,071,500,000,000" | `cash counter` → `impact` |
| 9:12–9:25 | `Z/card_01_scale_70000_victims_zoom.mp4` (앞 5초) | | `paper` |
| 9:25–9:35 | 분할 카드 "~5 trillion won" vs "~840 billion won" (PPT) | **분할 화면** 좌우 비교 | — |
| 9:35–9:45 | 검은 화면 1초 → ★ `M/s05_keyphrase_remember_document.mp4` (5초) | 리텐션 훅. 음악 완전히 끊고 심장박동만 | `heartbeat` |
| 9:45–10:08 | `AI-13` (수표가 접시 밑으로, 1초만 "예고 플래시") → `STOCK: paper document close up` | "a cheque..." / "a single piece of paper" 문장에 각각 1컷 | — |

### 6. The twist: who was on the payroll? (10:08–12:29)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 10:08–10:12 | ★ `M/s06_chapter_the_twist_who_was_on_the_payroll.mp4` | 직전에 훅 카드 0.5초 플래시(회수 신호) | 피아노 한 음 |
| 10:12–10:30 | `AI-06` (봉투를 미는 장갑 낀 손) | | — |
| 10:30–10:45 | `Z/card_05_sergeant_district_court_zoom.mp4` (전체) | 대본 [SCREEN] 1번째 판결 카드 | `paper` |
| 10:45–11:05 | `AI-13` (호텔 커피숍 수표) — **슬로모션** + 가장자리 `light leak` 20% | 회수 ①: "a hotel coffee shop" | 커피숍 앰비언스 |
| 11:05–11:10 | ★ `M/s06_countup_900M_won.mp4` | "ACCORDING TO THE COURTS" 표기 | `impact` |
| 11:10–11:20 | `Z/card_03_superintendent_900m_won_zoom.mp4` | | `paper` |
| 11:20–11:24 | ★ `M/s06_stamp_9_years.mp4` | "Supreme Court confirmed it in December 2016"에 맞춰 스탬프 | `gavel` + `impact` |
| 11:24–11:55 | `Z/card_04_prosecution_official_9_years_zoom.mp4` | 두 번째 9년형은 카드로만 (스탬프 반복 피하기) | `paper` |
| 11:55–12:00 | ★ `M/s06_countup_8_officials.mp4` | "prosecutors said" 표기 | `impact` 작게 |
| 12:00–12:29 | `AI-07` (빈 복도, 열린 문) | "had been paid by him." 직전 **드롭** | 드롭 |

### 7. The funeral nobody believed (12:29–15:58)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 12:29–12:33 | ★ `M/s07_chapter_the_funeral_nobody_believed.mp4` | | 조용한 현악 |
| 12:33–12:38 | `M/s07_route_taean_to_shandong.mp4` | 대본 [SCREEN] "Taean → across the Yellow Sea → Shandong Province" | 선 그어질 때 `whoosh` |
| 12:38–12:55 | `P/s07_weihai_1.jpg` / `P/s07_qingdao_1.jpg` (켄 번스) | | — |
| 12:55–13:05 | `Z/card_06_police_death_announcement_zoom.mp4` | 대본 [SCREEN] 경찰 발표 카드 | `paper` |
| 13:05–13:25 | `AI-08` (장례 제단, 빈 액자) | **천천히 줌인**(키프레임 100→108%, 20초에 걸쳐) — 의혹이 쌓이는 긴장 | 향 타는 소리, 현악 |
| 13:25–13:30 | ★ `M/s07_typewriter_cremation_dates.mp4` (5초) | 회수 ②. "as reported by victims' groups, 2015" 표기. 들어가기 직전 훅 카드 0.5초 플래시 | `typewriter` |
| 13:30–13:55 | `STOCK: rainy street night` → `STOCK: phone call dark` | 소문 나열("plastic surgery, new name...")은 빠른 컷 3~4개 + **글리치** 짧게 → "확인되지 않은 소문" 느낌 | `glitch` 작게 |
| 13:55–14:00 | ★ `M/s07_keyphrase_never_proven.mp4` | 대본 [SCREEN] "These are the public's doubts. They were never proven." 법적 균형 핵심 | 드롭 → 피아노 |
| 14:00–14:20 | `AI-14` (비 오는 우시 거리, 뒷모습) + `M/s07_lowerthird_wuxi.mp4` (스크린) | 체포 장면은 **J-컷**으로 빗소리를 먼저 | `rain city` |
| 14:20–14:40 | `STOCK: airport night` / `P/s08_gimhae_airport_1.jpg` | "He said he had seen Cho dead with his own eyes." 직전 정적 | — |
| 14:40–15:15 | `Z/card_07_prosecutors_conclusion_zoom.mp4` → 증거 목록(증언·14명·DNA·영상) PPT로 하나씩 체크 | 체크마다 `tick` | — |
| 15:15–15:19 | ★ `M/s07_stamp_case_closed.mp4` | "The case against him was closed." | `gavel` + `impact` |
| 15:19–15:40 | `AI-08` 다른 구간 (어둡게) | "a strand of hair proves who it came from..." | 현악 |
| 15:40–15:44 | 검은 화면 1초 → ★ `M/s07_keyphrase_is_he_dead.mp4` | 섹션의 질문. 음악 완전 정적 | 무음 |
| 15:44–15:58 | `AI-01 variant` (빈 항구) | "they have never gone away either." **L-컷**으로 다음 챕터까지 파도 소리 연장 | `waves` |

### 8. The trial of the right-hand man (15:58–17:18)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 15:58–16:02 | ★ `M/s08_chapter_the_trial_of_the_right_hand_man.mp4` | | 절제된 퍼커션 |
| 16:02–16:20 | `AI-15` (빈 법정, 피고인석에 빛) → `P/s08_daegu_court_1.jpg` (엠블럼 없을 때만) | | — |
| 16:20–16:50 | 1심 내용 텍스트 카드 (PPT: "June 2006 – Oct 2008 / ~5 trillion won / ~70,000 people / fixed 35% a year") | 항목이 하나씩 켜지며 3~4초 리듬 | `pop` |
| 16:50–16:54 | ★ `M/s08_stamp_22_years.mp4` | "He was sentenced to 22 years." | `gavel` + `impact` |
| 16:54–17:10 | `Z/card_08_kang_tae_yong_22_years_zoom.mp4` | 대본 [SCREEN] Supreme Court Nov 2017 | `paper` |
| 17:10–17:18 | `AI-15` 정지 프레임 | "would never face a judge." 직전 드롭 | 드롭 |

### 9. The villain on the big screen (17:18–18:04)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 17:18–17:22 | ★ `M/s09_chapter_the_villain_on_the_big_screen.mp4` | | `projector` |
| 17:22–17:45 | `AI-16` (극장 관객 실루엣) → `STOCK: cinema audience` | 영화 "Master" 포스터·스틸·예고편 **절대 사용 금지**. 텍스트만 "Master (2016) — 7 million+ admissions" | 영사기 소리 |
| 17:45–18:04 | "단군 이래 최대 사기 — 'the biggest fraud since the founding of the nation'" 텍스트 카드 (PPT, 한글 글꼴) | | 따뜻한 저음 현악 |

### 10. The money, 18 years later (18:04–19:40)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 18:04–18:08 | ★ `M/s10_chapter_the_money_18_years_later.mp4` | | 부드러운 피아노 |
| 18:08–18:30 | `AI-02 variant` (아침빛, 법원 봉투) → "~95 billion won recovered" / "≈ 1.4 million won each" (PPT) | | — |
| 18:30–18:55 | 배당 타임라인 (PPT: Dec 2017 → 2018–2025 → June 2026) → `P/s10_seoul_court_1.jpg` (엠블럼 없을 때만) | | — |
| 18:55–19:00 | ★ `M/s10_countup_22156_creditors.mp4` | 대본 [SCREEN] "June 24, 2026 — ₩32B to 22,156 creditors" | `impact` 작게 |
| 19:00–19:10 | `Z/card_09_payout_2026_zoom.mp4` (앞 5초) | | `paper` |
| 19:10–19:40 | `AI-09` (낡은 증서를 서랍에 넣는 노인의 손) | 효과음·전환 효과 없이 **느린 디졸브**만 (존중) | 피아노만 |

### 11. Why it keeps coming back (19:40–20:55)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 19:40–19:44 | ★ `M/s11_chapter_why_it_keeps_coming_back.mp4` | | |
| 19:44–20:00 | `AI-17` (휴대폰 속 상승 차트) | | `notification` |
| 20:00–20:10 | `Z/card_10_fss_2024_reports_zoom.mp4` + 막대 차트 "2023: 328 / 2024: 410" (PPT) | | `paper` |
| 20:10–20:45 | 5단계 체크리스트 (PPT, 한 줄씩 체크) | 체크마다 `tick`, 다섯 번째 "Time — and someone who looks away"에서 1초 멈춤 | `tick` |
| 20:45–20:55 | `STOCK: city night timelapse` | "patterns are the one thing a Ponzi scheme can't hide." 직전 드롭 | 드롭 |

### 12. Outro (20:55–21:47)
| 시간 | 순서 | 기법 · 이유 | 사운드 |
|---|---|---|---|
| 20:55–20:59 | ★ `M/s12_chapter_outro.mp4` | | 피아노 |
| 20:59–21:20 | `AI-01 variant` (새벽 빈 항구) — 콜드오픈 AI-01과 같은 구도로 **매치 컷** | 처음과 끝이 맞물리는 구조 | `waves` 잔잔하게 |
| 21:20–21:30 | 검은 화면 + 하단 자막 "where is that money really coming from?" | 직전 1초 정적 | 무음 |
| 21:30–21:47 | 예고 카드: 어두운 아시아 지도에 빨간 점 깜빡임 (PPT) → 엔드스크린 | 마지막 20초 엔드스크린 영역 확보 | 페이드아웃 |

---

## 3. CapCut 사용법 (이 편집에 쓰는 기법)

| 기법 | CapCut PC에서 하는 법 |
|---|---|
| **키프레임 줌(켄 번스)** | 클립 선택 → `동영상` → `기본` → 시작점에서 `크기`·`위치` ◇ 클릭 → 끝점에서 크기 110~115%로 변경 → 키프레임 `이징` ease in-out |
| **2.5D 패럴랙스** | 같은 사진 두 트랙 → 위 트랙 `마스크`(또는 `배경 제거`)로 앞 피사체만 → 위 115%, 아래 105% 줌 |
| **J-컷 / L-컷** | 우클릭 `오디오 분리` → J-컷: 다음 장면 소리를 0.5~1초 먼저 / L-컷: 앞 장면 소리를 다음 화면 위로 연장 |
| **매치 컷** | 앞 컷 끝과 다음 컷 시작에서 비슷한 모양(지도 점 ↔ 도시 중심, 항구 ↔ 항구)을 같은 위치에 맞추고 전환 없이 자르기 |
| **스피드 램프** | `속도` → `곡선` → `사용자 지정`으로 빠름-느림-빠름. 끊기면 `부드러운 슬로모션` 켜기 |
| **휩 팬** | `전환` → `휩 팬`/`Pull in` 0.3초 + `whoosh` |
| **디졸브** | `전환` → `디졸브`(혼합) 0.5~1초 |
| **빛 번짐** | `효과` → "Light leak" 검색, 불투명도 20~40% / 또는 Pixabay `light leak` 영상 + 혼합 `스크린` |
| **글리치 히트** | `효과` → "Glitch" 0.2~0.4초 + `glitch` 효과음 |
| **분할 화면** | 두 클립을 겹쳐 각각 크기 50%·위치 좌우, 또는 `마스크` → `분할` |
| **혼합 모드** | 로어서드(`M/*_lowerthird_*.mp4`)는 위 트랙에 올리고 `혼합` → **`스크린`** (검은 바탕이 투명해짐) |
| **음악 드롭/덕킹** | 음악 `볼륨` 키프레임으로 0(드롭) / −20dB(덕킹) |
| **자동 캡션** | `텍스트` → `자동 캡션`(영어) → 하나 선택해 흰색·굵게·검정 배경 65%·하단 중앙 → `모든 캡션에 적용` |
| **조정 레이어** | `조정` → `조정 레이어 추가` → 1-1 수치 → 영상 전체 길이로 |
| **프리즈 프레임** | 우클릭 → `프레임 정지` |

---

## 4. 업로드 전 체크
- [ ] 조희팔·강태용·유죄 공무원·피해자의 얼굴·사진·닮은 AI 이미지 없음, 공무원 이름 없음(계급만)
- [ ] 경찰·검찰·법원·FSS 엠블럼, 언론사 제호, 방송 화면, 영화 "Master" 이미지 없음
- [ ] 법적 표현 유지: "reportedly", "according to police", "prosecutors alleged", "never proven"
- [ ] 위키미디어 사진 출처 표기 (`youtube/assets/CREDITS.md`)
- [ ] 무료 음원만, '저작자 표시 필요' 곡 표기
- [ ] 사실처럼 보이는 AI 장면(장례 제단, 밤 어선, 호텔 커피숍, 우시 거리)은 "변경되었거나 합성된 콘텐츠" 표시
