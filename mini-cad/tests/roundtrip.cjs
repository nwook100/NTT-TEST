// DXF 왕복 검사: node mini-cad/tests/roundtrip.cjs
// 샘플 불러오기 → 스크린샷 → DXF 저장 → tests/out/ 에 결과. 이후 ezdxf로 검사.
const path = require('path'), fs = require('fs');
const { chromium } = require('playwright');
const here = __dirname, page = 'file://' + path.join(here, '..', 'index.html');
const outDir = path.join(here, 'out'); fs.mkdirSync(outDir, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  let fail = 0;
  for (const f of fs.readdirSync(path.join(here, 'samples')).filter(n => n.endsWith('.dxf'))) {
    const p = await b.newPage({ viewport: { width: 1200, height: 760 } });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(page); await p.waitForTimeout(400);
    await p.setInputFiles('#fileDxf', path.join(here, 'samples', f)); await p.waitForTimeout(500);
    const note = await p.textContent('#openNote');
    await p.screenshot({ path: path.join(outDir, f + '.png') });
    await p.click('#btnDxf'); await p.waitForTimeout(200);
    fs.writeFileSync(path.join(outDir, 're_' + f), await p.inputValue('#dxfOut'));
    console.log(f, '|', note, '| page errors:', errs.length);
    if (errs.length || !/열었습니다/.test(note)) fail++;
    await p.close();
  }
  await b.close();
  process.exit(fail ? 1 : 0);
})();
