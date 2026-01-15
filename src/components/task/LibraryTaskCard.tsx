/**
 * 영어도서관 과제 카드 컴포넌트
 */

import React, { useState } from 'react';
import LibraryBookSelector from './LibraryBookSelector';
import type { LibraryTask, LibraryBookListItem } from '../../types';

interface LibraryTaskCardProps {
  value?: LibraryTask;
  onChange?: (task: LibraryTask | null) => void;
}

const LibraryTaskCard: React.FC<LibraryTaskCardProps> = ({ value, onChange }) => {
  const [showSelector, setShowSelector] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<LibraryBookListItem[]>(
    value?.books || []
  );

  const handleBooksSelect = (books: LibraryBookListItem[]) => {
    setSelectedBooks(books);
    const bookIds = books.map((book) => book.book_id);

    if (bookIds.length > 0) {
      onChange?.({
        type: 'library',
        book_ids: bookIds,
        books: books,
      });
    } else {
      onChange?.(null);
    }
  };

  const totalTime = selectedBooks.reduce(
    (sum, book) => sum + (book.estimated_time || 10),
    0
  );

  const hasSelection = selectedBooks.length > 0;

  return (
    <>
      <div
        className={`border-2 rounded-lg p-4 transition-all ${
          hasSelection
            ? 'border-orange-500 bg-orange-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📚</span>
          <h4 className="font-semibold text-gray-800">영어도서관</h4>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              선택된 도서: <span className="text-orange-600">{selectedBooks.length}권</span>
            </span>
            {hasSelection && (
              <span className="text-sm text-gray-600">
                예상 시간: 약 <span className="font-semibold">{totalTime}분</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowSelector(true)}
            className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
          >
            {hasSelection ? '도서 수정하기' : '도서 선택하기'}
          </button>

          {hasSelection && (
            <div className="mt-2 space-y-1">
              <p className="text-xs font-semibold text-gray-700 mb-2">선택된 도서:</p>
              <div className="max-h-32 overflow-y-auto space-y-1 scrollbar-thin">
                {selectedBooks.map((book) => (
                  <div
                    key={book.book_id}
                    className="flex items-center justify-between text-xs bg-white p-2 rounded border border-gray-200 hover:border-orange-300 transition-colors"
                  >
                    <div>
                      <span className="font-medium text-gray-800">{book.title}</span>
                      <span className="text-gray-500 ml-2">Lv{book.level}</span>
                    </div>
                    <span className="text-gray-500">
                      {book.estimated_time || 10}분
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showSelector && (
        <LibraryBookSelector
          selectedBooks={selectedBooks}
          onSelect={handleBooksSelect}
          onClose={() => setShowSelector(false)}
        />
      )}
    </>
  );
};

export default LibraryTaskCard;
