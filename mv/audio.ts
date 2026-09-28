// NTT26 오리지널 데모곡 신시사이저 (Web Audio API)
// 4파트 구성: 잔잔한 기타(A) → 헤비(B) → 빗속 합창(C) → 헤비 리프라이즈(D) → 마지막 한 방

export const BPM = 90;
export const BEAT = 60 / BPM;
export const BAR = BEAT * 4;
export const TOTAL_BARS = 28;
export const TAIL = 5;
export const DEMO_DURATION = TOTAL_BARS * BAR + TAIL;

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

// A minor 계열 코드 (MIDI)
const CH = {
  Am: [57, 60, 64, 69],
  AmG: [55, 60, 64, 69],
  Fmaj7: [53, 57, 60, 64],
  E: [52, 56, 59, 64],
  F: [53, 57, 60, 65],
  C: [48, 55, 60, 64],
  G: [55, 59, 62, 67],
  Dm: [50, 57, 62, 65],
};
const A_CHORDS = [CH.Am, CH.AmG, CH.Fmaj7, CH.E];
const C_CHORDS = [CH.F, CH.C, CH.G, CH.Am, CH.F, CH.C, CH.Dm, CH.E];

// 헤비 리프: 8분음표 8개, 숫자 = 파워코드 루트, null = 쉼
const RIFF_X = [45, 45, null, 45, 48, null, 50, null];
const RIFF_Y = [45, 45, null, 45, 43, null, 41, 40];

// D 파트 리드 멜로디
const LEAD: (number | null)[][] = [
  [76, null, 74, 72, 74, null, 76, null],
  [81, null, 79, 76, 74, 72, 74, null],
  [76, null, 74, 72, 74, null, 79, null],
  [76, null, null, null, null, null, null, null],
  [81, null, 84, 83, 81, 79, 76, null],
  [79, null, 81, null, null, null, null, null],
];

export class DemoBand {
  ctx: AudioContext;
  out: AudioNode;
  private mix: GainNode;
  private rev: ConvolverNode;
  private revSend: GainNode;
  private noise: AudioBuffer;
  private plucks = new Map<number, AudioBuffer>();
  private nextBar = 0;
  private timer: number | undefined;
  private rainGain: GainNode | null = null;
  startTime = 0;

  constructor(ctx: AudioContext, out: AudioNode) {
    this.ctx = ctx;
    this.out = out;
    this.mix = ctx.createGain();
    this.mix.gain.value = 0.6;
    this.mix.connect(out);

    this.rev = ctx.createConvolver();
    this.rev.buffer = this.impulse(2.6);
    this.revSend = ctx.createGain();
    this.revSend.gain.value = 0.35;
    this.revSend.connect(this.rev);
    this.rev.connect(this.mix);

    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }

  start(at: number) {
    this.startTime = at;
    this.nextBar = 0;
    this.pump();
    this.timer = window.setInterval(() => this.pump(), 100);
  }

  stop() {
    if (this.timer) window.clearInterval(this.timer);
    this.timer = undefined;
  }

  private pump() {
    const now = this.ctx.currentTime;
    while (this.nextBar <= TOTAL_BARS && this.startTime + this.nextBar * BAR < now + 1.0) {
      this.scheduleBar(this.nextBar, this.startTime + this.nextBar * BAR);
      this.nextBar++;
    }
    if (this.nextBar > TOTAL_BARS) this.stop();
  }

  private impulse(sec: number) {
    const n = Math.floor(this.ctx.sampleRate * sec);
    const b = this.ctx.createBuffer(2, n, this.ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
    }
    return b;
  }

