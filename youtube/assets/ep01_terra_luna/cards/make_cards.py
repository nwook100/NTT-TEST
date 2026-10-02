# Quote/summary document cards (1920x1080) in Paper Tiger Files style. Only verified facts; no agency logos/seals.
import html, subprocess, os
E = html.escape
CARDS = [
 ("card_01_sec_charges_2023-02-16", "U.S. SECURITIES AND EXCHANGE COMMISSION", "CIVIL CHARGES · FEBRUARY 16, 2023", "SUMMARY",
  "The SEC charged <mark>Terraform Labs and Do Kwon</mark> with fraud over the Terra and LUNA crypto assets.",
  "Source: SEC press release 2023-32, sec.gov"),
 ("card_02_sec_order_2024-12-20", "U.S. SECURITIES AND EXCHANGE COMMISSION", "SETTLED ORDER · DECEMBER 20, 2024", "ACCORDING TO THE SEC",
  "On <mark>May 23, 2021</mark>, Terraform made a <mark>“verbal agreement”</mark> with a trading firm, which then bought <mark>more than $20 million</mark> of UST to help restore the peg.",
  "The firm's affiliate settled without admitting or denying the findings. Source: SEC press release 2024-212, sec.gov"),
 ("card_03_sec_chai_allegation", "U.S. SECURITIES AND EXCHANGE COMMISSION", "AMENDED COMPLAINT · TERRAFORM LABS", "SEC ALLEGATION",
  "The SEC alleged that <mark>Chai payments were not processed on the Terra blockchain</mark>, and that transactions were <mark>“replicated”</mark> onto the chain.",
  "Allegation in a civil complaint. Source: SEC amended complaint, sec.gov"),
 ("card_04_jury_verdict_2024-04-05", "U.S. DISTRICT COURT · SOUTHERN DISTRICT OF NEW YORK", "SEC v. TERRAFORM LABS · APRIL 5, 2024", "JURY VERDICT",
  "A federal jury found <mark>Terraform Labs and Do Kwon liable for fraud</mark> in the SEC’s civil case.",
  "Source: SEC press release 2024-73, sec.gov"),
 ("card_05_sec_settlement_2024-06-13", "U.S. SECURITIES AND EXCHANGE COMMISSION", "FINAL JUDGMENT · JUNE 13, 2024", "SETTLEMENT",
  "Terraform Labs: <mark>about $4.47 billion</mark>.<br>Do Kwon: <mark>about $204 million</mark>.<br>Terraform agreed to <mark>wind down</mark>.",
  "Source: SEC press release 2024-73, sec.gov"),
 ("card_06_kwon_plea_2025-08", "U.S. DISTRICT COURT · SOUTHERN DISTRICT OF NEW YORK", "GUILTY PLEA · AUGUST 2025", "IN COURT, DO KWON SAID",
  "“In 2021, I made <mark>false and misleading statements</mark> about why [UST] regained its peg.”",
  "Plea allocution, court record. Bracket added for clarity."),
 ("card_07_doj_sentence_2025-12-11", "U.S. ATTORNEY’S OFFICE · SOUTHERN DISTRICT OF NEW YORK", "SENTENCING · DECEMBER 11, 2025", "15 YEARS IN PRISON",
  "“Do Kwon devised <mark>elaborate schemes to mislead investors</mark> and inflate the value of Terraform’s cryptocurrencies for his own benefit.”<div class=who>— U.S. Attorney Jay Clayton</div>",
  "Source: “Crypto-Enabled Fraudster Sentenced For Orchestrating $40 Billion Fraud,” justice.gov, Dec 11, 2025"),
 ("card_08_genius_act_2025-07-18", "UNITED STATES CONGRESS", "GENIUS ACT · SIGNED JULY 18, 2025", "SUMMARY",
  "Payment stablecoins must be <mark>backed one-for-one</mark> by reserves such as <mark>cash, deposits and short-term Treasuries</mark>.",
  "Source: Congressional Research Service, IN12553, congress.gov"),
 ("card_09_sbf_convicted_2023-11-02", "U.S. DISTRICT COURT · SOUTHERN DISTRICT OF NEW YORK", "UNITED STATES v. BANKMAN-FRIED · NOVEMBER 2, 2023", "SUMMARY",
  "FTX founder <mark>Sam Bankman-Fried was convicted of fraud</mark>. At trial, a former Alameda Research executive testified that lenders recalled loans in <mark>June 2022</mark>, and Alameda repaid them with <mark>FTX customer money</mark>.",
  "Source: trial record, U.S. v. Bankman-Fried (S.D.N.Y.)"),
]
CSS = """
html,body{margin:0}
.bg{width:1920px;height:1080px;background:radial-gradient(ellipse at 50% 40%,#1d1f25 0%,#0b0c0f 75%);display:flex;align-items:center;justify-content:center;font-family:'Liberation Serif',serif}
.doc{position:relative;width:1380px;background:#f3ede2;box-shadow:0 30px 80px rgba(0,0,0,.6);padding:70px 90px 60px;transform:rotate(-0.6deg)}
.doc:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.018) 0 2px,transparent 2px 6px);pointer-events:none}
.org{font-family:'DejaVu Sans Mono',monospace;font-size:24px;letter-spacing:3px;color:#5b5348}
.meta{font-family:'DejaVu Sans Mono',monospace;font-size:22px;letter-spacing:2px;color:#8a8073;margin-top:10px;padding-bottom:26px;border-bottom:3px solid #1a1a1a}
.tag{display:inline-block;margin-top:38px;font-family:'Liberation Sans',sans-serif;font-weight:700;font-size:26px;letter-spacing:5px;color:#d7263d;border:3px solid #d7263d;padding:6px 16px}
.body{font-size:54px;line-height:1.32;color:#141414;margin-top:30px}
mark{background:linear-gradient(transparent 55%,rgba(215,38,61,.35) 55%);color:inherit;padding:0 4px}
.who{font-size:34px;color:#4a443c;margin-top:22px;font-style:italic}
.src{margin-top:44px;font-family:'Liberation Sans',sans-serif;font-size:22px;color:#6f675b}
.brand{position:absolute;right:60px;bottom:40px;font-family:'Liberation Sans',sans-serif;font-weight:700;font-size:22px;letter-spacing:6px;color:rgba(243,237,226,.35)}
"""
H = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"
for name, org, meta, tag, body, src in CARDS:
    page = f"<!doctype html><html><head><meta charset=utf-8><style>{CSS}</style></head><body><div class=bg><div class=doc><div class=org>{E(org)}</div><div class=meta>{E(meta)}</div><div class=tag>{E(tag)}</div><div class=body>{body}</div><div class=src>{E(src)}</div></div><div class=brand>PAPER TIGER FILES</div></div></body></html>"
    open(name + ".html", "w").write(page)
    subprocess.run([H, "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1920,1080",
                    f"--screenshot={os.getcwd()}/{name}.png", f"file://{os.getcwd()}/{name}.html"], capture_output=True)
    os.remove(name + ".html")
    print(name)
