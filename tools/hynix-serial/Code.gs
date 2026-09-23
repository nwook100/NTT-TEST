/**
 * 하이닉스 시리얼 본호 중복 관리 - Google Apps Script 서버 코드
 *
 * 구글 시트를 DB로 사용합니다.
 *  - [시리얼DB]   : 등록된 시리얼 (A열 = 시리얼, 이 열 기준으로 중복 판정)
 *  - [중복차단로그] : 중복으로 막힌 시도 기록
 *
 * 모든 등록은 LockService 로 잠근 뒤 처리하므로
 * 여러 PC에서 동시에 같은 번호를 등록해도 한 건만 들어갑니다.
 */

// ===== 설정 =====
var DB_SHEET = '시리얼DB';
var LOG_SHEET = '중복차단로그';
var HEADERS = ['시리얼', '품목', 'LOT/PO', '작업자', '비고', '등록일시', '등록계정'];
var LOG_HEADERS = ['시리얼', '시도일시', '작업자', '기존 등록일시', '기존 LOT/PO'];
var ITEMS = ['Magazine', 'Cassette', 'Ring', 'Pin Boat', '기타'];
// true 이면 "HX-0001" 과 "HX0001" 을 같은 번호로 봅니다 (공백·대소문자는 항상 무시)
var IGNORE_HYPHEN = true;
var LOCK_WAIT_MS = 20000;
var MAX_BATCH = 5000;

// ===== 웹앱 진입점 =====
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('시리얼 중복 관리')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 시트를 열면 상단에 메뉴 추가
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('시리얼 관리')
    .addItem('초기 설정 (처음 1회)', 'setup')
    .addItem('시트 내 중복 검사', 'auditDuplicates')
    .addToUi();
}

// ===== 초기 설정 =====
function setup() {
  var ss = SpreadsheetApp.getActive();
  var db = ss.getSheetByName(DB_SHEET) || ss.insertSheet(DB_SHEET);
  if (db.getLastRow() === 0) db.appendRow(HEADERS);
  db.setFrozenRows(1);
  db.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#f1f3f4');
  // 시리얼 열은 텍스트 서식 (앞자리 0 보존)
  db.getRange('A:A').setNumberFormat('@');
  db.getRange('F:F').setNumberFormat('yyyy-mm-dd hh:mm:ss');

  // 시트에 직접 입력했을 때도 중복이 빨갛게 보이도록 조건부 서식
  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($A2<>"",COUNTIF($A:$A,$A2)>1)')
    .setBackground('#f8d7da').setFontColor('#a50e0e')
    .setRanges([db.getRange('A2:G')])
    .build();
  db.setConditionalFormatRules([rule]);

  var log = ss.getSheetByName(LOG_SHEET) || ss.insertSheet(LOG_SHEET);
  if (log.getLastRow() === 0) log.appendRow(LOG_HEADERS);
  log.setFrozenRows(1);
  log.getRange(1, 1, 1, LOG_HEADERS.length).setFontWeight('bold').setBackground('#f1f3f4');
  log.getRange('A:A').setNumberFormat('@');

  try { SpreadsheetApp.getUi().alert('설정 완료! [배포 > 새 배포 > 웹 앱] 으로 화면을 배포하세요.'); } catch (e) {}
}

// ===== 내부 유틸 =====
function normalize_(serial) {
  var k = String(serial == null ? '' : serial).trim().toUpperCase().replace(/\s+/g, '');
  if (IGNORE_HYPHEN) k = k.replace(/-/g, '');
  return k;
}

function dbSheet_() {
  var sh = SpreadsheetApp.getActive().getSheetByName(DB_SHEET);
  if (!sh) throw new Error('[' + DB_SHEET + '] 시트가 없습니다. 시트 메뉴 [시리얼 관리 > 초기 설정] 을 먼저 실행하세요.');
  return sh;
}

