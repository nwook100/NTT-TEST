# Generates the full narration for one Paper Tiger Files episode with Qwen3-TTS 1.7B (CustomVoice),
# checks every chunk with Whisper (re-generates chunks whose transcript drifts from the script),
# then stitches, loudness-normalizes, and writes captions + a timing manifest for the video assembler.
#
# Usage: python narrate.py <script.md> <out_dir> [--speaker Ryan] [--limit N]
# Resumable: finished chunks (with a QA record) are reused on re-run.
import argparse, json, os, re, sys, time

import numpy as np
import soundfile as sf

VOICE = {
    "speaker": "Aiden",   # chosen 2026-10-02: lower Whisper WER than Ryan in 2 rounds (7.6%/3.1% vs 9.9%/4.4%), correct years, ~147 wpm
    "instruct": ("Calm, low, serious true-crime documentary narrator. Measured pace, clear American English, "
                 "slight tension, no excitement."),
    "language": "English",
    "model": "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",
}
GAP_CHUNK, GAP_PARA, GAP_BEAT, GAP_SECTION, GAP_STING = 0.25, 0.55, 1.0, 1.2, 1.5
MAX_CHARS = 260          # chunk size; long inputs make TTS drift
WER_RETRY = 0.18         # re-generate above this word error rate
MAX_TRIES = 3
SR_OUT = 48000


def parse(md_path):
    """Return sections: [{num, title, items}] where items are ('line', text) / ('beat',) / ('cue', text) / ('para',)."""
    text = open(md_path, encoding="utf-8").read()
    body = text[text.index("\n## 0."):text.index("\n## Pre-upload")]
    sections = []
    for line in body.splitlines():
        s = line.strip()
        m = re.match(r"^## (\d+(?:\.\d+)?)\. (.*?)(?: \([\d:–-]+\))?$", s)
        if m:
            sections.append({"num": m.group(1), "title": m.group(2), "items": []})
            continue
        if not sections:
            continue
        items = sections[-1]["items"]
        if not s or s == "---":
            items.append(("para",))
        elif s == "(beat)":
            items.append(("beat",))
        elif s.startswith("[SCREEN]") or re.match(r"^\[AI-\d+", s):
            items.append(("cue", s))
        elif s.startswith("#") or s.startswith(">") or s.startswith("|"):
            continue
        else:
            items.append(("line", re.sub(r"\s*\[VERIFY[^\]]*\]", "", s)))
    return sections


def plan_chunks(sections):
    """Group lines into chunks; attach the cues seen since the previous chunk and the pause that follows."""
    chunks = []
    for si, sec in enumerate(sections):
        cur, cues, pending_cues = [], [], []

        def flush(gap):
            nonlocal cur, cues
            if cur:
                chunks.append({"section": sec["num"], "section_title": sec["title"], "section_index": si,
                               "lines": cur, "cues": cues, "gap_after": gap})
                cur, cues = [], []

        for it in sec["items"]:
            if it[0] == "line":
                if cur and len(" ".join(cur)) + len(it[1]) > MAX_CHARS:
                    flush(GAP_CHUNK)
                if not cur:
                    cues, pending_cues = pending_cues, []
                cur.append(it[1])
            elif it[0] == "cue":
                if cur:
                    flush(GAP_PARA)
                pending_cues.append(it[1])
            elif it[0] == "beat":
                if cur:
                    flush(GAP_BEAT)
                elif chunks:
                    chunks[-1]["gap_after"] = max(chunks[-1]["gap_after"], GAP_BEAT)
            elif it[0] == "para":
                if cur:
                    flush(GAP_PARA)
        flush(GAP_SECTION)
        if pending_cues and chunks:   # cues after the last line of a section (e.g. logo sting)
            chunks[-1]["trailing_cues"] = pending_cues
            if any("sting" in c.lower() for c in pending_cues):
                chunks[-1]["gap_after"] = max(chunks[-1]["gap_after"], GAP_STING)
        if chunks:
            chunks[-1]["gap_after"] = max(chunks[-1]["gap_after"], GAP_SECTION)
    for i, c in enumerate(chunks):
        c["id"] = i
        c["text"] = " ".join(c["lines"])
    return chunks


