# Renders a Paper Tiger Files episode from an edit decision list (EDL) anchored to narration chunk ids.
#
#   python3 assemble.py --edl edit/ep01_edl.json --manifest output/ep01/narration/manifest.json \
#                       --narration output/ep01/narration/narration.wav --srt output/ep01/narration/captions.srt \
#                       --out output/ep01/ep01_final.mp4 [--preview] [--from-chunk A --to-chunk B]
#
# Without --manifest/--narration it uses estimated timings from the chunk sheet (edit/ep01_chunks.json) and renders
# a silent animatic, so the edit can be reviewed before the voice exists.
#
# EDL (paths relative to youtube/):
# {"episode": "ep01",
#  "chunks": {"12": [{"kind": "photo", "asset": "assets/.../x.jpg", "fx": "in|out|left|right"},
#                    {"kind": "clip",  "asset": "assets/.../y.mp4"},
#                    {"kind": "text",  "text": "Died: December 2011.\nOfficially.", "style": "quote|label"}], ...},
#  "sfx":   [{"chunk": 12, "name": "impact", "offset": 0.0, "gain_db": -6}],
#  "music_drops": [{"chunk": 40, "dur": 2.5}]}
# Every visual on screen is full-frame; "clip" plays at natural length (trimmed or frozen to fit), photos and text
# share the rest of the chunk window. Captions are hidden while a clip or text card is on screen.
import argparse, json, os, re, shutil, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # youtube/
FPS = 30
MIN_FLEX = 2.2      # shortest photo/text segment
FONT_SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
GRADE = "eq=contrast=1.06:saturation=0.82,colorbalance=rs=0.03:bs=0.04:rh=0.03:bh=-0.03"
FILM = "noise=alls=7:allf=t+u,vignette=PI/5"


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        raise RuntimeError(" ".join(cmd)[:400] + "\n" + r.stderr[-1500:])
    return r


def probe_dur(path):
    out = run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path]).stdout
    return float(out.strip())


def load_timeline(args):
    """Return list of chunks with start/end (seconds) and window end (next start)."""
    if args.manifest:
        chunks = json.load(open(args.manifest))["chunks"]
    else:
        chunks = json.load(open(args.chunks))["chunks"]
        t = 0.0
        for c in chunks:                        # estimate ~150 wpm
            c["start"] = round(t, 3); t += c["est_dur"]; c["end"] = round(t, 3); t += c["gap_after"]
    for i, c in enumerate(chunks):
        c["win_start"] = c["start"]
        c["win_end"] = chunks[i + 1]["start"] if i + 1 < len(chunks) else c["end"] + c["gap_after"] + 1.5
    return chunks


MAX_SPILL = 4.0     # a clip may run this far past its chunk window; the next chunk starts later


def allocate(segs, eff, durs):
    """Assign durations inside one chunk's effective window. Clips keep their natural length (spilling up to
    MAX_SPILL into the next chunk); photos/text share what is left. Returns [(seg, dur)]."""
    segs = list(segs)
    fsum = sum(durs[s["asset"]] for s in segs if s["kind"] == "clip")
    flex = [s for s in segs if s["kind"] != "clip"]
    while len(flex) > 1 and (eff - fsum) / len(flex) < MIN_FLEX:
        segs.remove(flex.pop())
    rem = eff - fsum
    if flex and rem >= 1.0:
        share = rem / len(flex)
        return [(s, durs[s["asset"]] if s["kind"] == "clip" else share) for s in segs]
    clips = [s for s in segs if s["kind"] == "clip"]
    if not clips:
        return [(segs[0], max(eff, 0.5))]
    scale = min(1.0, (eff + MAX_SPILL) / fsum)
    out = [[s, durs[s["asset"]] * scale] for s in clips]
    used = sum(d for _, d in out)
    if used < eff:
        out[-1][1] += eff - used            # freeze the last frame to fill the window
    return [(s, d) for s, d in out]


