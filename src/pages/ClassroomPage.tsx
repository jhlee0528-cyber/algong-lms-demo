/**
 * 수업보기 페이지 (완전히 새로 작성)
 * 학생 중심 카드 그리드로 실시간 학습 현황 표시
 */

import React, { useState } from 'react';
import { mockClassroomStudents, getClassroomStats } from '../data/mockClassroom';
import StudentCard from '../components/classroom/StudentCard';
import StudentDetailSlide from '../components/classroom/StudentDetailSlide';
import ClassroomHeader from '../components/classroom/ClassroomHeader';
import type { ClassroomStudent } from '../data/mockClassroom';

const ClassroomPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<ClassroomStudent | null>(null);

  const stats = getClassroomStats();
  const students = mockClassroomStudents;

  // 학생 수에 따른 그리드 클래스 결정 (적응형 크기)
  const getGridClasses = (count: number): string => {
    if (count <= 15) {
      // 기본: 5열, 넉넉한 크기
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4';
    } else if (count <= 30) {
      // 1/2 크기: 7열
      return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3';
    } else {
      // 최소 크기: 8열 이상
      return 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2';
    }
  };

  // 학생 수에 따른 텍스트 크기 결정
  const getTextSize = (count: number) => {
    if (count <= 15) {
      return { name: 'text-lg', info: 'text-sm', status: 'text-xs' };
    } else if (count <= 30) {
      return { name: 'text-base', info: 'text-xs', status: 'text-[10px]' };
    } else {
      return { name: 'text-sm', info: 'text-[10px]', status: 'text-[9px]' };
    }
  };

  const gridClasses = getGridClasses(students.length);
  const textSize = getTextSize(students.length);

  return (
    <div className="w-full space-y-6">
      {/* 헤더 */}
      <ClassroomHeader
        total={stats.total}
        learning={stats.learning}
        paused={stats.paused}
        offline={stats.offline}
        online={stats.online}
      />

      {/* 학생 카드 그리드 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className={`grid ${gridClasses}`}>
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onClick={() => setSelectedStudent(student)}
              textSize={textSize}
            />
          ))}
        </div>

        {/* 학생이 15명 미만일 때 안내 메시지 */}
        {students.length < 15 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>현재 {students.length}명의 학생이 등록되어 있습니다.</p>
          </div>
        )}
      </div>

      {/* 학생 상세 슬라이드 패널 */}
      {selectedStudent && (
        <StudentDetailSlide
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default ClassroomPage;
