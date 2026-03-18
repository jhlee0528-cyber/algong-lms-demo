// 오늘 출석 위젯 컴포넌트
import React from 'react';
import { useDemoStore } from '../../store/demoStore';

const TodayAttendance: React.FC = () => {
  const { todayAttendance, students } = useDemoStore();
  const totalStudents = students.length;
  const attendanceRate = Math.round((todayAttendance / totalStudents) * 100);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 오늘 출석</h3>

      <div className="flex items-end gap-3">
        <div className="text-4xl font-bold text-blue-600">
          {todayAttendance}
          <span className="text-2xl text-gray-400">/{totalStudents}</span>
        </div>
        <div className="text-sm text-gray-600 mb-2">명 출석</div>
      </div>

      {/* 출석률 프로그레스 바 */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>출석률</span>
          <span className="font-semibold">{attendanceRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${attendanceRate}%` }}
          />
        </div>
      </div>

      {/* 상태 메시지 */}
      <div className="mt-4 text-sm">
        {attendanceRate >= 90 ? (
          <span className="text-green-600">✅ 우수한 출석률입니다!</span>
        ) : attendanceRate >= 70 ? (
          <span className="text-yellow-600">⚠️ 평균적인 출석률입니다</span>
        ) : (
          <span className="text-red-600">⚠️ 출석률이 낮습니다</span>
        )}
      </div>
    </div>
  );
};

export default TodayAttendance;
