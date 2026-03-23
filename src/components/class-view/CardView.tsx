/**
 * 카드 뷰
 * - 그리드 레이아웃 (PC: 4열, 태블릿: 2열, 모바일: 1열)
 * - 과목별 프로그레스바
 * - 독서 현황
 */

import React, { useState } from 'react';
import type { Student } from '../../data/mockStudents';

interface CardViewProps {
  students: Student[];
  onStudentClick: (student: Student) => void;
  onSendReport: (student: Student) => void;
}

const getStatusColor = (status: string) => {
  if (status === 'good') return 'border-green-500';
  if (status === 'warning') return 'border-yellow-500';
  return 'border-red-500';
};

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

// 아바타 컴포넌트
const StudentAvatar: React.FC<{ student: Student; size: string; statusColor: string }> = ({ student, size, statusColor }) => {
  const [imageError, setImageError] = useState(false);

  if (student.avatar && !imageError) {
    return (
      <img
        src={student.avatar}
        alt={student.name}
        className={`${size} rounded-full object-cover border-2 ${statusColor} shrink-0`}
        onError={() => setImageError(true)}
      />
    );
  }

  // 폴백: 이니셜 아바타
  return (
    <div
      className={`
        ${size} rounded-full bg-gradient-to-br from-blue-400 to-purple-500
        flex items-center justify-center text-white font-bold text-xl
        border-2 ${statusColor} shrink-0
      `}
    >
      {student.name[0]}
    </div>
  );
};

const CardView: React.FC<CardViewProps> = ({ students, onStudentClick, onSendReport }) => {
  // 정렬: 관리필요 → 주의 → 정상
  const sortedStudents = [...students].sort((a, b) => {
    const order = { delayed: 0, warning: 1, good: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedStudents.map((student) => {
        const currentLevel = student.subjects[0]?.currentLevel || 'N/A';
        const isDelayed = student.status === 'delayed';

        return (
          <div
            key={student.id}
            className={`
              bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer
              border-2 ${isDelayed ? 'border-red-500 bg-red-50' : 'border-gray-200'}
              overflow-hidden
            `}
            onClick={() => onStudentClick(student)}
          >
            {/* 헤더 */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                {/* 아바타 */}
                <StudentAvatar
                  student={student}
                  size="w-12 h-12"
                  statusColor={getStatusColor(student.status)}
                />

                {/* 상태 배지 */}
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 ${getStatusBgColor(student.status)}`}>
                  {getStatusText(student.status)}
                </span>
              </div>

              {/* 이름 + 학년 */}
              <div>
                <div className="font-bold text-gray-900 text-lg whitespace-nowrap overflow-hidden text-ellipsis">{student.name}</div>
                <div className="text-sm text-gray-600 whitespace-nowrap">{student.grade}학년</div>
              </div>

              {/* 레벨 */}
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">
                  {currentLevel}
                </span>
              </div>
            </div>

            {/* 과목별 프로그레스바 */}
            <div className="p-4 space-y-2">
              {student.subjects.slice(0, 3).map((subject, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis">{subject.subjectName}</span>
                    <span className="text-gray-500 shrink-0 ml-2 whitespace-nowrap">{subject.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressBarColor(subject.progress)} transition-all`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  {/* 약점 표시 (첫 번째 과목만) */}
                  {idx === 0 && subject.weakPoints && subject.weakPoints.length > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-[10px] text-orange-600 whitespace-nowrap">⚠️</span>
                      <span className="text-[10px] text-orange-700 truncate">
                        {subject.weakPoints.slice(0, 2).join(', ')}
                        {subject.weakPoints.length > 2 && '...'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 독서 현황 */}
            <div className="px-4 pb-4">
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                <div className="text-xs text-gray-600 mb-1 whitespace-nowrap">📖 독서</div>
                <div className="text-sm font-semibold text-gray-900">
                  <div className="whitespace-nowrap">Lv.{student.libraryProgress.readingLevel}</div>
                  <div className="text-xs text-gray-600 whitespace-nowrap">
                    ({student.libraryProgress.totalBooksRead}권, 이번달 {student.libraryProgress.thisMonthBooks}권)
                  </div>
                </div>
              </div>
            </div>

            {/* 발송 버튼 */}
            <div className="px-4 pb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSendReport(student);
                }}
                className="w-full py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                리포트 발송
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardView;
