import { Ledger, Member, Raid, RAID_MAX, RAID_MIN } from './types';

export interface MemberSummary {
  member: Member;
  earned: number;
  spent: number;
  balance: number;
  attended: number;
  attendanceRate: number; // 0..1
  lootCount: number;
  /** 동점이면 같은 순위 (1, 1, 3) */
  rank: number;
}

export const raidPoints = (raid: Raid): number =>
  raid.basePoints + raid.bossKills * raid.bossPoints;

/** 포인트 계산 대상은 정규공대만 */
export const regularRaids = (ledger: Ledger): Raid[] => ledger.raids.filter((r) => r.kind === 'REGULAR');

export const summarize = (ledger: Ledger): MemberSummary[] => {
  const raids = regularRaids(ledger);
  const totalRaids = raids.length;
  const rows = ledger.members.map((member) => {
    let earned = 0;
    let spent = 0;
    let attended = 0;
    let lootCount = 0;
    for (const raid of raids) {
      if (raid.attendeeIds.includes(member.id)) {
        attended += 1;
        earned += raidPoints(raid);
      }
      for (const loot of raid.loot) {
        if (loot.memberId === member.id) {
          spent += loot.cost;
          lootCount += 1;
        }
      }
    }
    return {
      member,
      earned,
      spent,
      balance: earned - spent,
      attended,
      attendanceRate: totalRaids === 0 ? 0 : attended / totalRaids,
      lootCount,
      rank: 0,
    };
  });
  rows.sort((a, b) => b.balance - a.balance || a.member.name.localeCompare(b.member.name, 'ko'));
  rows.forEach((row, i) => {
    row.rank = i > 0 && rows[i - 1].balance === row.balance ? rows[i - 1].rank : i + 1;
  });
  return rows;
};

export const roleCount = (ledger: Ledger, ids: string[]) => {
  const count = { TANK: 0, HEALER: 0, DPS: 0 };
  for (const id of ids) {
    const m = ledger.members.find((x) => x.id === id);
    if (m) count[m.role] += 1;
  }
  return count;
};

export interface HistoryRow {
  raid: Raid;
  attended: boolean;
  earned: number;
  loot: { itemName: string; cost: number }[];
}

/** 한 사람의 정규공대 내역 (최신순) */
export const memberHistory = (ledger: Ledger, memberId: string): HistoryRow[] =>
  regularRaids(ledger)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((raid) => {
      const attended = raid.attendeeIds.includes(memberId);
      return {
        raid,
        attended,
        earned: attended ? raidPoints(raid) : 0,
        loot: raid.loot.filter((l) => l.memberId === memberId).map((l) => ({ itemName: l.itemName, cost: l.cost })),
      };
    })
    .filter((row) => row.attended || row.loot.length > 0);

const uniqueRecent = (ledger: Ledger, pick: (r: Raid) => string[]): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raid of [...ledger.raids].sort((a, b) => b.date.localeCompare(a.date))) {
    for (const v of pick(raid)) {
      if (v && !seen.has(v)) { seen.add(v); out.push(v); }
    }
  }
  return out;
};

export const knownItemNames = (ledger: Ledger): string[] =>
  uniqueRecent(ledger, (r) => [...r.loot.map((l) => l.itemName), ...r.sales.map((s) => s.itemName)]);

export const knownRaidNames = (ledger: Ledger): string[] => uniqueRecent(ledger, (r) => [r.name]);

export const knownGuests = (ledger: Ledger): string[] => uniqueRecent(ledger, (r) => r.guests);

// ---------------- 골팟 정산 ----------------

export interface PugSettlement {
  participants: string[]; // 길드원 이름 + 외부 참여자
  totalGold: number;
  feePercent: number;
  feeGold: number;
  distributable: number;
  cutPerPerson: number;
  remainder: number; // 나누고 남은 골드 (공대장 몫)
}

export const settlePug = (ledger: Ledger, raid: Raid): PugSettlement => {
  const memberNames = raid.attendeeIds.map((id) => ledger.members.find((m) => m.id === id)?.name ?? '(탈퇴)');
  const participants = [...memberNames, ...raid.guests];
  const totalGold = raid.sales.reduce((n, s) => n + s.gold, 0);
  const feeGold = Math.floor((totalGold * raid.feePercent) / 100);
  const distributable = totalGold - feeGold;
  const n = participants.length;
  const cutPerPerson = n === 0 ? 0 : Math.floor(distributable / n);
  const remainder = distributable - cutPerPerson * n;
  return { participants, totalGold, feePercent: raid.feePercent, feeGold, distributable, cutPerPerson, remainder };
};

export const fmtGold = (g: number) => `${g.toLocaleString('ko-KR')}골`;

/** 2026-10-19 → 10월 19일 (일) */
export const fmtDate = (iso: string): string => {
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  const day = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${day})`;
};

/** 공대 인원 (길드원 참석 + 외부 참여자) */
export const headcount = (raid: Raid): number => raid.attendeeIds.length + raid.guests.length;

export const headcountStatus = (raid: Raid): { n: number; ok: boolean; reason: string | null } => {
  const n = headcount(raid);
  if (n < RAID_MIN) return { n, ok: false, reason: `최소 ${RAID_MIN}명 필요 (${RAID_MIN - n}명 더)` };
  if (n > RAID_MAX) return { n, ok: false, reason: `최대 ${RAID_MAX}명 (${n - RAID_MAX}명 초과)` };
  return { n, ok: true, reason: null };
};
