"""음성 인식 (Whisper). Mac 은 mlx-whisper, 그 외는 faster-whisper."""
from __future__ import annotations

from pathlib import Path

from .util import VautoError, log, read_json, write_json


def pick_backend(name: str) -> str:
    if name in ("mlx", "faster", "none"):
        return name
    try:
        import mlx_whisper  # noqa: F401
        return "mlx"
    except Exception:
        pass
    try:
        import faster_whisper  # noqa: F401
        return "faster"
    except Exception:
        return "none"


_faster_models: dict = {}


def _run_mlx(wav: Path, cfg: dict, language: str | None) -> dict:
    import mlx_whisper

    result = mlx_whisper.transcribe(
        str(wav), path_or_hf_repo=cfg["model"], language=language, word_timestamps=True,
        condition_on_previous_text=False, initial_prompt=cfg.get("vocabulary") or None,
        hallucination_silence_threshold=2.0, verbose=None)
    segments = []
    for seg in result.get("segments", []):
        if seg.get("no_speech_prob", 0) > 0.6 and seg.get("avg_logprob", 0) < -1.0:
            continue
        words = [{"w": w["word"], "s": float(w["start"]), "e": float(w["end"])} for w in seg.get("words", [])]
        segments.append({"start": float(seg["start"]), "end": float(seg["end"]),
                         "text": seg["text"].strip(), "words": words,
                         "lp": float(seg.get("avg_logprob", 0.0))})
    return {"language": result.get("language", ""), "segments": segments}


def _run_faster(wav: Path, cfg: dict, language: str | None) -> dict:
    from faster_whisper import WhisperModel

    name = cfg.get("faster_model", "large-v3")
    if name not in _faster_models:
        _faster_models[name] = WhisperModel(name, device="auto", compute_type="int8")
    model = _faster_models[name]
    # 16kHz 모노 WAV 를 직접 읽어 넘긴다 (라이브러리 내부 디코더 버전 문제를 피함)
    import wave

    import numpy as np

    with wave.open(str(wav), "rb") as fh:
        audio = np.frombuffer(fh.readframes(fh.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
    segs, info = model.transcribe(
        audio, language=language, word_timestamps=True, vad_filter=True,
        condition_on_previous_text=False, initial_prompt=cfg.get("vocabulary") or None)
    segments = []
    for seg in segs:
        words = [{"w": w.word, "s": float(w.start), "e": float(w.end)} for w in (seg.words or [])]
        segments.append({"start": float(seg.start), "end": float(seg.end),
                         "text": seg.text.strip(), "words": words, "lp": float(seg.avg_logprob)})
    return {"language": info.language if segments else "", "segments": segments}


def run_once(wav: Path, cfg: dict, language: str | None = None) -> dict:
    """저장하지 않고 한 번 받아쓴다 (16kHz 모노 WAV)."""
    backend = pick_backend(cfg.get("backend", "auto"))
    if backend == "mlx":
        return _run_mlx(wav, cfg, language)
    if backend == "faster":
        return _run_faster(wav, cfg, language)
    raise VautoError("음성 인식 엔진이 없습니다 (mlx-whisper 또는 faster-whisper 필요).")


def _confidence(result: dict) -> float:
    segs = result["segments"]
    return sum(s.get("lp", 0.0) for s in segs) / len(segs) if segs else -99.0


def transcribe(wav: Path, cache: Path, cfg: dict, language: str = "auto",
               allowed: list[str] | None = None) -> dict:
    """결과: {"language": "ko", "segments": [{start, end, text, words}]}

    자동 감지한 언어가 allowed 밖이면(짧은 클립에서 흔한 오인식) allowed 언어를 하나씩
    지정해 다시 인식하고, 확신도가 가장 높은 결과를 쓴다.
    """
    if cache.exists():
        return read_json(cache)
    backend = pick_backend(cfg.get("backend", "auto"))
    if backend == "mlx":
        engine = _run_mlx
    elif backend == "faster":
        engine = _run_faster
    else:
        raise VautoError("음성 인식 엔진이 없습니다 (mlx-whisper 또는 faster-whisper 필요).")
    lang = None if language in ("", "auto") else language
    result = engine(wav, cfg, lang)
    if lang is None and allowed and result["segments"] and result["language"] not in allowed:
        wrong = result["language"]
        tries = [engine(wav, cfg, code) for code in allowed]
        for code, attempt in zip(allowed, tries):
            attempt["language"] = code
        result = max(tries, key=_confidence)
        log(f"    감지 언어 {wrong} 는 대상 언어가 아니어서 {result['language']} 로 다시 인식")
    result["segments"] = [s for s in result["segments"] if s["text"] and s["end"] > s["start"]]
    result["backend"] = backend
    write_json(cache, result)
    log(f"    인식 완료: {len(result['segments'])}개 구간, 언어={result['language'] or '-'}")
    return result
