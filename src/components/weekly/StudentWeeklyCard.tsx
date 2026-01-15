/**
 * 학생별 주간 현황 카드 (테이블 행)
 */

import React from 'react';
import { useWeeklyPlan } from '../../hooks/useWeeklyPlanning';
import { formatLevel, getLevelColorByNumber } from '../../utils/arlexLevel';
import type { StudentWithStats } from '../progress/StudentListTable';

interface StudentWeeklyCardProps {
  student: StudentWithStats;
  weekStart: string;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onPlanChange: () => void;
}

const StudentWeeklyCard: React.FC<StudentWeeklyCardProps> = ({
  student,
  weekStart,
  selected,
  onSelect,
  onPlanChange,
}) => {
  const { data: plan, isLoading } = useWeeklyPlan(student.student_id, weekStart);

  const currentLevel = student.arlex_level 
    ? formatLevel(student.arlex_level, 'code')
    : '-';

  const targetUnits = plan?.targetUnits?.length || 0;

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-gray-900">{student.name}</div>
          {student.arlex_level && (
            <span
              className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-md text-white"
              style={{
                backgroundColor: getLevelColorByNumber(student.arlex_level),
                minWidth: '40px',
                letterSpacing: '0.5px',
              }}
            >
              {currentLevel}
            </span>
          )}
        </div>
      </td>
      <td className="p-3 text-sm text-gray-700">
        <div>레벨: {currentLevel}</div>
        <div className="text-xs text-gray-500">
          진행률: {student.learningProgress}%
        </div>
      </td>
      <td className="p-3 text-sm text-gray-700">
        {isLoading ? (
          <span className="text-gray-400">로딩 중...</span>
        ) : plan ? (
          <div>
            <div className="font-medium">{targetUnits} Units</div>
            <div className="text-xs text-gray-500">
              강의 {plan.targetLectureCount}개, 액티비티 {plan.targetActivityCount}개
            </div>
          </div>
        ) : (
          <span className="text-gray-400">계획 없음</span>
        )}
      </td>
      <td className="p-3 text-center text-sm text-gray-700">
        {targetUnits > 0 ? `${targetUnits} Units` : '-'}
      </td>
      <td className="p-3 text-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // 계획 설정 모달 열기 (나중에 구현)
            alert('계획 설정 기능은 곧 추가될 예정입니다.');
          }}
          className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
        >
          설정
        </button>
      </td>
    </tr>
  );
};

export default StudentWeeklyCard;
