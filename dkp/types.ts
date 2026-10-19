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

export interface LootEntry {
  id: string;
  itemName: string;
  memberId: string;
  cost: number;
}

export interface Raid {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD
  basePoints: number;
  bossPoints: number;
  bossKills: number;
  attendeeIds: string[];
  loot: LootEntry[];
  closed: boolean;
}

export interface Settings {
  /** 디스코드 채널 웹훅 URL. 비어 있으면 연동 안 함 */
  discordWebhookUrl: string;
  /** 레이드 마감 시 디스코드로 자동 전송 */
  autoPostOnClose: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  discordWebhookUrl: '',
  autoPostOnClose: true,
};

export interface Ledger {
  guildName: string;
  members: Member[];
  raids: Raid[];
  settings: Settings;
}
