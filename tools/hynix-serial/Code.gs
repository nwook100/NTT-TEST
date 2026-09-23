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
 *  - 구글 시트 한 파일은 1,000만 칸이 한도입니다. 800만 칸에 가까워지면 새 파일을 자동으로 만들어 이어서 기록합니다.
 *  - 총 건수·오늘 등록·최근 10건 같은 통계는 스크립트 속성에 따로 적어 두어 시트를 읽지 않습니다.
 *
 * ===== 안정성 · 보안 =====
 *  - 작업자 PIN 로그인: PIN 은 시트 메뉴 [시리얼 관리 > 작업자 추가] 에서만 등록 (시트 편집자만 가능).
 *    PIN 은 해시로만 저장, 로그인 10회 연속 실패 시 10분 잠금, 로그인은 6시간 동안 사용이 없으면 만료.
 *    등록 기록의 작업자 이름은 로그인한 PIN 의 이름으로 자동 기록 (임의 입력 불가).
 *  - 관리 기능(중복 검사, 통계 재계산, 작업자 관리)은 시트 메뉴에서만 실행 가능, 웹에서 호출 차단.
 *  - DB·로그 시트는 보호되어 소유자만 직접 수정 가능 (프로그램은 소유자 권한으로 기록).
 *  - 등록되어 있던 DB 시트가 없어지면(삭제/이름변경) 중복을 놓치지 않도록 등록을 중지하고 오류를 알림.
 *  - 입력값 길이 제한, 수식 주입(=, +, -, @ 로 시작하는 글) 차단.
 *  - 같은 묶음을 다시 보내도(네트워크 재시도) 두 번 처리하지 않음 (묶음 번호로 결과 재사용).
 *  - 스크립트 속성은 요청당 1번 읽고 1번 씀 (구글 일일 사용량 한도 대비).
 *  - 모든 등록은 LockService 로 잠근 뒤 처리 → 여러 PC에서 동시에 같은 번호를 등록해도 한 건만 들어감.
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
var MAX_INPUT_LEN = 64;      // 바코드 입력 최대 길이
var CELL_LIMIT = 8000000;    // 파일 한 개에 쓸 최대 칸 수 (구글 한도 1,000만 칸에서 여유를 둠)
var GROW_ROWS = 2000;        // 시트가 꽉 차면 한 번에 늘리는 줄 수
var SEARCH_LIMIT = 200;      // 이력 조회 최대 표시 건수
var SEARCH_TIME_MS = 20000;  // 이력 조회 최대 소요 시간
var MAINT_TIME_MS = 5 * 60 * 1000; // 메뉴 작업 최대 소요 시간
var SESSION_SEC = 6 * 3600;  // 로그인 유지 (마지막 사용 후)
var LOGIN_FAIL_MAX = 10;     // 연속 실패 허용 횟수
var LOGIN_LOCK_SEC = 600;    // 초과 시 잠금 시간
var PIN_MIN = 6, PIN_MAX = 12;

// ===== 웹앱 진입점 =====
function doGet() {
  ensureSetup_();
  pflush_();
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
    .addItem('작업자 추가 / PIN 변경', 'addWorker')
    .addItem('작업자 삭제', 'removeWorker')
    .addItem('작업자 목록', 'listWorkers')
    .addSeparator()
    .addItem('시트 내 중복 검사', 'auditDuplicates')
    .addItem('통계 다시 계산 (시트를 직접 고친 뒤)', 'recountStats')
    .addItem('저장 파일 목록', 'showFiles')
    .addToUi();
}

function setup() {
  requireUi_();
  ensureSetup_();
  pflush_();
  ui_('설정 완료! 메뉴 [시리얼 관리 > 작업자 추가] 로 PIN 을 등록한 뒤 [배포 > 새 배포 > 웹 앱] 으로 배포하세요.');
}

// ===== 오류 처리 =====
/** 사용자에게 그대로 보여줄 오류 */
function userError_(msg) { var e = new Error(msg); e.userFacing = true; return e; }

