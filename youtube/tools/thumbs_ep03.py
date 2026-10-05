# EP03 thumbnails (no photo of Truong My Lan exists under a free licence -> city at night + type).
import sys, os; sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'assets'))
import motion_tool as mt, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
os.chdir(os.path.join(os.path.dirname(__file__), '..'))
W, H = 1280, 720; RED = (215, 38, 61); PAPER = (243, 237, 226)

def base(photo):
    src = Image.open(photo).convert('RGB')
    s = max(W / src.width, H / src.height); src = src.resize((int(src.width * s) + 1, int(src.height * s) + 1), Image.LANCZOS)
    src = src.crop(((src.width - W) // 2, (src.height - H) // 2, (src.width - W) // 2 + W, (src.height - H) // 2 + H))
    src = ImageEnhance.Color(src).enhance(0.75); src = ImageEnhance.Brightness(src).enhance(0.55)
    a = np.asarray(src).astype(np.float32); xx = np.mgrid[0:H, 0:W][1]
    a *= np.clip(0.35 + xx / W * 0.9, 0, 1)[..., None]          # dark left side for the text
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).convert('RGBA')

def text(im, txt, size, col, xy, fnt=None):
    fo = mt.font(fnt or mt.F_SANS_B, size); sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).text((xy[0] + 6, xy[1] + 10), txt, font=fo, fill=(0, 0, 0, 235))
    im.alpha_composite(sh.filter(ImageFilter.GaussianBlur(9))); ImageDraw.Draw(im).text(xy, txt, font=fo, fill=col)
    return ImageDraw.Draw(im).textbbox(xy, txt, font=fo)

def brand(im):
    im.alpha_composite(Image.open('branding/profile.png').convert('RGBA').resize((70, 70)), (24, 20))
    ImageDraw.Draw(im).text((104, 40), 'PAPER TIGER FILES', font=mt.font(mt.F_MONO_B, 24), fill=PAPER)

def stamp(im, word, scale):
    s = mt._stamp_img(word, 150); s = s.resize((int(s.width * scale), int(s.height * scale)))
    im.alpha_composite(s, (W - s.width - 50, H - s.height - 40))

P = 'assets/ep03_truong_my_lan/s01_hcmc_skyline_ov_4.jpg'
os.makedirs('thumbnails', exist_ok=True)
# A: HER OWN BANK
im = base(P); brand(im)
text(im, 'HER', 210, RED, (44, 120)); text(im, 'OWN BANK', 150, PAPER, (48, 330))
text(im, '$12.5 BILLION EMBEZZLED', 46, PAPER, (54, 520))
stamp(im, 'DEATH', 0.6)
im.convert('RGB').save('thumbnails/ep03_thumb_A_her_own_bank.jpg', quality=92)
# B: 91.5%
im = base(P); brand(im)
text(im, '91.5%', 240, RED, (40, 120))
b = text(im, 'ON PAPER: 5%', 64, PAPER, (54, 410))
ImageDraw.Draw(im).line((b[0] - 6, (b[1] + b[3]) // 2, b[2] + 6, (b[1] + b[3]) // 2), fill=RED, width=9)
text(im, 'COURT: SHE SECRETLY OWNED IT', 44, PAPER, (54, 520))
stamp(im, 'DEATH', 0.6)
im.convert('RGB').save('thumbnails/ep03_thumb_B_91_percent.jpg', quality=92)
print('ok')
