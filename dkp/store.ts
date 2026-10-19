import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, Ledger, LootEntry, Member, Raid, Settings } from './types';

const STORAGE_KEY = 'gongdae-ledger-v1';

export const uid = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const today = () => new Date().toISOString().slice(0, 10);

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
      id: uid(),
      name: '오닉시아의 둥지',
      date: '2026-12-09',
      basePoints: 10,
      bossPoints: 5,
      bossKills: 1,
      attendeeIds: [tank.id, pal.id, rogue.id, mage.id, druid.id],
      loot: [
        { id: uid(), itemName: '오닉시아 비늘 망토', memberId: tank.id, cost: 8 },
        { id: uid(), itemName: '용의 숨결 지팡이', memberId: mage.id, cost: 12 },
      ],
      closed: true,
    },
    {
      id: uid(),
      name: '무덤 심연 (Barrow Deeps)',
      date: '2026-12-11',
      basePoints: 10,
      bossPoints: 5,
      bossKills: 3,
      attendeeIds: [tank.id, pal.id, rogue.id, hunter.id, druid.id],
      loot: [
        { id: uid(), itemName: '심연의 단검', memberId: rogue.id, cost: 15 },
      ],
      closed: true,
    },
  ];
  return { guildName: 'NTT 길드', members, raids, settings: { ...DEFAULT_SETTINGS } };
};

const emptyLedger = (): Ledger => ({ guildName: '우리 길드', members: [], raids: [], settings: { ...DEFAULT_SETTINGS } });

const load = (): Ledger => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Ledger>;
      // 예전 버전 저장분에도 settings가 있도록 보정
      return {
        guildName: parsed.guildName ?? '우리 길드',
        members: parsed.members ?? [],
        raids: parsed.raids ?? [],
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      };
    }
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

  const addMember = (m: Omit<Member, 'id'>) =>
    update((l) => ({ ...l, members: [...l.members, { ...m, id: uid() }] }));

  const removeMember = (id: string) =>
    update((l) => ({
      ...l,
      members: l.members.filter((m) => m.id !== id),
      raids: l.raids.map((r) => ({
        ...r,
        attendeeIds: r.attendeeIds.filter((x) => x !== id),
        loot: r.loot.filter((x) => x.memberId !== id),
      })),
    }));

  const createRaid = (input: { name: string; date?: string; basePoints: number; bossPoints: number }): string => {
    const id = uid();
    update((l) => ({
      ...l,
      raids: [
        { id, name: input.name, date: input.date || today(), basePoints: input.basePoints, bossPoints: input.bossPoints, bossKills: 0, attendeeIds: [], loot: [], closed: false },
        ...l.raids,
      ],
    }));
    return id;
  };

  const patchRaid = (id: string, patch: Partial<Raid>) =>
    update((l) => ({ ...l, raids: l.raids.map((r) => (r.id === id ? { ...r, ...patch } : r)) }));

  const toggleAttendee = (raidId: string, memberId: string) =>
    update((l) => ({
      ...l,
      raids: l.raids.map((r) =>
        r.id !== raidId
          ? r
          : {
              ...r,
              attendeeIds: r.attendeeIds.includes(memberId)
                ? r.attendeeIds.filter((x) => x !== memberId)
                : [...r.attendeeIds, memberId],
            },
      ),
    }));

  const addLoot = (raidId: string, loot: Omit<LootEntry, 'id'>) =>
    update((l) => ({
      ...l,
      raids: l.raids.map((r) => (r.id === raidId ? { ...r, loot: [...r.loot, { ...loot, id: uid() }] } : r)),
    }));

  const removeLoot = (raidId: string, lootId: string) =>
    update((l) => ({
      ...l,
      raids: l.raids.map((r) => (r.id === raidId ? { ...r, loot: r.loot.filter((x) => x.id !== lootId) } : r)),
    }));

  const deleteRaid = (raidId: string) =>
    update((l) => ({ ...l, raids: l.raids.filter((r) => r.id !== raidId) }));

  const setGuildName = (guildName: string) => update((l) => ({ ...l, guildName }));

  const setSettings = (patch: Partial<Settings>) =>
    update((l) => ({ ...l, settings: { ...l.settings, ...patch } }));

  /** 백업 파일에서 통째로 복원 */
  const importLedger = (incoming: Ledger) =>
    setLedger({ ...incoming, settings: { ...DEFAULT_SETTINGS, ...(incoming.settings ?? {}) } });

  const resetToSample = () => setLedger(sampleLedger());
  const resetToEmpty = () => setLedger(emptyLedger());

  return {
    ledger,
    addMember,
    removeMember,
    createRaid,
    patchRaid,
    toggleAttendee,
    addLoot,
    removeLoot,
    deleteRaid,
    setGuildName,
    setSettings,
    importLedger,
    resetToSample,
    resetToEmpty,
  };
};

export type LedgerApi = ReturnType<typeof useLedger>;
