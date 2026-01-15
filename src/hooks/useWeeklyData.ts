import { useState, useMemo } from 'react';
import type { StudentWithStats } from '../components/progress/StudentListTable';
import type { WeekData } from '../types/weeklyData';
import { generateAllWeekData } from '../utils/generateWeeklyData';

export type WeekTab = 'last' | 'this' | 'next';

export const useWeeklyData = (students: StudentWithStats[]) => {
  const [activeWeek, setActiveWeek] = useState<WeekTab>('this');

  // 전체 주간 데이터 생성 (students 변경 시에만 재생성)
  const allWeekData = useMemo(() => {
    if (!students || students.length === 0) {
      // 빈 데이터 반환
      const emptyMap = new Map();
      const emptySummary = {
        totalStudents: 0,
        completedStudents: 0,
        completionRate: 0,
        averageAccuracy: 0,
        averageStudyTime: 0,
        excellentCount: 0,
        normalCount: 0,
        warningCount: 0,
        criticalCount: 0,
        excellentStudents: [],
        warningStudents: [],
        criticalStudents: []
      };
      const today = new Date();
      const getWeekRange = (offset: number) => {
        const start = new Date(today);
        start.setDate(today.getDate() - today.getDay() + 1 + (offset * 7));
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return {
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0]
        };
      };
      return {
        lastWeek: {
          weekLabel: '지난 주',
          weekStart: getWeekRange(-1).start,
          weekEnd: getWeekRange(-1).end,
          studentData: emptyMap,
          summary: emptySummary
        },
        thisWeek: {
          weekLabel: '이번 주',
          weekStart: getWeekRange(0).start,
          weekEnd: getWeekRange(0).end,
          studentData: emptyMap,
          summary: emptySummary
        },
        nextWeek: {
          weekLabel: '다음 주 계획',
          weekStart: getWeekRange(1).start,
          weekEnd: getWeekRange(1).end,
          studentData: emptyMap,
          summary: emptySummary
        }
      };
    }
    return generateAllWeekData(students);
  }, [students]);

  // 현재 선택된 주의 데이터
  const currentWeekData: WeekData = useMemo(() => {
    switch (activeWeek) {
      case 'last': return allWeekData.lastWeek;
      case 'this': return allWeekData.thisWeek;
      case 'next': return allWeekData.nextWeek;
    }
  }, [activeWeek, allWeekData]);

  // 학생 목록에 주간 데이터 병합
  const studentsWithWeeklyData = useMemo(() => {
    return students.map(student => {
      const weeklyData = currentWeekData.studentData.get(student.student_id);
      return {
        ...student,
        // 주간 데이터로 덮어쓰기
        learningProgress: weeklyData?.learningProgress ?? student.learningProgress,
        missionProgress: weeklyData?.missionProgress ?? student.missionProgress,
        accuracyRate: weeklyData?.accuracyRate ?? student.accuracyRate,
        studyTime: weeklyData?.studyTimeMinutes ?? student.studyTime,
        weeklyCompleted: weeklyData?.weeklyCompleted ?? false,
        weeklyStatus: weeklyData?.status ?? 'normal',
        // 과제유형별 진행률 추가
        lectureProgress: weeklyData?.lectureProgress ?? 0,
        activityProgress: weeklyData?.activityProgress ?? 0,
        aiChatProgress: weeklyData?.aiChatProgress ?? 0,
        libraryProgress: weeklyData?.libraryProgress ?? 0,
      };
    });
  }, [students, currentWeekData]);

  // 상태별 학생 필터링
  const studentsByStatus = useMemo(() => {
    const excellent = studentsWithWeeklyData.filter(s => s.weeklyStatus === 'excellent');
    const normal = studentsWithWeeklyData.filter(s => s.weeklyStatus === 'normal');
    const warning = studentsWithWeeklyData.filter(s => s.weeklyStatus === 'warning');
    const critical = studentsWithWeeklyData.filter(s => s.weeklyStatus === 'critical');
    
    return { excellent, normal, warning, critical };
  }, [studentsWithWeeklyData]);

  return {
    activeWeek,
    setActiveWeek,
    currentWeekData,
    summary: currentWeekData.summary,
    studentsWithWeeklyData,
    studentsByStatus,
    allWeekData
  };
};
