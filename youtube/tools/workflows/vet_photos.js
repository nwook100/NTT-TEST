export const meta = {
  name: 'vet-photos',
  description: 'Visually vet downloaded Wikimedia photos for relevance, faces and quality before they go into the edit',
  phases: [
    { title: 'Inspect', detail: 'one agent per batch of photos, looks at each image' },
    { title: 'Second look', detail: 'independent re-check of borderline photos' },
  ],
}

const SCENES = {
  s01_seoul_skyline: 'Seoul skyline at night (Do Kwon grew up in Korea; Terraform founded in Seoul)',
  s01_gangnam: 'Gangnam / Teheran-ro, Seoul tech-startup district',
  s01_stanford: 'Stanford University (Kwon studied there)',
  s04_nationals_park: 'Nationals Park, Washington DC (Terraform sponsorship of the Washington Nationals)',
  s06_bitcoin: 'Bitcoin / crypto coins (Luna Foundation Guard bitcoin reserve)',
  s07_trading_screens: 'trading screens / stock-exchange displays (crypto crash)',
  s11_singapore: 'Singapore skyline (Kwon lived in Singapore)',
  s11_podgorica_airport: 'Podgorica airport, Montenegro (where Kwon was arrested)',
  s11_podgorica_city: 'Podgorica city, Montenegro',
  s11_interpol: 'Interpol headquarters, Lyon (red notice)',
  s12_courthouse_ny: 'federal courthouse in New York (SDNY, where Kwon was sentenced)',
  s12_sec_building: 'SEC headquarters building, Washington DC',
  s13_yeouido: 'Yeouido, Seoul financial district',
  s13_seoul_court: 'Seoul Southern District Court',
  s13_apartments: 'Seoul apartment complex (Korean retail investors)',
  s01_daegu_skyline: 'Daegu city skyline', s01_daegu_street: 'Daegu downtown street',
  s03_busan: 'Busan skyline', s05_taean: 'Taean coast, Korea west coast', s05_anmyeondo: 'Anmyeondo island, Taean',
  s05_yellow_sea: 'Yellow Sea fishing boat', s06_police_agency: 'Korean National Police Agency building',
  s06_prosecutors: 'Korean prosecutors office building', s07_weihai: 'Weihai city, China', s07_qingdao: 'Qingdao skyline, China',
  s08_gimhae_airport: 'Gimhae International Airport', s08_daegu_court: 'Daegu District Court', s08_supreme_court: 'Supreme Court of Korea',
  s10_seoul_court: 'Seoul Central District Court',
}

const VET = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          path: { type: 'string' },
          shows: { type: 'string', description: 'one plain sentence: what the photo actually shows' },
          matches_scene: { type: 'boolean', description: 'true only if it clearly depicts the intended scene/subject' },
          identifiable_person: { type: 'boolean', description: 'a real person is the subject or a face is large and recognizable' },
          problem_text_or_logo: { type: 'boolean', description: 'prominent third-party logo/branding, watermark, or text that would confuse viewers' },
          quality_ok: { type: 'boolean', description: 'sharp enough and well exposed for a 1080p documentary B-roll' },
          landscape_ok: { type: 'boolean', description: 'works when cropped to 16:9 landscape' },
          mood: { type: 'string', enum: ['dark', 'neutral', 'bright'] },
          verdict: { type: 'string', enum: ['keep', 'reject', 'borderline'] },
          reason: { type: 'string' },
        },
        required: ['path', 'shows', 'matches_scene', 'identifiable_person', 'problem_text_or_logo', 'quality_ok', 'landscape_ok', 'mood', 'verdict', 'reason'],
      },
    },
  },
  required: ['results'],
}

const RULES = `Rules for the verdict:
- reject if it does not clearly show the intended scene (e.g. a search for "trading screens" that returned an ornate door), if a real person is the subject or a face is large and recognizable, if a third-party logo/watermark dominates, or if quality is poor.
- borderline if relevance or a face is uncertain.
- reject if the intended scene names a place (a city, Korea, a court, an airport) and the photo is clearly somewhere else; "Korea"/"Korean" always means SOUTH Korea, so North Korean scenes, banknotes or vehicles are rejected. Generic scenes (massage chair, server room, crowd, courtroom, harbor at night) may be from anywhere if they look plausible and carry no foreign branding.
- reject cartoons, illustrations, AI art, postcards and satire images unless the scene asks for a graphic.
- keep otherwise. Crowds of small, unrecognizable people are fine. Building signs naming the place (e.g. an airport name) are fine and even useful.
Use the Read tool on each absolute image path to actually look at it; never judge from the filename.`

const items = args
const batches = []
for (let i = 0; i < items.length; i += 4) batches.push(items.slice(i, i + 4))
log(`${items.length} photos in ${batches.length} batches`)

const results = await pipeline(
  batches,
  (batch, _o, bi) => agent(
    `You are vetting B-roll photos for a faceless YouTube documentary channel (Asian fraud stories). For each photo below, open it with the Read tool and fill one result.\n\n` +
    batch.map(b => `- path: /home/user/NTT-TEST/${b.path}\n  intended scene: ${SCENES[b.scene] || b.scene}\n  Wikimedia title: ${b.commons_title}`).join('\n') +
    `\n\n${RULES}\nReturn path exactly as given (repo-relative form: ${batch.map(b => b.path).join(', ')}).`,
    { label: `inspect batch ${bi + 1}`, phase: 'Inspect', schema: VET, effort: 'low' }),
  (r, batch) => {
    if (!r) return null
    const border = r.results.filter(x => x.verdict === 'borderline' || (x.verdict === 'keep' && x.identifiable_person))
    if (!border.length) return r.results
    return agent(
      `Second, independent look at borderline B-roll photos for a faceless documentary channel. Open each with the Read tool. Decide keep or reject. Be strict about recognizable real people (reject) and about relevance to the intended scene.\n\n` +
      border.map(b => { const o = batch.find(x => x.path === b.path) || {}; return `- path: /home/user/NTT-TEST/${b.path}\n  intended scene: ${SCENES[o.scene] || o.scene}\n  first reviewer said: ${b.shows} / ${b.reason}` }).join('\n') +
      `\n\n${RULES}\nNo borderline allowed now: verdict must be keep or reject. Return path in repo-relative form (${border.map(b => b.path).join(', ')}).`,
      { label: 'second look', phase: 'Second look', schema: VET, effort: 'medium' })
      .then(r2 => {
        const by = Object.fromEntries((r2 ? r2.results : []).map(x => [x.path, x]))
        return r.results.map(x => by[x.path] ? { ...by[x.path], second_look: true } : x)
      })
  },
)
const flat = results.filter(Boolean).flat()
const keep = flat.filter(x => x.verdict === 'keep').length
log(`kept ${keep} / ${flat.length}`)
return flat
