// AI 채점 로딩 애니메이션 (3초)
import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-lg p-8">
      {/* 로딩 스피너 */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          🤖
        </div>
      </div>

      {/* 로딩 텍스트 */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        ⏳ AI가 채점하고 있어요...
      </h3>
      <p className="text-gray-600 text-center mb-6">
        잠시만 기다려주세요 (약 3초 소요)
      </p>

      {/* 진행 단계 표시 */}
      <div className="w-full max-w-md space-y-3">
        <StepIndicator delay={0} text="워크시트 분석 중..." />
        <StepIndicator delay={1000} text="정답 확인 중..." />
        <StepIndicator delay={2000} text="오답 패턴 분석 중..." />
      </div>
    </div>
  );
};

// 단계별 표시 컴포넌트
const StepIndicator: React.FC<{ delay: number; text: string }> = ({ delay, text }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    const activeTimer = setTimeout(() => setIsActive(true), delay);
    const completeTimer = setTimeout(() => setIsComplete(true), delay + 800);

    return () => {
      clearTimeout(activeTimer);
      clearTimeout(completeTimer);
    };
  }, [delay]);

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
        isActive ? 'bg-blue-50' : 'bg-gray-50'
      }`}
    >
      <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
        isComplete
          ? 'bg-green-500 border-green-500'
          : isActive
          ? 'border-blue-500 bg-white'
          : 'border-gray-300 bg-white'
      }`}>
        {isComplete && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {!isComplete && isActive && (
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        )}
      </div>
      <span className={`text-sm transition-colors ${
        isComplete ? 'text-green-700 font-medium' : isActive ? 'text-blue-700' : 'text-gray-500'
      }`}>
        {text}
      </span>
    </div>
  );
};

export default LoadingAnimation;
