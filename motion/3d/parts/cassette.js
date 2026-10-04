/* 8" 웨이퍼 카세트 & 링 (Wafer Cassette, 알루미늄 A Type / 플라스틱 12")
   window.PARTS.cassette(THREE, MAT, opts)
   opts.rings  : 링 수 (기본 13)
   opts.wafer  : 맨 위 링에 테이프 위 웨이퍼(주황, 칩 격자) 올림 (기본 true)
   opts.finish : 'alu' | 'plastic' (기본 alu). plastic 은 검정 플라스틱 측판 + 12" 링
   opts.ringSize: 링 크기 inch (기본 alu=8, plastic=12)

   구조(사진 cassette_alu_atype.png 기준):
   - 좌우 알루미늄 측판(두께 9 mm). 안쪽 면에 링 수만큼 홈(피치 11 mm, 홈폭 2.6 mm, 깊이 4 mm)이
     앞뒤로 관통 → 측판 앞면 가장자리에 홈의 톱니(이빨)가 보임. 앞면 홈마다 작은 빨간 점 표시.
   - 바닥판, 측판 위를 가로지르는 앞·뒤 상부 바(앞면 나사 머리), 그 사이 상판(가운데 창 + 뒤쪽 D형 절개로
     맨 위 링이 보임, 앞쪽 좌우 직사각 포켓).
   - 링은 window.PARTS.ring(THREE,MAT,{size}) 1개를 만들어 메시를 clone 하여 적층(지오메트리/재질 공유).
     탭이 있는 플랫이 정면(+z)을 향하고, 링 앞쪽이 측판 앞면보다 약 30 mm 튀어나온다.
   - 정면(+z) 열림. 바닥 y=0, x·z 중심 0. 1 단위 = 1 mm. */
