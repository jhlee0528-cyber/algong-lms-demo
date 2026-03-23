/**
 * 설정 페이지 (⚙️)
 * 기존 복잡한 기능들을 숨기는 메뉴
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  badge?: string;
}

const settingItems: SettingItem[] = [
  {
    id: 'students',
    title: '학생 관리',
    description: '학생 추가/삭제/정보 수정',
    icon: '👥',
    path: '/students',
  },
  {
    id: 'learning-status',
    title: '학습 현황',
    description: '학생별 상세 학습 진도 및 통계',
    icon: '📊',
    path: '/learning-status',
  },
  {
    id: 'curriculum',
    title: '커리큘럼',
    description: '학습 커리큘럼 확인 및 관리',
    icon: '📚',
    path: '/curriculum',
  },
  {
    id: 'learning-settings',
    title: '학습 설정',
    description: '스킬트리 ON/OFF, 난이도 조절',
    icon: '✏️',
    path: '/learning-settings',
  },
  {
    id: 'learning-materials',
    title: '학습 자료',
    description: '교재 및 학습 자료 관리',
    icon: '📖',
    path: '/learning-materials',
  },
  {
    id: 'diagnostic',
    title: '진단 테스트',
    description: 'ArLex 기반 레벨 테스트',
    icon: '📝',
    path: '/diagnostic/001',
  },
  // v3.0: 학원 운영 인프라 기능 숨김 (나중에 부활 가능)
  // {
  //   id: 'grading',
  //   title: 'AI 자동 채점',
  //   description: '워크시트 자동 채점 시스템',
  //   icon: '✅',
  //   path: '/grading/ai',
  // },
  {
    id: 'reports',
    title: '리포트 템플릿',
    description: '학부모 리포트 문구 커스터마이징',
    icon: '📄',
    path: '/reports/communication',
  },
  {
    id: 'rewards',
    title: '보상 설정',
    description: '코인 배율, 월 한도 등',
    icon: '💰',
    path: '/settings',
    badge: '준비중',
  },
  {
    id: 'ranking',
    title: '클래스 랭킹',
    description: '학생 간 경쟁 ON/OFF',
    icon: '🏆',
    path: '/settings',
    badge: '준비중',
  },
];

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* 헤더 */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">⚙️</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">설정</h1>
        </div>
        <p className="text-sm text-gray-600 ml-12">
          고급 기능 및 시스템 설정을 관리합니다.
        </p>
      </div>

      {/* 설정 카테고리 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">학습 관리</h2>
          <p className="text-sm text-gray-500">학생 및 학습 관련 설정</p>
        </div>
        <div className="divide-y divide-gray-200">
          {settingItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className="w-full px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* 평가 및 소통 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">평가 및 소통</h2>
          <p className="text-sm text-gray-500">진단, 채점, 학부모 소통 관련 설정</p>
        </div>
        <div className="divide-y divide-gray-200">
          {settingItems.slice(5, 7).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.path)}
              className="w-full px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* 게이미피케이션 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">게이미피케이션</h2>
          <p className="text-sm text-gray-500">보상 및 동기부여 시스템 설정</p>
        </div>
        <div className="divide-y divide-gray-200">
          {settingItems.slice(7).map((item) => (
            <button
              key={item.id}
              onClick={() => item.badge ? null : handleNavigate(item.path)}
              disabled={!!item.badge}
              className={`w-full px-4 md:px-6 py-4 transition-colors text-left flex items-center justify-between ${
                item.badge ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </div>
              {!item.badge && (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">설정을 건드리지 않아도 괜찮습니다</h3>
            <p className="text-sm text-blue-800">
              기본값만으로도 충분히 운영 가능하도록 설계되었습니다.
              필요한 경우에만 설정을 변경하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
