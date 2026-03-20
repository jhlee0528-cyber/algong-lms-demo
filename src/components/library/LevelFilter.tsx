/**
 * 레벨 필터 컴포넌트
 * Level K~6 탭 필터
 */

import React from 'react';
import { levelColors } from '../../data/mockLibrary';

interface LevelFilterProps {
  selectedLevel: string | null;
  onLevelChange: (level: string | null) => void;
}

const levels = ['K', '1', '2', '3', '4', '5', '6'];

const LevelFilter: React.FC<LevelFilterProps> = ({ selectedLevel, onLevelChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">레벨별 둘러보기</h3>
      <div className="flex flex-wrap gap-2">
        {/* 전체 버튼 */}
        <button
          onClick={() => onLevelChange(null)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            selectedLevel === null
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          전체
        </button>

        {/* 레벨 버튼들 */}
        {levels.map((level) => {
          const colors = levelColors[level];
          const isSelected = selectedLevel === level;

          return (
            <button
              key={level}
              onClick={() => onLevelChange(level)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border-2 ${
                isSelected
                  ? `${colors.bg} ${colors.text} ${colors.border} shadow-md scale-105`
                  : `bg-white ${colors.text} border-gray-200 hover:${colors.bg} hover:scale-105`
              }`}
            >
              Level {level}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelFilter;
