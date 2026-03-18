// 학부모 전달 메시지 초안 편집 컴포넌트
import React from 'react';

interface ParentMessageDraftProps {
  message: string;
  onChange: (message: string) => void;
  studentName: string;
}

const ParentMessageDraft: React.FC<ParentMessageDraftProps> = ({
  message,
  onChange,
  studentName
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">📝 학부모 전달 메시지</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">AI 자동 생성</span>
      </div>

      {/* 카카오톡 미리보기 스타일 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-sm">💬</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">알공공부방</p>
            <p className="text-xs text-gray-500">카카오톡 알림톡</p>
          </div>
        </div>

        {/* 메시지 편집 영역 */}
        <textarea
          value={message}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder="학부모에게 전달할 메시지를 입력하세요..."
        />

        <div className="mt-3 text-right">
          <span className="text-xs text-gray-500">
            {message.length} / 1000자
          </span>
        </div>
      </div>

      {/* 빠른 문구 추가 */}
      <div>
        <p className="text-sm text-gray-600 mb-2">빠른 문구 추가</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange(message + '\n\n궁금하신 점이 있으시면 언제든지 연락 주세요.')}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
          >
            + 문의 안내
          </button>
          <button
            onClick={() => onChange(message + '\n\n다음 주에도 화이팅!')}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
          >
            + 격려 문구
          </button>
          <button
            onClick={() => onChange(message + '\n\n복습 자료를 별도로 보내드리겠습니다.')}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
          >
            + 복습 자료 안내
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentMessageDraft;
