
import React, { useState } from 'react';

const FAQ_DATA = [
  { q: "NTT에 가입하기 위한 최소 K/D 요건은 무엇인가요?", a: "엘리트 스쿼드(경쟁)의 경우, 일반적으로  K/D 보단 팀원에  전술적 사고 능력을 갖춘 플레이어를 찾습니다." },
  { q: "팀 운영시간?", a: "팀은 평일 매일 저녁 7시에 진행합니다. 주말은 점심부터 진행되는 팀 경쟁전에 참여할 수 있습니다." },
  { q: "경쟁전 게임 전술운영은 어떻게 하시나요? ", a: "전술 보단 팀웍에 집중하여 즐겁게 하고있습니다." },
  { q: "가입에 연령 제한이 있나요?", a: "성숙한 공동체 환경을 조성하기 위해 회원 자격은 최소 30세 혹은 클랜원 추천에 의한 가입가능합니다." }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="flex flex-col">
        <img 
          src="https://cafeptthumb-phinf.pstatic.net/MjAyNjAxMTFfMjY3/MDAxNzY4MDk1NTcwODAx.nKZv04kqHjfifZ4LgYArboyHFFok7qCDAoNmNDQ6l5Mg.i-KYFGQFn6cJiPm9CekniCGvlrgdcHiQsaf-pnlCNaMg.JPEG/unnamed_%284%29.jpg?type=w1600" 
          className="rounded-2xl grayscale object-cover w-full h-full min-h-[400px]" 
          alt="FAQ Illustration"
        />
      </div>
      <div className="space-y-4">
        {FAQ_DATA.map((item, idx) => (
          <div 
            key={idx} 
            className="border-b border-white/10 pb-4"
          >
            <button 
              className="w-full flex justify-between items-center py-4 text-left group"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className={`text-xl font-bold ${openIndex === idx ? 'text-[#ff6b35]' : 'text-white'} group-hover:text-[#ff6b35] transition-colors`}>
                {item.q}
              </span>
              <span className="text-2xl">{openIndex === idx ? '−' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div className="pb-4 text-zinc-400 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
