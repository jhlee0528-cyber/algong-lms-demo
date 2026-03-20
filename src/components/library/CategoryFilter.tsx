/**
 * 카테고리 필터 컴포넌트
 * 동화/명작/과학/문화/코믹스
 */

import React from 'react';
import type { Book } from '../../data/mockLibrary';

interface CategoryFilterProps {
  selectedCategory: Book['category'] | null;
  onCategoryChange: (category: Book['category'] | null) => void;
}

const categories: Array<{ value: Book['category']; label: string; icon: string }> = [
  { value: 'fairytale', label: '동화', icon: '🧸' },
  { value: 'classic', label: '명작', icon: '🏰' },
  { value: 'science', label: '과학', icon: '🔬' },
  { value: 'culture', label: '문화', icon: '🌍' },
  { value: 'comics', label: '코믹스', icon: '😄' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">카테고리</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.value;

          return (
            <button
              key={category.value}
              onClick={() => onCategoryChange(isSelected ? null : category.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
