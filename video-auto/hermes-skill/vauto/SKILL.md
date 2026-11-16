---
name: vauto
description: Make narration in the user's own cloned voice (Korean, English, Japanese), generate AI images and short AI video clips, mix narration onto a video, and auto-edit a folder of raw footage. Use when the user says things like "내 목소리로 만들어 줘", "내레이션 만들어 줘", "그림 만들어 줘", "이 사진 움직이게 해 줘", "AI 영상 만들어 줘", "분위기 컷 만들어 줘", "영상 편집해 줘", "자막 만들어 줘".
---

# vauto: local video editing and voice narration

`vauto` is a command-line tool already installed on this Mac. It runs entirely on this machine.
Always call it by its full path: `/opt/homebrew/bin/vauto`.

Commands take a long time (1 to 20 minutes). Run them with a generous timeout (at least 1800 seconds)
and wait for them to finish. Do not run the same command twice in parallel.

## 1. Narration in the user's voice from a script

When the user gives you script text and asks for it in their voice:

1. Save the script exactly as given to a new UTF-8 text file. Do not rewrite or shorten it unless asked.
   Use a folder like `~/Documents/vauto/` and a file name such as `script-20261115-2130.txt`.
   One blank line between paragraphs. Lines starting with `#` are not read aloud.
2. Run:

```bash
/opt/homebrew/bin/vauto voice ~/Documents/vauto/script-20261115-2130.txt
```

3. When it finishes, tell the user where the files are (the command prints them) and repeat any
   lines under "확인할 점" (things to check), such as a sentence that was mispronounced.

Useful options:

| Option | Meaning |
|---|---|
| `--langs ko` | Only Korean. Default is `ko,en,ja` (the script is translated by the local LLM). |
| `--langs ko,en` | Korean and English only. |
| `--script-lang en` | The script is written in English (default: Korean). |
| `--video /path/to/video.mp4` | Also mix the narration onto this video. One output video per language. |
| `--out /path/to/folder` | Where to write results. Default: a `_voice` folder next to the script. |
| `--no-llm` | No translation, script language only. |

Results in the output folder: `narration.ko.wav`, `narration.en.wav`, `narration.ja.wav`, matching `.srt`
subtitles, `script.<lang>.txt` (what was actually read), and `<video name>.<lang>.mp4` when `--video` is used.

## 2. Narration from a topic (the tool writes the script)

```bash
/opt/homebrew/bin/vauto voice --topic "삿포로 여행 첫날. 오타루 항구를 걷고 시장에서 해산물 덮밥을 먹었다" --seconds 40 --out ~/Documents/vauto/sapporo-day1
```

Prefer writing the script yourself with the user and using section 1 when they care about wording.

## 3. Redo one language with the same script

```bash
/opt/homebrew/bin/vauto voice ~/Documents/vauto/_voice/script.ja.txt --script-lang ja --langs ja --out ~/Documents/vauto/_voice
```

## 4. Register or replace the user's voice (rarely needed)

Needs a quiet recording of the user reading for 10 seconds or more.

```bash
/opt/homebrew/bin/vauto voice-add ~/Desktop/voice_1.m4a
```

If the command says the voice `me` is not registered, ask the user for the recording file and run this first.

## 5. Auto-edit a folder of raw footage

Cuts silences, corrects color, writes Korean/English/Japanese subtitles, and exports files for
YouTube, Shorts, Reels, X and Threads plus a Final Cut Pro project.

```bash
/opt/homebrew/bin/vauto run "/path/to/footage folder"
```

Results go to a `_vauto` folder inside the footage folder. Read `_vauto/report.md` and summarize it for the user.
Add `--no-render` to produce only subtitles and the Final Cut project (much faster).

## 6. AI image (scene still)

Write the prompt in English: subject, setting, light, style. Takes under a few minutes.

```bash
/opt/homebrew/bin/vauto image "a chrome toaster on a wooden kitchen table, soft morning light, product photo" --out ~/Documents/vauto/gen/toaster.png
```

Add `--vertical` for a 9:16 image. Add `--ref photo.jpg` to use a reference photo.

## 7. AI video clip (5 to 10 seconds, mood shots only)

Best results come from animating a still image: make or pick an image first, then:

```bash
/opt/homebrew/bin/vauto clip "slow camera push in, steam rising, warm light" --image ~/Documents/vauto/gen/toaster.png --seconds 5 --out ~/Documents/vauto/gen/toaster.mp4
```

Text only (no image) also works:

```bash
/opt/homebrew/bin/vauto clip "a quiet harbor town at dawn, snow falling, cinematic" --seconds 5
```

| Option | Meaning |
|---|---|
| `--model ltx` | Default. LTX-2.3, generates sound together with the picture. |
| `--model wan` | Wan 2.2 5B. Do NOT use: it currently crashes at the last step on this Mac. |
| `--model wan14` | Wan 2.2 14B image-to-video, higher quality, slower. Needs `--image`. Experimental. |
| `--seconds 5` | Length. Keep between 2 and 10. |
| `--vertical` | 9:16 for Shorts. |
| `--seed 7` | Same number gives the same result again. |
| `--enhance` | The tool rewrites a short idea (Korean is fine) into a detailed English prompt. Use it unless you already wrote 4-6 detailed sentences. |
| `--size 1080` | 1080p instead of 720p. More than twice as slow. |
| `--quality high` | Full (non-distilled) LTX model. Much slower. Only when the user asks for higher quality. |

A clip can take many minutes. Use a timeout of at least 3600 seconds, or start it with
`nohup ... > ~/Documents/vauto/gen/job.log 2>&1 &` and check the log later. Run one clip at a time.
The first use of each model downloads tens of GB.

To make a clip look less "AI-made": start from a real photo the user took (`--image`), and describe
only the motion, the camera move and the sound in concrete terms. Avoid words like cinematic or stunning.

Never use AI clips to show how a mechanism works inside: the result looks plausible but is wrong.
Use them for intros, transitions and scenery. When a clip comes out badly, change the prompt or
the seed and try again; tell the user how many tries it took.

## 8. Check the installation

```bash
/opt/homebrew/bin/vauto doctor
```

## Rules

- Never delete or overwrite the user's original video or audio files. vauto only writes into `_voice` and `_vauto` folders.
- If a command fails, show the user the last lines of the error instead of guessing a fix.
- Clips with no speech are not understood by content: `vauto run` simply uses the middle 5 seconds of each.
- vauto does not add background music and does not upload to any platform.
- Run only one heavy job at a time (a clip, a narration, or a footage edit): they share the same memory.
