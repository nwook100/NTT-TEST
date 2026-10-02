# Writes edit/<ep>_chunks.json: the narration chunk plan (same ids narrate.py uses) with estimated durations,
# so the edit (EDL) can be built before the voice is generated. Usage: python chunk_sheet.py <script.md> <out.json>
import json, sys
from narrate import parse, plan_chunks
WPS = 2.45   # measured narration pace is updated here once real audio exists
chunks = plan_chunks(parse(sys.argv[1]))
for c in chunks:
    c["est_dur"] = round(len(c["text"].split()) / WPS + 0.3, 2)
json.dump({"script": sys.argv[1], "wps": WPS, "chunks": chunks}, open(sys.argv[2], "w"), indent=1, ensure_ascii=False)
print(sys.argv[2], len(chunks), "chunks", round(sum(c["est_dur"] + c["gap_after"] for c in chunks) / 60, 1), "min est")
