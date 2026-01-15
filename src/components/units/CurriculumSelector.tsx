/**
 * 커리큘럼 선택 컴포넌트
 * Phonics, Speaking, Reading, Grammar, Writing 5개 섹션으로 구성
 * 각 섹션은 토글 방식으로 열고 닫을 수 있음
 */

import React, { useState } from 'react';
import type { Unit } from '../../types';
import CurriculumModal from './CurriculumModal';

interface CurriculumSelectorProps {
  units: Unit[];
  onUnitSelect: (unitId: number) => void;
  selectedUnit: number | null;
}

type CurriculumType = 'phonics' | 'speaking' | 'reading' | 'grammar' | 'writing';

interface CurriculumSection {
  type: CurriculumType;
  label: string;
  icon: string;
  images: string[];
}

const CURRICULUM_SECTIONS: CurriculumSection[] = [
  {
    type: 'phonics',
    label: 'Phonics',
    icon: '🔤',
    images: [
      '/smartphonics-cover-1.png',
      '/smartphonics-cover-2.png',
      '/smartphonics-cover-3.png',
      '/smartphonics-cover-4.png',
      '/smartphonics-cover-5.png',
    ],
  },
  {
    type: 'speaking',
    label: 'Speaking',
    icon: '🎤',
    images: [
      '/magicspeaking-cover-1.jpg',
      '/magicspeaking-cover-2.jpg',
      '/magicspeaking-cover-3.jpg',
    ],
  },
  {
    type: 'reading',
    label: 'Reading',
    icon: '📖',
    images: [
      '/myfirstreading-cover-1.png',
      '/myfirstreading-cover-2.jpg',
      '/myfirstreading-cover-3.jpg',
    ],
  },
  {
    type: 'grammar',
    label: 'Grammar',
    icon: '📝',
    images: [
      '/myfirstgrammar-cover-1.jpeg',
      '/myfirstgrammar-cover-2.jpg',
      '/myfirstgrammar-cover-3.jpg',
    ],
  },
  {
    type: 'writing',
    label: 'Writing',
    icon: '✍️',
    images: [
      '/myfirstwriting-cover-1.jpg',
      '/myfirstwriting-cover-2.jpg',
      '/myfirstwriting-cover-3.jpg',
    ],
  },
];

const CurriculumSelector: React.FC<CurriculumSelectorProps> = ({
  units,
  onUnitSelect,
  selectedUnit,
}) => {
  const [openSections, setOpenSections] = useState<Set<CurriculumType>>(new Set(['phonics']));
  const [selectedCover, setSelectedCover] = useState<{ type: CurriculumType; index: number } | null>(null);
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);

  const toggleSection = (type: CurriculumType) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(type)) {
      newOpenSections.delete(type);
      // 섹션을 닫을 때 선택된 표지도 초기화
      if (selectedCover?.type === type) {
        setSelectedCover(null);
      }
    } else {
      newOpenSections.add(type);
    }
    setOpenSections(newOpenSections);
  };

  const handleCoverClick = (type: CurriculumType, index: number) => {
    const newSelected = { type, index };
    // 같은 표지를 다시 클릭하면 선택 해제
    if (selectedCover?.type === type && selectedCover?.index === index) {
      setSelectedCover(null);
    } else {
      setSelectedCover(newSelected);
    }
  };

  return (
    <div className="space-y-4">
      {/* 커리큘럼 상세표 보기 버튼 */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowCurriculumModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <span>📋</span>
          커리큘럼 상세표 보기
        </button>
      </div>

      {/* 커리큘럼 섹션들 */}
      {CURRICULUM_SECTIONS.map((section) => {
        const isOpen = openSections.has(section.type);

        return (
          <div key={section.type} className="bg-white rounded-lg shadow border border-gray-200" data-tour="curriculum-selector">
            {/* 섹션 헤더 (토글 버튼) */}
            <button
              onClick={() => toggleSection(section.type)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <span className="text-lg font-semibold text-gray-800">{section.label}</span>
              </div>
              <span className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {/* 섹션 내용 (토글) */}
            {isOpen && (
              <div className="px-4 pb-4 border-t border-gray-200">
                <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-4">
                  {section.images.map((image, index) => {
                    const isSelected = selectedCover?.type === section.type && selectedCover?.index === index;

                    return (
                      <button
                        key={index}
                        onClick={() => handleCoverClick(section.type, index)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          isSelected
                            ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <img
                          src={image}
                          alt={`${section.label} ${index + 1}`}
                          className="w-full h-auto max-h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.cover-placeholder')) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'cover-placeholder bg-gray-200 flex flex-col items-center justify-center text-gray-600 text-xs p-2';
                              placeholder.style.minHeight = '100px';
                              placeholder.textContent = `${section.label} ${index + 1}`;
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* 커리큘럼 상세표 모달 */}
      {showCurriculumModal && (
        <CurriculumModal onClose={() => setShowCurriculumModal(false)} />
      )}
    </div>
  );
};

export default CurriculumSelector;
