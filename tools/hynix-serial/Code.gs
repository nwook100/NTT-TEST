/**
 * 하이닉스 시리얼 본호 중복 관리 - Google Apps Script 서버 코드
 *
 * 바코드 형식 (18자리):  BX3812 260630 B 02051
 *   고정번호(6) + 날짜 YYMMDD(6) + 구분(A=노멀, B=비드)(1) + 본호(5)
 *
 * 본호는 날짜가 바뀌면 00001 부터 다시 시작하고, A(노멀)와 B(비드)는 본호를 따로 매깁니다.
 * 중복 판정은 "같은 고정번호 + 같은 날짜 + 같은 구분(A/B) 안의 본호" 기준입니다.
 *   예) 0630 B02051 등록 후 → 0630 B02051 중복 / 0630 A02051 정상 / 0701 B02051 정상
 *
 * ===== 자동화 =====
 *  - 설치: 코드 붙여넣기 → 웹앱 배포 → 웹앱을 처음 열면 모든 설정이 자동으로 끝나고
 *    "작업자용 주소" 와 "관리자용 주소" 가 만들어집니다. (시트 메뉴 조작 필요 없음)
 *  - 작업자: 작업자용 주소를 즐겨찾기로 열고 바코드만 찍습니다. 로그인·입력 없음.
 *    기록의 작업자 칸에는 PC 이름(예: PC-7F3A)이 자동으로 들어갑니다.
 *  - 매일 새벽 3시 자동 점검(중복·형식오류·사라진 시트·통계 재계산), 문제가 있으면 소유자에게 메일.
 *
 * ===== 100만 건 이상 대비 =====
 *  - 바코드 날짜의 월별 시트(DB_2606 ...)에 저장. 스캔 때는 그 달 시트의 바코드 열 하나만 읽음.
 *  - 파일이 800만 칸에 가까워지면 새 파일을 자동으로 만들어 이어서 기록 (구글 한도 1,000만 칸).
 *  - 통계는 스크립트 속성에 저장 → 화면 통계에 시트를 읽지 않음.
 *
 * ===== 안정성 · 보안 =====
 *  - 모든 요청은 주소에 들어 있는 비밀 키로 확인 (작업자 키 / 관리자 키). 작업자 키는 관리자 화면에서 바로 교체 가능.
 *  - 작업자 키로는 스캔 등록·통계 보기만 가능. 발번·이력·관리 기능은 관리자 키 전용.
 *  - 등록되어 있던 DB 시트가 없어지면 중복을 놓치지 않도록 등록을 멈추고 알림 (fail-closed).
 *  - 같은 묶음을 다시 보내도(네트워크 재시도) 두 번 처리하지 않음. 수식 주입·긴 입력 차단. DB 시트 보호.
 *  - 모든 등록은 LockService 잠금 안에서 처리 → 여러 PC에서 동시에 같은 번호를 찍어도 한 건만 들어감.
 */

// ===== 설정 =====
// 허용할 고정번호 목록. 품목별로 고정번호가 다르면 여기에 추가하세요.
var ALLOWED_CODES = ['BX3812'];
// 중복 판정 범위
//   'DATE_TYPE_SERIAL' : 고정번호 + 날짜 + 구분(A/B)이 같을 때 본호 중복 금지. A/B 가 번호를 따로 씀 (기본, 현재 운영 규칙)
//   'DATE_SERIAL'      : 고정번호 + 날짜가 같을 때 본호 중복 금지. A/B 가 번호를 같이 쓰는 경우
var DUP_SCOPE = 'DATE_TYPE_SERIAL';
// 바코드 날짜 허용 범위 (오늘 기준). 잘못 읽힌 바코드를 걸러냅니다.
var DATE_PAST_DAYS = 730;   // 2년 전까지
var DATE_FUTURE_DAYS = 31;  // 한 달 뒤까지
// 매일 자동 점검 시각 (0~23시). 문제가 있으면 스크립트 소유자에게 메일을 보냅니다.
var CHECK_HOUR = 3;
var CHECK_MAIL = true;

var TYPE_NAMES = { A: '노멀', B: '비드' };
var SERIAL_MAX = 99999;
var PART_PREFIX = 'DB_';
var LOG_PREFIX = '로그_';
var CHECK_SHEET = '자동점검';
var HEADERS = ['바코드', '날짜', '구분', '본호', '품목', 'LOT/PO', '작업자', '비고', '등록일시'];
var COL_CREATED = 8; // HEADERS 안에서 '등록일시' 위치 (0부터)
var LOG_HEADERS = ['입력값', '사유', '시도일시', '작업자', '기존 바코드', '기존 위치'];
var CHECK_HEADERS = ['점검일시', '총 건수', '오늘 등록', '중복', '형식 오류', '사라진 시트', '결과'];
var ITEMS = ['Magazine', 'Cassette', 'Ring', 'Pin Boat', '기타'];
var TZ = 'Asia/Seoul';
var LOCK_WAIT_MS = 30000;
var MAX_BATCH = 5000;
var MAX_INPUT_LEN = 64;      // 바코드 입력 최대 길이
var CELL_LIMIT = 8000000;    // 파일 한 개에 쓸 최대 칸 수 (구글 한도 1,000만 칸에서 여유를 둠)
var GROW_ROWS = 2000;        // 시트가 꽉 차면 한 번에 늘리는 줄 수
var SEARCH_LIMIT = 200;      // 이력 조회 최대 표시 건수
var SEARCH_TIME_MS = 20000;  // 이력 조회 최대 소요 시간
var MAINT_TIME_MS = 5 * 60 * 1000; // 점검 최대 소요 시간

