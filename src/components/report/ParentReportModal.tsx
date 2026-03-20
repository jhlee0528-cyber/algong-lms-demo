/**
 * 학부모 리포트 자동완성 모달
 * AI 기반 자동완성 + 수정 가능
 */

import React, { useState, useEffect } from 'react';
import type { Student } from '../../data/mockStudents';

interface ParentReportModalProps {
  student: Student;
  onClose: () => void;
}

// AI 자동완성 리포트 생성 로직 (시뮬레이션)
const generateAutoReport = (student: Student): string => {
  const studentName = student.name;
  const level = student.subjects[0]?.currentLevel || 'N/A';
  const progress = student.subjects[0]?.progress || 0;
  const readingLevel = student.libraryProgress.readingLevel;
  const booksThisMonth = student.libraryProgress.thisMonthBooks;
  const totalBooks = student.libraryProgress.totalBooksRead;

  let statusComment = '';
  if (student.status === 'good') {
    statusComment = '학습 레벨은 순조롭게 성장하고 있어요! 🟢';
  } else if (student.status === 'warning') {
    statusComment = '최근 학습 속도가 조금 느려졌어요. 🟡';
  } else {
    statusComment = '집중 관리가 필요한 상태입니다. 🔴';
  }

  let strengthComment = '';
  if (progress >= 80) {
    strengthComment = '특히 학습 태도가 매우 우수합니다.';
  } else if (progress >= 60) {
    strengthComment = '꾸준히 학습을 이어가고 있습니다.';
  } else {
    strengthComment = '함께 학습 습관을 개선해가고 있습니다.';
  }

  let nextStep = '';
  if (student.status === 'good') {
    nextStep = '다음 주에는 심화 학습을 시작해볼 예정입니다.';
  } else if (student.status === 'warning') {
    nextStep = '다음 주에는 복습 시간을 조금 더 늘려볼 예정입니다.';
  } else {
    nextStep = '다음 주에는 기초부터 차근차근 다시 진행해볼 예정입니다.';
  }

  const report = `안녕하세요, ${studentName} 학부모님.

이번 주 ${studentName} 학생은 ${level} 레벨을 진행 중이며, 현재 진도율은 ${progress}%입니다. ${statusComment}

영어 동화책은 독서 레벨 ${readingLevel}단계로, 이번 달에 ${booksThisMonth}권을 읽었고, 누적 ${totalBooks}권을 완독했습니다.

${strengthComment} ${nextStep}

앞으로도 ${studentName} 학생의 성장을 함께 응원하겠습니다. 감사합니다.`;

  return report;
};

const ParentReportModal: React.FC<ParentReportModalProps> = ({ student, onClose }) => {
  const [reportText, setReportText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // AI 자동완성 (시뮬레이션: 약간의 딜레이)
    const timer = setTimeout(() => {
      setReportText(generateAutoReport(student));
    }, 300);
    return () => clearTimeout(timer);
  }, [student]);

  const handleSend = async () => {
    setIsSending(true);

    // 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000));

    alert(`${student.name} 학부모님께 리포트를 발송했습니다.\n발송 번호: ${student.parentPhone}`);
    setIsSending(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">학부모 리포트</h2>
              <p className="text-sm text-gray-500">{student.name} 학생</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-6">
          {/* 수신자 정보 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">학생명:</span>
                <span className="ml-2 font-semibold text-gray-900">{student.name}</span>
              </div>
              <div>
                <span className="text-gray-600">학부모:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {student.parentName || '학부모님'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">연락처:</span>
                <span className="ml-2 font-semibold text-gray-900">{student.parentPhone}</span>
              </div>
              <div>
                <span className="text-gray-600">발송 방법:</span>
                <span className="ml-2 font-semibold text-gray-900">카카오 알림톡</span>
              </div>
            </div>
          </div>

          {/* 리포트 미리보기 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-900">
                {isEditing ? '리포트 수정' : '리포트 미리보기'}
              </label>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {isEditing ? '미리보기' : '수정하기'}
              </button>
            </div>

            {!reportText ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-sm text-gray-500">AI가 리포트를 작성하고 있습니다...</p>
              </div>
            ) : isEditing ? (
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="리포트 내용을 입력하세요..."
              />
            ) : (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-orange-200">
                <div className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                  {reportText}
                </div>
              </div>
            )}
          </div>

          {/* AI 자동완성 뱃지 */}
          {reportText && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
                AI 자동완성
              </span>
              <span>학생의 학습 데이터를 기반으로 자동 생성되었습니다.</span>
            </div>
          )}

          {/* 발송 버튼 */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              취소
            </button>
            <button
              onClick={handleSend}
              disabled={!reportText || isSending}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  발송 중...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  발송하기
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentReportModal;
