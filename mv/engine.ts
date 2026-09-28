// 뮤직비디오 엔진 — 오디오 재생, 장면 렌더링, 가사 자막, 영상 녹화
import { DemoBand, DEMO_DURATION, demoPulse } from './audio';
import { SCENES, DEMO_LYRICS } from './scenes';
import { GENERAL_SCENES, setSongInfo } from './scenesGeneral';
import { W, H, begin, ctx, paper, vignette, rain, text, hash, ease, clamp } from './draw';

export interface Lyric {
  from: number;
  to: number;
  text: string;
}

export type Theme = 'general' | 'ntt';

export type Song = { kind: 'demo' } | { kind: 'file'; name: string; buffer: AudioBuffer };

// LRC 형식 "[01:23.45] 가사" 파싱. 시간이 없으면 곡 전체에 고르게 배치
export function parseLyrics(src: string, duration: number): Lyric[] {
  const lines = src.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const timed: { t: number; text: string }[] = [];
  const plain: string[] = [];
  for (const l of lines) {
    const tags = [...l.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)];
    const body = l.replace(/\[[^\]]*\]/g, '').trim();
    if (tags.length) {
      for (const m of tags) if (body) timed.push({ t: +m[1] * 60 + +m[2], text: body });
    } else if (!/^\[/.test(l)) plain.push(l);
  }
  if (timed.length) {
    timed.sort((a, b) => a.t - b.t);
    return timed.map((l, i) => ({ from: l.t, to: Math.min(timed[i + 1]?.t ?? duration, l.t + 8), text: l.text }));
  }
  const step = duration / (plain.length + 1);
  return plain.map((text, i) => ({ from: step * (i + 0.5), to: step * (i + 1.4), text }));
}

const MIME_TYPES = ['video/mp4;codecs=avc1,mp4a.40.2', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];

