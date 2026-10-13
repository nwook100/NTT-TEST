# 돗자리 단속반 — 사운드 디자인

> 단일 HTML 파일, CSP 때문에 외부 오디오 파일 로드 불가. 모든 소리는 **Web Audio API 합성**으로만 만든다.
> 아래 `const SFX = {...}` 블록 하나를 `game.html`의 `<script>` 안에 붙여 넣으면 된다(기존 `beep()`는 대체).

## 1. 사운드 컨셉

축제 밤 잔디밭, 멀리서 무대 리허설과 불꽃놀이가 들리는 공간이다. 플레이어의 핵심 행동인 "돗자리 걷기"는 **사물놀이의 꽹과리 한 방**처럼 짧고 금속성이며 타격감이 분명해야 한다. 콤보가 쌓이면 꽹과리 피치가 5음계로 올라가며 장단이 몰아치는 느낌을 주고, 오인 단속은 관중의 "우우~" 야유처럼 미끄러져 내려가는 소리로 즉시 "실수했다"를 알린다. 배경은 아리랑 계열 5음계의 짧은 민요풍 루프를 북·장구 장단 위에 아주 낮은 볼륨으로 깔아 축제 분위기를 유지하되 효과음을 절대 가리지 않는다. 전체 톤은 진지한 단속이 아니라 **유쾌한 축제 놀이** — 짧고, 밝고, 리듬감 있게.

### 효과음 요약표

| 함수 | 상황 | 소리 | 길이 |
|---|---|---|---|
| `clear(combo)` | 돗자리 걷기 (콤보 1~5) | 꽹과리 타격, E5→F#5→A5→B5→D6 상승. x3부터 반짝임, x5는 더블 스트로크 | 0.22~0.4s |
| `wrong()` | 오인 단속 | 디튠 톱니파 "우우~" 하강 야유 + 바닥 쿵 | 0.5s |
| `seat()` | 관람객 착석 | 삼각파 C5→G5 상행 두 음 + 종 꼬리 (만족) | 0.45s |
| `warnTick()` | 민원 게이지 ≥70% (0.5s마다) | 딱딱한 클릭 + 낮은 북 | 0.12s |
| `countTick(sec)` | 남은 10초 매초 | 목탁 틱, 3초 이하 높게 두 번 | 0.06~0.2s |
| `fanfare()` | 스테이지 클리어 | G-B-D-G 아르페지오 → 화음 + 북 + 꽹과리 연타 | 1.5s |
| `fail()` | 실패(민원 폭발) | 하행 3음 톱니파 → 저역 "웅-" 꺼짐 | 1.9s |
| `tap()` | 버튼 탭 | 사인 톡 + 고역 클릭 | 0.05s |
| `firework(pan)` | 배경 불꽃놀이 "펑" | 저역 노이즈 폭발 + 서브 썸프 + 불티, 좌우 패닝 | 0.9s |
| `startBgm()/stopBgm()` | 플레이 중 | 4마디 민요풍 루프 (볼륨 0.35) | 8.9s 반복 |

## 2·3·4. 코드 — `const SFX = {...}` (효과음 레시피 + 배경 루프 + AudioContext/iOS 규칙)

