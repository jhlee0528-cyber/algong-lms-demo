import React, { useState, useEffect } from 'react';

interface TourStep {
  target: string;        // CSS selector
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="dashboard-stats"]',
    title: '📊 주간 학습 현황',
    content: '이번 주 학생들의 학습 완료율, 정답률 등을 한눈에 확인하세요. 지난 주와 비교할 수도 있습니다.',
    position: 'bottom'
  },
  {
    target: '[data-tour="curriculum-selector"]',
    title: '📚 커리큘럼 선택',
    content: 'Phonics, Reading, Grammar, Writing 중 원하는 영역을 선택하여 단원별 현황을 확인하세요.',
    position: 'bottom'
  },
  {
    target: '[data-tour="student-table"]',
    title: '👨‍🎓 학생 목록',
    content: '각 학생의 학습 진행률, 미션 완료율, 정답률을 확인하고 클릭하면 상세 정보를 볼 수 있습니다.',
    position: 'top'
  },
  {
    target: '[data-tour="unit-progress"]',
    title: '📈 단원별 진행도',
    content: '선택한 단원의 과제 유형별(강의/액티비티/AI대화/도서관) 완료 현황을 확인하세요.',
    position: 'left'
  }
];

interface OnboardingTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const target = document.querySelector(tourSteps[currentStep].target);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const rect = target.getBoundingClientRect();
        setTargetRect(rect);
        target.classList.add('tour-highlight');
      }, 300);
    }
    return () => {
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tourSteps[currentStep];

  if (!targetRect) {
    return null;
  }

  return (
    <>
      {/* 오버레이 */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={onSkip} />
      
      {/* 투어 팝오버 */}
      <div 
        className="fixed z-[9999] bg-white rounded-xl shadow-2xl p-5 w-80 animate-fade-in"
        style={{
          top: step.position === 'bottom' ? targetRect.bottom + 12 : 
               step.position === 'top' ? targetRect.top - 200 : targetRect.top,
          left: step.position === 'right' ? targetRect.right + 12 :
                step.position === 'left' ? targetRect.left - 340 : 
                targetRect.left + (targetRect.width / 2) - 160
        }}
      >
        {/* 진행 표시 */}
        <div className="flex gap-1 mb-3">
          {tourSteps.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 flex-1 rounded-full ${idx <= currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{step.content}</p>

        <div className="flex justify-between items-center">
          <button 
            onClick={onSkip}
            className="text-gray-400 text-sm hover:text-gray-600"
          >
            건너뛰기
          </button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button 
                onClick={handlePrev}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                이전
              </button>
            )}
            <button 
              onClick={handleNext}
              className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {currentStep === tourSteps.length - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>

        {/* 단계 표시 */}
        <div className="text-center mt-3 text-xs text-gray-400">
          {currentStep + 1} / {tourSteps.length}
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
