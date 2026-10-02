# Renders Paper Tiger Files document cards (PNG 1920x1080) and a slow zoom-in clip (MP4) that eases onto the first
# highlighted phrase, then holds. Usage: python3 cards_tool.py <dir containing cards.py>
import html, subprocess, os, re, sys, importlib.util
E = html.escape
H = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"
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
JS = "<script>addEventListener('load',()=>{const m=document.querySelector('mark');if(m){const r=m.getBoundingClientRect();document.body.setAttribute('data-c',(r.left+r.width/2)+','+(r.top+r.height/2)+','+r.width)}})</script>"

def page(org, meta, tag, body, src):
    return (f"<!doctype html><html><head><meta charset=utf-8><style>{CSS}</style></head><body><div class=bg><div class=doc>"
            f"<div class=org>{E(org)}</div><div class=meta>{E(meta)}</div><div class=tag>{E(tag)}</div><div class=body>{body}</div>"
            f"<div class=src>{E(src)}</div></div><div class=brand>PAPER TIGER FILES</div></div>{JS}</body></html>")

def zoom_clip(png, mp4, cx, cy, mw, secs=7, ramp=4.5, fps=30):
    # zoom so the highlighted phrase fills ~60% of the frame width, capped between 1.2x and 1.45x
    zmax = max(1.2, min(1.45, 1920 * 0.6 / max(mw, 1)))
    n = int(ramp * fps)
    e = f"(min(on/{n},1)*min(on/{n},1)*(3-2*min(on/{n},1)))"          # smoothstep ease-in-out
    z = f"1+{zmax-1:.4f}*{e}"
    fx = f"(1920+({cx*2:.1f}-1920)*{e})"; fy = f"(1080+({cy*2:.1f}-1080)*{e})"   # focus point in 2x input space
    x = f"max(0,min(iw-iw/zoom,{fx}-iw/zoom/2))"; y = f"max(0,min(ih-ih/zoom,{fy}-ih/zoom/2))"
    vf = f"scale=3840:2160,zoompan=z='{z}':x='{x}':y='{y}':d={secs*fps}:s=1920x1080:fps={fps},format=yuv420p"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-i", png, "-vf", vf, "-frames:v", str(secs * fps),
                    "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-movflags", "+faststart", mp4], check=True)

def main(d):
    spec = importlib.util.spec_from_file_location("cards", os.path.join(d, "cards.py")); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    os.makedirs(os.path.join(d, "zoom"), exist_ok=True)
    for name, *fields in m.CARDS:
        hp = os.path.abspath(os.path.join(d, name + ".html")); open(hp, "w").write(page(*fields))
        png = os.path.abspath(os.path.join(d, name + ".png"))
        subprocess.run([H, "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1920,1080", f"--screenshot={png}", f"file://{hp}"], capture_output=True)
        dom = subprocess.run([H, "--no-sandbox", "--disable-gpu", "--window-size=1920,1080", "--virtual-time-budget=2000", "--dump-dom", f"file://{hp}"], capture_output=True, text=True).stdout
        os.remove(hp)
        c = re.search(r'data-c="([\d.]+),([\d.]+),([\d.]+)"', dom)
        cx, cy, mw = map(float, c.groups()) if c else (960, 540, 1400)
        zoom_clip(png, os.path.join(d, "zoom", name + "_zoom.mp4"), cx, cy, mw)
        print(f"{name}: focus=({cx:.0f},{cy:.0f}) width={mw:.0f}")

if __name__ == "__main__":
    main(sys.argv[1])
