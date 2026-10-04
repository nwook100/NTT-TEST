# Where are the burned-in captions actually visible? Diff the bottom band of the captioned vs clean render.
# Usage: python3 tools/caption_map.py ep03   -> output/<ep>/caption_visible.json  (used by make_shorts.py)
import json, subprocess, sys, numpy as np, os
ep = sys.argv[1]; ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); od = os.path.join(ROOT, "output", ep)
FPS, w, h = 4, 480, 40
def frames(p):
    cmd = ["ffmpeg", "-v", "error", "-i", p, "-vf", f"fps={FPS},crop=iw:ih*0.14:0:ih*0.84,scale={w}:{h},format=gray", "-f", "rawvideo", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.uint8).reshape(-1, h, w)
a, b = frames(os.path.join(od, f"{ep}_base_captioned.mp4")), frames(os.path.join(od, f"{ep}_base_clean.mp4"))
n = min(len(a), len(b)); vis = np.abs(a[:n].astype(int) - b[:n].astype(int)).max(axis=(1, 2)) > 60
spans, s = [], None
for i, v in enumerate(vis):
    if v and s is None: s = i
    if not v and s is not None: spans.append([s / FPS, i / FPS]); s = None
if s is not None: spans.append([s / FPS, n / FPS])
json.dump({"caption_visible": spans}, open(os.path.join(od, "caption_visible.json"), "w"))
print(len(spans), "spans,", round(sum(b - a for a, b in spans) / 60, 1), "min visible")
