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
 * ===== 100만 건 이상 대비 구조 =====
 *  - 바코드 날짜의 "월" 별로 시트를 나눕니다: DB_2606, DB_2607 ...
 *    중복은 같은 날짜 안에서만 생기므로 스캔 때는 그 달 시트의 바코드 열 하나만 읽습니다.
 *    → 전체가 100만 건이어도 스캔 속도는 그 달 건수에만 비례합니다.
 *  - 구글 시트 한 파일은 1,000만 칸이 한도입니다. 800만 칸에 가까워지면
 *    "하이닉스 시리얼 DB (2)" 같은 새 파일을 자동으로 만들어 이어서 기록합니다.
 *  - 총 건수·오늘 등록·최근 10건 같은 통계는 스크립트 속성에 따로 적어 두어 시트를 읽지 않습니다.
 *  - 중복 차단 기록은 시도한 달별로 "로그_2609" 시트에 남습니다.
 *
 * 모든 등록은 LockService 로 잠근 뒤 처리하므로
 * 여러 PC에서 동시에 같은 번호를 등록해도 한 건만 들어갑니다.
 */

// ===== 설정 =====
// 허용할 고정번호 목록. 품목별로 고정번호가 다르면 여기에 추가하세요. 빈 배열([])이면 영문/숫자 6자리 아무거나 허용.
var ALLOWED_CODES = ['BX3812'];
// 중복 판정 범위
//   'DATE_TYPE_SERIAL' : 고정번호 + 날짜 + 구분(A/B)이 같을 때 본호 중복 금지. A/B 가 번호를 따로 씀 (기본, 현재 운영 규칙)
//   'DATE_SERIAL'      : 고정번호 + 날짜가 같을 때 본호 중복 금지. A/B 가 번호를 같이 쓰는 경우
var DUP_SCOPE = 'DATE_TYPE_SERIAL';

var TYPE_NAMES = { A: '노멀', B: '비드' };
var SERIAL_MAX = 99999;
var PART_PREFIX = 'DB_';
var LOG_PREFIX = '로그_';
var HEADERS = ['바코드', '날짜', '구분', '본호', '품목', 'LOT/PO', '작업자', '비고', '등록일시'];
var COL_CREATED = 8; // HEADERS 안에서 '등록일시' 위치 (0부터)
var LOG_HEADERS = ['입력값', '사유', '시도일시', '작업자', '기존 바코드', '기존 위치'];
var ITEMS = ['Magazine', 'Cassette', 'Ring', 'Pin Boat', '기타'];
var TZ = 'Asia/Seoul';
var LOCK_WAIT_MS = 30000;
var MAX_BATCH = 5000;
var CELL_LIMIT = 8000000;   // 파일 한 개에 쓸 최대 칸 수 (구글 한도 1,000만 칸에서 여유를 둠)
var GROW_ROWS = 2000;       // 시트가 꽉 차면 한 번에 늘리는 줄 수
var SEARCH_LIMIT = 200;     // 이력 조회 최대 표시 건수
var SEARCH_TIME_MS = 20000; // 이력 조회 최대 소요 시간
var MAINT_TIME_MS = 5 * 60 * 1000; // 메뉴 작업(중복 검사·통계 재계산) 최대 소요 시간

// ===== 웹앱 진입점 =====
function doGet() {
  ensureSetup_();
  // 설치용 한 파일 버전은 화면(HTML)이 INDEX_HTML 상수로 들어 있습니다.
  var out = typeof INDEX_HTML !== 'undefined'
    ? HtmlService.createHtmlOutput(INDEX_HTML)
    : HtmlService.createHtmlOutputFromFile('Index');
  return out
    .setTitle('시리얼 중복 관리')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 시트를 열면 상단에 메뉴 추가
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('시리얼 관리')
    .addItem('시트 내 중복 검사', 'auditDuplicates')
    .addItem('통계 다시 계산 (시트를 직접 고친 뒤)', 'recountStats')
    .addItem('저장 파일 목록', 'showFiles')
    .addToUi();
}

