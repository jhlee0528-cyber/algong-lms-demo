/**
 * 강의듣기 상세 진행률 컴포넌트
 * 차시별 완료 현황 표시
 */

import React from 'react';
import { useStudentProgress } from '../../hooks/useStudentProgress';

interface LectureProgressDetailProps {
  studentId: number;
  missionId?: number;
  startDate?: string;
  endDate?: string;
}

const LectureProgressDetail: React.FC<LectureProgressDetailProps> = ({
  studentId,
  missionId,
  startDate,
  endDate,
}) => {
  const { data, isLoading } = useStudentProgress({
    student_id: studentId,
    mission_id: missionId,
    progress_type: 'lecture',
    start_date: startDate,
    end_date: endDate,
  });

  if (isLoading) {
    return <div className="text-center py-4 text-gray-500">로딩 중...</div>;
  }

  const lectureProgress = data?.progress.filter((p) => p.progress_type === 'lecture') || [];

  // 차시별 완료 현황 집계
  const sessionStatus: { [key: number]: { completed: number; total: number } } = {
    1: { completed: 0, total: 0 },
    2: { completed: 0, total: 0 },
    3: { completed: 0, total: 0 },
    4: { completed: 0, total: 0 },
    5: { completed: 0, total: 0 },
    6: { completed: 0, total: 0 },
  };

  lectureProgress.forEach((progress) => {
    if (progress.lecture_session) {
      const session = progress.lecture_session;
      if (session >= 1 && session <= 6) {
        sessionStatus[session].total++;
        if (progress.completed_at) {
          sessionStatus[session].completed++;
        }
      }
    }
  });

  const sessionLabels = [
    { num: 1, label: "1차시: Let's Do the Chant" },
    { num: 2, label: "2차시: Let's Listen and Repeat" },
    { num: 3, label: "3차시: Let's Trace" },
    { num: 4, label: '4차시: Game' },
    { num: 5, label: "5차시: Let's Read the Story" },
    { num: 6, label: "6차시: Let's Scratch" },
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">차시별 완료 현황</h4>
      <div className="space-y-2">
        {sessionLabels.map((session) => {
          const status = sessionStatus[session.num];
          const completionRate = status.total > 0 ? (status.completed / status.total) * 100 : 0;

          return (
            <div key={session.num} className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{session.label}</span>
                <span className="text-xs text-gray-600">
                  {status.completed}/{status.total} 완료
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                완료율: {completionRate.toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LectureProgressDetail;
