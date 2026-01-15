/**
 * 영어도서관 상세 진행률 컴포넌트
 * 도서별 읽기 시간, 퀴즈 점수 표시
 */

import React from 'react';
import { useStudentProgress } from '../../hooks/useStudentProgress';

interface LibraryProgressDetailProps {
  studentId: number;
  missionId?: number;
  startDate?: string;
  endDate?: string;
}

const LibraryProgressDetail: React.FC<LibraryProgressDetailProps> = ({
  studentId,
  missionId,
  startDate,
  endDate,
}) => {
  const { data, isLoading } = useStudentProgress({
    student_id: studentId,
    mission_id: missionId,
    progress_type: 'library',
    start_date: startDate,
    end_date: endDate,
  });

  if (isLoading) {
    return <div className="text-center py-4 text-gray-500">로딩 중...</div>;
  }

  const libraryProgress = data?.progress.filter((p) => p.progress_type === 'library') || [];

  // 통계 계산
  const totalBooks = libraryProgress.length;
  const completedBooks = libraryProgress.filter((p) => p.completed_at).length;
  const totalReadingTime = libraryProgress.reduce(
    (sum, p) => sum + (p.reading_time || 0),
    0
  );
  const totalReadingMinutes = Math.round(totalReadingTime / 60);
  const avgReadingTime = totalBooks > 0 ? Math.round(totalReadingMinutes / totalBooks) : 0;

  // 퀴즈 점수 계산 (TODO: 실제 퀴즈 점수는 library_quiz_responses에서 가져와야 함)
  const booksWithQuiz = libraryProgress.filter((p) => p.score !== null);
  const avgQuizScore =
    booksWithQuiz.length > 0
      ? Math.round(
          booksWithQuiz.reduce((sum, p) => sum + (p.score || 0), 0) / booksWithQuiz.length
        )
      : 0;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">도서 읽기 통계</h4>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">완료 도서</div>
          <div className="text-lg font-semibold text-orange-600">
            {completedBooks}/{totalBooks}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">총 읽기 시간</div>
          <div className="text-lg font-semibold text-orange-600">{totalReadingMinutes}분</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">평균 읽기 시간</div>
          <div className="text-lg font-semibold text-orange-600">{avgReadingTime}분</div>
        </div>
      </div>
      {avgQuizScore > 0 && (
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">평균 퀴즈 점수</div>
          <div className="text-lg font-semibold text-orange-600">{avgQuizScore}점</div>
        </div>
      )}
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <div className="text-xs text-gray-500 mb-2">도서별 상세</div>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
          {libraryProgress.map((progress) => (
            <div key={progress.progress_id} className="flex items-center justify-between text-sm">
              <div className="flex-1">
                <span className="text-gray-700">
                  {progress.book_id ? `도서 #${progress.book_id}` : '도서 정보 없음'}
                </span>
                {progress.reading_time && (
                  <span className="text-xs text-gray-500 ml-2">
                    ({Math.round(progress.reading_time / 60)}분)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {progress.score && (
                  <span className="text-xs text-orange-600">퀴즈: {progress.score}점</span>
                )}
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

export default LibraryProgressDetail;
