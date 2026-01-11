
import React from 'react';

// Declare the custom element for TypeScript to recognize 'spline-viewer' in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        {/* @ts-ignore: Custom element 'spline-viewer' may not be detected by some TS configurations despite the declaration */}
        <spline-viewer url="https://prod.spline.design/XiXJtCsetFhRc5wj/scene.splinecode"></spline-viewer>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8">
            WE TURN <span className="text-[#ff6b35]">SKILL</span> <br />
            INTO GLOBAL <br />
            <span className="text-zinc-700">DOMINANCE</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-xl">
            최고의 PUBG 경쟁을 경험해 보세요. NTT는 여러분의 게임 실력을 한 단계 끌어올릴 수 있는 플랫폼, 전략, 그리고 커뮤니티를 제공합니다.
          </p>
          
          <a 
            href="#about" 
          >
          </a>
        </div>
      </div>

      {/* Bottom Labeling like the reference */}
      <div className="absolute bottom-10 left-6 flex items-center gap-10">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
             <img src="https://picsum.photos/seed/p1/100" className="w-10 h-10 rounded-full border-2 border-black" alt="Player 1 avatar" />
             <img src="https://picsum.photos/seed/p2/100" className="w-10 h-10 rounded-full border-2 border-black" alt="Player 2 avatar" />
             <img src="https://picsum.photos/seed/p3/100" className="w-10 h-10 rounded-full border-2 border-black" alt="Player 3 avatar" />
          </div>
          <div className="text-sm">
            <p className="font-bold">1.2k+</p>
            <p className="text-zinc-500">Active Applications</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
