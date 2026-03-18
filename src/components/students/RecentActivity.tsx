// 최근 학습 활동 타임라인 컴포넌트
import React from 'react';
import { RecentActivity as ActivityType } from '../../data/mockStudents';

interface RecentActivityProps {
  activities: ActivityType[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityColor = (type: ActivityType['type']) => {
    switch (type) {
      case 'grading':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'communication':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'attendance':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 0) return '오늘';
    if (diff === 1) return '어제';
    if (diff < 7) return `${diff}일 전`;

    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 최근 학습 활동 (7일)</h3>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-3">
              {/* 타임라인 라인 */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <span className="text-sm">{activity.icon}</span>
                </div>
                {index < activities.length - 1 && (
                  <div className="w-0.5 flex-grow bg-gray-200 my-1" />
                )}
              </div>

              {/* 활동 내용 */}
              <div className="flex-grow pb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-800">{activity.description}</p>
                  <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(activity.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>최근 활동이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
