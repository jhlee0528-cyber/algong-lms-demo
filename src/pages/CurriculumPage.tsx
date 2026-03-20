import React, { useState } from 'react';
import { useUnits } from '../hooks/useUnits';
import CurriculumSelector from '../components/units/CurriculumSelector';
import UnitProgressDetail from '../components/progress/UnitProgressDetail';
import CEFRLevelChart from '../components/curriculum/CEFRLevelChart';
import type { StudentWithStats } from '../components/progress/StudentListTable';

type Curriculum = 'phonics' | 'speaking' | 'reading' | 'grammar' | 'writing';

const CurriculumPage: React.FC = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum>('phonics');
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  
  const { data: units } = useUnits();
  
  // 더미 학생 데이터 (실제로는 API에서 가져옴)
  const dummyStudents: StudentWithStats[] = [];

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📚 커리큘럼</h1>
          <p className="text-gray-500 mt-1">교재별 단원 진행 현황을 확인하세요</p>
        </div>
      </div>

      {/* CEFR 레벨 맵핑 차트 */}
      <div className="bg-white rounded-lg shadow p-6">
        <CEFRLevelChart
          currentStudentLevel={15} // 더미 데이터: 현재 학생 레벨 (실제로는 props나 state에서 가져옴)
          onLevelClick={(level) => {
            console.log('Selected level:', level);
            // TODO: 레벨 클릭 시 해당 단원 표시 로직
          }}
        />
      </div>

      {/* 커리큘럼 선택 */}
      <div className="bg-white rounded-lg shadow p-4" style={{ minHeight: '300px' }}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          커리큘럼
        </h3>
        <CurriculumSelector
          units={units || []}
          onUnitSelect={setSelectedUnit}
          selectedUnit={selectedUnit}
        />
      </div>

      {/* 선택된 단원 상세 */}
      {selectedUnit && units && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
            <h3 className="font-bold text-blue-800">
              📝 단원 상세 현황
            </h3>
            <button
              onClick={() => setSelectedUnit(null)}
              className="text-blue-600 hover:text-blue-800"
            >
              ✕ 닫기
            </button>
          </div>

          <UnitProgressDetail
            unitId={selectedUnit}
            unit={units.find((u) => u.unit_id === selectedUnit)!}
            studentId={selectedStudent || undefined}
            studentData={dummyStudents.find((s) => s.student_id === selectedStudent)}
            allStudentsData={dummyStudents}
          />
        </div>
      )}
    </div>
  );
};

export default CurriculumPage;
