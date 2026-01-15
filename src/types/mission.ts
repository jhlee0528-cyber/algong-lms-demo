/**
 * 과제 미션 관련 타입 정의
 */

export type MissionType = 'lecture' | 'activity' | 'ai_chat' | 'library' | 'mixed';

export type MissionStatus = 'draft' | 'active' | 'completed' | 'cancelled';

export type ActivityType = 'listening' | 'reading' | 'speaking' | 'writing';

export type LectureSession = 1 | 2 | 3 | 4 | 5 | 6;

export interface MissionAssignment {
  mission_id: number;
  mission_name: string; // 16자 이내
  unit_id: number;
  teacher_id: number;
  
  // 과제 유형 및 세부 설정 (Phase 1 확장)
  mission_type: MissionType;
  lecture_sessions: LectureSession[] | null;
  activity_types: ActivityType[] | null;
  ai_chat_enabled: boolean;
  library_book_ids: string[] | null;
  
  // 기존 필드
  target_students: number[];
  reward_stone: number;
  reward_gold: number;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  class_mode: boolean;
  
  // 메타 정보
  estimated_time: number | null;
  status: MissionStatus;
  created_at: string;
  updated_at: string;
}

export interface MissionListItem {
  mission_id: number;
  mission_name: string;
  unit_id: number;
  unit_title: string;
  mission_type: MissionType;
  start_date: string;
  end_date: string;
  status: MissionStatus;
  target_count: number; // 전송 대상 학생 수
}