// ===== 웹앱 진입점 =====
/**
 * 주소의 k 값으로 화면 모드를 정합니다.
 *  - 아직 설정 전: 처음 연 사람(= 방금 배포한 관리자)에게 설정 완료 화면 + 작업자/관리자 주소
 *  - k = 관리자 키: 관리자 화면 (스캔 + 발번 + 일괄 + 이력 + 관리)
 *  - k = 작업자 키: 작업자 화면 (스캔만)
 *  - 그 외: 접근 안내
 */
function doGet(e) {
  var k = String((e && e.parameter && e.parameter.k) || '').slice(0, 100);
  var boot;
  try {
    ensureSetup_();
    if (!pget_('adminKey')) boot = claim_();
    else if (k && k === pget_('adminKey')) boot = { mode: 'admin', key: k };
    else if (k && k === pget_('workerKey')) boot = { mode: 'worker', key: k };
    else boot = { mode: 'denied' };
    pflush_();
  } catch (err) {
    console.error((err && err.stack) || err);
    boot = { mode: 'error', message: String((err && err.message) || err) };
  }
  if (boot.key) boot.cfg = clientCfg_();
  var html = typeof INDEX_HTML !== 'undefined' ? INDEX_HTML : HtmlService.createHtmlOutputFromFile('Index').getContent();
  var bootJs = 'window.BOOT = ' + JSON.stringify(boot).replace(/</g, '\\u003c') + ';';
  html = html.replace('/*BOOT*/', function () { return bootJs; }); // 함수로 넘겨 $ 기호가 특수문자로 해석되지 않게
  return HtmlService.createHtmlOutput(html)
    .setTitle('시리얼 중복 관리')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** 처음 설정: 키 만들기 + 매일 점검 예약. 여러 명이 동시에 열어도 한 번만 실행. */
function claim_() {
  var lock = LockService.getScriptLock();
  lock.waitLock(LOCK_WAIT_MS);
  try {
    preload_();
    if (!pget_('adminKey')) {
      pset_('adminKey', newKey_());
      pset_('workerKey', newKey_());
      installTrigger_();
    }
    pflush_();
    return { mode: 'setup', key: pget_('adminKey'), links: links_() };
  } finally {
    lock.releaseLock();
  }
}

function newKey_() { return (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, ''); }

function appUrl_() {
  try { return ScriptApp.getService().getUrl() || ''; } catch (e) { return ''; }
}
function links_() {
  var base = appUrl_();
  return { worker: base + '?k=' + pget_('workerKey'), admin: base + '?k=' + pget_('adminKey') };
}

/** 화면에서 즉시 형식 검사를 하기 위한 설정값 (서버 판정이 최종) */
function clientCfg_() {
  return {
    codes: ALLOWED_CODES, typeNames: TYPE_NAMES, scope: DUP_SCOPE,
    pastDays: DATE_PAST_DAYS, futureDays: DATE_FUTURE_DAYS, maxLen: MAX_INPUT_LEN, today: today_()
  };
}

/** 매일 자동 점검 예약 (중복 설치 방지) */
function installTrigger_() {
  try {
    ScriptApp.getProjectTriggers().forEach(function (t) {
      if (t.getHandlerFunction() === 'nightlyCheck') ScriptApp.deleteTrigger(t);
    });
    var t = ScriptApp.newTrigger('nightlyCheck').timeBased().everyDays(1).atHour(CHECK_HOUR).inTimezone(TZ).create();
    pset_('checkTrigger', t.getUniqueId());
  } catch (e) {
    console.error('자동 점검 예약 실패: ' + e); // 예약 실패가 설치를 막지는 않음
  }
}

// 시트를 열면 상단에 메뉴 추가 (선택 사항 - 몰라도 운영에 지장 없음)
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('시리얼 관리')
    .addItem('작업자용 / 관리자용 주소 보기', 'showLinks')
    .addItem('지금 점검하기', 'checkNow')
    .addToUi();
}

// ===== 오류 처리 =====
/** 사용자에게 그대로 보여줄 오류 */
function userError_(msg) { var e = new Error(msg); e.userFacing = true; return e; }

/** 웹에서 호출되는 모든 함수의 공통 틀: 키 확인 → 실행 → 속성 저장 → 오류를 알기 쉬운 문장으로 */
function api_(key, fn, adminOnly) {
  try {
    var user = auth_(key);
    if (adminOnly && user.role !== 'admin') throw new Error('AUTH:관리자 주소에서만 쓸 수 있는 기능입니다.');
    var result = fn(user);
    pflush_();
    return result;
  } catch (e) {
    if (e && (e.userFacing || /^AUTH:/.test(e.message))) throw e; // 예상된 거절은 기록하지 않음
    console.error((e && e.stack) || e);
    throw new Error('서버 오류: ' + ((e && e.message) || e) + ' — 자동으로 다시 시도합니다.');
  }
}

/** 주소의 키 확인 */
function auth_(key) {
  ensureSetup_();
  if (!key || typeof key !== 'string' || key.length > 100) throw new Error('AUTH:주소가 올바르지 않습니다.');
  if (key === pget_('adminKey')) return { role: 'admin' };
  if (key === pget_('workerKey')) return { role: 'worker' };
  throw new Error('AUTH:작업자용 주소가 바뀌었거나 올바르지 않습니다. 관리자에게 새 주소를 받으세요.');
}

/** 시트 메뉴에서만 실행 가능 (웹에서 호출하면 차단) */
function requireUi_() {
  try { SpreadsheetApp.getUi(); } catch (e) { throw userError_('이 기능은 구글 시트 메뉴에서만 실행할 수 있습니다.'); }
}
function ui_(msg) { try { SpreadsheetApp.getUi().alert(msg); } catch (e) { Logger.log(msg); } }
function cache_() { return CacheService.getScriptCache(); }

