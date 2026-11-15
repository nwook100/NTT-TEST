"""로컬 LLM 호출 (OpenAI 호환 API. Ollama, LM Studio 등)."""
from __future__ import annotations

import json
import re
import urllib.error
import urllib.request

from .util import log

LANG_NAME = {"ko": "Korean", "en": "English", "ja": "Japanese", "zh": "Chinese",
             "es": "Spanish", "fr": "French", "de": "German"}


class LLMError(RuntimeError):
    pass


class LLM:
    def __init__(self, cfg: dict):
        self.base = cfg["base_url"].rstrip("/")
        self.model = cfg["model"]
        self.timeout = cfg.get("timeout", 600)
        self.batch = cfg.get("batch", 30)
        self._level = 0  # 0 스키마 강제, 1 JSON 모드, 2 일반 글

    def _post(self, path: str, body: dict) -> dict:
        req = urllib.request.Request(
            self.base + path, data=json.dumps(body).encode("utf-8"),
            headers={"Content-Type": "application/json", "Authorization": "Bearer local"})
        with urllib.request.urlopen(req, timeout=self.timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))

    def available(self) -> tuple[bool, str]:
        try:
            req = urllib.request.Request(self.base + "/models", headers={"Authorization": "Bearer local"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            names = [m.get("id", "") for m in data.get("data", [])]
            if names and self.model not in names:
                return False, f"모델 {self.model} 이 서버에 없습니다. 있는 모델: {', '.join(names[:8])}"
            return True, "ok"
        except Exception as exc:  # 서버 꺼짐 등
            return False, f"LLM 서버 연결 실패 ({self.base}): {exc}"

    def text(self, system: str, user: str, temperature: float = 0.2) -> str:
        """일반 글 응답."""
        body = {"model": self.model, "temperature": temperature, "stream": False, "max_tokens": 2048,
                "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}]}
        try:
            data = self._post("/chat/completions", body)
        except Exception as exc:
            raise LLMError(str(exc)) from exc
        content = data["choices"][0]["message"].get("content") or ""
        return re.sub(r"<think>.*?</think>", "", content, flags=re.S).strip()

    def json(self, system: str, user: str, schema: dict, temperature: float = 0.2) -> dict:
        """JSON 응답을 받는다.

        서버마다 지원이 달라 세 단계로 시도한다: 스키마 강제 → JSON 모드 → 일반 글(지시문으로만 요청).
        한 번 안 되는 단계는 이후 호출에서 건너뛴다. (Ollama 의 MLX 엔진 모델은 앞의 둘을 거부한다.)
        """
        modes = [
            {"type": "json_schema", "json_schema": {"name": "result", "schema": schema, "strict": True}},
            {"type": "json_object", "schema": schema},  # llama.cpp 계열은 이 형태로 스키마를 강제
            None,
        ]
        hint = ("\nReply with a single JSON object only, no other text, matching this JSON schema:\n"
                + json.dumps(schema, ensure_ascii=False))
        last = ""
        for level in range(self._level, len(modes)):
            fmt = modes[level]
            body = {"model": self.model, "temperature": temperature, "stream": False, "max_tokens": 8192,
                    "messages": [{"role": "system", "content": system + ("" if level == 0 else hint)},
                                 {"role": "user", "content": user}]}
            if fmt is not None:
                body["response_format"] = fmt
            try:
                data = self._post("/chat/completions", body)
            except urllib.error.HTTPError as exc:
                last = f"HTTP {exc.code}: {exc.read().decode('utf-8', 'replace')[:300]}"
                if fmt is not None and 400 <= exc.code < 600:
                    self._level = level + 1  # 이 서버는 이 방식을 지원하지 않는다
                    continue
                raise LLMError(last) from exc
            except Exception as exc:
                raise LLMError(str(exc)) from exc
            content = data["choices"][0]["message"].get("content") or ""
            parsed = parse_json(content)
            if isinstance(parsed, dict):
                return parsed
            last = f"JSON 해석 실패: {content[:200]}"
        raise LLMError(last)


def parse_json(text: str):
    text = re.sub(r"<think>.*?</think>", "", text, flags=re.S).strip()
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip())
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    start, end = text.find("{"), text.rfind("}")
    if start >= 0 and end > start:
        try:
            return json.loads(text[start:end + 1])
        except json.JSONDecodeError:
            return None
    return None


# ---------- 번역 ----------

TRANSLATE_SCHEMA = {
    "type": "object",
    "properties": {"items": {"type": "array", "items": {
        "type": "object",
        "properties": {"id": {"type": "integer"}, "text": {"type": "string"}},
        "required": ["id", "text"]}}},
    "required": ["items"],
}


def _glossary_text(glossary: dict, src: str, dst: str) -> str:
    lines = []
    for term, table in glossary.items():
        if isinstance(table, dict) and table.get(dst):
            lines.append(f"- {term} => {table[dst]}")
    return ("\nGlossary (always use these translations):\n" + "\n".join(lines)) if lines else ""


def _script_counts(text: str) -> dict[str, int]:
    counts = {"hangul": 0, "kana": 0, "han": 0, "latin": 0}
    for ch in text:
        if "\uac00" <= ch <= "\ud7a3" or "\u1100" <= ch <= "\u11ff" or "\u3130" <= ch <= "\u318f":
            counts["hangul"] += 1
        elif "\u3040" <= ch <= "\u30ff":
            counts["kana"] += 1
        elif "\u4e00" <= ch <= "\u9fff":
            counts["han"] += 1
        elif ch.isalpha() and ch.isascii():
            counts["latin"] += 1
    return counts


def _right_language(text: str, dst: str) -> bool:
    """번역문이 실제로 목표 언어의 글자로 쓰였는지. 원문을 그대로 돌려준 답을 걸러낸다."""
    c = _script_counts(text)
    letters = sum(c.values())
    if letters == 0:
        return True  # 숫자·기호뿐인 문장
    if dst == "ko":
        return c["hangul"] > 0 and c["kana"] <= letters * 0.2
    if dst == "ja":
        return (c["kana"] + c["han"]) > 0 and c["hangul"] <= letters * 0.2
    if dst == "zh":
        return c["han"] > 0 and c["hangul"] + c["kana"] <= letters * 0.2
    return (c["hangul"] + c["kana"] + c["han"]) <= letters * 0.2


def _plausible(source: str, text: str, dst: str = "") -> bool:
    """번역문에 JSON 찌꺼기가 섞였거나, 터무니없이 길거나, 다른 언어면 실패로 본다."""
    if not text or "\n" in text:
        return False
    if any(mark in text for mark in ('"}', "}]", '{"', "”}", '"id"', "```")):
        return False
    if dst and not _right_language(text, dst):
        return False
    return len(text) <= max(60, len(source) * 5)


def translate(llm: LLM, texts: list[str], src: str, dst: str, brief: str = "",
              glossary: dict | None = None) -> tuple[list[str], int]:
    """자막 문장 목록을 번역. (번역문 목록, 실패해 원문으로 남긴 개수)"""
    out: list[str | None] = [None] * len(texts)
    system = (
        f"You are a professional subtitle translator. Translate each item from "
        f"{LANG_NAME.get(src, src)} to {LANG_NAME.get(dst, dst)}. "
        "Write natural spoken-style subtitles, keep them concise, keep numbers, model names and "
        "product names unchanged, and do not add explanations. Each output item must translate "
        "exactly the input item with the same id. Never merge or split items."
        + _glossary_text(glossary or {}, src, dst)
        + (f"\nVideo context: {brief}" if brief else "")
    )

    def run_batch(ids: list[int]) -> None:
        payload = {"items": [{"id": i, "text": texts[i]} for i in ids]}
        try:
            data = llm.json(system, json.dumps(payload, ensure_ascii=False), TRANSLATE_SCHEMA, 0.2)
        except LLMError as exc:
            log(f"    번역 호출 실패: {exc}")
            return
        for item in data.get("items", []) if isinstance(data, dict) else []:
            try:
                idx, text = int(item["id"]), str(item["text"]).strip()
            except (KeyError, TypeError, ValueError):
                continue
            if idx in ids and _plausible(texts[idx], text, dst):
                out[idx] = text

    todo = [i for i, t in enumerate(texts) if t.strip()]
    for pos in range(0, len(todo), llm.batch):
        run_batch(todo[pos:pos + llm.batch])
    for i in [i for i in todo if out[i] is None]:  # 빠진 항목은 하나씩 다시
        run_batch([i])
    plain = (f"Translate the user's subtitle line from {LANG_NAME.get(src, src)} to "
             f"{LANG_NAME.get(dst, dst)}. Reply with the translation only: one line, no quotes, no notes."
             + _glossary_text(glossary or {}, src, dst))
    for i in [i for i in todo if out[i] is None]:  # 그래도 안 되면 JSON 없이 한 문장씩
        try:
            answer = llm.text(plain, texts[i]).strip().strip('"“”「」')
        except LLMError as exc:
            log(f"    번역 호출 실패: {exc}")
            continue
        if _plausible(texts[i], answer, dst):
            out[i] = answer
    failed = sum(1 for i in todo if out[i] is None)
    return [o if o is not None else texts[i] for i, o in enumerate(out)], failed


# ---------- 편집 판단 ----------

REMOVE_SCHEMA = {
    "type": "object",
    "properties": {"remove": {"type": "array", "items": {
        "type": "object",
        "properties": {"id": {"type": "string"}, "why": {"type": "string"}},
        "required": ["id", "why"]}}},
    "required": ["remove"],
}


def plan_cleanup(llm: LLM, units: list[dict], brief: str) -> dict:
    """NG 컷만 골라낸다. 뺄 것만 묻기 때문에 답이 틀려도 대부분의 조각은 남는다."""
    system = (
        "You are a video editor reviewing raw footage. Each line is: id | clip | duration | spoken text. "
        "List ONLY the pieces that are clear mistakes and must be removed: a false start, or an earlier "
        "take of a sentence that the speaker then repeats (remove the earlier take, keep the last one). "
        "Do not remove greetings, intros, outros, b-roll, or passages in other languages. "
        "If nothing is clearly a mistake, return an empty list. For each removed piece give its id and a short reason."
        + (f"\nEditing brief from the creator: {brief}" if brief else "")
    )
    return llm.json(system, _unit_lines(units), REMOVE_SCHEMA, 0.1)


PLAN_SCHEMA = {
    "type": "object",
    "properties": {
        "keep": {"type": "array", "items": {"type": "string"}},
        "reason": {"type": "string"},
    },
    "required": ["keep", "reason"],
}


def _unit_lines(units: list[dict]) -> str:
    lines = []
    for u in units:
        text = u["text"] if u["text"] else "(no speech, b-roll)"
        lines.append(f'{u["id"]} | clip {u["clip"] + 1} | {u["dur"]:.1f}s | {text}')
    return "\n".join(lines)


def plan_edit(llm: LLM, units: list[dict], brief: str, target_sec: float, kind: str) -> dict:
    """남길 조각 id 목록을 받는다. kind: main | short"""
    total = sum(u["dur"] for u in units)
    if kind == "short":
        goal = (f"Build a short vertical highlight of at most {target_sec:.0f} seconds. "
                "Start with the strongest hook, keep only the most interesting passage(s), "
                "and prefer consecutive pieces so the speech stays coherent.")
    elif target_sec > 0:
        goal = (f"Cut the video down to about {target_sec:.0f} seconds (currently {total:.0f}s). "
                "Keep the most informative and engaging pieces.")
    else:
        goal = ("Only remove clear mistakes: false starts and repeated takes of the same sentence "
                "(keep the last good take). Greetings, intros, outros, b-roll and passages in other "
                "languages are intentional: keep them. When unsure, keep the piece.")
    system = (
        "You are a video editor. You receive a list of pieces of raw footage in shooting order, "
        "one per line as: id | clip | duration | spoken text. " + goal +
        " Return the ids to keep. Use only ids from the list. Keep the original order."
        + (f"\nEditing brief from the creator: {brief}" if brief else "")
    )
    return llm.json(system, _unit_lines(units), PLAN_SCHEMA, 0.2)


def meta_schema(langs: list[str]) -> dict:
    per = {"type": "object",
           "properties": {"title": {"type": "string"}, "description": {"type": "string"},
                          "hashtags": {"type": "array", "items": {"type": "string"}}},
           "required": ["title", "description", "hashtags"]}
    return {
        "type": "object",
        "properties": {
            **{lang: per for lang in langs},
            "chapters": {"type": "array", "items": {
                "type": "object",
                "properties": {"id": {"type": "string"}, "title": {"type": "string"}},
                "required": ["id", "title"]}},
        },
        "required": [*langs, "chapters"],
    }


def make_metadata(llm: LLM, units: list[dict], brief: str, langs: list[str], src: str) -> dict:
    names = ", ".join(f"{lang} ({LANG_NAME.get(lang, lang)})" for lang in langs)
    system = (
        "You write upload metadata for a social video. From the edited transcript below, write for "
        f"each language key [{names}]: a title (max 60 characters), a 2-4 sentence description, "
        "and 5-8 hashtags (each starting with #). Also propose 3-8 chapters: for each, the id of the "
        f"piece where it starts and a short chapter title in {LANG_NAME.get(src, src)}. "
        "The first chapter must start at the first piece."
        + (f"\nBrief from the creator: {brief}" if brief else "")
    )
    return llm.json(system, _unit_lines(units), meta_schema(langs), 0.5)
