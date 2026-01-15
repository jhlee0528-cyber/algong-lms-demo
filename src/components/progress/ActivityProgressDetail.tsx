/**
 * 액티비티 상세 진행률 컴포넌트
 * 영역별 점수/완료율 표시
 */

import React from 'react';
import { useStudentProgress } from '../../hooks/useStudentProgress';
import type { ActivityType } from '../../types';

interface ActivityProgressDetailProps {
  studentId: number;
  missionId?: number;
  startDate?: string;
  endDate?: string;
}

const ActivityProgressDetail: React.FC<ActivityProgressDetailProps> = ({
  studentId,
  missionId,
  startDate,
  endDate,
}) => {
  const { data, isLoading } = useStudentProgress({
    student_id: studentId,
    mission_id: missionId,
    progress_type: 'activity',
    start_date: startDate,
    end_date: endDate,
  });

  if (isLoading) {
    return <div className="text-center py-4 text-gray-500">로딩 중...</div>;
  }

  const activityProgress = data?.progress.filter((p) => p.progress_type === 'activity') || [];

  // 영역별 통계
  const activityStats: {
    [key in ActivityType]: { completed: number; total: number; avgScore: number; scores: number[] };
  } = {
    listening: { completed: 0, total: 0, avgScore: 0, scores: [] },
    reading: { completed: 0, total: 0, avgScore: 0, scores: [] },
    speaking: { completed: 0, total: 0, avgScore: 0, scores: [] },
    writing: { completed: 0, total: 0, avgScore: 0, scores: [] },
  };

  activityProgress.forEach((progress) => {
    if (progress.activity_type) {
      const activityType = progress.activity_type as ActivityType;
      if (activityStats[activityType]) {
        activityStats[activityType].total++;
        if (progress.completed_at) {
          activityStats[activityType].completed++;
          if (progress.score) {
            activityStats[activityType].scores.push(progress.score);
          }
        }
      }
    }
  });

  // 평균 점수 계산
  Object.keys(activityStats).forEach((key) => {
    const stats = activityStats[key as ActivityType];
    if (stats.scores.length > 0) {
      stats.avgScore = Math.round(
        stats.scores.reduce((sum, score) => sum + score, 0) / stats.scores.length
      );
    }
  });

  const activityLabels: { [key in ActivityType]: string } = {
    listening: '듣기',
    reading: '읽기',
    speaking: '말하기',
    writing: '쓰기',
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">영역별 완료율 및 점수</h4>
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(activityStats) as ActivityType[]).map((activityType) => {
          const stats = activityStats[activityType];
          const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

          return (
            <div key={activityType} className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {activityLabels[activityType]}
                </span>
                <span className="text-xs text-gray-600">
                  {stats.completed}/{stats.total} 완료
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">완료율: {completionRate.toFixed(0)}%</span>
                {stats.avgScore > 0 && (
                  <span className="text-green-600 font-semibold">평균 점수: {stats.avgScore}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityProgressDetail;
