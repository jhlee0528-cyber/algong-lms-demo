/**
 * 학생 과제 현황 테이블 컴포넌트
 */

import React, { useState, useMemo } from 'react';
import { useStudentProgress } from '../../hooks/useStudentProgress';
import { useMissions } from '../../hooks/useMissions';
import { formatDateRange } from '../../utils/formatDate';
import type { ProgressStatus } from '../../types';

interface StudentProgressTableProps {
  studentId: number;
  missionId?: number;
  unitId?: number;
  startDate?: string;
  endDate?: string;
}

const StudentProgressTable: React.FC<StudentProgressTableProps> = ({
  studentId,
  missionId,
  unitId,
  startDate,
  endDate,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const { data, isLoading, error } = useStudentProgress({
    student_id: studentId,
    mission_id: missionId,
    unit_id: unitId,
    progress_type: filterType !== 'all' ? filterType : undefined,
    start_date: startDate,
    end_date: endDate,
  });

  // 미션 정보 가져오기 (과제명, 기간 표시용)
  const progressList = data?.progress || [];
  const { data: missionsData } = useMissions({});
  const missionsMap = useMemo(() => {
    const map = new Map();
    missionsData?.missions.forEach((mission) => {
      map.set(mission.mission_id, mission);
    });
    return map;
  }, [missionsData]);

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        과제 현황을 불러오는데 실패했습니다.
      </div>
    );
  }

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
        return 'AI대화';
      case 'library':
        return '영어도서관';
      default:
        return type;
    }
  };

  const getStatusLabel = (status: ProgressStatus) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'in_progress':
        return '진행중';
      case 'overdue':
        return '지연';
      default:
        return '미완료';
    }
  };

  const getStatusColor = (status: ProgressStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="w-full">
      {/* 필터 */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-700">과제 유형 필터:</span>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">전체</option>
          <option value="lecture">강의듣기</option>
          <option value="activity">액티비티</option>
          <option value="ai_chat">AI 대화</option>
          <option value="library">영어도서관</option>
        </select>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                과제명
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                과제 유형
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                과제 기간
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                완료일
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                획득 점수
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상세 조회
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {progressList.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  과제 현황 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              progressList.map((progress) => {
                const mission = progress.mission_id ? missionsMap.get(progress.mission_id) : null;
                return (
                  <tr key={progress.progress_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {mission ? mission.mission_name : progress.mission_id ? `미션 #${progress.mission_id}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-lg">{getTypeIcon(progress.progress_type)}</span>
                      <span className="ml-1 text-gray-700">
                        {getTypeLabel(progress.progress_type)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {mission
                        ? formatDateRange(mission.start_date, mission.end_date)
                        : '-'}
                    </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {formatDate(progress.completed_at)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        progress.completed_at
                          ? 'completed'
                          : progress.completion_rate > 0
                          ? 'in_progress'
                          : 'pending'
                      )}`}
                    >
                      {getStatusLabel(
                        progress.completed_at
                          ? 'completed'
                          : progress.completion_rate > 0
                          ? 'in_progress'
                          : 'pending'
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {progress.score !== null && progress.score !== undefined ? (
                      <span className="font-medium">{progress.score}점</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-800">More</button>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentProgressTable;
