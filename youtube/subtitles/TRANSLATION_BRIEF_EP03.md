# EP.03 (Truong My Lan / SCB) subtitle translation brief — read together with subtitles/TRANSLATION_BRIEF.md (same rules 1–3, 5, 6, 8)

Source: `subtitles/ep03/ep03_en.srt` (180 cues). Script for context: `fraud_ep03_truong_my_lan_en.md`.
Upload text to translate: `upload_ep03_truong_my_lan.md` (title "### 최종 제목" + "## 2. 설명란" description; keep URLs, chapter timestamps and hashtags unchanged; translate chapter names).

## Languages
ko, ja, zh-Hans, zh-Hant, es (standard five) + **vi (Vietnamese — the country of the case)**.

## Legal strength (most important)
- Truong My Lan was convicted (fact): first instance Apr 11, 2024 (death, embezzlement / bribery / banking violations), Oct 17, 2024 (life, bond fraud);
  appeals Dec 3, 2024 (death sentence upheld), Apr 21, 2025 (bond-fraud sentence cut to 20 years). Court findings can be stated as court findings.
- June 2025 law change abolishing the death penalty for embezzlement: translate exactly what the narration says. Do NOT add that her sentence
  "was commuted" unless the English cue says so.
- Keep every attribution: "the court found / according to prosecutors / according to state media / according to the BBC / AFP / Reuters / her lawyer told".
- Her husband, niece, former SCB executives and the central-bank inspector are convicted (fact) — keep roles exactly as in English.
- Tone: calm documentary, no slurs ("사기꾼", "女詐欺師" etc. are not used as labels).

## Names
- ko: 쯔엉 미 란(Truong My Lan), 반틴팟(Van Thinh Phat), 사이공상업은행(SCB), 호찌민시, 하노이, 베트남 국가은행(중앙은행), 사이공 타임스스퀘어, 윈저 플라자 호텔, 벤탄 시장, 동(₫)
- ja: チュオン・ミー・ラン, バンティンファット(Van Thinh Phat), サイゴン商業銀行(SCB), ホーチミン市, ハノイ, ベトナム国家銀行, ドン
- zh-Hans: 张美兰(Truong My Lan), 万盛发集团(Van Thinh Phat), 西贡商业银行(SCB), 胡志明市, 河内, 越南国家银行, 越南盾
- zh-Hant: 張美蘭, 萬盛發集團, 西貢商業銀行(SCB), 胡志明市, 河內, 越南國家銀行, 越南盾
- es: Truong My Lan, Van Thinh Phat, Saigon Commercial Bank (SCB), Ciudad Ho Chi Minh, Hanói, Banco Estatal de Vietnam, dong
- vi: Trương Mỹ Lan, Vạn Thịnh Phát, Ngân hàng TMCP Sài Gòn (SCB), TP. Hồ Chí Minh, Hà Nội, Ngân hàng Nhà nước Việt Nam,
  Tòa án nhân dân TP.HCM, Tòa án nhân dân cấp cao; use correct legal Vietnamese (tham ô tài sản, đưa/nhận hối lộ, lừa đảo chiếm đoạt tài sản,
  vi phạm quy định về cho vay, tử hình, chung thân). Use full diacritics.

## Money
- "304 trillion dong" = 304조 동 / 304兆ドン / 304万亿越南盾 / 304 billones de dongs (ES: billones = 10^12, correct here) / 304 nghìn tỷ đồng (or 304.000 tỷ đồng).
- "12.5 billion dollars" = 125억 달러 / 125億ドル / 125亿美元 / 12.500 millones de dólares (never "billones") / 12,5 tỷ USD.

## Deliverables (code = ko / ja / zh-Hans / zh-Hant / es / vi)
- `subtitles/ep03/ep03_<code>.srt` — same cue count, indices and timestamps; check:
  `python3 tools/srt_check.py subtitles/ep03/ep03_en.srt subtitles/ep03/ep03_<code>.srt` → OK
- `subtitles/ep03/meta_<code>.md` — translated title (≤100 chars) + full description.
- Write the SRT in batches (about 60 cues at a time, appending) so progress is saved. Do not git commit.
