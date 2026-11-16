"""내 목소리 내레이션: 목소리 등록 → 대본(직접 쓰거나 LLM 작성) → 번역 → 음성 합성 → 받아쓰기 검수 → 영상에 입히기.

음성 합성은 Qwen3-TTS(Apache-2.0) 를 이 컴퓨터 안에서 돌린다. 녹음 파일은 밖으로 나가지 않는다.
"""
from __future__ import annotations

import difflib
import os
import re
import shutil
import unicodedata
from pathlib import Path

from . import llm as llm_mod
from . import subs, transcribe
from .timeutil import srt_time
from .util import VautoError, log, read_json, run, write_json

TTS_LANG = {"ko": "Korean", "en": "English", "ja": "Japanese", "zh": "Chinese", "de": "German",
            "fr": "French", "ru": "Russian", "pt": "Portuguese", "es": "Spanish", "it": "Italian"}
SENTENCE_END = "。.!?！？…"


def voices_dir() -> Path:
    return Path(os.environ.get("VAUTO_HOME", Path.home() / ".vauto")) / "voices"


# ---------- 글 다루기 ----------

def split_script(text: str, max_units: int = 110) -> list[list[str]]:
    """대본을 문단 → 문장으로 나눈다. 너무 긴 문장은 쉼표에서 한 번 더 나눈다."""
    paragraphs = []
    for block in re.split(r"\n\s*\n", text.strip()):
        block = " ".join(line.strip() for line in block.splitlines() if not line.strip().startswith("#"))
        sentences, cur = [], ""
        for ch in block:
            cur += ch
            if ch in SENTENCE_END:
                sentences.append(cur)
                cur = ""
        if cur.strip():
            sentences.append(cur)
        merged: list[str] = []
        for s in (s.strip() for s in sentences):
            if not s:
                continue
            if merged and (all(c in SENTENCE_END + " " for c in s) or subs.width(merged[-1]) < 12):
                merged[-1] = (merged[-1] + " " + s).strip() if s[0] not in SENTENCE_END else merged[-1] + s
            else:
                merged.append(s)
        out = []
        for s in merged:
            if subs.width(s) > max_units and re.search(r"[,、，]", s):
                parts = [p.strip() for p in re.split(r"(?<=[,、，])", s) if p.strip()]
                cur = ""
                for p in parts:
                    if cur and subs.width(cur + p) > max_units:
                        out.append(cur)
                        cur = p
                    else:
                        cur = (cur + " " + p).strip()
                if cur:
                    out.append(cur)
            else:
                out.append(s)
        if out:
            paragraphs.append(out)
    return paragraphs


_DIGITS_KO = {"0": "영", "1": "일", "2": "이", "3": "삼", "4": "사", "5": "오", "6": "육", "7": "칠", "8": "팔", "9": "구"}


def normalize(text: str, lang: str) -> str:
    """비교용 정규화: 기호·공백 제거, 소문자, 일본어는 히라가나로."""
    text = unicodedata.normalize("NFKC", text).lower()
    if lang == "ja":
        try:
            import pykakasi

            text = "".join(item["hira"] for item in pykakasi.kakasi().convert(text))
        except Exception:
            pass
    return "".join(ch for ch in text if ch.isalnum())


def match_ratio(expected: str, heard: str, lang: str) -> float:
    """합성한 음성을 받아쓴 글이 대본과 얼마나 같은지 (0~1). 숫자 표기 차이는 감안한다."""
    a, b = normalize(expected, lang), normalize(heard, lang)
    if not a:
        return 1.0
    ratio = difflib.SequenceMatcher(None, a, b).ratio()
    if any(ch.isdigit() for ch in a + b):  # "일곱 시" 와 "7시" 처럼 숫자 표기가 달라도 감점하지 않도록
        strip = lambda s: re.sub(r"[0-9]+", "", s)  # noqa: E731
        ratio = max(ratio, difflib.SequenceMatcher(None, strip(a), strip(b)).ratio() - 0.03)
    return ratio


# ---------- 목소리 등록 ----------

