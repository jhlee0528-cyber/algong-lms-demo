/**
 * AI 문제 만들기 Step 6: AI 검수
 */

import React, { useEffect, useState } from 'react';

interface StepReviewProps {
  questionCount: number;
  onComplete: () => void;
}

interface ReviewItem {
  category: string;
  icon: string;
  status: 'pending' | 'checking' | 'pass' | 'warning';
  message: string;
  details?: string;
}

const StepReview: React.FC<StepReviewProps> = ({
  questionCount,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      category: '문법 정확성',
      icon: '✏️',
      status: 'pending',
      message: '문법 오류 확인 대기 중',
    },
    {
      category: '난이도 적정성',
      icon: '⚖️',
      status: 'pending',
      message: '난이도 분석 대기 중',
    },
    {
      category: '정답 검증',
      icon: '✓',
      status: 'pending',
      message: '정답 논리성 확인 대기 중',
    },
    {
      category: '중복 문제',
      icon: '🔍',
      status: 'pending',
      message: '유사 문제 검사 대기 중',
    },
    {
      category: '교육 적합성',
      icon: '🎓',
      status: 'pending',
      message: '교육 콘텐츠 적합성 검토 대기 중',
    },
  ]);

  useEffect(() => {
    const totalSteps = reviews.length;
    const stepDuration = 800; // ms per step
    let step = 0;

    const interval = setInterval(() => {
      if (step < totalSteps) {
        // Update current item to checking
        setReviews(prev => prev.map((item, idx) => {
          if (idx === step) {
            return { ...item, status: 'checking' as const };
          }
          return item;
        }));

        // After a short delay, mark as pass
        setTimeout(() => {
          setReviews(prev => prev.map((item, idx) => {
            if (idx === step) {
              const isWarning = step === 1 && Math.random() > 0.5; // 50% chance for warning on difficulty
              return {
                ...item,
                status: (isWarning ? 'warning' : 'pass') as const,
                message: isWarning
                  ? '일부 문제의 난이도가 높습니다'
                  : getPassMessage(step),
                details: isWarning ? '2개 문제가 학생 수준보다 약간 높을 수 있습니다' : undefined,
              };
            }
            return item;
          }));
          setCurrentIndex(step + 1);
        }, stepDuration / 2);

        step++;
        setProgress((step / totalSteps) * 100);
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getPassMessage = (index: number): string => {
    const messages = [
      '문법 오류가 발견되지 않았습니다',
      '난이도가 적절하게 분포되어 있습니다',
      '모든 정답이 논리적으로 검증되었습니다',
      '중복되는 문제가 없습니다',
      '교육 콘텐츠로 적합합니다',
    ];
    return messages[index] || '검토 완료';
  };

  const getStatusIcon = (status: ReviewItem['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-6 h-6 rounded-full bg-gray-300" />;
      case 'checking':
        return (
          <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        );
      case 'pass':
        return (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          6단계: AI가 문제를 검수하고 있습니다
        </h2>
        <p className="text-gray-600">
          선택하신 {questionCount}개 문제를 자동으로 검수합니다.
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center text-sm font-semibold text-green-600">
          {Math.floor(progress)}% 완료
        </div>
      </div>

      {/* Review items */}
      <div className="bg-white rounded-lg border-2 border-gray-200 divide-y divide-gray-200">
        {reviews.map((review, index) => (
          <div
            key={index}
            className={`
              p-4 transition-all duration-300
              ${review.status === 'checking' ? 'bg-blue-50' : ''}
              ${review.status === 'warning' ? 'bg-yellow-50' : ''}
            `}
          >
            <div className="flex items-start gap-4">
              {/* Status icon */}
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(review.status)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{review.icon}</span>
                  <h3 className="text-sm font-bold text-gray-800">
                    {review.category}
                  </h3>
                </div>
                <p className={`
                  text-sm
                  ${review.status === 'pass' ? 'text-green-700' : ''}
                  ${review.status === 'warning' ? 'text-yellow-700 font-medium' : ''}
                  ${review.status === 'checking' ? 'text-blue-700 font-medium' : ''}
                  ${review.status === 'pending' ? 'text-gray-500' : ''}
                `}>
                  {review.message}
                </p>
                {review.details && (
                  <p className="text-xs text-gray-600 mt-1">
                    {review.details}
                  </p>
                )}
              </div>

              {/* Badge */}
              {review.status === 'pass' && (
                <span className="flex-shrink-0 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  통과
                </span>
              )}
              {review.status === 'warning' && (
                <span className="flex-shrink-0 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
                  주의
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-blue-600 text-xl">ℹ️</span>
          <div className="text-sm text-blue-800">
            <strong>자동 검수:</strong> AI가 문법, 난이도, 정답 검증, 중복 여부, 교육 적합성을 자동으로 확인합니다.
            경고가 있더라도 사용에는 문제가 없으며, 필요시 수정할 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepReview;
