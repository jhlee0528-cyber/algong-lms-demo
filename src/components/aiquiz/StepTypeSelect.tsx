/**
 * AI 문제 만들기 Step 2: 문제 유형 선택
 */

import React from 'react';

export type QuestionType = 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'review' | 'mixed';

interface QuestionTypeOption {
  type: QuestionType;
  label: string;
  icon: string;
  description: string;
  color: string;
}

interface StepTypeSelectProps {
  selectedType: QuestionType | null;
  onTypeChange: (type: QuestionType) => void;
  onNext: () => void;
  onBack: () => void;
}

const typeOptions: QuestionTypeOption[] = [
  {
    type: 'vocabulary',
    label: '어휘 문제',
    icon: '📚',
    description: '단어 뜻, 철자, 사용법 등',
    color: 'from-blue-500 to-blue-600',
  },
  {
    type: 'grammar',
    label: '문법 문제',
    icon: '✏️',
    description: '시제, 품사, 문장 구조 등',
    color: 'from-green-500 to-green-600',
  },
  {
    type: 'reading',
    label: '독해 문제',
    icon: '📖',
    description: '지문 읽고 이해하기',
    color: 'from-purple-500 to-purple-600',
  },
  {
    type: 'listening',
    label: '듣기 문제',
    icon: '🎧',
    description: '음성 듣고 이해하기',
    color: 'from-orange-500 to-orange-600',
  },
  {
    type: 'review',
    label: '복습 문제',
    icon: '🔄',
    description: '이전 학습 내용 복습',
    color: 'from-pink-500 to-pink-600',
  },
  {
    type: 'mixed',
    label: '혼합 문제',
    icon: '🎲',
    description: '여러 유형 섞어서',
    color: 'from-indigo-500 to-indigo-600',
  },
];

const StepTypeSelect: React.FC<StepTypeSelectProps> = ({
  selectedType,
  onTypeChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          2단계: 문제 유형 선택
        </h2>
        <p className="text-gray-600">
          출제할 문제의 유형을 선택하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {typeOptions.map((option) => {
          const isSelected = selectedType === option.type;
          return (
            <button
              key={option.type}
              onClick={() => onTypeChange(option.type)}
              className={`
                relative p-6 rounded-xl transition-all duration-200
                ${isSelected
                  ? 'ring-4 ring-blue-500 shadow-xl scale-105'
                  : 'ring-2 ring-gray-200 hover:ring-blue-300 hover:shadow-lg'
                }
              `}
            >
              <div className={`
                absolute inset-0 rounded-xl bg-gradient-to-br ${option.color} opacity-10
                ${isSelected ? 'opacity-20' : ''}
              `} />

              <div className="relative space-y-3">
                <div className="text-4xl">{option.icon}</div>
                <h3 className="text-lg font-bold text-gray-800">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {option.description}
                </p>
                {isSelected && (
                  <div className="flex items-center justify-center pt-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
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
          disabled={!selectedType}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${!selectedType
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }
          `}
        >
          다음 단계 →
        </button>
      </div>
    </div>
  );
};

export default StepTypeSelect;
