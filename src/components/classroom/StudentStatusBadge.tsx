import React from 'react';
import { StudentStatus, STUDENT_STATUS_CONFIG } from '../../types/classroom';

interface StudentStatusBadgeProps {
  status: StudentStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const StudentStatusBadge: React.FC<StudentStatusBadgeProps> = ({
  status,
  showLabel = true,
  size = 'md',
}) => {
  const config = STUDENT_STATUS_CONFIG[status];

  return (
    <div className={`inline-flex items-center gap-1.5 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      <span
        className={`${size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'} rounded-full ${config.dotColor} ${
          status === 'learning' ? 'animate-pulse' : ''
        }`}
      />
      {showLabel && <span className={config.color}>{config.label}</span>}
    </div>
  );
};

export default StudentStatusBadge;
