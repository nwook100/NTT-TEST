/**
 * 다른 앱과의 연계: 텍스트 공유(카톡·디스코드 붙여넣기), 와우 채팅용 문구, CSV(엑셀·구글시트), JSON 백업.
 */
import { fmtDate, fmtGold, raidPoints, settlePug, summarize } from '../calc';
import { Ledger, Raid } from '../types';

const nameOf = (ledger: Ledger, id: string) => ledger.members.find((m) => m.id === id)?.name ?? '(탈퇴)';

export const raidToText = (ledger: Ledger, raid: Raid): string => {
  if (raid.kind === 'PUG') {
    const s = settlePug(ledger, raid);
    return [
      `[${ledger.guildName}] ${raid.name} 골팟 정산 (${fmtDate(raid.date)})`,
      `판매 ${fmtGold(s.totalGold)} · 수수료 ${s.feePercent}% ${fmtGold(s.feeGold)} · ${s.participants.length}명 · 1인 ${fmtGold(s.cutPerPerson)}`,
      '판매 내역:',
      ...(raid.sales.length ? raid.sales.map((x) => `- ${x.itemName} ${fmtGold(x.gold)}${x.buyer ? ` (${x.buyer})` : ''}`) : ['- 없음']),
      `받는 사람: ${s.participants.join(', ') || '없음'}`,
    ].join('\n');
  }
  return [
    `[${ledger.guildName}] ${raid.name} (${fmtDate(raid.date)})`,
    `보스 ${raid.bossKills}킬 · 참석 ${raid.attendeeIds.length}명 · 참석 포인트 +${raidPoints(raid)}`,
    `참석: ${raid.attendeeIds.map((id) => nameOf(ledger, id)).join(', ') || '없음'}`,
    '분배:',
    ...(raid.loot.length ? raid.loot.map((l) => `- ${l.itemName} → ${nameOf(ledger, l.memberId)} (-${l.cost})`) : ['- 없음']),
  ].join('\n');
};

export const boardToText = (ledger: Ledger): string => {
  const rows = summarize(ledger);
  return [
    `[${ledger.guildName}] 포인트 현황`,
    ...rows.map((r) => `${r.rank}. ${r.member.name} ${r.balance}점 (참석 ${Math.round(r.attendanceRate * 100)}%)`),
  ].join('\n');
};

// ---------------- 와우 채팅 ----------------

/** 와우 채팅 한 줄 글자 제한 */
export const WOW_CHAT_LIMIT = 255;

/** 긴 문장을 와우 채팅 한 줄 제한에 맞게 끊음 (쉼표 단위) */
const chunk = (prefix: string, items: string[], limit = WOW_CHAT_LIMIT): string[] => {
  const lines: string[] = [];
  let cur = prefix;
  for (const item of items) {
    const next = cur === prefix ? `${cur}${item}` : `${cur}, ${item}`;
    if (next.length > limit && cur !== prefix) {
      lines.push(cur);
      cur = `${prefix}${item}`;
    } else {
      cur = next;
    }
  }
  if (cur !== prefix || lines.length === 0) lines.push(cur);
  return lines;
};

/** 골팟 정산 결과를 와우 공격대 채팅에 붙여넣을 줄들로. 한 줄씩 복사해서 붙여넣는다 */
export const pugChatLines = (ledger: Ledger, raid: Raid): string[] => {
  const s = settlePug(ledger, raid);
  const head = `[골팟 정산] ${raid.name} ${fmtDate(raid.date)} | 판매 ${fmtGold(s.totalGold)} | 수수료 ${s.feePercent}% | ${s.participants.length}명 | 1인 ${fmtGold(s.cutPerPerson)}`;
  const sales = raid.sales.length
    ? chunk('[판매] ', raid.sales.map((x) => `${x.itemName} ${fmtGold(x.gold)}`))
    : [];
  const people = chunk('[받는 사람] ', s.participants.length ? s.participants : ['없음']);
  return [head, ...sales, ...people].map((l) => (l.length > WOW_CHAT_LIMIT ? l.slice(0, WOW_CHAT_LIMIT - 1) + '…' : l));
};

