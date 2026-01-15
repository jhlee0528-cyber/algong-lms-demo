import React from 'react';
import type { ViewMode } from '../../types/learningView';

interface Props {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewModeTabs: React.FC<Props> = ({ activeView, onViewChange }) => {
  const tabs: { id: ViewMode; label: string; icon: string }[] = [
    { id: 'unit', label: '단원별', icon: '📚' },
    { id: 'taskType', label: '과제유형별', icon: '📊' },
    { id: 'period', label: '기간별', icon: '📅' },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onViewChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            activeView === tab.id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <span className="mr-1">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ViewModeTabs;
