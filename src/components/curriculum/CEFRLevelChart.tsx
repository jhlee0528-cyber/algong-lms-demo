/**
 * CEFR 레벨 맵핑 차트 컴포넌트
 * 36개 ArLex 레벨을 CEFR 레벨(A1-C2)에 맵핑하여 시각화
 */

import React, { useState } from 'react';

interface CEFRLevelChartProps {
  onLevelClick?: (level: number) => void;
}

interface CEFRLevel {
  code: string;
  name: string;
  levels: number[]; // ArLex levels (e.g., [1, 2, 3, 4, 5, 6])
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

const CEFRLevelChart: React.FC<CEFRLevelChartProps> = ({
  onLevelClick,
}) => {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [selectedCEFR, setSelectedCEFR] = useState<string | null>(null);

  // CEFR 레벨 정의 (36개 레벨을 6개 그룹으로 분할)
  const cefrLevels: CEFRLevel[] = [
    {
      code: 'A1',
      name: 'Beginner',
      levels: [1, 2, 3, 4, 5, 6],
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      description: '기초 단계 - 간단한 단어와 문장 이해',
    },
    {
      code: 'A2',
      name: 'Elementary',
      levels: [7, 8, 9, 10, 11, 12],
      color: 'text-lime-700',
      bgColor: 'bg-lime-50',
      borderColor: 'border-lime-500',
      description: '초급 단계 - 일상 대화 가능',
    },
    {
      code: 'B1',
      name: 'Intermediate',
      levels: [13, 14, 15, 16, 17, 18],
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      description: '중급 단계 - 복잡한 주제 이해',
    },
    {
      code: 'B2',
      name: 'Upper Intermediate',
      levels: [19, 20, 21, 22, 23, 24],
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500',
      description: '중상급 단계 - 전문적인 대화 가능',
    },
    {
      code: 'C1',
      name: 'Advanced',
      levels: [25, 26, 27, 28, 29, 30],
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      description: '고급 단계 - 유창한 의사소통',
    },
    {
      code: 'C2',
      name: 'Proficiency',
      levels: [31, 32, 33, 34, 35, 36],
      color: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
      description: '숙달 단계 - 원어민 수준',
    },
  ];

  const handleLevelClick = (level: number) => {
    if (onLevelClick) {
      onLevelClick(level);
    }
  };

  const handleCEFRClick = (cefrCode: string) => {
    setSelectedCEFR(selectedCEFR === cefrCode ? null : cefrCode);
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📚 알공영어 커리큘럼 — CEFR 레벨 매핑</h2>
        <p className="text-sm text-gray-600">
          알공영어 36단계는 국제 표준 CEFR 레벨에 맞춰 설계되었습니다.
          각 레벨을 클릭하면 상세 학습 목표를 확인할 수 있어요.
        </p>
      </div>

      {/* CEFR 레벨 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {cefrLevels.map((cefr) => {
          const isExpanded = selectedCEFR === cefr.code;

          return (
            <div
              key={cefr.code}
              className={`rounded-xl border-2 transition-all border-gray-200 hover:border-gray-300 ${
                isExpanded ? 'lg:col-span-6' : ''
              }`}
            >
              {/* CEFR 헤더 */}
              <button
                onClick={() => handleCEFRClick(cefr.code)}
                className={`w-full p-4 ${cefr.bgColor} rounded-t-xl transition-colors hover:opacity-90`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className={`text-2xl font-bold ${cefr.color}`}>{cefr.code}</div>
                    <div className="text-xs text-gray-600 mt-1">{cefr.name}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Lv.{cefr.levels[0]}-{cefr.levels[cefr.levels.length - 1]}
                  </div>
                </div>
                {isExpanded && (
                  <div className="mt-3 text-sm text-gray-700 text-left">
                    {cefr.description}
                  </div>
                )}
              </button>

              {/* 레벨 그리드 (확장 시에만 표시) */}
              {isExpanded && (
                <div className="p-4 bg-white border-t-2 border-gray-100">
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {cefr.levels.map((level) => {
                      const isHovered = level === hoveredLevel;

                      return (
                        <button
                          key={level}
                          onClick={() => handleLevelClick(level)}
                          onMouseEnter={() => setHoveredLevel(level)}
                          onMouseLeave={() => setHoveredLevel(null)}
                          className={`
                            relative p-4 rounded-lg border-2 transition-all
                            ${
                              isHovered
                                ? `${cefr.bgColor} ${cefr.borderColor}`
                                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <div className={`text-lg font-bold ${cefr.color}`}>
                            {level}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-medium">💡 사용 방법:</span>
          <span>CEFR 레벨을 클릭하면 상세 레벨을 확인할 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
};

export default CEFRLevelChart;