/** 웹에서 호출되는 모든 함수의 공통 틀: 로그인 확인 → 실행 → 속성 저장 → 오류를 알기 쉬운 문장으로 */
function api_(token, fn) {
  try {
    var user = auth_(token);
    var result = fn(user);
    pflush_();
    return result;
  } catch (e) {
    if (e && (e.userFacing || /^AUTH:/.test(e.message))) throw e; // 예상된 거절은 기록하지 않음
    console.error((e && e.stack) || e);
    throw new Error('서버 오류: ' + ((e && e.message) || e) + ' — 잠시 후 다시 시도하고, 계속되면 관리자에게 알려주세요.');
  }
}

/** 시트 메뉴에서만 실행 가능한 관리 기능 (웹에서 호출하면 차단) */
function requireUi_() {
  try { SpreadsheetApp.getUi(); } catch (e) { throw userError_('관리 기능은 구글 시트 메뉴에서만 실행할 수 있습니다.'); }
}
function ui_(msg) { try { SpreadsheetApp.getUi().alert(msg); } catch (e) { Logger.log(msg); } }

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
  if (!pget_('salt')) pset_('salt', Utilities.getUuid());
}

// ===== 로그인 (작업자 PIN) =====
function hash_(s) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, pget_('salt') + '|' + s, Utilities.Charset.UTF_8);
  return bytes.map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
}
function workers_() { return getJson_('workers', {}); }
function cache_() { return CacheService.getScriptCache(); }

/** 로그인 확인. 실패하면 'AUTH:' 로 시작하는 오류 → 화면이 로그인 창을 띄움 */
function auth_(token) {
  ensureSetup_();
  if (!token || typeof token !== 'string' || token.length > 100) throw new Error('AUTH:로그인이 필요합니다.');
  var name = cache_().get('sess:' + token);
  if (!name) throw new Error('AUTH:로그인이 만료되었습니다. PIN 을 다시 입력하세요.');
  cache_().put('sess:' + token, name, SESSION_SEC); // 사용할 때마다 연장
  return { name: name };
}

function login(pin) {
  try {
    ensureSetup_();
    var c = cache_(), fails = +c.get('loginFail') || 0;
    if (fails >= LOGIN_FAIL_MAX) throw userError_('PIN 을 너무 많이 틀렸습니다. 10분 뒤에 다시 시도하세요.');
    if (!Object.keys(workers_()).length) throw userError_('등록된 작업자가 없습니다. 관리자가 구글 시트 메뉴 [시리얼 관리 > 작업자 추가] 에서 PIN 을 먼저 등록해야 합니다.');
    pin = String(pin || '').trim();
    var name = pin.length >= PIN_MIN && pin.length <= PIN_MAX ? workers_()[hash_(pin)] : null;
    if (!name) {
      c.put('loginFail', String(fails + 1), LOGIN_LOCK_SEC);
      var left = LOGIN_FAIL_MAX - fails - 1;
      throw userError_(left > 0 ? 'PIN 이 맞지 않습니다. (' + left + '번 더 틀리면 10분 잠금)' : 'PIN 이 맞지 않습니다. 10분 동안 로그인이 잠깁니다.');
    }
    c.remove('loginFail');
    var token = Utilities.getUuid() + Utilities.getUuid().replace(/-/g, '');
    c.put('sess:' + token, name, SESSION_SEC);
    pflush_();
    return { token: token, name: name };
  } catch (e) {
    if (e && e.userFacing) throw e;
    console.error((e && e.stack) || e);
    throw new Error('서버 오류: ' + ((e && e.message) || e));
  }
}

function logout(token) {
  if (token && typeof token === 'string' && token.length <= 100) cache_().remove('sess:' + token);
  return true;
}

