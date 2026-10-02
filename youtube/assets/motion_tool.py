#!/usr/bin/env python3
"""Paper Tiger Files motion-graphics generator.

Renders 1920x1080 / 30 fps / H.264 (yuv420p, crf 20) clips with Pillow + numpy and pipes raw frames to ffmpeg.
Every effect is a reusable function:

    key_phrase(out, lines, kicker=None, red=(), dur=4.5)          big centred text, punch-in w/ overshoot, red underline wipe
    word_by_word(out, text, attribution=None, red=(), dur=5.5)    quote revealed one word at a time
    count_up(out, to, frm=0, prefix='', suffix='', ...)          big number counting up (or down) + label lines
    stamp(out, word, sub=None, dur=4)                             red rubber stamp slamming onto a paper sheet + shake
    typewriter(out, text, sub=None, dur=4)                        mono text typed with a blinking cursor
    chapter_card(out, number, title, footer, dur=4)               "CHAPTER 3" + title, channel style
    lower_third(out, title, sub, dur=5)                           name/place label sliding in (pure black bg -> blend "Screen")
    route_map(out, stops, dur=6)                                  animated route between labelled dots (lat/lon projected)
    logo_sting(out, dur=2.6)                                      channel logo sting (< 3 s)
    line_chart(out, points, title=None, red_from=None, log=False) price line drawn left->right, live value tag, crash in red
    flow_diagram(out, nodes, edges, title=None)                   boxes + arrows with money dots streaming along them
    timeline(out, events, title=None)                             dates popping onto a line drawn left->right
    compare(out, left, right, title=None)                         split screen: promised (white) vs reality (red)
    bar_chart(out, bars, title=None, prefix='', suffix='')        horizontal bars growing with counting values
    pyramid(out, levels, title=None, collapse=True)               pyramid tiers stack up, then the base gives way

All full-frame clips get subtle film grain, flicker and a vignette. Lower thirds are rendered on pure black with no
grain so they can be laid over footage with CapCut's "Screen" blend mode.

Usage:
    python3 motion_tool.py ep01|ep02|all [--only SUBSTRING] [--list]
"""
import math, os, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, FPS = 1920, 1080, 30
HERE = os.path.dirname(os.path.abspath(__file__))
BRAND = os.path.join(HERE, "..", "branding")

# ---- channel palette ---------------------------------------------------------------------------
DARK = (13, 14, 17)
DARK_HI = (30, 32, 39)
RED = (215, 38, 61)
PAPER = (243, 237, 226)
GREY = (160, 152, 140)
INK = (26, 24, 22)

FD = "/usr/share/fonts/truetype/"
F_SANS_B = FD + "liberation/LiberationSans-Bold.ttf"
F_SANS = FD + "liberation/LiberationSans-Regular.ttf"
F_SERIF_B = FD + "liberation/LiberationSerif-Bold.ttf"
F_SERIF_I = FD + "liberation/LiberationSerif-Italic.ttf"
F_SERIF_BI = FD + "liberation/LiberationSerif-BoldItalic.ttf"
F_MONO_B = FD + "dejavu/DejaVuSansMono-Bold.ttf"
F_MONO = FD + "dejavu/DejaVuSansMono.ttf"

_fonts = {}
def font(path, size):
    k = (path, int(size))
    if k not in _fonts:
        _fonts[k] = ImageFont.truetype(path, int(size))
    return _fonts[k]

# ---- easing ------------------------------------------------------------------------------------
def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def prog(t, t0, t1): return clamp((t - t0) / max(1e-6, t1 - t0))
def ease_out_cubic(p): return 1 - (1 - p) ** 3
def ease_in_cubic(p): return p ** 3
def ease_in_out(p): return p * p * (3 - 2 * p)
def ease_out_expo(p): return 1.0 if p >= 1 else 1 - 2 ** (-10 * p)
def ease_out_back(p, s=1.9):
    p -= 1
    return 1 + p * p * ((s + 1) * p + s)

# ---- shared backgrounds / post ----------------------------------------------------------------
_cache = {}
def _radial(w, h, cx, cy, r):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    return np.sqrt(((x - cx) / r) ** 2 + ((y - cy) / r) ** 2)

def bg_dark():
    """Channel background: radial gradient #1e2027 -> #0d0e11 (same as branding/gen.py)."""
    if "bg" not in _cache:
        d = np.clip(_radial(W, H, W * 0.5, H * 0.45, W * 0.62), 0, 1)[..., None]
        a, b = np.array(DARK_HI, np.float32), np.array(DARK, np.float32)
        _cache["bg"] = Image.fromarray((a * (1 - d) + b * d).astype(np.uint8), "RGB").convert("RGBA")
    return _cache["bg"]

def vignette():
    if "vig" not in _cache:
        d = _radial(W, H, W / 2, H / 2, W * 0.58)
        _cache["vig"] = (1 - 0.55 * np.clip(d - 0.45, 0, 1) ** 1.4)[..., None].astype(np.float32)
    return _cache["vig"]

GRAIN_AMP = float(os.environ.get("PTF_GRAIN", "4.0"))   # grain strength (std-dev in 8-bit levels)
GRAIN_HOLD = int(os.environ.get("PTF_HOLD", "3"))        # new grain pattern every N frames (film-like, much smaller files)
GRAIN_LUMA = float(os.environ.get("PTF_LUMA", "0.25"))    # grain weight in pure black (1.0 = flat grain); rises to 1 in highlights

