/**
 * 영어도서관 메인 페이지
 * 도서 목록 + 레벨/카테고리 필터 + 통계
 */

import React, { useState, useMemo } from 'react';
import { books, type Book } from '../../data/mockLibrary';
import LibraryBanner from '../../components/library/LibraryBanner';
import LevelFilter from '../../components/library/LevelFilter';
import CategoryFilter from '../../components/library/CategoryFilter';
import LibraryStats from '../../components/library/LibraryStats';
import BookCard from '../../components/library/BookCard';

const EnglishLibraryPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Book['category'] | null>(null);

  // 필터링된 도서 목록
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      if (selectedLevel && book.level !== selectedLevel) return false;
      if (selectedCategory && book.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedLevel, selectedCategory]);

  return (
    <div className="w-full space-y-6">
      {/* 배너 */}
      <LibraryBanner />

      {/* 레벨 필터 */}
      <LevelFilter selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} />

      {/* 카테고리 필터 */}
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* 도서 목록 + 통계 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 도서 목록 */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                도서 목록
                <span className="ml-2 text-base font-normal text-gray-500">
                  ({filteredBooks.length}권)
                </span>
              </h2>
            </div>

            {/* 도서 그리드 */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-5xl mb-4">📚</div>
                <p>선택한 필터에 맞는 도서가 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 통계 (우측) */}
        <div className="lg:col-span-1">
          <LibraryStats />
        </div>
      </div>
    </div>
  );
};

export default EnglishLibraryPage;
