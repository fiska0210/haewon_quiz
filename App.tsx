
import React, { useState, useCallback } from 'react';
import { QUIZ_QUESTIONS } from './constants';
import { QuizState, UserAnswers } from './types';
import Header from './components/Header';
import Intro from './components/Intro';
import QuizCard from './components/QuizCard';
import Result from './components/Result';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<QuizState>('INTRO');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  const startQuiz = useCallback(() => {
    setGameState('QUIZ');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  }, []);

  const handleAnswerSelection = useCallback((answer: string) => {
    const questionId = QUIZ_QUESTIONS[currentQuestionIndex].id;
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setGameState('RESULT');
      }, 500);
    }
  }, [currentQuestionIndex]);

  const resetGame = useCallback(() => {
    setGameState('INTRO');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <Header />
        
        <main className="p-6 md:p-10">
          {gameState === 'INTRO' && (
            <Intro onStart={startQuiz} />
          )}

          {gameState === 'QUIZ' && (
            <QuizCard
              question={QUIZ_QUESTIONS[currentQuestionIndex]}
              totalQuestions={QUIZ_QUESTIONS.length}
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
