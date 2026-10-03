# Subtitle translation brief (Paper Tiger Files)

Source: `subtitles/ep01/ep01_en.srt` (sentence-level cues of the English narration of EP.01 "Terra-Luna").
Script for context: `fraud_ep01_terra_luna_en.md`. Upload package (title/description): `upload_ep01_terra_luna.md`.

## Rules
1. Keep every cue: same number of cues, same index numbers, same timestamps, byte-for-byte. Only the text changes.
2. Translate meaning, not word order. When one English sentence is split over two cues, make each cue read naturally in the
   target language while still matching what is being said in that time window (move a phrase across the cue boundary if needed).
3. Max 2 lines per cue. CJK: about 16–20 characters per line. Spanish: about 42 characters per line. Korean: about 20–24 characters per line.
4. Legal wording must keep its exact strength — this is the most important rule:
   - "alleged / allege / according to the SEC / prosecutors said / denies wrongdoing / charged / indicted / liable / pleaded guilty /
     convicted / sentenced / settled without admitting or denying" each keep their legal meaning. Never turn an allegation into a fact.
   - Daniel Shin's case in Korea is ongoing: only "기소/혐의/검찰은 ~라고 주장/부인" style wording (and equivalents), never "사기꾼", "범행".
   - Do Kwon: pleaded guilty and sentenced in the U.S. (fact). Korean charges are pending (allegation).
5. Numbers: keep values; convert units naturally (e.g. 40 billion dollars → 400억 달러 / 400億ドル / 400亿美元). Dates in local style.
6. Quotes (Kwon's tweets and court statement) translated faithfully, in quotation marks.
7. Names:
   - ko: 권도형(Do Kwon), 신현성(Daniel Shin), 테라폼랩스, 테라·루나, UST, 앵커 프로토콜, 차이(Chai), 티몬, 루나 파운데이션 가드(LFG),
     쓰리애로우즈캐피털, 점프 크립토, 커브(Curve), 바이낸스, 셀시우스, 보이저 디지털, FTX, 샘 뱅크먼-프리드, 알라메다 리서치,
     몬테네그로 포드고리차, 여의도 저승사자, 미국 증권거래위원회(SEC), 뉴욕 남부연방지검, GENIUS 법(지니어스 법)
   - ja: ド・クォン, ダニエル・シン, テラフォーム・ラボ, テラ・ルナ, アンカー・プロトコル, チャイ(Chai), 米証券取引委員会(SEC)
   - zh-Hans: 权道亨, 申铉成, Terraform Labs, Terra-Luna(泰拉/露娜可用括号说明一次), Anchor 协议, 美国证券交易委员会(SEC)
   - es (neutral Latin-American/Spain-friendly Spanish): Do Kwon, Daniel Shin, Terraform Labs, Terra-Luna, Anchor Protocol, Chai,
     la Comisión de Bolsa y Valores de EE. UU. (SEC), fiscales federales; 40 billion dollars → 40.000 millones de dólares (never "billones")
   - zh-Hant: 權道亨, 申鉉成, Terraform Labs, Anchor 協議, 美國證券交易委員會(SEC)
8. Tone: calm documentary narration, not sensational.

## Deliverables (per language code ko / ja / zh-Hans / zh-Hant / es)
- `subtitles/ep01/ep01_<code>.srt` (UTF-8, no BOM)
- `subtitles/ep01/meta_<code>.md`: translated video title (≤100 chars) and full description for YouTube's
  "Title and description translations" (keep URLs, chapter timestamps and hashtags unchanged; translate chapter names).
- Validate: `python3 tools/srt_check.py subtitles/ep01/ep01_en.srt subtitles/ep01/ep01_<code>.srt` must print OK.
