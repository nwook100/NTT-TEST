# Deterministic checks for an EDL fragment (one section) or a full EDL.
# Usage: python3 tools/edl_check.py <edl_or_fragment.json> <chunk_sheet.json> [--section N]
# Prints "OK" or one issue per line (ERROR = must fix, WARN = should fix). Exit code 1 if any ERROR.
import json, os, subprocess, sys, inspect, importlib.util

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SFX = {"whoosh", "impact", "riser", "heartbeat", "typewriter", "stamp", "glitch"}
FNS = {"key_phrase", "word_by_word", "count_up", "stamp", "typewriter",
       "line_chart", "flow_diagram", "timeline", "compare", "bar_chart", "pyramid", "person_card"}
MIN_FLEX, MAX_FLEX, MAX_SPILL = 2.2, 7.0, 4.0
_dur = {}


def dur(path):
    if path not in _dur:
        r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                            os.path.join(ROOT, path)], capture_output=True, text=True)
        _dur[path] = float(r.stdout.strip() or 0)
    return _dur[path]


def motion_params():
    spec = importlib.util.spec_from_file_location("mt", os.path.join(ROOT, "assets", "motion_tool.py"))
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return {f: inspect.signature(getattr(m, f)).parameters for f in FNS}


def main():
    edl = json.load(open(sys.argv[1]))
    sheet = {c["id"]: c for c in json.load(open(sys.argv[2]))["chunks"]}
    sec = sys.argv[sys.argv.index("--section") + 1] if "--section" in sys.argv else None
    chunks = edl.get("chunks", {})
    if isinstance(chunks, list):                                  # fragment form [{"id":..,"segments":[..]}]
        chunks = {str(c["id"]): c["segments"] for c in chunks}
    want = [i for i, c in sheet.items() if sec is None or str(c["section"]) == str(sec)]
    errs, warns = [], []
    params = motion_params()
    photo_uses, prev_photo = {}, None
    debt = 0.0
    for cid in sorted(want):
        segs = chunks.get(str(cid))
        c = sheet[cid]
        window = c["est_dur"] + c["gap_after"]
        if not segs:
            errs.append(f"ERROR chunk {cid}: no segments (every chunk needs at least one)")
            continue
        clip_sum, flex = 0.0, 0
        for i, s in enumerate(segs):
            k = s.get("kind")
            where = f"chunk {cid} seg {i}"
            if k in ("photo", "clip"):
                a = s.get("asset", "")
                if not a or not os.path.exists(os.path.join(ROOT, a)):
                    errs.append(f"ERROR {where}: asset not found: {a!r}"); continue
                if "_rejected" in a:
                    errs.append(f"ERROR {where}: rejected photo {a}")
                if k == "clip":
                    if "lowerthird" in a:
                        errs.append(f"ERROR {where}: lower-third clips go in a photo's 'overlay', not as a clip")
                    clip_sum += dur(a)
                else:
                    flex += 1
                    if not a.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                        errs.append(f"ERROR {where}: photo must be an image file")
                    if s.get("fx", "in") not in ("in", "out", "left", "right"):
                        errs.append(f"ERROR {where}: fx must be in/out/left/right")
                    ov = s.get("overlay")
                    if ov and not os.path.exists(os.path.join(ROOT, ov)):
                        errs.append(f"ERROR {where}: overlay not found {ov}")
                    if s.get("crop") not in (None, "left", "right", "top", "bottom", "detail"):
                        errs.append(f"ERROR {where}: crop must be left/right/top/bottom/detail")
                    if s.get("grade") not in (None, "bw", "red", "cold"):
                        errs.append(f"ERROR {where}: grade must be bw/red/cold")
                    look = (a, s.get("crop"), s.get("grade"))
                    if a == prev_photo:
                        warns.append(f"WARN {where}: same photo back-to-back ({os.path.basename(a)})")
                    photo_uses[look] = photo_uses.get(look, 0) + 1
                    prev_photo = a
            elif k == "video":
                a = s.get("asset", "")
                if not a or not os.path.exists(os.path.join(ROOT, a)) or not a.endswith(".mp4"):
                    errs.append(f"ERROR {where}: video asset not found: {a!r}")
                elif "/stock/" not in a:
                    warns.append(f"WARN {where}: kind video is meant for stock B-roll ({a})")
                if s.get("grade") not in (None, "bw", "red", "cold"):
                    errs.append(f"ERROR {where}: grade must be bw/red/cold")
                flex += 1
                photo_uses[(a, None, s.get("grade"))] = photo_uses.get((a, None, s.get("grade")), 0) + 1
            elif k == "text":
                flex += 1
                if not s.get("text", "").strip():
                    errs.append(f"ERROR {where}: empty text card")
            elif k == "motion":
                fn, args = s.get("fn"), s.get("args", {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except Exception: errs.append(f"ERROR {where}: args is not valid JSON"); continue
                if fn not in FNS:
                    errs.append(f"ERROR {where}: unknown motion fn {fn}"); continue
                allowed = set(params[fn]) - {"out"}
                bad = set(args) - allowed
                if bad:
                    errs.append(f"ERROR {where}: {fn} has no parameter(s) {sorted(bad)}; allowed {sorted(allowed)}")
                d = float(args.get("dur", params[fn]["dur"].default))
                if not 3.0 <= d <= 6.0:
                    errs.append(f"ERROR {where}: motion dur {d} outside 3–6 s")
                text = " ".join(args.get("lines", [])) + " " + args.get("text", "") + " " + args.get("word", "")
                for r in args.get("red", []):
                    if r.lower() not in text.lower():
                        warns.append(f"WARN {where}: red word {r!r} not found in text")
                clip_sum += d
            else:
                errs.append(f"ERROR {where}: unknown kind {k!r}")
        tail = [s for s in segs if s.get("tail") and s.get("kind") == "clip" and s.get("asset")
                and os.path.exists(os.path.join(ROOT, s["asset"]))]
        if tail:                                      # tail clips play after the narration and spill over
            debt = sum(dur(s["asset"]) for s in tail)
            continue
        eff = window - debt
        if flex:
            share = (eff - clip_sum) / flex
            if share < MIN_FLEX:
                warns.append(f"WARN chunk {cid}: crowded — ~{share:.1f}s per photo/text (min {MIN_FLEX}); some will be dropped")
            elif share > MAX_FLEX:
                warns.append(f"WARN chunk {cid}: slow — ~{share:.1f}s per photo/text (aim 3–6 s); add a visual")
            debt = 0.0
        else:
            over = clip_sum - eff
            if over > MAX_SPILL:
                warns.append(f"WARN chunk {cid}: clips run {over:.1f}s past the window (spill max {MAX_SPILL}s); they get trimmed")
            debt = max(0.0, over)
    for (a, cr, gr), n in photo_uses.items():
        if n > 3:
            warns.append(f"WARN photo used {n}x with the same crop/grade: {os.path.basename(a)} crop={cr} grade={gr} (max 3)")
    for e in edl.get("sfx", []):
        if e.get("name") not in SFX:
            errs.append(f"ERROR sfx {e}: unknown name")
        if e.get("chunk") not in sheet:
            errs.append(f"ERROR sfx {e}: unknown chunk")
    for d in edl.get("music_drops", []):
        if d.get("chunk") not in sheet:
            errs.append(f"ERROR music_drop {d}: unknown chunk")
    if sec is not None:
        first = min(want)
        segs = chunks.get(str(first)) or []
        if not any("chapter" in (s.get("asset") or "") for s in segs) and str(sec) != "0":
            warns.append(f"WARN chunk {first}: section {sec} should open with its chapter card")
    for line in errs + warns:
        print(line)
    if not errs and not warns:
        print("OK")
    sys.exit(1 if errs else 0)


if __name__ == "__main__":
    main()