// ===== 스크립트 속성 (요청당 1번 읽고 1번 씀) =====
var P_ = null, PDIRTY_ = {}, PDEL_ = {};
function props_() { return PropertiesService.getScriptProperties(); }
function preload_() { P_ = props_().getProperties(); PDIRTY_ = {}; PDEL_ = {}; }
function pget_(k) { if (!P_) preload_(); return Object.prototype.hasOwnProperty.call(P_, k) ? P_[k] : null; }
function pset_(k, v) { pget_(k); P_[k] = String(v); PDIRTY_[k] = String(v); delete PDEL_[k]; }
function pdel_(k) { pget_(k); delete P_[k]; delete PDIRTY_[k]; PDEL_[k] = 1; }
function pall_() { pget_(''); return P_; }
function pflush_() {
  if (Object.keys(PDIRTY_).length) props_().setProperties(PDIRTY_);
  Object.keys(PDEL_).forEach(function (k) { props_().deleteProperty(k); });
  PDIRTY_ = {}; PDEL_ = {};
}
function getJson_(k, def) {
  var v = pget_(k);
  if (!v) return def;
  try { return JSON.parse(v); } catch (e) { return def; }
}
function setJson_(k, v) { pset_(k, JSON.stringify(v)); }
function addNum_(k, n) { pset_(k, (+pget_(k) || 0) + n); }
function today_() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'); }

function ensureSetup_() {
  if (!pget_('mainFile')) {
    var ss = SpreadsheetApp.getActive();
    pset_('mainFile', ss.getId());
    pset_('activeFile', ss.getId());
    pset_('fileCount', 1);
    setJson_('files', [{ id: ss.getId(), url: ss.getUrl(), name: ss.getName() }]);
  }
}

