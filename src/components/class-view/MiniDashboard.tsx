/**
 * 미니 대시보드 컴포넌트
 * 학급 전체 요약 (신호등별 학생 수, 출석, 미발송)
 */

import React from 'react';
import type { Student } from '../../data/mockStudents';

interface MiniDashboardProps {
  students: Student[];
  onFilterClick: (status: 'all' | 'good' | 'warning' | 'delayed') => void;
}

const MiniDashboard: React.FC<MiniDashboardProps> = ({ students, onFilterClick }) => {
  // 통계 계산
  const goodCount = students.filter(s => s.status === 'good').length;
  const warningCount = students.filter(s => s.status === 'warning').length;
  const delayedCount = students.filter(s => s.status === 'delayed').length;

  // 오늘 출석 (더미 데이터: 전체 학생의 75%)
  const attendedToday = Math.floor(students.length * 0.75);

  // 미발송 학생 (더미 데이터: 랜덤 3명)
  const unsentCount = 3;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-sm p-4 md:p-6 border border-gray-200">
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        {/* 신호등 통계 */}
        <button
          onClick={() => onFilterClick('good')}
          className="flex items-center gap-2 hover:bg-white/70 rounded-lg px-3 py-2 transition-all"
        >
          <span className="text-2xl">🟢</span>
          <div className="text-left">
            <div className="text-xs text-gray-600">정상</div>
            <div className="text-xl font-bold text-green-600">{goodCount}명</div>
          </div>
        </button>

        <button
          onClick={() => onFilterClick('warning')}
          className="flex items-center gap-2 hover:bg-white/70 rounded-lg px-3 py-2 transition-all"
        >
          <span className="text-2xl">🟡</span>
          <div className="text-left">
            <div className="text-xs text-gray-600">주의</div>
            <div className="text-xl font-bold text-yellow-600">{warningCount}명</div>
          </div>
        </button>

        <button
          onClick={() => onFilterClick('delayed')}
          className="flex items-center gap-2 hover:bg-white/70 rounded-lg px-3 py-2 transition-all"
        >
          <span className="text-2xl">🔴</span>
          <div className="text-left">
            <div className="text-xs text-gray-600">관리필요</div>
            <div className="text-xl font-bold text-red-600">{delayedCount}명</div>
          </div>
        </button>

        {/* 구분선 */}
        <div className="hidden md:block w-px h-12 bg-gray-300" />

        {/* 출석 현황 */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">✅</span>
          <div className="text-left">
            <div className="text-xs text-gray-600">오늘 출석</div>
            <div className="text-xl font-bold text-blue-600">
              {attendedToday}/{students.length}
            </div>
          </div>
        </div>

        {/* 미발송 */}
        {unsentCount > 0 && (
          <>
            <div className="hidden md:block w-px h-12 bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <div className="text-xs text-gray-600">미발송</div>
                <div className="text-xl font-bold text-purple-600">{unsentCount}명</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniDashboard;
