import React from 'react';
import { LevelInfo } from '../../types/smartree';

interface LevelCardProps {
  level: LevelInfo;
  progress: number;          // 학생 선택 시: 진행률, 전체 보기 시: 사용 안 함
  studentCount?: number;     // ⭐ 추가: 해당 레벨 수강 학생 수
  isOverviewMode?: boolean;  // ⭐ 추가: true = 전체 보기 모드
  isHighlighted?: boolean;
  onClick: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({
  level,
  progress,
  studentCount = 0,
  isOverviewMode = false,
  isHighlighted = false,
  onClick,
}) => {
  const isCompleted = !isOverviewMode && progress >= 100;
  const isLocked = !isOverviewMode && progress === 0;
  const hasStudents = studentCount > 0;
  
  return (
    <button
      onClick={onClick}
      className={`
        relative p-3 rounded-lg border-2 transition-all cursor-pointer
        ${isHighlighted 
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300 scale-105' 
          : isOverviewMode
            ? hasStudents
              ? 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100'
              : 'border-gray-200 bg-gray-50'
            : isCompleted
              ? 'border-green-300 bg-green-50'
              : isLocked
                ? 'border-gray-200 bg-gray-50'
                : 'border-yellow-300 bg-yellow-50'
        }
        hover:shadow-md
      `}
    >
      {/* 레벨 코드 */}
      <div className={`text-sm font-bold ${isHighlighted ? 'text-blue-700' : 'text-gray-700'}`}>
        {level.code}
      </div>
      
      {/* ⭐ 전체 보기 모드: 수강생 수 표시 */}
      {isOverviewMode ? (
        <div className="mt-2">
          {hasStudents ? (
            <div className="flex items-center gap-1 justify-center">
              <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-xs font-medium text-emerald-700">{studentCount}명</span>
            </div>
          ) : (
            <div className="text-xs text-gray-400">-</div>
          )}
        </div>
      ) : (
        /* 학생 선택 모드: 기존 진행률 표시 */
        <>
          <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isCompleted ? 'bg-green-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">{progress}%</div>
        </>
      )}
      
      {/* 잠금 아이콘 (진행률 0%, 학생 선택 모드만) */}
      {!isOverviewMode && isLocked && (
        <div className="absolute top-1 right-1">
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      )}
      
      {/* 완료 체크 (학생 선택 모드만) */}
      {!isOverviewMode && isCompleted && (
        <div className="absolute top-1 right-1 text-green-500">✓</div>
      )}
      
      {/* 현재 학습 중 표시 (하이라이트) */}
      {isHighlighted && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
      )}
    </button>
  );
};

export default LevelCard;
