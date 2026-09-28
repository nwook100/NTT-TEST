// NTT26 뮤직비디오 장면들 — 퇴근한 직장인들이 저녁 7시에 모여 배틀그라운드로 뛰어드는 이야기
import { BAR, BEAT, TOTAL_BARS, DEMO_DURATION } from './audio';
import {
  W, H, INK, ORANGE, TITLE_FONT,
  ctx, poly, ell, rect, line, star, text, person, hash, lerp, clamp, ease, rain,
} from './draw';

export interface SceneArgs {
  lt: number; // 장면 안에서의 시간 (초, 12fps로 끊김)
  len: number; // 장면 길이
  pulse: number; // 비트 펄스 0~1
}

export type Scene = { from: number; to: number; name: string; draw: (a: SceneArgs) => void; rain?: (lt: number) => number };

export const SHIRTS = ['#e07a5f', '#81b29a', '#f2cc8f', '#3d5a80', '#b56576'];
export const HAIR = [null, '#5a3e2b', null, '#2b2118', '#7f5539'];

// ---------- 1. 타이틀 ----------
function title({ lt }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#efe6d2';
  c.fillRect(0, 0, W, H);
  const sy = 300 - Math.min(lt, 5) * 22;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + Math.floor(lt * 4) * 0.05;
    line(1110 + Math.cos(a) * 95, sy + Math.sin(a) * 95, 1110 + Math.cos(a) * 125, sy + Math.sin(a) * 125, 5);
  }
  ell(1110, sy, 75, 75, '#f2cc8f');
  ell(1085, sy - 5, 4, 5, INK, 0);
  ell(1130, sy - 5, 4, 5, INK, 0);
  ell(1108, sy + 22, 12, 6, null, 3, Math.PI + 0.3, Math.PI * 2 - 0.3);
  poly([[0, 560], [250, 500], [520, 540], [800, 490], [1100, 530], [1280, 500], [1280, 720], [0, 720]], '#a3b18a');
  poly([[0, 620], [400, 590], [900, 630], [1280, 600], [1280, 720], [0, 720]], '#84a98c');

  const chars = ['N', 'T', 'T', ' ', '2', '6'];
  chars.forEach((ch, i) => {
    const t0 = 0.5 + i * 0.3;
    if (lt < t0 || ch === ' ') return;
    const k = ease((lt - t0) / 0.25);
    const x = 200 + i * 125;
    const bob = Math.sin(Math.floor(lt * 6) + i) * 4;
    text(ch, x, 300 + bob + (1 - k) * -80, 190 * (0.6 + 0.4 * k), i >= 4 ? '#f2cc8f' : ORANGE, {
      font: TITLE_FONT,
      stroke: 12,
      rot: (hash(i * 7, 0) - 0.5) * 0.25,
    });
  });
  if (lt > 2.6) text('퇴근 후의 전우들에게 바치는 노래', 500, 450, 40, INK, { stroke: 0, alpha: ease((lt - 2.6) / 0.6) });
}

