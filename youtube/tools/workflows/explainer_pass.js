export const meta = {
  name: 'explainer-pass',
  description: 'Motion designer adds explainer graphics (charts, money-flow, timelines, compare, pyramid) where the script supports them; fact checker verifies',
  phases: [
    { title: 'Design', detail: 'one motion designer per half-episode inserts new explainer graphics' },
    { title: 'Check', detail: 'independent fact/visual checker verifies every new graphic against the script and fixes' },
  ],
}

// args: { parts: [{ep, epdir, script, sections:[[num,first,last],...]}] }
const R = '/home/user/NTT-TEST/'
const pad = n => String(n).padStart(2, '0')

const ctx = (p) => `Episode ${p.ep} of the documentary "Paper Tiger Files". Your sections: ${p.sections.map(s => `s${pad(s[0])} (chunks ${s[1]}–${s[2]})`).join(', ')}.
Files (under ${R}youtube/):
- fragments: edit/frag/${p.ep}_sNN.json — chunk-anchored segments (kinds clip/photo/video/motion/text)
- script: ${R}${p.script} (all on-screen wording and numbers must come from here; legal qualifiers like "alleged", "according to", "charged", "denies", "approximately" stay)
- narration timing: output/${p.ep}/narration/manifest.json (each chunk's start/end/text)
- motion generator: assets/motion_tool.py — read the docstrings of the NEW explainer functions: line_chart, flow_diagram, timeline, compare, bar_chart, pyramid (and the older key_phrase, count_up, word_by_word, stamp, typewriter)
- checker: python3 tools/edl_check.py edit/frag/${p.ep}_sNN.json edit/${p.ep}_chunks.json --section N
- preview render of a chunk range (480p, real narration+captions):
  python3 tools/merge_edl.py ${p.ep} ${p.epdir} && nice -n 5 python3 tools/assemble.py --edl edit/${p.ep}_edl.json --manifest output/${p.ep}/narration/manifest.json --narration output/${p.ep}/narration/narration.wav --srt output/${p.ep}/narration/captions.srt --out /tmp/expl_${p.ep}_<tag>.mp4 --preview --from-chunk A --to-chunk B
  (other people edit other sections of the same episode in parallel; merge_edl is safe to re-run). Extract frames with ffmpeg and look at them with Read.`

const RULES = `A motion segment looks like {"kind":"motion","fn":"line_chart","name":"s07_luna_crash","args":{...}}; it plays at its natural length (args.dur, 3–6 s) inside the chunk window, so swap it in for a weaker visual of similar length (a plain text card, a repeated photo, a generic stock shot) rather than crowding the chunk.
What makes a good explainer graphic:
- line_chart: a price/value path the narration walks through (e.g. a peg breaking, a token crashing). Only values the script states; use note "Approximate figures" when the script says roughly/about; log=true for multi-order crashes.
- flow_diagram: how money or tokens moved (deposits -> company -> paid out as "returns"; mint/burn; recruiters' commissions). 3–5 nodes, short labels, place nodes with x/y so arrows are long and clear.
- timeline: 3–5 dated events the narration summarises or that span a section.
- compare: promised vs reality, claim vs court finding, before vs after — wording from the script.
- bar_chart: 2–4 comparable quantities in the SAME unit stated in the script.
- pyramid: recruitment levels of a scheme (only where the script describes such a structure).
Rules: never invent numbers, dates, names or claims; a court finding or official figure is stated as such, anything else keeps its qualifier; no real person's face; nothing that suggests guilt beyond what the script says. Keep chapter cards, quotes, document-card zooms and the key moments other editors placed. Aim for about 2 new explainer graphics per section where the script genuinely supports one (skip a section rather than force it), each on the chunk where the narration says it, and at most one per chunk. Prefer variety across the episode (not five timelines).`

const OUT = { type: 'object', properties: {
  added: { type: 'array', items: { type: 'object', properties: { section: { type: 'string' }, chunk: { type: 'integer' }, fn: { type: 'string' }, what: { type: 'string' }, script_support: { type: 'string' } }, required: ['section', 'chunk', 'fn', 'what', 'script_support'] } },
  checker_output: { type: 'string' }, notes: { type: 'string' } }, required: ['added', 'checker_output', 'notes'] }
const CHK = { type: 'object', properties: {
  problems: { type: 'array', items: { type: 'string' } }, fixed: { type: 'array', items: { type: 'string' } },
  remaining: { type: 'array', items: { type: 'string' } }, checker_output: { type: 'string' } },
  required: ['problems', 'fixed', 'remaining', 'checker_output'] }

const res = await pipeline(args.parts,
  (p) => agent(`You are the motion designer adding explainer graphics to ${ctx(p)}\n\n${RULES}\n\n` +
    `Read the script for your sections, pick the moments, write the motion segments into the fragments, run the checker per section until there is no ERROR, then render a preview of each chunk range you changed and look at the frames: text must be readable, nothing cut off or overlapping, graphic on screen while its line is spoken. Fix layout args (node x/y, labels) if needed. Report every graphic you added with the exact script sentence that supports it.`,
    { label: `design ${p.ep} ${p.sections[0][0]}-${p.sections.at(-1)[0]}`, phase: 'Design', schema: OUT }),
  (d, p) => agent(`You are an adversarial fact and visual checker for ${ctx(p)}\n\n${RULES}\n\n` +
    `A motion designer just added these explainer graphics:\n${JSON.stringify(d ? d.added : [], null, 1)}\n\n` +
    `For each one: (1) every number, date, label and claim on screen is in the script with the same meaning and qualifiers (fix or remove anything that is not); (2) units are consistent (no bars mixing units, no chart implying precision the script does not give); (3) it is placed on the chunk where it is narrated; (4) render a preview of its chunk range and check frames — readable, nothing cut off or overlapping captions, not crowded out. Fix directly in the fragments, re-run the checker until no ERROR, and report.`,
    { label: `check ${p.ep} ${p.sections[0][0]}-${p.sections.at(-1)[0]}`, phase: 'Check', schema: CHK }))
return res.map((r, i) => ({ part: `${args.parts[i].ep} ${args.parts[i].sections[0][0]}-${args.parts[i].sections.at(-1)[0]}`, ...(r || { error: 'failed' }) }))
