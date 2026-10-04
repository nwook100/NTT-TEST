/* 모션그래픽을 MP4로 뽑는 스크립트.
   사용법:  node render.cjs [출력파일.mp4] [fps]
   필요:    ffmpeg, playwright (npm i -D playwright && npx playwright install chromium)
   원리:    index.html?render=1 을 1920x1080으로 열고, window.__motion.seek(t)로 시간을 한 프레임씩
            옮기며 스크린샷을 찍어 ffmpeg에 연속으로 넘긴다. 애니메이션이 전부 t의 함수라서 가능하다. */
const path = require('node:path');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');

function loadPlaywright() {
  try { return require('playwright'); } catch (_) {}
  const roots = [process.env.NODE_PATH, '/opt/node-tools/node_modules'].filter(Boolean);
  for (const r of roots) { try { return require(path.join(r, 'playwright')); } catch (_) {} }
  throw new Error('playwright를 찾을 수 없습니다. `npm i -D playwright` 후 다시 실행하세요.');
}

(async () => {
  const { chromium } = loadPlaywright();
  const out = path.resolve(process.argv[2] || path.join(__dirname, 'shinsung-motion.mp4'));
  const FPS = Number(process.argv[3] || 30), W = 1920, H = 1080;
  const exe = process.env.CHROMIUM_PATH; // 필요하면 크로미움 경로를 직접 지정
  const launch = { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] }; // GPU 없는 서버에서도 WebGL 동작
  if (exe) launch.executablePath = exe;
  const browser = await chromium.launch(launch);
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  // 구글 폰트와 three.js(cdnjs)를 브라우저 대신 Node가 받아서 넘겨 준다. 사내 프록시 환경에서 브라우저가 인증서를 못 믿을 때를 위한 안전장치.
  await page.route(/https:\/\/(fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com)\//, async route => {
    try {
      const req = route.request();
      const r = await fetch(req.url(), { headers: { 'user-agent': req.headers()['user-agent'] || '' } });
      const body = Buffer.from(await r.arrayBuffer());
      await route.fulfill({ status: r.status, headers: { 'content-type': r.headers.get('content-type') || 'application/octet-stream' }, body });
    } catch (_) { await route.continue(); }
  });
  await page.goto(pathToFileURL(path.join(__dirname, 'index.html')).href + '?render=1');
  await page.waitForFunction(() => window.__motionReady === true, null, { timeout: 30000 });
  const total = await page.evaluate(() => window.__motion.total);
  const frames = Math.round(total * FPS);
  console.log(`렌더 시작: ${total}s × ${FPS}fps = ${frames + 1} frames → ${out}`);

  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', out],
    { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg exit ' + c))));

  const t0 = Date.now();
  for (let i = 0; i <= frames; i++) {
    await page.evaluate(t => window.__motion.seek(t), i / FPS);
    const png = await page.screenshot({ type: 'png' });
    if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % (FPS * 5) === 0) console.log(`  ${i}/${frames} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  }
  ff.stdin.end();
  await done;
  await browser.close();
  console.log(`완료: ${out}`);
})().catch(e => { console.error(e); process.exit(1); });
