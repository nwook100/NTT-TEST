import React from 'react';
import { raidPoints, roleCount } from '../calc';
import { Ledger } from '../types';
import { Card, Empty, Points, SectionTitle } from '../ui';

const RaidLog: React.FC<{ ledger: Ledger }> = ({ ledger }) => {
  const nameOf = (id: string) => ledger.members.find((m) => m.id === id)?.name ?? '(탈퇴)';
  const raids = [...ledger.raids].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6">
      <SectionTitle title="레이드 기록" hint="누가 왔고, 무엇이 누구에게 갔는지" />
      {raids.length === 0 ? (
        <Empty>아직 레이드 기록이 없습니다.</Empty>
      ) : (
        raids.map((raid) => {
          const rc = roleCount(ledger, raid.attendeeIds);
          return (
            <Card key={raid.id} className="p-4 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-zinc-500 font-mono">{raid.date}</div>
                  <h3 className="text-lg font-black leading-tight">{raid.name}</h3>
                  <div className="text-xs text-zinc-500 mt-1">
                    보스 {raid.bossKills}킬 · 참석 {raid.attendeeIds.length}명 (탱 {rc.TANK} / 힐 {rc.HEALER} / 딜 {rc.DPS})
                    {!raid.closed && <span className="ml-2 text-[#ff6b35] font-bold">진행 중</span>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest">참석 포인트</div>
                  <Points value={raidPoints(raid)} className="text-xl" />
                </div>
              </div>

              <div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-widest mb-1.5">참석자</div>
                <div className="flex flex-wrap gap-1.5">
                  {raid.attendeeIds.length === 0 && <span className="text-sm text-zinc-600">없음</span>}
                  {raid.attendeeIds.map((id) => (
                    <span key={id} className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                      {nameOf(id)}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-widest mb-1.5">분배</div>
                {raid.loot.length === 0 ? (
                  <div className="text-sm text-zinc-600">분배된 아이템 없음</div>
                ) : (
                  <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden">
                    {raid.loot.map((l) => (
                      <div key={l.id} className="flex items-center justify-between px-3 py-2 text-sm">
                        <div className="min-w-0">
                          <div className="font-bold truncate">{l.itemName}</div>
                          <div className="text-xs text-zinc-500">{nameOf(l.memberId)}</div>
                        </div>
                        <span className="font-mono font-bold text-rose-300">-{l.cost}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default RaidLog;
