/**
 * 하이닉스 시리얼 본호 중복 관리 - Google Apps Script 서버 코드
 *
 * 바코드 형식 (18자리):  BX3812 260630 B 02051
 *   고정번호(6) + 날짜 YYMMDD(6) + 구분(A=노멀, B=비드)(1) + 본호(5)
 *
 * 중복 판정은 "본호" 기준입니다. 날짜나 A/B 가 달라도 본호가 같으면 중복으로 막습니다.
 *
 * 구글 시트를 DB로 사용합니다.
 *  - [시리얼DB]     : 등록된 바코드
 *  - [중복차단로그] : 중복·형식오류로 막힌 시도 기록
 *
 * 모든 등록은 LockService 로 잠근 뒤 처리하므로
 * 여러 PC에서 동시에 같은 번호를 등록해도 한 건만 들어갑니다.
 */

// ===== 설정 =====
// 허용할 고정번호 목록. 품목별로 고정번호가 다르면 여기에 추가하세요. 빈 배열([])이면 영문/숫자 6자리 아무거나 허용.
var ALLOWED_CODES = ['BX3812'];
// 중복 판정 범위
//   'CODE_SERIAL' : 같은 고정번호 안에서 본호가 같으면 중복 (기본, 권장)
//   'SERIAL'      : 고정번호와 상관없이 본호가 같으면 중복
//   'FULL'        : 18자리 전체가 같을 때만 중복 (날짜·구분이 다르면 같은 본호 허용)
var DUP_SCOPE = 'CODE_SERIAL';

var TYPE_NAMES = { A: '노멀', B: '비드' };
var SERIAL_MAX = 99999;
var DB_SHEET = '시리얼DB';
var LOG_SHEET = '중복차단로그';
var HEADERS = ['바코드', '고정번호', '날짜', '구분', '본호', '품목', 'LOT/PO', '작업자', '비고', '등록일시', '등록계정'];
var LOG_HEADERS = ['입력값', '사유', '시도일시', '작업자', '기존 바코드', '기존 등록일시', '기존 LOT/PO'];
var COL_CREATED = 9; // HEADERS 안에서 '등록일시' 위치 (0부터)
var ITEMS = ['Magazine', 'Cassette', 'Ring', 'Pin Boat', '기타'];
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
  // 바코드~본호 열은 텍스트 서식 (앞자리 0 보존)
  db.getRange('A:E').setNumberFormat('@');
  db.getRange('J:J').setNumberFormat('yyyy-mm-dd hh:mm:ss');

  // 시트에 직접 입력했을 때도 본호 중복이 빨갛게 보이도록 조건부 서식
  var formula = DUP_SCOPE === 'SERIAL' ? '=AND($E2<>"",COUNTIF($E:$E,$E2)>1)'
    : DUP_SCOPE === 'FULL' ? '=AND($A2<>"",COUNTIF($A:$A,$A2)>1)'
    : '=AND($E2<>"",COUNTIFS($B:$B,$B2,$E:$E,$E2)>1)';
  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(formula)
    .setBackground('#f8d7da').setFontColor('#a50e0e')
    .setRanges([db.getRange('A2:K')])
    .build();
  db.setConditionalFormatRules([rule]);

  var log = ss.getSheetByName(LOG_SHEET) || ss.insertSheet(LOG_SHEET);
  if (log.getLastRow() === 0) log.appendRow(LOG_HEADERS);
  log.setFrozenRows(1);
  log.getRange(1, 1, 1, LOG_HEADERS.length).setFontWeight('bold').setBackground('#f1f3f4');
  log.getRange('A:A').setNumberFormat('@');
  log.getRange('E:E').setNumberFormat('@');

  try { SpreadsheetApp.getUi().alert('설정 완료! [배포 > 새 배포 > 웹 앱] 으로 화면을 배포하세요.'); } catch (e) {}
}

// ===== 바코드 해석 =====
function clean_(raw) {
  return String(raw == null ? '' : raw).toUpperCase().replace(/[\s\-]/g, '');
}

/**
 * 바코드를 고정번호/날짜/구분/본호로 나눕니다.
 * 형식이 틀리면 { ok:false, reason } 을 돌려줍니다.
 */
function parseBarcode(raw) {
  var s = clean_(raw);
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

/** 중복 판정용 키 */
function dupKey_(p) {
  if (!p.ok) return 'RAW:' + p.barcode;
  if (DUP_SCOPE === 'SERIAL') return p.serial;
  if (DUP_SCOPE === 'FULL') return p.barcode;
  return p.code + ':' + p.serial;
}

// ===== 내부 유틸 =====
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
  var p = parseBarcode(r[0]);
  return {
    row: rowNo, barcode: String(r[0]), code: p.code || String(r[1]), date: p.dateText || String(r[2]),
    type: p.typeName || String(r[3]), serial: p.serial || String(r[4]),
    item: r[5], lot: r[6], worker: r[7], note: r[8], createdAt: fmt_(r[COL_CREATED])
  };
}

