/**
 * 과제 유형별 학습 현황 컴포넌트
 */

import React from 'react';
import { useProgressByType } from '../../hooks/useStudentProgress';

interface ProgressByTypeProps {
  studentId: number;
  startDate?: string;
  endDate?: string;
}

const ProgressByType: React.FC<ProgressByTypeProps> = ({
  studentId,
  startDate,
  endDate,
}) => {
  const { data, isLoading, error } = useProgressByType({
    student_id: studentId,
    start_date: startDate,
    end_date: endDate,
  });

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        학습 현황을 불러오는데 실패했습니다.
      </div>
    );
  }

  const progressByType = data?.progress_by_type || [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return '📺';
      case 'activity':
        return '📝';
      case 'ai_chat':
        return '💬';
      case 'library':
        return '📚';
      default:
        return '📋';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lecture':
        return '강의듣기 (스마트리)';
      case 'activity':
        return '액티비티';
      case 'ai_chat':
        return 'AI 대화';
      case 'library':
        return '영어도서관';
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'border-blue-500 bg-blue-50';
      case 'activity':
        return 'border-green-500 bg-green-50';
      case 'ai_chat':
        return 'border-purple-500 bg-purple-50';
      case 'library':
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const formatCompletionRate = (rate: number) => {
    return `${rate.toFixed(0)}%`;
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 과제 유형별 현황</h3>

      {progressByType.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          학습 현황 데이터가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {progressByType.map((progress) => (
            <div
              key={progress.type}
              className={`border-2 rounded-lg p-4 ${getTypeColor(progress.type)}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{getTypeIcon(progress.type)}</span>
                <h4 className="font-semibold text-gray-800">
                  {getTypeLabel(progress.type)}
                </h4>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    완료: {progress.completed}개 / 할당: {progress.assigned}개
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    ({formatCompletionRate(progress.completion_rate)})
                  </span>
                </div>

                {/* 진행률 바 */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${progress.completion_rate}%` }}
                  />
                </div>

                {/* 추가 정보 */}
                {progress.average_time && (
                  <div className="text-sm text-gray-600">
                    평균 학습시간: {progress.average_time}분
                  </div>
                )}

                {progress.details && (
                  <div className="mt-2 pt-2 border-t border-gray-300">
                    <div className="text-xs text-gray-600">
                      {Object.entries(progress.details).map(([key, value]) => (
                        <span key={key} className="mr-3">
                          {key}: {value}%
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 유형별 상세 정보 표시 */}
                {progress.type === 'lecture' && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="text-xs text-gray-500">
                      차시별 완료 현황을 확인하려면 상세 조회를 클릭하세요.
                    </div>
                  </div>
                )}
                {progress.type === 'activity' && progress.details && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="text-xs text-gray-600">
                      영역별: {Object.entries(progress.details)
                        .map(([key, value]) => `${key} ${value}%`)
                        .join(' | ')}
                    </div>
                  </div>
                )}
                {progress.type === 'ai_chat' && progress.details && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="text-xs text-gray-600">
                      평균 발화량: {progress.details.avg_turns || 0}회
                    </div>
                  </div>
                )}
                {progress.type === 'library' && progress.details && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="text-xs text-gray-600">
                      총 읽기 시간: {progress.details.total_reading_time || 0}분
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressByType;
