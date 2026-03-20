/**
 * 수업보기 - 상단 헤더 컴포넌트
 * 실시간 접속 현황 표시
 */

import React from 'react';

interface ClassroomHeaderProps {
  total: number;
  learning: number;
  paused: number;
  offline: number;
  online: number;
}

const ClassroomHeader: React.FC<ClassroomHeaderProps> = ({
  total,
  learning,
  paused,
  offline,
  online,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span>📖</span>
            <span>수업보기</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">학생들의 실시간 학습 현황을 확인하세요</p>
        </div>

        <div className="flex items-center gap-4">
          {/* 실시간 표시 */}
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700">실시간</span>
          </div>

          {/* 접속 현황 */}
          <div className="flex items-center gap-6 bg-gray-50 px-6 py-3 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{online}명</div>
              <div className="text-xs text-gray-600">접속 중</div>
            </div>
            <div className="w-px h-10 bg-gray-300" />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-700">{learning}명 학습</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-sm text-gray-700">{paused}명 대기</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-700">{offline}명 오프라인</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomHeader;
