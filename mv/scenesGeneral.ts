// 일반 뮤직비디오 테마 — 게임 요소 없이, 평범한 하루를 따라가는 카툰 이야기
// 새벽 알람 → 지하철 → 사무실 → 비 오는 거리 → 하늘을 나는 꿈 → 옥상의 밤 → 강변 노을 → 해돋이
import { DEMO_DURATION } from './audio';
import { W, H, INK, TITLE_FONT, ctx, poly, ell, rect, line, star, text, person, hash, lerp, clamp, ease } from './draw';
import { Scene, SceneArgs, SHIRTS, HAIR } from './scenes';

let songTitle = 'Empty Hands';
let artist = 'ntt26';
export function setSongInfo(title: string, by: string) {
  songTitle = title.trim();
  artist = by.trim();
}

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

// ---------- 타이틀 ----------
function gTitle({ lt }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#efe6d2';
  c.fillRect(0, 0, W, H);
  for (let i = 0; i < 3; i++) {
    const bx = ((lt * 70 + i * 260) % (W + 200)) - 100;
    const by = 150 + i * 40 + Math.sin(Math.floor(lt * 6) + i) * 8;
    line(bx - 18, by, bx, by + 10, 4);
    line(bx, by + 10, bx + 18, by, 4);
  }
  poly([[0, 560], [300, 510], [640, 550], [980, 500], [1280, 540], [1280, 720], [0, 720]], '#a3b18a');
  const k = ease((lt - 0.4) / 0.8);
  text(songTitle || 'untitled', 640, 300, 96, '#e07a5f', { font: TITLE_FONT, stroke: 12, alpha: k, rot: -0.03 });
  text(artist ? `${artist} — animated music video` : 'animated music video', 640, 400, 34, INK, { stroke: 0, alpha: ease((lt - 1.4) / 0.8) });
}

// ---------- 새벽 알람 ----------
function gBedroom({ lt, len, pulse }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#b8c0d8';
  c.fillRect(0, 0, W, H);
  rect(-10, 580, W + 20, 160, '#8d7b68');
  rect(760, 90, 300, 220, '#f7c59f');
  ell(910, 310, 70, 50, '#fff3b0', 4, Math.PI, Math.PI * 2);
  line(910, 90, 910, 310, 6);
  // 침대
  rect(160, 430, 560, 90, '#d4a373');
  rect(150, 360, 40, 220, '#7f5539');
  rect(700, 420, 30, 160, '#7f5539');
  const up = ease((lt - len * 0.55) / (len * 0.2));
  person({ x: lerp(520, 400, up), y: lerp(440, 470, up), s: 1.2, face: 1, shirt: '#bde0fe', rot: lerp(-Math.PI / 2, 0, up), sit: up > 0.5, eyes: up > 0.7 ? 'dot' : 'closed', mouth: up > 0.7 ? 'flat' : 'o', armF: up > 0.7 ? 2.8 : 0.3, tilt: up > 0.7 ? 0.25 : 0, hair: '#5a3e2b' });
  poly([[200, 440], [700, 440], [690, 500], [210, 500]], '#e07a5f');
  // 알람 시계
  const ring = lt < len * 0.6;
  const sh = ring ? (hash(Math.floor(lt * 20), 4) - 0.5) * 10 * (0.5 + pulse) : 0;
  rect(820 + sh, 470, 80, 110, '#6f4518');
  ell(860 + sh, 440, 34, 34, '#fffdf5');
  line(860 + sh, 440, 860 + sh, 420, 4);
  line(860 + sh, 440, 875 + sh, 445, 4);
  if (ring) {
    text('따르릉', 860, 370, 40, '#fff', { rot: sh * 0.02 });
  }
}

