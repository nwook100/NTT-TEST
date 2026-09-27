# 안산 미니 CAD

가볍고 AI로 도면을 그릴 수 있는 2D CAD. 사용자는 반도체 부품(매거진·카세트·링·핀보트) 제조사 영업 과장이며 개발을 배우는 중이다. 설명은 한국어로 한다.

## 구조
- `index.html` 한 파일에 전부 들어 있다 (HTML + CSS + JS, 외부 라이브러리 없음). 브라우저로 바로 열린다.
- 도면 데이터: `ents` 배열. 타입 line, rect, circle, arc, dim, text, solid. 단위 mm, Y 위쪽, 각도 deg 반시계.
- 새 도형 타입을 추가하면 drawEnt, hitDist, bounds, snapPoints, toDXF, parseDXF 여섯 곳을 모두 고친다.
- 변경은 commit() 안에서 → 되돌리기 가능.

## 에이전트 팀 (`.claude/agents/`)
| 에이전트 | 역할 |
|---|---|
| cad-pm | 작업 쪼개기, 우선순위, ROADMAP.md 관리 — 새 요청은 여기부터 |
| cad-geometry | Trim/Offset/Fillet 등 형상 계산 |
| dxf-format | DXF 읽기·쓰기, 캐디안·오토캐드 호환, DWG 전략 |
| cad-ui | 화면, 명령줄, 단축키, 속도, 모바일 |
| ai-drawing | AI로 그리기, 제품별 자동 생성기 |
| cad-qa | 커밋 전 검사 (tests/README.md) |
| dev-coach | 코드 설명과 연습 과제 |

## 작업 규칙
- 한 번에 기능 하나. 끝나면 cad-qa 검사 → 커밋.
- 기존에 열리던 DXF는 계속 열려야 한다.
- 회사 표준 치수는 지어내지 않는다. 모르면 도면에 "예시"라고 적는다.
