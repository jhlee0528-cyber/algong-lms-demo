/**
 * 영어도서관 도서 선택 모달 컴포넌트
 */

import React, { useState, useEffect } from 'react';
import { getLibraryBooks } from '../../api/library';
import type { LibraryBookListItem, LibraryBookFilter } from '../../types';

interface LibraryBookSelectorProps {
  selectedBooks: LibraryBookListItem[];
  onSelect: (books: LibraryBookListItem[]) => void;
  onClose: () => void;
}

const LibraryBookSelector: React.FC<LibraryBookSelectorProps> = ({
  selectedBooks,
  onSelect,
  onClose,
}) => {
  const [books, setBooks] = useState<LibraryBookListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<number | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedBookIds, setSelectedBookIds] = useState<Set<string>>(
    new Set(selectedBooks.map((b) => b.book_id))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBooks();
    }, 300); // 디바운싱: 300ms 후 검색

    return () => clearTimeout(timer);
  }, [levelFilter, categoryFilter, searchTerm]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const filter: LibraryBookFilter = {
        page: 1,
        limit: 50,
      };

      if (levelFilter !== 'all') {
        filter.level = levelFilter as any;
      }

      if (categoryFilter !== 'all') {
        filter.category = categoryFilter as any;
      }

      if (searchTerm) {
        filter.search = searchTerm;
      }

      const response = await getLibraryBooks(filter);
      setBooks(response?.books || []);
    } catch (error) {
      console.error('도서 목록 로드 실패:', error);
      setBooks([]); // 오류 발생 시 빈 배열로 설정
    } finally {
      setLoading(false);
    }
  };

  const handleBookToggle = (book: LibraryBookListItem) => {
    const newSelectedIds = new Set(selectedBookIds);
    if (newSelectedIds.has(book.book_id)) {
      newSelectedIds.delete(book.book_id);
    } else {
      newSelectedIds.add(book.book_id);
    }
    setSelectedBookIds(newSelectedIds);
  };

  const handleConfirm = () => {
    const selected = books.filter((book) => selectedBookIds.has(book.book_id));
    onSelect(selected);
    onClose();
  };

  const selectedCount = selectedBookIds.size;
  const totalTime = (books || [])
    .filter((book) => selectedBookIds.has(book.book_id))
    .reduce((sum, book) => sum + (book.estimated_time || 10), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">📚 영어도서관 - 도서 선택</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* 검색 및 필터 */}
        <div className="space-y-3 mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="도서명 또는 키워드 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="button"
              onClick={loadBooks}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              검색
            </button>
          </div>

          <div className="flex gap-4">
            <select
              value={levelFilter}
              onChange={(e) =>
                setLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">레벨: 전체</option>
              <option value="1">Lv1</option>
              <option value="2">Lv2</option>
              <option value="3">Lv3</option>
              <option value="4">Lv4</option>
              <option value="5">Lv5</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">카테고리: 전체</option>
              <option value="phonics">파닉스</option>
              <option value="fiction">픽션</option>
              <option value="non-fiction">논픽션</option>
            </select>
          </div>
        </div>

        {/* 도서 목록 */}
        {loading ? (
          <div className="text-center py-8 text-gray-500">로딩 중...</div>
        ) : books && books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {books.map((book) => (
              <div
                key={book.book_id}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                  selectedBookIds.has(book.book_id)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handleBookToggle(book)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800 mb-1">
                      {book.title}
                    </div>
                    <div className="text-xs text-gray-500">Lv{book.level}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedBookIds.has(book.book_id)}
                    onChange={() => handleBookToggle(book)}
                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                {book.cover_image_url && (
                  <div className="w-full h-24 bg-gray-200 rounded mb-2 overflow-hidden">
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="text-xs text-gray-600">
                  예상 시간: {book.estimated_time || 10}분
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">도서가 없습니다.</div>
        )}

        {/* 선택 정보 및 버튼 */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span>선택된 도서: {selectedCount}권</span>
            {selectedCount > 0 && (
              <span className="ml-4">예상 소요 시간: 약 {totalTime}분</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              선택 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryBookSelector;
