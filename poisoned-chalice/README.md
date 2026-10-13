# 독이 든 성배 (v0.2 프로토타입)

7년 연속 꼴찌 야구단 **반월 펠리컨스**의 감독이 되어 16주를 버티는 모바일 경영 시뮬레이션.

## 바로 해보기
- 브라우저: `www/index.html` 을 열거나 `npm run dev` → http://localhost:5173
- 밸런스 시뮬레이션: `npm run sim`

## 폴더 구조
| 경로 | 내용 | 담당 |
|---|---|---|
| `www/index.html` | 게임 본체(엔진·화면) | 메인 개발 |
| `www/events-extra.js` | 추가 이벤트 카드 24장 | 시나리오 작가 |
| `docs/00-brief.md` | 공통 기획 브리프 | 전원 |
| `docs/01-direction.md` | 비전·필러·수익모델 | 감독 |
| `docs/02-story.md` | 세계관·캐릭터·엔딩·구단주 메시지 | 스토리 작가 |
| `docs/03-ui.md` | 화면 흐름·와이어프레임·토큰 | UI 디자이너 |
| `docs/04-balance.md`, `tools/simulate.mjs` | 밸런스 분석·시뮬레이터 | 게임 디자이너 |
| `docs/05-production.md` | 로드맵·스토어 출시·예산 | 제작자 |

## iOS / Android 앱으로 빌드 (Capacitor)
```bash
npm install
npx cap add android      # Android Studio 필요
npx cap add ios          # Mac + Xcode 필요
npx cap sync
npm run android          # 또는 npm run ios
```
자세한 출시 절차는 `docs/05-production.md` 참고.
