// 신성테크놀로지 홈페이지 동작 코드
// 이 파일을 고친 뒤에는 company 폴더에서 `npm run build`를 실행하면 app.js가 새로 만들어집니다.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

/* =========================================================
   1. 3D 장면: 웨이퍼링 + 다이싱 테이프 + 웨이퍼
   ========================================================= */
const hero = { p: 0 };          // 첫 화면 스크롤 진행률 (0~1)
const pointer = { x: 0, y: 0 }; // 마우스 위치 (-1~1)
const eased = { x: 0, y: 0 };   // 부드럽게 따라가는 마우스 값
let scene3d = null;

function makeWaferTexture() {
  // 웨이퍼 위의 칩(die) 격자를 캔버스로 그립니다.
  const size = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(size * 0.35, size * 0.3, 40, size / 2, size / 2, size / 2);
  grad.addColorStop(0, '#5a6c9a');
  grad.addColorStop(1, '#232b45');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);

  const die = 30, gap = 3, r = size / 2 - 14;
  for (let y = 0; y < size; y += die + gap) {
    for (let x = 0; x < size; x += die + gap) {
      const cx = x + die / 2 - size / 2, cy = y + die / 2 - size / 2;
      if (Math.hypot(cx, cy) > r - die * 0.7) continue;
      const hue = 215 + Math.random() * 40;
      g.fillStyle = `hsl(${hue}, 32%, ${40 + Math.random() * 14}%)`;
      g.fillRect(x, y, die, die);
      g.fillStyle = 'rgba(255,255,255,0.10)';
      g.fillRect(x + 4, y + 4, die - 8, 2);
      g.fillRect(x + 4, y + die - 8, (die - 8) * 0.6, 2);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeRingGeometry() {
  // 12인치 웨이퍼링 모양: 바깥 원 + 양옆 평면(flat) + 위아래 V 노치, 가운데 구멍
  const R = 1.2, F = 1.12, r = 1.02, steps = 360;
  const shape = new THREE.Shape();
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    let rad = R;
    for (const n of [Math.PI / 2, -Math.PI / 2 + Math.PI * 2]) {
      const d = Math.abs(a - n);
      if (d < 0.035) rad = R - 0.06 * (1 - d / 0.035);
    }
    let x = Math.cos(a) * rad;
    const y = Math.sin(a) * rad;
    if (Math.abs(x) > F) x = Math.sign(x) * F;
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, r, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.03, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006,
    bevelSegments: 3, curveSegments: 128,
  });
  geo.translate(0, 0, -0.015);
  return geo;
}

