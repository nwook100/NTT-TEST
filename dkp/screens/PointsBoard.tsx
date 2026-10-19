import React, { useMemo } from 'react';
import { summarize } from '../calc';
import { Ledger } from '../types';
import { buildBoardEmbed, isDiscordWebhook, postToDiscord } from '../integrations/discord';
import { boardToText, downloadBoardCsv, shareText } from '../integrations/share';
import { Btn, Card, Empty, Points, RoleBadge, SectionTitle } from '../ui';

const PointsBoard: React.FC<{ ledger: Ledger; notify: (msg: string) => void }> = ({ ledger, notify }) => {
  const webhookReady = isDiscordWebhook(ledger.settings.discordWebhookUrl);

  const toDiscord = async () => {
    try {
      await postToDiscord(ledger.settings.discordWebhookUrl, buildBoardEmbed(ledger));
      notify('디스코드 채널에 포인트 현황을 보냈습니다.');
    } catch (e) {
      notify((e as Error).message);
    }
  };

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
        <div className="flex gap-2 mb-3">
          <Btn variant="ghost" className="flex-1" onClick={() => shareText('포인트 현황', boardToText(ledger)).then(notify)}>공유</Btn>
          <Btn variant="ghost" className="flex-1" onClick={toDiscord} disabled={!webhookReady} title={webhookReady ? '' : '공대장 탭에서 디스코드 웹훅을 먼저 설정하세요'}>디스코드</Btn>
          <Btn variant="ghost" className="flex-1" onClick={() => { downloadBoardCsv(ledger); notify('CSV 파일을 내려받습니다. 엑셀·구글시트에서 여세요.'); }}>CSV</Btn>
        </div>
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
