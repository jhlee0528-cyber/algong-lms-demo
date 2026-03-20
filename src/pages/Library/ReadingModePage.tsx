/**
 * 읽기 모드 페이지
 * 문장 터치 → 번역 표시 + 페이지 넘기기
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../../data/mockLibrary';

const ReadingModePage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === bookId);

  const [currentPage, setCurrentPage] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  if (!book) {
    return <div>도서를 찾을 수 없습니다.</div>;
  }

  const totalPages = book.sampleSentences.length;
  const currentSentence = book.sampleSentences[currentPage];

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
        <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
        <span className="text-sm text-gray-600">
          📖 {currentPage + 1}/{totalPages} 페이지
        </span>
      </div>

      {/* 읽기 영역 */}
      <div className="bg-white rounded-xl shadow-lg p-12 min-h-[500px] flex flex-col justify-center">
        {/* 영어 문장 */}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="text-2xl text-gray-800 leading-relaxed mb-8 text-center hover:bg-blue-50 p-6 rounded-lg transition-colors"
        >
          {currentSentence.english}
        </button>

        {/* 안내 */}
        <p className="text-center text-sm text-gray-500 mb-4">
          💡 문장을 터치하면 한국어 번역이 표시됩니다
        </p>

        {/* 번역 (토글) */}
        {showTranslation && (
          <div className="border-t border-gray-200 pt-6">
            <p className="text-xl text-gray-700 text-center leading-relaxed">
              📝 {currentSentence.korean}
            </p>
          </div>
        )}
      </div>

      {/* 페이지 네비게이션 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* 진행 바 */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentPage ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* 이전/다음 버튼 */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentPage(Math.max(0, currentPage - 1));
              setShowTranslation(false);
            }}
            disabled={currentPage === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            ◀ 이전
          </button>

          <button
            onClick={() => {
              setCurrentPage(Math.min(totalPages - 1, currentPage + 1));
              setShowTranslation(false);
            }}
            disabled={currentPage === totalPages - 1}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
            다음 ▶
          </button>
        </div>
      </div>

      {/* 학습 도구 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
            <span>🔊</span>
            <span>원어민 음성 듣기</span>
          </button>
          <button
            onClick={() => navigate(`/english-library/${book.id}/shadow`)}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <span>🎤</span>
            <span>따라 읽기 (쉐도잉)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingModePage;
