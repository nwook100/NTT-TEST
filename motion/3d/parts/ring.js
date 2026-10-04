/* 웨이퍼 링 (Wafer Ring, SUS 420J2 / 2"·3" 플라스틱)
   window.PARTS.ring(THREE, MAT, opts)
   opts.size   : 2 | 3 | 6 | 8 | 12  (기본 8)   — inch
   opts.plastic: true 이면 플라스틱 링(2"/3" 기본값 true, 그 외 false)
   opts.engrave: 레이저 각인 문구 흉내 (기본 true, 플라스틱은 false)
   opts.fillet : 플랫↔원호 필렛 반지름 비율(R 기준, 기본 0 = 사진처럼 직접 교차)
   바닥(y=0)에 평평하게 눕힌 상태. 1 단위 = 1 mm. 메시 1개.

   SUS 링 실루엣(사진): 원 R 에 상하좌우(0/90/180/270°) 네 개의 현(플랫, 중심거리 ≈ 0.875R)을 잘라낸 형태.
   플랫↔원호는 필렛 없이 직접 교차(교차각 ≈28.9°, 코너 원호 ≈29°~61°, 직선부 ≈ 0.48·OD).
   0° 플랫을 포함한 ±40° 구간이 약 0.025R 바깥으로 돌출(탭)되고 ±40° 에서 안쪽으로 떨어지는 계단,
   +40° 쪽 계단 옆에 가는 슬릿 노치 1개. 안쪽 둘레에 작은 직사각 노치 4개(≈41°, 181°, 266°, 309°).
   플랫 중앙 밴드폭 ≈ 0.095R, 코너 밴드폭 ≈ 0.22R (Ri/R ≈ 0.78). */
