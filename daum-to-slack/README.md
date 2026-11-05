# Daum 메일 → Slack 알림

Daum(한메일) 받은메일함에 새 메일이 오면 Slack 채널로 알림을 보내 주는 간단한 파이썬 스크립트입니다.
파이썬 표준 라이브러리만 사용하므로 추가 설치가 필요 없습니다.

## 준비물

1. 파이썬 3.8 이상
2. Daum 메일 계정
3. Slack 워크스페이스 (무료 플랜에서도 동작합니다)

## 1단계. Daum 메일에서 IMAP 켜기

> ⚠️ PC 웹메일에서만 설정할 수 있습니다. 모바일 앱에서는 안 됩니다.

1. PC에서 [Daum 메일](https://mail.daum.net) 접속 → 로그인
2. 왼쪽 아래 **환경설정** 클릭
3. **IMAP/POP3 설정** 메뉴 선택
4. **IMAP 사용**을 **사용함**으로 변경 후 저장

### 비밀번호 관련 (중요)

카카오 계정에 **2단계 인증**이 켜져 있으면 일반 비밀번호로는 IMAP 접속이 안 됩니다.
이 경우 [카카오계정 설정](https://accounts.kakao.com)에서 **앱 비밀번호(애플리케이션 전용 비밀번호)**를
발급받아 `DAUM_PASSWORD` 에 넣어야 합니다.

## 2단계. Slack Incoming Webhook 만들기

1. <https://api.slack.com/apps> 접속 → **Create New App** → **From scratch**
2. 앱 이름 입력, 알림을 받을 **워크스페이스** 선택 → **Create App**
3. 왼쪽 메뉴에서 **Incoming Webhooks** → **Activate Incoming Webhooks** 를 **On**
4. 아래 **Add New Webhook to Workspace** 클릭 → 알림 받을 **채널** 선택 → **Allow**
5. 생성된 URL(`https://hooks.slack.com/services/...`)을 복사
   - 이 URL은 비밀번호와 같으니 외부에 노출하지 마세요.

## 3단계. 설정 파일 만들기

```bash
cd daum-to-slack
cp .env.example .env
```

`.env` 파일을 열어 `DAUM_EMAIL`, `DAUM_PASSWORD`, `SLACK_WEBHOOK_URL` 세 가지를 채웁니다.

## 4단계. 실행

```bash
# 1회만 확인하고 종료 (테스트용)
POLL_INTERVAL=0 python3 daum_to_slack.py

# 60초마다 계속 확인 (기본)
python3 daum_to_slack.py
```

- 처음 실행하면 **기존 메일은 건너뛰고**, 이후 새로 도착하는 메일부터 Slack으로 보냅니다.
  (과거 메일까지 받으려면 `.env` 에서 `FORWARD_EXISTING=true` 로 변경)
- 마지막으로 처리한 메일 위치는 `state.json` 파일에 저장됩니다.

## 계속 켜두기 (선택)

### 방법 A. cron (리눅스/맥)

5분마다 1회씩 확인:

```bash
*/5 * * * * cd /경로/daum-to-slack && POLL_INTERVAL=0 /usr/bin/python3 daum_to_slack.py >> run.log 2>&1
```

### 방법 B. 백그라운드 상시 실행

```bash
nohup python3 daum_to_slack.py >> run.log 2>&1 &
```

## 자주 묻는 질문

- **로그인이 안 돼요** → Daum 웹메일에서 IMAP '사용함' 설정 여부, 2단계 인증 시 앱 비밀번호 사용 여부를 확인하세요.
- **같은 메일이 또 와요** → `state.json` 이 지워졌을 수 있습니다. 이 파일을 유지해야 중복 전송이 안 됩니다.
- **첨부파일도 받을 수 있나요** → 현재 버전은 제목·보낸사람·본문 일부만 전송합니다. 첨부는 포함하지 않습니다.
