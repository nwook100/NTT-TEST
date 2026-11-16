---
name: video-plan
description: Plan an explainer video (a 10-minute long-form video or a Short) from a topic - write the Korean script, split it into scenes, list the facts the user must verify, then make the narration in the user's own voice with vauto. Use when the user says things like "영상 기획해 줘", "대본 써 줘", "장면 나눠 줘", "쇼츠 기획", "10분 영상 만들자".
---

# video-plan: from a topic to a script, scene table and narration

This skill is for explainer videos about why everyday objects are built the way they are
(mechanisms, dimensions, materials, manufacturing, price). A long video is NOT generated in one go:
it is 30-40 short scenes placed on top of a narration track. Your job here is the plan and the
narration. You do not generate the pictures.

Work in a new folder per video: `~/Documents/vauto/<short-topic-name>/`.
Reply to the user in Korean.

## Step 1. Agree on the format

Ask only if the user did not say:

- Long-form (about 10 minutes, 30-40 scenes of 15-20 seconds) or Short (under 60 seconds, 5-7 scenes).
- The one question the video answers. Titles are a single question, e.g. "기차 레일 폭은 왜 1435mm일까?".

## Step 2. Write the script (Korean)

- Spoken style, short sentences, one idea per sentence. No emojis, no stage directions.
- Start with the question and a concrete everyday moment. End by answering the question in one sentence.
- One paragraph per scene, separated by ONE blank line. A scene is 2-4 sentences.
- Do not invent numbers, years, names, patent numbers or quotes. If you are not sure, write the
  sentence without the number and add the item to the fact list in step 3.

Save it as `script.txt` in the video folder (UTF-8).

## Step 3. Fact list - stop and ask

Local models get facts wrong. Before any narration is made, write `facts.md` listing every number,
year, name and cause-and-effect claim in the script, one per line, each marked as
"확인 필요" unless the user gave it to you. Show the list to the user and wait for them to confirm
or correct it. Fix the script with their corrections. Never skip this step.

## Step 4. Scene table

Write `scenes.md` with one row per scene:

| # | 종류 | 화면 설명 | 내레이션 |
|---|---|---|---|

Choose `종류` from exactly these four:

- `3D` - cutaway or mechanism animation. Use for anything that must be mechanically accurate.
  Roughly half of the scenes. Note which parts must be visible and what moves.
- `분위기` - a mood shot (AI image turned into a short clip). Only for intros, transitions and
  period scenery. Never for showing how a mechanism works.
- `자료` - a real photo, patent drawing or old document with slow zoom or pan.
- `도표` - numbers, comparisons, timelines as on-screen text or a chart.

Keep `분위기` scenes to about 10 or fewer for a long video.

## Step 5. Narration in the user's voice

Use the vauto skill. Korean only first, so the user can check wording and pace:

```bash
/opt/homebrew/bin/vauto voice ~/Documents/vauto/<short-topic-name>/script.txt --langs ko --out ~/Documents/vauto/<short-topic-name>/voice
```

This takes several minutes for a long script. Use a timeout of at least 1800 seconds.

## Step 6. Report

Read `voice/scenes.ko.json` (one entry per scene with `seconds`) and add a `길이(초)` column to
`scenes.md`. Then tell the user:

- total narration length and the three longest scenes,
- any lines under "확인할 점" from the vauto output,
- the list of pictures or clips they still need to make, grouped by `종류`, each with its length.

English and Japanese narration are made only when the user asks:

```bash
/opt/homebrew/bin/vauto voice ~/Documents/vauto/<short-topic-name>/script.txt --langs en,ja --out ~/Documents/vauto/<short-topic-name>/voice
```

## Rules

- Do not run narration before the user has confirmed the fact list.
- Do not overwrite a script the user has edited; save a new version (`script-v2.txt`) instead.
- If the user gives their own script, skip step 2 but still do steps 3 to 6.
