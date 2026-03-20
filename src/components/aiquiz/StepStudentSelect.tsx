/**
 * AI 문제 만들기 Step 1: 학생 선택
 */

import React from 'react';

export interface Student {
  id: number;
  name: string;
  grade: number;
}

interface StepStudentSelectProps {
  students: Student[];
  selectedStudents: number[];
  onStudentsChange: (studentIds: number[]) => void;
  onNext: () => void;
}

const StepStudentSelect: React.FC<StepStudentSelectProps> = ({
  students,
  selectedStudents,
  onStudentsChange,
  onNext,
}) => {
  const handleToggleStudent = (studentId: number) => {
    if (selectedStudents.includes(studentId)) {
      onStudentsChange(selectedStudents.filter(id => id !== studentId));
    } else {
      onStudentsChange([...selectedStudents, studentId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      onStudentsChange([]);
    } else {
      onStudentsChange(students.map(s => s.id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          1단계: 학생 선택
        </h2>
        <p className="text-gray-600">
          문제를 출제할 학생을 선택하세요. (중복 선택 가능)
        </p>
      </div>

      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <span className="text-sm text-gray-700">
          선택된 학생: <strong>{selectedStudents.length}명</strong> / 전체 {students.length}명
        </span>
        <button
          onClick={handleSelectAll}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {selectedStudents.length === students.length ? '전체 해제' : '전체 선택'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
        {students.map((student) => {
          const isSelected = selectedStudents.includes(student.id);
          return (
            <button
              key={student.id}
              onClick={() => handleToggleStudent(student.id)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                  {student.name}
                </span>
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                `}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {student.grade}학년
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={selectedStudents.length === 0}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${selectedStudents.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }
          `}
        >
          다음 단계 →
        </button>
      </div>
    </div>
  );
};

export default StepStudentSelect;