// ---------- 지하철 ----------
function gSubway({ lt, pulse }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#d8e2dc';
  c.fillRect(0, 0, W, H);
  // 창밖 (터널 불빛이 지나감)
  for (let i = 0; i < 3; i++) {
    const x = 120 + i * 380;
    rect(x, 120, 300, 170, '#22223b');
    const off = (lt * 900) % 300;
    c.save();
    c.beginPath();
    c.rect(x, 120, 300, 170);
    c.clip();
    for (let k = -1; k < 3; k++) {
      c.fillStyle = '#ffd166';
      c.fillRect(x + k * 150 + 150 - off, 190, 40, 8);
    }
    c.restore();
  }
  line(0, 90, W, 90, 8);
  rect(-10, 560, W + 20, 180, '#6c757d');
  rect(80, 450, 1120, 60, '#457b9d');
  for (let x of [100, 640, 1180]) line(x, 90, x, 560, 8, '#adb5bd');
  const sway = Math.sin(lt * 2.2) * 0.06 + pulse * 0.05;
  for (let k = 0; k < 5; k++) {
    const x = 200 + k * 210;
    const standing = k % 2 === 1;
    person({
      x, y: standing ? 600 : 520, s: 1.05, face: k < 3 ? 1 : -1, shirt: SHIRTS[k], hair: HAIR[k] ?? undefined,
      sit: !standing, tilt: sway * (k % 3 ? 1 : -1) + (k === 0 ? 0.4 : 0),
      eyes: k === 0 ? 'closed' : 'dot', mouth: k === 4 ? 'smile' : 'flat',
      armF: standing ? 3.0 : 1.3, armB: 0.3,
    });
    if (!standing && k !== 0) rect(x + 20, 420, 22, 34, '#2b2d42', 3); // 휴대폰
  }
  // 손잡이
  for (let i = 0; i < 8; i++) {
    const hx = 150 + i * 140 + Math.sin(lt * 2.2 + i) * 6;
    line(hx, 90, hx, 150, 3);
    ell(hx, 165, 14, 14, null, 4);
  }
}

// ---------- 빈 손 (클로즈업) ----------
function palm(cx: number, cy: number, dir: 1 | -1) {
  const c = ctx();
  c.save();
  c.translate(cx, cy);
  c.scale(dir, 1);
  poly([[-40, 260], [-60, 90], [-100, 40], [-120, -20], [-95, -30], [-55, 20], [-60, -110], [-35, -120], [-20, -30], [-10, -140], [15, -140], [20, -30], [40, -125], [65, -115], [50, -20], [75, -95], [98, -85], [80, 60], [60, 260]], '#f3d2b0', 6);
  line(-30, 40, 40, 20, 3);
  line(-25, 80, 45, 70, 3);
  poly([[-60, 260], [80, 260], [90, 360], [-70, 360]], '#bde0fe', 6);
  c.restore();
}
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
  // 떨어지는 빗방울 → 작은 빛
  for (let i = 0; i < 5; i++) {
    const y = ((lt * 160 + i * 150) % 500) - 60;
    if (y < 380) ell(560 + i * 40, y, 5, 9, 'rgba(189,224,254,0.9)', 2);
  }
  if (glow > 0) star(640, 400, (26 + pulse * 10) * glow, 11 * glow, 5, '#ffd166', lt * 0.8, 4);
  if (lt < len * 0.5) text('...', 640, 140, 60, '#fff', { stroke: 0, alpha: 0.6 });
}

// ---------- 비 오는 거리 ----------
function gRain({ lt }: SceneArgs) {
  const c = ctx();
  c.fillStyle = '#3d4a63';
  c.fillRect(0, 0, W, H);
  skyline(470, '#2c3548', 7, 0);
  c.fillStyle = '#ffd166';
  skyline(470, '#323d54', 8, 0.3);
  rect(-10, 470, W + 20, 260, '#4f5d75');
  for (let i = 0; i < 4; i++) {
    const lx = 120 + i * 340;
    line(lx, 470, lx, 230, 8);
    ell(lx + 20, 230, 26, 12, '#ffd166', 4);
    c.save();
    c.globalAlpha = 0.18;
    c.fillStyle = '#ffd166';
    c.beginPath();
    c.moveTo(lx + 20, 240);
    c.lineTo(lx - 60, 600);
    c.lineTo(lx + 100, 600);
    c.fill();
    c.restore();
  }
  // 우산 쓴 사람들
  const umbrellas = ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#b56576'];
  for (let k = 0; k < 5; k++) {
    const dir = k % 2 ? -1 : 1;
    const speed = 60 + k * 15;
    const x = dir > 0 ? ((lt * speed + k * 300) % (W + 200)) - 100 : W + 100 - ((lt * speed + k * 300) % (W + 200));
    const y = 610 + (k % 3) * 25;
    const ph = lt * 8 + k;
    ell(x + dir * 10, y + 8, 50, 8, 'rgba(255,255,255,0.12)', 0);
    person({ x, y, s: 0.95, face: dir as 1 | -1, shirt: SHIRTS[k], hair: HAIR[k] ?? undefined, legB: Math.sin(ph) * 0.5, legF: -Math.sin(ph) * 0.5, armF: 2.6, eyes: 'dot', mouth: k === 2 ? 'smile' : 'flat' });
    line(x + dir * 20, y - 150, x + dir * 20, y - 230, 4);
    ell(x + dir * 20, y - 225, 75, 45, umbrellas[k], 5, Math.PI, Math.PI * 2);
  }
}

