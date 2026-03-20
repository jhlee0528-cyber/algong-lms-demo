/**
 * AI코비 플로팅 버튼
 * 우측 하단에 항상 떠있는 트리거 버튼
 */

import React, { useState, useEffect } from 'react';

interface AICobyFloatingButtonProps {
  onClick: () => void;
}

const AICobyFloatingButton: React.FC<AICobyFloatingButtonProps> = ({ onClick }) => {
  const [hasNotification, setHasNotification] = useState(true); // 알림 있음 표시
  const [isVisible, setIsVisible] = useState(false);

  // 마운트 시 바운스 애니메이션
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-20 right-6 md:bottom-8 md:right-8
        w-16 h-16 rounded-full
        bg-gradient-to-r from-purple-500 to-indigo-600
        hover:from-purple-600 hover:to-indigo-700
        text-white shadow-2xl
        flex flex-col items-center justify-center
        transition-all duration-300 ease-out
        z-30
        ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        hover:scale-110
        animate-bounce
      `}
      style={{
        animationDuration: '2s',
        animationIterationCount: '3',
      }}
    >
      {/* 알림 뱃지 */}
      {hasNotification && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
          4
        </div>
      )}

      {/* 아이콘 */}
      <div className="text-2xl mb-0.5">🤖</div>

      {/* 텍스트 */}
      <div className="text-[10px] font-bold leading-tight">AI코비</div>
    </button>
  );
};

export default AICobyFloatingButton;
