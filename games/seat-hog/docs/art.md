# 돗자리 단속반 — 아트 가이드

대상 파일: `games/seat-hog/game.html` (단일 HTML, CSP로 외부 이미지 불가, 폰트는 Google Fonts만).
모든 그래픽은 **CSS + 인라인 SVG `<symbol>` + Canvas** 로만 만든다. 이 문서의 코드는 그대로 붙여 넣을 수 있게 썼다. `game.html` 은 아직 수정하지 않았다.

---

## 1. 아트 디렉션

**"초롱빛은 사람, 파란 비닐은 욕심."** 화면은 깊은 남색 밤하늘과 어두운 잔디 위에 청사초롱의 주황·빨강이 떠 있는 축제 밤입니다. 따뜻함과 차가움을 의미로 나눕니다. 진짜 관람객이 앉은 자리는 초롱빛과 같은 계열의 **노란 왕골 돗자리**에 사람 실루엣을 둡니다. 짐만 있는 선점 자리는 **차가운 파란 체크 비닐 돗자리**에 무생물 소품만 둡니다. 그래서 플레이어는 색 온도만 보고도 0.3초 안에 둘을 가를 수 있습니다. 스프라이트는 외곽선 없는 플랫 스타일입니다. 아이템마다 기본색, 그림자색, 하이라이트 하나씩 해서 최대 3톤만 쓰고, 모서리를 둥글게 해서 장난감 같은 느낌을 냅니다. 빛은 왼쪽 위 초롱 쪽에서 들어온다고 보고, 바닥에는 반투명 검정 타원 그림자 하나만 둡니다. 색만으로 정보를 전달하지 않도록 두 돗자리의 **무늬(체크/세로 짜임)와 테두리**를 다르게 해서 색각 이상 사용자도 구분할 수 있게 합니다. 연출은 짧고 경쾌하게 갑니다. 걷어내기는 ‘휙 + 단속 도장’, 실수는 ‘빨간 경고 + 깜짝 놀라 튀는 사람’이고, 배경 불꽃은 화면 위쪽 하늘에만 드문드문 터지는 정도로 둡니다.

### 컬러 팔레트 (핵심 8토큰)

| 토큰 | Hex | 용도 | 변경점 |
|---|---|---|---|
| `--night` | `#121833` | 밤하늘 배경 | `#141a2e` → 조금 더 깊은 남색으로 바꿔서 불꽃·초롱 대비를 키움 |
| `--grass` | `#1d3a2b` | 잔디밭 바탕 | 미세 조정 |
| `--grass-line` | `#27503a` | 잔디 결 줄무늬 | 밝기를 약간 올려 결이 보이게 |
| `--lantern` | `#ffb347` | 청사초롱 주황, 강조, 포커스 | 유지 |
| `--lantern-red` | `#e8483b` | 단속·경고·버튼 | 유지 |
| `--mat-hog` | `#3d7bd9` | 선점 비닐 돗자리(차가움) | `--mat-blue` 의미 기반 이름으로 변경 |
| `--mat-family` | `#d9a441` | 관람객 왕골 돗자리(따뜻함) | 하드코딩 `#c9a04a` → 토큰화, 채도 약간 올림 |
| `--paper` | `#f3ecdc` | 쪽지, 진행바, 밝은 종이 | 유지 |

보조 토큰(그림자색/텍스트)은 아래 `:root` 에 함께 넣었습니다. `--muted #9aa3c0` 는 `--night` 위 대비가 약 6.8:1 이라 그대로 둡니다.

