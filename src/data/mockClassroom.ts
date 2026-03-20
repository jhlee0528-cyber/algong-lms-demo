/**
 * 수업보기(Classroom) 실시간 상태 더미 데이터
 * 학생별 현재 학습 상태 및 오늘의 학습 이력
 */

export interface ClassroomStudent {
  id: string;
  name: string;
  grade: number; // 학년
  status: 'learning' | 'paused' | 'completed' | 'offline';
  currentSubject?: string; // '영어', '파닉스', '수학' 등
  currentActivity?: string; // 'Unit 3 - 듣기 세션'
  currentLevel?: string; // 'Lv.14'
  progressPercent?: number; // 0~100
  estimatedMinutesLeft?: number; // 예상 남은 시간(분)
  todayHistory?: Array<{
    time: string; // '14:00'
    activity: string; // '파닉스 Spark B3 완료'
    completed: boolean;
  }>;
}

// 15명 학생 실시간 상태 (mockStudents와 동일한 학생들)
export const mockClassroomStudents: ClassroomStudent[] = [
  // 학습 중 (10명)
  {
    id: '001',
    name: '김민지',
    grade: 5,
    status: 'learning',
    currentSubject: '영어',
    currentActivity: 'Unit 3 - 듣기 세션',
    currentLevel: 'Lv.14',
    progressPercent: 78,
    estimatedMinutesLeft: 12,
    todayHistory: [
      { time: '14:00', activity: '파닉스 Spark B3 완료', completed: true },
      { time: '14:25', activity: '영어 Lv.14 Unit 3 시작', completed: false },
    ],
  },
  {
    id: '002',
    name: '이서준',
    grade: 4,
    status: 'learning',
    currentSubject: '파닉스',
    currentActivity: 'Spark A5 - 단어 학습',
    currentLevel: 'A5',
    progressPercent: 45,
    estimatedMinutesLeft: 18,
    todayHistory: [
      { time: '13:30', activity: 'Spark A4 완료', completed: true },
      { time: '14:15', activity: 'Spark A5 시작', completed: false },
    ],
  },
  {
    id: '003',
    name: '박지우',
    grade: 3,
    status: 'learning',
    currentSubject: '수학',
    currentActivity: '3학년 1학기 - 곱셈',
    currentLevel: '3-1',
    progressPercent: 92,
    estimatedMinutesLeft: 5,
    todayHistory: [
      { time: '14:00', activity: '수학 연산 문제 풀이', completed: false },
    ],
  },
  {
    id: '004',
    name: '최서연',
    grade: 6,
    status: 'learning',
    currentSubject: '영어',
    currentActivity: 'Unit 5 - 읽기 연습',
    currentLevel: 'Lv.18',
    progressPercent: 65,
    estimatedMinutesLeft: 15,
    todayHistory: [
      { time: '13:45', activity: 'Unit 4 완료', completed: true },
      { time: '14:10', activity: 'Unit 5 시작', completed: false },
    ],
  },
  {
    id: '005',
    name: '정현우',
    grade: 5,
    status: 'learning',
    currentSubject: '영어',
    currentActivity: 'Unit 2 - 문법 학습',
    currentLevel: 'Lv.10',
    progressPercent: 33,
    estimatedMinutesLeft: 22,
    todayHistory: [
      { time: '14:20', activity: '영어 Lv.10 Unit 2 시작', completed: false },
    ],
  },
  {
    id: '006',
    name: '강소영',
    grade: 4,
    status: 'learning',
    currentSubject: '파닉스',
    currentActivity: 'Spark B2 - 발음 연습',
    currentLevel: 'B2',
    progressPercent: 58,
    estimatedMinutesLeft: 10,
    todayHistory: [
      { time: '13:50', activity: 'Spark B1 완료', completed: true },
      { time: '14:15', activity: 'Spark B2 시작', completed: false },
    ],
  },
  {
    id: '007',
    name: '윤도현',
    grade: 5,
    status: 'learning',
    currentSubject: '영어',
    currentActivity: 'Unit 6 - 어휘 학습',
    currentLevel: 'Lv.16',
    progressPercent: 82,
    estimatedMinutesLeft: 8,
    todayHistory: [
      { time: '13:40', activity: 'Unit 5 완료', completed: true },
      { time: '14:05', activity: 'Unit 6 시작', completed: false },
    ],
  },
  {
    id: '008',
    name: '임수진',
    grade: 4,
    status: 'learning',
    currentSubject: '영어',
    currentActivity: 'Unit 1 - 기초 학습',
    currentLevel: 'Lv.8',
    progressPercent: 25,
    estimatedMinutesLeft: 25,
    todayHistory: [
      { time: '14:25', activity: '영어 Lv.8 Unit 1 시작', completed: false },
    ],
  },
  {
    id: '009',
    name: '한지훈',
    grade: 6,
    status: 'learning',
    currentSubject: '영어',
    currentActivity: 'Unit 7 - 문장 쓰기',
    currentLevel: 'Lv.20',
    progressPercent: 70,
    estimatedMinutesLeft: 13,
    todayHistory: [
      { time: '14:00', activity: '영어 Lv.20 Unit 7 시작', completed: false },
    ],
  },
  {
    id: '010',
    name: '오나은',
    grade: 3,
    status: 'learning',
    currentSubject: '파닉스',
    currentActivity: 'Spark A3 - 단어 읽기',
    currentLevel: 'A3',
    progressPercent: 50,
    estimatedMinutesLeft: 15,
    todayHistory: [
      { time: '14:10', activity: 'Spark A3 시작', completed: false },
    ],
  },

  // 일시 정지 (2명)
  {
    id: '011',
    name: '신동욱',
    grade: 5,
    status: 'paused',
    currentSubject: '영어',
    currentActivity: 'Unit 4 - 듣기 세션',
    currentLevel: 'Lv.13',
    progressPercent: 88,
    estimatedMinutesLeft: 5,
    todayHistory: [
      { time: '13:50', activity: '영어 Lv.13 Unit 4 시작', completed: false },
    ],
  },
  {
    id: '012',
    name: '배미래',
    grade: 4,
    status: 'paused',
    currentSubject: '수학',
    currentActivity: '4학년 1학기 - 나눗셈',
    currentLevel: '4-1',
    progressPercent: 95,
    estimatedMinutesLeft: 2,
    todayHistory: [
      { time: '14:00', activity: '수학 문제 풀이', completed: false },
    ],
  },

  // 미접속 (3명)
  {
    id: '013',
    name: '조성민',
    grade: 6,
    status: 'offline',
    todayHistory: [],
  },
  {
    id: '014',
    name: '홍예린',
    grade: 3,
    status: 'offline',
    todayHistory: [],
  },
  {
    id: '015',
    name: '송태현',
    grade: 5,
    status: 'offline',
    todayHistory: [],
  },
];

// 상태별 카운트
export const getClassroomStats = () => {
  const learning = mockClassroomStudents.filter(s => s.status === 'learning').length;
  const paused = mockClassroomStudents.filter(s => s.status === 'paused').length;
  const completed = mockClassroomStudents.filter(s => s.status === 'completed').length;
  const offline = mockClassroomStudents.filter(s => s.status === 'offline').length;

  return {
    total: mockClassroomStudents.length,
    learning,
    paused,
    completed,
    offline,
    online: learning + paused + completed,
  };
};
