/**
 * 미션 목록 컴포넌트
 */

import React from 'react';
import { useMissions } from '../../hooks/useMissions';
import type { GetMissionsRequest } from '../../types';

interface MissionListProps {
  teacherId?: number;
  unitId?: number;
  status?: string;
}

const MissionList: React.FC<MissionListProps> = ({ teacherId, unitId, status }) => {
  const params: GetMissionsRequest = {
    teacher_id: teacherId,
    unit_id: unitId,
    status,
  };

  const { data, isLoading, error } = useMissions(params);

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">미션 목록을 불러오는데 실패했습니다.</div>;
  }

  const missions = data?.missions || [];

  const getMissionTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return '📺';
      case 'activity':
        return '📝';
      case 'ai_chat':
        return '💬';
      case 'library':
        return '📚';
      case 'mixed':
        return '🔀';
      default:
        return '📋';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                미션명
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                유형
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                단원
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                기간
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                대상
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {missions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  등록된 미션이 없습니다.
                </td>
              </tr>
            ) : (
              missions.map((mission) => (
                <tr key={mission.mission_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {mission.mission_name}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="text-lg">{getMissionTypeIcon(mission.mission_type)}</span>
                    <span className="ml-1 text-gray-700">{mission.mission_type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    단원 {mission.unit_id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {mission.start_date} ~ {mission.end_date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {mission.target_students.length}명
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        mission.status
                      )}`}
                    >
                      {mission.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      수정
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MissionList;
