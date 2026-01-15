import React from 'react';

export type ProgressStatus = 'ahead' | 'onTrack' | 'behind';

interface ProgressBadgeProps {
  status: ProgressStatus;
  weeksDiff: number;
  size?: 'sm' | 'md';
}

const ProgressBadge: React.FC<ProgressBadgeProps> = ({ status, weeksDiff, size = 'sm' }) => {
  const baseClasses = size === 'sm' 
    ? 'text-xs px-1.5 py-0.5 rounded-full font-medium inline-flex items-center gap-0.5'
    : 'text-sm px-2 py-1 rounded-full font-medium inline-flex items-center gap-1';

  switch (status) {
    case 'ahead':
      return (
        <span className={`${baseClasses} bg-green-100 text-green-700`}>
          🚀 {weeksDiff}주 선행
        </span>
      );
    case 'behind':
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>
          ⚠️ {weeksDiff}주 지연
        </span>
      );
    case 'onTrack':
    default:
      return (
        <span className={`${baseClasses} bg-blue-100 text-blue-700`}>
          ✅ 정상
        </span>
      );
  }
};

export default ProgressBadge;
