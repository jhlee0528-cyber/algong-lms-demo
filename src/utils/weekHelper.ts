/**
 * 주간 학습 계획 관련 유틸리티 함수
 */

/**
 * 주어진 날짜의 해당 주 월요일 날짜 반환
 */
export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 월요일로 조정
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split('T')[0];
}

/**
 * 주어진 날짜의 해당 주 일요일 날짜 반환
 */
export function getWeekEnd(date: Date = new Date()): string {
  const weekStart = new Date(getWeekStart(date));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6); // 일요일
  weekEnd.setHours(23, 59, 59, 999);
  return weekEnd.toISOString().split('T')[0];
}

/**
 * 다음 주 월요일 날짜 반환
 */
export function getNextWeekStart(date: Date = new Date()): string {
  const currentWeekStart = new Date(getWeekStart(date));
  const nextWeekStart = new Date(currentWeekStart);
  nextWeekStart.setDate(nextWeekStart.getDate() + 7);
  return nextWeekStart.toISOString().split('T')[0];
}

/**
 * 지난 주 월요일 날짜 반환
 */
export function getLastWeekStart(date: Date = new Date()): string {
  const currentWeekStart = new Date(getWeekStart(date));
  const lastWeekStart = new Date(currentWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  return lastWeekStart.toISOString().split('T')[0];
}

/**
 * 주간 날짜 범위 포맷팅 (예: "2025-01-13 ~ 2025-01-19")
 */
export function formatWeekRange(weekStart: string): string {
  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  
  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return `${formatDate(start)} ~ ${formatDate(end)}`;
}

/**
 * 주간 레이블 반환 (예: "이번 주", "지난 주", "다음 주")
 */
export function getWeekLabel(weekStart: string, currentWeekStart: string): string {
  const week = new Date(weekStart);
  const current = new Date(currentWeekStart);
  
  const diffTime = week.getTime() - current.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return '이번 주';
  if (diffDays === -7) return '지난 주';
  if (diffDays === 7) return '다음 주';
  if (diffDays < 0) return `${Math.abs(diffDays / 7)}주 전`;
  return `${diffDays / 7}주 후`;
}

/**
 * 성과 상태에 따른 스타일 반환
 */
export function getPerformanceStatusStyle(status: 'excellent' | 'on_track' | 'warning' | 'critical'): {
  bg: string;
  text: string;
  label: string;
} {
  const config = {
    excellent: { bg: 'bg-green-100', text: 'text-green-700', label: '우수' },
    on_track: { bg: 'bg-blue-100', text: 'text-blue-700', label: '정상' },
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '주의' },
    critical: { bg: 'bg-red-100', text: 'text-red-700', label: '미흡' },
  };
  return config[status] || config.on_track;
}

/**
 * 달성률에 따른 성과 상태 판정
 */
export function getPerformanceStatus(completionRate: number): 'excellent' | 'on_track' | 'warning' | 'critical' {
  if (completionRate >= 100) return 'excellent';
  if (completionRate >= 70) return 'on_track';
  if (completionRate >= 50) return 'warning';
  return 'critical';
}

/**
 * 진행률에 따른 색상 반환
 */
export function getProgressColor(percentage: number): string {
  if (percentage >= 100) return 'bg-green-500';
  if (percentage >= 70) return 'bg-blue-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}
