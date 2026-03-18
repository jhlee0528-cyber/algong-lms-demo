// 알공공부방 데모 메인 대시보드
import React from 'react';
import { useDemoStore } from '../store/demoStore';
import TodayTasks from '../components/dashboard/TodayTasks';
import QuickGradingButton from '../components/dashboard/QuickGradingButton';
import TodayAttendance from '../components/dashboard/TodayAttendance';
import WeeklyStatsWidget from '../components/dashboard/WeeklyStatsWidget';

const DashboardPage: React.FC = () => {
  const { students } = useDemoStore();

  // 미납 학생 필터
  const unpaidStudents = students.filter(s => s.unpaidMonths && s.unpaidMonths > 0);

  // 진단테스트 권장 학생 (진단 결과가 있는 학생)
  const diagnosticRecommended = students.filter(s => s.diagnosticResult);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          안녕하세요, 정혜진 원장님 👋
        </h1>
        <p className="text-gray-600">
          오늘 수업 시간: 14:00 ~ 18:00 | 학생 {students.length}명
        </p>
      </div>

      {/* 메인 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽 컬럼: 오늘 할 일 + 빠른 채점 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 오늘 할 일 */}
          <TodayTasks />

          {/* 빠른 채점 버튼 */}
          <QuickGradingButton />

          {/* 이번 주 학습 현황 */}
          <WeeklyStatsWidget />
        </div>

        {/* 오른쪽 컬럼: 위젯들 */}
        <div className="space-y-6">
          {/* 오늘 출석 */}
          <TodayAttendance />

          {/* 미납 학생 알림 */}
          {unpaidStudents.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-3">💰 미납 학생</h3>
              <div className="space-y-2">
                {unpaidStudents.map(student => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between py-2 border-b border-red-100 last:border-0"
                  >
                    <div>
                      <span className="font-medium text-gray-800">{student.name}</span>
                      <p className="text-xs text-gray-600">
                        {student.unpaidMonths}개월 미납
                      </p>
                    </div>
                    <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                      알림 발송
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 이번 주 진단테스트 권장 */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              🎯 이번 주 완료해야 할 진단테스트
            </h3>
            {diagnosticRecommended.length > 0 ? (
              <div className="space-y-2">
                {diagnosticRecommended.slice(0, 3).map(student => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between py-2 border-b border-purple-100 last:border-0"
                  >
                    <div>
                      <span className="font-medium text-gray-800">{student.name}</span>
                      <p className="text-xs text-gray-600">
                        ArLex {student.diagnosticResult?.level} 진단 권장
                      </p>
                    </div>
                    <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                      상세보기
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">이번 주 진단테스트 예정 학생이 없습니다.</p>
            )}
          </div>

          {/* 데모 리셋 버튼 (개발용) */}
          <button
            onClick={() => {
              if (confirm('데모 데이터를 초기화하시겠습니까?')) {
                useDemoStore.getState().resetDemo();
                window.location.reload();
              }
            }}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            🔄 데모 리셋
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
