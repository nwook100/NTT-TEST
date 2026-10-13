#!/usr/bin/env node
// 독이 든 성배 — 시즌 밸런스 몬테카를로 시뮬레이터
// 사용법: node tools/simulate.mjs [판수=10000] [preset=all|v01|rec] [seed]
// 공식 출처: docs/00-brief.md (v0.1). 이벤트 카드는 "주당 신뢰 +1, 랜덤 능력치 +1"로 근사.

// ---------- 파라미터 프리셋 ----------
const V01 = {
  name: 'v0.1 (브리프 원안)',
  start: { trust: 55, fans: 30, morale: 40, bat: 44, pit: 40, def: 42 },
  opponents: [62, 60, 58, 57, 56, 55, 54, 52, 50],
  weeklyDrift: 1,          // 상대 전력 주간 ±1 (주마다 새로 뽑음)
  gameNoise: 3,            // 경기별 ±3 노이즈
  moraleCoef: 0.2,         // (morale-50)*coef
  minWeight: 0,            // 최저 능력치 가중(0=브리프 원안 단순평균). 전력 = (bat+pit+def + w*min)/(3+w)
  logisticScale: 11,       // 승률 분모
  trainGain: 3, trainGainHigh: 1, trainCap: 70, trainMoraleCost: 2,
  restMorale: 8, restMoraleHigh: 8, restHighAt: 101, // 사기 restHighAt 이상이면 휴식 효과 restMoraleHigh
  trustTable: [-7, -4, -2, 1, 4, 6, 8],
  poisonFromWeek: 4, poisonPerWeek: 1,
  fanPerWin: 2, moralePerWin: 2,
  fanFloor: 10, fanFloorPenalty: 3,
  eventTrust: 1, eventStat: 1,   // 이벤트 근사
  rank9TrustCut: 40,
  weeks: 16, gamesPerWeek: 6,
};

// 권장안: v0.1 대비 바뀐 필드만 덮어씀
const REC = {
  ...V01,
  name: '권장안 (v0.2)',
  start: { ...V01.start, trust: 60, morale: 45, bat: 46, pit: 44, def: 45 },
  opponents: [60, 58, 57, 56, 55, 54, 53, 52, 50],
  logisticScale: 9,
  trainGain: 4, trainGainHigh: 2, trainCap: 70,
  trustTable: [-6, -4, -2, 0, 3, 5, 7],
  poisonFromWeek: 6,
  moraleCoef: 0.25,
};

