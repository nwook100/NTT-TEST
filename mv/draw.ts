// 손그림 카툰 드로잉 도구 — 굵은 먹선, 단색 면, 초당 8번 "떨리는" 선(line boil)

export const W = 1280;
export const H = 720;
export const INK = '#1d1a17';
export const SKIN = '#f3d2b0';
export const ORANGE = '#ff6b35';
export const TITLE_FONT = "'Black Han Sans', 'Jua', sans-serif";
export const TEXT_FONT = "'Jua', 'Black Han Sans', sans-serif";

let c: CanvasRenderingContext2D;
let seed = 0;
let sid = 0;

export function begin(ctx: CanvasRenderingContext2D, t: number) {
  c = ctx;
  seed = Math.floor(t * 8);
  sid = 0;
  c.lineJoin = 'round';
  c.lineCap = 'round';
}

export const ctx = () => c;

export function hash(i: number, s = seed) {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
const wob = (i: number, a: number) => (hash(i) - 0.5) * 2 * a;

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const ease = (k: number) => {
  k = clamp(k);
  return k * k * (3 - 2 * k);
};

type Pt = [number, number];

export function poly(pts: Pt[], fill?: string | null, lw = 5, close = true, jitter = 1.4) {
  const id = ++sid * 53;
  c.beginPath();
  pts.forEach(([x, y], k) => {
    const X = x + wob(id + k * 2, jitter);
    const Y = y + wob(id + k * 2 + 1, jitter);
    if (k) c.lineTo(X, Y);
    else c.moveTo(X, Y);
  });
  if (close) c.closePath();
  if (fill) {
    c.fillStyle = fill;
    c.fill();
  }
  if (lw > 0) {
    c.lineWidth = lw;
    c.strokeStyle = INK;
    c.stroke();
  }
}

export function ell(x: number, y: number, rx: number, ry: number, fill?: string | null, lw = 5, a0 = 0, a1 = Math.PI * 2) {
  const n = Math.max(10, Math.min(40, Math.round((rx + ry) / 4)));
  const full = a1 - a0 >= Math.PI * 2 - 1e-6;
  const pts: Pt[] = [];
  const steps = full ? n : n + 1;
  for (let k = 0; k < steps; k++) {
    const a = a0 + ((a1 - a0) * k) / n;
    pts.push([x + Math.cos(a) * rx, y + Math.sin(a) * ry]);
  }
  poly(pts, fill, lw, full || !!fill, Math.min(1.6, (rx + ry) / 30));
}

export function rect(x: number, y: number, w: number, h: number, fill?: string | null, lw = 5) {
  poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], fill, lw);
}

export function line(x1: number, y1: number, x2: number, y2: number, lw = 5, col = INK) {
  const id = ++sid * 53;
  c.beginPath();
  c.moveTo(x1 + wob(id, 1.2), y1 + wob(id + 1, 1.2));
  const mx = (x1 + x2) / 2 + wob(id + 2, 1.5);
  const my = (y1 + y2) / 2 + wob(id + 3, 1.5);
  c.quadraticCurveTo(mx, my, x2 + wob(id + 4, 1.2), y2 + wob(id + 5, 1.2));
  c.lineWidth = lw;
  c.strokeStyle = col;
  c.stroke();
}

// 먹선 테두리가 있는 팔다리
export function limb(x1: number, y1: number, x2: number, y2: number, col: string, w = 10) {
  line(x1, y1, x2, y2, w + 8, INK);
  sid -= 1; // 같은 흔들림으로 안쪽 색 칠하기
  line(x1, y1, x2, y2, w, col);
}

export function star(x: number, y: number, r1: number, r2: number, n: number, fill: string, rot = 0, lw = 5) {
  const pts: Pt[] = [];
  for (let k = 0; k < n * 2; k++) {
    const a = rot + (Math.PI * k) / n;
    const r = k % 2 ? r2 : r1;
    pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]);
  }
  poly(pts, fill, lw);
}

