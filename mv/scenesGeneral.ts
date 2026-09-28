// 일반 뮤직비디오 테마 "Empty Hands" — 손에 쥔 것마다 빠져나가는 남자의 조금 이상한 하루
// 떨어지는 제목 → 도망가는 알람시계 → 모두가 쳐다보는 지하철 → 빈 손 → 해파리 우산
// → 거대한 손바닥 위의 꿈 → 새가 되는 종이비행기 → 떠내려가는 물건들 → 맞잡은 손의 새싹
import { DEMO_DURATION } from './audio';
import { W, H, INK, TITLE_FONT, ctx, poly, ell, rect, line, star, text, person, Person, hash, lerp, clamp, ease } from './draw';
import { Scene, SceneArgs, SHIRTS, HAIR } from './scenes';

let songTitle = 'Empty Hands';
let artist = 'ntt26';
export function setSongInfo(title: string, by: string) {
  songTitle = title.trim();
  artist = by.trim();
}

// 주인공: 노란 셔츠, 까만 머리, 늘 빈손
const hero = (p: Person) => person({ shirt: '#f2cc8f', hair: '#2b2118', pants: '#3d405b', ...p });
const RED = '#e63946';

function sky(top: string, bottom: string) {
  const c = ctx();
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  c.fillStyle = g;
  c.fillRect(0, 0, W, H);
}

function skyline(base: number, col: string, seedN: number, lit = 0) {
  let x = -20;
  let i = 0;
  while (x < W + 20) {
    const w = 60 + hash(i, seedN) * 90;
    const h = 80 + hash(i + 30, seedN) * 220;
    rect(x, base - h, w, h + 20, col, 4);
    if (lit > 0)
      for (let wy = base - h + 16; wy < base - 20; wy += 28)
        for (let wx = x + 10; wx < x + w - 14; wx += 22)
          if (hash(wx * 3 + wy, seedN) < lit) ctx().fillRect(wx, wy, 10, 14);
    x += w + 6;
    i++;
  }
}

function balloon(x: number, y: number, col = RED, s = 1) {
  line(x, y + 40 * s, x + Math.sin(y / 40) * 10, y + 130 * s, 2);
  ell(x, y, 30 * s, 38 * s, col, 4);
  ell(x - 10 * s, y - 14 * s, 6 * s, 9 * s, 'rgba(255,255,255,0.6)', 0);
}

function palm(cx: number, cy: number, dir: 1 | -1, s = 1, skin = '#f3d2b0', sleeve = '#f2cc8f') {
  const c = ctx();
  c.save();
  c.translate(cx, cy);
  c.scale(dir * s, s);
  poly([[-40, 260], [-60, 90], [-100, 40], [-120, -20], [-95, -30], [-55, 20], [-60, -110], [-35, -120], [-20, -30], [-10, -140], [15, -140], [20, -30], [40, -125], [65, -115], [50, -20], [75, -95], [98, -85], [80, 60], [60, 260]], skin, 6);
  line(-30, 40, 40, 20, 3);
  line(-25, 80, 45, 70, 3);
  poly([[-60, 260], [80, 260], [90, 360], [-70, 360]], sleeve, 6);
  c.restore();
}

function walkingClock(x: number, y: number, ph: number, alarm: boolean) {
  line(x - 14, y + 30, x - 14 + Math.sin(ph) * 16, y + 70, 5);
  line(x + 14, y + 30, x + 14 - Math.sin(ph) * 16, y + 70, 5);
  ell(x - 14 + Math.sin(ph) * 16 + 6, y + 72, 10, 5, INK, 0);
  ell(x + 14 - Math.sin(ph) * 16 + 6, y + 72, 10, 5, INK, 0);
  ell(x - 26, y - 34, 14, 12, '#f4a261');
  ell(x + 26, y - 34, 14, 12, '#f4a261');
  ell(x, y, 42, 42, '#fffdf5');
  line(x, y, x, y - 26, 4);
  line(x, y, x + 18, y + 6, 4);
  if (alarm) text('따르릉', x, y - 80, 30, '#fff', { rot: Math.sin(ph * 3) * 0.2 });
}