def grain_tiles(n=10, amp=None):
    amp = GRAIN_AMP if amp is None else amp
    """Half-res gaussian grain upscaled 2x: reads as film grain and compresses far better than per-pixel noise."""
    if "grain" not in _cache:
        rng = np.random.default_rng(7)
        tiles = []
        for _ in range(n):
            g = rng.normal(0, amp, (H // 2, W // 2)).astype(np.float32)
            tiles.append(np.repeat(np.repeat(g, 2, 0), 2, 1)[..., None])
        _cache["grain"] = tiles
    return _cache["grain"]

def post(img, fi, grain=True, flicker=True):
    a = np.asarray(img.convert("RGB"), dtype=np.float32)
    if grain:
        a = a * vignette()
        if flicker:
            a *= 1.0 + 0.012 * math.sin(fi * 1.7) * math.sin(fi * 0.53)
        g = grain_tiles()[((fi // GRAIN_HOLD) * 7) % len(grain_tiles())]
        a += g * (GRAIN_LUMA + (1 - GRAIN_LUMA) * np.minimum(a, 160) / 160)
    return np.clip(a, 0, 255).astype(np.uint8)

class Writer:
    def __init__(self, path, alpha=False):
        os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
        self.path = path
        if alpha:   # ProRes 4444 with alpha (MOV) for overlays
            enc = ["-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le", "-vendor", "apl0"]
            pix = "rgba"
        else:
            enc = ["-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]
            pix = "rgb24"
        self.p = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", pix, "-s", f"{W}x{H}",
                                   "-r", str(FPS), "-i", "-", "-an", *enc, path], stdin=subprocess.PIPE)
    def write(self, arr): self.p.stdin.write(arr.tobytes())
    def close(self):
        self.p.stdin.close()
        if self.p.wait() != 0:
            raise RuntimeError("ffmpeg failed for " + self.path)

def render(out, dur, draw, grain=True, base=None, shake=None):
    """draw(t, fi, canvas_rgba) paints onto a copy of the background. shake(t)->(dx,dy,zoom) optional camera shake."""
    assert 3.0 <= dur <= 6.0 or out.endswith("logo_sting.mp4"), "keep clips 3-6 s"
    n = int(round(dur * FPS))
    wr = Writer(out)
    base = base or bg_dark()
    for fi in range(n):
        t = fi / FPS
        c = base.copy()
        draw(t, fi, c)
        if shake:
            dx, dy, z = shake(t)
            if dx or dy or z != 1:
                c = c.transform((W, H), Image.AFFINE, (1 / z, 0, W / 2 - W / 2 / z - dx, 0, 1 / z, H / 2 - H / 2 / z - dy),
                                Image.BILINEAR)
        wr.write(post(c, fi, grain=grain))
    wr.close()
    print(f"  wrote {os.path.relpath(out, HERE)} ({dur:.1f}s, {os.path.getsize(out)/1e6:.2f} MB)")

def fade_env(t, dur, fin=0.25, fout=0.45):
    return clamp(min(t / fin if fin else 1, (dur - t) / fout if fout else 1))

# ---- text helpers ------------------------------------------------------------------------------
def text_w(s, f, tracking=0):
    if not s: return 0
    return f.getlength(s) + tracking * (len(s) - 1)

def text_img(s, f, fill, tracking=0, shadow=10, pad=None):
    """RGBA image of one line of text (fixed height = font ascent+descent), optional soft drop shadow."""
    asc, desc = f.getmetrics()
    pad = pad if pad is not None else (shadow * 2 + 4)
    w = int(math.ceil(text_w(s, f, tracking))) + pad * 2
    h = asc + desc + pad * 2
    lay = Image.new("RGBA", (max(1, w), h), (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    def put(dr, col, off=(0, 0)):
        if tracking:
            x = pad
            for ch in s:
                dr.text((x + off[0], pad + off[1]), ch, font=f, fill=col)
                x += f.getlength(ch) + tracking
        else:
            dr.text((pad + off[0], pad + off[1]), s, font=f, fill=col)
    if shadow:
        sh = Image.new("RGBA", lay.size, (0, 0, 0, 0))
        put(ImageDraw.Draw(sh), (0, 0, 0, 200), (0, shadow // 3))
        lay = Image.alpha_composite(lay, sh.filter(ImageFilter.GaussianBlur(shadow)))
        d = ImageDraw.Draw(lay)
    put(d, fill + (255,) if len(fill) == 3 else fill)
    lay.info["pad"] = pad
    return lay

def wrap(words, f, maxw, tracking=0):
    lines, cur = [], []
    for w_ in words:
        trial = " ".join(cur + [w_])
        if cur and text_w(trial, f, tracking) > maxw:
            lines.append(cur); cur = [w_]
        else:
            cur.append(w_)
    if cur: lines.append(cur)
    return lines

def with_alpha(img, a):
    if a >= 0.999: return img
    img = img.copy()
    al = np.asarray(img.getchannel("A"), dtype=np.float32) * clamp(a)
    img.putalpha(Image.fromarray(al.astype(np.uint8), "L"))
    return img

def paste(canvas, img, cx, cy, scale=1.0, alpha=1.0, anchor="c"):
    """Composite img onto canvas centred (anchor c) or left-centred (anchor l) at (cx, cy), cropping to the frame."""
    if alpha <= 0.003 or img is None: return
    if abs(scale - 1) > 1e-3:
        img = img.resize((max(1, int(img.width * scale)), max(1, int(img.height * scale))), Image.BICUBIC)
    img = with_alpha(img, alpha)
    x = int(round(cx - (img.width / 2 if anchor == "c" else 0))); y = int(round(cy - img.height / 2))
    sx0, sy0 = max(0, -x), max(0, -y)
    sx1, sy1 = min(img.width, W - x), min(img.height, H - y)
    if sx1 <= sx0 or sy1 <= sy0: return
    canvas.alpha_composite(img, (x + sx0, y + sy0), (sx0, sy0, sx1, sy1))

def rect(canvas, box, fill):
    lay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(lay).rectangle(box, fill=fill)
    canvas.alpha_composite(lay)

def fill_rect(canvas, x0, y0, x1, y1, col, alpha=1.0):
    """Fast opaque-ish rectangle (no full-frame layer)."""
    x0, y0, x1, y1 = int(max(0, x0)), int(max(0, y0)), int(min(W, x1)), int(min(H, y1))
    if x1 <= x0 or y1 <= y0 or alpha <= 0: return
    patch = Image.new("RGBA", (x1 - x0, y1 - y0), col + (int(255 * clamp(alpha)),))
    canvas.alpha_composite(patch, (x0, y0))

def fit_font(path, lines, maxw, start, minsize=40, tracking=0):
    s = start
    while s > minsize and max(text_w(l, font(path, s), tracking) for l in lines) > maxw:
        s -= 4
    return font(path, s)

def rich_line(words, f, red_words, fill=PAPER, shadow=12):
    """One line where words listed in red_words are drawn in red."""
    pad = shadow * 2 + 4
    asc, desc = f.getmetrics()
    sp = f.getlength(" ")
    total = sum(f.getlength(w_) for w_ in words) + sp * (len(words) - 1)
    lay = Image.new("RGBA", (int(total) + pad * 2, asc + desc + pad * 2), (0, 0, 0, 0))
    sh = Image.new("RGBA", lay.size, (0, 0, 0, 0))
    ds, d = ImageDraw.Draw(sh), ImageDraw.Draw(lay)
    x = pad
    for w_ in words:
        ds.text((x, pad + shadow // 3), w_, font=f, fill=(0, 0, 0, 200)); x += f.getlength(w_) + sp
    lay = Image.alpha_composite(lay, sh.filter(ImageFilter.GaussianBlur(shadow)))
    d = ImageDraw.Draw(lay); x = pad
    for w_ in words:
        col = RED if _norm(w_) in red_words else fill
        d.text((x, pad), w_, font=f, fill=col + (255,)); x += f.getlength(w_) + sp
    lay.info["pad"] = pad
    return lay

def _norm(w_): return "".join(ch for ch in w_.lower() if ch.isalnum() or ch in "%$₩")

def footer_tag(canvas, text, alpha=1.0):
    if not text: return
    im = _cache.setdefault(("foot", text), text_img(text, font(F_SANS_B, 22), (120, 114, 104), tracking=6, shadow=0))
    paste(canvas, im, W - 70 - im.width / 2, H - 52, alpha=alpha * 0.9)

# =================================================================================================
# a. KEY PHRASE
# =================================================================================================
def key_phrase(out, lines, kicker=None, red=(), dur=4.5, stagger=0.0, size=118, footer=None):
    """Big centred statement. Punch-in from 0.72x with overshoot, red underline wipes under the last line,
    slow push during the hold, then fades out with a slight scale-up. `lines` = list of strings (one per line);
    words in `red` are coloured red. `stagger` delays each following line (for question lists)."""
    red = {_norm(r) for r in red}
    f = fit_font(F_SANS_B, lines, 1640, size)
    imgs = [rich_line(l.split(), f, red) for l in lines]
    lh = f.getmetrics()[0] + f.getmetrics()[1]
    gap = int(lh * 0.12)
    total_h = len(lines) * lh + (len(lines) - 1) * gap
    kick = text_img(kicker, font(F_MONO_B, 30), RED, tracking=8, shadow=6) if kicker else None
    y0 = H / 2 - total_h / 2 + (30 if kicker else 0)
    ul_w = max(text_w(l, f) for l in lines[-1:]) * 0.55
    t_ul = 0.42 + stagger * (len(lines) - 1)

    def draw(t, fi, c):
        env = clamp((dur - t) / 0.5)
        out_s = 1 + 0.06 * (1 - env)
        if kick:
            paste(c, kick, W / 2, y0 - 70, alpha=prog(t, 0.0, 0.25) * env)
        for i, im in enumerate(imgs):
            ts = i * stagger
            p = prog(t, ts, ts + 0.42)
            if p <= 0: continue
            s = (0.72 + 0.28 * ease_out_back(p)) * (1 + 0.025 * prog(t, ts + 0.42, dur)) * out_s
            cy = y0 + i * (lh + gap) + lh / 2
            paste(c, im, W / 2, cy, scale=s, alpha=min(1, p * 3) * env)
        pu = ease_out_cubic(prog(t, t_ul, t_ul + 0.4))
        if pu > 0:
            yb = y0 + total_h + 26
            fill_rect(c, W / 2 - ul_w / 2 * pu, yb, W / 2 + ul_w / 2 * pu, yb + 9, RED, env)
        footer_tag(c, footer, env * prog(t, 0, 0.4))
    render(out, dur, draw)

# =================================================================================================
# b. WORD-BY-WORD QUOTE
# =================================================================================================
def word_by_word(out, text, attribution=None, red=(), dur=5.5, size=82, reveal=None, footer=None):
    """Serif quote revealed word by word (fade + 14px rise per word), big red quote mark, attribution fades in last."""
    red = {_norm(r) for r in red}
    f = font(F_SERIF_B, size)
    words = text.split()
    lines = wrap(words, f, 1600)
    while len(lines) > 4 or (len(lines) > 1 and len(lines[-1]) == 1):   # avoid an orphan last word
        f = font(F_SERIF_B, f.size - 4); lines = wrap(words, f, 1600)
    asc, desc = f.getmetrics(); lh = int((asc + desc) * 1.12); sp = f.getlength(" ")
    total_h = len(lines) * lh
    y0 = H / 2 - total_h / 2 - 20
    # pre-render each word with its position
    items = []
    for li, ln in enumerate(lines):
        lw = sum(f.getlength(w_) for w_ in ln) + sp * (len(ln) - 1)
        x = W / 2 - lw / 2
        for w_ in ln:
            col = RED if _norm(w_) in red else PAPER
            im = text_img(w_, f, col, shadow=10)
            items.append((im, x - im.info["pad"] + im.width / 2, y0 + li * lh + (asc + desc) / 2))
            x += f.getlength(w_) + sp
    reveal = reveal or min(dur * 0.55, 0.28 * len(items) + 0.4)
    step = (reveal - 0.3) / max(1, len(items))
    qm = text_img("“", font(F_SERIF_B, 260), RED, shadow=0)
    att = text_img(attribution, font(F_SANS_B, 30), GREY, tracking=5, shadow=6) if attribution else None

    def draw(t, fi, c):
        env = clamp((dur - t) / 0.5)
        paste(c, qm, W / 2, y0 - 70, alpha=0.9 * prog(t, 0, 0.35) * env, scale=0.9 + 0.1 * ease_out_cubic(prog(t, 0, 0.4)))
        for i, (im, cx, cy) in enumerate(items):
            ts = 0.3 + i * step
            p = prog(t, ts, ts + 0.22)
            if p <= 0: break
            paste(c, im, cx, cy + 14 * (1 - ease_out_cubic(p)), alpha=p * env)
        if att:
            pa = ease_out_cubic(prog(t, reveal + 0.1, reveal + 0.6))
            paste(c, att, W / 2, y0 + total_h + 60 + 10 * (1 - pa), alpha=pa * env)
        footer_tag(c, footer, env)
    render(out, dur, draw)

# =================================================================================================
# c. NUMBER COUNT-UP
# =================================================================================================
def _fmt(v, decimals, commas):
    s = f"{v:,.{decimals}f}" if commas else f"{v:.{decimals}f}"
    return s

def count_up(out, to, frm=0, prefix="", suffix="", decimals=0, commas=True, label=None, sublabel=None, kicker=None,
             dur=5.0, count_time=2.3, size=230, end_red=False, glitch=False, footer=None):
    """Big number counting from `frm` to `to` (ease-out-expo), pops when it lands. Counting down + end_red + glitch
    gives the 'collapse' version. label = main caption line (tracked caps), sublabel = smaller source/qualifier line."""
    final = prefix + _fmt(to, decimals, commas) + suffix
    start = prefix + _fmt(frm, decimals, commas) + suffix
    f = fit_font(F_SANS_B, [final, start], 1700, size)
    lab = text_img(label, fit_font(F_SANS_B, [label], 1600, 44, tracking=6), PAPER, tracking=6, shadow=8) if label else None
    sub = text_img(sublabel, fit_font(F_SANS, [sublabel], 1600, 30, tracking=3), GREY, tracking=3, shadow=6) if sublabel else None
    kick = text_img(kicker, font(F_MONO_B, 30), RED, tracking=8, shadow=6) if kicker else None
    num_cache = {}
    t0 = 0.25
    ny = H / 2 - 40

    def num_img(s, col):
        k = (s, col)
        if k not in num_cache:
            num_cache[k] = text_img(s, f, col, shadow=16)
        return num_cache[k]

    def draw(t, fi, c):
        env = clamp((dur - t) / 0.5)
        p = prog(t, t0, t0 + count_time)
        e = ease_out_expo(p) if p < 1 else 1
        v = frm + (to - frm) * e
        if decimals == 0: v = round(v)
        landed = p >= 1
        col = RED if (end_red and landed) else PAPER
        if end_red and not landed and frm > to:
            col = tuple(int(PAPER[i] + (RED[i] - PAPER[i]) * e) for i in range(3))
        s_txt = final if landed else prefix + _fmt(v, decimals, commas) + suffix
        pop = 1 + 0.07 * math.sin(math.pi * prog(t, t0 + count_time, t0 + count_time + 0.25)) if landed else 1
        im = num_img(s_txt, col)
        sc = (0.94 + 0.06 * ease_out_cubic(prog(t, 0, 0.5))) * pop
        if glitch and (landed and t < t0 + count_time + 0.5 or (not landed and fi % 9 in (0, 1) and p > 0.5)):
            # RGB split + slice jitter
            ox = 14 if fi % 2 else -10
            paste(c, num_img(s_txt, (0, 220, 230)), W / 2 - ox, ny, scale=sc, alpha=0.55 * env)
            paste(c, num_img(s_txt, RED), W / 2 + ox, ny, scale=sc, alpha=0.75 * env)
        paste(c, im, W / 2, ny, scale=sc, alpha=prog(t, 0, 0.3) * env)
        # red rule under number
        pr = ease_out_cubic(prog(t, t0 + count_time - 0.2, t0 + count_time + 0.3))
        if pr > 0:
            fill_rect(c, W / 2 - 140 * pr, ny + f.size * 0.62, W / 2 + 140 * pr, ny + f.size * 0.62 + 8, RED, env)
        if kick: paste(c, kick, W / 2, ny - f.size * 0.75, alpha=prog(t, 0, 0.3) * env)
        if lab:
            pl = ease_out_cubic(prog(t, 0.6, 1.1))
            paste(c, lab, W / 2, ny + f.size * 0.62 + 70 + 16 * (1 - pl), alpha=pl * env)
        if sub:
            ps = ease_out_cubic(prog(t, 1.0, 1.5))
            paste(c, sub, W / 2, ny + f.size * 0.62 + 132 + 12 * (1 - ps), alpha=ps * env)
        footer_tag(c, footer, env)
    render(out, dur, draw)

# =================================================================================================
# d. STAMP SLAM
# =================================================================================================
def _paper_sheet():
    if "paper" in _cache: return _cache["paper"]
    pw, ph = 1360, 900
    rng = np.random.default_rng(3)
    base = np.ones((ph, pw, 3), np.float32) * np.array(PAPER, np.float32)
    base += rng.normal(0, 4, (ph, pw, 1))                                         # paper tooth
    yy = np.linspace(-1, 1, ph)[:, None, None]; xx = np.linspace(-1, 1, pw)[None, :, None]
    base *= (1 - 0.10 * (xx ** 2 + yy ** 2))                                       # uneven light
    sheet = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").convert("RGBA")
    d = ImageDraw.Draw(sheet)
    # unreadable "typed text" bars (no real document is reproduced)
    d.rectangle((90, 80, 520, 104), fill=(120, 112, 100, 255))
    d.rectangle((90, 124, 380, 140), fill=(160, 152, 140, 255))
    d.line((90, 172, pw - 90, 172), fill=(40, 38, 34, 255), width=3)
    y = 220
    while y < ph - 90:
        x = 90
        while x < pw - 160:
            ln = int(rng.integers(40, 170))
            d.rectangle((x, y, min(pw - 90, x + ln), y + 12), fill=(185, 178, 166, 255))
            x += ln + int(rng.integers(14, 26))
        y += 44
    sheet = sheet.rotate(1.2, Image.BICUBIC, expand=True)
    shadow = Image.new("RGBA", (sheet.width + 160, sheet.height + 160), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle((80, 100, 80 + sheet.width, 100 + sheet.height), fill=(0, 0, 0, 170))
    shadow = shadow.filter(ImageFilter.GaussianBlur(36))
    shadow.alpha_composite(sheet, (80, 80))
    bg = bg_dark().copy()
    paste(bg, shadow, W / 2, H / 2 + 20)
    _cache["paper"] = bg
    return bg

def _stamp_img(word, size=170):
    f = fit_font(F_SANS_B, [word], 1000, size, tracking=10)
    tw = text_w(word, f, 10); asc, desc = f.getmetrics()
    bw, bh = int(tw + 140), int(asc + desc + 90)
    im = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((6, 6, bw - 6, bh - 6), radius=22, outline=RED + (255,), width=12)
    d.rounded_rectangle((26, 26, bw - 26, bh - 26), radius=14, outline=RED + (255,), width=4)
    x = 70
    for ch in word:
        d.text((x, 45 - 4), ch, font=f, fill=RED + (255,)); x += f.getlength(ch) + 10
    # ink grunge: speckles + uneven pressure
    rng = np.random.default_rng(len(word) * 31 + bw)
    a = np.asarray(im.getchannel("A"), np.float32) / 255
    low = rng.random((bh // 18 + 2, bw // 18 + 2)).astype(np.float32)
    low = np.asarray(Image.fromarray((low * 255).astype(np.uint8)).resize((bw, bh), Image.BICUBIC), np.float32) / 255
    fine = rng.random((bh, bw)).astype(np.float32)
    a = a * np.clip(0.55 + 0.65 * low, 0, 1) * (fine > 0.07)
    im.putalpha(Image.fromarray((np.clip(a, 0, 1) * 235).astype(np.uint8), "L"))
    return im.rotate(-8, Image.BICUBIC, expand=True)

def stamp(out, word, sub=None, dur=4.0, footer=None):
    """Rubber stamp slams onto a paper sheet at t=0.55s: scales 2.4x -> 1x, white impact flash, decaying shake."""
    st = _stamp_img(word)
    sub_im = text_img(sub, fit_font(F_MONO_B, [sub], 1100, 34), INK, tracking=2, shadow=0) if sub else None
    T = 0.55
    base = _paper_sheet()

    def draw(t, fi, c):
        env = clamp((dur - t) / 0.45)
        c.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - prog(t, 0, 0.3))))))  # fade from black
        p = prog(t, T - 0.22, T)
        if p > 0:
            s = 2.4 - 1.4 * ease_in_cubic(p)
            paste(c, st, W / 2, H / 2 - 30, scale=s, alpha=(0.35 + 0.65 * p))
        if t >= T:
            fl = 1 - prog(t, T, T + 0.12)
            if fl > 0: c.alpha_composite(Image.new("RGBA", (W, H), (255, 255, 255, int(70 * fl))))
        if sub_im:
            ps = ease_out_cubic(prog(t, T + 0.5, T + 0.9))
            paste(c, sub_im, W / 2, H / 2 + st.height / 2 + 40, alpha=ps)
        if env < 1:
            c.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - env)))))
        footer_tag(c, footer, env)

    def shake(t):
        if t < T: return (0, 0, 1.0 + 0.02 * prog(t, 0, T))
        u = prog(t, T, T + 0.45); a = 22 * (1 - u) ** 2
        return (a * math.sin(t * 95), a * 0.7 * math.cos(t * 120), 1.02 + 0.015 * (1 - u) + 0.01 * prog(t, T, dur))
    render(out, dur, draw, base=base, shake=shake)

# =================================================================================================
# e. TYPEWRITER
# =================================================================================================
def typewriter(out, text, sub=None, dur=4.0, cps=16, size=92, footer=None):
    """Mono text typed character by character with a blinking red block cursor; optional second line typed after."""
    cps = max(cps, (len(text) + (len(sub) / 1.4 if sub else 0)) / (dur * 0.5))   # always finish typing by mid-clip
    f = fit_font(F_MONO_B, [text], 1700, size)
    fs = fit_font(F_MONO, [sub], 1600, 40) if sub else None
    asc, desc = f.getmetrics()
    full_w = text_w(text, f)
    x0 = W / 2 - full_w / 2; y = H / 2 - (30 if sub else 0)
    n1 = len(text); t_start = 0.3
    t1 = t_start + n1 / cps
    sub_w = text_w(sub, fs) if sub else 0
    cache = {}

    def timg(s, ff, col):
        k = (s, ff.size, col)
        if k not in cache: cache[k] = text_img(s, ff, col, shadow=10)
        return cache[k]

    def draw(t, fi, c):
        env = clamp((dur - t) / 0.45)
        k = int(clamp((t - t_start) * cps, 0, n1))
        s1 = text[:k]
        if s1:
            im = timg(s1, f, PAPER); paste(c, im, x0 - im.info["pad"], y, anchor="l", alpha=env)
        cur_on = (int(t * 2.4) % 2 == 0) or (0 < k < n1)
        typing_sub = sub and t >= t1 + 0.25
        if not typing_sub and cur_on:
            cx = x0 + text_w(s1, f) + (6 if s1 else 0)
            fill_rect(c, cx, y - asc * 0.62, cx + f.size * 0.55, y + asc * 0.55, RED, env)
        if sub:
            k2 = int(clamp((t - t1 - 0.25) * cps * 1.4, 0, len(sub)))
            s2 = sub[:k2]
            sx = W / 2 - sub_w / 2; sy = y + asc + 30
            if s2:
                im2 = timg(s2, fs, GREY); paste(c, im2, sx - im2.info["pad"], sy, anchor="l", alpha=env)
            if typing_sub and ((int(t * 2.4) % 2 == 0) or 0 < k2 < len(sub)):
                cx = sx + text_w(s2, fs) + 4
                fill_rect(c, cx, sy - fs.size * 0.45, cx + fs.size * 0.55, sy + fs.size * 0.42, RED, env)
        # thin red frame corners for a "file stamp" feel
        a = prog(t, 0, 0.3) * env
        bx0, bx1 = W / 2 - max(full_w, sub_w) / 2 - 70, W / 2 + max(full_w, sub_w) / 2 + 70 + f.size * 0.6
        by0, by1 = y - asc - 40, y + (asc + 110 if sub else asc) + 10
        for (xa, ya, sx_, sy_) in ((bx0, by0, 1, 1), (bx1, by0, -1, 1), (bx0, by1, 1, -1), (bx1, by1, -1, -1)):
            fill_rect(c, min(xa, xa + sx_ * 60), min(ya, ya + sy_ * 5), max(xa, xa + sx_ * 60), max(ya, ya + sy_ * 5), RED, a)
            fill_rect(c, min(xa, xa + sx_ * 5), min(ya, ya + sy_ * 60), max(xa, xa + sx_ * 5), max(ya, ya + sy_ * 60), RED, a)
        footer_tag(c, footer, env)
    render(out, dur, draw)

# =================================================================================================
# f. CHAPTER TITLE CARD
# =================================================================================================
def chapter_card(out, number, title, footer, kicker=None, dur=4.0):
    """Channel chapter card: huge faint outlined number drifting behind, red 'CHAPTER n' kicker with line wipe,
    serif title rising out of a mask line, footer with episode tag. Fades from/to black."""
    kicker = kicker or f"CHAPTER {number}"
    big = Image.new("RGBA", (1100, 760), (0, 0, 0, 0))
    ImageDraw.Draw(big).text((550, 380), f"{number:02d}" if isinstance(number, int) else str(number),
                             font=font(F_SANS_B, 620), fill=(0, 0, 0, 0), anchor="mm", stroke_width=3,
                             stroke_fill=PAPER + (30,))
    kick = text_img(kicker, font(F_MONO_B, 34), RED, tracking=12, shadow=0, pad=4)
    words = title.split()
    ft = font(F_SERIF_B, 124)
    lines = wrap(words, ft, 1300)
    while len(lines) > 2:
        ft = font(F_SERIF_B, ft.size - 8); lines = wrap(words, ft, 1300)
    timgs = [text_img(" ".join(l), ft, PAPER, shadow=14) for l in lines]
    lh = int(sum(ft.getmetrics()) * 1.02)
    X = 230
    ky = H / 2 - (len(lines) * lh) / 2 - 40
    foot = text_img(footer, font(F_SANS_B, 24), (125, 118, 108), tracking=7, shadow=0, pad=4)
    try:
        wm = Image.open(os.path.join(BRAND, "watermark.png")).convert("RGBA").resize((76, 76), Image.LANCZOS)
    except OSError:
        wm = None

    def draw(t, fi, c):
        env = min(prog(t, 0, 0.35), clamp((dur - t) / 0.45))
        paste(c, big, W - 520 - 40 * prog(t, 0, dur), H / 2 + 10, scale=1.0 + 0.04 * prog(t, 0, dur), alpha=env)
        pk = ease_out_cubic(prog(t, 0.15, 0.55))
        paste(c, kick, X - 4 - 30 * (1 - pk), ky, anchor="l", alpha=pk * env)
        pl = ease_out_cubic(prog(t, 0.25, 0.85))
        fill_rect(c, X, ky + 34, X + 260 * pl, ky + 41, RED, env)
        for i, im in enumerate(timgs):
            p = ease_out_cubic(prog(t, 0.45 + i * 0.12, 1.15 + i * 0.12))
            if p <= 0: continue
            cy_final = ky + 70 + i * lh + lh / 2
            mask_bottom = cy_final + lh / 2 + 6
            cy = cy_final + (1 - p) * lh * 0.9
            top = int(cy - im.height / 2)
            vis = int(mask_bottom - top)
            if vis <= 0: continue
            crop = im.crop((0, 0, im.width, min(im.height, vis)))
            paste(c, crop, X - im.info["pad"], top + crop.height / 2, anchor="l", alpha=env * min(1, p * 1.5))
        pf = prog(t, 0.9, 1.4)
        paste(c, foot, X, H - 120, anchor="l", alpha=pf * env)
        if wm: paste(c, wm, W - 120, H - 120, alpha=0.55 * pf * env)
        # fade-from/to-black
        if env < 1: c.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - env)))))
    render(out, dur, draw)

