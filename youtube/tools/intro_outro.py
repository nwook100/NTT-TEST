#!/usr/bin/env python3
"""Channel intro (Marvel-style flipping case files -> title knocked out of the montage -> tiger logo) and an
end-screen outro, both 1920x1080/30 with their own synthesized sound. Channel-wide: no episode-specific facts.

    python3 tools/intro_outro.py intro    -> branding/intro.mp4   (~6.8 s)
    python3 tools/intro_outro.py outro    -> branding/outro.mp4   (20 s, YouTube end-screen layout)
"""
import math, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "assets"))
import motion_tool as mt
from motion_tool import W, H, FPS, RED, PAPER, GREY, INK, DARK, font, text_img, paste, prog, clamp, ease_out_cubic, ease_in_out

BR = os.path.join(ROOT, "branding")
STOCK = os.path.join(ROOT, "assets", "ep01_terra_luna", "stock")
SFX = os.path.join(ROOT, "audio", "sfx")
rng = np.random.default_rng(11)

# ---- montage sources ------------------------------------------------------------------------------
PAGE_WORDS = [("CASE FILE", "No. 0147"), ("EXHIBIT A", None), ("CONFIDENTIAL", None), ("EVIDENCE", "ITEM 23"),
              ("ASSETS FROZEN", None), ("VERDICT", None), ("WIRE TRANSFER", "REF 88-2041"), ("MISSING", "FUNDS"),
              ("PONZI SCHEME", None), ("INDICTMENT", None)]
STOCK_CLIPS = ["money_counting_1", "vault_1", "gavel_1", "documents_desk_1", "passport_1", "glass_breaking_1",
               "stock_market_red_1", "city_night_timelapse_1", "dominoes_falling_1", "legal_documents_1", "crypto_coins_1",
               "server_room_1"]

