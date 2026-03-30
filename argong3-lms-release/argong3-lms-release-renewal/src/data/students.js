// 실제 학생 데이터 (고정)

// 이름 풀
const maleNames = [
  '김민준', '이준혁', '박서준', '최도윤', '정시우',
  '강주원', '윤지호', '임현우', '한승민', '오태양',
  '신동현', '류재원', '조성민', '문하준', '배준서'
];

const femaleNames = [
  '김서연', '이지우', '박하은', '최수아', '정나은',
  '강채원', '윤소율', '임지아', '한예린', '오서현',
  '신유진', '류아인', '조하늘', '문소이', '배지아'
];

// 상태별 피드백 문장
const feedbackPool = {
  normal: [
    '꾸준히 학습에 참여하고 있으며 전반적으로 우수한 성취를 보이고 있습니다.',
    '학습 참여도와 정답률 모두 우수합니다. 이 페이스를 유지해 주세요!',
    '매우 성실하게 학습하고 있습니다. 특히 정답률이 인상적입니다.'
  ],
  warning: [
    '학습 참여는 하고 있으나 진행률 향상이 필요합니다. 조금 더 격려해 주세요.',
    '정답률은 양호하나 학습 시간이 부족합니다. 규칙적인 학습 습관이 필요합니다.',
    '지난 주 대비 참여율이 다소 감소했습니다. 가정에서 조금 더 관심 가져주시면 큰 도움이 됩니다.'
  ],
  danger: [
    '학습 참여가 많이 부족합니다. 개별 면담을 통해 함께 해결책을 찾아보면 좋겠습니다.',
    '이번 주 학습 참여가 저조합니다. 연락 주시면 빠르게 도움드리겠습니다.',
    '학습 진행이 지연되고 있습니다. 언제든지 말씀해 주시면 맞춤 지도해 드리겠습니다.'
  ]
};

// 레벨 그룹 매핑
const levelGroupMap = {
  'Lv.1-6': { subjects: ['Speaking 1', 'Phonics 1', 'Reading 1'] },
  'Lv.7-12': { subjects: ['Speaking 2', 'Phonics 2', 'Reading 2'] },
  'Lv.13-18': { subjects: ['Speaking 3', 'Phonics 3', 'Grammar 1'] },
  'Lv.19-24': { subjects: ['Speaking 4', 'Reading 3', 'Writing 1'] },
  'Lv.25-30': { subjects: ['Speaking 5', 'Grammar 2', 'Writing 2'] },
  'Lv.31-36': { subjects: ['Speaking 6', 'Grammar 3', 'Writing 3'] }
};

// 레벨 그룹 결정 함수
function getLevelGroup(level) {
  if (level >= 1 && level <= 6) return 'Lv.1-6';
  if (level >= 7 && level <= 12) return 'Lv.7-12';
  if (level >= 13 && level <= 18) return 'Lv.13-18';
  if (level >= 19 && level <= 24) return 'Lv.19-24';
  if (level >= 25 && level <= 30) return 'Lv.25-30';
  if (level >= 31 && level <= 36) return 'Lv.31-36';
  return 'Lv.1-6';
}

// 학생 데이터 생성 헬퍼 함수
function createStudent(branchCode, attendanceNumber, config) {
  const { name, gender, level, status, finishedPercent, correctPercent, studyTime, readingCount, lastStudyDate } = config;
  const levelGroup = getLevelGroup(level);
  const subjects = levelGroupMap[levelGroup].subjects;

  // 과목별 진도 (학습진행률 기준 ±10% 랜덤 변동)
  const subjectData = subjects.map(subjectName => ({
    name: subjectName,
    progress: Math.min(100, Math.max(0, finishedPercent + (Math.random() * 20 - 10)))
  }));

  // 피드백 선택
  const feedbacks = feedbackPool[status];
  const feedback = feedbacks[attendanceNumber % feedbacks.length];

  return {
    id: `${branchCode}-${String(attendanceNumber).padStart(3, '0')}`,
    attendanceNumber,
    name,
    gender,
    level,
    levelGroup,
    status,
    finishedPercent,
    correctPercent,
    studyTime,
    readingCount,
    smsActive: false,
    lastStudyDate,
    feedback,
    subjectData
  };
}

