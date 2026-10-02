export const meta = {
  name: 'build-edl',
  description: 'Per-section editor writes chunk-anchored visuals, adversarial verifier checks and fixes them',
  phases: [
    { title: 'Edit', detail: 'one editor per script section writes edit/frag/<ep>_sNN.json' },
    { title: 'Verify', detail: 'independent reviewer checks cues, wording, pacing, assets and fixes the fragment' },
  ],
}

const ep = args.ep              // 'ep01'
const script = args.script      // 'youtube/fraud_ep01_terra_luna_en.md'
const plan = args.plan          // 'youtube/edit_plan_ep01.md'
const sections = args.sections  // [{num:'0', title:'Cold open', ids:[0,7]}, ...]
const R = '/home/user/NTT-TEST/'

const files = `Files (absolute paths under ${R}):
- ${R}youtube/edit/${ep}_chunks.json — narration chunks: id, section, text, cues (script [SCREEN]/[AI-xx] lines right before the chunk), est_dur, gap_after
- ${R}${plan} — the video director's edit plan (read the table for your section)
- ${R}youtube/edit/${ep}_assets.md — the ONLY assets you may use, plus the motion/text options and the SFX names
- ${R}${script} — the script (on-screen wording must be verbatim from here, legal qualifiers included)
- checker: python3 ${R}youtube/tools/edl_check.py <fragment.json> ${R}youtube/edit/${ep}_chunks.json --section <N>`

const RULES = `Fragment format (JSON):
{"section":"N","chunks":[{"id":12,"segments":[ {"kind":"clip","asset":"assets/.../x.mp4"}, {"kind":"photo","asset":"assets/.../y.jpg","fx":"in|out|left|right","align":"top (only for tall gov screenshots)","overlay":"assets/.../s04_lowerthird_x.mp4 (optional)"}, {"kind":"motion","fn":"key_phrase|word_by_word|count_up|stamp|typewriter","name":"s05_short_slug","args":{...}}, {"kind":"text","text":"Line\\nLine","style":"quote|label"} ]}],
 "sfx":[{"chunk":12,"name":"impact","offset":0.0,"gain_db":-8}], "music_drops":[{"chunk":15,"dur":1.5}]}
Asset paths are relative to youtube/ (as listed in the inventory).
Editing rules:
- Cover EVERY chunk id of the section. A chunk's window is about est_dur + gap_after seconds. Clips/motion play at natural length (a clip may spill up to 4 s into the next chunk); photos and text cards share the rest. Target a new visual every 3–6 s.
- Sections other than 0 open with their chapter card clip as the first segment of the first chunk. Section 0 ends with the logo sting and then the episode title chapter card (s00_chapter_...).
- Follow the director's intent, but only with existing assets: PPT diagrams -> motion (key_phrase / count_up / typewriter / stamp / word_by_word) or text cards using wording from the script; STOCK / AI shots -> the best-fitting vetted photo (by its description) or a dark text card. Never invent facts, numbers, quotes or dates; never put text on screen that the script does not support. Keep "according to the SEC", "alleged", "charged", "denies", "Terra said" etc. exactly.
- Use the document-card zoom clips where the narration states that fact; use existing motion clips at the moment their text is narrated.
- Photos: alternate fx; never the same photo back-to-back; max 3 uses of one photo in the section; tense moments prefer dark/neutral mood. A photo must make sense for what is being said (do not show Singapore while the narration is about Washington).
- Lower thirds only as "overlay" on a photo, when that place/organisation is first named.
- SFX sparingly (2–5 per section) at meaningful hits; music_drops (0–2 per section) right before big reveals.
- No real person's face or likeness anywhere.`

const EDIT_OUT = { type: 'object', properties: {
  file: { type: 'string' }, chunks_covered: { type: 'integer' }, checker_output: { type: 'string' }, notes: { type: 'string' } },
  required: ['file', 'chunks_covered', 'checker_output', 'notes'] }
const VERIFY_OUT = { type: 'object', properties: {
  file: { type: 'string' }, issues_found: { type: 'array', items: { type: 'string' } }, fixed: { type: 'array', items: { type: 'string' } },
  remaining: { type: 'array', items: { type: 'string' } }, checker_output: { type: 'string' } },
  required: ['file', 'issues_found', 'fixed', 'remaining', 'checker_output'] }

const pad = n => String(n).padStart(2, '0')
const results = await pipeline(
  sections,
  (s) => agent(
    `You are the film editor for section ${s.num} ("${s.title}") of ${ep} of the Paper Tiger Files documentary (chunk ids ${s.ids[0]}–${s.ids[1]}).\n\n${files}\n\n${RULES}\n\n` +
    `Write the fragment to ${R}youtube/edit/frag/${ep}_s${pad(s.num)}.json (create the folder if needed), run the checker with --section ${s.num}, fix every ERROR and as many WARNs as sensible, and re-run until clean. Return the file path, how many chunks you covered, the final checker output, and short notes on choices/substitutions.`,
    { label: `edit s${pad(s.num)}`, phase: 'Edit', schema: EDIT_OUT }),
  (ed, s) => agent(
    `You are an adversarial reviewer for section ${s.num} ("${s.title}") of ${ep} of the Paper Tiger Files documentary (chunk ids ${s.ids[0]}–${s.ids[1]}). Another editor wrote ${R}youtube/edit/frag/${ep}_s${pad(s.num)}.json. Assume it has mistakes and find them.\n\n${files}\n\n${RULES}\n\n` +
    `Check, chunk by chunk: (1) every [SCREEN] cue in the chunk "cues" is realised sensibly (black-screen text cues -> text card or motion with that wording); (2) any on-screen text is verbatim/supported by the script and keeps legal qualifiers; (3) each photo fits what the narration says at that moment (read the photo descriptions in the inventory; open the image with Read if unsure); (4) pacing (visual change every 3–6 s), variety, chapter card first; (5) SFX/music drops are sparing and well placed; (6) no likeness of real people. Run the checker. Fix problems directly in the file, re-run the checker until no ERROR, and report what you found, what you fixed, and anything still remaining.${ed ? `\nEditor's notes: ${ed.notes}` : ''}`,
    { label: `verify s${pad(s.num)}`, phase: 'Verify', schema: VERIFY_OUT }),
)
const ok = results.filter(Boolean)
log(`${ok.length}/${sections.length} sections verified`)
return results.map((r, i) => ({ section: sections[i].num, ...(r || { error: 'agent failed' }) }))
