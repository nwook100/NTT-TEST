import React, { useEffect, useRef, useState } from 'react';
import { MVEngine, Theme, parseLyrics } from '../mv/engine';

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const THEMES: { id: Theme; label: string; desc: string }[] = [
  { id: 'general', label: '일반 뮤직비디오', desc: '도망가는 알람시계, 쳐다보는 지하철, 해파리 우산, 손바닥 위의 꿈, 새가 되는 종이비행기' },
  { id: 'ntt', label: 'NTT 클랜 (배그)', desc: '퇴근 후 7시, 낙하, 프라이팬, 자기장, 치킨' },
];

const MusicVideo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<MVEngine | null>(null);
  const [mode, setMode] = useState<'idle' | 'play' | 'record'>('idle');
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [theme, setTheme] = useState<Theme>('general');
  const [title, setTitle] = useState('Empty Hands');
  const [artist, setArtist] = useState('ntt26');
  const [fileName, setFileName] = useState('');
  const [lyricsText, setLyricsText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const engine = new MVEngine(canvasRef.current!);
    engineRef.current = engine;
    engine.onTime = (t, d) => {
      setTime(t);
      setDuration(d);
    };
    engine.theme = 'general';
    engine.lyrics = [];
    setDuration(engine.duration);
    MVEngine.fontsReady().then(() => engine.renderIdle());
    if (new URLSearchParams(location.search).has('mvdebug')) (window as any).__mv = engine;
    return () => engine.stop();
  }, []);

  useEffect(() => {
    engineRef.current?.setSongInfo(title, artist);
  }, [title, artist]);

  const prepare = (engine: MVEngine) => {
    if (engine.song.kind === 'file' || engine.theme === 'general') engine.lyrics = parseLyrics(lyricsText, engine.duration);
  };

  const play = async () => {
    const engine = engineRef.current!;
    prepare(engine);
    setMode('play');
    setMessage('');
    await engine.play(false);
    setMode('idle');
  };

  const record = async () => {
    const engine = engineRef.current!;
    prepare(engine);
    setMode('record');
    setMessage('녹화 중입니다. 곡이 끝날 때까지 이 탭을 열어 두세요.');
    const blob = await engine.play(true);
    setMode('idle');
    if (!blob || blob.size === 0) {
      setMessage('녹화된 내용이 없습니다.');
      return;
    }
    const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
    const name = `${(title || 'music_video').replace(/[\\/:*?"<>|\s]+/g, '_')}_MV.${ext}`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setMessage(`저장 완료: ${name} (${(blob.size / 1024 / 1024).toFixed(1)}MB)`);
  };

  const stop = () => engineRef.current?.stop();

  const chooseTheme = (t: Theme) => {
    engineRef.current?.setTheme(t);
    setTheme(t);
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const engine = engineRef.current!;
    engine.stop();
    setMessage('노래를 불러오는 중...');
    try {
      await engine.loadFile(file);
      engine.setTheme(theme);
      setFileName(file.name);
      setDuration(engine.duration);
      setTime(0);
      setMessage('노래를 불러왔습니다. ▶ 재생으로 확인한 뒤 영상 파일로 저장하세요.');
    } catch {
      setMessage('이 파일은 재생할 수 없습니다. mp3, m4a, wav 파일을 사용해 주세요.');
    }
  };

  const useDemo = () => {
    const engine = engineRef.current!;
    engine.stop();
    engine.useDemo();
    setFileName('');
    setDuration(engine.duration);
    setTime(0);
  };

  const busy = mode !== 'idle';
  const btn = 'px-5 py-2.5 rounded-full text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed';
  const input = 'w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-[#ff6b35]';

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
        <canvas ref={canvasRef} className="w-full h-auto block aspect-video" />
        {mode === 'record' && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> REC
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {mode === 'idle' ? (
          <button onClick={play} className={`${btn} bg-[#ff6b35] text-white hover:bg-[#e85a20]`}>▶ 재생</button>
        ) : (
          <button onClick={stop} className={`${btn} bg-white text-black hover:bg-zinc-200`}>■ 정지</button>
        )}
        <button onClick={record} disabled={busy} className={`${btn} bg-zinc-800 text-white hover:bg-zinc-700`}>
          ⬇ 영상 파일로 저장
        </button>
        <span className="text-sm text-zinc-500 font-mono">{fmt(time)} / {fmt(duration)}</span>
        <span className="text-sm text-zinc-400 truncate">♪ {fileName || 'NTT26 오리지널 데모곡'}</span>
      </div>
      {message && <p className="text-sm text-[#ff6b35]">{message}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">1. 테마</p>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => chooseTheme(t.id)}
                  disabled={busy}
                  className={`text-left p-4 rounded-xl border transition-colors disabled:opacity-40 ${theme === t.id ? 'border-[#ff6b35] bg-[#ff6b35]/10' : 'border-white/10 hover:border-white/30'}`}
                >
                  <div className="font-bold text-sm">{t.label}</div>
                  <div className="text-xs text-zinc-500 mt-1 leading-relaxed">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">2. 곡 정보 & 음원</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="곡 제목" className={input} />
              <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="아티스트" className={input} />
            </div>
            <label className={`${btn} inline-block bg-white text-black hover:bg-[#ff6b35] hover:text-white cursor-pointer`}>
              🎵 음악 파일 선택
              <input type="file" accept="audio/*" className="hidden" onChange={onFile} disabled={busy} />
            </label>
            <button onClick={useDemo} disabled={busy} className={`${btn} ml-2 bg-zinc-800 text-white hover:bg-zinc-700`}>
              데모곡
            </button>
            <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
              mp3·m4a·wav 파일을 불러오면 장면이 곡 길이에 맞춰 배치되고, 킥 드럼에 맞춰 화면이 흔들립니다.
              파일은 브라우저 안에서만 쓰이고 어디에도 업로드되지 않습니다.
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">3. 가사 자막 (선택)</p>
          <textarea
            value={lyricsText}
            onChange={(e) => setLyricsText(e.target.value)}
            disabled={theme === 'ntt' && !fileName}
            placeholder={'LRC 형식 권장\n[00:12.50] 첫 번째 줄\n[00:18.00] 두 번째 줄\n\n시간 없이 한 줄씩 적으면 곡 전체에 고르게 배치됩니다.'}
            className={`${input} h-56 font-mono disabled:opacity-40`}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicVideo;
