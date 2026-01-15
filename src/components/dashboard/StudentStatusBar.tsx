/**
 * 학생 상태 인디케이터 바 컴포넌트
 * 전체 학생 상태를 세그먼트 바와 뱃지로 표시
 */

import React from 'react';
import type { StudentWithStats } from '../progress/StudentListTable';

interface StudentStatusBarProps {
  students: StudentWithStats[];
  onStatusClick: (status: 'excellent' | 'normal' | 'warning' | 'critical') => void;
  activeStatus: string | null;
}

type StudentStatus = 'excellent' | 'normal' | 'warning' | 'critical';

const statusConfig = {
  excellent: {
    icon: '🏆',
    label: '우수',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-500',
  },
  normal: {
    icon: '✅',
    label: '정상',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  warning: {
    icon: '⚠️',
    label: '주의',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-500',
  },
  critical: {
    icon: '🔴',
    label: '미흡',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-500',
  },
};

const getStudentStatus = (student: StudentWithStats): StudentStatus => {
  // 주간 상태가 있으면 우선 사용
  if (student.weeklyStatus) {
    return student.weeklyStatus;
  }
  
  const { learningProgress, missionProgress = learningProgress, accuracyRate } = student;
  
  // 달성률 = (학습 진행률 + 미션 진행률) / 2
  const achievementRate = (learningProgress + missionProgress) / 2;

  // 우수: 달성률 100%, 정답률 90% 이상
  if (achievementRate >= 100 && accuracyRate >= 90) {
    return 'excellent';
  }
  
  // 정상: 달성률 70-99%, 정답률 70-89%
  if (achievementRate >= 70 && achievementRate < 100 && accuracyRate >= 70 && accuracyRate < 90) {
    return 'normal';
  }
  
  // 주의: 달성률 50-69%, 정답률 50-69%
  if (achievementRate >= 50 && achievementRate < 70 && accuracyRate >= 50 && accuracyRate < 70) {
    return 'warning';
  }
  
  // 미흡: 달성률 50% 미만 또는 정답률 50% 미만
  if (achievementRate < 50 || accuracyRate < 50) {
    return 'critical';
  }
  
  // 위 조건에 해당하지 않는 경우
  if (achievementRate >= 70) {
    return 'normal';
  }
  return 'warning';
};

const StudentStatusBar: React.FC<StudentStatusBarProps> = ({
  students,
  onStatusClick,
  activeStatus,
}) => {
  // 학생 상태별 분류
  const statusCounts = React.useMemo(() => {
    const counts: Record<StudentStatus, number> = {
      excellent: 0,
      normal: 0,
      warning: 0,
      critical: 0,
    };

    students.forEach((student) => {
      const status = getStudentStatus(student);
      counts[status]++;
    });

    return counts;
  }, [students]);

  const totalStudents = students.length;

  // 각 상태의 비율 계산
  const statusRatios = React.useMemo(() => {
    if (totalStudents === 0) {
      return {
        excellent: 0,
        normal: 0,
        warning: 0,
        critical: 0,
      };
    }

    return {
      excellent: (statusCounts.excellent / totalStudents) * 100,
      normal: (statusCounts.normal / totalStudents) * 100,
      warning: (statusCounts.warning / totalStudents) * 100,
      critical: (statusCounts.critical / totalStudents) * 100,
    };
  }, [statusCounts, totalStudents]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-700 mb-2">📊 학생 현황</h3>
        {/* 세그먼트 프로그레스 바 */}
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden flex">
          {statusRatios.excellent > 0 && (
            <div
              className={`${statusConfig.excellent.color} transition-all duration-300 ease-out`}
              style={{ width: `${statusRatios.excellent}%` }}
              title={`우수: ${statusCounts.excellent}명`}
            />
          )}
          {statusRatios.normal > 0 && (
            <div
              className={`${statusConfig.normal.color} transition-all duration-300 ease-out`}
              style={{ width: `${statusRatios.normal}%` }}
              title={`정상: ${statusCounts.normal}명`}
            />
          )}
          {statusRatios.warning > 0 && (
            <div
              className={`${statusConfig.warning.color} transition-all duration-300 ease-out`}
              style={{ width: `${statusRatios.warning}%` }}
              title={`주의: ${statusCounts.warning}명`}
            />
          )}
          {statusRatios.critical > 0 && (
            <div
              className={`${statusConfig.critical.color} transition-all duration-300 ease-out`}
              style={{ width: `${statusRatios.critical}%` }}
              title={`미흡: ${statusCounts.critical}명`}
            />
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">{totalStudents}명</div>
      </div>

      {/* 상태 뱃지 */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(statusConfig) as StudentStatus[]).map((status) => {
          const config = statusConfig[status];
          const count = statusCounts[status];
          const isActive = activeStatus === status;
          const isDisabled = count === 0;

          return (
            <button
              key={status}
              onClick={() => !isDisabled && onStatusClick(status)}
              disabled={isDisabled}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-150 ease-in-out
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                ${isActive ? `${config.bgLight} ${config.textColor} ring-2 ${config.borderColor} ring-offset-2` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
              aria-label={`${config.label} 학생 ${count}명, 클릭하여 목록 보기`}
            >
              <span className="text-base">{config.icon}</span>
              <span>{config.label}</span>
              <span className={`font-bold ${isActive ? config.textColor : 'text-gray-600'}`}>
                {count}명
              </span>
              {isActive && <span className="text-xs">▲</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StudentStatusBar;
