/**
 * AI 문제 만들기 Step 7: 파일 저장
 */

import React, { useState } from 'react';

interface StepSaveFileProps {
  questionCount: number;
  studentNames: string[];
  onSave: (fileName: string, format: 'pdf' | 'docx' | 'hwp') => void;
  onReset: () => void;
}

const StepSaveFile: React.FC<StepSaveFileProps> = ({
  questionCount,
  studentNames,
  onSave,
  onReset,
}) => {
  const [fileName, setFileName] = useState(`영어문제_${new Date().toISOString().split('T')[0]}`);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'docx' | 'hwp'>('pdf');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const formats = [
    { type: 'pdf' as const, label: 'PDF', icon: '📄', description: '가장 일반적인 형식' },
    { type: 'docx' as const, label: 'Word', icon: '📝', description: '편집 가능한 문서' },
    { type: 'hwp' as const, label: 'HWP', icon: '📋', description: '한글 문서' },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSave(fileName, selectedFormat);
    setIsSaving(false);
    setIsSaved(true);
  };

  if (isSaved) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            문제 생성 완료!
          </h2>
          <p className="text-gray-600">
            총 {questionCount}개의 문제가 성공적으로 생성되었습니다.
          </p>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <div className="flex-1">
              <div className="text-sm text-green-700 font-medium">저장된 파일</div>
              <div className="text-lg font-bold text-green-900">{fileName}.{selectedFormat}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-green-200">
            <div>
              <div className="text-xs text-green-600">문제 개수</div>
              <div className="text-sm font-semibold text-green-900">{questionCount}개</div>
            </div>
            <div>
              <div className="text-xs text-green-600">대상 학생</div>
              <div className="text-sm font-semibold text-green-900">{studentNames.length}명</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <span className="text-blue-600">💡</span>
            <div className="flex-1 text-sm text-blue-800 space-y-1">
              <div><strong>다음 단계:</strong></div>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>파일을 다운로드하여 학생들에게 배포하세요</li>
                <li>문제를 풀고 나면 학습현황에서 결과를 확인할 수 있습니다</li>
                <li>학생별 오답 분석을 통해 맞춤 학습을 진행하세요</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.open('#')}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
          >
            📥 파일 다운로드
          </button>
          <button
            onClick={onReset}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
          >
            🔄 새 문제 만들기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          7단계: 파일로 저장
        </h2>
        <p className="text-gray-600">
          생성된 문제를 파일로 저장합니다.
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-green-700 font-medium">검수 완료</div>
            <div className="text-lg font-bold text-green-900">총 {questionCount}개 문제</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <div className="text-gray-600">대상 학생</div>
            <div className="font-semibold text-gray-800">{studentNames.join(', ')}</div>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <div className="text-gray-600">생성 일시</div>
            <div className="font-semibold text-gray-800">{new Date().toLocaleDateString('ko-KR')}</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700 mb-2 block">파일명</span>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="파일명을 입력하세요"
          />
        </label>
      </div>

      <div className="space-y-3">
        <span className="text-sm font-semibold text-gray-700 block">파일 형식</span>
        <div className="grid grid-cols-3 gap-3">
          {formats.map((format) => {
            const isSelected = selectedFormat === format.type;
            return (
              <button
                key={format.type}
                onClick={() => setSelectedFormat(format.type)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-center
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                  }
                `}
              >
                <div className="text-3xl mb-2">{format.icon}</div>
                <div className={`font-semibold mb-1 ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                  {format.label}
                </div>
                <div className="text-xs text-gray-500">
                  {format.description}
                </div>
                {isSelected && (
                  <div className="mt-2 flex justify-center">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onReset}
          disabled={isSaving}
          className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50"
        >
          ← 처음으로
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || !fileName.trim()}
          className={`
            px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
            ${isSaving || !fileName.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
            }
          `}
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>저장 중...</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>파일 저장</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepSaveFile;
