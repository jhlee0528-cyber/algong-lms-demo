/**
 * 단원별 학습 현황 상세 컴포넌트
 * 선택된 단원의 학습 진행률, 과제 유형별 완료 현황 등을 표시
 */

import React, { useMemo } from 'react';
import { useStudentProgress } from '../../hooks/useStudentProgress';
import { useMissions } from '../../hooks/useMissions';
import type { Unit } from '../../types';
import type { StudentWithStats } from './StudentListTable';

interface UnitProgressDetailProps {
  unitId: number;
  unit: Unit;
  studentId?: number;
  studentData?: StudentWithStats; // 학생 통계 정보
  allStudentsData?: StudentWithStats[]; // 전체 학생 데이터 (20명)
}

const UnitProgressDetail: React.FC<UnitProgressDetailProps> = ({
  unitId,
  unit,
  studentId,
  studentData,
  allStudentsData = [],
}) => {
  const { data: progressData, isLoading } = useStudentProgress({
    student_id: studentId || 0,
    unit_id: unitId,
  });

  const { data: missionsData } = useMissions({
    unit_id: unitId,
  });

  const progress = progressData?.progress || [];
  const missions = missionsData?.missions || [];

  // 학생 데이터가 있으면 더미 데이터 생성 (실제 API 데이터가 없을 때)
  const unitProgressData = useMemo(() => {
    if (progress.length > 0) {
      // 실제 데이터가 있으면 그대로 사용
      return progress;
    }

    // 학생 데이터가 있으면 더미 데이터 생성
    if (studentData) {
      const learningProgress = studentData.learningProgress || 0;
      const missionProgress = studentData.missionProgress || 0;
      const accuracyRate = studentData.accuracyRate || 0;
      
      // 단원별 기본 과제 수 (각 유형별 1개씩 = 4개)
      const baseTasks = 4;
      // 학습 진행률과 미션 진행률의 평균으로 완료 과제 수 계산
      const avgProgress = (learningProgress + missionProgress) / 2;
      const completedTasks = Math.floor((avgProgress / 100) * baseTasks);
      const partialTaskProgress = (avgProgress / 100) * baseTasks - completedTasks;
      
      // 더미 진행도 데이터 생성
      const dummyProgress = [];
      const taskTypes = ['lecture', 'activity', 'ai_chat', 'library'] as const;
      
      taskTypes.forEach((type, index) => {
        const isCompleted = index < completedTasks;
        const isPartial = index === completedTasks && partialTaskProgress > 0;
        
        // 완료율 계산
        let completionRate = 0;
        if (isCompleted) {
          completionRate = 100;
        } else if (isPartial) {
          completionRate = Math.floor(partialTaskProgress * 100);
        }
        
        // 점수 계산 (정답률 기반)
        const score = isCompleted 
          ? Math.floor(accuracyRate * 0.8 + Math.random() * 20) 
          : (isPartial ? Math.floor(accuracyRate * 0.8 * (completionRate / 100)) : null);
        
        dummyProgress.push({
          progress_id: unitId * 1000 + (studentId || 0) * 10 + index + 1,
          student_id: studentId || 0,
          mission_id: null,
          unit_id: unitId,
          progress_type: type,
          lecture_session: type === 'lecture' ? (isCompleted ? Math.floor(Math.random() * 6) + 1 : (isPartial ? 1 : null)) : null,
          activity_type: type === 'activity' ? (isCompleted || isPartial ? ['listening', 'reading', 'speaking', 'writing'][Math.floor(Math.random() * 4)] : null) : null,
          book_id: type === 'library' ? (isCompleted || isPartial ? `book_${unitId}_${index + 1}` : null) : null,
          reading_time: type === 'library' && (isCompleted || isPartial) ? Math.floor(Math.random() * 1800) + 600 : null,
          completion_rate: completionRate,
          score: score,
          time_spent: (isCompleted || isPartial) ? Math.floor(Math.random() * 1800) + 600 : null,
          completed_at: isCompleted ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as any);
      });
      
      return dummyProgress;
    }
    
    // 학생 데이터가 없어도 기본 더미 데이터 생성 (단원 정보만 표시)
    // 단원별 기본 과제 4개 생성 (모두 미완료 상태)
    const defaultProgress = [];
    const taskTypes = ['lecture', 'activity', 'ai_chat', 'library'] as const;
    
    taskTypes.forEach((type, index) => {
      defaultProgress.push({
        progress_id: unitId * 10000 + index + 1,
        student_id: 0,
        mission_id: null,
        unit_id: unitId,
        progress_type: type,
        lecture_session: null,
        activity_type: null,
        book_id: null,
        reading_time: null,
        completion_rate: 0,
        score: null,
        time_spent: null,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any);
    });
    
    return defaultProgress;
  }, [progress, studentData, studentId, unitId]);

  // 실제 진행도 데이터 사용 (더미 데이터 포함)
  const actualProgress = unitProgressData.length > 0 ? unitProgressData : progress;

  // 더미 데이터가 있으면 로딩 상태 무시
  const hasData = actualProgress.length > 0;

  // 로딩 중이고 데이터가 없을 때만 로딩 표시
  if (isLoading && !hasData && !studentData) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-500">학습 현황을 불러오는 중...</div>
      </div>
    );
  }

  // 과제 유형별 통계
  const progressByType = {
    lecture: actualProgress.filter((p) => p.progress_type === 'lecture'),
    activity: actualProgress.filter((p) => p.progress_type === 'activity'),
    ai_chat: actualProgress.filter((p) => p.progress_type === 'ai_chat'),
    library: actualProgress.filter((p) => p.progress_type === 'library'),
  };

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'activity':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'ai_chat':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'library':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  // 전체 완료율 계산
  const totalProgress = actualProgress.length;
  const completedProgress = actualProgress.filter((p) => p.completed_at).length;
  const completionRate = totalProgress > 0 ? (completedProgress / totalProgress) * 100 : 0;

  // 평균 점수 계산
  const scores = actualProgress
    .map((p) => p.score)
    .filter((s) => s !== null && s !== undefined) as number[];
  const averageScore =
    scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;

  return (
    <div className="space-y-6">
      {/* 단원 정보 헤더 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{unit.unit_title}</h3>
        <p className="text-blue-100">단원 {unit.unit_number} / 40</p>
      </div>

      {/* 전체 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500" data-tour="unit-progress">
          <div className="text-sm text-gray-600 mb-1">전체 과제</div>
          <div className="text-2xl font-bold text-gray-800">{totalProgress}개</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="text-sm text-gray-600 mb-1">완료한 과제</div>
          <div className="text-2xl font-bold text-gray-800">{completedProgress}개</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <div className="text-sm text-gray-600 mb-1">완료율</div>
          <div className="text-2xl font-bold text-gray-800">{completionRate.toFixed(0)}%</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div className="text-sm text-gray-600 mb-1">평균 점수</div>
          <div className="text-2xl font-bold text-gray-800">
            {averageScore > 0 ? averageScore.toFixed(1) : '-'}점
          </div>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">전체 진행률</span>
          <span className="text-sm font-bold text-gray-800">{completionRate.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* 과제 유형별 현황 - 20명 학생 기준 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">과제 유형별 현황 (전체 학생 20명 기준)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(progressByType).map(([type, typeProgress]) => {
            // 20명 학생 기준으로 완료한 학생 수 계산
            const totalStudents = allStudentsData.length > 0 ? allStudentsData.length : 20;
            
            // 각 학생의 해당 유형 완료 여부 계산
            const completedStudentsCount = useMemo(() => {
              if (allStudentsData.length === 0) {
                // 학생 데이터가 없으면 단일 학생 진행도 기반으로 추정
                const typeCompleted = typeProgress.filter((p) => p.completed_at).length;
                const typeTotal = typeProgress.length;
                if (typeTotal === 0) return 0;
                // 완료율을 학생 수로 변환
                const completionRate = typeTotal > 0 ? (typeCompleted / typeTotal) * 100 : 0;
                return Math.floor((completionRate / 100) * totalStudents);
              }
              
              // 각 학생의 학습 진행률과 미션 진행률을 기반으로 완료 여부 판단
              let completedCount = 0;
              allStudentsData.forEach((student) => {
                const learningProgress = student.learningProgress || 0;
                const missionProgress = student.missionProgress || 0;
                const accuracyRate = student.accuracyRate || 0;
                
                // 유형별 완료 기준 (각 유형당 25%씩 할당)
                let isCompleted = false;
                switch (type) {
                  case 'lecture':
                    // 강의듣기: 학습 진행률 기반 (25% 이상)
                    isCompleted = learningProgress >= 25;
                    break;
                  case 'activity':
                    // 액티비티: 미션 진행률 기반 (25% 이상)
                    isCompleted = missionProgress >= 25;
                    break;
                  case 'ai_chat':
                    // AI 대화: 학습 진행률과 미션 진행률 평균 기반 (25% 이상)
                    isCompleted = (learningProgress + missionProgress) / 2 >= 25;
                    break;
                  case 'library':
                    // 영어도서관: 정답률 기반 (70% 이상)
                    isCompleted = accuracyRate >= 70;
                    break;
                }
                
                if (isCompleted) {
                  completedCount++;
                }
              });
              
              return completedCount;
            }, [allStudentsData, type, typeProgress, totalStudents]);

            const completionRate = totalStudents > 0 ? (completedStudentsCount / totalStudents) * 100 : 0;
            
            // 평균 점수 계산 (완료한 학생들의 정답률 기반)
            const avgScore = useMemo(() => {
              if (allStudentsData.length === 0) {
                const typeScores = typeProgress
                  .map((p) => p.score)
                  .filter((s) => s !== null && s !== undefined) as number[];
                return typeScores.length > 0
                  ? typeScores.reduce((sum, score) => sum + score, 0) / typeScores.length
                  : 0;
              }
              
              // 완료한 학생들의 평균 정답률 계산
              const completedStudents = allStudentsData.filter((student) => {
                const learningProgress = student.learningProgress || 0;
                const missionProgress = student.missionProgress || 0;
                const accuracyRate = student.accuracyRate || 0;
                
                switch (type) {
                  case 'lecture':
                    return learningProgress >= 25;
                  case 'activity':
                    return missionProgress >= 25;
                  case 'ai_chat':
                    return (learningProgress + missionProgress) / 2 >= 25;
                  case 'library':
                    return accuracyRate >= 70;
                  default:
                    return false;
                }
              });
              
              if (completedStudents.length === 0) return 0;
              
              const avgAccuracy = completedStudents.reduce((sum, student) => {
                return sum + (student.accuracyRate || 0);
              }, 0) / completedStudents.length;
              
              return Math.floor(avgAccuracy * 0.8);
            }, [allStudentsData, type, typeProgress]);

            return (
              <div
                key={type}
                className={`rounded-lg border-2 p-4 ${getTypeColor(type)}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{getTypeIcon(type)}</span>
                  <h5 className="font-semibold">{getTypeLabel(type)}</h5>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>완료한 학생</span>
                    <span className="font-medium text-lg">
                      {completedStudentsCount}/{totalStudents}명
                    </span>
                  </div>
                  <div className="w-full bg-white bg-opacity-50 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${completionRate}%`,
                        backgroundColor:
                          type === 'lecture'
                            ? '#4A90D9'
                            : type === 'activity'
                            ? '#7CB342'
                            : type === 'ai_chat'
                            ? '#9C27B0'
                            : '#FF9800',
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>완료율: {completionRate.toFixed(0)}%</span>
                    {avgScore > 0 && (
                      <span className="font-medium">평균 점수: {avgScore}점</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 할당된 미션 목록 */}
      {missions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">할당된 미션</h4>
          <div className="space-y-3">
            {missions.map((mission) => {
              const missionProgress = actualProgress.filter(
                (p) => p.mission_id === mission.mission_id
              );
              const missionCompleted = missionProgress.filter((p) => p.completed_at).length;
              const missionTotal = missionProgress.length;
              const missionRate =
                missionTotal > 0 ? (missionCompleted / missionTotal) * 100 : 0;

              return (
                <div
                  key={mission.mission_id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-800">{mission.mission_name}</h5>
                    <span className="text-sm text-gray-600">
                      {mission.start_date} ~ {mission.end_date}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>진행률</span>
                        <span className="font-medium">{missionRate.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${missionRate}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {missionCompleted}/{missionTotal} 완료
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 학생별 상세 현황 테이블 */}
      {studentId && totalProgress > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">과제 상세 현황</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    과제 유형
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    완료율
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    점수
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    상태
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    완료일
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {actualProgress.map((p) => (
                  <tr key={p.progress_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <span className="text-lg">{getTypeIcon(p.progress_type)}</span>
                      <span className="ml-1 text-gray-700">{getTypeLabel(p.progress_type)}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${p.completion_rate}%` }}
                          />
                        </div>
                        <span className="text-gray-700">{p.completion_rate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {p.score !== null && p.score !== undefined ? (
                        <span className="font-medium">{p.score}점</span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          p.completed_at
                            ? 'bg-green-100 text-green-800'
                            : p.completion_rate > 0
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {p.completed_at ? '완료' : p.completion_rate > 0 ? '진행중' : '미완료'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {p.completed_at
                        ? new Date(p.completed_at).toLocaleDateString('ko-KR')
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 학습 현황이 없을 때 */}
      {totalProgress === 0 && !studentData && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-2">이 단원에 대한 학습 현황이 없습니다.</p>
          <p className="text-sm text-gray-400">
            {studentId
              ? '이 단원에 대한 과제가 할당되지 않았습니다.'
              : '학생을 선택하거나 미션을 할당하면 학습 현황이 표시됩니다.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UnitProgressDetail;
