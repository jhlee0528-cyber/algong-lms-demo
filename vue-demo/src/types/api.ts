/**
 * API Request/Response 타입 정의
 */

import type { MissionAssignment } from './mission';
import type { LibraryBook, LibraryBookFilter, LibraryBookListResponse } from './library';
import type { StudentProgress, StudentProgressSummary, ProgressByType } from './progress';
import type { Task } from './task';
import type { Unit } from './unit';
import type { Student } from './user';

// ============================================
// 미션 관련 API
// ============================================

export interface CreateMissionRequest {
  mission_name: string; // 16자 이내
  unit_id: number;
  tasks: Task[];
  target_students: number[];
  reward: {
    stone: number;
    gold: number;
  };
  period: {
    start: string; // YYYY-MM-DD
    end: string; // YYYY-MM-DD
  };
  class_mode: boolean;
}

export interface CreateMissionResponse {
  success: boolean;
  mission_id: number;
  message?: string;
}

export interface GetMissionsRequest {
  teacher_id?: number;
  unit_id?: number;
  status?: string;
  page?: number;
  limit?: number;
}

export interface GetMissionsResponse {
  missions: MissionAssignment[];
  total: number;
  page: number;
  limit: number;
}

export interface UpdateMissionRequest extends Partial<CreateMissionRequest> {
  mission_id: number;
}

export interface UpdateMissionResponse {
  success: boolean;
  message?: string;
}

export interface DeleteMissionRequest {
  mission_id: number;
}

export interface DeleteMissionResponse {
  success: boolean;
  message?: string;
}

// ============================================
// 영어도서관 관련 API
// ============================================

export interface GetLibraryBooksRequest extends LibraryBookFilter {}

export interface GetLibraryBooksResponse extends LibraryBookListResponse {}

export interface GetLibraryBookRequest {
  book_id: string;
}

export interface GetLibraryBookResponse {
  book: LibraryBook;
}

export interface CreateLibraryProgressRequest {
  student_id: number;
  book_id: string;
  reading_time: number; // 초
  completed: boolean;
  quiz_score?: number;
}

export interface CreateLibraryProgressResponse {
  success: boolean;
  progress_id: number;
  message?: string;
}

// ============================================
// 학습 진행도 관련 API
// ============================================

export interface GetStudentProgressRequest {
  student_id: number;
  mission_id?: number;
  unit_id?: number;
  progress_type?: string;
  start_date?: string;
  end_date?: string;
}

export interface GetStudentProgressResponse {
  progress: StudentProgress[];
  summary?: StudentProgressSummary;
}

export interface GetProgressByTypeRequest {
  student_id: number;
  start_date?: string;
  end_date?: string;
}

export interface GetProgressByTypeResponse {
  progress_by_type: ProgressByType[];
}

export interface UpdateProgressRequest {
  progress_id: number;
  completion_rate?: number;
  score?: number;
  time_spent?: number;
  completed?: boolean;
}

export interface UpdateProgressResponse {
  success: boolean;
  message?: string;
}

// ============================================
// 단원 관련 API
// ============================================

export interface GetUnitsResponse {
  units: Unit[];
}

export interface GetUnitRequest {
  unit_id: number;
}

export interface GetUnitResponse {
  unit: Unit;
}

// ============================================
// 학생 관련 API
// ============================================

export interface GetStudentsRequest {
  teacher_id: number;
  status?: string;
}

export interface GetStudentsResponse {
  students: Student[];
}

// ============================================
// 공통 API 응답
// ============================================

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;
