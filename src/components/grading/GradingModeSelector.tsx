/**
 * 채점 모드 선택 컴포넌트
 * 사진으로 채점 vs 샘플로 체험
 */

import React from 'react';

interface GradingModeSelectorProps {
  onSelectPhotoMode: () => void;
  onSelectSampleMode: () => void;
}

const GradingModeSelector: React.FC<GradingModeSelectorProps> = ({
  onSelectPhotoMode,
  onSelectSampleMode,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          📸 AI 자동채점
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          어떤 방식으로 채점할까요?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* 사진으로 채점 */}
        <button
          onClick={onSelectPhotoMode}
          className="group relative bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 md:p-8"
        >
          <div className="text-center space-y-4">
            <div className="text-5xl md:text-6xl">📷</div>
            <h3 className="text-xl md:text-2xl font-bold">사진으로 채점</h3>
            <p className="text-sm md:text-base text-blue-100">
              워크시트를 촬영하면<br />
              AI가 바로 채점!
            </p>
            <div className="pt-2 text-xs md:text-sm text-blue-200">
              ✓ 손글씨 인식<br />
              ✓ 자동 피드백 생성<br />
              ✓ 학습 분석 리포트
            </div>
          </div>
        </button>

        {/* 샘플로 체험 */}
        <button
          onClick={onSelectSampleMode}
          className="group relative bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 md:p-8"
        >
          <div className="text-center space-y-4">
            <div className="text-5xl md:text-6xl">📂</div>
            <h3 className="text-xl md:text-2xl font-bold">샘플로 체험</h3>
            <p className="text-sm md:text-base text-purple-100">
              미리 준비된 샘플로<br />
              AI채점 기능을 체험
            </p>
            <div className="pt-2 text-xs md:text-sm text-purple-200">
              ✓ 빠른 체험<br />
              ✓ 다양한 문제 유형<br />
              ✓ 채점 결과 미리보기
            </div>
          </div>
        </button>
      </div>

      {/* Coming Soon 안내 */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-xl p-4 md:p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl md:text-3xl flex-shrink-0">💡</span>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-2 text-sm md:text-base">
              곧 출시: QR 자동 인식으로 놓기만 하면 채점!
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              워크시트에 QR 코드를 인쇄하면 거치대에 놓는 것만으로 자동 촬영 → 채점 → DB 저장이 완료됩니다.
              교사의 동작은 단 1회, "놓기"만 하면 됩니다!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingModeSelector;
