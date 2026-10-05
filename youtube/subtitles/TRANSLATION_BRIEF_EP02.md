# EP.02 (Cho Hee-pal) subtitle translation brief — read together with subtitles/TRANSLATION_BRIEF.md (same rules 1–6, 8)

Source: `subtitles/ep02/ep02_en.srt` (273 cues). Script for context: `fraud_ep02_cho_hee_pal_en.md`.
Upload text to translate: `upload_ep02_15min.md` (title + "2. 설명란" description; keep URLs, chapter timestamps, hashtags).

## Legal strength (most important)
- Cho Hee-pal was NEVER tried or convicted. Only: wanted / fled (according to investigators) / police said he died /
  prosecutors concluded he died and closed the case. Never call him convicted, never "사기꾼/詐欺師/骗子" as a verdict.
  "according to investigators / prosecutors / Korean reporting / reportedly" must be kept.
- Kang Tae-yong: convicted, 22 years (fact). The police sergeant (8 years) and senior police officer (9 years, Supreme Court)
  and the prosecution official (9 years): convicted (fact).
- Victims' doubts about the death: opinion/claims of victims' groups, "never proven".

## Names
- ko: 조희팔, 강태용, BMC, 대구, 유사수신, 시사IN, 금융감독원, 찜질방, 태안, 웨이하이/우시(중국 지명은 한국 표기), 영화 「마스터」
- ja: チョ・ヒパル(趙喜八), カン・テヨン, 大邱(テグ), 類似受信(無許可の預金受け入れ), 時事IN, 金融監督院
- zh-Hans: 赵喜八(조희팔), 姜泰勇, 大邱, 类似受信(未经许可吸收存款), 时事IN, 金融监督院, 威海, 无锡
- zh-Hant: 趙喜八, 姜泰勇, 大邱, 類似受信(未經許可吸收存款), 時事IN, 金融監督院, 威海, 無錫
- es: Cho Hee-pal, Kang Tae-yong, Daegu, "yusa-susin" (captación ilegal de depósitos), Sisa IN, Servicio de Supervisión Financiera
- Money: keep won amounts; "5 trillion won" = 5조 원 / 5兆ウォン / 5万亿韩元 / 5 billones de wones (ES: here "billones" = 10^12 is CORRECT for trillion won); "4 billion dollars" = 40억 달러 / 40億ドル / 40亿美元 / 4.000 millones de dólares.

## Deliverables (code = ko / ja / zh-Hans / zh-Hant / es)
- `subtitles/ep02/ep02_<code>.srt` — same cue count/indices/timestamps; check: `python3 tools/srt_check.py subtitles/ep02/ep02_en.srt subtitles/ep02/ep02_<code>.srt` → OK
- `subtitles/ep02/15min/meta_<code>.md` — translated title + description of upload_ep02_15min.md
- Write the SRT in batches (e.g. 70 cues at a time, appending) so progress is saved. Do not git commit.
