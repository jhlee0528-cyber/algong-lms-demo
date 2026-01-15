import React, { useState } from 'react';

interface FeedbackData {
  rating: number;
  category: string;
  message: string;
  page: string;
  timestamp: string;
}

const FeedbackButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { value: 'bug', label: '🐛 버그 신고' },
    { value: 'feature', label: '💡 기능 제안' },
    { value: 'ui', label: '🎨 UI/UX 개선' },
    { value: 'other', label: '💬 기타 의견' },
  ];

  const handleSubmit = () => {
    const feedback: FeedbackData = {
      rating,
      category,
      message,
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    };

    // 로컬스토리지에 저장 (백엔드 연동 전 임시)
    const existingFeedback = JSON.parse(localStorage.getItem('algong-feedback') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('algong-feedback', JSON.stringify(existingFeedback));

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setRating(0);
      setCategory('');
      setMessage('');
    }, 2000);
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        title="피드백 보내기"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* 피드백 모달 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">💬 피드백 보내기</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-blue-100 mt-1">
                여러분의 의견이 서비스 개선에 큰 도움이 됩니다
              </p>
            </div>

            {submitted ? (
              /* 제출 완료 */
              <div className="p-8 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">감사합니다!</h4>
                <p className="text-gray-500">소중한 피드백이 전달되었습니다.</p>
              </div>
            ) : (
              /* 피드백 폼 */
              <div className="p-5 space-y-4">
                {/* 평점 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전반적인 만족도
                  </label>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-3xl transition-transform hover:scale-110 ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* 카테고리 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    피드백 유형
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setCategory(cat.value)}
                        className={`p-2 text-sm rounded-lg border-2 transition-all ${
                          category === cat.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 메시지 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상세 내용
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="어떤 점을 개선하면 좋을까요?"
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* 제출 버튼 */}
                <button
                  onClick={handleSubmit}
                  disabled={!rating || !category}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  피드백 보내기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