function initScene() {
  const canvas = document.getElementById('gl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    canvas.remove(); // WebGL이 안 되는 환경이면 3D 없이 보여 줍니다.
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 5);

  const rim = new THREE.DirectionalLight(0x4da3ff, 3);
  rim.position.set(-3, 2, -2);
  scene.add(rim);
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(3, 3, 4);
  scene.add(key);

  // 전체를 담는 그룹 (위치 · 기울기) → 안쪽 그룹 (회전)
  const rig = new THREE.Group();
  const spin = new THREE.Group();
  rig.add(spin);
  scene.add(rig);

  const ring = new THREE.Mesh(
    makeRingGeometry(),
    new THREE.MeshPhysicalMaterial({ color: 0xc9ced6, metalness: 1, roughness: 0.26, clearcoat: 0.4 })
  );
  const tape = new THREE.Mesh(
    new THREE.CircleGeometry(1.1, 128),
    new THREE.MeshPhysicalMaterial({
      color: 0x7fb8ff, transparent: true, opacity: 0.22, roughness: 0.15,
      side: THREE.DoubleSide, depthWrite: false,
    })
  );
  const waferTop = new THREE.MeshPhysicalMaterial({
    map: makeWaferTexture(), metalness: 0.6, roughness: 0.3,
    iridescence: 1, iridescenceIOR: 1.8, iridescenceThicknessRange: [200, 800],
    clearcoat: 0.5, clearcoatRoughness: 0.2,
  });
  const waferEdge = new THREE.MeshStandardMaterial({ color: 0x9aa3b2, metalness: 1, roughness: 0.3 });
  const wafer = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.014, 128), [waferEdge, waferTop, waferEdge]);
  wafer.rotation.x = Math.PI / 2;
  spin.add(ring, tape, wafer);

  // 떠다니는 먼지 입자
  const count = 700;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x6fb0ff, size: 0.014, transparent: true, opacity: 0.55, depthWrite: false,
  }));
  scene.add(dust);

  // 부품 설명 라벨이 붙을 3D 위치
  const anchors = {
    // 원판의 오른쪽 끝(+x)에 라벨을 붙입니다. (웨이퍼 원기둥은 회전되어 있어 로컬 축이 다름)
    wafer: { obj: wafer, local: new THREE.Vector3(0.9, 0.007, 0) },
    tape: { obj: tape, local: new THREE.Vector3(1.1, 0, 0) },
    ring: { obj: ring, local: new THREE.Vector3(1.12, 0, 0.015) },
  };
  const callouts = [...document.querySelectorAll('.callout')];
  const heroEl = document.querySelector('.hero-sticky');

  let layout = { x: 1.15, y: 0, s: 1 };
  function resize() {
    const w = heroEl.clientWidth, h = heroEl.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    layout = w < 900
      ? { x: 0, y: 0.5, s: 0.52, ex: 0, ey: 0.05, es: 1.05 }
      : { x: 1.0, y: 0.05, s: 1, ex: 0.35, ey: -0.1, es: 0.95 };
  }
  resize();
  window.addEventListener('resize', resize);

  const intro = { v: reduceMotion ? 1 : 0 }; // 등장 애니메이션 진행률
  const tmp = new THREE.Vector3();
  let visible = true, last = performance.now();

  function render(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const p = hero.p;
    const e = smooth(0.12, 0.62, p); // 분해 진행률

    if (!reduceMotion) spin.rotation.z += dt * 0.12;
    spin.position.z = 0;
    wafer.position.z = lerp(0.012, 0.75, e);
    tape.position.z = lerp(-0.02, 0.28, e);
    ring.position.z = lerp(0, -0.2, e);

    eased.x += (pointer.x - eased.x) * Math.min(1, dt * 4);
    eased.y += (pointer.y - eased.y) * Math.min(1, dt * 4);
    const iv = intro.v;
    rig.position.x = lerp(layout.x, layout.ex, e);
    rig.position.y = lerp(layout.y, layout.ey, e) + (1 - iv) * -0.4;
    rig.scale.setScalar(layout.s * lerp(0.85, 1, iv) * lerp(1, layout.es, e));
    rig.rotation.x = lerp(-1.05, -1.22, e) + eased.y * 0.12 + (1 - iv) * -0.4;
    rig.rotation.y = lerp(-0.25, -0.1, e) + eased.x * 0.18;
    dust.rotation.y += dt * 0.02;

    renderer.render(scene, camera);

    // 라벨 위치: 3D 좌표 → 화면 좌표
    const show = smooth(0.42, 0.6, p) * (1 - smooth(0.9, 1, p));
    const w = heroEl.clientWidth, h = heroEl.clientHeight;
    callouts.forEach((el) => {
      const a = anchors[el.dataset.part];
      tmp.copy(a.local).applyMatrix4(a.obj.matrixWorld).project(camera);
      const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * h;
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.opacity = show;
    });
  }

  function loop(now) {
    if (visible) render(now);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // 첫 화면이 안 보이면 그리기를 멈춰 배터리를 아낍니다.
  ScrollTrigger.create({
    trigger: '.hero', start: 'top bottom', end: 'bottom top',
    onToggle: (self) => { visible = self.isActive; },
  });

  return { intro };
}

/* =========================================================
   2. 로딩 화면 → 첫 화면 등장
   ========================================================= */
