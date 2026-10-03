# Cut vertical Shorts (1080x1920) out of the finished long-form render.
# Layout: blurred full-bleed background, the 16:9 picture in the middle, a big centred hook over the first seconds
# that then sits at the top, big burned captions under the picture, and a 3 s end card pointing to the full episode.
# Usage: python3 tools/make_shorts.py shorts/ep01/shorts.json [--only N]
import json, os, re, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H, VY, VH = 1080, 1920, 560, 608           # picture band
RED, PAPER = "&H003D26D7", "&H00E2EDF3"
FB = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FM = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf"

def ts(s):
    h, m, r = s.split(":"); sec, ms = r.split(","); return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

def ass_t(t):
    cs = int(round(t * 100)); h, cs = divmod(cs, 360000); m, cs = divmod(cs, 6000); s, cs = divmod(cs, 100)
    return f"{h}:{m:02}:{s:02}.{cs:02}"

def srt(path):
    out = []
    for b in open(path, encoding="utf-8").read().strip().split("\n\n"):
        L = b.strip().split("\n"); a, z = L[1].split(" --> "); out.append((ts(a), ts(z), " ".join(L[2:])))
    return out

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: sys.exit("ffmpeg failed:\n" + r.stderr[-2000:])

def hook_ass(lines, red):
    def col(w): return "{\\c" + RED + "}" + w + "{\\c" + PAPER + "}"
    return "\\N".join(" ".join(col(w) if re.sub(r"[^\w%$']", "", w).lower() in red else w for w in l.split()) for l in lines)

