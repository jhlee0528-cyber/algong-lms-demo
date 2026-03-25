/**
 * 학생 관련 Vue Query Composable
 */

import { useQuery } from '@tanstack/vue-query'
import { getStudents, getStudent } from '../api/students'
import type { GetStudentsRequest } from '../types'
import type { MaybeRef } from 'vue'

/**
 * 학생 목록 조회 Composable
 */
export function useStudents(params: MaybeRef<GetStudentsRequest>) {
  return useQuery({
    queryKey: ['students', params],
    queryFn: () => {
      const unwrappedParams = typeof params === 'object' && 'value' in params
        ? params.value
        : params
      return getStudents(unwrappedParams)
    },
    enabled: () => {
      const unwrappedParams = typeof params === 'object' && 'value' in params
        ? params.value
        : params
      return !!unwrappedParams.teacher_id
    },
  })
}

/**
 * 학생 상세 조회 Composable
 */
export function useStudent(studentId: MaybeRef<number>) {
  return useQuery({
    queryKey: ['students', studentId],
    queryFn: () => {
      const unwrappedId = typeof studentId === 'object' && 'value' in studentId
        ? studentId.value
        : studentId
      return getStudent(unwrappedId)
    },
    enabled: () => {
      const unwrappedId = typeof studentId === 'object' && 'value' in studentId
        ? studentId.value
        : studentId
      return !!unwrappedId
    },
  })
}
