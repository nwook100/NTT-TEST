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
    a = ap.parse_args()
    od = os.path.join(ROOT, "output", a.ep)
    base = a.base or os.path.join(od, f"{a.ep}_base_clean.mp4")
    intro, outro = os.path.join(ROOT, a.intro), os.path.join(ROOT, a.outro)
    man = json.load(open(os.path.join(od, "narration", "manifest.json")))
    ch = {c["id"]: c for c in man["chunks"]}
    T = ch[a.after_chunk]["end"] + 0.3                      # just after the cold open's last line
    D = probe(intro); B = probe(base); O = probe(outro)
    out = os.path.join(od, f"{a.ep}_final_upload.mp4")
    norm = "scale=1920:1080,setsar=1,fps=30,format=yuv420p"
    fc = (f"[0:v]trim=0:{T:.3f},setpts=PTS-STARTPTS,{norm}[v0];[0:a]atrim=0:{T:.3f},asetpts=PTS-STARTPTS,afade=t=out:st={T - 0.25:.3f}:d=0.25,aresample=48000[a0];"
          f"[1:v]{norm}[v1];[1:a]aresample=48000[a1];"
          f"[0:v]trim={T:.3f},setpts=PTS-STARTPTS,{norm}[v2];[0:a]atrim={T:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.4,aresample=48000[a2];"
          f"[2:v]{norm},fade=t=in:d=0.4[v3];[2:a]aresample=48000[a3];"
          f"[v0][a0][v1][a1][v2][a2][v3][a3]concat=n=4:v=1:a=1[v][a]")
    subprocess.run(["nice", "-n", "5", "ffmpeg", "-y", "-v", "error", "-i", base, "-i", intro, "-i", outro, "-filter_complex", fc,
                    "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "faster", "-crf", "19", "-pix_fmt", "yuv420p",
                    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", out], check=True)
    total = probe(out)
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
    print(f"intro at {T:.2f}s (+{D:.2f}s), outro {O:.1f}s, total {total / 60:.2f} min -> {os.path.relpath(out, ROOT)}")
    print(f"subtitles shifted -> {os.path.relpath(fd, ROOT)}; chapters -> output/{a.ep}/chapters.txt")
    print("\n".join(lines))

if __name__ == "__main__":
    main()
