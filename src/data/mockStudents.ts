// 알공공부방 데모용 더미 데이터
// 정혜진A 페르소나 기반 (셀레나 잠실 교습소, 학생 15명)

export interface NotificationSettings {
  attendance: boolean;      // 출결 자동 알림
  progress: boolean;         // 진도 알림
  weeklyReport: boolean;     // 주간 리포트
}

export interface DiagnosticResult {
  level: string;             // 현재 레벨 (예: "Lv.15")
  previousLevel: string;     // 이전 레벨
  testDate: string;          // 진단일 (YYYY-MM-DD)
  nationalRank: number;      // 전국 상위 % (예: 20)
  vocabulary: number;        // 어휘력 (0-100)
  reading: number;           // 독해력 (0-100)
  reasoning: number;         // 추론력 (0-100)
  speed: number;             // 속도 (0-100)
}

export interface AttendanceRecord {
  date: string;              // YYYY-MM-DD
  attended: boolean;
}

export interface StudentSubject {
  subjectId: string;         // 'arlex', 'math', 'phonics'
  subjectName: string;       // '알공 영어', '수학', 'SMARTree 파닉스'
  currentLevel: string;      // 'Lv.14', '3-1 개념편'
  startDate: string;         // YYYY-MM-DD
  progress: number;          // 0-100
  recentScore?: number;      // 최근 점수 (0-100)
  weakPoints?: string[];     // 약점 (예: ['분수 나눗셈'])
}

export interface RecentActivity {
  date: string;              // YYYY-MM-DD
  type: 'grading' | 'progress' | 'communication' | 'attendance';
  description: string;       // '수학 워크시트 채점', '영어 Lv.14-3 완료'
  icon: string;              // '✅', '💬', '📚'
}

export interface LibraryProgress {
  readingLevel: number;      // 독서 레벨 (1-10)
  totalBooksRead: number;    // 총 읽은 책 수
  thisMonthBooks: number;    // 이번 달 읽은 책 수
}

export interface Student {
  id: string;
  name: string;
  grade: number;             // 1-6
  parentName?: string;
  parentPhone: string;
  registeredDate: string;    // YYYY-MM-DD
  subjects: StudentSubject[];
  attendance: AttendanceRecord[];
  attendanceRate: number;    // 출석률 % (0-100)
  diagnosticResult?: DiagnosticResult;
  notificationSettings: NotificationSettings;
  recentActivities: RecentActivity[];
  status: 'good' | 'warning' | 'delayed';  // 진도 상태
  unpaidMonths?: number;     // 미납 개월 수
  libraryProgress: LibraryProgress;  // 도서관 진행 상황
  avatar?: string;           // 아바타 이미지 (선택)
}

