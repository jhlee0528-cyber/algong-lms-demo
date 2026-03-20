/**
 * LMS 헤더 컴포넌트
 * 로고, 네비게이션 메뉴, 공부방 정보, 설정/물음표/나가기 아이콘 포함
 */

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HelpModal from './HelpModal';
import type { User } from '../../types';

interface HeaderProps {
  user?: User;
  studyRoomName?: string;
}

const Header: React.FC<HeaderProps> = ({ user, studyRoomName = '알공 공부방' }) => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);

  const navItems = [
    { path: '/', label: '수업보기', icon: '📚' },
    { path: '/english-library', label: '영어도서관', icon: '📖' },
  ];

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 좌측: 로고 + 네비게이션 메뉴 */}
            <div className="flex items-center gap-6">
              {/* 로고 */}
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

              {/* 네비게이션 메뉴 */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
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
                onClick={() => navigate('/settings')}
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
          </div>
        </div>
      </header>

      {/* 도움말 모달 */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </>
  );
};

export default Header;
