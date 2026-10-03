# Splice the channel intro into a rendered episode (after a given chunk) and append the end-screen outro;
# shift every subtitle track and rebuild the chapter list to match.
# Usage: python3 tools/finalize_episode.py ep01 --intro branding/options/intro_A_case_file_riffle.mp4
#            --outro branding/options/outro_B_case_closed.mp4 [--after-chunk 3]
import argparse, glob, json, os, re, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def probe(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p],
                                capture_output=True, text=True).stdout)

def ts(s):
    h, m, r = s.split(":"); sec, ms = r.split(","); return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

def fmt(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ep"); ap.add_argument("--intro", required=True); ap.add_argument("--outro", required=True)
    ap.add_argument("--after-chunk", type=int, default=3)
    ap.add_argument("--base", help="default output/<ep>/<ep>_base_clean.mp4")
    ap.add_argument("--subs-only", action="store_true", help="only re-shift subtitles and rebuild chapters")
    a = ap.parse_args()
    od = os.path.join(ROOT, "output", a.ep)
    base = a.base or os.path.join(od, f"{a.ep}_base_clean.mp4")
    intro, outro = os.path.join(ROOT, a.intro), os.path.join(ROOT, a.outro)
    man = json.load(open(os.path.join(od, "narration", "manifest.json")))
    ch = {c["id"]: c for c in man["chunks"]}
    # cut where the cold open's last visual has faded out, just before the next chunk (chapter card + narration)
    T = ch[a.after_chunk + 1]["start"] - 0.08
    D = probe(intro); B = probe(base); O = probe(outro)
    out = os.path.join(od, f"{a.ep}_final_upload.mp4")
    if a.subs_only: return shift_subs_and_chapters(a, od, man, T, D, O, probe(out))
    # encode the four pieces separately (same codec settings) and join them with the concat demuxer;
    # a single filter graph would buffer the whole episode in memory
    import tempfile
    enc = ["-c:v", "libx264", "-preset", "faster", "-crf", "19", "-pix_fmt", "yuv420p", "-r", "30",
           "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2"]
    vf = "scale=1920:1080,setsar=1,fps=30,format=yuv420p"
    with tempfile.TemporaryDirectory(dir=od) as tmp:
        parts = [
            (["-i", base, "-t", f"{T:.3f}"], vf, f"afade=t=out:st={T - 0.25:.3f}:d=0.25"),
            (["-i", intro], vf, "anull"),
            (["-ss", f"{T:.3f}", "-i", base], vf, "afade=t=in:d=0.4"),
            (["-i", outro], vf + ",fade=t=in:d=0.4", "anull"),
        ]
        files = []
        for i, (inp, v, af) in enumerate(parts):
            f = os.path.join(tmp, f"part{i}.mp4")
            subprocess.run(["nice", "-n", "5", "ffmpeg", "-y", "-v", "error", *inp, "-vf", v, "-af", af, *enc, f], check=True)
            files.append(f)
        lst = os.path.join(tmp, "list.txt"); open(lst, "w").write("".join(f"file '{f}'\n" for f in files))
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy",
                        "-movflags", "+faststart", out], check=True)
    shift_subs_and_chapters(a, od, man, T, D, O, probe(out))

def shift_subs_and_chapters(a, od, man, T, D, O, total):
    # subtitles: every cue after the splice point moves by the intro length
    sd = os.path.join(ROOT, "subtitles", a.ep); fd = os.path.join(sd, "final"); os.makedirs(fd, exist_ok=True)
    for p in sorted(glob.glob(os.path.join(sd, f"{a.ep}_*.srt"))):
        blocks = open(p, encoding="utf-8").read().replace("﻿", "").strip().split("\n\n")
        res = []
        for b in blocks:
            L = b.strip().split("\n"); x, y = L[1].split(" --> "); x, y = ts(x), ts(y)
            if x >= T: x, y = x + D, y + D
            res.append("\n".join([L[0], f"{fmt(x)} --> {fmt(y)}", *L[2:]]))
        open(os.path.join(fd, os.path.basename(p)), "w", encoding="utf-8").write("\n\n".join(res) + "\n")
    # chapters from the section starts
    titles = {}
    mt = open(os.path.join(ROOT, "assets", "motion_tool.py")).read()
    m = re.search(rf"{a.ep.upper()}_CHAPTERS = \[(.*?)\n\]", mt, re.S)
    for num, title in re.findall(r'\((\d+), "([^"]+)"', m.group(1)): titles[int(num)] = title
    first = {}
    for c in man["chunks"]: first.setdefault(int(c["section"]), c["start"])
    lines = []
    for sec in sorted(first):
        t = 0.0 if sec == 0 else first[sec] + (D if first[sec] >= T else 0) - 0.3
        name = titles.get(sec, f"Section {sec}") if sec else titles.get(0, "Cold open")
        if sec == max(first): name = "One question to ask" if name == "Outro" else name
        lines.append(f"{int(t // 60):02d}:{int(t % 60):02d} {name}")
    open(os.path.join(od, "chapters.txt"), "w").write("\n".join(lines) + "\n")
    print(f"intro at {T:.2f}s (+{D:.2f}s), outro {O:.1f}s, total {total / 60:.2f} min -> output/{a.ep}/{a.ep}_final_upload.mp4")
    print(f"subtitles shifted -> {os.path.relpath(fd, ROOT)}; chapters -> output/{a.ep}/chapters.txt")
    print("\n".join(lines))

if __name__ == "__main__":
    main()