def dossier(title, sub, i):
    """A procedurally drawn case-file page (paper, typed header, grey text lines, red redactions, stamp)."""
    im = Image.new("RGB", (W, H), (226, 219, 204)); d = ImageDraw.Draw(im)
    a = np.asarray(im, np.float32); a += rng.normal(0, 6, (H, W, 1)); im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(im)
    d.text((160, 110), "PAPER TIGER FILES / ARCHIVE", font=font(mt.F_MONO_B, 34), fill=(90, 84, 76))
    d.text((160, 170), f"DOC {1000 + i * 37}-{i:02d}", font=font(mt.F_MONO, 30), fill=(120, 112, 100))
    d.line((160, 230, W - 160, 230), fill=(60, 56, 50), width=3)
    y = 290
    for k in range(11):
        w = rng.integers(700, 1500)
        col = (40, 38, 36) if rng.random() < 0.18 else (150, 142, 130)
        d.rectangle((160, y, 160 + w, y + 22), fill=col); y += 58
    st = text_img(title, font(mt.F_SANS_B, 150 if len(title) < 11 else 118), RED, tracking=10, shadow=0)
    box = Image.new("RGBA", (st.width + 80, st.height + 40), (0, 0, 0, 0))
    ImageDraw.Draw(box).rectangle((6, 6, box.width - 7, box.height - 7), outline=RED + (255,), width=10)
    box.alpha_composite(st, (40, 20))
    if sub:
        s2 = text_img(sub, font(mt.F_MONO_B, 44), RED, tracking=6, shadow=0)
        b2 = Image.new("RGBA", (max(box.width, s2.width), box.height + s2.height), (0, 0, 0, 0))
        b2.alpha_composite(box, ((b2.width - box.width) // 2, 0)); b2.alpha_composite(s2, ((b2.width - s2.width) // 2, box.height - 10))
        box = b2
    al = np.asarray(box.getchannel("A"), np.float32) * (0.55 + 0.45 * (rng.random(box.size[::-1]) > 0.25))   # worn ink
    box.putalpha(Image.fromarray(al.astype(np.uint8)))
    box = box.rotate(rng.uniform(-14, 14), expand=True, resample=Image.BICUBIC)
    c = im.convert("RGBA"); c.alpha_composite(box, (int(W / 2 - box.width / 2 + rng.integers(-200, 200)), int(H / 2 - box.height / 2 + rng.integers(-60, 120))))
    return c.convert("RGB")

def stock_frame(name):
    p = os.path.join(STOCK, name + ".mp4")
    r = subprocess.run(["ffmpeg", "-v", "error", "-ss", "2", "-i", p, "-frames:v", "1", "-vf", f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}",
                        "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True)
    return Image.frombytes("RGB", (W, H), r.stdout) if len(r.stdout) == W * H * 3 else None

def grade(im, k):
    if k % 3 == 1:                                   # red duotone
        g = ImageOps.grayscale(im); return ImageOps.colorize(g, (10, 4, 6), (235, 60, 75))
    if k % 3 == 2:                                   # bleach mono
        g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=2); return Image.merge("RGB", (g, g, g))
    return Image.blend(im, Image.new("RGB", im.size, (20, 10, 12)), 0.25)

def montage_items():
    pages = [dossier(t, s, i) for i, (t, s) in enumerate(PAGE_WORDS)]
    stock = [f for f in (stock_frame(n) for n in STOCK_CLIPS) if f is not None]
    items = []
    while pages or stock:                            # alternate paper / footage
        if pages: items.append(pages.pop(0))
        if stock: items.append(stock.pop(0))
    return [grade(im, k) for k, im in enumerate(items)]

def logo_rgba(size):
    logo = Image.open(os.path.join(BR, "profile.png")).convert("RGBA").resize((size, size), Image.LANCZOS)
    arr = np.asarray(logo, np.float32)[..., :3]; dist = np.abs(arr - arr[8, 8]).max(axis=2)
    key = np.clip((dist - 8) / 18, 0, 1)
    inner = np.clip((0.66 - mt._radial(size, size, size / 2, size / 2 + 8 * size / 460, size / 2)) / 0.05, 0, 1)
    logo.putalpha(Image.fromarray((np.maximum(key, inner) * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(0.8)))
    return logo

# ---- intro -------------------------------------------------------------------------------------------
def intro(out):
    items = montage_items()
    # cut lengths in frames: slow start, accelerating flips (Marvel page-riffle feel)
    lens = [7, 6, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    M = sum(lens[:len(items)])                       # montage frames (~2.6 s)
    T_TITLE = 48                                     # frames of montage-inside-title
    T_LOGO = 66                                      # tiger logo + wordmark
    N = M + T_TITLE + T_LOGO
    title = "PAPER TIGER FILES"
    mask_full = Image.new("L", (W, H), 0); md = ImageDraw.Draw(mask_full)
    f1 = mt.fit_font(mt.F_SANS_B, ["PAPER TIGER"], 1700, 330, tracking=14)
    f2 = font(mt.F_SANS_B, int(f1.size * 1.05))
    for line, ff, y in (("PAPER TIGER", f1, H / 2 - f1.size * 1.02), ("FILES", f2, H / 2 - f2.size * 0.02)):
        x = (W - mt.text_w(line, ff, 14)) / 2
        for ch in line:
            md.text((x, y), ch, font=ff, fill=255); x += ff.getlength(ch) + 14
    logo = logo_rgba(420)
    name = text_img(title, font(mt.F_SANS_B, 64), PAPER, tracking=14, shadow=10)
    tag = text_img("ASIA'S BIGGEST FRAUDS. THE UNTOLD FILES.", font(mt.F_MONO_B, 30), RED, tracking=8, shadow=6)
    wr = mt.Writer(out)
    seq = []
    for k, L in enumerate(lens[:len(items)]):
        seq += [k] * L
    cuts = []                                        # frame indices where a new page starts (for the flip sfx)
    for fi in range(N):
        if fi < M or fi < M + T_TITLE:
            # current montage picture (keeps riffling under the title too)
            k = seq[fi] if fi < M else (seq[-1] + 1 + (fi - M) // 2) % len(items)
            if fi == 0 or (fi < M and seq[fi] != seq[fi - 1]) or (fi >= M and (fi - M) % 2 == 0): cuts.append(fi)
            base = items[k]
            local = fi - (seq.index(k) if fi < M else M + ((fi - M) // 2) * 2)
            L = lens[k] if fi < M else 2
            z = 1.04 + 0.05 * local / max(1, L)
            dx = (1 if k % 2 else -1) * 40 * local / max(1, L)
            fr = base.transform((W, H), Image.AFFINE, (1 / z, 0, W / 2 - W / 2 / z - dx, 0, 1 / z, H / 2 - H / 2 / z), Image.BILINEAR)
            if local == 0 and fi > 0:                # flip: squeeze-in from the edge on the first frame of a page
                sq = fr.resize((W // 2, H)); fr = Image.new("RGB", (W, H), (10, 8, 9)); fr.paste(sq, (W // 2 if k % 2 else 0, 0))
            if fi < M:
                c = fr.convert("RGBA")
                if fi in cuts and rng.random() < 0.35:
                    c.alpha_composite(Image.new("RGBA", (W, H), RED + (60,)))
            else:
                # montage visible only inside the giant title letters, dark red outside; title pulls back
                p = ease_out_cubic(prog(fi - M, 0, T_TITLE - 6))
                s = 1.8 - 0.8 * p
                m = mask_full.transform((W, H), Image.AFFINE, (1 / s, 0, W / 2 - W / 2 / s, 0, 1 / s, H / 2 - H / 2 / s), Image.BILINEAR)
                bg = Image.new("RGB", (W, H), (30, 6, 10))
                c = Image.composite(fr, bg, m).convert("RGBA")
                edge = m.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.MaxFilter(3))
                c.alpha_composite(Image.merge("RGBA", (Image.new("L", (W, H), 243), Image.new("L", (W, H), 237), Image.new("L", (W, H), 226), edge.point(lambda v: min(255, v * 2)))))
                fo = prog(fi - M, T_TITLE - 8, T_TITLE)
                if fo > 0: c.alpha_composite(Image.new("RGBA", (W, H), (255, 245, 240, int(255 * fo))))   # white flash
        else:
            t = (fi - M - T_TITLE) / FPS; dur = T_LOGO / FPS
            c = mt.bg_dark().copy()
            fl = 1 - prog(t, 0, 0.25)
            p = ease_out_cubic(prog(t, 0, 0.55))
            paste(c, logo, W / 2, H / 2 - 110, scale=1.25 - 0.25 * p + 0.03 * prog(t, 0.55, dur), alpha=p)
            pl = ease_out_cubic(prog(t, 0.35, 0.8))
            mt.fill_rect(c, W / 2 - 300 * pl, H / 2 + 150, W / 2 + 300 * pl, H / 2 + 157, RED, 1)
            pn = ease_out_cubic(prog(t, 0.45, 0.95))
            paste(c, name, W / 2, H / 2 + 215, scale=1.1 - 0.1 * pn, alpha=pn)
            pt = ease_out_cubic(prog(t, 0.9, 1.4))
            paste(c, tag, W / 2, H / 2 + 300, alpha=pt * clamp((dur - t) / 0.3))
            env = clamp((dur - t) / 0.35)
            if env < 1: c.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - env)))))
            if fl > 0: c.alpha_composite(Image.new("RGBA", (W, H), (255, 245, 240, int(255 * fl))))
        wr.write(mt.post(c, fi))
    wr.close()
    audio_intro(out, N, M, M + T_TITLE, cuts)

def audio_intro(video, N, t_title, t_logo, cuts):
    """riser under the riffle, a soft tick per page, a whoosh into the title, a big impact on the logo."""
    dur = N / FPS
    ins, flt = [], []
    ticks = [c / FPS for c in cuts]
    expr = "+".join(f"(gte(t,{t:.3f})*exp(-90*(t-{t:.3f})))" for t in ticks[:40])
    ins += ["-f", "lavfi", "-i", f"anoisesrc=color=white:amplitude=0.5:d={dur:.2f}:r=48000"]
    flt.append(f"[1]highpass=f=2500,volume='0.9*({expr})':eval=frame[tk]")
    ins += ["-i", os.path.join(SFX, "riser.wav"), "-i", os.path.join(SFX, "whoosh.wav"), "-i", os.path.join(SFX, "impact.wav"),
            "-i", os.path.join(SFX, "impact.wav")]
    flt.append(f"[2]atempo=1.0,adelay={max(0, int(t_title / FPS * 1000 - 2500))}|{max(0, int(t_title / FPS * 1000 - 2500))},volume=0.7[r]")
    flt.append(f"[3]adelay={int(t_title / FPS * 1000 - 300)}|{int(t_title / FPS * 1000 - 300)},volume=0.8[w]")
    flt.append(f"[4]adelay={int(t_title / FPS * 1000)}|{int(t_title / FPS * 1000)},volume=0.55[i1]")
    flt.append(f"[5]adelay={int(t_logo / FPS * 1000)}|{int(t_logo / FPS * 1000)},volume=1.0,aecho=0.8:0.6:180|360:0.3|0.2[i2]")
    flt.append(f"[tk][r][w][i1][i2]amix=inputs=5:normalize=0,atrim=0:{dur:.3f},afade=t=out:st={dur - 0.6:.3f}:d=0.6,loudnorm=I=-16:TP=-1.5[a]")
    tmp = video[:-4] + ".noaudio.mp4"; os.replace(video, tmp)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", tmp, *ins, "-filter_complex", ";".join(flt), "-map", "0:v", "-map", "[a]",
                    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", video], check=True)
    os.remove(tmp)
    print(f"wrote {os.path.relpath(video, ROOT)} ({dur:.1f}s)")

# ---- outro / end screen ------------------------------------------------------------------------------
def outro(out, dur=20.0):
    """YouTube end screen (5-20 s): leaves a 16:9 slot (left) for a video element and a circle (right) for the
    subscribe element. Elements are placed in YouTube Studio > End screen over these guides."""
    bgsrc = stock_frame("city_night_timelapse_1") or Image.new("RGB", (W, H), DARK)
    bg = Image.blend(bgsrc.filter(ImageFilter.GaussianBlur(14)), Image.new("RGB", (W, H), (8, 8, 10)), 0.72)
    logo = logo_rgba(150)
    # YouTube end-screen video element ~ 37% of width; place guides where elements usually snap
    VX0, VY0, VW, VH = 150, 330, 820, 461
    CX, CY, CR = 1420, 560, 170
    lab = lambda s, sz=34, col=RED: text_img(s, font(mt.F_MONO_B, sz), col, tracking=8, shadow=6)
    l1, l2 = lab("NEXT CASE"), lab("SUBSCRIBE")
    thx = text_img("Thanks for watching.", font(mt.F_SERIF_I, 56), PAPER, shadow=10)
    tagl = text_img("ASIA'S BIGGEST FRAUDS. THE UNTOLD FILES.", font(mt.F_MONO_B, 26), GREY, tracking=6, shadow=0)
    name = text_img("PAPER TIGER FILES", font(mt.F_SANS_B, 40), PAPER, tracking=10, shadow=8)
    wr = mt.Writer(out)
    n = int(dur * FPS)
    for fi in range(n):
        t = fi / FPS
        z = 1.0 + 0.04 * t / dur
        c = bg.transform((W, H), Image.AFFINE, (1 / z, 0, W / 2 - W / 2 / z, 0, 1 / z, H / 2 - H / 2 / z), Image.BILINEAR).convert("RGBA")
        env = clamp(min(t / 0.6, (dur - t) / 0.8))
        p = ease_out_cubic(prog(t, 0.2, 0.9))
        g = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(g)
        a = int(255 * p * env)
        d.rectangle((VX0, VY0, VX0 + VW, VY0 + VH), fill=(0, 0, 0, int(150 * p * env)), outline=PAPER + (int(a * 0.5),), width=3)
        d.ellipse((CX - CR, CY - CR, CX + CR, CY + CR), fill=(0, 0, 0, int(150 * p * env)), outline=RED + (a,), width=6)
        c.alpha_composite(g)
        paste(c, l1, VX0 + 10, VY0 - 40, alpha=p * env, anchor="l")
        paste(c, l2, CX, CY + CR + 50, alpha=p * env)
        paste(c, logo, CX, CY, scale=0.92 + 0.08 * p, alpha=p * env * 0.35)
        pt = ease_out_cubic(prog(t, 0.0, 0.8))
        paste(c, thx, W / 2, 170 + 14 * (1 - pt), alpha=pt * env)
        paste(c, name, W / 2, 930, alpha=env)
        paste(c, tagl, W / 2, 985, alpha=env * 0.9)
        wr.write(mt.post(c, fi))
    wr.close()
    tmp = out[:-4] + ".noaudio.mp4"; os.replace(out, tmp)
    bed = tmp[:-4] + ".bed.wav"
    sys.path.insert(0, os.path.join(ROOT, "tools")); import sfx; sfx.make_bed(dur + 5, bed)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", tmp, "-i", bed, "-filter_complex",
                    f"[1]atrim=4:{dur + 4},asetpts=PTS-STARTPTS,afade=t=in:d=1,afade=t=out:st={dur - 2.5}:d=2.5,loudnorm=I=-20:TP=-2[a]",
                    "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest", out], check=True)
    os.remove(tmp); os.remove(bed)
    print(f"wrote {os.path.relpath(out, ROOT)} ({dur:.1f}s)")


# ---- shared helpers for the extra options -------------------------------------------------------------
def mix_audio(video, events, dur, extra_inputs=(), extra_filters=(), extra_labels=(), lufs=-16):
    """events = [(wav, start_s, gain)] laid over the silent video."""
    ins, flt, labs = [], [], []
    for i, (wav, st, g) in enumerate(events):
        ins += ["-i", os.path.join(SFX, wav + ".wav") if not os.path.isabs(wav) else wav]
        ms = max(0, int(st * 1000))
        flt.append(f"[{i + 1}]adelay={ms}|{ms},volume={g}[e{i}]"); labs.append(f"[e{i}]")
    n = len(events)
    for j, x in enumerate(extra_inputs):
        ins += x
    flt += list(extra_filters); labs += list(extra_labels)
    flt.append("".join(labs) + f"amix=inputs={len(labs)}:normalize=0,apad,atrim=0:{dur:.3f},"
               f"afade=t=out:st={max(0, dur - 0.6):.3f}:d=0.6,loudnorm=I={lufs}:TP=-1.5[a]")
    tmp = video[:-4] + ".noaudio.mp4"; os.replace(video, tmp)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", tmp, *ins, "-filter_complex", ";".join(flt), "-map", "0:v", "-map", "[a]",
                    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-t", f"{dur:.3f}", video], check=True)
    os.remove(tmp)
    print(f"wrote {os.path.relpath(video, ROOT)} ({dur:.1f}s)")

def logo_phase(c, t, dur, logo, name, tag, flash=True):
    fl = 1 - prog(t, 0, 0.25)
    p = ease_out_cubic(prog(t, 0, 0.55))
    paste(c, logo, W / 2, H / 2 - 110, scale=1.25 - 0.25 * p + 0.03 * prog(t, 0.55, dur), alpha=p)
    pl = ease_out_cubic(prog(t, 0.35, 0.8))
    mt.fill_rect(c, W / 2 - 300 * pl, H / 2 + 150, W / 2 + 300 * pl, H / 2 + 157, RED, 1)
    pn = ease_out_cubic(prog(t, 0.45, 0.95))
    paste(c, name, W / 2, H / 2 + 215, scale=1.1 - 0.1 * pn, alpha=pn)
    pt = ease_out_cubic(prog(t, 0.9, 1.4))
    paste(c, tag, W / 2, H / 2 + 300, alpha=pt * clamp((dur - t) / 0.3))
    env = clamp((dur - t) / 0.35)
    if env < 1: c.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - env)))))
    if flash and fl > 0: c.alpha_composite(Image.new("RGBA", (W, H), (255, 245, 240, int(255 * fl))))

