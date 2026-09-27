// 편집 명령 검사: node mini-cad/tests/edit.cjs
const path = require('path');
const { chromium } = require('playwright');
const page = 'file://' + path.join(__dirname, '..', 'index.html');
const near = (a, b) => Math.abs(a - b) < 1e-6;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1200, height: 760 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(page); await p.waitForTimeout(300);
  await p.evaluate(() => localStorage.clear());
  await p.reload(); await p.waitForTimeout(300);
  const cmd = async s => { await p.fill('#cmd', s); await p.press('#cmd', 'Enter'); };
  const ents = () => p.evaluate(() => JSON.parse(localStorage.getItem('minicad.v1')));
  // 새 도면
  await p.click('#btnClear'); await p.click('#btnClear');
  // 선 (0,0)-(100,0), 원 중심 (50,50) r10
  await cmd('L'); await cmd('0,0'); await cmd('100,0'); await p.keyboard.press('Escape');
  await cmd('C'); await cmd('50,50'); await cmd('10');
  let e = await ents(); const results = [];
  results.push(['그리기 2개', e.length === 2]);
  // 범위 선택 (왼→오 전체)
  await cmd('S');
  const box = await p.locator('#cv').boundingBox();
  await p.mouse.move(box.x + 5, box.y + 5); await p.mouse.down(); await p.mouse.move(box.x + box.width - 5, box.y + box.height - 5, { steps: 5 }); await p.mouse.up();
  results.push(['범위 선택', (await p.textContent('#hint')).includes('2개 선택됨')]);
  // 이동 @10,5
  await cmd('M'); await cmd('0,0'); await cmd('@10,5');
  e = await ents(); results.push(['이동', near(e[0].x1, 10) && near(e[0].y1, 5) && near(e[1].cx, 60)]);
  // 회전 90 (기준 10,5)
  await cmd('RO'); await cmd('10,5'); await cmd('90');
  e = await ents(); results.push(['회전', near(e[0].x2, 10) && near(e[0].y2, 105) && near(e[1].cx, -40) && near(e[1].cy, 55)]);
  // 축척 2 (기준 10,5)
  await cmd('SC'); await cmd('10,5'); await cmd('2');
  e = await ents(); results.push(['축척', near(e[0].y2, 205) && near(e[1].r, 20)]);
  // 대칭 (x=10 세로선) → 원본 유지, 2개 추가
  await cmd('MI'); await cmd('10,0'); await cmd('10,100');
  e = await ents(); results.push(['대칭', e.length === 4 && near(e[3].cx, 10 + (10 - e[1].cx))]);
  // 복사 2번 후 Esc
  await cmd('CO'); await cmd('0,0'); await cmd('@0,300'); await cmd('@0,600'); await p.keyboard.press('Escape');
  e = await ents(); results.push(['복사', e.length === 8]);
  // 되돌리기
  await p.click('#btnUndo'); e = await ents(); results.push(['되돌리기', e.length === 6]);
  results.push(['콘솔 오류 없음', errs.length === 0]);
  results.forEach(([n, ok]) => console.log(ok ? '통과' : '실패', n));
  if (errs.length) console.log(errs);
  await p.screenshot({ path: path.join(__dirname, 'out', 'edit.png') });
  await b.close();
  process.exit(results.every(r => r[1]) ? 0 : 1);
})();
