/**
 * 주간 학습 계획 설정 패널
 */

import React, { useState } from 'react';
import { useWeeklySummary, useBulkCreatePlans } from '../../hooks/useWeeklyPlanning';
import { formatWeekRange } from '../../utils/weekHelper';
import type { StudentWithStats } from '../progress/StudentListTable';
import BulkAssignmentModal from './BulkAssignmentModal';
import StudentWeeklyCard from './StudentWeeklyCard';

interface WeeklyPlanningPanelProps {
  weekStart: string;
  students: StudentWithStats[];
  onPlanCreated: () => void;
}

const WeeklyPlanningPanel: React.FC<WeeklyPlanningPanelProps> = ({ 
  weekStart, 
  students, 
  onPlanCreated 
}) => {
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  
  const { data: summary, isLoading: summaryLoading } = useWeeklySummary(weekStart);
  const bulkCreateMutation = useBulkCreatePlans();

  const handleSelectAll = (checked: boolean) => {
    if (checked && students && students.length > 0) {
      setSelectedStudents(students.map(s => s.student_id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  const handleBulkSave = async (template: any) => {
    const studentIds = selectedStudents.length > 0 
      ? selectedStudents 
      : (students && students.length > 0 ? students.map(s => s.student_id) : []);
    
    try {
      await bulkCreateMutation.mutateAsync({
        studentIds,
        weekStart,
        template,
      });
      setShowBulkModal(false);
      setSelectedStudents([]);
      onPlanCreated();
    } catch (error) {
      console.error('일괄 배정 실패:', error);
    }
  };

  const handleAutoAssign = async () => {
    // 자동 배정 로직 (나중에 구현)
    alert('자동 배정 기능은 곧 추가될 예정입니다.');
  };

  return (
    <div className="space-y-4">
      {/* 상단 액션 바 */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          다음 주 학습 계획 ({formatWeekRange(weekStart)})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            일괄 배정
          </button>
          <button
            onClick={handleAutoAssign}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            자동 배정
          </button>
        </div>
      </div>

      {/* 요약 카드 */}
      {summaryLoading ? (
        <div className="text-center py-4 text-gray-500">로딩 중...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard 
            title="계획 완료" 
            value={`${summary?.excellentCount || 0}명`} 
            color="blue" 
          />
          <SummaryCard 
            title="계획 미설정" 
            value={`${Math.max(0, (students?.length || 0) - (summary?.excellentCount || 0))}명`} 
            color="yellow" 
          />
          <SummaryCard 
            title="평균 목표량" 
            value={`${summary?.averageCompletionRate ? summary.averageCompletionRate.toFixed(0) : 0}%`} 
            color="green" 
          />
          <SummaryCard 
            title="예상 완료율" 
            value={`${summary?.averageCompletionRate ? summary.averageCompletionRate.toFixed(0) : 0}%`} 
            color="purple" 
          />
        </div>
      )}

      {/* 학생별 계획 목록 */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">
                  <input 
                    type="checkbox" 
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={students && students.length > 0 && selectedStudents.length === students.length}
                  />
                </th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">학생</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">현재 위치</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">다음 주 계획</th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase">목표 Units</th>
                <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students && students.length > 0 ? (
                students.map(student => (
                  <StudentWeeklyCard
                    key={student.student_id}
                    student={student}
                    weekStart={weekStart}
                    selected={selectedStudents.includes(student.student_id)}
                    onSelect={(checked) => handleSelectStudent(student.student_id, checked)}
                    onPlanChange={onPlanCreated}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    학생 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 일괄 배정 모달 */}
      {showBulkModal && (
        <BulkAssignmentModal
          studentIds={selectedStudents.length > 0 ? selectedStudents : (students && students.length > 0 ? students.map(s => s.student_id) : [])}
          weekStart={weekStart}
          onClose={() => setShowBulkModal(false)}
          onSave={handleBulkSave}
        />
      )}
    </div>
  );
};

// 요약 카드 컴포넌트
const SummaryCard: React.FC<{ title: string; value: string; color: 'blue' | 'yellow' | 'green' | 'purple' }> = ({ 
  title, 
  value, 
  color 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
  };

  return (
    <div className={`rounded-lg p-4 border-2 ${colorClasses[color]}`}>
      <div className="text-sm font-medium mb-1">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default WeeklyPlanningPanel;