def brand_bits():
    return (logo_rgba(420), text_img("PAPER TIGER FILES", font(mt.F_SANS_B, 64), PAPER, tracking=14, shadow=10),
            text_img("ASIA'S BIGGEST FRAUDS. THE UNTOLD FILES.", font(mt.F_MONO_B, 30), RED, tracking=8, shadow=6))

# ---- intro B: typewriter on a case file, stamp slam, logo ----------------------------------------------
def intro_b(out):
    logo, name, tag = brand_bits()
    sheet = mt._paper_sheet()
    st = mt._stamp_img("PAPER TIGER FILES", 150)
    l1, l2 = "ASIA'S BIGGEST FRAUDS.", "THE UNTOLD FILES."
    fty = font(mt.F_MONO_B, 64)
    T_TYPE0, CPS = 0.35, 22
    T_TYPE1 = T_TYPE0 + (len(l1) + len(l2)) / CPS          # ~2.0 s
    T_SLAM = T_TYPE1 + 0.35
    T_LOGO = T_SLAM + 1.5
    dur = T_LOGO + 2.3
    wr = mt.Writer(out)
    for fi in range(int(dur * FPS)):
        t = fi / FPS
        if t < T_LOGO:
            c = sheet.copy()
            k = int(clamp((t - T_TYPE0) * CPS, 0, len(l1) + len(l2)))
            s1, s2 = l1[:min(k, len(l1))], l2[:max(0, k - len(l1))]
            x0 = W / 2 - mt.text_w(l1, fty) / 2
            if s1: im = text_img(s1, fty, INK, shadow=0); paste(c, im, x0 - im.info["pad"], H / 2 - 230, anchor="l")
            if s2: im = text_img(s2, fty, INK, shadow=0); paste(c, im, x0 - im.info["pad"], H / 2 - 140, anchor="l")
            if t < T_TYPE1 + 0.2 and int(t * 3) % 2 == 0:
                cx = x0 + mt.text_w(s2 if s2 else s1, fty) + 6; cy = H / 2 - (140 if s2 else 230)
                mt.fill_rect(c, cx, cy - 26, cx + 34, cy + 30, RED)
            p = prog(t, T_SLAM - 0.2, T_SLAM)
            if p > 0: paste(c, st, W / 2, H / 2 + 120, scale=2.4 - 1.4 * mt.ease_in_cubic(p), alpha=0.35 + 0.65 * p)
            if t >= T_SLAM:
                fl = 1 - prog(t, T_SLAM, T_SLAM + 0.12)
                if fl > 0: c.alpha_composite(Image.new("RGBA", (W, H), (255, 255, 255, int(80 * fl))))
            # camera: slow push, slam shake, then fast push into the stamp before the logo
            u = prog(t, T_SLAM, T_SLAM + 0.45); a = 24 * (1 - u) ** 2 if t >= T_SLAM else 0
            z = 1.0 + 0.03 * t / T_LOGO + 0.9 * mt.ease_in_cubic(prog(t, T_LOGO - 0.45, T_LOGO))
            dx, dy = a * math.sin(t * 95), a * 0.7 * math.cos(t * 120)
            cy0 = H / 2 + 120 * prog(t, T_LOGO - 0.45, T_LOGO)
            c = c.transform((W, H), Image.AFFINE, (1 / z, 0, W / 2 - W / 2 / z - dx, 0, 1 / z, cy0 - H / 2 / z - dy), Image.BILINEAR)
            if t < 0.3: c.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - t / 0.3)))))
        else:
            c = mt.bg_dark().copy(); logo_phase(c, t - T_LOGO, dur - T_LOGO, logo, name, tag)
        wr.write(mt.post(c, fi))
    wr.close()
    mix_audio(out, [("typewriter", T_TYPE0, 0.8), ("typewriter", T_TYPE0 + 1.0, 0.8), ("stamp", T_SLAM, 1.2),
                    ("impact", T_SLAM, 0.6), ("whoosh", T_LOGO - 0.5, 0.7), ("impact", T_LOGO, 1.0)], dur)

