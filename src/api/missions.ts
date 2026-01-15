/**
 * 미션 관련 API 엔드포인트
 */

import apiClient from './client';
import type {
  CreateMissionRequest,
  CreateMissionResponse,
  GetMissionsRequest,
  GetMissionsResponse,
  UpdateMissionRequest,
  UpdateMissionResponse,
  DeleteMissionRequest,
  DeleteMissionResponse,
  MissionAssignment,
} from '../types';

/**
 * 신규 미션 생성
 */
export async function createMission(
  data: CreateMissionRequest
): Promise<CreateMissionResponse> {
  const response = await apiClient.post<CreateMissionResponse>(
    '/missions/create',
    data
  );
  return response.data;
}

/**
 * 미션 목록 조회
 */
export async function getMissions(
  params?: GetMissionsRequest
): Promise<GetMissionsResponse> {
  const response = await apiClient.get<GetMissionsResponse>('/missions', {
    params,
  });
  return response.data;
}

/**
 * 미션 상세 조회
 */
export async function getMission(missionId: number): Promise<MissionAssignment> {
  const response = await apiClient.get<MissionAssignment>(
    `/missions/${missionId}`
  );
  return response.data;
}

/**
 * 미션 수정
 */
export async function updateMission(
  data: UpdateMissionRequest
): Promise<UpdateMissionResponse> {
  const { mission_id, ...updateData } = data;
  const response = await apiClient.put<UpdateMissionResponse>(
    `/missions/${mission_id}`,
    updateData
  );
  return response.data;
}

/**
 * 미션 삭제
 */
export async function deleteMission(
  data: DeleteMissionRequest
): Promise<DeleteMissionResponse> {
  const response = await apiClient.delete<DeleteMissionResponse>(
    `/missions/${data.mission_id}`
  );
  return response.data;
}

/**
 * 미션 상태 변경
 */
export async function updateMissionStatus(
  missionId: number,
  status: 'draft' | 'active' | 'completed' | 'cancelled'
): Promise<UpdateMissionResponse> {
  const response = await apiClient.patch<UpdateMissionResponse>(
    `/missions/${missionId}/status`,
    { status }
  );
  return response.data;
}
