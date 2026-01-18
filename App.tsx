
import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameContainer } from './components/GameContainer';
import { ResultScreen } from './components/ResultScreen';
import { LEVELS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'result'>('welcome');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#020617] relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

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
