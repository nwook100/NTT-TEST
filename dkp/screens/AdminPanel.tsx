import React, { useState } from 'react';
import { raidPoints, roleCount } from '../calc';
import { LedgerApi } from '../store';
import { Role, ROLE_LABEL, WOW_CLASSES, WowClass } from '../types';
import { buildRaidEmbed, isDiscordWebhook, postToDiscord } from '../integrations/discord';
import { downloadBackup, readBackupFile } from '../integrations/share';
import { Btn, Card, Empty, Input, Points, RoleBadge, SectionTitle, Select, Toggle } from '../ui';

const AdminPanel: React.FC<{ api: LedgerApi; notify: (msg: string) => void }> = ({ api, notify }) => {
  const { ledger } = api;
  const webhookReady = isDiscordWebhook(ledger.settings.discordWebhookUrl);
  const [posting, setPosting] = useState(false);

  const closeRaid = async () => {
    if (!openRaid) return;
    const closed = { ...openRaid, closed: true };
    api.patchRaid(openRaid.id, { closed: true });
    if (ledger.settings.autoPostOnClose && webhookReady) {
      setPosting(true);
      try {
        await postToDiscord(ledger.settings.discordWebhookUrl, buildRaidEmbed(ledger, closed));
        notify('레이드를 마감하고 디스코드에 결과를 보냈습니다.');
      } catch (e) {
        notify(`마감은 됐지만 디스코드 전송 실패: ${(e as Error).message}`);
      } finally {
        setPosting(false);
      }
    } else {
      notify('레이드를 마감했습니다.');
    }
  };

  const testWebhook = async () => {
    setPosting(true);
    try {
      await postToDiscord(ledger.settings.discordWebhookUrl, {
        username: '공대장부',
        embeds: [{ title: '✅ 공대장부 연동 완료', description: `${ledger.guildName} 채널에 레이드 결과가 여기로 옵니다.`, color: 0xff6b35 }],
      });
      notify('디스코드 채널에 테스트 메시지를 보냈습니다.');
    } catch (e) {
      notify((e as Error).message);
    } finally {
      setPosting(false);
    }
  };

  const onBackupFile = async (file: File | undefined) => {
    if (!file) return;
    try {
      const data = await readBackupFile(file);
      if (confirm(`'${data.guildName}' 백업으로 덮어쓸까요? 현재 기록은 사라집니다.`)) {
        api.importLedger(data);
        notify('백업을 복원했습니다.');
      }
    } catch (e) {
      notify((e as Error).message);
    }
  };
  const openRaid = ledger.raids.find((r) => !r.closed) ?? null;

  // 레이드 생성 폼
  const [raidName, setRaidName] = useState('');
  const [raidDate, setRaidDate] = useState(new Date().toISOString().slice(0, 10));
  const [basePoints, setBasePoints] = useState(10);
  const [bossPoints, setBossPoints] = useState(5);

  // 길드원 추가 폼
  const [memberName, setMemberName] = useState('');
  const [memberCls, setMemberCls] = useState<WowClass>('전사');
  const [memberRole, setMemberRole] = useState<Role>('DPS');

  // 분배 입력 폼
  const [itemName, setItemName] = useState('');
  const [lootMember, setLootMember] = useState('');
  const [lootCost, setLootCost] = useState(10);

  const submitRaid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!raidName.trim()) return;
    api.createRaid({ name: raidName.trim(), date: raidDate, basePoints, bossPoints });
    setRaidName('');
  };

  const submitMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    api.addMember({ name: memberName.trim(), cls: memberCls, role: memberRole });
    setMemberName('');
  };

  const submitLoot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!openRaid || !itemName.trim() || !lootMember) return;
    api.addLoot(openRaid.id, { itemName: itemName.trim(), memberId: lootMember, cost: lootCost });
    setItemName('');
  };

  return (
    <div className="space-y-8">
      {/* 진행 중 레이드 */}
      <div>
        <SectionTitle title="오늘 레이드" hint={openRaid ? '참석 체크 → 보스 킬 → 분배 입력 → 마감' : '새 레이드를 만들면 여기서 진행합니다'} />
        {openRaid ? (
          <Card className="p-4 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-zinc-500 font-mono">{openRaid.date}</div>
                <h3 className="text-lg font-black">{openRaid.name}</h3>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">참석 시 지급</div>
                <Points value={raidPoints(openRaid)} className="text-xl" />
              </div>
            </div>

            {/* 보스 킬 */}
            <div className="flex items-center justify-between bg-black/30 rounded-xl px-4 py-3">
              <div>
                <div className="font-bold">보스 처치</div>
                <div className="text-xs text-zinc-500">킬당 +{openRaid.bossPoints}점 (기본 {openRaid.basePoints}점)</div>
              </div>
              <div className="flex items-center gap-3">
                <Btn variant="ghost" onClick={() => api.patchRaid(openRaid.id, { bossKills: Math.max(0, openRaid.bossKills - 1) })}>−</Btn>
                <span className="font-mono text-2xl font-black w-8 text-center">{openRaid.bossKills}</span>
                <Btn variant="ghost" onClick={() => api.patchRaid(openRaid.id, { bossKills: openRaid.bossKills + 1 })}>+</Btn>
              </div>
            </div>

            {/* 참석 체크 */}
            <div>
              {(() => {
                const rc = roleCount(ledger, openRaid.attendeeIds);
                return (
                  <div className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">
                    참석 체크 · {openRaid.attendeeIds.length}명 (탱 {rc.TANK} / 힐 {rc.HEALER} / 딜 {rc.DPS})
                  </div>
                );
              })()}
              {ledger.members.length === 0 ? (
                <Empty>길드원을 먼저 추가하세요.</Empty>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {ledger.members.map((m) => {
                    const on = openRaid.attendeeIds.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        onClick={() => api.toggleAttendee(openRaid.id, m.id)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all active:scale-95 ${
                          on ? 'bg-[#ff6b35]/15 border-[#ff6b35]/60' : 'bg-white/[0.02] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-sm truncate">{m.name}</div>
                          <div className="text-[11px] text-zinc-500">{m.cls}</div>
                        </div>
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${on ? 'bg-[#ff6b35] border-[#ff6b35] text-black' : 'border-white/20 text-transparent'}`}>✓</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 분배 */}
            <div>
              <div className="text-[11px] text-zinc-500 uppercase tracking-widest mb-2">아이템 분배</div>
              {openRaid.loot.length > 0 && (
                <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden mb-3">
                  {openRaid.loot.map((l) => (
                    <div key={l.id} className="flex items-center justify-between px-3 py-2 text-sm">
                      <div className="min-w-0">
                        <div className="font-bold truncate">{l.itemName}</div>
                        <div className="text-xs text-zinc-500">{ledger.members.find((m) => m.id === l.memberId)?.name ?? '(탈퇴)'}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-rose-300">-{l.cost}</span>
                        <button onClick={() => api.removeLoot(openRaid.id, l.id)} className="text-zinc-600 hover:text-rose-300 text-lg leading-none">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <form onSubmit={submitLoot} className="grid grid-cols-1 gap-2">
                <Input placeholder="아이템 이름" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                <div className="grid grid-cols-[1fr_90px] gap-2">
                  <Select value={lootMember} onChange={(e) => setLootMember(e.target.value)}>
                    <option value="">받는 사람</option>
                    {openRaid.attendeeIds.map((id) => {
                      const m = ledger.members.find((x) => x.id === id);
                      return m ? <option key={id} value={id}>{m.name} ({m.cls})</option> : null;
                    })}
                  </Select>
                  <Input type="number" min={0} value={lootCost} onChange={(e) => setLootCost(Number(e.target.value))} />
                </div>
                <Btn type="submit" disabled={!itemName.trim() || !lootMember}>분배 기록</Btn>
                {openRaid.attendeeIds.length === 0 && <p className="text-xs text-zinc-600">참석 체크된 사람에게만 분배할 수 있습니다.</p>}
              </form>
            </div>

            <div className="flex gap-2 pt-2 border-t border-white/5">
              <Btn className="flex-1" onClick={closeRaid} disabled={posting}>
                {posting ? '전송 중…' : ledger.settings.autoPostOnClose && webhookReady ? '마감 + 디스코드 전송' : '레이드 마감'}
              </Btn>
              <Btn variant="danger" onClick={() => { if (confirm('이 레이드를 삭제할까요?')) api.deleteRaid(openRaid.id); }}>삭제</Btn>
            </div>
          </Card>
        ) : (
          <Card className="p-4">
            <form onSubmit={submitRaid} className="space-y-3">
              <Input placeholder="레이드 이름 (예: 오닉시아의 둥지)" value={raidName} onChange={(e) => setRaidName(e.target.value)} />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] text-zinc-500">날짜</label>
                  <Input type="date" value={raidDate} onChange={(e) => setRaidDate(e.target.value)} />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-500">참석 기본점</label>
                  <Input type="number" min={0} value={basePoints} onChange={(e) => setBasePoints(Number(e.target.value))} />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-500">보스당 점수</label>
                  <Input type="number" min={0} value={bossPoints} onChange={(e) => setBossPoints(Number(e.target.value))} />
                </div>
              </div>
              <Btn type="submit" className="w-full" disabled={!raidName.trim()}>레이드 시작</Btn>
            </form>
          </Card>
        )}
      </div>

      {/* 길드원 관리 */}
      <div>
        <SectionTitle title="길드원" hint={`${ledger.members.length}명`} />
        <Card className="p-4 space-y-4">
          <form onSubmit={submitMember} className="grid grid-cols-[1fr_auto] gap-2">
            <Input placeholder="캐릭터 이름" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
            <Btn type="submit" disabled={!memberName.trim()}>추가</Btn>
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <Select value={memberCls} onChange={(e) => setMemberCls(e.target.value as WowClass)}>
                {WOW_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Select value={memberRole} onChange={(e) => setMemberRole(e.target.value as Role)}>
                {(Object.keys(ROLE_LABEL) as Role[]).map((r) => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
              </Select>
            </div>
          </form>
          {ledger.members.length > 0 && (
            <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden">
              {ledger.members.map((m) => (
                <div key={m.id} className="flex items-center justify-between px-3 py-2 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold truncate">{m.name}</span>
                    <span className="text-xs text-zinc-500">{m.cls}</span>
                    <RoleBadge role={m.role} />
                  </div>
                  <button
                    onClick={() => { if (confirm(`${m.name} 님을 길드원에서 제외할까요? 기록도 함께 지워집니다.`)) api.removeMember(m.id); }}
                    className="text-zinc-600 hover:text-rose-300 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* 연동 */}
      <div>
        <SectionTitle title="연동" hint="디스코드는 기본, 나머지는 파일로" />
        <Card className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-bold">디스코드 채널 웹훅</label>
              <span className={`text-[11px] font-bold ${webhookReady ? 'text-emerald-300' : 'text-zinc-500'}`}>{webhookReady ? '연결됨' : '미설정'}</span>
            </div>
            <Input
              placeholder="https://discord.com/api/webhooks/..."
              value={ledger.settings.discordWebhookUrl}
              onChange={(e) => api.setSettings({ discordWebhookUrl: e.target.value })}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <p className="text-xs text-zinc-500 mt-1.5">
              디스코드 채널 설정 → 연동 → 웹훅 → 새 웹훅 → URL 복사. 이 URL을 아는 사람은 채널에 글을 쓸 수 있으니 공대장만 보관하세요.
            </p>
            <Btn variant="ghost" className="mt-2 w-full" onClick={testWebhook} disabled={!webhookReady || posting}>테스트 메시지 보내기</Btn>
          </div>
          <Toggle
            checked={ledger.settings.autoPostOnClose}
            onChange={(v) => api.setSettings({ autoPostOnClose: v })}
            label="레이드 마감 시 자동 전송"
            hint="참석자·분배·포인트 요약을 채널에 올립니다"
          />
          <div className="border-t border-white/5 pt-4 space-y-2">
            <div className="text-sm font-bold">파일로 주고받기</div>
            <p className="text-xs text-zinc-500">현황·레이드 탭의 CSV 버튼은 엑셀·구글시트용입니다. 아래 백업은 기기를 옮길 때 씁니다.</p>
            <div className="flex gap-2">
              <Btn variant="ghost" className="flex-1" onClick={() => { downloadBackup(ledger); notify('백업 파일을 내려받습니다.'); }}>백업 내려받기</Btn>
              <label className="flex-1">
                <span className="block text-center px-4 py-2.5 rounded-xl text-sm font-bold bg-white/5 text-zinc-200 hover:bg-white/10 border border-white/10 cursor-pointer active:scale-95 transition-all">백업 복원</span>
                <input type="file" accept="application/json,.json" className="hidden" onChange={(e) => { onBackupFile(e.target.files?.[0]); e.target.value = ''; }} />
              </label>
            </div>
          </div>
        </Card>
      </div>

      {/* 설정 */}
      <div>
        <SectionTitle title="설정" />
        <Card className="p-4 space-y-3">
          <div>
            <label className="text-[11px] text-zinc-500">길드 이름</label>
            <Input value={ledger.guildName} onChange={(e) => api.setGuildName(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Btn variant="ghost" className="flex-1" onClick={() => { if (confirm('샘플 데이터로 되돌릴까요? 현재 기록은 지워집니다.')) api.resetToSample(); }}>샘플 데이터</Btn>
            <Btn variant="danger" className="flex-1" onClick={() => { if (confirm('모든 기록을 지우고 빈 장부로 시작할까요?')) api.resetToEmpty(); }}>전부 비우기</Btn>
          </div>
          <p className="text-xs text-zinc-600">지금은 이 기기 안에만 저장됩니다. 길드원 공유는 다음 단계에서 붙입니다.</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
