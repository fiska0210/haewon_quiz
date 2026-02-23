export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  fact?: string;
  sourceUrl?: string; // 新增來源網站欄位
}

export type QuizState = 'INTRO' | 'QUIZ' | 'RESULT';

export interface UserAnswers {
  [questionId: number]: string;
}
