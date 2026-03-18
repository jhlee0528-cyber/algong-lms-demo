// 갤러리 샘플 선택 컴포넌트
import React from 'react';
import { worksheetSamples } from '../../data/mockGrading';

interface GallerySelectorProps {
  onSelectSample: (sampleId: string) => void;
  selectedId?: string;
}

const GallerySelector: React.FC<GallerySelectorProps> = ({ onSelectSample, selectedId }) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📸 빠른 채점</h2>
        <p className="text-gray-600">갤러리에서 샘플 워크시트를 선택하세요</p>
      </div>

      {/* 샘플 이미지 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {worksheetSamples.map(sample => (
          <button
            key={sample.id}
            onClick={() => onSelectSample(sample.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-lg ${
              selectedId === sample.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Placeholder 이미지 영역 */}
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
              {/* 종이 느낌의 패턴 */}
              <div className="absolute inset-0 bg-white opacity-50" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(0,0,0,.03) 35px, rgba(0,0,0,.03) 36px)',
              }} />

              {/* 문제 아이콘 */}
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-2">
                  {sample.title.includes('수학') ? '🧮' : '📝'}
                </div>
                <div className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded">
                  Worksheet Sample
                </div>
              </div>

              {/* 선택됨 표시 */}
              {selectedId === sample.id && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            {/* 샘플 정보 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">{sample.title}</h3>
              <p className="text-sm text-gray-600">{sample.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 안내 메시지 */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>데모 안내:</strong> 실제 서비스에서는 카메라로 직접 촬영하거나 갤러리에서 워크시트를 선택할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default GallerySelector;
