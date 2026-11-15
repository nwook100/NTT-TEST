"""Final Cut Pro 로 가져올 FCPXML 을 만든다.

타임라인은 원본 파일을 그대로 참조하므로 Final Cut 안에서 컷을 자유롭게 고칠 수 있다.
자막은 언어별 캡션 역할(ITT/SRT)로 들어가서 언어마다 켜고 끌 수 있다.
"""
from __future__ import annotations

import urllib.parse
import xml.etree.ElementTree as ET
from fractions import Fraction
from pathlib import Path

from .probe import Clip
from .timeutil import RATE_LABEL, fcp_time, frames_to_time, timecode_to_frames, to_frames

COLOR_SPACE = {"sdr": "1-1-1 (Rec. 709)", "hlg": "9-18-9 (Rec. 2020 HLG)", "pq": "9-16-9 (Rec. 2020 PQ)"}


class Builder:
    def __init__(self, clips: list[Clip], cfg: dict, sub_cfg: dict):
        self.clips = clips
        self.cfg = cfg
        self.sub_cfg = sub_cfg
        self.root = ET.Element("fcpxml", version=cfg.get("version", "1.10"))
        self.resources = ET.SubElement(self.root, "resources")
        self._next = 1
        self._formats: dict[tuple, str] = {}
        self._assets: dict[int, str] = {}
        self._asset_start: dict[int, Fraction] = {}
        self._asset_drop: dict[int, bool] = {}
        self._title_effect: str | None = None
        self._style = 0
        self.event = ET.SubElement(self.root, "event", name=cfg.get("event_name", "vauto"))

    def _id(self) -> str:
        rid = f"r{self._next}"
        self._next += 1
        return rid

    def format_id(self, width: int, height: int, rate: Fraction, hdr: str = "sdr") -> str:
        key = (width, height, rate, hdr)
        if key not in self._formats:
            rid = self._id()
            ET.SubElement(self.resources, "format", id=rid,
                          frameDuration=fcp_time(Fraction(rate.denominator, rate.numerator)),
                          width=str(width), height=str(height), colorSpace=COLOR_SPACE[hdr])
            self._formats[key] = rid
        return self._formats[key]

    def asset_id(self, clip: Clip) -> str:
        if clip.index in self._assets:
            return self._assets[clip.index]
        fmt = self.format_id(clip.width, clip.height, clip.fps, clip.hdr)
        start, drop = Fraction(0), False
        if clip.timecode:
            try:
                frames, drop = timecode_to_frames(clip.timecode, clip.fps)
                start = frames_to_time(frames, clip.fps)
            except ValueError:
                pass
        rid = self._id()
        attrs = {"id": rid, "name": clip.name, "start": fcp_time(start),
                 "duration": fcp_time(frames_to_time(to_frames(clip.duration, clip.fps), clip.fps)),
                 "hasVideo": "1", "format": fmt, "videoSources": "1"}
        if clip.has_audio:
            attrs.update({"hasAudio": "1", "audioSources": "1",
                          "audioChannels": str(clip.audio_channels or 2),
                          "audioRate": str(clip.audio_rate or 48000)})
        asset = ET.SubElement(self.resources, "asset", attrs)
        src = "file://" + urllib.parse.quote(str(Path(clip.path).resolve()))
        ET.SubElement(asset, "media-rep", kind="original-media", src=src)
        self._assets[clip.index] = rid
        self._asset_start[clip.index] = start
        self._asset_drop[clip.index] = drop
        return rid

    def title_effect(self) -> str:
        if self._title_effect is None:
            self._title_effect = self._id()
            ET.SubElement(self.resources, "effect", id=self._title_effect,
                          name=self.cfg["title_template_name"], uid=self.cfg["title_template_uid"])
        return self._title_effect

    def _text_style(self, parent: ET.Element, text: str, attrs: dict) -> None:
        self._style += 1
        sid = f"ts{self._style}"
        text_el = ET.SubElement(parent, "text")
        if "placement" in attrs:
            text_el.set("placement", attrs.pop("placement"))
        ET.SubElement(text_el, "text-style", ref=sid).text = text
        style_def = ET.SubElement(parent, "text-style-def", id=sid)
        ET.SubElement(style_def, "text-style", attrs)

    def add_project(self, tl: dict, langs: list[str], chapters: list[dict] | None = None,
                    fill: bool = False) -> None:
        rate = tl["rate"]
        seq_fmt = self.format_id(tl["width"], tl["height"], rate)
        project = ET.SubElement(self.event, "project", name=tl["name"])
        sequence = ET.SubElement(project, "sequence", format=seq_fmt,
                                 duration=fcp_time(frames_to_time(tl["frames"], rate)),
                                 tcStart="0s", tcFormat="NDF", audioLayout="stereo", audioRate="48k")
        spine = ET.SubElement(sequence, "spine")
        chapter_at = {c["unit"]: c["title"] for c in (chapters or [])}
        mode = self.cfg.get("subtitle_mode", "captions")
        cap_fmt = self.cfg.get("caption_format", "ITT").upper()
        role_head = "iTT" if cap_fmt == "ITT" else "SRT"

        for item in tl["items"]:
            clip = self.clips[item["clip"]]
            asset = self.asset_id(clip)
            local0 = self._asset_start[clip.index] + item["src_in"]  # 클립 안쪽 시간축의 시작점
            attrs = {"ref": asset, "name": clip.name,
                     "offset": fcp_time(frames_to_time(item["start_f"], rate)),
                     "start": fcp_time(local0),
                     "duration": fcp_time(frames_to_time(item["frames"], rate)),
                     "tcFormat": "DF" if self._asset_drop[clip.index] else "NDF"}
            clip_fmt = self.format_id(clip.width, clip.height, clip.fps, clip.hdr)
            if clip_fmt != seq_fmt:
                attrs["format"] = clip_fmt
            if clip.has_audio:
                attrs["audioRole"] = "dialogue"
            node = ET.SubElement(spine, "asset-clip", attrs)
            if clip.fps != rate:
                ET.SubElement(node, "conform-rate", scaleEnabled="0",
                              srcFrameRate=RATE_LABEL.get(clip.fps, f"{float(clip.fps):.2f}"))
            if fill and (clip.width / clip.height) != (tl["width"] / tl["height"]):
                ET.SubElement(node, "adjust-conform", type="fill")

            def local(seconds: float) -> tuple[Fraction, int]:
                """원본 시각 → (클립 안쪽 시간, 타임라인 프레임 오프셋). 프레임 경계에 맞춘다."""
                off = max(0, min(item["frames"] - 1, to_frames(seconds - float(item["src_in"]), rate)))
                return local0 + frames_to_time(off, rate), off

            if mode == "captions":
                for lane, lang in enumerate(langs, start=1):
                    for cue in item["cues"].get(lang, []):
                        start, off = local(cue["start"])
                        frames = min(item["frames"] - off, max(1, to_frames(cue["end"] - cue["start"], rate)))
                        code = cue.get("lang", lang) if lang == "source" else lang
                        cap = ET.SubElement(node, "caption", name=cue["text"][:40], lane=str(lane),
                                            offset=fcp_time(start),
                                            duration=fcp_time(frames_to_time(frames, rate)),
                                            role=f"{role_head}?captionFormat={cap_fmt}.{code or 'en'}")
                        self._text_style(cap, cue["text"], {
                            "placement": "bottom", "font": ".AppleSystemUIFont", "fontSize": "13",
                            "fontFace": "Regular", "fontColor": "1 1 1 1", "backgroundColor": "0 0 0 1"})
            elif mode == "titles":
                lang = langs[0] if langs else "source"
                size = round(tl["height"] * self.sub_cfg["size_ratio"])
                for cue in item["cues"].get(lang, []):
                    start, off = local(cue["start"])
                    frames = min(item["frames"] - off, max(1, to_frames(cue["end"] - cue["start"], rate)))
                    code = cue.get("lang", lang)
                    title = ET.SubElement(node, "title", ref=self.title_effect(), lane="1",
                                          name=cue["text"][:40], offset=fcp_time(start),
                                          duration=fcp_time(frames_to_time(frames, rate)), start="3600s")
                    ET.SubElement(title, "param", name="Position",
                                  key="9999/999166631/999166633/1/100/101",
                                  value=f"0 -{round(tl['height'] * 0.38)}")
                    font = self.sub_cfg["fonts"].get(code, self.sub_cfg["fonts"]["en"])
                    self._text_style(title, cue["text"], {
                        "font": font, "fontSize": str(size), "fontFace": "Bold",
                        "fontColor": "1 1 1 1", "strokeColor": "0 0 0 1", "strokeWidth": "-2",
                        "alignment": "center"})

            if item["unit"] in chapter_at:
                ET.SubElement(node, "chapter-marker", start=fcp_time(local0),
                              duration=fcp_time(Fraction(rate.denominator, rate.numerator)),
                              value=chapter_at[item["unit"]])

    def write(self, path: Path) -> None:
        ET.indent(self.root, space="  ")
        body = ET.tostring(self.root, encoding="unicode")
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text('<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE fcpxml>\n' + body + "\n",
                        encoding="utf-8")
