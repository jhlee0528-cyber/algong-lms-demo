/**
 * 날짜 포맷팅 유틸리티 함수
 */

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param date 날짜 문자열 또는 Date 객체
 * @param format 포맷 형식 ('YYYY-MM-DD', 'MM/DD', 'YYYY년 MM월 DD일' 등)
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(
  date: string | Date | null | undefined,
  format: 'YYYY-MM-DD' | 'MM/DD' | 'YYYY년 MM월 DD일' | 'MM월 DD일' | 'YYYY년 MM월 DD일 HH:mm' = 'YYYY-MM-DD'
): string {
  if (!date) return '-';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '-';
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM/DD':
      return `${month}/${day}`;
    case 'YYYY년 MM월 DD일':
      return `${year}년 ${month}월 ${day}일`;
    case 'MM월 DD일':
      return `${month}월 ${day}일`;
    case 'YYYY년 MM월 DD일 HH:mm':
      return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    default:
      return `${year}-${month}-${day}`;
  }
}

/**
 * 날짜 범위를 포맷팅
 * @param startDate 시작일
 * @param endDate 종료일
 * @returns 포맷된 날짜 범위 문자열 (예: "12/19~12/19")
 */
export function formatDateRange(
  startDate: string | Date | null | undefined,
  endDate: string | Date | null | undefined
): string {
  if (!startDate || !endDate) return '-';

  const start = formatDate(startDate, 'MM/DD');
  const end = formatDate(endDate, 'MM/DD');

  if (start === '-' || end === '-') return '-';

  return `${start}~${end}`;
}

/**
 * 상대 시간 포맷팅 (예: "3일 전", "2시간 전")
 * @param date 날짜
 * @returns 상대 시간 문자열
 */
export function formatRelativeTime(date: string | Date | null | undefined): string {
  if (!date) return '-';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) {
    return `${diffDay}일 전`;
  } else if (diffHour > 0) {
    return `${diffHour}시간 전`;
  } else if (diffMin > 0) {
    return `${diffMin}분 전`;
  } else {
    return '방금 전';
  }
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export function getToday(): string {
  return formatDate(new Date(), 'YYYY-MM-DD');
}

/**
 * 날짜에 일수를 더하거나 빼기
 * @param date 기준 날짜
 * @param days 더하거나 빼고 싶은 일수 (음수면 빼기)
 * @returns 새로운 날짜 문자열 (YYYY-MM-DD)
 */
export function addDays(date: string | Date, days: number): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  dateObj.setDate(dateObj.getDate() + days);
  return formatDate(dateObj, 'YYYY-MM-DD');
}
