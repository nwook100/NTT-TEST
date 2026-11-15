---
name: vauto
description: Make narration in the user's own cloned voice (Korean, English, Japanese) from a script or a topic, mix it onto a video, and auto-edit a folder of raw footage. Use when the user says things like "내 목소리로 만들어 줘", "대본 읽어 줘", "내레이션 만들어 줘", "영상에 목소리 입혀 줘", "영상 편집해 줘", "자막 만들어 줘".
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

## 6. Check the installation

```bash
/opt/homebrew/bin/vauto doctor
```

## Rules

- Never delete or overwrite the user's original video or audio files. vauto only writes into `_voice` and `_vauto` folders.
- If a command fails, show the user the last lines of the error instead of guessing a fix.
- Clips with no speech are not understood by content: `vauto run` simply uses the middle 5 seconds of each.
- vauto does not add background music and does not upload to any platform.