// ---------- 2. 사무실 18:59 ----------
export function office({ lt, len }: SceneArgs, morning = false) {
  const c = ctx();
  c.fillStyle = '#c9d6bd';
  c.fillRect(0, 0, W, H);
  rect(-10, 560, W + 20, 200, '#8d7b68');
  // 창문
  rect(820, 80, 320, 220, morning ? '#bde0fe' : '#f4a261');
  if (morning) {
    ell(1060, 150, 34, 34, '#fff3b0');
  } else {
    ell(980, 300, 80, 60, '#e76f51', 5, Math.PI, Math.PI * 2);
  }
  line(980, 80, 980, 300, 6);
  line(820, 190, 1140, 190, 6);
  // 벽시계
  const minute = morning ? 0 : 59 + clamp(lt / (len * 0.72));
  const hour = morning ? 9 : 6 + minute / 60;
  ell(560, 150, 62, 62, '#fffdf5');
  const ha = (hour / 12) * Math.PI * 2 - Math.PI / 2;
  const ma = (minute / 60) * Math.PI * 2 - Math.PI / 2;
  line(560, 150, 560 + Math.cos(ha) * 30, 150 + Math.sin(ha) * 30, 7);
  line(560, 150, 560 + Math.cos(ma) * 48, 150 + Math.sin(ma) * 48, 4);
  const seven = !morning && minute >= 60;

  // 사람 (책상 뒤)
  const drowsy = !seven;
  person({
    x: 620, y: 520, s: 1.5, face: -1, shirt: '#dfe7ec', tie: !seven || lt < len * 0.85,
    tilt: morning ? 1.1 : drowsy ? 0.3 : -0.1,
    eyes: morning ? 'closed' : drowsy ? 'closed' : 'wide',
    mouth: morning ? 'smile' : drowsy ? 'sad' : 'grin',
    armF: seven ? 2.7 : 1.3, armB: 1.2,
  });
  // 책상 + 모니터
  rect(200, 400, 560, 34, '#a67c52');
  rect(230, 434, 20, 130, '#7f5539');
  rect(710, 434, 20, 130, '#7f5539');
  rect(300, 250, 210, 140, '#dfe7ec');
  for (let i = 0; i < 4; i++) line(320, 280 + i * 26, 490, 280 + i * 26, 2);
  for (let i = 0; i < 3; i++) line(360 + i * 45, 268, 360 + i * 45, 370, 2);
  rect(390, 390, 30, 12, '#adb5bd', 4);
  rect(220, 360, 70, 40, '#f8f9fa', 4);
  rect(226, 348, 70, 14, '#f8f9fa', 4);
  if (seven) text('7:00!', 560, 240, 56, ORANGE, { font: TITLE_FONT, rot: -0.1 });
  if (morning) {
    const z = Math.floor(lt * 3) % 3;
    for (let i = 0; i <= z; i++) text('Z', 470 - i * 34, 300 - i * 40, 40 + i * 10, '#fff', { rot: -0.2 });
  }
}

// ---------- 3. 불 켜지는 다섯 개의 창문 ----------
function windows({ lt, len }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#27304a';
  c.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i++) ell(hash(i, 3) * W, hash(i + 50, 3) * 260, 2, 2, '#f8f9fa', 0);
  ell(160, 110, 50, 50, '#fdf0d5');
  rect(250, 60, 780, 700, '#4a4e69');
  const lit = [6, 1, 13, 10, 17];
  for (let r = 0; r < 4; r++)
    for (let col = 0; col < 5; col++) {
      const idx = r * 5 + col;
      const x = 290 + col * 150;
      const y = 110 + r * 150;
      const k = lit.indexOf(idx);
      const on = k >= 0 && lt > 0.3 + k * (len * 0.14);
      rect(x, y, 100, 95, on ? '#ffd166' : '#2d3047');
      if (on) {
        ell(x + 50, y + 70, 24, 26, '#2d3047', 0);
        ell(x + 50, y + 66, 28, 30, null, 4, Math.PI * 1.1, Math.PI * 1.9);
        rect(x + 12, y + 80, 76, 15, '#3a86ff', 3);
      }
    }
  if (lt > len * 0.8) text('19:00  접속', 640, 40, 34, '#ffd166', { font: TITLE_FONT });
}

