import React, { useMemo, useState } from 'react';
import { fmtDate, memberHistory, regularRaids, summarize } from '../calc';
import { buildBoardEmbed, isDiscordWebhook, postToDiscord } from '../integrations/discord';
import { boardToText, downloadBoardCsv, shareText } from '../integrations/share';
import { LedgerApi } from '../store';
import { Role, ROLE_LABEL } from '../types';
import { Btn, Card, Chip, Empty, Input, Label, Points, RoleBadge, SectionTitle, Select, Sheet } from '../ui';

const PointsBoard: React.FC<{ api: LedgerApi; notify: (msg: string) => void }> = ({ api, notify }) => {
  const { ledger } = api;
  const rows = useMemo(() => summarize(ledger), [ledger]);
  const totalRaids = regularRaids(ledger).length;
  const webhookReady = isDiscordWebhook(ledger.settings.discordWebhookUrl);

  const [query, setQuery] = useState('');
  const [role, setRole] = useState<Role | 'ALL'>('ALL');
  const [selected, setSelected] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);

  const me = rows.find((r) => r.member.id === ledger.settings.myMemberId) ?? null;
  const visible = rows.filter(
    (r) => (role === 'ALL' || r.member.role === role) && (!query.trim() || r.member.name.includes(query.trim())),
  );
  const detail = selected ? rows.find((r) => r.member.id === selected) ?? null : null;
  const history = selected ? memberHistory(ledger, selected) : [];

  const toDiscord = async () => {
    if (!webhookReady) { notify('공대장 탭 → 연동에서 디스코드 웹훅을 먼저 설정하세요.'); return; }
    try {
      await postToDiscord(ledger.settings.discordWebhookUrl, buildBoardEmbed(ledger));
      notify('디스코드 채널에 포인트 현황을 보냈습니다.');
    } catch (e) {
      notify((e as Error).message);
    }
  };

  return (
    <div className="space-y-5">
      {/* 내 캐릭터: 길드원이 3초 안에 "내 포인트"를 본다 */}
      {rows.length > 0 && (
        <Card className="p-4">
          {me ? (
            <button className="w-full text-left" onClick={() => setSelected(me.member.id)}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Label>내 포인트</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-black">{me.member.name}</span>
                    <RoleBadge role={me.member.role} />
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {me.rank}위 · 참석 {me.attended}/{totalRaids} ({Math.round(me.attendanceRate * 100)}%) · 획득 {me.lootCount}개
                  </div>
                </div>
                <div className="text-right">
                  <Points value={me.balance} accent className="text-[40px] leading-none" />
                  <div className="text-xs text-zinc-400 font-mono mt-1">획득 {me.earned} · 사용 {me.spent}</div>
                </div>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label>내 캐릭터</Label>
                <div className="text-sm text-zinc-300 mt-0.5">고르면 내 포인트가 맨 위에 보입니다</div>
              </div>
              <Select className="w-40" value="" onChange={(e) => e.target.value && api.setSettings({ myMemberId: e.target.value })}>
                <option value="">선택</option>
                {rows.map((r) => <option key={r.member.id} value={r.member.id}>{r.member.name}</option>)}
              </Select>
            </div>
          )}
        </Card>
      )}

      <div>
        <SectionTitle
          title="포인트 현황"
          hint={`길드원 ${ledger.members.length}명 · 정규공대 ${totalRaids}회 · 분배 ${regularRaids(ledger).reduce((n, r) => n + r.loot.length, 0)}건`}
          right={rows.length > 0 ? <Btn variant="ghost" size="sm" onClick={() => setShareOpen(true)}>공유</Btn> : undefined}
        />

        {rows.length > 10 && <Input placeholder="이름 검색" value={query} onChange={(e) => setQuery(e.target.value)} className="mb-2" />}
        {rows.length > 0 && (
          <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
            <Chip active={role === 'ALL'} onClick={() => setRole('ALL')}>전체 {rows.length}</Chip>
            {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
              <Chip key={r} active={role === r} onClick={() => setRole(r)}>
                {ROLE_LABEL[r]} {rows.filter((x) => x.member.role === r).length}
              </Chip>
            ))}
          </div>
        )}

        {rows.length === 0 ? (
          <Empty>아직 길드원이 없습니다. 공대장 탭에서 길드원을 추가하세요.</Empty>
        ) : visible.length === 0 ? (
          <Empty>조건에 맞는 길드원이 없습니다.</Empty>
        ) : (
          <Card className="divide-y divide-white/5 overflow-hidden">
            {visible.map((row) => {
              const isMe = row.member.id === ledger.settings.myMemberId;
              return (
                <button
                  key={row.member.id}
                  onClick={() => setSelected(row.member.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/[0.03] active:bg-white/[0.06] ${isMe ? 'bg-[#ff6b35]/[0.06]' : ''}`}
                >
                  <div className={`w-6 text-center font-mono text-sm ${row.rank === 1 ? 'text-[#ff6b35] font-black' : 'text-zinc-500'}`}>{row.rank}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[15px] truncate">{row.member.name}</span>
                      <RoleBadge role={row.member.role} />
                      {isMe && <span className="text-[10px] font-bold text-[#ff6b35]">나</span>}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {row.member.cls} · 참석 {Math.round(row.attendanceRate * 100)}% · 획득 {row.lootCount}개
                    </div>
                  </div>
                  <div className="text-right">
                    <Points value={row.balance} accent={row.rank === 1 || isMe} className="text-2xl" />
                    <div className="text-xs text-zinc-400 font-mono">+{row.earned} −{row.spent}</div>
                  </div>
                </button>
              );
            })}
          </Card>
        )}
      </div>

      {/* 개인 내역 */}
      <Sheet open={!!detail} onClose={() => setSelected(null)} title={detail ? `${detail.member.name} 내역` : ''}>
        {detail && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-300 text-sm">{detail.member.cls}</span>
                  <RoleBadge role={detail.member.role} />
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  {detail.rank}위 · 참석 {detail.attended}/{totalRaids} ({Math.round(detail.attendanceRate * 100)}%) · 획득 {detail.lootCount}개
                </div>
              </div>
              <div className="text-right">
                <Points value={detail.balance} accent className="text-3xl" />
                <div className="text-xs text-zinc-400 font-mono">획득 {detail.earned} · 사용 {detail.spent}</div>
              </div>
            </div>
            {detail.member.id !== ledger.settings.myMemberId && (
              <Btn variant="ghost" className="w-full" onClick={() => { api.setSettings({ myMemberId: detail.member.id }); notify(`${detail.member.name}을(를) 내 캐릭터로 고정했습니다.`); }}>
                내 캐릭터로 고정
              </Btn>
            )}
            {history.length === 0 ? (
              <Empty>아직 참석하거나 받은 아이템이 없습니다.</Empty>
            ) : (
              <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden">
                {history.map((h) => (
                  <div key={h.raid.id} className="px-3 py-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="font-bold truncate">{h.raid.name}</div>
                        <div className="text-xs text-zinc-400">{fmtDate(h.raid.date)}</div>
                      </div>
                      {h.attended ? <span className="font-mono font-bold text-zinc-100">+{h.earned}</span> : <span className="text-xs text-zinc-500">불참</span>}
                    </div>
                    {h.loot.map((l, i) => (
                      <div key={i} className="flex items-center justify-between mt-1 pl-3 text-xs">
                        <span className="text-zinc-300 truncate">↳ {l.itemName}</span>
                        <span className="font-mono text-rose-300">−{l.cost}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Sheet>

      {/* 공유 메뉴 */}
      <Sheet open={shareOpen} onClose={() => setShareOpen(false)} title="포인트 현황 공유">
        <div className="space-y-2">
          <Btn variant="ghost" size="lg" className="w-full" onClick={() => { setShareOpen(false); shareText('포인트 현황', boardToText(ledger)).then(notify); }}>카톡·디스코드에 텍스트로 공유</Btn>
          <Btn variant="ghost" size="lg" className="w-full" onClick={() => { setShareOpen(false); toDiscord(); }}>디스코드 채널로 보내기{webhookReady ? '' : ' (웹훅 미설정)'}</Btn>
          <Btn variant="ghost" size="lg" className="w-full" onClick={() => { setShareOpen(false); downloadBoardCsv(ledger); notify('CSV를 내려받습니다. 엑셀·구글시트에서 여세요.'); }}>엑셀·구글시트용 CSV 내려받기</Btn>
        </div>
      </Sheet>
    </div>
  );
};

export default PointsBoard;
