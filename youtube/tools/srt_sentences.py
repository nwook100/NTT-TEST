# Re-cut the narration captions into sentence-level cues (better for YouTube CC tracks and for translation).
# Usage: python3 tools/srt_sentences.py in.srt out.srt [--max 7.0]
import re, sys

def ts(s):
    h, m, r = s.split(":"); sec, ms = r.split(",")
    return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

def fmt(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

def wrap2(text, n=42):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if cur and len(cur) + 1 + len(w) > n: lines.append(cur); cur = w
        else: cur = (cur + " " + w).strip()
    lines.append(cur)
    if len(lines) > 2:                       # rebalance into two lines
        half = len(text) // 2; i = text.rfind(" ", 0, half + 10); lines = [text[:i], text[i + 1:]]
    return "\n".join(lines)

def main():
    src, dst = sys.argv[1], sys.argv[2]
    mx = float(sys.argv[sys.argv.index("--max") + 1]) if "--max" in sys.argv else 7.0
    cues = []
    for b in open(src).read().strip().split("\n\n"):
        L = b.strip().split("\n")
        a, z = L[1].split(" --> ")
        cues.append([ts(a), ts(z), " ".join(L[2:]).strip()])
    out, cur = [], None
    for a, z, t in cues:
        if cur is None: cur = [a, z, t]
        else: cur[1] = z; cur[2] += " " + t
        end_sent = re.search(r'[.!?]["”’)]?$', cur[2])
        if end_sent or (cur[1] - cur[0] > mx and re.search(r'[,;:]$', cur[2])):
            out.append(cur); cur = None
    if cur: out.append(cur)
    # split long sentence cues at commas / midpoint by word share of time
    final = []
    for a, z, t in out:
        words = t.split()
        if z - a <= mx or len(words) < 10:
            final.append((a, z, t)); continue
        parts = max(2, round((z - a) / mx + 0.4))
        cuts, k = [], len(words) / parts
        for p in range(1, parts):
            i = int(k * p); best = i
            for j in range(max(1, i - 4), min(len(words) - 1, i + 4)):
                if words[j - 1][-1] in ",;:": best = j; break
            cuts.append(best)
        idx = [0] + cuts + [len(words)]
        for p in range(len(idx) - 1):
            seg = words[idx[p]:idx[p + 1]]
            ta = a + (z - a) * idx[p] / len(words); tz = a + (z - a) * idx[p + 1] / len(words)
            final.append((ta, tz, " ".join(seg)))
    with open(dst, "w") as f:
        for i, (a, z, t) in enumerate(final, 1):
            f.write(f"{i}\n{fmt(a)} --> {fmt(z)}\n{wrap2(t)}\n\n")
    print(f"{len(cues)} cues -> {len(final)} sentence cues -> {dst}")

if __name__ == "__main__":
    main()