function fmt_(d) {
  if (!(d instanceof Date)) return d ? String(d) : '';
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

function rowToRecord_(r, rowNo) {
  return { row: rowNo, serial: String(r[0]), item: r[1], lot: r[2], worker: r[3], note: r[4], createdAt: fmt_(r[5]) };
}

/** 시트 전체를 읽어 {정규화키 -> 기록} 맵을 만듭니다. */
function readIndex_() {
  var sh = dbSheet_();
  var last = sh.getLastRow();
  var map = {};
  if (last < 2) return { sheet: sh, map: map, rows: [] };
  var rows = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  for (var i = 0; i < rows.length; i++) {
    var k = normalize_(rows[i][0]);
    if (k && !map[k]) map[k] = rowToRecord_(rows[i], i + 2);
  }
  return { sheet: sh, map: map, rows: rows };
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(LOCK_WAIT_MS)) throw new Error('다른 PC에서 등록 중입니다. 잠시 후 다시 시도하세요.');
  try { return fn(); } finally { lock.releaseLock(); }
}

function cleanMeta_(m) {
  m = m || {};
  return {
    item: ITEMS.indexOf(m.item) >= 0 ? m.item : '기타',
    lot: String(m.lot || '').trim(),
    worker: String(m.worker || '').trim(),
    note: String(m.note || '').trim()
  };
}

function appendRecords_(sh, serials, meta) {
  if (!serials.length) return;
  var now = new Date();
  var email = '';
  try { email = Session.getActiveUser().getEmail(); } catch (e) {}
  var values = serials.map(function (s) { return [s, meta.item, meta.lot, meta.worker, meta.note, now, email]; });
  var start = sh.getLastRow() + 1;
  sh.getRange(start, 1, values.length, 1).setNumberFormat('@');
  sh.getRange(start, 1, values.length, HEADERS.length).setValues(values);
  SpreadsheetApp.flush();
}

function logBlocked_(entries, worker) {
  if (!entries.length) return;
  var log = SpreadsheetApp.getActive().getSheetByName(LOG_SHEET);
  if (!log) return;
  var now = new Date();
  var values = entries.map(function (e) { return [e.serial, now, worker || '', e.existing.createdAt, e.existing.lot]; });
  var start = log.getLastRow() + 1;
  log.getRange(start, 1, values.length, 1).setNumberFormat('@');
  log.getRange(start, 1, values.length, LOG_HEADERS.length).setValues(values);
}

// ===== 화면에서 호출하는 함수 =====

/** 한 건 중복 확인 (등록하지 않음) */
function checkSerial(serial) {
  var s = String(serial || '').trim();
  if (!s) return { status: 'empty' };
  var hit = readIndex_().map[normalize_(s)];
  return hit ? { status: 'dup', serial: s, existing: hit } : { status: 'new', serial: s };
}

/** 한 건 등록. 중복이면 등록하지 않고 기존 기록을 돌려줍니다. */
function registerSerial(serial, meta) {
  var s = String(serial || '').trim();
  if (!s) return { status: 'empty' };
  var m = cleanMeta_(meta);
  return withLock_(function () {
    var idx = readIndex_();
    var hit = idx.map[normalize_(s)];
    if (hit) {
      logBlocked_([{ serial: s, existing: hit }], m.worker);
      return { status: 'dup', serial: s, existing: hit };
    }
    appendRecords_(idx.sheet, [s], m);
    return { status: 'ok', serial: s };
  });
}

/**
 * 여러 건 검사 / 등록.
 * 판정: new(신규) / dup(시트에 이미 있음) / self(붙여넣은 목록 안에서 중복)
 */
function bulkProcess(list, meta, commit) {
  var serials = (list || []).map(function (s) { return String(s || '').trim(); }).filter(String);
  if (serials.length > MAX_BATCH) throw new Error('한 번에 최대 ' + MAX_BATCH + '건까지 처리할 수 있습니다.');
  var m = cleanMeta_(meta);
  var run = function () {
    var idx = readIndex_();
    var seen = {};
    var rows = serials.map(function (s, i) {
      var k = normalize_(s);
      var row = { no: i + 1, serial: s };
      if (idx.map[k]) { row.status = 'dup'; row.existing = idx.map[k]; }
      else if (seen[k]) { row.status = 'self'; row.firstNo = seen[k]; }
      else { row.status = 'new'; }
      if (!seen[k]) seen[k] = i + 1;
      return row;
    });
    if (commit) {
      appendRecords_(idx.sheet, rows.filter(function (r) { return r.status === 'new'; }).map(function (r) { return r.serial; }), m);
    }
    return { rows: rows, committed: !!commit };
  };
  return commit ? withLock_(run) : run();
}