function playIntro() {
  const loader = document.querySelector('.loader');
  const heroIn = () => {
    const tl = gsap.timeline();
    if (scene3d) tl.to(scene3d.intro, { v: 1, duration: 1.8, ease: 'expo.out' }, 0);
    tl.to('.hero-title .line > span', { y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }, 0.05)
      .to('.hero-copy .eyebrow, .hero-sub, .hud, .scroll-cue', { opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.08 }, 0.4);
  };

  let seen = false;
  try { seen = sessionStorage.getItem('ss-intro') === '1'; } catch (e) { /* 저장 불가 환경 */ }

  // 움직임 줄이기 설정이거나 이번 방문에 이미 봤다면 로딩 화면을 건너뜁니다.
  if (reduceMotion || seen) {
    loader.remove();
    if (!reduceMotion) heroIn();
    return;
  }
  try { sessionStorage.setItem('ss-intro', '1'); } catch (e) { /* 무시 */ }

  document.body.classList.add('is-loading');
  const num = document.getElementById('loaderNum');
  const counter = { v: 0 };
  gsap.timeline()
    .to(counter, {
      v: 100, duration: 1.6, ease: 'power2.inOut',
      onUpdate: () => { num.textContent = Math.round(counter.v); },
    })
    .to('.loader-bar i', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
    .to(loader, {
      yPercent: -100, duration: 0.9, ease: 'expo.inOut',
      onComplete: () => { loader.remove(); document.body.classList.remove('is-loading'); },
    }, '+=0.15')
    .add(heroIn, '-=0.45');
}

/* =========================================================
   3. 스크롤 연출
   ========================================================= */
function initScroll() {
  // 첫 화면: 스크롤 진행률 → 3D 분해 + 문구 사라짐
  ScrollTrigger.create({
    trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: true,
    onUpdate: (self) => {
      hero.p = self.progress;
      if (reduceMotion) return;
      const fade = 1 - smooth(0.04, 0.3, self.progress);
      gsap.set('.hero-copy', { opacity: fade, y: (1 - fade) * -60 });
      gsap.set('.hud, .scroll-cue', { opacity: fade });
    },
  });

  // 상단 메뉴: 아래로 스크롤하면 숨고, 위로 올리면 나타남
  const nav = document.querySelector('.nav');
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle('is-solid', y > 40);
      nav.classList.toggle('is-hidden', self.direction === 1 && y > 300);
    },
  });

  // 한 문장 소개: 단어가 하나씩 켜짐
  const m = document.getElementById('manifesto');
  m.innerHTML = m.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
  if (!reduceMotion) {
    gsap.to('#manifesto .w', {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: m, start: 'top 80%', end: 'bottom 40%', scrub: true },
    });
  }

  // 제품: 데스크톱에서는 화면을 고정하고 가로로 넘김
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    const track = document.querySelector('.products-track');
    const dist = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '.products', start: 'top top', end: () => `+=${dist()}`,
        pin: true, scrub: 0.8, invalidateOnRefresh: true,
      },
    });
  });

  // 숫자 카운트
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    if (reduceMotion) { el.textContent = target.toFixed(dec); return; }
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(o, {
        v: target, duration: 1.6, ease: 'expo.out',
        onUpdate: () => { el.textContent = o.v.toFixed(dec); },
      }),
    });
  });

  // 공정: 세로 선이 스크롤을 따라 차오름
  const steps = document.querySelector('.steps');
  ScrollTrigger.create({
    trigger: steps, start: 'top 70%', end: 'bottom 70%', scrub: true,
    onUpdate: (self) => steps.style.setProperty('--progress', self.progress),
  });
  if (reduceMotion) steps.style.setProperty('--progress', 1);

  // 나머지 요소: 화면에 들어오면 아래에서 올라옴 (차례로)
  if (!reduceMotion) {
    const targets = document.querySelectorAll('.products-head > *, .num, .steps li, .process-head > *, .cta > *, .manifesto .eyebrow, .numbers .eyebrow');
    targets.forEach((el) => el.classList.add('reveal'));
    ScrollTrigger.batch(targets, {
      start: 'top 88%', once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.07 }),
    });
  }
}

scene3d = initScene();
initScroll();
playIntro();
window.addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
});
window.addEventListener('load', () => ScrollTrigger.refresh());