```css
:root {
  --night: #121833;
  --grass: #1d3a2b;
  --grass-line: #27503a;
  --lantern: #ffb347;
  --lantern-red: #e8483b;
  --lantern-red-deep: #9b2a20;   /* 버튼 그림자 */
  --mat-hog: #3d7bd9;
  --mat-hog-deep: #2a5cae;       /* 비닐 그림자/범례 */
  --mat-family: #d9a441;
  --mat-family-deep: #a8452f;    /* 왕골 돗자리 테두리 천(팥색) */
  --paper: #f3ecdc;
  --paper-ink: #3a2a12;          /* 쪽지 글씨 */
  --ink: #ece8f4;
  --muted: #9aa3c0;
  --ok: #5fd38d;
  --font-display: "Black Han Sans", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  --font-body: "Gowun Dodum", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  color-scheme: dark;
}
```

---

## 2. SVG 스프라이트 (이모지 대체)

`<body>` 맨 위에 스프라이트 시트를 한 번 넣고 `<use href="#spr-...">` 로 불러 씁니다. 모든 심볼은 `viewBox="0 0 48 48"` 입니다.
관람객 심볼은 색을 CSS 사용자 정의 속성(`--shirt` `--pants` `--skin` `--hair`)으로 받습니다. 사용자 정의 속성은 `<use>` 섀도 트리 안으로 상속되기 때문에, 심볼 하나로 여러 사람을 표현할 수 있습니다.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>

    <!-- 배낭 -->
    <symbol id="spr-backpack" viewBox="0 0 48 48">
      <ellipse cx="24" cy="44" rx="14" ry="2.5" fill="#000" opacity=".25"/>
      <path d="M19 10a5 5 0 0 1 10 0" fill="none" stroke="#7a2b1c" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="11" y="9" width="26" height="34" rx="9" fill="#e05a3a"/>
      <path d="M11 18a9 9 0 0 1 9-9h8a9 9 0 0 1 9 9v2q-13 7-26 0z" fill="#c4452b"/>
      <rect x="16" y="28" width="16" height="11" rx="4" fill="#b8432a"/>
      <path d="M19 32h10" stroke="#ffd59a" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="22" y="21" width="4" height="4" rx="1" fill="#ffd59a"/>
      <path d="M14 14q2-3 5-3" fill="none" stroke="#f08a6c" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <!-- 아이스박스 -->
    <symbol id="spr-icebox" viewBox="0 0 48 48">
      <ellipse cx="24" cy="44" rx="18" ry="2.5" fill="#000" opacity=".25"/>
      <path d="M17 15v-5h14v5" fill="none" stroke="#d8d4c8" stroke-width="3" stroke-linejoin="round"/>
      <rect x="7" y="19" width="34" height="23" rx="3" fill="#3fb6c9"/>
      <rect x="7" y="31" width="34" height="4" fill="#2b8fa1"/>
      <rect x="10" y="24" width="3" height="14" rx="1.5" fill="#7fd6e2"/>
      <rect x="5" y="14" width="38" height="8" rx="3" fill="#f4f1e8"/>
      <rect x="5" y="20" width="38" height="2" fill="#d8d4c8"/>
      <rect x="21" y="21" width="6" height="5" rx="1.5" fill="#f4f1e8"/>
    </symbol>

    <!-- 파라솔 (펼친 정면, 빨강/흰 줄) -->
    <symbol id="spr-parasol" viewBox="0 0 48 48">
      <ellipse cx="24" cy="45" rx="10" ry="2" fill="#000" opacity=".25"/>
      <path d="M24 8v36" stroke="#8a6a4a" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M4 24a20 18 0 0 1 40 0q-4-3.5-8 0q-4-3.5-8 0q-4-3.5-8 0q-4-3.5-8 0q-4-3.5-8 0z" fill="#e8483b"/>
      <path d="M24 6Q14 9 12 24q4-3.5 8 0Q21 12 24 6z" fill="#f4f1e8"/>
      <path d="M24 6Q34 9 36 24q-4-3.5-8 0Q27 12 24 6z" fill="#f4f1e8"/>
      <circle cx="24" cy="6" r="2" fill="#ffb347"/>
    </symbol>

    <!-- 캠핑의자 (정면, 접이식) -->
    <symbol id="spr-chair" viewBox="0 0 48 48">
      <ellipse cx="24" cy="45" rx="15" ry="2" fill="#000" opacity=".25"/>
      <path d="M13 44L35 27M35 44L13 27" stroke="#5b6478" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M12 8v20M36 8v20" stroke="#5b6478" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="12" y="9" width="24" height="15" fill="#2f9e6e"/>
      <path d="M12 14h24" stroke="#46c18c" stroke-width="2"/>
      <path d="M10 25h28l-3 6H13z" fill="#257d57"/>
      <rect x="7" y="20" width="7" height="3" rx="1.5" fill="#5b6478"/>
      <rect x="34" y="20" width="7" height="3" rx="1.5" fill="#5b6478"/>
    </symbol>

    <!-- 텐트 (원터치 삼각 텐트) -->
    <symbol id="spr-tent" viewBox="0 0 48 48">
      <ellipse cx="24" cy="43" rx="21" ry="2.5" fill="#000" opacity=".25"/>
      <path d="M24 8V5M3 42L1 46M45 42l2 4" stroke="#5b6478" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M3 42L24 8L45 42z" fill="#f2a93b"/>
      <path d="M24 8L36 42h9z" fill="#d68a22"/>
      <path d="M24 16L14 42h20z" fill="#c47d1f"/>
      <path d="M24 24L19 42h10z" fill="#2a2140"/>
    </symbol>

    <!-- 앉아있는 관람객 (머리+몸 실루엣, 색은 CSS 변수) -->
    <symbol id="spr-person" viewBox="0 0 48 48">
      <ellipse cx="24" cy="44" rx="16" ry="2.5" fill="#000" opacity=".25"/>
      <path d="M8 44q0-8 8-9h16q8 1 8 9z" style="fill:var(--pants,#3b3f5c)"/>
      <path d="M13 38q0-16 11-16t11 16z" style="fill:var(--shirt,#e8735a)"/>
      <circle cx="16.5" cy="37.5" r="2.5" style="fill:var(--skin,#f2c7a0)"/>
      <circle cx="31.5" cy="37.5" r="2.5" style="fill:var(--skin,#f2c7a0)"/>
      <circle cx="24" cy="14" r="8" style="fill:var(--skin,#f2c7a0)"/>
      <path d="M16 14a8 8 0 0 1 16 0q-4-3-8-3t-8 3z" style="fill:var(--hair,#2b2233)"/>
    </symbol>

    <!-- 쪽지(메모지): "맡아둔 자리" 표식 -->
    <symbol id="spr-note" viewBox="0 0 48 48">
      <g transform="rotate(-6 24 24)">
        <path d="M11 10h30v24l-8 8H11z" fill="#000" opacity=".25"/>
        <path d="M9 8h30v24l-8 8H9z" fill="#fff3b0"/>
        <path d="M39 32h-8v8z" fill="#e6d27a"/>
        <path d="M14 17h20M14 23h20M14 29h12" stroke="#c9a04a" stroke-width="2" stroke-linecap="round"/>
        <rect x="18" y="4" width="12" height="6" rx="1" fill="#fff" opacity=".55"/>
      </g>
    </symbol>

    <!-- (보너스) 화남 마크: 오인 단속 이펙트용 -->
    <symbol id="spr-anger" viewBox="0 0 48 48">
      <g fill="none" stroke="#e8483b" stroke-width="5" stroke-linecap="round">
        <path d="M8 20q8 0 10-12"/><path d="M28 8q2 12 12 12"/>
        <path d="M40 28q-10 0-12 12"/><path d="M20 40q-2-12-12-12"/>
      </g>
    </symbol>

  </defs>
