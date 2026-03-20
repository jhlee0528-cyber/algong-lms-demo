/**
 * 퀴즈 모드 페이지
 * 4지선다 내용이해 확인 퀴즈
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books } from '../../data/mockLibrary';

const QuizModePage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === bookId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  if (!book) {
    return <div>도서를 찾을 수 없습니다.</div>;
  }

  const quiz = book.quiz;
  const current = quiz[currentQuestion];

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === current.answerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsQuizComplete(false);
  };

  // 퀴즈 완료 화면
  if (isQuizComplete) {
    const percentage = Math.round((score / quiz.length) * 100);
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
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
          <h2 className="text-lg font-bold text-gray-800">🎮 퀴즈</h2>
          <span className="text-sm text-gray-600">{book.title}</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-8xl mb-6">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">퀴즈 완료!</h2>
          <div className="text-6xl font-bold text-indigo-600 mb-4">
            {score}/{quiz.length}
          </div>
          <p className="text-xl text-gray-700 mb-8">정답률: {percentage}%</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              다시 풀기
            </button>
            <button
              onClick={() => navigate(`/english-library/${book.id}`)}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
            >
              도서 상세로
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <h2 className="text-lg font-bold text-gray-800">🎮 퀴즈</h2>
        <span className="text-sm text-gray-600">
          {currentQuestion + 1}/{quiz.length}
        </span>
      </div>

      {/* 퀴즈 영역 */}
      <div className="bg-white rounded-xl shadow-lg p-12 space-y-8">
        {/* 진행 바 */}
        <div className="flex items-center gap-2">
          {quiz.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < currentQuestion
                  ? 'bg-green-500'
                  : i === currentQuestion
                  ? 'bg-blue-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* 문제 */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{current.question}</h3>

          {/* 선택지 */}
          <div className="space-y-3">
            {current.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === current.answerIndex;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg text-left font-semibold transition-all ${
                    showCorrect
                      ? 'bg-green-100 border-2 border-green-500 text-green-800'
                      : showWrong
                      ? 'bg-red-100 border-2 border-red-500 text-red-800'
                      : isSelected
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                      : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                    {showCorrect && <span className="text-2xl">✅</span>}
                    {showWrong && <span className="text-2xl">❌</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center gap-4">
          {!showResult ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              정답 확인
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              {currentQuestion < quiz.length - 1 ? '다음 문제' : '결과 보기'} →
            </button>
          )}
        </div>

        {/* 점수 */}
        <div className="text-center text-gray-600">
          현재 점수: {score}/{currentQuestion + (showResult ? 1 : 0)}
        </div>
      </div>
    </div>
  );
};

export default QuizModePage;
