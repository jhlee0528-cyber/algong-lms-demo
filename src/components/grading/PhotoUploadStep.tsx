/**
 * 사진 업로드 단계 (시뮬레이션)
 * 데모 버전에서는 샘플 이미지로 체험
 */

import React from 'react';

interface PhotoUploadStepProps {
  selectedStudent: { id: number; name: string; grade: number; level: string } | null;
  onUseSample: () => void;
  onBack: () => void;
}

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({
  selectedStudent,
  onUseSample,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          📷 워크시트 사진 업로드
        </h2>
        {selectedStudent && (
          <p className="text-sm md:text-base text-gray-600">
            {selectedStudent.name} ({selectedStudent.grade}학년, {selectedStudent.level})의 워크시트를 촬영하세요
          </p>
        )}
      </div>

      {/* 업로드 영역 */}
      <div className="border-4 border-dashed border-gray-300 rounded-2xl p-8 md:p-12 text-center bg-gray-50">
        <div className="space-y-6">
          <div className="text-6xl md:text-7xl">📷</div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
              사진을 촬영하거나 파일을 업로드하세요
            </h3>
            <p className="text-sm text-gray-500">
              종이 워크시트를 촬영하면 AI가 손글씨를 인식해서 자동으로 채점합니다
            </p>
          </div>

          {/* 버튼들 (데모에서는 비활성화) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              disabled
              className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed flex items-center gap-2"
            >
              <span>📷</span>
              <span>카메라 촬영</span>
            </button>
            <button
              disabled
              className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed flex items-center gap-2"
            >
              <span>📂</span>
              <span>파일 선택</span>
            </button>
          </div>
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <span className="text-blue-600 text-xl">💡</span>
          <div className="flex-1 text-sm text-blue-800">
            <strong>AI가 손글씨를 인식합니다</strong>
            <p className="mt-1 text-xs">
              Claude Sonnet 4의 멀티모달 기능으로 이미지를 직접 분석하여 OCR 없이도 손글씨를 정확하게 인식하고 채점합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div className="flex-1 text-sm text-yellow-800">
            <strong>데모 버전 안내</strong>
            <p className="mt-1 text-xs">
              현재는 데모 버전으로 샘플 이미지로 체험하실 수 있습니다.
              실제 서비스에서는 카메라 촬영 또는 파일 업로드가 가능합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 샘플 이미지로 체험하기 버튼 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
        >
          ← 학생 다시 선택
        </button>
        <button
          onClick={onUseSample}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          샘플 이미지로 체험하기 →
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadStep;
