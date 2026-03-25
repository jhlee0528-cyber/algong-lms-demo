/**
 * 단원 관련 타입 정의
 */

export interface Unit {
  unit_id: number;
  unit_number: number; // 1~40
  unit_title: string;
  learning_goals?: string | null;
  target_words?: string[] | null;
  sentence_patterns?: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface UnitListItem {
  unit_id: number;
  unit_number: number;
  unit_title: string;
}