def pick_window(segments: list[dict], lo: float = 6.0, hi: float = 12.0) -> tuple[float, float, str] | None:
    """녹음에서 기준으로 쓸 6~12초 구간을 고른다. 인식 확신도가 높고 끊김이 적은 곳."""
    best, best_score = None, -1e9
    for i in range(len(segments)):
        for j in range(i, len(segments)):
            if j > i and segments[j]["start"] - segments[j - 1]["end"] > 1.5:
                break
            dur = segments[j]["end"] - segments[i]["start"]
            if dur > hi:
                break
            if dur < lo:
                continue
            chunk = segments[i:j + 1]
            score = sum(s.get("lp", -0.3) for s in chunk) / len(chunk) - 0.01 * i + 0.01 * dur
            if score > best_score:
                best_score = score
                best = (chunk[0]["start"], chunk[-1]["end"], " ".join(s["text"] for s in chunk))
    return best


def add_voice(audio: Path, name: str, cfg: dict, text: str = "", lang: str = "ko") -> Path:
    """녹음 파일에서 기준 음성(24kHz 모노)과 그 글을 뽑아 저장한다."""
    if not audio.is_file():
        raise VautoError(f"녹음 파일이 없습니다: {audio}")
    home = voices_dir() / name
    home.mkdir(parents=True, exist_ok=True)
    full = home / "full_16k.wav"
    run(["ffmpeg", "-v", "error", "-y", "-i", str(audio), "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", str(full)])
    start, end = 0.0, 0.0
    if text:  # 글을 직접 준 경우: 녹음 전체(최대 15초)를 기준으로
        dur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(full)]).stdout)
        end = min(dur, 15.0)
        if dur > 15.5:
            log("  녹음이 15초보다 길어 앞 15초만 씁니다. 글도 그 부분만 적어 주세요.")
    else:
        result = transcribe.run_once(full, cfg["whisper"], lang)
        window = pick_window(result["segments"])
        if not window:
            raise VautoError("기준으로 쓸 6~12초 구간을 찾지 못했습니다. 조용한 곳에서 10초 이상 이어서 읽어 주세요.")
        start, end, text = window
        start, end = max(0.0, start - 0.15), end + 0.2
    ref = home / "ref.wav"
    run(["ffmpeg", "-v", "error", "-y", "-ss", f"{start:.2f}", "-to", f"{end:.2f}", "-i", str(audio),
         "-af", "highpass=f=70,loudnorm=I=-20:TP=-2:LRA=11", "-ac", "1", "-ar", "24000", "-c:a", "pcm_s16le", str(ref)])
    full.unlink(missing_ok=True)
    write_json(home / "voice.json", {"name": name, "lang": lang, "text": text.strip(),
                                     "source": str(audio.resolve()), "start": round(start, 2), "end": round(end, 2)})
    return home


def load_voice(name: str) -> tuple[Path, str]:
    home = voices_dir() / name
    if not (home / "ref.wav").exists():
        raise VautoError(f"등록된 목소리 '{name}' 가 없습니다. 먼저: vauto voice-add 녹음파일")
    return home / "ref.wav", read_json(home / "voice.json")["text"]


# ---------- 음성 합성 ----------

class Engine:
    """Qwen3-TTS. Apple Silicon 은 GPU(MPS)를 먼저 쓰고, 안 되면 CPU 로 다시 한다."""

    def __init__(self, cfg: dict, ref_audio: Path, ref_text: str):
        self.cfg, self.ref_audio, self.ref_text = cfg, ref_audio, ref_text
        self.model = self.prompt = None
        self.device = ""

    def _devices(self) -> list[str]:
        import torch

        want = self.cfg.get("device", "auto")
        if want != "auto":
            return [want]
        if torch.backends.mps.is_available():
            return ["mps", "cpu"]
        return ["cuda:0", "cpu"] if torch.cuda.is_available() else ["cpu"]

    def _load(self, device: str) -> None:
        os.environ.setdefault("PYTORCH_ENABLE_MPS_FALLBACK", "1")
        import torch
        from qwen_tts import Qwen3TTSModel

        log(f"  음성 모델 불러오는 중: {self.cfg['model']} ({device})")
        self.model = Qwen3TTSModel.from_pretrained(self.cfg["model"], device_map=device, dtype=torch.float32)
        self.prompt = self.model.create_voice_clone_prompt(ref_audio=str(self.ref_audio), ref_text=self.ref_text)
        self.device = device

    def speak(self, text: str, lang: str):
        """(파형, 샘플레이트)"""
        try:
            import qwen_tts  # noqa: F401
        except ImportError as exc:
            raise VautoError("음성 합성 부품이 없습니다. setup-voice.sh 를 먼저 실행하세요.") from exc
        last: Exception | None = None
        for device in ([self.device] if self.model is not None else self._devices()):
            try:
                if self.model is None:
                    self._load(device)
                wavs, sr = self.model.generate_voice_clone(
                    text=text, language=TTS_LANG.get(lang, "Auto"), voice_clone_prompt=self.prompt)
                return wavs[0], sr
            except Exception as exc:  # GPU 에서 실패하면 CPU 로 한 번 더
                last = exc
                log(f"  {device} 에서 실패: {str(exc)[:120]}")
                was, self.model = self.device or device, None
                if was != "cpu" and self.cfg.get("device", "auto") == "auto":
                    try:
                        self._load("cpu")
                        wavs, sr = self.model.generate_voice_clone(
                            text=text, language=TTS_LANG.get(lang, "Auto"), voice_clone_prompt=self.prompt)
                        return wavs[0], sr
                    except Exception as exc2:
                        last = exc2
                break
        raise VautoError(f"음성 합성 실패: {last}")