// ---------- 4. 수송기 & 낙하 ----------
function plane({ lt }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#a8d0e6';
  c.fillRect(0, 0, W, H);
  for (let i = 0; i < 4; i++) {
    const cx = ((i * 380 + lt * 30) % (W + 300)) - 150;
    ell(cx, 90 + i * 70, 90, 30, '#fff', 3);
    ell(cx + 50, 76 + i * 70, 55, 28, '#fff', 3);
  }
  rect(-10, 520, W + 20, 220, '#5e9fb8');
  ell(640, 600, 420, 90, '#9dbf7a');
  ell(520, 585, 90, 30, '#6a994e', 3);
  ell(800, 610, 60, 20, '#bc6c25', 3);

  const px = -250 + lt * 300;
  // 낙하하는 클랜원들
  for (let k = 0; k < 4; k++) {
    const tj = 0.7 + k * 0.55;
    if (lt < tj) continue;
    const dt = lt - tj;
    const x0 = -250 + tj * 300 - 30;
    const open = dt > 0.5;
    const y = open ? 190 + 0.5 * 280 + (dt - 0.5) * 55 : 190 + dt * 280;
    const x = x0 + dt * 40 + (open ? Math.sin(dt * 3 + k) * 12 : 0);
    if (open) {
      ell(x, y - 120, 60, 40, k % 2 ? ORANGE : '#f2cc8f', 5, Math.PI, Math.PI * 2);
      line(x - 58, y - 120, x - 8, y - 68, 2);
      line(x + 58, y - 120, x + 8, y - 68, 2);
      text('NTT', x, y - 138, 20, '#fff', { stroke: 4 });
    }
    person({ x, y, s: 0.55, shirt: SHIRTS[k], helmet: true, armB: 2.8, armF: 2.9, legB: -0.3, legF: 0.3, eyes: open ? 'dot' : 'wide', mouth: open ? 'smile' : 'o' });
  }
  // 수송기
  c.save();
  c.translate(px, 170);
  poly([[-40, -10], [20, -95], [60, -95], [40, -10]], '#c0c6cb', 4);
  ell(0, 0, 170, 34, '#dcdcdc');
  poly([[-170, -5], [-210, -60], [-180, -60], [-130, -15]], '#c0c6cb', 4);
  for (let i = 0; i < 5; i++) ell(-80 + i * 40, -6, 7, 7, '#90e0ef', 3);
  ell(150, -4, 20, 18, '#90e0ef', 3);
  c.restore();
}

// ---------- 5. 프라이팬 ----------
function pan({ lt, pulse }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#e9c46a';
  c.fillRect(0, 0, W, H);
  rect(880, 180, 300, 360, '#d4a373');
  poly([[860, 190], [1030, 80], [1200, 190]], '#bc4749');
  rect(990, 390, 70, 150, '#6f4518');
  rect(920, 250, 60, 60, '#90e0ef');
  rect(1090, 250, 60, 60, '#90e0ef');
  rect(-10, 530, W + 20, 200, '#c2a15a');
  for (let i = 0; i < 14; i++) line(i * 100 + 20, 560 + (i % 3) * 30, i * 100 + 40, 550 + (i % 3) * 30, 3);

  const cyc = BEAT * 2;
  const p = (lt % cyc) / cyc;
  const hitting = p < 0.35;
  const arm = p < 0.1 ? lerp(3.3, 1.2, p / 0.1) : lerp(1.2, 3.3, ease((p - 0.1) / 0.9));
  const knock = hitting ? (1 - p / 0.35) * 30 : 0;
  person({ x: 760 + knock, y: 540, s: 1.4, face: -1, shirt: '#8d99ae', helmet: true, eyes: hitting ? 'x' : 'dot', mouth: hitting ? 'o' : 'flat', tilt: hitting ? -0.35 : 0, armF: 0.4, gun: false });
  person({ x: 470, y: 540, s: 1.4, face: 1, shirt: ORANGE, hair: '#5a3e2b', pan: true, armF: arm, armB: 0.6, legB: -0.3, legF: 0.3, eyes: 'dot', mouth: 'grin' });
  if (hitting) {
    star(740, 300, 110 + pulse * 20, 60, 10, '#fff', 0.2);
    text('BONK!', 740, 300, 64, '#e63946', { font: TITLE_FONT, rot: -0.15 });
  }
}

