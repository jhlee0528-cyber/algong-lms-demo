/**
 * 주간 학습 계획 및 진도 추적 타입 정의
 */

// 주간 학습 계획
export interface WeeklyPlan {
  id: string;
  studentId: number;
  weekStartDate: string;        // ISO 날짜 (월요일)
  weekEndDate: string;          // ISO 날짜 (일요일)
  
  // 목표 설정
  targetUnits: PlannedUnit[];   // 계획된 단원들
  targetLectureCount: number;   // 목표 강의 수
  targetActivityCount: number;  // 목표 액티비티 수
  targetLibraryBooks: number;   // 목표 도서 수
  targetAiChatSessions: number; // 목표 AI대화 수
  
  // 진행 상태
  status: 'planned' | 'in_progress' | 'completed' | 'overdue';
  createdAt: string;
  updatedAt: string;
}

// 계획된 단원
export interface PlannedUnit {
  unitId: number;
  curriculum: 'Phonics' | 'Reading' | 'Grammar' | 'Writing';
  levelCode: string;            // SA1, MB3 등
  unitNumber: number;
  unitTitle: string;
  tasks: PlannedTask[];
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  completedAt?: string;
}

// 계획된 과제
export interface PlannedTask {
  taskType: 'lecture' | 'activity' | 'ai_chat' | 'library';
  taskDetail?: string;          // 차시, 듣기/말하기 등
  status: 'pending' | 'in_progress' | 'completed';
  score?: number;
  completedAt?: string;
}

// 주간 진행 현황 요약
export interface WeeklyProgress {
  studentId: number;
  weekStartDate: string;
  
  // 계획 대비 실적
  planned: {
    totalUnits: number;
    totalTasks: number;
  };
  completed: {
    units: number;
    tasks: number;
  };
  
  // 달성률
  unitCompletionRate: number;   // 0-100
  taskCompletionRate: number;   // 0-100
  averageScore: number;         // 0-100
  
  // 학습 시간
  totalStudyTime: number;       // 분 단위
  
  // 상태 판정
  performanceStatus: 'excellent' | 'on_track' | 'warning' | 'critical';
}

// 3주 뷰 데이터
export interface ThreeWeekView {
  lastWeek: WeeklyProgress;
  thisWeek: WeeklyProgress;
  nextWeek: WeeklyPlan;
}

// 주간 통계 요약 (대시보드용)
export interface WeeklySummaryStats {
  weekStartDate: string;
  totalStudents: number;
  
  // 달성 현황
  excellentCount: number;       // 100% 달성
  onTrackCount: number;         // 70-99% 달성
  warningCount: number;         // 50-69% 달성
  criticalCount: number;        // 50% 미만
  
  // 전체 평균
  averageCompletionRate: number;
  averageScore: number;
  
  // 주간 비교
  comparedToLastWeek: {
    completionRateDiff: number; // +/- 퍼센트포인트
    scoreDiff: number;
  };
}
