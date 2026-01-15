// SA 레벨 레슨 데이터 (더미 데이터)
export interface Lesson {
  lessonId: string;
  lessonNumber: number;
  title: string;
  words: Array<{ english: string; korean?: string }>;
  stories: string[];
}

export const SA_LESSONS: Lesson[] = [
  {
    lessonId: 'sa1-1',
    lessonNumber: 1,
    title: 'I Love My Family',
    words: [
      { english: 'father', korean: '아빠' },
      { english: 'mother', korean: '엄마' },
      { english: 'brother', korean: '형/오빠' },
      { english: 'sister', korean: '누나/언니' },
      { english: 'family', korean: '가족' },
    ],
    stories: [
      'I have a small family.',
      'I love my family.',
      'My father is tall.',
      'My mother is kind.',
    ],
  },
  {
    lessonId: 'sa1-2',
    lessonNumber: 2,
    title: 'Look at My Face',
    words: [
      { english: 'face', korean: '얼굴' },
      { english: 'eye', korean: '눈' },
      { english: 'nose', korean: '코' },
      { english: 'mouth', korean: '입' },
      { english: 'ear', korean: '귀' },
    ],
    stories: [
      'Look at my face.',
      'I have two eyes.',
      'I have one nose.',
      'I have one mouth.',
    ],
  },
  {
    lessonId: 'sa1-3',
    lessonNumber: 3,
    title: 'My Body',
    words: [
      { english: 'head', korean: '머리' },
      { english: 'hand', korean: '손' },
      { english: 'foot', korean: '발' },
      { english: 'leg', korean: '다리' },
      { english: 'arm', korean: '팔' },
    ],
    stories: [
      'This is my head.',
      'These are my hands.',
      'These are my feet.',
      'I can move my body.',
    ],
  },
  {
    lessonId: 'sa1-4',
    lessonNumber: 4,
    title: 'Colors Around Me',
    words: [
      { english: 'red', korean: '빨간색' },
      { english: 'blue', korean: '파란색' },
      { english: 'yellow', korean: '노란색' },
      { english: 'green', korean: '초록색' },
      { english: 'color', korean: '색깔' },
    ],
    stories: [
      'I see red.',
      'I see blue.',
      'I see yellow.',
      'I love colors.',
    ],
  },
  {
    lessonId: 'sa1-5',
    lessonNumber: 5,
    title: 'Numbers 1 to 10',
    words: [
      { english: 'one', korean: '하나' },
      { english: 'two', korean: '둘' },
      { english: 'three', korean: '셋' },
      { english: 'four', korean: '넷' },
      { english: 'five', korean: '다섯' },
    ],
    stories: [
      'I can count to five.',
      'One, two, three, four, five.',
      'Numbers are fun.',
    ],
  },
];

// 레벨별 레슨 가져오기 (더미 함수)
export const getLessonsByLevel = (levelCode: string): Lesson[] => {
  // 실제로는 levelCode에 따라 다른 레슨 반환
  // 지금은 SA 레벨만 반환
  if (levelCode.startsWith('SA')) {
    return SA_LESSONS;
  }
  // 다른 레벨은 빈 배열 반환 (나중에 확장)
  return [];
};
