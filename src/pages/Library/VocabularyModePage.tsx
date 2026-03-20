/**
 * 단어학습 모드 페이지
 * 플래시카드 (앞면: 영어, 뒷면: 한국어)
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../../data/mockLibrary';

const VocabularyModePage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === bookId);

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!book) {
    return <div>도서를 찾을 수 없습니다.</div>;
  }

  const vocab = book.keyVocabulary;
  const current = vocab[currentCard];

  const handleNext = () => {
    setCurrentCard((currentCard + 1) % vocab.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentCard((currentCard - 1 + vocab.length) % vocab.length);
    setIsFlipped(false);
  };

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
        <h2 className="text-lg font-bold text-gray-800">📝 단어학습</h2>
        <span className="text-sm text-gray-600">
          {currentCard + 1}/{vocab.length}
        </span>
      </div>

      {/* 플래시카드 */}
      <div className="bg-white rounded-xl shadow-lg p-12">
        <h3 className="text-center text-gray-600 mb-4">
          카드를 클릭하면 뒤집혀요 🔄
        </h3>

        {/* 카드 */}
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full h-96 perspective-1000"
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* 앞면 (영어) */}
            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-4">{current.english}</div>
                <div className="text-xl opacity-75">영어</div>
              </div>
            </div>

            {/* 뒷면 (한국어) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-bold mb-4">{current.korean}</div>
                <div className="text-xl opacity-75">한국어</div>
              </div>
            </div>
          </div>
        </button>

        {/* 진행 표시 */}
        <div className="flex justify-center gap-2 mt-8">
          {vocab.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentCard ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* 네비게이션 */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
          >
            ← 이전
          </button>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">
              ✓ 외웠어요
            </button>
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600">
              ↻ 다시보기
            </button>
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            다음 →
          </button>
        </div>
      </div>

      {/* 단어 목록 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">전체 단어 목록</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {vocab.map((word, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentCard(i);
                setIsFlipped(false);
              }}
              className={`p-3 rounded-lg text-left transition-colors ${
                i === currentCard
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="font-semibold text-gray-800">{word.english}</div>
              <div className="text-sm text-gray-600">{word.korean}</div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default VocabularyModePage;