// ---------- 하늘을 나는 꿈 ----------
function gDream({ lt }: SceneArgs) {
  sky('#cdb4db', '#ffc8dd');
  for (let i = 0; i < 6; i++) {
    const cx = ((i * 260 - lt * 40) % (W + 300) + W + 300) % (W + 300) - 150;
    ell(cx, 120 + (i % 3) * 180, 110, 36, '#fff', 3);
  }
  // 고래 구름
  const wx = 900 - lt * 25;
  ell(wx, 260, 170, 70, '#a2d2ff');
  poly([[wx + 150, 250], [wx + 240, 200], [wx + 230, 300]], '#a2d2ff');
  ell(wx - 110, 250, 6, 6, INK, 0);
  line(wx - 150, 280, wx - 60, 285, 3);
  for (let k = 0; k < 3; k++) ell(wx - 40 + k * 12, 180 - ((lt * 60 + k * 20) % 60), 5, 5, '#fff', 2);
  // 떠 있는 사람
  const fy = 430 + Math.sin(lt * 1.5) * 25;
  person({ x: 450, y: fy, s: 1.3, face: 1, shirt: '#bde0fe', hair: '#5a3e2b', rot: -0.25 + Math.sin(lt) * 0.1, armF: 2.2, armB: 1.9, legB: -0.5, legF: 0.4, eyes: 'closed', mouth: 'smile' });
  // 물고기 떼
  for (let k = 0; k < 7; k++) {
    const x = ((k * 190 + lt * 90) % (W + 200)) - 100;
    const y = 540 + Math.sin(lt * 2 + k) * 30 + (k % 2) * 60;
    ell(x, y, 22, 11, SHIRTS[k % 5], 3);
    poly([[x - 20, y], [x - 36, y - 10], [x - 36, y + 10]], SHIRTS[k % 5], 3);
  }
}

// ---------- 옥상의 밤 ----------
function gRooftop({ lt, len }: SceneArgs) {
  const c = ctx();
  sky('#14213d', '#3a4a7a');
  for (let i = 0; i < 80; i++) ell(hash(i, 12) * W, hash(i + 90, 12) * 380, 1.8, 1.8, '#fff', 0);
  const sh = (lt / len) * 1.4;
  if (sh > 0.4 && sh < 1) {
    const k = (sh - 0.4) / 0.6;
    line(900 - k * 400, 60 + k * 150, 900 - k * 400 + 70, 60 + k * 150 - 25, 4, '#fff3b0');
  }
  c.fillStyle = '#ffd166';
  skyline(560, '#1d2d50', 21, 0.35);
  rect(-10, 540, W + 20, 200, '#6c757d');
  line(-10, 540, W + 10, 540, 6);
  for (let x = 20; x < W; x += 60) line(x, 540, x, 480, 4);
  line(-10, 480, W + 10, 480, 5);
  person({ x: 520, y: 600, s: 1.2, face: 1, sit: true, shirt: SHIRTS[0], hair: HAIR[1] ?? undefined, tilt: -0.3, eyes: 'up', mouth: 'smile', armF: 1.3 });
  person({ x: 720, y: 600, s: 1.2, face: -1, sit: true, shirt: SHIRTS[3], tilt: -0.3, eyes: 'up', mouth: 'flat', armF: 1.3 });
  rect(612, 560, 16, 30, '#e63946', 3);
  rect(640, 562, 16, 30, '#3a86ff', 3);
}

