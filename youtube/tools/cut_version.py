# Build a shorter cut of a finished episode by dropping whole narration chunks, then splice intro/outro and
# remap every subtitle track and the chapter list onto the new timeline.
# Usage: python3 tools/cut_version.py ep01 --drop 22,28,31-32,42-43,45,47,62-78,80,92-94,97-104 --tag 15min
#            --intro branding/options/intro_A_case_file_riffle.mp4 --outro branding/options/outro_B_case_closed.mp4 --outro-len 12
import argparse, glob, json, os, re, subprocess, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def probe(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p],
                                capture_output=True, text=True).stdout)

def ts(s):
    h, m, r = s.split(":"); sec, ms = r.split(","); return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

def fmt(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

def ids(spec):
    out = set()
    for part in spec.split(","):
        a, _, b = part.partition("-"); out |= set(range(int(a), int(b or a) + 1))
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ep"); ap.add_argument("--drop", required=True); ap.add_argument("--tag", required=True)
    ap.add_argument("--intro", required=True); ap.add_argument("--outro", required=True)
    ap.add_argument("--outro-len", type=float, default=20.0); ap.add_argument("--base"); ap.add_argument("--intro-after", type=int, default=3)
    a = ap.parse_args()
    od = os.path.join(ROOT, "output", a.ep)
    base = os.path.join(ROOT, a.base) if a.base else os.path.join(od, f"{a.ep}_base_clean.mp4"); B = probe(base)
    man = json.load(open(os.path.join(od, "narration", "manifest.json")))["chunks"]
    drop = ids(a.drop)
    # cut points: middle of the pause before each chunk
    cuts = [0.0] + [(man[i - 1]["end"] + man[i]["start"]) / 2 for i in range(1, len(man))] + [B]
    keep = []                                            # merged [t0, t1) ranges of kept chunks
    for i, c in enumerate(man):
        if c["id"] in drop: continue
        t0, t1 = cuts[i], cuts[i + 1]
        if keep and abs(keep[-1][1] - t0) < 1e-6: keep[-1][1] = t1
        else: keep.append([t0, t1])
    def remap(t):                                        # original time -> new body time (None if dropped)
        acc = 0.0
        for k0, k1 in keep:
            if k0 <= t < k1: return acc + t - k0
            acc += k1 - k0
        return None
    body_len = sum(k1 - k0 for k0, k1 in keep)
    intro, outro = os.path.join(ROOT, a.intro), os.path.join(ROOT, a.outro)
    D = probe(intro)
    T = remap(man[[c["id"] for c in man].index(a.intro_after + 1)]["start"] - 0.08)
    out = os.path.join(od, f"{a.ep}_{a.tag}_upload.mp4")
    enc = ["-c:v", "libx264", "-preset", "faster", "-crf", "19", "-pix_fmt", "yuv420p", "-r", "30",
           "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2"]
    vf = "scale=1920:1080,setsar=1,fps=30,format=yuv420p"
    with tempfile.TemporaryDirectory(dir=od) as tmp:
        pieces, acc = [], 0.0
        for k0, k1 in keep:                              # split the kept ranges at the intro point
            if acc <= T < acc + (k1 - k0):
                m = k0 + (T - acc); pieces += [(k0, m), "INTRO", (m, k1)]
            else:
                pieces.append((k0, k1))
            acc += k1 - k0
        pieces.append("OUTRO")
        files = []
        for i, pc in enumerate(pieces):
            f = os.path.join(tmp, f"p{i:03d}.mp4")
            if pc == "INTRO":
                cmd = ["-i", intro, "-vf", vf]
            elif pc == "OUTRO":
                L = a.outro_len
                cmd = ["-i", outro, "-t", f"{L}", "-vf", vf + f",fade=t=in:d=0.4,fade=t=out:st={L - 0.6}:d=0.6",
                       "-af", f"afade=t=out:st={L - 1.5}:d=1.5"]
            else:
                s0, s1 = pc; d = s1 - s0
                cmd = ["-ss", f"{s0:.3f}", "-i", base, "-t", f"{d:.3f}", "-vf", vf,
                       "-af", f"afade=t=in:d=0.12,afade=t=out:st={max(0, d - 0.15):.3f}:d=0.15"]
            subprocess.run(["nice", "-n", "5", "ffmpeg", "-y", "-v", "error", *cmd, *enc, f], check=True)
            files.append(f)
        lst = os.path.join(tmp, "list.txt"); open(lst, "w").write("".join(f"file '{f}'\n" for f in files))
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy",
                        "-movflags", "+faststart", out], check=True)
    total = probe(out)
    # subtitles: keep cues whose midpoint survives, remap, then shift by the intro after T
    sd = os.path.join(ROOT, "subtitles", a.ep); fd = os.path.join(sd, a.tag); os.makedirs(fd, exist_ok=True)
    for p in sorted(glob.glob(os.path.join(sd, f"{a.ep}_*.srt"))):
        res, n = [], 0
        for b in open(p, encoding="utf-8").read().replace("﻿", "").strip().split("\n\n"):
            L = b.strip().split("\n"); x, y = L[1].split(" --> "); x, y = ts(x), ts(y)
            nx = remap((x + y) / 2)
            if nx is None: continue
            nx0 = remap(x); nx1 = remap(max(x, y - 0.001))
            nx0 = nx0 if nx0 is not None else nx - (y - x) / 2
            nx1 = nx1 if nx1 is not None else nx + (y - x) / 2
            if nx0 >= T: nx0, nx1 = nx0 + D, nx1 + D
            n += 1; res.append("\n".join([str(n), f"{fmt(nx0)} --> {fmt(nx1)}", *L[2:]]))
        open(os.path.join(fd, os.path.basename(p)), "w", encoding="utf-8").write("\n\n".join(res) + "\n")
    # chapters
    titles = {}
    mt = open(os.path.join(ROOT, "assets", "motion_tool.py")).read()
    m = re.search(rf"{a.ep.upper()}_CHAPTERS = \[(.*?)\n\]", mt, re.S)
    for num, title in re.findall(r'\((\d+), "([^"]+)"', m.group(1)): titles[int(num)] = title
    first = {}
    for i, c in enumerate(man):
        if c["id"] in drop: continue
        first.setdefault(int(c["section"]), c["start"])
    lines = []
    for sec in sorted(first):
        t = 0.0 if sec == 0 else remap(first[sec] + 1e-3) + (D if remap(first[sec] + 1e-3) >= T else 0)
        name = titles.get(sec, f"Section {sec}")
        if name == "Outro": name = "One question to ask"
        lines.append(f"{int(t // 60):02d}:{int(t % 60):02d} {name}")
    open(os.path.join(od, f"chapters_{a.tag}.txt"), "w").write("\n".join(lines) + "\n")
    print(f"body {body_len:.1f}s, total {total:.1f}s ({int(total // 60)}:{int(total % 60):02d}) -> {os.path.relpath(out, ROOT)}")
    print("\n".join(lines))

if __name__ == "__main__":
    main()
