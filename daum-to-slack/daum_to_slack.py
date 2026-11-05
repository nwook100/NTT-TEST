#!/usr/bin/env python3
"""
daum_to_slack.py

Daum(한메일) 받은메일함에 새 메일이 오면 Slack 채널로 알림을 보내는 스크립트.

동작 방식:
  1. Daum IMAP 서버(imap.daum.net:993, SSL)에 접속해 받은메일함(INBOX)을 확인
  2. 지난번 처리한 메일 이후 새로 도착한 메일만 골라냄 (state 파일로 UID 추적)
  3. 각 새 메일의 보낸사람/제목/본문 일부를 Slack Incoming Webhook으로 전송

의존성: 파이썬 표준 라이브러리만 사용 (imaplib, email, json, urllib) — pip 설치 불필요

환경변수 (.env 파일 또는 셸에서 export):
  DAUM_EMAIL          : 다음 메일 주소 (예: id@daum.net)
  DAUM_PASSWORD       : 비밀번호. 2단계 인증 사용 시 '앱 비밀번호'
  SLACK_WEBHOOK_URL   : Slack Incoming Webhook URL
  (선택) IMAP_HOST     : 기본 imap.daum.net
  (선택) IMAP_PORT     : 기본 993
  (선택) MAILBOX       : 기본 INBOX
  (선택) POLL_INTERVAL : 폴링 간격(초). 0 이면 1회만 실행하고 종료. 기본 60
  (선택) STATE_FILE    : 마지막 처리 UID 저장 파일. 기본 ./state.json
  (선택) FORWARD_EXISTING : true면 기존 메일도 전송. 기본 false (설정 이후 도착분만)
  (선택) BODY_MAX_CHARS: Slack에 보낼 본문 최대 글자수. 기본 500
"""

import email
import imaplib
import json
import os
import re
import sys
import time
from email.header import decode_header, make_header
from email.utils import parseaddr
from urllib import request, error


def load_dotenv(path=".env"):
    """현재 폴더의 .env 파일을 읽어 환경변수로 등록(이미 있으면 유지)."""
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip().strip('"').strip("'"))


def getenv(name, default=None, required=False):
    val = os.environ.get(name, default)
    if required and not val:
        print(f"[오류] 환경변수 {name} 가 설정되지 않았습니다.", file=sys.stderr)
        sys.exit(1)
    return val


def load_state(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def save_state(path, state):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)


def decode_mime(value):
    """MIME 인코딩된 헤더(=?UTF-8?...)를 사람이 읽을 수 있는 문자열로 변환."""
    if not value:
        return ""
    try:
        return str(make_header(decode_header(value)))
    except Exception:
        return value


def decode_part(part):
    payload = part.get_payload(decode=True)
    if payload is None:
        return ""
    charset = part.get_content_charset() or "utf-8"
    for cs in (charset, "utf-8", "euc-kr", "cp949"):
        try:
            return payload.decode(cs, errors="strict")
        except (LookupError, UnicodeDecodeError):
            continue
    return payload.decode("utf-8", errors="replace")


