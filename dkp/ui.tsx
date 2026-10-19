import React from 'react';
import { Role, ROLE_LABEL } from './types';

const ROLE_STYLE: Record<Role, string> = {
  TANK: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  HEALER: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  DPS: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

export const RoleBadge: React.FC<{ role: Role }> = ({ role }) => (
  <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${ROLE_STYLE[role]}`}>
    {ROLE_LABEL[role]}
  </span>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/[0.03] border border-white/10 rounded-2xl ${className}`}>{children}</div>
);

export const SectionTitle: React.FC<{ title: string; hint?: string; right?: React.ReactNode }> = ({ title, hint, right }) => (
  <div className="flex items-end justify-between mb-3">
    <div>
      <h2 className="text-xl font-black tracking-tight">{title}</h2>
      {hint && <p className="text-xs text-zinc-500 mt-0.5">{hint}</p>}
    </div>
    {right}
  </div>
);

export const Btn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' }> = ({
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base = 'px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:active:scale-100';
  const styles = {
    primary: 'bg-[#ff6b35] text-black hover:bg-[#ff8355]',
    ghost: 'bg-white/5 text-zinc-200 hover:bg-white/10 border border-white/10',
    danger: 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25',
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff6b35] ${className}`}
    {...props}
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
  <select
    className={`w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff6b35] ${className}`}
    {...props}
  >
    {children}
  </select>
);

export const Points: React.FC<{ value: number; className?: string }> = ({ value, className = '' }) => (
  <span className={`font-mono font-black tabular-nums ${value < 0 ? 'text-rose-400' : 'text-[#ff6b35]'} ${className}`}>
    {value}
  </span>
);

export const Empty: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-center text-zinc-500 text-sm py-10 border border-dashed border-white/10 rounded-2xl">{children}</div>
);
