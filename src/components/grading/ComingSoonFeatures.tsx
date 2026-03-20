/**
 * 곧 출시될 기능 미리보기
 * QR 자동채점 스테이션 + 셀프채점 스테이션
 */

import React from 'react';

const ComingSoonFeatures: React.FC = () => {
  const handleComingSoonClick = () => {
    alert('준비 중입니다. 곧 만나보실 수 있어요! 🎉');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">💡 곧 출시될 기능</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* QR 자동채점 스테이션 */}
        <button
          onClick={handleComingSoonClick}
          className="group relative bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-4 md:p-6 text-left hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
              🔮 곧 출시
            </span>
          </div>

          <div className="space-y-3">
            <div className="text-4xl">🎯</div>
            <h4 className="text-lg font-bold text-gray-800">QR 자동채점 스테이션</h4>
            <p className="text-sm text-gray-600">
              워크시트를 거치대에 놓기만 하면<br />
              QR 자동 감지 → 촬영 → 채점 → DB 저장!
            </p>
            <div className="pt-2 space-y-1 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>교사 동작: <strong className="text-blue-600">놓기 1회 → 끝</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>QR 코드로 학생 자동 인식</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>채점 결과 자동 DB 저장</span>
              </div>
            </div>
          </div>
        </button>

        {/* 셀프채점 스테이션 */}
        <button
          onClick={handleComingSoonClick}
          className="group relative bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-4 md:p-6 text-left hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
              🔮 곧 출시
            </span>
          </div>

          <div className="space-y-3">
            <div className="text-4xl">🎮</div>
            <h4 className="text-lg font-bold text-gray-800">셀프채점 스테이션</h4>
            <p className="text-sm text-gray-600">
              학생이 직접 셀프계산대처럼 채점!<br />
              점수 카운트업 + 경험치 + 레벨업 보상
            </p>
            <div className="pt-2 space-y-1 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span><strong className="text-purple-600">원장님 채점 부담 0%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>게임화된 채점 경험</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>즉시 피드백 + 보상 시스템</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* 추가 설명 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
        <div className="flex items-start gap-2">
          <span className="text-blue-600 text-xl flex-shrink-0">ℹ️</span>
          <p className="text-xs md:text-sm text-blue-800">
            <strong>교사 채점 시간 100% 절감!</strong>
            <br />
            QR 스테이션으로 교사는 놓기만 하면 끝, 셀프채점으로 학생이 직접 채점하면 교사는 0분 투입!
            지금까지의 원장님 Pain Point 1위였던 "채점 자동화"가 완전히 해결됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonFeatures;