// ===== 입력값 정리 =====
/** 제어문자 제거, 길이 제한, 수식 주입 방지 (=, +, -, @ 로 시작하면 앞에 ' 를 붙여 글자로 저장) */
function safeText_(v, max) {
  var s = String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

/** 작업자 화면은 품목·LOT·비고를 보내지 않음. 작업자 칸 = PC 이름(자동) */
function cleanMeta_(m, user) {
  m = m && typeof m === 'object' ? m : {};
  var station = safeText_(m.station, 20) || (user && user.role === 'admin' ? '관리자' : '작업자');
  return {
    item: ITEMS.indexOf(m.item) >= 0 ? m.item : '',
    lot: safeText_(m.lot, 40),
    worker: user && user.role === 'admin' ? '관리자' + (m.station ? '(' + station + ')' : '') : station,
    note: safeText_(m.note, 100)
  };
}

// ===== 파일 / 시트 관리 =====
var fileCache_ = {};
function file_(id) { return fileCache_[id] || (fileCache_[id] = SpreadsheetApp.openById(id)); }
function sheetOf_(ref) { return ref ? file_(ref.f).getSheetByName(ref.s) : null; }

/** 파일이 쓰고 있는 칸 수 (속성에 적어 두고, 모르면 한 번 계산) */
function fileCells_(ss) {
  var k = 'cells:' + ss.getId(), v = pget_(k);
  if (v) return +v;
  var n = 0;
  ss.getSheets().forEach(function (sh) { n += sh.getMaxRows() * sh.getMaxColumns(); });
  pset_(k, n);
  return n;
}
function addCells_(ss, n) { pset_('cells:' + ss.getId(), fileCells_(ss) + n); }

/** 새 시트를 만들 파일. 지금 파일이 가득 차면 새 파일을 만들어 넘어갑니다. */
function activeFileFor_(needCells) {
  ensureSetup_();
  var ss = file_(pget_('activeFile'));
  if (fileCells_(ss) + needCells <= CELL_LIMIT) return ss;
  var n = (+pget_('fileCount') || 1) + 1;
  var main = file_(pget_('mainFile'));
  var ns = SpreadsheetApp.create(main.getName() + ' (' + n + ')');
  fileCache_[ns.getId()] = ns;
  pset_('activeFile', ns.getId());
  pset_('fileCount', n);
  var files = getJson_('files', []);
  files.push({ id: ns.getId(), url: ns.getUrl(), name: ns.getName() });
  setJson_('files', files);
  return ns;
}

function newSheet_(ss, name, headers) {
  var sh = ss.insertSheet(name);
  var extra = sh.getMaxColumns() - headers.length;
  if (extra > 0) sh.deleteColumns(headers.length + 1, extra); // 안 쓰는 열을 지워 칸 수 절약
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#f1f3f4');
  sh.setFrozenRows(1);
  protect_(sh);
  // 새 파일에 기본으로 있던 빈 '시트1' 정리
  ['시트1', 'Sheet1'].forEach(function (n) {
    var blank = ss.getSheetByName(n);
    if (blank && ss.getSheets().length > 1 && blank.getLastRow() === 0) ss.deleteSheet(blank);
  });
  pdel_('cells:' + ss.getId()); // 다음에 다시 계산
  return sh;
}

/** 시트 보호: 소유자(=프로그램)만 수정 가능. 다른 편집자는 보기만. */
function protect_(sh) {
  try {
    var pr = sh.protect().setDescription('시리얼 관리 프로그램 전용 — 직접 수정 금지');
    pr.removeEditors(pr.getEditors());
    if (pr.canDomainEdit()) pr.setDomainEdit(false);
  } catch (e) {
    console.error('시트 보호 실패: ' + e); // 보호 실패는 등록을 막지 않음
  }
}

/** end 행까지 쓸 수 있도록 줄을 늘립니다. */
function ensureRows_(ss, sh, end) {
  var max = sh.getMaxRows();
  if (end <= max) return;
  var add = end - max + GROW_ROWS;
  sh.insertRowsAfter(max, add);
  addCells_(ss, add * sh.getMaxColumns());
}

// ===== 월별 시트 (파티션) =====
function monthOf_(p) { return p.date.slice(0, 4); } // YYMM
function parts_(month) { return getJson_('part:' + month, []); }

/** 등록된 DB 시트가 없어졌으면 등록을 멈춥니다 (중복을 놓치지 않도록). */
function requireSheet_(ref) {
  var sh;
  try { sh = sheetOf_(ref); } catch (e) {
    throw userError_('DB 파일을 열 수 없습니다 (' + ref.s + '). 파일이 삭제되었거나 권한이 바뀌었습니다. 복구 전까지 등록을 멈춥니다. 관리자에게 알려주세요.');
  }
  if (!sh) throw userError_('DB 시트 "' + ref.s + '" 를 찾을 수 없습니다 (삭제 또는 이름 변경). 중복 검사를 할 수 없어 등록을 멈춥니다. 시트 이름을 되돌리거나 파일 > 버전 기록에서 복구하세요.');
  return sh;
}

function newPart_(month, needRows) {
  var list = parts_(month);
  var ss = activeFileFor_((needRows + GROW_ROWS + 1000) * HEADERS.length);
  var name = PART_PREFIX + month + (list.length ? '_' + (list.length + 1) : '');
  var sh = ss.getSheetByName(name) || newSheet_(ss, name, HEADERS);
  sh.getRange('A:D').setNumberFormat('@'); // 앞자리 0 보존
  sh.getRange('I:I').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  var ref = { f: ss.getId(), s: name };
  list.push(ref);
  setJson_('part:' + month, list);
  var months = getJson_('months', []);
  if (months.indexOf(month) < 0) { months.push(month); months.sort(); setJson_('months', months); }
  return ref;
}

/** 그 달 시트 맨 아래에 기록. 파일이 가득 차면 새 파일에 그 달의 다음 시트를 만듭니다. */
function appendRows_(month, values) {
  var list = parts_(month);
  var ref = list.length ? list[list.length - 1] : null;
  var sh = ref ? requireSheet_(ref) : null;
  if (!sh) { ref = newPart_(month, values.length); sh = requireSheet_(ref); }
  var ss = file_(ref.f);
  var start = sh.getLastRow() + 1, end = start + values.length - 1;
  if (end > sh.getMaxRows() && fileCells_(ss) + (end - sh.getMaxRows() + GROW_ROWS) * sh.getMaxColumns() > CELL_LIMIT) {
    ref = newPart_(month, values.length);
    sh = requireSheet_(ref); ss = file_(ref.f);
    start = sh.getLastRow() + 1; end = start + values.length - 1;
  }
  ensureRows_(ss, sh, end);
  sh.getRange(start, 1, values.length, HEADERS.length).setValues(values);
  return { ref: ref, start: start };
}

// ===== 바코드 해석 =====
function clean_(raw) {
  return String(raw == null ? '' : raw).toUpperCase().replace(/[\s\-]/g, '');
}

/**
 * 바코드를 고정번호/날짜/구분/본호로 나눕니다.
 * 형식이 틀리면 { ok:false, reason } 을 돌려줍니다.
 */
function parseBarcode_(raw) {
  var str = String(raw == null ? '' : raw);
  if (str.length > MAX_INPUT_LEN) return { ok: false, barcode: str.slice(0, 30) + '…', reason: '입력이 너무 깁니다 (' + str.length + '자)' };
  var s = clean_(str);
  if (!s) return { ok: false, barcode: s, reason: '빈 값' };
  if (s.length !== 18) return { ok: false, barcode: s, reason: '자릿수 오류: ' + s.length + '자리 (18자리여야 함)' };
  var m = /^([A-Z0-9]{6})(\d{2})(\d{2})(\d{2})([A-Z])(\d{5})$/.exec(s);
  if (!m) return { ok: false, barcode: s, reason: '형식 오류: 고정번호6 + 날짜6 + 구분1 + 본호5 형식이 아님' };
  var code = m[1], yy = +m[2], mm = +m[3], dd = +m[4], type = m[5], serial = m[6];
  if (ALLOWED_CODES.length && ALLOWED_CODES.indexOf(code) < 0) {
    return { ok: false, barcode: s, reason: '고정번호 오류: ' + code + ' (허용: ' + ALLOWED_CODES.join(', ') + ')' };
  }
  var d = new Date(2000 + yy, mm - 1, dd);
  if (d.getFullYear() !== 2000 + yy || d.getMonth() !== mm - 1 || d.getDate() !== dd) {
    return { ok: false, barcode: s, reason: '날짜 오류: ' + m[2] + m[3] + m[4] + ' 는 없는 날짜' };
  }
  var now = new Date(), days = Math.round((d.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()) / 86400000);
  if (days < -DATE_PAST_DAYS || days > DATE_FUTURE_DAYS) {
    return { ok: false, barcode: s, reason: '날짜 확인 필요: 20' + m[2] + '-' + m[3] + '-' + m[4] + ' 는 허용 범위(' + DATE_PAST_DAYS + '일 전 ~ ' + DATE_FUTURE_DAYS + '일 뒤) 밖 — 잘못 읽힌 바코드일 수 있음' };
  }
  if (!TYPE_NAMES[type]) return { ok: false, barcode: s, reason: '구분 오류: ' + type + ' (A=노멀, B=비드만 가능)' };
  if (+serial === 0) return { ok: false, barcode: s, reason: '본호 오류: 00000 은 사용할 수 없음' };
  return {
    ok: true, barcode: s, code: code, date: m[2] + m[3] + m[4],
    dateText: '20' + m[2] + '-' + m[3] + '-' + m[4], type: type, typeName: TYPE_NAMES[type], serial: serial
  };
}

function buildBarcode_(code, yymmdd, type, n) {
  return code + yymmdd + type + ('00000' + n).slice(-5);
}

/** 중복 판정 키 (바코드 문자열에서 바로 계산 - 대량 처리용으로 정규식 없이) */
function keyOfCell_(v) {
  var s = clean_(v);
  if (!s) return '';
  if (s.length !== 18) return 'RAW:' + s;
  return DUP_SCOPE === 'DATE_SERIAL' ? s.slice(0, 12) + s.slice(13) : s;
}
function dupKey_(p) { return p.ok ? keyOfCell_(p.barcode) : 'RAW:' + p.barcode; }
/** 본호가 이어지는 묶음의 키 앞부분 (중복 키에서 본호 5자리를 뺀 것) */
function groupPrefix_(p) { return dupKey_(p).slice(0, -5); }

function groupLabel_(p) {
  if (DUP_SCOPE === 'DATE_SERIAL') return '날짜 ' + p.date;
  return '날짜 ' + p.date + ' ' + p.typeName + '(' + p.type + ')';
}

// ===== 조회 =====
function fmt_(d) {
  if (!(d instanceof Date)) return d ? String(d) : '';
  return Utilities.formatDate(d, TZ, 'yyyy-MM-dd HH:mm:ss');
}

function rowToRecord_(r, sheetName, rowNo) {
  var p = parseBarcode_(r[0]);
  return {
    where: sheetName + ' ' + rowNo + '행', barcode: String(r[0]), code: p.code || '',
    date: p.dateText || String(r[1]), type: p.typeName || String(r[2]), serial: p.serial || String(r[3]),
    item: String(r[4]), lot: String(r[5]), worker: String(r[6]), note: String(r[7]), createdAt: fmt_(r[COL_CREATED])
  };
}

/** 그 달 시트들의 바코드 열(A열)만 읽어 {중복키 -> 위치} 를 만듭니다. 시트가 없어졌으면 오류. */
function loadMonth_(month) {
  var map = {};
  parts_(month).forEach(function (ref) {
    var sh = requireSheet_(ref);
    var n = sh.getLastRow() - 1;
    if (n < 1) return;
    var col = sh.getRange(2, 1, n, 1).getValues();
    for (var i = 0; i < n; i++) {
      var k = keyOfCell_(col[i][0]);
      if (k && !map[k]) map[k] = { ref: ref, row: i + 2 };
    }
  });
  return map;
}

/** 한 요청 안에서 같은 달을 두 번 읽지 않도록 캐시 */
function newIndex_() {
  var cache = {};
  return { get: function (month) { return cache[month] || (cache[month] = loadMonth_(month)); } };
}

function recordAt_(loc) {
  var r = requireSheet_(loc.ref).getRange(loc.row, 1, 1, HEADERS.length).getValues()[0];
  return rowToRecord_(r, loc.ref.s, loc.row);
}

/** 한 건 판정: invalid(형식오류) / dup(중복) / new(신규) */
function judge_(idx, raw) {
  var input = String(raw == null ? '' : raw).trim().slice(0, MAX_INPUT_LEN);
  var p = parseBarcode_(raw);
  if (!p.ok) return { status: 'invalid', input: input, parsed: p, reason: p.reason };
  var loc = idx.get(monthOf_(p))[dupKey_(p)];
  if (loc) return { status: 'dup', input: input, parsed: p, existing: recordAt_(loc), reason: groupLabel_(p) + ' 의 본호 ' + p.serial + ' 중복' };
  return { status: 'new', input: input, parsed: p };
}

// ===== 기록 =====
/** 잠금 안에서 실행. 잠근 직후 속성을 새로 읽고, 풀기 전에 저장합니다 (다른 PC와 숫자가 꼬이지 않도록). */
function withLock_(fn) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(LOCK_WAIT_MS)) throw userError_('다른 PC에서 등록 중이라 기다리다 시간이 초과되었습니다. 자동으로 다시 시도합니다.');
  try {
    preload_();
    return fn();
  } finally {
    // 중간에 오류가 나도 이미 시트에 기록된 만큼의 통계는 저장
    try { pflush_(); } catch (e) { console.error('속성 저장 실패: ' + e); }
    lock.releaseLock();
  }
}