class MlxEngine:
    """애플 MLX 로 돌리는 Qwen3-TTS (mlx-audio). Apple Silicon 전용이고 더 빠르다."""

    def __init__(self, cfg: dict, ref_audio: Path, ref_text: str):
        self.cfg, self.ref_audio, self.ref_text = cfg, ref_audio, ref_text
        self.model = None
        self.lang_key = ""

    def speak(self, text: str, lang: str):
        import inspect

        import numpy as np

        if self.model is None:
            from mlx_audio.tts.utils import load_model

            log(f"  음성 모델 불러오는 중: {self.cfg['mlx_model']} (MLX)")
            self.model = load_model(self.cfg["mlx_model"])
            params = inspect.signature(self.model.generate).parameters
            self.lang_key = "language" if "language" in params else "lang_code" if "lang_code" in params else ""
        kwargs = {"text": text, "ref_audio": str(self.ref_audio), "ref_text": self.ref_text}
        if self.lang_key and lang in TTS_LANG:
            kwargs[self.lang_key] = TTS_LANG[lang]
        results = list(self.model.generate(**kwargs))
        if not results:
            raise VautoError("MLX 음성 합성 결과가 비어 있습니다.")
        wave = np.concatenate([np.asarray(r.audio, dtype=np.float32).reshape(-1) for r in results])
        rate = int(getattr(results[0], "sample_rate", 0) or getattr(self.model, "sample_rate", 0) or 24000)
        return wave, rate


class AutoEngine:
    """맥에서는 MLX 를 먼저 쓰고, 설치가 안 돼 있거나 실패하면 PyTorch 판으로 넘어간다."""

    def __init__(self, cfg: dict, ref_audio: Path, ref_text: str):
        self.args = (cfg, ref_audio, ref_text)
        self.backend = cfg.get("backend", "auto")
        self.engine = None
        self.name = ""

    def _candidates(self) -> list[str]:
        if self.backend in ("mlx", "torch"):
            return [self.backend]
        import importlib.util

        order = []
        if importlib.util.find_spec("mlx_audio"):
            order.append("mlx")
        if importlib.util.find_spec("qwen_tts"):
            order.append("torch")
        if not order:
            raise VautoError("음성 합성 부품이 없습니다. setup-voice.sh 를 먼저 실행하세요.")
        return order

    def speak(self, text: str, lang: str):
        if self.engine is not None:
            return self.engine.speak(text, lang)
        last: Exception | None = None
        for name in self._candidates():
            engine = MlxEngine(*self.args) if name == "mlx" else Engine(*self.args)
            try:
                out = engine.speak(text, lang)
                self.engine, self.name = engine, name
                return out
            except Exception as exc:
                last = exc
                log(f"  {name} 방식 실패, 다음 방식으로: {str(exc)[:160]}")
        hint = ""
        if self.name == "" and "mlx" in self._candidates():
            hint = "\n  MLX 방식이 안 되면 PyTorch 방식으로 바꿔 설치하세요: setup-voice.sh --torch"
        raise VautoError(f"음성 합성 실패: {last}{hint}")


