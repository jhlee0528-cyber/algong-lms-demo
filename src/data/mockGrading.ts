// 알공공부방 데모용 채점 샘플 데이터

export interface GradingResult {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;             // '수학 3-1 워크시트 p.24'
  worksheetImage: string;      // 이미지 경로 (데모용 placeholder)
  totalQuestions: number;      // 전체 문제 수
  correctAnswers: number;      // 맞은 문제 수
  score: number;               // 점수 (0-100)
  wrongAnswers: number[];      // 틀린 문제 번호
  analysis: {
    pattern: string;           // 오답 패턴 (예: '분수 나눗셈')
    weakPoints: string[];      // 약점
    recommendation: string;    // 추천 복습 내용
  };
  parentMessageDraft: string;  // 학부모 전달 메시지 초안
  gradedAt: string;            // 채점 시간 (ISO 8601)
}

// 채점 샘플 3개 (갤러리에서 선택할 이미지)
export const mockGradingSamples: GradingResult[] = [
  // 샘플 1: 김민지 수학 워크시트
  {
    id: 'grading-001',
    studentId: '001',
    studentName: '김민지',
    subject: '수학 5-1 워크시트 p.24',
    worksheetImage: '/samples/worksheet-math-1.jpg',
    totalQuestions: 20,
    correctAnswers: 17,
    score: 85,
    wrongAnswers: [3, 7, 15],
    analysis: {
      pattern: '분수 나눗셈',
      weakPoints: ['분수 나눗셈', '분모가 다른 분수 계산'],
      recommendation: 'ArLex Lv.12 분수 단원 복습'
    },
    parentMessageDraft: `민지가 오늘 수학 워크시트를 85점으로 잘 풀었어요!

분수 나눗셈 부분은 다음 수업에 함께 복습하겠습니다. 전반적으로 집중력이 좋았습니다.

- 정혜진 원장`,
    gradedAt: '2026-03-15T16:30:00'
  },

  // 샘플 2: 이서준 영어 워크시트
  {
    id: 'grading-002',
    studentId: '002',
    studentName: '이서준',
    subject: '영어 Lv.12 워크시트 p.18',
    worksheetImage: '/samples/worksheet-english-1.jpg',
    totalQuestions: 20,
    correctAnswers: 18,
    score: 90,
    wrongAnswers: [5, 12],
    analysis: {
      pattern: '과거형 동사 변환',
      weakPoints: ['불규칙 동사 과거형'],
      recommendation: 'ArLex Lv.12 동사 과거형 집중 학습'
    },
    parentMessageDraft: `서준이가 영어 워크시트를 90점으로 우수하게 풀었어요!

과거형 동사 부분만 조금 더 연습하면 완벽할 것 같습니다. 이번 주 정말 열심히 했습니다.

- 정혜진 원장`,
    gradedAt: '2026-03-15T17:00:00'
  },

  // 샘플 3: 박지우 수학 워크시트 (주의 필요)
  {
    id: 'grading-003',
    studentId: '003',
    studentName: '박지우',
    subject: '수학 3-1 워크시트 p.12',
    worksheetImage: '/samples/worksheet-math-2.jpg',
    totalQuestions: 20,
    correctAnswers: 14,
    score: 70,
    wrongAnswers: [2, 4, 8, 11, 15, 18],
    analysis: {
      pattern: '곱셈 구구단',
      weakPoints: ['7단, 8단 곱셈', '곱셈 응용 문제'],
      recommendation: '기초 구구단 반복 학습 필요'
    },
    parentMessageDraft: `지우가 이번 워크시트에서 조금 어려움을 겪었어요 (70점).

곱셈 구구단 부분을 집중적으로 복습할 계획입니다. 다음 주에는 개인 지도 시간을 조금 더 가질게요.

- 정혜진 원장`,
    gradedAt: '2026-03-15T17:30:00'
  }
];

// 갤러리 샘플 이미지 정보 (UI에서 표시할 썸네일)
export interface WorksheetSample {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;       // 실제로는 placeholder 이미지
  resultId: string;           // 대응하는 채점 결과 ID
}

export const worksheetSamples: WorksheetSample[] = [
  {
    id: 'sample-1',
    title: '김민지 - 수학 워크시트',
    description: '5학년 1학기 분수 단원 (p.24)',
    thumbnailUrl: '/samples/worksheet-math-1.jpg',
    resultId: 'grading-001'
  },
  {
    id: 'sample-2',
    title: '이서준 - 영어 워크시트',
    description: 'ArLex Lv.12 과거형 동사 (p.18)',
    thumbnailUrl: '/samples/worksheet-english-1.jpg',
    resultId: 'grading-002'
  },
  {
    id: 'sample-3',
    title: '박지우 - 수학 워크시트',
    description: '3학년 1학기 곱셈 (p.12)',
    thumbnailUrl: '/samples/worksheet-math-2.jpg',
    resultId: 'grading-003'
  }
];

// 채점 결과 조회 헬퍼 함수
export const getGradingResultById = (resultId: string): GradingResult | undefined => {
  return mockGradingSamples.find(result => result.id === resultId);
};

// 샘플에서 채점 결과 조회
export const getGradingResultBySampleId = (sampleId: string): GradingResult | undefined => {
  const sample = worksheetSamples.find(s => s.id === sampleId);
  if (!sample) return undefined;
  return getGradingResultById(sample.resultId);
};