// ---------- 6. 달려라 ----------
function run({ lt, pulse }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#f6bd60';
  c.fillRect(0, 0, W, H);
  ell(1080, 130, 60, 60, '#fff3b0');
  const far = (lt * 60) % 400;
  const hills: [number, number][] = [];
  for (let x = -400; x <= W + 400; x += 100) hills.push([x - far, 400 - Math.abs(Math.sin(x / 190)) * 90]);
  poly([...hills, [W + 400, 720], [-400, 720]], '#84a59d');
  rect(-10, 500, W + 20, 240, '#6a994e');
  const near = (lt * 420) % 160;
  for (let i = 0; i < 10; i++) {
    const gx = i * 160 - near;
    line(gx, 560, gx + 8, 540, 4);
    line(gx + 14, 560, gx + 18, 536, 4);
  }
  // 총알 궤적
  for (let i = 0; i < 5; i++) {
    const y = 220 + hash(i, 1) * 250;
    const x = W - (((lt * 1400 + i * 420) % (W + 400)));
    line(x, y, x + 80, y, 4, '#fff3b0');
  }
  // 폭발 (2, 4박)
  const beatN = Math.floor(lt / BEAT);
  const inB = (lt % BEAT) / BEAT;
  if (beatN % 2 === 1 && inB < 0.5) {
    const ex = 150 + hash(beatN, 2) * 900;
    star(ex, 430, 100 * (1 - inB), 50, 9, '#ffd166', beatN);
    star(ex, 430, 55 * (1 - inB), 25, 9, '#e63946', beatN + 1);
  }
  for (let k = 0; k < 4; k++) {
    const ph = lt * 14 + k * 1.3;
    const bob = Math.abs(Math.sin(ph)) * 8;
    person({
      x: 280 + k * 180, y: 560 - bob, s: 1.05, shirt: SHIRTS[k], helmet: true, gun: k % 2 === 0,
      legB: Math.sin(ph) * 0.8, legF: -Math.sin(ph) * 0.8,
      armB: -Math.sin(ph) * 0.9, armF: k % 2 === 0 ? 1.5 : Math.sin(ph) * 0.9,
      eyes: 'dot', mouth: k === 2 ? 'o' : 'grin',
    });
  }
  const word = ['N!', 'T!', 'T!', 'NTT!'][beatN % 4];
  if (beatN % 2 === 0) text(word, beatN % 4 === 0 ? 380 : 900, 170, 110 + pulse * 30, ORANGE, { font: TITLE_FONT, stroke: 12, rot: beatN % 4 === 0 ? -0.12 : 0.1 });
}

