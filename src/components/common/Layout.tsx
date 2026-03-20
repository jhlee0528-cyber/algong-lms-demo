/**
 * 공통 레이아웃 컴포넌트
 * 사이드바와 메인 콘텐츠 영역을 포함
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import SettingsModal from './SettingsModal';
import HelpModal from './HelpModal';
import type { User } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  user?: User;
  studyRoomName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, user, studyRoomName = '알공 공부방' }) => {
  // 사이드바 상태와 동기화
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('sidebar-expanded');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // localStorage 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sidebar-expanded');
      if (saved !== null) {
        setSidebarExpanded(JSON.parse(saved));
      }
    };

    // 커스텀 이벤트로 동기화
    window.addEventListener('storage', handleStorageChange);
    
    // 주기적 체크 (같은 탭 내 변경 감지)
    const interval = setInterval(() => {
      const saved = localStorage.getItem('sidebar-expanded');
      if (saved !== null) {
        const newValue = JSON.parse(saved);
        if (newValue !== sidebarExpanded) {
          setSidebarExpanded(newValue);
        }
      }
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [sidebarExpanded]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const sidebarWidth = isMobile ? 0 : (sidebarExpanded ? 240 : 64); // w-60 = 240px, w-16 = 64px

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* 사이드바 */}
        <Sidebar />

        {/* 메인 콘텐츠 */}
        <main 
          className={`
            min-h-screen transition-all duration-300 ease-in-out
            ${isMobile ? 'ml-0' : sidebarExpanded ? 'ml-60' : 'ml-16'}
          `}
        >
          {/* 헤더 - 사이드바 우측 상단에 로고 배치 */}
          <header 
            className="h-16 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-20 transition-all duration-300"
            style={{ paddingLeft: `${sidebarWidth + 8}px`, paddingRight: '24px' }}
          >
            {/* 좌측: 로고 */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="알공스마트리 LMS"
                className="h-10 w-auto"
                onError={(e) => {
                  // 이미지가 없을 경우 텍스트 로고 표시
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.logo-text-fallback')) {
                    const textLogo = document.createElement('h1');
                    textLogo.className = 'text-xl font-bold text-gray-800 logo-text-fallback';
                    textLogo.textContent = '알공스마트리 LMS';
                    parent.appendChild(textLogo);
                  }
                }}
              />
            </div>

            {/* 우측: 공부방 정보 및 아이콘 */}
            <div className="flex items-center gap-4">
              {/* 공부방 정보 */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-700">
                <span className="font-medium text-gray-800">{studyRoomName}</span>
                {user && (
                  <>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">{user.name} 선생님</span>
                  </>
                )}
              </div>

              {/* 설정 아이콘 */}
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="설정"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {/* 물음표 아이콘 (이용가이드/문의하기) */}
              <button
                onClick={() => setShowHelp(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="도움말"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              {/* 나가기 아이콘 */}
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="로그아웃"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* 페이지 콘텐츠 */}
          <div className="p-3 md:p-6 pb-20 md:pb-6">
            {children}
          </div>
        </main>
      </div>

      {/* 설정 모달 */}
      {showSettings && (
        <SettingsModal user={user} onClose={() => setShowSettings(false)} />
      )}

      {/* 도움말 모달 */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default Layout;