function setup() {
  ensureSetup_();
  try { SpreadsheetApp.getUi().alert('설정 완료! [배포 > 새 배포 > 웹 앱] 으로 화면을 배포하세요.'); } catch (e) {}
}

// ===== 스크립트 속성 (작은 설정·통계 저장소) =====
function props_() { return PropertiesService.getScriptProperties(); }
function getJson_(k, def) {
  var v = props_().getProperty(k);
  if (!v) return def;
  try { return JSON.parse(v); } catch (e) { return def; }
}
function setJson_(k, v) { props_().setProperty(k, JSON.stringify(v)); }
function addNum_(k, n) { var p = props_(); p.setProperty(k, String((+p.getProperty(k) || 0) + n)); }
function today_() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd'); }

function ensureSetup_() {
  var p = props_();
  if (!p.getProperty('mainFile')) {
    var ss = SpreadsheetApp.getActive();
    p.setProperties({ mainFile: ss.getId(), activeFile: ss.getId(), fileCount: '1' });
    setJson_('files', [{ id: ss.getId(), url: ss.getUrl(), name: ss.getName() }]);
  }
}

// ===== 파일 / 시트 관리 =====
var fileCache_ = {};
function file_(id) { return fileCache_[id] || (fileCache_[id] = SpreadsheetApp.openById(id)); }
function sheetOf_(ref) { return ref ? file_(ref.f).getSheetByName(ref.s) : null; }

/** 파일이 쓰고 있는 칸 수 (속성에 적어 두고, 모르면 한 번 계산) */
function fileCells_(ss) {
  var k = 'cells:' + ss.getId(), v = props_().getProperty(k);
  if (v) return +v;
  var n = 0;
  ss.getSheets().forEach(function (sh) { n += sh.getMaxRows() * sh.getMaxColumns(); });
  props_().setProperty(k, String(n));
  return n;
}
function addCells_(ss, n) { props_().setProperty('cells:' + ss.getId(), String(fileCells_(ss) + n)); }

/** 새 시트를 만들 파일. 지금 파일이 가득 차면 새 파일을 만들어 넘어갑니다. */
function activeFileFor_(needCells) {
  ensureSetup_();
  var p = props_();
  var ss = file_(p.getProperty('activeFile'));
  if (fileCells_(ss) + needCells <= CELL_LIMIT) return ss;
  var n = (+p.getProperty('fileCount') || 1) + 1;
  var main = file_(p.getProperty('mainFile'));
  var ns = SpreadsheetApp.create(main.getName() + ' (' + n + ')');
  fileCache_[ns.getId()] = ns;
  p.setProperties({ activeFile: ns.getId(), fileCount: String(n) });
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
  // 새 파일에 기본으로 있던 빈 '시트1' 정리
  ['시트1', 'Sheet1'].forEach(function (n) {
    var blank = ss.getSheetByName(n);
    if (blank && ss.getSheets().length > 1 && blank.getLastRow() === 0) ss.deleteSheet(blank);
  });
  props_().deleteProperty('cells:' + ss.getId()); // 다음에 다시 계산
  return sh;
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
  var sh = sheetOf_(ref);
  if (!sh) { ref = newPart_(month, values.length); sh = sheetOf_(ref); }
  var ss = file_(ref.f);
  var start = sh.getLastRow() + 1, end = start + values.length - 1;
  if (end > sh.getMaxRows() && fileCells_(ss) + (end - sh.getMaxRows() + GROW_ROWS) * sh.getMaxColumns() > CELL_LIMIT) {
    ref = newPart_(month, values.length);
    sh = sheetOf_(ref); ss = file_(ref.f);
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
  var p = parseBarcode(r[0]);
  return {
    where: sheetName + ' ' + rowNo + '행', barcode: String(r[0]), code: p.code || '',
    date: p.dateText || String(r[1]), type: p.typeName || String(r[2]), serial: p.serial || String(r[3]),
    item: r[4], lot: r[5], worker: r[6], note: r[7], createdAt: fmt_(r[COL_CREATED])
  };
}

/** 그 달 시트들의 바코드 열(A열)만 읽어 {중복키 -> 위치} 를 만듭니다. */
function loadMonth_(month) {
  var map = {};
  parts_(month).forEach(function (ref) {
    var sh = sheetOf_(ref);
    if (!sh) return;
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
  var r = sheetOf_(loc.ref).getRange(loc.row, 1, 1, HEADERS.length).getValues()[0];
  return rowToRecord_(r, loc.ref.s, loc.row);
}

/** 한 건 판정: invalid(형식오류) / dup(중복) / new(신규) */
function judge_(idx, raw) {
  var input = String(raw || '').trim();
  var p = parseBarcode(raw);
  if (!p.ok) return { status: 'invalid', input: input, parsed: p, reason: p.reason };
  var loc = idx.get(monthOf_(p))[dupKey_(p)];
  if (loc) return { status: 'dup', input: input, parsed: p, existing: recordAt_(loc), reason: groupLabel_(p) + ' 의 본호 ' + p.serial + ' 중복' };
  return { status: 'new', input: input, parsed: p };
}

// ===== 기록 =====
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
  });
  SpreadsheetApp.flush();

  var pr = props_(), all = pr.getProperties(), dayKey = 'day:' + today_();
  var upd = {};
  upd.total = String((+all.total || 0) + parsedList.length);
  upd[dayKey] = String((+all[dayKey] || 0) + parsedList.length);
  var recent = [];
  try { recent = JSON.parse(all.recent || '[]'); } catch (e) {}
  upd.recent = JSON.stringify(added.reverse().concat(recent).slice(0, 10));
  pr.setProperties(upd);
  pruneDays_(all);
}

