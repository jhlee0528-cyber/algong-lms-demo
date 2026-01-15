import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  currentLevel: string;
}

interface StudentSelectorProps {
  students: Student[];
  selectedStudentId: string | null;  // null = 전체 보기
  onSelect: (studentId: string | null) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
  students,
  selectedStudentId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedStudent = students.find((s) => s.id === selectedStudentId);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[200px]"
      >
        {selectedStudentId ? (
          <>
            <span className="text-blue-600">👤</span>
            <span className="font-medium">{selectedStudent?.name}</span>
            <span className="text-sm text-gray-500">({selectedStudent?.currentLevel})</span>
          </>
        ) : (
          <>
            <span className="text-gray-600">👥</span>
            <span className="font-medium">전체 보기</span>
          </>
        )}
        <svg 
          className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {/* 전체 보기 옵션 */}
            <button
              onClick={() => { onSelect(null); setIsOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 ${
                !selectedStudentId ? 'bg-blue-50' : ''
              }`}
            >
              <span className="text-gray-600">👥</span>
              <span>전체 보기</span>
            </button>
            
            <div className="border-t border-gray-100" />
            
            {/* 학생 목록 */}
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => { onSelect(student.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 ${
                  selectedStudentId === student.id ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-blue-600">👤</span>
                <span className="font-medium">{student.name}</span>
                <span className="text-sm text-gray-500 ml-auto">{student.currentLevel}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentSelector;
