/**
 * AI 문제 만들기 Step 5: 문제 목록 확인 및 선택
 */

import React from 'react';
import type { QuizQuestion } from '../../data/mockQuestions';

interface StepQuestionListProps {
  questions: QuizQuestion[];
  selectedQuestions: string[];
  onQuestionsChange: (questionIds: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepQuestionList: React.FC<StepQuestionListProps> = ({
  questions,
  selectedQuestions,
  onQuestionsChange,
  onNext,
  onBack,
}) => {
  const handleToggleQuestion = (questionId: string) => {
    if (selectedQuestions.includes(questionId)) {
      onQuestionsChange(selectedQuestions.filter(id => id !== questionId));
    } else {
      onQuestionsChange([...selectedQuestions, questionId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === questions.length) {
      onQuestionsChange([]);
    } else {
      onQuestionsChange(questions.map(q => q.id));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return difficulty;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          5단계: 생성된 문제 확인
        </h2>
        <p className="text-gray-600">
          AI가 생성한 문제를 확인하고, 사용할 문제를 선택하세요.
        </p>
      </div>

      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            선택된 문제: <strong className="text-blue-600">{selectedQuestions.length}개</strong> / 전체 {questions.length}개
          </span>
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {selectedQuestions.length === questions.length ? '전체 해제' : '전체 선택'}
          </button>
        </div>
        {selectedQuestions.length > 0 && (
          <div className="text-sm text-gray-600">
            💡 다음 단계에서 AI가 선택된 문제를 검수합니다
          </div>
        )}
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {questions.map((question, index) => {
          const isSelected = selectedQuestions.includes(question.id);
          return (
            <div
              key={question.id}
              className={`
                border-2 rounded-lg p-5 transition-all duration-200
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => handleToggleQuestion(question.id)}
                  className={`
                    flex-shrink-0 w-6 h-6 mt-1 rounded border-2 flex items-center justify-center transition-colors
                    ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 hover:border-blue-400'}
                  `}
                >
                  {isSelected && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                {/* Question content */}
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-gray-500">Q{index + 1}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                      {question.typeLabel}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {getDifficultyLabel(question.difficulty)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {question.targetLevel}
                    </span>
                  </div>

                  {/* Question text */}
                  <div className="text-gray-800 font-medium">
                    {question.question}
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === question.answer;
                      return (
                        <div
                          key={optionIndex}
                          className={`
                            flex items-center gap-2 p-2 rounded-lg text-sm
                            ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}
                          `}
                        >
                          <span className={`
                            flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${isCorrect ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}
                          `}>
                            {optionIndex + 1}
                          </span>
                          <span className={isCorrect ? 'text-green-800 font-medium' : 'text-gray-700'}>
                            {option}
                          </span>
                          {isCorrect && (
                            <span className="ml-auto text-green-600 text-xs font-semibold">✓ 정답</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
        >
          ← 문제 재생성
        </button>
        <button
          onClick={onNext}
          disabled={selectedQuestions.length === 0}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${selectedQuestions.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }
          `}
        >
          AI 검수 시작 →
        </button>
      </div>
    </div>
  );
};

export default StepQuestionList;
