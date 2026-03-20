/**
 * AI 분석 중 애니메이션 (시뮬레이션 5초)
 */

import React, { useEffect, useState } from 'react';

interface AIAnalyzingStepProps {
  onComplete: () => void;
}

const AIAnalyzingStep: React.FC<AIAnalyzingStepProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: '손글씨 인식 완료', icon: '✅', duration: 1000 },
    { label: '답안 추출 중...', icon: '✅', duration: 1500 },
    { label: 'AI 채점 + 피드백 생성 중...', icon: '⏳', duration: 2500 },
  ];

  useEffect(() => {
    const totalDuration = 5000; // 5초
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step
      if (elapsed < 1000) {
        setCurrentStep(0);
      } else if (elapsed < 2500) {
        setCurrentStep(1);
      } else {
        setCurrentStep(2);
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          🤖 AI가 채점하고 있어요...
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          잠시만 기다려주세요
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-3">
        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-xl md:text-2xl font-bold text-blue-600">
          {Math.floor(progress)}%
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div
              key={index}
              className={`
                flex items-center gap-3 p-3 md:p-4 rounded-lg transition-all
                ${isCurrent ? 'bg-blue-50 border-2 border-blue-300' : 'bg-gray-50'}
              `}
            >
              <span className="text-2xl">{isComplete ? '✅' : isCurrent ? step.icon : '⏳'}</span>
              <span className={`
                text-sm md:text-base font-medium
                ${isCurrent ? 'text-blue-700' : isComplete ? 'text-gray-500 line-through' : 'text-gray-400'}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 문항 정보 */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-6">
        <h3 className="font-bold text-gray-800 mb-3 text-sm md:text-base">📝 인식된 문항: 6개</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span>•</span>
            <span className="text-gray-700">단어 3문항</span>
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span className="text-gray-700">문장 2문항</span>
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span className="text-gray-700">자유 영작 1문항</span>
          </div>
        </div>
      </div>

      {/* AI 정보 */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <span className="text-purple-600 text-xl">🤖</span>
          <div className="flex-1 text-xs md:text-sm text-purple-800">
            <strong>사용 AI: Claude Sonnet 4 (멀티모달)</strong>
            <p className="mt-1 text-xs">
              ※ OCR 없이 AI가 이미지를 직접 보고 채점합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyzingStep;
