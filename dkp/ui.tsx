import React, { useEffect } from 'react';
import { Role, ROLE_LABEL } from './types';

/** 역할 컬러: 데이터 색은 역할로, 오렌지는 행동(버튼·활성 탭)에만 */
export const ROLE_COLOR: Record<Role, { text: string; bg: string; border: string; dot: string }> = {
  TANK: { text: 'text-sky-300', bg: 'bg-sky-500/15', border: 'border-sky-500/40', dot: 'bg-sky-400' },
  HEALER: { text: 'text-emerald-300', bg: 'bg-emerald-500/15', border: 'border-emerald-500/40', dot: 'bg-emerald-400' },
  DPS: { text: 'text-rose-300', bg: 'bg-rose-500/15', border: 'border-rose-500/40', dot: 'bg-rose-400' },
};

export const RoleBadge: React.FC<{ role: Role }> = ({ role }) => (
  <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded ${ROLE_COLOR[role].bg} ${ROLE_COLOR[role].text}`}>
    {ROLE_LABEL[role]}
  </span>
);

export const RoleDot: React.FC<{ role: Role }> = ({ role }) => (
  <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${ROLE_COLOR[role].dot}`} aria-label={ROLE_LABEL[role]} />
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/[0.03] border border-white/10 rounded-2xl ${className}`}>{children}</div>
);

/** 소제목 라벨: 한글엔 자간 벌리기·대문자 변환을 쓰지 않는다 */
export const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`text-[11px] font-semibold text-zinc-400 ${className}`}>{children}</div>
);

export const SectionTitle: React.FC<{ title: string; hint?: string; right?: React.ReactNode }> = ({ title, hint, right }) => (
  <div className="flex items-end justify-between gap-3 mb-3">
    <div className="min-w-0">
      <h2 className="text-xl font-black tracking-tight">{title}</h2>
      {hint && <p className="text-xs text-zinc-400 mt-0.5">{hint}</p>}
    </div>
    {right && <div className="shrink-0">{right}</div>}
  </div>
);

type BtnVariant = 'primary' | 'ghost' | 'danger' | 'subtle';
export const Btn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: 'sm' | 'md' | 'lg' }> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm', lg: 'px-5 py-3.5 text-base' };
  const base = `rounded-xl font-bold transition-all active:scale-95 disabled:active:scale-100 ${sizes[size]}`;
  // 비활성은 투명도가 아니라 중립 회색으로: "고장난 주황"처럼 보이지 않게
  const styles: Record<BtnVariant, string> = {
    primary: 'bg-[#ff6b35] text-black hover:bg-[#ff8355] disabled:bg-white/5 disabled:text-zinc-500 disabled:border disabled:border-white/10',
    ghost: 'bg-white/5 text-zinc-200 hover:bg-white/10 border border-white/10 disabled:text-zinc-600',
    danger: 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25',
    subtle: 'text-zinc-400 hover:text-white underline-offset-4 hover:underline px-1',
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-[15px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff6b35] ${className}`}
    {...props}
  />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea
    className={`w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-[15px] text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff6b35] ${className}`}
    {...props}
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
  <select
    className={`w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-[15px] text-white focus:outline-none focus:border-[#ff6b35] ${className}`}
    {...props}
  >
    {children}
  </select>
);

/** 숫자: 기본은 흰색, 강조(1위·나)만 오렌지, 음수는 rose */
export const Points: React.FC<{ value: number; className?: string; accent?: boolean }> = ({ value, className = '', accent }) => (
  <span className={`font-mono font-black tabular-nums ${value < 0 ? 'text-rose-400' : accent ? 'text-[#ff6b35]' : 'text-zinc-100'} ${className}`}>
    {value}
  </span>
);

export const Empty: React.FC<{ children: React.ReactNode; action?: React.ReactNode }> = ({ children, action }) => (
  <div className="text-center text-zinc-400 text-sm py-8 px-4 border border-dashed border-white/10 rounded-2xl space-y-3">
    <div>{children}</div>
    {action}
  </div>
);

/** 상단 토스트: 입력 중인 폼을 가리지 않도록 헤더 아래에, 어두운 방에서 눈 아프지 않게 */
export const Toast: React.FC<{ message: string | null }> = ({ message }) =>
  message ? (
    <div className="fixed left-1/2 -translate-x-1/2 z-50 top-[68px] max-w-[92vw] bg-zinc-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] shrink-0" />
      <span>{message}</span>
    </div>
  ) : null;

