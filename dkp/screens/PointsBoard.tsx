import React, { useMemo } from 'react';
import { summarize } from '../calc';
import { Ledger } from '../types';
import { Card, Empty, Points, RoleBadge, SectionTitle } from '../ui';

const PointsBoard: React.FC<{ ledger: Ledger }> = ({ ledger }) => {
  const rows = useMemo(() => summarize(ledger), [ledger]);
  const totalRaids = ledger.raids.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <div className="text-3xl font-black">{ledger.members.length}</div>
          <div className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1">길드원</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-black">{totalRaids}</div>
          <div className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1">레이드</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-black">{ledger.raids.reduce((n, r) => n + r.loot.length, 0)}</div>
          <div className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1">분배 아이템</div>
        </Card>
      </div>

      <div>
        <SectionTitle title="포인트 현황" hint="참석으로 쌓고, 아이템으로 씁니다. 잔여 포인트 순" />
        {rows.length === 0 ? (
          <Empty>아직 길드원이 없습니다. 공대장 탭에서 길드원을 추가하세요.</Empty>
        ) : (
          <Card className="divide-y divide-white/5 overflow-hidden">
            {rows.map((row, idx) => (
              <div key={row.member.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-6 text-center text-zinc-600 font-mono text-sm">{idx + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold truncate">{row.member.name}</span>
                    <RoleBadge role={row.member.role} />
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {row.member.cls} · 참석 {row.attended}/{totalRaids} ({Math.round(row.attendanceRate * 100)}%) · 획득 {row.lootCount}개
                  </div>
                </div>
                <div className="text-right">
                  <Points value={row.balance} className="text-2xl" />
                  <div className="text-[10px] text-zinc-600 font-mono">+{row.earned} / -{row.spent}</div>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};

export default PointsBoard;
