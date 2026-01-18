
import React, { useEffect } from 'react';
import { sounds } from '../utils/sound';

interface ResultScreenProps {
  score: number;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, onRestart }) => {
  useEffect(() => {
    // Keep playing upbeat game BGM or add a victory fanfare loop
    sounds.playBGM('game');
  }, []);

  const handleRestart = () => {
    sounds.playClick();
    onRestart();
  };

  return (
    <div className="relative min-h-[600px] bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#4f46e533,transparent)]"></div>
      
      <div className="relative z-10 text-center">
        <div className="relative inline-block mb-12">
          <div className="text-9xl filter drop-shadow-[0_0_50px_rgba(234,179,8,0.5)]">🎖️</div>
          <div className="absolute -inset-4 border-2 border-yellow-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute -inset-8 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>
        
        <h1 className="text-7xl font-black italic mb-2 tracking-tighter uppercase">
          Mission<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-500 drop-shadow-2xl">Accomplished</span>
        </h1>
        
        <p className="text-xl text-slate-400 font-medium mb-10">
          모든 바이러스가 정화되고 왕국에 빛이 돌아왔습니다!
        </p>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-2xl mb-12 transform hover:scale-105 transition-transform duration-500">
          <div className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.3em] mb-4">Final Operation Score</div>
          <div className="text-8xl font-black tracking-tighter text-white mb-2">
            {score.toLocaleString()}
          </div>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fas fa-star ${i < 4 ? 'text-yellow-400' : 'text-slate-700'} text-xl`}></i>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleRestart}
            className="group px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-2xl font-black shadow-xl transition-all flex items-center gap-3 active:scale-95"
          >
            <i className="fas fa-home group-hover:-translate-y-1 transition-transform"></i>
            본부로 귀환
          </button>
          
          <button 
            className="px-12 py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-2xl font-black shadow-xl transition-all flex items-center gap-3"
            onClick={() => window.print()}
          >
            <i className="fas fa-certificate"></i>
            임무 증서 출력
          </button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