// 교습소별 학생 데이터
export const branchStudents = {
  '서울 금천구 1호점': [
    // 정상 학생 18명 (Lv분포: 5,8,7,6,3,1)
    createStudent('gk', 1, { name: maleNames[0], gender: 'M', level: 3, status: 'normal', finishedPercent: 85, correctPercent: 88, studyTime: 25, readingCount: 5, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 2, { name: femaleNames[0], gender: 'F', level: 5, status: 'normal', finishedPercent: 92, correctPercent: 90, studyTime: 30, readingCount: 6, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 3, { name: maleNames[1], gender: 'M', level: 2, status: 'normal', finishedPercent: 78, correctPercent: 82, studyTime: 22, readingCount: 4, lastStudyDate: '2026-03-26' }),
    createStudent('gk', 4, { name: femaleNames[1], gender: 'F', level: 4, status: 'normal', finishedPercent: 88, correctPercent: 85, studyTime: 28, readingCount: 5, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 5, { name: maleNames[2], gender: 'M', level: 1, status: 'normal', finishedPercent: 82, correctPercent: 87, studyTime: 24, readingCount: 4, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 6, { name: femaleNames[2], gender: 'F', level: 9, status: 'normal', finishedPercent: 76, correctPercent: 80, studyTime: 20, readingCount: 3, lastStudyDate: '2026-03-26' }),
    createStudent('gk', 7, { name: maleNames[3], gender: 'M', level: 8, status: 'normal', finishedPercent: 90, correctPercent: 92, studyTime: 32, readingCount: 7, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 8, { name: femaleNames[3], gender: 'F', level: 11, status: 'normal', finishedPercent: 84, correctPercent: 86, studyTime: 26, readingCount: 5, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 9, { name: maleNames[4], gender: 'M', level: 10, status: 'normal', finishedPercent: 79, correctPercent: 83, studyTime: 23, readingCount: 4, lastStudyDate: '2026-03-26' }),
    createStudent('gk', 10, { name: femaleNames[4], gender: 'F', level: 7, status: 'normal', finishedPercent: 87, correctPercent: 89, studyTime: 27, readingCount: 6, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 11, { name: maleNames[5], gender: 'M', level: 12, status: 'normal', finishedPercent: 81, correctPercent: 84, studyTime: 24, readingCount: 4, lastStudyDate: '2026-03-26' }),
    createStudent('gk', 12, { name: femaleNames[5], gender: 'F', level: 9, status: 'normal', finishedPercent: 75, correctPercent: 79, studyTime: 21, readingCount: 3, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 13, { name: maleNames[6], gender: 'M', level: 15, status: 'normal', finishedPercent: 83, correctPercent: 86, studyTime: 25, readingCount: 5, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 14, { name: femaleNames[6], gender: 'F', level: 17, status: 'normal', finishedPercent: 89, correctPercent: 91, studyTime: 29, readingCount: 6, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 15, { name: maleNames[7], gender: 'M', level: 14, status: 'normal', finishedPercent: 77, correctPercent: 81, studyTime: 22, readingCount: 4, lastStudyDate: '2026-03-26' }),
    createStudent('gk', 16, { name: femaleNames[7], gender: 'F', level: 22, status: 'normal', finishedPercent: 86, correctPercent: 88, studyTime: 27, readingCount: 5, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 17, { name: maleNames[8], gender: 'M', level: 26, status: 'normal', finishedPercent: 80, correctPercent: 84, studyTime: 23, readingCount: 4, lastStudyDate: '2026-03-27' }),
    createStudent('gk', 18, { name: femaleNames[8], gender: 'F', level: 32, status: 'normal', finishedPercent: 74, correctPercent: 78, studyTime: 20, readingCount: 3, lastStudyDate: '2026-03-26' }),

    // 주의 학생 7명
    createStudent('gk', 19, { name: maleNames[9], gender: 'M', level: 13, status: 'warning', finishedPercent: 58, correctPercent: 65, studyTime: 15, readingCount: 2, lastStudyDate: '2026-03-25' }),
    createStudent('gk', 20, { name: femaleNames[9], gender: 'F', level: 16, status: 'warning', finishedPercent: 62, correctPercent: 68, studyTime: 16, readingCount: 2, lastStudyDate: '2026-03-24' }),
    createStudent('gk', 21, { name: maleNames[10], gender: 'M', level: 18, status: 'warning', finishedPercent: 48, correctPercent: 58, studyTime: 12, readingCount: 1, lastStudyDate: '2026-03-23' }),
    createStudent('gk', 22, { name: femaleNames[10], gender: 'F', level: 20, status: 'warning', finishedPercent: 65, correctPercent: 70, studyTime: 17, readingCount: 3, lastStudyDate: '2026-03-25' }),
    createStudent('gk', 23, { name: maleNames[11], gender: 'M', level: 19, status: 'warning', finishedPercent: 55, correctPercent: 63, studyTime: 14, readingCount: 2, lastStudyDate: '2026-03-24' }),
    createStudent('gk', 24, { name: femaleNames[11], gender: 'F', level: 21, status: 'warning', finishedPercent: 44, correctPercent: 55, studyTime: 11, readingCount: 1, lastStudyDate: '2026-03-23' }),
    createStudent('gk', 25, { name: maleNames[12], gender: 'M', level: 27, status: 'warning', finishedPercent: 61, correctPercent: 67, studyTime: 15, readingCount: 2, lastStudyDate: '2026-03-25' }),

    // 관리필요 학생 5명
    createStudent('gk', 26, { name: femaleNames[12], gender: 'F', level: 23, status: 'danger', finishedPercent: 25, correctPercent: 42, studyTime: 6, readingCount: 0, lastStudyDate: '2026-03-20' }),
    createStudent('gk', 27, { name: maleNames[13], gender: 'M', level: 24, status: 'danger', finishedPercent: 32, correctPercent: 48, studyTime: 8, readingCount: 1, lastStudyDate: '2026-03-21' }),
    createStudent('gk', 28, { name: femaleNames[13], gender: 'F', level: 28, status: 'danger', finishedPercent: 18, correctPercent: 38, studyTime: 4, readingCount: 0, lastStudyDate: '2026-03-19' }),
    createStudent('gk', 29, { name: maleNames[14], gender: 'M', level: 29, status: 'danger', finishedPercent: 38, correctPercent: 52, studyTime: 9, readingCount: 1, lastStudyDate: '2026-03-22' }),
    createStudent('gk', 30, { name: femaleNames[14], gender: 'F', level: 30, status: 'danger', finishedPercent: 28, correctPercent: 45, studyTime: 7, readingCount: 0, lastStudyDate: '2026-03-20' })
  ],

  '서울 강남구 2호점': [
    // 정상 학생 36명 (Lv분포: 2,4,7,12,11,9)
    ...Array.from({ length: 36 }, (_, i) => {
      const levelDist = [2,4,7,12,11,9];
      let level = 1;
      let sum = 0;
      for (let j = 0; j < levelDist.length; j++) {
        sum += levelDist[j];
        if (i < sum) {
          const groupStart = j * 6 + 1;
          const offset = i - (sum - levelDist[j]);
          level = groupStart + (offset % 6);
          break;
        }
      }

      return createStudent('gn', i + 1, {
        name: i % 2 === 0 ? maleNames[i % maleNames.length] : femaleNames[i % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level,
        status: 'normal',
        finishedPercent: 75 + Math.floor(Math.random() * 20),
        correctPercent: 80 + Math.floor(Math.random() * 15),
        studyTime: 20 + Math.floor(Math.random() * 15),
        readingCount: 3 + Math.floor(Math.random() * 5),
        lastStudyDate: ['2026-03-27', '2026-03-26', '2026-03-25'][i % 3]
      });
    }),

    // 주의 학생 7명
    ...Array.from({ length: 7 }, (_, i) => {
      const idx = 36 + i + 1;
      return createStudent('gn', idx, {
        name: i % 2 === 0 ? maleNames[(idx) % maleNames.length] : femaleNames[(idx) % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level: 13 + i,
        status: 'warning',
        finishedPercent: 45 + Math.floor(Math.random() * 20),
        correctPercent: 58 + Math.floor(Math.random() * 12),
        studyTime: 11 + Math.floor(Math.random() * 7),
        readingCount: 1 + Math.floor(Math.random() * 2),
        lastStudyDate: ['2026-03-25', '2026-03-24', '2026-03-23'][i % 3]
      });
    }),

    // 관리필요 학생 2명
    createStudent('gn', 44, { name: maleNames[14], gender: 'M', level: 21, status: 'danger', finishedPercent: 22, correctPercent: 40, studyTime: 5, readingCount: 0, lastStudyDate: '2026-03-19' }),
    createStudent('gn', 45, { name: femaleNames[14], gender: 'F', level: 24, status: 'danger', finishedPercent: 35, correctPercent: 50, studyTime: 8, readingCount: 1, lastStudyDate: '2026-03-21' })
  ],

  '서울 마포구 3호점': [
    // 정상 학생 7명 (Lv분포: 9,6,4,2,1,0)
    createStudent('mp', 1, { name: maleNames[0], gender: 'M', level: 3, status: 'normal', finishedPercent: 82, correctPercent: 85, studyTime: 24, readingCount: 4, lastStudyDate: '2026-03-27' }),
    createStudent('mp', 2, { name: femaleNames[0], gender: 'F', level: 4, status: 'normal', finishedPercent: 88, correctPercent: 90, studyTime: 28, readingCount: 5, lastStudyDate: '2026-03-27' }),
    createStudent('mp', 3, { name: maleNames[1], gender: 'M', level: 1, status: 'normal', finishedPercent: 75, correctPercent: 80, studyTime: 20, readingCount: 3, lastStudyDate: '2026-03-26' }),
    createStudent('mp', 4, { name: femaleNames[1], gender: 'F', level: 2, status: 'normal', finishedPercent: 79, correctPercent: 83, studyTime: 22, readingCount: 4, lastStudyDate: '2026-03-27' }),
    createStudent('mp', 5, { name: maleNames[2], gender: 'M', level: 5, status: 'normal', finishedPercent: 86, correctPercent: 88, studyTime: 26, readingCount: 5, lastStudyDate: '2026-03-27' }),
    createStudent('mp', 6, { name: femaleNames[2], gender: 'F', level: 9, status: 'normal', finishedPercent: 73, correctPercent: 78, studyTime: 19, readingCount: 3, lastStudyDate: '2026-03-26' }),
    createStudent('mp', 7, { name: maleNames[3], gender: 'M', level: 8, status: 'normal', finishedPercent: 91, correctPercent: 93, studyTime: 31, readingCount: 6, lastStudyDate: '2026-03-27' }),

    // 주의 학생 8명
    ...Array.from({ length: 8 }, (_, i) => {
      const idx = 7 + i + 1;
      return createStudent('mp', idx, {
        name: i % 2 === 0 ? maleNames[(idx) % maleNames.length] : femaleNames[(idx) % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level: [6, 7, 10, 11, 14, 15, 16, 18][i],
        status: 'warning',
        finishedPercent: 42 + Math.floor(Math.random() * 25),
        correctPercent: 56 + Math.floor(Math.random() * 15),
        studyTime: 10 + Math.floor(Math.random() * 8),
        readingCount: 1 + Math.floor(Math.random() * 2),
        lastStudyDate: ['2026-03-25', '2026-03-24', '2026-03-23', '2026-03-22'][i % 4]
      });
    }),

    // 관리필요 학생 7명
    ...Array.from({ length: 7 }, (_, i) => {
      const idx = 15 + i + 1;
      return createStudent('mp', idx, {
        name: i % 2 === 0 ? maleNames[(idx) % maleNames.length] : femaleNames[(idx) % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level: [12, 13, 17, 19, 20, 21, 23][i],
        status: 'danger',
        finishedPercent: 12 + Math.floor(Math.random() * 25),
        correctPercent: 36 + Math.floor(Math.random() * 16),
        studyTime: 3 + Math.floor(Math.random() * 7),
        readingCount: Math.floor(Math.random() * 2),
        lastStudyDate: ['2026-03-20', '2026-03-19', '2026-03-18', '2026-03-17'][i % 4]
      });
    })
  ],

  '경기 수원시 5호점': [
    // 정상 학생 22명 (Lv분포: 4,7,9,10,6,2)
    ...Array.from({ length: 22 }, (_, i) => {
      const levelDist = [4,7,9,10,6,2];
      let level = 1;
      let sum = 0;
      for (let j = 0; j < levelDist.length; j++) {
        sum += levelDist[j];
        if (i < sum) {
          const groupStart = j * 6 + 1;
          const offset = i - (sum - levelDist[j]);
          level = groupStart + (offset % 6);
          break;
        }
      }

      return createStudent('sw', i + 1, {
        name: i % 2 === 0 ? maleNames[i % maleNames.length] : femaleNames[i % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level,
        status: 'normal',
        finishedPercent: 72 + Math.floor(Math.random() * 22),
        correctPercent: 77 + Math.floor(Math.random() * 16),
        studyTime: 19 + Math.floor(Math.random() * 15),
        readingCount: 3 + Math.floor(Math.random() * 4),
        lastStudyDate: ['2026-03-27', '2026-03-26', '2026-03-25'][i % 3]
      });
    }),

    // 주의 학생 12명
    ...Array.from({ length: 12 }, (_, i) => {
      const idx = 22 + i + 1;
      return createStudent('sw', idx, {
        name: i % 2 === 0 ? maleNames[(idx) % maleNames.length] : femaleNames[(idx) % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level: 7 + i,
        status: 'warning',
        finishedPercent: 43 + Math.floor(Math.random() * 24),
        correctPercent: 57 + Math.floor(Math.random() * 15),
        studyTime: 11 + Math.floor(Math.random() * 7),
        readingCount: 1 + Math.floor(Math.random() * 3),
        lastStudyDate: ['2026-03-25', '2026-03-24', '2026-03-23'][i % 3]
      });
    }),

    // 관리필요 학생 4명
    ...Array.from({ length: 4 }, (_, i) => {
      const idx = 34 + i + 1;
      return createStudent('sw', idx, {
        name: i % 2 === 0 ? maleNames[(idx) % maleNames.length] : femaleNames[(idx) % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level: 20 + i,
        status: 'danger',
        finishedPercent: 15 + Math.floor(Math.random() * 22),
        correctPercent: 38 + Math.floor(Math.random() * 14),
        studyTime: 4 + Math.floor(Math.random() * 6),
        readingCount: Math.floor(Math.random() * 2),
        lastStudyDate: ['2026-03-20', '2026-03-19', '2026-03-18'][i % 3]
      });
    })
  ],

  '부산 해운대구 9호점': [
    // 정상 학생 25명 (Lv분포: 3,5,8,10,7,2)
    ...Array.from({ length: 25 }, (_, i) => {
      const levelDist = [3,5,8,10,7,2];
      let level = 1;
      let sum = 0;
      for (let j = 0; j < levelDist.length; j++) {
        sum += levelDist[j];
        if (i < sum) {
          const groupStart = j * 6 + 1;
          const offset = i - (sum - levelDist[j]);
          level = groupStart + (offset % 6);
          break;
        }
      }

      return createStudent('bs', i + 1, {
        name: i % 2 === 0 ? maleNames[i % maleNames.length] : femaleNames[i % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level,
        status: 'normal',
        finishedPercent: 76 + Math.floor(Math.random() * 19),
        correctPercent: 81 + Math.floor(Math.random() * 14),
        studyTime: 21 + Math.floor(Math.random() * 14),
        readingCount: 3 + Math.floor(Math.random() * 5),
        lastStudyDate: ['2026-03-27', '2026-03-26', '2026-03-25'][i % 3]
      });
    }),

    // 주의 학생 8명
    ...Array.from({ length: 8 }, (_, i) => {
      const idx = 25 + i + 1;
      return createStudent('bs', idx, {
        name: i % 2 === 0 ? maleNames[(idx) % maleNames.length] : femaleNames[(idx) % femaleNames.length],
        gender: i % 2 === 0 ? 'M' : 'F',
        level: 12 + i,
        status: 'warning',
        finishedPercent: 46 + Math.floor(Math.random() * 21),
        correctPercent: 59 + Math.floor(Math.random() * 13),
        studyTime: 12 + Math.floor(Math.random() * 6),
        readingCount: 1 + Math.floor(Math.random() * 3),
        lastStudyDate: ['2026-03-25', '2026-03-24', '2026-03-23'][i % 3]
      });
    }),

    // 관리필요 학생 2명
    createStudent('bs', 34, { name: maleNames[14], gender: 'M', level: 22, status: 'danger', finishedPercent: 24, correctPercent: 43, studyTime: 6, readingCount: 0, lastStudyDate: '2026-03-20' }),
    createStudent('bs', 35, { name: femaleNames[14], gender: 'F', level: 26, status: 'danger', finishedPercent: 31, correctPercent: 48, studyTime: 7, readingCount: 1, lastStudyDate: '2026-03-21' })
  ]
};

// 헬퍼 함수들
export function getStudentsByBranch(branch) {
  return branchStudents[branch] || [];
}

export function getStudentById(id) {
  for (const students of Object.values(branchStudents)) {
    const student = students.find(s => s.id === id);
    if (student) return student;
  }
  return null;
}

export function getStudentsByStatus(branch, status) {
  const students = getStudentsByBranch(branch);
  return students.filter(s => s.status === status);
}

export function getStudentByAttendanceNumber(branch, attendanceNumber) {
  const students = getStudentsByBranch(branch);
  return students.find(s => s.attendanceNumber === attendanceNumber);
}

// ==================== E-Library 더미 데이터 ====================

// 시드 기반 난수 생성 함수 (같은 시드면 항상 같은 값 반환)
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// 학생 ID를 숫자 시드로 변환
function getStudentSeed(studentId) {
  if (typeof studentId === 'number') return studentId;
  // 문자열 ID를 숫자로 변환
  let hash = 0;
  for (let i = 0; i < studentId.length; i++) {
    const char = studentId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// 시드 기반으로 min~max 범위의 정수 반환
function seededRandomInt(seed, min, max) {
  const rand = seededRandom(seed);
  return Math.floor(rand * (max - min + 1)) + min;
}

// 시드 기반으로 0~1 사이의 실수 반환 (offset으로 다양한 값 생성 가능)
function seededRandomFloat(seed, offset = 0) {
  return seededRandom(seed + offset);
}

// 도서 코드 풀 (실제 알공 도서 코드 형식)
const bookCodes = [
  'A001', 'A002', 'A003', 'A004', 'A005', 'A006', 'A007', 'A008', 'A009', 'A010',
  'B001', 'B002', 'B003', 'B004', 'B005', 'B006', 'B007', 'B008', 'B009', 'B010',
  'C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008', 'C009', 'C010',
  'D001', 'D002', 'D003', 'D004', 'D005', 'D006', 'D007', 'D008', 'D009', 'D010'
];

// 도서 제목 풀
const bookTitles = [
  'The Cat in the Hat', 'Green Eggs and Ham', 'Where the Wild Things Are',
  'Charlotte\'s Web', 'The Very Hungry Caterpillar', 'Goodnight Moon',
  'Brown Bear, Brown Bear', 'Curious George', 'The Giving Tree',
  'If You Give a Mouse a Cookie', 'The Rainbow Fish', 'Corduroy',
  'Harold and the Purple Crayon', 'The Snowy Day', 'Caps for Sale',
  'Make Way for Ducklings', 'The Tale of Peter Rabbit', 'Madeline',
  'Where the Sidewalk Ends', 'The Polar Express', 'Alexander and the Terrible Day',
  'The Little Engine That Could', 'Chicka Chicka Boom Boom', 'The Gruffalo',
  'Room on the Broom', 'Stick Man', 'The Tiger Who Came to Tea',
  'We\'re Going on a Bear Hunt', 'Guess How Much I Love You', 'Owl Babies',
  'Dear Zoo', 'The Little Prince', 'Alice in Wonderland', 'The Secret Garden',
  'Treasure Island', 'Peter Pan', 'The Jungle Book', 'Oliver Twist',
  'Tom Sawyer', 'Robinson Crusoe'
];

// 학생별 독서 데이터 생성 (시드 기반으로 일관된 데이터 생성)
function generateStudentReadingData(student) {
  const readingCount = student.readingCount || 0;
  const studentSeed = getStudentSeed(student.id);

  if (readingCount === 0) {
    return {
      recentBooks: [],
      completedBooks: [],
      totalBooks: 0,
      totalCompleted: 0,
      totalReading: 0
    };
  }

  // 완독 책 생성 (readingCount 기준)
  const completedBooks = [];
  const usedBookIndices = new Set();

  for (let i = 0; i < readingCount; i++) {
    let bookIndex;
    let attempts = 0;
    do {
      bookIndex = seededRandomInt(studentSeed + i * 100 + attempts, 0, bookCodes.length - 1);
      attempts++;
    } while (usedBookIndices.has(bookIndex) && attempts < 50);
    usedBookIndices.add(bookIndex);

    const completeCount = seededRandomInt(studentSeed + i * 100 + 50, 1, 3); // 1~3독
    const daysAgo = seededRandomInt(studentSeed + i * 100 + 60, 0, 30); // 최근 30일 이내
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - daysAgo);

    completedBooks.push({
      bookCode: bookCodes[bookIndex],
      bookTitle: bookTitles[bookIndex],
      completeCount,
      recentDate: recentDate.toISOString().split('T')[0],
      totalPage: seededRandomInt(studentSeed + i * 100 + 70, 20, 50), // 20~50페이지
      currentPage: null, // 완독 책은 currentPage null
      progress: 100
    });
  }

  // 읽고 있는 책 1~2권 추가 (status가 normal인 경우만)
  const readingBooks = [];
  if (student.status === 'normal' && seededRandom(studentSeed + 999) > 0.3) {
    const numReading = seededRandom(studentSeed + 1000) > 0.5 ? 1 : 2;

    for (let i = 0; i < numReading; i++) {
      let bookIndex;
      let attempts = 0;
      do {
        bookIndex = seededRandomInt(studentSeed + i * 200 + attempts + 1000, 0, bookCodes.length - 1);
        attempts++;
      } while (usedBookIndices.has(bookIndex) && attempts < 50);
      usedBookIndices.add(bookIndex);

      const totalPage = seededRandomInt(studentSeed + i * 200 + 1100, 20, 50);
      const progressPercent = seededRandomFloat(studentSeed + i * 200 + 1200) * 0.6 + 0.2; // 20%~80%
      const currentPage = Math.floor(totalPage * progressPercent);
      const progress = Math.floor((currentPage / totalPage) * 100);
      const daysAgo = seededRandomInt(studentSeed + i * 200 + 1300, 0, 7); // 최근 7일 이내
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - daysAgo);

      readingBooks.push({
        bookCode: bookCodes[bookIndex],
        bookTitle: bookTitles[bookIndex],
        completeCount: 0,
        recentDate: recentDate.toISOString().split('T')[0],
        totalPage,
        currentPage,
        progress
      });
    }
  }

  // 최근 읽은 책 3권 (완독 + 읽는중 합쳐서 최신순)
  const allBooks = [...completedBooks, ...readingBooks].sort((a, b) =>
    new Date(b.recentDate) - new Date(a.recentDate)
  );
  const recentBooks = allBooks.slice(0, 3);

  return {
    recentBooks,
    completedBooks,
    totalBooks: completedBooks.length + readingBooks.length,
    totalCompleted: completedBooks.length,
    totalReading: readingBooks.length
  };
}

// 지점별 독서 통계 데이터 생성
function generateBranchReadingStats(branchName) {
  const students = getStudentsByBranch(branchName);

  if (!students || students.length === 0) {
    return {
      totalBooks: 0,
      avgBooksPerStudent: 0,
      topReader: null,
      popularBooks: []
    };
  }

  // 전체 읽은 책 수
  const totalBooks = students.reduce((sum, s) => sum + (s.readingCount || 0), 0);

  // 학생당 평균 읽은 책 수
  const avgBooksPerStudent = (totalBooks / students.length).toFixed(1);

  // 최다 독서 학생
  const topReader = students.reduce((top, current) => {
    const currentCount = current.readingCount || 0;
    const topCount = top?.readingCount || 0;
    return currentCount > topCount ? current : top;
  }, null);

  // 인기 도서 Top 3 생성 (bookCode 기준)
  const bookReadCounts = {};
  students.forEach(student => {
    const readingData = generateStudentReadingData(student);
    readingData.completedBooks.forEach(book => {
      if (!bookReadCounts[book.bookCode]) {
        bookReadCounts[book.bookCode] = {
          bookCode: book.bookCode,
          bookTitle: book.bookTitle,
          readCount: 0
        };
      }
      bookReadCounts[book.bookCode].readCount += book.completeCount;
    });
  });

  const popularBooks = Object.values(bookReadCounts)
    .sort((a, b) => b.readCount - a.readCount)
    .slice(0, 3);

  return {
    totalBooks,
    avgBooksPerStudent: parseFloat(avgBooksPerStudent),
    topReader,
    popularBooks
  };
}

// E-Library용 헬퍼 함수들
export function getStudentReadingData(studentId) {
  const student = getStudentById(studentId);
  if (!student) return null;
  return generateStudentReadingData(student);
}

export function getBranchReadingStats(branchName) {
  return generateBranchReadingStats(branchName);
}

export function getLibraryStudentList(branchName) {
  const students = getStudentsByBranch(branchName);
  return students.map(student => ({
    userId: student.id,
    attendanceNumber: student.attendanceNumber,
    name: student.name,
    readingCount: student.readingCount || 0
  }));
}

// ==================== OurReading.vue용 더미 데이터 ====================

// 지점 전체 독서 활동 정보
export function getClassAllReadInfo(branchName) {
  const students = getStudentsByBranch(branchName);
  const totalBooks = students.reduce((sum, s) => sum + (s.readingCount || 0), 0);

  return {
    bookCount: totalBooks,
    readCount: totalBooks * 2, // 읽은 횟수는 책 수의 2배 정도
    sentenceCount: totalBooks * 50 // 책당 평균 50문장
  };
}

// 주간 독서 랭킹
export function getWeeklyRanking(branchName) {
  const students = getStudentsByBranch(branchName);
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 7);

  const ranking = students
    .map(student => ({
      name: student.name,
      weeklyBooks: Math.floor(Math.random() * 3) + 1 // 주간 1~3권
    }))
    .sort((a, b) => b.weeklyBooks - a.weeklyBooks)
    .slice(0, 10);

  return {
    ranking,
    start: startDate.toISOString(),
    end: today.toISOString()
  };
}

// 인기 도서 (전체 기간)
export function getClassPopularBooks(branchName) {
  const stats = generateBranchReadingStats(branchName);
  return stats.popularBooks || [];
}

// 인기 도서 (주간)
export function getClassWeeklyPopularBooks(branchName) {
  const stats = generateBranchReadingStats(branchName);
  // 주간 인기 도서는 전체와 비슷하지만 순서를 약간 바꿈
  const books = stats.popularBooks || [];
  return books.map((book, idx) => ({
    ...book,
    readCount: Math.max(1, book.readCount - idx)
  }));
}

// 단원별 진행률 (12단원)
export function getClassLibraryLessonProgress() {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 30) + 10);
}

// 퀴즈 평균 (Perfect, Good, Not Bad)
export function getClassQuizAverage() {
  const total = 100;
  const perfect = Math.floor(Math.random() * 30) + 20; // 20~50%
  const good = Math.floor(Math.random() * 30) + 30; // 30~60%
  const notbad = total - perfect - good;

  return { perfect, good, notbad };
}

// 월별 사용량 (1~12월)
export function getClassMonthAllUsage() {
  return Array.from({ length: 12 }, (_, i) => {
    const currentMonth = new Date().getMonth();
    // 현재 월까지만 데이터 있고, 이후는 0
    if (i > currentMonth) return 0;
    return Math.floor(Math.random() * 30) + 10; // 10~40권
  });
}

// ==================== StudentReading.vue용 더미 데이터 ====================

// 학생 퀴즈 결과 (시드 기반)
export function getStudentRacingResult(studentId) {
  const student = getStudentById(studentId);
  if (!student) return { perfect: 0, good: 0, notbad: 0 };

  const total = (student.readingCount || 0) * 10; // 책당 10문제 정도
  if (total === 0) return { perfect: 0, good: 0, notbad: 0 };

  const studentSeed = getStudentSeed(studentId);
  const perfectRatio = 0.3 + seededRandomFloat(studentSeed + 2000) * 0.3; // 30~60%
  const goodRatio = 0.2 + seededRandomFloat(studentSeed + 2100) * 0.2; // 20~40%

  const perfect = Math.floor(total * perfectRatio);
  const good = Math.floor(total * goodRatio);
  const notbad = total - perfect - good;

  return { perfect, good, notbad };
}

// 학생 단원별 진행률 (시드 기반)
export function getStudentLibraryLessonProgress(studentId) {
  const student = getStudentById(studentId);
  const multiplier = (student?.readingCount || 0) > 0 ? 1 : 0;
  const studentSeed = getStudentSeed(studentId);

  return Array.from({ length: 12 }, (_, i) =>
    seededRandomInt(studentSeed + 3000 + i * 10, 5, 25) * multiplier
  );
}

// 학생 레벨별 진행률 (시드 기반)
export function getStudentLevelProgress(studentId) {
  const student = getStudentById(studentId);
  const multiplier = (student?.readingCount || 0) > 0 ? 1 : 0;
  const studentSeed = getStudentSeed(studentId);

  return {
    '-1': seededRandomInt(studentSeed + 4000, 0, 15) * multiplier,
    '0': seededRandomInt(studentSeed + 4100, 0, 20) * multiplier,
    '1': seededRandomInt(studentSeed + 4200, 0, 25) * multiplier,
    '2': seededRandomInt(studentSeed + 4300, 0, 20) * multiplier,
    '3': seededRandomInt(studentSeed + 4400, 0, 15) * multiplier,
    '4': seededRandomInt(studentSeed + 4500, 0, 10) * multiplier,
    '5': seededRandomInt(studentSeed + 4600, 0, 5) * multiplier
  };
}

// 학생 최근 읽은 책
export function getStudentRecentBooks(studentId) {
  const readingData = getStudentReadingData(studentId);
  if (!readingData) return [];
  return readingData.recentBooks;
}

// 학생 전체 독서 정보
export function getStudentAllReadInfo(studentId) {
  const readingData = getStudentReadingData(studentId);
  if (!readingData) {
    return { bookCount: 0, readCount: 0, sentenceCount: 0 };
  }

  return {
    bookCount: readingData.totalBooks,
    readCount: readingData.totalCompleted * 2, // 완독 수의 2배
    sentenceCount: readingData.totalCompleted * 50 // 책당 평균 50문장
  };
}

// 반 평균 월별 사용량
export function getClassMonthAverageUsage(branchName) {
  return getClassMonthAllUsage(); // 같은 데이터 사용
}

// 학생 월별 사용량 (시드 기반)
export function getStudentMonthUsage(studentId) {
  const student = getStudentById(studentId);
  const multiplier = (student?.readingCount || 0) > 0 ? 1 : 0;
  const studentSeed = getStudentSeed(studentId);

  return Array.from({ length: 12 }, (_, i) => {
    const currentMonth = new Date().getMonth();
    if (i > currentMonth) return 0;
    return seededRandomInt(studentSeed + 5000 + i * 10, 2, 12) * multiplier;
  });
}

// ==================== DashboardView.vue용 ====================

// 학생 상태 조회 (progress 기반)
export function getStudentStatus(progress) {
  if (progress >= 80) return 'normal';
  if (progress >= 50) return 'warning';
  return 'danger';
}
