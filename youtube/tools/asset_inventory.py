# Builds edit/<ep>_assets.md: everything an editor may put in the EDL (vetted photos, motion clips, document-card
# zoom clips, government captures, SFX, and motion_tool functions for on-demand graphics).
import json, os, subprocess, sys, importlib.util
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ep, epdir = sys.argv[1], sys.argv[2]            # e.g. ep01 ep01_terra_luna
A = os.path.join(ROOT, "assets", epdir)
def dur(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p],
                                capture_output=True, text=True).stdout.strip() or 0)
L = [f"# {ep} asset inventory (paths relative to youtube/)\n"]
vet = os.path.join(A, "PHOTO_VETTING.json")
L.append("## Photos (kind: photo) — vetted; only these may be used\n| path | shows | mood | notes |\n|---|---|---|---|")
if os.path.exists(vet):
    for v in json.load(open(vet)):
        if v["verdict"] == "keep":
            note = "" if v.get("landscape_ok", True) else "not 16:9-friendly; prefer short use"
            L.append(f"| {v['path'].replace('youtube/', '')} | {v['shows']} | {v['mood']} | {note} |")
gov = os.path.join(A, "gov")
if os.path.isdir(gov):
    for f in sorted(os.listdir(gov)):
        if f.endswith(".png"):
            L.append(f"| assets/{epdir}/gov/{f} | real screenshot of a US government web page ({f}) — tall page: add \"align\":\"top\" so the headline shows | neutral | citation |")
L.append("\n## Motion clips (kind: clip) — full-screen graphics, natural length\n| path | seconds |\n|---|---|")
md = os.path.join(A, "motion")
for f in sorted(os.listdir(md)) if os.path.isdir(md) else []:
    if f.endswith(".mp4"):
        lt = " (LOWER THIRD on black: use as `overlay` on a photo, not as a clip)" if "lowerthird" in f else ""
        L.append(f"| assets/{epdir}/motion/{f}{lt} | {dur(os.path.join(md, f)):.1f} |")
cd = os.path.join(A, "cards")
if os.path.exists(os.path.join(cd, "cards.py")):
    spec = importlib.util.spec_from_file_location("cards", os.path.join(cd, "cards.py")); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    L.append("\n## Document-card zoom clips (kind: clip, 7.0 s: slow zoom onto the highlighted phrase)\n| path | card text |\n|---|---|")
    for name, org, meta, tag, body, src in m.CARDS:
        import re
        L.append(f"| assets/{epdir}/cards/zoom/{name}_zoom.mp4 | {tag} · {meta} · {re.sub('<[^>]+>', ' ', body)} |")
L.append("\n## Sound effects (EDL `sfx`, names): whoosh, impact, riser, heartbeat, typewriter, stamp, glitch")
L.append("""
## On-demand graphics (kind: motion) — rendered by assets/motion_tool.py, 3–6 s each
Use for diagrams/quotes/numbers the plan asks for that do not exist yet (instead of PPT). Text must come verbatim from the script.
- `{"kind":"motion","fn":"key_phrase","name":"s03_kp_x","args":{"lines":["Line one","Line two"],"red":["word"],"kicker":"OPTIONAL SMALL CAPS","dur":4.5,"stagger":0.9,"size":110}}`
- `{"kind":"motion","fn":"word_by_word","name":"...","args":{"text":"Quote text.","attribution":"— SOURCE","red":["word"],"dur":5.0,"size":82}}`
- `{"kind":"motion","fn":"count_up","name":"...","args":{"to":450,"prefix":"+","suffix":"M UST","kicker":"...","label":"...","sublabel":"...","dur":4.5}}`
- `{"kind":"motion","fn":"stamp","name":"...","args":{"word":"WORD","sub":"SMALL LINE","dur":4.0}}`
- `{"kind":"motion","fn":"typewriter","name":"...","args":{"text":"DATE — PLACE","sub":"optional","dur":3.5}}`
Constraints: dur 3.0–6.0; red words must appear in the text (lowercase match incl. punctuation as written).

## Text card (kind: text) — plain centered serif on near-black, fades in/out
`{"kind":"text","text":"Line one\\nLine two","style":"quote"}` — use for the script's "Black screen, white text" cues and simple labels.
""")
os.makedirs(os.path.join(ROOT, "edit"), exist_ok=True)
open(os.path.join(ROOT, "edit", f"{ep}_assets.md"), "w").write("\n".join(L) + "\n")
print("wrote", f"edit/{ep}_assets.md", len(L), "lines")
