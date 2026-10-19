/**
 * 디스코드 연동 (웹훅).
 * 서버 없이 브라우저에서 바로 채널에 메시지를 보냅니다.
 * 웹훅 만들기: 디스코드 채널 설정 → 연동 → 웹훅 → 새 웹훅 → URL 복사
 */
import { fmtDate, fmtGold, raidPoints, roleCount, settlePug, summarize } from '../calc';
import { Ledger, Raid } from '../types';

const BRAND_COLOR = 0xff6b35;
const FIELD_LIMIT = 1024;

export const isDiscordWebhook = (url: string): boolean =>
  /^https:\/\/(discord\.com|discordapp\.com|ptb\.discord\.com|canary\.discord\.com)\/api\/webhooks\/\d+\/[\w-]+$/.test(url.trim());

const clip = (s: string) => (s.length > FIELD_LIMIT ? s.slice(0, FIELD_LIMIT - 1) + '…' : s);

const nameOf = (ledger: Ledger, id: string) => ledger.members.find((m) => m.id === id)?.name ?? '(탈퇴)';

export interface DiscordPayload {
  username: string;
  embeds: Array<{
    title: string;
    description?: string;
    color: number;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    footer?: { text: string };
    timestamp?: string;
  }>;
}

/** 레이드 결과 임베드 */
export const buildRaidEmbed = (ledger: Ledger, raid: Raid): DiscordPayload => {
  if (raid.kind === 'PUG') {
    const s = settlePug(ledger, raid);
    const sales = raid.sales.map((x) => `• ${x.itemName} — ${fmtGold(x.gold)}${x.buyer ? ` (${x.buyer})` : ''}`).join('\n') || '없음';
    return {
      username: '공대장부',
      embeds: [
        {
          title: `💰 ${raid.name} 정산`,
          description: `${fmtDate(raid.date)} · ${s.participants.length}명`,
          color: 0xf5c542,
          fields: [
            { name: '총 판매', value: fmtGold(s.totalGold), inline: true },
            { name: `수수료 ${s.feePercent}%`, value: fmtGold(s.feeGold), inline: true },
            { name: '1인 분배', value: `**${fmtGold(s.cutPerPerson)}**`, inline: true },
            { name: '판매 내역', value: clip(sales) },
            { name: '받는 사람', value: clip(s.participants.join(', ') || '없음') },
          ],
          footer: { text: `${ledger.guildName} · 공대장부` },
          timestamp: new Date().toISOString(),
        },
      ],
    };
  }
  const rc = roleCount(ledger, raid.attendeeIds);
  const attendees = raid.attendeeIds.map((id) => nameOf(ledger, id)).join(', ') || '없음';
  const loot = raid.loot.map((l) => `• ${l.itemName} → **${nameOf(ledger, l.memberId)}** (-${l.cost})`).join('\n') || '없음';
  return {
    username: '공대장부',
    embeds: [
      {
        title: `${raid.closed ? '🏁' : '⚔️'} ${raid.name}`,
        description: `${fmtDate(raid.date)} · 보스 ${raid.bossKills}킬 · 참석 ${raid.attendeeIds.length}명 (탱 ${rc.TANK} / 힐 ${rc.HEALER} / 딜 ${rc.DPS})`,
        color: BRAND_COLOR,
        fields: [
          { name: '참석 포인트', value: `+${raidPoints(raid)}`, inline: true },
          { name: '분배 아이템', value: `${raid.loot.length}개`, inline: true },
          { name: '참석자', value: clip(attendees) },
          { name: '분배', value: clip(loot) },
        ],
        footer: { text: `${ledger.guildName} · 공대장부` },
        timestamp: new Date().toISOString(),
      },
    ],
  };
};

/** 현재 포인트 현황 임베드 */
export const buildBoardEmbed = (ledger: Ledger): DiscordPayload => {
  const rows = summarize(ledger);
  const width = Math.max(4, ...rows.map((r) => r.member.name.length));
  const lines = rows.map(
    (r) => `${String(r.rank).padStart(2)}. ${r.member.name.padEnd(width, '　')} ${String(r.balance).padStart(4)}점  참석 ${Math.round(r.attendanceRate * 100)}%`,
  );
  const table = lines.length ? '```\n' + clip(lines.join('\n')) + '\n```' : '길드원 없음';
  return {
    username: '공대장부',
    embeds: [
      {
        title: `📊 ${ledger.guildName} 포인트 현황`,
        description: `정규공대 ${ledger.raids.filter((r) => r.kind === 'REGULAR').length}회 · 길드원 ${ledger.members.length}명`,
        color: BRAND_COLOR,
        fields: [{ name: '잔여 포인트 순', value: table }],
        footer: { text: '공대장부' },
        timestamp: new Date().toISOString(),
      },
    ],
  };
};

export const postToDiscord = async (webhookUrl: string, payload: DiscordPayload): Promise<void> => {
  if (!isDiscordWebhook(webhookUrl)) throw new Error('디스코드 웹훅 URL 형식이 아닙니다.');
  const res = await fetch(webhookUrl.trim(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`디스코드 전송 실패 (${res.status})`);
};
