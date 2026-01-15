/**
 * 스마트 파닉스 단원 표지 선택 컴포넌트
 * 표지 이미지를 클릭하면 해당 범위의 단원들을 표시
 */

import React, { useState } from 'react';
import type { Unit } from '../../types';

interface UnitCoverSelectorProps {
  units: Unit[];
  onUnitSelect: (unitId: number) => void;
  selectedUnit: number | null;
}

// 표지 이미지 경로 (public 폴더 기준)
// smartphonics-cover-1이 가장 좌측, 1-2-3-4-5 순서대로 배열
const COVER_CONFIG = [
  { id: 1, image: '/smartphonics-cover-1.png', startUnit: 1, endUnit: 8, label: '1~8단원' },
  { id: 2, image: '/smartphonics-cover-2.png', startUnit: 9, endUnit: 16, label: '9~16단원' },
  { id: 3, image: '/smartphonics-cover-3.png', startUnit: 17, endUnit: 24, label: '17~24단원' },
  { id: 4, image: '/smartphonics-cover-4.png', startUnit: 25, endUnit: 32, label: '25~32단원' },
  { id: 5, image: '/smartphonics-cover-5.png', startUnit: 33, endUnit: 40, label: '33~40단원' },
];

const UnitCoverSelector: React.FC<UnitCoverSelectorProps> = ({
  units,
  onUnitSelect,
  selectedUnit,
}) => {
  const [selectedCover, setSelectedCover] = useState<number | null>(null);

  const handleCoverClick = (coverId: number) => {
    setSelectedCover(coverId === selectedCover ? null : coverId);
  };

  const getUnitsForCover = (coverId: number): Unit[] => {
    const config = COVER_CONFIG.find((c) => c.id === coverId);
    if (!config) return [];
    return units.filter(
      (unit) => unit.unit_number >= config.startUnit && unit.unit_number <= config.endUnit
    );
  };

  return (
    <div className="space-y-4">
      {/* 표지 이미지 선택 영역 - smartphonics-cover-1이 가장 좌측, 1-2-3-4-5 순서 */}
      <div className="grid grid-cols-5 gap-4">
        {COVER_CONFIG.map((cover) => (
          <button
            key={cover.id}
            onClick={() => handleCoverClick(cover.id)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
              selectedCover === cover.id
                ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img
              src={cover.image}
              alt={`스마트파닉스 ${cover.label}`}
              className="w-full h-auto max-h-full object-contain"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                console.error('이미지 로드 실패:', {
                  src: target.src,
                  attempted: cover.image,
                  fullUrl: window.location.origin + cover.image,
                });
                const parent = target.parentElement;
                if (parent) {
                  target.style.display = 'none';
                  if (!parent.querySelector('.cover-placeholder')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'cover-placeholder bg-gray-200 flex flex-col items-center justify-center text-gray-600 text-xs p-2';
                    placeholder.style.minHeight = '100px';
                    placeholder.innerHTML = `
                      <div>${cover.label}</div>
                      <div class="text-red-500 mt-1">이미지 로드 실패</div>
                      <div class="text-xs mt-1">${cover.image}</div>
                    `;
                    parent.appendChild(placeholder);
                  }
                }
              }}
              onLoad={(e) => {
                console.log('이미지 로드 성공:', {
                  src: (e.target as HTMLImageElement).src,
                  cover: cover.label,
                });
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs font-medium py-1.5 px-2 text-center">
              {cover.label}
            </div>
          </button>
        ))}
      </div>

      {/* 선택된 표지의 단원 목록 - 8개 단원씩 표시 */}
      {selectedCover !== null && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">
            {COVER_CONFIG.find((c) => c.id === selectedCover)?.label} 단원 선택
          </h4>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {getUnitsForCover(selectedCover).map((unit) => (
              <button
                key={unit.unit_id}
                onClick={() => onUnitSelect(unit.unit_id)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedUnit === unit.unit_id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-base font-bold">{unit.unit_number}</div>
                  <div className="text-xs mt-1 line-clamp-2 leading-tight">{unit.unit_title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitCoverSelector;