# =================================================================================================
# g. LOWER THIRD
# =================================================================================================
def lower_third(out, title, sub=None, dur=5.0, alpha_mov=False):
    """Bottom-left label: red bar grows, dark plate wipes in, title + sub slide in; reverse on exit.
    Rendered on pure black without grain -> in CapCut set blend mode 'Screen' over footage
    (alpha_mov=True additionally writes a ProRes 4444 .mov with real transparency)."""
    ft, fs = font(F_SANS_B, 54), font(F_SANS, 34)
    ti = text_img(title.upper(), ft, PAPER, tracking=4, shadow=0, pad=4)
    si = text_img(sub, fs, (215, 208, 196), shadow=0, pad=4) if sub else None
    pw = int(max(ti.width, si.width if si else 0) + 90)
    X, Y = 120, 850
    ph = 150 if si else 100

    def frame(t):
        c = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        pin = ease_out_cubic(prog(t, 0, 0.35)); pout = ease_in_cubic(prog(t, dur - 0.5, dur - 0.1))
        bar_h = ph * pin * (1 - pout)
        fill_rect(c, X, Y + ph / 2 - bar_h / 2, X + 10, Y + ph / 2 + bar_h / 2, RED)
        pp = ease_out_cubic(prog(t, 0.2, 0.65)) * (1 - ease_in_cubic(prog(t, dur - 0.65, dur - 0.25)))
        if pp > 0:
            fill_rect(c, X + 10, Y, X + 10 + pw * pp, Y + ph, (20, 21, 26), 0.82)
            # text clipped to the plate
            lay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            pt = ease_out_cubic(prog(t, 0.35, 0.8))
            paste(lay, ti, X + 44 - 40 * (1 - pt), Y + (40 if si else ph / 2), anchor="l", alpha=pt)
            if si:
                ps = ease_out_cubic(prog(t, 0.5, 0.95))
                paste(lay, si, X + 46 - 40 * (1 - ps), Y + 104, anchor="l", alpha=ps)
            m = Image.new("L", (W, H), 0)
            ImageDraw.Draw(m).rectangle((X + 10, Y, X + 10 + pw * pp, Y + ph), fill=255)
            lay.putalpha(Image.fromarray(np.minimum(np.asarray(lay.getchannel("A")), np.asarray(m)), "L"))
            c.alpha_composite(lay)
        return c

    n = int(round(dur * FPS))
    black = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    wr = Writer(out)
    wa = Writer(out[:-4] + "_alpha.mov", alpha=True) if alpha_mov else None
    for fi in range(n):
        fr = frame(fi / FPS)
        wr.write(np.asarray(Image.alpha_composite(black, fr).convert("RGB")))
        if wa: wa.write(np.asarray(fr))
    wr.close()
    if wa: wa.close()
    print(f"  wrote {os.path.relpath(out, HERE)} ({dur:.1f}s, {os.path.getsize(out)/1e6:.2f} MB)")

