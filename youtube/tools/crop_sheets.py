# For every vetted photo, renders one contact sheet showing how each reframing option looks in a 16:9 frame
# (full, left, right, top, bottom, detail) so editors can pick crops that actually show something.
# Usage: python3 tools/crop_sheets.py ep01_terra_luna   -> assets/<ep>/crop_sheets/<photo>.jpg
import json, os, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ep = sys.argv[1]
A = os.path.join(ROOT, "assets", ep)
out = os.path.join(A, "crop_sheets"); os.makedirs(out, exist_ok=True)
PRE = {"full": "", "left": "crop=iw*0.62:ih:0:0,", "right": "crop=iw*0.62:ih:iw*0.38:0,", "top": "crop=iw:ih*0.62:0:0,",
       "bottom": "crop=iw:ih*0.62:0:ih*0.38,", "detail": "crop=iw*0.5:ih*0.5:iw*0.25:ih*0.25,"}
FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
for v in json.load(open(os.path.join(A, "PHOTO_VETTING.json"))):
    if v["verdict"] != "keep":
        continue
    src = os.path.join(ROOT, v["path"].replace("youtube/", "", 1))
    if not os.path.exists(src):
        continue
    name = os.path.splitext(os.path.basename(src))[0]
    parts, labels = [], []
    for i, (k, pre) in enumerate(PRE.items()):
        parts.append(f"[0]{pre}scale=480:270:force_original_aspect_ratio=increase,crop=480:270,setsar=1,"
                     f"drawtext=fontfile={FONT}:text='{k}':x=10:y=10:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.6[v{i}]")
        labels.append(f"[v{i}]")
    fc = ";".join(parts) + ";" + "".join(labels) + "xstack=inputs=6:layout=0_0|w0_0|w0+w1_0|0_h0|w0_h0|w0+w1_h0[o]"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-filter_complex", fc, "-map", "[o]", "-frames:v", "1",
                    "-q:v", "4", os.path.join(out, name + ".jpg")], check=True)
print(ep, len(os.listdir(out)), "sheets")