def render_segment(seg, dur, path, W, H, fast, workdir):
    n = max(1, round(dur * FPS))
    enc = ["-c:v", "libx264", "-preset", "ultrafast" if fast else "veryfast", "-crf", "26" if fast else "17",
           "-pix_fmt", "yuv420p", "-r", str(FPS), "-an"]
    k = seg["kind"]
    if k == "photo":
        src = os.path.join(ROOT, seg["asset"])
        Wi, Hi = (W * 2, H * 2) if not fast else (W, H)
        fx = seg.get("fx", "in")
        Z = 0.14
        z = {"in": f"1+{Z}*on/{n}", "out": f"{1+Z}-{Z}*on/{n}"}.get(fx, f"{1+Z*0.8}")
        x = {"left": f"(iw-iw/zoom)*(1-on/{n})", "right": f"(iw-iw/zoom)*on/{n}"}.get(fx, "iw/2-(iw/zoom/2)")
        cy = "0" if seg.get("align") == "top" else "(ih-oh)/2"
        # optional reframing of the source so a re-used photo reads as a different shot
        pre = {"left": "crop=iw*0.62:ih:0:0,", "right": "crop=iw*0.62:ih:iw*0.38:0,", "top": "crop=iw:ih*0.62:0:0,",
               "bottom": "crop=iw:ih*0.62:0:ih*0.38,", "detail": "crop=iw*0.5:ih*0.5:iw*0.25:ih*0.25,"}.get(seg.get("crop"), "")
        grade = {"bw": ",hue=s=0,eq=contrast=1.12", "red": ",colorbalance=rs=0.18:gs=-0.05:bs=-0.08:rm=0.12,eq=saturation=0.7",
                 "cold": ",colorbalance=bs=0.15:rs=-0.06:bm=0.1,eq=saturation=0.75:brightness=-0.03"}.get(seg.get("grade"), "")
        vf = (f"{pre}scale={Wi}:{Hi}:force_original_aspect_ratio=increase,crop={Wi}:{Hi}:(iw-ow)/2:{cy},setsar=1,"
              f"zoompan=z='{z}':x='{x}':y='ih/2-(ih/zoom/2)':d={n}:s={W}x{H}:fps={FPS},{GRADE}{grade},{FILM},format=yuv420p")
        if seg.get("overlay"):
            ov = os.path.join(ROOT, seg["overlay"])
            fc = (f"[0]{vf.replace(',format=yuv420p', '')},format=gbrp[bg];"
                  f"[1]scale={W}:{H},fps={FPS},tpad=stop_mode=add:stop_duration=60:color=black,format=gbrp[ov];"
                  f"[bg][ov]blend=all_mode=screen:shortest=0,format=yuv420p")
            run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-i", ov, "-filter_complex", fc,
                 "-frames:v", str(n), *enc, path])
        else:
            run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-vf", vf, "-frames:v", str(n), *enc, path])
    elif k == "clip":
        src = os.path.join(ROOT, seg["asset"])
        vf = f"scale={W}:{H}:force_original_aspect_ratio=decrease,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps={FPS},tpad=stop_mode=clone:stop_duration=60,format=yuv420p"
        run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-vf", vf, "-frames:v", str(n), *enc, path])
    elif k == "video":
        # stock B-roll: flexible length — slowed down up to 1.6x if the slot is longer, then frozen; graded like photos
        src = os.path.join(ROOT, seg["asset"])
        nat = probe_dur(src) - float(seg.get("start", 0))
        slow = min(1.6, max(1.0, dur / max(nat, 0.1)))
        grade = {"bw": ",hue=s=0,eq=contrast=1.12", "red": ",colorbalance=rs=0.18:gs=-0.05:bs=-0.08:rm=0.12,eq=saturation=0.7",
                 "cold": ",colorbalance=bs=0.15:rs=-0.06:bm=0.1,eq=saturation=0.75:brightness=-0.03"}.get(seg.get("grade"), "")
        vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1,setpts={slow:.3f}*PTS,fps={FPS},"
              f"tpad=stop_mode=clone:stop_duration=60,{GRADE}{grade},{FILM},format=yuv420p")
        run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(seg.get("start", 0)), "-i", src, "-vf", vf,
             "-frames:v", str(n), *enc, path])
    elif k == "text":
        tf = os.path.join(workdir, os.path.basename(path) + ".txt")
        open(tf, "w").write(seg["text"])
        size = int(H * (0.058 if seg.get("style", "quote") == "quote" else 0.045))
        fade = min(0.6, dur / 4)
        vf = (f"drawtext=fontfile={FONT_SERIF}:textfile={tf}:fontsize={size}:fontcolor=0xF3EDE2:line_spacing={size//3}:"
              f"x=(w-text_w)/2:y=(h-text_h)/2:alpha='min(1,t/{fade})*min(1,({dur}-t)/{fade})',{FILM},format=yuv420p")
        run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i", f"color=c=0x0b0c0f:s={W}x{H}:r={FPS}:d={dur + 0.1}",
             "-vf", vf, "-frames:v", str(n), *enc, path])
    else:
        raise ValueError(f"unknown kind {k}")
    return n / FPS


