import React from 'react';
import { createRoot } from 'react-dom/client';
import MusicVideo from './components/MusicVideo';

// 단독 실행용 뮤직비디오 제작기 (npm run build:mv → dist-mv/mv.html 한 파일)
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-2">ntt26 뮤직비디오 만들기</h1>
      <p className="text-zinc-400 mb-8">음악 파일을 고르고 ⬇ 영상 파일로 저장을 누르면, 노래가 끝날 때 영상이 저장됩니다.</p>
      <MusicVideo />
    </main>
  </React.StrictMode>,
);
