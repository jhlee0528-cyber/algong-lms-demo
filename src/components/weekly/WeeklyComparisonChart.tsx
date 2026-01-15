/**
 * 주간 비교 차트 컴포넌트
 */

import React from 'react';
import type { ThreeWeekView } from '../../types/weekly';

interface WeeklyComparisonChartProps {
  data: ThreeWeekView;
}

const WeeklyComparisonChart: React.FC<WeeklyComparisonChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h4 className="font-semibold mb-4 text-lg text-gray-800">주간 추이 비교</h4>
      <div className="space-y-4">
        {/* 달성률 비교 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">단원 달성률</span>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">지난 주</div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-blue-400 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${data.lastWeek.unitCompletionRate}%` }}
                >
                  {data.lastWeek.unitCompletionRate.toFixed(0)}%
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">이번 주</div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-blue-500 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${data.thisWeek.unitCompletionRate}%` }}
                >
                  {data.thisWeek.unitCompletionRate.toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 평균 점수 비교 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">평균 점수</span>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">지난 주</div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-purple-400 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${data.lastWeek.averageScore}%` }}
                >
                  {data.lastWeek.averageScore.toFixed(0)}점
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">이번 주</div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-purple-500 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                  style={{ width: `${data.thisWeek.averageScore}%` }}
                >
                  {data.thisWeek.averageScore.toFixed(0)}점
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyComparisonChart;
