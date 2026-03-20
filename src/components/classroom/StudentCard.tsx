/**
 * 수업보기 - 학생 카드 컴포넌트
 * 각 학생의 실시간 학습 상태를 카드로 표시
 */

import React from 'react';
import type { ClassroomStudent } from '../../data/mockClassroom';

interface StudentCardProps {
  student: ClassroomStudent;
  onClick: () => void;
  textSize: {
    name: string;
    info: string;
    status: string;
  };
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick, textSize }) => {
  // 상태별 스타일 정의
  const getStatusStyle = () => {
    switch (student.status) {
      case 'learning':
        return {
          bg: 'bg-green-50',
          border: 'border-green-300',
          dot: 'bg-green-500',
          statusText: '학습 중',
          statusColor: 'text-green-700',
        };
      case 'paused':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-300',
          dot: 'bg-yellow-500',
          statusText: '일시 정지',
          statusColor: 'text-yellow-700',
        };
      case 'completed':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          dot: 'bg-blue-500',
          statusText: '완료',
          statusColor: 'text-blue-700',
        };
      case 'offline':
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          dot: 'bg-red-500',
          statusText: '미접속',
          statusColor: 'text-gray-500',
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          dot: 'bg-gray-400',
          statusText: '',
          statusColor: 'text-gray-600',
        };
    }
  };

  const style = getStatusStyle();
  const isOffline = student.status === 'offline';

  return (
    <button
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border-2 ${style.bg} ${style.border}
        ${isOffline ? 'opacity-60' : ''}
        hover:shadow-lg hover:scale-105 transition-all duration-200
        flex flex-col items-center justify-center
        min-h-[140px] w-full
      `}
    >
      {/* 상태 표시등 (좌상단) */}
      <div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${style.dot} animate-pulse`} />

      {/* 학생 이름 */}
      <div className={`${textSize.name} font-bold text-gray-800 mb-1 text-center`}>
        {student.name}
      </div>

      {/* 학년 */}
      <div className={`${textSize.info} text-gray-600 mb-2`}>
        (초{student.grade})
      </div>

      {/* 현재 활동 */}
      {!isOffline && student.currentSubject && (
        <div className={`${textSize.info} text-gray-700 text-center mb-1`}>
          {student.currentSubject} 학습
        </div>
      )}

      {/* 상태 텍스트 */}
      <div className={`${textSize.status} ${style.statusColor} font-medium mb-2`}>
        {style.statusText}
      </div>

      {/* 진행률 바 (학습 중이거나 일시정지일 때만) */}
      {!isOffline && student.progressPercent !== undefined && (
        <div className="w-full">
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
            <div
              className={`h-1.5 rounded-full transition-all ${
                student.status === 'learning' ? 'bg-green-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${student.progressPercent}%` }}
            />
          </div>
          <div className={`${textSize.status} text-gray-600 text-center`}>
            {student.progressPercent}%
          </div>
        </div>
      )}
    </button>
  );
};

export default StudentCard;
