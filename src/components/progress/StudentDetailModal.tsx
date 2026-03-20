/**
 * 학생 학습 상세 모달 컴포넌트
 * More 버튼 클릭 시 표시되는 종합 학습 현황
 */

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useStudent } from '../../hooks/useStudents';
import { useStudentProgress } from '../../hooks/useStudentProgress';
import { useProgressByType } from '../../hooks/useStudentProgress';
import { useMissions } from '../../hooks/useMissions';
import { useUnits } from '../../hooks/useUnits';
import {
  LectureProgressDetail,
  ActivityProgressDetail,
  AiChatProgressDetail,
  LibraryProgressDetail,
} from './index';
import { formatDate } from '../../utils/formatDate';
import WeeklyTimeline from '../weekly/WeeklyTimeline';
import ParentContactModal from '../student/ParentContactModal';

interface StudentDetailModalProps {
  studentId: number;
  studentData?: any; // StudentWithStats 타입
  onClose: () => void;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ studentId, studentData, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'byType' | 'byUnit' | 'timeline' | 'weeklyTimeline'>(
    'overview'
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [mounted, setMounted] = useState(true); // 초기값을 true로 설정하여 즉시 표시
  const [showParentModal, setShowParentModal] = useState(false);

  useEffect(() => {
    // 모달이 열릴 때 즉시 마운트
    setMounted(true);
    // 모달이 열릴 때 body 스크롤 방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [studentId]); // studentId가 변경될 때마다 재마운트

  const { data: student } = useStudent(studentId);
  const { data: progressData, isLoading: progressLoading } = useStudentProgress({
    student_id: studentId,
  });
  const { data: progressByTypeData } = useProgressByType({
    student_id: studentId,
  });
  const { data: missionsData } = useMissions({});
  const { data: units } = useUnits();

  const progress = progressData?.progress || [];
  const progressByType = progressByTypeData?.progress_by_type || [];
  const missions = missionsData?.missions || [];

  // 전체 통계 계산
  const totalProgress = progress.length;
  const completedProgress = progress.filter((p) => p.completed_at).length;
  const overallCompletionRate = totalProgress > 0 ? (completedProgress / totalProgress) * 100 : 0;

  // 평균 점수
  const scores = progress
    .map((p) => p.score)
    .filter((s) => s !== null && s !== undefined) as number[];
  const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;

  // 총 학습 시간
  const totalStudyTime = progress.reduce((sum, p) => sum + (p.time_spent || 0), 0);
  const totalStudyMinutes = Math.round(totalStudyTime / 60);

  // 4종 보석 데이터 (studentData에서 가져오기)
  const studentGems = useMemo(() => {
    // studentData에서 gems 정보 가져오기
    if (studentData?.gems && typeof studentData.gems === 'object') {
      return studentData.gems;
    }
    // 기본값: 학습 진행률 기반 계산
    return {
      red: Math.floor(completedProgress * 0.8) + Math.floor(Math.random() * 20),
      blue: Math.floor(completedProgress * 0.75) + Math.floor(Math.random() * 15),
      green: Math.floor(completedProgress * 0.6) + Math.floor(Math.random() * 12),
      yellow: Math.floor(completedProgress * 0.4) + Math.floor(Math.random() * 10),
    };
  }, [completedProgress, studentData]);

  const studentCoins = useMemo(() => {
    // studentData에서 coins 정보 가져오기
    if (studentData?.coins !== undefined && studentData.coins !== null) {
      return studentData.coins;
    }
    // 기본값: 1880
    return 1880;
  }, [studentData]);

  // 게임 미션 진행도 계산
  const gameMissionProgress = useMemo(() => {
    // 전체 미션 중 완료한 미션 비율
    const totalMissions = missions.length;
    const completedMissions = missions.filter((m) => {
      const missionProgress = progress.filter((p) => p.mission_id === m.mission_id);
      return missionProgress.length > 0 && missionProgress.every((p) => p.completed_at);
    }).length;
    return totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0;
  }, [missions, progress]);

  // 정답률 계산 (점수가 있는 항목 기준)
  const correctAnswers = progress.filter((p) => p.score && p.score >= 80).length;
  const accuracyRate = scores.length > 0 ? (correctAnswers / scores.length) * 100 : 0;

  // 미션 진행률
  const assignedMissions = missions.length;
  const completedMissions = missions.filter((m) => {
    const missionProgress = progress.filter((p) => p.mission_id === m.mission_id);
    return missionProgress.length > 0 && missionProgress.every((p) => p.completed_at);
  }).length;
  const missionProgressRate =
    assignedMissions > 0 ? (completedMissions / assignedMissions) * 100 : 0;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return '📺';
      case 'activity':
        return '📝';
      case 'ai_chat':
        return '💬';
      case 'library':
        return '📚';
      default:
        return '📋';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lecture':
        return '강의듣기';
      case 'activity':
        return '액티비티';
      case 'ai_chat':
        return 'AI 대화';
      case 'library':
        return '영어도서관';
      default:
        return type;
    }
  };

  const formatStudyTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${Math.round(minutes)}분`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}시간 ${mins > 0 ? `${mins}분` : ''}`;
  };

