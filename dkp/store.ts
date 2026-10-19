import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, Ledger, LootEntry, Member, Raid, RAID_MAX, RaidKind, SaleEntry, Settings } from './types';

const STORAGE_KEY = 'gongdae-ledger-v1';

export const uid = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const today = () => new Date().toISOString().slice(0, 10);
const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

const blankRaid = (): Omit<Raid, 'id' | 'name' | 'date' | 'kind'> => ({
  closed: false,
  attendeeIds: [],
  basePoints: 10,
  bossPoints: 5,
  bossKills: 0,
  loot: [],
  guests: [],
  sales: [],
  feePercent: 10,
});

export const sampleLedger = (): Ledger => {
  const members: Member[] = [
    { id: uid(), name: '리브옥토', cls: '전사', role: 'TANK' },
    { id: uid(), name: '신데렐라', cls: '성기사', role: 'HEALER' },
    { id: uid(), name: '검은달', cls: '도적', role: 'DPS' },
    { id: uid(), name: '불꽃놀이', cls: '마법사', role: 'DPS' },
    { id: uid(), name: '숲지기', cls: '드루이드', role: 'HEALER' },
    { id: uid(), name: '화살비', cls: '사냥꾼', role: 'DPS' },
  ];
  const [tank, pal, rogue, mage, druid, hunter] = members;
  const raids: Raid[] = [
    {
      ...blankRaid(),
      id: uid(),
      kind: 'REGULAR',
      name: '오닉시아의 둥지',
      date: daysAgo(7),
      bossKills: 1,
      attendeeIds: [tank.id, pal.id, rogue.id, mage.id, druid.id],
      loot: [
        { id: uid(), itemName: '오닉시아 비늘 망토', memberId: tank.id, cost: 8 },
        { id: uid(), itemName: '용의 숨결 지팡이', memberId: mage.id, cost: 12 },
      ],
      closed: true,
    },
    {
      ...blankRaid(),
      id: uid(),
      kind: 'REGULAR',
      name: '무덤 심연 (Barrow Deeps)',
      date: daysAgo(2),
      bossKills: 3,
      attendeeIds: [tank.id, pal.id, rogue.id, hunter.id, druid.id],
      loot: [{ id: uid(), itemName: '심연의 단검', memberId: rogue.id, cost: 15 }],
      closed: true,
    },
    {
      ...blankRaid(),
      id: uid(),
      kind: 'PUG',
      name: '오닉시아 골팟',
      date: daysAgo(4),
      attendeeIds: [tank.id, pal.id, rogue.id],
      guests: ['얼음칼날', '달빛여우', '천둥발굽', '붉은수염'],
      sales: [
        { id: uid(), itemName: '오닉시아 비늘 망토', gold: 3500, buyer: '얼음칼날' },
        { id: uid(), itemName: '용의 숨결 지팡이', gold: 9000, buyer: '달빛여우' },
      ],
      feePercent: 10,
      closed: true,
    },
  ];
  return { guildName: 'NTT 길드', members, raids, settings: { ...DEFAULT_SETTINGS } };
};

const emptyLedger = (): Ledger => ({ guildName: '우리 길드', members: [], raids: [], settings: { ...DEFAULT_SETTINGS } });

/** 예전 버전 저장분도 지금 구조로 맞춤 */
export const normalize = (parsed: Partial<Ledger>): Ledger => ({
  guildName: parsed.guildName ?? '우리 길드',
  members: parsed.members ?? [],
  raids: (parsed.raids ?? []).map((r) => ({ ...blankRaid(), kind: 'REGULAR' as RaidKind, ...r })),
  settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
});

const load = (): Ledger => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalize(JSON.parse(raw) as Partial<Ledger>);
  } catch {
    /* ignore corrupt storage */
  }
  return sampleLedger();
};