# ---- intro C: short glitch sting ---------------------------------------------------------------------
def intro_c(out):
    logo, name, tag = brand_bits()
    dur = 3.4
    wr = mt.Writer(out)
    r = np.random.default_rng(5)
    for fi in range(int(dur * FPS)):
        t = fi / FPS
        c = mt.bg_dark().copy()
        g = 1 - prog(t, 0.25, 1.0)                              # glitch amount, settles after ~1 s
        # red scan line sweeping down
        ys = H * prog(t, 0, 0.45)
        if t < 0.5: mt.fill_rect(c, 0, ys - 3, W, ys + 3, RED, 0.9)
        p = ease_out_cubic(prog(t, 0.15, 0.6))
        if p > 0:
            lay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            paste(lay, logo, W / 2, H / 2 - 110, scale=0.95 + 0.05 * p, alpha=p)
            paste(lay, name, W / 2, H / 2 + 215, alpha=p)
            if g > 0 and r.random() < 0.8:
                o = int(26 * g * (1 if fi % 2 else -1))
                arr = np.asarray(lay).copy()
                cyan = np.roll(arr, o, axis=1); redl = np.roll(arr, -o, axis=1)
                arr[..., 0] = np.maximum(arr[..., 0], redl[..., 0])
                arr[..., 1] = np.maximum(arr[..., 1], cyan[..., 1]); arr[..., 2] = np.maximum(arr[..., 2], cyan[..., 2])
                arr[..., 3] = np.maximum(arr[..., 3], np.maximum(cyan[..., 3], redl[..., 3]))
                for _ in range(int(6 * g) + 1):                  # slice jitter
                    y0 = int(r.integers(0, H - 40)); hgt = int(r.integers(6, 40))
                    arr[y0:y0 + hgt] = np.roll(arr[y0:y0 + hgt], int(r.integers(-80, 80)), axis=1)
                lay = Image.fromarray(arr, "RGBA")
            c.alpha_composite(lay)
            mt.fill_rect(c, W / 2 - 300 * p, H / 2 + 150, W / 2 + 300 * p, H / 2 + 157, RED, 1)
        pt = ease_out_cubic(prog(t, 1.1, 1.6))
        paste(c, tag, W / 2, H / 2 + 300, alpha=pt * clamp((dur - t) / 0.3))
        env = clamp((dur - t) / 0.35)
        if env < 1: c.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - env)))))
        wr.write(mt.post(c, fi))
    wr.close()
    mix_audio(out, [("glitch", 0.15, 1.0), ("glitch", 0.55, 0.7), ("impact", 0.6, 1.0), ("whoosh", 0.0, 0.5)], dur)

