/* 엔드 커버 매거진 (End Cover Magazine, 알루미늄 아노다이징)
   window.PARTS.magazine(THREE, MAT, opts)
   opts.finish    : 'silver' | 'red'  (기본 silver)
   opts.endCover  : true/false  — 앞(+z) 흰색 타공판 캡, 뒤(-z) 창이 뚫린 엔드 커버 캡 (silver 기본 false, red 기본 true)
   opts.strips    : 끼워진 리드프레임 수 (기본 0). 일부는 앞으로 조금 빠져나온 모습.
   opts.stripMat  : 'copper' (기본, MAT.copper()) | 'glass' (stopper 사진의 청록 반투명 기판)
   opts.slots     : 측판 루버 슬롯 줄 수 (silver 기본 28, red 기본 0 = 막힌 측판)
   opts.segments  : 슬롯 한 줄을 세로 바로 나누는 구간 수 (silver 기본 2 = 중앙 세로 바로 2단 분할)
   opts.longSlots : 상판 긴 장공 2줄 (stopper 사진 특징, 기본 false; strips>0 이면 자동 true)
   opts.preset    : 'locker' → 세로로 긴 비율 {width:90, length:230}
   opts.width / height / length : mm 치수 덮어쓰기
   좌표: 바닥 y=0, x·z 중심 0, 열린 정면 +z. 1 단위 = 1 mm. */
