/**
 * SMARTree 레벨 표시 컴포넌트
 * 5개 영역별 레벨을 시각화하여 표시
 */

import React from 'react';

export interface SmartreeLevels {
  phonics: number;
  speaking: number;
  reading: number;
  writing: number;
  grammar: number;
}

interface SmartreeLevelDisplayProps {
  levels: SmartreeLevels;
  showDetails?: boolean;
  studentName?: string;
}

const AREA_NAMES = {
  phonics: 'Phonics',
  speaking: 'Speaking',
  reading: 'Reading',
  writing: 'Writing',
  grammar: 'Grammar',
} as const;

const AREA_ICONS = {
  phonics: '🔤',
  speaking: '🗣️',
  reading: '📖',
  writing: '✍️',
  grammar: '📝',
} as const;

const AREA_COLORS = {
  phonics: 'bg-purple-100 text-purple-700 border-purple-300',
  speaking: 'bg-blue-100 text-blue-700 border-blue-300',
  reading: 'bg-green-100 text-green-700 border-green-300',
  writing: 'bg-orange-100 text-orange-700 border-orange-300',
  grammar: 'bg-pink-100 text-pink-700 border-pink-300',
} as const;

export const SmartreeLevelDisplay: React.FC<SmartreeLevelDisplayProps> = ({
  levels,
  showDetails = true,
  studentName,
}) => {
  const avgLevel = Math.round(
    (levels.phonics +
      levels.speaking +
      levels.reading +
      levels.writing +
      levels.grammar) /
      5
  );

  const getLevelColor = (level: number): string => {
    if (level >= 30) return 'text-green-600';
    if (level >= 20) return 'text-blue-600';
    if (level >= 10) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getLevelProgress = (level: number): number => {
    return (level / 36) * 100;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">
            🎯 SMARTree 레벨 {studentName && `(${studentName})`}
          </h3>
          <div className="text-right">
            <div className="text-sm text-gray-600">평균 레벨</div>
            <div className={`text-2xl font-bold ${getLevelColor(avgLevel)}`}>
              Level {avgLevel}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {(Object.keys(levels) as Array<keyof SmartreeLevels>).map((area) => {
            const level = levels[area];
            const progress = getLevelProgress(level);

            return (
              <div
                key={area}
                className={`p-4 rounded-lg border-2 ${AREA_COLORS[area]}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{AREA_ICONS[area]}</span>
                    <span className="font-semibold">{AREA_NAMES[area]}</span>
                  </div>
                  <span className={`text-xl font-bold ${getLevelColor(level)}`}>
                    {level}
                  </span>
                </div>
                {showDetails && (
                  <div className="mt-2">
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          progress >= 80
                            ? 'bg-green-500'
                            : progress >= 50
                            ? 'bg-blue-500'
                            : progress >= 30
                            ? 'bg-yellow-500'
                            : 'bg-orange-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {progress.toFixed(1)}% 완료 (36레벨 중)
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