def synthesize(engine, paragraphs: list[list[str]], lang: str, cfg: dict, whisper_cfg: dict,
               work: Path, verify: bool = True) -> tuple[Path, list[dict], list[str]]:
    """문장마다 만들고, 받아써서 대본과 다르면 다시 만든다. (wav 경로, 자막 큐, 경고)"""
    import numpy as np
    import soundfile as sf

    work.mkdir(parents=True, exist_ok=True)
    pieces, cues, warnings = [], [], []
    pos, sr_out = 0.0, 24000
    total = sum(len(p) for p in paragraphs)
    done = 0
    for pi, para in enumerate(paragraphs):
        for si, sentence in enumerate(para):
            done += 1
            best_wave, best_ratio, heard = None, -1.0, ""
            for take in range(max(1, cfg["takes"])):
                wave, sr_out = engine.speak(sentence, lang)
                wave = np.asarray(wave, dtype=np.float32)
                if not verify:
                    best_wave, best_ratio = wave, 1.0
                    break
                tmp, tmp16 = work / "take.wav", work / "take16.wav"
                sf.write(tmp, wave, sr_out)
                run(["ffmpeg", "-v", "error", "-y", "-i", str(tmp), "-ac", "1", "-ar", "16000", str(tmp16)])
                got = " ".join(s["text"] for s in transcribe.run_once(tmp16, whisper_cfg, lang)["segments"])
                ratio = match_ratio(sentence, got, lang)
                if ratio > best_ratio:
                    best_wave, best_ratio, heard = wave, ratio, got
                if ratio >= cfg["min_match"]:
                    break
            log(f"    [{lang}] {done}/{total} 일치 {best_ratio:.0%}  {sentence[:40]}")
            if verify and best_ratio < cfg["min_match"]:
                warnings.append(f"[{lang}] 발음이 대본과 다를 수 있음 (일치 {best_ratio:.0%}): "
                                f"\"{sentence}\" → 들린 말 \"{heard}\"")
            dur = len(best_wave) / sr_out
            cues.append({"start": pos, "end": pos + dur, "text": sentence, "lang": lang, "scene": pi + 1})
            pieces.append(best_wave)
            last_sentence = si == len(para) - 1
            last_all = last_sentence and pi == len(paragraphs) - 1
            if not last_all:
                gap = cfg["para_pause"] if last_sentence else cfg["pause"]
                pieces.append(np.zeros(int(gap * sr_out), dtype=np.float32))
                pos += gap
            pos += dur
    raw = work / f"raw_{lang}.wav"
    sf.write(raw, np.concatenate(pieces), sr_out)
    for name in ("take.wav", "take16.wav"):
        (work / name).unlink(missing_ok=True)
    return raw, cues, warnings


def finish_audio(raw: Path, out_wav: Path, lufs: float = -16.0) -> None:
    """음량을 맞추고 48kHz 로 저장. 길이는 바뀌지 않는다."""
    out_wav.parent.mkdir(parents=True, exist_ok=True)
    run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-af", f"loudnorm=I={lufs}:TP=-1.5:LRA=11",
         "-ar", "48000", "-ac", "1", "-c:a", "pcm_s16le", str(out_wav)])


def scene_table(cues: list[dict]) -> list[dict]:
    """문단(=장면)별 시작·끝·길이. 화면을 내레이션 길이에 맞춰 준비할 때 쓴다."""
    scenes: dict[int, dict] = {}
    for cue in cues:
        sc = scenes.setdefault(cue.get("scene", 1), {"scene": cue.get("scene", 1), "start": cue["start"],
                                                    "end": cue["end"], "text": ""})
        sc["end"] = cue["end"]
        sc["text"] = (sc["text"] + " " + cue["text"]).strip()
    out = []
    for sc in sorted(scenes.values(), key=lambda x: x["scene"]):
        out.append({"scene": sc["scene"], "start": round(sc["start"], 2), "end": round(sc["end"], 2),
                    "seconds": round(sc["end"] - sc["start"], 2), "text": sc["text"]})
    return out


def write_srt(path: Path, cues: list[dict], lang: str, sub_cfg: dict) -> None:
    lines = []
    for i, cue in enumerate(cues, 1):
        lines += [str(i), f"{srt_time(cue['start'])} --> {srt_time(cue['end'])}",
                  *subs.wrap(cue["text"], lang, sub_cfg), ""]
    path.write_text("\n".join(lines), encoding="utf-8")


def mix_to_video(video: Path, narration: Path, out: Path, bg_volume: float) -> None:
    """영상에 내레이션을 입힌다. 원래 소리는 작게 깔고, 영상 화면은 다시 인코딩하지 않는다."""
    probe = run(["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries", "stream=index",
                 "-of", "csv=p=0", str(video)]).stdout.strip()
    out.parent.mkdir(parents=True, exist_ok=True)
    if probe:
        graph = (f"[0:a:0]volume={bg_volume}[bg];[1:a]aresample=48000,apad[nar];"
                 f"[bg][nar]amix=inputs=2:duration=first:normalize=0[a]")
    else:
        graph = "[1:a]aresample=48000,apad[a]"
    run(["ffmpeg", "-v", "error", "-y", "-i", str(video), "-i", str(narration), "-filter_complex", graph,
         "-map", "0:v:0", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "256k",
         "-ar", "48000", "-ac", "2", "-shortest",
         "-movflags", "+faststart", str(out)])


