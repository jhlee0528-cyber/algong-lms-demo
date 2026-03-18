// 빠른 채점 버튼 컴포넌트
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickGradingButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">📸 빠른 채점</h3>
          <p className="text-sm text-blue-100">3초 만에 자동 채점 + 학부모 메시지</p>
        </div>
        <button
          onClick={() => navigate('/grading/quick')}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 shadow-md"
        >
          시작하기
        </button>
      </div>

      {/* 미니 안내 */}
      <div className="mt-4 pt-4 border-t border-blue-400 text-xs text-blue-100">
        💡 갤러리에서 샘플을 선택하면 바로 채점 결과를 확인할 수 있어요
      </div>
    </div>
  );
};

export default QuickGradingButton;