/** 40일 지난 일별 카운터 정리 */
function pruneDays_(all) {
  var cutoff = Utilities.formatDate(new Date(Date.now() - 40 * 86400000), TZ, 'yyyy-MM-dd');
  Object.keys(all).forEach(function (k) {
    var m = /^(day|blk):(\d{4}-\d{2}-\d{2})$/.exec(k);
    if (m && m[2] < cutoff) props_().deleteProperty(k);
  });
}

function logBlocked_(entries, worker) {
  if (!entries.length) return;
  var now = new Date(), month = Utilities.formatDate(now, TZ, 'yyMM'), name = LOG_PREFIX + month;
  var ref = getJson_('log:' + month, null), sh = sheetOf_(ref), ss;
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
    return [e.input, e.reason, now, worker || '', ex.barcode || '', ex.where || ''];
  });
  var start = sh.getLastRow() + 1;
  ensureRows_(ss, sh, start + values.length - 1);
  sh.getRange(start, 1, values.length, LOG_HEADERS.length).setValues(values);
  addNum_('blk:' + today_(), values.length);
}

// ===== 화면에서 호출하는 함수 =====

/** 한 건 중복 확인 (등록하지 않음) */
function checkSerial(raw) {
  ensureSetup_();
  if (!String(raw || '').trim()) return { status: 'empty' };
  return judge_(newIndex_(), raw);
}

/** 한 건 등록. 중복·형식오류면 등록하지 않습니다. */
function registerSerial(raw, meta) {
  ensureSetup_();
  if (!String(raw || '').trim()) return { status: 'empty' };
  var m = cleanMeta_(meta);
  return withLock_(function () {
    var res = judge_(newIndex_(), raw);
    if (res.status !== 'new') { logBlocked_([res], m.worker); return res; }
    commit_([res.parsed], m);
    res.status = 'ok';
    return res;
  });
}

/**
 * 여러 건 검사 / 등록 (연속 스캔도 이 함수로 묶어서 처리).
 * 판정: new(신규) / dup(이미 등록됨) / self(보낸 목록 안에서 중복) / invalid(형식 오류)
 */
function bulkProcess(list, meta, commit) {
  ensureSetup_();
  var inputs = (list || []).map(function (s) { return String(s || '').trim(); }).filter(String);
  if (inputs.length > MAX_BATCH) throw new Error('한 번에 최대 ' + MAX_BATCH + '건까지 처리할 수 있습니다.');
  var m = cleanMeta_(meta);
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
  return commit ? withLock_(run) : run();
}

