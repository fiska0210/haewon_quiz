
import React, { useState, useCallback, useMemo } from 'react';
import { QUESTIONS } from './constants';
import { QuizState } from './types';

// Sub-components
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden mb-8">
      <div 
        className="h-full bg-sky-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const Header: React.FC = () => (
  <header className="text-center py-10">
    <div className="inline-block relative">
      <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-2 relative z-10">
        海嫄大哉問
      </h1>
      <div className="absolute -bottom-2 left-0 w-full h-4 bg-sky-200 -z-0 rounded-full opacity-50"></div>
    </div>
    <p className="text-sky-600 mt-4 font-medium">測測你對 NMIXX 隊長吳海嫄的了解程度！</p>
  </header>
);

const ResultView: React.FC<{ score: number; onRestart: () => void }> = ({ score, onRestart }) => {
  const total = QUESTIONS.length;
  const percentage = (score / total) * 100;
  
  const getFeedback = () => {
    if (percentage === 100) return { title: "真正的 NSWER！", message: "海嫄就在你身邊，你是頂級粉絲！" };
    if (percentage >= 80) return { title: "資深愛好者！", message: "你對海嫄瞭如指掌，太棒了！" };
    if (percentage >= 50) return { title: "很有潛力！", message: "繼續努力，多看幾遍海嫄的綜藝吧！" };
    return { title: "海嫄新手！", message: "沒關係，現在開始入坑也不遲！" };
  };

  const feedback = getFeedback();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl text-center max-w-lg mx-auto transform transition-all animate-in fade-in zoom-in duration-500">
      <div className="mb-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-sky-800 mb-2">{feedback.title}</h2>
        <div className="text-5xl font-black text-sky-500 my-6">
          {score} <span className="text-2xl text-sky-300">/ {total}</span>
        </div>
        <p className="text-gray-600 text-lg">{feedback.message}</p>
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-sky-200"
      >
        再挑戰一次
      </button>

      <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
        <a 
          href="https://www.instagram.com/nmixx_official/" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center gap-2 p-3 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors"
        >
          <i className="fab fa-instagram text-xl"></i>
          <span>NMIXX IG</span>
        </a>
        <a 
          href="https://www.youtube.com/@NMIXXOfficial" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
        >
          <i className="fab fa-youtube text-xl"></i>
          <span>NMIXX YouTube</span>
        </a>
      </div>
    </div>
  );
};

const QuizApp: React.FC = () => {
  const [gameState, setGameState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    isFinished: false,
    userAnswers: {}
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = QUESTIONS[gameState.currentQuestionIndex];

  const handleOptionClick = useCallback((option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
  }, [showFeedback]);

  const handleNext = useCallback(() => {
    if (!selectedOption) return;

    setShowFeedback(true);
    
    // Check answer
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    setTimeout(() => {
      setGameState(prev => {
        const nextIndex = prev.currentQuestionIndex + 1;
        const isFinished = nextIndex >= QUESTIONS.length;
        
        return {
          ...prev,
          score: isCorrect ? prev.score + 1 : prev.score,
          currentQuestionIndex: nextIndex,
          isFinished,
          userAnswers: { ...prev.userAnswers, [currentQuestion.id]: selectedOption }
        };
      });
      setSelectedOption(null);
      setShowFeedback(false);
    }, 1200);
  }, [selectedOption, currentQuestion, gameState]);

  const restartQuiz = () => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      isFinished: false,
      userAnswers: {}
    });
    setSelectedOption(null);
    setShowFeedback(false);
  };

  if (gameState.isFinished) {
    return (
      <div className="min-h-screen p-4 md:p-10 flex flex-col items-center justify-center">
        <Header />
        <ResultView score={gameState.score} onRestart={restartQuiz} />
        <footer className="mt-20 text-sky-400 text-sm">
          Made with 🤍 for NSWERs | © 2026 Haewon Birthday Event
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-10 max-w-2xl mx-auto flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="mb-4 flex justify-between items-end">
          <span className="px-4 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-bold uppercase tracking-wider">
            {currentQuestion.category}
          </span>
          <span className="text-sky-400 font-bold">
            {gameState.currentQuestionIndex + 1} / {QUESTIONS.length}
          </span>
        </div>

        <ProgressBar current={gameState.currentQuestionIndex + 1} total={QUESTIONS.length} />

        <div className="glass-effect rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-snug">
            {currentQuestion.question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => {
              let buttonClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 font-medium ";
              
              if (showFeedback) {
                if (option === currentQuestion.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-700 ring-4 ring-green-100 scale-105 z-10";
                } else if (option === selectedOption) {
                  buttonClass += "border-red-500 bg-red-50 text-red-700 opacity-60";
                } else {
                  buttonClass += "border-gray-100 opacity-40 grayscale-[0.5]";
                }
              } else if (selectedOption === option) {
                buttonClass += "border-sky-500 bg-sky-50 text-sky-700 ring-4 ring-sky-100 shadow-md";
              } else {
                buttonClass += "border-gray-100 hover:border-sky-200 hover:bg-sky-50/50 text-gray-700 hover:shadow-sm";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-bold mr-4 shrink-0 transition-colors group-hover:bg-sky-100">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-lg">{option}</span>
                    {showFeedback && option === currentQuestion.correctAnswer && (
                      <i className="fas fa-check-circle ml-auto text-green-500 text-2xl animate-bounce"></i>
                    )}
                    {showFeedback && option === selectedOption && option !== currentQuestion.correctAnswer && (
                      <i className="fas fa-times-circle ml-auto text-red-500 text-2xl"></i>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!selectedOption || showFeedback}
              className={`
                px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-3
                ${!selectedOption || showFeedback 
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                  : "bg-sky-500 text-white hover:bg-sky-600 shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5 active:translate-y-0"}
              `}
            >
              <span>{gameState.currentQuestionIndex === QUESTIONS.length - 1 ? "看結果" : "下一題"}</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </main>

      <div className="mt-12 flex justify-center items-center gap-6 opacity-40 grayscale pointer-events-none">
        <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center text-sky-600 text-xl font-bold">N</div>
        <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center text-sky-600 text-xl font-bold">M</div>
        <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center text-sky-600 text-xl font-bold">I</div>
        <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center text-sky-600 text-xl font-bold">X</div>
        <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center text-sky-600 text-xl font-bold">X</div>
      </div>
    </div>
  );
};

export default QuizApp;