export const useLedger = () => {
  const [ledger, setLedger] = useState<Ledger>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger));
    } catch {
      /* storage may be unavailable (private mode) */
    }
  }, [ledger]);

  const update = useCallback((fn: (prev: Ledger) => Ledger) => setLedger((prev) => fn(prev)), []);
  const patchRaidFn = (id: string, fn: (r: Raid) => Raid) =>
    update((l) => ({ ...l, raids: l.raids.map((r) => (r.id === id ? fn(r) : r)) }));

  // ---- 길드원 ----
  const addMember = (m: Omit<Member, 'id'>) =>
    update((l) => ({ ...l, members: [...l.members, { ...m, id: uid() }] }));

  const addMembers = (list: Omit<Member, 'id'>[]) =>
    update((l) => {
      const existing = new Set(l.members.map((m) => m.name));
      const fresh = list.filter((m) => m.name && !existing.has(m.name)).map((m) => ({ ...m, id: uid() }));
      return { ...l, members: [...l.members, ...fresh] };
    });

  const removeMember = (id: string) =>
    update((l) => ({
      ...l,
      members: l.members.filter((m) => m.id !== id),
      raids: l.raids.map((r) => ({
        ...r,
        attendeeIds: r.attendeeIds.filter((x) => x !== id),
        loot: r.loot.filter((x) => x.memberId !== id),
      })),
      settings: { ...l.settings, myMemberId: l.settings.myMemberId === id ? null : l.settings.myMemberId },
    }));

  // ---- 레이드 ----
  const createRaid = (input: { kind: RaidKind; name: string; date?: string; basePoints?: number; bossPoints?: number; feePercent?: number }): string => {
    const id = uid();
    update((l) => ({
      ...l,
      raids: [
        {
          ...blankRaid(),
          id,
          kind: input.kind,
          name: input.name,
          date: input.date || today(),
          basePoints: input.basePoints ?? 10,
          bossPoints: input.bossPoints ?? 5,
          feePercent: input.feePercent ?? 10,
        },
        ...l.raids,
      ],
    }));
    return id;
  };

  const patchRaid = (id: string, patch: Partial<Raid>) => patchRaidFn(id, (r) => ({ ...r, ...patch }));

  const toggleAttendee = (raidId: string, memberId: string) =>
    patchRaidFn(raidId, (r) => {
      if (r.attendeeIds.includes(memberId)) return { ...r, attendeeIds: r.attendeeIds.filter((x) => x !== memberId) };
      if (r.attendeeIds.length + r.guests.length >= RAID_MAX) return r; // 상한 초과는 무시 (화면에서 안내)
      return { ...r, attendeeIds: [...r.attendeeIds, memberId] };
    });

  /** 상한을 넘기면 앞에서부터 잘라 넣음 */
  const setAttendees = (raidId: string, memberIds: string[]) =>
    patchRaidFn(raidId, (r) => ({ ...r, attendeeIds: [...new Set(memberIds)].slice(0, Math.max(0, RAID_MAX - r.guests.length)) }));

  const addLoot = (raidId: string, loot: Omit<LootEntry, 'id'>) =>
    patchRaidFn(raidId, (r) => ({ ...r, loot: [...r.loot, { ...loot, id: uid() }] }));

  const removeLoot = (raidId: string, lootId: string) =>
    patchRaidFn(raidId, (r) => ({ ...r, loot: r.loot.filter((x) => x.id !== lootId) }));

  // ---- 골팟 ----
  const addGuest = (raidId: string, name: string) =>
    patchRaidFn(raidId, (r) =>
      r.guests.includes(name) || r.attendeeIds.length + r.guests.length >= RAID_MAX ? r : { ...r, guests: [...r.guests, name] },
    );

  const removeGuest = (raidId: string, name: string) =>
    patchRaidFn(raidId, (r) => ({ ...r, guests: r.guests.filter((g) => g !== name) }));

  const addSale = (raidId: string, sale: Omit<SaleEntry, 'id'>) =>
    patchRaidFn(raidId, (r) => ({ ...r, sales: [...r.sales, { ...sale, id: uid() }] }));

  const removeSale = (raidId: string, saleId: string) =>
    patchRaidFn(raidId, (r) => ({ ...r, sales: r.sales.filter((x) => x.id !== saleId) }));

  const deleteRaid = (raidId: string) => update((l) => ({ ...l, raids: l.raids.filter((r) => r.id !== raidId) }));

  // ---- 설정 ----
  const setGuildName = (guildName: string) => update((l) => ({ ...l, guildName }));
  const setSettings = (patch: Partial<Settings>) => update((l) => ({ ...l, settings: { ...l.settings, ...patch } }));
  const importLedger = (incoming: Partial<Ledger>) => setLedger(normalize(incoming));
  const resetToSample = () => setLedger(sampleLedger());
  const resetToEmpty = () => setLedger(emptyLedger());

  return {
    ledger,
    addMember, addMembers, removeMember,
    createRaid, patchRaid, deleteRaid,
    toggleAttendee, setAttendees, addLoot, removeLoot,
    addGuest, removeGuest, addSale, removeSale,
    setGuildName, setSettings, importLedger, resetToSample, resetToEmpty,
  };
};

export type LedgerApi = ReturnType<typeof useLedger>;
