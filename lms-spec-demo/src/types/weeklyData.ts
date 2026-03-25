// 주간별 학생 학습 데이터
export interface WeeklyStudentData {
  studentId: number;
  
  // 주간 학습 현황
  learningProgress: number;     // 학습 진행률 (0-100)
  missionProgress: number;      // 미션 진행률 (0-100)
  weeklyProgress: number;       // 주간 달성률 = (학습 진행률 + 미션 진행률) / 2
  weeklyCompleted: boolean;    // 주간 목표 완료 여부
  weeklyTasksCompleted: number; // 완료한 과제 수
  weeklyTasksTotal: number;    // 전체 과제 수
  
  // 과제 유형별 완료 현황
  lectureProgress: number;
  activityProgress: number;
  aiChatProgress: number;
  libraryProgress: number;
  
  // 성과 지표
  accuracyRate: number;        // 정답률
  studyTimeMinutes: number;    // 학습 시간 (분)
  
  // 상태 분류
  status: 'excellent' | 'normal' | 'warning' | 'critical';
}

// 주간 요약 통계 (학생 데이터에서 계산)
export interface WeeklySummary {
  totalStudents: number;
  completedStudents: number;
  completionRate: number;
  averageAccuracy: number;
  averageStudyTime: number;
  
  // 상태별 학생 수
  excellentCount: number;
  normalCount: number;
  warningCount: number;
  criticalCount: number;
  
  // 상태별 학생 목록
  excellentStudents: number[];  // studentId 배열
  warningStudents: number[];
  criticalStudents: number[];
}

// 주간 데이터 전체
export interface WeekData {
  weekLabel: string;           // "이번 주", "지난 주", "다음 주"
  weekStart: string;           // ISO 날짜
  weekEnd: string;
  studentData: Map<number, WeeklyStudentData>;
  summary: WeeklySummary;
}