/** 신규 바코드를 월별 시트에 기록하고 통계를 갱신합니다. */
function commit_(parsedList, m) {
  if (!parsedList.length) return;
  var now = new Date(), byMonth = {}, order = [];
  parsedList.forEach(function (p) {
    var mo = monthOf_(p);
    if (!byMonth[mo]) { byMonth[mo] = []; order.push(mo); }
    byMonth[mo].push(p);
  });
  var added = [];
  order.forEach(function (mo) {
    var list = byMonth[mo];
    var values = list.map(function (p) {
      return [p.barcode, p.dateText, p.type + '(' + p.typeName + ')', p.serial, m.item, m.lot, m.worker, m.note, now];
    });
    var res = appendRows_(mo, values);
    list.forEach(function (p, i) {
      added.push({
        where: res.ref.s + ' ' + (res.start + i) + '행', barcode: p.barcode, code: p.code, date: p.dateText,
        type: p.typeName, serial: p.serial, item: m.item, lot: m.lot, worker: m.worker, note: m.note, createdAt: fmt_(now)
      });
    });
    // 달 단위로 바로 통계 반영 (중간에 오류가 나도 이미 기록된 건수는 맞게)
    addNum_('total', list.length);
    addNum_('day:' + today_(), list.length);
  });
  setJson_('recent', added.reverse().concat(getJson_('recent', [])).slice(0, 10));
  pruneDays_();
}

/** 40일 지난 일별 카운터 정리 */
function pruneDays_() {
  var cutoff = Utilities.formatDate(new Date(Date.now() - 40 * 86400000), TZ, 'yyyy-MM-dd');
  Object.keys(pall_()).forEach(function (k) {
    var m = /^(day|blk):(\d{4}-\d{2}-\d{2})$/.exec(k);
    if (m && m[2] < cutoff) pdel_(k);
  });
}

