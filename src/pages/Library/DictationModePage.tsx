/**
 * 딕테이션 모드 페이지
 * 듣고 빈칸 채우기
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../../data/mockLibrary';

const DictationModePage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === bookId);

  const [currentSentence, setCurrentSentence] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [showResult, setShowResult] = useState(false);

  if (!book) {
    return <div>도서를 찾을 수 없습니다.</div>;
  }

  const sentences = book.sampleSentences;
  const current = sentences[currentSentence];

  // 더미: 빈칸 단어 (실제로는 문장에서 추출해야 함)
  const blanks = ['upon', 'were', 'bears'];
  const correctAnswers = ['upon', 'were', 'bears'];

  const handleCheck = () => {
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrentSentence((currentSentence + 1) % sentences.length);
    setAnswers(['', '', '']);
    setShowResult(false);
  };

  const correctCount = answers.filter((ans, i) => ans.toLowerCase() === correctAnswers[i].toLowerCase()).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(`/english-library/${book.id}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          뒤로
        </button>
        <h2 className="text-lg font-bold text-gray-800">✍️ 딕테이션</h2>
        <span className="text-sm text-gray-600">{book.title}</span>
      </div>

      {/* 딕테이션 영역 */}
      <div className="bg-white rounded-xl shadow-lg p-12 space-y-8">
        {/* 안내 */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🔊 문장을 듣고 빈칸을 채우세요</h3>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ▶ 다시 듣기
          </button>
        </div>

        {/* 빈칸이 있는 문장 */}
        <div className="bg-gray-50 rounded-lg p-8">
          <p className="text-2xl text-gray-800 text-center leading-relaxed">
            "Once <span className="underline decoration-dotted">_____</span> a time, there <span className="underline decoration-dotted">_____</span> three <span className="underline decoration-dotted">_____</span>"
          </p>
        </div>

        {/* 입력 필드 */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">빈칸에 들어갈 단어를 입력하세요:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {answers.map((answer, index) => (
              <input
                key={index}
                type="text"
                value={answer}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                placeholder={`빈칸 ${index + 1}`}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-lg focus:border-blue-500 focus:outline-none"
                disabled={showResult}
              />
            ))}
          </div>
        </div>

        {/* 정답 확인 */}
        {!showResult && (
          <div className="flex justify-center">
            <button
              onClick={handleCheck}
              disabled={answers.some((a) => !a)}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              정답 확인
            </button>
          </div>
        )}

        {/* 결과 */}
        {showResult && (
          <div className={`rounded-lg p-6 border-2 ${
            correctCount === correctAnswers.length
              ? 'bg-green-50 border-green-300'
              : 'bg-yellow-50 border-yellow-300'
          }`}>
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">
                {correctCount === correctAnswers.length ? '✅' : '📝'}
              </div>
              <h4 className="text-xl font-bold text-gray-800">
                {correctCount === correctAnswers.length ? '정답입니다!' : '다시 한번 해보세요!'}
              </h4>
              <p className="text-gray-700 mt-2">
                {correctCount}/{correctAnswers.length} 맞았어요!
              </p>
            </div>

            {/* 정답 표시 */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">정답:</p>
              <div className="flex gap-2 justify-center">
                {correctAnswers.map((word, i) => (
                  <span key={i} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* 다음 문장 */}
            <div className="flex justify-center">
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
              >
                다음 문장 →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictationModePage;
