# Renders (and caches) every on-demand motion graphic referenced by an EDL. Usage: python3 tools/prerender_motion.py edit/ep01_edl.json
import json, sys, os, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import assemble
edl = json.load(open(sys.argv[1]))
n = sum(1 for v in edl["chunks"].values() for s in v if s["kind"] == "motion")
t = time.time()
assemble.resolve_motion(edl, sys.argv[1])
print(f"resolved {n} motion segments in {(time.time()-t)/60:.1f} min")
