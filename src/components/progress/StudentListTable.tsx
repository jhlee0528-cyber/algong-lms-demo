/**
 * 학생 목록 테이블 컴포넌트
 * 학생 정보와 학습 현황을 표 형태로 표시
 */

import React from 'react';
import type { Student } from '../../types';
import { formatLevel, getLevelColorByNumber } from '../../utils/arlexLevel';
import { getProgressColor, getPerformanceStatusStyle } from '../../utils/weekHelper';
import ProgressBadge, { type ProgressStatus } from '../common/ProgressBadge';

export interface StudentWithStats extends Student {
  nickname?: string;
  learningProgress: number; // 학습 진행률 (0-100)
  missionProgress: number; // 미션 진행률 (0-100)
  accuracyRate: number; // 정답률 (0-100)
  studyTime: number; // 학습 시간 (분)
  gems?: {
    red: number;
    blue: number;
    green: number;
    yellow: number;
  };
  coins?: number;
  arlex_level?: number | null; // ArLex 레벨 (1-36)
  // 주간 학습 계획 관련
  weeklyGoal?: number; // 주간 목표 Units 수
  weeklyCompletionRate?: number; // 이번 주 달성률 (0-100)
  performanceStatus?: 'excellent' | 'on_track' | 'warning' | 'critical'; // 성과 상태
  // 주간 데이터 (동기화됨)
  weeklyCompleted?: boolean;
  weeklyStatus?: 'excellent' | 'normal' | 'warning' | 'critical';
  lectureProgress?: number;
  activityProgress?: number;
  aiChatProgress?: number;
  libraryProgress?: number;
}

interface StudentListTableProps {
  students: StudentWithStats[];
  selectedStudent: number | null;
  onStudentSelect: (studentId: number) => void;
  onShowDetail: (studentId: number) => void;
}

/**
 * 원형 프로그레스 바 컴포넌트
 */
