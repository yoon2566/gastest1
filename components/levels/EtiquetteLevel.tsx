
import React, { useState } from 'react';
import { sounds } from '../../utils/sound';

interface EtiquetteLevelProps {
  onComplete: (points: number) => void;
}

const BEHAVIORS = [
  { id: 1, text: "사용 후 마우스와 키보드를 가지런히 정리해요.", good: true },
  { id: 2, text: "컴퓨터를 발로 툭툭 차요.", good: false },
  { id: 3, text: "음료수나 과자를 컴퓨터 앞에서 먹어요.", good: false },
  { id: 4, text: "컴퓨터 전원을 함부로 껐다 켰다 반복해요.", good: false },
  { id: 5, text: "모르는 내용이 있으면 손을 들고 질문해요.", good: true },
  { id: 6, text: "친구의 모니터를 손가락으로 꾹꾹 눌러요.", good: false },
  { id: 7, text: "수업 시간에 게임을 몰래 해요.", good: false },
  { id: 8, text: "지정된 자리에 바른 자세로 앉아요.", good: true },
];

export const EtiquetteLevel: React.FC<EtiquetteLevelProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const current = BEHAVIORS[currentIndex];

  const handleChoice = (isGood: boolean) => {
    let newPoints = earnedPoints;
    if (isGood === current.good) {
      sounds.playSuccess();
      setFeedback('correct');
      newPoints += 50;
      setEarnedPoints(newPoints);
    } else {
      sounds.playError();
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < BEHAVIORS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Final level completion with accumulated points (50 per correct answer)
        onComplete(newPoints);
      }
    }, 1000);
  };

  return (
    <div className="h-full p-8 flex flex-col items-center justify-center text-center">
      <div className="flex justify-between w-full max-w-2xl mb-4 px-4">
        <div className="text-gray-500 font-bold">문제 {currentIndex + 1} / {BEHAVIORS.length}</div>
        <div className="text-yellow-500 font-black">획득 점수: +{earnedPoints}</div>
      </div>
      
      <div className={`text-2xl font-bold p-12 bg-white rounded-3xl shadow-xl border-4 ${
        feedback === 'correct' ? 'border-green-400 bg-green-50' : 
        feedback === 'wrong' ? 'border-red-400 bg-red-50' : 'border-blue-100'
      } transition-colors min-h-[200px] flex items-center w-full max-w-2xl`}>
        {feedback === 'correct' ? '⭕ 잘했어요! (+50점)' : 
         feedback === 'wrong' ? '❌ 다시 생각해보세요!' : current.text}
      </div>

      <div className="mt-12 flex gap-8">
        <button 
          onClick={() => handleChoice(true)}
          disabled={!!feedback}
          className="flex flex-col items-center gap-2 p-6 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
        >
          <span className="text-4xl">😊</span>
          <span className="text-xl font-bold">참 잘했어요!</span>
        </button>
        <button 
          onClick={() => handleChoice(false)}
          disabled={!!feedback}
          className="flex flex-col items-center gap-2 p-6 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
        >
          <span className="text-4xl">😡</span>
          <span className="text-xl font-bold">하면 안 돼요!</span>
        </button>
      </div>
    </div>
  );
};
