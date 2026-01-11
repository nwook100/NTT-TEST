
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95"
        >
          <div className="w-8 h-8 bg-[#ff6b35] rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
            <span className="text-black font-black text-xs">NTT</span>
          </div>
          <span className="text-2xl font-black tracking-tighter group-hover:text-[#ff6b35] transition-colors">NTT CLAN</span>
        </a>
        
        <nav className="hidden md:flex gap-10">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-sm font-medium text-zinc-400 hover:text-[#ff6b35] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a 
          href="https://discord.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-[#ff6b35] hover:text-white transition-all inline-block"
        >
          디스코드 &rarr;
        </a>
      </div>
    </header>
  );
};

export default Header;
