/**
 * AI 문제 만들기 Step 3: 문제 개수 선택
 */

import React from 'react';

interface StepCountSelectProps {
  selectedCount: number;
  onCountChange: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const countOptions = [5, 10, 15, 20, 30, 50];

const StepCountSelect: React.FC<StepCountSelectProps> = ({
  selectedCount,
  onCountChange,
  onNext,
  onBack,
}) => {
  const handleCustomInput = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0 && num <= 100) {
      onCountChange(num);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          3단계: 문제 개수 선택
        </h2>
        <p className="text-gray-600">
          생성할 문제의 개수를 선택하세요. (최대 100문제)
        </p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
        <div className="text-center">
          <div className="text-sm text-blue-700 font-medium mb-2">선택된 문제 개수</div>
          <div className="text-5xl font-bold text-blue-600 mb-1">
            {selectedCount}
          </div>
          <div className="text-sm text-blue-600">문제</div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">빠른 선택</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {countOptions.map((count) => {
            const isSelected = selectedCount === count;
            return (
              <button
                key={count}
                onClick={() => onCountChange(count)}
                className={`
                  py-4 px-3 rounded-lg font-semibold transition-all duration-200
                  ${isSelected
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:shadow-md'
                  }
                `}
              >
                {count}문제
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">직접 입력</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="1"
            max="100"
            value={selectedCount}
            onChange={(e) => handleCustomInput(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="1 ~ 100"
          />
          <span className="text-gray-600 font-medium">문제</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ⓘ 문제 개수가 많을수록 AI 생성 시간이 길어질 수 있습니다.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-yellow-600">💡</span>
          <div className="text-sm text-yellow-800">
            <strong>추천:</strong> 처음 사용하시는 경우 10~20문제로 시작하시는 것을 권장합니다.
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
        >
          ← 이전 단계
        </button>
        <button
          onClick={onNext}
          disabled={selectedCount < 1 || selectedCount > 100}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${selectedCount < 1 || selectedCount > 100
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }
          `}
        >
          AI 생성 시작 →
        </button>
      </div>
    </div>
  );
};

export default StepCountSelect;
