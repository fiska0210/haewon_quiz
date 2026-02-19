
import React from 'react';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  totalQuestions: number;
  currentIndex: number;
  onSelect: (answer: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  totalQuestions, 
  currentIndex, 
  onSelect 
}) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="animate-slideIn">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-emerald-600">
            問題 {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm font-medium text-slate-400">
            {Math.round(progress)}% 完成
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
        {question.text}
      </h3>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(option)}
            className="group relative flex items-center w-full p-4 text-left border-2 border-slate-100 rounded-2xl transition-all active:scale-[0.98] active:bg-slate-50"
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold mr-4 transition-colors">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="text-lg font-medium text-slate-700">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
