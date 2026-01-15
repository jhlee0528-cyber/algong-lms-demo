/**
 * 영어도서관 관련 React Query 훅
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getLibraryBooks,
  getLibraryBook,
  createLibraryProgress,
  getStudentLibraryProgress,
} from '../api/library';
import type {
  GetLibraryBooksRequest,
  GetLibraryBookRequest,
  CreateLibraryProgressRequest,
} from '../types';

/**
 * 도서 목록 조회 훅
 */
export function useLibraryBooks(params?: GetLibraryBooksRequest) {
  return useQuery({
    queryKey: ['library', 'books', params],
    queryFn: () => getLibraryBooks(params),
  });
}

/**
 * 도서 상세 조회 훅
 */
export function useLibraryBook(params: GetLibraryBookRequest) {
  return useQuery({
    queryKey: ['library', 'books', params.book_id],
    queryFn: () => getLibraryBook(params),
    enabled: !!params.book_id,
  });
}

/**
 * 도서 읽기 진행도 기록 훅
 */
export function useCreateLibraryProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLibraryProgressRequest) => createLibraryProgress(data),
    onSuccess: (_, variables) => {
      // 학생의 도서 읽기 이력 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['library', 'students', variables.student_id, 'progress'],
      });
      // 학습 진행도 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['progress', 'students', variables.student_id],
      });
    },
  });
}

/**
 * 학생의 도서 읽기 이력 조회 훅
 */
export function useStudentLibraryProgress(
  studentId: number,
  params?: {
    start_date?: string;
    end_date?: string;
    completed?: boolean;
  }
) {
  return useQuery({
    queryKey: ['library', 'students', studentId, 'progress', params],
    queryFn: () => getStudentLibraryProgress(studentId, params),
    enabled: !!studentId,
  });
}