const CircularProgress: React.FC<{ percentage: number; size?: number; color?: string }> = ({
  percentage,
  size = 50,
  color = '#3B82F6',
}) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 80) return '#10B981'; // green
    if (percentage >= 50) return '#3B82F6'; // blue
    if (percentage >= 30) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  const progressColor = color || getColor();

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="4"
          fill="none"
        />
        {/* 진행률 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold text-gray-700">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

/**
 * 프로그레스 바 컴포넌트
 */
const ProgressBar: React.FC<{ percentage: number; height?: number }> = ({
  percentage,
  height = 8,
}) => {
  const getColor = () => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full" style={{ height: `${height}px` }}>
        <div
          className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-12 text-right">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

/**
 * 학습 시간 포맷팅
 */
const formatStudyTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${Math.round(minutes)}분`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}시간 ${mins > 0 ? `${mins}분` : ''}`;
};

/**
 * 이번 주 달성률 계산
 * 달성률 = (학습 진행률 + 미션 진행률) / 2
 */
const calculateWeeklyCompletionRate = (student: StudentWithStats): number => {
  const learning = student.learningProgress ?? 0;
  const mission = student.missionProgress ?? 0;
  return Math.round((learning + mission) / 2);
};

/**
 * 달성률 기반으로 학생 상태 판정
 * @param completionRate - 이번 주 달성률 (0~100)
 * 기준: 우수(100% 이상), 정상(70-99%), 주의(40-69%), 미흡(0-39%)
 */
const determineWeeklyStatus = (completionRate: number): 'excellent' | 'on_track' | 'warning' | 'critical' => {
  if (completionRate >= 100) return 'excellent';  // 우수: 100% 이상
  if (completionRate >= 70) return 'on_track';    // 정상: 70-99%
  if (completionRate >= 40) return 'warning';      // 주의: 40-69%
  return 'critical';                                // 미흡: 0-39%
};

/**
 * 학생별 진도 상태 계산 (현실적인 분포 적용)
 * 초등학생 공부방 기준: 정상 60-70%, 선행 15-20%, 지연 15-20%
 */
const calculateProgressStatus = (
  student: StudentWithStats,
  index: number
): { status: ProgressStatus; weeksDiff: number } => {
  // 20명 기준 현실적 분포 (인덱스로 결정)
  // 선행 2주: 1명 (5%), 선행 1주: 2명 (10%), 정상: 13명 (65%), 지연 1주: 3명 (15%), 지연 2주: 1명 (5%)
  const distributions: Array<{ status: ProgressStatus; weeksDiff: number }> = [
    { status: 'ahead', weeksDiff: 2 },    // 0 - 2주 선행
    { status: 'ahead', weeksDiff: 1 },    // 1 - 1주 선행
    { status: 'ahead', weeksDiff: 1 },    // 2 - 1주 선행
    { status: 'onTrack', weeksDiff: 0 },  // 3 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 4 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 5 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 6 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 7 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 8 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 9 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 10 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 11 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 12 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 13 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 14 - 정상
    { status: 'onTrack', weeksDiff: 0 },  // 15 - 정상
    { status: 'behind', weeksDiff: 1 },   // 16 - 1주 지연
    { status: 'behind', weeksDiff: 1 },   // 17 - 1주 지연
    { status: 'behind', weeksDiff: 1 },   // 18 - 1주 지연
    { status: 'behind', weeksDiff: 2 },   // 19 - 2주 지연
  ];
  
  // 인덱스를 분포 배열 길이로 나눈 나머지로 순환 사용
  return distributions[index % distributions.length];
};

// 상태 배지 컴포넌트
const StatusBadge: React.FC<{ status: 'excellent' | 'on_track' | 'warning' | 'critical' }> = ({ status }) => {
  const style = getPerformanceStatusStyle(status);
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
};

const StudentListTable: React.FC<StudentListTableProps> = ({
  students,
  selectedStudent,
  onStudentSelect,
  onShowDetail,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden" data-tour="student-table">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                번호
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                레벨
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이름
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                아이디
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                닉네임
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                학습 진행률
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                미션 진행률
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                정답률
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                학습시간
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                주간 목표
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                이번 주 달성률
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                학습상세
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr
                key={student.student_id}
                onClick={() => onStudentSelect(student.student_id)}
                className={`cursor-pointer transition-colors ${
                  selectedStudent === student.student_id
                    ? 'bg-blue-50 hover:bg-blue-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {index + 1}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {student.arlex_level ? (
                    <span
                      className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-md text-white"
                      style={{
                        backgroundColor: getLevelColorByNumber(student.arlex_level),
                        minWidth: '48px',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {formatLevel(student.arlex_level, 'code')}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <span>{student.name}</span>
                    {(() => {
                      const progress = calculateProgressStatus(student, index);
                      return (
                        <ProgressBadge 
                          status={progress.status}
                          weeksDiff={progress.weeksDiff}
                          size="sm"
                        />
                      );
                    })()}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {student.email || `student${student.student_id}`}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                  {student.nickname || student.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    <CircularProgress percentage={student.learningProgress} size={60} />
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex justify-center">
                    <CircularProgress percentage={student.missionProgress} size={60} />
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <ProgressBar percentage={student.accuracyRate} height={8} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                  {formatStudyTime(student.studyTime)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                  <span className="text-sm">{student.weeklyGoal || 3} Units</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {(() => {
                    const completionRate = calculateWeeklyCompletionRate(student);
                    return (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(completionRate)}`}
                            style={{ width: `${Math.min(100, completionRate)}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-700">{completionRate}%</span>
                      </div>
                    );
                  })()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {(() => {
                    const completionRate = calculateWeeklyCompletionRate(student);
                    const weeklyStatus = determineWeeklyStatus(completionRate);
                    return <StatusBadge status={weeklyStatus} />;
                  })()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowDetail(student.student_id);
                    }}
                    className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListTable;