# ---- outro B: "CASE CLOSED" stamp, then end-screen guides on the file ------------------------------------
def endscreen_guides(c, p, env, slots, circle):
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(g)
    a = int(255 * p * env)
    for (x0, y0, w, h, label) in slots:
        d.rectangle((x0, y0, x0 + w, y0 + h), fill=(0, 0, 0, int(160 * p * env)), outline=PAPER + (int(a * 0.55),), width=3)
    cx, cy, cr = circle
    d.ellipse((cx - cr, cy - cr, cx + cr, cy + cr), fill=(0, 0, 0, int(160 * p * env)), outline=RED + (a,), width=6)
    c.alpha_composite(g)
    for (x0, y0, w, h, label) in slots:
        paste(c, text_img(label, font(mt.F_MONO_B, 32), RED, tracking=8, shadow=6), x0 + 8, y0 - 38, alpha=p * env, anchor="l")
    paste(c, text_img("SUBSCRIBE", font(mt.F_MONO_B, 32), RED, tracking=8, shadow=6), cx, cy + cr + 48, alpha=p * env)

def outro_b(out, dur=20.0):
    sheet = mt._paper_sheet()
    st = mt._stamp_img("CASE CLOSED", 190)
    logo = logo_rgba(150)
    name = text_img("PAPER TIGER FILES", font(mt.F_SANS_B, 40), PAPER, tracking=10, shadow=8)
    T = 0.6
    wr = mt.Writer(out)
    for fi in range(int(dur * FPS)):
        t = fi / FPS
        c = sheet.copy()
        p = prog(t, T - 0.2, T)
        dim = ease_out_cubic(prog(t, 1.8, 2.6))                  # the file dims, the end screen comes up
        if p > 0 and dim <= 0: paste(c, st, W / 2, H / 2 - 20, scale=2.4 - 1.4 * mt.ease_in_cubic(p), alpha=0.35 + 0.65 * p)
        if t >= T:
            fl = 1 - prog(t, T, T + 0.12)
            if fl > 0: c.alpha_composite(Image.new("RGBA", (W, H), (255, 255, 255, int(80 * fl))))
        u = prog(t, T, T + 0.45); a = 22 * (1 - u) ** 2 if t >= T else 0
        z = 1.02 + 0.03 * t / dur
        c = c.transform((W, H), Image.AFFINE, (1 / z, 0, W / 2 - W / 2 / z - a * math.sin(t * 95), 0, 1 / z, H / 2 - H / 2 / z - a * 0.7 * math.cos(t * 120)), Image.BILINEAR)
        if dim > 0:
            c.alpha_composite(Image.new("RGBA", (W, H), (8, 8, 10, int(215 * dim))))
            paste(c, st, W / 2, (H / 2 - 20) * (1 - dim) + 150 * dim, scale=1 - 0.45 * dim)
        env = clamp((dur - t) / 0.8)
        endscreen_guides(c, dim, env, [(150, 330, 820, 461, "NEXT CASE")], (1420, 560, 170))
        paste(c, logo, 1420, 560, alpha=dim * env * 0.35)
        paste(c, name, W / 2, 940, alpha=dim * env)
        if env < 1: c.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - env)))))
        wr.write(mt.post(c, fi))
    wr.close()
    bed = out[:-4] + ".bed.wav"
    sys.path.insert(0, os.path.join(ROOT, "tools")); import sfx; sfx.make_bed(dur + 5, bed)
    mix_audio(out, [("stamp", T, 1.2), ("impact", T, 0.5)], dur,
              extra_inputs=[["-i", bed]], extra_filters=[f"[3]atrim=4:{dur + 4},asetpts=PTS-STARTPTS,afade=t=in:d=1.5,volume=0.5[bed]"],
              extra_labels=["[bed]"], lufs=-20)
    os.remove(bed)

