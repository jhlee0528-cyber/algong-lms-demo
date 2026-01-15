/**
 * AI 대화 과제 카드 컴포넌트
 */

import React, { useState } from 'react';
import type { AiChatTask } from '../../types';

interface AiChatTaskCardProps {
  value?: AiChatTask;
  onChange?: (task: AiChatTask | null) => void;
}

const AiChatTaskCard: React.FC<AiChatTaskCardProps> = ({ value, onChange }) => {
  const [enabled, setEnabled] = useState(value?.enabled || false);

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);

    if (newEnabled) {
      onChange?.({ type: 'ai_chat', enabled: true });
    } else {
      onChange?.(null);
    }
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all ${
        enabled
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-300 bg-white hover:border-gray-400'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <h4 className="font-semibold text-gray-800">AI 대화</h4>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      {enabled && (
        <div className="mt-3 space-y-2">
          <div className="p-3 rounded border-2 border-purple-200 bg-purple-50">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={true}
                readOnly
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">교과서 대화</span>
              <span className="text-xs text-gray-500 ml-auto">약 10분</span>
            </div>
            <p className="text-xs text-gray-600 mt-2 ml-6">
              GPT 기반 영어 대화 연습을 진행합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChatTaskCard;
