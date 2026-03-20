/**
 * AI 문제 만들기 Step 4: AI 생성 중
 */

import React, { useEffect, useState } from 'react';

interface StepGeneratingProps {
  questionCount: number;
  onComplete: () => void;
}

const StepGenerating: React.FC<StepGeneratingProps> = ({
  questionCount,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    { label: '학습 데이터 분석 중...', icon: '📊', duration: 1500 },
    { label: '문제 유형 구성 중...', icon: '🎯', duration: 1500 },
    { label: 'AI 문제 생성 중...', icon: '🤖', duration: 2000 },
    { label: '난이도 조정 중...', icon: '⚖️', duration: 1000 },
    { label: '최종 검토 중...', icon: '✅', duration: 1000 },
  ];

  useEffect(() => {
    const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
    let elapsed = 0;
    let phaseIndex = 0;
    let phaseElapsed = 0;

    const interval = setInterval(() => {
      elapsed += 50;
      phaseElapsed += 50;

      // Update progress
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));

      // Update phase
      if (phaseElapsed >= phases[phaseIndex].duration && phaseIndex < phases.length - 1) {
        phaseIndex++;
        phaseElapsed = 0;
        setCurrentPhase(phaseIndex);
      }

      // Complete
      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete, questionCount]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          4단계: AI가 문제를 생성하고 있습니다
        </h2>
        <p className="text-gray-600">
          총 {questionCount}문제를 생성 중입니다. 잠시만 기다려주세요.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative w-32 h-32">
          {/* Spinning circle */}
          <div className="absolute inset-0 border-8 border-blue-100 rounded-full" />
          <div
            className="absolute inset-0 border-8 border-blue-600 rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: '1s' }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl animate-pulse">
              {phases[currentPhase].icon}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress bar */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-center text-2xl font-bold text-blue-600">
          {Math.floor(progress)}%
        </div>

        {/* Current phase */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <span className="text-xl">{phases[currentPhase].icon}</span>
            <span className="text-sm font-medium text-blue-700">
              {phases[currentPhase].label}
            </span>
          </div>
        </div>
      </div>

      {/* Phase checklist */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">진행 상황</h3>
        <div className="space-y-2">
          {phases.map((phase, index) => {
            const isComplete = index < currentPhase;
            const isCurrent = index === currentPhase;
            return (
              <div
                key={index}
                className={`
                  flex items-center gap-3 p-2 rounded-lg transition-colors
                  ${isCurrent ? 'bg-blue-100' : ''}
                `}
              >
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                  ${isComplete ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'}
                `}>
                  {isComplete ? (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <span className={`
                  text-sm
                  ${isComplete ? 'text-gray-500 line-through' : isCurrent ? 'text-blue-700 font-semibold' : 'text-gray-400'}
                `}>
                  {phase.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepGenerating;
