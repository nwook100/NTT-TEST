# EP02 thumbnail with the Korean police wanted-notice photo of Cho Hee-pal.
import sys, os; sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'assets'))
import motion_tool as mt, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageEnhance
os.chdir(os.path.join(os.path.dirname(__file__), '..'))
W, H = 1280, 720; RED = (215, 38, 61); PAPER = (243, 237, 226)
src = Image.open('assets/ep02_cho_hee_pal/people/cho_wanted_2.png').convert('RGB')
h = 720; w = int(src.width * h / src.height)
f = src.resize((w, h), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=3, percent=90, threshold=2))
g = ImageEnhance.Contrast(ImageOps.autocontrast(ImageOps.grayscale(f), cutoff=1)).enhance(1.3)
f = ImageOps.colorize(g, (8, 4, 6), (255, 215, 205)).convert('RGBA')
m = np.ones((h, w), np.float32); r = int(w * 0.35); m[:, :r] *= np.linspace(0, 1, r)
f.putalpha(Image.fromarray((m * 255).astype(np.uint8)))
a = np.full((H, W, 3), (14, 12, 14), np.float32); yy, xx = np.mgrid[0:H, 0:W]
a += np.clip(1 - ((xx - 950) ** 2 + (yy - 330) ** 2) ** 0.5 / 650, 0, 1)[..., None] * np.array([90, 12, 24])
im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert('RGBA'); im.alpha_composite(f, (W - w + 10, 0))
def text(txt, size, col, xy):
    fo = mt.font(mt.F_SANS_B, size); sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).text((xy[0] + 6, xy[1] + 10), txt, font=fo, fill=(0, 0, 0, 230))
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(9))); ImageDraw.Draw(im).text(xy, txt, font=fo, fill=col)
text('DEAD?', 230, RED, (40, 150)); text('$4 BILLION. 70,000 VICTIMS.', 50, PAPER, (48, 430))
s = mt._stamp_img('WANTED', 150); s = s.resize((int(s.width * 0.62), int(s.height * 0.62)))
im.alpha_composite(s, (W - s.width - 50, H - s.height - 40))
im.alpha_composite(Image.open('branding/profile.png').convert('RGBA').resize((70, 70)), (24, 20))
ImageDraw.Draw(im).text((104, 40), 'PAPER TIGER FILES', font=mt.font(mt.F_MONO_B, 24), fill=PAPER)
os.makedirs('thumbnails', exist_ok=True); im.convert('RGB').save('thumbnails/ep02_thumb_cho_dead.jpg', quality=92); print('ok')
