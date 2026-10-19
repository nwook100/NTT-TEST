/**
 * 다른 앱과의 연계: 텍스트 공유(카톡·디스코드 붙여넣기), CSV(엑셀·구글시트), JSON 백업.
 */
import { raidPoints, summarize } from '../calc';
import { Ledger, Raid } from '../types';

const nameOf = (ledger: Ledger, id: string) => ledger.members.find((m) => m.id === id)?.name ?? '(탈퇴)';

export const raidToText = (ledger: Ledger, raid: Raid): string => {
  const lines = [
    `[${ledger.guildName}] ${raid.name} (${raid.date})`,
    `보스 ${raid.bossKills}킬 · 참석 ${raid.attendeeIds.length}명 · 참석 포인트 +${raidPoints(raid)}`,
    `참석: ${raid.attendeeIds.map((id) => nameOf(ledger, id)).join(', ') || '없음'}`,
    '분배:',
    ...(raid.loot.length ? raid.loot.map((l) => `- ${l.itemName} → ${nameOf(ledger, l.memberId)} (-${l.cost})`) : ['- 없음']),
  ];
  return lines.join('\n');
};

export const boardToText = (ledger: Ledger): string => {
  const rows = summarize(ledger);
  return [
    `[${ledger.guildName}] 포인트 현황 (레이드 ${ledger.raids.length}회)`,
    ...rows.map((r, i) => `${i + 1}. ${r.member.name} ${r.balance}점 (참석 ${Math.round(r.attendanceRate * 100)}%)`),
  ].join('\n');
};

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
  await navigator.clipboard.writeText(text);
  return '클립보드에 복사했습니다. 카톡이나 디스코드에 붙여넣으세요.';
};

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

/** 포인트 현황 CSV (엑셀·구글시트용) */
export const downloadBoardCsv = (ledger: Ledger) => {
  const rows = summarize(ledger);
  const header = ['순위', '이름', '직업', '역할', '잔여포인트', '획득', '사용', '참석', '참석률', '아이템수'];
  const body = rows.map((r, i) => [
    i + 1, r.member.name, r.member.cls, r.member.role, r.balance, r.earned, r.spent,
    `${r.attended}/${ledger.raids.length}`, `${Math.round(r.attendanceRate * 100)}%`, r.lootCount,
  ]);
  const csv = [header, ...body].map((row) => row.map(csvCell).join(',')).join('\n');
  download(`공대장부_포인트현황_${stamp()}.csv`, csv, 'text/csv;charset=utf-8');
};

/** 분배 내역 CSV */
export const downloadLootCsv = (ledger: Ledger) => {
  const header = ['날짜', '레이드', '아이템', '받은사람', '포인트'];
  const body = ledger.raids.flatMap((r) => r.loot.map((l) => [r.date, r.name, l.itemName, nameOf(ledger, l.memberId), l.cost]));
  const csv = [header, ...body].map((row) => row.map(csvCell).join(',')).join('\n');
  download(`공대장부_분배내역_${stamp()}.csv`, csv, 'text/csv;charset=utf-8');
};

/** JSON 백업 (다른 기기로 옮기거나 보관) */
export const downloadBackup = (ledger: Ledger) => {
  download(`공대장부_백업_${stamp()}.json`, JSON.stringify(ledger, null, 2), 'application/json');
};

export const readBackupFile = (file: File): Promise<Ledger> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('파일을 읽지 못했습니다.'));
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as Ledger;
        if (!Array.isArray(data.members) || !Array.isArray(data.raids)) throw new Error();
        resolve(data);
      } catch {
        reject(new Error('공대장부 백업 파일이 아닙니다.'));
      }
    };
    reader.readAsText(file);
  });