  // ---------- 악기 ----------
  private env(t: number, peak: number, attack: number, decay: number, dest: AudioNode = this.mix) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    g.connect(dest);
    return g;
  }

  private noiseSrc(t: number, dur: number) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    s.start(t, Math.random() * 1.5);
    s.stop(t + dur);
    return s;
  }

  private kick(t: number, v = 1) {
    const o = this.ctx.createOscillator();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    o.connect(this.env(t, 0.9 * v, 0.003, 0.35));
    o.start(t);
    o.stop(t + 0.4);
  }

  private snare(t: number, v = 1) {
    const n = this.noiseSrc(t, 0.25);
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1200;
    const g = this.env(t, 0.5 * v, 0.002, 0.18);
    n.connect(hp).connect(g);
    g.connect(this.revSend);
    const o = this.ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = 190;
    o.connect(this.env(t, 0.35 * v, 0.002, 0.09));
    o.start(t);
    o.stop(t + 0.15);
  }

  private hat(t: number, v = 1, open = false) {
    const n = this.noiseSrc(t, open ? 0.35 : 0.08);
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7500;
    n.connect(hp).connect(this.env(t, 0.18 * v, 0.001, open ? 0.25 : 0.04));
  }

  private shaker(t: number, v = 1) {
    const n = this.noiseSrc(t, 0.1);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 5500;
    n.connect(bp).connect(this.env(t, 0.12 * v, 0.02, 0.05));
  }

  private rim(t: number, v = 1) {
    const o = this.ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = 1700;
    const g = this.env(t, 0.12 * v, 0.001, 0.03);
    o.connect(g);
    g.connect(this.revSend);
    o.start(t);
    o.stop(t + 0.06);
  }

  private crash(t: number, v = 1) {
    const n = this.noiseSrc(t, 2.2);
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 4000;
    const g = this.env(t, 0.28 * v, 0.003, 2.0);
    n.connect(hp).connect(g);
    g.connect(this.revSend);
  }

  private riser(t: number, dur: number) {
    const n = this.noiseSrc(t, dur);
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 3;
    bp.frequency.setValueAtTime(300, t);
    bp.frequency.exponentialRampToValueAtTime(7000, t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + dur);
    g.gain.linearRampToValueAtTime(0, t + dur + 0.02);
    n.connect(bp).connect(g).connect(this.mix);
  }

  private pluckBuf(midi: number) {
    let b = this.plucks.get(midi);
    if (b) return b;
    // Karplus-Strong 기타 줄 시뮬레이션
    const sr = this.ctx.sampleRate;
    const len = Math.floor(sr * 2.5);
    b = this.ctx.createBuffer(1, len, sr);
    const d = b.getChannelData(0);
    const p = Math.max(2, Math.round(sr / mtof(midi)));
    for (let i = 0; i < p; i++) d[i] = Math.random() * 2 - 1;
    for (let i = p; i < len; i++) d[i] = 0.497 * (d[i - p] + d[i - p + 1]);
    this.plucks.set(midi, b);
    return b;
  }

  private pluck(t: number, midi: number, v = 1) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.pluckBuf(midi);
    const g = this.ctx.createGain();
    g.gain.value = 0.32 * v;
    s.connect(g);
    g.connect(this.mix);
    g.connect(this.revSend);
    s.start(t);
    s.stop(t + 2.5);
  }

  private bass(t: number, midi: number, dur: number, v = 1) {
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 520;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.4 * v, t + 0.01);
    g.gain.setValueAtTime(0.4 * v, t + dur * 0.8);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    lp.connect(g).connect(this.mix);
    for (const type of ['sawtooth', 'sine'] as OscillatorType[]) {
      const o = this.ctx.createOscillator();
      o.type = type;
      o.frequency.value = mtof(midi);
      o.connect(lp);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
  }

  private shaper?: WaveShaperNode;
  private distCurve() {
    const n = 2048;
    const c = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1;
      c[i] = Math.tanh(x * 9);
    }
    return c;
  }

  // 디스토션 파워코드 (루트 + 5도 + 옥타브)
  private power(t: number, root: number, dur: number, v = 1) {
    const ws = this.ctx.createWaveShaper();
    ws.curve = this.distCurve();
    const pre = this.ctx.createGain();
    pre.gain.value = 0.5;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = dur < 0.2 ? 1400 : 2800;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16 * v, t + 0.008);
    g.gain.setValueAtTime(0.16 * v, t + dur * 0.85);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    pre.connect(ws).connect(lp).connect(g).connect(this.mix);
    for (const m of [root, root + 7, root + 12]) {
      for (const det of [-8, 8]) {
        const o = this.ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = mtof(m);
        o.detune.value = det;
        o.connect(pre);
        o.start(t);
        o.stop(t + dur + 0.05);
      }
    }
  }

  // "아~" 모음 합창 패드
  private choir(t: number, notes: number[], dur: number, v = 1) {
    const f1 = this.ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.value = 750;
    f1.Q.value = 4;
    const f2 = this.ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.frequency.value = 1150;
    f2.Q.value = 5;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35 * v, t + Math.min(0.7, dur * 0.4));
    g.gain.setValueAtTime(0.35 * v, t + dur * 0.75);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.4);
    f1.connect(g);
    f2.connect(g);
    g.connect(this.mix);
    g.connect(this.revSend);
    for (const m of notes) {
      for (const det of [-12, 0, 11]) {
        const o = this.ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = mtof(m + 12);
        o.detune.value = det;
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 5 + Math.random();
        const lg = this.ctx.createGain();
        lg.gain.value = 6;
        lfo.connect(lg).connect(o.detune);
        o.connect(f1);
        o.connect(f2);
        o.start(t);
        lfo.start(t);
        o.stop(t + dur + 0.5);
        lfo.stop(t + dur + 0.5);
      }
    }
  }

  private lead(t: number, midi: number, dur: number) {
    const o = this.ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = mtof(midi);
    const vib = this.ctx.createOscillator();
    vib.frequency.value = 5.5;
    const vg = this.ctx.createGain();
    vg.gain.setValueAtTime(0, t);
    vg.gain.linearRampToValueAtTime(14, t + Math.min(dur, 0.5));
    vib.connect(vg).connect(o.detune);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2600;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.11, t + 0.02);
    g.gain.setValueAtTime(0.11, t + dur * 0.85);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(lp).connect(g);
    g.connect(this.mix);
    g.connect(this.revSend);
    o.start(t);
    vib.start(t);
    o.stop(t + dur + 0.05);
    vib.stop(t + dur + 0.05);
  }

  private rain(t: number, dur: number) {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    s.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2400;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 500;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.07, t + 1.5);
    g.gain.setValueAtTime(0.07, t + dur - 3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(lp).connect(hp).connect(g).connect(this.mix);
    s.start(t);
    s.stop(t + dur + 0.1);
    this.rainGain = g;
  }

  // ---------- 편곡 ----------
  private heavyBar(bar: number, t: number, e: number) {
    const riff = bar % 2 === 0 ? RIFF_X : RIFF_Y;
    riff.forEach((root, i) => {
      if (root == null) return;
      const held = riff[i + 1] === null;
      const dur = held ? e * 1.9 : e * 0.55;
      this.power(t + i * e, root, dur);
      this.bass(t + i * e, root - 12, dur, 0.9);
    });
    for (let i = 0; i < 8; i++) this.hat(t + i * e, i % 2 ? 0.6 : 1);
    [0, 3, 4].forEach((k) => this.kick(t + k * e));
    [2, 6].forEach((k) => this.snare(t + k * e));
  }

  private scheduleBar(bar: number, t: number) {
    const e = BEAT / 2; // 8분음표

    // 마지막 한 방
    if (bar === TOTAL_BARS) {
      this.kick(t, 1.2);
      this.crash(t, 1.3);
      this.power(t, 45, 3.8, 1.1);
      this.bass(t, 33, 3.5);
      this.choir(t, CH.Am, 3.2, 0.8);
      return;
    }

    // A: 잔잔한 기타 아르페지오
    if (bar < 8) {
      const ch = A_CHORDS[bar % 4];
      const order = [0, 1, 2, 3, 2, 1, 2, 3];
      order.forEach((k, i) => this.pluck(t + i * e, ch[k] + (i === 3 ? 12 : 0), i === 0 ? 1.1 : 0.8));
      if (bar >= 2) {
        this.bass(t, ch[0] - 24, BEAT * 1.9, 0.7);
        this.bass(t + BEAT * 2, ch[0] - 24, BEAT * 1.9, 0.6);
        for (let i = 0; i < 8; i++) this.shaker(t + i * e, i % 2 ? 0.6 : 1);
      }
      if (bar >= 4) {
        this.kick(t, 0.6);
        this.kick(t + BEAT * 2.5, 0.4);
        this.rim(t + BEAT, 0.8);
        this.rim(t + BEAT * 3, 0.8);
      }
      if (bar === 7) {
        for (let i = 0; i < 8; i++) this.snare(t + BEAT * 2 + i * (BEAT / 4), 0.3 + i * 0.09);
        this.riser(t, BAR);
      }
      return;
    }

    // B: 헤비
    if (bar < 14) {
      if (bar % 2 === 0) this.crash(t);
      this.heavyBar(bar, t, e);
      if (bar === 13) this.crash(t + BEAT * 3.5, 0.7);
      return;
    }

    // C: 빗속 합창
    if (bar < 22) {
      const ch = C_CHORDS[bar - 14];
      if (bar === 14) this.rain(t, BAR * 7);
      this.choir(t, ch.slice(0, 3), BAR * 0.95, bar < 16 ? 0.7 : 1);
      this.bass(t, ch[0] - 24, BAR * 0.95, 0.6);
      for (let i = 0; i < 4; i++) this.pluck(t + i * BEAT, ch[(i + 1) % 4] + 12, 0.45);
      if (bar >= 16) {
        this.kick(t, 0.7);
        this.snare(t + BEAT * 2, 0.6);
        this.hat(t + BEAT * 3.5, 0.5, true);
      }
      if (bar === 21) {
        for (let i = 0; i < 8; i++) this.snare(t + BEAT * 2 + i * (BEAT / 4), 0.4 + i * 0.08);
        this.riser(t, BAR);
      }
      return;
    }

    // D: 헤비 리프라이즈 + 리드
    if (bar % 2 === 0) this.crash(t);
    this.heavyBar(bar, t, e);
    const mel = LEAD[bar - 22];
    mel.forEach((m, i) => {
      if (m == null) return;
      let n = 1;
      while (i + n < mel.length && mel[i + n] === null) n++;
      this.lead(t + i * e, m, n * e * 0.95);
    });
    if (bar >= 24) this.choir(t, [CH.Am, CH.F, CH.C, CH.E][(bar - 24) % 4].slice(0, 3), BAR * 0.95, 0.5);
  }
}

// 데모곡의 박자 펄스 (화면 흔들림/번쩍임용)
export function demoPulse(t: number): number {
  if (t < 0) return 0;
  const bar = Math.floor(t / BAR);
  const heavy = (bar >= 8 && bar < 14) || (bar >= 22 && bar < TOTAL_BARS);
  const final = bar === TOTAL_BARS && t - TOTAL_BARS * BAR < 1.5;
  if (final) return Math.exp(-(t - TOTAL_BARS * BAR) * 2.5);
  const bt = t % BEAT;
  if (heavy) return Math.exp(-bt * 9);
  if (bar >= 16 && bar < 22) return 0.35 * Math.exp(-(t % (BEAT * 2)) * 6);
  return 0;
}