_N2W = None
def norm_words(s):
    global _N2W
    if _N2W is None:
        from num2words import num2words
        _N2W = num2words
    s = s.lower().replace("’", "'").replace("—", " ").replace("–", " ").replace("-", " ")
    s = re.sub(r"(\d),(\d)", r"\1\2", s)
    out = []
    for tok in re.findall(r"[a-z']+|\d+(?:\.\d+)?", s):
        if tok[0].isdigit():
            try:
                out.extend(re.findall(r"[a-z]+", _N2W(float(tok) if "." in tok else int(tok))))
            except Exception:
                out.append(tok)
        else:
            out.append(tok.strip("'"))
    return [w for w in out if w]


def wer(ref, hyp):
    import jiwer
    r, h = " ".join(norm_words(ref)), " ".join(norm_words(hyp))
    return jiwer.wer(r, h) if r else 0.0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script"); ap.add_argument("out")
    ap.add_argument("--speaker", default=VOICE["speaker"])
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--batch", type=int, default=6, help="chunks generated together (CPU throughput)")
    a = ap.parse_args()
    VOICE["speaker"] = a.speaker
    os.makedirs(os.path.join(a.out, "chunks"), exist_ok=True)

    chunks = plan_chunks(parse(a.script))
    if a.limit:
        chunks = chunks[:a.limit]
    print(f"{len(chunks)} chunks, {sum(len(c['text'].split()) for c in chunks)} words", flush=True)

    import torch
    from qwen_tts import Qwen3TTSModel
    from faster_whisper import WhisperModel
    torch.set_num_threads(os.cpu_count() or 4)
    tts = Qwen3TTSModel.from_pretrained(VOICE["model"], dtype=torch.bfloat16, device_map="cpu")   # AMX bf16 on this CPU
    asr = WhisperModel("small.en", device="cpu", compute_type="int8")

    t0 = time.time()
    pending = []
    for c in chunks:
        qa_path = os.path.join(a.out, "chunks", f"{c['id']:04d}.wav.json")
        if os.path.exists(qa_path) and os.path.exists(qa_path[:-5]):
            c.update(json.load(open(qa_path)))
        else:
            pending.append(c)
    print(f"{len(chunks) - len(pending)} chunks already done, {len(pending)} to generate", flush=True)
    for bi in range(0, len(pending), a.batch):
        batch, best, todo = pending[bi:bi + a.batch], {}, pending[bi:bi + a.batch]
        for t in range(MAX_TRIES):
            torch.manual_seed(1000 + todo[0]["id"] * 7 + t)
            n = len(todo)
            wavs, sr = tts.generate_custom_voice(text=[c["text"] for c in todo], language=[VOICE["language"]] * n,
                                                 speaker=[VOICE["speaker"]] * n, instruct=[VOICE["instruct"]] * n)
            for c, w in zip(todo, wavs):
                w = np.asarray(w, dtype=np.float32)
                tmp = os.path.join(a.out, "chunks", f"{c['id']:04d}.tmp.wav")
                sf.write(tmp, w, sr)
                segs, _ = asr.transcribe(tmp, language="en", beam_size=1)
                os.remove(tmp)
                hyp = " ".join(s_.text for s_ in segs).strip()
                e = wer(c["text"], hyp)
                if c["id"] not in best or e < best[c["id"]][0]:
                    best[c["id"]] = (e, w, sr, hyp, t)
            todo = [c for c in todo if best[c["id"]][0] > WER_RETRY]
            if not todo:
                break
        for c in batch:
            e, w, sr, hyp, t = best[c["id"]]
            wav_path = os.path.join(a.out, "chunks", f"{c['id']:04d}.wav")
            sf.write(wav_path, w, sr)
            rec = {"wer": round(e, 3), "asr": hyp, "tries": t + 1, "sr": sr, "dur": round(len(w) / sr, 3)}
            json.dump(rec, open(wav_path + ".json", "w"))
            c.update(rec)
        el = time.time() - t0
        done_audio = sum(c.get("dur", 0) for c in pending[:bi + len(batch)])
        print(f"[{bi + len(batch)}/{len(pending)}] {done_audio/60:.1f} min audio in {el/60:.1f} min "
              f"(rtf {el/max(done_audio,1):.1f}); worst wer in batch {max(best[c['id']][0] for c in batch):.2f}", flush=True)

    # stitch at 48 kHz with the planned gaps
    import scipy.signal as sps
    pieces, t = [], 0.0
    for c in chunks:
        w, sr = sf.read(os.path.join(a.out, "chunks", f"{c['id']:04d}.wav"), dtype="float32")
        if sr != SR_OUT:
            w = sps.resample_poly(w, SR_OUT, sr).astype(np.float32)
        # trim leading/trailing near-silence so gaps are what we planned
        nz = np.where(np.abs(w) > 0.01)[0]
        if len(nz):
            w = w[max(0, nz[0] - int(0.03 * SR_OUT)): nz[-1] + int(0.08 * SR_OUT)]
        c["start"] = round(t, 3)
        pieces.append(w); t += len(w) / SR_OUT
        c["end"] = round(t, 3)
        gap = np.zeros(int(c["gap_after"] * SR_OUT), dtype=np.float32)
        pieces.append(gap); t += len(gap) / SR_OUT
    audio = np.concatenate(pieces)

    import pyloudnorm as pyln
    meter = pyln.Meter(SR_OUT)
    loud = meter.integrated_loudness(audio)
    audio = pyln.normalize.loudness(audio, loud, -16.0)
    peak = np.max(np.abs(audio))
    if peak > 0.89:                      # ~ -1 dBFS ceiling
        audio *= 0.89 / peak
    sf.write(os.path.join(a.out, "narration.wav"), audio, SR_OUT)

    # captions: split each chunk's time across its lines by length, max 2 x 42 chars per caption
    def fmt(x):
        h, r = divmod(x, 3600); m, s = divmod(r, 60)
        return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s - int(s)) * 1000)):03d}"

    def wrap(s, n=42):
        words, lines, cur = s.split(), [], ""
        for wd in words:
            if len(cur) + len(wd) + 1 > n and cur:
                lines.append(cur); cur = wd
            else:
                cur = (cur + " " + wd).strip()
        lines.append(cur)
        return lines

    caps = []
    for c in chunks:
        parts = []
        for line in c["lines"]:
            ls = wrap(line)
            for i in range(0, len(ls), 2):
                parts.append("\n".join(ls[i:i + 2]))
        total = sum(len(p) for p in parts) or 1
        cur = c["start"]
        for p in parts:
            d = (c["end"] - c["start"]) * len(p) / total
            caps.append((cur, cur + d, p)); cur += d
    with open(os.path.join(a.out, "captions.srt"), "w") as f:
        for i, (s, e, p) in enumerate(caps, 1):
            f.write(f"{i}\n{fmt(s)} --> {fmt(e)}\n{p}\n\n")

    json.dump({"voice": VOICE, "duration": round(len(audio) / SR_OUT, 2), "loudness_lufs": -16.0,
               "chunks": chunks}, open(os.path.join(a.out, "manifest.json"), "w"), indent=1, ensure_ascii=False)
    bad = [c for c in chunks if c.get("wer", 0) > WER_RETRY]
    print(f"DONE duration={len(audio)/SR_OUT/60:.1f} min, chunks over WER {WER_RETRY}: {len(bad)}", flush=True)
    for c in bad:
        print(f"  chunk {c['id']} s{c['section']} wer={c['wer']}: {c['text'][:80]} | ASR: {c['asr'][:80]}")


if __name__ == "__main__":
    main()
