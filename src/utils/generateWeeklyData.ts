import type { StudentWithStats } from '../components/progress/StudentListTable';
import type { WeeklyStudentData, WeeklySummary, WeekData } from '../types/weeklyData';

/**
 * 학생 상태 분류 기준
 * - 우수: 달성률(학습 진행률+미션 진행률 평균) 100%, 정답률 90% 이상
 * - 정상: 달성률 70-99%, 정답률 70-89%
 * - 주의: 달성률 50-69%, 정답률 50-69%
 * - 미흡: 달성률 50% 미만 또는 정답률 50% 미만
 */
const getStudentStatus = (
  learningProgress: number,
  missionProgress: number,
  accuracy: number
): WeeklyStudentData['status'] => {
  // 달성률 = (학습 진행률 + 미션 진행률) / 2
  const achievementRate = (learningProgress + missionProgress) / 2;
  
  // 우수: 달성률 100%, 정답률 90% 이상
  if (achievementRate >= 100 && accuracy >= 90) {
    return 'excellent';
  }
  
  // 정상: 달성률 70-99%, 정답률 70-89%
  if (achievementRate >= 70 && achievementRate < 100 && accuracy >= 70 && accuracy < 90) {
    return 'normal';
  }
  
  // 주의: 달성률 50-69%, 정답률 50-69%
  if (achievementRate >= 50 && achievementRate < 70 && accuracy >= 50 && accuracy < 70) {
    return 'warning';
  }
  
  // 미흡: 달성률 50% 미만 또는 정답률 50% 미만
  if (achievementRate < 50 || accuracy < 50) {
    return 'critical';
  }
  
  // 위 조건에 해당하지 않는 경우 (달성률은 높지만 정답률이 낮거나 그 반대)
  // 달성률이 70% 이상이면 정상, 그 미만이면 주의
  if (achievementRate >= 70) {
    return 'normal';
  }
  return 'warning';
};

