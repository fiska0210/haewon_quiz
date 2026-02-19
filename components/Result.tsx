
import React from 'react';
import { Question, UserAnswers } from '../types';

interface ResultProps {
  userAnswers: UserAnswers;
  questions: Question[];
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ userAnswers, questions, onReset }) => {
  const score = questions.reduce((acc, q) => {
    return acc + (userAnswers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);

  const getTitle = () => {
    if (score === questions.length) return "吳海嫄大師！";
    if (score >= 8) return "資深 NSWER";
    if (score >= 6) return "海嫄愛好者";
    return "需要多看直播跟綜藝喔！";
  };

  const getMessage = () => {
    if (score === questions.length) return "海嫄系 認證！ 恭喜你獲得抽獎機會～";
    if (score >= 8) return "非常優秀！你對海嫄的了解已經贏過大部分的人了! 恭喜你獲得抽獎機會～";
    if (score >= 6) return "還不錯！看來你有在關注海嫄的動向! 恭喜你獲得抽獎機會～";
    return "沒關係，現在開始追 NMIXX 的直播跟綜藝還不遲！趕快去複習一下。";
  };

  return (
    <div className="animate-scaleIn flex flex-col items-center">
      <div className="mb-6 text-center">
        <div className="inline-block p-4 rounded-full bg-emerald-50 mb-4">
          <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl font-bold">
            {score}/{questions.length}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800">{getTitle()}</h2>
        <p className="text-slate-500 mt-2 max-w-sm">{getMessage()}</p>
      </div>

      <div className="w-full space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-8 border-t border-b border-slate-50 py-4 custom-scrollbar">
        {questions.map((q, idx) => {
          const isCorrect = userAnswers[q.id] === q.correctAnswer;
          return (
            <div key={q.id} className={`p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <div className="flex items-start">
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1 ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
                <div>
                  <p className="text-slate-800 font-bold text-sm mb-1">{q.text}</p>
                  <p className="text-xs text-slate-500">
                    你的回答：<span className={isCorrect ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>{userAnswers[q.id]}</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-slate-500 mt-1">
                      正確答案：<span className="text-emerald-600 font-bold">{q.correctAnswer}</span>
                    </p>
                  )}
                  {q.fact && <p className="text-xs text-slate-400 mt-2 italic bg-white/50 p-2 rounded-lg border border-slate-50">TMI: {q.fact}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={onReset}
        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all"
      >
        再玩一次
      </button>
    </div>
  );
};

export default Result;
