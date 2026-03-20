/**
 * AI 채점 결과 표시
 */

import React from 'react';
import type { AIGradingResult } from '../../data/mockAIGrading';
import ComingSoonFeatures from './ComingSoonFeatures';

interface AIGradingResultProps {
  result: AIGradingResult;
  onSendToParent: () => void;
  onGradeAnother: () => void;
}

const AIGradingResultComponent: React.FC<AIGradingResultProps> = ({
  result,
  onSendToParent,
  onGradeAnother,
}) => {
  const scorePercentage = (result.totalScore / 100) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-4xl md:text-5xl mb-2">✅</div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          AI 자동채점 완료!
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          {result.studentName} ({result.grade}학년) — {result.subject}
        </p>
      </div>

      {/* Score Summary */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300 rounded-2xl p-6 md:p-8">
        <div className="text-center space-y-4">
          <div className="text-sm md:text-base font-medium text-gray-700">총점</div>
          <div className="text-5xl md:text-6xl font-bold text-green-600">
            {result.totalScore}점
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
          <div className="text-lg md:text-xl font-semibold text-gray-700">
            {result.correctCount}/{result.totalQuestions} 정답
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-800">📊 문항별 결과</h3>
        {result.questions.map((q) => (
          <div
            key={q.id}
            className={`
              border-2 rounded-lg p-4
              ${q.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}
            `}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-700 text-sm">Q{q.id}.</span>
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                    {q.type === 'word' ? '단어' : q.type === 'sentence' ? '문장' : '자유영작'}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{q.question}</p>
              </div>
              <div className={`
                flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl
                ${q.isCorrect ? 'bg-green-500' : 'bg-red-500'}
              `}>
                {q.isCorrect ? '✅' : '❌'}
              </div>
            </div>

            {/* Answer comparison */}
            {!q.isCorrect && q.correctAnswer && (
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium">학생 답:</span>
                  <span className="text-red-600 font-medium">{q.studentAnswer}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 font-medium">정답:</span>
                  <span className="text-green-600 font-medium">{q.correctAnswer}</span>
                </div>
              </div>
            )}

            {/* Feedback */}
            {q.feedback && (
              <div className="mt-3 bg-white rounded-lg p-3 border border-yellow-200">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600">💡</span>
                  <p className="text-xs md:text-sm text-gray-700">{q.feedback}</p>
                </div>
              </div>
            )}

            {/* Score for essay */}
            {q.type === 'essay' && (
              <div className="mt-2 text-sm text-gray-600">
                점수: <strong className="text-blue-600">{q.score}/100</strong>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Summary */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 md:p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔍</span>
          <span>AI 분석 요약</span>
        </h3>

        <div className="space-y-3">
          {/* Strengths */}
          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-2">• 강점</h4>
            <div className="flex flex-wrap gap-2">
              {result.aiSummary.strengths.map((strength, idx) => (
                <span key={idx} className="text-xs md:text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div>
            <h4 className="text-sm font-semibold text-red-700 mb-2">• 약점</h4>
            <div className="flex flex-wrap gap-2">
              {result.aiSummary.weaknesses.map((weakness, idx) => (
                <span key={idx} className="text-xs md:text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full">
                  {weakness}
                </span>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-white rounded-lg p-3 mt-3">
            <h4 className="text-sm font-semibold text-blue-700 mb-2">📚 추천 학습</h4>
            <p className="text-xs md:text-sm text-gray-700">{result.aiSummary.recommendation}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={onSendToParent}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          📨 학부모에게 보내기
        </button>
        <button
          onClick={onGradeAnother}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
        >
          📸 다른 워크시트 채점
        </button>
      </div>

      {/* Coming Soon Features */}
      <div className="pt-6 border-t border-gray-200">
        <ComingSoonFeatures />
      </div>
    </div>
  );
};

export default AIGradingResultComponent;
