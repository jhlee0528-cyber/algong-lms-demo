/**
 * 메인 페이지: 수업보기 (극도로 단순화)
 * - 학생 목록 + 신호등 시스템
 * - 학부모 리포트 발송
 */

import React, { useState } from 'react';
import { mockStudents } from '../data/mockStudents';
import type { Student } from '../data/mockStudents';
import ParentReportModal from '../components/report/ParentReportModal';

// 신호등 결정 로직
const getTrafficLight = (student: Student): '🟢' | '🟡' | '🔴' => {
  if (student.status === 'good') return '🟢';
  if (student.status === 'warning') return '🟡';
  return '🔴';
};

const getTrafficLightText = (light: string): string => {
  if (light === '🟢') return '정상';
  if (light === '🟡') return '주의';
  return '관리필요';
};

const MainClassViewPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBulkReportConfirm, setShowBulkReportConfirm] = useState(false);

  const students = mockStudents;

  // 통계
  const goodCount = students.filter(s => s.status === 'good').length;
  const warningCount = students.filter(s => s.status === 'warning').length;
  const delayedCount = students.filter(s => s.status === 'delayed').length;

  const handleSendReport = (student: Student) => {
    setSelectedStudent(student);
    setShowReportModal(true);
  };

  const handleBulkSend = () => {
    setShowBulkReportConfirm(true);
  };

  const confirmBulkSend = () => {
    // 실제로는 API 호출
    alert(`${students.length}명의 학부모에게 리포트를 발송했습니다.`);
    setShowBulkReportConfirm(false);
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📚 수업보기</h1>
          <button
            onClick={handleBulkSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            전체발송
          </button>
        </div>

        {/* 통계 요약 */}
        <div className="flex gap-4 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟢</span>
            <span className="text-gray-600">정상 <span className="font-bold text-green-600">{goodCount}명</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟡</span>
            <span className="text-gray-600">주의 <span className="font-bold text-yellow-600">{warningCount}명</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔴</span>
            <span className="text-gray-600">관리필요 <span className="font-bold text-red-600">{delayedCount}명</span></span>
          </div>
        </div>
      </div>

      {/* 학생 목록 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">학생</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">레벨</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">상태</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">독서</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">발송</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => {
                const light = getTrafficLight(student);
                const currentLevel = student.subjects[0]?.currentLevel || 'N/A';

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {student.name[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.grade}학년</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {currentLevel}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{light}</span>
                        <span className="text-xs text-gray-600">{getTrafficLightText(light)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          📖 Lv.{student.libraryProgress.readingLevel}
                        </div>
                        <div className="text-xs text-gray-500">
                          {student.libraryProgress.totalBooksRead}권 (이번달 {student.libraryProgress.thisMonthBooks}권)
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendReport(student);
                        }}
                        className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                      >
                        발송
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 학생 상세 모달 (클릭 시) */}
      {selectedStudent && !showReportModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {selectedStudent.name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h2>
                  <p className="text-sm text-gray-500">{selectedStudent.grade}학년</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 학습 상태 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 학습 상태</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">현재 레벨</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedStudent.subjects[0]?.currentLevel}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">진도율</div>
                    <div className="text-2xl font-bold text-green-600">
                      {selectedStudent.subjects[0]?.progress}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">출석률</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedStudent.attendanceRate}%
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">상태</div>
                    <div className="text-3xl">
                      {getTrafficLight(selectedStudent)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 독서 현황 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📖 독서 현황</h3>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">독서 레벨</span>
                    <span className="text-xl font-bold text-orange-600">
                      Lv.{selectedStudent.libraryProgress.readingLevel}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="text-xs text-gray-600">누적 독서량</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {selectedStudent.libraryProgress.totalBooksRead}권
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">이번 달</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {selectedStudent.libraryProgress.thisMonthBooks}권
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 최근 활동 */}
              {selectedStudent.recentActivities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">🗓️ 최근 활동</h3>
                  <div className="space-y-2">
                    {selectedStudent.recentActivities.slice(0, 5).map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-xl">{activity.icon}</span>
                        <div className="flex-1">
                          <div className="text-sm text-gray-900">{activity.description}</div>
                          <div className="text-xs text-gray-500">{activity.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 학부모 리포트 발송 버튼 */}
              <button
                onClick={() => {
                  setShowReportModal(true);
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                📱 학부모 리포트 보내기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 학부모 리포트 모달 */}
      {showReportModal && selectedStudent && (
        <ParentReportModal
          student={selectedStudent}
          onClose={() => {
            setShowReportModal(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {/* 전체 발송 확인 모달 */}
      {showBulkReportConfirm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowBulkReportConfirm(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">전체 발송 확인</h2>
            <p className="text-gray-600 mb-6">
              총 {students.length}명의 학부모에게 리포트를 발송하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBulkReportConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmBulkSend}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                발송하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainClassViewPage;