// ---------- 7. 지프 & 보급 ----------
function jeep({ lt, len }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#bde0fe';
  c.fillRect(0, 0, W, H);
  const scroll = lt * 500;
  const gy = (x: number) => 560 + Math.sin((x + scroll) / 140) * 18;
  const pts: [number, number][] = [];
  for (let x = -20; x <= W + 20; x += 40) pts.push([x, gy(x)]);
  poly([...pts, [W + 20, 740], [-20, 740]], '#dda15e');
  // 보급 상자
  if (lt > len * 0.35) {
    const dt = lt - len * 0.35;
    const cy = Math.min(120 + dt * 90, 480);
    const cx = 1000;
    if (cy < 480) {
      ell(cx, cy - 90, 55, 36, '#e63946', 5, Math.PI, Math.PI * 2);
      line(cx - 52, cy - 90, cx - 20, cy - 30, 2);
      line(cx + 52, cy - 90, cx + 20, cy - 30, 2);
    }
    rect(cx - 32, cy - 32, 64, 64, '#3a86ff');
    line(cx - 32, cy, cx + 32, cy, 4);
    text('S', cx, cy, 36, '#ffd166', { font: TITLE_FONT, stroke: 6 });
  }
  const jumpT = clamp((lt - len * 0.5) / (len * 0.28));
  const air = jumpT > 0 && jumpT < 1 ? Math.sin(jumpT * Math.PI) * 130 : 0;
  const x = 500;
  const y = gy(x) - 40 - air + Math.abs(Math.sin(lt * 20)) * 5;
  c.save();
  c.translate(x, y);
  c.rotate(air > 0 ? -0.12 * Math.cos(jumpT * Math.PI) : Math.sin(lt * 10) * 0.03);
  for (let k = 0; k < 4; k++) {
    person({ x: -110 + k * 70, y: -30, s: 0.6, shirt: SHIRTS[k], helmet: true, armF: k === 3 ? 2.9 : 1.4, eyes: air > 0 ? 'wide' : 'dot', mouth: air > 0 ? 'o' : 'grin' });
  }
  poly([[-180, -40], [150, -40], [190, 0], [190, 30], [-180, 30]], '#5a6b3c');
  rect(120, -100, 10, 60, '#5a6b3c', 4);
  const rot = lt * 18;
  for (const wx of [-110, 110]) {
    ell(wx, 36, 40, 40, '#2b2d42');
    ell(wx, 36, 16, 16, '#adb5bd', 4);
    line(wx + Math.cos(rot) * 14, 36 + Math.sin(rot) * 14, wx - Math.cos(rot) * 14, 36 - Math.sin(rot) * 14, 4);
  }
  c.restore();
  // 스티커
  if (lt > 0.4) {
    const k = ease((lt - 0.4) / 0.25);
    star(230, 150, 95 * k, 75 * k, 14, ORANGE, lt * 0.2);
    text('LV.15', 230, 150, 50 * k, '#fff', { font: TITLE_FONT });
  }
  if (lt > len * 0.6) {
    const k = ease((lt - len * 0.6) / 0.25);
    star(700, 130, 95 * k, 75 * k, 14, '#ffd166', -lt * 0.2);
    text('보급 S', 700, 130, 44 * k, '#fff', { font: TITLE_FONT });
  }
}

// ---------- 8. 자기장 (위에서 본 지도) ----------
function zone({ lt, len }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#6f8f76';
  c.fillRect(0, 0, W, H);
  for (let i = 0; i < 6; i++) ell(hash(i, 9) * W, hash(i + 20, 9) * H, 60 + hash(i + 40, 9) * 60, 40, '#5f7d66', 3);
  line(-10, 200, 1300, 520, 14, '#a39171');
  line(400, -10, 700, 730, 12, '#a39171');
  for (let i = 0; i < 5; i++) rect(200 + i * 190, 120 + (i % 2) * 360, 50, 40, '#b5838d', 4);
  const R = lerp(560, 190, ease(lt / len));
  const cx = 660, cy = 360;
  c.save();
  c.beginPath();
  c.rect(0, 0, W, H);
  c.arc(cx, cy, R, 0, Math.PI * 2, true);
  c.fillStyle = 'rgba(46,92,170,0.55)';
  c.fill('evenodd');
  c.restore();
  ell(cx, cy, R, R, null, 6);
  c.save();
  c.setLineDash([12, 10]);
  ell(cx + 40, cy + 20, 150, 150, null, 0);
  c.strokeStyle = '#fff';
  c.lineWidth = 4;
  c.beginPath();
  c.arc(cx + 40, cy + 20, 150, 0, Math.PI * 2);
  c.stroke();
  c.restore();
  for (let k = 0; k < 4; k++) {
    const a = k * 1.6 + 0.4;
    const d = lerp(R + 60, 60, ease(lt / len)) + k * 12;
    ell(cx + Math.cos(a) * d * 0.9, cy + Math.sin(a) * d * 0.6, 13, 13, SHIRTS[k], 4);
  }
}

