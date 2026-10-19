export type Role = 'TANK' | 'HEALER' | 'DPS';

export const ROLE_LABEL: Record<Role, string> = {
  TANK: '탱커',
  HEALER: '힐러',
  DPS: '딜러',
};

export const WOW_CLASSES = [
  '전사', '성기사', '사냥꾼', '도적', '사제', '주술사', '마법사', '흑마법사', '드루이드',
] as const;

export type WowClass = (typeof WOW_CLASSES)[number];

export interface Member {
  id: string;
  name: string;
  cls: WowClass;
  role: Role;
}

/** 정규공대: 포인트로 분배 */
export interface LootEntry {
  id: string;
  itemName: string;
  memberId: string;
  cost: number;
}

/** 단기공대(골팟): 아이템을 골드로 팔아 나눔 */
export interface SaleEntry {
  id: string;
  itemName: string;
  gold: number;
  buyer: string;
}

export type RaidKind = 'REGULAR' | 'PUG';

export const RAID_KIND_LABEL: Record<RaidKind, string> = {
  REGULAR: '정규공대',
  PUG: '단기공대 (골팟)',
};

export interface Raid {
  id: string;
  kind: RaidKind;
  name: string;
  date: string; // YYYY-MM-DD
  closed: boolean;
  /** 길드원 참석 (정규: 포인트 지급 대상, 골팟: 분배 인원에 포함) */
  attendeeIds: string[];

  // ---- 정규공대 ----
  basePoints: number;
  bossPoints: number;
  bossKills: number;
  loot: LootEntry[];

  // ---- 단기공대 ----
  /** 길드원이 아닌 외부 참여자 이름 */
  guests: string[];
  sales: SaleEntry[];
  /** 공대장(운영) 수수료 % */
  feePercent: number;
}

export interface Settings {
  /** 디스코드 채널 웹훅 URL. 비어 있으면 연동 안 함 */
  discordWebhookUrl: string;
  /** 레이드 마감 시 디스코드로 자동 전송 */
  autoPostOnClose: boolean;
  /** 현황 탭에서 "내 캐릭터"로 고정할 길드원 */
  myMemberId: string | null;
}

export const DEFAULT_SETTINGS: Settings = {
  discordWebhookUrl: '',
  autoPostOnClose: true,
  myMemberId: null,
};

export interface Ledger {
  guildName: string;
  members: Member[];
  raids: Raid[];
  settings: Settings;
}
