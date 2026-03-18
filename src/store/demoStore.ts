// 알공공부방 데모용 Zustand Store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockStudents, Student, getTodayAttendance, getStudentStats } from '../data/mockStudents';
import { mockWeeklyReports, WeeklyReport, getPendingReports } from '../data/mockReports';
import { mockGradingSamples, GradingResult, getGradingResultBySampleId } from '../data/mockGrading';

// 대시보드 "오늘 할 일" 타입
export interface TodoTask {
  id: string;
  type: 'grading' | 'progress' | 'communication';
  title: string;
  description: string;
  completed: boolean;
  studentIds?: string[];
}

// 주간 통계
export interface WeeklyStats {
  gradingCompletionRate: number;  // 채점 완료율 (%)
  averageLevel: string;            // 평균 진도 (예: "Lv.14.2")
  communicationFrequency: number;  // 학부모 소통 횟수 (주간)
}

interface DemoStoreState {
  // 데이터
  students: Student[];
  selectedStudent: Student | null;
  weeklyReports: WeeklyReport[];
  gradingResults: GradingResult[];

  // 대시보드
  todayTasks: TodoTask[];
  todayAttendance: number;
  weeklyStats: WeeklyStats;

  // 채점
  currentGradingResult: GradingResult | null;
  isGrading: boolean;

  // Actions
  selectStudent: (id: string) => void;
  completeTask: (taskId: string) => void;
  startGrading: (sampleId: string) => Promise<void>;
  clearGrading: () => void;
  sendWeeklyReport: (reportId: string) => void;
  resetDemo: () => void;
}

// 초기 "오늘 할 일" 생성
const generateTodayTasks = (): TodoTask[] => {
  return [
    {
      id: 'task-1',
      type: 'grading',
      title: '채점 대기 중',
      description: '김민지, 이서준 외 2명',
      completed: false,
      studentIds: ['001', '002']
    },
    {
      id: 'task-2',
      type: 'progress',
      title: '진도 확인 필요',
      description: '박지우 (진도 지연)',
      completed: false,
      studentIds: ['003']
    },
    {
      id: 'task-3',
      type: 'communication',
      title: '학부모 답변 필요',
      description: '최예은 어머니 문의',
      completed: false,
      studentIds: ['004']
    }
  ];
};

// 주간 통계 계산
const calculateWeeklyStats = (): WeeklyStats => {
  return {
    gradingCompletionRate: 87,
    averageLevel: 'Lv.14.2',
    communicationFrequency: 2.3
  };
};

export const useDemoStore = create<DemoStoreState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      students: mockStudents,
      selectedStudent: null,
      weeklyReports: mockWeeklyReports,
      gradingResults: mockGradingSamples,
      todayTasks: generateTodayTasks(),
      todayAttendance: getTodayAttendance(),
      weeklyStats: calculateWeeklyStats(),
      currentGradingResult: null,
      isGrading: false,

      // 학생 선택
      selectStudent: (id: string) => {
        const student = get().students.find(s => s.id === id);
        set({ selectedStudent: student || null });
      },

      // 할 일 완료
      completeTask: (taskId: string) => {
        set(state => ({
          todayTasks: state.todayTasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task
          )
        }));
      },

      // 채점 시작 (3초 로딩 시뮬레이션)
      startGrading: async (sampleId: string) => {
        set({ isGrading: true, currentGradingResult: null });

        // 3초 대기 (AI 채점 시뮬레이션)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 채점 결과 조회
        const result = getGradingResultBySampleId(sampleId);

        set({
          isGrading: false,
          currentGradingResult: result || null
        });
      },

      // 채점 결과 클리어
      clearGrading: () => {
        set({ currentGradingResult: null, isGrading: false });
      },

      // 주간 리포트 발송 (모의)
      sendWeeklyReport: (reportId: string) => {
        set(state => ({
          weeklyReports: state.weeklyReports.map(report =>
            report.id === reportId
              ? { ...report, sentAt: new Date().toISOString() }
              : report
          )
        }));
      },

      // 데모 리셋 (localStorage 초기화)
      resetDemo: () => {
        set({
          students: mockStudents,
          selectedStudent: null,
          weeklyReports: mockWeeklyReports,
          gradingResults: mockGradingSamples,
          todayTasks: generateTodayTasks(),
          todayAttendance: getTodayAttendance(),
          weeklyStats: calculateWeeklyStats(),
          currentGradingResult: null,
          isGrading: false
        });
      }
    }),
    {
      name: 'algong-demo-storage', // localStorage key
      partialize: (state) => ({
        // localStorage에 저장할 항목만 선택
        todayTasks: state.todayTasks,
        weeklyReports: state.weeklyReports,
        currentGradingResult: state.currentGradingResult
      })
    }
  )
);
