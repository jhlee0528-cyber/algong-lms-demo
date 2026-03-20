/**
 * AI코비 대시보드 트리거 카드
 * 주간 학습 현황 우측에 배치되는 카드 (노란색 회전 테두리 애니메이션)
 */

import React from 'react';

interface AICobyDashboardCardProps {
  onClick: () => void;
}

const AICobyDashboardCard: React.FC<AICobyDashboardCardProps> = ({ onClick }) => {
  const urgentCount = 2; // 긴급 알림 개수
  const todoCount = 4; // 할 일 개수

  return (
    <>
      <style>{`
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .glow-border::before {
          content: '';
          position: absolute;
          top: -3px;
          right: -3px;
          bottom: -3px;
          left: -3px;
          background: conic-gradient(from 0deg, transparent 0%, #fbbf24 50%, transparent 100%);
          border-radius: inherit;
          z-index: -1;
          animation: rotate-glow 3s linear infinite;
        }
      `}</style>

      <button
        onClick={onClick}
        className="
          glow-border
          relative w-full h-32
          bg-gradient-to-br from-purple-500 to-indigo-600
          text-white rounded-xl shadow-xl
          hover:shadow-2xl hover:scale-[1.02]
          transition-all duration-300
          cursor-pointer
          p-5
          flex flex-col justify-between
        "
      >
      {/* 긴급 알림 뱃지 */}
      {urgentCount > 0 && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse shadow-lg">
          {urgentCount}
        </div>
      )}

      {/* 상단: 아이콘 + 제목 */}
      <div className="flex items-center gap-3">
        <div className="text-4xl">🤖</div>
        <div className="text-left">
          <h3 className="text-xl font-bold">AI코비</h3>
          <p className="text-xs text-purple-100">AI 코칭 비서</p>
        </div>
      </div>

      {/* 중단: 알림 카운트 */}
      <div className="flex items-center justify-around text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-red-300">🔴</span>
          <span className="font-medium text-yellow-300">긴급 {urgentCount}건</span>
        </div>
        <div className="w-px h-4 bg-white bg-opacity-30" />
        <div className="flex items-center gap-1.5">
          <span>📋</span>
          <span className="font-medium text-yellow-300">할 일 {todoCount}건</span>
        </div>
      </div>

      {/* 하단: CTA */}
      <div className="flex items-center justify-end text-sm font-medium opacity-90">
        <span>클릭하여 열기</span>
        <span className="ml-1">→</span>
      </div>
    </button>
    </>
  );
};

export default AICobyDashboardCard;