```js
const SFX = {
  // ───────────────────────── 상태 ─────────────────────────
  ctx: null,        // AudioContext — 사용자 첫 제스처 후에만 생성
  master: null,     // 마스터 게인 (음소거 = gain 0)
  muted: false,
  _noiseBuf: null,  // 1초짜리 백색소음 버퍼 (한 번만 생성)
  bgm: { on: false, timer: 0, nextTime: 0, step: 0, gain: null },

  // ───────────── 4. 초기화 / iOS 잠금 해제 규칙 ─────────────
  // 규칙 1) new AudioContext() 와 resume() 은 반드시 사용자 제스처(pointerdown/touchend/keydown/click)
  //         핸들러 안에서 동기적으로 호출한다. 페이지 로드 시점에 만들면 iOS/Chrome 모두 suspended 로 묶인다.
  // 규칙 2) iOS Safari 는 resume() 만으로 안 풀리는 버전이 있어 같은 제스처 안에서 무음 버퍼를 1샘플 재생한다.
  // 규칙 3) 전화 수신·백그라운드 전환 후 state 가 "interrupted"/"suspended" 가 되므로
  //         visibilitychange 와 이후 모든 제스처에서 resume() 을 다시 시도한다.
  // 규칙 4) iOS 는 Web Audio 도 측면 무음 스위치를 따른다. 소리가 안 나면 먼저 그걸 의심한다(버그 아님).
  init() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!this.ctx) {
      this.ctx = new AC({ latencyHint: "interactive" });
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 1;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state !== "running") {
      this.ctx.resume().catch(() => {});
      try { // iOS 무음 버퍼 트릭
        const b = this.ctx.createBuffer(1, 1, 22050);
        const s = this.ctx.createBufferSource();
        s.buffer = b; s.connect(this.ctx.destination); s.start(0);
      } catch (e) {}
    }
    return this.ctx;
  },

  // 페이지 로드 직후 한 번 호출. 첫 제스처에서 init(), 이후 suspended 면 제스처마다 resume.
  installUnlock(target = document) {
    const onGesture = () => { this.init(); };
    ["pointerdown", "touchend", "keydown"].forEach((ev) =>
      target.addEventListener(ev, onGesture, { passive: true, capture: true }));
    document.addEventListener("visibilitychange", () => {
      if (this.ctx && document.visibilityState === "visible" && this.ctx.state !== "running") {
        this.ctx.resume().catch(() => {});
      }
    });
    this.loadMute();
  },

  // ───────────────────── 음소거 토글 ─────────────────────
  setMuted(m) {
    this.muted = !!m;
    try { localStorage.setItem("seathog-muted", this.muted ? "1" : "0"); } catch (e) {}
    if (this.master) {
      const g = this.master.gain, t = this.ctx.currentTime;
      g.cancelScheduledValues(t); g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(this.muted ? 0 : 1, t + 0.05); // 클릭 노이즈 방지용 짧은 램프
    }
    return this.muted;
  },
  toggleMute() { return this.setMuted(!this.muted); },
  loadMute() { try { this.muted = localStorage.getItem("seathog-muted") === "1"; } catch (e) {} return this.muted; },

  // ───────────────────── 합성 프리미티브 ─────────────────────
  _c() { return this.ctx && this.ctx.state !== "closed" ? this.ctx : null; },

  // 단일 오실레이터 음. o: { type, to(목표 주파수로 글라이드), gain, attack, delay, out }
  _tone(freq, dur, o = {}) {
    const c = this._c(); if (!c) return;
    const t0 = c.currentTime + (o.delay || 0);
    const osc = c.createOscillator(), g = c.createGain();
    osc.type = o.type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(o.gain ?? 0.15, t0 + (o.attack || 0.004));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(o.out || this.master);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  },

  // 필터 노이즈. o: { filter(lowpass|highpass|bandpass), freq, to, q, gain, attack, delay, out }
  _noise(dur, o = {}) {
    const c = this._c(); if (!c) return;
    if (!this._noiseBuf) {
      const n = c.sampleRate, buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      this._noiseBuf = buf;
    }
    const t0 = c.currentTime + (o.delay || 0);
    const src = c.createBufferSource(); src.buffer = this._noiseBuf; src.loop = true;
    const f = c.createBiquadFilter(); f.type = o.filter || "bandpass"; f.Q.value = o.q || 1;
    f.frequency.setValueAtTime(o.freq || 2000, t0);
    if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t0 + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(o.gain ?? 0.2, t0 + (o.attack || 0.003));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(o.out || this.master);
    src.start(t0); src.stop(t0 + dur + 0.02);
  },

  // 꽹과리/징 계열 금속 타격: 비정수배 배음 4개(짧게 처지는 피치) + 고역 노이즈 클릭
  _metal(base, dur, o = {}) {
    const c = this._c(); if (!c) return;
    const t0 = c.currentTime + (o.delay || 0);
    const ratios = [1, 1.48, 2.07, 2.93], gains = [1, 0.55, 0.35, 0.2];
    const out = c.createGain(); out.gain.value = o.gain ?? 0.18; out.connect(o.out || this.master);
    ratios.forEach((r, i) => {
      const osc = c.createOscillator(), g = c.createGain();
      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(base * r, t0);
      osc.frequency.exponentialRampToValueAtTime(base * r * 0.985, t0 + dur);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(gains[i], t0 + 0.002);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur * (1 - i * 0.15));
      osc.connect(g).connect(out);
      osc.start(t0); osc.stop(t0 + dur + 0.02);
    });
    this._noise(0.03, { filter: "highpass", freq: 4000, gain: (o.gain ?? 0.18) * 0.8, delay: o.delay || 0, out: o.out });
  },

  // ───────────────────── 2. 효과음 ─────────────────────

  // 돗자리 걷기 — combo 1~5. 꽹과리 한 방, 콤보마다 5음계로 피치 상승(E5 F#5 A5 B5 D6)
  clear(combo = 1) {
    const k = Math.max(1, Math.min(5, combo)) - 1;
    const base = [660, 740, 880, 990, 1175][k];
    this._metal(base, 0.22 + k * 0.03, { gain: 0.16 + k * 0.015 });
    if (k >= 2) this._tone(base * 2, 0.12, { type: "sine", gain: 0.05, delay: 0.03 });   // x3부터 반짝임 추가
    if (k === 4) this._metal(base * 1.5, 0.3, { delay: 0.07, gain: 0.12 });              // x5: 더블 스트로크
  },

  // 오인 단속 — "우우~" 야유. 디튠된 톱니파 2개가 비브라토 걸린 채 미끄러져 내려감 + 바닥 쿵
  wrong() {
    const c = this._c(); if (!c) return;
    const t0 = c.currentTime;
    const f = c.createBiquadFilter(); f.type = "lowpass"; f.Q.value = 4;
    f.frequency.setValueAtTime(1200, t0); f.frequency.exponentialRampToValueAtTime(250, t0 + 0.45);
    f.connect(this.master);
    const lfo = c.createOscillator(), lfoG = c.createGain();
    lfo.frequency.value = 7; lfoG.gain.value = 25; lfo.connect(lfoG);
    [0, 9].forEach((det) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = "sawtooth"; o.detune.value = det; lfoG.connect(o.detune);
      o.frequency.setValueAtTime(230, t0); o.frequency.exponentialRampToValueAtTime(140, t0 + 0.45);
      g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(0.12, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
      o.connect(g).connect(f); o.start(t0); o.stop(t0 + 0.52);
    });
    lfo.start(t0); lfo.stop(t0 + 0.52);
    this._tone(90, 0.25, { type: "square", gain: 0.08, to: 60 });
  },

  // 관람객 착석 — "아, 앉았다" 만족감. 삼각파 두 음 상행(C5→G5) + 종 꼬리
  seat() {
    this._tone(523, 0.18, { type: "triangle", gain: 0.1 });
    this._tone(784, 0.35, { type: "triangle", gain: 0.1, delay: 0.09 });
    this._tone(1568, 0.3, { type: "sine", gain: 0.03, delay: 0.09 });
  },

  // 민원 게이지 70% 경고 틱 — 0.5초마다 호출. 딱딱한 클릭 + 낮은 북 둥
  warnTick() {
    this._tone(1400, 0.035, { type: "square", gain: 0.06, to: 900 });
    this._tone(110, 0.12, { type: "sine", gain: 0.1, to: 55 });
  },

  // 남은 10초 카운트 — 매초 호출(sec = 10..1). 목탁/딱따기 느낌, 3초 이하는 높게 두 번
  countTick(sec) {
    const hi = sec <= 3, f = hi ? 1320 : 880;
    this._tone(f, 0.06, { type: "triangle", gain: 0.12, to: f * 0.7 });
    this._noise(0.02, { filter: "highpass", freq: 5000, gain: 0.08 });
    if (hi) this._tone(f, 0.06, { type: "triangle", gain: 0.12, to: f * 0.7, delay: 0.12 });
  },

  // 스테이지 클리어 팡파레 — G-B-D-G 상행 아르페지오 → 화음 + 북 + 꽹과리 연타
  fanfare() {
    const notes = [392, 494, 587, 784];
    notes.forEach((f, i) => this._tone(f, 0.22, { type: "square", gain: 0.07, delay: i * 0.11 }));
    notes.forEach((f) => this._tone(f, 0.9, { type: "triangle", gain: 0.06, delay: 0.5 }));
    this._tone(98, 0.6, { type: "sine", gain: 0.12, delay: 0.5, to: 60 });
    [0, 0.09, 0.18, 0.27, 0.36].forEach((d, i) => this._metal(1047 + i * 60, 0.25, { delay: 0.55 + d, gain: 0.1 }));
  },

  // 실패 — 하행 3음(E♭4 C4 A♭3) 톱니파 → 저역 "웅-" 하고 꺼짐
  fail() {
    [[311, 0], [262, 0.22], [208, 0.44]].forEach(([f, d]) =>
      this._tone(f, 0.26, { type: "sawtooth", gain: 0.08, delay: d, to: f * 0.97 }));
    this._tone(104, 1.2, { type: "sawtooth", gain: 0.06, delay: 0.66, to: 52 });
    this._noise(0.9, { filter: "lowpass", freq: 400, to: 80, gain: 0.08, delay: 0.66 });
  },

  // 버튼 탭 — 아주 짧은 사인 톡 + 고역 클릭
  tap() {
    this._tone(900, 0.045, { type: "sine", gain: 0.08, to: 600 });
    this._noise(0.015, { filter: "highpass", freq: 3000, gain: 0.05 });
  },

  // 불꽃놀이 "펑" — 저역 노이즈 폭발 + 서브 썸프 + 뒤따르는 불티. pan: -1(왼쪽)~1(오른쪽)
  firework(pan = 0) {
    const c = this._c(); if (!c) return;
    let out = this.master;
    if (c.createStereoPanner) {
      const p = c.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan)); p.connect(this.master); out = p;
    }
    this._noise(0.7, { filter: "lowpass", freq: 1800, to: 120, q: 0.7, gain: 0.22, attack: 0.005, out });
    this._tone(90, 0.5, { type: "sine", gain: 0.2, to: 35, out });
    for (let i = 0; i < 6; i++) {
      this._noise(0.02, { filter: "bandpass", freq: 3000 + Math.random() * 3000, q: 3, gain: 0.04,
                          delay: 0.25 + Math.random() * 0.6, out });
    }
  },

  // ───────────────────── 3. 배경 루프 ─────────────────────
  // 4마디 · 4/4 · 108 BPM · G 장조 5음계(아리랑 계열). 멜로디는 8분음표 32스텝, 베이스는 4분음표 16개.
  // 0 = 쉼표. MIDI 번호 사용(67 = G4).
  _song: {
    bpm: 108,
    melody: [67, 69, 71, 74, 71, 69, 67, 0,
             64, 67, 69, 71, 69, 0, 67, 0,
             74, 74, 71, 74, 76, 74, 71, 69,
             67, 69, 71, 69, 67, 0, 0, 0],
    bass:   [43, 43, 43, 43, 40, 40, 40, 40, 38, 38, 38, 38, 43, 43, 38, 43],
  },
  _mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); },

  // step 번째 8분음표를 절대시각 t 에 예약
  _scheduleStep(step, t) {
    const c = this._c(); if (!c) return;
    const s = this._song, out = this.bgm.gain, delay = Math.max(0, t - c.currentTime);
    const eighth = 60 / s.bpm / 2;
    const m = s.melody[step % s.melody.length];
    if (m) this._tone(this._mtof(m), eighth * 0.9, { type: "triangle", gain: 0.09, attack: 0.01, delay, out });
    if (step % 2 === 0) {                                   // 4분음표 자리
      const beat = (step / 2) % 4;
      this._tone(this._mtof(s.bass[(step / 2) % s.bass.length]), eighth * 1.6, { type: "sine", gain: 0.12, delay, out });
      if (beat === 0 || beat === 2) this._tone(70, 0.15, { type: "sine", gain: 0.2, to: 40, delay, out });   // 북
      else this._noise(0.03, { filter: "bandpass", freq: 2500, q: 2, gain: 0.05, delay, out });              // 장구 채
    }
    if (step % s.melody.length === 0) this._metal(1200, 0.3, { gain: 0.05, delay, out });                    // 마디 첫머리 꽹과리
  },

  // 룩어헤드 스케줄러: setInterval(30ms) 로 깨어나 0.12초 앞까지 예약. 탭이 숨겨져 타이머가 늦어도
  // AudioContext 시계 기준이라 박자가 밀리지 않고, suspended 동안은 currentTime 이 멈추므로 몰아서 울리지 않음.
  startBgm() {
    const c = this.init(); if (!c || this.bgm.on) return;
    if (!this.bgm.gain) {
      this.bgm.gain = c.createGain(); this.bgm.gain.gain.value = 0.35;   // 효과음보다 확실히 낮게
      this.bgm.gain.connect(this.master);
    }
    this.bgm.on = true; this.bgm.step = 0; this.bgm.nextTime = c.currentTime + 0.05;
    const LOOKAHEAD = 0.12, eighth = 60 / this._song.bpm / 2;
    const tick = () => {
      if (!this.bgm.on) return;
      while (this.bgm.nextTime < c.currentTime + LOOKAHEAD) {
        this._scheduleStep(this.bgm.step, this.bgm.nextTime);
        this.bgm.step = (this.bgm.step + 1) % this._song.melody.length;
        this.bgm.nextTime += eighth;
      }
    };
    tick();
    this.bgm.timer = setInterval(tick, 30);
  },
  stopBgm() { this.bgm.on = false; clearInterval(this.bgm.timer); this.bgm.timer = 0; },
};
```

