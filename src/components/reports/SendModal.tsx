// 발송 모의 완료 모달
import React from 'react';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  sentCount: number;
}

const SendModal: React.FC<SendModalProps> = ({ isOpen, onClose, sentCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 transform transition-all">
        {/* 성공 아이콘 */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-bounce">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">발송 완료!</h2>
          <p className="text-gray-600">
            {sentCount}명의 학부모에게 주간 리포트가 발송되었습니다
          </p>
        </div>

        {/* 발송 상세 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-lg">📱</span>
            <div className="flex-grow text-sm text-green-800">
              <p className="font-medium mb-2">발송 상세</p>
              <ul className="space-y-1 text-xs">
                <li>• 발송 방식: 카카오톡 알림톡</li>
                <li>• 발송 시간: {new Date().toLocaleString('ko-KR')}</li>
                <li>• 예상 도달 시간: 즉시</li>
                <li>• 비용: 무료 (데모)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 데모 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800">
            💡 <strong>데모 안내:</strong> 실제로는 발송되지 않았습니다.
            실제 서비스에서는 카카오톡 알림톡이 학부모님께 전송됩니다.
          </p>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SendModal;