# =================================================================================================
# h. ROUTE MAP
# =================================================================================================
def route_map(out, stops, areas=(), title=None, dur=6.0, footer=None):
    """Schematic map: stops = [(label, sublabel, lat, lon)], projected equirectangularly into the frame.
    Dots pop in one by one and a red arc draws between them with a glowing head. areas = [(text, lat, lon)]
    are italic water/region labels. Lat/long grid in the background, no real map imagery."""
    lats = [s[2] for s in stops] + [a[1] for a in areas]; lons = [s[3] for s in stops] + [a[2] for a in areas]
    la0, la1, lo0, lo1 = min(lats), max(lats), min(lons), max(lons)
    span = max(lo1 - lo0, (la1 - la0) * 1.6, 2.0)
    k = 1300 / span
    cx_lon, cy_lat = (lo0 + lo1) / 2, (la0 + la1) / 2
    def proj(lat, lon): return (W / 2 + (lon - cx_lon) * k, H / 2 + 40 - (lat - cy_lat) * k)
    # optional 5th element = schematic pixel nudge (dx, dy) to separate stops that are geographically very close
    pts = [(proj(s[2], s[3])[0] + (s[4][0] if len(s) > 4 else 0), proj(s[2], s[3])[1] + (s[4][1] if len(s) > 4 else 0)) for s in stops]
    # background grid every N degrees
    SS = 2
    base = bg_dark().copy()
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(g)
    step = 10 if span > 40 else (2 if span < 12 else 5)
    lon = math.floor((cx_lon - W / 2 / k) / step) * step
    while lon < cx_lon + W / 2 / k:
        x = W / 2 + (lon - cx_lon) * k; gd.line((x, 0, x, H), fill=PAPER + (16,), width=1); lon += step
    lat = math.floor((cy_lat - H / 2 / k) / step) * step
    while lat < cy_lat + H / 2 / k + step:
        y = H / 2 + 40 - (lat - cy_lat) * k; gd.line((0, y, W, y), fill=PAPER + (16,), width=1); lat += step
    base.alpha_composite(g)
    for txt, la, lo in areas:
        im = text_img(txt, font(F_SERIF_I, 40), (110, 120, 128), tracking=8, shadow=0)
        x, y = proj(la, lo); paste(base, im, x, y)
    if title:
        paste(base, text_img(title, font(F_MONO_B, 30), RED, tracking=8, shadow=0), W / 2, 90)
    # arcs (quadratic bezier bulging "north")
    segs = []
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        L = math.hypot(x1 - x0, y1 - y0)
        mx, my = (x0 + x1) / 2, (y0 + y1) / 2 - 0.18 * L
        segs.append([((1 - u) ** 2 * x0 + 2 * (1 - u) * u * mx + u * u * x1, (1 - u) ** 2 * y0 + 2 * (1 - u) * u * my + u * u * y1)
                     for u in np.linspace(0, 1, 90)])
    nseg = len(segs)
    t_first = 0.5; draw_t = (dur - 1.6 - t_first) / max(1, nseg)
    labels = []
    for i, (lab, sub, la, lo, *_) in enumerate(stops):
        li = text_img(lab, font(F_SANS_B, 40), PAPER, tracking=5, shadow=8)
        si = text_img(sub, font(F_SANS, 28), GREY, shadow=6) if sub else None
        labels.append((li, si))
    # label side: alternate above/below when points are close
    sides = []   # label above (-1) when the connecting lines run below the dot, else below (+1)
    for i, p in enumerate(pts):
        nb = [pts[j] for j in (i - 1, i + 1) if 0 <= j < len(pts)]
        sides.append(-1 if sum(q[1] for q in nb) / len(nb) > p[1] else 1)

    def draw(t, fi, c):
        env = clamp((dur - t) / 0.5) * prog(t, 0, 0.3)
        lay = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
        head = None
        for si_, seg in enumerate(segs):
            p = ease_in_out(prog(t, t_first + si_ * draw_t + 0.25, t_first + (si_ + 1) * draw_t))
            if p <= 0: continue
            m = max(2, int(len(seg) * p))
            d.line([(x * SS, y * SS) for x, y in seg[:m]], fill=RED + (255,), width=6 * SS, joint="curve")
            if p < 1: head = seg[m - 1]
        for i, (x, y) in enumerate(pts):
            ts = t_first + max(0, i - 1) * draw_t + (draw_t if i else 0)
            p = prog(t, ts, ts + 0.3)
            if p <= 0: continue
            r = 14 * ease_out_back(p)
            d.ellipse(((x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS), fill=PAPER + (255,), outline=RED + (255,), width=5 * SS)
            pr = prog(t, ts, ts + 1.0)
            if pr < 1:
                rr = 14 + 60 * pr
                d.ellipse(((x - rr) * SS, (y - rr) * SS, (x + rr) * SS, (y + rr) * SS), outline=RED + (int(200 * (1 - pr)),), width=3 * SS)
        if head:
            x, y = head
            d.ellipse(((x - 10) * SS, (y - 10) * SS, (x + 10) * SS, (y + 10) * SS), fill=(255, 220, 220, 255))
        lay = lay.resize((W, H), Image.LANCZOS)
        if head:
            glow = Image.new("RGBA", (120, 120), (0, 0, 0, 0))
            ImageDraw.Draw(glow).ellipse((30, 30, 90, 90), fill=RED + (200,))
            paste(lay, glow.filter(ImageFilter.GaussianBlur(14)), head[0], head[1])
        c.alpha_composite(with_alpha(lay, env))
        for i, ((x, y), (li, si)) in enumerate(zip(pts, labels)):
            ts = t_first + max(0, i - 1) * draw_t + (draw_t if i else 0) + 0.15
            p = ease_out_cubic(prog(t, ts, ts + 0.4))
            if p <= 0: continue
            sd = sides[i]
            ly = y + sd * 52
            paste(c, li, x, ly + sd * 10 * (1 - p), alpha=p * env)
            if si: paste(c, si, x, ly + sd * 40 + sd * 10 * (1 - p), alpha=p * env)
        footer_tag(c, footer, env)
    render(out, dur, draw, base=base)

# =================================================================================================
# logo sting
# =================================================================================================
def logo_sting(out, dur=2.6):
    """Tiger logo fades/scales in with a red flash line and 'PAPER TIGER FILES' tracking in. Under 3 s."""
    logo = Image.open(os.path.join(BRAND, "profile.png")).convert("RGBA").resize((460, 460), Image.LANCZOS)
    # key out the logo's own dark backdrop so it sits on our gradient without a visible box/halo
    arr = np.asarray(logo, np.float32)[..., :3]
    dist = np.abs(arr - arr[8, 8]).max(axis=2)
    key = np.clip((dist - 8) / 18, 0, 1)
    inner = np.clip((0.66 - _radial(460, 460, 230, 238, 230)) / 0.05, 0, 1)   # keep the dark stripes/nose inside the face
    a = np.maximum(key, inner)
    logo.putalpha(Image.fromarray((a * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(0.8)))
    name = text_img("PAPER TIGER FILES", font(F_SANS_B, 64), PAPER, tracking=14, shadow=10)

    def draw(t, fi, c):
        env = clamp((dur - t) / 0.35)
        p = ease_out_cubic(prog(t, 0, 0.6))
        paste(c, logo, W / 2, H / 2 - 90, scale=0.86 + 0.14 * p + 0.03 * prog(t, 0.6, dur), alpha=p * env)
        pl = ease_out_cubic(prog(t, 0.45, 0.9))
        fill_rect(c, W / 2 - 260 * pl, H / 2 + 180, W / 2 + 260 * pl, H / 2 + 186, RED, env)
        pn = ease_out_cubic(prog(t, 0.6, 1.1))
        paste(c, name, W / 2, H / 2 + 240, scale=1.08 - 0.08 * pn, alpha=pn * env)
        fl = 1 - prog(t, 0.45, 0.6)
        if 0 < fl < 1: c.alpha_composite(Image.new("RGBA", (W, H), RED + (int(40 * fl),)))
    render(out, dur, draw)

# =================================================================================================
# Episode specs (text taken from the scripts; legal qualifiers kept)
# =================================================================================================
EP01_DIR = os.path.join(HERE, "ep01_terra_luna", "motion")
EP02_DIR = os.path.join(HERE, "ep02_cho_hee_pal", "motion")
F1 = "PAPER TIGER FILES  ·  EP.01  TERRA-LUNA"
F2 = "PAPER TIGER FILES  ·  EP.02  CHO HEE-PAL"

EP01_CHAPTERS = [
    (0, "The $40 Billion Vanishing Act", "FILE No. 001"),
    (1, "The golden boy", None), (2, "Coffee paid in crypto", None), (3, "The magic trick", None),
    (4, "The 20% promise", None), (5, "The hidden rescue", None), (6, "The bitcoin war chest", None),
    (7, "Seven days in May", None), (8, "The Lunatics", None), (9, "The dominoes", None), (10, "Terra 2.0", None),
    (11, "The chase", None), (12, "The verdicts", None), (13, "The Korean side of the story", None),
    (14, "Why the dream keeps coming back", None), (15, "Outro", "FINAL CHAPTER"),
]
EP02_CHAPTERS = [
    (0, "The Funeral Nobody Believed", "FILE No. 002"),
    (1, "The machine that paid every day", None), (2, "The ladder", None), (3, "From Daegu to everywhere", None),
    (4, "The warnings", None), (5, "The collapse and the escape", None), (6, "The twist: who was on the payroll?", None),
    (7, "The funeral nobody believed", None), (8, "The trial of the right-hand man", None),
    (9, "The villain on the big screen", None), (10, "The money, 18 years later", None),
    (11, "Why it keeps coming back", None), (12, "Outro", "FINAL CHAPTER"),
]

# =================================================================================================
# explainer graphics (pack 2): line chart, flow diagram, timeline, compare, bar chart, pyramid
# =================================================================================================
def _title_kick(title):
    return text_img(title, fit_font(F_MONO_B, [title], 1500, 34, tracking=8), RED, tracking=8, shadow=6) if title else None

def _arrow(d, x0, y0, x1, y1, col, width, head=22):
    d.line((x0, y0, x1, y1), fill=col, width=width)
    a = math.atan2(y1 - y0, x1 - x0)
    d.polygon([(x1, y1), (x1 - head * math.cos(a - 0.42), y1 - head * math.sin(a - 0.42)),
               (x1 - head * math.cos(a + 0.42), y1 - head * math.sin(a + 0.42))], fill=col)

def line_chart(out, points, title=None, prefix="$", suffix="", decimals=2, log=False, red_from=None, note=None,
               dur=5.5, footer=None):
    """Price/line chart drawn left to right. points = [[x_label, value], ...] (2-8 points, values from the script).
    A glowing head carries a live value tag; segments from index red_from on are drawn red (the crash), and the
    frame shakes once when the line lands. log=True for crashes over several orders of magnitude. note = small
    qualifier line under the chart (e.g. 'Approximate prices')."""
    n = len(points)
    vals = [float(v) for _, v in points]
    fy = (lambda v: math.log10(max(v, 1e-6))) if log else (lambda v: v)
    lo, hi = min(map(fy, vals)), max(map(fy, vals))
    if hi - lo < 1e-9: hi = lo + 1
    pad_ = (hi - lo) * 0.08; lo -= pad_; hi += pad_
    X0, X1, Y0, Y1 = 230, 1690, 240, 820
    pts = [(X0 + (X1 - X0) * i / max(1, n - 1), Y1 - (Y1 - Y0) * (fy(v) - lo) / (hi - lo)) for i, v in enumerate(vals)]
    kick = _title_kick(title)
    nt = text_img(note, font(F_SANS, 26), GREY, shadow=0) if note else None
    xl = [text_img(str(lbl), fit_font(F_MONO_B, [str(lbl)], (X1 - X0) / max(1, n - 1) - 10 if n > 1 else 400, 28), GREY, shadow=0)
          for lbl, _ in points]
    fv = font(F_SANS_B, 44)
    def fmt(v):
        d_ = decimals if v >= 0.01 or decimals > 4 else 6
        return prefix + _fmt(v, d_, True) + suffix
    base = bg_dark().copy()
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(g)
    for k in range(6):
        y = Y0 + (Y1 - Y0) * k / 5; gd.line((X0, y, X1, y), fill=PAPER + (18,), width=1)
    gd.line((X0, Y1, X1, Y1), fill=PAPER + (70,), width=2)
    base.alpha_composite(g)
    t0, t1 = 0.5, dur - 1.3
    land = {"t": None}
    SS = 2
    def at(p):       # position + value along the polyline for progress p
        u = p * (n - 1); i = min(n - 2, int(u)) if n > 1 else 0; f_ = u - i
        if n == 1: return pts[0], vals[0], 0
        x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f_; y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f_
        if log:
            v = 10 ** (fy(vals[i]) + (fy(vals[i + 1]) - fy(vals[i])) * f_)
        else:
            v = vals[i] + (vals[i + 1] - vals[i]) * f_
        return (x, y), v, i
    def draw(t, fi, c):
        env = fade_env(t, dur, 0.3, 0.5)
        p = ease_in_out(prog(t, t0, t1))
        (hx, hy), v, seg = at(p)
        lay = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
        u = p * (n - 1)
        for i in range(n - 1):
            if u <= i: break
            a, b = pts[i], pts[i + 1]
            f_ = min(1.0, u - i)
            e = (a[0] + (b[0] - a[0]) * f_, a[1] + (b[1] - a[1]) * f_)
            col = RED if (red_from is not None and i >= red_from) else PAPER
            # soft area under paper segments
            d.line((a[0] * SS, a[1] * SS, e[0] * SS, e[1] * SS), fill=col + (255,), width=7 * SS)
        for i, (x, y) in enumerate(pts):
            if u + 1e-6 >= i:
                col = RED if (red_from is not None and i > red_from) else PAPER
                d.ellipse(((x - 9) * SS, (y - 9) * SS, (x + 9) * SS, (y + 9) * SS), fill=col + (255,))
        lay = lay.resize((W, H), Image.LANCZOS)
        if p > 0:
            hot = red_from is not None and seg >= red_from
            glow = Image.new("RGBA", (140, 140), (0, 0, 0, 0))
            ImageDraw.Draw(glow).ellipse((40, 40, 100, 100), fill=(RED if hot else PAPER) + (190,))
            paste(lay, glow.filter(ImageFilter.GaussianBlur(16)), hx, hy)
        c.alpha_composite(with_alpha(lay, env))
        for i, im in enumerate(xl):
            pi = prog(u, i - 0.4, i + 0.02) if n > 1 else 1
            if pi > 0: paste(c, im, pts[i][0], Y1 + 40, alpha=pi * env)
        if p > 0:
            hot = red_from is not None and seg >= red_from and p > 0
            tag = text_img(fmt(v if p < 1 else vals[-1]), fv, RED if hot else PAPER, shadow=10)
            ty = hy - 60 if hy > Y0 + 80 else hy + 60
            tx = min(max(hx, X0 + tag.width / 2), X1 - tag.width / 2 + 60)
            paste(c, tag, tx, ty, alpha=env)
        if kick: paste(c, kick, W / 2, 140, alpha=env * prog(t, 0, 0.3))
        if nt: paste(c, nt, W / 2, H - 120, alpha=env * prog(t, 0.6, 1.0))
        footer_tag(c, footer, env)
    def shake(t):
        if red_from is None: return 0, 0, 1
        k = prog(t, t1, t1 + 0.35)
        if k <= 0 or k >= 1: return 0, 0, 1
        a = (1 - k) * 12
        return a * math.sin(t * 90), a * math.cos(t * 70), 1 + 0.01 * (1 - k)
    render(out, dur, draw, base=base, shake=shake)


def flow_diagram(out, nodes, edges, title=None, dur=6.0, footer=None):
    """Boxes and arrows with money flowing along them.
    nodes = [{"id","label","sub"(opt),"x","y" (0-1 frame fractions),"red"(opt bool)}] (2-6 nodes, pop in in order);
    edges = [{"from","to","label"(opt),"red"(opt)}] drawn once both ends are visible, then dots stream along them.
    Use it for how a scheme moves money (new deposits -> paid out as 'returns' to earlier investors)."""
    kick = _title_kick(title)
    N = {}
    order = {nd["id"]: i for i, nd in enumerate(nodes)}
    for nd in nodes:
        fl = fit_font(F_SANS_B, [nd["label"]], 440, 58)
        li = text_img(nd["label"], fl, PAPER, shadow=0)
        si = text_img(nd["sub"], fit_font(F_SANS, [nd["sub"]], 440, 36), GREY, shadow=0) if nd.get("sub") else None
        bw = max(li.width, si.width if si else 0) + 56; bh = li.height + (si.height - 2 if si else 0) + 44
        cx, cy = 120 + nd["x"] * (W - 240), 150 + nd["y"] * (H - 330)
        box = Image.new("RGBA", (int(bw) + 8, int(bh) + 8), (0, 0, 0, 0))
        bd = ImageDraw.Draw(box)
        bd.rounded_rectangle((4, 4, bw + 3, bh + 3), radius=14, fill=DARK_HI + (245,), outline=(RED if nd.get("red") else PAPER) + (255,), width=4)
        box.alpha_composite(li, (int((box.width - li.width) / 2), int(10 if si else (box.height - li.height) / 2)))
        if si: box.alpha_composite(si, (int((box.width - si.width) / 2), int(box.height - si.height - 12)))
        N[nd["id"]] = {"c": (cx, cy), "img": box, "w": box.width, "h": box.height, "i": order[nd["id"]]}
    nn = len(nodes)
    t_node = lambda i: 0.3 + i * min(0.55, (dur * 0.45) / max(1, nn))
    pairs = {(e["from"], e["to"]) for e in edges}
    E = []
    for e in edges:
        a, b = N[e["from"]], N[e["to"]]
        (x0, y0), (x1, y1) = a["c"], b["c"]
        L = math.hypot(x1 - x0, y1 - y0) or 1
        ux, uy = (x1 - x0) / L, (y1 - y0) / L
        off = 18 if (e["to"], e["from"]) in pairs else 0          # two-way flows run side by side
        ox, oy = -uy * off, ux * off
        def edge_pt(box, sx, sy):                                 # where the ray leaves the box
            hw, hh = box["w"] / 2 + 10, box["h"] / 2 + 10
            k = min(hw / abs(sx) if sx else 1e9, hh / abs(sy) if sy else 1e9)
            return k
        k0, k1 = edge_pt(a, ux, uy), edge_pt(b, ux, uy)
        p0 = (x0 + ux * k0 + ox, y0 + uy * k0 + oy); p1 = (x1 - ux * k1 + ox, y1 - uy * k1 + oy)
        ts = max(t_node(a["i"]), t_node(b["i"])) + 0.25
        lab = text_img(e["label"], fit_font(F_SANS_B, [e["label"]], 380, 40), RED if e.get("red") else (220, 210, 190), shadow=8) if e.get("label") else None
        E.append({"p0": p0, "p1": p1, "ts": ts, "red": e.get("red"), "lab": lab, "n": (-uy, ux)})
    SS = 2
    def draw(t, fi, c):
        env = fade_env(t, dur, 0.3, 0.5)
        lay = Image.new("RGBA", (W * SS, H * SS), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
        for e in E:
            p = ease_out_cubic(prog(t, e["ts"], e["ts"] + 0.5))
            if p <= 0: continue
            (x0, y0), (x1, y1) = e["p0"], e["p1"]
            xe, ye = x0 + (x1 - x0) * p, y0 + (y1 - y0) * p
            col = (RED if e["red"] else PAPER) + (230,)
            _arrow(d, x0 * SS, y0 * SS, xe * SS, ye * SS, col, 5 * SS, head=22 * SS if p > 0.6 else 0)
            if p >= 1:                                            # money dots streaming
                for k in range(5):
                    u = ((t - e["ts"]) * 0.55 + k / 5) % 1.0
                    x, y = x0 + (x1 - x0) * u, y0 + (y1 - y0) * u
                    r = 10
                    d.ellipse(((x - r) * SS, (y - r) * SS, (x + r) * SS, (y + r) * SS),
                              fill=((255, 120, 130) if e["red"] else (240, 200, 90)) + (int(255 * math.sin(math.pi * u)),))
        lay = lay.resize((W, H), Image.LANCZOS)
        c.alpha_composite(with_alpha(lay, env))
        for e in E:
            if e["lab"]:
                p = prog(t, e["ts"] + 0.3, e["ts"] + 0.7)
                (x0, y0), (x1, y1) = e["p0"], e["p1"]
                nx, ny = e["n"]
                if ny > 0: nx, ny = -nx, -ny
                paste(c, e["lab"], (x0 + x1) / 2 + nx * 34, (y0 + y1) / 2 + ny * 34, alpha=p * env)
        for nd in N.values():
            p = prog(t, t_node(nd["i"]), t_node(nd["i"]) + 0.4)
            if p <= 0: continue
            paste(c, nd["img"], nd["c"][0], nd["c"][1], scale=0.85 + 0.15 * ease_out_back(p), alpha=min(1, p * 2) * env)
        if kick: paste(c, kick, W / 2, 90, alpha=env * prog(t, 0, 0.3))
        footer_tag(c, footer, env)
    render(out, dur, draw)


def timeline(out, events, title=None, red_last=True, dur=6.0, footer=None):
    """Horizontal timeline: a line draws left to right and each event pops in on it.
    events = [[date, text], ...] (2-6, dates and wording from the script); the last one is red when red_last."""
    n = len(events)
    kick = _title_kick(title)
    X0, X1, Y = 180, 1740, 540
    xs = [X0 + (X1 - X0) * (i + 0.5) / n for i in range(n)]
    col_w = (X1 - X0) / n - 30
    fd = fit_font(F_MONO_B, [str(e[0]) for e in events], col_w, 46)
    ft = font(F_SANS, 34 if n <= 4 else 30)
    items = []
    for i, (date, txt) in enumerate(events):
        hot = red_last and i == n - 1
        di = text_img(str(date), fd, RED if hot else PAPER, shadow=8)
        lines = [" ".join(l) for l in wrap(str(txt).split(), ft, col_w)][:3]
        ti = [text_img(l, ft, PAPER if hot else (215, 207, 194), shadow=6) for l in lines]
        items.append((di, ti, hot))
    t0, t1 = 0.35, dur - 1.4
    def draw(t, fi, c):
        env = fade_env(t, dur, 0.3, 0.5)
        p = ease_in_out(prog(t, t0, t1))
        xe = X0 + (X1 - X0) * p
        fill_rect(c, X0, Y - 3, X1, Y + 3, PAPER, 0.12 * env)
        fill_rect(c, X0, Y - 3, xe, Y + 3, PAPER, 0.85 * env)
        for i, x in enumerate(xs):
            q = prog(xe, x - 10, x + 120)
            if q <= 0: continue
            di, ti, hot = items[i]
            e = ease_out_back(min(1, q * 1.4)) if q < 1 else 1
            r = 13 * e
            lay = Image.new("RGBA", (80, 80), (0, 0, 0, 0)); dd = ImageDraw.Draw(lay)
            dd.ellipse((40 - r, 40 - r, 40 + r, 40 + r), fill=(RED if hot else PAPER) + (255,))
            if hot and q >= 1:
                rr = 13 + 10 * (0.5 + 0.5 * math.sin(t * 6))
                dd.ellipse((40 - rr, 40 - rr, 40 + rr, 40 + rr), outline=RED + (120,), width=3)
            paste(c, lay, x, Y, alpha=env)
            a = ease_out_cubic(min(1, q * 1.2))
            fill_rect(c, x - 1, Y - 70 * a, x + 1, Y - 16, GREY, 0.6 * env)
            paste(c, di, x, Y - 110 - 14 * (1 - a), alpha=a * env)
            for k, im in enumerate(ti):
                paste(c, im, x, Y + 70 + k * (ft.size + 10) + 14 * (1 - a), alpha=a * env)
        if kick: paste(c, kick, W / 2, 170, alpha=env * prog(t, 0, 0.3))
        footer_tag(c, footer, env)
    render(out, dur, draw)


def compare(out, left, right, title=None, dur=5.0, footer=None):
    """Split screen: what was promised/claimed vs what happened. left/right = {"head","big","sub"(opt)};
    left slides in first in paper white, right follows in red, a divider wipes down the middle."""
    kick = _title_kick(title)
    def side(s, col):
        hd = text_img(s["head"].upper(), fit_font(F_MONO_B, [s["head"].upper()], 760, 36, tracking=8), GREY, tracking=8, shadow=0)
        bg_ = text_img(s["big"], fit_font(F_SANS_B, [s["big"]], 780, 150), col, shadow=14)
        sb = None
        if s.get("sub"):
            fs = font(F_SANS, 34)
            sb = [text_img(" ".join(l), fs, (215, 207, 194), shadow=6) for l in wrap(s["sub"].split(), fs, 760)][:3]
        return hd, bg_, sb
    L, R = side(left, PAPER), side(right, RED)
    def put(c, s, cx, a, dx):
        hd, bg_, sb = s
        paste(c, hd, cx + dx, 360, alpha=a)
        paste(c, bg_, cx + dx * 1.4, 500, alpha=a)
        for k, im in enumerate(sb or []):
            paste(c, im, cx + dx, 640 + k * 46, alpha=a)
    def draw(t, fi, c):
        env = fade_env(t, dur, 0.25, 0.5)
        pd = ease_out_cubic(prog(t, 0.1, 0.6))
        fill_rect(c, W / 2 - 2, 260, W / 2 + 2, 260 + 520 * pd, PAPER, 0.35 * env)
        pl = ease_out_cubic(prog(t, 0.25, 0.8))
        put(c, L, W / 4 + 20, pl * env, -60 * (1 - pl))
        pr = ease_out_cubic(prog(t, 1.1, 1.65))
        if pr > 0:
            fill_rect(c, W / 2 + 40, 300, W - 60, 760, RED, 0.06 * pr * env)
        put(c, R, 3 * W / 4 - 20, pr * env, 60 * (1 - pr))
        if kick: paste(c, kick, W / 2, 170, alpha=env * prog(t, 0, 0.3))
        footer_tag(c, footer, env)
    def shake(t):
        k = prog(t, 1.45, 1.75)
        if k <= 0 or k >= 1: return 0, 0, 1
        return 8 * (1 - k) * math.sin(t * 80), 0, 1
    render(out, dur, draw, shake=shake)


def bar_chart(out, bars, title=None, prefix="", suffix="", decimals=0, note=None, dur=5.0, footer=None):
    """Horizontal bars growing with counting values. bars = [[label, value, red(opt bool)], ...] (2-5, from the script)."""
    kick = _title_kick(title)
    n = len(bars)
    vmax = max(float(b[1]) for b in bars) or 1
    fl = fit_font(F_SANS_B, [str(b[0]) for b in bars], 470, 40)
    fv = font(F_SANS_B, 46)
    X0, X1 = 640, 1540
    gap = min(150, 560 / max(1, n))
    ys = [H / 2 + 20 + (i - (n - 1) / 2) * gap for i in range(n)]
    labs = [text_img(str(b[0]), fl, PAPER, shadow=6) for b in bars]
    nt = text_img(note, font(F_SANS, 26), GREY, shadow=0) if note else None
    def draw(t, fi, c):
        env = fade_env(t, dur, 0.25, 0.5)
        for i, b in enumerate(bars):
            ts = 0.35 + i * 0.35
            p = ease_out_expo(prog(t, ts, ts + 1.6))
            a = prog(t, ts - 0.2, ts + 0.2)
            hot = len(b) > 2 and b[2]
            paste(c, labs[i], X0 - 30 - labs[i].width / 2 + labs[i].info["pad"], ys[i], alpha=a * env)
            fill_rect(c, X0, ys[i] - 26, X1, ys[i] + 26, PAPER, 0.05 * env)
            xe = X0 + (X1 - X0) * (float(b[1]) / vmax) * p
            fill_rect(c, X0, ys[i] - 26, xe, ys[i] + 26, RED if hot else PAPER, (0.95 if hot else 0.8) * env * a)
            v = float(b[1]) * p
            s = prefix + _fmt(round(v) if decimals == 0 else v, decimals, True) + suffix
            if p > 0.999: s = prefix + _fmt(float(b[1]) if decimals else round(float(b[1])), decimals, True) + suffix
            vi = text_img(s, fv, RED if hot else PAPER, shadow=8)
            paste(c, vi, min(xe + 24, W - 40 - vi.width) , ys[i], alpha=a * env, anchor="l")
        if kick: paste(c, kick, W / 2, 170, alpha=env * prog(t, 0, 0.3))
        if nt: paste(c, nt, W / 2, H - 120, alpha=env * prog(t, 0.8, 1.2))
        footer_tag(c, footer, env)
    render(out, dur, draw)


def pyramid(out, levels, title=None, collapse=True, collapse_word=None, dur=6.0, footer=None):
    """Pyramid scheme diagram: levels = top->bottom labels (3-5). Tiers stack in from the top, each wider than the
    last (each level needs more new money than the one above); with collapse=True the base cracks, the tiers drop
    and tumble, the frame shakes and collapse_word (optional, e.g. 'COLLAPSE') stamps in red."""
    kick = _title_kick(title)
    n = len(levels)
    th = min(120, 560 / n)
    top = H / 2 - n * th / 2 + 40
    tiers = []
    for i, lab in enumerate(levels):
        w0 = 260 + 1100 * i / max(1, n - 1)
        w1 = 260 + 1100 * (i + 1) / max(1, n - 1) if i < n - 1 else w0 + 1100 / max(1, n - 1)
        h = int(th - 10)
        im = Image.new("RGBA", (int(w1) + 4, h + 4), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        o = (w1 - w0) / 2
        poly = [(2 + o, 2), (2 + o + w0, 2), (2 + w1, h + 2), (2, h + 2)]
        hot = i == n - 1
        d.polygon(poly, fill=(RED + (235,)) if hot else (DARK_HI + (250,)), outline=PAPER + (255,), width=3)
        f = fit_font(F_SANS_B, [lab], w0 + o - 40, 40)
        li = text_img(lab, f, PAPER, shadow=4)
        im.alpha_composite(li, (int(im.width / 2 - li.width / 2), int(im.height / 2 - li.height / 2)))
        tiers.append((im, top + i * th + th / 2))
    cw = text_img(collapse_word, font(F_SANS_B, 150), RED, tracking=10, shadow=14) if (collapse and collapse_word) else None
    tb = 0.3; step = min(0.45, (dur * 0.42) / n)
    tc = max(tb + n * step + 1.0, dur * 0.55)               # collapse time (hold the built pyramid first)
    rnd = np.random.default_rng(7)
    spin = [(rnd.uniform(-1, 1) * 22, rnd.uniform(-1, 1) * 160) for _ in range(n)]
    def draw(t, fi, c):
        env = fade_env(t, dur, 0.25, 0.45)
        for i, (im, y) in enumerate(tiers):
            p = ease_out_back(prog(t, tb + i * step, tb + i * step + 0.35), 1.4)
            if p <= 0: continue
            x, yy, rot, a = W / 2, y - 50 * (1 - p), 0, min(1, p * 1.5)
            if collapse and t > tc:
                k = t - tc - (n - 1 - i) * 0.08            # the base gives way first
                if k > 0:
                    yy += 700 * k * k; rot = spin[i][0] * k * 2; x += spin[i][1] * k; a *= clamp(1 - k / 1.2)
            img = im.rotate(rot, resample=Image.BICUBIC, expand=True) if rot else im
            paste(c, img, x, yy, alpha=a * env)
        if cw is not None:
            q = prog(t, tc + 0.35, tc + 0.6)
            if q > 0: paste(c, cw, W / 2, H / 2, scale=1.6 - 0.6 * ease_out_cubic(q), alpha=min(1, q * 2) * env)
        if kick: paste(c, kick, W / 2, 110, alpha=env * prog(t, 0, 0.3))
        footer_tag(c, footer, env)
    def shake(t):
        if not collapse: return 0, 0, 1
        k = prog(t, tc, tc + 0.5)
        if k <= 0 or k >= 1: return 0, 0, 1
        a = (1 - k) * 16
        return a * math.sin(t * 95), a * math.cos(t * 77), 1 + 0.015 * (1 - k)
    render(out, dur, draw, shake=shake)


def slug(s, n=36):
    s = "_".join(w for w in "".join(ch if ch.isalnum() else " " for ch in s.lower()).split())
    return s if len(s) <= n else s[:n].rsplit("_", 1)[0]

def chapter_jobs(chapters, d, footer):
    jobs = []
    for n, title, kicker in chapters:
        name = f"s{n:02d}_chapter_{slug(title)}.mp4"
        jobs.append((name, lambda o, n=n, title=title, kicker=kicker: chapter_card(o, n, title, footer, kicker=kicker)))
    return jobs

def ep01_jobs():
    d, F = EP01_DIR, F1
    J = chapter_jobs(EP01_CHAPTERS, d, F)
    J += [
        ("s00_logo_sting.mp4", lambda o: logo_sting(o)),
        # ---- key moments
        ("s00_countup_40B.mp4", lambda o: count_up(o, 40, prefix="$", suffix=" BILLION", kicker="MAY 2022",
            label="WORTH AROUND 40 BILLION DOLLARS", sublabel="falls to almost zero in just a few days", footer=F)),
        ("s00_wordbyword_poor_quote.mp4", lambda o: word_by_word(o, "I don't debate the poor on Twitter.",
            attribution="— DO KWON, ONLINE", red=("poor",), dur=4.5, size=96)),
        ("s04_countup_20pct.mp4", lambda o: count_up(o, 20, prefix="~", suffix="%", kicker="ANCHOR PROTOCOL",
            label="PER YEAR, ON UST DEPOSITS", sublabel="close to 20 percent annual interest", footer=F)),
        ("s05_countup_20M_UST_sec.mp4", lambda o: count_up(o, 20, prefix="$", suffix=" MILLION+", kicker="ACCORDING TO THE SEC",
            label="MORE THAN $20 MILLION OF UST", sublabel="bought by the trading firm to push the price back up · May 2021", footer=F)),
        ("s06_countup_80394_BTC.mp4", lambda o: count_up(o, 80394, suffix=" BTC", kicker="LUNA FOUNDATION GUARD",
            label="≈ $2.4B (MAY 7, 2022)", sublabel="one of the biggest bitcoin holders in the world", footer=F)),
        ("s06_keyphrase_hook_questions.mp4", lambda o: key_phrase(o, ["1. Was the 2021 rescue hidden?", "2. Did Chai really run on Terra?"],
            kicker="TWO QUESTIONS", red=("hidden?", "terra?"), stagger=1.1, dur=5.5, size=100, footer=F)),
        ("s07_countdown_80394_to_313_BTC.mp4", lambda o: count_up(o, 313, frm=80394, suffix=" BTC", kicker="THE FOLLOWING MONDAY",
            label="313 BITCOIN LEFT. OUT OF 80,394.", sublabel="Luna Foundation Guard", end_red=True, glitch=True, count_time=2.6, footer=F)),
        ("s07_wordbyword_heartbroken.mp4", lambda o: word_by_word(o, "I am heartbroken about the pain my invention has brought on all of you.",
            attribution="— DO KWON, FRIDAY, MAY 13, 2022", red=("heartbroken",), dur=6.0, size=78)),
        ("s11_route_seoul_to_montenegro.mp4", lambda o: route_map(o, [("SEOUL", None, 37.57, 126.98), ("SINGAPORE", None, 1.35, 103.82),
            ("SERBIA", None, 44.79, 20.45), ("MONTENEGRO", "Podgorica · March 2023", 42.44, 19.26, (-40, 80))], title="THE CHASE", dur=6.0, footer=F)),
        ("s12_stamp_liable_for_fraud.mp4", lambda o: stamp(o, "LIABLE", sub="JURY · NEW YORK · APRIL 2024 · CIVIL CASE", footer=F)),
        ("s12_wordbyword_plea_quote.mp4", lambda o: word_by_word(o, "In 2021, I made false and misleading statements about why [UST] regained its peg.",
            attribution="— DO KWON, IN COURT, AUGUST 2025", red=("false", "misleading"), dur=6.0, size=76)),
        ("s12_stamp_15_years.mp4", lambda o: stamp(o, "15 YEARS", sub="SENTENCED · DECEMBER 2025", footer=F)),
        ("s13_countup_280000_korea.mp4", lambda o: count_up(o, 280000, prefix="~", kicker="ACCORDING TO KOREAN FINANCIAL AUTHORITIES",
            label="PEOPLE IN KOREA HELD LUNA WHEN IT COLLAPSED", footer=F)),
        ("s14_keyphrase_confidence_collateral.mp4", lambda o: key_phrase(o, ["Confidence is the collateral."], red=("collateral.",), dur=4.5, footer=F)),
        # ---- utility: date/location stamps and lower thirds
        ("s05_typewriter_may2021.mp4", lambda o: typewriter(o, "MAY 2021", sub="— one year earlier", dur=3.5)),
        ("s07_typewriter_sat_may07.mp4", lambda o: typewriter(o, "SATURDAY, MAY 7, 2022", dur=3.5)),
        ("s07_typewriter_sun_may08.mp4", lambda o: typewriter(o, "SUNDAY, MAY 8", dur=3.0)),
        ("s07_typewriter_mon_may09.mp4", lambda o: typewriter(o, "MONDAY, MAY 9", dur=3.0)),
        ("s07_typewriter_tue_wed_may10_11.mp4", lambda o: typewriter(o, "TUESDAY–WEDNESDAY, MAY 10–11", dur=3.5)),
        ("s07_typewriter_thu_fri_may12_13.mp4", lambda o: typewriter(o, "THURSDAY–FRIDAY, MAY 12–13", dur=3.5)),
        ("s04_lowerthird_anchor.mp4", lambda o: lower_third(o, "Anchor Protocol", "A lending platform built on Terra")),
        ("s06_lowerthird_lfg.mp4", lambda o: lower_third(o, "Luna Foundation Guard", "Nonprofit · Singapore · set up January 2022")),
        ("s11_lowerthird_podgorica.mp4", lambda o: lower_third(o, "Podgorica, Montenegro", "The capital · airport · March 2023")),
    ]
    return d, J

def ep02_jobs():
    d, F = EP02_DIR, F2
    J = chapter_jobs(EP02_CHAPTERS, d, F)
    J += [
        ("s00_logo_sting.mp4", lambda o: logo_sting(o)),
        # ---- key moments
        ("s00_wordbyword_died_officially.mp4", lambda o: word_by_word(o, "Died: December 2011. Officially.",
            red=("officially.",), dur=4.5, size=104)),
        ("s01_countup_35000_won_a_day.mp4", lambda o: count_up(o, 35000, prefix="+₩", kicker="STEP 2",
            label="ALMOST EVERY BUSINESS DAY", sublabel="according to Korean reporting from the time · around thirty dollars", footer=F)),
        ("s02_keyphrase_product_promise.mp4", lambda o: key_phrase(o, ["The product changed.", "The promise didn't."],
            red=("promise",), stagger=0.9, dur=4.5, footer=F)),
        ("s05_countup_5_trillion_won.mp4", lambda o: count_up(o, 5071500000000, prefix="₩", kicker="PROSECUTORS AND THE COURTS",
            label="ABOUT 5 TRILLION WON · ROUGHLY 4 BILLION DOLLARS", sublabel="from around 70,000 people", dur=5.5, count_time=2.8, size=190, footer=F)),
        ("s05_keyphrase_remember_document.mp4", lambda o: key_phrase(o, ["Remember one document.", "We'll come back to it."],
            red=("document.",), stagger=1.0, dur=5.0, size=104, footer=F)),
        ("s06_countup_900M_won.mp4", lambda o: count_up(o, 900, prefix="₩", suffix=" MILLION", kicker="ACCORDING TO THE COURTS",
            label="AS A BANK CHEQUE · OCTOBER 30, 2008", sublabel="hotel coffee shop, Daegu · around 800 thousand dollars", footer=F)),
        ("s06_stamp_9_years.mp4", lambda o: stamp(o, "9 YEARS", sub="FORMER SENIOR POLICE OFFICER · SUPREME COURT, DEC 2016", footer=F)),
        ("s06_countup_8_officials.mp4", lambda o: count_up(o, 8, kicker="PROSECUTORS SAID", count_time=1.4, size=300,
            label="POLICE AND PROSECUTION OFFICIALS", sublabel="had faced punishment", footer=F)),
        ("s07_route_taean_to_shandong.mp4", lambda o: route_map(o, [("TAEAN", "Korea's west coast", 36.75, 126.30),
            ("SHANDONG PROVINCE", "China", 37.51, 122.12)], areas=[("YELLOW SEA", 35.6, 124.2)], title="ACCORDING TO INVESTIGATORS", dur=5.0, footer=F)),
        ("s07_keyphrase_never_proven.mp4", lambda o: key_phrase(o, ["These are the public's doubts.", "They were never proven."],
            red=("never", "proven."), stagger=1.0, dur=5.0, size=100, footer=F)),
        ("s07_keyphrase_is_he_dead.mp4", lambda o: key_phrase(o, ["So, is Cho Hee-pal dead?"], red=("dead?",), dur=4.0, size=124, footer=F)),
        ("s07_stamp_case_closed.mp4", lambda o: stamp(o, "CASE CLOSED", sub="PROSECUTORS · JUNE 2016 · HE COULD NOT BE CHARGED", footer=F)),
        ("s08_stamp_22_years.mp4", lambda o: stamp(o, "22 YEARS", sub="KANG TAE-YONG · SUPREME COURT, NOV 2017", footer=F)),
        ("s10_countup_22156_creditors.mp4", lambda o: count_up(o, 22156, kicker="JUNE 24, 2026", label="CREDITORS · ₩32B",
            sublabel="the court in Daegu restarted the payouts", footer=F)),
        # ---- utility: date/location stamps and lower thirds
        ("s00_typewriter_december_2008.mp4", lambda o: typewriter(o, "DECEMBER 2008", sub="— Korea's west coast", dur=3.5)),
        ("s01_typewriter_daegu.mp4", lambda o: typewriter(o, "DAEGU", sub="— one of Korea's largest cities", dur=3.5)),
        ("s05_typewriter_dec9_2008_taean.mp4", lambda o: typewriter(o, "DECEMBER 9, 2008 — TAEAN", sub="according to investigators", dur=4.0)),
        ("s07_typewriter_cremation_dates.mp4", lambda o: typewriter(o, "ISSUED: DEC 11 / DATE OF DEATH: DEC 21",
            sub="as reported by victims' groups, 2015", dur=5.0, size=64)),
        ("s04_lowerthird_miryang.mp4", lambda o: lower_third(o, "Miryang", "South Gyeongsang Province · May 2007")),
        ("s04_lowerthird_fss.mp4", lambda o: lower_third(o, "Financial Supervisory Service", "Korea's financial regulator")),
        ("s07_lowerthird_wuxi.mp4", lambda o: lower_third(o, "Wuxi, China", "October 10, 2015")),
    ]
    return d, J

def main(argv):
    which = argv[1] if len(argv) > 1 else "all"
    only = argv[argv.index("--only") + 1] if "--only" in argv else None
    sets = {"ep01": [ep01_jobs], "ep02": [ep02_jobs], "all": [ep01_jobs, ep02_jobs]}[which]
    for js in sets:
        d, jobs = js()
        for name, fn in jobs:
            if only and only not in name: continue
            if "--list" in argv: print(os.path.join(d, name)); continue
            fn(os.path.join(d, name))

if __name__ == "__main__":
    main(sys.argv)