/** 1인당 귓속말 명령. 한 줄씩 붙여넣으면 바로 귓속말 */
export const pugWhisperLines = (ledger: Ledger, raid: Raid): string[] => {
  const s = settlePug(ledger, raid);
  return s.participants.map((name) => `/w ${name} [${raid.name}] 골팟 정산 ${fmtGold(s.cutPerPerson)} 보냈습니다. 확인 부탁드려요!`);
};

/** 정규공대 결과를 길드 채팅용 한 줄로 */
export const regularChatLines = (ledger: Ledger, raid: Raid): string[] => {
  const head = `[${raid.name}] ${fmtDate(raid.date)} | 보스 ${raid.bossKills}킬 | 참석 ${raid.attendeeIds.length}명 | 참석 +${raidPoints(raid)}점`;
  const loot = raid.loot.length ? chunk('[분배] ', raid.loot.map((l) => `${l.itemName}→${nameOf(ledger, l.memberId)}(-${l.cost})`)) : [];
  return [head, ...loot];
};

export const copyText = async (text: string): Promise<void> => navigator.clipboard.writeText(text);

/** 기기 공유 시트(카톡·디스코드 앱 등)로 보내고, 안 되면 클립보드에 복사. 결과 메시지를 돌려줌 */
export const shareText = async (title: string, text: string): Promise<string> => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, text });
      return '공유했습니다.';
    } catch (e) {
      if ((e as Error).name === 'AbortError') return '공유를 취소했습니다.';
    }
  }
  await copyText(text);
  return '복사했습니다. 카톡이나 디스코드에 붙여넣으세요.';
};

// ---------------- 파일 ----------------

const csvCell = (v: string | number) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const download = (filename: string, content: string, type: string) => {
  const blob = new Blob(['﻿' + content], { type }); // BOM: 엑셀 한글 깨짐 방지
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const stamp = () => new Date().toISOString().slice(0, 10);

export const downloadBoardCsv = (ledger: Ledger) => {
  const rows = summarize(ledger);
  const total = ledger.raids.filter((r) => r.kind === 'REGULAR').length;
  const header = ['순위', '이름', '직업', '역할', '잔여포인트', '획득', '사용', '참석', '참석률', '아이템수'];
  const body = rows.map((r) => [
    r.rank, r.member.name, r.member.cls, r.member.role, r.balance, r.earned, r.spent,
    `${r.attended}/${total}`, `${Math.round(r.attendanceRate * 100)}%`, r.lootCount,
  ]);
  download(`공대장부_포인트현황_${stamp()}.csv`, [header, ...body].map((row) => row.map(csvCell).join(',')).join('\n'), 'text/csv;charset=utf-8');
};

export const downloadLootCsv = (ledger: Ledger) => {
  const header = ['날짜', '종류', '레이드', '아이템', '받은사람/구매자', '포인트', '골드'];
  const body = ledger.raids.flatMap((r) => [
    ...r.loot.map((l) => [r.date, '정규', r.name, l.itemName, nameOf(ledger, l.memberId), l.cost, '']),
    ...r.sales.map((s) => [r.date, '골팟', r.name, s.itemName, s.buyer, '', s.gold]),
  ]);
  download(`공대장부_분배내역_${stamp()}.csv`, [header, ...body].map((row) => row.map(csvCell).join(',')).join('\n'), 'text/csv;charset=utf-8');
};

export const downloadBackup = (ledger: Ledger) => {
  download(`공대장부_백업_${stamp()}.json`, JSON.stringify(ledger, null, 2), 'application/json');
};

export const readBackupFile = (file: File): Promise<Partial<Ledger>> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('파일을 읽지 못했습니다.'));
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as Partial<Ledger>;
        if (!Array.isArray(data.members) || !Array.isArray(data.raids)) throw new Error();
        resolve(data);
      } catch {
        reject(new Error('공대장부 백업 파일이 아닙니다.'));
      }
    };
    reader.readAsText(file);
  });
