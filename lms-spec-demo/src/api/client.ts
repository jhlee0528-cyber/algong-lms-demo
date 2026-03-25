/**
 * API 클라이언트 설정 (Vue 3)
 */

import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import type { ApiResponse } from '../types'

// API 기본 URL 설정 (환경 변수 또는 기본값)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 (인증 토큰 추가 등)
apiClient.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    // 에러 처리 로직
    if (error.response) {
      // 서버 응답이 있는 경우
      const { status } = error.response

      switch (status) {
        case 401:
          // 인증 오류 - 로그인 페이지로 리다이렉트
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
          break
        case 403:
          console.error('권한이 없습니다.')
          break
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.')
          break
        case 500:
          console.error('서버 오류가 발생했습니다.')
          break
        default:
          console.error('알 수 없는 오류가 발생했습니다.')
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      console.error('서버에 연결할 수 없습니다.')
    } else {
      // 요청 설정 중 오류가 발생한 경우
      console.error('요청 설정 오류:', error.message)
    }

    return Promise.reject(error)
  }
)

/**
 * API 응답을 ApiResponse 타입으로 변환
 */
export function handleApiResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
  if (response.data.success) {
    return response.data.data
  } else {
    throw new Error(response.data.error?.message || 'API 요청 실패')
  }
}

export default apiClient
