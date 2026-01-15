/**
 * 퀴즈 관련 API 엔드포인트
 */

import apiClient from './client';
import type { LibraryQuiz, QuizResult } from '../types/quiz';

/**
 * 도서 ID로 퀴즈 조회
 */
export async function getQuizByBookId(bookId: string): Promise<LibraryQuiz | null> {
  try {
    const response = await apiClient.get<LibraryQuiz>(`/quiz/book/${bookId}`);
    return response.data;
  } catch (error) {
    // 퀴즈가 없는 경우 null 반환
    return null;
  }
}

/**
 * 퀴즈 결과 저장
 */
export async function submitQuizResult(
  studentId: number,
  quizId: string,
  bookId: string,
  responses: Array<{ question_id: string; answer: string | number; is_correct: boolean }>,
  score: number
): Promise<QuizResult> {
  const response = await apiClient.post<QuizResult>('/quiz/submit', {
    student_id: studentId,
    quiz_id: quizId,
    book_id: bookId,
    responses,
    score,
  });
  return response.data;
}

/**
 * 학생의 퀴즈 결과 조회
 */
export async function getStudentQuizResults(
  studentId: number,
  bookId?: string
): Promise<QuizResult[]> {
  const params = bookId ? { book_id: bookId } : {};
  const response = await apiClient.get<QuizResult[]>(
    `/quiz/students/${studentId}/results`,
    { params }
  );
  return response.data;
}
