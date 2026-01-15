/**
 * 학생 관련 API 엔드포인트
 */

import apiClient from './client';
import type {
  GetStudentsRequest,
  GetStudentsResponse,
  Student,
} from '../types';

/**
 * 학생 목록 조회
 */
export async function getStudents(
  params: GetStudentsRequest
): Promise<Student[]> {
  try {
    const response = await apiClient.get<GetStudentsResponse>('/students', {
      params,
    });
    return response.data?.students || [];
  } catch (error) {
    console.error('학생 목록 조회 실패:', error);
    // API가 없을 경우 빈 배열 반환
    return [];
  }
}

/**
 * 학생 상세 조회
 */
export async function getStudent(studentId: number): Promise<Student> {
  const response = await apiClient.get<Student>(`/students/${studentId}`);
  return response.data;
}