function genInput_(p) {
  var code = clean_(p.code) || ALLOWED_CODES[0] || '';
  var date = String(p.date || '').replace(/\D/g, '');
  if (date.length === 8) date = date.slice(2);
  var type = clean_(p.type) || 'A';
  var probe = parseBarcode(buildBarcode_(code, date, type, 1));
  if (!probe.ok) throw new Error(probe.reason);
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
function nextAvailable(p) {
  ensureSetup_();
  var g = genInput_(p), idx = newIndex_();
  var map = idx.get(monthOf_(g.probe));
  var last = lastSerial_(idx, g.probe);
  var n = p.start ? Math.max(1, parseInt(p.start, 10) || 1) : last + 1;
  while (n <= SERIAL_MAX && map[keyOfCell_(buildBarcode_(g.code, g.date, g.type, n))]) n++;
  if (n > SERIAL_MAX) return null;
  return { n: n, last: last, group: groupLabel_(g.probe), barcode: buildBarcode_(g.code, g.date, g.type, n) };
}

/**
 * 연속 발번: 고정번호 + 날짜 + 구분 + 본호.
 * start 가 비어 있으면 그 날짜·구분의 마지막 본호 다음부터, 이미 쓰인 본호는 건너뜁니다.
 * commit=false 이면 미리보기만 합니다.
 */
function generateSerials(p, meta, commit) {
  ensureSetup_();
  var g = genInput_(p);
  var count = Math.min(MAX_BATCH, Math.max(1, parseInt(p.count, 10) || 1));
  var m = cleanMeta_(meta);
  if (!m.note) m.note = '연속발번';

  var run = function () {
    var idx = newIndex_(), map = idx.get(monthOf_(g.probe));
    var n = p.start ? Math.max(1, parseInt(p.start, 10) || 1) : lastSerial_(idx, g.probe) + 1;
    var list = [], skipped = 0;
    while (list.length < count && n <= SERIAL_MAX) {
      var parsed = parseBarcode(buildBarcode_(g.code, g.date, g.type, n));
      if (map[dupKey_(parsed)]) skipped++; else list.push(parsed);
      n++;
    }
    if (commit) commit_(list, m);
    return {
      list: list.map(function (x) { return x.barcode; }), skipped: skipped,
      short: list.length < count, next: n, committed: !!commit
    };
  };
  return commit ? withLock_(run) : run();
}

/** 첫 화면용: 통계 + 최근 10건 (시트를 읽지 않고 적어 둔 값만 사용 → 항상 빠름) */
function getDashboard() {
  ensureSetup_();
  var all = props_().getProperties(), today = today_();
  var recent = [];
  try { recent = JSON.parse(all.recent || '[]'); } catch (e) {}
  var files = [];
  try { files = JSON.parse(all.files || '[]'); } catch (e) {}
  return {
    total: +all.total || 0, today: +all['day:' + today] || 0, blocked: +all['blk:' + today] || 0, recent: recent,
    lastSerial: recent.length ? recent[0].serial : '-',
    lastGroup: recent.length ? recent[0].date + ' ' + recent[0].type : '',
    files: files, codes: ALLOWED_CODES, scope: DUP_SCOPE,
    url: files.length ? files[0].url : SpreadsheetApp.getActive().getUrl()
  };
}

/**
 * 이력 조회 (최근 것부터 최대 200건).
 * 검색어가 바코드 앞 10자리 이상이면 그 달 시트만 찾아서 빠릅니다.
 * 검색어가 없으면 최근 등록 순으로 보여줍니다.
 */
function searchRecords(q, item) {
  ensureSetup_();
  var raw = String(q || '').trim(), key = clean_(raw);
  var months = getJson_('months', []).slice().reverse();
  if (/^[A-Z0-9]{6}\d{4}/.test(key)) months = months.filter(function (mo) { return mo === key.slice(6, 10); });
  var out = [], started = Date.now(), timedOut = false;
  var push = function (r, sheetName, rowNo) {
    if (!String(r[0]).trim()) return;
    if (item && r[4] !== item) return;
    out.push(rowToRecord_(r, sheetName, rowNo));
  };

  outer:
  for (var i = 0; i < months.length; i++) {
    var refs = parts_(months[i]).slice().reverse();
    for (var j = 0; j < refs.length; j++) {
      var sh = sheetOf_(refs[j]);
      if (!sh) continue;
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
  return { total: out.length, more: out.length >= SEARCH_LIMIT || timedOut, rows: out };
}

// ===== 시트 메뉴 (관리용) =====

/** 시트에 직접 입력하다 생긴 중복·형식오류를 달별로 찾아 알려줍니다 */
function auditDuplicates() {
  ensureSetup_();
  var started = Date.now(), dups = [], bad = [], checked = 0, stopped = false;
  var months = getJson_('months', []);
  for (var i = 0; i < months.length; i++) {
    if (Date.now() - started > MAINT_TIME_MS) { stopped = true; break; }
    var first = {};
    parts_(months[i]).forEach(function (ref) {
      var sh = sheetOf_(ref);
      if (!sh || sh.getLastRow() < 2) return;
      var col = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
      col.forEach(function (r, k) {
        if (!String(r[0]).trim()) return;
        checked++;
        var where = ref.s + ' ' + (k + 2) + '행';
        var p = parseBarcode(r[0]);
        if (!p.ok) { bad.push(where + ' ' + r[0] + ' : ' + p.reason); return; }
        var key = dupKey_(p);
        if (first[key]) dups.push(groupLabel_(p) + ' 본호 ' + p.serial + ' (' + first[key] + ' / ' + where + ')');
        else first[key] = where;
      });
    });
  }
  var msg = checked.toLocaleString() + '건 검사' + (stopped ? ' (시간 제한으로 중간까지만)' : '') + '\n\n' +
    (dups.length ? '중복 ' + dups.length + '건:\n' + dups.slice(0, 40).join('\n') : '중복 없음 ✅') + '\n\n' +
    (bad.length ? '형식 오류 ' + bad.length + '건:\n' + bad.slice(0, 20).join('\n') : '형식 오류 없음 ✅');
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) { Logger.log(msg); }
  return { checked: checked, dups: dups, bad: bad, stopped: stopped };
}

/** 시트를 직접 고친 뒤 총 건수·오늘 등록 수를 다시 계산합니다 */
function recountStats() {
  ensureSetup_();
  var started = Date.now(), total = 0, todayCount = 0, today = today_(), stopped = false;
  var months = getJson_('months', []);
  for (var i = 0; i < months.length && !stopped; i++) {
    parts_(months[i]).forEach(function (ref) {
      if (stopped) return;
      var sh = sheetOf_(ref);
      if (!sh || sh.getLastRow() < 2) return;
      var vals = sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues();
      vals.forEach(function (r) {
        if (!String(r[0]).trim()) return;
        total++;
        if (fmt_(r[COL_CREATED]).indexOf(today) === 0) todayCount++;
      });
      if (Date.now() - started > MAINT_TIME_MS) stopped = true;
    });
  }
  if (!stopped) {
    var upd = { total: String(total) };
    upd['day:' + today] = String(todayCount);
    props_().setProperties(upd);
  }
  var msg = stopped ? '시간 제한으로 중단되었습니다. 다시 실행해 주세요.' : '총 ' + total.toLocaleString() + '건 / 오늘 ' + todayCount + '건으로 다시 계산했습니다.';
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) { Logger.log(msg); }
  return { total: total, today: todayCount, stopped: stopped };
}

/** 데이터가 저장된 파일 목록 */
function showFiles() {
  ensureSetup_();
  var files = getJson_('files', []);
  var msg = files.map(function (f, i) { return (i + 1) + '. ' + f.name + '\n   ' + f.url; }).join('\n\n');
  try { SpreadsheetApp.getUi().alert('저장 파일 ' + files.length + '개\n\n' + msg); } catch (e) { Logger.log(msg); }
  return files;
}