## game.html 연동 포인트 (참고 — game.html은 이 문서에서 수정하지 않음)

```js
// 로드 직후: 첫 제스처 잠금 해제 리스너 + 음소거 설정 복원
SFX.installUnlock();

// "단속 시작" / "다시 단속" 버튼 (사용자 제스처 안이므로 여기서 init + BGM 시작이 안전)
$("start").addEventListener("click", () => { SFX.init(); SFX.tap(); SFX.startBgm(); start(); });

// hit(): 선점 돗자리 — 콤보 증가 "전" 값으로 호출해야 x1~x5가 그대로 피치 단계가 됨
SFX.clear(state.combo);            // 기존 beep(660 + state.combo * 80) 자리
// hit(): 오인 단속
SFX.wrong();                       // 기존 beep(140, 0.25, "sawtooth") 자리
// hit() 안 setTimeout: 대기 관람객이 자리에 앉을 때
if (state.queue > 0) { state.queue--; place("family", performance.now(), i); SFX.seat(); }

// loop(): 민원 70% 경고 틱 (0.5초 간격), 10초 카운트다운 (정수 초가 바뀔 때마다)
if (state.anger >= 70 && now - (state.warnAt || 0) > 500) { state.warnAt = now; SFX.warnTick(); }
const sec = Math.ceil(state.left);
if (sec <= 10 && sec !== state.lastSec) { state.lastSec = sec; if (sec > 0) SFX.countTick(sec); }
// loop(): 배경 불꽃놀이 — 2~5초마다 무작위, 좌우 패닝
if (now > (state.fwAt || 0)) { state.fwAt = now + 2000 + Math.random() * 3000; SFX.firework(Math.random() * 2 - 1); }

// end(): 결과
SFX.stopBgm();
survived ? SFX.fanfare() : SFX.fail();   // 기존 beep(survived ? 880 : 110, ...) 자리
```

