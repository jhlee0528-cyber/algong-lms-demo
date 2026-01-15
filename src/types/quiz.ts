/**
 * 퀴즈 관련 타입 정의
 */

export interface QuizQuestion {
  question_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[]; // 객관식 선택지
  correct_answer: string | number; // 정답
  explanation?: string; // 해설
}

export interface LibraryQuiz {
  quiz_id: string;
  book_id: string;
  questions: QuizQuestion[];
  created_at: string;
  updated_at: string;
}

export interface QuizResponse {
  question_id: string;
  answer: string | number;
  is_correct: boolean;
}

export interface QuizResult {
  response_id: number;
  student_id: number;
  quiz_id: string;
  book_id: string;
  responses: QuizResponse[];
  score: number; // 0~100
  total_questions: number;
  correct_answers: number;
  completed_at: string;
}

export interface QuizSession {
  quiz_id: string;
  book_id: string;
  questions: QuizQuestion[];
  current_question_index: number;
  answers: { [question_id: string]: string | number };
  start_time: Date;
}
