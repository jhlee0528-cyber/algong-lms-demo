/**
 * 학습 진행도 관련 API 엔드포인트
 */

import apiClient from './client';
import type {
  GetStudentProgressRequest,
  GetStudentProgressResponse,
  GetProgressByTypeRequest,
  GetProgressByTypeResponse,
  UpdateProgressRequest,
  UpdateProgressResponse,
  StudentProgress,
  StudentProgressSummary,
} from '../types';

/**
 * 학생 학습 진행도 조회
 */
export async function getStudentProgress(
  params: GetStudentProgressRequest
): Promise<GetStudentProgressResponse> {
  const response = await apiClient.get<GetStudentProgressResponse>(
    `/progress/students/${params.student_id}`,
    { params }
  );
  return response.data;
}

/**
 * 과제 유형별 진행도 조회
 */
export async function getProgressByType(
  params: GetProgressByTypeRequest
): Promise<GetProgressByTypeResponse> {
  const response = await apiClient.get<GetProgressByTypeResponse>(
    `/progress/students/${params.student_id}/by-type`,
    { params }
  );
  return response.data;
}

/**
 * 학습 진행도 업데이트
 */
export async function updateProgress(
  data: UpdateProgressRequest
): Promise<UpdateProgressResponse> {
  const { progress_id, ...updateData } = data;
  const response = await apiClient.patch<UpdateProgressResponse>(
    `/progress/${progress_id}`,
    updateData
  );
  return response.data;
}

/**
 * 학생의 미션별 진행도 조회
 */
export async function getStudentMissionProgress(
  studentId: number,
  missionId: number
): Promise<StudentProgress[]> {
  const response = await apiClient.get<StudentProgress[]>(
    `/progress/students/${studentId}/missions/${missionId}`
  );
  return response.data;
}

/**
 * 학생의 학습 현황 요약 조회
 */
export async function getStudentProgressSummary(
  studentId: number,
  params?: {
    start_date?: string;
    end_date?: string;
  }
): Promise<StudentProgressSummary> {
  const response = await apiClient.get<StudentProgressSummary>(
    `/progress/students/${studentId}/summary`,
    { params }
  );
  return response.data;
}
