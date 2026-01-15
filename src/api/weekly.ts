/**
 * 주간 학습 계획 및 진도 추적 API
 */

import apiClient from './client';
import type { WeeklyPlan, WeeklyProgress, ThreeWeekView, WeeklySummaryStats } from '../types/weekly';
import { getWeekStart, getLastWeekStart, getNextWeekStart } from '../utils/weekHelper';
import { getPerformanceStatus } from '../utils/weekHelper';

// 주간 계획 조회
export const getWeeklyPlan = async (studentId: number, weekStart: string): Promise<WeeklyPlan> => {
  try {
    const response = await apiClient.get(`/weekly/plans/${studentId}`, { params: { weekStart } });
    return response.data;
  } catch (error) {
    // 더미 데이터 반환
    return generateDummyWeeklyPlan(studentId, weekStart);
  }
};

// 주간 계획 생성/수정
export const saveWeeklyPlan = async (plan: Partial<WeeklyPlan>): Promise<WeeklyPlan> => {
  try {
    const response = await apiClient.post('/weekly/plans', plan);
    return response.data;
  } catch (error) {
    // 더미 데이터 반환
    return generateDummyWeeklyPlan(plan.studentId || 0, plan.weekStartDate || getWeekStart());
  }
};

// 일괄 주간 계획 생성
export const bulkCreateWeeklyPlans = async (
  studentIds: number[],
  weekStart: string,
  template: Partial<WeeklyPlan>
): Promise<WeeklyPlan[]> => {
  try {
    const response = await apiClient.post('/weekly/plans/bulk', { studentIds, weekStart, template });
    return response.data;
  } catch (error) {
    // 더미 데이터 반환
    return studentIds.map(id => generateDummyWeeklyPlan(id, weekStart));
  }
};

// 주간 진행 현황 조회
export const getWeeklyProgress = async (studentId: number, weekStart: string): Promise<WeeklyProgress> => {
  try {
    const response = await apiClient.get(`/weekly/progress/${studentId}`, { params: { weekStart } });
    return response.data;
  } catch (error) {
    // 더미 데이터 반환
    return generateDummyWeeklyProgress(studentId, weekStart);
  }
};

// 3주 뷰 조회
export const getThreeWeekView = async (studentId: number): Promise<ThreeWeekView> => {
  try {
    const response = await apiClient.get(`/weekly/three-week-view/${studentId}`);
    return response.data;
  } catch (error) {
    // 더미 데이터 반환
    const lastWeekStart = getLastWeekStart();
    const thisWeekStart = getWeekStart();
    const nextWeekStart = getNextWeekStart();
    
    return {
      lastWeek: generateDummyWeeklyProgress(studentId, lastWeekStart),
      thisWeek: generateDummyWeeklyProgress(studentId, thisWeekStart),
      nextWeek: generateDummyWeeklyPlan(studentId, nextWeekStart),
    };
  }
};

// 전체 학생 주간 요약 통계
export const getWeeklySummaryStats = async (weekStart: string): Promise<WeeklySummaryStats> => {
  try {
    const response = await apiClient.get('/weekly/summary', { params: { weekStart } });
    return response.data;
  } catch (error) {
    // 더미 데이터 반환
    return generateDummyWeeklySummaryStats(weekStart);
  }
};

// 자동 학습 계획 생성 (이전 주 성과 기반)
export const generateAutoWeeklyPlan = async (studentId: number, weekStart: string): Promise<WeeklyPlan> => {
  try {
    const response = await apiClient.post(`/weekly/plans/${studentId}/auto-generate`, { weekStart });
    return response.data;
  } catch (error) {
    // 더미 데이터 반환
    return generateDummyWeeklyPlan(studentId, weekStart);
  }
};

// 더미 데이터 생성 함수들
function generateDummyWeeklyPlan(studentId: number, weekStart: string): WeeklyPlan {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  
  return {
    id: `plan-${studentId}-${weekStart}`,
    studentId,
    weekStartDate: weekStart,
    weekEndDate: weekEnd.toISOString().split('T')[0],
    targetUnits: [
      {
        unitId: 1,
        curriculum: 'Phonics',
        levelCode: 'SA1',
        unitNumber: 1,
        unitTitle: 'It Is an Apple',
        tasks: [
          { taskType: 'lecture', taskDetail: '1-3차시', status: 'pending' },
          { taskType: 'activity', taskDetail: '듣기', status: 'pending' },
        ],
        status: 'pending',
      },
      {
        unitId: 2,
        curriculum: 'Phonics',
        levelCode: 'SA1',
        unitNumber: 2,
        unitTitle: 'I Am a Boy',
        tasks: [
          { taskType: 'lecture', taskDetail: '1-3차시', status: 'pending' },
          { taskType: 'activity', taskDetail: '읽기', status: 'pending' },
        ],
        status: 'pending',
      },
    ],
    targetLectureCount: 6,
    targetActivityCount: 4,
    targetLibraryBooks: 2,
    targetAiChatSessions: 3,
    status: 'planned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function generateDummyWeeklyProgress(studentId: number, weekStart: string): WeeklyProgress {
  // 랜덤 달성률 생성 (더미)
  const unitCompletionRate = Math.floor(Math.random() * 50) + 50; // 50-100%
  const taskCompletionRate = Math.floor(Math.random() * 50) + 50;
  const averageScore = Math.floor(Math.random() * 30) + 70; // 70-100점
  
  const plannedUnits = Math.floor(Math.random() * 3) + 2; // 2-4단원
  const completedUnits = Math.floor((plannedUnits * unitCompletionRate) / 100);
  const plannedTasks = plannedUnits * 2; // 단원당 평균 2개 과제
  const completedTasks = Math.floor((plannedTasks * taskCompletionRate) / 100);
  
  return {
    studentId,
    weekStartDate: weekStart,
    planned: {
      totalUnits: plannedUnits,
      totalTasks: plannedTasks,
    },
    completed: {
      units: completedUnits,
      tasks: completedTasks,
    },
    unitCompletionRate,
    taskCompletionRate,
    averageScore,
    totalStudyTime: Math.floor(Math.random() * 300) + 100, // 100-400분
    performanceStatus: getPerformanceStatus(unitCompletionRate),
  };
}

function generateDummyWeeklySummaryStats(weekStart: string): WeeklySummaryStats {
  return {
    weekStartDate: weekStart,
    totalStudents: 20,
    excellentCount: 5, // 100% 달성
    onTrackCount: 8,   // 70-99% 달성
    warningCount: 5,   // 50-69% 달성
    criticalCount: 2,  // 50% 미만
    averageCompletionRate: 75,
    averageScore: 82,
    comparedToLastWeek: {
      completionRateDiff: 5, // +5pp
      scoreDiff: 3,         // +3점
    },
  };
}