function logBlocked_(entries, worker) {
  if (!entries.length) return;
  var now = new Date(), month = Utilities.formatDate(now, TZ, 'yyMM'), name = LOG_PREFIX + month;
  var ref = getJson_('log:' + month, null), sh = null, ss;
  try { sh = sheetOf_(ref); } catch (e) { sh = null; }
  if (!sh) {
    ss = activeFileFor_((entries.length + GROW_ROWS + 1000) * LOG_HEADERS.length);
    sh = ss.getSheetByName(name) || newSheet_(ss, name, LOG_HEADERS);
    sh.getRange('A:A').setNumberFormat('@');
    sh.getRange('E:E').setNumberFormat('@');
    setJson_('log:' + month, { f: ss.getId(), s: name });
  } else {
    ss = file_(ref.f);
  }
  var values = entries.map(function (e) {
    var ex = e.existing || {};
    return [safeText_(e.input, MAX_INPUT_LEN), safeText_(e.reason, 200), now, worker || '', ex.barcode || '', ex.where || ''];
  });
  var start = sh.getLastRow() + 1;
  ensureRows_(ss, sh, start + values.length - 1);
  sh.getRange(start, 1, values.length, LOG_HEADERS.length).setValues(values);
  addNum_('blk:' + today_(), values.length);
}

/** 같은 묶음 번호로 다시 오면 처리하지 않고 저장해 둔 결과를 돌려줍니다 (네트워크 재시도 대비). */
function idempotent_(batchId, fn) {
  var ok = typeof batchId === 'string' && /^[A-Za-z0-9_-]{8,64}$/.test(batchId);
  var key = 'batch:' + batchId;
  if (ok) {
    var hit = cache_().get(key);
    if (hit) { var prev = JSON.parse(hit); prev.replayed = true; return prev; }
  }
  var res = fn();
  if (ok) {
    var json = JSON.stringify(res);
    if (json.length < 95000) { try { cache_().put(key, json, 21600); } catch (e) {} }
  }
  return res;
}

function strList_(list) {
  if (!Array.isArray(list)) throw userError_('잘못된 요청입니다.');
  if (list.length > MAX_BATCH) throw userError_('한 번에 최대 ' + MAX_BATCH + '건까지 처리할 수 있습니다.');
  return list.map(function (s) { return String(s == null ? '' : s).trim(); }).filter(String);
}

// ===== 화면에서 호출하는 함수 (모두 주소 키 필요) =====

/** 한 건 중복 확인 (등록하지 않음) */
function checkSerial(token, raw) {
  return api_(token, function () {
    if (!String(raw || '').trim()) return { status: 'empty' };
    return judge_(newIndex_(), raw);
  });
}

/** 한 건 등록. 중복·형식오류면 등록하지 않습니다. */
function registerSerial(token, raw, meta, batchId) {
  return api_(token, function (user) {
    if (!String(raw || '').trim()) return { status: 'empty' };
    var m = cleanMeta_(meta, user);
    return withLock_(function () {
      return idempotent_(batchId, function () {
        var res = judge_(newIndex_(), raw);
        if (res.status !== 'new') { logBlocked_([res], m.worker); return res; }
        commit_([res.parsed], m);
        res.status = 'ok';
        return res;
      });
    });
  });
}

/**
 * 여러 건 검사 / 등록 (연속 스캔도 이 함수로 묶어서 처리).
 * 판정: new(신규) / dup(이미 등록됨) / self(보낸 목록 안에서 중복) / invalid(형식 오류)
 */
function bulkProcess(token, list, meta, commit, batchId) {
  return api_(token, function (user) {
    var inputs = strList_(list);
    var m = cleanMeta_(meta, user);
    var run = function () {
      var idx = newIndex_(), seen = {};
      var rows = inputs.map(function (s, i) {
        var res = judge_(idx, s);
        res.no = i + 1;
        if (res.status === 'new') {
          var k = dupKey_(res.parsed);
          if (seen[k]) { res.status = 'self'; res.firstNo = seen[k]; res.reason = seen[k] + '번째 줄과 본호 중복'; }
          else seen[k] = i + 1;
        }
        return res;
      });
      if (commit) {
        commit_(rows.filter(function (r) { return r.status === 'new'; }).map(function (r) { return r.parsed; }), m);
        logBlocked_(rows.filter(function (r) { return r.status !== 'new'; }), m.worker);
      }
      return { rows: rows, committed: !!commit };
    };
    var res = commit ? withLock_(function () { return idempotent_(batchId, run); }) : run();
    res.stats = stats_(); // 통계를 같이 보내서 화면이 따로 묻지 않아도 되게 (요청 수 절약)
    return res;
  });
}

function genInput_(p) {
  p = p && typeof p === 'object' ? p : {};
  var code = clean_(p.code) || ALLOWED_CODES[0] || '';
  var date = String(p.date || '').replace(/\D/g, '');
  if (date.length === 8) date = date.slice(2);
  var type = clean_(p.type) || 'A';
  var probe = parseBarcode_(buildBarcode_(code, date, type, 1));
  if (!probe.ok) throw userError_(probe.reason);
  return { code: code, date: date, type: type, probe: probe };
}

/** 그 날짜·구분에서 가장 큰 본호 (그 달 시트만 읽음) */
function lastSerial_(idx, probe) {
  var prefix = groupPrefix_(probe), max = 0, map = idx.get(monthOf_(probe));
  for (var k in map) {
    if (k.length === prefix.length + 5 && k.indexOf(prefix) === 0) max = Math.max(max, +k.slice(-5));
  }
  return max;
}

