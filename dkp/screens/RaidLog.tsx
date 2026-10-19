import React, { useState } from 'react';
import { fmtDate, fmtGold, raidPoints, roleCount, settlePug } from '../calc';
import { buildRaidEmbed, isDiscordWebhook, postToDiscord } from '../integrations/discord';
import { pugChatLines, pugWhisperLines, raidToText, regularChatLines, shareText } from '../integrations/share';
import { LedgerApi } from '../store';
import { Raid } from '../types';
import { Btn, Card, CopyLine, Empty, Label, Points, RoleDot, SectionTitle, Sheet } from '../ui';

const RaidLog: React.FC<{ api: LedgerApi; notify: (msg: string) => void; goAdmin: () => void }> = ({ api, notify, goAdmin }) => {
  const { ledger } = api;
  const hasOpen = ledger.raids.some((r) => !r.closed);
  const webhookReady = isDiscordWebhook(ledger.settings.discordWebhookUrl);
  const [shareFor, setShareFor] = useState<Raid | null>(null);
  const [chatFor, setChatFor] = useState<Raid | null>(null);

  const memberOf = (id: string) => ledger.members.find((m) => m.id === id);

  // 진행 중 레이드는 정렬과 무관하게 항상 맨 위
  const raids = [...ledger.raids].sort((a, b) => Number(b.closed === false) - Number(a.closed === false) || b.date.localeCompare(a.date));

  const reopen = (raidId: string) => {
    if (hasOpen) { notify('진행 중인 레이드를 먼저 마감하세요.'); return; }
    api.patchRaid(raidId, { closed: false });
    notify('레이드를 다시 열었습니다. 공대장 탭에서 수정하세요.');
    goAdmin();
  };

  const toDiscord = async (raid: Raid) => {
    if (!webhookReady) { notify('공대장 탭 → 연동에서 디스코드 웹훅을 먼저 설정하세요.'); return; }
    try {
      await postToDiscord(ledger.settings.discordWebhookUrl, buildRaidEmbed(ledger, raid));
      notify('디스코드 채널에 보냈습니다.');
    } catch (e) {
      notify((e as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      <SectionTitle title="레이드 기록" hint="누가 왔고, 무엇이 누구에게 갔는지" />
      {raids.length === 0 ? (
        <Empty action={<Btn onClick={goAdmin}>첫 레이드 시작하기</Btn>}>아직 레이드 기록이 없습니다.</Empty>
      ) : (
        raids.map((raid) => {
          const isPug = raid.kind === 'PUG';
          const rc = roleCount(ledger, raid.attendeeIds);
          const settle = isPug ? settlePug(ledger, raid) : null;
          const headcount = raid.attendeeIds.length + raid.guests.length;
          return (
            <Card key={raid.id} className={`p-4 space-y-3 ${!raid.closed ? 'border-l-[3px] border-l-[#ff6b35]' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`font-bold px-1.5 py-0.5 rounded ${isPug ? 'bg-amber-400/15 text-amber-300' : 'bg-white/10 text-zinc-300'}`}>{isPug ? '골팟' : '정규'}</span>
                    <span className="text-zinc-400">{fmtDate(raid.date)}</span>
                    {!raid.closed && <span className="text-[#ff6b35] font-bold">진행 중</span>}
                  </div>
                  <h3 className="text-lg font-black leading-tight mt-1 truncate">{raid.name}</h3>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {isPug
                      ? `${headcount}명 (길드 ${raid.attendeeIds.length} + 외부 ${raid.guests.length}) · 판매 ${raid.sales.length}건`
                      : `보스 ${raid.bossKills}킬 · 참석 ${raid.attendeeIds.length}명 (탱 ${rc.TANK} / 힐 ${rc.HEALER} / 딜 ${rc.DPS})`}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {isPug && settle ? (
                    <>
                      <Label>1인 분배</Label>
                      <div className="font-mono font-black text-amber-300 text-xl tabular-nums">{fmtGold(settle.cutPerPerson)}</div>
                    </>
                  ) : (
                    <>
                      <Label>참석 포인트</Label>
                      <Points value={raidPoints(raid)} className="text-xl" />
                    </>
                  )}
                </div>
              </div>

              <div>
                <Label className="mb-1.5">참석자</Label>
                <div className="flex flex-wrap gap-1.5">
                  {headcount === 0 && <span className="text-sm text-zinc-500">없음</span>}
                  {raid.attendeeIds.map((id) => {
                    const m = memberOf(id);
                    return (
                      <span key={id} className="inline-flex items-center gap-1.5 text-xs bg-white/5 border border-white/10 rounded-full pl-2 pr-2.5 py-1">
                        {m && <RoleDot role={m.role} />}{m?.name ?? '(탈퇴)'}
                      </span>
                    );
                  })}
                  {raid.guests.map((g) => (
                    <span key={g} className="text-xs bg-amber-400/10 border border-amber-400/20 text-amber-200 rounded-full px-2.5 py-1">{g}</span>
                  ))}
                </div>
              </div>

              {isPug ? (
                <details className="group">
                  <summary className="list-none cursor-pointer text-xs text-zinc-300 flex items-center gap-1 [&::-webkit-details-marker]:hidden">
                    <span className="transition-transform group-open:rotate-90">▸</span> 판매 {raid.sales.length}건 · 총 {fmtGold(settle!.totalGold)} · 수수료 {settle!.feePercent}%
                  </summary>
                  <div className="mt-2 divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden">
                    {raid.sales.length === 0 && <div className="px-3 py-2 text-sm text-zinc-500">판매 없음</div>}
                    {raid.sales.map((s) => (
                      <div key={s.id} className="flex items-center justify-between px-3 py-2 text-sm">
                        <div className="min-w-0">
                          <div className="font-bold truncate">{s.itemName}</div>
                          {s.buyer && <div className="text-xs text-zinc-400">{s.buyer}</div>}
                        </div>
                        <span className="font-mono font-bold text-amber-300">{fmtGold(s.gold)}</span>
                      </div>
                    ))}
                  </div>
                </details>
              ) : (
                <details className="group">
                  <summary className="list-none cursor-pointer text-xs text-zinc-300 flex items-center gap-1 [&::-webkit-details-marker]:hidden">
                    <span className="transition-transform group-open:rotate-90">▸</span> 분배 {raid.loot.length}건
                  </summary>
                  <div className="mt-2 divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden">
                    {raid.loot.length === 0 && <div className="px-3 py-2 text-sm text-zinc-500">분배된 아이템 없음</div>}
                    {raid.loot.map((l) => (
                      <div key={l.id} className="flex items-center justify-between px-3 py-2 text-sm">
                        <div className="min-w-0">
                          <div className="font-bold truncate">{l.itemName}</div>
                          <div className="text-xs text-zinc-400">{memberOf(l.memberId)?.name ?? '(탈퇴)'}</div>
                        </div>
                        <span className="font-mono font-bold text-rose-300">−{l.cost}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}

              <div className="flex gap-2 pt-1">
                <Btn variant="ghost" size="sm" onClick={() => setChatFor(raid)}>와우 채팅</Btn>
                <Btn variant="ghost" size="sm" onClick={() => setShareFor(raid)}>공유</Btn>
                <div className="flex-1" />
                {raid.closed ? (
                  <Btn variant="subtle" size="sm" onClick={() => reopen(raid.id)}>수정</Btn>
                ) : (
                  <Btn size="sm" onClick={goAdmin}>입력 계속</Btn>
                )}
              </div>
            </Card>
          );
        })
      )}

      <Sheet open={!!shareFor} onClose={() => setShareFor(null)} title={shareFor ? `${shareFor.name} 공유` : ''}>
        {shareFor && (
          <div className="space-y-2">
            <Btn variant="ghost" size="lg" className="w-full" onClick={() => { const r = shareFor; setShareFor(null); shareText(r.name, raidToText(ledger, r)).then(notify); }}>카톡·디스코드에 텍스트로 공유</Btn>
            <Btn variant="ghost" size="lg" className="w-full" onClick={() => { const r = shareFor; setShareFor(null); toDiscord(r); }}>디스코드 채널로 보내기{webhookReady ? '' : ' (웹훅 미설정)'}</Btn>
          </div>
        )}
      </Sheet>

      <Sheet open={!!chatFor} onClose={() => setChatFor(null)} title="와우 채팅에 붙여넣기">
        {chatFor && (
          <div className="space-y-4">
            <p className="text-xs text-zinc-400">와우 채팅은 한 줄에 255자까지입니다. 줄을 누르면 복사되니, 게임 채팅창에 한 줄씩 붙여넣으세요.</p>
            <div>
              <Label className="mb-1.5">{chatFor.kind === 'PUG' ? '공격대 채팅 (/raid)' : '길드 채팅 (/g)'}</Label>
              <div className="space-y-1.5">
                {(chatFor.kind === 'PUG' ? pugChatLines(ledger, chatFor) : regularChatLines(ledger, chatFor)).map((line, i) => (
                  <CopyLine key={i} text={line} onCopied={notify} />
                ))}
              </div>
            </div>
            {chatFor.kind === 'PUG' && (
              <div>
                <Label className="mb-1.5">1인별 귓속말 (/w)</Label>
                <div className="space-y-1.5">
                  {pugWhisperLines(ledger, chatFor).map((line, i) => <CopyLine key={i} text={line} onCopied={notify} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </Sheet>
    </div>
  );
};

export default RaidLog;