// ----- 작업자 관리 (시트 메뉴 전용) -----
function addWorker() {
  requireUi_();
  ensureSetup_();
  var ui = SpreadsheetApp.getUi();
  var r1 = ui.prompt('작업자 추가 / PIN 변경', '작업자 이름을 입력하세요 (예: 김철수)', ui.ButtonSet.OK_CANCEL);
  if (r1.getSelectedButton() !== ui.Button.OK) return;
  var name = safeText_(r1.getResponseText(), 20);
  if (!name) { ui.alert('이름이 비어 있습니다.'); return; }
  var r2 = ui.prompt('PIN 설정 — ' + name, PIN_MIN + '~' + PIN_MAX + '자리 숫자 또는 영문. 다른 작업자와 겹치면 안 됩니다.', ui.ButtonSet.OK_CANCEL);
  if (r2.getSelectedButton() !== ui.Button.OK) return;
  var pin = String(r2.getResponseText() || '').trim();
  if (!/^[0-9A-Za-z]+$/.test(pin) || pin.length < PIN_MIN || pin.length > PIN_MAX) {
    ui.alert('PIN 은 ' + PIN_MIN + '~' + PIN_MAX + '자리 숫자/영문이어야 합니다.'); return;
  }
  if (/^(\d)\1+$/.test(pin) || '0123456789012'.indexOf(pin) >= 0) { ui.alert('111111, 123456 같은 쉬운 PIN 은 쓸 수 없습니다.'); return; }
  var w = workers_(), h = hash_(pin);
  if (w[h] && w[h] !== name) { ui.alert('다른 작업자가 이미 쓰는 PIN 입니다. 다른 PIN 을 정하세요.'); return; }
  Object.keys(w).forEach(function (k) { if (w[k] === name) delete w[k]; }); // 같은 이름의 예전 PIN 삭제
  w[h] = name;
  setJson_('workers', w);
  pflush_();
  ui.alert('등록 완료: ' + name + '\n웹앱 화면에서 이 PIN 으로 로그인하면 됩니다.');
}

function removeWorker() {
  requireUi_();
  var ui = SpreadsheetApp.getUi();
  var names = listNames_();
  var r = ui.prompt('작업자 삭제', '삭제할 이름을 입력하세요.\n현재: ' + (names.join(', ') || '없음'), ui.ButtonSet.OK_CANCEL);
  if (r.getSelectedButton() !== ui.Button.OK) return;
  var name = safeText_(r.getResponseText(), 20), w = workers_(), n = 0;
  Object.keys(w).forEach(function (k) { if (w[k] === name) { delete w[k]; n++; } });
  setJson_('workers', w);
  pflush_();
  ui.alert(n ? name + ' 삭제 완료 (이미 로그인한 화면도 최대 6시간 뒤 만료)' : '그 이름의 작업자가 없습니다.');
}

function listWorkers() {
  requireUi_();
  ui_('등록된 작업자 ' + listNames_().length + '명\n\n' + (listNames_().join('\n') || '없음'));
}
function listNames_() {
  var w = workers_();
  return Object.keys(w).map(function (k) { return w[k]; }).sort();
}

// ===== 입력값 정리 =====
/** 제어문자 제거, 길이 제한, 수식 주입 방지 (=, +, -, @ 로 시작하면 앞에 ' 를 붙여 글자로 저장) */
function safeText_(v, max) {
  var s = String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function cleanMeta_(m, user) {
  m = m && typeof m === 'object' ? m : {};
  return {
    item: ITEMS.indexOf(m.item) >= 0 ? m.item : '기타',
    lot: safeText_(m.lot, 40),
    worker: user ? user.name : safeText_(m.worker, 20),
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
  SpreadsheetApp.flush();
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

// ===== 화면에서 호출하는 함수 (모두 로그인 필요) =====

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
    return commit ? withLock_(function () { return idempotent_(batchId, run); }) : run();
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
  });
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
  });
}

/** 첫 화면용: 통계 + 최근 10건 (시트를 읽지 않고 적어 둔 값만 사용 → 항상 빠름) */
function getDashboard(token) {
  return api_(token, function (user) {
    var today = today_(), recent = getJson_('recent', []), files = getJson_('files', []);
    return {
      user: user.name,
      total: +pget_('total') || 0, today: +pget_('day:' + today) || 0, blocked: +pget_('blk:' + today) || 0, recent: recent,
      lastSerial: recent.length ? recent[0].serial : '-',
      lastGroup: recent.length ? recent[0].date + ' ' + recent[0].type : '',
      codes: ALLOWED_CODES, scope: DUP_SCOPE,
      url: files.length ? files[0].url : ''
    };
  });
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
  });
}

