
import React from 'react';
import { NAV_ITEMS } from '../constants';

const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      } else if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '#home');
      }
    }
  };

  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h5 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">Quick Navigation</h5>
              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href} 
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="text-sm text-zinc-400 hover:text-[#ff6b35] transition-colors cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">Social Media</h5>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://discord.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-zinc-400 hover:text-[#ff6b35] transition-colors"
                  >
                    디스코드 (Discord)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.kakao.com/talk" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-zinc-400 hover:text-[#ff6b35] transition-colors"
                  >
                    카카오톡 (KakaoTalk)
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-[#ff6b35] rounded-[2.5rem] p-12 text-white flex flex-col justify-between items-start min-h-[320px] group overflow-hidden relative">
            {/* Decorative background circle */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
            
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight relative z-10">클랜 가입문의<br/><span className="text-black/60 text-2xl uppercase tracking-tighter">Join the elite</span></h3>
            <div className="space-y-4 relative z-10">
              <div className="p-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                <p className="text-xs uppercase opacity-60 font-bold mb-1">Master 2nd</p>
                <p className="text-xl font-bold tracking-tight">ID:LiveOctopus <span className="mx-2 opacity-30">|</span> Discord: beom:_0722</p>
              </div>
              <div className="p-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                <p className="text-xs uppercase opacity-60 font-bold mb-1">Recruitment</p>
                <p className="text-xl font-bold tracking-tight">ID:NTT_Sopy <span className="mx-2 opacity-30">|</span> Discord: bbunhin3319</p>
              </div>
                            <div className="p-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
                <p className="text-xs uppercase opacity-60 font-bold mb-1">Recruitment</p>
                <p className="text-xl font-bold tracking-tight">ID:Moon_GoRi <span className="mx-2 opacity-30">|</span> Discord: .moon37</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col items-center">
          <h2 className="text-[12vw] font-black tracking-tighter text-zinc-900 select-none leading-none mb-12">
            NTT CLAN
          </h2>
          <div className="flex flex-col md:flex-row justify-between w-full text-zinc-600 text-[10px] uppercase tracking-[0.2em] gap-4 text-center md:text-left">
            <p>&copy; 2025 NTT CLAN. ALL RIGHTS RESERVED. BATTLEGROUNDS COMPETITIVE TEAM.</p>
            <p className="hover:text-white transition-colors cursor-help">DESIGNED BY NTT STUDIO IN SEOUL</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
