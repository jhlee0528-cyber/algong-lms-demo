/**
 * 학습 진행도 관련 타입 정의
 */

export type ProgressType = 'lecture' | 'activity' | 'ai_chat' | 'library';

export type ProgressStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export interface StudentProgress {
  progress_id: number;
  student_id: number;
  mission_id: number | null;
  unit_id: number;
  
  // 진행 유형 및 세부 정보
  progress_type: ProgressType;
  lecture_session: number | null; // 1~6
  activity_type: string | null; // 'listening' | 'reading' | 'speaking' | 'writing'
  book_id: string | null;
  reading_time: number | null; // 초 단위
  
  // 진행 상태
  completion_rate: number; // 0~100
  score: number | null;
  time_spent: number | null; // 초 단위
  completed_at: string | null;
  
  // 메타 정보
  created_at: string;
  updated_at: string;
}

export interface StudentMissionStatus {
  student_id: number;
  student_name: string;
  mission_id: number;
  mission_name: string;
  mission_type: string;
  start_date: string;
  end_date: string;
  progress_type: ProgressType | null;
  completion_rate: number;
  completed_at: string | null;
  status: ProgressStatus;
}

export interface ProgressByType {
  type: ProgressType;
  completed: number;
  assigned: number;
  completion_rate: number; // 완료율 (%)
  average_time?: number; // 평균 학습 시간 (분)
  details?: {
    [key: string]: number; // 세부 통계 (예: 영역별, 차시별)
  };
}

export interface StudentProgressSummary {
  student_id: number;
  student_name: string;
  progress_by_type: ProgressByType[];
  total_completed: number;
  total_assigned: number;
  overall_completion_rate: number;
}
