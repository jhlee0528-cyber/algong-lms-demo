/**
 * 쉐도잉 모드 페이지
 * 원어민 음성 듣기 + 따라읽기 + 발음 피드백
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../../data/mockLibrary';

const ShadowingModePage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === bookId);

  const [currentSentence, setCurrentSentence] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!book) {
    return <div>도서를 찾을 수 없습니다.</div>;
  }

  const sentences = book.sampleSentences;
  const current = sentences[currentSentence];

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleRecord = () => {
    setIsRecording(true);
    setShowFeedback(false);
    setTimeout(() => {
      setIsRecording(false);
      setShowFeedback(true);
    }, 3000);
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
        <h2 className="text-lg font-bold text-gray-800">🎧 쉐도잉 모드</h2>
        <span className="text-sm text-gray-600">{book.title}</span>
      </div>

      {/* 쉐도잉 영역 */}
      <div className="bg-white rounded-xl shadow-lg p-12 space-y-8">
        {/* 현재 문장 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">현재 문장:</h3>
          <p className="text-2xl text-gray-800 leading-relaxed">{current.english}</p>
        </div>

        {/* 오디오 플레이어 (시뮬레이션) */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl">🔊</span>
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-blue-500 transition-all duration-3000 ${
                    isPlaying ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0:00</span>
                <span>0:05</span>
              </div>
            </div>
          </div>

          {/* 재생 버튼 */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              ▶ 다시 듣기
            </button>
            <button
              onClick={() => setSpeed('slow')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                speed === 'slow' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              🐢 느리게
            </button>
            <button
              onClick={() => setSpeed('normal')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                speed === 'normal' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              🐰 보통
            </button>
            <button
              onClick={() => setSpeed('fast')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                speed === 'fast' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              🐆 빠르게
            </button>
          </div>
        </div>

        {/* 따라 읽기 */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">따라 읽기</h3>
          <button
            onClick={handleRecord}
            disabled={isRecording}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isRecording ? '🎤 녹음 중...' : '🎤 녹음 시작'}
          </button>

          {/* 발음 피드백 (더미) */}
          {showFeedback && (
            <div className="mt-6 bg-green-50 rounded-lg p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-green-800">발음 정확도</h4>
                <span className="text-3xl font-bold text-green-600">87%</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                💡 "bears"의 발음을 연습하세요: /berz/
              </p>
              <p className="text-sm text-gray-600">
                잘하셨어요! 계속 연습하면 더 좋아질 거예요.
              </p>
            </div>
          )}
        </div>

        {/* 다음 문장 */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              setCurrentSentence((currentSentence + 1) % sentences.length);
              setShowFeedback(false);
            }}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            다음 문장 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShadowingModePage;
