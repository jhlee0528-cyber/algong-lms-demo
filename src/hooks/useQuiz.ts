/**
 * 퀴즈 관련 React Query 훅
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQuizByBookId, submitQuizResult, getStudentQuizResults } from '../api/quiz';

/**
 * 도서 ID로 퀴즈 조회 훅
 */
export function useQuizByBookId(bookId: string) {
  return useQuery({
    queryKey: ['quiz', 'book', bookId],
    queryFn: () => getQuizByBookId(bookId),
    enabled: !!bookId,
  });
}

/**
 * 퀴즈 결과 제출 훅
 */
export function useSubmitQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studentId,
      quizId,
      bookId,
      responses,
      score,
    }: {
      studentId: number;
      quizId: string;
      bookId: string;
      responses: Array<{ question_id: string; answer: string | number; is_correct: boolean }>;
      score: number;
    }) => submitQuizResult(studentId, quizId, bookId, responses, score),
    onSuccess: (_, variables) => {
      // 관련 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['quiz', 'book', variables.bookId] });
      queryClient.invalidateQueries({
        queryKey: ['quiz', 'students', variables.studentId, 'results'],
      });
      queryClient.invalidateQueries({
        queryKey: ['progress', 'students', variables.studentId],
      });
    },
  });
}

/**
 * 학생의 퀴즈 결과 조회 훅
 */
export function useStudentQuizResults(studentId: number, bookId?: string) {
  return useQuery({
    queryKey: ['quiz', 'students', studentId, 'results', bookId],
    queryFn: () => getStudentQuizResults(studentId, bookId),
    enabled: !!studentId,
  });
}