window.PARTS = window.PARTS || {};
window.PARTS.magazine = function (THREE, MAT, opts) {
  opts = opts || {};
  const finish = opts.finish === 'red' ? 'red' : 'silver';
  const def = finish === 'red'
    ? { width: 80,  height: 150, length: 250, slots: 0,  endCover: true,  strips: 0, segments: 1, stripMat: 'copper', longSlots: false }
    : { width: 100, height: 150, length: 240, slots: 28, endCover: false, strips: 0, segments: 2, stripMat: 'copper', longSlots: false };
  if (opts.preset === 'locker') Object.assign(def, { width: 90, length: 230 });
  opts = Object.assign(def, opts);

  const W = +opts.width, H = +opts.height, L = +opts.length;
  const nSlots = Math.max(0, Math.round(+opts.slots || 0));
  const nPitch = nSlots > 0 ? nSlots : 28;          // 레일 피치 계산용
  const segs = Math.max(1, Math.round(+opts.segments || 1));
  const nStrips = Math.max(0, Math.round(+opts.strips || 0));
  const longSlots = !!opts.longSlots || nStrips > 0;
  const ts = 4;      // 측판 두께
  const tp = 3;      // 상·하판 두께
  const eb = 9;      // 측판 앞뒤 세로 테두리 폭
  const tb = 7;      // 측판 위·아래 테두리 폭
  const railD = 5, railH = 1.6;     // 안쪽 레일(리드프레임 받침) 돌출·두께
  const bv = 0.5;    // 모서리 챔퍼

  const g = new THREE.Group();
  /* 재질: MAT 팩토리 결과를 사진 톤에 맞춰 미세 조정.
     silver = 중간 톤 아노다이즈 회색.
     red    = 광택 캔디 레드 — 디퓨즈 붉은기를 살리기 위해 metalness 를 낮추고 clearcoat(Physical) 로 하이라이트 층을 얹음. */
  let matBody;
  if (finish === 'red') {
    const base = MAT.aluRed();                       // Standard → Physical (r128 의 copy() 는 Physical 전용 필드를 요구하므로 수동 이전)
    matBody = new THREE.MeshPhysicalMaterial({ color: base.color, metalness: base.metalness, roughness: base.roughness });
    matBody.color.set(0xcc1a20); matBody.roughness = 0.15; matBody.metalness = 0.45;
    matBody.clearcoat = 1.0; matBody.clearcoatRoughness = 0.08;
    if ('envMapIntensity' in matBody) matBody.envMapIntensity = 1.5;
  } else {
    matBody = MAT.alu().clone();
    matBody.color.set(0x9a9ea3); matBody.roughness = 0.45; matBody.metalness = 0.65;
  }
  const matPost = finish === 'red' ? matBody : MAT.aluBright();
  const matRail = matBody.clone(); matRail.color.multiplyScalar(0.35); matRail.roughness = 0.6;   // 슬롯 사이 짙은 그림자 톤
  const matBlade = matBody.clone(); matBlade.color.multiplyScalar(0.42); matBlade.roughness = 0.75; matBlade.metalness = 0.5; // 루버 날(그림자 속 아노다이즈 면)
  const matLiner = MAT.aluDark().clone(); matLiner.color.set(0x2e3134); matLiner.roughness = 0.9; matLiner.metalness = 0.2; // 측판 안쪽 어두운 라이너
  const matCapW = MAT.plasticWhite();
  const matCapB = matBody;

  /* ---------- 2D 도형 헬퍼 ---------- */
  function rrect(path, x, y, w, h, r) {           // 좌하단(x,y) 기준 둥근 사각형
    r = Math.min(r, w / 2, h / 2);
    path.moveTo(x + r, y);
    path.lineTo(x + w - r, y);
    path.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
    path.lineTo(x + w, y + h - r);
    path.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
    path.lineTo(x + r, y + h);
    path.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
    path.lineTo(x, y + r);
    path.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
    path.closePath();
    return path;
  }
  function hole(shape, x, y, w, h, r) { shape.holes.push(rrect(new THREE.Path(), x, y, w, h, r)); }
  function circ(shape, cx, cy, r) { const p = new THREE.Path(); p.absarc(cx, cy, r, 0, Math.PI * 2, false); shape.holes.push(p); }
  function extrude(shape, depth, bevel) {
    const geo = new THREE.ExtrudeGeometry(shape, bevel
      ? { depth: depth - 2 * bevel, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1, curveSegments: 6 }
      : { depth: depth, bevelEnabled: false, curveSegments: 6 });
    if (bevel) geo.translate(0, 0, bevel);          // z: 0 .. depth
    return geo;
  }

  /* ---------- 측판 (yz 평면, 로컬 X=z, Y=y) ---------- */
  const y0 = tb, y1 = H - tb, pitch = (y1 - y0) / nPitch;
  const ribT = pitch * 0.42, slotH = pitch - ribT;
  const inner = L - 2 * eb, bar = 6;
  const segL = (inner - bar * (segs - 1)) / segs;
  (function sidePlates() {
    const s = rrect(new THREE.Shape(), -L / 2, 0, L, H, 1.5);
    if (nSlots > 0) {
      for (let i = 0; i < nSlots; i++) {
        const y = y0 + i * pitch + ribT / 2;
        for (let k = 0; k < segs; k++) {
          const z = -inner / 2 + k * (segL + bar);
          hole(s, z, y, segL, slotH, 0.6);
        }
      }
    }
    const geo = extrude(s, ts, bv);
    const right = new THREE.Mesh(geo, matBody);
    right.rotation.y = Math.PI / 2; right.position.x = W / 2 - ts;
    const left = new THREE.Mesh(geo, matBody);
    left.rotation.y = -Math.PI / 2; left.position.x = -(W / 2 - ts);
    g.add(right, left);
  })();

  /* ---------- 루버 날 (InstancedMesh): 슬롯마다 상단이 바깥, 하단이 안쪽으로 기울어진 블라인드 날 ----------
     바깥에서 보이는 면의 법선이 아래쪽을 향해 어두운 띠로 읽힌다(사진의 짙은 슬롯 인상). */
  if (nSlots > 0) (function louvers() {
    const bladeH = slotH * 1.25, tilt = THREE.MathUtils.degToRad(35);
    const geo = new THREE.BoxGeometry(1.0, bladeH, segL - 0.6);
    const im = new THREE.InstancedMesh(geo, matBlade, nSlots * segs * 2);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), sc = new THREE.Vector3(1, 1, 1);
    const zAxis = new THREE.Vector3(0, 0, 1);
    let k = 0;
    for (let i = 0; i < nSlots; i++) {
      const y = y0 + i * pitch + pitch / 2;
      for (let s = 0; s < segs; s++) {
        const zc = -inner / 2 + s * (segL + bar) + segL / 2;
        for (const sx of [1, -1]) {
          q.setFromAxisAngle(zAxis, -sx * tilt);            // +x 쪽: 상단이 +x(바깥)로 기울어짐
          p.set(sx * (W / 2 - ts / 2), y, zc);
          m.compose(p, q, sc); im.setMatrixAt(k++, m);
        }
      }
    }
    im.instanceMatrix.needsUpdate = true;
    g.add(im);
  })();

  /* ---------- 측판 안쪽 어두운 라이너판 (슬롯 너머가 어둡게 보이도록) ---------- */
  (function liners() {
    const geo = new THREE.BoxGeometry(0.5, H - 2 * tb, L - 2 * eb);
    for (const sx of [1, -1]) {
      const m = new THREE.Mesh(geo, matLiner);
      m.position.set(sx * (W / 2 - ts - 0.3), H / 2, 0);
      g.add(m);
    }
  })();

  /* ---------- 안쪽 레일 (InstancedMesh) ---------- */
  const nRails = nPitch + 1;
  const railY = i => y0 + i * pitch;
  (function rails() {
    const geo = new THREE.BoxGeometry(railD, railH, L - 2);
    const im = new THREE.InstancedMesh(geo, matRail, nRails * 2);
    const m = new THREE.Matrix4();
    let k = 0;
    for (let i = 0; i < nRails; i++) {
      const y = railY(i);
      m.makeTranslation(W / 2 - ts - railD / 2, y, 0); im.setMatrixAt(k++, m);
      m.makeTranslation(-(W / 2 - ts - railD / 2), y, 0); im.setMatrixAt(k++, m);
    }
    im.instanceMatrix.needsUpdate = true;
    g.add(im);
  })();

  /* ---------- 상판 · 하판 (xz 평면, 로컬 X=x, Y=z) ---------- */
  const pw = W - 2 * ts, plBot = L - 6, plTop = L + 8;      // 상판은 측판 앞뒤로 ~4mm 씩 돌출(챙)
  (function topPlate() {
    const pl = plTop;
    const s = rrect(new THREE.Shape(), -pw / 2, -pl / 2, pw, pl, 1);
    // 둥근 구멍: 앞뒤 모서리 양쪽(기둥 위) — locker 사진
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) circ(s, sx * (pw / 2 - 7), sz * (pl / 2 - 7), 3.2);
    if (nSlots > 0) {                                   // 루버형(은색)만 환기 절개; 막힌 red 는 각인만 있는 민판
      if (longSlots) {                                  // 긴 장공 2줄 (stopper 사진)
        const sw = Math.min(10, pw * 0.08), sl = pl * 0.55;
        hole(s, -pw * 0.28 - sw / 2, -sl / 2, sw, sl, sw / 2);
        hole(s,  pw * 0.28 - sw / 2, -sl / 2, sw, sl, sw / 2);
      }
      // 중앙 리브 양옆 짧은 오블롱 2열 x 3개 (locker/ECM 사진: 앞쪽에 몰려 있음)
      const ox = Math.max(5, Math.min(8, pw * 0.07)), ol2 = 30;
      const kzs = longSlots ? [-0.25, 0, 0.25] : [0.31, 0.12, -0.07];
      for (const sx of [-1, 1]) for (const kz of kzs) {
        hole(s, sx * pw * 0.12 - ox / 2, kz * pl - ol2 / 2, ox, ol2, ox / 2);
      }
    }
    const mesh = new THREE.Mesh(extrude(s, tp, 0.4), matBody);
    mesh.rotation.x = -Math.PI / 2; mesh.position.y = H - tp;
    g.add(mesh);
  })();
  (function bottomPlate() {
    const pl = plBot;
    const s = rrect(new THREE.Shape(), -pw / 2, -pl / 2, pw, pl, 1);
    const ow = Math.max(6, Math.min(8.5, pw * 0.08)), ol = 44;
    const xs = [-pw * 0.3, 0, pw * 0.3];                 // 사진: 바닥 앞뒤 오블롱 3개씩
    for (const x of xs) {
      hole(s, x - ow / 2,  pl / 2 - 18 - ol, ow, ol, ow / 2);
      hole(s, x - ow / 2, -pl / 2 + 18,      ow, ol, ow / 2);
    }
    const mesh = new THREE.Mesh(extrude(s, tp, 0.4), matBody);
    mesh.rotation.x = -Math.PI / 2; mesh.position.y = 0;
    g.add(mesh);
  })();

  /* ---------- 모서리 기둥 ---------- */
  (function posts() {
    const pd = 8;
    const geo = new THREE.BoxGeometry(pd, H - 2 * tp, pd);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const m = new THREE.Mesh(geo, matPost);
      m.position.set(sx * (W / 2 - ts - pd / 2), H / 2, sz * (L / 2 - pd / 2));
      g.add(m);
    }
  })();

  /* ---------- 레이저 각인 (CanvasTexture) ---------- */
  function label(w, h, color) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 128;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 512, 128);
    ctx.fillStyle = color;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 54px Arial, sans-serif'; ctx.fillText('SHINSUNG', 256, 44);
    ctx.font = '26px Arial, sans-serif'; ctx.fillText('END COVER MAGAZINE  ECM-' + Math.round(W) + '-' + Math.round(L), 256, 96);
    const tex = new THREE.CanvasTexture(c); tex.anisotropy = 4;
    const mat = (finish === 'red' ? MAT.aluRed() : MAT.alu());
    mat.map = tex; mat.transparent = true; mat.depthWrite = false; mat.polygonOffset = true; mat.polygonOffsetFactor = -2;
    return new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  }
  (function engrave() {
    const t = label(Math.min(64, pw * 0.5), Math.min(16, pw * 0.125), finish === 'red' ? 'rgba(235,235,235,0.9)' : 'rgba(40,44,48,0.85)');
    t.rotation.x = -Math.PI / 2; t.position.set(0, H + 0.06, L * 0.37);   // 앞쪽 오블롱과 앞 테두리 사이
    g.add(t);
    if (finish === 'red') {
      const sLab = label(70, 17.5, 'rgba(235,235,235,0.9)');
      sLab.rotation.y = Math.PI / 2; sLab.position.set(W / 2 + 0.06, H - 24, -L * 0.25);
      g.add(sLab);
    } else {                                              // row1 은색 사진: 측판 위쪽 앞부분 빨간 각인
      const sLab = label(50, 12.5, 'rgba(190,30,40,0.9)');
      sLab.rotation.y = Math.PI / 2; sLab.position.set(W / 2 + 0.06, H - tb - 6, L * 0.3);
      g.add(sLab);
    }
  })();

  /* ---------- 엔드 커버 캡 ('모자'처럼 본체보다 큰 테두리 + 깊은 스커트) ---------- */
  if (opts.endCover) {
    const cl = 6, skirtD = 14, capT = 4, over = 1;    // 위·옆으로 cl 돌출, 몸체 끝을 skirtD 감쌈 (바닥은 y=0 에 맞춤)
    function cap(front, matCap, perforated) {
      const grp = new THREE.Group();
      // 둘레 스커트
      const sk = rrect(new THREE.Shape(), -W / 2 - cl, 0, W + 2 * cl, H + cl, 4);
      hole(sk, -W / 2 - 0.3, 1.5, W + 0.6, H - 1.2, 1);
      const skirt = new THREE.Mesh(extrude(sk, skirtD, 0), matCap);
      skirt.position.z = L / 2 + over - skirtD;
      // 앞판
      const pf = rrect(new THREE.Shape(), -W / 2 - cl, 0, W + 2 * cl, H + cl, 4);
      if (perforated) {
        hole(pf, -W / 2 + 10, 5, W - 20, 13, 2);                   // 바닥 쪽 슬라이드 개구
        // 5열 x 9행 엇갈림, 구멍 지름 ≈ 피치의 절반 (사진: 뚜렷한 큰 구멍)
        const cols = 5, mx = 9, my = 12;
        const px = (W + 2 * cl - 2 * mx) / cols, py = (H - 2 * my) / 9, d = px * 0.48;
        const yStart = 29, yEnd = H + cl - 8;
        const xOff = -(cols - 1) * px / 2;
        let row = 0;
        for (let y = yStart; y <= yEnd; y += py, row++) {
          const stag = (row % 2) * px / 2;
          for (let c = 0; c < cols; c++) {
            const x = xOff + c * px + stag;
            if (x + d / 2 > W / 2 + cl - mx + 2) continue;
            circ(pf, x, y, d / 2);
          }
        }
      } else {
        hole(pf, -W / 2 + 11, 20, W - 22, H - 32, 6);                // 큰 창
        hole(pf, -W / 2 + 14, 6, W - 28, 8, 2);                      // 아래 가는 슬롯
      }
      const plate = new THREE.Mesh(extrude(pf, capT, 0.4), matCap);
      plate.position.z = L / 2 + over;
      grp.add(skirt, plate);
      if (!perforated) {                                            // 창문형 캡 상단 가로 리브 2줄
        const rib = new THREE.BoxGeometry(W + 2 * cl - 8, 1.2, 1.2);
        for (const y of [H + cl - 4, H + cl - 8]) {
          const r = new THREE.Mesh(rib, matCap);
          r.position.set(0, y, L / 2 + over + capT);
          grp.add(r);
        }
      }
      if (!front) grp.rotation.y = Math.PI;
      return grp;
    }
    g.add(cap(true, matCapW, true));
    g.add(cap(false, matCapB, false));
  }

  /* ---------- 끼워진 리드프레임 (구리 박판 또는 청록 반투명 기판) ---------- */
  if (nStrips > 0) {
    const ws = W - 2 * ts - 2 * railD + 2.5, Ls = L - 40;
    const glass = opts.stripMat === 'glass';
    const tt = glass ? 0.7 : 0.25;
    const geo = new THREE.BoxGeometry(ws, tt, Ls);
    let mat;
    if (glass) {
      const base = MAT.pcbGreen();
      mat = new THREE.MeshPhysicalMaterial({ color: base.color, metalness: 0.0, roughness: 0.15 });
      mat.color.set(0x7fb8a8);
      mat.transmission = 0.6; mat.thickness = 0.5; mat.transparent = true; mat.opacity = 0.85;
    } else {
      mat = MAT.copper();
    }
    const lo = 2, hi = nRails - 3;
    for (let k = 0; k < nStrips; k++) {
      const idx = Math.round(lo + (hi - lo) * (k + 0.5) / nStrips);
      const proto = [28, 0, 12, 36, 6][k % 5];
      const m = new THREE.Mesh(geo, mat);
      m.position.set(0, railY(idx) + railH / 2 + tt / 2 + 0.05, -L / 2 + 20 + Ls / 2 + proto);
      g.add(m);
    }
  }

  return g;
};
