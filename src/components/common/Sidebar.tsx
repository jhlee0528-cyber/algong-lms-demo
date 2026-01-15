import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

const menuItems: MenuItem[] = [
  { id: 'learning-status', label: '학습현황', icon: '📊', path: '/learning-status' },
  { id: 'curriculum', label: '커리큘럼', icon: '📚', path: '/curriculum' },
  { id: 'learning-settings', label: '학습설정', icon: '✏️', path: '/learning-settings' },
  { id: 'class-view', label: '수업보기', icon: '📺', path: '/class-view' },
  { id: 'smartree', label: '스마트리', icon: '🌳', path: '/smartree' },
];

const Sidebar: React.FC = () => {
  // localStorage에서 초기 상태 로드
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebar-expanded');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const location = useLocation();

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  // 모바일 감지
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 페이지 이동 시 모바일 사이드바 닫기
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // 실제 표시 너비 결정
  const shouldShowExpanded = isExpanded || isHovering;

  return (
    <>
      {/* 모바일 백드롭 */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        onMouseEnter={() => !isExpanded && !isMobile && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200
          flex flex-col z-50
          transition-all duration-300 ease-in-out
          ${isMobile 
            ? `${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64` 
            : `${shouldShowExpanded ? 'w-60' : 'w-16'}`
          }
          ${!isExpanded && isHovering ? 'shadow-2xl' : 'shadow-sm'}
        `}
      >
        {/* 메뉴 리스트 */}
        <nav className="flex-1 py-4 overflow-y-auto sidebar-scroll pt-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${!shouldShowExpanded ? 'justify-center' : ''}
                  `}
                  title={!shouldShowExpanded ? item.label : undefined}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {shouldShowExpanded && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                  {shouldShowExpanded && item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* 하단 영역 */}
        <div className="border-t border-gray-100 p-2">
          {/* 접기/펼치기 버튼 */}
          {!isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg
                text-gray-500 hover:bg-gray-50 hover:text-gray-700
                transition-all duration-200
                ${!shouldShowExpanded ? 'justify-center' : ''}
              `}
              title={isExpanded ? '사이드바 접기' : '사이드바 펼치기'}
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {shouldShowExpanded && (
                <span className="text-sm">
                  {isExpanded ? '사이드바 접기' : '사이드바 펼치기'}
                </span>
              )}
            </button>
          )}

          {/* 모바일 닫기 버튼 */}
          {isMobile && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-gray-500 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>닫기</span>
            </button>
          )}
        </div>
      </aside>

      {/* 모바일 토글 버튼 */}
      {isMobile && !isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md md:hidden"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </>
  );
};

export default Sidebar;
