/**
 * 스마트리 페이지 (새 버전)
 * 커리큘럼 + 학습도구 (콘텐츠 중심)
 */

import React, { useState } from 'react';
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

const SmartreePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SmartreeTab>('curriculum');
  const [selectedLevel, setSelectedLevel] = useState<LevelCode>('SA1');
  const [quizMode, setQuizMode] = useState<'preview' | 'review'>('review');

  return (
    <div className="w-full space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">🌳 스마트리</h1>

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

      {/* 탭 네비게이션 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {/* 커리큘럼 탭 */}
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'curriculum'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-xl">📚</span>
          <div className="text-left">
            <div className="font-medium">커리큘럼</div>
            <div className={`text-xs ${activeTab === 'curriculum' ? 'text-purple-200' : 'text-gray-500'}`}>
              레슨별 콘텐츠
            </div>
          </div>
        </button>

        {/* 학습도구 탭들 */}
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-xl">📝</span>
          <div className="text-left">
            <div className="font-medium">단어 퀴즈</div>
            <div className={`text-xs ${activeTab === 'quiz' ? 'text-blue-200' : 'text-gray-500'}`}>
              예습/복습
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('flashcard')}
          className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'flashcard'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-xl">🃏</span>
          <div className="text-left">
            <div className="font-medium">플래시카드</div>
            <div className={`text-xs ${activeTab === 'flashcard' ? 'text-green-200' : 'text-gray-500'}`}>
              암기 학습
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('phonics')}
          className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'phonics'
              ? 'bg-orange-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-xl">🔤</span>
          <div className="text-left">
            <div className="font-medium">파닉스</div>
            <div className={`text-xs ${activeTab === 'phonics' ? 'text-orange-200' : 'text-gray-500'}`}>
              발음 연습
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('sentence')}
          className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'sentence'
              ? 'bg-pink-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          <span className="text-xl">📖</span>
          <div className="text-left">
            <div className="font-medium">문장 읽기</div>
            <div className={`text-xs ${activeTab === 'sentence' ? 'text-pink-200' : 'text-gray-500'}`}>
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
          <div className="bg-white rounded-lg border p-6 text-center">
            <p className="text-gray-600 mb-4">
              {quizMode === 'preview' ? '예습 퀴즈' : '복습 퀴즈'} 기능이 곧 추가될 예정입니다.
            </p>
            <p className="text-sm text-gray-500">레벨: {selectedLevel}</p>
          </div>
        )}

        {activeTab === 'flashcard' && (
          <div className="bg-white rounded-lg border p-6 text-center">
            <p className="text-gray-600 mb-4">플래시카드 기능이 곧 추가될 예정입니다.</p>
            <p className="text-sm text-gray-500">레벨: {selectedLevel}</p>
          </div>
        )}

        {activeTab === 'phonics' && (
          <div className="bg-white rounded-lg border p-6 text-center">
            <p className="text-gray-600">파닉스 모듈이 곧 추가될 예정입니다.</p>
          </div>
        )}

        {activeTab === 'sentence' && (
          <div className="bg-white rounded-lg border p-6 text-center">
            <p className="text-gray-600 mb-4">문장 읽기 기능이 곧 추가될 예정입니다.</p>
            <p className="text-sm text-gray-500">레벨: {selectedLevel}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartreePage;