/** 다음 사용 가능 본호. start 가 비어 있으면 "그 날짜·구분의 마지막 본호 + 1" 부터 찾습니다. (새 날짜면 00001) */
function nextAvailable(token, p) {
  return api_(token, function () {
    var g = genInput_(p), idx = newIndex_();
    var map = idx.get(monthOf_(g.probe));
    var last = lastSerial_(idx, g.probe);
    var n = p.start ? Math.max(1, parseInt(p.start, 10) || 1) : last + 1;
    while (n <= SERIAL_MAX && map[keyOfCell_(buildBarcode_(g.code, g.date, g.type, n))]) n++;
    if (n > SERIAL_MAX) return null;
    return { n: n, last: last, group: groupLabel_(g.probe), barcode: buildBarcode_(g.code, g.date, g.type, n) };
  }, true);
}

/**
 * 연속 발번: 고정번호 + 날짜 + 구분 + 본호.
 * start 가 비어 있으면 그 날짜·구분의 마지막 본호 다음부터, 이미 쓰인 본호는 건너뜁니다.
 * commit=false 이면 미리보기만 합니다.
 */
function generateSerials(token, p, meta, commit, batchId) {
  return api_(token, function (user) {
    var g = genInput_(p);
    var count = Math.min(MAX_BATCH, Math.max(1, parseInt(p.count, 10) || 1));
    var m = cleanMeta_(meta, user);
    if (!m.note) m.note = '연속발번';
    var run = function () {
      var idx = newIndex_(), map = idx.get(monthOf_(g.probe));
      var n = p.start ? Math.max(1, parseInt(p.start, 10) || 1) : lastSerial_(idx, g.probe) + 1;
      var list = [], skipped = 0;
      while (list.length < count && n <= SERIAL_MAX) {
        var parsed = parseBarcode_(buildBarcode_(g.code, g.date, g.type, n));
        if (map[dupKey_(parsed)]) skipped++; else list.push(parsed);
        n++;
      }
      if (commit) commit_(list, m);
      return {
        list: list.map(function (x) { return x.barcode; }), skipped: skipped,
        short: list.length < count, next: n, committed: !!commit
      };
    };
    return commit ? withLock_(function () { return idempotent_(batchId, run); }) : run();
  }, true);
}

/** 통계 + 최근 10건 (시트를 읽지 않고 적어 둔 값만 사용 → 항상 빠름) */
function stats_() {
  var today = today_(), recent = getJson_('recent', []);
  return {
    total: +pget_('total') || 0, today: +pget_('day:' + today) || 0, blocked: +pget_('blk:' + today) || 0,
    recent: recent, lastSerial: recent.length ? recent[0].serial : '-',
    lastGroup: recent.length ? recent[0].date + ' ' + recent[0].type : '', serverDate: today
  };
}

/** 화면 첫 표시·1분마다 연결 확인용 */
function getDashboard(token) {
  return api_(token, function (user) {
    var s = stats_();
    s.role = user.role;
    if (user.role === 'admin') {
      var files = getJson_('files', []);
      s.url = files.length ? files[0].url : '';
      s.codes = ALLOWED_CODES;
    }
    return s;
  });
}

/** 관리자 화면: 주소·저장 파일·최근 자동 점검 결과 */
function getAdminInfo(token) {
  return api_(token, function () {
    return { links: links_(), files: getJson_('files', []), lastCheck: getJson_('lastCheck', null), checkHour: CHECK_HOUR };
  }, true);
}

/** 작업자용 주소 바꾸기 (주소가 외부로 샌 경우). 기존 작업자 화면은 즉시 막힘. */
function rotateWorkerKey(token) {
  return api_(token, function () {
    return withLock_(function () {
      pset_('workerKey', newKey_());
      return links_();
    });
  }, true);
}

/** 관리자 화면에서 지금 점검 */
function runCheck(token) {
  return api_(token, function () { return check_(); }, true);
}

/**
 * 이력 조회 (최근 것부터 최대 200건).
 * 검색어가 바코드 앞 10자리 이상이면 그 달 시트만 찾아서 빠릅니다.
 * 검색어가 없으면 최근 등록 순으로 보여줍니다.
 */
function searchRecords(token, q, item) {
  return api_(token, function () {
    var raw = String(q || '').trim().slice(0, 40), key = clean_(raw);
    item = ITEMS.indexOf(item) >= 0 ? item : '';
    var months = getJson_('months', []).slice().reverse();
    if (/^[A-Z0-9]{6}\d{4}/.test(key)) months = months.filter(function (mo) { return mo === key.slice(6, 10); });
    var out = [], started = Date.now(), timedOut = false, missing = [];
    var push = function (r, sheetName, rowNo) {
      if (!String(r[0]).trim()) return;
      if (item && r[4] !== item) return;
      out.push(rowToRecord_(r, sheetName, rowNo));
    };

    outer:
    for (var i = 0; i < months.length; i++) {
      var refs = parts_(months[i]).slice().reverse();
      for (var j = 0; j < refs.length; j++) {
        var sh = null;
        try { sh = sheetOf_(refs[j]); } catch (e) { sh = null; }
        if (!sh) { missing.push(refs[j].s); continue; }
        var last = sh.getLastRow();
        if (last < 2) continue;
        if (!raw) {
          var n = Math.min(last - 1, 1000);
          var vals = sh.getRange(last - n + 1, 1, n, HEADERS.length).getValues();
          for (var a = n - 1; a >= 0 && out.length < SEARCH_LIMIT; a--) push(vals[a], refs[j].s, last - n + 1 + a);
        } else {
          var found = sh.getRange(2, 1, last - 1, HEADERS.length).createTextFinder(raw).matchCase(false).findAll();
          var seen = {}, rows = [];
          found.forEach(function (rg) { var rn = rg.getRow(); if (!seen[rn]) { seen[rn] = 1; rows.push(rn); } });
          rows.sort(function (x, y) { return y - x; });
          for (var b = 0; b < rows.length && out.length < SEARCH_LIMIT; b++) {
            push(sh.getRange(rows[b], 1, 1, HEADERS.length).getValues()[0], refs[j].s, rows[b]);
          }
        }
        if (out.length >= SEARCH_LIMIT) break outer;
        if (Date.now() - started > SEARCH_TIME_MS) { timedOut = true; break outer; }
      }
    }
    return { total: out.length, more: out.length >= SEARCH_LIMIT || timedOut, missing: missing, rows: out };
  }, true);
}