// ---------- 강변 노을 ----------
function gRiver({ lt }: SceneArgs) {
  const c = ctx();
  ['#f28482', '#f5a88e', '#f6bd60', '#f7d08a'].forEach((col, i) => {
    c.fillStyle = col;
    c.fillRect(0, i * 90, W, 90);
  });
  ell(640, 360, 100, 100, '#fff3b0', 0);
  skyline(360, '#6d597a', 33, 0);
  rect(-10, 360, W + 20, 200, '#355070');
  for (let i = 0; i < 10; i++) {
    const y = 380 + i * 18;
    const off = (lt * 30 + i * 50) % 200;
    line(540 - off * 0.3, y, 740 + off * 0.3 - i * 5, y, 3, 'rgba(255,243,176,0.6)');
  }
  // 다리
  line(-10, 300, W + 10, 300, 10);
  for (let x = 60; x < W; x += 160) {
    ell(x + 80, 300, 80, 60, null, 6, 0, Math.PI);
  }
  rect(-10, 560, W + 20, 180, '#6a994e');
  line(-10, 590, W + 10, 590, 22, '#adb5bd');
  // 자전거
  const x = ((lt * 140) % (W + 300)) - 150;
  const rot = lt * 9;
  for (const wx of [x - 45, x + 45]) {
    ell(wx, 640, 30, 30, null, 5);
    line(wx + Math.cos(rot) * 28, 640 + Math.sin(rot) * 28, wx - Math.cos(rot) * 28, 640 - Math.sin(rot) * 28, 3);
  }
  poly([[x - 45, 640], [x - 5, 600], [x + 30, 600], [x + 45, 640], [x, 640]], null, 5, true);
  const ph = rot;
  person({ x: x - 5, y: 640, s: 0.95, face: 1, shirt: SHIRTS[2], hair: HAIR[3] ?? undefined, sit: true, armF: 1.7, armB: 1.6, tilt: -0.1, eyes: 'dot', mouth: 'smile', legF: Math.sin(ph) * 0.5 });
}

// ---------- 해돋이 & 엔딩 ----------
function gSunrise({ lt, len }: SceneArgs) {
  sky('#ffcdb2', '#ffe8d6');
  const rise = ease(lt / (len * 0.6));
  const sy = lerp(520, 300, rise);
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + Math.floor(lt * 4) * 0.04;
    line(640 + Math.cos(a) * 110, sy + Math.sin(a) * 110, 640 + Math.cos(a) * 150, sy + Math.sin(a) * 150, 5, '#e07a5f');
  }
  ell(640, sy, 90, 90, '#ffb703');
  ctx().fillStyle = '#ffd6a5';
  skyline(560, '#b5838d', 44, 0);
  poly([[0, 620], [400, 560], [700, 600], [1000, 550], [1280, 590], [1280, 720], [0, 720]], '#84a98c');
  person({ x: 380, y: 590, s: 1.2, face: 1, shirt: '#bde0fe', hair: '#5a3e2b', armF: lerp(0.2, 1.25, ease((lt - len * 0.6) / (len * 0.1))), armB: 0.2, eyes: 'closed', mouth: 'smile', tilt: -0.2 });
  const k = ease((lt - len * 0.55) / (len * 0.25));
  if (k > 0 && songTitle) text(songTitle, 640, 130, 72, '#e07a5f', { font: TITLE_FONT, alpha: k, stroke: 10 });
  if (k > 0 && artist) text(artist, 640, 205, 36, INK, { alpha: k, stroke: 0 });
  // 다른 사람이 다가와 빈 손을 잡는다
  const walk = ease((lt - len * 0.25) / (len * 0.35));
  person({ x: lerp(1350, 520, walk), y: 590, s: 1.2, face: -1, shirt: SHIRTS[1], hair: HAIR[3] ?? undefined, legB: walk < 1 ? Math.sin(lt * 10) * 0.5 : 0, legF: walk < 1 ? -Math.sin(lt * 10) * 0.5 : 0, armF: walk >= 1 ? 1.2 : 0.2, eyes: 'dot', mouth: 'smile' });
  if (k > 0) star(1000, 420, 18 * k, 8 * k, 4, '#fff', lt, 3);
}

const f = (x: number) => x * DEMO_DURATION;

export const GENERAL_SCENES: Scene[] = [
  { from: f(0), to: f(0.08), name: '타이틀', draw: gTitle },
  { from: f(0.08), to: f(0.19), name: '새벽 알람', draw: gBedroom },
  { from: f(0.19), to: f(0.31), name: '지하철', draw: gSubway },
  { from: f(0.31), to: f(0.41), name: '빈 손', draw: gHands },
  { from: f(0.41), to: f(0.54), name: '비 오는 거리', draw: gRain, rain: () => 1 },
  { from: f(0.54), to: f(0.66), name: '하늘을 나는 꿈', draw: gDream },
  { from: f(0.66), to: f(0.79), name: '옥상의 밤', draw: gRooftop },
  { from: f(0.79), to: f(0.9), name: '강변 노을', draw: gRiver },
  { from: f(0.9), to: f(1) + 1, name: '해돋이', draw: gSunrise },
];
