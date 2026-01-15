/**
 * 학생 상태 패널 컴포넌트
 * 선택된 상태의 학생 목록을 카드 그리드로 표시
 */

import React, { useEffect } from 'react';
import type { StudentWithStats } from '../progress/StudentListTable';
import { formatLevel, getLevelColorByNumber } from '../../utils/arlexLevel';

interface StudentStatusPanelProps {
  status: 'excellent' | 'normal' | 'warning' | 'critical';
  students: StudentWithStats[];
  onClose: () => void;
  onStudentClick: (studentId: number) => void;
}

const statusConfig = {
  excellent: {
    icon: '🏆',
    label: '우수',
    color: 'text-green-700',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-500',
  },
  normal: {
    icon: '✅',
    label: '정상',
    color: 'text-blue-700',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-500',
  },
  warning: {
    icon: '⚠️',
    label: '주의',
    color: 'text-yellow-700',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-500',
  },
  critical: {
    icon: '🔴',
    label: '미흡',
    color: 'text-red-700',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-500',
  },
};

const getStudentStatus = (student: StudentWithStats): 'excellent' | 'normal' | 'warning' | 'critical' => {
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

const StudentStatusPanel: React.FC<StudentStatusPanelProps> = ({
  status,
  students,
  onClose,
  onStudentClick,
}) => {
  const config = statusConfig[status];

  // 해당 상태의 학생만 필터링
  const filteredStudents = React.useMemo(() => {
    return students.filter((student) => getStudentStatus(student) === status);
  }, [students, status]);

  // ESC 키로 패널 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (filteredStudents.length === 0) {
    return null;
  }

  return (
    <div
      className={`
        mt-3 rounded-lg border-2 ${config.borderColor} ${config.bgLight}
        overflow-hidden transition-all duration-300 ease-out
        animate-in slide-in-from-top-2
      `}
      role="region"
      aria-labelledby={`status-panel-${status}`}
    >
      {/* 헤더 */}
      <div className={`flex items-center justify-between p-3 ${config.bgLight} border-b ${config.borderColor}`}>
        <h4 id={`status-panel-${status}`} className={`font-semibold ${config.color} flex items-center gap-2`}>
          <span className="text-lg">{config.icon}</span>
          {config.label} 학생 ({filteredStudents.length}명)
        </h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors p-1"
          aria-label="패널 닫기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 학생 카드 그리드 */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredStudents.map((student) => {
            const levelCode = student.arlex_level
              ? formatLevel(student.arlex_level, 'code')
              : '-';
            const weeklyCompletionRate = student.weeklyCompletionRate || student.learningProgress;

            return (
              <div
                key={student.student_id}
                onClick={() => onStudentClick(student.student_id)}
                className="
                  bg-white rounded-lg p-3 border border-gray-200
                  hover:shadow-md hover:border-gray-300
                  cursor-pointer transition-all duration-150
                  flex flex-col gap-2
                "
              >
                {/* 아바타와 이름 */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{student.name}</div>
                    {student.arlex_level && (
                      <span
                        className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold rounded text-white"
                        style={{
                          backgroundColor: getLevelColorByNumber(student.arlex_level),
                          minWidth: '40px',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {levelCode}
                      </span>
                    )}
                  </div>
                </div>

                {/* 통계 */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">달성률</span>
                    <span className="font-semibold text-gray-800">{weeklyCompletionRate.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">정답률</span>
                    <span className="font-semibold text-gray-800">{student.accuracyRate.toFixed(0)}%</span>
                  </div>
                </div>

                {/* 상세보기 버튼 */}
                <button
                  className="
                    mt-1 px-2 py-1 text-xs font-medium
                    bg-blue-50 text-blue-600 rounded
                    hover:bg-blue-100 transition-colors
                  "
                  onClick={(e) => {
                    e.stopPropagation();
                    onStudentClick(student.student_id);
                  }}
                >
                  상세보기
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentStatusPanel;
