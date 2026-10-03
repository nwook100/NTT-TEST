export const meta = {
  name: 'variety-pass',
  description: 'Bring stock B-roll into the edit, fix rejected assets and repeated photos, then an episode-wide critic',
  phases: [
    { title: 'Revise', detail: 'one reviser per section: stock video, crop/grade variants, missing assets' },
    { title: 'Critic', detail: 'one episode-wide critic per episode resolves cross-section repetition' },
  ],
}

// args: { episodes: [{ep:'ep01', epdir:'ep01_terra_luna', script:'youtube/fraud_ep01_terra_luna_en.md', sections:[{num,title,ids}]}] }
const R = '/home/user/NTT-TEST/'
const pad = n => String(n).padStart(2, '0')

const common = (e) => `Files (absolute paths under ${R}):
- fragment to revise: ${R}youtube/edit/frag/${e.ep}_sNN.json (format: {"section","chunks":[{"id","segments":[...]}],"sfx":[...],"music_drops":[...]})
- ${R}youtube/edit/${e.ep}_assets.md — ALL usable assets: vetted photos (+ crop/grade reframing), STOCK B-ROLL VIDEO (kind "video"), motion clips, document-card zooms, on-demand motion graphics, text cards, SFX names
- ${R}youtube/assets/${e.epdir}/stock/STOCK_SOURCES.md — notes on each stock clip (some show the wrong country's currency or look AI-generated: avoid those where it would mislead)
- ${R}youtube/assets/${e.epdir}/crop_sheets/<photo>.jpg — open with Read to see what each crop (full/left/right/top/bottom/detail) shows
- ${R}${e.script} — the script (on-screen wording must stay verbatim; legal qualifiers exactly as written)
- real narration timing: ${R}youtube/output/${e.ep}/narration/manifest.json (chunks with start/end/gap_after, if it exists; otherwise ${R}youtube/edit/${e.ep}_chunks.json est_dur+gap_after)
- live episode-wide usage: python3 ${R}youtube/tools/usage.py ${e.ep}   (other sections are being revised in parallel — re-run it before finalising)
- checker: python3 ${R}youtube/tools/edl_check.py <fragment> ${R}youtube/edit/${e.ep}_chunks.json --section N`

const RULES = `Segment kinds: clip (fixed-length motion/card/stock-free graphics), video (stock B-roll, flexible length, optional "grade":"bw|red|cold", optional "start" seconds), photo (flexible, "fx":"in|out|left|right", optional "crop":"left|right|top|bottom|detail", "grade":"bw|red|cold", "align":"top", "overlay": lower-third), motion (on-demand graphic), text (card). A clip with "tail": true plays after the chunk's narration ends and may spill into the next chunk.
Revision goals, in priority order:
1. Every asset must exist (photos moved to _rejected are gone). Replace missing ones with the best-fitting alternative.
2. Variety: a photo look (asset+crop+grade) at most ONCE in your section and at most TWICE in the whole episode; a stock video at most twice per episode. Use the live usage tool. When a photo is needed again, use a crop/grade the sheets show works, or switch to stock video.
3. Bring in stock B-roll wherever it fits what is being SAID better than a photo or a plain text card (the stock list says what each clip shows). Aim for real motion on screen often; keep text-on-black only where the script calls for it (quotes, black-screen cues) or for key facts.
4. Never break what earlier editors/verifiers fixed: keep motion clips, document-card zooms, quotes, lower thirds, chapter cards, sync-tuned key_phrase args, and SFX/music-drop timings unless an asset change forces a tweak.
5. Truthfulness: no stock clip that implies a wrong place/currency/person (e.g. foreign banknotes over Korean won, a Western courtroom over a Korean court is acceptable only as generic "a courtroom" mood, never when the narration names the specific court). No recognisable faces.
6. Pacing: a visual change every 3–6 s on the real timing.`

const OUT = { type: 'object', properties: {
  file: { type: 'string' }, replaced_missing: { type: 'integer' }, stock_added: { type: 'integer' },
  variants_used: { type: 'integer' }, checker_output: { type: 'string' }, notes: { type: 'string' } },
  required: ['file', 'replaced_missing', 'stock_added', 'variants_used', 'checker_output', 'notes'] }

const items = args.episodes.flatMap(e => e.sections.map(s => ({ e, s })))
const revised = await pipeline(items, ({ e, s }) => agent(
  `You are a documentary editor revising section ${s.num} ("${s.title}", chunk ids ${s.ids[0]}–${s.ids[1]}) of ${e.ep} of "Paper Tiger Files".\n\n` +
  common(e).replace('sNN', 's' + pad(s.num)) + `\n\n${RULES}\n` +
  (String(s.num) === '0' ? `\nSection 0 only: give the logo sting and the episode title card at the end of the cold open "tail": true so they play after the last line.\n` : '') +
  `\nEdit ${R}youtube/edit/frag/${e.ep}_s${pad(s.num)}.json in place, run the checker with --section ${s.num} until there is no ERROR, re-check usage.py, and report counts and notes.`,
  { label: `revise ${e.ep} s${pad(s.num)}`, phase: 'Revise', schema: OUT }))

const CRIT = { type: 'object', properties: {
  changes: { type: 'array', items: { type: 'string' } }, remaining: { type: 'array', items: { type: 'string' } }, checker_output: { type: 'string' } },
  required: ['changes', 'remaining', 'checker_output'] }
const critics = await parallel(args.episodes.map(e => () => agent(
  `You are the supervising editor for ${e.ep} of "Paper Tiger Files". Section editors just revised every fragment in ${R}youtube/edit/frag/${e.ep}_s*.json in parallel, so cross-section repetition may remain.\n\n` +
  common(e).replace('sNN', 'sNN (all sections)') + `\n\n${RULES}\n\n` +
  `Run python3 ${R}youtube/tools/usage.py ${e.ep}. Fix every photo look used more than twice and every stock video used more than twice in the episode, and any back-to-back repeats across section boundaries, by editing the fragments (smallest change that keeps the meaning). Then merge with python3 ${R}youtube/tools/merge_edl.py ${e.ep} ${e.epdir} and run python3 ${R}youtube/tools/edl_check.py ${R}youtube/edit/${e.ep}_edl.json ${R}youtube/edit/${e.ep}_chunks.json until there is no ERROR. Report what you changed and anything left.`,
  { label: `critic ${e.ep}`, phase: 'Critic', schema: CRIT })))
return { revised: revised.map((r, i) => ({ ep: items[i].e.ep, section: items[i].s.num, ...(r || { error: 'failed' }) })), critics }