음소거 토글 버튼 예시 (HUD 옆에 두기):

```html
<button class="btn" id="mute" type="button" aria-pressed="false" style="font-size:14px;padding:6px 12px">소리 켜짐</button>
<script>
  const muteBtn = document.getElementById("mute");
  const syncMute = (m) => { muteBtn.textContent = m ? "소리 꺼짐" : "소리 켜짐"; muteBtn.setAttribute("aria-pressed", String(m)); };
  syncMute(SFX.loadMute());
  muteBtn.addEventListener("click", () => { SFX.init(); syncMute(SFX.toggleMute()); });
</script>
```

## 설계 메모

- **게인 레벨**: 효과음 피크 0.1~0.2, BGM 버스 0.35 × 개별 음 0.09~0.2. 여러 효과음이 겹쳐도 마스터가 클리핑하지 않는 범위다. 더 크게 들리게 하고 싶으면 `master` 뒤에 `DynamicsCompressor`를 하나 끼우는 것이 개별 게인을 올리는 것보다 안전하다.
- **꽹과리 레시피(`_metal`)**: 기본음 + 비정수배 배음(1.48/2.07/2.93)이 금속성을 만들고, 모든 배음이 0.985배로 살짝 처지는 피치 글라이드가 "맞은 쇠" 느낌을 준다. 고역 노이즈 30ms가 채가 닿는 순간의 "딱"이다.
- **노이즈 버퍼**는 1초짜리 하나를 만들어 `loop = true`로 재사용한다. 매 호출마다 버퍼를 만들면 저사양 폰에서 GC 끊김이 생긴다.
- **스케줄러**는 Chris Wilson의 "A Tale of Two Clocks" 패턴. `setInterval`은 깨우는 용도일 뿐, 음의 시각은 전부 `AudioContext.currentTime` 기준이라 박자가 흔들리지 않는다. `suspended` 동안은 `currentTime`이 멈추므로 탭 복귀 시 밀린 음이 한꺼번에 터지지 않는다.
- **음소거**는 노드를 끊는 대신 `master.gain`을 50ms 램프로 0까지 내린다. 클릭 노이즈가 없고, BGM 스케줄러는 그대로 돌아 토글을 되돌리면 박자가 이어진다. 설정은 `localStorage("seathog-muted")`에 저장.
- **`prefers-reduced-motion`**과는 별개로, 경고 틱·카운트다운은 시각 신호(게이지 색, 숫자)와 항상 함께 가야 한다. 소리를 끈 플레이어도 같은 정보를 받아야 하기 때문이다.
- **iOS 체크리스트**: (1) 로드 시 `new AudioContext()` 금지 → `installUnlock()`이 첫 제스처에서 생성, (2) `resume()` + 무음 버퍼를 같은 제스처에서, (3) `visibilitychange`에서 재 resume, (4) 측면 무음 스위치는 Web Audio도 따르므로 "소리가 안 나요"의 1순위 원인, (5) `touchend`를 리스너에 포함(구형 iOS는 `pointerdown`만으로 안 풀리는 경우가 있음).