export const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }> = ({ checked, onChange, label, hint }) => (
  <button type="button" onClick={() => onChange(!checked)} className="w-full flex items-center justify-between gap-3 text-left" role="switch" aria-checked={checked}>
    <div>
      <div className="text-sm font-bold">{label}</div>
      {hint && <div className="text-xs text-zinc-400">{hint}</div>}
    </div>
    <span className={`relative inline-block w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-[#ff6b35]' : 'bg-zinc-700'}`}>
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </span>
  </button>
);

/** 아래에서 올라오는 시트 (상세·확인용) */
export const Sheet: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label={title}>
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label="닫기" />
      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-[#0d0d0d] border-t border-white/10 rounded-t-3xl animate-in slide-in-from-bottom duration-200" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="sticky top-0 bg-[#0d0d0d]/95 backdrop-blur px-5 pt-3 pb-3 border-b border-white/5">
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black">{title}</h3>
            <button onClick={onClose} className="text-zinc-400 hover:text-white text-2xl leading-none px-2" aria-label="닫기">×</button>
          </div>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
};

/** 파괴적 행동 확인 시트: 확인 버튼이 트리거와 같은 자리에 오지 않게 */
export const ConfirmSheet: React.FC<{
  open: boolean; title: string; message: string; confirmLabel: string; onConfirm: () => void; onClose: () => void; danger?: boolean;
}> = ({ open, title, message, confirmLabel, onConfirm, onClose, danger }) => (
  <Sheet open={open} onClose={onClose} title={title}>
    <p className="text-sm text-zinc-300 mb-5">{message}</p>
    <div className="grid grid-cols-2 gap-2">
      <Btn variant={danger ? 'danger' : 'primary'} size="lg" onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Btn>
      <Btn variant="ghost" size="lg" onClick={onClose}>취소</Btn>
    </div>
  </Sheet>
);

export const Chip: React.FC<{ active?: boolean; onClick: () => void; children: React.ReactNode; className?: string }> = ({ active, onClick, children, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
      active ? 'bg-[#ff6b35] border-[#ff6b35] text-black' : 'bg-white/5 border-white/10 text-zinc-300 hover:border-white/30'
    } ${className}`}
  >
    {children}
  </button>
);

/** 접히는 섹션 (공대장 탭의 부가 항목용) */
export const Collapsible: React.FC<{ title: string; hint?: string; defaultOpen?: boolean; children: React.ReactNode }> = ({ title, hint, defaultOpen = false, children }) => (
  <details className="group bg-white/[0.03] border border-white/10 rounded-2xl" open={defaultOpen}>
    <summary className="list-none cursor-pointer select-none px-4 py-3.5 flex items-center justify-between [&::-webkit-details-marker]:hidden">
      <div>
        <div className="font-black">{title}</div>
        {hint && <div className="text-xs text-zinc-400">{hint}</div>}
      </div>
      <svg className="w-5 h-5 text-zinc-400 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
    </summary>
    <div className="px-4 pb-4 pt-1 border-t border-white/5">{children}</div>
  </details>
);

/** 복사 한 줄 (와우 채팅용) */
export const CopyLine: React.FC<{ text: string; onCopied: (msg: string) => void; prefix?: string }> = ({ text, onCopied, prefix }) => (
  <button
    type="button"
    onClick={() => navigator.clipboard.writeText(text).then(() => onCopied('복사했습니다. 와우 채팅창에 붙여넣으세요.'))}
    className="w-full text-left flex items-start gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 hover:border-[#ff6b35]/60 active:scale-[0.99] transition-all"
  >
    {prefix && <span className="text-[10px] font-bold text-zinc-500 mt-0.5 shrink-0">{prefix}</span>}
    <span className="text-xs font-mono text-zinc-200 break-all flex-1">{text}</span>
    <span className="text-[10px] text-zinc-500 shrink-0 mt-0.5">{text.length}자 · 복사</span>
  </button>
);

/* ---------- 탭 아이콘 (lucide 스타일 라인 아이콘) ---------- */
const icon = (d: React.ReactNode) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
export const Icons = {
  trophy: icon(<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>),
  scroll: icon(<><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" /><path d="M19 17V5a2 2 0 0 0-2-2H4" /><path d="M15 8h-5" /><path d="M15 12h-5" /></>),
  pencil: icon(<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" /></>),
};
