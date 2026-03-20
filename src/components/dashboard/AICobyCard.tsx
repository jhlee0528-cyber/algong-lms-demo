/**
 * AI Coby 분석 카드 컴포넌트
 * 학습 현황 페이지 대시보드에 표시되는 AI 분석 리포트 카드
 */

import React, { useState } from 'react';
import AICobyModal from './AICobyModal';

interface AICobyCardProps {
  warningStudentCount?: number;
}

const AICobyCard: React.FC<AICobyCardProps> = ({ warningStudentCount = 3 }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-[2px_2px_4px_rgba(0,0,0,0.1)] border border-indigo-100">
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl mr-2">🤖</span>
          <div className="text-sm font-semibold text-indigo-700">AI Coby</div>
        </div>
        <div className="text-xl font-bold text-indigo-600 mb-1">
          {warningStudentCount}명 주의 필요
        </div>
        <div className="text-xs text-gray-600 mb-3">AI 분석 리포트</div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          상세 보기
        </button>
      </div>

      {/* AI Coby 모달 */}
      {showModal && (
        <AICobyModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default AICobyCard;
