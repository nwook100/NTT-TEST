# Generates Paper Tiger Files branding (origami tiger) as HTML, rendered to PNG by headless Chromium.
RED, RED_L, RED_D, RED_DD = "#d7263d", "#e8503f", "#a81d30", "#7e1424"
PAPER, PAPER_S, INK = "#f3ede2", "#d6ccbc", "#111214"
L = [  # (points, fill) for the left half; mirrored for the right half
 ([(95,70),(70,165),(150,120)], RED),
 ([(100,98),(86,150),(134,126)], PAPER_S),
 ([(150,120),(200,105),(200,190)], RED_L),
 ([(150,120),(200,190),(130,175)], RED_D),
 ([(70,165),(150,120),(130,175)], RED),
 ([(70,165),(130,175),(60,215)], RED_DD),
 ([(60,215),(130,175),(145,215)], RED),
 ([(130,175),(200,190),(145,215)], RED_DD),
 ([(145,215),(200,190),(200,240)], RED_L),
 ([(60,215),(145,215),(55,280)], RED_D),
 ([(145,215),(200,240),(160,295)], PAPER),
 ([(55,280),(145,215),(160,295)], PAPER_S),
 ([(55,280),(160,295),(120,345)], PAPER),
 ([(120,345),(160,295),(200,370)], PAPER_S),
 ([(160,295),(200,280),(200,370)], PAPER),
 ([(200,240),(160,295),(200,280)], PAPER_S),
 # stripes
 ([(186,110),(200,106),(196,152)], INK),
 ([(160,126),(174,120),(176,166)], INK),
 ([(74,184),(116,176),(84,198)], INK),
 ([(62,228),(108,222),(66,242)], INK),
 # eye
 ([(138,198),(180,193),(160,213)], INK),
]
def tiger_svg(size=400, extra=""):
    polys=[]
    for pts,fill in L:
        for mir in (False,True):
            p=[(400-x if mir else x,y) for x,y in pts]
            polys.append(f'<polygon points="{" ".join(f"{x},{y}" for x,y in p)}" fill="{fill}" stroke="rgba(0,0,0,.28)" stroke-width="1.2" stroke-linejoin="round"/>')
    nose='<polygon points="174,244 226,244 200,274" fill="#111214"/><polyline points="200,274 200,292 178,306" fill="none" stroke="#111214" stroke-width="4" stroke-linecap="round"/><polyline points="200,292 222,306" fill="none" stroke="#111214" stroke-width="4" stroke-linecap="round"/>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 55 320 330" width="{size}" height="{size}" {extra}>{"".join(polys)}{nose}</svg>'

BG = "background:radial-gradient(ellipse at 50% 45%, #1c1e24 0%, #0d0e11 70%);"
base = "<!doctype html><html><head><meta charset='utf-8'><style>html,body{margin:0;padding:0}</style></head><body>"

open("profile.html","w").write(base+f"""
<div style="width:800px;height:800px;{BG}display:flex;align-items:center;justify-content:center">
{tiger_svg(560)}</div></body></html>""")

open("watermark.html","w").write(base.replace("margin:0;","margin:0;background:transparent;")+f"""
<div style="width:150px;height:150px;display:flex;align-items:center;justify-content:center">{tiger_svg(138)}</div></body></html>""")

# faint folded-paper facets for the banner background
import random; random.seed(7)
facets="".join(
  f'<polygon points="{x},{y} {x+random.randint(180,420)},{y+random.randint(-160,160)} {x+random.randint(-120,200)},{y+random.randint(160,380)}" fill="rgba(255,255,255,{random.choice([0.012,0.02,0.028])})"/>'
  for x,y in [(random.randint(-100,2500),random.randint(-100,1400)) for _ in range(46)])
open("banner.html","w").write(base+f"""
<div style="position:relative;width:2560px;height:1440px;{BG}overflow:hidden;font-family:'Liberation Sans',sans-serif">
 <svg style="position:absolute;inset:0" width="2560" height="1440">{facets}</svg>
 <div style="position:absolute;left:560px;top:528px;width:1440px;height:383px;display:flex;align-items:center;gap:56px">
  {tiger_svg(340)}
  <div>
   <div style="font-size:30px;letter-spacing:10px;color:#d7263d;font-weight:700">CASE FILES &middot; KOREA &middot; JAPAN &middot; CHINA</div>
   <div style="font-size:112px;line-height:1.0;font-weight:700;color:#f3ede2;letter-spacing:4px;margin-top:14px">PAPER TIGER<br>FILES</div>
   <div style="width:220px;height:6px;background:#d7263d;margin:20px 0 18px"></div>
   <div style="font-family:'Liberation Serif',serif;font-style:italic;font-size:40px;color:#cfc6b8">Asia's biggest frauds. The untold files.</div>
  </div>
 </div>
 <div style="position:absolute;right:120px;bottom:90px;font-size:34px;letter-spacing:6px;color:#8d8578">NEW CASE EVERY WEEK</div>
 <div style="position:absolute;left:120px;bottom:90px;border:4px solid rgba(215,38,61,.55);color:rgba(215,38,61,.7);font-size:34px;font-weight:700;letter-spacing:6px;padding:10px 22px;transform:rotate(-6deg)">FILE No. 001</div>
</div></body></html>""")

# banner with the safe-area guide, for checking only
open("banner_guide.html","w").write(open("banner.html").read().replace("</body>",
 '<div style="position:absolute;left:507px;top:508px;width:1546px;height:423px;outline:4px dashed #39f"></div></body>'))
