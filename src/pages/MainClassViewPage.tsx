/**
 * 메인 페이지 v2.0: 수업보기
 * - 미니 대시보드
 * - 신호등 필터
 * - 표/카드 뷰 토글
 * - 개선된 학생 상세
 * - 카카오톡 스타일 리포트
 */

import React, { useState, useEffect } from 'react';
import { mockStudents } from '../data/mockStudents';
import type { Student } from '../data/mockStudents';
import MiniDashboard from '../components/class-view/MiniDashboard';
import FilterBar from '../components/class-view/FilterBar';
import TableView from '../components/class-view/TableView';
import CardView from '../components/class-view/CardView';
import StudentDetailModal from '../components/class-view/StudentDetailModal';
import ParentReportModal from '../components/report/ParentReportModal';

type FilterStatus = 'all' | 'good' | 'warning' | 'delayed';
type ViewMode = 'table' | 'card';

const MainClassViewPage: React.FC = () => {
  // 상태 관리
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>('all');
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    // localStorage에서 뷰 모드 불러오기
    const saved = localStorage.getItem('class-view-mode');
    return (saved === 'card' ? 'card' : 'table') as ViewMode;
  });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBulkReportConfirm, setShowBulkReportConfirm] = useState(false);

  // 뷰 모드 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('class-view-mode', currentView);
  }, [currentView]);

  // 필터링된 학생 목록
  const filteredStudents = mockStudents.filter((student) => {
    if (currentFilter === 'all') return true;
    return student.status === currentFilter;
  });

  // 필터 클릭 핸들러
  const handleFilterChange = (filter: FilterStatus) => {
    setCurrentFilter(filter);
  };

  // 학생 클릭 핸들러
  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  // 리포트 발송 핸들러
  const handleSendReport = (student: Student) => {
    setSelectedStudent(student);
    setShowReportModal(true);
  };

  // 학생 상세에서 리포트 발송
  const handleSendReportFromDetail = () => {
    setShowReportModal(true);
  };

  // 전체 발송 핸들러
  const handleBulkSend = () => {
    setShowBulkReportConfirm(true);
  };

  const confirmBulkSend = () => {
    alert(`${filteredStudents.length}명의 학부모에게 리포트를 발송했습니다.`);
    setShowBulkReportConfirm(false);
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* 미니 대시보드 */}
      <MiniDashboard students={mockStudents} onFilterClick={handleFilterChange} />

      {/* 필터 + 뷰 전환 바 */}
      <FilterBar
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        currentView={currentView}
        onViewChange={setCurrentView}
        onBulkSend={handleBulkSend}
      />

      {/* 뷰 렌더링 */}
      {currentView === 'table' ? (
        <TableView
          students={filteredStudents}
          onStudentClick={handleStudentClick}
          onSendReport={handleSendReport}
        />
      ) : (
        <CardView
          students={filteredStudents}
          onStudentClick={handleStudentClick}
          onSendReport={handleSendReport}
        />
      )}

      {/* 학생 상세 모달 */}
      {selectedStudent && !showReportModal && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSendReport={handleSendReportFromDetail}
        />
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
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📱</span>
              전체 발송 확인
            </h2>
            <p className="text-gray-600 mb-6">
              {currentFilter === 'all'
                ? `전체 ${filteredStudents.length}명`
                : `필터링된 ${filteredStudents.length}명`}
              의 학부모에게 리포트를 발송하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBulkReportConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
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