// ---------- 9. 부활 ----------
function revive({ lt, len }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#6d7f99';
  c.fillRect(0, 0, W, H);
  rect(-10, 540, W + 20, 200, '#556b5a');
  for (let i = 0; i < 8; i++) ell(i * 180 + 40, 545, 70, 30, '#4a5d4f', 3, Math.PI, Math.PI * 2);
  const arrive = ease(lt / (len * 0.3));
  const prog = clamp((lt - len * 0.35) / (len * 0.4));
  const up = ease((lt - len * 0.78) / (len * 0.15));
  // 쓰러진 사람
  person({
    x: 520, y: 560 - up * 0, s: 1.2, face: 1, shirt: SHIRTS[0], helmet: true,
    rot: lerp(-Math.PI / 2, 0, up),
    eyes: up > 0.5 ? 'wide' : 'closed', mouth: up > 0.5 ? 'smile' : 'sad',
    armF: lerp(0.6, 2.2, prog), armB: 0.2,
  });
  // 동료
  person({
    x: lerp(1250, 720, arrive), y: 560, s: 1.2, face: -1, shirt: SHIRTS[1], helmet: true,
    legB: arrive < 1 ? Math.sin(lt * 14) * 0.6 : 0, legF: arrive < 1 ? -Math.sin(lt * 14) * 0.6 : 0,
    tilt: arrive >= 1 && up < 1 ? 0.35 : 0, armF: arrive >= 1 ? 1.6 : 0.3, eyes: 'dot', mouth: up > 0.5 ? 'grin' : 'flat',
  });
  if (prog > 0 && up < 1) {
    rect(470, 250, 300, 30, '#2b2d42', 4);
    rect(474, 254, 292 * prog, 22, '#ffd166', 0);
    text('부활 중...', 620, 215, 36, '#fff');
  }
}

// ---------- 10. 언덕 위 — 비 그친 하늘의 이름들 ----------
const NTT_STARS: [number, number][][] = [
  [[0, 100], [0, 0], [60, 100], [60, 0]],
  [[90, 0], [160, 0]], [[125, 0], [125, 100]],
  [[190, 0], [260, 0]], [[225, 0], [225, 100]],
];
function hill({ lt, len }: SceneArgs) {
  const c = ctx();
  const clear = ease((lt - len * 0.25) / (len * 0.25));
  c.fillStyle = clear > 0.5 ? '#1d2d50' : '#4a5a78';
  c.fillRect(0, 0, W, H);
  if (clear > 0) {
    c.save();
    c.globalAlpha = clear;
    c.fillStyle = '#1d2d50';
    c.fillRect(0, 0, W, H);
    for (let i = 0; i < 70; i++) ell(hash(i, 5) * W, hash(i + 100, 5) * 420, 2, 2, '#fff', 0);
    c.restore();
  }
  // 구름이 갈라진다
  const part = clear * 600;
  for (let i = 0; i < 5; i++) {
    const side = i % 2 ? 1 : -1;
    ell(640 + side * (120 + i * 60 + part), 90 + i * 40, 220, 70, '#8d99ae', 4);
  }
  ell(640, 900, 800, 380, '#3b5249');
  for (let k = 0; k < 4; k++) {
    person({ x: 420 + k * 140, y: 540 + Math.abs(k - 1.5) * 12, s: 0.9, sit: true, face: k < 2 ? 1 : -1, shirt: SHIRTS[k], hair: HAIR[k] ?? undefined, tilt: -0.35, eyes: 'up', mouth: clear > 0.5 ? 'smile' : 'flat', armF: 1.2, armB: 1.0 });
  }
  const n1 = clamp((lt - len * 0.3) / 0.6) - clamp((lt - len * 0.62) / 0.4);
  const n2 = clamp((lt - len * 0.62) / 0.6);
  if (n1 > 0) {
    text('1대 마스터', 640, 170, 36, '#ffd166', { alpha: n1 });
    text('NTT_Cinderella', 640, 235, 70, '#fff', { font: TITLE_FONT, alpha: n1 });
  }
  if (n2 > 0) {
    text('2대 마스터', 640, 170, 36, '#ffd166', { alpha: n2 });
    text('LiveOctopus', 640, 235, 70, '#fff', { font: TITLE_FONT, alpha: n2 });
  }
  // 별자리 NTT
  if (lt > len * 0.8) {
    const k = clamp((lt - len * 0.8) / (len * 0.15));
    c.save();
    c.translate(1000, 300);
    c.scale(0.6, 0.6);
    NTT_STARS.forEach((seg) => {
      for (let i = 0; i < seg.length - 1; i++) line(seg[i][0], seg[i][1], lerp(seg[i][0], seg[i + 1][0], k), lerp(seg[i][1], seg[i + 1][1], k), 3, '#fdf0d5');
      seg.forEach(([x, y]) => star(x, y, 9, 4, 4, '#fff3b0', 0, 0));
    });
    c.restore();
  }
}