/**
 * 연속 발번: 접두어 + 0채움 번호. 이미 쓰인 번호는 건너뜁니다.
 * commit=false 이면 미리보기만 합니다.
 */
function generateSerials(p, meta, commit) {
  var prefix = String(p.prefix || '').trim();
  var digits = Math.min(12, Math.max(1, parseInt(p.digits, 10) || 1));
  var count = Math.min(MAX_BATCH, Math.max(1, parseInt(p.count, 10) || 1));
  var n = Math.max(0, parseInt(p.start, 10) || 0);
  var max = Math.pow(10, digits);
  var m = cleanMeta_(meta);
  if (!m.note) m.note = '연속발번';

  var run = function () {
    var idx = readIndex_();
    var list = [], skipped = 0;
    while (list.length < count && n < max) {
      var s = prefix + ('000000000000' + n).slice(-digits);
      if (idx.map[normalize_(s)]) skipped++; else list.push(s);
      n++;
    }
    if (commit) appendRecords_(idx.sheet, list, m);
    return { list: list, skipped: skipped, short: list.length < count, next: n, committed: !!commit };
  };
  return commit ? withLock_(run) : run();
}

/** 다음 사용 가능 번호 */
function nextAvailable(p) {
  var prefix = String(p.prefix || '').trim();
  var digits = Math.min(12, Math.max(1, parseInt(p.digits, 10) || 1));
  var n = Math.max(0, parseInt(p.start, 10) || 0);
  var max = Math.pow(10, digits);
  var map = readIndex_().map;
  while (n < max && map[normalize_(prefix + ('000000000000' + n).slice(-digits))]) n++;
  return n < max ? { n: n, serial: prefix + ('000000000000' + n).slice(-digits) } : null;
}

/** 첫 화면용: 통계 + 최근 10건 */
function getDashboard() {
  var idx = readIndex_();
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var todayCount = 0;
  idx.rows.forEach(function (r) { if (fmt_(r[5]).indexOf(today) === 0) todayCount++; });

  var blocked = 0;
  var log = SpreadsheetApp.getActive().getSheetByName(LOG_SHEET);
  if (log && log.getLastRow() > 1) {
    log.getRange(2, 2, log.getLastRow() - 1, 1).getValues().forEach(function (r) {
      if (fmt_(r[0]).indexOf(today) === 0) blocked++;
    });
  }
  var recent = [];
  for (var i = idx.rows.length - 1; i >= 0 && recent.length < 10; i--) {
    if (String(idx.rows[i][0]).trim()) recent.push(rowToRecord_(idx.rows[i], i + 2));
  }
  return { total: Object.keys(idx.map).length, today: todayCount, blocked: blocked, recent: recent, url: SpreadsheetApp.getActive().getUrl() };
}

/** 이력 검색 (최근 500건) */
function searchRecords(q, item) {
  q = String(q || '').trim().toUpperCase();
  var rows = readIndex_().rows, out = [], matched = 0;
  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    if (!String(r[0]).trim()) continue;
    if (item && r[1] !== item) continue;
    if (q && (r[0] + ' ' + r[2] + ' ' + r[3]).toUpperCase().indexOf(q) < 0) continue;
    matched++;
    if (out.length < 500) out.push(rowToRecord_(r, i + 2));
  }
  return { total: matched, rows: out };
}

/** 시트에 직접 입력하다 생긴 중복을 찾아 알려줍니다 (메뉴에서 실행) */
function auditDuplicates() {
  var rows = readIndex_().rows, first = {}, dups = [];
  rows.forEach(function (r, i) {
    var k = normalize_(r[0]);
    if (!k) return;
    if (first[k]) dups.push(r[0] + ' (' + first[k] + '행 / ' + (i + 2) + '행)');
    else first[k] = i + 2;
  });
  var msg = dups.length ? '중복 ' + dups.length + '건 발견:\n' + dups.slice(0, 50).join('\n') : '중복이 없습니다. ✅';
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) { Logger.log(msg); }
  return dups;
}
