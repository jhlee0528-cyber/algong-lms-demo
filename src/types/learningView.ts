export type ViewMode = 'unit' | 'taskType' | 'period';

export type PeriodFilter = 'thisWeek' | 'lastMonth' | 'last3Months' | 'all';

export interface TaskTypeStats {
  type: 'lecture' | 'activity' | 'aiChat' | 'library';
  label: string;
  icon: string;
  color: string;
  completed: number;
  inProgress: number;
  notStarted: number;
  completionRate: number;
}

export interface PeriodStats {
  period: string;
  completionRate: number;
  totalCompleted: number;
  avgStudyTime: number;
  changeFromPrevious: number; // 퍼센트포인트
}
