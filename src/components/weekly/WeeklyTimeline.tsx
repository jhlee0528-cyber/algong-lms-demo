/**
 * 주간 타임라인 컴포넌트 (3주 뷰)
 */

import React from 'react';
import { useThreeWeekView } from '../../hooks/useWeeklyPlanning';
import { getPerformanceStatusStyle } from '../../utils/weekHelper';

interface WeeklyTimelineProps {
  studentId: number;
}

const WeeklyTimeline: React.FC<WeeklyTimelineProps> = ({ studentId }) => {
  const { data: threeWeek, isLoading } = useThreeWeekView(studentId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-500">주간 타임라인을 불러오는 중...</div>
      </div>
    );
  }

  if (!threeWeek || !threeWeek.lastWeek || !threeWeek.thisWeek || !threeWeek.nextWeek) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-500">주간 타임라인 데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 3주 타임라인 시각화 */}
      <div className="flex justify-between items-stretch gap-4">
        {/* 지난 주 */}
        <WeekCard 
          title="지난 주"
          data={threeWeek.lastWeek}
          type="past"
        />
        
        {/* 이번 주 */}
        <WeekCard 
          title="이번 주"
          data={threeWeek.thisWeek}
          type="current"
          highlighted
        />
        
        {/* 다음 주 */}
        <WeekCard 
          title="다음 주"
          plan={threeWeek.nextWeek}
          type="future"
        />
      </div>

      {/* 이번 주 상세 진행 현황 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-4 text-lg text-gray-800">이번 주 학습 상세</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">계획 Units</div>
              <div className="text-2xl font-bold text-blue-600">
                {threeWeek.thisWeek?.planned?.totalUnits || 0}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">완료 Units</div>
              <div className="text-2xl font-bold text-green-600">
                {threeWeek.thisWeek?.completed?.units || 0}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">달성률</div>
              <div className="text-2xl font-bold text-purple-600">
                {threeWeek.thisWeek?.unitCompletionRate ? threeWeek.thisWeek.unitCompletionRate.toFixed(0) : 0}%
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">평균 점수</div>
              <div className="text-2xl font-bold text-orange-600">
                {threeWeek.thisWeek?.averageScore ? threeWeek.thisWeek.averageScore.toFixed(0) : 0}점
              </div>
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm font-bold text-gray-800">
                {threeWeek.thisWeek.unitCompletionRate.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${threeWeek.thisWeek?.unitCompletionRate || 0}%` }}
              />
            </div>
          </div>

          {/* 학습 시간 */}
          <div className="mt-4 text-sm text-gray-600">
            총 학습 시간: {threeWeek.thisWeek?.totalStudyTime 
              ? `${Math.floor(threeWeek.thisWeek.totalStudyTime / 60)}시간 ${threeWeek.thisWeek.totalStudyTime % 60}분`
              : '0시간 0분'}
          </div>
        </div>
      </div>
    </div>
  );
};

// 주간 카드 컴포넌트
interface WeekCardProps {
  title: string;
  data?: {
    unitCompletionRate: number;
    completed: { units: number };
    planned: { totalUnits: number };
    performanceStatus: 'excellent' | 'on_track' | 'warning' | 'critical';
  };
  plan?: {
    targetUnits: Array<{ unitId: number; unitTitle: string }>;
  };
  type: 'past' | 'current' | 'future';
  highlighted?: boolean;
}

const WeekCard: React.FC<WeekCardProps> = ({ title, data, plan, type, highlighted }) => {
  const statusStyle = data?.performanceStatus 
    ? getPerformanceStatusStyle(data.performanceStatus)
    : null;

  return (
    <div
      className={`flex-1 rounded-lg p-4 ${
        highlighted
          ? 'bg-blue-50 border-2 border-blue-300 shadow-md'
          : 'bg-gray-50 border border-gray-200'
      }`}
    >
      <h4 className="font-semibold text-center mb-3 text-gray-800">{title}</h4>
      <div className="text-center">
        {type === 'future' ? (
          <>
            <div className="text-2xl font-bold text-green-600">
              {plan?.targetUnits?.length || 0}
            </div>
            <div className="text-sm text-gray-500 mt-1">계획된 Units</div>
          </>
        ) : (
          <>
            <div className="text-2xl font-bold text-gray-800">
              {data?.unitCompletionRate ? data.unitCompletionRate.toFixed(0) : 0}%
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {data?.completed?.units || 0}/{data?.planned?.totalUnits || 0} Units 완료
            </div>
            {statusStyle && (
              <div
                className={`mt-2 text-xs px-2 py-1 rounded inline-block ${statusStyle.bg} ${statusStyle.text}`}
              >
                {statusStyle.label}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WeeklyTimeline;