// 주간별 학생 데이터 생성
export const generateWeeklyStudentData = (
  students: StudentWithStats[],
  weekType: 'last' | 'this' | 'next'
): Map<number, WeeklyStudentData> => {
  const dataMap = new Map<number, WeeklyStudentData>();

  students.forEach((student, index) => {
    let learningProgress: number;
    let missionProgress: number;
    let accuracyRate: number;
    let weeklyCompleted: boolean;

    // 주차별로 다른 분포 적용
    if (weekType === 'last') {
      // 지난 주: 대부분 완료 (18명 완료, 2명 미완료)
      if (index < 18) {
        // 완료한 학생들 (18명) - 우수 또는 정상
        // 우수: 5-6명 (달성률 100%, 정답률 90% 이상)
        if (index < 6) {
          learningProgress = 100;
          missionProgress = 100;
          accuracyRate = 90 + Math.floor(Math.random() * 11); // 90-100%
          weeklyCompleted = true;
        } else {
          // 정상: 12-13명 (달성률 70-99%, 정답률 70-89%)
          // 달성률 = (학습 진행률 + 미션 진행률) / 2가 70-99%가 되도록 생성
          // 예: 학습 진행률 80%, 미션 진행률 80% → 달성률 80%
          const targetAchievement = 70 + Math.floor(Math.random() * 30); // 70-99%
          learningProgress = targetAchievement + Math.floor(Math.random() * 20) - 10; // ±10% 변동
          missionProgress = targetAchievement * 2 - learningProgress; // 달성률이 목표값이 되도록 조정
          // 범위 제한
          learningProgress = Math.max(70, Math.min(100, learningProgress));
          missionProgress = Math.max(70, Math.min(100, missionProgress));
          accuracyRate = 70 + Math.floor(Math.random() * 20); // 70-89%
          weeklyCompleted = true;
        }
      } else {
        // 미완료 학생들 (2명) - 주의 또는 미흡
        // 주의: 1명 (달성률 50-69%, 정답률 50-69%)
        if (index === 18) {
          // 달성률 = (학습 진행률 + 미션 진행률) / 2가 50-69%가 되도록 생성
          const targetAchievement = 50 + Math.floor(Math.random() * 20); // 50-69%
          learningProgress = targetAchievement + Math.floor(Math.random() * 20) - 10; // ±10% 변동
          missionProgress = targetAchievement * 2 - learningProgress; // 달성률이 목표값이 되도록 조정
          // 범위 제한
          learningProgress = Math.max(50, Math.min(69, learningProgress));
          missionProgress = Math.max(50, Math.min(69, missionProgress));
          accuracyRate = 50 + Math.floor(Math.random() * 20); // 50-69%
        } else {
          // 미흡: 1명 (달성률 50% 미만 또는 정답률 50% 미만)
          // 달성률 = (학습 진행률 + 미션 진행률) / 2가 50% 미만이 되도록 생성
          const targetAchievement = Math.floor(Math.random() * 50); // 0-49%
          learningProgress = targetAchievement + Math.floor(Math.random() * 20) - 10; // ±10% 변동
          missionProgress = targetAchievement * 2 - learningProgress; // 달성률이 목표값이 되도록 조정
          // 범위 제한
          learningProgress = Math.max(0, Math.min(49, learningProgress));
          missionProgress = Math.max(0, Math.min(49, missionProgress));
          accuracyRate = Math.floor(Math.random() * 50); // 0-49%
        }
        weeklyCompleted = false;
      }
      
    } else if (weekType === 'this') {
      // 이번 주: 진행 중 (11명 완료, 9명 진행 중)
      if (index < 11) {
        // 이미 완료한 학생들 (11명)
        // 우수: 5-6명
        if (index < 6) {
          learningProgress = 100;
          missionProgress = 100;
          accuracyRate = 90 + Math.floor(Math.random() * 11); // 90-100%
          weeklyCompleted = true;
        } else {
          // 정상: 5-6명 (달성률 70-99%, 정답률 70-89%)
          // 달성률 = (학습 진행률 + 미션 진행률) / 2가 70-99%가 되도록 생성
          const targetAchievement = 70 + Math.floor(Math.random() * 30); // 70-99%
          learningProgress = targetAchievement + Math.floor(Math.random() * 20) - 10; // ±10% 변동
          missionProgress = targetAchievement * 2 - learningProgress; // 달성률이 목표값이 되도록 조정
          // 범위 제한
          learningProgress = Math.max(70, Math.min(100, learningProgress));
          missionProgress = Math.max(70, Math.min(100, missionProgress));
          accuracyRate = 70 + Math.floor(Math.random() * 20); // 70-89%
          weeklyCompleted = true;
        }
      } else {
        // 진행 중인 학생들 (9명)
        // 정상: 5-6명 (달성률 70-99%, 정답률 70-89%)
        if (index < 17) {
          // 달성률 = (학습 진행률 + 미션 진행률) / 2가 70-99%가 되도록 생성
          const targetAchievement = 70 + Math.floor(Math.random() * 30); // 70-99%
          learningProgress = targetAchievement + Math.floor(Math.random() * 20) - 10; // ±10% 변동
          missionProgress = targetAchievement * 2 - learningProgress; // 달성률이 목표값이 되도록 조정
          // 범위 제한
          learningProgress = Math.max(70, Math.min(100, learningProgress));
          missionProgress = Math.max(70, Math.min(100, missionProgress));
          accuracyRate = 70 + Math.floor(Math.random() * 20); // 70-89%
        } 
        // 주의: 2명 (달성률 50-69%, 정답률 50-69%)
        else if (index < 19) {
          // 달성률 = (학습 진행률 + 미션 진행률) / 2가 50-69%가 되도록 생성
          const targetAchievement = 50 + Math.floor(Math.random() * 20); // 50-69%
          learningProgress = targetAchievement + Math.floor(Math.random() * 20) - 10; // ±10% 변동
          missionProgress = targetAchievement * 2 - learningProgress; // 달성률이 목표값이 되도록 조정
          // 범위 제한
          learningProgress = Math.max(50, Math.min(69, learningProgress));
          missionProgress = Math.max(50, Math.min(69, missionProgress));
          accuracyRate = 50 + Math.floor(Math.random() * 20); // 50-69%
        } 
        // 미흡: 1명 (달성률 50% 미만 또는 정답률 50% 미만)
        else {
          // 달성률 = (학습 진행률 + 미션 진행률) / 2가 50% 미만이 되도록 생성
          const targetAchievement = Math.floor(Math.random() * 50); // 0-49%
          learningProgress = targetAchievement + Math.floor(Math.random() * 20) - 10; // ±10% 변동
          missionProgress = targetAchievement * 2 - learningProgress; // 달성률이 목표값이 되도록 조정
          // 범위 제한
          learningProgress = Math.max(0, Math.min(49, learningProgress));
          missionProgress = Math.max(0, Math.min(49, missionProgress));
          accuracyRate = Math.floor(Math.random() * 50); // 0-49%
        }
        weeklyCompleted = false;
      }
      
    } else {
      // 다음 주: 계획만 있음 (모두 0%)
      learningProgress = 0;
      missionProgress = 0;
      accuracyRate = 0;
      weeklyCompleted = false;
    }

    // 상태 결정 (이번 주와 지난 주는 실제 진행률 기반, 다음 주는 normal)
    let status: WeeklyStudentData['status'];
    if (weekType === 'next') {
      status = 'normal'; // 다음 주는 아직 시작 전
    } else {
      // 달성률(학습 진행률+미션 진행률 평균)과 정답률 기반으로 상태 결정
      status = getStudentStatus(learningProgress, missionProgress, accuracyRate);
    }

    // 주간 진행률 = (학습 진행률 + 미션 진행률) / 2
    const weeklyProgress = Math.round((learningProgress + missionProgress) / 2);

    // 과제 유형별 진행률 (학습 진행률과 미션 진행률을 기반으로 약간의 변동)
    const lectureProgress = Math.min(100, Math.max(0, learningProgress + Math.floor(Math.random() * 10) - 5));
    const activityProgress = Math.min(100, Math.max(0, missionProgress + Math.floor(Math.random() * 10) - 5));
    const aiChatProgress = Math.min(100, Math.max(0, weeklyProgress - Math.floor(Math.random() * 15)));
    const libraryProgress = Math.min(100, Math.max(0, weeklyProgress + Math.floor(Math.random() * 10) - 5));

    const totalTasks = 12; // 주간 총 과제 수
    const completedTasks = Math.floor(totalTasks * (weeklyProgress / 100));

    dataMap.set(student.student_id, {
      studentId: student.student_id,
      learningProgress,
      missionProgress,
      weeklyProgress,
      weeklyCompleted,
      weeklyTasksCompleted: completedTasks,
      weeklyTasksTotal: totalTasks,
      lectureProgress: Math.max(0, lectureProgress),
      activityProgress: Math.max(0, activityProgress),
      aiChatProgress: Math.max(0, aiChatProgress),
      libraryProgress: Math.max(0, libraryProgress),
      accuracyRate,
      studyTimeMinutes: Math.floor(weeklyProgress * 2.5), // 진행률에 비례
      status
    });
  });

  return dataMap;
};

