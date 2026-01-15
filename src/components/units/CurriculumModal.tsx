/**
 * 커리큘럼 상세표 모달 컴포넌트
 * PDF 파일을 모달로 표시
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface CurriculumModalProps {
  onClose: () => void;
}

const CurriculumModal: React.FC<CurriculumModalProps> = ({ onClose }) => {
  const [pdfError, setPdfError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
  };

  // PDF 파일 경로
  const pdfPath = '/smartree_curriculum.pdf';

  const handleDownload = () => {
    // PDF 다운로드
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'smartree_curriculum.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleIframeError = () => {
    setPdfError(true);
  };

  const modalContent = (
    <div
      className={`fixed bg-black bg-opacity-50 flex items-center justify-center z-[9999] ${
        isFullscreen ? 'inset-0' : 'inset-0 p-4'
      }`}
      style={{ zIndex: 9999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isFullscreen) {
          onClose();
        }
      }}
    >
      <div
        className={`bg-white shadow-2xl overflow-hidden flex flex-col ${
          isFullscreen ? 'w-full h-full rounded-none' : 'rounded-lg w-full max-w-6xl max-h-[90vh]'
        }`}
      >
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>📚</span>
            알공스마트리 커리큘럼
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFullscreen}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              title="전체화면"
            >
              <span>{isFullscreen ? '🗗' : '🗖'}</span>
              {isFullscreen ? '전체화면 종료' : '전체화면'}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>⬇️</span>
              다운로드
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF 뷰어 */}
        <div className={`flex-1 overflow-auto bg-gray-100 ${isFullscreen ? '' : 'p-4'}`}>
          <div className={`bg-white shadow-lg overflow-hidden ${isFullscreen ? '' : 'rounded-lg'}`} style={{ minHeight: isFullscreen ? '100%' : '600px' }}>
            {!pdfError ? (
              <iframe
                src={`${pdfPath}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full border-0"
                title="알공스마트리 커리큘럼"
                style={{ minHeight: isFullscreen ? 'calc(100vh - 120px)' : '600px', height: isFullscreen ? 'calc(100vh - 120px)' : '80vh' }}
                onLoad={() => {
                  // iframe 로드 성공
                  setPdfError(false);
                }}
                onError={handleIframeError}
              >
                <div className="flex flex-col items-center justify-center p-8 text-gray-600" style={{ minHeight: '600px' }}>
                  <div className="text-4xl mb-4">📄</div>
                  <div className="text-lg font-semibold mb-2">PDF를 불러오는 중...</div>
                </div>
              </iframe>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-gray-600" style={{ minHeight: '600px' }}>
                <div className="text-4xl mb-4">📄</div>
                <div className="text-lg font-semibold mb-2">PDF 파일을 불러올 수 없습니다</div>
                <div className="text-sm mb-4 text-center">
                  파일이 <code className="bg-gray-100 px-2 py-1 rounded">public</code> 폴더에 있는지 확인해주세요
                  <br />
                  파일명: <code className="bg-gray-100 px-2 py-1 rounded">smartree_workbook.pdf</code> 또는 <code className="bg-gray-100 px-2 py-1 rounded">smartree_workbok.pdf</code>
                </div>
                <div className="flex gap-2">
                  <a
                    href={pdfPath}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    직접 다운로드
                  </a>
                  <button
                    onClick={() => window.open(pdfPath, '_blank')}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    새 창에서 열기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CurriculumModal;
