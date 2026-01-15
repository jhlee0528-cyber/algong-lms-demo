/**
 * 미션 관련 React Query 훅
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createMission,
  getMissions,
  getMission,
  updateMission,
  deleteMission,
  updateMissionStatus,
} from '../api/missions';
import type {
  CreateMissionRequest,
  GetMissionsRequest,
  UpdateMissionRequest,
  DeleteMissionRequest,
} from '../types';

/**
 * 미션 목록 조회 훅
 */
export function useMissions(params?: GetMissionsRequest) {
  return useQuery({
    queryKey: ['missions', params],
    queryFn: () => getMissions(params),
  });
}

/**
 * 미션 상세 조회 훅
 */
export function useMission(missionId: number) {
  return useQuery({
    queryKey: ['missions', missionId],
    queryFn: () => getMission(missionId),
    enabled: !!missionId,
  });
}

/**
 * 미션 생성 훅
 */
export function useCreateMission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMissionRequest) => createMission(data),
    onSuccess: () => {
      // 미션 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['missions'] });
    },
  });
}

/**
 * 미션 수정 훅
 */
export function useUpdateMission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMissionRequest) => updateMission(data),
    onSuccess: (_, variables) => {
      // 해당 미션 및 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['missions'] });
      queryClient.invalidateQueries({ queryKey: ['missions', variables.mission_id] });
    },
  });
}

/**
 * 미션 삭제 훅
 */
export function useDeleteMission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteMissionRequest) => deleteMission(data),
    onSuccess: () => {
      // 미션 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['missions'] });
    },
  });
}

/**
 * 미션 상태 변경 훅
 */
export function useUpdateMissionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      missionId,
      status,
    }: {
      missionId: number;
      status: 'draft' | 'active' | 'completed' | 'cancelled';
    }) => updateMissionStatus(missionId, status),
    onSuccess: (_, variables) => {
      // 해당 미션 및 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['missions'] });
      queryClient.invalidateQueries({ queryKey: ['missions', variables.missionId] });
    },
  });
}
