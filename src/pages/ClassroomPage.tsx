import React, { useState } from 'react';
import { Domain } from '../types/smartree';
import { ClassroomStudent } from '../types/classroom';
import { CLASSROOM_STUDENTS } from '../data/dummyStudentData';
import { DOMAIN_CONFIG, DOMAINS, DOMAIN_LEVEL_COUNT } from '../data/curriculumLevels';
import ClassroomLevelMap from '../components/classroom/ClassroomLevelMap';
import StudentSelector from '../components/smartree/StudentSelector';
import StudentQuickAccess from '../components/smartree/StudentQuickAccess';
import StudentDetailModal from '../components/smartree/StudentDetailModal';
import { generateStudentDetail } from '../data/dummyStudentData';

const ClassroomPage: React.FC = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const selectedStudent = CLASSROOM_STUDENTS.find((s) => s.id === selectedStudentId);

  // 상태별 학생 수 계산
  const statusCounts = {
    learning: CLASSROOM_STUDENTS.filter((s) => s.status === 'learning').length,
    online: CLASSROOM_STUDENTS.filter((s) => s.status === 'online').length,
    offline: CLASSROOM_STUDENTS.filter((s) => s.status === 'offline').length,
  };

  // 선택된 학생의 상세 정보 생성 (StudentDetailModal용)
  const selectedStudentDetail = selectedStudent
    ? generateStudentDetail({
        id: selectedStudent.id,
        name: selectedStudent.name,
        currentLevel: selectedStudent.currentLevel,
        currentDomain: selectedStudent.currentDomain,
        currentUnit: selectedStudent.currentUnit,
      })
    : null;

  return (
    <div className="w-full space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📺 수업보기</h1>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="text-gray-500">총 {CLASSROOM_STUDENTS.length}명</span>
            <span className="text-green-600">🟢 {statusCounts.learning}명 학습중</span>
            <span className="text-blue-600">🔵 {statusCounts.online}명 접속</span>
            <span className="text-gray-500">⚪ {statusCounts.offline}명 오프라인</span>
          </div>
        </div>

        {/* 학생 선택 드롭다운 */}
        <StudentSelector
          students={CLASSROOM_STUDENTS.map((s) => ({
            id: s.id,
            name: s.name,
            currentLevel: s.currentLevel,
          }))}
          selectedStudentId={selectedStudentId}
          onSelect={setSelectedStudentId}
        />
      </div>

      {/* 학생 선택 시: 빠른 접근 패널 */}
      {selectedStudent && (
        <StudentQuickAccess
          studentName={selectedStudent.name}
          currentLevel={selectedStudent.currentLevel}
          currentDomain={selectedStudent.currentDomain}
          currentUnit={selectedStudent.currentUnit}
          onContinue={() => console.log('Continue learning:', selectedStudent)}
          onViewDetails={() => setIsDetailModalOpen(true)}
        />
      )}

      {/* 영역 필터 탭 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {/* 전체 탭 */}
        <button
          onClick={() => setSelectedDomain('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            selectedDomain === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📚 전체 (36)
        </button>

        {/* 영역별 탭 */}
        {DOMAINS.map((domain) => {
          const config = DOMAIN_CONFIG[domain];
          const isSelected = selectedDomain === domain;
          const count = DOMAIN_LEVEL_COUNT[domain];

          return (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? `${config.bgColor} ${config.color} ring-2 ring-offset-1`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {config.icon} {domain} ({count})
            </button>
          );
        })}
      </div>

      {/* 레벨 맵 */}
      <ClassroomLevelMap
        students={CLASSROOM_STUDENTS}
        selectedDomain={selectedDomain}
        highlightStudentId={selectedStudentId}
        onStudentClick={(id) => setSelectedStudentId(id)}
      />

      {/* 학생 상세보기 모달 */}
      {selectedStudentDetail && (
        <StudentDetailModal
          student={selectedStudentDetail}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ClassroomPage;