export class MVEngine {
  private cv: HTMLCanvasElement;
  private c: CanvasRenderingContext2D;
  private ac: AudioContext | null = null;
  private band: DemoBand | null = null;
  private src: AudioBufferSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private freq = new Uint8Array(0);
  private energyAvg = 0;
  private livePulse = 0;
  private raf = 0;
  private t0 = 0;
  private recorder: MediaRecorder | null = null;
  private finish: (() => void) | null = null;
  song: Song = { kind: 'demo' };
  theme: Theme = 'ntt';
  lyrics: Lyric[] = DEMO_LYRICS;
  playing = false;
  onTime?: (t: number, duration: number) => void;
  onEnd?: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.cv = canvas;
    canvas.width = W;
    canvas.height = H;
    this.c = canvas.getContext('2d')!;
  }

  get duration() {
    return this.song.kind === 'demo' ? DEMO_DURATION : this.song.buffer.duration;
  }

  static async fontsReady() {
    try {
      await Promise.all([document.fonts.load("40px 'Jua'"), document.fonts.load("40px 'Black Han Sans'")]);
    } catch {
      /* 폰트가 없으면 기본 글꼴로 */
    }
  }

  // 한 프레임 그리기 (t = 곡 기준 초)
  renderAt(t: number, pulse = 0) {
    const c = this.c;
    const dur = this.duration;
    const T = clamp(t, 0, dur) * (DEMO_DURATION / dur); // 장면 타임라인으로 환산
    const stepT = Math.floor(T * 12) / 12; // 12fps "투스" 애니메이션
    begin(c, stepT);
    const list = this.theme === 'ntt' ? SCENES : GENERAL_SCENES;
    const scene = list.find((s) => T >= s.from && T < s.to) ?? list[list.length - 1];
    const lt = Math.floor((T - scene.from) * 12) / 12;

    c.save();
    if (pulse > 0.05) {
      const k = Math.floor(t * 30);
      c.translate((hash(k, 1) - 0.5) * 14 * pulse, (hash(k, 2) - 0.5) * 14 * pulse);
    }
    c.clearRect(-20, -20, W + 40, H + 40);
    scene.draw({ lt, len: scene.to - scene.from, pulse });
    rain(stepT, scene.rain ? scene.rain(lt) : 0);
    c.restore();

    // 컷 전환 시 하얀 번쩍임 (첫 두 프레임)
    if (lt < 2 / 12 && scene.from > 0) {
      c.fillStyle = `rgba(255,255,255,${0.5 - lt * 2.5})`;
      c.fillRect(0, 0, W, H);
    }

    // 가사 자막
    const ly = this.lyrics.find((l) => t >= l.from && t < l.to);
    if (ly) {
      const k = ease((t - ly.from) / 0.2);
      const out = clamp((ly.to - t) / 0.25);
      text(ly.text, W / 2, H - 62 + (1 - k) * 12, 42, '#fff', { alpha: Math.min(k, out), stroke: 9 });
    }

    paper(stepT, 0.09);
    vignette();
    // 페이드 인/아웃
    const fade = Math.min(clamp(t / 0.8), clamp((dur - t) / 1.2));
    if (fade < 1) {
      c.fillStyle = `rgba(0,0,0,${1 - fade})`;
      c.fillRect(0, 0, W, H);
    }
    ctx();
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    if (this.song.kind === 'demo') this.lyrics = theme === 'ntt' ? DEMO_LYRICS : [];
    this.renderIdle();
  }

  setSongInfo(title: string, artist: string) {
    setSongInfo(title, artist);
    this.renderIdle();
  }

  renderIdle() {
    this.renderAt(this.song.kind === 'demo' ? 3.2 : this.duration * 0.04);
  }

  async loadFile(file: File) {
    const ac = new AudioContext();
    const buffer = await ac.decodeAudioData(await file.arrayBuffer());
    await ac.close();
    this.song = { kind: 'file', name: file.name, buffer };
    this.lyrics = [];
    this.theme = 'general';
    this.renderIdle();
  }

  useDemo() {
    this.song = { kind: 'demo' };
    this.lyrics = this.theme === 'ntt' ? DEMO_LYRICS : [];
    this.renderIdle();
  }

  // 재생 (record=true면 영상 파일 Blob 반환)
  async play(record = false): Promise<Blob | null> {
    this.stop();
    await MVEngine.fontsReady();
    const ac = new AudioContext();
    this.ac = ac;
    await ac.resume();
    const master = ac.createGain();
    const comp = ac.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    master.connect(comp).connect(ac.destination);
    const streamDest = ac.createMediaStreamDestination();
    comp.connect(streamDest);

    const startAt = ac.currentTime + 0.25;
    if (this.song.kind === 'demo') {
      this.band = new DemoBand(ac, master);
      this.band.start(startAt);
    } else {
      const s = ac.createBufferSource();
      s.buffer = this.song.buffer;
      this.analyser = ac.createAnalyser();
      this.analyser.fftSize = 1024;
      this.freq = new Uint8Array(this.analyser.frequencyBinCount);
      s.connect(master);
      s.connect(this.analyser);
      s.start(startAt);
      this.src = s;
    }
    this.t0 = startAt;
    this.playing = true;

    let blob: Promise<Blob> | null = null;
    if (record) {
      const stream = new MediaStream([...this.cv.captureStream(30).getVideoTracks(), ...streamDest.stream.getAudioTracks()]);
      const mimeType = MIME_TYPES.find((m) => MediaRecorder.isTypeSupported(m)) ?? '';
      const rec = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
      const chunks: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      blob = new Promise((res) => (rec.onstop = () => res(new Blob(chunks, { type: rec.mimeType || 'video/webm' }))));
      rec.start(1000);
      this.recorder = rec;
    }

    const done = new Promise<void>((res) => (this.finish = res));
    const tick = () => {
      if (!this.playing || !this.ac) return;
      const t = this.ac.currentTime - this.t0;
      if (t >= this.duration) {
        this.renderAt(this.duration);
        this.stop();
        this.onEnd?.();
        return;
      }
      this.renderAt(Math.max(0, t), this.pulseAt(t));
      this.onTime?.(Math.max(0, t), this.duration);
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
    await done;
    return blob ? await blob : null;
  }

  private pulseAt(t: number) {
    if (this.song.kind === 'demo') return demoPulse(t);
    if (!this.analyser) return 0;
    // 저음(킥) 에너지가 평균보다 확 튈 때를 비트로 간주
    this.analyser.getByteFrequencyData(this.freq);
    const bins = Math.max(2, Math.floor((150 / (this.ac!.sampleRate / 2)) * this.freq.length));
    let e = 0;
    for (let i = 0; i < bins; i++) e += this.freq[i];
    e /= bins * 255;
    this.energyAvg = this.energyAvg * 0.94 + e * 0.06;
    if (e > this.energyAvg * 1.25 && e > 0.35) this.livePulse = 1;
    else this.livePulse *= 0.82;
    return this.livePulse;
  }

  stop() {
    this.playing = false;
    cancelAnimationFrame(this.raf);
    this.band?.stop();
    this.band = null;
    try {
      this.src?.stop();
    } catch {
      /* 이미 멈춤 */
    }
    this.src = null;
    if (this.recorder && this.recorder.state !== 'inactive') this.recorder.stop();
    this.recorder = null;
    const ac = this.ac;
    this.ac = null;
    if (ac) setTimeout(() => ac.close(), 300);
    this.finish?.();
    this.finish = null;
  }
}