def fmt(x):
    h, r = divmod(x, 3600); m, sec = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{int(sec):02d},{int(round((sec - int(sec)) * 1000)) % 1000:03d}"


def resolve_motion(edl, edl_path):
    """{"kind": "motion", "fn": "key_phrase", "args": {...}} -> render once with assets/motion_tool.py, then a clip."""
    import hashlib, importlib.util
    mt = None
    cache = os.path.join(ROOT, "assets", edl.get("episode", "ep"), "motion_edl")
    for segs in edl["chunks"].values():
        for s in segs:
            if s["kind"] != "motion":
                continue
            key = hashlib.sha1(json.dumps([s["fn"], s.get("args", {})], sort_keys=True).encode()).hexdigest()[:10]
            name = f"{s.get('name', s['fn'])}_{key}.mp4"
            out = os.path.join(cache, name)
            if not os.path.exists(out):
                if mt is None:
                    spec = importlib.util.spec_from_file_location("motion_tool", os.path.join(ROOT, "assets", "motion_tool.py"))
                    mt = importlib.util.module_from_spec(spec); spec.loader.exec_module(mt)
                os.makedirs(cache, exist_ok=True)
                tmp = out[:-4] + f".tmp{os.getpid()}.mp4"      # write then rename: parallel renders never see half files
                getattr(mt, s["fn"])(tmp, **s.get("args", {}))
                os.replace(tmp, out)
            s["kind"], s["asset"] = "clip", os.path.relpath(out, ROOT)


