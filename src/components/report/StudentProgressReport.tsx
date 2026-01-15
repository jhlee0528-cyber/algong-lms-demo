/**
 * 학생 종합 학습 레포트 컴포넌트
 * 4개 과제 유형 통합 리포트
 */

import React, { useRef } from 'react';
import { useStudentProgressSummary } from '../../hooks/useStudentProgress';
import { useStudent } from '../../hooks/useStudents';
import { formatDate } from '../../utils/formatDate';

interface StudentProgressReportProps {
  studentId: number;
  startDate?: string;
  endDate?: string;
  onPrint?: () => void;
}

const StudentProgressReport: React.FC<StudentProgressReportProps> = ({
  studentId,
  startDate,
  endDate,
  onPrint,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const { data: student } = useStudent(studentId);
  const { data: summary } = useStudentProgressSummary(studentId, {
    start_date: startDate,
    end_date: endDate,
  });

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

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
        return 'text-blue-600';
      case 'activity':
        return 'text-green-600';
      case 'ai_chat':
        return 'text-purple-600';
      case 'library':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div ref={reportRef} className="bg-white rounded-lg shadow-lg p-8 print:p-4">
      {/* 리포트 헤더 */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6 print:border-b print:pb-2 print:mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          학습 현황 종합 레포트
        </h2>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            <div>학생: {student?.name || '-'}</div>
            <div>
              기간:{' '}
              {startDate && endDate
                ? `${formatDate(startDate, 'YYYY년 MM월 DD일')} ~ ${formatDate(endDate, 'YYYY년 MM월 DD일')}`
                : '전체 기간'}
            </div>
            <div>생성일: {formatDate(new Date(), 'YYYY년 MM월 DD일')}</div>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg no-print"
          >
            인쇄하기
          </button>
        </div>
      </div>

      {/* 전체 요약 */}
      {summary && (
        <div className="mb-8 print:mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 print:text-lg">
            전체 요약
          </h3>
          <div className="grid grid-cols-4 gap-4 print:grid-cols-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center print:bg-white print:border print:border-gray-300">
              <div className="text-2xl font-bold text-blue-600 print:text-xl">
                {summary.total_completed}
              </div>
              <div className="text-sm text-gray-600 print:text-xs">완료한 과제</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center print:bg-white print:border print:border-gray-300">
              <div className="text-2xl font-bold text-gray-800 print:text-xl">
                {summary.total_assigned}
              </div>
              <div className="text-sm text-gray-600 print:text-xs">할당된 과제</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center print:bg-white print:border print:border-gray-300">
              <div className="text-2xl font-bold text-green-600 print:text-xl">
                {summary.overall_completion_rate.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600 print:text-xs">전체 완료율</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center print:bg-white print:border print:border-gray-300">
              <div className="text-2xl font-bold text-purple-600 print:text-xl">
                {summary.progress_by_type.length}
              </div>
              <div className="text-sm text-gray-600 print:text-xs">활성 유형</div>
            </div>
          </div>
        </div>
      )}

      {/* 과제 유형별 상세 */}
      {summary && summary.progress_by_type.length > 0 && (
        <div className="mb-8 print:mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 print:text-lg">
            과제 유형별 상세
          </h3>
          <div className="space-y-4 print:space-y-3">
            {summary.progress_by_type.map((progress) => (
              <div
                key={progress.type}
                className="border-2 border-gray-200 rounded-lg p-4 print:border print:p-3"
              >
                <div className="flex items-center gap-2 mb-3 print:mb-2">
                  <span className="text-2xl">{getTypeIcon(progress.type)}</span>
                  <h4 className={`text-lg font-semibold ${getTypeColor(progress.type)} print:text-base`}>
                    {getTypeLabel(progress.type)}
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
                  <div>
                    <div className="text-sm text-gray-600 print:text-xs">완료</div>
                    <div className="text-lg font-bold text-gray-800 print:text-base">
                      {progress.completed}개
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 print:text-xs">할당</div>
                    <div className="text-lg font-bold text-gray-800 print:text-base">
                      {progress.assigned}개
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 print:text-xs">완료율</div>
                    <div className="text-lg font-bold text-green-600 print:text-base">
                      {progress.completion_rate.toFixed(0)}%
                    </div>
                  </div>
                </div>
                {progress.average_time && (
                  <div className="mt-2 text-sm text-gray-600 print:text-xs">
                    평균 학습시간: {progress.average_time}분
                  </div>
                )}
                {progress.details && (
                  <div className="mt-2 pt-2 border-t border-gray-200 print:pt-1 print:border-t">
                    <div className="text-xs text-gray-600 print:text-xs">
                      {Object.entries(progress.details)
                        .map(([key, value]) => `${key}: ${value}%`)
                        .join(' | ')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 종합 분석 */}
      <div className="border-t-2 border-gray-300 pt-6 print:border-t print:pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 print:text-lg">
          종합 분석
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 print:bg-white print:border print:border-gray-300">
          <p className="text-sm text-gray-700 leading-relaxed print:text-xs">
            {summary && summary.overall_completion_rate >= 80 ? (
              <>
                <strong>{student?.name}</strong> 학생은 전체적으로 우수한 학습 성과를 보이고
                있습니다. 모든 과제 유형에서 꾸준한 참여와 완료율을 유지하고 있어, 지속적인
                학습 동기를 유지하고 있습니다.
              </>
            ) : summary && summary.overall_completion_rate >= 60 ? (
              <>
                <strong>{student?.name}</strong> 학생은 전반적으로 양호한 학습 진행 상황을
                보이고 있습니다. 일부 과제 유형에서 완료율을 높이면 더욱 효과적인 학습이
                가능할 것입니다.
              </>
            ) : (
              <>
                <strong>{student?.name}</strong> 학생의 학습 완료율이 개선이 필요합니다. 각
                과제 유형별로 학습 계획을 세우고 꾸준히 참여하시기 바랍니다.
              </>
            )}
          </p>
        </div>
      </div>

      {/* 푸터 */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500 print:mt-4 print:pt-2">
        알공스마트리 LMS - 학습 현황 종합 레포트
      </div>
    </div>
  );
};

export default StudentProgressReport;
