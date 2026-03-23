/**
 * 필터 + 뷰 전환 바
 * 신호등 필터 + 표/카드 뷰 토글
 */

import React from 'react';

type FilterStatus = 'all' | 'good' | 'warning' | 'delayed';
type ViewMode = 'table' | 'card';

interface FilterBarProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onBulkSend: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
  currentView,
  onViewChange,
  onBulkSend,
}) => {
  const filterButtons: Array<{ id: FilterStatus; label: string; icon?: string }> = [
    { id: 'all', label: '전체' },
    { id: 'good', label: '정상', icon: '🟢' },
    { id: 'warning', label: '주의', icon: '🟡' },
    { id: 'delayed', label: '관리필요', icon: '🔴' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* 왼쪽: 필터 버튼 */}
        <div className="flex flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hide">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => onFilterChange(btn.id)}
              className={`
                px-2.5 md:px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap shrink-0
                ${currentFilter === btn.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {btn.icon && <span className="mr-1">{btn.icon}</span>}
              {btn.label}
            </button>
          ))}
        </div>

        {/* 오른쪽: 뷰 전환 + 전체발송 */}
        <div className="flex items-center gap-2 shrink-0">
          {/* 뷰 전환 토글 */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewChange('table')}
              className={`
                px-2.5 md:px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap
                ${currentView === 'table'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <span className="mr-1">📊</span>
              <span className="hidden sm:inline">표</span>
            </button>
            <button
              onClick={() => onViewChange('card')}
              className={`
                px-2.5 md:px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap
                ${currentView === 'card'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <span className="mr-1">🎴</span>
              <span className="hidden sm:inline">카드</span>
            </button>
          </div>

          {/* 전체발송 버튼 */}
          <button
            onClick={onBulkSend}
            className="px-3 md:px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
          >
            전체발송
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
