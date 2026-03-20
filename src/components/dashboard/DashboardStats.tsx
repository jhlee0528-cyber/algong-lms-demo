/**
 * 대시보드 통계 카드 컴포넌트
 * 주간/월간 학습 통계를 요약하여 표시
 */

import React, { useState, useMemo } from 'react';
import { getWeekStart, getNextWeekStart, formatWeekRange } from '../../utils/weekHelper';
import WeeklyPlanningPanel from '../weekly/WeeklyPlanningPanel';
import StudentStatusPanel from './StudentStatusPanel';
import type { StudentWithStats } from '../progress/StudentListTable';
import type { WeekTab } from '../../hooks/useWeeklyData';
import type { WeeklySummary } from '../../types/weeklyData';

interface StudentData {
  name: string;
  learningProgress: number;
  missionProgress: number;
  accuracyRate: number;
}

interface DashboardStatsProps {
  // 새로운 props (동기화된 주간 데이터)
  activeWeek?: WeekTab;
  onWeekChange?: (week: WeekTab) => void;
  summary?: WeeklySummary;
  weekLabel?: string;
  weekRange?: string;
  
  // 기존 props (하위 호환성)
  totalStudents?: number;
  completedStudents?: number;
  avgProgress?: number;
  avgAccuracy?: number;
  studentsData?: StudentData[]; // 학생 데이터 (주간별 계산용)
  studentsList?: Array<{
    student_id: number;
    name: string;
    learningProgress: number;
    missionProgress: number;
    accuracyRate: number;
    arlex_level?: number | null;
    weeklyGoal?: number;
    weeklyCompletionRate?: number;
    performanceStatus?: 'excellent' | 'on_track' | 'warning' | 'critical';
    weeklyStatus?: 'excellent' | 'normal' | 'warning' | 'critical';
  }>; // 전체 학생 목록 (주간 계획용)
  topStudents?: Array<{
    name: string;
    achievement: string;
    badge?: string;
  }>;
  actionNeeded?: Array<{
    name: string;
    issue: string;
    action: string;
  }>;
  onStudentClick?: (studentId: number) => void; // 학생 클릭 핸들러
}

