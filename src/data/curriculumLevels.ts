import { LevelInfo, LevelCode, LevelSeries, LevelGroup, Domain } from '../types/smartree';

// 레벨 시리즈 → 그룹 매핑
export const SERIES_TO_GROUP: Record<LevelSeries, LevelGroup> = {
  SA: 'Spark',
  SB: 'Spark',
  MA: 'Motivate',
  MB: 'Motivate',
  AA: 'Activate',
  AB: 'Activate',
};

// 시리즈 순서
export const SERIES_ORDER: LevelSeries[] = ['SA', 'SB', 'MA', 'MB', 'AA', 'AB'];

// 전체 36레벨 생성
export const ALL_LEVELS: LevelInfo[] = SERIES_ORDER.flatMap((series, seriesIndex) =>
  [1, 2, 3, 4, 5, 6].map((stage) => ({
    code: `${series}${stage}` as LevelCode,
    series,
    stage: stage as 1 | 2 | 3 | 4 | 5 | 6,
    group: SERIES_TO_GROUP[series],
    name: `${SERIES_TO_GROUP[series]} ${series.charAt(1)} - Level ${stage}`,
    order: seriesIndex * 6 + (stage - 1),
  }))
);

// 그룹별 레벨 묶음
export const LEVELS_BY_GROUP: Record<LevelGroup, LevelInfo[]> = {
  Spark: ALL_LEVELS.filter((l) => l.group === 'Spark'),
  Motivate: ALL_LEVELS.filter((l) => l.group === 'Motivate'),
  Activate: ALL_LEVELS.filter((l) => l.group === 'Activate'),
};

// 5개 영역
export const DOMAINS: Domain[] = ['Phonics', 'Speaking', 'Reading', 'Grammar', 'Writing'];

// 영역별 아이콘 & 색상
export const DOMAIN_CONFIG: Record<Domain, { icon: string; color: string; bgColor: string }> = {
  Phonics: { icon: '🔤', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  Speaking: { icon: '🎤', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  Reading: { icon: '📖', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  Grammar: { icon: '📝', color: 'text-green-700', bgColor: 'bg-green-100' },
  Writing: { icon: '✍️', color: 'text-pink-700', bgColor: 'bg-pink-100' },
};

// ⭐ 영역별 포함 레벨 정의 (핵심!)
// - Phonics: SA1~6, SB1~6, MA1~6 (18레벨) - Starter 전체 + Main A
// - Speaking: 전체 36레벨
// - Reading: SA1~6, SB1~6, MB1~6 (18레벨) - Starter 전체 + Main B  
// - Grammar: MA1~6, AA1~6, AB1~6 (18레벨) - Main A + Advanced 전체
// - Writing: MB1~6, AA1~6, AB1~6 (18레벨) - Main B + Advanced 전체

export const DOMAIN_LEVELS: Record<Domain, LevelSeries[]> = {
  Phonics: ['SA', 'SB', 'MA'],           // 18레벨
  Speaking: ['SA', 'SB', 'MA', 'MB', 'AA', 'AB'],  // 36레벨 전체
  Reading: ['SA', 'SB', 'MB'],           // 18레벨
  Grammar: ['MA', 'AA', 'AB'],           // 18레벨
  Writing: ['MB', 'AA', 'AB'],           // 18레벨
};

// 영역별 레벨 목록 가져오기
export const getLevelsForDomain = (domain: Domain): LevelInfo[] => {
  const allowedSeries = DOMAIN_LEVELS[domain];
  return ALL_LEVELS.filter((level) => allowedSeries.includes(level.series));
};

// 특정 레벨이 특정 영역에 포함되는지 확인
export const isLevelInDomain = (levelCode: LevelCode, domain: Domain): boolean => {
  const series = levelCode.slice(0, 2) as LevelSeries;
  return DOMAIN_LEVELS[domain].includes(series);
};

// 영역별 레벨 수
export const DOMAIN_LEVEL_COUNT: Record<Domain, number> = {
  Phonics: 18,
  Speaking: 36,
  Reading: 18,
  Grammar: 18,
  Writing: 18,
};

// 그룹별 아이콘
export const GROUP_CONFIG: Record<LevelGroup, { icon: string; color: string }> = {
  Spark: { icon: '🌱', color: 'text-green-600' },
  Motivate: { icon: '🌿', color: 'text-emerald-600' },
  Activate: { icon: '🌳', color: 'text-teal-600' },
};
