import type { LevelCode, Domain } from './smartree';

// 학생 접속 상태
export type StudentStatus = 'learning' | 'online' | 'offline';

// 학생 상태 설정
export const STUDENT_STATUS_CONFIG: Record<StudentStatus, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  dotColor: string;
}> = {
  learning: {
    label: '학습중',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-400',
    dotColor: 'bg-green-500',
  },
  online: {
    label: '접속중',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-400',
    dotColor: 'bg-blue-500',
  },
  offline: {
    label: '오프라인',
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    dotColor: 'bg-gray-400',
  },
};

// 수업보기용 학생 정보
export interface ClassroomStudent {
  id: string;
  name: string;
  currentLevel: LevelCode;
  currentDomain: Domain;
  currentUnit: number;
  status: StudentStatus;           // 접속 상태
  lastActivity?: Date;             // 마지막 활동 시간
  todayLearningTime?: number;      // 오늘 학습 시간 (분)
}

// 레벨별 학생 그룹
export interface LevelStudentGroup {
  levelCode: LevelCode;
  students: ClassroomStudent[];
  learningCount: number;           // 학습중 인원
  onlineCount: number;             // 접속중 인원
  offlineCount: number;           // 오프라인 인원
  totalCount: number;              // 전체 인원
  dominantStatus: StudentStatus;   // 가장 많은 상태 (색상 결정용)
}

// 레벨 카드 표시 모드
export type LevelDisplayMode = 'studentCount' | 'progress';
