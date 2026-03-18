// 학생 상세 페이지 (360도 뷰)
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import SubjectProgress from '../../components/students/SubjectProgress';
import RecentActivity from '../../components/students/RecentActivity';
import ParentInfo from '../../components/students/ParentInfo';

const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { students } = useDemoStore();

  const student = students.find(s => s.id === id);

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">학생을 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/students')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            학생 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 상태 뱃지 색상
  const getStatusBadge = () => {
    switch (student.status) {
      case 'good':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'delayed':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = () => {
    switch (student.status) {
      case 'good':
        return '순조로움';
      case 'warning':
        return '주의 필요';
      case 'delayed':
        return '지연';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate('/students')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>학생 목록으로</span>
        </button>

        {/* 학생 기본 정보 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{student.name}</h1>
                <span className="text-lg text-gray-500">👧</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>초등 {student.grade}학년</span>
                <span>•</span>
                <span>출석률 {student.attendanceRate}%</span>
                {student.unpaidMonths && student.unpaidMonths > 0 && (
                  <>
                    <span>•</span>
                    <span className="text-red-600 font-medium">
                      ⚠️ {student.unpaidMonths}개월 미납
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* 상태 뱃지 */}
              <span className={`px-3 py-1 border rounded-full text-sm font-medium ${getStatusBadge()}`}>
                {getStatusText()}
              </span>

              {/* 편집 버튼 */}
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                편집
              </button>
            </div>
          </div>

          {/* 출석률 프로그레스 바 */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>출석률</span>
              <span className="font-semibold">{student.attendanceRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  student.attendanceRate >= 90 ? 'bg-green-500' :
                  student.attendanceRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${student.attendanceRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 그리드 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽 컬럼: 과목별 진도 + 최근 활동 */}
        <div className="lg:col-span-2 space-y-6">
          <SubjectProgress subjects={student.subjects} />
          <RecentActivity activities={student.recentActivities} />
        </div>

        {/* 오른쪽 컬럼: 학부모 정보 */}
        <div>
          <ParentInfo student={student} />

          {/* 진단테스트 결과 (있을 경우) */}
          {student.diagnosticResult && (
            <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">🎯 최근 진단테스트</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">현재 레벨</span>
                  <span className="font-semibold text-purple-800">{student.diagnosticResult.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">전국 순위</span>
                  <span className="font-semibold text-purple-800">상위 {student.diagnosticResult.nationalRank}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">진단일</span>
                  <span className="text-sm text-gray-800">
                    {new Date(student.diagnosticResult.testDate).toLocaleDateString('ko-KR', {
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
                상세 결과 보기 →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
