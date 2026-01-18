
import React, { useState } from 'react';
import { LEVELS } from '../constants';
import { LevelType } from '../types';
import { MouseLevel } from './levels/MouseLevel';
import { KeyboardLevel } from './levels/KeyboardLevel';
import { ClipboardLevel } from './levels/ClipboardLevel';
import { FileSystemLevel } from './levels/FileSystemLevel';
import { EtiquetteLevel } from './levels/EtiquetteLevel';
import { sounds } from '../utils/sound';

interface GameContainerProps {
  levelIndex: number;
  onComplete: (points: number) => void;
  totalScore: number;
  onJumpToLevel: (index: number) => void;
}

const LevelMap: React.FC<{ currentIndex: number }> = ({ currentIndex }) => {
  return (
    <div className="flex gap-2 mb-2">
      {LEVELS.map((_, i) => (
        <div 
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i === currentIndex ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 
            i < currentIndex ? 'w-4 bg-indigo-600' : 'w-2 bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
};

export const GameContainer: React.FC<GameContainerProps> = ({ 
  levelIndex, 
  onComplete, 
  totalScore,
  onJumpToLevel
}) => {
  const level = LEVELS[levelIndex];

  const handleComplete = (points: number) => {
    sounds.playFanfare();
    onComplete(points);
  };

  const renderLevel = () => {
    switch (level.type) {
      case LevelType.MOUSE_CLICK: return <MouseLevel onComplete={handleComplete} />;
      case LevelType.KEYBOARD_KR: return <KeyboardLevel onComplete={handleComplete} lang="KR" />;
      case LevelType.KEYBOARD_EN: return <KeyboardLevel onComplete={handleComplete} lang="EN" />;
      case LevelType.CLIPBOARD: return <ClipboardLevel onComplete={handleComplete} />;
      case LevelType.FILE_SYSTEM: return <FileSystemLevel onComplete={handleComplete} />;
      case LevelType.ETIQUETTE: return <EtiquetteLevel onComplete={handleComplete} />;
      default: return <div>Unknown Module</div>;
    }
  };

  return (
    <div className="flex flex-col h-[700px] bg-slate-950 relative border-4 border-slate-900 group">
      {/* HUD Header */}
      <div className="bg-slate-900/50 backdrop-blur-xl p-6 border-b border-white/5 flex justify-between items-end relative overflow-hidden shrink-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        
        <div className="flex items-center gap-6 z-10">
          <div className="relative group/avatar">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl border-2 border-indigo-500/50 rotate-3 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(79,70,229,0.3)] animate-float">
              🤖
            </div>
            <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-[10px] font-black px-2 py-0.5 rounded-md text-slate-900 uppercase">
              Online
            </div>
            {/* Hover Tooltip for Compy */}
            <div className="absolute left-full ml-4 top-0 w-48 bg-slate-900 border border-white/10 p-3 rounded-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none z-50">
              <p className="text-[10px] text-cyan-400 font-bold mb-1">COMPY-GUIDE v2.1</p>
              <p className="text-[11px] text-white leading-tight">"서둘러요! 시스템 오염도가 {100 - (levelIndex * 15)}%입니다!"</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <LevelMap currentIndex={levelIndex} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Zone {levelIndex + 1}</span>
              <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">{level.title}</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium italic">{level.instructions}</p>
          </div>
        </div>

        <div className="flex flex-col items-end z-10">
          <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Mission Integrity</div>
          <div className="text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 drop-shadow-sm">
            {totalScore.toString().padStart(6, '0')}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        {renderLevel()}
        
        {/* CRT Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-20"></div>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-10 bg-slate-900 border-t border-white/5 flex items-center px-6 justify-between text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-green-500"><i className="fas fa-check-circle animate-pulse"></i> Neural Link Stable</span>
          <span className="text-slate-800">|</span>
          <span className="flex items-center gap-1.5"><i className="fas fa-wifi"></i> 144ms Latency</span>
        </div>
        <div className="flex gap-4">
          <span className="text-indigo-400">User: Master_Keyman</span>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-5px) rotate(5deg); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
