/**
 * 액티비티 과제 카드 컴포넌트
 */

import React, { useState } from 'react';
import type { ActivityTask, ActivityType } from '../../types';

interface ActivityTaskCardProps {
  value?: ActivityTask;
  onChange?: (task: ActivityTask | null) => void;
}

const ACTIVITY_TYPES: { value: ActivityType; label: string }[] = [
  { value: 'listening', label: '듣기' },
  { value: 'reading', label: '읽기' },
  { value: 'speaking', label: '말하기' },
  { value: 'writing', label: '쓰기' },
];

const ActivityTaskCard: React.FC<ActivityTaskCardProps> = ({ value, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>(
    value?.activities || []
  );

  const handleActivityToggle = (activity: ActivityType) => {
    const newActivities = selectedActivities.includes(activity)
      ? selectedActivities.filter((a) => a !== activity)
      : [...selectedActivities, activity];

    setSelectedActivities(newActivities);

    if (newActivities.length > 0) {
      onChange?.({ type: 'activity', activities: newActivities });
    } else {
      onChange?.(null);
    }
  };

  const handleSelectAll = () => {
    const allActivities: ActivityType[] = ['listening', 'reading', 'speaking', 'writing'];
    setSelectedActivities(allActivities);
    onChange?.({ type: 'activity', activities: allActivities });
  };

  const handleDeselectAll = () => {
    setSelectedActivities([]);
    onChange?.(null);
  };

  const allSelected = selectedActivities.length === 4;
  const hasSelection = selectedActivities.length > 0;

  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all ${
        hasSelection
          ? 'border-green-500 bg-green-50'
          : 'border-gray-300 bg-white hover:border-gray-400'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📝</span>
          <h4 className="font-semibold text-gray-800">액티비티</h4>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>

      {expanded && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {ACTIVITY_TYPES.map((activity) => (
              <label
                key={activity.value}
                className={`flex items-center gap-2 p-3 rounded border-2 transition-colors cursor-pointer ${
                  selectedActivities.includes(activity.value)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(activity.value)}
                  onChange={() => handleActivityToggle(activity.value)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">{activity.label}</span>
                <span className="text-xs text-gray-500 ml-auto">약 5분</span>
              </label>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <button
              type="button"
              onClick={allSelected ? handleDeselectAll : handleSelectAll}
              className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
            >
              {allSelected ? '전체 해제' : '전체 선택'}
            </button>
            {hasSelection && (
              <span className="text-sm text-gray-600 self-center">
                선택: {selectedActivities.length}개 영역
              </span>
            )}
          </div>
        </div>
      )}

      {!expanded && hasSelection && (
        <div className="text-sm text-gray-600">
          선택된 영역:{' '}
          {selectedActivities
            .map((a) => ACTIVITY_TYPES.find((t) => t.value === a)?.label)
            .join(', ')}
          <span className="ml-2 text-gray-500">
            (총 약 {selectedActivities.length * 5}분)
          </span>
        </div>
      )}
    </div>
  );
};

export default ActivityTaskCard;
