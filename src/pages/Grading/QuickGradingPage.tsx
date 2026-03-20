// 빠른 채점 메인 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import GallerySelector from '../../components/grading/GallerySelector';
import LoadingAnimation from '../../components/grading/LoadingAnimation';
import GradingResult from '../../components/grading/GradingResult';
import GradingModeSelector from '../../components/grading/GradingModeSelector';

type Step = 'mode-select' | 'select' | 'grading' | 'result';

const QuickGradingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentGradingResult, isGrading, startGrading, clearGrading } = useDemoStore();
  const [selectedSampleId, setSelectedSampleId] = useState<string | undefined>();
  const [step, setStep] = useState<Step>('mode-select');

  // 모드 선택 핸들러
  const handleSelectPhotoMode = () => {
    navigate('/grading/ai');
  };

  const handleSelectSampleMode = () => {
    setStep('select');
  };

  // 샘플 선택 핸들러
  const handleSelectSample = async (sampleId: string) => {
    setSelectedSampleId(sampleId);
    setStep('grading');

    // AI 채점 시작 (3초 로딩)
    await startGrading(sampleId);

    // 결과 화면으로 이동
    setStep('result');
  };

  // 발송 핸들러
  const handleSend = () => {
    clearGrading();
    setStep('select');
    setSelectedSampleId(undefined);
    navigate('/dashboard');
  };

  // 닫기 핸들러
  const handleClose = () => {
    clearGrading();
    navigate('/dashboard');
  };

  // 새로 채점하기
  const handleNewGrading = () => {
    clearGrading();
    setStep('select');
    setSelectedSampleId(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 뒤로 가기 버튼 */}
      <div className="max-w-4xl mx-auto mb-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>대시보드로 돌아가기</span>
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-4xl mx-auto">
        {/* Step 0: 모드 선택 */}
        {step === 'mode-select' && (
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <GradingModeSelector
              onSelectPhotoMode={handleSelectPhotoMode}
              onSelectSampleMode={handleSelectSampleMode}
            />
          </div>
        )}

        {/* Step 1: 샘플 선택 */}
        {step === 'select' && (
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <GallerySelector
              onSelectSample={handleSelectSample}
              selectedId={selectedSampleId}
            />
          </div>
        )}

        {/* Step 2: AI 채점 중 (로딩) */}
        {step === 'grading' && (
          <LoadingAnimation />
        )}

        {/* Step 3: 채점 결과 */}
        {step === 'result' && currentGradingResult && (
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <GradingResult
              result={currentGradingResult}
              onSend={handleSend}
              onClose={handleClose}
            />

            {/* 추가 채점 버튼 */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleNewGrading}
                className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                📸 다른 워크시트 채점하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickGradingPage;