// ---------- 난수 ----------
let seed = Number(process.argv[4] ?? 20261013) >>> 0;
function rnd() { // mulberry32
  seed = (seed + 0x6d2b79f5) >>> 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const randInt = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ---------- 전략 ----------
const STATS = ['bat', 'pit', 'def'];
const lowest = (s) => STATS.reduce((m, k) => (s[k] < s[m] ? k : m), 'bat');
const STRATEGIES = {
  'a 랜덤 훈련': (s) => ['bat', 'pit', 'def', 'rest'][randInt(0, 3)],
  'b 최저 능력치 훈련': (s) => lowest(s),
  'c 사기<35면 휴식': (s) => (s.morale < 35 ? 'rest' : lowest(s)),
  'd 항상 휴식': () => 'rest',
};

// ---------- 한 시즌 ----------
function power(s, P) {
  const w = P.minWeight || 0;
  const base = (s.bat + s.pit + s.def + w * Math.min(s.bat, s.pit, s.def)) / (3 + w);
  return base + (s.morale - 50) * P.moraleCoef + (s.boost || 0);
}
function winProb(us, them, P) {
  return 1 / (1 + Math.exp(-(us - them) / P.logisticScale));
}

function playSeason(P, strategy) {
  const s = { ...P.start, budget: 30, boost: 0, promise: false };
  const wins = new Array(10).fill(0); // 0 = 우리 팀
  for (let week = 1; week <= P.weeks; week++) {
    // 1) 훈련
    const act = strategy(s);
    if (act === 'rest') s.morale = clamp(s.morale + (s.morale >= P.restHighAt ? P.restMoraleHigh : P.restMorale), 0, 100);
    else {
      s[act] = clamp(s[act] + (s[act] > P.trainCap ? P.trainGainHigh : P.trainGain), 20, 90);
      s.morale = clamp(s.morale - P.trainMoraleCost, 0, 100);
    }
    // 2) 이벤트 근사
    s.trust = clamp(s.trust + P.eventTrust, 0, 100);
    const k = STATS[randInt(0, 2)];
    s[k] = clamp(s[k] + P.eventStat, 20, 90);
    // 3) 경기: 10팀 무작위 5쌍
    const str = [power(s, P), ...P.opponents.map((o) => o + randInt(-P.weeklyDrift, P.weeklyDrift))];
    const order = [...Array(10).keys()];
    for (let i = 9; i > 0; i--) { const j = randInt(0, i); [order[i], order[j]] = [order[j], order[i]]; }
    let ourWins = 0;
    for (let p = 0; p < 10; p += 2) {
      const a = order[p], b = order[p + 1];
      for (let g = 0; g < P.gamesPerWeek; g++) {
        const noise = (rnd() * 2 - 1) * P.gameNoise;
        if (rnd() < winProb(str[a] + noise, str[b], P)) wins[a]++; else wins[b]++;
      }
    }
    // 우리 팀 이번 주 승수 = 누적 증가분
    ourWins = wins[0] - (s._prevWins || 0);
    s._prevWins = wins[0];
    // 4) 신뢰/팬/사기
    s.trust += P.trustTable[ourWins];
    if (week >= P.poisonFromWeek) s.trust -= P.poisonPerWeek;
    s.fans = clamp(s.fans + (ourWins - 3) * P.fanPerWin, 0, 100);
    s.morale = clamp(s.morale + (ourWins - 3) * P.moralePerWin, 0, 100);
    if (s.fans <= P.fanFloor) s.trust -= P.fanFloorPenalty;
    s.trust = clamp(s.trust, 0, 100);
    if (s.trust <= 0) return { fired: true, week, rank: rankOf(wins), trust: 0, wins: wins[0] };
  }
  const rank = rankOf(wins);
  return { fired: false, week: P.weeks, rank, trust: s.trust, wins: wins[0] };
}

function rankOf(wins) { // 동률은 무작위 타이브레이크
  const tb = wins.map((w, i) => [w, rnd(), i]).sort((x, y) => y[0] - x[0] || y[1] - x[1]);
  return tb.findIndex((t) => t[2] === 0) + 1;
}

// ---------- 집계 ----------
function run(P, N) {
  const rows = [];
  for (const [label, strat] of Object.entries(STRATEGIES)) {
    let fired = 0, firedWeekSum = 0, rankSum = 0, winSum = 0;
    const d = { r1: 0, r25: 0, r68: 0, r9: 0, r10: 0 };
    let r9Fired = 0;
    for (let i = 0; i < N; i++) {
      const r = playSeason(P, strat);
      rankSum += r.rank; winSum += r.wins;
      if (r.fired) { fired++; firedWeekSum += r.week; continue; }
      if (r.rank === 1) d.r1++;
      else if (r.rank <= 5) d.r25++;
      else if (r.rank <= 8) d.r68++;
      else if (r.rank === 9) { d.r9++; if (r.trust < P.rank9TrustCut) r9Fired++; }
      else d.r10++;
    }
    const pct = (x) => ((100 * x) / N).toFixed(1) + '%';
    rows.push({
      전략: label,
      시즌중경질: pct(fired),
      평균경질주차: fired ? (firedWeekSum / fired).toFixed(1) : '-',
      평균순위: (rankSum / N).toFixed(2),
      평균승: (winSum / N).toFixed(1),
      '1위': pct(d.r1),
      '2-5위': pct(d.r25),
      '6-8위': pct(d.r68),
      '9위': pct(d.r9),
      '10위': pct(d.r10),
      '실패합계(경질+9위컷+10위)': pct(fired + r9Fired + d.r10),
    });
  }
  return rows;
}

// ---------- 메인 ----------
import { pathToFileURL } from 'node:url';
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const N = Number(process.argv[2] ?? 10000);
  const which = process.argv[3] ?? 'all';
  const presets = which === 'v01' ? [V01] : which === 'rec' ? [REC] : [V01, REC];
  for (const P of presets) {
    console.log(`\n=== ${P.name} — ${N}판/전략 ===`);
    console.table(run(P, N));
  }
}
export { V01, REC, playSeason, run };
