/**
 * 학습 진행도 관련 React Query 훅
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStudentProgress,
  getProgressByType,
  updateProgress,
  getStudentMissionProgress,
  getStudentProgressSummary,
} from '../api/progress';
import type {
  GetStudentProgressRequest,
  GetProgressByTypeRequest,
  UpdateProgressRequest,
} from '../types';

/**
 * 학생 학습 진행도 조회 훅
 */
export function useStudentProgress(params: GetStudentProgressRequest) {
  return useQuery({
    queryKey: ['progress', 'students', params.student_id, params],
    queryFn: () => getStudentProgress(params),
    enabled: !!params.student_id,
  });
}

/**
 * 과제 유형별 진행도 조회 훅
 */
export function useProgressByType(params: GetProgressByTypeRequest) {
  return useQuery({
    queryKey: ['progress', 'students', params.student_id, 'by-type', params],
    queryFn: () => getProgressByType(params),
    enabled: !!params.student_id,
  });
}

/**
 * 학습 진행도 업데이트 훅
 */
export function useUpdateProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProgressRequest) => updateProgress(data),
    onSuccess: () => {
      // 진행도 캐시 무효화 (학생 ID는 progress에서 가져와야 함)
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}

/**
 * 학생의 미션별 진행도 조회 훅
 */
export function useStudentMissionProgress(studentId: number, missionId: number) {
  return useQuery({
    queryKey: ['progress', 'students', studentId, 'missions', missionId],
    queryFn: () => getStudentMissionProgress(studentId, missionId),
    enabled: !!studentId && !!missionId,
  });
}

/**
 * 학생의 학습 현황 요약 조회 훅
 */
export function useStudentProgressSummary(
  studentId: number,
  params?: {
    start_date?: string;
    end_date?: string;
  }
) {
  return useQuery({
    queryKey: ['progress', 'students', studentId, 'summary', params],
    queryFn: () => getStudentProgressSummary(studentId, params),
    enabled: !!studentId,
  });
}
