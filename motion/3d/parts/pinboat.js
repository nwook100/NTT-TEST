/* 핀 보트 (Pin Boat / process carrier, 리드프레임·기판 스트립 이송 보트)
   window.PARTS.pinboat(THREE, MAT, opts)
   참고: ref/pinboat_1.jpg (Auer 광택 SUS 스탬핑 보트: 3열×6창, 창 테두리의 손가락형 받침 돌기와 네 모서리의 세운 L 스토퍼,
         열 사이의 긴 슬릿, 뒷면 장변의 원형 홀열(22개), 정면 장변 안쪽의 사각 관통 구멍열(열당 3개), 장변 양측의 접은 플랜지),
         ref/pinboat_2.jpg (US5278447: 위치결정 핀(214)은 대각/네 모서리에만 있음)
   opts.length    : 보트 길이 mm (기본 305 = 12")
   opts.width     : 보트 폭 mm   (기본 109 = Auer 4.3")
   opts.thickness : 판 두께 mm   (기본 1.0, 스탬핑 SUS 시트)
   opts.cols/rows : 패키지 창 열(길이 방향)/행(폭 방향) 수 (기본 6 × 3)
   opts.pins      : false(기본, 사진과 동일: 핀 없음·피듀셜 홀 4개만) | 'corner'(피듀셜 홀 옆 모서리 4개 Ø2×4, 매거진 결합용) | 'full'(장변 양측 2열, pinPitch 간격)
   opts.pinPitch  : pins='full' 일 때 핀 피치 mm (기본 25.4)
   opts.jChannel  : 플랜지 끝을 안쪽으로 접은 J자 립 (기본 true, J-Boat 매거진 레일용)
   opts.flangeUp  : true 이면 플랜지를 위로 접음(기본 false = 사진처럼 아래로 접어 플랜지로 서는 햇(hat) 단면)
   opts.finish    : 'sus' | 'alu' | 'black' (기본 'sus', 거울면에 가까운 광택 + 환경 반사)
   opts.withStrip : true 이면 구리 리드프레임 스트립을 핀에 끼워 얹음 (기본 false)
   바닥 y=0, x·z 중심 0, 길이 방향 = x, 정면(+z) 장변 안쪽에 사각 관통 구멍열, 뒷면(-z) 장변 안쪽에 원형 홀열. 1 단위 = 1 mm. */
