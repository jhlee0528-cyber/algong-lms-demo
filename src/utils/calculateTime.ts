/**
 * 시간 계산 유틸리티 함수
 */

/**
 * 초를 분으로 변환
 * @param seconds 초
 * @returns 분 (소수점 첫째 자리까지)
 */
export function secondsToMinutes(seconds: number): number {
  return Math.round((seconds / 60) * 10) / 10;
}

/**
 * 분을 시간:분 형식으로 변환
 * @param minutes 분
 * @returns "X시간 Y분" 형식의 문자열
 */
export function minutesToHoursMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}분`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}시간`;
  }

  return `${hours}시간 ${remainingMinutes}분`;
}

/**
 * 초를 시간:분:초 형식으로 변환
 * @param seconds 초
 * @returns "X시간 Y분 Z초" 형식의 문자열
 */
export function secondsToTimeString(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}초`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}시간`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}분`);
  }
  if (secs > 0 && hours === 0) {
    parts.push(`${secs}초`);
  }

  return parts.join(' ') || '0초';
}

/**
 * 여러 시간 값을 합산
 * @param times 시간 배열 (분 단위)
 * @returns 합산된 시간 (분)
 */
export function sumTimes(times: number[]): number {
  return times.reduce((sum, time) => sum + (time || 0), 0);
}

/**
 * 평균 시간 계산
 * @param times 시간 배열 (분 단위)
 * @returns 평균 시간 (분, 소수점 첫째 자리까지)
 */
export function averageTime(times: number[]): number {
  if (times.length === 0) return 0;
  const sum = sumTimes(times);
  return Math.round((sum / times.length) * 10) / 10;
}

/**
 * 예상 소요 시간 계산 (과제별)
 * @param lectureTime 강의듣기 시간 (분)
 * @param activityTime 액티비티 시간 (분)
 * @param aiChatTime AI 대화 시간 (분)
 * @param libraryTime 영어도서관 시간 (분)
 * @returns 총 예상 시간 (분)
 */
export function calculateEstimatedTime(
  lectureTime: number = 0,
  activityTime: number = 0,
  aiChatTime: number = 0,
  libraryTime: number = 0
): number {
  return lectureTime + activityTime + aiChatTime + libraryTime;
}
