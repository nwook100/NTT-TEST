import React, { useCallback, useRef, useState } from 'react';
import { useLedger } from './store';
import AdminPanel from './screens/AdminPanel';
import PointsBoard from './screens/PointsBoard';
import RaidLog from './screens/RaidLog';
import { Toast } from './ui';

type Tab = 'board' | 'raids' | 'admin';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'board', label: '현황', icon: '◆' },
  { key: 'raids', label: '레이드', icon: '▣' },
  { key: 'admin', label: '공대장', icon: '✎' },
];

const DkpApp: React.FC = () => {
  const api = useLedger();
  const [tab, setTab] = useState<Tab>('board');
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-20 bg-[#050505]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ff6b35] rounded-lg flex items-center justify-center text-black font-black text-xs">공</div>
            <div>
              <div className="font-black leading-tight">공대장부</div>
              <div className="text-[11px] text-zinc-500 leading-tight">{api.ledger.guildName}</div>
            </div>
          </div>
          <a href="#/" className="text-xs text-zinc-500 hover:text-[#ff6b35]">클랜 홈</a>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-5 pb-28">
        {tab === 'board' && <PointsBoard ledger={api.ledger} notify={notify} />}
        {tab === 'raids' && <RaidLog ledger={api.ledger} notify={notify} />}
        {tab === 'admin' && <AdminPanel api={api} notify={notify} />}
      </main>

      <Toast message={toast} />

      <nav className="fixed bottom-0 inset-x-0 z-20 bg-[#0a0a0a]/95 backdrop-blur border-t border-white/10" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-xl mx-auto grid grid-cols-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`py-3 flex flex-col items-center gap-0.5 text-xs font-bold transition-colors ${tab === t.key ? 'text-[#ff6b35]' : 'text-zinc-500'}`}
            >
              <span className="text-base leading-none">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DkpApp;