def strip_html(html):
    text = re.sub(r"(?is)<(script|style).*?>.*?</\1>", "", html)
    text = re.sub(r"(?s)<[^>]+>", " ", text)
    replacements = {"&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'}
    for a, b in replacements.items():
        text = text.replace(a, b)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n\s*\n+", "\n\n", text)
    return text


def extract_text(msg, max_chars):
    """메일에서 text/plain 본문을 추출. 없으면 text/html에서 태그를 제거."""
    plain = None
    html = None
    if msg.is_multipart():
        for part in msg.walk():
            if "attachment" in str(part.get("Content-Disposition") or ""):
                continue
            ctype = part.get_content_type()
            if ctype == "text/plain" and plain is None:
                plain = decode_part(part)
            elif ctype == "text/html" and html is None:
                html = decode_part(part)
    else:
        if msg.get_content_type() == "text/html":
            html = decode_part(msg)
        else:
            plain = decode_part(msg)

    text = (plain if plain else strip_html(html or "")).strip()
    if len(text) > max_chars:
        text = text[:max_chars] + " …(이하 생략)"
    return text


def post_to_slack(webhook_url, sender, subject, date, body):
    header = (
        f"*새 메일 도착* :email:\n"
        f"*보낸사람:* {sender}\n"
        f"*제목:* {subject}\n"
        f"*받은시각:* {date}"
    )
    blocks = [{"type": "section", "text": {"type": "mrkdwn", "text": header}}]
    if body:
        blocks.append({"type": "section", "text": {"type": "mrkdwn", "text": f"```{body}```"}})
    data = json.dumps({"blocks": blocks}).encode("utf-8")
    req = request.Request(webhook_url, data=data, headers={"Content-Type": "application/json"})
    try:
        with request.urlopen(req, timeout=15) as resp:
            if resp.status != 200:
                print(f"[경고] Slack 응답 코드 {resp.status}", file=sys.stderr)
                return False
        return True
    except error.URLError as e:
        print(f"[오류] Slack 전송 실패: {e}", file=sys.stderr)
        return False


def fetch_and_forward(cfg, state):
    conn = imaplib.IMAP4_SSL(cfg["imap_host"], cfg["imap_port"])
    try:
        conn.login(cfg["email"], cfg["password"])
    except imaplib.IMAP4.error as e:
        print(
            f"[오류] IMAP 로그인 실패: {e}\n"
            f"  - Daum 웹메일 → 환경설정 → IMAP/POP3 설정이 '사용함'인지\n"
            f"  - 2단계 인증 사용 시 '앱 비밀번호'를 넣었는지 확인하세요.",
            file=sys.stderr,
        )
        return state

    conn.select(cfg["mailbox"])

    last_uid = state.get("last_uid")

    if last_uid is None:
        typ, data = conn.uid("search", None, "ALL")
        uids = data[0].split() if data and data[0] else []
        if cfg["forward_existing"] and uids:
            search_from = int(uids[0])
        elif uids:
            state["last_uid"] = int(uids[-1])
            save_state(cfg["state_file"], state)
            print(f"[정보] 첫 실행: 기존 메일 {len(uids)}개는 건너뜁니다. "
                  f"이후 도착하는 메일부터 전송합니다.")
            conn.logout()
            return state
        else:
            search_from = 1
    else:
        search_from = last_uid + 1

    typ, data = conn.uid("search", None, f"UID {search_from}:*")
    uids = data[0].split() if data and data[0] else []
    # IMAP 'UID n:*' 은 최고 UID 메일을 항상 포함하므로 직접 필터링
    new_uids = sorted({int(u) for u in uids if int(u) >= search_from})

    new_count = 0
    for uid in new_uids:
        typ, msg_data = conn.uid("fetch", str(uid), "(BODY.PEEK[])")
        if typ != "OK" or not msg_data or msg_data[0] is None:
            continue
        msg = email.message_from_bytes(msg_data[0][1])

        subject = decode_mime(msg.get("Subject")) or "(제목 없음)"
        from_name, from_addr = parseaddr(msg.get("From", ""))
        from_name = decode_mime(from_name)
        sender = f"{from_name} <{from_addr}>" if from_name else (from_addr or "(알 수 없음)")
        date = decode_mime(msg.get("Date")) or ""
        body = extract_text(msg, cfg["body_max_chars"])

        if post_to_slack(cfg["webhook_url"], sender, subject, date, body):
            new_count += 1
            state["last_uid"] = uid
            save_state(cfg["state_file"], state)
        else:
            # 전송 실패 시 중단하고 다음 실행에서 재시도
            break

    print(f"[정보] 새 메일 {new_count}개를 Slack으로 전송했습니다." if new_count
          else "[정보] 새 메일이 없습니다.")
    conn.logout()
    return state


def main():
    load_dotenv()
    cfg = {
        "email": getenv("DAUM_EMAIL", required=True),
        "password": getenv("DAUM_PASSWORD", required=True),
        "webhook_url": getenv("SLACK_WEBHOOK_URL", required=True),
        "imap_host": getenv("IMAP_HOST", "imap.daum.net"),
        "imap_port": int(getenv("IMAP_PORT", "993")),
        "mailbox": getenv("MAILBOX", "INBOX"),
        "state_file": getenv("STATE_FILE", "state.json"),
        "forward_existing": getenv("FORWARD_EXISTING", "false").lower() == "true",
        "body_max_chars": int(getenv("BODY_MAX_CHARS", "500")),
    }
    interval = int(getenv("POLL_INTERVAL", "60"))

    print(f"[시작] {cfg['email']} → Slack 연동. "
          f"{'1회 실행' if interval == 0 else f'{interval}초마다 확인'}")

    state = load_state(cfg["state_file"])

    if interval == 0:
        fetch_and_forward(cfg, state)
        return

    while True:
        try:
            state = fetch_and_forward(cfg, state)
        except Exception as e:
            print(f"[오류] 처리 중 예외: {e}", file=sys.stderr)
        time.sleep(interval)


if __name__ == "__main__":
    main()