window.PARTS = window.PARTS || {};
window.PARTS.cassette = function (THREE, MAT, opts) {
  opts = Object.assign({ rings: 13, wafer: true, finish: 'alu', ringSize: undefined }, opts || {});
  const plastic = opts.finish === 'plastic';
  const nRings = Math.max(1, Math.round(+opts.rings || 13));
  const ringSize = opts.ringSize !== undefined ? +opts.ringSize : (plastic ? 12 : 8);
  const g = new THREE.Group();

  /* ---------- 링 1개 생성(없으면 간단한 대체 링) ---------- */
  let ringProto = null, ringInfo;
  if (window.PARTS.ring) {
    const rg = window.PARTS.ring(THREE, MAT, { size: ringSize });
    ringInfo = rg.userData || {};
    rg.traverse(o => { if (o.isMesh && !ringProto) ringProto = o; });
  }
  if (!ringProto) {
    const od = ringSize === 12 ? 380 : ringSize === 6 ? 212 : 266, id = od * 0.78, t = 1.2;
    const s = new THREE.Shape(); s.absarc(0, 0, od / 2, 0, Math.PI * 2, false);
    const h = new THREE.Path(); h.absarc(0, 0, id / 2, 0, Math.PI * 2, true); s.holes.push(h);
    const geo = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 64 });
    const m = MAT.sus(); m.color.setHex(0x3a3e42); m.metalness = 0.45; m.roughness = 0.65;
    ringProto = new THREE.Mesh(geo, m); ringProto.rotation.x = -Math.PI / 2;
    ringInfo = { od, id, thickness: t, fallback: true };
  }
  const OD = ringInfo.od || 266, R = OD / 2, RT = ringInfo.thickness || 1.2;
  const flatHalf = R * 0.875;          // 좌우 플랫까지 거리(링 x 범위)
  const frontHalf = R * 0.9;           // 정면 탭 끝까지(링 +z 범위)
  const backHalf = R * 0.875;          // 뒤 플랫까지(링 -z 범위)

  /* ---------- 치수 ---------- */
  const PITCH = 11, GW = 2.6, GD = 4;                 // 링 피치, 홈폭, 홈깊이
  const PT = plastic ? 10 : 9;                        // 측판 두께
  const innerHalf = flatHalf - GD + 0.6;              // 측판 안쪽 면 x
  const outerHalf = innerHalf + PT;                   // 측판 바깥 면 x
  const DEPTH = Math.round(backHalf * 2 + 20);        // 측판 깊이(링이 앞으로 약 30 튀어나오도록)
  const zF = DEPTH / 2, zB = -DEPTH / 2;              // 측판 앞·뒤 z
  const BOTTOM_T = 6;
  const firstRingY = BOTTOM_T + 9;                    // 첫 번째 홈(링 바닥) y
  const ringY = i => firstRingY + i * PITCH;
  const topRingY = ringY(nRings - 1);
  const plateTop = topRingY + RT + 9;                 // 측판 윗면
  const BAR_H = 12, BAR_D = 28;
  const TOTAL_H = plateTop + BAR_H;
  const ringCz = zF + 30 - frontHalf;                 // 링 중심 z (앞 탭이 측판 앞면보다 30 mm 앞)

  const matPlate = plastic ? MAT.plasticBlack() : MAT.alu();
  const matBar = MAT.aluBright();
  const matTop = plastic ? MAT.aluBright() : MAT.alu();

  /* ---------- 측판: 바깥 슬래브 + 안쪽 리브(홈 사이 이빨) ---------- */
  const slabT = PT - GD;
  const slabGeo = new THREE.BoxGeometry(slabT, plateTop, DEPTH);
  for (const sx of [-1, 1]) {
    const slab = new THREE.Mesh(slabGeo, matPlate);
    slab.position.set(sx * (outerHalf - slabT / 2), plateTop / 2, 0);
    g.add(slab);
  }
  // 리브: 홈과 홈 사이(두께 PITCH-GW), 맨 아래/맨 위 리브는 더 두꺼움. InstancedMesh 1개(단위 박스를 스케일)
  const ribUnit = new THREE.BoxGeometry(1, 1, 1);
  const ribs = [];                                    // {y0,y1}
  {
    const g0 = ringY(0) - 0.7, gTop = ringY(nRings - 1) + RT + 0.7;   // 첫 홈 바닥 / 마지막 홈 천장
    ribs.push({ y0: 0, y1: g0 });
    for (let i = 0; i < nRings - 1; i++) ribs.push({ y0: ringY(i) + RT + 0.7, y1: ringY(i + 1) - 0.7 });
    ribs.push({ y0: gTop, y1: plateTop });
  }
  const ribMesh = new THREE.InstancedMesh(ribUnit, matPlate, ribs.length * 2);
  {
    const m = new THREE.Matrix4(); let k = 0;
    for (const sx of [-1, 1]) for (const r of ribs) {
      m.makeScale(GD, r.y1 - r.y0, DEPTH);
      m.setPosition(sx * (innerHalf + GD / 2), (r.y0 + r.y1) / 2, 0);
      ribMesh.setMatrixAt(k++, m);
    }
    ribMesh.instanceMatrix.needsUpdate = true;
  }
  g.add(ribMesh);
  // 앞면 홈 옆 빨간 점 표시(사진: 측판 앞면 가장자리의 작은 빨간 점들)
  if (!plastic) {
    const dotGeo = new THREE.BoxGeometry(1.6, 1.6, 0.6);
    const dots = new THREE.InstancedMesh(dotGeo, MAT.aluRed(), nRings * 2);
    const m = new THREE.Matrix4(); let k = 0;
    for (const sx of [-1, 1]) for (let i = 0; i < nRings; i++) {
      m.makeTranslation(sx * (outerHalf - slabT / 2), ringY(i) + RT / 2 + 3.2, zF + 0.3);
      dots.setMatrixAt(k++, m);
    }
    dots.instanceMatrix.needsUpdate = true;
    g.add(dots);
  }

  /* ---------- 바닥판 ---------- */
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(innerHalf * 2 + 0.2, BOTTOM_T, DEPTH - 10), matPlate);
  bottom.position.set(0, BOTTOM_T / 2, -5);
  g.add(bottom);

  /* ---------- 상부 바(앞·뒤) + 나사 머리 ---------- */
  const barGeo = new THREE.BoxGeometry(outerHalf * 2, BAR_H, BAR_D);
  const screwGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.8, 16);
  const screwMat = MAT.nickel();
  for (const [z, name] of [[zF - BAR_D / 2, 'front'], [zB + BAR_D / 2, 'back']]) {
    const bar = new THREE.Mesh(barGeo, matBar);
    bar.position.set(0, plateTop + BAR_H / 2, z);
    bar.name = 'bar_' + name;
    g.add(bar);
    for (const sx of [-1, 1]) for (const dz of [-8, 8]) {
      const s = new THREE.Mesh(screwGeo, screwMat);
      s.position.set(sx * (outerHalf - PT / 2 - 2), plateTop + BAR_H + 0.4, z + dz);
      g.add(s);
    }
  }

  /* ---------- 상판: 가운데 창 + 뒤쪽 D형 절개 + 앞쪽 좌우 포켓 ---------- */
  {
    const T = 3;
    const w = innerHalf + GD - 0.3;                   // 홈 안쪽까지 들어감
    const s0 = zF - BAR_D, s1 = zB + BAR_D;           // 앞 바 뒤 ~ 뒤 바 앞 (z)
    const shape = new THREE.Shape();                  // shape y = world z
    shape.moveTo(-w, s1); shape.lineTo(w, s1); shape.lineTo(w, s0); shape.lineTo(-w, s0); shape.closePath();
    // 창: 웨이퍼 중심(ringCz) 기준
    const winW = Math.min(0.47 * R, w * 0.55), winD = 0.24 * OD;
    const wz0 = ringCz - winD * 0.5, wz1 = ringCz + winD * 0.5;
    const win = new THREE.Path();
    win.moveTo(-winW, wz0); win.lineTo(-winW, wz1); win.lineTo(winW, wz1); win.lineTo(winW, wz0); win.closePath();
    shape.holes.push(win);
    // 뒤쪽 D형 절개(링 뒤 원호가 보임): 원 중심 (0, ringCz), 반지름 Rc, 현 z = zc
    const Rc = R * 0.74, zc = wz0 - 10;
    const hw = Math.sqrt(Math.max(0, Rc * Rc - (zc - ringCz) * (zc - ringCz)));
    const a0 = Math.atan2(zc - ringCz, hw), a1 = Math.atan2(zc - ringCz, -hw);
    const dcut = new THREE.Path();
    dcut.moveTo(hw, zc);
    dcut.absarc(0, ringCz, Rc, a0, a1, true);          // 시계방향으로 뒤쪽을 돌아 (-hw, zc)
    dcut.lineTo(hw, zc); dcut.closePath();
    if (ringCz - Rc > s1 + 6) shape.holes.push(dcut);
    // 앞쪽 좌우 포켓
    for (const sx of [-1, 1]) {
      const pw = 0.14 * R, pd = 9, px = sx * (winW + 0.5 * (w - winW)), pz = wz1 - pd - 2;
      const p = new THREE.Path();
      p.moveTo(px - pw, pz); p.lineTo(px - pw, pz + 2 * pd); p.lineTo(px + pw, pz + 2 * pd); p.lineTo(px + pw, pz); p.closePath();
      shape.holes.push(p);
    }
    const geo = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false, curveSegments: 48 });
    geo.computeVertexNormals();
    const top = new THREE.Mesh(geo, matTop);
    top.rotation.x = Math.PI / 2;                     // shape y → world z, 압출(+z) → -y
    top.position.y = plateTop + T;                    // 윗면 = 측판 윗면 + T
    top.name = 'topPlate';
    g.add(top);
    // 창 둘레 어두운 테(사진의 검은 창틀) — 얇은 직사각 프레임을 상판 아래쪽에
    const fr = new THREE.Shape();
    const bw = 4;
    fr.moveTo(-winW - bw, wz0 - bw); fr.lineTo(winW + bw, wz0 - bw); fr.lineTo(winW + bw, wz1 + bw); fr.lineTo(-winW - bw, wz1 + bw); fr.closePath();
    const fh = new THREE.Path();
    fh.moveTo(-winW + 1, wz0 + 1); fh.lineTo(-winW + 1, wz1 - 1); fh.lineTo(winW - 1, wz1 - 1); fh.lineTo(winW - 1, wz0 + 1); fh.closePath();
    fr.holes.push(fh);
    const frGeo = new THREE.ExtrudeGeometry(fr, { depth: 2, bevelEnabled: false });
    const frame = new THREE.Mesh(frGeo, MAT.plasticBlack());
    frame.rotation.x = Math.PI / 2; frame.position.y = plateTop;
    g.add(frame);
  }

  /* ---------- 링 적층 ---------- */
  const ringGeo = ringProto.geometry, ringMat = ringProto.material;
  for (let i = 0; i < nRings; i++) {
    const m = new THREE.Mesh(ringGeo, ringMat);
    m.rotation.copy(ringProto.rotation);
    const holder = new THREE.Group();
    holder.add(m);
    holder.rotation.y = -Math.PI / 2;                  // 탭(0° 플랫) +x → +z(정면)
    holder.position.set(0, ringY(i), ringCz);
    holder.name = 'ring_' + i;
    g.add(holder);
  }

  /* ---------- 맨 위 링의 테이프 위 웨이퍼(칩 격자) ---------- */
  if (opts.wafer) {
    const WR = ringSize === 12 ? 150 : ringSize === 6 ? 75 : 100;
    const mat = MAT.waferTape();
    if (typeof document !== 'undefined') {
      const S = 1024, c = document.createElement('canvas'); c.width = c.height = S;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#ffe3b4'; ctx.fillRect(0, 0, S, S);
      const k = S / (2 * WR), chip = 9 * k, gap = 1.1 * k;
      ctx.fillStyle = '#5a3a12';
      ctx.fillRect(0, 0, S, S);
      let seed = 3; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      for (let y = 0; y < S; y += chip) for (let x = 0; x < S; x += chip) {
        const cx = (x + chip / 2 - S / 2) / k, cy = (y + chip / 2 - S / 2) / k;
        if (Math.hypot(cx, cy) > WR - 3) continue;         // 가장자리 부분 칩은 없음
        const l = 0.92 + rnd() * 0.08;
        ctx.fillStyle = `rgb(${Math.round(255 * l)},${Math.round(226 * l)},${Math.round(176 * l)})`;
        ctx.fillRect(x + gap / 2, y + gap / 2, chip - gap, chip - gap);
      }
      // 칩 표면 미세 패턴(가는 선)
      ctx.strokeStyle = 'rgba(90,60,20,0.25)'; ctx.lineWidth = 1;
      for (let y = 0; y < S; y += chip) for (let x = 0; x < S; x += chip) {
        const cx = (x + chip / 2 - S / 2) / k, cy = (y + chip / 2 - S / 2) / k;
        if (Math.hypot(cx, cy) > WR - 3) continue;
        ctx.strokeRect(x + chip * 0.25, y + chip * 0.25, chip * 0.5, chip * 0.5);
      }
      const tex = new THREE.CanvasTexture(c); tex.anisotropy = 4;
      mat.map = tex; mat.color.setHex(0xe0a050); mat.needsUpdate = true;
    }
    const wafer = new THREE.Mesh(new THREE.CylinderGeometry(WR, WR, 0.8, 96), mat);
    wafer.position.set(0, topRingY + RT + 0.5, ringCz);
    wafer.name = 'wafer';
    g.add(wafer);
    // 웨이퍼 아래 테이프(투명 필름 느낌의 얇은 밝은 원판, 링 안쪽을 덮음)
    const tapeMat = MAT.plasticWhite(); tapeMat.transparent = true; tapeMat.opacity = 0.35; tapeMat.roughness = 0.3;
    const tape = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.86, R * 0.86, 0.15, 96), tapeMat);
    tape.position.set(0, topRingY + RT + 0.08, ringCz);
    g.add(tape);
  }

  g.userData = { width: outerHalf * 2, depth: DEPTH, height: TOTAL_H, rings: nRings, ringSize, pitch: PITCH, finish: opts.finish, ringFallback: !!ringInfo.fallback };
  return g;
};
