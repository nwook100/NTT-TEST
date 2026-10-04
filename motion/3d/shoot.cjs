const path=require('node:path');const {spawn}=require('node:child_process');const {pathToFileURL}=require('node:url');
function loadPlaywright(){try{return require('playwright');}catch(_){}
  for(const r of [process.env.NODE_PATH,'/opt/node-tools/node_modules'].filter(Boolean)){try{return require(require('node:path').join(r,'playwright'));}catch(_){}}
  throw new Error('playwright를 찾을 수 없습니다. npm i -D playwright 후 다시 실행하세요.');}
const {chromium}=loadPlaywright();
const mode=process.argv[2]||'still', out=process.argv[3], pageFile=process.argv[4]||'index.html';
(async()=>{
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  const errs=[];page.on('pageerror',e=>errs.push(e.message));page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await page.route(/https:\/\/(fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com)\//,async route=>{try{const req=route.request();const r=await fetch(req.url(),{headers:{'user-agent':req.headers()['user-agent']||''}});const body=Buffer.from(await r.arrayBuffer());await route.fulfill({status:r.status,headers:{'content-type':r.headers.get('content-type')||'application/octet-stream'},body});}catch(e){await route.continue();}});
  await page.goto(pathToFileURL(path.join(__dirname,pageFile)).href);
  await page.waitForFunction(()=>window.__motionReady===true,null,{timeout:60000});
  if(mode==='still'){
    for(const t of [0,4,8]){await page.evaluate(x=>window.__motion.seek(x),t);await page.screenshot({path:out.replace('.png',`_t${t}.png`)});}
  }else{
    const FPS=30,total=await page.evaluate(()=>window.__motion.total),frames=Math.round(total*FPS);
    const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
    const done=new Promise((res,rej)=>ff.on('close',c=>c===0?res():rej(new Error('ffmpeg '+c))));
    const t0=Date.now();
    for(let i=0;i<=frames;i++){await page.evaluate(t=>window.__motion.seek(t),i/FPS);const png=await page.screenshot({type:'png'});if(!ff.stdin.write(png))await new Promise(r=>ff.stdin.once('drain',r));if(i%60===0)console.log(`${i}/${frames} ${((Date.now()-t0)/1000)|0}s`);}
    ff.stdin.end();await done;
  }
  console.log('errors:',errs.length?errs:'none');await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
