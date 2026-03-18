// 알공공부방 데모용 주간 리포트 데이터

export interface WeeklyReport {
  id: string;
  studentId: string;
  studentName: string;
  parentName?: string;
  weekStart: string;          // YYYY-MM-DD (월요일)
  weekEnd: string;            // YYYY-MM-DD (금요일)
  attendance: {
    daysAttended: number;
    totalDays: number;
    rate: number;             // 0-100
  };
  subjects: {
    subjectName: string;
    level: string;
    progress: string;         // '순조롭게', '주의 필요', '지연'
    averageScore?: number;
  }[];
  teacherComment: string;     // 원장님 코멘트
  generatedAt: string;        // ISO 8601
  sentAt?: string;            // 발송 시간 (미발송 시 undefined)
}

// 주간 리포트 15명분 (2026-03-10 ~ 2026-03-15)
export const mockWeeklyReports: WeeklyReport[] = [
  // 1. 김민지
  {
    id: 'report-001',
    studentId: '001',
    studentName: '김민지',
    parentName: '김미영',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 5,
      totalDays: 5,
      rate: 100
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.14',
        progress: '순조롭게',
        averageScore: 85
      },
      {
        subjectName: '수학',
        level: '5-1 개념편',
        progress: '순조롭게',
        averageScore: 85
      }
    ],
    teacherComment: '이번 주 집중력이 정말 좋았어요! 다음 주에는 Lv.15 진단테스트를 준비해볼까 합니다.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 2. 이서준
  {
    id: 'report-002',
    studentId: '002',
    studentName: '이서준',
    parentName: '이정희',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 4,
      totalDays: 5,
      rate: 80
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.12',
        progress: '순조롭게',
        averageScore: 90
      }
    ],
    teacherComment: '영어 실력이 눈에 띄게 향상되고 있어요. 과거형 동사 부분만 조금 더 연습하면 완벽할 것 같습니다.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 3. 박지우 (주의 필요)
  {
    id: 'report-003',
    studentId: '003',
    studentName: '박지우',
    parentName: '박수정',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 3,
      totalDays: 5,
      rate: 60
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.10',
        progress: '주의 필요',
        averageScore: 70
      }
    ],
    teacherComment: '이번 주 결석이 잦아 진도가 조금 밀렸어요. 다음 주에는 보충 수업을 진행하겠습니다. 출석에 신경 써주시면 감사하겠습니다.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 4. 최예은
  {
    id: 'report-004',
    studentId: '004',
    studentName: '최예은',
    parentName: '최현주',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 5,
      totalDays: 5,
      rate: 100
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.16',
        progress: '순조롭게',
        averageScore: 92
      }
    ],
    teacherComment: '항상 성실하게 학습하고 있어요. 이번 주에도 우수한 성적을 유지했습니다. 계속 화이팅!',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 5. 정우진
  {
    id: 'report-005',
    studentId: '005',
    studentName: '정우진',
    parentName: '정미란',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 5,
      totalDays: 5,
      rate: 100
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.13',
        progress: '순조롭게'
      }
    ],
    teacherComment: '꾸준히 잘하고 있어요. 이번 주 독해 실력이 많이 향상되었습니다.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 6. 강서연
  {
    id: 'report-006',
    studentId: '006',
    studentName: '강서연',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 4,
      totalDays: 5,
      rate: 80
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.11',
        progress: '순조롭게'
      }
    ],
    teacherComment: '차분하게 잘 따라오고 있어요.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 7. 윤재혁
  {
    id: 'report-007',
    studentId: '007',
    studentName: '윤재혁',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 5,
      totalDays: 5,
      rate: 100
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.17',
        progress: '순조롭게'
      }
    ],
    teacherComment: '최상위권을 유지하고 있어요. 우수합니다!',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 8. 한지민 (지연)
  {
    id: 'report-008',
    studentId: '008',
    studentName: '한지민',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 3,
      totalDays: 5,
      rate: 60
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.9',
        progress: '지연'
      }
    ],
    teacherComment: '출석률이 낮아 진도가 많이 밀렸어요. 학부모님과 상담이 필요할 것 같습니다.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 9. 송민호
  {
    id: 'report-009',
    studentId: '009',
    studentName: '송민호',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 5,
      totalDays: 5,
      rate: 100
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.14',
        progress: '순조롭게'
      }
    ],
    teacherComment: '성실하게 잘하고 있어요.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 10. 배수지
  {
    id: 'report-010',
    studentId: '010',
    studentName: '배수지',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 4,
      totalDays: 5,
      rate: 80
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.12',
        progress: '순조롭게'
      }
    ],
    teacherComment: '차근차근 잘 따라오고 있어요.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 11. 임하늘
  {
    id: 'report-011',
    studentId: '011',
    studentName: '임하늘',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 5,
      totalDays: 5,
      rate: 100
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.15',
        progress: '순조롭게'
      }
    ],
    teacherComment: '항상 열심히 하는 모습이 보기 좋아요.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 12. 오지훈 (주의 필요)
  {
    id: 'report-012',
    studentId: '012',
    studentName: '오지훈',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 4,
      totalDays: 5,
      rate: 80
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.10',
        progress: '주의 필요'
      }
    ],
    teacherComment: '조금 더 집중해서 학습하면 좋겠어요.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 13. 신유리
  {
    id: 'report-013',
    studentId: '013',
    studentName: '신유리',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 5,
      totalDays: 5,
      rate: 100
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.13',
        progress: '순조롭게'
      }
    ],
    teacherComment: '꾸준히 잘하고 있어요.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 14. 홍길동
  {
    id: 'report-014',
    studentId: '014',
    studentName: '홍길동',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 4,
      totalDays: 5,
      rate: 80
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.11',
        progress: '순조롭게'
      }
    ],
    teacherComment: '차분하게 학습하고 있어요.',
    generatedAt: '2026-03-15T17:00:00'
  },

  // 15. 김철수
  {
    id: 'report-015',
    studentId: '015',
    studentName: '김철수',
    weekStart: '2026-03-10',
    weekEnd: '2026-03-15',
    attendance: {
      daysAttended: 5,
      totalDays: 5,
      rate: 100
    },
    subjects: [
      {
        subjectName: '알공 영어',
        level: 'Lv.16',
        progress: '순조롭게'
      }
    ],
    teacherComment: '우수한 성적을 유지하고 있어요. (※ 2월분 수업료 미납 확인 부탁드립니다)',
    generatedAt: '2026-03-15T17:00:00'
  }
];

// 발송 대기 중인 리포트 조회
export const getPendingReports = (): WeeklyReport[] => {
  return mockWeeklyReports.filter(report => !report.sentAt);
};

// 학생별 리포트 조회
export const getReportByStudentId = (studentId: string): WeeklyReport | undefined => {
  return mockWeeklyReports.find(report => report.studentId === studentId);
};

// 카카오톡 메시지 포맷 생성
export const formatKakaoMessage = (report: WeeklyReport): string => {
  const subjectsText = report.subjects.map(s =>
    `✅ ${s.subjectName}: ${s.level}${s.averageScore ? ` (평균 ${s.averageScore}점)` : ''} - ${s.progress}`
  ).join('\n');

  return `📚 알공공부방 주간 학습 리포트

${report.parentName ? `${report.parentName} 학부모님` : '학부모님'}, 안녕하세요!
정혜진 원장입니다.

이번 주(${report.weekStart.substring(5)} ~ ${report.weekEnd.substring(5)}) ${report.studentName}의 학습 현황:

✅ 출석: ${report.attendance.daysAttended}일 (${report.attendance.rate}%)
${subjectsText}

💬 원장님 코멘트:
${report.teacherComment}

- 정혜진 원장 010-1234-5678`;
};