// 20명 학생 더미 데이터 (LearningStatusPage와 동일한 이름)
export const mockStudents: Student[] = [
  // 1. 김민수 (주인공 - 성장 스토리)
  {
    id: '001',
    name: '김민수',
    grade: 5,
    parentName: '김미영',
    parentPhone: '010-1234-5678',
    registeredDate: '2025-09-01',
    attendanceRate: 94,
    status: 'good',
    avatar: '/avatars/avatar_01_김민수.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 12,
      thisMonthBooks: 4
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.14',
        startDate: '2025-09-01',
        progress: 78,
        recentScore: 85,
        weakPoints: ['문맥 추론', '현재진행형']
      },
      {
        subjectId: 'math',
        subjectName: '수학',
        currentLevel: '5-1 개념편',
        startDate: '2025-09-01',
        progress: 65,
        recentScore: 85,
        weakPoints: ['분수 나눗셈']
      }
    ],
    attendance: [
      { date: '2026-03-15', attended: true },
      { date: '2026-03-13', attended: true },
      { date: '2026-03-12', attended: true },
      { date: '2026-03-10', attended: true },
      { date: '2026-03-08', attended: false },
    ],
    diagnosticResult: {
      level: 'Lv.15',
      previousLevel: 'Lv.14',
      testDate: '2026-03-18',
      nationalRank: 20,
      vocabulary: 80,
      reading: 85,
      reasoning: 70,
      speed: 75
    },
    notificationSettings: {
      attendance: false,  // 출결 알림 OFF (정혜진A 인터뷰 반영)
      progress: true,
      weeklyReport: true
    },
    recentActivities: [
      { date: '2026-03-15', type: 'grading', description: '수학 워크시트 채점', icon: '✅' },
      { date: '2026-03-13', type: 'progress', description: '영어 Lv.14-3 완료', icon: '📚' },
      { date: '2026-03-12', type: 'communication', description: '학부모 소통 (주간 리포트)', icon: '💬' },
      { date: '2026-03-10', type: 'attendance', description: '출석', icon: '✅' },
    ]
  },

  // 2. 이지은
  {
    id: '002',
    name: '이지은',
    grade: 4,
    parentName: '이정희',
    parentPhone: '010-2345-6789',
    registeredDate: '2025-09-15',
    attendanceRate: 88,
    status: 'good',
    avatar: '/avatars/avatar_02_이지은.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 15,
      thisMonthBooks: 3
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.12',
        startDate: '2025-09-15',
        progress: 65,
        recentScore: 90,
        weakPoints: ['과거형 동사', '의문문 어순', '지시어 연결']
      }
    ],
    attendance: [
      { date: '2026-03-15', attended: true },
      { date: '2026-03-13', attended: true },
      { date: '2026-03-12', attended: false },
      { date: '2026-03-10', attended: true },
    ],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: [
      { date: '2026-03-15', type: 'grading', description: '영어 워크시트 채점 (90점)', icon: '✅' },
      { date: '2026-03-13', type: 'progress', description: '영어 Lv.12-4 완료', icon: '📚' },
    ]
  },

  // 3. 박준호
  {
    id: '003',
    name: '박준호',
    grade: 3,
    parentName: '박수정',
    parentPhone: '010-3456-7890',
    registeredDate: '2025-10-01',
    attendanceRate: 80,
    status: 'warning',
    avatar: '/avatars/avatar_03_박준호.png',
    libraryProgress: {
      readingLevel: 2,
      totalBooksRead: 6,
      thisMonthBooks: 1
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.10',
        startDate: '2025-10-01',
        progress: 45,
        recentScore: 70,
        weakPoints: ['이중모음 구분', '기초 사이트워드', 'be동사 활용']
      }
    ],
    attendance: [
      { date: '2026-03-15', attended: true },
      { date: '2026-03-13', attended: false },
      { date: '2026-03-12', attended: true },
      { date: '2026-03-10', attended: false },
    ],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: [
      { date: '2026-03-15', type: 'grading', description: '수학 워크시트 채점 (70점)', icon: '✅' },
      { date: '2026-03-12', type: 'attendance', description: '출석', icon: '✅' },
    ]
  },

  // 4. 최서연
  {
    id: '004',
    name: '최서연',
    grade: 6,
    parentName: '최현주',
    parentPhone: '010-4567-8901',
    registeredDate: '2025-08-15',
    attendanceRate: 96,
    status: 'good',
    avatar: '/avatars/avatar_04_최서연.png',
    libraryProgress: {
      readingLevel: 4,
      totalBooksRead: 18,
      thisMonthBooks: 4
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.16',
        startDate: '2025-08-15',
        progress: 82,
        recentScore: 92,
        weakPoints: ['th 발음', '강세 위치']
      }
    ],
    attendance: [
      { date: '2026-03-15', attended: true },
      { date: '2026-03-13', attended: true },
      { date: '2026-03-12', attended: true },
      { date: '2026-03-10', attended: true },
    ],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: [
      { date: '2026-03-15', type: 'progress', description: '영어 Lv.16-2 완료', icon: '📚' },
    ]
  },

  // 5. 정현우
  {
    id: '005',
    name: '정현우',
    grade: 5,
    parentName: '정미란',
    parentPhone: '010-5678-9012',
    registeredDate: '2025-09-10',
    attendanceRate: 90,
    status: 'good',
    avatar: '/avatars/avatar_05_정현우.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 14,
      thisMonthBooks: 3
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.13',
        startDate: '2025-09-10',
        progress: 70,
        weakPoints: ['주제문 파악', '인칭대명사']
      }
    ],
    attendance: [
      { date: '2026-03-15', attended: true },
      { date: '2026-03-13', attended: true },
      { date: '2026-03-12', attended: true },
    ],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: [
      { date: '2026-03-15', type: 'attendance', description: '출석', icon: '✅' },
    ]
  },

  // 6. 강소영
  {
    id: '006',
    name: '강소영',
    grade: 4,
    parentPhone: '010-6789-0123',
    registeredDate: '2025-10-05',
    attendanceRate: 85,
    status: 'good',
    avatar: '/avatars/avatar_06_강소영.png',
    libraryProgress: {
      readingLevel: 2,
      totalBooksRead: 10,
      thisMonthBooks: 2
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.11',
        startDate: '2025-10-05',
        progress: 60,
        weakPoints: ['묵음 e 규칙', '단어 철자', '불규칙 복수형']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 7. 윤도현
  {
    id: '007',
    name: '윤도현',
    grade: 6,
    parentPhone: '010-7890-1234',
    registeredDate: '2025-08-20',
    attendanceRate: 98,
    status: 'good',
    avatar: '/avatars/avatar_07_윤도현.png',
    libraryProgress: {
      readingLevel: 4,
      totalBooksRead: 20,
      thisMonthBooks: 5
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.17',
        startDate: '2025-08-20',
        progress: 88,
        weakPoints: ['억양 패턴', '빠른 발화 청취']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 8. 임수진
  {
    id: '008',
    name: '임수진',
    grade: 3,
    parentPhone: '010-8901-2345',
    registeredDate: '2025-10-15',
    attendanceRate: 75,
    status: 'delayed',
    avatar: '/avatars/avatar_08_임수진.png',
    libraryProgress: {
      readingLevel: 1,
      totalBooksRead: 2,
      thisMonthBooks: 0
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.9',
        startDate: '2025-10-15',
        progress: 40,
        weakPoints: ['연음 발음', '장단모음 혼동', '기초 사이트워드']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 9. 한지훈
  {
    id: '009',
    name: '한지훈',
    grade: 5,
    parentPhone: '010-9012-3456',
    registeredDate: '2025-09-05',
    attendanceRate: 92,
    status: 'good',
    avatar: '/avatars/avatar_09_한지훈.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 16,
      thisMonthBooks: 4
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.14',
        startDate: '2025-09-05',
        progress: 75,
        weakPoints: ['읽기 속도', '핵심어 찾기']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 10. 오나은
  {
    id: '010',
    name: '오나은',
    grade: 4,
    parentPhone: '010-0123-4567',
    registeredDate: '2025-09-20',
    attendanceRate: 87,
    status: 'good',
    avatar: '/avatars/avatar_10_오나은.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 11,
      thisMonthBooks: 3
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.12',
        startDate: '2025-09-20',
        progress: 68,
        weakPoints: ['현재진행형', '동의어 혼동', '지시어 연결']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 11. 신동욱
  {
    id: '011',
    name: '신동욱',
    grade: 6,
    parentPhone: '010-1234-6789',
    registeredDate: '2025-08-25',
    attendanceRate: 95,
    status: 'good',
    avatar: '/avatars/avatar_11_신동욱.png',
    libraryProgress: {
      readingLevel: 4,
      totalBooksRead: 17,
      thisMonthBooks: 4
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.15',
        startDate: '2025-08-25',
        progress: 80,
        weakPoints: ['문맥 추론', '주제문 파악']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 12. 배미래
  {
    id: '012',
    name: '배미래',
    grade: 3,
    parentPhone: '010-2345-7890',
    registeredDate: '2025-10-10',
    attendanceRate: 82,
    status: 'warning',
    avatar: '/avatars/avatar_12_배미래.png',
    libraryProgress: {
      readingLevel: 1,
      totalBooksRead: 5,
      thisMonthBooks: 1
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.10',
        startDate: '2025-10-10',
        progress: 50,
        weakPoints: ['자음 블렌딩', 'be동사 활용']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 13. 조성민
  {
    id: '013',
    name: '조성민',
    grade: 5,
    parentPhone: '010-3456-8901',
    registeredDate: '2025-09-12',
    attendanceRate: 91,
    status: 'good',
    avatar: '/avatars/avatar_13_조성민.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 13,
      thisMonthBooks: 3
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.13',
        startDate: '2025-09-12',
        progress: 72,
        weakPoints: ['과거형 동사', '반의어 구분']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 14. 홍예린
  {
    id: '014',
    name: '홍예린',
    grade: 4,
    parentPhone: '010-4567-9012',
    registeredDate: '2025-09-25',
    attendanceRate: 86,
    status: 'good',
    avatar: '/avatars/avatar_14_서하은.png',
    libraryProgress: {
      readingLevel: 2,
      totalBooksRead: 9,
      thisMonthBooks: 2
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.11',
        startDate: '2025-09-25',
        progress: 62,
        weakPoints: ['이중모음 구분', '불규칙 복수형']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 15. 송태현
  {
    id: '015',
    name: '송태현',
    grade: 6,
    parentPhone: '010-5678-0123',
    registeredDate: '2025-08-30',
    attendanceRate: 93,
    status: 'good',
    avatar: '/avatars/avatar_15_유예린.png',
    unpaidMonths: 1,
    libraryProgress: {
      readingLevel: 4,
      totalBooksRead: 19,
      thisMonthBooks: 5
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.16',
        startDate: '2025-08-30',
        progress: 84,
        weakPoints: ['r/l 구분', '축약형 듣기']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 16. 유하늘
  {
    id: '016',
    name: '유하늘',
    grade: 4,
    parentPhone: '010-6789-1234',
    registeredDate: '2025-10-12',
    attendanceRate: 89,
    status: 'good',
    avatar: '/avatars/avatar_16_이준서.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 12,
      thisMonthBooks: 3
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.12',
        startDate: '2025-10-12',
        progress: 64,
        weakPoints: ['의문문 어순', '읽기 속도', '단어 철자']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 17. 문지원
  {
    id: '017',
    name: '문지원',
    grade: 5,
    parentPhone: '010-7890-2345',
    registeredDate: '2025-09-18',
    attendanceRate: 93,
    status: 'good',
    avatar: '/avatars/avatar_17_백서아.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 14,
      thisMonthBooks: 4
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.14',
        startDate: '2025-09-18',
        progress: 77,
        weakPoints: ['핵심어 찾기', '인칭대명사']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 18. 양준혁
  {
    id: '018',
    name: '양준혁',
    grade: 6,
    parentPhone: '010-8901-3456',
    registeredDate: '2025-08-22',
    attendanceRate: 97,
    status: 'good',
    avatar: '/avatars/avatar_18_장민혁.png',
    libraryProgress: {
      readingLevel: 4,
      totalBooksRead: 20,
      thisMonthBooks: 5
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.18',
        startDate: '2025-08-22',
        progress: 85,
        weakPoints: ['연음 처리', '유사 발음 구분']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 19. 백서아
  {
    id: '019',
    name: '백서아',
    grade: 3,
    parentPhone: '010-9012-4567',
    registeredDate: '2025-10-18',
    attendanceRate: 78,
    status: 'warning',
    avatar: '/avatars/avatar_19_홍서윤.png',
    libraryProgress: {
      readingLevel: 1,
      totalBooksRead: 4,
      thisMonthBooks: 1
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.9',
        startDate: '2025-10-18',
        progress: 42,
        weakPoints: ['장단모음 혼동', '묵음 e 규칙', '단어 철자']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  },

  // 20. 남도윤
  {
    id: '020',
    name: '남도윤',
    grade: 5,
    parentPhone: '010-0123-5678',
    registeredDate: '2025-09-08',
    attendanceRate: 91,
    status: 'good',
    avatar: '/avatars/avatar_20_권태양.png',
    libraryProgress: {
      readingLevel: 3,
      totalBooksRead: 15,
      thisMonthBooks: 4
    },
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.13',
        startDate: '2025-09-08',
        progress: 71,
        weakPoints: ['문맥 추론', '과거형 동사', '지시어 연결']
      }
    ],
    attendance: [],
    notificationSettings: {
      attendance: false,
      progress: true,
      weeklyReport: true
    },
    recentActivities: []
  }
];

// 통계 계산 헬퍼 함수
export const getStudentStats = () => {
  const total = mockStudents.length;
  const goodStatus = mockStudents.filter(s => s.status === 'good').length;
  const warningStatus = mockStudents.filter(s => s.status === 'warning').length;
  const delayedStatus = mockStudents.filter(s => s.status === 'delayed').length;

  return {
    total,
    goodStatus,
    warningStatus,
    delayedStatus
  };
};

// 오늘 출석 확인
export const getTodayAttendance = () => {
  const today = new Date().toISOString().split('T')[0];
  return mockStudents.filter(student =>
    student.attendance.some(record => record.date === today && record.attended)
  ).length;
};
