/**
 * AI 자동채점 더미 데이터
 * PoC 검증 결과를 기반으로 한 샘플 데이터
 */

export interface AIGradingQuestion {
  id: number;
  type: 'word' | 'sentence' | 'essay';
  question: string;
  studentAnswer: string;
  correctAnswer: string | null;
  isCorrect: boolean;
  score: number;
  feedback: string | null;
}

export interface AIGradingSummary {
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export interface AIGradingResult {
  studentName: string;
  grade: number;
  subject: string;
  totalQuestions: number;
  correctCount: number;
  totalScore: number;
  aiModel: string;
  questions: AIGradingQuestion[];
  aiSummary: AIGradingSummary;
}

export const sampleGradingResult: AIGradingResult = {
  studentName: '김민지',
  grade: 5,
  subject: '초등 영어',
  totalQuestions: 6,
  correctCount: 5,
  totalScore: 83,
  aiModel: 'Claude Sonnet 4 (멀티모달)',
  questions: [
    {
      id: 1,
      type: 'word',
      question: 'apple의 철자를 쓰시오',
      studentAnswer: 'apple',
      correctAnswer: 'apple',
      isCorrect: true,
      score: 100,
      feedback: null,
    },
    {
      id: 2,
      type: 'word',
      question: 'banana의 철자를 쓰시오',
      studentAnswer: 'banana',
      correctAnswer: 'banana',
      isCorrect: true,
      score: 100,
      feedback: null,
    },
    {
      id: 3,
      type: 'word',
      question: 'elephant의 철자를 쓰시오',
      studentAnswer: 'elefant',
      correctAnswer: 'elephant',
      isCorrect: false,
      score: 0,
      feedback: "'ph'가 'f' 소리라는 점을 복습하세요. elephant, phone, photo 등의 단어에서 ph는 항상 f 소리입니다.",
    },
    {
      id: 4,
      type: 'sentence',
      question: '빈칸을 채우시오: I ___ a student.',
      studentAnswer: 'am',
      correctAnswer: 'am',
      isCorrect: true,
      score: 100,
      feedback: null,
    },
    {
      id: 5,
      type: 'sentence',
      question: '빈칸을 채우시오: She ___ playing soccer.',
      studentAnswer: 'is',
      correctAnswer: 'is',
      isCorrect: true,
      score: 100,
      feedback: null,
    },
    {
      id: 6,
      type: 'essay',
      question: 'What did you do last weekend? (3문장 이상)',
      studentAnswer: 'Last weekend I went to the park. I played with my friend. We eat ice cream.',
      correctAnswer: null,
      isCorrect: true,
      score: 85,
      feedback: "문법이 대체로 정확하지만, 'We eat ice cream'은 과거시제 'We ate ice cream'이 올바릅니다. 시제 표현을 보강하세요.",
    },
  ],
  aiSummary: {
    strengths: ['기본 어휘력 탄탄', '문장 구성력 양호', 'Be동사 활용 정확'],
    weaknesses: ['철자법 (ph/f 혼동)', '과거시제 불규칙 동사'],
    recommendation: 'Spark B4 철자 규칙 복습, Motivate A5 과거시제 집중',
  },
};

// 15명의 학생 이름 (LearningStatusPage와 동일)
export const availableStudents = [
  { id: 1, name: '김민수', grade: 2, level: 'SA3' },
  { id: 2, name: '이지은', grade: 3, level: 'SB2' },
  { id: 3, name: '박준호', grade: 1, level: 'SA1' },
  { id: 4, name: '최서연', grade: 3, level: 'SB4' },
  { id: 5, name: '정현우', grade: 2, level: 'SA5' },
  { id: 6, name: '강소영', grade: 3, level: 'SB3' },
  { id: 7, name: '윤도현', grade: 1, level: 'SA2' },
  { id: 8, name: '임수진', grade: 2, level: 'SA6' },
  { id: 9, name: '한지훈', grade: 3, level: 'SB5' },
  { id: 10, name: '오나은', grade: 2, level: 'SA4' },
  { id: 11, name: '신동욱', grade: 3, level: 'SB1' },
  { id: 12, name: '배미래', grade: 1, level: 'SA1' },
  { id: 13, name: '조성민', grade: 2, level: 'SA3' },
  { id: 14, name: '홍예린', grade: 3, level: 'SB6' },
  { id: 15, name: '송태현', grade: 2, level: 'SA5' },
];
