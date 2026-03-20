/**
 * 영어도서관 배너 컴포넌트
 * "와! 대단하다!" 느낌의 상단 배너
 */

import React from 'react';
import { libraryStats } from '../../data/mockLibrary';

const LibraryBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-xl p-8 text-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-5xl">📚</div>
          <div>
            <h1 className="text-3xl font-bold">알공 영어도서관</h1>
            <p className="text-amber-100 text-sm">영어 원서로 읽기의 즐거움을 느껴보세요</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold">{libraryStats.totalBooks}+</div>
          <div className="text-sm text-amber-100">총 보유 도서</div>
        </div>
      </div>

      {/* 메시지 박스 */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-30">
        <div className="flex items-start gap-3">
          <div className="text-3xl">🌟</div>
          <div>
            <p className="text-lg font-semibold mb-1">
              읽기의 힘! 알공 영어도서관에서 {libraryStats.totalBooks}+권의 영어 원서를 레벨별로 만나보세요.
            </p>
            <p className="text-amber-100 text-sm">
              딕테이션 · 쉐도잉 · 퀴즈까지 한 번에!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryBanner;
