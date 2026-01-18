
import React, { useState } from 'react';
import { sounds } from '../../utils/sound';

interface ClipboardLevelProps {
  onComplete: (points: number) => void;
}

export const ClipboardLevel: React.FC<ClipboardLevelProps> = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState("");
  const targetWord = "사과나무";
  const [pastedWords, setPastedWords] = useState<string[]>([]);

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text').trim();
    if (pastedText === targetWord) {
      sounds.playSuccess();
      const newList = [...pastedWords, "🍎"];
      setPastedWords(newList);
      if (newList.length >= 5) {
        onComplete(100);
      }
    } else {
      sounds.playError();
    }
  };

  return (
    <div className="h-full p-8 flex flex-col items-center justify-center gap-6 bg-slate-900 overflow-hidden">
      <style>
        {`
          .drag-target::selection {
            background-color: #3b82f6;
            color: white;
          }
        `}
      </style>

      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="text-center z-10">
        <p className="text-2xl mb-4 text-white font-bold drop-shadow-md">
          여기에 있는 글자를 <span className="text-yellow-400">복사</span>해서 아래 상자에 5번 <span className="text-green-400">붙여넣기</span> 하세요!
        </p>
        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative p-6 bg-white border-4 border-dashed border-blue-400 rounded-xl text-5xl font-black inline-block shadow-2xl transform transition-transform hover:scale-105 drag-target">
            {targetWord}
          </div>
        </div>
      </div>

      <div className="w-full max-w-md z-10 mt-4">
        <input 
          type="text"
          placeholder="여기에 Ctrl + V 하세요!"
          className="w-full p-5 text-2xl bg-white/95 border-4 border-green-500 rounded-2xl outline-none focus:ring-8 ring-green-500/20 shadow-xl font-bold transition-all text-slate-800"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPaste={handlePaste}
        />
      </div>

      <div className="flex gap-3 text-5xl h-16 items-center z-10">
        {pastedWords.map((emoji, i) => (
          <span key={i} className="animate-bounce inline-block drop-shadow-lg" style={{ animationDelay: `${i * 0.1}s` }}>
            {emoji}
          </span>
        ))}
      </div>
      
      <div className="z-10 bg-black/40 px-6 py-2 rounded-full border border-white/10">
        <p className="font-black text-2xl text-cyan-400 tracking-widest">
          성공: {pastedWords.length} / 5
        </p>
      </div>
    </div>
  );
};