/** 시트 전체를 읽어 {중복키 -> 기록} 맵과 고정번호별 최대 본호를 만듭니다. */
function readIndex_() {
  var sh = dbSheet_();
  var last = sh.getLastRow();
  var map = {}, maxSerial = {}, rows = [];
  if (last >= 2) rows = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  for (var i = 0; i < rows.length; i++) {
    if (!String(rows[i][0]).trim()) continue;
    var p = parseBarcode(rows[i][0]);
    var k = dupKey_(p);
    if (!map[k]) map[k] = rowToRecord_(rows[i], i + 2);
    if (p.ok) {
      var mk = DUP_SCOPE === 'SERIAL' ? '*' : p.code;
      maxSerial[mk] = Math.max(maxSerial[mk] || 0, +p.serial);
    }
  }
  return { sheet: sh, map: map, rows: rows, maxSerial: maxSerial };
}

function lastSerialOf_(idx, code) {
  return idx.maxSerial[DUP_SCOPE === 'SERIAL' ? '*' : code] || 0;
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

function appendRecords_(sh, parsedList, meta) {
  if (!parsedList.length) return;
  var now = new Date();
  var email = '';
  try { email = Session.getActiveUser().getEmail(); } catch (e) {}
  var values = parsedList.map(function (p) {
    return [p.barcode, p.code, p.dateText, p.type + '(' + p.typeName + ')', p.serial,
      meta.item, meta.lot, meta.worker, meta.note, now, email];
  });
  var start = sh.getLastRow() + 1;
  sh.getRange(start, 1, values.length, 5).setNumberFormat('@');
  sh.getRange(start, 1, values.length, HEADERS.length).setValues(values);
  SpreadsheetApp.flush();
}

function logBlocked_(entries, worker) {
  if (!entries.length) return;
  var log = SpreadsheetApp.getActive().getSheetByName(LOG_SHEET);
  if (!log) return;
  var now = new Date();
  var values = entries.map(function (e) {
    var ex = e.existing || {};
    return [e.input, e.reason, now, worker || '', ex.barcode || '', ex.createdAt || '', ex.lot || ''];
  });
  var start = log.getLastRow() + 1;
  log.getRange(start, 1, values.length, LOG_HEADERS.length).setValues(values);
}

/** 한 건 판정: invalid(형식오류) / dup(중복) / new(신규) */
function judge_(idx, raw) {
  var p = parseBarcode(raw);
  if (!p.ok) return { status: 'invalid', input: String(raw || '').trim(), parsed: p, reason: p.reason };
  var hit = idx.map[dupKey_(p)];
  if (hit) return { status: 'dup', input: String(raw).trim(), parsed: p, existing: hit, reason: '본호 ' + p.serial + ' 중복' };
  return { status: 'new', input: String(raw).trim(), parsed: p };
}

// ===== 화면에서 호출하는 함수 =====

/** 한 건 중복 확인 (등록하지 않음) */
function checkSerial(raw) {
  if (!String(raw || '').trim()) return { status: 'empty' };
  return judge_(readIndex_(), raw);
}

/** 한 건 등록. 중복·형식오류면 등록하지 않습니다. */
function registerSerial(raw, meta) {
  if (!String(raw || '').trim()) return { status: 'empty' };
  var m = cleanMeta_(meta);
  return withLock_(function () {
    var idx = readIndex_();
    var res = judge_(idx, raw);
    if (res.status !== 'new') {
      logBlocked_([res], m.worker);
      return res;
    }
    appendRecords_(idx.sheet, [res.parsed], m);
    res.status = 'ok';
    return res;
  });
}

/**
 * 여러 건 검사 / 등록.
 * 판정: new(신규) / dup(시트에 이미 있음) / self(붙여넣은 목록 안에서 중복) / invalid(형식 오류)
 */
function bulkProcess(list, meta, commit) {
  var inputs = (list || []).map(function (s) { return String(s || '').trim(); }).filter(String);
  if (inputs.length > MAX_BATCH) throw new Error('한 번에 최대 ' + MAX_BATCH + '건까지 처리할 수 있습니다.');
  var m = cleanMeta_(meta);
  var run = function () {
    var idx = readIndex_();
    var seen = {};
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
      appendRecords_(idx.sheet, rows.filter(function (r) { return r.status === 'new'; }).map(function (r) { return r.parsed; }), m);
      logBlocked_(rows.filter(function (r) { return r.status !== 'new'; }), m.worker);
    }
    return { rows: rows, committed: !!commit };
  };
  return commit ? withLock_(run) : run();
}

function genInput_(p) {
  var code = clean_(p.code) || ALLOWED_CODES[0] || '';
  var date = String(p.date || '').replace(/\D/g, '');
  if (date.length === 8) date = date.slice(2);
  var type = clean_(p.type) || 'A';
  var probe = parseBarcode(buildBarcode_(code, date, type, 1));
  if (!probe.ok) throw new Error(probe.reason);
  return { code: code, date: date, type: type };
}