function fish(x: number, y: number, col: string, s = 1) {
  ell(x, y, 22 * s, 11 * s, col, 3);
  poly([[x - 20 * s, y], [x - 36 * s, y - 10 * s], [x - 36 * s, y + 10 * s]], col, 3);
  ell(x + 10 * s, y - 2 * s, 2, 2, INK, 0);
}

// ---------- 1. 떨어지는 제목 ----------
function gTitle({ lt, len }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#efe6d2';
  c.fillRect(0, 0, W, H);
  palm(640, 560, 1, 0.9);
  const chars = [...(songTitle || 'untitled')];
  const size = Math.min(110, (1000 / Math.max(6, chars.length)) * 1.4);
  const slip = ease((lt - len * 0.78) / (len * 0.2)); // 끝에 글자들이 손가락 사이로 빠져나간다
  c.font = `${size}px ${TITLE_FONT}`;
  const total = c.measureText(songTitle || 'untitled').width;
  let x = 640 - total / 2;
  chars.forEach((ch, i) => {
    const w = c.measureText(ch).width;
    const t0 = 0.3 + i * 0.12;
    const k = clamp((lt - t0) / 0.35);
    const bounce = k < 1 ? (1 - k) * (1 - k) * -500 : Math.sin(Math.min(1, (lt - t0 - 0.35) * 4) * Math.PI) * -12;
    const fall = slip * (500 + hash(i, 0) * 300);
    if (lt > t0 && ch !== ' ')
      text(ch, x + w / 2, 230 + bounce + fall, size, '#e07a5f', { font: TITLE_FONT, stroke: 10, rot: (hash(i * 7, 0) - 0.5) * 0.2 + slip * (hash(i, 3) - 0.5) * 2 });
    x += w;
  });
  if (artist) text(artist, 640, 330, 34, INK, { stroke: 0, alpha: ease((lt - 1.4) / 0.6) * (1 - slip) });
  balloon(980 + Math.sin(lt) * 20, 520 - lt * 45, RED, 0.9);
}

// ---------- 2. 도망가는 알람시계 ----------
function gAlarm({ lt, len, pulse }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#b8c0d8';
  c.fillRect(0, 0, W, H);
  rect(-10, 580, W + 20, 160, '#8d7b68');
  rect(700, 90, 280, 210, '#f7c59f');
  ell(840, 300, 70, 50, '#fff3b0', 4, Math.PI, Math.PI * 2);
  line(840, 90, 840, 300, 6);
  rect(1120, 250, 120, 330, '#6f4518'); // 문
  ell(1140, 420, 8, 8, '#ffd166', 3);
  rect(120, 430, 520, 90, '#d4a373');
  rect(110, 360, 40, 220, '#7f5539');
  const wake = ease((lt - len * 0.25) / (len * 0.15));
  hero({ x: lerp(470, 380, wake), y: lerp(440, 470, wake), s: 1.2, rot: lerp(-Math.PI / 2, 0, wake), sit: wake > 0.5, eyes: wake > 0.7 ? 'wide' : 'closed', mouth: wake > 0.7 ? 'o' : 'flat', armF: wake > 0.5 ? 1.55 : 0.3, tilt: wake > 0.7 ? 0.1 : 0 });
  poly([[160, 440], [620, 440], [610, 500], [170, 500]], '#e07a5f');
  // 시계가 다리를 내밀고 문밖으로 도망간다
  const run = ease((lt - len * 0.35) / (len * 0.5));
  const ph = lt * 14;
  const cx = lerp(560, 1180, run);
  const cy = run > 0 ? 500 - Math.abs(Math.sin(ph)) * 10 : 470 + (hash(Math.floor(lt * 20), 4) - 0.5) * 8 * (0.5 + pulse);
  if (run < 1) walkingClock(cx, cy, run > 0 ? ph : 0, true);
  if (run > 0.2 && run < 1) text('?!', 470, 250, 60, '#fff', { font: TITLE_FONT });
}

