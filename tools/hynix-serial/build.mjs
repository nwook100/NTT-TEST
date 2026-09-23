// 설치용 한 파일 만들기: Code.gs + Index.html → dist/설치용_Code.gs
// 사용법: node build.mjs
import fs from 'fs';
const dir = new URL('.', import.meta.url).pathname;
const code = fs.readFileSync(dir + 'Code.gs', 'utf8');
const html = fs.readFileSync(dir + 'Index.html', 'utf8');
const out = `/**
 * ===== 설치용 한 파일 버전 (자동 생성 - 직접 고치지 말고 Code.gs / Index.html 을 고친 뒤 node build.mjs) =====
 * 구글 시트 > 확장 프로그램 > Apps Script 의 Code.gs 에 이 파일 전체를 붙여넣고
 * [배포 > 새 배포 > 웹 앱] 하면 끝입니다.
 */

${code}

// ===== 화면 (Index.html) =====
var INDEX_HTML = ${JSON.stringify(html)};
`;
fs.mkdirSync(dir + 'dist', { recursive: true });
fs.writeFileSync(dir + 'dist/설치용_Code.gs', out);
console.log('dist/설치용_Code.gs', out.length, 'bytes');