// ===== 자동 점검 (매일 새벽 + 관리자 화면 + 시트 메뉴) =====

/** 매일 자동 실행 (예약된 트리거에서만 실행되도록 확인) */
function nightlyCheck(e) {
  var uid = e && e.triggerUid ? String(e.triggerUid) : '';
  if (!uid || uid !== props_().getProperty('checkTrigger')) throw new Error('예약 실행 전용입니다.');
  check_();
}

/** 시트 메뉴: 지금 점검 */
function checkNow() {
  requireUi_();
  var r = check_();
  ui_(r.summary);
}

/** 시트 메뉴: 주소 보기 */
function showLinks() {
  requireUi_();
  ensureSetup_();
  pflush_();
  if (!pget_('adminKey')) { ui_('아직 웹앱을 한 번도 열지 않았습니다. [배포] 후 웹앱 주소를 한 번 열면 주소가 만들어집니다.'); return; }
  var l = links_();
  ui_('작업자용 주소 (작업 PC 즐겨찾기):\n' + l.worker + '\n\n관리자용 주소 (본인만):\n' + l.admin);
}

/**
 * 점검: 모든 DB 시트의 중복·형식오류·사라진 시트를 찾고 통계를 다시 계산합니다.
 * 결과는 [자동점검] 시트에 한 줄씩 남기고, 문제가 있으면 소유자에게 메일을 보냅니다.
 */
function check_() {
  ensureSetup_();
  var started = Date.now(), dups = [], bad = [], missing = [], total = 0, todayCount = 0, stopped = false;
  var today = today_(), months = getJson_('months', []);
  for (var i = 0; i < months.length && !stopped; i++) {
    var first = {};
    parts_(months[i]).forEach(function (ref) {
      if (stopped) return;
      var sh = null;
      try { sh = sheetOf_(ref); } catch (e) { sh = null; }
      if (!sh) { missing.push(ref.s); return; }
      var n = sh.getLastRow() - 1;
      if (n < 1) return;
      var colA = sh.getRange(2, 1, n, 1).getValues();
      var colI = sh.getRange(2, COL_CREATED + 1, n, 1).getValues();
      for (var k = 0; k < n; k++) {
        var v = colA[k][0];
        if (!String(v).trim()) continue;
        total++;
        if (fmt_(colI[k][0]).indexOf(today) === 0) todayCount++;
        var where = ref.s + ' ' + (k + 2) + '행';
        var p = parseBarcode_(v);
        if (!p.ok && !/^날짜 확인 필요/.test(p.reason)) { bad.push(where + ' ' + v + ' : ' + p.reason); continue; }
        var key = keyOfCell_(v);
        if (first[key]) dups.push(key + ' (' + first[key] + ' / ' + where + ')');
        else first[key] = where;
      }
      if (Date.now() - started > MAINT_TIME_MS) stopped = true;
    });
  }

  var ok = !dups.length && !bad.length && !missing.length;
  var summary = (stopped ? '⚠ 시간 제한으로 중간까지만 점검했습니다.\n' : '') +
    '총 ' + total.toLocaleString() + '건 · 오늘 ' + todayCount + '건\n' +
    (missing.length ? '⛔ 사라진 DB 시트: ' + missing.join(', ') + ' — 복구 전까지 해당 달 등록이 멈춥니다.\n' : '') +
    (dups.length ? '⛔ 중복 ' + dups.length + '건:\n' + dups.slice(0, 30).join('\n') + '\n' : '중복 없음 ✅\n') +
    (bad.length ? '⚠ 형식 오류 ' + bad.length + '건:\n' + bad.slice(0, 20).join('\n') + '\n' : '형식 오류 없음 ✅\n');

  var lock = LockService.getScriptLock();
  if (lock.tryLock(LOCK_WAIT_MS)) {
    try {
      preload_();
      if (!stopped) { pset_('total', total); pset_('day:' + today, todayCount); }
      setJson_('lastCheck', { at: fmt_(new Date()), ok: ok && !stopped, total: total, dups: dups.length, bad: bad.length, missing: missing, stopped: stopped });
      writeCheckRow_([new Date(), total, todayCount, dups.length, bad.length, missing.join(', '), ok ? '정상' : '확인 필요']);
      pflush_();
    } finally {
      lock.releaseLock();
    }
  }
  if (!ok && CHECK_MAIL) {
    try {
      MailApp.sendEmail(Session.getEffectiveUser().getEmail(), '[시리얼 관리] 자동 점검: 확인 필요', summary + '\n' + (links_().admin || ''));
    } catch (e) { console.error('메일 발송 실패: ' + e); }
  }
  return { ok: ok, stopped: stopped, total: total, today: todayCount, dups: dups, bad: bad, missing: missing, summary: summary };
}

function writeCheckRow_(row) {
  try {
    var ss = file_(pget_('mainFile'));
    var sh = ss.getSheetByName(CHECK_SHEET) || newSheet_(ss, CHECK_SHEET, CHECK_HEADERS);
    var start = sh.getLastRow() + 1;
    ensureRows_(ss, sh, start);
    sh.getRange(start, 1, 1, CHECK_HEADERS.length).setValues([row]);
  } catch (e) { console.error('점검 기록 실패: ' + e); }
}
