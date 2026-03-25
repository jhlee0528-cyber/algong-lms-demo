/**
 * 사용자 관련 타입 정의
 */

export type UserRole = 'teacher' | 'student';

export type StudentStatus = 'active' | 'inactive' | 'graduated';

export interface User {
  user_id: number;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Student extends User {
  student_id: number;
  teacher_id: number | null;
  grade: number | null;
  parent_name: string | null;
  parent_phone: string | null;
  status: StudentStatus;
  avatar_url?: string | null;
  gems?: number;
  coins?: number;
  arlex_level?: number | null; // ArLex 레벨 (1-36)
}

export interface Teacher extends User {
  teacher_id: number;
}
