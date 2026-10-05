# Contact sheets for review: one JPG per script section, a frame every STEP seconds with its timestamp burned in.
# Usage: python3 tools/section_sheets.py <video.mp4> <manifest.json> <out_dir> [--step 2.5] [--t0 0]
import json, os, subprocess, sys, math
video, manifest, out = sys.argv[1], sys.argv[2], sys.argv[3]
step = float(sys.argv[sys.argv.index("--step") + 1]) if "--step" in sys.argv else 2.5
t0 = float(sys.argv[sys.argv.index("--t0") + 1]) if "--t0" in sys.argv else 0.0
os.makedirs(out, exist_ok=True)
chunks = json.load(open(manifest))["chunks"]
secs = {}
for c in chunks:
    s = secs.setdefault(c["section"], [c["start"], c["end"] + c["gap_after"], c["section_title"]])
    s[1] = c["end"] + c["gap_after"]
FONT = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
for sec, (a, b, title) in secs.items():
    a, b = a - t0, b - t0
    if b <= 0: continue
    n = max(1, int(math.ceil((b - a) / step)))
    cols = 6; rows = int(math.ceil(n / cols))
    vf = (f"fps=1/{step},scale=320:180,drawtext=fontfile={FONT}:text='%{{pts\\:hms\\:{a:.2f}}}':x=6:y=6:fontsize=16:"
          f"fontcolor=yellow:box=1:boxcolor=black@0.6,tile={cols}x{rows}:padding=2")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{max(0,a):.2f}", "-t", f"{b - a:.2f}", "-i", video,
                    "-vf", vf, "-frames:v", "1", "-q:v", "4", os.path.join(out, f"s{int(sec):02d}.jpg")], check=True)
    print(f"s{int(sec):02d} {title}: {a:.1f}-{b:.1f}s, {n} frames")
