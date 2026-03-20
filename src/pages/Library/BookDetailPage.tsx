/**
 * 도서 상세 페이지
 * 도서 정보 + 학습 활동 선택
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { books, levelColors } from '../../data/mockLibrary';

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return (
      <div className="w-full text-center py-12">
        <div className="text-5xl mb-4">📚</div>
        <p className="text-gray-500">도서를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/english-library')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          도서관으로 돌아가기
        </button>
      </div>
    );
  }

  const colors = levelColors[book.level];

  const activities = [
    {
      id: 'read',
      icon: '📖',
      title: '읽기',
      description: '원서 읽기 + 문장 터치 → 번역 표시',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'shadow',
      icon: '🎧',
      title: '듣기',
      description: '원어민 음성 + 따라읽기 (쉐도잉)',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'dictation',
      icon: '✍️',
      title: '딕테이션',
      description: '듣고 받아쓰기',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'vocabulary',
      icon: '📝',
      title: '단어학습',
      description: '핵심 어휘 플래시카드',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'quiz',
      icon: '🎮',
      title: '퀴즈',
      description: '내용이해 확인 퀴즈',
      color: 'from-red-500 to-pink-600',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate('/english-library')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        도서관으로 돌아가기
      </button>

      {/* 도서 정보 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 표지 */}
          <div className={`w-full md:w-64 h-80 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="h-full object-contain" />
            ) : (
              <div className="text-center p-4">
                <div className="text-7xl mb-4">📖</div>
                <div className={`text-lg font-bold ${colors.text}`}>{book.title}</div>
              </div>
            )}
          </div>

          {/* 정보 */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
            {book.author && (
              <p className="text-lg text-gray-600 mb-4">저자: {book.author}</p>
            )}

            {/* 메타 정보 */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} border-2 ${colors.border}`}>
                🏷️ Level {book.level}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                📄 {book.pages} pages
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                ⭐ AR {book.arScore.toFixed(1)}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                📊 Lexile {book.lexileScore}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-100 text-amber-700">
                {book.categoryLabel}
              </span>
            </div>

            {/* 평점 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {book.rating.toFixed(1)}/5.0 ({book.readCount}명 읽음)
              </span>
            </div>

            {/* 줄거리 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">📝 줄거리</h3>
              <p className="text-gray-700 leading-relaxed">{book.summary}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 학습 활동 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">학습 활동</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => navigate(`/english-library/${book.id}/${activity.id}`)}
              className={`p-6 rounded-xl bg-gradient-to-br ${activity.color} text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200`}
            >
              <div className="text-5xl mb-3">{activity.icon}</div>
              <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
              <p className="text-sm opacity-90">{activity.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 이 책을 읽은 학생 (더미 데이터) */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">이 책을 읽은 학생</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700">김민수</span>
            <span className="text-green-600 font-semibold">✅ 완료</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-gray-700">이지은</span>
            <span className="text-blue-600 font-semibold">📖 읽는 중 (60%)</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">박준호</span>
            <span className="text-gray-500">❌ 미시작</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
