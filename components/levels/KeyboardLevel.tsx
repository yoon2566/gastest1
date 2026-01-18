
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { sounds } from '../../utils/sound';

interface KeyboardLevelProps {
  onComplete: (points: number) => void;
  lang: 'EN' | 'KR';
}

export const KeyboardLevel: React.FC<KeyboardLevelProps> = ({ onComplete, lang }) => {
  const [targets, setTargets] = useState<{ id: number; char: string; x: number; y: number; speed: number }[]>([]);
  const [count, setCount] = useState(0);
  const [hitChar, setHitChar] = useState<string | null>(null);

  const charSets = {
    EN: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    KR: "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ"
  };

  const keyboardLayouts = useMemo(() => ({
    EN: [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"]
    ],
    KR: [
      ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
      ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
      ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"]
    ]
  }), []);

  useEffect(() => {
    setCount(0);
    setTargets([]);
  }, [lang]);

  useEffect(() => {
    if (count >= 10) {
      const timer = setTimeout(() => {
        onComplete(200);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  const addTarget = useCallback(() => {
    const chars = charSets[lang];
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = Math.random() * 80 + 10;
    const speed = Math.random() * 0.4 + 0.3;
    setTargets(prev => [...prev, { id: Date.now(), char, x, y: -10, speed }]);
  }, [lang]);

  useEffect(() => {
    const spawnInterval = setInterval(addTarget, 1400);
    const moveInterval = setInterval(() => {
      setTargets(prev => prev.map(t => ({ ...t, y: t.y + t.speed })).filter(t => t.y < 95));
    }, 16);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [addTarget]);

  const processInput = useCallback((key: string) => {
    const krMap: Record<string, string> = {
      'r': 'ㄱ', 's': 'ㄴ', 'e': 'ㄷ', 'f': 'ㄹ', 'a': 'ㅁ', 'q': 'ㅂ', 't': 'ㅅ', 'd': 'ㅇ', 'w': 'ㅈ', 'c': 'ㅊ', 'z': 'ㅋ', 'x': 'ㅌ', 'v': 'ㅍ', 'g': 'ㅎ',
      'k': 'ㅏ', 'i': 'ㅑ', 'j': 'ㅓ', 'u': 'ㅕ', 'h': 'ㅗ', 'y': 'ㅛ', 'n': 'ㅜ', 'b': 'ㅠ', 'm': 'ㅡ', 'l': 'ㅣ'
    };

    let inputChar = key.toUpperCase();
    if (lang === 'KR') {
      const lowerKey = key.toLowerCase();
      inputChar = krMap[lowerKey] || key;
    }

    setTargets(prev => {
      const foundIndex = prev.findIndex(t => t.char === inputChar);
      if (foundIndex !== -1) {
        sounds.playSuccess();
        setHitChar(inputChar);
        setTimeout(() => setHitChar(null), 200);
        setCount(c => c + 1);
        return prev.filter((_, i) => i !== foundIndex);
      } else {
        return prev;
      }
    });
  }, [lang]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Alt' || e.key === 'Control' || e.key === 'Shift') return;
      processInput(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [processInput]);

  return (
    <div className="h-full w-full bg-black relative flex flex-col overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,white_1px,transparent_1px)] bg-[length:50px_50px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      </div>

      <div className="flex-1 relative z-10 overflow-hidden">
        {/* Cinematic UI */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <i className="fas fa-crosshairs animate-spin-slow"></i>
          </div>
          <div>
            <div className="text-[8px] text-indigo-500 font-black tracking-widest uppercase">Cannon Charge</div>
            <div className="text-sm font-black text-white">{count}/10 UNITS</div>
          </div>
        </div>

        {targets.map(t => (
          <div
            key={t.id}
            className="absolute flex flex-col items-center transition-all"
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
          >
            <div className="w-px h-20 bg-gradient-to-t from-cyan-500 to-transparent shadow-[0_0_8px_cyan]"></div>
            <div className={`text-4xl font-black rounded-lg p-3 bg-slate-900 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] ${hitChar === t.char ? 'scale-150 opacity-0 bg-white border-white' : 'scale-100'} transition-all duration-200`}>
              {t.char}
            </div>
          </div>
        ))}
      </div>

      {/* Hero Cockpit Keyboard */}
      <div className="bg-slate-900/80 backdrop-blur-xl p-6 shrink-0 border-t border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        
        <div className="flex flex-col gap-2 items-center max-w-4xl mx-auto">
          {keyboardLayouts[lang].map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 w-full justify-center">
              {row.map(key => (
                <button
                  key={key}
                  onPointerDown={(e) => { e.preventDefault(); processInput(key); }}
                  className={`flex-1 min-w-[36px] h-12 font-black rounded-xl transition-all duration-75 text-xl flex items-center justify-center border-2 
                    ${hitChar === key 
                      ? 'bg-cyan-400 text-slate-950 border-white scale-110 shadow-[0_0_30px_#22d3ee]' 
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-indigo-500 hover:text-white hover:bg-slate-700'
                    }`}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>
    </div>
  );
};