// 요약 통계 계산 (학생 데이터에서 파생)
export const calculateWeeklySummary = (
  studentData: Map<number, WeeklyStudentData>
): WeeklySummary => {
  const dataArray = Array.from(studentData.values());
  const totalStudents = dataArray.length;
  
  if (totalStudents === 0) {
    return {
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
  }
  
  const completedStudents = dataArray.filter(d => d.weeklyCompleted).length;
  const completionRate = Math.round((completedStudents / totalStudents) * 100);
  
  const totalAccuracy = dataArray.reduce((sum, d) => sum + d.accuracyRate, 0);
  const averageAccuracy = Math.round(totalAccuracy / totalStudents);
  
  const totalStudyTime = dataArray.reduce((sum, d) => sum + d.studyTimeMinutes, 0);
  const averageStudyTime = Math.round(totalStudyTime / totalStudents);

  // 상태별 집계 (실제 학생 데이터에서 계산)
  const excellentStudents = dataArray.filter(d => d.status === 'excellent').map(d => d.studentId);
  const normalStudents = dataArray.filter(d => d.status === 'normal');
  const warningStudents = dataArray.filter(d => d.status === 'warning').map(d => d.studentId);
  const criticalStudents = dataArray.filter(d => d.status === 'critical').map(d => d.studentId);

  return {
    totalStudents,
    completedStudents,
    completionRate,
    averageAccuracy,
    averageStudyTime,
    excellentCount: excellentStudents.length,
    normalCount: normalStudents.length,
    warningCount: warningStudents.length,
    criticalCount: criticalStudents.length,
    excellentStudents,
    warningStudents,
    criticalStudents
  };
};

// 전체 주간 데이터 생성
export const generateAllWeekData = (
  students: StudentWithStats[]
): { lastWeek: WeekData; thisWeek: WeekData; nextWeek: WeekData } => {
  const today = new Date();
  
  // 날짜 계산
  const getWeekRange = (offset: number) => {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() + 1 + (offset * 7)); // 월요일
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // 일요일
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  };

  const lastWeekRange = getWeekRange(-1);
  const thisWeekRange = getWeekRange(0);
  const nextWeekRange = getWeekRange(1);

  // 각 주차별 데이터 생성
  const lastWeekData = generateWeeklyStudentData(students, 'last');
  const thisWeekData = generateWeeklyStudentData(students, 'this');
  const nextWeekData = generateWeeklyStudentData(students, 'next');

  return {
    lastWeek: {
      weekLabel: '지난 주',
      weekStart: lastWeekRange.start,
      weekEnd: lastWeekRange.end,
      studentData: lastWeekData,
      summary: calculateWeeklySummary(lastWeekData)
    },
    thisWeek: {
      weekLabel: '이번 주',
      weekStart: thisWeekRange.start,
      weekEnd: thisWeekRange.end,
      studentData: thisWeekData,
      summary: calculateWeeklySummary(thisWeekData)
    },
    nextWeek: {
      weekLabel: '다음 주 계획',
      weekStart: nextWeekRange.start,
      weekEnd: nextWeekRange.end,
      studentData: nextWeekData,
      summary: calculateWeeklySummary(nextWeekData)
    }
  };
};
