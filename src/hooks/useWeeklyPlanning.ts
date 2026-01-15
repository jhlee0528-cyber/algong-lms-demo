/**
 * 주간 학습 계획 관련 React Query 훅
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as weeklyApi from '../api/weekly';
import type { WeeklyPlan } from '../types/weekly';

// 주간 계획 조회
export const useWeeklyPlan = (studentId: number, weekStart: string) => {
  return useQuery({
    queryKey: ['weeklyPlan', studentId, weekStart],
    queryFn: () => weeklyApi.getWeeklyPlan(studentId, weekStart),
    enabled: !!studentId && !!weekStart,
  });
};

// 주간 계획 저장
export const useSaveWeeklyPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: weeklyApi.saveWeeklyPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weeklyPlan'] });
      queryClient.invalidateQueries({ queryKey: ['weeklySummary'] });
      queryClient.invalidateQueries({ queryKey: ['threeWeekView'] });
    },
  });
};

// 일괄 계획 생성
export const useBulkCreatePlans = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studentIds, weekStart, template }: { 
      studentIds: number[]; 
      weekStart: string; 
      template: Partial<WeeklyPlan> 
    }) => weeklyApi.bulkCreateWeeklyPlans(studentIds, weekStart, template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weeklyPlan'] });
      queryClient.invalidateQueries({ queryKey: ['weeklySummary'] });
    },
  });
};

// 주간 진행 현황 조회
export const useWeeklyProgress = (studentId: number, weekStart: string) => {
  return useQuery({
    queryKey: ['weeklyProgress', studentId, weekStart],
    queryFn: () => weeklyApi.getWeeklyProgress(studentId, weekStart),
    enabled: !!studentId && !!weekStart,
  });
};

// 3주 뷰 조회
export const useThreeWeekView = (studentId: number) => {
  return useQuery({
    queryKey: ['threeWeekView', studentId],
    queryFn: () => weeklyApi.getThreeWeekView(studentId),
    enabled: !!studentId,
  });
};

// 주간 요약 통계
export const useWeeklySummary = (weekStart: string) => {
  return useQuery({
    queryKey: ['weeklySummary', weekStart],
    queryFn: () => weeklyApi.getWeeklySummaryStats(weekStart),
    enabled: !!weekStart,
  });
};

// 자동 계획 생성
export const useAutoGeneratePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studentId, weekStart }: { studentId: number; weekStart: string }) =>
      weeklyApi.generateAutoWeeklyPlan(studentId, weekStart),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weeklyPlan'] });
      queryClient.invalidateQueries({ queryKey: ['threeWeekView'] });
    },
  });
};
