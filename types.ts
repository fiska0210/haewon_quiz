
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  fact?: string;
}

export type QuizState = 'INTRO' | 'QUIZ' | 'RESULT';

export interface UserAnswers {
  [questionId: number]: string;
}
