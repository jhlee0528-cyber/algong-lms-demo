/**
 * 학습자료 페이지 (구 스마트리)
 * 커리큘럼 + 학습도구 (콘텐츠 중심)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LevelCode } from '../types/smartree';
import CurriculumBrowser from '../components/smartree/CurriculumBrowser';

// 탭 타입 (커리큘럼 + 학습도구)
type SmartreeTab = 'curriculum' | 'quiz' | 'flashcard' | 'phonics' | 'sentence';

const LEVEL_OPTIONS: { value: LevelCode; label: string }[] = [
  { value: 'SA1', label: 'SA1 (Spark A-1)' },
  { value: 'SA2', label: 'SA2 (Spark A-2)' },
  { value: 'SA3', label: 'SA3 (Spark A-3)' },
  { value: 'SA4', label: 'SA4 (Spark A-4)' },
  { value: 'SA5', label: 'SA5 (Spark A-5)' },
  { value: 'SA6', label: 'SA6 (Spark A-6)' },
  { value: 'SB1', label: 'SB1 (Spark B-1)' },
  { value: 'SB2', label: 'SB2 (Spark B-2)' },
  { value: 'SB3', label: 'SB3 (Spark B-3)' },
  { value: 'SB4', label: 'SB4 (Spark B-4)' },
  { value: 'SB5', label: 'SB5 (Spark B-5)' },
  { value: 'SB6', label: 'SB6 (Spark B-6)' },
  // MA, MB, AA, AB도 추가 가능
];

const LearningMaterialsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SmartreeTab>('curriculum');
  const [selectedLevel, setSelectedLevel] = useState<LevelCode>('SA1');
  const [quizMode, setQuizMode] = useState<'preview' | 'review'>('review');

  const handleAIQuizClick = () => {
    navigate('/learning-materials/ai-quiz');
  };

  return (
    <div className="w-full space-y-3 md:space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">📚 학습자료</h1>

        {/* 레벨 선택 (커리큘럼이 아닐 때만) */}
        {activeTab !== 'curriculum' && activeTab !== 'phonics' && (
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as LevelCode)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            {LEVEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* ⭐ AI 문제 만들기 배너 카드 */}
      <button
        onClick={handleAIQuizClick}
        className="
          w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600
          text-white rounded-xl shadow-lg hover:shadow-2xl
          transition-all duration-300 hover:scale-[1.02]
          p-4 md:p-6 cursor-pointer
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="text-3xl md:text-5xl">⭐</div>
            <div className="text-left">
              <h2 className="text-base md:text-2xl font-bold mb-1">AI 문제 만들기</h2>
              <p className="text-purple-100 text-xs md:text-sm">
                AI가 학생 수준에 맞는 맞춤형 문제를 자동으로 생성합니다
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-sm text-purple-100">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>7단계 간편 생성</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>자동 난이도 조절</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>AI 검수 기능</span>
              </div>
            </div>
            <div className="text-2xl md:text-3xl opacity-90">→</div>
          </div>
        </div>
      </button>

      {/* 탭 네비게이션 */}
      <div className="flex gap-2 mb-3 md:mb-6 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0">
        {/* 커리큘럼 탭 */}
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'curriculum'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-lg md:text-xl">📚</span>
          <div className="text-left">
            <div className="font-medium text-sm md:text-base">커리큘럼</div>
            <div className={`text-xs hidden md:block ${activeTab === 'curriculum' ? 'text-purple-200' : 'text-gray-500'}`}>
              레슨별 콘텐츠
            </div>
          </div>
        </button>

        {/* 학습도구 탭들 */}
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-lg md:text-xl">📝</span>
          <div className="text-left">
            <div className="font-medium text-sm md:text-base whitespace-nowrap">단어 퀴즈</div>
            <div className={`text-xs hidden md:block ${activeTab === 'quiz' ? 'text-blue-200' : 'text-gray-500'}`}>
              예습/복습
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('flashcard')}
          className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'flashcard'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-lg md:text-xl">🃏</span>
          <div className="text-left">
            <div className="font-medium text-sm md:text-base whitespace-nowrap">플래시카드</div>
            <div className={`text-xs hidden md:block ${activeTab === 'flashcard' ? 'text-green-200' : 'text-gray-500'}`}>
              암기 학습
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('phonics')}
          className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'phonics'
              ? 'bg-orange-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-lg md:text-xl">🔤</span>
          <div className="text-left">
            <div className="font-medium text-sm md:text-base">파닉스</div>
            <div className={`text-xs hidden md:block ${activeTab === 'phonics' ? 'text-orange-200' : 'text-gray-500'}`}>
              발음 연습
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('sentence')}
          className={`flex-shrink-0 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'sentence'
              ? 'bg-pink-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-lg md:text-xl">📖</span>
          <div className="text-left">
            <div className="font-medium text-sm md:text-base whitespace-nowrap">문장 읽기</div>
            <div className={`text-xs hidden md:block ${activeTab === 'sentence' ? 'text-pink-200' : 'text-gray-500'}`}>
              읽기 연습
            </div>
          </div>
        </button>
      </div>

      {/* 퀴즈 모드 선택 (퀴즈 탭일 때만) */}
      {activeTab === 'quiz' && (
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setQuizMode('preview')}
            className={`px-4 py-2 rounded-lg ${
              quizMode === 'preview'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            📚 예습 퀴즈
          </button>
          <button
            onClick={() => setQuizMode('review')}
            className={`px-4 py-2 rounded-lg ${
              quizMode === 'review'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            📝 복습 퀴즈
          </button>
        </div>
      )}

      {/* 컨텐츠 영역 */}
      <div className="mt-6">
        {activeTab === 'curriculum' && (
          <CurriculumBrowser
            onStartQuiz={(lessonId) => {
              // 특정 레슨으로 퀴즈 시작
              setActiveTab('quiz');
              console.log('Start quiz for lesson:', lessonId);
            }}
          />
        )}

        {activeTab === 'quiz' && (
          <div className="bg-white rounded-lg border p-4 md:p-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-4xl md:text-6xl mb-4 md:mb-6">📝</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                {quizMode === 'preview' ? '예습 퀴즈' : '복습 퀴즈'}
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                {quizMode === 'preview'
                  ? '새로운 레슨을 학습하기 전 핵심 어휘를 미리 익히는 예습 퀴즈입니다.'
                  : '학습한 내용을 복습하고 장기 기억으로 전환하는 복습 퀴즈입니다.'}
              </p>
              <div className="bg-blue-50 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">현재 선택된 레벨</h4>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{selectedLevel}</div>
                <p className="text-sm text-gray-600 mt-2">
                  {LEVEL_OPTIONS.find(opt => opt.value === selectedLevel)?.label}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">문제 유형</div>
                  <div className="text-gray-800">객관식, 단답형, 매칭</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">제공 기능</div>
                  <div className="text-gray-800">AI 자동 생성, 오답 분석</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flashcard' && (
          <div className="bg-white rounded-lg border p-4 md:p-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-4xl md:text-6xl mb-4 md:mb-6">🃏</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">플래시카드</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                단어와 뜻을 빠르게 암기할 수 있는 디지털 플래시카드입니다.
                학습 데이터를 기반으로 자동으로 복습 주기를 관리합니다.
              </p>
              <div className="bg-green-50 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">현재 선택된 레벨</h4>
                <div className="text-2xl md:text-3xl font-bold text-green-600">{selectedLevel}</div>
                <p className="text-sm text-gray-600 mt-2">
                  {LEVEL_OPTIONS.find(opt => opt.value === selectedLevel)?.label}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-left">
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">학습 모드</div>
                  <div className="text-gray-800 text-sm">암기, 테스트, 매칭</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">복습 알고리즘</div>
                  <div className="text-gray-800 text-sm">간격 반복 학습</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">발음 지원</div>
                  <div className="text-gray-800 text-sm">TTS 음성 재생</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'phonics' && (
          <div className="bg-white rounded-lg border p-4 md:p-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-4xl md:text-6xl mb-4 md:mb-6">🔤</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">파닉스</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                영어 발음의 기초를 다지는 파닉스 학습 모듈입니다.
                철자와 소리의 관계를 체계적으로 학습하여 읽기 능력을 향상시킵니다.
              </p>
              <div className="bg-orange-50 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">학습 과정</h4>
                <div className="flex items-center justify-center gap-3 text-sm">
                  <div className="bg-white rounded-lg px-3 md:px-4 py-2 shadow-sm">
                    <div className="font-medium text-orange-600">1단계</div>
                    <div className="text-gray-600">알파벳 소리</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="bg-white rounded-lg px-3 md:px-4 py-2 shadow-sm">
                    <div className="font-medium text-orange-600">2단계</div>
                    <div className="text-gray-600">자음+모음 조합</div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="bg-white rounded-lg px-3 md:px-4 py-2 shadow-sm">
                    <div className="font-medium text-orange-600">3단계</div>
                    <div className="text-gray-600">단어 읽기</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">제공 콘텐츠</div>
                  <div className="text-gray-800 text-sm">발음 영상, 연습 문제, 발음 녹음</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">대상</div>
                  <div className="text-gray-800 text-sm">초급 학습자, 파닉스 기초</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sentence' && (
          <div className="bg-white rounded-lg border p-4 md:p-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="text-4xl md:text-6xl mb-4 md:mb-6">📖</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">문장 읽기</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                레벨에 맞는 문장을 읽고 이해하는 연습을 하는 모듈입니다.
                음성 인식 기술로 발음을 교정하고 유창성을 향상시킵니다.
              </p>
              <div className="bg-pink-50 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">현재 선택된 레벨</h4>
                <div className="text-2xl md:text-3xl font-bold text-pink-600">{selectedLevel}</div>
                <p className="text-sm text-gray-600 mt-2">
                  {LEVEL_OPTIONS.find(opt => opt.value === selectedLevel)?.label}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left">
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">학습 방식</div>
                  <div className="text-gray-800 text-sm">듣고 따라하기, 녹음 및 비교</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">피드백</div>
                  <div className="text-gray-800 text-sm">발음 정확도, 유창성 점수</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">난이도</div>
                  <div className="text-gray-800 text-sm">단문 → 복문 → 지문</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">포함 요소</div>
                  <div className="text-gray-800 text-sm">어휘, 문법, 발음, 억양</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningMaterialsPage;
