/* 사용: node shoot-part.cjs <part> [optsJSON] [deps]
   예:   node shoot-part.cjs magazine
         node shoot-part.cjs magazine '{"finish":"red","endCover":true}'
         node shoot-part.cjs cassette '{}' ring        ← parts/ring.js 를 먼저 불러온 뒤 cassette 빌드
   결과: renders/<part>[_<tag>]_v0..3.png 과 renders/<part>[_<tag>]_sheet.png (2x2 합본)
   출력: 바운딩 박스(mm), 메시 개수, 자바스크립트 오류(있으면). */
const path=require('node:path');const {execFileSync}=require('node:child_process');const {pathToFileURL}=require('node:url');
function loadPlaywright(){try{return require('playwright');}catch(_){}
  for(const r of [process.env.NODE_PATH,'/opt/node-tools/node_modules'].filter(Boolean)){try{return require(require('node:path').join(r,'playwright'));}catch(_){}}
  throw new Error('playwright를 찾을 수 없습니다. npm i -D playwright 후 다시 실행하세요.');}
const {chromium}=loadPlaywright();
const part=process.argv[2],optsJSON=process.argv[3]||'',deps=process.argv[4]||'';if(!part){console.error('usage: node shoot-part.cjs <part> [optsJSON] [deps]');process.exit(2);}
const tag=optsJSON&&optsJSON!=='{}'?'_'+optsJSON.replace(/[^a-z0-9]+/gi,'').slice(0,24):'';
const here=__dirname,out=path.join(here,'renders');
(async()=>{
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:1});
  const errs=[];page.on('pageerror',e=>errs.push(e.message));page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await page.goto(pathToFileURL(path.join(here,'harness.html')).href+'?part='+encodeURIComponent(part)+(optsJSON?'&opts='+encodeURIComponent(optsJSON):'')+(deps?'&deps='+encodeURIComponent(deps):''));
  await page.waitForFunction(()=>window.__ready===true,null,{timeout:60000});
  const info=await page.evaluate(()=>({error:window.__error||null,bbox:window.__bbox||null,meshCount:window.__meshCount||0}));
  if(info.error){console.log('ERROR:',info.error);await browser.close();process.exit(1);}
  const files=[];
  for(let i=0;i<4;i++){await page.evaluate(i=>window.__view(i),i);const f=path.join(out,`${part}${tag}_v${i}.png`);await page.screenshot({path:f});files.push(f);}
  await browser.close();
  const sheet=path.join(out,`${part}${tag}_sheet.png`);
  execFileSync('ffmpeg',['-v','error','-y','-i',files[0],'-i',files[1],'-i',files[2],'-i',files[3],'-filter_complex','[0:v][1:v][2:v][3:v]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0,scale=1600:-1',sheet]);
  console.log(JSON.stringify({part,opts:optsJSON||null,deps:deps||null,bbox:info.bbox,meshCount:info.meshCount,views:['front-3/4 (az35 el24)','side (az90 el10)','top (az20 el65)','back-3/4 (az-140 el22)'],sheet,pageErrors:errs},null,1));
})().catch(e=>{console.error(e);process.exit(1);});
