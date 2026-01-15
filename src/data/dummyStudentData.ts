import { Domain, LevelCode } from '../types/smartree';
import { ALL_LEVELS } from './curriculumLevels';
import { ClassroomStudent, LevelStudentGroup, StudentStatus } from '../types/classroom';

// 학습 이력 타입
export interface LearningHistory {
  date: string;          // YYYY-MM-DD
  levelCode: LevelCode;
  domain: Domain;
  unitNumber: number;
  duration: number;      // 분
  accuracy: number;      // 0~100%
}

// 영역별 진행률 타입
export interface DomainProgress {
  domain: Domain;
  completedUnits: number;
  totalUnits: number;
  averageAccuracy: number;
}

// 학생 상세 정보 타입
export interface StudentDetail {
  id: string;
  name: string;
  currentLevel: LevelCode;
  currentDomain: Domain;
  currentUnit: number;
  
  // 레벨별 진도율
  levelProgress: Record<LevelCode, number>;
  
  // 영역별 완료 현황
  domainProgress: DomainProgress[];
  
  // 최근 학습 이력 (최근 10건)
  recentHistory: LearningHistory[];
  
  // 약점 영역
  weakDomains: Domain[];
  
  // 추천 다음 학습
  recommendedNext: {
    levelCode: LevelCode;
    domain: Domain;
    unitNumber: number;
    reason: string;
  };
  
  // 통계
  stats: {
    totalLearningTime: number;    // 총 학습 시간 (분)
    averageAccuracy: number;      // 평균 정답률
    completedLevels: number;      // 완료한 레벨 수
    streakDays: number;           // 연속 학습일
  };
}

// 각 학생의 상세 데이터를 자동 생성하는 함수
export const generateStudentDetail = (basicInfo: {
  id: string;
  name: string;
  currentLevel: LevelCode;
  currentDomain: Domain;
  currentUnit: number;
}): StudentDetail => {
  // 기본 학생 정보로부터 나머지 데이터 생성
  const levelIndex = ALL_LEVELS.findIndex(l => l.code === basicInfo.currentLevel);
  
  // levelProgress 생성
  const levelProgress: Record<string, number> = {};
  ALL_LEVELS.forEach((level, idx) => {
    if (idx < levelIndex) {
      levelProgress[level.code] = 100;
    } else if (idx === levelIndex) {
      levelProgress[level.code] = Math.floor(Math.random() * 60) + 20; // 20~80%
    } else {
      levelProgress[level.code] = 0;
    }
  });
  
  // domainProgress 생성
  const domains: Domain[] = ['Phonics', 'Speaking', 'Reading', 'Grammar', 'Writing'];
  const domainProgress = domains.map((domain, idx) => ({
    domain,
    completedUnits: Math.max(0, levelIndex - idx * 2),
    totalUnits: Math.max(levelIndex + 6, 6),
    averageAccuracy: 90 - idx * 5 + Math.floor(Math.random() * 10),
  }));
  
  // recentHistory 생성 (최근 5일)
  const recentHistory: LearningHistory[] = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    recentHistory.push({
      date: date.toISOString().split('T')[0],
      levelCode: basicInfo.currentLevel,
      domain: domains[i % domains.length],
      unitNumber: Math.floor(Math.random() * 6) + 1,
      duration: Math.floor(Math.random() * 20) + 15,
      accuracy: Math.floor(Math.random() * 30) + 65,
    });
  }
  
  // 약점 영역 (accuracy 낮은 순 2개)
  const sortedDomains = [...domainProgress].sort((a, b) => a.averageAccuracy - b.averageAccuracy);
  const weakDomains = sortedDomains.slice(0, 2).map(d => d.domain);
  
  return {
    id: basicInfo.id,
    name: basicInfo.name,
    currentLevel: basicInfo.currentLevel,
    currentDomain: basicInfo.currentDomain,
    currentUnit: basicInfo.currentUnit,
    levelProgress,
    domainProgress,
    recentHistory,
    weakDomains,
    recommendedNext: {
      levelCode: basicInfo.currentLevel,
      domain: basicInfo.currentDomain,
      unitNumber: (basicInfo.currentUnit % 6) + 1,
      reason: `${basicInfo.currentDomain} 영역 계속 학습 권장`,
    },
    stats: {
      totalLearningTime: levelIndex * 100 + Math.floor(Math.random() * 500),
      averageAccuracy: 75 + Math.floor(Math.random() * 15),
      completedLevels: levelIndex,
      streakDays: Math.floor(Math.random() * 14) + 1,
    },
  };
};

