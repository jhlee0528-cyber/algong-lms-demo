/**
 * 학생 관련 React Query 훅
 */

import { useQuery } from '@tanstack/react-query';
import { getStudents, getStudent } from '../api/students';
import type { GetStudentsRequest } from '../types';

/**
 * 학생 목록 조회 훅
 */
export function useStudents(params: GetStudentsRequest) {
  return useQuery({
    queryKey: ['students', params],
    queryFn: () => getStudents(params),
    enabled: !!params.teacher_id,
  });
}

/**
 * 학생 상세 조회 훅
 */
export function useStudent(studentId: number) {
  return useQuery({
    queryKey: ['students', studentId],
    queryFn: () => getStudent(studentId),
    enabled: !!studentId,
  });
}