/** 다음 사용 가능 본호. start 가 비어 있으면 "마지막 본호 + 1" 부터 찾습니다. */
function nextAvailable(p) {
  var g = genInput_(p);
  var idx = readIndex_();
  var last = lastSerialOf_(idx, g.code);
  var n = p.start ? Math.max(1, parseInt(p.start, 10) || 1) : last + 1;
  while (n <= SERIAL_MAX && idx.map[dupKey_(parseBarcode(buildBarcode_(g.code, g.date, g.type, n)))]) n++;
  if (n > SERIAL_MAX) return null;
  return { n: n, last: last, barcode: buildBarcode_(g.code, g.date, g.type, n) };
}

/**
 * 연속 발번: 고정번호 + 날짜 + 구분 + 본호.
 * start 가 비어 있으면 마지막 본호 다음부터, 이미 쓰인 본호는 건너뜁니다.
 * commit=false 이면 미리보기만 합니다.
 */
function generateSerials(p, meta, commit) {
  var g = genInput_(p);
  var count = Math.min(MAX_BATCH, Math.max(1, parseInt(p.count, 10) || 1));
  var m = cleanMeta_(meta);
  if (!m.note) m.note = '연속발번';

  var run = function () {
    var idx = readIndex_();
    var n = p.start ? Math.max(1, parseInt(p.start, 10) || 1) : lastSerialOf_(idx, g.code) + 1;
    var list = [], skipped = 0;
    while (list.length < count && n <= SERIAL_MAX) {
      var parsed = parseBarcode(buildBarcode_(g.code, g.date, g.type, n));
      if (idx.map[dupKey_(parsed)]) skipped++; else list.push(parsed);
      n++;
    }
    if (commit) appendRecords_(idx.sheet, list, m);
    return {
      list: list.map(function (x) { return x.barcode; }), skipped: skipped,
      short: list.length < count, next: n, committed: !!commit
    };
  };
  return commit ? withLock_(run) : run();
}

/** 첫 화면용: 통계 + 최근 10건 + 설정값 */
function getDashboard() {
  var idx = readIndex_();
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var todayCount = 0;
  idx.rows.forEach(function (r) { if (String(r[0]).trim() && fmt_(r[COL_CREATED]).indexOf(today) === 0) todayCount++; });

  var blocked = 0;
  var log = SpreadsheetApp.getActive().getSheetByName(LOG_SHEET);
  if (log && log.getLastRow() > 1) {
    log.getRange(2, 3, log.getLastRow() - 1, 1).getValues().forEach(function (r) {
      if (fmt_(r[0]).indexOf(today) === 0) blocked++;
    });
  }
  var recent = [];
  for (var i = idx.rows.length - 1; i >= 0 && recent.length < 10; i--) {
    if (String(idx.rows[i][0]).trim()) recent.push(rowToRecord_(idx.rows[i], i + 2));
  }
  var code = ALLOWED_CODES[0] || '';
  var last = lastSerialOf_(idx, code);
  return {
    total: Object.keys(idx.map).length, today: todayCount, blocked: blocked, recent: recent,
    lastSerial: last ? ('00000' + last).slice(-5) : '-', remaining: SERIAL_MAX - last,
    codes: ALLOWED_CODES, scope: DUP_SCOPE, url: SpreadsheetApp.getActive().getUrl()
  };
}

/** 이력 검색 (최근 500건) */
function searchRecords(q, item) {
  q = clean_(q);
  var rows = readIndex_().rows, out = [], matched = 0;
  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    if (!String(r[0]).trim()) continue;
    if (item && r[5] !== item) continue;
    if (q && clean_(r[0] + ' ' + r[6] + ' ' + r[7]).indexOf(q) < 0) continue;
    matched++;
    if (out.length < 500) out.push(rowToRecord_(r, i + 2));
  }
  return { total: matched, rows: out };
}

/** 시트에 직접 입력하다 생긴 중복·형식오류를 찾아 알려줍니다 (메뉴에서 실행) */
function auditDuplicates() {
  var rows = readIndex_().rows, first = {}, dups = [], bad = [];
  rows.forEach(function (r, i) {
    if (!String(r[0]).trim()) return;
    var p = parseBarcode(r[0]);
    if (!p.ok) bad.push((i + 2) + '행 ' + r[0] + ' : ' + p.reason);
    var k = dupKey_(p);
    if (first[k]) dups.push('본호 ' + (p.serial || r[0]) + ' (' + first[k] + '행 / ' + (i + 2) + '행)');
    else first[k] = i + 2;
  });
  var msg = (dups.length ? '중복 ' + dups.length + '건:\n' + dups.slice(0, 40).join('\n') : '중복 없음 ✅') +
    '\n\n' + (bad.length ? '형식 오류 ' + bad.length + '건:\n' + bad.slice(0, 20).join('\n') : '형식 오류 없음 ✅');
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) { Logger.log(msg); }
  return { dups: dups, bad: bad };
}
