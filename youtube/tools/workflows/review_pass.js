export const meta = {
  name: 'review-pass',
  description: 'Watch the rendered animatic section by section (contact sheets), fix the edit, re-render the section to confirm',
  phases: [
    { title: 'Review', detail: 'one reviewer per section looks at the frames against the narration and fixes the fragment' },
  ],
}

// args: { ep, epdir, script, sections: [{num,title,ids}] }
const R = '/home/user/NTT-TEST/'
const pad = n => String(n).padStart(2, '0')
const OUT = { type: 'object', properties: {
  problems_seen: { type: 'array', items: { type: 'string' } }, fixed: { type: 'array', items: { type: 'string' } },
  remaining: { type: 'array', items: { type: 'string' } }, confirmed_by_rerender: { type: 'boolean' } },
  required: ['problems_seen', 'fixed', 'remaining', 'confirmed_by_rerender'] }

const res = await pipeline(args.sections, (s) => agent(
  `You are the final-review editor for section ${s.num} ("${s.title}", chunk ids ${s.ids[0]}–${s.ids[1]}) of ${args.ep} of the documentary "Paper Tiger Files". You will render a 480p preview of your section with the real narration and burned captions.\n\n` +
  `First render your section and make its contact sheet:\n` +
  `python3 ${R}youtube/tools/merge_edl.py ${args.ep} ${args.epdir} && nice -n 5 python3 ${R}youtube/tools/assemble.py --edl ${R}youtube/edit/${args.ep}_edl.json --manifest ${R}youtube/output/${args.ep}/narration/manifest.json --narration ${R}youtube/output/${args.ep}/narration/narration.wav --srt ${R}youtube/output/${args.ep}/narration/captions.srt --out /tmp/review_${args.ep}_s${pad(s.num)}.mp4 --preview --from-chunk ${s.ids[0]} --to-chunk ${s.ids[1]}\n` +
  `python3 ${R}youtube/tools/section_sheets.py /tmp/review_${args.ep}_s${pad(s.num)}.mp4 ${R}youtube/output/${args.ep}/narration/manifest.json /tmp/review_${args.ep}_s${pad(s.num)} --t0 <start of chunk ${s.ids[0]} in the manifest>\n` +
  `Then open /tmp/review_${args.ep}_s${pad(s.num)}/s${pad(s.num)}.jpg with Read (a frame every 2.5 s, timestamps relative to the section start) and compare it with the narration timing in ${R}youtube/output/${args.ep}/narration/manifest.json (each chunk's start/end/text), the script ${R}${args.script} and the fragment ${R}youtube/edit/frag/${args.ep}_s${pad(s.num)}.json. Asset list: ${R}youtube/edit/${args.ep}_assets.md. Extract exact frames with ffmpeg when a moment needs a closer look.\n\n` +
  `Find real problems a viewer would notice: a visual that contradicts or distracts from what is being said at that moment; black or empty frames that are not intended; on-screen text that is cut off, overlaps the captions, misspelt, or not supported by the script (legal qualifiers must stay); graphics that appear long before/after the line they belong to; the same shot twice in a row; a photo of a recognisable person; awkward pacing (a still held far too long). Ignore taste-level nitpicks.\n\n` +
  `Fix the fragment (smallest change), validate with python3 ${R}youtube/tools/edl_check.py ${R}youtube/edit/frag/${args.ep}_s${pad(s.num)}.json ${R}youtube/edit/${args.ep}_chunks.json --section ${s.num}, then confirm by re-rendering just this section:\n` +
  `python3 ${R}youtube/tools/merge_edl.py ${args.ep} ${args.epdir} && nice -n 5 python3 ${R}youtube/tools/assemble.py --edl ${R}youtube/edit/${args.ep}_edl.json --manifest ${R}youtube/output/${args.ep}/narration/manifest.json --narration ${R}youtube/output/${args.ep}/narration/narration.wav --srt ${R}youtube/output/${args.ep}/narration/captions.srt --out /tmp/review_${args.ep}_s${pad(s.num)}.mp4 --preview --from-chunk ${s.ids[0]} --to-chunk ${s.ids[1]}\n` +
  `then make a fresh sheet the same way and look at it. If nothing needed fixing, say so and skip the second render. Only edit your own section's fragment.`,
  { label: `review ${args.ep} s${pad(s.num)}`, phase: 'Review', schema: OUT }))
return res.map((r, i) => ({ section: args.sections[i].num, ...(r || { error: 'failed' }) }))
