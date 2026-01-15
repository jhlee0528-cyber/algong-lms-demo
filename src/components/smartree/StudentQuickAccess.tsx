import React from 'react';
import { DOMAIN_CONFIG } from '../../data/curriculumLevels';
import { Domain, LevelCode } from '../../types/smartree';

interface StudentQuickAccessProps {
  studentName: string;
  currentLevel: LevelCode;
  currentDomain: Domain;
  currentUnit: number;
  onContinue: () => void;
  onViewDetails: () => void;
}

const StudentQuickAccess: React.FC<StudentQuickAccessProps> = ({
  studentName,
  currentLevel,
  currentDomain,
  currentUnit,
  onContinue,
  onViewDetails,
}) => {
  const domainConfig = DOMAIN_CONFIG[currentDomain];
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* 현재 위치 정보 */}
        <div>
          <div className="text-sm text-gray-500 mb-1">
            📍 {studentName} 현재 학습 위치
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-800">{currentLevel}</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600">Unit {currentUnit}</span>
            <span className="text-gray-400">›</span>
            <span className={`px-2 py-0.5 rounded-full text-sm ${domainConfig.bgColor} ${domainConfig.color}`}>
              {domainConfig.icon} {currentDomain}
            </span>
          </div>
        </div>
        
        {/* 액션 버튼 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onViewDetails}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            상세 보기
          </button>
          <button
            onClick={onContinue}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            이어서 학습하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentQuickAccess;
