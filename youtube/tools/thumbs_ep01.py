# EP01 thumbnails with the licensed Do Kwon photo (CC BY 3.0, credited in the description).
import sys, os; sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'assets'))
import motion_tool as mt, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps, ImageEnhance
os.chdir(os.path.join(os.path.dirname(__file__), '..'))
W, H = 1280, 720; RED = (215, 38, 61); PAPER = (243, 237, 226)
face = Image.open('assets/ep01_terra_luna/people/do_kwon_commons.png').convert('RGB')
def grade(im, tint):
    g = ImageEnhance.Contrast(ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=1)).enhance(1.35)
    return ImageOps.colorize(g, (8, 4, 6), tint)
def bg():
    a = np.full((H, W, 3), (14, 12, 14), np.float32); yy, xx = np.mgrid[0:H, 0:W]
    a += np.clip(1 - ((xx - 930) ** 2 + (yy - 330) ** 2) ** 0.5 / 650, 0, 1)[..., None] * np.array([90, 12, 24])
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert('RGBA')
def text(im, txt, size, col, xy):
    f = mt.font(mt.F_SANS_B, size); sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).text((xy[0] + 6, xy[1] + 10), txt, font=f, fill=(0, 0, 0, 230))
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(9))); ImageDraw.Draw(im).text(xy, txt, font=f, fill=col)
def face_layer(h, tint):
    f = grade(face, tint); w = int(f.width * h / f.height); f = f.resize((w, h), Image.LANCZOS).convert('RGBA')
    m = np.ones((h, w), np.float32); r = int(w * 0.35); m[:, :r] *= np.linspace(0, 1, r)
    k = int(h * 0.12); m[-k:, :] *= np.linspace(1, 0.2, k)[:, None]
    f.putalpha(Image.fromarray((m * 255).astype(np.uint8))); return f
def stamp(word, size, scale):
    s = mt._stamp_img(word, size); return s.resize((int(s.width * scale), int(s.height * scale)))
def logo(im):
    im.alpha_composite(Image.open('branding/profile.png').convert('RGBA').resize((70, 70)), (24, 20))
    ImageDraw.Draw(im).text((104, 40), 'PAPER TIGER FILES', font=mt.font(mt.F_MONO_B, 24), fill=PAPER)
os.makedirs('thumbnails', exist_ok=True)
im = bg(); fl = face_layer(760, (255, 210, 200)); im.alpha_composite(fl, (W - fl.width + 40, -20))
text(im, '$40B', 230, RED, (40, 120)); text(im, 'FRAUD', 150, PAPER, (48, 360))
im.alpha_composite(stamp('15 YEARS', 120, 0.6), (60, 535)); logo(im)
im.convert('RGB').save('thumbnails/ep01_thumb_A_kwon_40B_fraud.jpg', quality=92)
im = bg(); fl = face_layer(720, (255, 120, 120)); im.alpha_composite(fl, (W - fl.width - 20, 0))
text(im, 'HE ADMITTED', 92, PAPER, (40, 150)); text(im, 'IT.', 200, RED, (40, 250))
s2 = stamp('GUILTY', 150, 0.68); im.alpha_composite(s2, (W - s2.width - 40, H - s2.height - 40))
text(im, '$40 BILLION. 15 YEARS.', 54, PAPER, (44, 520)); logo(im)
im.convert('RGB').save('thumbnails/ep01_thumb_B_kwon_guilty.jpg', quality=92)
print('ok')