// ---------- 11. 마지막 원 ----------
function final({ lt, pulse }: SceneArgs) {
  const c = ctx();
  ['#f28482', '#f5a88e', '#f6bd60', '#f7d08a'].forEach((col, i) => {
    c.fillStyle = col;
    c.fillRect(0, i * 110, W, 110);
  });
  ell(640, 440, 110, 110, '#fff3b0', 0);
  rect(-10, 440, W + 20, 300, '#52796f');
  // 지평선의 적들
  for (let i = 0; i < 6; i++) {
    const down = Math.floor(lt / BEAT) > i * 3 + 1;
    person({ x: 90 + i * 220, y: 452, s: 0.3, shirt: '#8d99ae', helmet: true, rot: down ? (i % 2 ? 1.4 : -1.4) : 0, eyes: down ? 'x' : 'dot' });
  }
  ell(640, 590, 460, 110, '#84a98c');
  c.save();
  c.strokeStyle = '#fff';
  c.lineWidth = 5;
  c.beginPath();
  c.ellipse(640, 590, 470, 115, 0, 0, Math.PI * 2);
  c.stroke();
  c.restore();
  const base = Math.floor(lt * 6) / 6 * 0.5;
  const crew = [0, 1, 2, 3].map((k) => {
    const a = base + k * (Math.PI / 2);
    return { k, a, x: 640 + Math.cos(a) * 190, y: 590 + Math.sin(a) * 50 };
  }).sort((p, q) => p.y - q.y);
  const shooter = Math.floor(lt / (BEAT / 2)) % 4;
  for (const m of crew) {
    const face: 1 | -1 = Math.cos(m.a) >= 0 ? 1 : -1;
    person({ x: m.x, y: m.y, s: 1.0, face, shirt: SHIRTS[m.k], helmet: true, gun: true, armF: 1.55, armB: 1.3, eyes: 'dot', mouth: 'flat' });
    if (m.k === shooter && pulse > 0.3) star(m.x + face * 150, m.y - 105, 30, 12, 7, '#ffd166', lt * 3, 3);
  }
}

// ---------- 12. 승리 ----------
function winner({ lt }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#ffd166';
  c.fillRect(0, 0, W, H);
  c.save();
  c.translate(640, 380);
  c.rotate(Math.floor(lt * 8) * 0.03);
  c.fillStyle = '#ffc43d';
  for (let i = 0; i < 16; i++) {
    c.beginPath();
    c.moveTo(0, 0);
    c.arc(0, 0, 1200, (i * Math.PI) / 8, (i * Math.PI) / 8 + Math.PI / 16);
    c.fill();
  }
  c.restore();
  // 치킨 접시
  ell(640, 420, 200, 60, '#fff');
  ell(640, 420, 150, 40, '#e9ecef', 3);
  ell(640, 390, 110, 65, '#c8763b');
  ell(610, 370, 35, 18, '#dd9a5b', 0);
  poly([[720, 360], [780, 330], [790, 318], [800, 332], [786, 342]], '#fff', 4);
  poly([[560, 360], [500, 330], [490, 318], [480, 332], [494, 342]], '#fff', 4);
  text('WINNER WINNER', 640, 140, 104, ORANGE, { font: TITLE_FONT, stroke: 14, rot: Math.sin(Math.floor(lt * 6)) * 0.03 });
  text('NTT 26', 640, 250, 64, '#fff', { font: TITLE_FONT, stroke: 10 });
  for (let k = 0; k < 4; k++) {
    const jump = Math.abs(Math.sin(lt * 7 + k)) * 40;
    const x = [170, 330, 950, 1110][k];
    person({ x, y: 690 - jump, s: 1.0, face: x < 640 ? 1 : -1, shirt: SHIRTS[k], helmet: k % 2 === 0, hair: HAIR[k] ?? undefined, armF: 2.8, armB: 2.6, eyes: 'closed', mouth: 'grin' });
  }
  const k = Math.floor(lt * 12);
  for (let i = 0; i < 60; i++) {
    const x = hash(i, 1) * W;
    const y = ((hash(i + 60, 1) * H + k * (6 + hash(i, 2) * 8)) % (H + 40)) - 20;
    c.fillStyle = SHIRTS[i % 5];
    c.fillRect(x, y, 10, 16);
  }
}

