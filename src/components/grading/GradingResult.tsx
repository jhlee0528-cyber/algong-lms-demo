// 채점 결과 표시 컴포넌트
import React from 'react';
import { GradingResult as GradingResultType } from '../../data/mockGrading';
import ParentMessageDraft from './ParentMessageDraft';

interface GradingResultProps {
  result: GradingResultType;
  onSend: () => void;
  onClose: () => void;
}

const GradingResult: React.FC<GradingResultProps> = ({ result, onSend, onClose }) => {
  const [message, setMessage] = React.useState(result.parentMessageDraft);

  return (
    <div className="space-y-6">
      {/* 완료 헤더 */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <span className="text-3xl">✅</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">채점 완료!</h2>
        <p className="text-gray-600">AI가 워크시트를 분석했습니다</p>
      </div>

      {/* 기본 정보 카드 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{result.studentName}</h3>
            <p className="text-sm text-gray-600">{result.subject}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{result.score}점</div>
            <p className="text-xs text-gray-500">
              {result.correctAnswers}/{result.totalQuestions} 문제
            </p>
          </div>
        </div>

        {/* 점수 평가 */}
        <div className="mb-4">
          {result.score >= 90 ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">🎉 우수한 점수입니다!</p>
            </div>
          ) : result.score >= 70 ? (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">⚠️ 평균적인 점수입니다. 복습이 필요할 수 있어요.</p>
            </div>
          ) : (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">⚠️ 집중적인 복습이 필요합니다.</p>
            </div>
          )}
        </div>

        {/* 진행률 바 */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                result.score >= 90 ? 'bg-green-500' :
                result.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>
      </div>

      {/* 오답 분석 카드 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 오답 분석</h3>

        {/* 틀린 문제 번호 */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">틀린 문제</p>
          <div className="flex flex-wrap gap-2">
            {result.wrongAnswers.map(num => (
              <span
                key={num}
                className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-700 font-semibold rounded-full text-sm"
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* 공통 패턴 */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-1">공통 패턴</p>
          <p className="font-semibold text-orange-800">{result.analysis.pattern}</p>
        </div>

        {/* 약점 영역 */}
        {result.analysis.weakPoints.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">약점 영역</p>
            <div className="flex flex-wrap gap-2">
              {result.analysis.weakPoints.map((point, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 추천 복습 */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">💡 추천 복습</p>
          <p className="font-semibold text-blue-800">{result.analysis.recommendation}</p>
        </div>
      </div>

      {/* 학부모 전달 메시지 */}
      <ParentMessageDraft
        message={message}
        onChange={setMessage}
        studentName={result.studentName}
      />

      {/* 액션 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          나중에
        </button>
        <button
          onClick={() => {
            onSend();
            alert('✅ 학부모에게 메시지가 발송되었습니다! (데모)');
          }}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          발송하기
        </button>
      </div>
    </div>
  );
};

export default GradingResult;