// ---------- 3. 모두가 쳐다보는 지하철 ----------
const HOLD = ['balloon', 'fish', 'flower', 'cake', 'cat'] as const;
function held(kind: (typeof HOLD)[number], x: number, y: number, lt: number) {
  switch (kind) {
    case 'balloon':
      balloon(x, y - 130, '#3a86ff', 0.7);
      break;
    case 'fish':
      fish(x, y, '#90be6d', 1.3);
      break;
    case 'flower':
      line(x, y + 20, x, y - 40, 4, '#2a9d8f');
      star(x, y - 50, 18, 9, 6, '#ffafcc', lt, 3);
      break;
    case 'cake':
      rect(x - 22, y - 20, 44, 30, '#ffe5ec', 4);
      line(x, y - 20, x, y - 36, 3);
      ell(x, y - 40, 3, 5, '#ffb703', 0);
      break;
    case 'cat':
      ell(x, y, 24, 18, '#adb5bd', 4);
      poly([[x - 18, y - 10], [x - 14, y - 30], [x - 4, y - 14]], '#adb5bd', 3);
      poly([[x + 18, y - 10], [x + 14, y - 30], [x + 4, y - 14]], '#adb5bd', 3);
      break;
  }
}
function gSubway({ lt, pulse }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#d8e2dc';
  c.fillRect(0, 0, W, H);
  // 창밖: 터널 대신 헤엄치는 물고기들
  for (let i = 0; i < 3; i++) {
    const x = 120 + i * 380;
    rect(x, 110, 300, 170, '#1d3557');
    c.save();
    c.beginPath();
    c.rect(x, 110, 300, 170);
    c.clip();
    for (let k = 0; k < 4; k++) fish(x + 340 - ((lt * 220 + k * 95 + i * 40) % 400), 150 + (k % 3) * 40, SHIRTS[k], 0.8);
    c.restore();
  }
  line(0, 80, W, 80, 8);
  rect(-10, 560, W + 20, 180, '#6c757d');
  rect(80, 450, 1120, 60, '#457b9d');
  // 박자마다 승객들이 일제히 주인공을 쳐다본다
  const stare = Math.floor(lt / 0.667) % 2 === 1 || pulse > 0.6;
  const spots = [160, 340, 520, 940, 1120];
  spots.forEach((x, k) => {
    const toward: 1 | -1 = x < 730 ? 1 : -1;
    const face = (stare ? toward : -toward) as 1 | -1;
    person({ x, y: 520, s: 1.0, sit: true, face, shirt: SHIRTS[k], hair: HAIR[k] ?? undefined, eyes: stare ? 'wide' : 'dot', mouth: 'flat', armF: 1.4, armB: 1.2 });
    held(HOLD[k], x + face * 50, 430, lt);
  });
  hero({ x: 730, y: 610, s: 1.15, face: 1, armF: 3.0, armB: 0.1, tilt: Math.sin(lt * 2.2) * 0.08, eyes: stare ? 'closed' : 'dot', mouth: stare ? 'sad' : 'flat' });
  for (let i = 0; i < 8; i++) {
    const hx = 150 + i * 140 + Math.sin(lt * 2.2 + i) * 6;
    line(hx, 80, hx, 140, 3);
    ell(hx, 155, 14, 14, null, 4);
  }
}