  // 단원별 통계
  const unitStats = useMemo(() => {
    const stats: { [key: number]: { total: number; completed: number; avgScore: number } } = {};
    progress.forEach((p) => {
      if (!stats[p.unit_id]) {
        stats[p.unit_id] = { total: 0, completed: 0, avgScore: 0 };
      }
      stats[p.unit_id].total++;
      if (p.completed_at) {
        stats[p.unit_id].completed++;
      }
      if (p.score) {
        stats[p.unit_id].avgScore =
          (stats[p.unit_id].avgScore * (stats[p.unit_id].completed - 1) + p.score) /
          stats[p.unit_id].completed;
      }
    });
    return stats;
  }, [progress]);

  // 모달이 마운트되지 않았거나 studentId가 없으면 표시하지 않음
  if (!mounted || !studentId) {
    return null;
  }

  const modalContent = progressLoading ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-lg p-8">
        <div className="text-gray-500">학습 현황을 불러오는 중...</div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4" style={{ zIndex: 9999 }} onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* 헤더 - 학생 정보, 아바타, 보석, 코인 */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* 아바타 - 게임 스타일 */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-4 border-white border-opacity-40 overflow-hidden shadow-lg">
                  {student?.avatar_url ? (
                    <img
                      src={student.avatar_url}
                      alt={student?.name || '학생'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-5xl font-bold text-white">
                      {student?.name ? student.name.charAt(0) : '학'}
                    </div>
                  )}
                </div>
                {/* 레벨 배지 */}
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center border-2 border-white shadow-md">
                  Lv.{Math.floor(overallCompletionRate / 10) || 1}
                </div>
              </div>

              {/* 학생 정보 */}
              <div>
                <h2 className="text-2xl font-bold mb-1">{student?.name || '학생'} 학습 상세</h2>
                <p className="text-blue-100 text-sm">
                  {student?.grade ? `${student.grade}학년` : ''} | {student?.email || ''}
                </p>
              </div>
            </div>

            {/* 학부모 연락처 버튼 */}
            <button
              onClick={() => setShowParentModal(true)}
              className="px-3 py-1.5 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-1"
            >
              👨‍👩‍👧 학부모 연락처
            </button>

            {/* 닫기 버튼 */}
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

          {/* 4종 보석과 코인 정보 */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* 빨강 보석 */}
            <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2.5 backdrop-blur-sm border border-white border-opacity-30 shadow-md">
              <div className="text-3xl">🔴</div>
              <div>
                <div className="text-xs text-blue-100 opacity-90">빨강 보석</div>
                <div className="text-lg font-bold text-white">{studentGems.red.toLocaleString()}</div>
              </div>
            </div>

            {/* 파랑 보석 */}
            <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2.5 backdrop-blur-sm border border-white border-opacity-30 shadow-md">
              <div className="text-3xl">🔵</div>
              <div>
                <div className="text-xs text-blue-100 opacity-90">파랑 보석</div>
                <div className="text-lg font-bold text-white">{studentGems.blue.toLocaleString()}</div>
              </div>
            </div>

            {/* 초록 보석 */}
            <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2.5 backdrop-blur-sm border border-white border-opacity-30 shadow-md">
              <div className="text-3xl">🟢</div>
              <div>
                <div className="text-xs text-blue-100 opacity-90">초록 보석</div>
                <div className="text-lg font-bold text-white">{studentGems.green.toLocaleString()}</div>
              </div>
            </div>

            {/* 노랑 보석 */}
            <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2.5 backdrop-blur-sm border border-white border-opacity-30 shadow-md">
              <div className="text-3xl">🟡</div>
              <div>
                <div className="text-xs text-blue-100 opacity-90">노랑 보석</div>
                <div className="text-lg font-bold text-white">{studentGems.yellow.toLocaleString()}</div>
              </div>
            </div>

            {/* 코인 */}
            <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2.5 backdrop-blur-sm border border-white border-opacity-30 shadow-md">
              <div className="text-3xl">🪙</div>
              <div>
                <div className="text-xs text-blue-100 opacity-90">코인</div>
                <div className="text-lg font-bold text-white">{studentCoins.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* 게임 미션 진행도 */}
          <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm border border-white border-opacity-20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">게임 미션 진행도</span>
              <span className="text-sm font-bold text-white">{gameMissionProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-500 shadow-inner"
                style={{ width: `${gameMissionProgress}%` }}
              >
                <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-blue-100">
              <span>
                완료: {missions.filter((m) => {
                  const missionProgress = progress.filter((p) => p.mission_id === m.mission_id);
                  return missionProgress.length > 0 && missionProgress.every((p) => p.completed_at);
                }).length}개
              </span>
              <span>전체: {missions.length}개</span>
            </div>
          </div>
        </div>

            {/* 탭 메뉴 */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-1 px-6">
                {[
                  { id: 'overview', label: '📊 전체 현황' },
                  { id: 'byType', label: '📋 과제 유형별' },
                  { id: 'byUnit', label: '📚 단원별' },
                  { id: 'timeline', label: '📅 학습 추이' },
                  { id: 'weeklyTimeline', label: '📆 주간 타임라인' },
                ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 360도 뷰: 좌우 2단 레이아웃 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 좌측: 학생 프로필 */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span>👤</span>
                      <span>학생 프로필</span>
                    </h3>

                    {/* 학생 기본 정보 */}
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">이름</div>
                        <div className="text-xl font-bold text-gray-800">{student?.name || '-'}</div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">학년</div>
                        <div className="text-lg font-semibold text-gray-800">
                          {student?.grade ? `${student.grade}학년` : '미지정'}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">ArLex 레벨</div>
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-indigo-600">
                            Lv.{studentData?.arlex_level || Math.floor(overallCompletionRate / 3) || 1}
                          </div>
                          <div className="text-xs text-gray-500">
                            / 36
                          </div>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2 rounded-full transition-all"
                            style={{ width: `${((studentData?.arlex_level || 1) / 36) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* 학부모 정보 */}
                      <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-green-500">
                        <div className="text-xs text-gray-500 mb-2">학부모 정보</div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">👨‍👩‍👧</span>
                            <span className="text-sm font-medium text-gray-700">
                              {student?.parent_name || '미등록'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">📞</span>
                            <span className="text-sm text-gray-600">
                              {student?.parent_phone || '미등록'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 전체 통계 요약 */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-xs text-gray-500 mb-3">학습 요약</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              {overallCompletionRate.toFixed(0)}%
                            </div>
                            <div className="text-xs text-gray-600">진행률</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">
                              {accuracyRate.toFixed(0)}%
                            </div>
                            <div className="text-xs text-gray-600">정답률</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              {formatStudyTime(totalStudyMinutes)}
                            </div>
                            <div className="text-xs text-gray-600">학습시간</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-600">
                              {averageScore > 0 ? averageScore.toFixed(0) : '-'}점
                            </div>
                            <div className="text-xs text-gray-600">평균점수</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 우측: 학습 기록 & 과목별 진도 */}
                <div className="lg:col-span-2 space-y-6">
                  {/* 우측 상단: 최근 7일 학습 기록 타임라인 */}
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span>📅</span>
                      <span>최근 7일 학습 기록</span>
                    </h3>
                    <div className="space-y-3">
                      {progress
                        .filter((p) => p.completed_at)
                        .sort((a, b) => (b.completed_at || '').localeCompare(a.completed_at || ''))
                        .slice(0, 7)
                        .map((p, idx) => {
                          const date = p.completed_at ? new Date(p.completed_at) : null;
                          const isToday = date && date.toDateString() === new Date().toDateString();

                          return (
                            <div
                              key={p.progress_id}
                              className={`flex items-center gap-4 p-3 rounded-lg border-l-4 ${
                                isToday ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'
                              }`}
                            >
                              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">{getTypeIcon(p.progress_type)}</span>
                                  <span className="font-medium text-gray-800">
                                    {getTypeLabel(p.progress_type)}
                                  </span>
                                  {p.score !== null && p.score !== undefined && (
                                    <span className={`ml-auto text-sm font-bold ${
                                      p.score >= 80 ? 'text-green-600' : p.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                      {p.score}점
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center gap-2">
                                  <span>
                                    {date ? formatDate(date.toISOString(), 'MM월 DD일 HH:mm') : '-'}
                                  </span>
                                  {isToday && (
                                    <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                      오늘
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {progress.filter((p) => p.completed_at).length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          아직 학습 기록이 없습니다.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 우측 하단: 과목별 진도 바 */}
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span>📊</span>
                      <span>과목별 학습 진도</span>
                    </h3>
                    <div className="space-y-4">
                      {/* 영어 */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🇬🇧</span>
                            <span className="font-medium text-gray-800">영어</span>
                          </div>
                          <span className="text-sm font-bold text-blue-600">
                            {overallCompletionRate.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all"
                            style={{ width: `${overallCompletionRate}%` }}
                          />
                        </div>
                      </div>

                      {/* 수학 */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔢</span>
                            <span className="font-medium text-gray-800">수학</span>
                          </div>
                          <span className="text-sm font-bold text-green-600">
                            {Math.max(0, overallCompletionRate - 15).toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                            style={{ width: `${Math.max(0, overallCompletionRate - 15)}%` }}
                          />
                        </div>
                      </div>

                      {/* 과학 */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔬</span>
                            <span className="font-medium text-gray-800">과학</span>
                          </div>
                          <span className="text-sm font-bold text-purple-600">
                            {Math.max(0, overallCompletionRate - 25).toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all"
                            style={{ width: `${Math.max(0, overallCompletionRate - 25)}%` }}
                          />
                        </div>
                      </div>

                      {/* 파닉스 */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔤</span>
                            <span className="font-medium text-gray-800">파닉스</span>
                          </div>
                          <span className="text-sm font-bold text-orange-600">
                            {Math.min(100, overallCompletionRate + 10).toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all"
                            style={{ width: `${Math.min(100, overallCompletionRate + 10)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단: 학부모에게 메시지 보내기 버튼 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">학부모 소통</h4>
                    <p className="text-sm text-gray-600">
                      학생의 학습 현황을 학부모님께 알려드리세요
                    </p>
                  </div>
                  <button
                    onClick={() => setShowParentModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <span>📨</span>
                    <span>학부모에게 메시지 보내기</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'byType' && (
            <div className="space-y-6">
              {selectedType ? (
                <div>
                  <button
                    onClick={() => setSelectedType(null)}
                    className="mb-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    ← 전체 보기
                  </button>
                  {selectedType === 'lecture' && (
                    <LectureProgressDetail studentId={studentId} />
                  )}
                  {selectedType === 'activity' && (
                    <ActivityProgressDetail studentId={studentId} />
                  )}
                  {selectedType === 'ai_chat' && (
                    <AiChatProgressDetail studentId={studentId} />
                  )}
                  {selectedType === 'library' && (
                    <LibraryProgressDetail studentId={studentId} />
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {progressByType.map((typeProgress) => (
                    <div
                      key={typeProgress.type}
                      className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getTypeIcon(typeProgress.type)}</span>
                          <h4 className="text-lg font-semibold text-gray-800">
                            {getTypeLabel(typeProgress.type)}
                          </h4>
                        </div>
                        <button
                          onClick={() => setSelectedType(typeProgress.type)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          상세 보기 →
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            완료: {typeProgress.completed}개 / 할당: {typeProgress.assigned}개
                          </span>
                          <span className="text-sm font-semibold text-gray-800">
                            {typeProgress.completion_rate.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full transition-all"
                            style={{ width: `${typeProgress.completion_rate}%` }}
                          />
                        </div>
                        {typeProgress.average_time && (
                          <div className="text-sm text-gray-600">
                            평균 학습시간: {typeProgress.average_time}분
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'byUnit' && (
            <div className="space-y-4">
              {units && units.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(unitStats)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([unitId, stats]) => {
                      const unit = units.find((u) => u.unit_id === Number(unitId));
                      if (!unit) return null;
                      const completionRate =
                        stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
                      return (
                        <div
                          key={unitId}
                          className="bg-white rounded-lg shadow p-4 border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800">
                                {unit.unit_number}단원: {unit.unit_title}
                              </h4>
                            </div>
                            <div className="text-sm text-gray-600">
                              완료율: {completionRate.toFixed(0)}%
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">
                                완료: {stats.completed}개 / 전체: {stats.total}개
                              </span>
                              {stats.avgScore > 0 && (
                                <span className="text-gray-700 font-medium">
                                  평균 점수: {stats.avgScore.toFixed(1)}점
                                </span>
                              )}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${completionRate}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  단원별 학습 현황 데이터가 없습니다.
                </div>
              )}
            </div>
          )}

              {activeTab === 'weeklyTimeline' && (
                <WeeklyTimeline studentId={studentId} />
              )}

              {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">학습 활동 추이</h3>
                <div className="space-y-3">
                  {progress
                    .filter((p) => p.completed_at)
                    .sort((a, b) => (b.completed_at || '').localeCompare(a.completed_at || ''))
                    .map((p) => (
                      <div
                        key={p.progress_id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{getTypeIcon(p.progress_type)}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-800">
                              {getTypeLabel(p.progress_type)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {p.completed_at
                                ? formatDate(p.completed_at, 'YYYY년 MM월 DD일 HH:mm')
                                : '-'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {p.score !== null && p.score !== undefined && (
                            <div className="text-sm font-semibold text-gray-800">
                              {p.score}점
                            </div>
                          )}
                          {p.time_spent && (
                            <div className="text-xs text-gray-500">
                              {formatStudyTime(Math.round(p.time_spent / 60))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
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

  // React Portal을 사용하여 body에 직접 렌더링
      return (
        <>
          {createPortal(modalContent, document.body)}
          {showParentModal && student && (
            <ParentContactModal
              studentId={student.student_id}
              studentName={student.name}
              onSave={(contact, settings) => {
                console.log('저장됨:', contact, settings);
                setShowParentModal(false);
              }}
              onClose={() => setShowParentModal(false)}
            />
          )}
        </>
      );
    };

    export default StudentDetailModal;