</svg>
```

### 관람객 3종 (색만 다르게) + 사용 CSS

```css
.spr { width: clamp(26px, 8.5vw, 40px); height: auto; aspect-ratio: 1; display: block; flex: none; }
.mat .items { display: flex; align-items: flex-end; justify-content: center; gap: 0; }
.mat .items .spr + .spr { margin-left: -6px; }          /* 짐 2개는 살짝 겹쳐 '쌓아둔' 느낌 */

.who-a { --shirt: #e8735a; --pants: #3b3f5c; --skin: #f2c7a0; --hair: #2b2233; } /* 코랄 티셔츠 */
.who-b { --shirt: #7c6cf0; --pants: #2e4a6b; --skin: #d9a57c; --hair: #6b3f24; } /* 보라 후드, 갈색 머리 */
.who-c { --shirt: #4fb3a0; --pants: #5a4a3a; --skin: #f0c8a8; --hair: #d8d8e0; } /* 어르신, 은발 */
.who-kid { transform: scale(.78); transform-origin: 50% 100%; }                   /* 아이: 축소만 */
```

### game.html 연결 예시 (이모지 → 스프라이트)

```js
const HOG_ITEMS = ["backpack", "icebox", "parasol", "chair", "tent"];
const PEOPLE = [["who-a"], ["who-b"], ["who-c"], ["who-a", "who-c"], ["who-b", "who-kid"]]; // 1~2명
const spr = (id, cls = "") => `<svg class="spr ${cls}" aria-hidden="true"><use href="#spr-${id}"/></svg>`;

// render() 안
if (c.kind === "hog") {
  const n = 1 + Math.floor(Math.random() * 2);
  const items = Array.from({ length: n }, () => spr(pick(HOG_ITEMS))).join("");
  m.innerHTML = `<span class="tag">${pick(HOG_TAGS)}</span><span class="items">${items}</span>`;
} else {
  const group = pick(PEOPLE).map((w) => spr("person", w)).join("");
  m.innerHTML = `<span class="items">${group}</span><span class="age"><i></i></span>`;
}
```

`.tag` 는 쪽지 질감을 CSS로 맞춥니다. 쪽지 아이콘을 따로 쓰려면 `spr("note")` 를 돗자리 귀퉁이에 둡니다.

```css
.mat .tag { background: #fff3b0; color: var(--paper-ink);
  background-image: linear-gradient(225deg, #e6d27a 6px, transparent 6px); } /* 접힌 귀퉁이 */
```

---

## 3. 돗자리 패턴 2종 (CSS 그라디언트)

| | 선점용 `.mat.hog` | 관람객용 `.mat.family` |
|---|---|---|
| 소재 | 파란 체크 비닐 돗자리 | 노란 왕골 돗자리 + 팥색 테두리 천 |
| 느낌 | 차갑고 반짝임, 무인 | 따뜻하고 결이 보임, 사람 냄새 |
| 색 외 구분 단서 | **바둑판 체크** + 비닐 광택 | **세로 짜임 결** + 굵은 테두리 |

```css
/* 선점용: 파란·흰 깅엄 체크 비닐. 겹치는 칸이 더 밝아져 체크가 생김. 맨 위 레이어는 비닐 광택 */
.mat.hog {
  background-color: var(--mat-hog);
  background-image:
    linear-gradient(135deg, rgba(255,255,255,.22), transparent 38%),
    linear-gradient(90deg, rgba(255,255,255,.26) 50%, transparent 0),
    linear-gradient(0deg,  rgba(255,255,255,.26) 50%, transparent 0);
  background-size: 100% 100%, 14px 14px, 14px 14px;
  box-shadow: inset 0 0 0 2px rgba(255,255,255,.16), 0 3px 0 rgba(0,0,0,.35);
}

/* 관람객용: 왕골 세로 짜임 + 가로 엮음 실 + 팥색 테두리 천 + 초롱빛 반사 */
.mat.family {
  background-color: var(--mat-family);
  background-image:
    radial-gradient(120% 80% at 20% 0%, rgba(255,214,140,.35), transparent 60%),
    repeating-linear-gradient(0deg, rgba(90,50,10,.22) 0 1px, transparent 1px 11px),
    repeating-linear-gradient(90deg, rgba(0,0,0,.10) 0 2px, transparent 2px 5px);
  box-shadow: inset 0 0 0 3px var(--mat-family-deep), inset 0 0 0 5px rgba(0,0,0,.15), 0 3px 0 rgba(0,0,0,.35);
}

/* 범례 견본도 같은 무늬, 작은 크기로 */
.legend .sw.hog    { background: linear-gradient(90deg, rgba(255,255,255,.26) 50%, transparent 0) 0 0/8px 8px,
                                 linear-gradient(0deg, rgba(255,255,255,.26) 50%, transparent 0) 0 0/8px 8px, var(--mat-hog); }
.legend .sw.family { background: repeating-linear-gradient(90deg, rgba(0,0,0,.12) 0 2px, transparent 2px 4px), var(--mat-family);
                     box-shadow: inset 0 0 0 2px var(--mat-family-deep); }
```

---

## 4. 연출

### 4-1. 걷어낼 때: 휙 걷기 + 단속 도장 + 초롱색 파편

돗자리를 왼쪽 아래 모서리를 축으로 들어 올려 오른쪽 위로 휙 날립니다. 그 자리에 빨간 원형 "단속" 도장이 쾅 찍히고, 초롱색 종이 파편 8개가 튑니다. 지속 시간은 기존 재배치 타이밍(350ms)에 맞췄습니다.

```css
.mat.cleared { transform-origin: 0% 100%; animation: yank .35s cubic-bezier(.5,-.4,.7,.6) forwards; }
@keyframes yank {
  30%  { transform: skewX(-10deg) scaleY(.9); }
  100% { transform: translate(45%, -75%) rotate(-30deg) scale(.4); opacity: 0; }
}

.stamp {
  position: absolute; left: 50%; top: 50%; z-index: 2; pointer-events: none;
  width: 56%; aspect-ratio: 1; display: grid; place-items: center;
  border: 3px solid var(--lantern-red); border-radius: 50%;
  color: var(--lantern-red); font-family: var(--font-display); font-size: clamp(13px, 4vw, 18px);
  transform: translate(-50%, -50%) rotate(-14deg);
  animation: stamp .5s cubic-bezier(.2,1.6,.4,1) forwards;
}
@keyframes stamp {
  0%   { transform: translate(-50%, -50%) rotate(-14deg) scale(2); opacity: 0; }
  35%  { transform: translate(-50%, -50%) rotate(-14deg) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) rotate(-14deg) scale(1); opacity: 0; }
}

.spark {
  position: absolute; left: 50%; top: 50%; width: 6px; height: 4px; border-radius: 1px;
  background: var(--c); pointer-events: none; z-index: 2;
  animation: spark .55s ease-out forwards;
}
@keyframes spark { to { transform: translate(var(--dx), var(--dy)) rotate(var(--r)); opacity: 0; } }
```

```js
const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
const SPARK_COLORS = ["#ffb347", "#e8483b", "#f3ecdc", "#ffe08a"];

function clearFx(i) {
  const el = cells[i].el;
  const s = document.createElement("span");
  s.className = "stamp"; s.textContent = "단속";
  el.appendChild(s); setTimeout(() => s.remove(), 500);
  if (REDUCE) return;                      // 모션 줄이기: 도장만(애니메이션은 전역 규칙으로 꺼짐)
  for (let k = 0; k < 8; k++) {
    const p = document.createElement("i");
    const a = (k / 8) * Math.PI * 2 + Math.random() * .5, d = 28 + Math.random() * 22;
    p.className = "spark";
    p.style.cssText = `--c:${SPARK_COLORS[k % 4]};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 10}px;--r:${Math.random() * 360}deg`;
    el.appendChild(p); setTimeout(() => p.remove(), 550);
  }
}
// hit()의 hog 분기에서: m.classList.add("cleared"); clearFx(i);
// 콤보 x5 달성 시: Fireworks.burst(rect.left + rect.width / 2, rect.top) (4-3 참고)
```

### 4-2. 오인 단속: 사람이 깜짝 튀고, 화남 마크, 화면 가장자리 빨간 경보

기존 `.field.shake` 는 그대로 두고 세 가지를 더합니다. ① 관람객 스프라이트가 위로 튀었다 내려앉는 스쿼시 동작 ② 머리 위 화남 마크(`#spr-anger`) ③ 잔디밭 테두리에 빨간 비네트가 한 번 번쩍임.

```css
.cell.oops .mat { animation: startle .4s ease-out; }
@keyframes startle {
  30% { transform: translateY(-12%) scale(1.06, .94); }
  60% { transform: translateY(0) scale(.96, 1.04); }
}
.cell.oops::after {
  content: ""; position: absolute; inset: 2px; border-radius: 8px; pointer-events: none;
  box-shadow: 0 0 0 3px var(--lantern-red), 0 0 18px 4px rgba(232,72,59,.6);
  animation: fade .5s ease-out forwards;
}
.anger-mark { position: absolute; right: 4%; top: 2%; width: 38%; z-index: 2; pointer-events: none;
  animation: angerPop .6s cubic-bezier(.2,1.8,.4,1) forwards; }
@keyframes angerPop { 0% { transform: scale(0); } 25% { transform: scale(1.15); } 80% { opacity: 1; } 100% { transform: scale(1); opacity: 0; } }

.field::after {
  content: ""; position: absolute; inset: 0; border-radius: 14px; pointer-events: none; opacity: 0;
  box-shadow: inset 0 0 0 2px var(--lantern-red), inset 0 0 40px 8px rgba(232,72,59,.45);
}
.field.alarm::after { animation: fade .45s ease-out; }
@keyframes fade { from { opacity: 1; } to { opacity: 0; } }
```

```js
function oopsFx(i) {
  const el = cells[i].el;
  el.classList.remove("oops"); field.classList.remove("alarm");
  void el.offsetWidth;                                   // 애니메이션 재시작
  el.classList.add("oops"); field.classList.add("alarm");
  el.insertAdjacentHTML("beforeend", '<svg class="spr anger-mark" aria-hidden="true"><use href="#spr-anger"/></svg>');
  const mark = el.lastElementChild;
  setTimeout(() => { mark.remove(); el.classList.remove("oops"); }, 600);
  if (navigator.vibrate) navigator.vibrate(60);          // 모바일 촉각 피드백(지원 기기만)
}
// hit()의 family 분기에서 field.classList.add("shake") 옆에 oopsFx(i);
```

### 4-3. 배경 불꽃 (Canvas, 가벼운 방식)

성능 원칙은 다음과 같습니다.
- **쉴 때는 루프를 돌리지 않습니다.** 발사는 `setTimeout` 으로 하고, 파티클이 남아 있을 때만 `requestAnimationFrame` 이 돕니다.
- 약 30fps 로 제한하고, DPR 은 1.5 로 상한을 둡니다. 파티클은 `arc` 대신 `fillRect` 2×2 로 그리고, 전체 수는 220개 이하로 묶습니다.
- 잔상은 `destination-out` 반투명 지우기로 만듭니다. 캔버스가 투명하게 유지되므로 body 배경 그라디언트가 그대로 보입니다.
- 탭이 숨겨지면 멈추고, `prefers-reduced-motion` 이면 아예 쏘지 않습니다.
- 하늘(화면 위 0~35%)에서만 터지게 해서 플레이 영역의 가독성을 지킵니다.

```html
<canvas id="sky" aria-hidden="true"></canvas>
```

```css
#sky { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
.wrap { position: relative; z-index: 1; }
```

```js
const Fireworks = (() => {
  const cv = document.getElementById("sky"), ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = ["#ffb347", "#e8483b", "#ffe08a", "#7fd6ff", "#ff8fc7"];
  const MAX = 220, G = 70;                     // 최대 파티클, 중력(px/s²)
  const P = [];                                // {x,y,vx,vy,t,life,c,rocket,ty}
  let W = 0, H = 0, raf = 0, last = 0, tid = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr | 0; cv.height = H * dpr | 0;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function wake() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } }

  function launch() {
    if (P.length > MAX - 40) return;
    const c = COLORS[Math.random() * COLORS.length | 0];
    P.push({ rocket: true, x: W * (.12 + Math.random() * .76), y: H * .5, vx: (Math.random() - .5) * 30,
             vy: -H * .9, ty: H * (.06 + Math.random() * .28), t: 0, life: 9, c });
    wake();
  }
  function burst(x, y, c = COLORS[Math.random() * COLORS.length | 0]) {
    if (reduce) return;
    const n = Math.min(26 + (Math.random() * 14 | 0), MAX - P.length);
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2, s = 55 + Math.random() * 70;
      P.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, t: 0, life: .9 + Math.random() * .6,
               c: Math.random() < .2 ? "#fff6dc" : c });
    }
    wake();
  }

  function tick(now) {
    if (now - last < 33) { raf = requestAnimationFrame(tick); return; }   // ~30fps
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,.25)"; ctx.fillRect(0, 0, W, H);           // 잔상 지우기
    ctx.globalCompositeOperation = "lighter";
    for (let k = P.length - 1; k >= 0; k--) {
      const p = P[k];
      p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.rocket) {
        p.vy *= 1 - 1.2 * dt;
        if (p.y <= p.ty || p.vy > -40) { P[k] = P[P.length - 1]; P.pop(); burst(p.x, p.y, p.c); continue; }
        ctx.globalAlpha = .9; ctx.fillStyle = p.c; ctx.fillRect(p.x - 1, p.y - 2, 2, 4);
        continue;
      }
      p.vx *= 1 - 1.6 * dt; p.vy = p.vy * (1 - 1.6 * dt) + G * dt;
      const a = 1 - p.t / p.life;
      if (a <= 0) { P[k] = P[P.length - 1]; P.pop(); continue; }            // swap-pop 제거
      ctx.globalAlpha = a; ctx.fillStyle = p.c; ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
    }
    ctx.globalAlpha = 1;
    if (P.length) raf = requestAnimationFrame(tick);
    else { ctx.clearRect(0, 0, W, H); raf = 0; }                          // 반올림 잔상 완전 제거 후 휴식
  }

  function schedule() {
    clearTimeout(tid);
    if (reduce || document.hidden) return;
    tid = setTimeout(() => { launch(); schedule(); }, 1400 + Math.random() * 2000);
  }
  addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", schedule);
  resize(); schedule();
  return { burst, launch, stop: () => clearTimeout(tid), start: schedule };
})();

// 사용 예: 게임 종료(생존) 축하 연발
// if (survived) for (let k = 0; k < 4; k++) setTimeout(Fireworks.launch, k * 250);
```

---

## 5. 적용 체크리스트

- [ ] `:root` 토큰 교체, `.mat.hog/.family` 와 `.legend .sw` 하드코딩 색 → 토큰
- [ ] 스프라이트 시트를 `<body>` 첫 자식으로 추가, `HOG_ITEMS`/`PEOPLE` 를 스프라이트 id 로 교체
- [ ] `clearFx` / `oopsFx` 를 `hit()` 에 연결, `#sky` 캔버스와 `Fireworks` 추가
- [ ] 저사양 폰에서 확인: 돗자리 20칸 × SVG 최대 2개 = `<use>` 40개 정도로 부담 없음, 불꽃은 쉴 때 CPU 0
- [ ] 모션 줄이기 설정에서 도장과 경보만 정적으로 보이고 파편·불꽃은 나오지 않는지 확인