window.PARTS = window.PARTS || {};
window.PARTS.ring = function (THREE, MAT, opts) {
  opts = Object.assign({ size: 8, plastic: undefined, engrave: undefined, fillet: 0 }, opts || {});
  const size = +opts.size || 8;
  const plastic = opts.plastic === undefined ? size <= 3 : !!opts.plastic;
  const engrave = opts.engrave === undefined ? !plastic : !!opts.engrave;

  // 치수표(mm): 외경(코너 원 기준) / 내경 / 두께.  SUS 는 Ri/R ≈ 0.78, 플랫 간 거리 ≈ 0.875 × od
  const DIM = {
    2:  { od: 76,  id: 56,  t: 3.5 },
    3:  { od: 101, id: 75,  t: 4.0 },
    6:  { od: 212, id: 165, t: 1.2 },
    8:  { od: 266, id: 207, t: 1.2 },
    12: { od: 380, id: 296, t: 1.2 },
  };
  const D = DIM[size] || DIM[8];
  const R = D.od / 2, Ri = D.id / 2, T = D.t;
  const DEG = Math.PI / 180;

  /* ---------- 윤곽 생성기 ----------
     feats: { flats:[{a,d,fillet}], rects:[{a0,a1,dr}] }  (각도는 deg)
     flats : 각도 a 방향의 직선 플랫(현), 중심에서 거리 d. fillet = 플랫↔원호 사이 필렛 반지름(0 이면 직접 교차)
     rects : 각도 a0~a1 구간을 반지름 dr 만큼 계단식으로 오프셋(돌출 탭 / 직사각 노치) — 플랫 적용 후 처리 */
  function wrap(d) { return ((d + 180) % 360 + 360) % 360 - 180; }
  function radiusAt(base, th, feats) {
    let r = base;
    for (const f of feats.flats || []) {
      const u = Math.abs(wrap(th - f.a));                 // 플랫 중심으로부터의 각도(0~180)
      if (u >= 89) continue;
      const d = f.d, fr = Math.min(f.fillet || 0, base * 0.9);
      // 플랫(직선 x=d)과 원(R) 사이의 필렛 원: 중심 (d-fr, yc), 반지름 fr, 원 R 에 내접. fr=0 이면 직접 교차점
      const cxF = d - fr, yc = Math.sqrt(Math.max(0, (base - fr) * (base - fr) - cxF * cxF));
      const t1 = Math.atan2(yc, d) / DEG, t2 = Math.atan2(yc, cxF) / DEG;
      let rf;
      if (u <= t1) rf = d / Math.cos(u * DEG);                     // 직선 구간
      else if (u <= t2 && fr > 0) {                                // 필렛 구간: 광선-원 교점(먼 쪽)
        const dx = Math.cos(u * DEG), dy = Math.sin(u * DEG);
        const dc = dx * cxF + dy * yc, cc = cxF * cxF + yc * yc - fr * fr;
        rf = dc + Math.sqrt(Math.max(0, dc * dc - cc));
      } else rf = base;                                           // 코너 원호
      if (rf < r) r = rf;
    }
    for (const q of feats.rects || []) {
      if (wrap(th - q.a0) >= 0 && wrap(th - q.a1) <= 0) r += q.dr;
    }
    return r;
  }
  function contour(base, feats, inner) {
    const path = inner ? new THREE.Path() : new THREE.Shape();
    const step = 0.5, eps = 1e-3;
    // 샘플 각도 목록: 균일 샘플 + 계단 경계(양쪽 eps) + 플랫↔원호 교차점(각진 코너를 정확히)
    const angles = [];
    for (let th = 0; th < 360; th += step) angles.push(th);
    for (const q of feats.rects || []) {
      for (const b of [q.a0, q.a1]) {
        const bb = ((b % 360) + 360) % 360;
        angles.push(bb - eps, bb + eps);
      }
    }
    for (const f of feats.flats || []) {
      const fr = Math.min(f.fillet || 0, base * 0.9), cxF = f.d - fr;
      const yc = Math.sqrt(Math.max(0, (base - fr) * (base - fr) - cxF * cxF));
      const t1 = Math.atan2(yc, f.d) / DEG, t2 = Math.atan2(yc, cxF) / DEG;
      for (const b of [f.a - t2, f.a - t1, f.a + t1, f.a + t2]) angles.push(((b % 360) + 360) % 360);
    }
    angles.sort((a, b) => a - b);
    let first = true, last = -1;
    for (const th of angles) {
      if (th - last < 1e-6) continue; last = th;
      const r = radiusAt(base, th, feats);
      const x = r * Math.cos(th * DEG), y = r * Math.sin(th * DEG);
      if (first) { path.moveTo(x, y); first = false; } else path.lineTo(x, y);
    }
    path.closePath();
    return path;
  }
  function annulus(ro, ri) {
    const s = new THREE.Shape(); s.absarc(0, 0, ro, 0, Math.PI * 2, false);
    const h = new THREE.Path(); h.absarc(0, 0, ri, 0, Math.PI * 2, true);
    s.holes.push(h); return s;
  }
  // 두 BufferGeometry(비인덱스, position/normal/uv)를 하나로 합친다(메시 1개 유지)
  function mergeGeos(list) {
    const names = ['position', 'normal', 'uv'];
    const out = new THREE.BufferGeometry();
    for (const n of names) {
      const parts = list.map(g => g.getAttribute(n)).filter(Boolean);
      if (parts.length !== list.length) continue;
      const item = parts[0].itemSize, total = parts.reduce((s, a) => s + a.count, 0);
      const arr = new Float32Array(total * item); let off = 0;
      for (const a of parts) { arr.set(a.array.subarray(0, a.count * item), off); off += a.count * item; }
      out.setAttribute(n, new THREE.BufferAttribute(arr, item));
    }
    return out;
  }

  let geo, mat;
  if (plastic) {
    /* 2"/3" 플라스틱 링: 노치 없는 단순 원형. 사진에서 바깥 밴드는 어둡고 안쪽 ≈1/3 폭이 밝은 두 톤
       → 안쪽 Ri~Rl 구간을 두께 60% 로 낮춘 턱(ledge) + 바깥 몸체 상·하 모서리 0.8 mm 베벨 */
    const Rl = Ri + 0.3 * (R - Ri);
    const bv = Math.min(0.8, T * 0.2);
    const body = new THREE.ExtrudeGeometry(annulus(R - bv, Rl + bv), {
      depth: T - 2 * bv, bevelEnabled: true, bevelSize: bv, bevelThickness: bv, bevelSegments: 2, curveSegments: 96,
    });
    body.translate(0, 0, bv);                                   // 베벨 포함 z: 0 ~ T
    const Tl = T * 0.6;
    const ledge = new THREE.ExtrudeGeometry(annulus(Rl + bv + 0.05, Ri), { depth: Tl, bevelEnabled: false, curveSegments: 96 });
    const ch = Math.min(0.6, T * 0.15);                           // 턱 안쪽 모서리 작은 챔퍼(두께에 비례)
    const ledgeTop = new THREE.ExtrudeGeometry(annulus(Rl + bv + 0.05, Ri + ch), {
      depth: 0.01, bevelEnabled: true, bevelSize: ch, bevelThickness: ch, bevelSegments: 2, curveSegments: 96,
    });
    ledgeTop.translate(0, 0, Tl - ch);                            // z: Tl-2ch ~ Tl (바닥 아래로 내려가지 않음)
    geo = mergeGeos([body, ledge, ledgeTop]);
    mat = MAT.plasticWhite();
    mat.color.setHex(0x26282c); mat.roughness = 0.8; mat.metalness = 0;   // 하네스 조명에서 사진의 중간 회색
  } else {
    /* SUS 링: 원 R + 상하좌우 플랫(0.875R, 필렛 없음) + 0° 플랫 ±40° 돌출 탭(계단) + 슬릿 노치 + 안쪽 직사각 노치 4개 */
    const fd = 0.875, fil = R * Math.max(0, +opts.fillet || 0);
    const outerF = {
      flats: [ { a: 0, d: R * fd, fillet: fil }, { a: 90, d: R * fd, fillet: fil }, { a: 180, d: R * fd, fillet: fil }, { a: 270, d: R * fd, fillet: fil } ],
      rects: [
        { a0: -40, a1: 40, dr: R * 0.025 },     // 0° 플랫 포함 ±40° 구간 돌출(탭) → ±40° 에 한쪽 벽 계단
        { a0: 40.5, a1: 43, dr: -R * 0.03 },    // 1시 자리 계단 옆 가는 슬릿 노치(사진)
      ],
    };
    const innerF = {
      rects: [
        { a0: 38,  a1: 44,  dr: Ri * 0.03 },
        { a0: 178, a1: 184, dr: Ri * 0.03 },
        { a0: 263, a1: 269, dr: Ri * 0.03 },
        { a0: 306, a1: 312, dr: Ri * 0.03 },
      ],
    };
    const shape = contour(R, outerF, false);
    shape.holes.push(contour(Ri, innerF, true));
    geo = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false, curveSegments: 4 });
    mat = MAT.sus();
    // 사진의 SUS 링은 약간 어두운 무광 헤어라인(환경맵 없는 하네스에서 metalness 0.95 는 검게 보이므로 완화)
    mat.color.setHex(0x3a3e42); mat.metalness = 0.45; mat.roughness = 0.65;
  }
  geo.computeVertexNormals();

  // 레이저 각인(아주 가는 선 문구) + 옅은 방사형 헤어라인 — 윗면 전체를 덮는 CanvasTexture.
  // Extrude 의 UV 는 shape 좌표(x,y) 그대로이므로 repeat/offset 으로 [-R,R] 범위를 캔버스 [0,1] 에 맞춘다.
  // 문구는 밴드가 넓은 코너 원호 구간(45° 부근 등)에 둔다.
  if (engrave && typeof document !== 'undefined') {
    const S = 2048, c = document.createElement('canvas'); c.width = c.height = S;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, S, S);
    const k = S / (2 * R);                              // px / mm
    // 헤어라인: 중심에서 뻗는 가는 방사선(알파 0.04), 간격 불규칙
    ctx.save(); ctx.translate(S / 2, S / 2); ctx.lineWidth = 1;
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = 0; i < 1400; i++) {
      const a = (i / 1400) * Math.PI * 2 + rnd() * 0.004;
      const a0 = (Ri * 0.98) * k, a1 = R * 1.02 * k, al = 0.025 + rnd() * 0.03;
      ctx.strokeStyle = `rgba(${rnd() < 0.5 ? '0,0,0' : '255,255,255'},${al.toFixed(3)})`;
      ctx.beginPath(); ctx.moveTo(a0 * Math.cos(a), a0 * Math.sin(a)); ctx.lineTo(a1 * Math.cos(a), a1 * Math.sin(a)); ctx.stroke();
    }
    ctx.restore();
    const band = (R + Ri) / 2;
    const fontPx = Math.max(6, Math.round(k * (R - Ri) * 0.22));
    const lw = Math.max(1, k * 0.12);
    const txt = (deg, str, flip) => {
      ctx.save();
      ctx.translate(S / 2 + band * k * Math.cos(deg * DEG), S / 2 - band * k * Math.sin(deg * DEG));
      ctx.rotate(-(deg - 90) * DEG + (flip ? Math.PI : 0));
      ctx.font = `${fontPx}px Arial`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = lw; ctx.strokeStyle = '#6e7174';
      ctx.strokeText(str, 0, 0);
      ctx.restore();
    };
    const logo = (deg) => {
      ctx.save(); ctx.translate(S / 2 + band * k * Math.cos(deg * DEG), S / 2 - band * k * Math.sin(deg * DEG));
      ctx.rotate(-(deg - 90) * DEG); ctx.lineWidth = lw; ctx.strokeStyle = '#6e7174';
      const bw = k * (R - Ri) * 0.45, bh = k * (R - Ri) * 0.22; ctx.strokeRect(-bw / 2, -bh / 2, bw, bh); ctx.restore();
    };
    const label = `SUS 420J2 ${size}" WAFER RING`;
    txt(135, label, false); txt(52, `${size}" RING`, false); txt(225, label, true); txt(300, 'SHINSUNG', true); txt(160, 'LOT', false);
    logo(120); logo(240); logo(60);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1 / (2 * R), 1 / (2 * R)); tex.offset.set(0.5, 0.5);
    tex.anisotropy = 4;
    mat = mat.clone(); mat.map = tex; mat.needsUpdate = true;
  }

  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;      // 압출 방향(+z) → +y, 바닥 y=0
  const g = new THREE.Group();
  g.add(mesh);
  g.userData = { size, plastic, od: D.od, id: D.id, thickness: T };
  return g;
};