def end_card(path, ep_title):
    im = Image.new("RGB", (W, H), (13, 14, 17)); d = ImageDraw.Draw(im)
    def c(text, y, f, fill):
        w = d.textlength(text, font=f); d.text(((W - w) / 2, y), text, font=f, fill=fill)
    logo = os.path.join(ROOT, "branding", "profile.png")
    if os.path.exists(logo):
        lg = Image.open(logo).convert("RGB").resize((300, 300)); im.paste(lg, ((W - 300) // 2, 430))
    c("FULL STORY", 820, ImageFont.truetype(FM, 54), (215, 38, 61))
    f = ImageFont.truetype(FB, 76)
    for i, l in enumerate(ep_title): c(l, 910 + i * 92, f, (243, 237, 226))
    c("22-minute documentary", 910 + len(ep_title) * 92 + 30, ImageFont.truetype(FB, 46), (160, 152, 140))
    y = 910 + len(ep_title) * 92 + 150
    d.rounded_rectangle((180, y, 900, y + 110), radius=55, fill=(215, 38, 61))
    c("Tap the link above the title", y + 30, ImageFont.truetype(FB, 46), (255, 255, 255))
    c("PAPER TIGER FILES", 1620, ImageFont.truetype(FM, 34), (120, 114, 104))
    im.save(path)

def make(spec, s, man, cues, tmp):
    src = os.path.join(ROOT, spec["source"])
    ch = {c["id"]: c for c in man["chunks"]}
    ids = sorted(ch)
    vp = os.path.join(ROOT, spec.get("caption_visible", ""))
    vis = json.load(open(vp))["caption_visible"] if spec.get("caption_visible") and os.path.exists(vp) else None
    parts, t_out, cap_lines = [], 0.0, []
    for a, b in s["pieces"]:
        t0 = max(0.0, ch[a]["start"] - 0.12)
        nxt = ch[ids[ids.index(b) + 1]]["start"] if b != ids[-1] else ch[b]["end"] + 0.6
        t1 = min(ch[b]["end"] + 0.45, nxt - 0.05)
        p = os.path.join(tmp, f"p{len(parts)}.mp4")
        run(["ffmpeg", "-y", "-v", "error", "-ss", f"{t0:.3f}", "-i", src, "-t", f"{t1 - t0:.3f}",
             "-af", f"afade=t=in:d=0.08,afade=t=out:st={t1 - t0 - 0.12:.3f}:d=0.12",
             "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", "-c:a", "pcm_s16le", p.replace(".mp4", ".mkv")])
        parts.append(p.replace(".mp4", ".mkv"))
        for ca, cz, tx in cues:
            if cz > t0 + 0.1 and ca < t1 - 0.1:
                mid = (max(ca, t0) + min(cz, t1)) / 2
                if vis and not any(va <= mid <= vb for va, vb in vis):
                    continue                          # the picture is a full-screen graphic with this text already
                cap_lines.append((max(ca, t0) - t0 + t_out, min(cz, t1) - t0 + t_out, tx))
        t_out += t1 - t0
    lst = os.path.join(tmp, "list.txt"); open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    body = os.path.join(tmp, "body.mkv")
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", body])
    T1 = s.get("intro", 3.2)
    hook = hook_ass(s["hook"], {w.lower() for w in s.get("red", [])})
    ev = [f"Dialogue: 2,{ass_t(0)},{ass_t(T1)},Big,,0,0,0,,{{\\fad(150,200)\\t(0,350,\\fscx100\\fscy100)\\fscx118\\fscy118}}{hook}",
          f"Dialogue: 2,{ass_t(T1 - 0.1)},{ass_t(t_out)},Top,,0,0,0,,{{\\fad(250,0)}}{hook}",
          f"Dialogue: 1,{ass_t(T1)},{ass_t(t_out)},Brand,,0,0,0,,PAPER TIGER FILES  ·  FULL STORY ON THE CHANNEL"]
    for a, z, tx in cap_lines:
        if z - a < 0.25: continue
        ev.append(f"Dialogue: 0,{ass_t(max(a, T1 - 0.2))},{ass_t(z)},Cap,,0,0,0,,{tx}" if z > T1 - 0.2 else "")
    ass = os.path.join(tmp, "s.ass")
    open(ass, "w", encoding="utf-8").write(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Big,Liberation Sans,92,{PAPER},{PAPER},&H00000000,&H96000000,1,0,0,0,100,100,0,0,1,6,4,5,60,60,0,1
Style: Top,Liberation Sans,74,{PAPER},{PAPER},&H00000000,&H96000000,1,0,0,0,100,100,0,0,1,5,3,8,60,60,250,1
Style: Cap,Liberation Sans,62,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,1,0,0,0,100,100,0,0,1,5,2,8,70,70,{VY + VH + 70},1
Style: Brand,DejaVu Sans Mono,28,&H00687278,&H00687278,&H00000000,&H00000000,1,0,0,0,100,100,3,0,1,0,0,8,60,60,{VY - 70},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "\n".join(e for e in ev if e) + "\n")
    card = os.path.join(tmp, "card.png"); end_card(card, s["card"])
    out = os.path.join(ROOT, spec["out_dir"], f"short{s['n']}_{s['slug']}.mp4")
    fc = (f"[0:v]split[a][b];[a]scale=-2:{H},crop={W}:{H},boxblur=28:4,eq=brightness=-0.22:saturation=0.7[bg];"
          f"[b]scale={W}:{VH}[fg];[bg][fg]overlay=0:{VY},"
          f"drawbox=x=0:y={VY}:w={W}:h={VH}:color=0x0d0e11@1.0:t=fill:enable='lt(t,{T1})',"
          f"ass={ass},setsar=1,fps=30[v0];"
          f"[1:v]scale={W}:{H},setsar=1,fps=30,fade=t=in:d=0.25[v1];"
          f"[0:a]aresample=48000[a0];[2:a]aresample=48000[a1];"
          f"[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a0c];[a0c]loudnorm=I=-14:TP=-1.5:LRA=11[a]")
    run(["ffmpeg", "-y", "-v", "error", "-i", body, "-loop", "1", "-t", "3.0", "-i", card,
         "-f", "lavfi", "-t", "3.0", "-i", "anullsrc=r=48000:cl=stereo",
         "-filter_complex", fc, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "medium", "-crf", "20",
         "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out])
    print(f"short {s['n']}: {t_out + 3:.1f}s -> {os.path.relpath(out, ROOT)}")
    return out

def main():
    spec = json.load(open(sys.argv[1]))
    only = int(sys.argv[sys.argv.index("--only") + 1]) if "--only" in sys.argv else None
    man = json.load(open(os.path.join(ROOT, spec["manifest"])))
    cues = srt(os.path.join(ROOT, spec["captions"]))
    os.makedirs(os.path.join(ROOT, spec["out_dir"]), exist_ok=True)
    for s in spec["shorts"]:
        if only and s["n"] != only: continue
        with tempfile.TemporaryDirectory() as tmp:
            make(spec, s, man, cues, tmp)

if __name__ == "__main__":
    main()
