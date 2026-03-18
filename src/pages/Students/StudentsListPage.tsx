// 학생 목록 페이지
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';

const StudentsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { students } = useDemoStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return { bg: 'bg-green-100', text: 'text-green-700', label: '순조로움' };
      case 'warning':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '주의 필요' };
      case 'delayed':
        return { bg: 'bg-red-100', text: 'text-red-700', label: '지연' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: '알 수 없음' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">👥 학생 관리</h1>
            <p className="text-gray-600">전체 {students.length}명</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            + 학생 추가
          </button>
        </div>
      </div>

      {/* 학생 카드 그리드 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(student => {
          const status = getStatusBadge(student.status);
          const mainSubject = student.subjects[0];

          return (
            <button
              key={student.id}
              onClick={() => navigate(`/students/${student.id}`)}
              className="bg-white rounded-lg shadow p-6 text-left hover:shadow-lg transition-all hover:scale-105 active:scale-100"
            >
              {/* 학생 기본 정보 */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{student.name}</h3>
                  <p className="text-sm text-gray-600">초등 {student.grade}학년</p>
                </div>
                <span className={`px-2 py-1 ${status.bg} ${status.text} text-xs rounded-full font-medium`}>
                  {status.label}
                </span>
              </div>

              {/* 과목 정보 */}
              {mainSubject && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">{mainSubject.subjectName}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-blue-600">{mainSubject.currentLevel}</span>
                    <div className="flex-grow">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${mainSubject.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{mainSubject.progress}%</span>
                  </div>
                </div>
              )}

              {/* 출석률 */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">출석률</span>
                <span className={`font-semibold ${
                  student.attendanceRate >= 90 ? 'text-green-600' :
                  student.attendanceRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {student.attendanceRate}%
                </span>
              </div>

              {/* 미납 경고 */}
              {student.unpaidMonths && student.unpaidMonths > 0 && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  ⚠️ {student.unpaidMonths}개월 미납
                </div>
              )}

              {/* 최근 활동 */}
              {student.recentActivities.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    최근: {student.recentActivities[0].description}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StudentsListPage;
