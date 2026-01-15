import React from 'react';
import { LevelInfo } from '../../types/smartree';
import { LevelStudentGroup } from '../../types/classroom';

interface ClassroomLevelCardProps {
  level: LevelInfo;
  group: LevelStudentGroup;
  isHighlighted?: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const ClassroomLevelCard: React.FC<ClassroomLevelCardProps> = ({
  level,
  group,
  isHighlighted = false,
  onClick,
}) => {
  const { totalCount, dominantStatus, learningCount, onlineCount, offlineCount } = group;
  const hasStudents = totalCount > 0;

  // 상태에 따른 색상 결정
  const getCardStyle = () => {
    if (isHighlighted) {
      return 'border-purple-500 bg-purple-50 ring-2 ring-purple-300 scale-105';
    }

    if (!hasStudents) {
      return 'border-gray-200 bg-gray-50';
    }

    // 학생이 있는 경우: 가장 높은 우선순위 상태로 색상 결정
    // 학습중 > 접속중 > 오프라인
    if (learningCount > 0) {
      return 'border-green-400 bg-green-100 hover:bg-green-150';
    }
    if (onlineCount > 0) {
      return 'border-blue-400 bg-blue-100 hover:bg-blue-150';
    }
    return 'border-gray-300 bg-gray-100';
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative p-3 rounded-lg border-2 transition-all cursor-pointer
        ${getCardStyle()}
        hover:shadow-md
      `}
    >
      {/* 레벨 코드 */}
      <div className={`text-sm font-bold ${isHighlighted ? 'text-purple-700' : 'text-gray-700'}`}>
        {level.code}
      </div>

      {/* 학생 수 및 상태 표시 */}
      <div className="mt-2">
        {hasStudents ? (
          <div className="space-y-1">
            {/* 총 인원 */}
            <div className="flex items-center justify-center gap-1">
              <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">{totalCount}명</span>
            </div>

            {/* 상태별 작은 점들 */}
            <div className="flex items-center justify-center gap-1">
              {learningCount > 0 && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: Math.min(learningCount, 3) }).map((_, i) => (
                    <span key={`l-${i}`} className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  ))}
                  {learningCount > 3 && (
                    <span className="text-xs text-green-600">+{learningCount - 3}</span>
                  )}
                </div>
              )}
              {onlineCount > 0 && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: Math.min(onlineCount, 3) }).map((_, i) => (
                    <span key={`o-${i}`} className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  ))}
                  {onlineCount > 3 && (
                    <span className="text-xs text-blue-600">+{onlineCount - 3}</span>
                  )}
                </div>
              )}
              {offlineCount > 0 && learningCount === 0 && onlineCount === 0 && (
                <span className="text-xs text-gray-400">{offlineCount}명 오프라인</span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-xs text-gray-400">-</div>
        )}
      </div>

      {/* 학습중 학생 있을 때 펄스 효과 */}
      {learningCount > 0 && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      )}
    </button>
  );
};

export default ClassroomLevelCard;