# ---------- 대본 ----------

SCRIPT_SCHEMA = {"type": "object",
                 "properties": {"lines": {"type": "array", "items": {"type": "string"}}},
                 "required": ["lines"]}


def write_script(model: llm_mod.LLM, topic: str, seconds: int, lang: str) -> str:
    """LLM 이 주제만 보고 내레이션 대본을 쓴다. (영상을 보고 쓰는 것은 아니다.)"""
    name = llm_mod.LANG_NAME.get(lang, lang)
    chars = seconds * (5 if lang in subs.CJK else 14)
    system = (f"You write voice-over narration for a short video, in {name}. Write natural spoken "
              f"sentences in the first person, about {chars} characters in total (roughly {seconds} seconds "
              "when read aloud). One sentence per line, each short enough to say in one breath. "
              "No emojis, no hashtags, no stage directions, no speaker labels.")
    data = model.json(system, f"Topic and notes from the creator:\n{topic}", SCRIPT_SCHEMA, 0.7)
    lines = [str(x).strip() for x in data.get("lines", []) if str(x).strip()]
    if not lines:
        raise VautoError("LLM 이 대본을 쓰지 못했습니다.")
    return "\n".join(lines)


def run_voice(script: str, src_lang: str, langs: list[str], voice_name: str, cfg: dict, out: Path,
              model: llm_mod.LLM | None, video: Path | None = None, verify: bool = True,
              engine=None) -> dict:
    """대본 하나로 언어별 내레이션을 만든다."""
    vcfg = cfg["voice"]
    paragraphs = {src_lang: split_script(script)}
    if not paragraphs[src_lang]:
        raise VautoError("대본이 비어 있습니다.")
    warnings: list[str] = []
    flat = [s for p in paragraphs[src_lang] for s in p]
    for lang in langs:
        if lang == src_lang:
            continue
        if not model:
            warnings.append(f"LLM 을 쓰지 못해 {lang} 번역을 건너뜀")
            continue
        log(f"  대본 번역 {src_lang} → {lang}: {len(flat)}문장")
        texts, failed = llm_mod.translate(model, flat, src_lang, lang, cfg["project"]["brief"], cfg["glossary"])
        if failed:
            warnings.append(f"{lang} 번역 {failed}문장 실패 (그 문장은 원문 그대로 읽음)")
        it = iter(texts)
        paragraphs[lang] = [[next(it) for _ in p] for p in paragraphs[src_lang]]
    if engine is None:
        ref_audio, ref_text = load_voice(voice_name)
        engine = AutoEngine(vcfg, ref_audio, ref_text)
    out.mkdir(parents=True, exist_ok=True)
    work = out / ".work"
    results = {"files": [], "warnings": warnings, "seconds": {}}
    for lang in [x for x in langs if x in paragraphs]:
        log(f"  [{lang}] 음성 만들기")
        (out / f"script.{lang}.txt").write_text(
            "\n\n".join("\n".join(p) for p in paragraphs[lang]) + "\n", encoding="utf-8")
        raw, cues, warn = synthesize(engine, paragraphs[lang], lang, vcfg, cfg["whisper"], work, verify)
        warnings += warn
        wav = out / f"narration.{lang}.wav"
        finish_audio(raw, wav, vcfg["lufs"])
        write_srt(out / f"narration.{lang}.srt", cues, lang, cfg["subtitles"])
        write_json(out / f"scenes.{lang}.json", scene_table(cues))
        results["files"] += [str(wav), str(out / f"narration.{lang}.srt"), str(out / f"scenes.{lang}.json")]
        results["seconds"][lang] = round(cues[-1]["end"], 1)
        if video:
            target = out / f"{video.stem}.{lang}.mp4"
            mix_to_video(video, wav, target, vcfg["bg_volume"])
            results["files"].append(str(target))
            vdur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                              str(video)]).stdout)
            if cues[-1]["end"] > vdur + 0.3:
                warnings.append(f"[{lang}] 내레이션({cues[-1]['end']:.0f}초)이 영상({vdur:.0f}초)보다 길어 뒷부분이 잘림")
    shutil.rmtree(work, ignore_errors=True)
    return results
