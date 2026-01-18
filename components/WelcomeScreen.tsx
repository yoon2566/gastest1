
import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/sound';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [stage, setStage] = useState<'booting' | 'distress' | 'menu'>('booting');
  const [textIndex, setTextIndex] = useState(0);
  
  const distressMessages = [
    "치직... 제 목소리가... 들리나요?",
    "여기는 메인프레임... 다크 바이러스의 습격을 받았습니다.",
    "모든 시스템이 오염되고 있어요... 마스터 칩이 필요합니다.",
    "당신이... 우리를 구원할 '키마 마스터'인가요?",
    "제발... 시스템에 접속해서 저희를 도와주세요!"
  ];

  useEffect(() => {
    if (stage === 'booting') {
      const timer = setTimeout(() => {
        setStage('distress');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleNextText = () => {
    // Start Intro BGM on first interaction (required by browser audio policy)
    if (textIndex === 0 && stage === 'distress') {
      sounds.playBGM('intro');
    }
    
    sounds.playClick();
    if (textIndex < distressMessages.length - 1) {
      setTextIndex(prev => prev + 1);
    } else {
      setStage('menu');
      // Transition to more upbeat menu music
      sounds.playBGM('game');
    }
  };

  const handleStart = () => {
    sounds.playFanfare();
    onStart();
  };

  if (stage === 'booting') {
    return (
      <div className="min-h-[600px] bg-black flex flex-col items-center justify-center font-mono">
        <div className="text-green-500 text-xl animate-pulse flex flex-col items-center gap-4">
          <i className="fas fa-spinner fa-spin text-4xl"></i>
          <span>ESTABLISHING SECURE CONNECTION...</span>
          <div className="w-64 h-1 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-[progress_2s_ease-in-out]"></div>
          </div>
        </div>
        <style>{`
          @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  if (stage === 'distress') {
    return (
      <div className="min-h-[600px] bg-[#020617] flex flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] animate-[glitch_0.2s_infinite]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
          <div className="relative mb-12">
            <div className="w-48 h-48 bg-indigo-950/50 border-2 border-indigo-500/30 rounded-full flex items-center justify-center text-8xl shadow-[0_0_50px_rgba(79,70,229,0.3)] animate-[bounce_2s_infinite] filter blur-[0.5px]">
              🤖
            </div>
            <div className="absolute -bottom-2 right-0 bg-red-500 text-[10px] font-black px-2 py-0.5 rounded-md text-white uppercase animate-pulse">
              Warning: Virus Detected
            </div>
            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-ping"></div>
          </div>
          
          <div className="bg-slate-900/80 border-2 border-indigo-500/30 p-8 rounded-[2rem] backdrop-blur-md w-full shadow-2xl relative">
            <div className="absolute -top-4 left-8 px-4 py-1 bg-indigo-600 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
              Emergency Transmission
            </div>
            
            <div className="min-h-[80px] flex items-center justify-center">
              <p className="text-2xl text-cyan-400 font-bold tracking-tight leading-relaxed">
                {distressMessages[textIndex]}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {[...Array(distressMessages.length)].map((_, i) => (
                  <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i === textIndex ? 'bg-cyan-500 w-10' : i < textIndex ? 'bg-indigo-600' : 'bg-slate-800'}`} />
                ))}
              </div>
              
              <button 
                onClick={handleNextText}
                className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-black transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
              >
                {textIndex < distressMessages.length - 1 ? '다음 내용 보기' : '시스템 접속하기'}
                <i className={`fas ${textIndex < distressMessages.length - 1 ? 'fa-chevron-right' : 'fa-bolt'} group-hover:translate-x-1 transition-transform`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[600px] bg-slate-950 overflow-hidden flex flex-col items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b,transparent)] opacity-50"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 text-center px-6 animate-in fade-in zoom-in duration-1000">
        <div className="mb-2 inline-block px-4 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-cyan-400 text-xs font-black tracking-[0.3em] animate-pulse">
          SIGNAL RESTORED: MISSION READY
        </div>
        
        <h1 className="text-8xl font-black mb-4 tracking-tighter italic">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">COMPY'S</span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            QUEST
          </span>
        </h1>

        <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed font-light">
          "바이러스를 물리치고 <span className="text-white font-bold text-2xl">마스터 칩</span>을 되찾으세요.<br/>컴퓨터 월드의 운명이 당신의 손에 달렸습니다."
        </p>

        <button 
          onClick={handleStart}
          className="group relative px-20 py-6 bg-white text-slate-950 rounded-xl text-3xl font-black shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
          <span className="relative z-10 flex items-center gap-3 group-hover:text-white">
            시뮬레이션 시작 <i className="fas fa-bolt text-xl"></i>
          </span>
        </button>
      </div>
    </div>
  );
};
