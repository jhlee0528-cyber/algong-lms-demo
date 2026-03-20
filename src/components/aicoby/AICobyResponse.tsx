/**
 * AI코비 응답 카드 컴포넌트
 * 선택안을 카드 버튼으로 표시
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CobyOption } from '../../data/aiCobyResponses';

interface AICobyResponseProps {
  message: string;
  alert?: string;
  options: CobyOption[];
  onNavigate: () => void; // 패널 닫기 콜백
}

const AICobyResponse: React.FC<AICobyResponseProps> = ({
  message,
  alert,
  options,
  onNavigate,
}) => {
  const navigate = useNavigate();

  const handleOptionClick = (path: string) => {
    navigate(path);
    onNavigate(); // 패널 닫기
  };

  return (
    <div className="space-y-4">
      {/* 응답 메시지 */}
      <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
        <div className="flex items-start gap-2">
          <span className="text-xl flex-shrink-0">🤖</span>
          <div>
            <div className="text-xs font-medium text-purple-700 mb-1">AI코비</div>
            <p className="text-sm text-gray-800">{message}</p>
          </div>
        </div>
      </div>

      {/* 알림 (있으면 표시) */}
      {alert && (
        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <p className="text-sm font-medium text-yellow-800">{alert}</p>
        </div>
      )}

      {/* 선택안 카드들 */}
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option.navigateTo)}
            className="w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md hover:border-purple-300 group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {option.icon}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-purple-700 transition-colors">
                  {option.title}
                </h4>
                <p className="text-xs text-gray-600">{option.description}</p>
              </div>
              <span className="text-gray-400 group-hover:text-purple-500 transition-colors">
                →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AICobyResponse;