export function text(
  str: string,
  x: number,
  y: number,
  size: number,
  fill = '#fff',
  opts: { font?: string; align?: CanvasTextAlign; stroke?: number; rot?: number; alpha?: number } = {},
) {
  c.save();
  c.globalAlpha = opts.alpha ?? 1;
  c.translate(x, y);
  c.rotate(opts.rot ?? 0);
  c.font = `${size}px ${opts.font ?? TEXT_FONT}`;
  c.textAlign = opts.align ?? 'center';
  c.textBaseline = 'middle';
  const sw = opts.stroke ?? Math.max(4, size / 7);
  if (sw > 0) {
    c.lineWidth = sw;
    c.strokeStyle = INK;
    c.strokeText(str, 0, 0);
  }
  c.fillStyle = fill;
  c.fillText(str, 0, 0);
  c.restore();
}

// ---------- 캐릭터 ----------
export interface Person {
  x: number;
  y: number; // 발끝 기준
  s?: number;
  face?: 1 | -1;
  shirt?: string;
  pants?: string;
  skin?: string;
  armB?: number; // 뒤쪽 팔 각도 (0 = 아래, π/2 = 앞으로, π = 위로)
  armF?: number; // 앞쪽 팔 각도
  legB?: number;
  legF?: number;
  tilt?: number;
  eyes?: 'dot' | 'closed' | 'x' | 'wide' | 'up';
  mouth?: 'flat' | 'smile' | 'o' | 'sad' | 'grin';
  helmet?: boolean;
  headset?: boolean;
  tie?: boolean;
  hair?: string;
  gun?: boolean;
  pan?: boolean;
  sit?: boolean;
  rot?: number;
}

