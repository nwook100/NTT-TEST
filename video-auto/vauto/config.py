"""기본 설정과 project.toml 병합."""
from __future__ import annotations

import copy
import tomllib
from pathlib import Path

DEFAULTS: dict = {
    "project": {
        "name": "",
        "brief": "",                      # 영상 의도. LLM 이 편집 방향을 잡는 데 쓴다.
        "languages": ["ko", "en", "ja"],  # 만들 자막 언어
        "source_language": "auto",        # 말한 언어. auto 면 클립마다 자동 감지
        "spoken_languages": [],           # 영상에 나올 수 있는 언어. 비우면 languages 와 같음
    },
    "edit": {
        "cut_silence": True,   # 말 사이 침묵을 잘라낸다
        "merge_gap": 0.6,      # 이 초보다 짧은 쉼은 자르지 않는다
        "pad_before": 0.15,    # 말 시작 전 여유
        "pad_after": 0.25,     # 말 끝난 뒤 여유
        "min_unit": 0.7,       # 이보다 짧은 조각은 버린다
        "broll_max": 5.0,      # 말이 없는 클립은 가운데 이 초만 쓴다 (0 = 전체)
        "target_sec": 0,       # 본편 목표 길이. 0 = 군더더기만 제거
        "use_llm": True,       # LLM 으로 NG 컷·중복 제거와 제목/설명 생성
        "allow_reorder": False,
    },
    "short": {"enabled": True, "max_sec": 60},
    "whisper": {
        "backend": "auto",   # auto | mlx | faster | none
        "model": "mlx-community/whisper-large-v3-mlx",
        "faster_model": "large-v3",
        "vocabulary": "",    # 자주 나오는 고유명사·전문용어 (인식률 향상)
    },
    "llm": {
        "base_url": "http://localhost:11434/v1",
        "model": "qwen3.8:27b",
        "timeout": 600,
        "batch": 30,
    },
    "glossary": {},  # "핀 보트" = { en = "pin boat", ja = "ピンボート" }
    "color": {
        "auto": True,
        "strength": 0.6,   # 0 = 보정 없음, 1 = 최대
        "saturation": 1.0,
        "input_lut": "",   # Log 촬영본용 변환 LUT (.cube)
        "look_lut": "",    # 분위기(색감)용 LUT (.cube)
    },
    "subtitles": {
        "max_chars": {"ko": 18, "ja": 16, "en": 38},  # 한 줄 글자 수
        "max_lines": 2,
        "max_sec": 6.0,
        "fonts": {"ko": "Apple SD Gothic Neo", "ja": "Hiragino Sans", "en": "Helvetica Neue"},
        "size_ratio": 0.045,     # 화면 높이 대비 글자 크기
        "margin_v_ratio": 0.08,  # 화면 아래 여백 (세로 영상은 자동으로 더 띄움)
    },
    "fcp": {
        "enabled": True,
        "version": "1.10",
        "subtitle_mode": "captions",  # captions | titles | none
        "caption_format": "ITT",      # ITT | SRT
        "vertical_project": True,
        "title_template_uid": ".../Titles.localized/Bumper:Opener.localized/Basic Title.localized/Basic Title.moti",
        "title_template_name": "Basic Title",
    },
    "voice": {
        "backend": "auto",    # auto | mlx (애플 MLX) | torch
        "mlx_model": "mlx-community/Qwen3-TTS-12Hz-1.7B-Base-bf16",
        "model": "Qwen/Qwen3-TTS-12Hz-1.7B-Base",  # torch 방식용. 가볍게: ...-0.6B-Base
        "device": "auto",     # auto | mps | cpu
        "name": "me",         # vauto voice-add 로 등록한 목소리 이름
        "takes": 3,           # 발음이 대본과 다르면 다시 만드는 횟수
        "min_match": 0.82,    # 받아쓴 글이 대본과 이만큼 같아야 통과
        "pause": 0.35,        # 문장 사이 쉼(초)
        "para_pause": 0.8,    # 문단 사이 쉼(초)
        "lufs": -16.0,
        "bg_volume": 0.15,    # 영상에 입힐 때 원래 소리 크기 (0 = 끔)
    },
    "gen": {  # AI 그림·영상 만들기 (Draw Things 명령줄 도구)
        "cli": "draw-things-cli",
        "image_model": "flux_2_klein_4b_q8p.ckpt",              # 장면 그림
        "ltx_model": "ltx_2.3_22b_distilled_1.1_i8x.ckpt",      # 영상 + 소리 (M5 에서 빠른 8-bit S)
        "wan_model": "wan_v2.2_5b_ti2v_q8p.ckpt",               # 글 또는 사진 → 영상
        "wan14_model": "wan_v2.2_a14b_hne_i2v_q8p.ckpt",        # 사진 → 영상, 화질 위주 (시험적)
        "video_format": "h264",                                 # h264 | hevc | prores422hq | prores4444 (.mov)
        "out_dir": "~/Documents/vauto/gen",
    },
    "render": {"enabled": True, "audio_lufs": -14.0, "keep_segments": False},
    "targets": {
        "youtube": {"edit": "main", "size": "source", "fit": "fit", "codec": "hevc",
                    "max_sec": 0, "burn": []},
        "shorts": {"edit": "short", "size": "1080x1920", "fit": "crop", "codec": "h264",
                   "max_sec": 180, "burn": ["source"]},
        "reels": {"edit": "short", "size": "1080x1920", "fit": "crop", "codec": "h264",
                  "max_sec": 180, "burn": ["source"]},
        "x": {"edit": "short", "size": "1080x1920", "fit": "crop", "codec": "h264",
              "max_sec": 140, "burn": ["source"]},
        "threads": {"edit": "short", "size": "1080x1920", "fit": "crop", "codec": "h264",
                    "max_sec": 300, "burn": ["source"]},
    },
}


def _merge(base: dict, extra: dict) -> dict:
    for key, value in extra.items():
        if isinstance(value, dict) and isinstance(base.get(key), dict):
            _merge(base[key], value)
        else:
            base[key] = value
    return base


def load(path: Path | None) -> dict:
    cfg = copy.deepcopy(DEFAULTS)
    if path:
        with open(path, "rb") as fh:
            _merge(cfg, tomllib.load(fh))
    return cfg
