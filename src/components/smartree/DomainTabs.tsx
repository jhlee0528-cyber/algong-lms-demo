import React from 'react';
import { DOMAINS, DOMAIN_CONFIG, DOMAIN_LEVEL_COUNT } from '../../data/curriculumLevels';
import { Domain } from '../../types/smartree';

interface DomainTabsProps {
  selectedDomain: Domain | 'all';
  onSelect: (domain: Domain | 'all') => void;
}

const DomainTabs: React.FC<DomainTabsProps> = ({ selectedDomain, onSelect }) => {
  return (
    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
      {/* 전체 탭 */}
      <button
        onClick={() => onSelect('all')}
        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
          selectedDomain === 'all'
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        📚 전체
        <span className="ml-1 text-xs opacity-70">(36)</span>
      </button>
      
      {/* 영역별 탭 */}
      {DOMAINS.map((domain) => {
        const config = DOMAIN_CONFIG[domain];
        const levelCount = DOMAIN_LEVEL_COUNT[domain];
        const isSelected = selectedDomain === domain;
        
        return (
          <button
            key={domain}
            onClick={() => onSelect(domain)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              isSelected
                ? `${config.bgColor} ${config.color} ring-2 ring-offset-1`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {config.icon} {domain}
            <span className="ml-1 text-xs opacity-70">({levelCount})</span>
          </button>
        );
      })}
    </div>
  );
};

export default DomainTabs;