interface WeekData {
  week: number; // 0: 이번 주, -1: 지난 주, -2: 2주 전 등
  totalStudents: number;
  completedStudents: number;
  avgProgress: number;
  avgAccuracy: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  // 새로운 props
  activeWeek: propActiveWeek,
  onWeekChange: propOnWeekChange,
  summary: propSummary,
  weekLabel: propWeekLabel,
  weekRange: propWeekRange,
  // 기존 props
  totalStudents,
  completedStudents,
  avgProgress,
  avgAccuracy,
  studentsData = [],
  studentsList = [],
  topStudents = [],
  actionNeeded = [],
  onStudentClick,
}) => {
  // 새로운 props가 있으면 사용, 없으면 기존 로직 사용
  const useNewData = !!propSummary && !!propActiveWeek && !!propOnWeekChange;
  
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0); // 0: 이번 주, -1: 지난 주, 1: 다음 주
  type WeekTab = 'last' | 'this' | 'next';
  const [activeTab, setActiveTab] = useState<WeekTab>((propActiveWeek as WeekTab) || 'this');
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  
  // activeWeek이 prop으로 전달되면 그것을 사용, 없으면 내부 상태 사용
  const activeWeek: WeekTab = (propActiveWeek as WeekTab) || activeTab;
  const setActiveWeek = propOnWeekChange || setActiveTab;

  // 주간별 학생 데이터 생성 (더미 데이터 - 실제로는 API에서 가져와야 함)
  const weekStudentsData = useMemo(() => {
    if (studentsData.length === 0) {
      // studentsData가 없으면 기존 topStudents와 actionNeeded 사용
      return { current: [], last: [] };
    }

    // 이번 주 데이터 (원본)
    const currentWeekStudents = studentsData.map((s) => ({
      ...s,
      learningProgress: s.learningProgress,
      missionProgress: s.missionProgress,
      accuracyRate: s.accuracyRate,
    }));

    // 지난 주 데이터 생성
    // 주의/미흡 학생들의 학습 진행률을 특정 값으로 설정
    const actionNeededProgressMap: { [key: string]: number } = {
      '임수진': 12,
      '정현우': 10,
      '오나은': 9,
      '홍예린': 5,
      '최서연': 3,
    };

    // 현재 주 데이터를 기준으로 지난 주 데이터 생성
    // 완료한 학생 2명 찾기 (학습 진행률과 미션 진행률이 높은 상위 2명)
    const sortedByProgress = [...studentsData].sort((a, b) => {
      const scoreA = (a.learningProgress + a.missionProgress) / 2;
      const scoreB = (b.learningProgress + b.missionProgress) / 2;
      return scoreB - scoreA;
    });
    const completedStudentNames = new Set(
      sortedByProgress.slice(0, 2).map((s) => s.name)
    );

    const lastWeekStudents = studentsData.map((s) => {
      // 완료한 학생 2명은 학습 진행률 100%로 설정
      if (completedStudentNames.has(s.name)) {
        return {
          ...s,
          learningProgress: 100,
          missionProgress: 100,
          accuracyRate: Math.max(80, s.accuracyRate - Math.floor(Math.random() * 10)),
        };
      }
      
      // 주의/미흡 학생들의 학습 진행률을 특정 값으로 설정
      if (actionNeededProgressMap[s.name]) {
        const targetProgress = actionNeededProgressMap[s.name];
        return {
          ...s,
          learningProgress: targetProgress,
          missionProgress: Math.max(0, targetProgress - Math.floor(Math.random() * 5)),
          // 정답률은 학습 진행률에 비례하도록 설정 (낮은 진행률이면 낮은 정답률)
          accuracyRate: Math.max(40, Math.min(60, targetProgress * 3 + Math.floor(Math.random() * 10))),
        };
      }
      
      // 나머지는 현재 주 대비 약간 낮은 성과로 시뮬레이션
      // 단, 주의/미흡 학생이 되지 않도록 적절한 범위 유지
      const progressReduction = Math.floor(Math.random() * 20) + 5;
      const newLearningProgress = Math.max(20, s.learningProgress - progressReduction);
      const newMissionProgress = Math.max(20, s.missionProgress - progressReduction);
      const newAccuracyRate = Math.max(50, s.accuracyRate - Math.floor(Math.random() * 15) - 3);
      
      return {
        ...s,
        learningProgress: newLearningProgress,
        missionProgress: newMissionProgress,
        accuracyRate: newAccuracyRate,
      };
    });

    // 지난 주 데이터를 성과 순으로 정렬 (완료 학생이 우수 학생에 포함되도록)
    const sortedLastWeekStudents = [...lastWeekStudents].sort((a, b) => {
      const scoreA = (a.learningProgress + a.missionProgress + a.accuracyRate) / 3;
      const scoreB = (b.learningProgress + b.missionProgress + b.accuracyRate) / 3;
      return scoreB - scoreA;
    });

    return {
      current: currentWeekStudents,
      last: sortedLastWeekStudents,
    };
  }, [studentsData]);

  // 주간 데이터 생성 (더미 데이터 - 실제로는 API에서 가져와야 함)
  const weekData: WeekData[] = useMemo(() => {
    // 이번 주 데이터
    const currentWeek: WeekData = {
      week: 0,
      totalStudents,
      completedStudents: 5, // 이번 주: 5명
      avgProgress: avgProgress,
      avgAccuracy: avgAccuracy,
    };

    // 지난 주 데이터
    const lastWeek: WeekData = {
      week: -1,
      totalStudents: totalStudents, // 학생 수는 동일
      completedStudents: 2, // 지난 주: 2명
      // 지난 주 평균 진행률: 이번 주보다 낮게 설정 (완료한 학생이 적으므로)
      avgProgress: Math.max(0, avgProgress - 15), // 약 15% 낮게
      // 지난 주 평균 정답률: 이번 주보다 낮게 설정
      avgAccuracy: Math.max(0, avgAccuracy - 10), // 약 10% 낮게
    };

    return [currentWeek, lastWeek];
  }, [totalStudents, avgProgress, avgAccuracy]);

  const currentData = weekData[0]; // 현재 주
  const previousData = weekData[1]; // 지난 주

  // 선택된 주의 데이터 (activeWeek에 따라 결정)
  const selectedData = useMemo(() => {
    if (activeWeek === 'last') return previousData;
    if (activeWeek === 'next') return currentData; // 다음 주는 임시로 현재 주 데이터 사용
    return currentData; // 이번 주
  }, [activeWeek, currentData, previousData]);

  const completionRate = useMemo(() => {
    if (!selectedData || !selectedData.totalStudents || selectedData.totalStudents === 0) return 0;
    return (selectedData.completedStudents / selectedData.totalStudents) * 100;
  }, [selectedData]);

  // 이전 주 대비 변화율 계산
  const getChangeIndicator = (current: number, previous: number) => {
    if (previous === 0) return { value: 0, isPositive: true, show: false };
    const change = current - previous;
    const percentChange = ((change / previous) * 100).toFixed(1);
    return {
      value: Math.abs(change),
      percent: Math.abs(parseFloat(percentChange)),
      isPositive: change >= 0,
      show: true,
    };
  };

  const completedChange = getChangeIndicator(
    currentData.completedStudents,
    previousData.completedStudents
  );
  const progressChange = getChangeIndicator(
    currentData.avgProgress,
    previousData.avgProgress
  );
  const accuracyChange = getChangeIndicator(
    currentData.avgAccuracy,
    previousData.avgAccuracy
  );

  const formatWeekLabel = (offset: number) => {
    if (offset === 0) return '이번 주';
    if (offset === -1) return '지난 주';
    if (offset === 1) return '다음 주';
    if (offset === -2) return '2주 전';
    return `${Math.abs(offset)}주 전`;
  };

  // activeWeek에 따른 레이블 반환
  const getActiveTabLabel = () => {
    switch (activeWeek) {
      case 'last':
        return '지난 주';
      case 'this':
        return '이번 주';
      case 'next':
        return '다음 주';
      default:
        return '이번 주';
    }
  };

  // 선택된 주의 우수 학생 계산
  const selectedWeekTopStudents = useMemo(() => {
    const weekStudents = activeWeek === 'last' ? weekStudentsData.last : weekStudentsData.current;
    
    if (weekStudents.length === 0 && topStudents.length > 0) {
      // studentsData가 없으면 기존 topStudents 사용 (이번 주만)
      return activeWeek === 'this' ? topStudents : [];
    }

    if (weekStudents.length === 0) return [];

    return [...weekStudents]
      .sort((a, b) => {
        const scoreA = (a.learningProgress + a.missionProgress + a.accuracyRate) / 3;
        const scoreB = (b.learningProgress + b.missionProgress + b.accuracyRate) / 3;
        return scoreB - scoreA;
      })
      .slice(0, 5)
      .map((s, idx) => ({
        name: s.name,
        achievement: `학습 진행률 ${s.learningProgress}%, 정답률 ${s.accuracyRate}%`,
        badge: idx === 0 ? '🏆' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '⭐',
      }));
  }, [activeWeek, weekStudentsData, topStudents]);

  // 선택된 주의 주의/미흡 학생 계산
  const selectedWeekActionNeeded = useMemo(() => {
    const weekStudents = activeWeek === 'last' ? weekStudentsData.last : weekStudentsData.current;
    
    if (weekStudents.length === 0 && actionNeeded.length > 0) {
      // studentsData가 없으면 기존 actionNeeded 사용 (이번 주만)
      return activeWeek === 'this' ? actionNeeded : [];
    }

    if (weekStudents.length === 0) return [];

    return [...weekStudents]
      .sort((a, b) => {
        const scoreA = (a.learningProgress + a.missionProgress + a.accuracyRate) / 3;
        const scoreB = (b.learningProgress + b.missionProgress + b.accuracyRate) / 3;
        return scoreA - scoreB;
      })
      .slice(0, 5)
      .filter((s) => s.learningProgress < 50 || s.accuracyRate < 60)
      .map((s) => {
        const issues = [];
        if (s.learningProgress < 50) issues.push(`학습 진행률 ${s.learningProgress}%`);
        if (s.accuracyRate < 60) issues.push(`정답률 ${s.accuracyRate}%`);
        return {
          name: s.name,
          issue: issues.join(', '),
          action: '학습 지원 필요',
        };
      });
  }, [activeWeek, weekStudentsData, actionNeeded]);

  // 탭 변경 핸들러
  const handleTabChange = (tab: WeekTab) => {
    setActiveTab(tab);
    if (tab === 'last') setCurrentWeekOffset(-1);
    else if (tab === 'this') setCurrentWeekOffset(0);
    else if (tab === 'next') setCurrentWeekOffset(1);
  };

  // 다음 주 시작일
  const nextWeekStart = getNextWeekStart();

  return (
    <div className="space-y-6">
      {/* 주간 통계 카드 */}
      <div className="bg-white rounded-lg shadow p-6" data-tour="dashboard-stats">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2 text-blue-600 text-2xl">📊</span>
            주간 학습 현황
          </h2>
        </div>

        {/* 3주 탭 */}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setActiveWeek('last')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeWeek === 'last' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            지난 주
          </button>
          <button 
            onClick={() => setActiveWeek('this')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeWeek === 'this' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            이번 주
          </button>
          <button 
            onClick={() => setActiveWeek('next')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeWeek === 'next' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            다음 주 계획
          </button>
        </div>

        {/* 다음 주 탭일 때는 계획 패널 표시 */}
        {activeWeek === 'next' ? (
          studentsList && studentsList.length > 0 ? (
            <WeeklyPlanningPanel
              weekStart={nextWeekStart}
              students={studentsList as any}
              onPlanCreated={() => {
                // 계획 생성 후 새로고침
                window.location.reload();
              }}
            />
          ) : (
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-2">다음 주 학습 계획 설정</p>
              <p className="text-sm text-gray-500">{formatWeekRange(nextWeekStart)}</p>
              <p className="text-xs text-gray-400 mt-2">학생 데이터를 불러오는 중...</p>
            </div>
          )
        ) : (
          <>
            {/* 주간 범위 표시 */}
            {propWeekLabel && propWeekRange && (
              <div className="mb-4 text-sm text-gray-500">
                {propWeekLabel} ({propWeekRange})
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                <div className="text-3xl font-bold text-blue-600">
                  {useNewData ? (propSummary?.completedStudents || 0) : (selectedData?.completedStudents || 0)}명
                </div>
                <div className="text-sm text-gray-600 mt-1">완료한 학생</div>
                <div className="text-xs text-gray-500 mt-1">
                  전체 {useNewData ? (propSummary?.totalStudents || 0) : (selectedData?.totalStudents || 0)}명 중
                </div>
                {activeWeek === 'this' && !useNewData && completedChange.show && (
                  <div className={`text-xs mt-2 flex items-center justify-center gap-1 ${
                    completedChange.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{completedChange.isPositive ? '↑' : '↓'}</span>
                    <span>
                      {completedChange.isPositive ? '+' : '-'}
                      {completedChange.value}명 ({completedChange.percent}%)
                    </span>
                    <span className="text-gray-500">vs 지난 주</span>
                  </div>
                )}
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                <div className="text-3xl font-bold text-green-600">
                  {useNewData ? (propSummary?.completionRate || 0) : completionRate.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">완료율</div>
                <div className="text-xs text-gray-500 mt-1">
                  평균 진행률 {useNewData ? (propSummary?.averageAccuracy || 0) : (selectedData?.avgProgress ? selectedData.avgProgress.toFixed(0) : 0)}%
                </div>
                {activeWeek === 'this' && !useNewData && progressChange.show && (
                  <div className={`text-xs mt-2 flex items-center justify-center gap-1 ${
                    progressChange.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{progressChange.isPositive ? '↑' : '↓'}</span>
                    <span>
                      {progressChange.isPositive ? '+' : '-'}
                      {progressChange.value.toFixed(1)}%p ({progressChange.percent}%)
                    </span>
                    <span className="text-gray-500">vs 지난 주</span>
                  </div>
                )}
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                <div className="text-3xl font-bold text-purple-600">
                  {useNewData ? (propSummary?.averageAccuracy || 0) : (selectedData?.avgAccuracy ? selectedData.avgAccuracy.toFixed(0) : 0)}%
                </div>
                <div className="text-sm text-gray-600 mt-1">평균 정답률</div>
                <div className="text-xs text-gray-500 mt-1">전체 학생 평균</div>
                {activeWeek === 'this' && !useNewData && accuracyChange.show && (
                  <div className={`text-xs mt-2 flex items-center justify-center gap-1 ${
                    accuracyChange.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{accuracyChange.isPositive ? '↑' : '↓'}</span>
                    <span>
                      {accuracyChange.isPositive ? '+' : '-'}
                      {accuracyChange.value.toFixed(1)}%p ({accuracyChange.percent}%)
                    </span>
                    <span className="text-gray-500">vs 지난 주</span>
                  </div>
                )}
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                <div className="text-3xl font-bold text-orange-600">
                  {useNewData
                    ? ((propSummary?.totalStudents || 0) - (propSummary?.completedStudents || 0))
                    : ((selectedData?.totalStudents || 0) - (selectedData?.completedStudents || 0))}명
                </div>
                <div className="text-sm text-gray-600 mt-1">진행 중</div>
                <div className="text-xs text-gray-500 mt-1">미완료 학생</div>
              </div>
            </div>
            
            {/* 상태별 분포 바 (새로운 데이터 사용 시) */}
            {useNewData && propSummary && (
              <div className="bg-white rounded-lg shadow p-4 mt-4">
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">📊 학생 현황</h3>
                  {/* 세그먼트 프로그레스 바 */}
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex">
                    {propSummary.excellentCount > 0 && (
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 ease-out cursor-pointer hover:opacity-80"
                        style={{ width: `${(propSummary.excellentCount / propSummary.totalStudents) * 100}%` }}
                        onClick={() => propSummary.excellentCount > 0 && setActiveStatus(activeStatus === 'excellent' ? null : 'excellent')}
                        title={`우수: ${propSummary.excellentCount}명`}
                      />
                    )}
                    {propSummary.normalCount > 0 && (
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-out cursor-pointer hover:opacity-80"
                        style={{ width: `${(propSummary.normalCount / propSummary.totalStudents) * 100}%` }}
                        onClick={() => propSummary.normalCount > 0 && setActiveStatus(activeStatus === 'normal' ? null : 'normal')}
                        title={`정상: ${propSummary.normalCount}명`}
                      />
                    )}
                    {propSummary.warningCount > 0 && (
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 ease-out cursor-pointer hover:opacity-80"
                        style={{ width: `${(propSummary.warningCount / propSummary.totalStudents) * 100}%` }}
                        onClick={() => propSummary.warningCount > 0 && setActiveStatus(activeStatus === 'warning' ? null : 'warning')}
                        title={`주의: ${propSummary.warningCount}명`}
                      />
                    )}
                    {propSummary.criticalCount > 0 && (
                      <div
                        className="bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300 ease-out cursor-pointer hover:opacity-80"
                        style={{ width: `${(propSummary.criticalCount / propSummary.totalStudents) * 100}%` }}
                        onClick={() => propSummary.criticalCount > 0 && setActiveStatus(activeStatus === 'critical' ? null : 'critical')}
                        title={`미흡: ${propSummary.criticalCount}명`}
                      />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">{propSummary.totalStudents}명</div>
                </div>

                {/* 상태 뱃지 */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { status: 'excellent' as const, icon: '🏆', label: '우수', count: propSummary.excellentCount, color: 'green' },
                    { status: 'normal' as const, icon: '✅', label: '정상', count: propSummary.normalCount, color: 'blue' },
                    { status: 'warning' as const, icon: '⚠️', label: '주의', count: propSummary.warningCount, color: 'yellow' },
                    { status: 'critical' as const, icon: '🔴', label: '미흡', count: propSummary.criticalCount, color: 'red' },
                  ].map(({ status, icon, label, count, color }) => {
                    const isActive = activeStatus === status;
                    const isDisabled = count === 0;
                    const statusConfig = {
                      excellent: { textColor: 'text-green-700', bgLight: 'bg-green-50', borderColor: 'border-green-500' },
                      normal: { textColor: 'text-blue-700', bgLight: 'bg-blue-50', borderColor: 'border-blue-500' },
                      warning: { textColor: 'text-yellow-700', bgLight: 'bg-yellow-50', borderColor: 'border-yellow-500' },
                      critical: { textColor: 'text-red-700', bgLight: 'bg-red-50', borderColor: 'border-red-500' },
                    };
                    const config = statusConfig[status];

                    return (
                      <button
                        key={status}
                        onClick={() => !isDisabled && setActiveStatus(isActive ? null : status)}
                        disabled={isDisabled}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                          transition-all duration-150 ease-in-out
                          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                          ${isActive ? `${config.bgLight} ${config.textColor} ring-2 ${config.borderColor} ring-offset-2` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                        `}
                        aria-label={`${label} 학생 ${count}명, 클릭하여 목록 보기`}
                      >
                        <span className="text-base">{icon}</span>
                        <span>{label}</span>
                        <span className={`font-bold ${isActive ? config.textColor : 'text-gray-600'}`}>
                          {count}명
                        </span>
                        {isActive && <span className="text-xs">▲</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 학생 상태 상세 패널 (다음 주 탭에서는 표시하지 않음) */}
      {activeWeek !== 'next' && activeStatus && studentsList && studentsList.length > 0 && (
        <StudentStatusPanel
          status={activeStatus as 'excellent' | 'normal' | 'warning' | 'critical'}
          students={studentsList as StudentWithStats[]}
          onClose={() => setActiveStatus(null)}
          onStudentClick={(studentId) => {
            if (onStudentClick) {
              onStudentClick(studentId);
            }
          }}
        />
      )}
    </div>
  );
};

// 상태 뱃지 컴포넌트
const StatusBadge: React.FC<{
  icon: string;
  label: string;
  count: number;
  color: string;
  highlight?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}> = ({ icon, label, count, color, highlight, onClick, isActive }) => {
  const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-700 border-green-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    red: 'bg-red-100 text-red-700 border-red-200',
  };

  const ringColorMap: Record<string, string> = {
    green: 'ring-green-300',
    blue: 'ring-blue-300',
    yellow: 'ring-yellow-300',
    red: 'ring-red-300',
  };

  const activeColorMap: Record<string, string> = {
    green: 'bg-green-200 text-green-800 border-green-300',
    blue: 'bg-blue-200 text-blue-800 border-blue-300',
    yellow: 'bg-yellow-200 text-yellow-800 border-yellow-300',
    red: 'bg-red-200 text-red-800 border-red-300',
  };

  return (
    <div 
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg border
        ${isActive ? activeColorMap[color] : colorMap[color]}
        ${highlight ? `ring-2 ring-offset-1 ${ringColorMap[color]}` : ''}
        ${onClick && count > 0 ? 'cursor-pointer hover:shadow-md transition-all' : ''}
        ${count === 0 ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onClick={onClick && count > 0 ? onClick : undefined}
      role={onClick && count > 0 ? 'button' : undefined}
      tabIndex={onClick && count > 0 ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && count > 0 && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
      <span className="font-bold">{count}명</span>
      {isActive && <span className="text-xs">▲</span>}
    </div>
  );
};
