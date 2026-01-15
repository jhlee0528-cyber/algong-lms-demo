/**
 * 유효성 검증 유틸리티 함수
 */

/**
 * 이메일 유효성 검증
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 전화번호 유효성 검증 (한국 형식)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * 미션명 유효성 검증 (16자 이내)
 */
export function isValidMissionName(name: string): boolean {
  if (!name || name.trim().length === 0) {
    return false;
  }
  return name.length <= 16;
}

/**
 * 날짜 범위 유효성 검증
 */
export function isValidDateRange(startDate: string, endDate: string): boolean {
  if (!startDate || !endDate) {
    return false;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return false;
  }

  return start <= end;
}

/**
 * 숫자 범위 유효성 검증
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * 필수 필드 검증
 */
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}

/**
 * 미션 생성 폼 전체 유효성 검증
 */
export interface MissionFormValidation {
  isValid: boolean;
  errors: {
    mission_name?: string;
    unit_id?: string;
    tasks?: string;
    target_students?: string;
    period?: string;
  };
}

export function validateMissionForm(data: {
  mission_name?: string;
  unit_id?: number;
  tasks?: any[];
  target_students?: number[];
  period?: {
    start?: string;
    end?: string;
  };
}): MissionFormValidation {
  const errors: MissionFormValidation['errors'] = {};

  // 미션명 검증
  if (!isRequired(data.mission_name)) {
    errors.mission_name = '과제명을 입력해주세요.';
  } else if (!isValidMissionName(data.mission_name!)) {
    errors.mission_name = '과제명은 16자 이내로 입력해주세요.';
  }

  // 단원 선택 검증
  if (!isRequired(data.unit_id)) {
    errors.unit_id = '단원을 선택해주세요.';
  }

  // 과제 선택 검증
  if (!isRequired(data.tasks) || data.tasks!.length === 0) {
    errors.tasks = '최소 1개 이상의 과제를 선택해주세요.';
  }

  // 전송 대상 검증
  if (!isRequired(data.target_students) || data.target_students!.length === 0) {
    errors.target_students = '최소 1명 이상의 학생을 선택해주세요.';
  }

  // 기간 검증
  if (!data.period?.start || !data.period?.end) {
    errors.period = '시작일과 종료일을 모두 선택해주세요.';
  } else if (!isValidDateRange(data.period.start, data.period.end)) {
    errors.period = '종료일은 시작일 이후여야 합니다.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
