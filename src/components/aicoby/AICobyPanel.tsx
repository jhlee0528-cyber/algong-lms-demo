/**
 * AI코비 사이드 패널 (메인 컴포넌트)
 * 우측에서 슬라이드되는 패널
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AICobyAlerts from './AICobyAlerts';
import AICobyInput from './AICobyInput';
import AICobyResponse from './AICobyResponse';
import {
  keywordMap,
  defaultResponse,
  getStudentResponse,
  type CobyResponse,
} from '../../data/aiCobyResponses';

interface AICobyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AICobyPanel: React.FC<AICobyPanelProps> = ({ isOpen, onClose }) => {
  const [currentResponse, setCurrentResponse] = useState<CobyResponse | null>(null);
  const [responseHistory, setResponseHistory] = useState<CobyResponse[]>([]);
  const navigate = useNavigate();

  // 사용자 입력 처리
  const handleUserInput = (input: string) => {
    // 현재 응답이 있으면 히스토리에 추가
    if (currentResponse) {
      setResponseHistory(prev => [...prev, currentResponse]);
    }

    // 키워드 매칭 (대소문자 무관, 부분 매칭)
    const lowerInput = input.toLowerCase();

    // 키워드 검색
    for (const [keyword, response] of Object.entries(keywordMap)) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        setCurrentResponse(response);
        return;
      }
    }

    // 학생 이름 검색
    const studentResponse = getStudentResponse(input);
    if (studentResponse) {
      setCurrentResponse(studentResponse);
      return;
    }

    // 매칭 안 되면 기본 응답
    setCurrentResponse(defaultResponse);
  };

  // 뒤로가기 버튼 핸들러
  const handleBackButton = () => {
    if (responseHistory.length > 0) {
      const previousResponse = responseHistory[responseHistory.length - 1];
      setCurrentResponse(previousResponse);
      setResponseHistory(prev => prev.slice(0, -1));
    }
  };

  // 자주 쓰는 요청 클릭
  const handleQuickAction = (path: string) => {
    navigate(path);
    onClose();
  };

  // 응답 카드 내비게이션 후 패널 닫기
  const handleResponseNavigate = () => {
    onClose();
    setCurrentResponse(null);
    setResponseHistory([]);
  };

  // 패널 닫기 핸들러 (히스토리 초기화 포함)
  const handleClose = () => {
    onClose();
    setCurrentResponse(null);
    setResponseHistory([]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* 사이드 패널 */}
      <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-out flex flex-col">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* 뒤로가기 버튼 (히스토리가 있을 때만 표시) */}
              {responseHistory.length > 0 && (
                <button
                  onClick={handleBackButton}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                  title="이전 화면으로"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h2 className="text-xl font-bold">AI코비</h2>
                <p className="text-xs text-purple-100">AI 코칭 비서</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
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

        {/* 메인 컨텐츠 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 오늘의 알림 */}
          <AICobyAlerts />

          {/* 구분선 */}
          <div className="border-t border-gray-200" />

          {/* 사용자 응답 (있으면 표시) */}
          {currentResponse && (
            <>
              <AICobyResponse
                message={currentResponse.message}
                alert={currentResponse.alert}
                options={currentResponse.options}
                onNavigate={handleResponseNavigate}
              />
              <div className="border-t border-gray-200" />
            </>
          )}

          {/* 입력 영역 */}
          <AICobyInput onSubmit={handleUserInput} onQuickAction={handleQuickAction} />
        </div>

        {/* 하단 닫기 버튼 */}
        <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-gray-50">
          <button
            onClick={handleClose}
            className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
          >
            ✕ 닫기
          </button>
        </div>
      </div>
    </>
  );
};

export default AICobyPanel;