def filter_srt(srt_in, srt_out, hidden, shift=0.0):
    """Shift captions by -shift seconds and drop those whose midpoint falls inside a hidden interval."""
    def ts(s):
        h, m, rest = s.split(":"); sec, ms = rest.split(",")
        return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000
    blocks = open(srt_in).read().strip().split("\n\n")
    kept = []
    for b in blocks:
        lines = b.split("\n")
        a, z = [ts(x.strip()) - shift for x in lines[1].split("-->")]
        mid = (a + z) / 2
        if z <= 0 or any(h0 <= mid <= h1 for h0, h1 in hidden):
            continue
        a = max(0.0, a)
        kept.append("\n".join([str(len(kept) + 1), f"{fmt(a)} --> {fmt(z)}"] + lines[2:]))
    open(srt_out, "w").write("\n\n".join(kept) + "\n")
    return len(blocks) - len(kept)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--edl", required=True)
    ap.add_argument("--chunks", help="chunk sheet with est_dur (used when no manifest)")
    ap.add_argument("--manifest"); ap.add_argument("--narration"); ap.add_argument("--srt")
    ap.add_argument("--out", required=True)
    ap.add_argument("--preview", action="store_true", help="854x480, fast encode")
    ap.add_argument("--from-chunk", type=int, default=0); ap.add_argument("--to-chunk", type=int, default=10**9)
    ap.add_argument("--keep", action="store_true", help="keep the temp segment folder")
    a = ap.parse_args()

    W, H = (854, 480) if a.preview else (1920, 1080)
    edl = json.load(open(a.edl))
    chunks = [c for c in load_timeline(a) if a.from_chunk <= c["id"] <= a.to_chunk]
    t0 = chunks[0]["win_start"]
    work = tempfile.mkdtemp(prefix="assemble_", dir=os.path.dirname(os.path.abspath(a.out)))
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)

    resolve_motion(edl, a.edl)
    durs = {}
    for segs in edl["chunks"].values():
        for s in segs:
            if s["kind"] == "clip" and s["asset"] not in durs:
                durs[s["asset"]] = probe_dur(os.path.join(ROOT, s["asset"]))

    seg_files, hidden, t, last, debt = [], [], 0.0, None, 0.0
    for c in chunks:
        window = c["win_end"] - c["win_start"]
        if debt >= window - 0.8:            # still covered by a clip spilling over from the previous chunk
            debt = max(0.0, debt - window)
            print(f"chunk {c['id']} s{c['section']}: covered by spill", flush=True)
            continue
        eff = window - debt
        segs = edl["chunks"].get(str(c["id"])) or ([dict(last, fx="out" if last.get("fx") == "in" else "in")]
                                                  if last and last["kind"] == "photo" else
                                                  [{"kind": "text", "text": " ", "style": "label"}])
        # "tail": true clips start only after this chunk's narration has ended, and may spill into the next chunk
        tails = [s for s in segs if s.get("tail") and s["kind"] == "clip"]
        body = [s for s in segs if s not in tails] or segs[:1]
        plan = []
        if tails:
            speech = max(1.0, (c["end"] - c["win_start"]) - debt)
            plan = allocate(body, speech, durs) + [(s, durs[s["asset"]]) for s in tails]
        else:
            plan = allocate(segs, eff, durs)
        used = 0.0
        for s, d in plan:
            p = os.path.join(work, f"seg_{len(seg_files):05d}.mp4")
            real = render_segment(s, d, p, W, H, a.preview, work)
            if (s["kind"] == "clip" and not s.get("captions")) or (s["kind"] == "text" and s["text"].strip()):
                hidden.append((t0 + t, t0 + t + real))
            seg_files.append(p); t += real; used += real
            if s["kind"] == "photo":
                last = s
        debt = max(0.0, used - eff)
        print(f"chunk {c['id']} s{c['section']}: window {window:.1f}s, {len(segs)} segs, t={t/60:.2f}m", flush=True)

    lst = os.path.join(work, "list.txt")
    open(lst, "w").write("".join(f"file '{p}'\n" for p in seg_files))
    video = os.path.join(work, "video.mp4")
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", video])
    total = probe_dur(video)

    # ---- audio: narration + ducked drone bed (with drops) + sfx
    sfxdir = os.path.join(ROOT, "audio", "sfx")
    bed = os.path.join(work, "bed.wav")
    run([sys.executable, os.path.join(ROOT, "tools", "sfx.py"), "--bed", f"{total:.2f}", bed])
    inputs, filters, mix = [], [], []
    if a.narration:
        inputs += ["-ss", f"{t0:.3f}", "-t", f"{total:.3f}", "-i", a.narration]
    else:
        inputs += ["-f", "lavfi", "-t", f"{total:.3f}", "-i", "anullsrc=r=48000:cl=stereo"]
    inputs += ["-i", bed]
    by_id = {c["id"]: c for c in chunks}
    drops = [(by_id[d["chunk"]]["win_start"] - t0, d.get("dur", 2.0)) for d in edl.get("music_drops", []) if d["chunk"] in by_id]
    vol = "1" if not drops else "+".join(["1"] + [f"-0.95*between(t,{s:.2f},{s+d:.2f})" for s, d in drops])
    filters.append(f"[0:a]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[nar][sc]")
    filters.append(f"[1:a]volume=-21dB,volume='{vol}':eval=frame[bedv]")
    filters.append("[bedv][sc]sidechaincompress=threshold=0.03:ratio=6:attack=60:release=500[bedd]")
    mix += ["[nar]", "[bedd]"]
    k = 2
    for e in edl.get("sfx", []):
        if e["chunk"] not in by_id:
            continue
        at = by_id[e["chunk"]]["win_start"] - t0 + e.get("offset", 0.0)
        inputs += ["-i", os.path.join(sfxdir, e["name"] + ".wav")]
        ms = max(0, int(at * 1000))
        filters.append(f"[{k}:a]volume={e.get('gain_db', -8)}dB,adelay={ms}|{ms}[s{k}]")
        mix.append(f"[s{k}]"); k += 1
    filters.append(f"{''.join(mix)}amix=inputs={len(mix)}:normalize=0:duration=first,"
                   f"loudnorm=I=-14:TP=-1.5:LRA=11[aout]")
    audio = os.path.join(work, "mix.wav")
    run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", ";".join(filters), "-map", "[aout]",
         "-ar", "48000", "-t", f"{total:.3f}", audio])

    # ---- captions (shifted to this render's start) + final encode
    vf = "null"
    if a.srt:
        caps = os.path.join(work, "caps.srt")
        dropped = filter_srt(a.srt, caps, [(h0 - t0, h1 - t0) for h0, h1 in hidden], shift=t0)
        style = ("FontName=Liberation Sans,FontSize=12,PrimaryColour=&H00FFFFFF,OutlineColour=&H99000000,"
                 "BorderStyle=3,Outline=4,Shadow=0,MarginV=22,Alignment=2")
        vf = f"subtitles={caps}:force_style='{style}'"
        print(f"captions: hid {dropped} lines under full-screen graphics", flush=True)
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", video, "-i", audio, "-vf", vf,
         "-c:v", "libx264", "-preset", "ultrafast" if a.preview else "faster", "-crf", "28" if a.preview else "20",
         "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-shortest", a.out])
    if not a.keep:
        shutil.rmtree(work, ignore_errors=True)
    print(f"DONE {a.out} {total/60:.2f} min", flush=True)


if __name__ == "__main__":
    main()
