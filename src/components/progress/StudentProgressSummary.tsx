/**
 * 학생 학습 현황 요약 컴포넌트
 */

import React from 'react';
import { useStudentProgressSummary } from '../../hooks/useStudentProgress';
import ProgressByType from './ProgressByType';

interface StudentProgressSummaryProps {
  studentId: number;
  startDate?: string;
  endDate?: string;
}

const StudentProgressSummary: React.FC<StudentProgressSummaryProps> = ({
  studentId,
  startDate,
  endDate,
}) => {
  const { data, isLoading, error } = useStudentProgressSummary(studentId, {
    start_date: startDate,
    end_date: endDate,
  });

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        학습 현황 요약을 불러오는데 실패했습니다.
      </div>
    );
  }

  const summary = data;

  if (!summary) {
    return (
      <div className="text-center py-8 text-gray-500">학습 현황 데이터가 없습니다.</div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* 전체 요약 */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {summary.student_name} 학습 현황 요약
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {summary.total_completed}
            </div>
            <div className="text-sm text-gray-600">완료한 과제</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {summary.total_assigned}
            </div>
            <div className="text-sm text-gray-600">할당된 과제</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {summary.overall_completion_rate.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">전체 완료율</div>
          </div>
        </div>

        {/* 전체 완료율 진행 바 */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${summary.overall_completion_rate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 과제 유형별 현황 */}
      <ProgressByType studentId={studentId} startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default StudentProgressSummary;