// ===== 시트 메뉴 (관리용, 웹에서 호출 불가) =====

/** 시트에 직접 입력하다 생긴 중복·형식오류, 사라진 시트를 달별로 찾아 알려줍니다 */
function auditDuplicates() {
  requireUi_();
  ensureSetup_();
  var started = Date.now(), dups = [], bad = [], missing = [], checked = 0, stopped = false;
  var months = getJson_('months', []);
  for (var i = 0; i < months.length; i++) {
    if (Date.now() - started > MAINT_TIME_MS) { stopped = true; break; }
    var first = {};
    parts_(months[i]).forEach(function (ref) {
      var sh = null;
      try { sh = sheetOf_(ref); } catch (e) { sh = null; }
      if (!sh) { missing.push(ref.s); return; }
      if (sh.getLastRow() < 2) return;
      var col = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
      col.forEach(function (r, k) {
        if (!String(r[0]).trim()) return;
        checked++;
        var where = ref.s + ' ' + (k + 2) + '행';
        var p = parseBarcode_(r[0]);
        if (!p.ok && !/^날짜 확인 필요/.test(p.reason)) { bad.push(where + ' ' + r[0] + ' : ' + p.reason); return; }
        var key = keyOfCell_(r[0]);
        if (first[key]) dups.push(key + ' (' + first[key] + ' / ' + where + ')');
        else first[key] = where;
      });
    });
  }
  pflush_();
  var msg = checked.toLocaleString() + '건 검사' + (stopped ? ' (시간 제한으로 중간까지만)' : '') + '\n\n' +
    (missing.length ? '⚠ 사라진 DB 시트: ' + missing.join(', ') + ' — 복구 전까지 해당 달 등록이 멈춥니다.\n\n' : '') +
    (dups.length ? '중복 ' + dups.length + '건:\n' + dups.slice(0, 40).join('\n') : '중복 없음 ✅') + '\n\n' +
    (bad.length ? '형식 오류 ' + bad.length + '건:\n' + bad.slice(0, 20).join('\n') : '형식 오류 없음 ✅');
  ui_(msg);
  return { checked: checked, dups: dups, bad: bad, missing: missing, stopped: stopped };
}

/** 시트를 직접 고친 뒤 총 건수·오늘 등록 수를 다시 계산합니다 */
function recountStats() {
  requireUi_();
  ensureSetup_();
  var started = Date.now(), total = 0, todayCount = 0, today = today_(), stopped = false;
  var months = getJson_('months', []);
  for (var i = 0; i < months.length && !stopped; i++) {
    parts_(months[i]).forEach(function (ref) {
      if (stopped) return;
      var sh = null;
      try { sh = sheetOf_(ref); } catch (e) { sh = null; }
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
    var lock = LockService.getScriptLock();
    if (lock.tryLock(LOCK_WAIT_MS)) {
      try { preload_(); pset_('total', total); pset_('day:' + today, todayCount); pflush_(); } finally { lock.releaseLock(); }
    }
  }
  var msg = stopped ? '시간 제한으로 중단되었습니다. 다시 실행해 주세요.' : '총 ' + total.toLocaleString() + '건 / 오늘 ' + todayCount + '건으로 다시 계산했습니다.';
  ui_(msg);
  return { total: total, today: todayCount, stopped: stopped };
}

/** 데이터가 저장된 파일 목록 */
function showFiles() {
  requireUi_();
  ensureSetup_();
  pflush_();
  var files = getJson_('files', []);
  ui_('저장 파일 ' + files.length + '개\n\n' + files.map(function (f, i) { return (i + 1) + '. ' + f.name + '\n   ' + f.url; }).join('\n\n'));
  return files;
}
