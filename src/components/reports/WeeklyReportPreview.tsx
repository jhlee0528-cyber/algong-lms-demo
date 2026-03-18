// 주간 리포트 미리보기 (카카오톡 스타일)
import React from 'react';
import { WeeklyReport } from '../../data/mockReports';
import { formatKakaoMessage } from '../../data/mockReports';

interface WeeklyReportPreviewProps {
  report: WeeklyReport;
  onEdit?: () => void;
  onSend?: () => void;
}

const WeeklyReportPreview: React.FC<WeeklyReportPreviewProps> = ({ report, onEdit, onSend }) => {
  const message = formatKakaoMessage(report);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">📱 카카오톡 알림톡 미리보기</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {report.parentName || '학부모'}님께 발송
        </span>
      </div>

      {/* 카카오톡 UI 모방 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        {/* 카카오톡 헤더 */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xl">💬</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">알공공부방</p>
            <p className="text-xs text-gray-500">카카오톡 채널</p>
          </div>
        </div>

        {/* 메시지 내용 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
            {message}
          </pre>
        </div>

        {/* 타임스탬프 */}
        <div className="mt-2 text-right">
          <span className="text-xs text-gray-400">
            {new Date(report.generatedAt).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      {/* 발송 정보 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-lg">ℹ️</span>
          <div className="flex-grow text-sm text-blue-800">
            <p className="font-medium mb-1">발송 정보</p>
            <ul className="space-y-1 text-xs">
              <li>• 수신자: {report.parentName || '학부모'}님 ({report.studentName} 학부모)</li>
              <li>• 연락처: 카카오톡 알림톡</li>
              <li>• 발송 예정: {report.sentAt ? '발송 완료' : '즉시 발송'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-3">
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            수정하기
          </button>
        )}
        {onSend && (
          <button
            onClick={onSend}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            발송하기
          </button>
        )}
      </div>
    </div>
  );
};

export default WeeklyReportPreview;
