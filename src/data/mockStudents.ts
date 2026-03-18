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
}

// 15명 학생 더미 데이터
export const mockStudents: Student[] = [
  // 1. 김민지 (주인공 - 성장 스토리)
  {
    id: '001',
    name: '김민지',
    grade: 5,
    parentName: '김미영',
    parentPhone: '010-1234-5678',
    registeredDate: '2025-09-01',
    attendanceRate: 94,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.14',
        startDate: '2025-09-01',
        progress: 78,
        recentScore: 85,
        weakPoints: ['분수 나눗셈']
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

  // 2. 이서준
  {
    id: '002',
    name: '이서준',
    grade: 4,
    parentName: '이정희',
    parentPhone: '010-2345-6789',
    registeredDate: '2025-09-15',
    attendanceRate: 88,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.12',
        startDate: '2025-09-15',
        progress: 65,
        recentScore: 90,
        weakPoints: ['과거형 동사']
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

  // 3. 박지우 (진도 지연 주의)
  {
    id: '003',
    name: '박지우',
    grade: 3,
    parentName: '박수정',
    parentPhone: '010-3456-7890',
    registeredDate: '2025-10-01',
    attendanceRate: 80,
    status: 'warning',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.10',
        startDate: '2025-10-01',
        progress: 45,
        recentScore: 70,
        weakPoints: ['곱셈 구구단', '기초 문법']
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

  // 4. 최예은
  {
    id: '004',
    name: '최예은',
    grade: 6,
    parentName: '최현주',
    parentPhone: '010-4567-8901',
    registeredDate: '2025-08-15',
    attendanceRate: 96,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.16',
        startDate: '2025-08-15',
        progress: 82,
        recentScore: 92
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

  // 5. 정우진
  {
    id: '005',
    name: '정우진',
    grade: 5,
    parentName: '정미란',
    parentPhone: '010-5678-9012',
    registeredDate: '2025-09-10',
    attendanceRate: 90,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.13',
        startDate: '2025-09-10',
        progress: 70
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

  // 6. 강서연
  {
    id: '006',
    name: '강서연',
    grade: 4,
    parentPhone: '010-6789-0123',
    registeredDate: '2025-10-05',
    attendanceRate: 85,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.11',
        startDate: '2025-10-05',
        progress: 60
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

  // 7. 윤재혁
  {
    id: '007',
    name: '윤재혁',
    grade: 6,
    parentPhone: '010-7890-1234',
    registeredDate: '2025-08-20',
    attendanceRate: 98,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.17',
        startDate: '2025-08-20',
        progress: 88
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

  // 8. 한지민
  {
    id: '008',
    name: '한지민',
    grade: 3,
    parentPhone: '010-8901-2345',
    registeredDate: '2025-10-15',
    attendanceRate: 75,
    status: 'delayed',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.9',
        startDate: '2025-10-15',
        progress: 40
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

  // 9. 송민호
  {
    id: '009',
    name: '송민호',
    grade: 5,
    parentPhone: '010-9012-3456',
    registeredDate: '2025-09-05',
    attendanceRate: 92,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.14',
        startDate: '2025-09-05',
        progress: 75
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

  // 10. 배수지
  {
    id: '010',
    name: '배수지',
    grade: 4,
    parentPhone: '010-0123-4567',
    registeredDate: '2025-09-20',
    attendanceRate: 87,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.12',
        startDate: '2025-09-20',
        progress: 68
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

  // 11. 임하늘
  {
    id: '011',
    name: '임하늘',
    grade: 6,
    parentPhone: '010-1234-6789',
    registeredDate: '2025-08-25',
    attendanceRate: 95,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.15',
        startDate: '2025-08-25',
        progress: 80
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

  // 12. 오지훈
  {
    id: '012',
    name: '오지훈',
    grade: 3,
    parentPhone: '010-2345-7890',
    registeredDate: '2025-10-10',
    attendanceRate: 82,
    status: 'warning',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.10',
        startDate: '2025-10-10',
        progress: 50
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

  // 13. 신유리
  {
    id: '013',
    name: '신유리',
    grade: 5,
    parentPhone: '010-3456-8901',
    registeredDate: '2025-09-12',
    attendanceRate: 91,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.13',
        startDate: '2025-09-12',
        progress: 72
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

  // 14. 홍길동
  {
    id: '014',
    name: '홍길동',
    grade: 4,
    parentPhone: '010-4567-9012',
    registeredDate: '2025-09-25',
    attendanceRate: 86,
    status: 'good',
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.11',
        startDate: '2025-09-25',
        progress: 62
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

  // 15. 김철수 (미납 1건)
  {
    id: '015',
    name: '김철수',
    grade: 6,
    parentPhone: '010-5678-0123',
    registeredDate: '2025-08-30',
    attendanceRate: 93,
    status: 'good',
    unpaidMonths: 1,
    subjects: [
      {
        subjectId: 'arlex',
        subjectName: '알공 영어',
        currentLevel: 'Lv.16',
        startDate: '2025-08-30',
        progress: 84
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