function outro(a: SceneArgs) {
  office(a, true);
  const k = ease((a.lt - 0.6) / 0.8);
  if (k > 0) {
    const c = ctx();
    c.save();
    c.globalAlpha = 0.72 * k;
    c.fillStyle = '#1d1a17';
    c.fillRect(0, 0, W, H);
    c.restore();
    text('NTT CLAN 2026', 640, 300, 96, ORANGE, { font: TITLE_FONT, alpha: k, stroke: 12 });
    text('평일 저녁 7시, 같이 뛰어내릴 사람?', 640, 400, 44, '#fff', { alpha: k });
    text('Discord · KakaoTalk', 640, 470, 32, '#f2cc8f', { alpha: k, stroke: 0 });
  }
}

const b = (n: number) => n * BAR;

export const SCENES: Scene[] = [
  { from: 0, to: b(2), name: '타이틀', draw: title },
  { from: b(2), to: b(4), name: '사무실 18:59', draw: (a) => office(a) },
  { from: b(4), to: b(6), name: '다섯 개의 창문', draw: windows },
  { from: b(6), to: b(8), name: '낙하', draw: plane },
  { from: b(8), to: b(10), name: '프라이팬', draw: pan },
  { from: b(10), to: b(12), name: '돌격', draw: run },
  { from: b(12), to: b(14), name: '지프 & 보급', draw: jeep },
  { from: b(14), to: b(16), name: '자기장', draw: zone, rain: () => 1 },
  { from: b(16), to: b(18), name: '부활', draw: revive, rain: () => 1 },
  { from: b(18), to: b(22), name: '비 그친 하늘', draw: hill, rain: (lt) => 1 - clamp((lt - b(4) * 0.2) / (b(4) * 0.25)) },
  { from: b(22), to: b(26), name: '마지막 원', draw: final },
  { from: b(26), to: b(TOTAL_BARS) + 1.2, name: '승리', draw: winner },
  { from: b(TOTAL_BARS) + 1.2, to: DEMO_DURATION, name: '다음 날 아침', draw: outro },
];

export const DEMO_LYRICS: { from: number; to: number; text: string }[] = [
  [2, '오후 6시 59분, 넥타이를 푼다'],
  [4, '다섯 개의 창문에 불이 켜지면'],
  [6, '우린 다시, 뛰어내린다'],
  [8, '프라이팬 하나면 충분해'],
  [10, 'N! T! T! 멈추지 마'],
  [12, '클랜 레벨 15, 보급은 S 클래스'],
  [14, '자기장이 좁혀와도'],
  [16, '쓰러진 나를 일으키는 손'],
  [18, '비가 그치면 보이는 이름들'],
  [20, '등 뒤엔 언제나 동료가 있다'],
  [22, '마지막 원, 마지막 한 발'],
  [24, '우리가 바로 NTT'],
  [26, '이겼다!'],
].map(([bar, t]) => ({ from: b(bar as number) + 0.15, to: b((bar as number) + 2) - 0.1, text: t as string }));