// 20명 학생 상세 데이터 생성
export const DUMMY_STUDENT_DETAILS: StudentDetail[] = [
  generateStudentDetail({
    id: '1',
    name: '김민준',
    currentLevel: 'MA3',
    currentDomain: 'Reading',
    currentUnit: 4,
  }),
  generateStudentDetail({
    id: '2',
    name: '이서연',
    currentLevel: 'SA5',
    currentDomain: 'Phonics',
    currentUnit: 2,
  }),
  generateStudentDetail({
    id: '3',
    name: '박지훈',
    currentLevel: 'SB2',
    currentDomain: 'Speaking',
    currentUnit: 1,
  }),
  generateStudentDetail({
    id: '4',
    name: '최지우',
    currentLevel: 'MA1',
    currentDomain: 'Grammar',
    currentUnit: 3,
  }),
  generateStudentDetail({
    id: '5',
    name: '강민수',
    currentLevel: 'SB4',
    currentDomain: 'Reading',
    currentUnit: 2,
  }),
  generateStudentDetail({
    id: '6',
    name: '정하은',
    currentLevel: 'SA3',
    currentDomain: 'Phonics',
    currentUnit: 4,
  }),
  generateStudentDetail({
    id: '7',
    name: '윤서진',
    currentLevel: 'MB2',
    currentDomain: 'Writing',
    currentUnit: 1,
  }),
  generateStudentDetail({
    id: '8',
    name: '장현우',
    currentLevel: 'AA1',
    currentDomain: 'Grammar',
    currentUnit: 2,
  }),
  generateStudentDetail({
    id: '9',
    name: '임수아',
    currentLevel: 'SA6',
    currentDomain: 'Speaking',
    currentUnit: 5,
  }),
  generateStudentDetail({
    id: '10',
    name: '한도윤',
    currentLevel: 'MA4',
    currentDomain: 'Reading',
    currentUnit: 3,
  }),
  generateStudentDetail({
    id: '11',
    name: '송예린',
    currentLevel: 'SB5',
    currentDomain: 'Phonics',
    currentUnit: 6,
  }),
  generateStudentDetail({
    id: '12',
    name: '오준호',
    currentLevel: 'MA2',
    currentDomain: 'Grammar',
    currentUnit: 4,
  }),
  generateStudentDetail({
    id: '13',
    name: '배서현',
    currentLevel: 'SA2',
    currentDomain: 'Speaking',
    currentUnit: 1,
  }),
  generateStudentDetail({
    id: '14',
    name: '황민재',
    currentLevel: 'MB4',
    currentDomain: 'Reading',
    currentUnit: 5,
  }),
  generateStudentDetail({
    id: '15',
    name: '조아영',
    currentLevel: 'SB1',
    currentDomain: 'Phonics',
    currentUnit: 2,
  }),
  generateStudentDetail({
    id: '16',
    name: '신지현',
    currentLevel: 'MA5',
    currentDomain: 'Writing',
    currentUnit: 3,
  }),
  generateStudentDetail({
    id: '17',
    name: '권태민',
    currentLevel: 'AA3',
    currentDomain: 'Grammar',
    currentUnit: 1,
  }),
  generateStudentDetail({
    id: '18',
    name: '문하늘',
    currentLevel: 'SB6',
    currentDomain: 'Speaking',
    currentUnit: 4,
  }),
  generateStudentDetail({
    id: '19',
    name: '백소율',
    currentLevel: 'MA6',
    currentDomain: 'Reading',
    currentUnit: 6,
  }),
  generateStudentDetail({
    id: '20',
    name: '류지안',
    currentLevel: 'MB1',
    currentDomain: 'Phonics',
    currentUnit: 1,
  }),
];

