// 영역 타입
export type Domain = 'Phonics' | 'Speaking' | 'Reading' | 'Grammar' | 'Writing';

// 레벨 시리즈
export type LevelSeries = 'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB';

// 레벨 단계 (1~6)
export type LevelStage = 1 | 2 | 3 | 4 | 5 | 6;

// 레벨 코드 (예: "SA1", "MB3")
export type LevelCode = `${LevelSeries}${LevelStage}`;

// 레벨 그룹
export type LevelGroup = 'Spark' | 'Motivate' | 'Activate';

// 레벨 정보
export interface LevelInfo {
  code: LevelCode;
  series: LevelSeries;
  stage: LevelStage;
  group: LevelGroup;
  name: string;           // "Starter A - Level 1"
  order: number;          // 0~35 (전체 순서)
}

// 학생별 레벨 진도
export interface StudentLevelProgress {
  studentId: string;
  levelCode: LevelCode;
  domainProgress: Record<Domain, number>;  // 영역별 진행률 (0~100)
  overallProgress: number;                  // 전체 진행률
  isCurrentLevel: boolean;                  // 현재 학습 중인 레벨
}

// 학생 스마트리 현황
export interface StudentSmartreeStatus {
  studentId: string;
  studentName: string;
  currentLevel: LevelCode;
  currentDomain: Domain;
  currentUnit: number;
  levelProgress: StudentLevelProgress[];
}
