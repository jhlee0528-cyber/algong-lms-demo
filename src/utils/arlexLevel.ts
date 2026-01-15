/**
 * ArLex 레벨 관련 유틸리티 함수
 * 36레벨 체계: SA(Spark A1~6), SB(Spark B1~6), MA(Motivate A1~6), MB(Motivate B1~6), AA(Activate A1~6), AB(Activate B1~6)
 */

export type ArLexLevelCode = 
  | 'SA1' | 'SA2' | 'SA3' | 'SA4' | 'SA5' | 'SA6'
  | 'SB1' | 'SB2' | 'SB3' | 'SB4' | 'SB5' | 'SB6'
  | 'MA1' | 'MA2' | 'MA3' | 'MA4' | 'MA5' | 'MA6'
  | 'MB1' | 'MB2' | 'MB3' | 'MB4' | 'MB5' | 'MB6'
  | 'AA1' | 'AA2' | 'AA3' | 'AA4' | 'AA5' | 'AA6'
  | 'AB1' | 'AB2' | 'AB3' | 'AB4' | 'AB5' | 'AB6';

export interface ArLexLevelInfo {
  code: ArLexLevelCode;
  number: number; // 1-36
  series: 'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB';
  subLevel: number; // 1-6
  displayName: string;
}

/**
 * 레벨 번호(1-36)를 ArLex 레벨 코드로 변환
 */
export function levelNumberToCode(level: number): ArLexLevelCode {
  if (level < 1 || level > 36) {
    return 'SA1'; // 기본값
  }

  const seriesIndex = Math.floor((level - 1) / 6);
  const subLevel = ((level - 1) % 6) + 1;

  const seriesCodes: Array<'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB'> = [
    'SA', 'SB', 'MA', 'MB', 'AA', 'AB'
  ];

  const series = seriesCodes[seriesIndex];
  return `${series}${subLevel}` as ArLexLevelCode;
}

/**
 * ArLex 레벨 코드를 레벨 번호(1-36)로 변환
 */
export function levelCodeToNumber(code: ArLexLevelCode): number {
  const series = code.substring(0, 2) as 'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB';
  const subLevel = parseInt(code.substring(2), 10);

  const seriesMap: Record<'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB', number> = {
    SA: 0,
    SB: 6,
    MA: 12,
    MB: 18,
    AA: 24,
    AB: 30,
  };

  return seriesMap[series] + subLevel;
}

/**
 * 레벨 번호로 레벨 정보 가져오기
 */
export function getLevelInfo(level: number): ArLexLevelInfo {
  const code = levelNumberToCode(level);
  const series = code.substring(0, 2) as 'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB';
  const subLevel = parseInt(code.substring(2), 10);

  const seriesNames: Record<'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB', string> = {
    SA: 'Spark A',
    SB: 'Spark B',
    MA: 'Motivate A',
    MB: 'Motivate B',
    AA: 'Activate A',
    AB: 'Activate B',
  };

  return {
    code,
    number: level,
    series,
    subLevel,
    displayName: `${seriesNames[series]}${subLevel}`,
  };
}

/**
 * 레벨 코드로 레벨 정보 가져오기
 */
export function getLevelInfoByCode(code: ArLexLevelCode): ArLexLevelInfo {
  const level = levelCodeToNumber(code);
  return getLevelInfo(level);
}

/**
 * 레벨 표시 형식 (예: "SA1" 또는 "1")
 */
export function formatLevel(level: number, format: 'code' | 'number' | 'full' = 'code'): string {
  const info = getLevelInfo(level);
  
  switch (format) {
    case 'code':
      return info.code;
    case 'number':
      return `${level}`;
    case 'full':
      return info.displayName;
    default:
      return info.code;
  }
}

/**
 * 레벨 코드에 따른 색상 반환
 * 시리즈별로 다른 색상 적용 (시인성 향상)
 */
export function getLevelColor(code: ArLexLevelCode): string {
  const series = code.substring(0, 2) as 'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB';
  
  const colorMap: Record<'SA' | 'SB' | 'MA' | 'MB' | 'AA' | 'AB', string> = {
    SA: '#3B82F6', // 밝은 파란색 (Spark A - 초급)
    SB: '#06B6D4', // 청록색/시안 (Spark B)
    MA: '#10B981', // 초록색 (Motivate A - 중급)
    MB: '#F59E0B', // 주황색 (Motivate B)
    AA: '#F97316', // 오렌지색 (Activate A - 고급)
    AB: '#EF4444', // 빨간색 (Activate B - 최고급)
  };
  
  return colorMap[series];
}

/**
 * 레벨 번호로 색상 가져오기
 */
export function getLevelColorByNumber(level: number): string {
  const code = levelNumberToCode(level);
  return getLevelColor(code);
}
