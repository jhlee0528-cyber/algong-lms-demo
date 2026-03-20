/**
 * 도서 카드 컴포넌트
 * 표지, 제목, 레벨, 정보 표시
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../../data/mockLibrary';
import { levelColors } from '../../data/mockLibrary';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const colors = levelColors[book.level];

  const handleClick = () => {
    navigate(`/english-library/${book.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* 표지 이미지 */}
      <div className={`h-48 ${colors.bg} flex items-center justify-center p-4`}>
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full object-contain"
          />
        ) : (
          <div className="text-center">
            <div className="text-5xl mb-2">📖</div>
            <div className={`text-sm font-bold ${colors.text} px-2`}>
              {book.title}
            </div>
          </div>
        )}
      </div>

      {/* 도서 정보 */}
      <div className="p-4 flex-1 flex flex-col text-left">
        {/* 제목 */}
        <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
          {book.title}
        </h3>

        {/* 저자 */}
        {book.author && (
          <p className="text-xs text-gray-500 mb-3">{book.author}</p>
        )}

        {/* 레벨 뱃지 */}
        <div className="space-y-1.5 mt-auto">
          <div className="flex items-center gap-2">
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
              🏷️ Level {book.level}
            </span>
          </div>

          {/* 페이지 수 */}
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <span>📄</span>
            <span>{book.pages} pages</span>
          </div>

          {/* AR 점수 */}
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <span>⭐</span>
            <span>AR {book.arScore.toFixed(1)}</span>
          </div>

          {/* 렉사일 점수 */}
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <span>📊</span>
            <span>L{book.lexileScore}</span>
          </div>
        </div>

        {/* 읽기 버튼 */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1">
            <span>📖</span>
            <span>읽기</span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default BookCard;
