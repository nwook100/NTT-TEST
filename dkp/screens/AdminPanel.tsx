import React, { useMemo, useState } from 'react';
import { fmtDate, fmtGold, knownGuests, knownItemNames, knownRaidNames, raidPoints, roleCount, settlePug, summarize } from '../calc';
import { buildRaidEmbed, isDiscordWebhook, postToDiscord } from '../integrations/discord';
import { downloadBackup, downloadLootCsv, readBackupFile } from '../integrations/share';
import { LedgerApi, today } from '../store';
import { Raid, RaidKind, Role, ROLE_LABEL, WOW_CLASSES, WowClass } from '../types';
import { Btn, Card, Chip, Collapsible, ConfirmSheet, Empty, Input, Label, Points, ROLE_COLOR, RoleBadge, SectionTitle, Select, Sheet, Textarea, Toggle } from '../ui';

const COST_PRESETS = [5, 10, 15, 20, 30];
const FEE_PRESETS = [0, 5, 10, 15, 20];

/** 직업으로 역할 추정 (등록 시 기본값) */
const guessRole = (cls: WowClass): Role => (cls === '전사' ? 'TANK' : cls === '사제' || cls === '드루이드' || cls === '성기사' ? 'HEALER' : 'DPS');

const maskWebhook = (url: string) => {
  const m = url.match(/\/webhooks\/(\d+)\/([\w-]+)$/);
  return m ? `discord.com/…/${m[1].slice(-4)}/${m[2].slice(0, 4)}…` : url;
};

type Props = { api: LedgerApi; notify: (msg: string) => void; goRaids: () => void };

