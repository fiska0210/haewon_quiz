import React, { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS } from './constants';
import { QuizState, UserAnswers, Question } from './types';
import Header from './components/Header';
import Intro from './components/Intro';
import QuizCard from './components/QuizCard';
import Result from './components/Result';
import { motion, AnimatePresence } from 'motion/react';

// Fisher-Yates 洗牌演算法
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<QuizState>('INTRO');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  const startQuiz = useCallback(() => {
    // 每次開始測驗時，對每一題的選項進行隨機排序
    const prepared = QUIZ_QUESTIONS.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setShuffledQuestions(prepared);
    setGameState('QUIZ');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  }, []);

  const handleAnswerSelection = useCallback((answer: string) => {
    const questionId = shuffledQuestions[currentQuestionIndex].id;
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setGameState('RESULT');
      }, 500);
    }
  }, [currentQuestionIndex, shuffledQuestions]);

  const resetGame = useCallback(() => {
    setGameState('INTRO');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShuffledQuestions([]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
          <Header />
          
        <main className="p-6 md:p-10">
              {gameState === 'INTRO' && (
            <Intro onStart={startQuiz} />
              )}

              {gameState === 'QUIZ' && shuffledQuestions.length > 0 && (
                <QuizCard
                  question={shuffledQuestions[currentQuestionIndex]}
                  totalQuestions={shuffledQuestions.length}
                  currentIndex={currentQuestionIndex}
                  onSelect={handleAnswerSelection}
                />
              )}

              {gameState === 'RESULT' && (
                <Result 
                  userAnswers={userAnswers} 
                  questions={QUIZ_QUESTIONS} 
                  onReset={resetGame} 
                />
              )}
          </main>
        </div>
      
      <footer className="mt-8 text-slate-400 text-sm">
        Made for NSWER | © 2026 Haewon Birthday Event 피스카상사
      </footer>
    </div>
  );
};

export default App;