export function person(p: Person) {
  const s = p.s ?? 1;
  const f = p.face ?? 1;
  const shirt = p.shirt ?? '#81b29a';
  const pants = p.pants ?? '#3d405b';
  const skin = p.skin ?? SKIN;
  c.save();
  c.translate(p.x, p.y);
  if (p.rot) c.rotate(p.rot);
  c.scale(f * s, s);

  const hipY = p.sit ? -18 : -46;
  const shY = hipY - 52;
  const legLen = 44;
  const legB = p.legB ?? 0;
  const legF = p.legF ?? 0;
  const foot = (hx: number, a: number): Pt => [hx + Math.sin(a) * legLen, hipY + Math.cos(a) * legLen];

  // 다리
  const [bx, by] = foot(-6, p.sit ? 1.45 : legB);
  const [fx, fy] = foot(6, p.sit ? 1.35 : legF);
  limb(-6, hipY, bx, by, pants, 11);
  ell(bx + 6, by + 2, 11, 6, INK, 0);
  // 뒤쪽 팔
  const armLen = 40;
  const hand = (sx: number, a: number): Pt => [sx + Math.sin(a) * armLen, shY + 6 + Math.cos(a) * armLen];
  const [hbx, hby] = hand(-10, p.armB ?? 0.2);
  limb(-10, shY + 6, hbx, hby, shirt, 10);
  ell(hbx, hby, 7, 7, skin, 4);
  limb(6, hipY, fx, fy, pants, 11);
  ell(fx + 6, fy + 2, 11, 6, INK, 0);

  // 몸통
  poly([[-21, hipY + 4], [21, hipY + 4], [16, shY], [-16, shY]], shirt);
  if (p.tie) poly([[0, shY + 2], [5, shY + 14], [0, shY + 34], [-5, shY + 14]], '#c1121f', 3);

  // 앞쪽 팔 + 소품
  const af = p.armF ?? -0.2;
  const [hfx, hfy] = hand(12, af);
  if (p.gun) {
    c.save();
    c.translate(hfx, hfy);
    rect(-8, -8, 56, 12, '#4a4e4d', 4);
    rect(-2, 2, 10, 14, '#4a4e4d', 3);
    c.restore();
  }
  if (p.pan) {
    c.save();
    c.translate(hfx, hfy);
    c.rotate(-af);
    line(0, 0, 0, 38, 7);
    ell(0, 62, 26, 26, '#555b5e', 5);
    ell(-6, 56, 8, 8, '#8d9497', 0);
    c.restore();
  }
  limb(12, shY + 6, hfx, hfy, shirt, 10);
  ell(hfx, hfy, 7, 7, skin, 4);

  // 머리 (큰 머리, 작은 눈 — 카툰 비율)
  c.translate(2, shY - 30);
  c.rotate(p.tilt ?? 0);
  ell(0, 0, 33, 35, skin);
  if (p.hair) {
    poly([[-33, -6], [-30, -26], [-10, -38], [14, -36], [31, -18], [20, -24], [0, -24], [-22, -14]], p.hair, 4);
  } else {
    line(-6, -34, -10, -46, 3);
    line(2, -35, 3, -48, 3);
    line(9, -34, 15, -44, 3);
  }
  ell(31, 6, 7, 6, skin, 4); // 코
  const ey = p.eyes === 'up' ? -8 : -3;
  switch (p.eyes ?? 'dot') {
    case 'closed':
      line(6, -2, 13, -2, 3);
      line(18, -2, 25, -2, 3);
      break;
    case 'x':
      line(6, -7, 13, 2, 3); line(13, -7, 6, 2, 3);
      line(18, -7, 25, 2, 3); line(25, -7, 18, 2, 3);
      break;
    case 'wide':
      ell(10, -3, 6, 7, '#fff', 3); ell(22, -3, 6, 7, '#fff', 3);
      ell(11, -2, 2.5, 2.5, INK, 0); ell(23, -2, 2.5, 2.5, INK, 0);
      break;
    default:
      ell(10, ey, 3, 3.5, INK, 0);
      ell(22, ey, 3, 3.5, INK, 0);
  }
  switch (p.mouth ?? 'flat') {
    case 'smile':
      ell(18, 15, 8, 5, null, 3, 0.2, Math.PI - 0.2);
      break;
    case 'grin':
      poly([[8, 12], [28, 12], [24, 22], [12, 22]], '#fff', 3);
      break;
    case 'o':
      ell(18, 17, 5, 6, INK, 0);
      break;
    case 'sad':
      ell(18, 22, 8, 5, null, 3, Math.PI + 0.3, Math.PI * 2 - 0.3);
      break;
    default:
      line(12, 16, 24, 16, 3);
  }
  if (p.helmet) {
    ell(0, -8, 37, 30, '#6b7a4a', 5, Math.PI, Math.PI * 2);
    line(-40, -8, 42, -8, 6);
  }
  if (p.headset) {
    ell(0, -4, 38, 40, null, 5, Math.PI * 1.05, Math.PI * 1.95);
    ell(-6, 0, 9, 12, '#2b2d42', 4);
    line(-2, 8, 20, 22, 3);
  }
  c.restore();
}

// 필름 입자 / 종이 질감
let grain: HTMLCanvasElement | null = null;
export function paper(t: number, alpha = 0.08) {
  if (!grain) {
    grain = document.createElement('canvas');
    grain.width = grain.height = 256;
    const g = grain.getContext('2d')!;
    const img = g.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }
  const k = Math.floor(t * 12);
  c.save();
  c.globalAlpha = alpha;
  c.globalCompositeOperation = 'overlay';
  c.translate(-(k * 37) % 256, -(k * 91) % 256);
  c.fillStyle = c.createPattern(grain, 'repeat')!;
  c.fillRect(0, 0, W + 256, H + 256);
  c.restore();
}

export function vignette() {
  const g = c.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.95);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.45)');
  c.fillStyle = g;
  c.fillRect(0, 0, W, H);
}

export function rain(t: number, amount: number) {
  if (amount <= 0) return;
  const k = Math.floor(t * 12);
  c.save();
  c.strokeStyle = `rgba(220,235,255,${0.55 * amount})`;
  c.lineWidth = 2;
  c.beginPath();
  const n = Math.floor(140 * amount);
  for (let i = 0; i < n; i++) {
    const x = hash(i, k) * (W + 200) - 100;
    const y = hash(i + 999, k) * H;
    c.moveTo(x, y);
    c.lineTo(x - 10, y + 34);
  }
  c.stroke();
  c.restore();
}
