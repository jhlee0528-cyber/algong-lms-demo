/**
 * 단원 관련 React Query 훅
 */

import { useQuery } from '@tanstack/react-query';
import { getUnits, getUnit } from '../api/units';
import type { GetUnitRequest } from '../types';

/**
 * 단원 목록 조회 훅
 */
export function useUnits() {
  return useQuery({
    queryKey: ['units'],
    queryFn: getUnits,
    staleTime: 1000 * 60 * 60, // 1시간 (단원 목록은 자주 변경되지 않음)
  });
}

/**
 * 단원 상세 조회 훅
 */
export function useUnit(params: GetUnitRequest) {
  return useQuery({
    queryKey: ['units', params.unit_id],
    queryFn: () => getUnit(params),
    enabled: !!params.unit_id,
    staleTime: 1000 * 60 * 60, // 1시간
  });
}
