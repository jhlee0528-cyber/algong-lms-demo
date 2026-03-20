/**
 * AI Coby 분석 모달
 * 주의 필요 학생 목록과 AI 분석 결과 표시
 */

import React from 'react';

interface WarningStudent {
  name: string;
  reason: string;
  recommendation: string;
}

interface AICobyModalProps {
  onClose: () => void;
}

const AICobyModal: React.FC<AICobyModalProps> = ({ onClose }) => {
  // AI Coby가 분석한 주의 필요 학생 목록 (더미 데이터)
  const warningStudents: WarningStudent[] = [
    {
      name: '정현우',
      reason: '지난 2주간 학습 진행률 10% 미만, 출석률 저조 (40%)',
      recommendation: '학부모 상담 및 학습 동기 부여 필요. 짧은 목표 설정 권장.',
    },
    {
      name: '오나은',
      reason: '정답률 급락 (75% → 45%), 최근 3일 미접속',
      recommendation: '학습 난이도 조정 필요. 기초 복습 단원 추가 배정 권장.',
    },
    {
      name: '홍예린',
      reason: '학습 시간은 충분하나 정답률 낮음 (55%), 반복 오답 패턴',
      recommendation: '1:1 오답 노트 점검 및 맞춤 학습 콘텐츠 제공 권장.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <div>
                <h2 className="text-2xl font-bold">AI Coby 분석 리포트</h2>
                <p className="text-indigo-100 text-sm mt-1">주의가 필요한 학생 목록</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 요약 정보 */}
        <div className="p-6 bg-indigo-50 border-b border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📊</span>
            <h3 className="font-semibold text-gray-800">분석 요약</h3>
          </div>
          <p className="text-sm text-gray-700">
            총 <span className="font-bold text-indigo-600">{warningStudents.length}명</span>의 학생에게
            즉각적인 관심과 조치가 필요합니다.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            분석 기준: 학습 진행률, 정답률, 출석률, 학습 패턴
          </p>
        </div>

        {/* 학생 목록 */}
        <div className="p-6 space-y-4">
          {warningStudents.map((student, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              {/* 학생 이름 및 순위 */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800">{student.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      ⚠️ 긴급
                    </span>
                  </div>
                </div>
              </div>

              {/* 문제 상황 */}
              <div className="bg-red-50 rounded-lg p-3 mb-3">
                <div className="flex items-start gap-2">
                  <span className="text-sm flex-shrink-0 mt-0.5">⚠️</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-red-700 mb-1">문제 상황</div>
                    <p className="text-sm text-gray-800">{student.reason}</p>
                  </div>
                </div>
              </div>

              {/* 추천 조치 */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-sm flex-shrink-0 mt-0.5">💡</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-blue-700 mb-1">AI 추천 조치</div>
                    <p className="text-sm text-gray-800">{student.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 푸터 */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">
              💡 Tip: 학생 이름을 클릭하면 학습 상세 현황을 확인할 수 있습니다.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICobyModal;
