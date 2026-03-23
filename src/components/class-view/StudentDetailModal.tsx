/**
 * 개선된 학생 상세 모달
 * - 과목별 프로그레스바
 * - 독서 현황
 * - 최근 활동 타임라인
 */

import React from 'react';
import type { Student } from '../../data/mockStudents';

interface StudentDetailModalProps {
  student: Student;
  onClose: () => void;
  onSendReport: () => void;
}

const getStatusBgColor = (status: string) => {
  if (status === 'good') return 'bg-green-100 text-green-800';
  if (status === 'warning') return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const getStatusText = (status: string) => {
  if (status === 'good') return '🟢 정상';
  if (status === 'warning') return '🟡 주의';
  return '🔴 관리필요';
};

const getProgressBarColor = (progress: number) => {
  if (progress >= 70) return 'bg-green-500';
  if (progress >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose, onSendReport }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold border-2 border-white">
              {student.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(student.status)}`}>
                  {getStatusText(student.status)}
                </span>
              </div>
              <p className="text-blue-100">{student.grade}학년 · {student.subjects[0]?.currentLevel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 학습 통계 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📊</span>
              학습 통계
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">현재 레벨</div>
                <div className="text-2xl font-bold text-blue-600">
                  {student.subjects[0]?.currentLevel}
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">출석률</div>
                <div className="text-2xl font-bold text-purple-600">
                  {student.attendanceRate}%
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">독서 레벨</div>
                <div className="text-2xl font-bold text-orange-600">
                  Lv.{student.libraryProgress.readingLevel}
                </div>
              </div>
            </div>
          </div>

          {/* 과목별 진도 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📚</span>
              과목별 진도
            </h3>
            <div className="space-y-3">
              {student.subjects.map((subject, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{subject.subjectName}</span>
                    <span className="text-sm font-semibold text-gray-700">{subject.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressBarColor(subject.progress)} transition-all`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  {subject.weakPoints && subject.weakPoints.length > 0 && (
                    <div className="mt-2 text-xs text-gray-600">
                      약점: {subject.weakPoints.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 독서 현황 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📖</span>
              독서 현황
            </h3>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600">독서 레벨</div>
                  <div className="text-xl font-bold text-orange-600">
                    Lv.{student.libraryProgress.readingLevel}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">누적 독서량</div>
                  <div className="text-xl font-bold text-gray-900">
                    {student.libraryProgress.totalBooksRead}권
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">이번 달</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {student.libraryProgress.thisMonthBooks}권
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">월 평균</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {Math.round(student.libraryProgress.totalBooksRead / 6)}권
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 최근 활동 */}
          {student.recentActivities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span>🗓️</span>
                최근 활동
              </h3>
              <div className="space-y-2">
                {student.recentActivities.slice(0, 5).map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900 font-medium">{activity.description}</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 학부모 리포트 발송 버튼 */}
          <button
            onClick={onSendReport}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
          >
            📱 학부모 리포트 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