window.PARTS = window.PARTS || {};
window.PARTS.pinboat = function (THREE, MAT, opts) {
  opts = Object.assign({
    length: 305, width: 109, thickness: 1.0, cols: 6, rows: 3, pins: false, pinPitch: 25.4,
    jChannel: true, flangeUp: false, finish: 'sus', withStrip: false,
  }, opts || {});
  const L = +opts.length, W = +opts.width, T = Math.max(0.5, +opts.thickness);
  const COLS = Math.max(1, Math.round(+opts.cols)), ROWS = Math.max(1, Math.round(+opts.rows));
  const pinsMode = opts.pins === false || opts.pins === 'none' || opts.pins === 'false' ? 'none' : (opts.pins === 'full' ? 'full' : 'corner');
  const g = new THREE.Group();

  /* ---------- 환경 반사(고대비 스튜디오 큐브맵 256px: 밝은 수평선 띠·중간 밝기 청록 하늘·어두운 바닥)
     사진의 광택 SUS처럼 위를 보는 면은 밝고(하늘·띠), 창 안쪽 측벽·플랜지처럼 옆·아래를 보는 면은 거의 검게 비친다. ---------- */
  function studioEnv() {
    if (window.__pinboatEnv2) return window.__pinboatEnv2;
    const N = 256, faces = [];
    const dirs = [
      (u, v) => [1, v, -u], (u, v) => [-1, v, u],       // +x, -x
      (u, v) => [u, 1, -v], (u, v) => [u, -1, v],       // +y, -y
      (u, v) => [u, v, 1], (u, v) => [-u, v, -1],       // +z, -z
    ];
    const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
    for (const f of dirs) {
      const cv = document.createElement('canvas'); cv.width = N; cv.height = N;
      const c = cv.getContext('2d'), img = c.createImageData(N, N), d = img.data;
      for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
        const u = (i + 0.5) / N * 2 - 1, v = 1 - (j + 0.5) / N * 2;
        const p = f(u, v), len = Math.hypot(p[0], p[1], p[2]);
        const e = p[1] / len, ax = p[0] / len, az = p[2] / len;
        let r, gg, b;
        if (e >= 0) {               // 하늘: 수평선 바로 위는 백색, 위로 갈수록 중간 밝기의 청록 회색(사진의 배경색)
          const t = Math.pow(e, 0.8);
          r = 0.92 - 0.40 * t; gg = 0.95 - 0.33 * t; b = 0.96 - 0.30 * t;
          const sx = ax * 0.3 + az * 0.5 + e * 0.8;                // 큰 소프트박스(키라이트 방향) → 거울면 하이라이트
          const lamp = sm(0.55, 0.95, sx);
          r += 0.6 * lamp; gg += 0.6 * lamp; b += 0.6 * lamp;
        } else {                    // 바닥: 수평선 바로 아래부터 어두운 회색(0.25) → 아래로 갈수록 거의 검정
          const t = Math.pow(-e, 0.5);
          r = 0.25 - 0.19 * t; gg = 0.26 - 0.19 * t; b = 0.27 - 0.19 * t;
        }
        const band = 1 - sm(0.02, 0.08, Math.abs(e));             // 수평선 띠(|e|<0.08): 가장 밝은 백색 띠
        r = r * (1 - band) + 1.0 * band; gg = gg * (1 - band) + 1.0 * band; b = b * (1 - band) + 1.0 * band;
        const k = (j * N + i) * 4;
        d[k] = Math.min(255, r * 255); d[k + 1] = Math.min(255, gg * 255); d[k + 2] = Math.min(255, b * 255); d[k + 3] = 255;
      }
      c.putImageData(img, 0, 0);
      faces.push(cv);
    }
    const tex = new THREE.CubeTexture(faces);
    tex.encoding = THREE.sRGBEncoding; tex.needsUpdate = true;
    window.__pinboatEnv2 = tex;
    return tex;
  }

  /* ---------- 재질 ---------- */
  let plateMat;
  if (opts.finish === 'alu') plateMat = MAT.alu();
  else if (opts.finish === 'black') plateMat = MAT.aluDark();
  else {   // 광택 SUS(거울면에 가까움): 중립 밝은 회색, 낮은 거칠기, 강한 환경 반사(수평선 띠 1.0×1.6 → 톤매핑 전 1.6)
    plateMat = MAT.sus(); plateMat.color.setHex(0xdcdedd); plateMat.metalness = 0.95; plateMat.roughness = 0.08;
  }
  plateMat.envMap = studioEnv(); plateMat.envMapIntensity = opts.finish === 'sus' ? 1.6 : 0.6;
  const pinMat = MAT.nickel(); pinMat.envMap = plateMat.envMap; pinMat.envMapIntensity = 0.8;

  /* ---------- 플랜지 단면 (판 단면과 하나의 Shape, 굽힘 R 포함) ---------- */
  const Ri = 1.0, Ro = Ri + T;          // 굽힘 안쪽/바깥 반지름
  const FL_H = 6.0;                     // 플랜지 전체 높이(판 바깥면 기준)
  const LIP_W = opts.jChannel ? 2.6 : 0; // J 립 폭
  const UB = 2.0;                       // 단면에 포함되는 평판 구간(판과 겹침 없이 맞닿음)
  const PROF_W = UB + Ro;               // 단면 폭 = 판 가장자리에서 바깥면까지
  const plateHalf = W / 2 - PROF_W;     // 평판(plan) 반폭
  const plateY0 = opts.flangeUp ? 0 : FL_H - T;   // 판 바닥 y
  const plateTop = plateY0 + T;

  function flangeProfile() {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.lineTo(UB, 0);
    s.absarc(UB, Ro, Ro, -Math.PI / 2, 0, false);                       // 바깥 굽힘 R
    if (LIP_W) {
      s.lineTo(UB + Ro, FL_H - Ro);
      s.absarc(UB, FL_H - Ro, Ro, 0, Math.PI / 2, false);                 // 립 쪽 바깥 R
      s.lineTo(UB - LIP_W, FL_H); s.lineTo(UB - LIP_W, FL_H - T); s.lineTo(UB, FL_H - T);
      s.absarc(UB, FL_H - Ro, Ri, Math.PI / 2, 0, true);                  // 립 쪽 안쪽 R
    } else {
      s.lineTo(UB + Ro, FL_H); s.lineTo(UB + Ri, FL_H);
    }
    s.lineTo(UB + Ri, Ro);
    s.absarc(UB, Ro, Ri, 0, -Math.PI / 2, true);                         // 안쪽 굽힘 R
    s.lineTo(0, T); s.closePath();
    return s;
  }
  const chamfer = 0;                   // 방향 표시 모따기(+x, 정면 모서리). 사진의 보트는 네 모서리 모두 직각 → 0
  const flGeo = new THREE.ExtrudeGeometry(flangeProfile(), { depth: 1, bevelEnabled: false, curveSegments: 8 });
  for (const s of [-1, 1]) {
    const len = s > 0 ? L - chamfer : L, cx = s > 0 ? -chamfer / 2 : 0;
    const fl = new THREE.Mesh(flGeo, plateMat);
    fl.rotation.y = -s * Math.PI / 2;           // 단면 x(u) → 월드 s·z(바깥), 단면 z → 월드 -s·x
    fl.scale.set(1, opts.flangeUp ? 1 : -1, len);
    fl.position.set(cx + s * len / 2, opts.flangeUp ? 0 : FL_H, s * plateHalf);
    g.add(fl);
  }

  /* ---------- 평면 레이아웃 (shape 좌표: x = 길이, y = 폭. y+ → 월드 -z(뒷면)) ---------- */
  const yHole = plateHalf - 2.5;       // 뒷면 원형 홀열(플랜지 안쪽 약 3 mm)
  const ySq = plateHalf - 0.5;         // 정면 사각 관통 구멍열(사진처럼 굽힘선 바로 옆, 판 끝 1~2 mm)
  const yPin = plateHalf - 7.0;        // 위치결정 핀 열
  const winZoneHalf = plateHalf - 10.5; // 창이 들어갈 폭 반값
  const rowPitch = (winZoneHalf * 2) / ROWS;
  const winH = rowPitch - 9;           // 창 높이(가로 리브 9 mm)
  const endMargin = 14;                // 양 끝 여유(핀·피듀셜 영역)
  const colPitch = (L - 2 * endMargin) / COLS;
  const winW = colPitch - 10;          // 창 폭(열 사이 리브 10 mm, 가운데 슬릿)

  /* 외곽: 직사각형(chamfer>0 이면 +x·정면 모서리에 방향 표시 모따기) */
  const shape = new THREE.Shape();
  shape.moveTo(-L / 2, -plateHalf);
  if (chamfer > 0) { shape.lineTo(L / 2 - chamfer, -plateHalf); shape.lineTo(L / 2, -plateHalf + chamfer); }
  else shape.lineTo(L / 2, -plateHalf);
  shape.lineTo(L / 2, plateHalf);
  shape.lineTo(-L / 2, plateHalf);
  shape.closePath();

  const pathFrom = (pts) => { const p = new THREE.Path(); p.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) p.lineTo(pts[i][0], pts[i][1]); p.closePath(); return p; };
  const rectHole = (cx, cy, w, h) => pathFrom([[cx - w / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]]);
  const roundHole = (cx, cy, r) => { const p = new THREE.Path(); p.absarc(cx, cy, r, 0, Math.PI * 2, false); return p; };

  /* 창: 기본 직사각형 + 긴 변 가운데 1개의 바깥쪽 단차(창 폭의 약 1/3, 깊이 1.5) + 네 모서리 릴리프 노치 (사진과 동일) */
  const NC = 1.5;                       // 모서리 릴리프 노치 크기
  function castleHole(cx, cy, w, h) {
    const a = w / 2, b = h / 2, c = NC, d = 1.5, pts = [];
    const edge = (p0, p1, n, tabs, tw) => {
      const ux = p1[0] - p0[0], uy = p1[1] - p0[1], len = Math.hypot(ux, uy), ex = ux / len, ey = uy / len;
      const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2;
      pts.push(p0);
      for (const o of tabs) {
        const s0 = [mx + ex * (o - tw / 2), my + ey * (o - tw / 2)], s1 = [mx + ex * (o + tw / 2), my + ey * (o + tw / 2)];
        pts.push(s0, [s0[0] + n[0] * d, s0[1] + n[1] * d], [s1[0] + n[0] * d, s1[1] + n[1] * d], s1);
      }
      pts.push(p1);
    };
    const tl = [0], tw = w * 0.33, ts = [];   // 긴 변: 가운데 1개(폭 ≈ w/3). 짧은 변: 단차 없음(사진에서 거의 안 보임)
    edge([-a, b - c], [-a, -b + c], [1, 0], ts, 2);
    pts.push([-a - c, -b + c], [-a - c, -b - c], [-a + c, -b - c]);
    edge([-a + c, -b], [a - c, -b], [0, 1], tl, tw);
    pts.push([a - c, -b - c], [a + c, -b - c], [a + c, -b + c]);
    edge([a, -b + c], [a, b - c], [-1, 0], ts, 2);
    pts.push([a + c, b - c], [a + c, b + c], [a - c, b + c]);
    edge([a - c, b], [-a + c, b], [0, -1], tl, tw);
    pts.push([-a + c, b + c], [-a - c, b + c], [-a - c, b - c]);
    return pathFrom(pts.map(p => [p[0] + cx, p[1] + cy]));
  }

  const x0 = -L / 2 + endMargin + colPitch / 2, y0 = -winZoneHalf + rowPitch / 2;
  const winC = [];
  for (let i = 0; i < COLS; i++)
    for (let j = 0; j < ROWS; j++) {
      const cx = x0 + i * colPitch, cy = y0 + j * rowPitch;
      winC.push([cx, cy]);
      shape.holes.push(castleHole(cx, cy, winW, winH));
    }
  // 열 사이의 긴 슬릿(사진의 세로 가는 선)
  for (let i = 1; i < COLS; i++)
    shape.holes.push(rectHole(-L / 2 + endMargin + i * colPitch, 0, 1.2, winZoneHalf * 2 - 2));
  // 뒷면 장변 안쪽: 원형 홀 열(Ø3.2, 12.7 피치) — 사진의 또렷한 원형 다크 도트
  const ePitch = 12.7, nE = Math.floor((L - 24) / ePitch), eX0 = -((nE - 1) * ePitch) / 2;
  for (let i = 0; i < nE; i++) shape.holes.push(roundHole(eX0 + i * ePitch, yHole, 1.6));
  // 정면 장변 안쪽: 열마다 3개(창 좌·중·우 아래)의 사각 관통 구멍 3.0×2.0, 굽힘선 바로 옆
  for (let i = 0; i < COLS; i++) for (const k of [-1, 0, 1])
    shape.holes.push(rectHole(x0 + i * colPitch + k * winW * 0.33, -ySq, 3.0, 2.0));
  // 피듀셜 홀(양 끝 4개)
  const fidX = L / 2 - 6.5;
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) shape.holes.push(roundHole(sx * fidX, sy * yPin, 1.0));

  const plateGeo = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false, curveSegments: 16 });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.rotation.x = -Math.PI / 2;      // shape y+ → 월드 -z, 돌출 → +y
  plate.position.y = plateY0;
  g.add(plate);

  /* ---------- 창 네 모서리의 세운 L자 손가락 스토퍼 (인스턴싱) ---------- */
  (function cornerTabs() {
    const TAB_L = 3.5, TAB_H = 1.8, TAB_W = 1.2;   // 사진의 작은 검은 돌기(높이 1.5~2, 폭 1.2~1.5)가 기본 4뷰에서 보이도록
    const tabGeo = new THREE.BoxGeometry(TAB_L, TAB_H, TAB_W); tabGeo.translate(0, TAB_H / 2, 0);   // 바닥 기준(바운딩 박스가 y<0 로 내려가지 않게)
    const n = winC.length * 8;
    const im = new THREE.InstancedMesh(tabGeo, plateMat, n);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), sc = new THREE.Vector3(1, 1, 1);
    const qx = new THREE.Quaternion(), qz = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    const a = winW / 2, b = winH / 2, y = plateTop;
    let k = 0;
    for (const [cx, cy] of winC) for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
      // 가로 바: 노치 바깥(폭 방향) 변을 따라 / 세로 바: 노치 바깥(길이 방향) 변을 따라 → 노치를 감싸는 L
      p.set(cx + sx * a, y, -(cy + sy * (b + NC + TAB_W / 2))); m.compose(p, qx, sc); im.setMatrixAt(k++, m);
      p.set(cx + sx * (a + NC + TAB_W / 2), y, -(cy + sy * b)); m.compose(p, qz, sc); im.setMatrixAt(k++, m);
    }
    im.instanceMatrix.needsUpdate = true;
    g.add(im);
  })();

  /* ---------- 위치결정 핀 (압입, 니켈/SUS, 끝단 반구) ---------- */
  const PIN_R = 1.0, PIN_H = 4.0;
  const pinPos = [];
  if (pinsMode === 'corner') {
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) pinPos.push([sx * (fidX - 4.0), sy * yPin]);
  } else if (pinsMode === 'full') {
    const pitch = +opts.pinPitch || 25.4, nPin = Math.max(2, Math.floor((L - 2 * endMargin - 8) / pitch) + 1);
    const pX0 = -((nPin - 1) * pitch) / 2;
    for (let i = 0; i < nPin; i++) for (const s of [-1, 1]) pinPos.push([pX0 + i * pitch, s * yPin]);
  }
  if (pinPos.length) {
    const prof = [];
    // 압입 핀: 판 속에 박힌 몸통 → 판 위 0.4 mm 숄더(칼라) → 원통 → 반구 끝
    prof.push(new THREE.Vector2(0, -0.6), new THREE.Vector2(PIN_R + 0.4, -0.6), new THREE.Vector2(PIN_R + 0.4, 0.4), new THREE.Vector2(PIN_R, 0.6));
    for (let k = 0; k <= 6; k++) { const a = (k / 6) * Math.PI / 2; prof.push(new THREE.Vector2(PIN_R * Math.cos(a), PIN_H - PIN_R + PIN_R * Math.sin(a))); }
    const pinGeo = new THREE.LatheGeometry(prof, 20);
    for (const p of pinPos) { const m = new THREE.Mesh(pinGeo, pinMat); m.position.set(p[0], plateTop, -p[1]); g.add(m); }
  }

  /* ---------- 각인(품번) ---------- */
  (function engrave() {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 48;
    const c = cv.getContext('2d'); c.clearRect(0, 0, 512, 48);
    c.fillStyle = 'rgba(40,44,48,0.85)'; c.font = 'bold 30px monospace'; c.textBaseline = 'middle';
    c.fillText('PIN BOAT 4.3x12  ' + COLS + 'x' + ROWS + '  REV.A', 8, 24);
    const tex = new THREE.CanvasTexture(cv); tex.minFilter = THREE.LinearFilter;
    const m = MAT.aluDark(); m.map = tex; m.transparent = true; m.depthWrite = false; m.roughness = 0.6;
    const d = new THREE.Mesh(new THREE.PlaneGeometry(46, 4.3), m);
    d.rotation.x = -Math.PI / 2; d.position.set(L / 2 - 50, plateTop + 0.03, winZoneHalf + 3.0);
    g.add(d);
  })();

  /* ---------- 옵션: 구리 리드프레임 스트립 (핀에 끼워 얹음) ---------- */
  if (opts.withStrip) {
    const SL = L - 2 * endMargin + 6, SW = (yPin + 2) * 2, ST = 0.5;   // 실제 0.2 mm 정도지만 그림자 acne 방지를 위해 0.5
    const ss = new THREE.Shape();
    ss.moveTo(-SL / 2, -SW / 2); ss.lineTo(SL / 2, -SW / 2); ss.lineTo(SL / 2, SW / 2); ss.lineTo(-SL / 2, SW / 2); ss.closePath();
    for (const p of pinPos) ss.holes.push(roundHole(p[0], p[1], PIN_R + 0.08));            // 인덱스 홀(핀 위치)
    if (pinsMode !== 'full') for (const sx of [-1, 1]) for (const sy of [-1, 1]) {        // 핀 없이도 피듀셜 위치의 인덱스 홀
      const x = sx * (fidX - 4.0), y = sy * yPin;
      if (!pinPos.some(p => p[0] === x && p[1] === y) && Math.abs(x) < SL / 2 - 2) ss.holes.push(roundHole(x, y, PIN_R + 0.08));
    }
    for (let i = 0; i < COLS; i++) for (let j = 0; j < ROWS; j++) {                        // 유닛 둘레의 타이바 사이 슬롯
      const cx = x0 + i * colPitch, cy = y0 + j * rowPitch, uw = winW - 3, uh = winH - 1, sw = 1.6;
      ss.holes.push(rectHole(cx, cy - uh / 2, uw - 7, sw), rectHole(cx, cy + uh / 2, uw - 7, sw));   // 유닛 둘레(타이바 4곳 남김)
      ss.holes.push(rectHole(cx - uw / 2, cy, sw, uh - 7), rectHole(cx + uw / 2, cy, sw, uh - 7));
      // 리드 사이 에칭 틈: 다이패드 둘레 사각 링 4변(코너는 타이바로 연결) + 리드 핑거 사이 가는 슬릿
      const pw = uw * 0.42, ph = uh * 0.42;
      ss.holes.push(rectHole(cx, cy - ph / 2, pw - 3, 0.7), rectHole(cx, cy + ph / 2, pw - 3, 0.7), rectHole(cx - pw / 2, cy, 0.7, ph - 3), rectHole(cx + pw / 2, cy, 0.7, ph - 3));
      const gapL = (uh / 2 - sw / 2) - (ph / 2 + 0.35) - 1.2, gapY = (uh / 2 - sw / 2 + ph / 2 + 0.35) / 2;
      for (let k = -4; k <= 4; k++) { const x = cx + k * (uw - 7) / 9; ss.holes.push(rectHole(x, cy - gapY, 0.5, gapL), rectHole(x, cy + gapY, 0.5, gapL)); }
      const gapW = (uw / 2 - sw / 2) - (pw / 2 + 0.35) - 1.2, gapX = (uw / 2 - sw / 2 + pw / 2 + 0.35) / 2;
      for (let k = -1; k <= 1; k++) { const y = cy + k * (uh - 7) / 3; ss.holes.push(rectHole(cx - gapX, y, gapW, 0.5), rectHole(cx + gapX, y, gapW, 0.5)); }
    }
    const cu = MAT.copper(); cu.shadowSide = THREE.BackSide; cu.roughness = 0.38;   // 얇은 판의 그림자 자기간섭(acne) 방지
    const strip = new THREE.Mesh(new THREE.ExtrudeGeometry(ss, { depth: ST, bevelEnabled: false, curveSegments: 8 }), cu);
    strip.rotation.x = -Math.PI / 2; strip.position.y = plateTop + 1.05;   // 모서리 L 스토퍼 위에 얹힘(판과 코플래너 방지)
    g.add(strip);
  }

  return g;
};