// ---------- 4. 빈 손 (클로즈업) ----------
function gHands({ lt, len, pulse }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#2b2d42';
  c.fillRect(0, 0, W, H);
  const glow = ease((lt - len * 0.55) / (len * 0.35));
  if (glow > 0) {
    const g = c.createRadialGradient(640, 420, 10, 640, 420, 420 * glow + 1);
    g.addColorStop(0, 'rgba(255,209,102,0.55)');
    g.addColorStop(1, 'rgba(255,209,102,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
  }
  const bob = Math.sin(lt * 1.3) * 6;
  palm(520, 470 + bob, 1);
  palm(760, 470 + bob, -1);
  // 빗방울이 손가락 사이로 새어 나간다
  for (let i = 0; i < 5; i++) {
    const y = ((lt * 160 + i * 150) % 760) - 60;
    ell(560 + i * 40, y, 5, 9, 'rgba(189,224,254,0.9)', 2);
  }
  if (glow > 0) star(640, 400, (26 + pulse * 10) * glow, 11 * glow, 5, '#ffd166', lt * 0.8, 4);
}

// ---------- 5. 해파리가 된 우산 ----------
function gUmbrellas({ lt, len }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#3d4a63';
  c.fillRect(0, 0, W, H);
  c.fillStyle = '#ffd166';
  skyline(470, '#323d54', 8, 0.3);
  rect(-10, 470, W + 20, 260, '#4f5d75');
  const cols = ['#ff8fab', '#f4a261', '#2a9d8f', '#e9c46a', '#b8c0ff'];
  for (let k = 0; k < 5; k++) {
    const dir = k % 2 ? -1 : 1;
    const speed = 50 + k * 12;
    const x = dir > 0 ? ((lt * speed + k * 300) % (W + 200)) - 100 : W + 100 - ((lt * speed + k * 300) % (W + 200));
    const y = 620 + (k % 3) * 25;
    const ph = lt * 8 + k;
    const lift = ease((lt - len * (0.2 + k * 0.08)) / (len * 0.25)); // 우산이 손을 떠나 떠오른다
    const up = lift > 0.1;
    person({ x, y, s: 0.9, face: dir as 1 | -1, shirt: SHIRTS[k], hair: HAIR[k] ?? undefined, legB: Math.sin(ph) * 0.5, legF: -Math.sin(ph) * 0.5, armF: up ? 3.0 : 2.6, eyes: up ? 'up' : 'dot', mouth: up ? 'o' : 'flat', tilt: up ? -0.3 : 0 });
    const ux = x + dir * 20 + Math.sin(lt * 2 + k) * 30 * lift;
    const uy = y - 215 - lift * (380 + k * 40);
    if (!up) line(ux, uy, ux, uy + 80, 4);
    ell(ux, uy, 70, 42, cols[k], 5, Math.PI, Math.PI * 2);
    if (up)
      for (let t = -2; t <= 2; t++) {
        const tx = ux + t * 22;
        const wig = Math.sin(lt * 6 + t + k) * 10;
        c.beginPath();
        c.moveTo(tx, uy);
        c.quadraticCurveTo(tx + wig, uy + 30, tx - wig, uy + 70);
        c.lineWidth = 4;
        c.strokeStyle = cols[k];
        c.stroke();
      }
  }
  hero({ x: 640, y: 690, s: 1.05, face: 1, tilt: -0.35, eyes: 'up', mouth: 'smile', armF: 2.4, armB: 0.2 });
}

// ---------- 6. 거대한 손바닥 위의 꿈 ----------
function gDream({ lt }: SceneArgs) {
  sky('#cdb4db', '#ffc8dd');
  ell(1070, 140, 60, 60, '#ffd166'); // 동전 같은 달
  ell(1070, 140, 44, 44, null, 3);
  text('₩', 1070, 142, 44, '#e9c46a', { stroke: 3 });
  for (let i = 0; i < 5; i++) {
    const cx = (((i * 300 - lt * 30) % (W + 300)) + W + 300) % (W + 300) - 150;
    ell(cx, 110 + (i % 3) * 170, 110, 32, '#fff', 3);
  }
  const bob = Math.sin(lt * 1.2) * 12;
  palm(620, 470 + bob, 1, 1.6, '#ffe5d9', '#cdb4db');
  hero({ x: 600, y: 545 + bob, s: 0.8, sit: true, face: 1, tilt: -0.2, eyes: 'closed', mouth: 'smile', armF: 1.2 });
  for (let k = 0; k < 8; k++) {
    const a = lt * 0.6 + (k * Math.PI * 2) / 8;
    fish(620 + Math.cos(a) * 330, 330 + Math.sin(a) * 110 + bob, SHIRTS[k % 5], 1.1);
  }
  balloon(900 + Math.sin(lt * 0.8) * 30, 380 - Math.sin(lt * 0.5) * 20, RED, 0.8);
}

// ---------- 7. 새가 되는 종이비행기 ----------
function gRooftop({ lt, len }: SceneArgs) {
  const c = ctx();
  sky('#14213d', '#3a4a7a');
  for (let i = 0; i < 80; i++) ell(hash(i, 12) * W, hash(i + 90, 12) * 380, 1.8, 1.8, '#fff', 0);
  c.fillStyle = '#ffd166';
  skyline(560, '#1d2d50', 21, 0.35);
  rect(-10, 540, W + 20, 200, '#6c757d');
  line(-10, 540, W + 10, 540, 6);
  for (let x = 20; x < W; x += 60) line(x, 540, x, 480, 4);
  line(-10, 480, W + 10, 480, 5);
  const throwP = (lt % (len / 3)) / (len / 3);
  hero({ x: 420, y: 600, s: 1.2, face: 1, armF: throwP < 0.15 ? lerp(0.5, 2.4, throwP / 0.15) : 1.4, armB: 0.3, eyes: 'up', mouth: 'smile', tilt: -0.15 });
  // 던진 종이비행기가 날아가다 새로 변한다
  for (let n = 0; n < 3; n++) {
    const t = lt - n * (len / 3);
    if (t < 0) continue;
    const x = 480 + t * 170;
    const y = 400 - t * 60 + Math.sin(t * 2) * 20;
    if (t < 1.4) {
      poly([[x, y], [x - 50, y - 12], [x - 38, y + 4], [x - 50, y + 18]], '#fff', 3);
    } else {
      const flap = Math.sin(t * 12) * 16;
      line(x - 24, y - flap, x, y + 6, 4, '#fff');
      line(x, y + 6, x + 24, y - flap, 4, '#fff');
    }
  }
}

// ---------- 8. 떠내려가는 물건들 ----------
function gRiver({ lt }: SceneArgs) {
  const c = ctx();
  ['#f28482', '#f5a88e', '#f6bd60', '#f7d08a'].forEach((col, i) => {
    c.fillStyle = col;
    c.fillRect(0, i * 90, W, 90);
  });
  ell(640, 300, 90, 90, '#fff3b0', 0);
  skyline(300, '#6d597a', 33, 0);
  rect(-10, 300, W + 20, 280, '#355070');
  for (let i = 0; i < 8; i++) line(560 - i * 6, 320 + i * 16, 720 + i * 6, 320 + i * 16, 3, 'rgba(255,243,176,0.5)');
  // 오늘 놓친 것들이 강물에 둥둥
  const drift = (k: number) => ((lt * 50 + k * 260) % (W + 200)) - 100;
  const bob = (k: number) => 430 + (k % 2) * 60 + Math.sin(lt * 2 + k) * 8;
  walkingClock(drift(0), bob(0) - 20, 0, false);
  ell(drift(1), bob(1), 60, 30, '#ff8fab', 4, Math.PI, Math.PI * 2);
  rect(drift(2) - 12, bob(2) - 20, 24, 40, '#2b2d42', 3);
  balloon(drift(3), bob(3) - 40, '#3a86ff', 0.6);
  fish(drift(4), bob(4), '#90be6d', 1.3);
  rect(-10, 580, W + 20, 160, '#6a994e');
  line(-10, 610, W + 10, 610, 22, '#adb5bd');
  // 자전거 탄 주인공
  const x = ((lt * 120) % (W + 300)) - 150;
  const rot = lt * 8;
  for (const wx of [x - 45, x + 45]) {
    ell(wx, 650, 30, 30, null, 5);
    line(wx + Math.cos(rot) * 28, 650 + Math.sin(rot) * 28, wx - Math.cos(rot) * 28, 650 - Math.sin(rot) * 28, 3);
  }
  poly([[x - 45, 650], [x - 5, 610], [x + 30, 610], [x + 45, 650], [x, 650]], null, 5, true);
  hero({ x: x - 5, y: 650, s: 0.95, face: 1, sit: true, armF: 1.7, armB: 1.6, tilt: 0.25, eyes: 'dot', mouth: 'flat' });
}

// ---------- 9. 맞잡은 손에서 자라는 새싹 ----------
function gSunrise({ lt, len }: SceneArgs) {
  sky('#ffcdb2', '#ffe8d6');
  const rise = ease(lt / (len * 0.6));
  const sy = lerp(520, 300, rise);
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + Math.floor(lt * 4) * 0.04;
    line(640 + Math.cos(a) * 110, sy + Math.sin(a) * 110, 640 + Math.cos(a) * 150, sy + Math.sin(a) * 150, 5, '#e07a5f');
  }
  ell(640, sy, 90, 90, '#ffb703');
  skyline(560, '#b5838d', 44, 0);
  poly([[0, 620], [400, 560], [700, 600], [1000, 550], [1280, 590], [1280, 720], [0, 720]], '#84a98c');
  const walk = ease((lt - len * 0.1) / (len * 0.35));
  const hold = walk >= 1;
  hero({ x: 470, y: 600, s: 1.2, face: 1, armF: hold ? 1.25 : 0.2, armB: 0.2, eyes: hold ? 'closed' : 'dot', mouth: 'smile' });
  person({ x: lerp(1350, 590, walk), y: 600, s: 1.2, face: -1, shirt: SHIRTS[1], hair: HAIR[3] ?? undefined, legB: walk < 1 ? Math.sin(lt * 10) * 0.5 : 0, legF: walk < 1 ? -Math.sin(lt * 10) * 0.5 : 0, armF: hold ? 1.25 : 0.2, eyes: 'dot', mouth: 'smile' });
  const grow = ease((lt - len * 0.5) / (len * 0.3));
  if (grow > 0) {
    const hx = 530;
    const hy = 470;
    line(hx, hy, hx, hy - 60 * grow, 4, '#2a9d8f');
    ell(hx - 16 * grow, hy - 50 * grow, 16 * grow, 8 * grow, '#90be6d', 3);
    ell(hx + 16 * grow, hy - 62 * grow, 16 * grow, 8 * grow, '#90be6d', 3);
    if (grow > 0.9) star(hx, hy - 70, 12, 6, 6, '#ffafcc', lt, 3);
  }
  balloon(900, lerp(760, 380, ease(lt / len)), RED, 0.9);
  const k = ease((lt - len * 0.6) / (len * 0.2));
  if (k > 0 && songTitle) text(songTitle, 640, 120, 72, '#e07a5f', { font: TITLE_FONT, alpha: k, stroke: 10 });
  if (k > 0 && artist) text(artist, 640, 190, 34, INK, { alpha: k, stroke: 0 });
}

const f = (x: number) => x * DEMO_DURATION;

export const GENERAL_SCENES: Scene[] = [
  { from: f(0), to: f(0.08), name: '떨어지는 제목', draw: gTitle },
  { from: f(0.08), to: f(0.19), name: '도망가는 알람시계', draw: gAlarm },
  { from: f(0.19), to: f(0.31), name: '쳐다보는 지하철', draw: gSubway },
  { from: f(0.31), to: f(0.41), name: '빈 손', draw: gHands },
  { from: f(0.41), to: f(0.54), name: '해파리 우산', draw: gUmbrellas, rain: () => 1 },
  { from: f(0.54), to: f(0.66), name: '손바닥 위의 꿈', draw: gDream },
  { from: f(0.66), to: f(0.79), name: '새가 되는 종이비행기', draw: gRooftop },
  { from: f(0.79), to: f(0.9), name: '떠내려가는 것들', draw: gRiver },
  { from: f(0.9), to: f(1) + 1, name: '맞잡은 손', draw: gSunrise },
];
