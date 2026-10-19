import { Ledger, Member, Raid } from './types';

export interface MemberSummary {
  member: Member;
  earned: number;
  spent: number;
  balance: number;
  attended: number;
  attendanceRate: number; // 0..1
  lootCount: number;
}

export const raidPoints = (raid: Raid): number =>
  raid.basePoints + raid.bossKills * raid.bossPoints;

export const summarize = (ledger: Ledger): MemberSummary[] => {
  const totalRaids = ledger.raids.length;
  return ledger.members
    .map((member) => {
      let earned = 0;
      let spent = 0;
      let attended = 0;
      let lootCount = 0;
      for (const raid of ledger.raids) {
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
      };
    })
    .sort((a, b) => b.balance - a.balance || a.member.name.localeCompare(b.member.name, 'ko'));
};

export const roleCount = (ledger: Ledger, ids: string[]) => {
  const count = { TANK: 0, HEALER: 0, DPS: 0 };
  for (const id of ids) {
    const m = ledger.members.find((x) => x.id === id);
    if (m) count[m.role] += 1;
  }
  return count;
};
