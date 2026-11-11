import React from 'react';

// Register the <spline-viewer> custom element with React 19's JSX namespace.
// (A global `JSX` namespace declaration would shadow React's own and break every intrinsic tag.)
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
      };
    }
  }
}

const scrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', `#${id}`);
  }
};

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <spline-viewer url="https://prod.spline.design/XiXJtCsetFhRc5wj/scene.splinecode"></spline-viewer>
        {/* Darken the left side so the headline and copy stay readable over the 3D scene */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#050505]/40 to-transparent pointer-events-none"></div>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8 break-words">
            WE TURN <span className="text-[#ff6b35]">SKILL</span> <br />
            INTO GLOBAL <br />
            <span className="text-zinc-700">DOMINANCE</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-xl">
            최고의 PUBG 경쟁을 경험해 보세요. NTT는 여러분의 게임 실력을 한 단계 끌어올릴 수 있는 플랫폼, 전략, 그리고 커뮤니티를 제공합니다.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#about"
              onClick={(e) => scrollToId(e, 'about')}
              className="bg-[#ff6b35] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-colors"
            >
              클랜 소개 보기
            </a>
            <a
              href="#faq"
              onClick={(e) => scrollToId(e, 'faq')}
              className="border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:border-[#ff6b35] hover:text-[#ff6b35] transition-colors"
            >
              가입 문의
            </a>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-10 left-6 hidden sm:flex items-center gap-10">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {['N', 'T', 'T'].map((letter, idx) => (
              <div
                key={idx}
                className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs font-black text-[#ff6b35]"
                aria-hidden="true"
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="text-sm">
            <p className="font-bold">Since 2020</p>
            <p className="text-zinc-500">PUBG Kakao Battlegrounds Clan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
