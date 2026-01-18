
import React, { useState, useCallback } from 'react';
import { sounds } from '../../utils/sound';

interface MouseLevelProps {
  onComplete: (points: number) => void;
}

export const MouseLevel: React.FC<MouseLevelProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [targetPos, setTargetPos] = useState({ top: 50, left: 50 });
  const [targetType, setTargetType] = useState('👾');
  const [lastClickPos, setLastClickPos] = useState<{x: number, y: number} | null>(null);
  
  const monsters = ['👾', '👻', '🐙', '🦖', '🦇'];

  const moveTarget = useCallback(() => {
    const top = Math.random() * 60 + 20;
    const left = Math.random() * 70 + 15;
    const type = monsters[Math.floor(Math.random() * monsters.length)];
    setTargetPos({ top, left });
    setTargetType(type);
  }, []);

  const handleTargetClick = (e: React.MouseEvent) => {
    sounds.playSuccess();
    setLastClickPos({ x: e.clientX, y: e.clientY });
    setTimeout(() => setLastClickPos(null), 500);
    
    const nextCount = count + 1;
    setCount(nextCount);
    if (nextCount >= 10) {
      onComplete(200); // RPG reward: 200 points
    } else {
      moveTarget();
    }
  };

  return (
    <div className="h-full w-full relative p-8 bg-[#0a0a1f] overflow-hidden cursor-crosshair">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#1e1b4b 1px, transparent 1px), linear-gradient(90deg, #1e1b4b 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Narrative Guide */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4 bg-slate-900/90 border border-indigo-500/30 p-4 rounded-2xl backdrop-blur-md max-w-sm animate-in slide-in-from-left duration-700">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-lg shadow-indigo-500/20">🤖</div>
        <p className="text-white text-xs leading-relaxed font-bold">
          "요원님! 숲의 정령들이 바이러스에 오염되었습니다. <span className="text-cyan-400">정화 클릭</span>으로 10마리를 구출하세요!"
        </p>
      </div>

      <div className="absolute top-6 left-6 z-20">
        <div className="bg-black/60 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-4 mb-2">
            <i className="fas fa-radar text-red-500 animate-pulse"></i>
            <span className="text-xs text-slate-400 font-black tracking-widest uppercase">Target Progress</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{ width: `${(count / 10) * 100}%` }}
              />
            </div>
            <span className="text-cyan-400 font-black font-mono text-xl">{count}<span className="text-slate-600">/10</span></span>
          </div>
        </div>
      </div>

      <button
        onClick={handleTargetClick}
        className="absolute transition-all duration-150 active:scale-90 hover:scale-110 group z-10"
        style={{ top: `${targetPos.top}%`, left: `${targetPos.left}%`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
          <div className="absolute -inset-8 bg-red-500/20 rounded-full animate-ping pointer-events-none"></div>
          <div className="absolute -inset-4 bg-red-500/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>
          <div className="text-8xl drop-shadow-[0_0_30px_rgba(255,50,50,0.4)] group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.8)] filter transition-all">
            {targetType}
          </div>
          {/* Target Reticle */}
          <div className="absolute -inset-2 border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
          </div>
        </div>
      </button>

      {lastClickPos && (
        <div 
          className="fixed pointer-events-none z-50 text-5xl animate-out fade-out zoom-out-150 duration-500"
          style={{ left: lastClickPos.x - 30, top: lastClickPos.y - 30 }}
        >
          ✨
        </div>
      )}
    </div>
  );
};