// 20명 학생 수업보기용 더미 데이터 (상태 포함)
export const CLASSROOM_STUDENTS: ClassroomStudent[] = [
  {
    id: '1',
    name: '김민준',
    currentLevel: 'MA3',
    currentDomain: 'Reading',
    currentUnit: 4,
    status: 'learning',
    lastActivity: new Date(),
    todayLearningTime: 45,
  },
  {
    id: '2',
    name: '이서연',
    currentLevel: 'SA5',
    currentDomain: 'Phonics',
    currentUnit: 2,
    status: 'online',
    lastActivity: new Date(Date.now() - 10 * 60 * 1000), // 10분 전
    todayLearningTime: 20,
  },
  {
    id: '3',
    name: '박지훈',
    currentLevel: 'SB2',
    currentDomain: 'Speaking',
    currentUnit: 1,
    status: 'learning',
    lastActivity: new Date(),
    todayLearningTime: 30,
  },
  {
    id: '4',
    name: '최지우',
    currentLevel: 'MA1',
    currentDomain: 'Grammar',
    currentUnit: 3,
    status: 'offline',
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
    todayLearningTime: 0,
  },
  {
    id: '5',
    name: '강민수',
    currentLevel: 'SB4',
    currentDomain: 'Reading',
    currentUnit: 2,
    status: 'learning',
    lastActivity: new Date(),
    todayLearningTime: 55,
  },
  {
    id: '6',
    name: '정하은',
    currentLevel: 'SA3',
    currentDomain: 'Phonics',
    currentUnit: 4,
    status: 'online',
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    todayLearningTime: 15,
  },
  {
    id: '7',
    name: '윤서진',
    currentLevel: 'MB2',
    currentDomain: 'Writing',
    currentUnit: 1,
    status: 'offline',
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000), // 어제
    todayLearningTime: 0,
  },
  {
    id: '8',
    name: '장현우',
    currentLevel: 'AA1',
    currentDomain: 'Grammar',
    currentUnit: 2,
    status: 'learning',
    lastActivity: new Date(),
    todayLearningTime: 40,
  },
  {
    id: '9',
    name: '임수아',
    currentLevel: 'SA6',
    currentDomain: 'Speaking',
    currentUnit: 5,
    status: 'offline',
    lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000),
    todayLearningTime: 10,
  },
  {
    id: '10',
    name: '한도윤',
    currentLevel: 'MA4',
    currentDomain: 'Reading',
    currentUnit: 3,
    status: 'learning',
    lastActivity: new Date(),
    todayLearningTime: 35,
  },
  {
    id: '11',
    name: '송예린',
    currentLevel: 'SB5',
    currentDomain: 'Phonics',
    currentUnit: 6,
    status: 'online',
    lastActivity: new Date(Date.now() - 8 * 60 * 1000),
    todayLearningTime: 25,
  },
  {
    id: '12',
    name: '오준호',
    currentLevel: 'MA2',
    currentDomain: 'Grammar',
    currentUnit: 4,
    status: 'offline',
    lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000),
    todayLearningTime: 0,
  },
  {
    id: '13',
    name: '배서현',
    currentLevel: 'SA2',
    currentDomain: 'Speaking',
    currentUnit: 1,
    status: 'learning',
    lastActivity: new Date(),
    todayLearningTime: 50,
  },
  {
    id: '14',
    name: '황민재',
    currentLevel: 'MB4',
    currentDomain: 'Reading',
    currentUnit: 5,
    status: 'online',
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    todayLearningTime: 20,
  },
  {
    id: '15',
    name: '조아영',
    currentLevel: 'SB1',
    currentDomain: 'Phonics',
    currentUnit: 2,
    status: 'offline',
    lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
    todayLearningTime: 5,
  },
  {
    id: '16',
    name: '신지현',
    currentLevel: 'MA5',
    currentDomain: 'Writing',
    currentUnit: 3,
    status: 'learning',
    lastActivity: new Date(),
    todayLearningTime: 60,
  },
  {
    id: '17',
    name: '권태민',
    currentLevel: 'AA3',
    currentDomain: 'Grammar',
    currentUnit: 1,
    status: 'offline',
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000),
    todayLearningTime: 0,
  },
  {
    id: '18',
    name: '문하늘',
    currentLevel: 'SB6',
    currentDomain: 'Speaking',
    currentUnit: 4,
    status: 'online',
    lastActivity: new Date(Date.now() - 3 * 60 * 1000),
    todayLearningTime: 30,
  },
  {
    id: '19',
    name: '백소율',
    currentLevel: 'MA6',
    currentDomain: 'Reading',
    currentUnit: 6,
    status: 'learning',
    lastActivity: new Date(),
    todayLearningTime: 45,
  },
  {
    id: '20',
    name: '류지안',
    currentLevel: 'MB1',
    currentDomain: 'Phonics',
    currentUnit: 1,
    status: 'offline',
    lastActivity: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2일 전
    todayLearningTime: 0,
  },
];

// 레벨별 학생 그룹화 함수
export const getStudentsByLevel = (
  students: ClassroomStudent[],
  levelCode: LevelCode
): ClassroomStudent[] => {
  return students.filter((s) => s.currentLevel === levelCode);
};

// 레벨별 학생 그룹 정보 계산
export const getLevelStudentGroup = (
  students: ClassroomStudent[],
  levelCode: LevelCode
): LevelStudentGroup => {
  const levelStudents = getStudentsByLevel(students, levelCode);
  const learningCount = levelStudents.filter((s) => s.status === 'learning').length;
  const onlineCount = levelStudents.filter((s) => s.status === 'online').length;
  const offlineCount = levelStudents.filter((s) => s.status === 'offline').length;

  // 가장 많은 상태 결정 (색상용)
  let dominantStatus: StudentStatus = 'offline';
  if (learningCount > 0) {
    dominantStatus = 'learning';
  } else if (onlineCount > 0) {
    dominantStatus = 'online';
  }

  return {
    levelCode,
    students: levelStudents,
    learningCount,
    onlineCount,
    offlineCount,
    totalCount: levelStudents.length,
    dominantStatus,
  };
};

// 전체 레벨별 그룹 맵 생성
export const getAllLevelGroups = (
  students: ClassroomStudent[]
): Map<LevelCode, LevelStudentGroup> => {
  const groups = new Map<LevelCode, LevelStudentGroup>();
  const allLevels: LevelCode[] = [
    'SA1', 'SA2', 'SA3', 'SA4', 'SA5', 'SA6',
    'SB1', 'SB2', 'SB3', 'SB4', 'SB5', 'SB6',
    'MA1', 'MA2', 'MA3', 'MA4', 'MA5', 'MA6',
    'MB1', 'MB2', 'MB3', 'MB4', 'MB5', 'MB6',
    'AA1', 'AA2', 'AA3', 'AA4', 'AA5', 'AA6',
    'AB1', 'AB2', 'AB3', 'AB4', 'AB5', 'AB6',
  ];

  allLevels.forEach((level) => {
    groups.set(level, getLevelStudentGroup(students, level));
  });

  return groups;
};
