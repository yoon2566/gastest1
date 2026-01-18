
import React, { useState, useEffect } from 'react';
import { sounds } from '../../utils/sound';

interface FileSystemLevelProps {
  onComplete: (points: number) => void;
}

export const FileSystemLevel: React.FC<FileSystemLevelProps> = ({ onComplete }) => {
  const [currentPath, setCurrentPath] = useState<string[]>(['🏰 메인프레임']);
  const [treasureLocation, setTreasureLocation] = useState<string>('');

  const structure = {
    '🏰 메인프레임': ['📂 시스템_코어', '📂 보관용_서버', '📂 관리자_실'],
    '📂 시스템_코어': ['📂 보안_게이트', '📂 데이터_터널'],
    '📂 보관용_서버': ['📂 잊혀진_아카이브', '📂 깨진_섹터'],
    '📂 관리자_실': ['📂 기밀_디렉토리', '📂 휴지통'],
    '📂 보안_게이트': [],
    '📂 데이터_터널': [],
    '📂 잊혀진_아카이브': [],
    '📂 깨진_섹터': [],
    '📂 기밀_디렉토리': [],
    '📂 휴지통': []
  };

  useEffect(() => {
    const potentialSpots = ['📂 잊혀진_아카이브', '📂 깨진_섹터', '📂 기밀_디렉토리', '📂 보안_게이트'];
    const randomSpot = potentialSpots[Math.floor(Math.random() * potentialSpots.length)];
    setTreasureLocation(randomSpot);
  }, []);

  const handleOpenFolder = (name: string) => {
    if (name.includes('💎')) {
      sounds.playFanfare();
      onComplete(300); // Rare loot: 300 points
      return;
    }
    sounds.playClick();
    setCurrentPath([...currentPath, name]);
  };

  const goBack = () => {
    if (currentPath.length > 1) {
      sounds.playClick();
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const currentFolder = currentPath[currentPath.length - 1];
  let contents = [...(structure[currentFolder as keyof typeof structure] || [])];
  
  if (currentFolder === treasureLocation) {
    contents.push('💎 마스터_칩.chip');
  }

  return (
    <div className="h-full p-8 bg-[#020617] flex flex-col font-mono relative overflow-hidden">
      {/* Cyber Background Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-indigo-500 h-px w-full" 
            style={{ top: `${i * 10}%`, transform: 'skewY(-5deg)' }}
          ></div>
        ))}
      </div>

      <div className="z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={goBack} 
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1 transition-all rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-30 disabled:pointer-events-none shadow-lg shadow-indigo-500/20"
            disabled={currentPath.length <= 1}
          >
            <i className="fas fa-arrow-left mr-2"></i> Upper Directory
          </button>
          <div className="bg-slate-900 border border-indigo-500/30 px-6 py-2.5 rounded-xl text-cyan-400 text-xs font-bold tracking-tight shadow-inner flex items-center gap-2">
            <i className="fas fa-terminal opacity-50"></i>
            PATH: {currentPath.join(' > ')}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 font-black uppercase">Operation</div>
          <div className="text-xs text-indigo-400 font-bold">DEEP_FILE_SCAN_V1</div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/60 backdrop-blur-md border border-white/5 p-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 overflow-y-auto content-start rounded-3xl relative shadow-2xl custom-scrollbar">
        {contents.map(item => (
          <div 
            key={item}
            onDoubleClick={() => handleOpenFolder(item)}
            className="flex flex-col items-center gap-4 p-6 bg-slate-900/40 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 cursor-pointer rounded-2xl transition-all hover:-translate-y-2 group shadow-lg"
          >
            <div className={`text-6xl ${item.includes('💎') ? 'text-yellow-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.6)] animate-bounce' : 'text-indigo-500 group-hover:text-cyan-400'} transition-colors`}>
              <i className={`fas ${item.includes('💎') ? 'fa-microchip' : 'fa-folder-closed group-hover:fa-folder-open'}`}></i>
            </div>
            <span className="text-[11px] font-black text-slate-300 group-hover:text-white text-center leading-tight tracking-wider truncate w-full">
              {item.replace('📂 ', '').replace('.chip', '').toUpperCase()}
            </span>
            <div className="opacity-0 group-hover:opacity-100 text-[8px] text-indigo-400 font-bold uppercase transition-opacity">
              {item.includes('📂') ? 'Double Click to Access' : 'Retrieve Chip'}
            </div>
          </div>
        ))}
        {contents.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-600 italic">
            <i className="fas fa-box-open text-4xl mb-4"></i>
            Directory is empty. Continue searching...
          </div>
        )}
      </div>
    </div>
  );
};
