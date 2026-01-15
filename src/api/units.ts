/**
 * 단원 관련 API 엔드포인트
 */

import apiClient from './client';
import type {
  GetUnitsResponse,
  GetUnitRequest,
  GetUnitResponse,
  Unit,
} from '../types';

/**
 * 단원 목록 조회
 */
export async function getUnits(): Promise<Unit[]> {
  try {
    const response = await apiClient.get<GetUnitsResponse>('/units');
    return response.data?.units || getDefaultUnits();
  } catch (error) {
    console.warn('단원 목록 API 호출 실패, 기본 단원 목록 사용:', error);
    // API가 없을 경우 기본 단원 목록 반환 (40개 단원)
    return getDefaultUnits();
  }
}

/**
 * 기본 단원 목록 (40개)
 */
function getDefaultUnits(): Unit[] {
  const unitTitles = [
    'It Is an Apple', 'It Is a Dog', 'This Is a Hat', 'This Is a Jet', 'I See a Mouse',
    'I See a Panda', 'Look at the Sun', 'Look at the Watch', 'Where Is the Cap?', 'Where Is the Man?',
    'The Jet Is Here', 'I Have a Wig', 'I Can Hit the Bell', 'A Fox Is in the Box', 'There Is a Bug',
    'I Can Run Fast', 'I Like to Bake a Cake', 'What Is Your Name?', "Let's Hike", "Let's Fly a Kite",
    'Look at My Nose', 'Look at the Hole', 'Listen to the Tune', 'I Like June', 'What Color Is the Flag?',
    'I See a Crab', 'I Love My Glass', 'Where Is the Dress?', 'Can You Swim?', 'I Hear a Bang',
    'Look at the Ship', 'This Is My Thumb', 'I Like the Bee', "Let's Do It", 'It Rains Every Day',
    'I Feel Joy', 'I See a Cow', 'Look at the Girl', 'I Love My Car', 'Look at the Moon'
  ];

  return unitTitles.map((title, index) => ({
    unit_id: index + 1,
    unit_number: index + 1,
    unit_title: title,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));
}

/**
 * 단원 상세 조회
 */
export async function getUnit(params: GetUnitRequest): Promise<Unit> {
  const response = await apiClient.get<GetUnitResponse>(
    `/units/${params.unit_id}`
  );
  return response.data.unit;
}
