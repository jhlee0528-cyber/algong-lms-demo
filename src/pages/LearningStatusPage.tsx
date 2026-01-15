/**
 * 학습현황 페이지
 * 스마트 파닉스 단원 선택 및 학습결과 표시
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useStudents } from '../hooks/useStudents';
import StudentListTable, { type StudentWithStats } from '../components/progress/StudentListTable';
import StudentDetailModal from '../components/progress/StudentDetailModal';
import { DashboardStats } from '../components/dashboard';
import OnboardingTour from '../components/common/OnboardingTour';
import ViewModeTabs from '../components/dashboard/ViewModeTabs';
import TaskTypeView from '../components/dashboard/TaskTypeView';
import PeriodView from '../components/dashboard/PeriodView';
import type { ViewMode } from '../types/learningView';
import { useWeeklyData } from '../hooks/useWeeklyData';

const LearningStatusPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('unit');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailStudentId, setDetailStudentId] = useState<number | null>(null);
  const [showTour, setShowTour] = useState(false);

  // TODO: teacherId는 실제로는 인증에서 가져와야 함
  const teacherId = 1;
  const { data: students } = useStudents({ teacher_id: teacherId });

  // 20명 중 5명을 랜덤으로 선택하여 완료율 100%로 설정 (useMemo 밖으로 이동)
  const completedStudentIndices = useMemo(() => {
    const indices = Array.from({ length: 20 }, (_, i) => i);
    // 배열을 섞고 앞의 5개를 선택
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices.slice(0, 5);
  }, []);

  // 더미 학생 데이터 생성 (20명)
  const dummyStudents: StudentWithStats[] = useMemo(() => {
    const names = [
      '김민수', '이지은', '박준호', '최서연', '정현우',
      '강소영', '윤도현', '임수진', '한지훈', '오나은',
      '신동욱', '배미래', '조성민', '홍예린', '송태현',
      '유하늘', '문지원', '양준혁', '백서아', '남도윤',
    ];
    const nicknames = [
      '민수', '지은', '준호', '서연', '현우',
      '소영', '도현', '수진', '지훈', '나은',
      '동욱', '미래', '성민', '예린', '태현',
      '하늘', '지원', '준혁', '서아', '도윤',
    ];
    const emails = names.map((name, idx) => `student${idx + 1}@argong.com`);

    return Array.from({ length: 20 }, (_, index) => {
      // 5명의 완료 학생인지 확인
      const isCompleted = completedStudentIndices.includes(index);

      // 학습 통계 (더미 데이터)
      const learningProgress = isCompleted 
        ? 100 // 완료 학생은 100%
        : Math.floor(Math.random() * 100); // 0-100%
      const missionProgress = isCompleted 
        ? 100 // 완료 학생은 100%
        : Math.floor(Math.random() * 100); // 0-100%
      const accuracyRate = isCompleted
        ? Math.floor(Math.random() * 20) + 80 // 완료 학생은 80-100%
        : Math.floor(Math.random() * 40) + 60; // 60-100%
      const studyTime = isCompleted
        ? Math.floor(Math.random() * 200) + 200 // 완료 학생은 200-400분
        : Math.floor(Math.random() * 300) + 30; // 30-330분

      // ArLex 레벨 (1-36) - 36레벨 중 임의로 배정
      // SA(1-6), SB(7-12), MA(13-18), MB(19-24), AA(25-30), AB(31-36)
      const arlexLevel = Math.floor(Math.random() * 36) + 1;

      // 보석 계산: 학습 진행률과 미션 진행률에 비례
      // 빨강 보석: 학습 진행률 기반
      const redGems = Math.floor(learningProgress * 0.8) + Math.floor(Math.random() * 20);
      // 파랑 보석: 미션 진행률 기반
      const blueGems = Math.floor(missionProgress * 0.75) + Math.floor(Math.random() * 15);
      // 초록 보석: 정답률 기반
      const greenGems = Math.floor(accuracyRate * 0.6) + Math.floor(Math.random() * 12);
      // 노랑 보석: 학습 진행률과 미션 진행률 평균 기반
      const yellowGems = Math.floor((learningProgress + missionProgress) / 2 * 0.4) + Math.floor(Math.random() * 10);

      // 코인 계산: 학습 시간, 정답률, 학습 진행률 종합
      const coins = Math.floor(studyTime * 1.2) + Math.floor(accuracyRate * 3) + Math.floor(learningProgress * 2) + Math.floor(Math.random() * 100);

      return {
        user_id: index + 1,
        student_id: index + 1,
        teacher_id: teacherId,
        email: emails[index],
        name: names[index],
        nickname: nicknames[index],
        role: 'student' as const,
        grade: Math.floor(Math.random() * 3) + 1, // 1-3학년
        parent_name: null,
        parent_phone: null,
        status: 'active' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // 학습 통계
        learningProgress,
        missionProgress,
        accuracyRate,
        studyTime,
        // ArLex 레벨
        arlex_level: arlexLevel,
        // 보석 정보
        gems: {
          red: redGems,
          blue: blueGems,
          green: greenGems,
          yellow: yellowGems,
        },
          // 코인 정보
          coins,
          // 주간 학습 계획 관련 (더미 데이터)
          weeklyGoal: Math.floor(Math.random() * 3) + 2, // 2-4 Units
          // weeklyCompletionRate와 performanceStatus는 표시 시점에 달성률 기반으로 계산됨
          // 더미 데이터에서는 제거 (StudentListTable에서 실시간 계산)
        };
      });
    }, [teacherId, completedStudentIndices]);

  // 실제 학생 데이터와 더미 데이터 병합 (기본 데이터)
  const baseStudentsWithStats: StudentWithStats[] = useMemo(() => {
    const studentsArray = students || [];
    if (studentsArray.length === 0) {
      return dummyStudents;
    }
    return studentsArray.map((student, index) => {
      const dummy = dummyStudents[index] || dummyStudents[0];
      return {
        ...student,
        nickname: dummy.nickname || student.name,
        learningProgress: dummy.learningProgress,
        missionProgress: dummy.missionProgress,
        accuracyRate: dummy.accuracyRate,
        studyTime: dummy.studyTime,
        arlex_level: dummy.arlex_level || student.arlex_level || null,
        gems: dummy.gems,
        coins: dummy.coins,
      };
    });
  }, [students, dummyStudents]);

  // 주간 데이터 훅 사용
  const {
    activeWeek,
    setActiveWeek,
    currentWeekData,
    summary,
    studentsWithWeeklyData,
    studentsByStatus
  } = useWeeklyData(baseStudentsWithStats);

  // 주간 범위 포맷팅
  const formatWeekRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.getMonth() + 1}/${startDate.getDate()} ~ ${endDate.getMonth() + 1}/${endDate.getDate()}`;
  };

  // studentsWithStats는 이제 주간 데이터가 반영된 버전 사용
  const studentsWithStats = studentsWithWeeklyData;

  // 선택된 학생의 상세 정보 가져오기
  const selectedStudentData = useMemo(() => {
    if (!detailStudentId) return null;
    return studentsWithStats.find((s) => s.student_id === detailStudentId);
  }, [detailStudentId, studentsWithStats]);

  const handleShowDetail = (studentId: number) => {
    setDetailStudentId(studentId);
    setShowDetailModal(true);
  };

  // 대시보드 통계는 useWeeklyData의 summary를 사용 (주간 데이터 기반)

  return (
    <div className="w-full space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">📊 학습 현황</h2>
        <ViewModeTabs 
          activeView={viewMode} 
          onViewChange={setViewMode} 
        />
      </div>

      {/* 대시보드 통계 - 동기화된 주간 데이터 사용 */}
      <DashboardStats
        activeWeek={activeWeek}
        onWeekChange={setActiveWeek}
        summary={summary}
        weekLabel={currentWeekData.weekLabel}
        weekRange={formatWeekRange(currentWeekData.weekStart, currentWeekData.weekEnd)}
        studentsList={studentsWithStats}
        onStudentClick={handleShowDetail}
      />

      {/* 뷰 모드에 따른 컨텐츠 렌더링 */}
      {viewMode === 'unit' && (
        <div className="bg-white rounded-lg shadow p-6" data-tour="student-table">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            학생 목록 {currentWeekData.weekLabel && `(${currentWeekData.weekLabel} 기준)`}
          </h3>
          <StudentListTable
            students={studentsWithStats}
            selectedStudent={selectedStudent}
            onStudentSelect={setSelectedStudent}
            onShowDetail={handleShowDetail}
          />
        </div>
      )}

      {viewMode === 'taskType' && (
        <TaskTypeView students={studentsWithStats} />
      )}

      {viewMode === 'period' && (
        <PeriodView students={studentsWithStats} />
      )}


      {/* 학습 상세 모달 */}
      {showDetailModal && detailStudentId && (
        <StudentDetailModal
          studentId={detailStudentId}
          studentData={selectedStudentData || undefined}
          onClose={() => {
            setShowDetailModal(false);
            setDetailStudentId(null);
          }}
        />
      )}

      {/* 온보딩 투어 */}
      {showTour && (
        <OnboardingTour 
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
        />
      )}
    </div>
  );
};

export default LearningStatusPage;
