/**
 * 영어도서관 통계 컴포넌트
 * 우리 교습소 독서 현황
 */

import React from 'react';
import { libraryStats } from '../../data/mockLibrary';

const LibraryStats: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>📊</span>
        <span>우리 교습소 독서 현황</span>
      </h3>

      <div className="space-y-3">
        {/* 이번 달 읽은 책 */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📖</div>
            <div>
              <div className="text-sm text-gray-600">이번 달 읽은 책</div>
              <div className="text-xl font-bold text-blue-600">
                {libraryStats.totalReadThisMonth}권
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {libraryStats.totalStudents}명 학생
          </div>
        </div>

        {/* 가장 인기 있는 책 */}
        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="text-sm text-gray-600">가장 인기 있는 책</div>
              <div className="text-base font-bold text-amber-600">
                "{libraryStats.mostPopularBook}"
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {libraryStats.mostPopularReadCount}명 읽음
          </div>
        </div>

        {/* 평균 독서 시간 */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⏰</div>
            <div>
              <div className="text-sm text-gray-600">평균 독서 시간</div>
              <div className="text-xl font-bold text-green-600">
                하루 {libraryStats.averageReadingMinutes}분
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 레벨별 분포 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">레벨별 보유 도서</h4>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(libraryStats.levelDistribution).map(([level, count]) => (
            <div key={level} className="text-center">
              <div className="text-xs text-gray-500 mb-1">Lv.{level}</div>
              <div className="text-lg font-bold text-indigo-600">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryStats;
