/**
 * AI코비 입력 영역 컴포넌트
 * 텍스트 입력 + 자주 쓰는 요청
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quickActions } from '../../data/aiCobyResponses';
import type { CobyResponse } from '../../data/aiCobyResponses';

interface AICobyInputProps {
  onSubmit: (input: string) => void;
  onQuickAction: (path: string) => void;
}

const AICobyInput: React.FC<AICobyInputProps> = ({ onSubmit, onQuickAction }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <div className="space-y-4">
      {/* 질문 입력 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span>💬</span>
          <span>무엇을 도와드릴까요?</span>
        </h3>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="채점, 학부모, 학생 이름 등..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            전송
          </button>
        </form>
      </div>

      {/* 자주 쓰는 요청 */}
      <div>
        <h4 className="text-xs font-medium text-gray-600 mb-2">자주 쓰는 요청</h4>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => onQuickAction(action.navigateTo)}
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-purple-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:text-purple-700 hover:border-purple-300 transition-all"
            >
              <span>{action.icon}</span>
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AICobyInput;