# ---- outro C: two video slots + subscribe, minimal dark grid --------------------------------------------
def outro_c(out, dur=20.0):
    base = mt.bg_dark().copy()
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(g)
    for x in range(0, W, 80): gd.line((x, 0, x, H), fill=PAPER + (10,))
    for y in range(0, H, 80): gd.line((0, y, W, y), fill=PAPER + (10,))
    base.alpha_composite(g)
    logo = logo_rgba(150)
    thx = text_img("Thanks for watching.", font(mt.F_SERIF_I, 56), PAPER, shadow=10)
    name = text_img("PAPER TIGER FILES", font(mt.F_SANS_B, 40), PAPER, tracking=10, shadow=8)
    tagl = text_img("ASIA'S BIGGEST FRAUDS. THE UNTOLD FILES.", font(mt.F_MONO_B, 26), GREY, tracking=6, shadow=0)
    slots = [(130, 270, 760, 428, "NEXT CASE"), (1030, 270, 760, 428, "MORE FILES")]
    circle = (W / 2, 860, 100)
    wr = mt.Writer(out)
    for fi in range(int(dur * FPS)):
        t = fi / FPS
        c = base.copy()
        env = clamp(min(t / 0.6, (dur - t) / 0.8))
        p = ease_out_cubic(prog(t, 0.2, 0.9))
        endscreen_guides(c, p, env, slots, circle)
        paste(c, logo, circle[0], circle[1], scale=0.8, alpha=p * env * 0.35)
        paste(c, thx, W / 2, 130, alpha=ease_out_cubic(prog(t, 0, 0.8)) * env)
        # a red line slowly travelling under the slots
        x = (t / dur) * W
        mt.fill_rect(c, 0, 735, x, 738, RED, 0.7 * env)
        wr.write(mt.post(c, fi))
    wr.close()
    bed = out[:-4] + ".bed.wav"
    sys.path.insert(0, os.path.join(ROOT, "tools")); import sfx; sfx.make_bed(dur + 5, bed)
    mix_audio(out, [("whoosh", 0.1, 0.5)], dur, extra_inputs=[["-i", bed]],
              extra_filters=[f"[2]atrim=4:{dur + 4},asetpts=PTS-STARTPTS,afade=t=in:d=1.5,volume=0.5[bed]"],
              extra_labels=["[bed]"], lufs=-20)
    os.remove(bed)

if __name__ == "__main__":
    what = sys.argv[1]
    OPT = os.path.join(BR, "options")
    os.makedirs(OPT, exist_ok=True)
    jobs = {"intro_a": lambda: intro(os.path.join(OPT, "intro_A_case_file_riffle.mp4")),
            "intro_b": lambda: intro_b(os.path.join(OPT, "intro_B_typewriter_stamp.mp4")),
            "intro_c": lambda: intro_c(os.path.join(OPT, "intro_C_glitch_sting.mp4")),
            "outro_a": lambda: outro(os.path.join(OPT, "outro_A_city_night.mp4")),
            "outro_b": lambda: outro_b(os.path.join(OPT, "outro_B_case_closed.mp4")),
            "outro_c": lambda: outro_c(os.path.join(OPT, "outro_C_two_files.mp4"))}
    for k, fn in jobs.items():
        if what == "all" or what == k or (what in ("intro", "outro") and k.startswith(what)):
            fn()
