# Check a translated SRT against the source: same cue count, indices and timestamps; no empty cue; max 2 lines.
import sys
def cues(p):
    out = []
    for b in open(p, encoding="utf-8").read().replace("﻿", "").strip().split("\n\n"):
        L = b.strip().split("\n"); out.append((L[0].strip(), L[1].strip(), L[2:]))
    return out
a, b = cues(sys.argv[1]), cues(sys.argv[2])
errs = []
if len(a) != len(b): errs.append(f"cue count {len(b)} != {len(a)}")
for x, y in zip(a, b):
    if x[:2] != y[:2]: errs.append(f"cue {x[0]}: index/timestamp differs ({y[0]} {y[1]})")
    if not "".join(y[2]).strip(): errs.append(f"cue {x[0]}: empty text")
    if len(y[2]) > 2: errs.append(f"cue {x[0]}: {len(y[2])} lines (max 2)")
print("\n".join(errs[:40]) if errs else "OK"); sys.exit(1 if errs else 0)
