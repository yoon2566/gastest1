
import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameContainer } from './components/GameContainer';
import { ResultScreen } from './components/ResultScreen';
import { LEVELS } from './constants';
import { sounds } from './utils/sound';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'result'>('welcome');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  
  // Admin State
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(0);
    setScore(0);
  };

  const handleLevelComplete = (points: number) => {
    setScore(prev => prev + points);
    if (currentLevel < LEVELS.length - 1) { 
      setCurrentLevel(prev => prev + 1);
    } else {
      setGameState('result');
    }
  };

  const restartGame = () => {
    setGameState('welcome');
  };

  const jumpToLevel = (idx: number) => {
    if (idx >= 0 && idx < LEVELS.length) {
      setCurrentLevel(idx);
    }
  };

  // Admin Handlers
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === '1234') {
      setIsAdminUnlocked(true);
      sounds.playSuccess();
    } else {
      sounds.playError();
      alert('접속 거부: 비밀번호가 일치하지 않습니다.');
      setAdminPassword('');
    }
  };

  const handleAdminJump = (idx: number) => {
    sounds.playClick();
    jumpToLevel(idx);
    setGameState('playing');
    setShowAdmin(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#020617] relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Admin Button */}
      <button 
        onClick={() => {
          setShowAdmin(true);
          sounds.playClick();
        }}
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-slate-800/50 hover:bg-slate-700 text-slate-500 hover:text-cyan-400 rounded-full border border-white/5 transition-all backdrop-blur-sm group"
        title="관리자 설정"
      >
        <i className="fas fa-cog text-lg group-hover:rotate-90 transition-transform duration-500"></i>
      </button>

      {/* Admin Modal */}
      {showAdmin && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-2xl w-full max-w-2xl shadow-2xl relative">
            <button 
              onClick={() => setShowAdmin(false)} 
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            {!isAdminUnlocked ? (
              <div className="text-center max-w-sm mx-auto">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-indigo-500">
                  <i className="fas fa-lock"></i>
                </div>
                <h3 className="text-xl text-white font-bold mb-2">관리자 접속</h3>
                <p className="text-slate-400 text-sm mb-6">시스템 설정을 변경하려면 암호를 입력하세요.</p>
                <form onSubmit={handleAdminAuth} className="flex gap-2">
                  <input 
                    type="password" 
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono tracking-widest text-center"
                    placeholder="PASSCODE"
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="bg-indigo-600 px-6 py-2 rounded-lg text-white font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    UNLOCK
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <i className="fas fa-network-wired text-cyan-400"></i>
                  <h3 className="text-xl text-white font-bold">레벨 바로가기</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                  {LEVELS.map((level, idx) => (
                    <button 
                      key={level.id}
                      onClick={() => handleAdminJump(idx)}
                      className={`p-4 rounded-xl border text-left transition-all group relative overflow-hidden ${
                        currentLevel === idx 
                          ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                          : 'bg-slate-800 border-slate-700 hover:border-cyan-500 hover:bg-slate-700'
                      }`}
                    >
                      <div className="relative z-10">
                        <div className={`text-[10px] font-black uppercase mb-1 ${currentLevel === idx ? 'text-indigo-200' : 'text-slate-500'}`}>
                          Level {idx + 1}
                        </div>
                        <div className={`text-sm font-bold ${currentLevel === idx ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                          {level.title}
                        </div>
                      </div>
                      {currentLevel === idx && (
                        <div className="absolute -right-2 -bottom-2 text-6xl text-white/10">
                          <i className="fas fa-play"></i>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl z-10">
        <div className="bg-slate-900 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden border-4 border-slate-800 relative">
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-50 bg-[length:100%_4px,3px_100%]"></div>
          
          {gameState === 'welcome' && <WelcomeScreen onStart={startGame} />}
          {gameState === 'playing' && (
            <GameContainer 
              levelIndex={currentLevel} 
              onComplete={handleLevelComplete} 
              totalScore={score}
              onJumpToLevel={jumpToLevel}
            />
          )}
          {gameState === 'result' && <ResultScreen score={score} onRestart={restartGame} />}
        </div>
        
        <div className="mt-8 flex justify-between items-center px-6">
          <div className="flex items-center gap-3 text-slate-500 font-black tracking-widest text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
            SYSTEM OPERATIONAL: COMPY-OS V3.0
          </div>
          <footer className="text-slate-600 text-[10px] font-bold tracking-tighter uppercase flex items-center gap-2">
            <i className="fas fa-microchip text-indigo-500"></i>
            <span>Educational Adventure Engine by Senior Frontend Engineer</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
