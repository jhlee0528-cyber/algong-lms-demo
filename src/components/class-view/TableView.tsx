/**
 * 개선된 표 뷰
 * - 신호등 색상 테두리 아바타
 * - 프로그레스바
 * - 관리필요 학생 상단 고정
 */

import React from 'react';
import type { Student } from '../../data/mockStudents';

interface TableViewProps {
  students: Student[];
  onStudentClick: (student: Student) => void;
  onSendReport: (student: Student) => void;
}

// 신호등 색상
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

const getProgressColor = (status: string) => {
  if (status === 'good') return 'bg-green-500';
  if (status === 'warning') return 'bg-yellow-500';
  return 'bg-red-500';
};

const TableView: React.FC<TableViewProps> = ({ students, onStudentClick, onSendReport }) => {
  // 정렬: 관리필요 → 주의 → 정상
  const sortedStudents = [...students].sort((a, b) => {
    const order = { delayed: 0, warning: 1, good: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">학생</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">레벨</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">상태</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">독서</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">발송</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedStudents.map((student) => {
              const currentLevel = student.subjects[0]?.currentLevel || 'N/A';
              const avgProgress = student.subjects.reduce((sum, s) => sum + s.progress, 0) / student.subjects.length;
              const isDelayed = student.status === 'delayed';

              return (
                <tr
                  key={student.id}
                  className={`
                    hover:bg-gray-50 transition-colors cursor-pointer
                    ${isDelayed ? 'bg-red-50' : ''}
                  `}
                  onClick={() => onStudentClick(student)}
                >
                  {/* 학생 */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500
                          flex items-center justify-center text-white font-bold text-lg
                          border-2 ${getStatusColor(student.status)}
                        `}
                      >
                        {student.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.grade}학년</div>
                      </div>
                    </div>
                  </td>

                  {/* 레벨 + 프로그레스바 */}
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="space-y-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {currentLevel}
                      </span>
                      <div className="w-24">
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressColor(student.status)} transition-all`}
                            style={{ width: `${avgProgress}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{Math.round(avgProgress)}%</div>
                      </div>
                    </div>
                  </td>

                  {/* 상태 배지 */}
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(student.status)}`}>
                      {getStatusText(student.status)}
                    </span>
                  </td>

                  {/* 독서 */}
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        📖 Lv.{student.libraryProgress.readingLevel}
                      </div>
                      <div className="text-xs text-gray-500">
                        {student.libraryProgress.totalBooksRead}권 (이번달 {student.libraryProgress.thisMonthBooks}권)
                      </div>
                    </div>
                  </td>

                  {/* 발송 버튼 */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSendReport(student);
                      }}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors font-medium"
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
  );
};

export default TableView;
