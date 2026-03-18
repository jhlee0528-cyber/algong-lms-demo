// 이번 주 학습 현황 위젯
import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { getStudentStats } from '../../data/mockStudents';

const WeeklyStatsWidget: React.FC = () => {
  const { weeklyStats } = useDemoStore();
  const studentStats = getStudentStats();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 이번 주 학습 현황</h3>

      <div className="space-y-4">
        {/* 채점 완료율 */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">채점 완료율</span>
            <span className="font-semibold text-blue-600">
              {weeklyStats.gradingCompletionRate}%
              <span className="text-xs text-green-600 ml-1">▲ 12%</span>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${weeklyStats.gradingCompletionRate}%` }}
            />
          </div>
        </div>

        {/* 평균 진도 */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">평균 진도</span>
          <span className="font-semibold text-gray-800">{weeklyStats.averageLevel}</span>
        </div>

        {/* 학부모 소통 */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">학부모 소통</span>
          <span className="font-semibold text-gray-800">주 {weeklyStats.communicationFrequency}회</span>
        </div>

        {/* 전체 학생 진도 현황 */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">전체 학생 진도 현황</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">순조로움</span>
              </div>
              <span className="font-semibold text-gray-800">{studentStats.goodStatus}명</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-600">주의 필요</span>
              </div>
              <span className="font-semibold text-gray-800">{studentStats.warningStatus}명</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-gray-600">지연</span>
              </div>
              <span className="font-semibold text-gray-800">{studentStats.delayedStatus}명</span>
            </div>
          </div>
        </div>

        {/* 주간 리포트 보기 버튼 */}
        <button
          onClick={() => window.location.href = '/reports/communication'}
          className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          주간 리포트 보기 →
        </button>
      </div>
    </div>
  );
};

export default WeeklyStatsWidget;
