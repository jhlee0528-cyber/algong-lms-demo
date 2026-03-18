/**
 * 메인 App 컴포넌트
 * 라우팅 설정 및 전체 앱 구조
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/common';
import FeedbackButton from './components/common/FeedbackButton';
import {
  LearningStatusPage,
  LearningSettingsPage,
  SmartreePage,
} from './pages';
import CurriculumPage from './pages/CurriculumPage';
import ClassroomPage from './pages/ClassroomPage';
import DashboardPage from './pages/DashboardPage';
import QuickGradingPage from './pages/Grading/QuickGradingPage';
import './styles/index.css';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/grading/quick" element={<QuickGradingPage />} />
            <Route path="/learning-status" element={<LearningStatusPage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/learning-settings" element={<LearningSettingsPage />} />
            <Route path="/class-view" element={<ClassroomPage />} />
            <Route path="/smartree" element={<SmartreePage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <FeedbackButton />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
