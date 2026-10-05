# Live episode-wide usage of photos (per crop/grade look) and stock videos, read from all current fragments.
# Usage: python3 tools/usage.py ep01 [--asset substring]
import glob, json, os, sys, collections
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ep = sys.argv[1]
flt = sys.argv[sys.argv.index("--asset") + 1] if "--asset" in sys.argv else ""
looks, assets, where = collections.Counter(), collections.Counter(), collections.defaultdict(list)
for f in sorted(glob.glob(os.path.join(ROOT, "edit", "frag", f"{ep}_s*.json"))):
    sec = os.path.basename(f)[len(ep) + 2:-5]
    ch = json.load(open(f)).get("chunks", {})
    items = ch.items() if isinstance(ch, dict) else ((str(c["id"]), c["segments"]) for c in ch)
    for cid, segs in items:
        for s in segs:
            if s.get("kind") in ("photo", "video"):
                a = s["asset"]
                if flt and flt not in a: continue
                looks[(a, s.get("crop"), s.get("grade"))] += 1; assets[a] += 1; where[a].append(f"s{sec}/c{cid}")
print("ASSET USES (all looks) — sections/chunks")
for a, n in assets.most_common():
    print(f"{n:3d}  {a}  [{', '.join(where[a])}]")
print("\nLOOKS used more than once (asset, crop, grade):")
for (a, c, g), n in looks.most_common():
    if n > 1: print(f"{n:3d}  {os.path.basename(a)}  crop={c} grade={g}")