const AdminPanel: React.FC<Props> = ({ api, notify, goRaids }) => {
  const { ledger } = api;
  const openRaid = ledger.raids.find((r) => !r.closed) ?? null;
  const webhookReady = isDiscordWebhook(ledger.settings.discordWebhookUrl);
  const balances = useMemo(() => Object.fromEntries(summarize(ledger).map((r) => [r.member.id, r.balance])), [ledger]);

  // ---- 상태 ----
  const [posting, setPosting] = useState(false);
  const [lastClosed, setLastClosed] = useState<{ raid: Raid; posted: boolean } | null>(null);
  const [confirm, setConfirm] = useState<null | { title: string; message: string; label: string; danger?: boolean; run: () => void }>(null);

  // 레이드 생성
  const [kind, setKind] = useState<RaidKind>('REGULAR');
  const [raidName, setRaidName] = useState('');
  const [raidDate, setRaidDate] = useState(today());
  const [basePoints, setBasePoints] = useState(10);
  const [bossPoints, setBossPoints] = useState(5);
  const [feePercent, setFeePercent] = useState(10);

  // 참석
  const [attSearch, setAttSearch] = useState('');

  // 분배(정규)
  const [itemName, setItemName] = useState('');
  const [lootMember, setLootMember] = useState('');
  const [lootCost, setLootCost] = useState(10);

  // 골팟
  const [guestName, setGuestName] = useState('');
  const [saleItem, setSaleItem] = useState('');
  const [saleGold, setSaleGold] = useState('');
  const [saleBuyer, setSaleBuyer] = useState('');

  // 길드원
  const [memberName, setMemberName] = useState('');
  const [memberCls, setMemberCls] = useState<WowClass>('전사');
  const [memberRole, setMemberRole] = useState<Role>('TANK');
  const [bulkText, setBulkText] = useState('');
  const [editMembers, setEditMembers] = useState(false);

  // 연동
  const [editWebhook, setEditWebhook] = useState(false);
  const [wipeOpen, setWipeOpen] = useState(false);
  const [wipeText, setWipeText] = useState('');

  const itemNames = knownItemNames(ledger);
  const raidNames = knownRaidNames(ledger);
  const guests = knownGuests(ledger);

  // ---- 동작 ----
  const submitRaid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!raidName.trim()) return;
    api.createRaid({ kind, name: raidName.trim(), date: raidDate, basePoints, bossPoints, feePercent });
    setRaidName('');
    setLastClosed(null);
    notify(kind === 'PUG' ? '골팟을 시작했습니다. 참여자와 판매를 입력하세요.' : '레이드를 시작했습니다. 참석을 체크하세요.');
  };

  const closeRaid = async () => {
    if (!openRaid) return;
    const closed = { ...openRaid, closed: true };
    api.patchRaid(openRaid.id, { closed: true });
    let posted = false;
    if (ledger.settings.autoPostOnClose && webhookReady) {
      setPosting(true);
      try {
        await postToDiscord(ledger.settings.discordWebhookUrl, buildRaidEmbed(ledger, closed));
        posted = true;
      } catch (e) {
        notify(`마감은 됐지만 디스코드 전송 실패: ${(e as Error).message}`);
      } finally {
        setPosting(false);
      }
    }
    setLastClosed({ raid: closed, posted });
  };

  const submitLoot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!openRaid || !itemName.trim() || !lootMember) return;
    api.addLoot(openRaid.id, { itemName: itemName.trim(), memberId: lootMember, cost: lootCost });
    const name = ledger.members.find((m) => m.id === lootMember)?.name ?? '';
    notify(`${name} −${lootCost} · ${itemName.trim()}`);
    setItemName('');
  };

  const submitGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!openRaid || !guestName.trim()) return;
    guestName.split(/[,\n]/).map((s) => s.trim()).filter(Boolean).forEach((g) => api.addGuest(openRaid.id, g));
    setGuestName('');
  };

  const submitSale = (e: React.FormEvent) => {
    e.preventDefault();
    const gold = Number(saleGold.replace(/[^\d]/g, ''));
    if (!openRaid || !saleItem.trim() || !gold) return;
    api.addSale(openRaid.id, { itemName: saleItem.trim(), gold, buyer: saleBuyer.trim() });
    notify(`${saleItem.trim()} ${fmtGold(gold)} 기록`);
    setSaleItem(''); setSaleGold(''); setSaleBuyer('');
  };

  const submitMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    api.addMember({ name: memberName.trim(), cls: memberCls, role: memberRole });
    setMemberName('');
  };

  const submitBulk = () => {
    // 한 줄에 한 명: "이름" 또는 "이름 직업" 또는 "이름 직업 역할"
    const roleByLabel: Record<string, Role> = { 탱커: 'TANK', 탱: 'TANK', 힐러: 'HEALER', 힐: 'HEALER', 딜러: 'DPS', 딜: 'DPS' };
    const list = bulkText.split(/\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
      const [name, clsRaw, roleRaw] = line.split(/[\s,/]+/);
      const cls = (WOW_CLASSES as readonly string[]).includes(clsRaw) ? (clsRaw as WowClass) : '전사';
      const role = roleByLabel[roleRaw] ?? guessRole(cls);
      return { name, cls, role };
    });
    if (list.length === 0) return;
    api.addMembers(list);
    setBulkText('');
    notify(`${list.length}명을 추가했습니다. 직업·역할은 나중에 고칠 수 있습니다.`);
  };

  const testWebhook = async () => {
    setPosting(true);
    try {
      await postToDiscord(ledger.settings.discordWebhookUrl, {
        username: '공대장부',
        embeds: [{ title: '✅ 공대장부 연동 완료', description: `${ledger.guildName}의 레이드 결과가 이 채널로 옵니다.`, color: 0xff6b35 }],
      });
      notify('디스코드 채널에 테스트 메시지를 보냈습니다.');
      setEditWebhook(false);
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
      setConfirm({ title: '백업 복원', message: `'${data.guildName ?? '백업'}' 파일로 덮어씁니다. 현재 기록은 사라집니다.`, label: '복원', danger: true, run: () => { api.importLedger(data); notify('백업을 복원했습니다.'); } });
    } catch (e) {
      notify((e as Error).message);
    }
  };

  // ---- 렌더 조각 ----
  const renderAttendance = (raid: Raid) => {
    const rc = roleCount(ledger, raid.attendeeIds);
    const q = attSearch.trim();
    const groups = (Object.keys(ROLE_LABEL) as Role[]).map((role) => ({
      role,
      members: ledger.members.filter((m) => m.role === role && (!q || m.name.includes(q))),
    }));
    const lastClosedRegular = ledger.raids.find((r) => r.closed && r.id !== raid.id);
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>참석 · {raid.attendeeIds.length}명 (탱 {rc.TANK} / 힐 {rc.HEALER} / 딜 {rc.DPS})</Label>
          <div className="flex gap-1">
            <Btn variant="ghost" size="sm" onClick={() => api.setAttendees(raid.id, ledger.members.map((m) => m.id))}>전원</Btn>
            {lastClosedRegular && <Btn variant="ghost" size="sm" onClick={() => api.setAttendees(raid.id, lastClosedRegular.attendeeIds)}>지난번</Btn>}
            <Btn variant="ghost" size="sm" onClick={() => api.setAttendees(raid.id, [])}>해제</Btn>
          </div>
        </div>
        {ledger.members.length > 8 && <Input placeholder="이름 검색" value={attSearch} onChange={(e) => setAttSearch(e.target.value)} className="mb-2" />}
        {ledger.members.length === 0 ? (
          <Empty>아래 길드원 섹션에서 먼저 등록하세요.</Empty>
        ) : (
          <div className="space-y-3">
            {groups.filter((g) => g.members.length > 0).map((g) => (
              <div key={g.role}>
                <div className={`text-[11px] font-bold mb-1.5 flex items-center gap-1.5 ${ROLE_COLOR[g.role].text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${ROLE_COLOR[g.role].dot}`} />
                  {ROLE_LABEL[g.role]} {g.members.filter((m) => raid.attendeeIds.includes(m.id)).length}/{g.members.length}
                </div>
                <div className={`grid gap-1.5 ${ledger.members.length > 12 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  {g.members.map((m) => {
                    const on = raid.attendeeIds.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        onClick={() => api.toggleAttendee(raid.id, m.id)}
                        aria-pressed={on}
                        className={`flex items-center justify-between gap-1 px-3 py-2 rounded-xl border text-left transition-all active:scale-95 ${
                          on ? `${ROLE_COLOR[m.role].bg} ${ROLE_COLOR[m.role].border}` : 'bg-white/[0.02] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-sm truncate">{m.name}</div>
                          {ledger.members.length <= 12 && <div className="text-[11px] text-zinc-400">{m.cls}</div>}
                        </div>
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${on ? 'bg-white text-black border-white' : 'border-white/20 text-transparent'}`}>✓</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderRegular = (raid: Raid) => (
    <>
      {/* 보스 킬 + 지급 포인트를 한 덩어리로 */}
      <div className="flex items-center justify-between bg-black/30 rounded-xl px-4 py-3">
        <div>
          <div className="font-bold">보스 처치</div>
          <div className="text-xs text-zinc-400">기본 {raid.basePoints} + 킬당 {raid.bossPoints} = <span className="text-zinc-100 font-bold">참석 {raidPoints(raid)}점</span></div>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="ghost" aria-label="보스 킬 빼기" onClick={() => api.patchRaid(raid.id, { bossKills: Math.max(0, raid.bossKills - 1) })}>−</Btn>
          <span className="font-mono text-2xl font-black w-8 text-center tabular-nums">{raid.bossKills}</span>
          <Btn variant="ghost" aria-label="보스 킬 더하기" onClick={() => api.patchRaid(raid.id, { bossKills: raid.bossKills + 1 })}>+</Btn>
        </div>
      </div>

      {renderAttendance(raid)}

      <div>
        <Label className="mb-2">아이템 분배 · {raid.loot.length}건</Label>
        {raid.loot.length > 0 && (
          <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden mb-3">
            {raid.loot.map((l) => (
              <div key={l.id} className="flex items-center justify-between px-3 py-2 text-sm">
                <div className="min-w-0">
                  <div className="font-bold truncate">{l.itemName}</div>
                  <div className="text-xs text-zinc-400">{ledger.members.find((m) => m.id === l.memberId)?.name ?? '(탈퇴)'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-rose-300">−{l.cost}</span>
                  <button onClick={() => api.removeLoot(raid.id, l.id)} className="text-zinc-500 hover:text-rose-300 text-lg leading-none px-1" aria-label="분배 취소">×</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {raid.attendeeIds.length === 0 ? (
          <p className="text-xs text-zinc-400">참석 체크한 사람에게만 분배할 수 있습니다.</p>
        ) : (
          <form onSubmit={submitLoot} className="space-y-2">
            <Input list="item-names" placeholder="아이템 이름" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <datalist id="item-names">{itemNames.map((n) => <option key={n} value={n} />)}</datalist>
            <Select value={lootMember} onChange={(e) => setLootMember(e.target.value)}>
              <option value="">받는 사람 (잔여 포인트)</option>
              {raid.attendeeIds.map((id) => {
                const m = ledger.members.find((x) => x.id === id);
                return m ? <option key={id} value={id}>{m.name} · {m.cls} · 잔여 {balances[id] ?? 0}</option> : null;
              })}
            </Select>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {COST_PRESETS.map((c) => <Chip key={c} active={lootCost === c} onClick={() => setLootCost(c)}>{c}</Chip>)}
              <Input type="number" inputMode="numeric" min={0} value={lootCost} onChange={(e) => setLootCost(Number(e.target.value))} className="w-20 shrink-0 py-1.5" aria-label="포인트 직접 입력" />
            </div>
            {lootMember && (balances[lootMember] ?? 0) < lootCost && (
              <p className="text-xs text-amber-300">잔여 {balances[lootMember] ?? 0}점인데 {lootCost}점을 씁니다. 기록은 되지만 마이너스가 됩니다.</p>
            )}
            <Btn type="submit" className="w-full" disabled={!itemName.trim() || !lootMember}>분배 기록</Btn>
          </form>
        )}
      </div>
    </>
  );

  const renderPug = (raid: Raid) => {
    const s = settlePug(ledger, raid);
    return (
      <>
        <div className="grid grid-cols-3 gap-2 bg-black/30 rounded-xl px-3 py-3 text-center">
          <div><Label>총 판매</Label><div className="font-mono font-black tabular-nums text-amber-300 mt-0.5">{fmtGold(s.totalGold)}</div></div>
          <div><Label>인원</Label><div className="font-mono font-black tabular-nums mt-0.5">{s.participants.length}명</div></div>
          <div><Label>1인 분배</Label><div className="font-mono font-black tabular-nums text-amber-300 mt-0.5">{fmtGold(s.cutPerPerson)}</div></div>
        </div>
        <div>
          <Label className="mb-1.5">공대장 수수료 · {fmtGold(s.feeGold)}{s.remainder > 0 ? ` (+자투리 ${fmtGold(s.remainder)})` : ''}</Label>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {FEE_PRESETS.map((f) => <Chip key={f} active={raid.feePercent === f} onClick={() => api.patchRaid(raid.id, { feePercent: f })}>{f}%</Chip>)}
          </div>
        </div>

        {renderAttendance(raid)}

        <div>
          <Label className="mb-2">외부 참여자 · {raid.guests.length}명</Label>
          {raid.guests.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {raid.guests.map((g) => (
                <span key={g} className="inline-flex items-center gap-1 text-xs bg-amber-400/10 border border-amber-400/20 text-amber-200 rounded-full pl-2.5 pr-1.5 py-1">
                  {g}<button onClick={() => api.removeGuest(raid.id, g)} className="text-amber-200/60 hover:text-white px-1" aria-label={`${g} 제외`}>×</button>
                </span>
              ))}
            </div>
          )}
          <form onSubmit={submitGuest} className="grid grid-cols-[1fr_auto] gap-2">
            <Input list="guest-names" placeholder="닉네임 (쉼표로 여러 명)" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
            <datalist id="guest-names">{guests.map((n) => <option key={n} value={n} />)}</datalist>
            <Btn type="submit" disabled={!guestName.trim()}>추가</Btn>
          </form>
        </div>

        <div>
          <Label className="mb-2">판매 · {raid.sales.length}건</Label>
          {raid.sales.length > 0 && (
            <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden mb-3">
              {raid.sales.map((x) => (
                <div key={x.id} className="flex items-center justify-between px-3 py-2 text-sm">
                  <div className="min-w-0">
                    <div className="font-bold truncate">{x.itemName}</div>
                    {x.buyer && <div className="text-xs text-zinc-400">{x.buyer}</div>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-300">{fmtGold(x.gold)}</span>
                    <button onClick={() => api.removeSale(raid.id, x.id)} className="text-zinc-500 hover:text-rose-300 text-lg leading-none px-1" aria-label="판매 취소">×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={submitSale} className="space-y-2">
            <Input list="item-names" placeholder="아이템 이름" value={saleItem} onChange={(e) => setSaleItem(e.target.value)} />
            <datalist id="item-names">{itemNames.map((n) => <option key={n} value={n} />)}</datalist>
            <div className="grid grid-cols-2 gap-2">
              <Input inputMode="numeric" placeholder="골드" value={saleGold} onChange={(e) => setSaleGold(e.target.value)} />
              <Input placeholder="구매자 (선택)" value={saleBuyer} onChange={(e) => setSaleBuyer(e.target.value)} />
            </div>
            <Btn type="submit" className="w-full" disabled={!saleItem.trim() || !Number(saleGold.replace(/[^\d]/g, ''))}>판매 기록</Btn>
          </form>
        </div>
      </>
    );
  };

  return (
    <div className={`space-y-5 ${openRaid ? 'pb-16' : ''}`}>
      {/* 오늘 레이드 */}
      <div>
        <SectionTitle
          title={openRaid ? (openRaid.kind === 'PUG' ? '진행 중 골팟' : '진행 중 레이드') : '새 레이드'}
          hint={openRaid ? (openRaid.kind === 'PUG' ? '참여자 → 판매 입력 → 마감 → 와우 채팅에 정산 붙여넣기' : '참석 체크 → 보스 킬 → 분배 입력 → 마감') : undefined}
        />
        {openRaid ? (
          <Card className="p-4 space-y-5 border-l-[3px] border-l-[#ff6b35]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs text-zinc-400">{fmtDate(openRaid.date)} · {openRaid.kind === 'PUG' ? '단기공대' : '정규공대'}</div>
                <h3 className="text-lg font-black truncate">{openRaid.name}</h3>
              </div>
              <button
                onClick={() => setConfirm({ title: '레이드 삭제', message: `'${openRaid.name}' 기록을 완전히 지웁니다. 되돌릴 수 없습니다.`, label: '삭제', danger: true, run: () => api.deleteRaid(openRaid.id) })}
                className="text-xs text-zinc-500 hover:text-rose-300 px-1 shrink-0"
              >
                삭제
              </button>
            </div>
            {openRaid.kind === 'PUG' ? renderPug(openRaid) : renderRegular(openRaid)}
          </Card>
        ) : lastClosed ? (
          /* 마감 결과 카드: 무엇이 기록됐고 어디로 갔는지 */
          <Card className="p-4 space-y-3 border-[#ff6b35]/40">
            <div className="flex items-center justify-between">
              <div>
                <Label>마감 완료</Label>
                <h3 className="text-lg font-black">{lastClosed.raid.name}</h3>
                <div className="text-xs text-zinc-400">{fmtDate(lastClosed.raid.date)}</div>
              </div>
              {lastClosed.raid.kind === 'PUG' ? (
                <div className="text-right"><Label>1인 분배</Label><div className="font-mono font-black text-amber-300 text-xl">{fmtGold(settlePug(ledger, lastClosed.raid).cutPerPerson)}</div></div>
              ) : (
                <div className="text-right"><Label>참석 포인트</Label><Points value={raidPoints(lastClosed.raid)} accent className="text-xl" /></div>
              )}
            </div>
            <div className="text-sm text-zinc-300">
              {lastClosed.raid.kind === 'PUG'
                ? `${lastClosed.raid.attendeeIds.length + lastClosed.raid.guests.length}명 · 판매 ${lastClosed.raid.sales.length}건 · ${fmtGold(settlePug(ledger, lastClosed.raid).totalGold)}`
                : `참석 ${lastClosed.raid.attendeeIds.length}명 · 보스 ${lastClosed.raid.bossKills}킬 · 분배 ${lastClosed.raid.loot.length}건`}
            </div>
            <div className={`text-xs font-bold ${lastClosed.posted ? 'text-emerald-300' : 'text-zinc-400'}`}>
              {lastClosed.posted ? '✓ 디스코드 채널에 전송됨' : webhookReady ? '디스코드 자동 전송 꺼짐' : '디스코드 미연동 · 레이드 탭에서 공유할 수 있습니다'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Btn variant="ghost" onClick={goRaids}>{lastClosed.raid.kind === 'PUG' ? '와우 채팅용 정산 보기' : '레이드 탭에서 보기'}</Btn>
              <Btn onClick={() => setLastClosed(null)}>새 레이드</Btn>
            </div>
          </Card>
        ) : (
          <Card className="p-4">
            <form onSubmit={submitRaid} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {(['REGULAR', 'PUG'] as RaidKind[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKind(k)}
                    className={`rounded-xl border px-3 py-3 text-left transition-all ${kind === k ? 'border-[#ff6b35] bg-[#ff6b35]/10' : 'border-white/10 bg-white/[0.02]'}`}
                  >
                    <div className="font-black text-sm">{k === 'REGULAR' ? '정규공대' : '단기공대 (골팟)'}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{k === 'REGULAR' ? '길드 포인트로 분배' : '골드로 팔아 N분의 1'}</div>
                  </button>
                ))}
              </div>
              <Input placeholder={kind === 'PUG' ? '골팟 이름 (예: 오닉시아 골팟)' : '레이드 이름 (예: 오닉시아의 둥지)'} value={raidName} onChange={(e) => setRaidName(e.target.value)} />
              {raidNames.length > 0 && (
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {raidNames.slice(0, 6).map((n) => <Chip key={n} active={raidName === n} onClick={() => setRaidName(n)}>{n}</Chip>)}
                </div>
              )}
              <div>
                <Label className="mb-1">날짜</Label>
                <Input type="date" value={raidDate} onChange={(e) => setRaidDate(e.target.value)} />
              </div>
              {kind === 'REGULAR' ? (
                <div className="grid grid-cols-2 gap-2">
                  <div><Label className="mb-1">참석 기본 포인트</Label><Input type="number" inputMode="numeric" min={0} value={basePoints} onChange={(e) => setBasePoints(Number(e.target.value))} /></div>
                  <div><Label className="mb-1">보스당 포인트</Label><Input type="number" inputMode="numeric" min={0} value={bossPoints} onChange={(e) => setBossPoints(Number(e.target.value))} /></div>
                </div>
              ) : (
                <div>
                  <Label className="mb-1">공대장 수수료</Label>
                  <div className="flex gap-1.5">{FEE_PRESETS.map((f) => <Chip key={f} active={feePercent === f} onClick={() => setFeePercent(f)}>{f}%</Chip>)}</div>
                </div>
              )}
              <Btn type="submit" size="lg" className="w-full" disabled={!raidName.trim()}>{raidName.trim() ? (kind === 'PUG' ? '골팟 시작' : '레이드 시작') : '이름을 입력하면 시작할 수 있어요'}</Btn>
            </form>
          </Card>
        )}
      </div>

      {/* 길드원 */}
      <Collapsible title="길드원" hint={`${ledger.members.length}명`} defaultOpen={ledger.members.length === 0}>
        <div className="space-y-4 pt-2">
          <form onSubmit={submitMember} className="space-y-2">
            <Input placeholder="캐릭터 이름" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <Select value={memberCls} onChange={(e) => { const c = e.target.value as WowClass; setMemberCls(c); setMemberRole(guessRole(c)); }}>
                {WOW_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Select value={memberRole} onChange={(e) => setMemberRole(e.target.value as Role)}>
                {(Object.keys(ROLE_LABEL) as Role[]).map((r) => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
              </Select>
            </div>
            <Btn type="submit" className="w-full" disabled={!memberName.trim()}>추가</Btn>
          </form>
          <details className="group">
            <summary className="list-none cursor-pointer text-xs text-zinc-300 [&::-webkit-details-marker]:hidden">▸ 여러 명 한 번에 붙여넣기</summary>
            <div className="mt-2 space-y-2">
              <Textarea rows={4} placeholder={'한 줄에 한 명\n이름\n이름 직업\n이름 직업 역할  (예: 검은달 도적 딜)'} value={bulkText} onChange={(e) => setBulkText(e.target.value)} />
              <Btn variant="ghost" className="w-full" onClick={submitBulk} disabled={!bulkText.trim()}>붙여넣은 목록 추가</Btn>
            </div>
          </details>
          {ledger.members.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label>등록된 길드원</Label>
                <Btn variant="subtle" size="sm" onClick={() => setEditMembers((v) => !v)}>{editMembers ? '완료' : '편집'}</Btn>
              </div>
              <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden">
                {ledger.members.map((m) => (
                  <div key={m.id} className="flex items-center justify-between px-3 py-2 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-bold truncate">{m.name}</span>
                      <span className="text-xs text-zinc-400">{m.cls}</span>
                      <RoleBadge role={m.role} />
                    </div>
                    {editMembers && (
                      <button
                        onClick={() => setConfirm({ title: '길드원 제외', message: `${m.name} 님을 제외하면 참석·분배 기록도 함께 지워집니다.`, label: '제외', danger: true, run: () => api.removeMember(m.id) })}
                        className="text-rose-300 text-xs font-bold px-2"
                      >
                        제외
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Collapsible>

      {/* 연동 */}
      <Collapsible title="연동" hint={webhookReady ? '디스코드 연결됨' : '디스코드 미설정'}>
        <div className="space-y-4 pt-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label>디스코드 채널 웹훅</Label>
              <span className="flex items-center gap-1.5 text-[11px] font-bold">
                <span className={`w-1.5 h-1.5 rounded-full ${webhookReady ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                <span className={webhookReady ? 'text-emerald-300' : 'text-zinc-400'}>{webhookReady ? '연결됨' : '미설정'}</span>
              </span>
            </div>
            {webhookReady && !editWebhook ? (
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-black/40 border border-emerald-500/30 rounded-xl px-3 py-2.5 text-sm font-mono text-zinc-300 truncate">{maskWebhook(ledger.settings.discordWebhookUrl)}</div>
                <Btn variant="ghost" onClick={() => setEditWebhook(true)}>변경</Btn>
              </div>
            ) : (
              <>
                <Input placeholder="https://discord.com/api/webhooks/…" value={ledger.settings.discordWebhookUrl} onChange={(e) => api.setSettings({ discordWebhookUrl: e.target.value })} autoCapitalize="off" autoCorrect="off" spellCheck={false} />
                <p className="text-xs text-zinc-400 mt-1.5">디스코드 채널 설정 → 연동 → 웹훅 → 새 웹훅 → URL 복사. 이 URL로 누구나 채널에 글을 쓸 수 있으니 공대장만 보관하세요.</p>
              </>
            )}
            <Btn variant="ghost" className="mt-2 w-full" onClick={testWebhook} disabled={!webhookReady || posting}>테스트 메시지 보내기</Btn>
          </div>
          <Toggle checked={ledger.settings.autoPostOnClose} onChange={(v) => api.setSettings({ autoPostOnClose: v })} label="레이드 마감 시 자동 전송" hint="참석자·분배·포인트 요약을 채널에 올립니다" />
          <div className="border-t border-white/5 pt-4 space-y-2">
            <Label>파일로 주고받기</Label>
            <div className="grid grid-cols-3 gap-2">
              <Btn variant="ghost" size="sm" onClick={() => { downloadLootCsv(ledger); notify('분배 내역 CSV를 내려받습니다.'); }}>분배 CSV</Btn>
              <Btn variant="ghost" size="sm" onClick={() => { downloadBackup(ledger); notify('백업 파일을 내려받습니다.'); }}>백업</Btn>
              <label>
                <span className="block text-center px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 text-zinc-200 hover:bg-white/10 border border-white/10 cursor-pointer active:scale-95 transition-all">복원</span>
                <input type="file" accept="application/json,.json" className="hidden" onChange={(e) => { onBackupFile(e.target.files?.[0]); e.target.value = ''; }} />
              </label>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* 설정 */}
      <Collapsible title="설정">
        <div className="space-y-4 pt-2">
          <div>
            <Label className="mb-1">길드 이름</Label>
            <Input value={ledger.guildName} onChange={(e) => api.setGuildName(e.target.value)} />
          </div>
          <Btn variant="ghost" className="w-full" onClick={() => setConfirm({ title: '샘플 데이터', message: '샘플 길드·레이드로 되돌립니다. 현재 기록은 사라집니다.', label: '샘플로 되돌리기', danger: true, run: () => { api.resetToSample(); setLastClosed(null); } })}>샘플 데이터로 보기</Btn>
          <div className="text-right">
            <button onClick={() => { setWipeText(''); setWipeOpen(true); }} className="text-xs text-zinc-500 hover:text-rose-300">모든 기록 지우기</button>
          </div>
        </div>
      </Collapsible>

      {/* 마감 바: 하단 탭 위에 고정. 삭제와 떨어뜨려 둔다 */}
      {openRaid && (
        <div className="fixed inset-x-0 z-30 px-4" style={{ bottom: 'calc(64px + env(safe-area-inset-bottom))' }}>
          <div className="max-w-xl mx-auto">
            <Btn size="lg" className="w-full shadow-2xl shadow-black/60 flex items-center justify-between" onClick={closeRaid} disabled={posting}>
              <span>{posting ? '전송 중…' : ledger.settings.autoPostOnClose && webhookReady ? '마감 + 디스코드 전송' : '마감'}</span>
              <span className="text-xs font-bold opacity-80">
                {openRaid.kind === 'PUG'
                  ? `${openRaid.attendeeIds.length + openRaid.guests.length}명 · 판매 ${openRaid.sales.length}건 · 1인 ${fmtGold(settlePug(ledger, openRaid).cutPerPerson)}`
                  : `참석 ${openRaid.attendeeIds.length}명 · 분배 ${openRaid.loot.length}건`}
              </span>
            </Btn>
          </div>
        </div>
      )}

      <ConfirmSheet open={!!confirm} title={confirm?.title ?? ''} message={confirm?.message ?? ''} confirmLabel={confirm?.label ?? '확인'} danger={confirm?.danger} onConfirm={() => confirm?.run()} onClose={() => setConfirm(null)} />

      <Sheet open={wipeOpen} onClose={() => setWipeOpen(false)} title="모든 기록 지우기">
        <p className="text-sm text-zinc-300 mb-3">길드원, 레이드, 분배 기록이 전부 사라집니다. 되돌릴 수 없으니 먼저 백업을 받아두세요.</p>
        <Label className="mb-1">확인을 위해 <span className="text-white">지우기</span>라고 입력</Label>
        <Input value={wipeText} onChange={(e) => setWipeText(e.target.value)} placeholder="지우기" />
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Btn variant="danger" size="lg" disabled={wipeText !== '지우기'} onClick={() => { api.resetToEmpty(); setLastClosed(null); setWipeOpen(false); notify('빈 장부로 시작합니다.'); }}>전부 지우기</Btn>
          <Btn variant="ghost" size="lg" onClick={() => setWipeOpen(false)}>취소</Btn>
        </div>
      </Sheet>
    </div>
  );
};

export default AdminPanel;
