
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
  userAnswers: { [key: number]: string };
}
