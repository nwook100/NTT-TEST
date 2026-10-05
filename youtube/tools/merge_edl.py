# Merges edit/frag/<ep>_sNN.json fragments into edit/<ep>_edl.json (the file assemble.py renders).
# Usage: python3 tools/merge_edl.py ep01 ep01_terra_luna
import glob, json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ep, epdir = sys.argv[1], sys.argv[2]
edl = {"episode": epdir, "chunks": {}, "sfx": [], "music_drops": []}
for f in sorted(glob.glob(os.path.join(ROOT, "edit", "frag", f"{ep}_s*.json"))):
    fr = json.load(open(f))
    ch = fr.get("chunks", {})
    items = ch.items() if isinstance(ch, dict) else ((str(c["id"]), c["segments"]) for c in ch)
    for cid, segs in items:
        for s in segs:
            if isinstance(s.get("args"), str):
                s["args"] = json.loads(s["args"])
        if cid in edl["chunks"]:
            print(f"WARN chunk {cid} defined twice; keeping the later one ({os.path.basename(f)})")
        edl["chunks"][cid] = segs
    edl["sfx"] += fr.get("sfx", [])
    edl["music_drops"] += fr.get("music_drops", [])
edl["chunks"] = dict(sorted(edl["chunks"].items(), key=lambda kv: int(kv[0])))
out = os.path.join(ROOT, "edit", f"{ep}_edl.json")
json.dump(edl, open(out, "w"), indent=1, ensure_ascii=False)
print(f"wrote {out}: {len(edl['chunks'])} chunks, {len(edl['sfx'])} sfx, {len(edl['music_drops'])} drops")
