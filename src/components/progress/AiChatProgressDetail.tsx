/**
 * AI 대화 상세 진행률 컴포넌트
 * 발화량, 완료 여부 표시
 */

import React from 'react';
import { useStudentProgress } from '../../hooks/useStudentProgress';

interface AiChatProgressDetailProps {
  studentId: number;
  missionId?: number;
  startDate?: string;
  endDate?: string;
}

const AiChatProgressDetail: React.FC<AiChatProgressDetailProps> = ({
  studentId,
  missionId,
  startDate,
  endDate,
}) => {
  const { data, isLoading } = useStudentProgress({
    student_id: studentId,
    mission_id: missionId,
    progress_type: 'ai_chat',
    start_date: startDate,
    end_date: endDate,
  });

  if (isLoading) {
    return <div className="text-center py-4 text-gray-500">로딩 중...</div>;
  }

  const aiChatProgress = data?.progress.filter((p) => p.progress_type === 'ai_chat') || [];

  // 통계 계산
  const totalSessions = aiChatProgress.length;
  const completedSessions = aiChatProgress.filter((p) => p.completed_at).length;
  const totalTurns = aiChatProgress.reduce((sum) => {
    // TODO: 실제 발화량은 ai_chat_sessions 테이블에서 가져와야 함
    // 여기서는 임시로 4회로 가정
    return sum + 4;
  }, 0);
  const avgTurns = totalSessions > 0 ? Math.round(totalTurns / totalSessions) : 0;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">AI 대화 통계</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">완료 세션</div>
          <div className="text-lg font-semibold text-purple-600">
            {completedSessions}/{totalSessions}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">평균 발화량</div>
          <div className="text-lg font-semibold text-purple-600">{avgTurns}회</div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <div className="text-xs text-gray-500 mb-2">세션별 상세</div>
        <div className="space-y-2">
          {aiChatProgress.map((progress, index) => (
            <div key={progress.progress_id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">세션 {index + 1}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">발화: 4회</span>
                {progress.completed_at ? (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                    완료
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                    미완료
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiChatProgressDetail;
