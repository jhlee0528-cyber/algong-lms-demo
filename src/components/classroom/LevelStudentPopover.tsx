import React from 'react';
import { LevelStudentGroup, STUDENT_STATUS_CONFIG } from '../../types/classroom';
import { DOMAIN_CONFIG } from '../../data/curriculumLevels';
import StudentStatusBadge from './StudentStatusBadge';

interface LevelStudentPopoverProps {
  group: LevelStudentGroup;
  isOpen: boolean;
  onClose: () => void;
  onStudentClick?: (studentId: string) => void;
  position?: { top: number; left: number };
}

// 마지막 활동 시간 포맷
const formatLastActivity = (date: Date): string => {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
};

const LevelStudentPopover: React.FC<LevelStudentPopoverProps> = ({
  group,
  isOpen,
  onClose,
  onStudentClick,
  position,
}) => {
  if (!isOpen || group.totalCount === 0) return null;

  // 상태별로 정렬 (학습중 > 접속중 > 오프라인)
  const sortedStudents = [...group.students].sort((a, b) => {
    const order = { learning: 0, online: 1, offline: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* 팝오버 */}
      <div
        className="absolute z-50 bg-white rounded-xl shadow-2xl border border-gray-200 w-80 max-h-96 overflow-hidden"
        style={position ? { top: position.top, left: position.left } : {}}
      >
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800">{group.levelCode}</h3>
            <div className="flex items-center gap-3 text-xs mt-1">
              <span className="text-green-600">🟢 {group.learningCount}명 학습중</span>
              <span className="text-blue-600">🔵 {group.onlineCount}명 접속</span>
              <span className="text-gray-500">⚪ {group.offlineCount}명 오프라인</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 학생 목록 */}
        <div className="overflow-y-auto max-h-72">
          {sortedStudents.map((student) => {
            const domainConfig = DOMAIN_CONFIG[student.currentDomain];
            const statusConfig = STUDENT_STATUS_CONFIG[student.status];

            return (
              <button
                key={student.id}
                onClick={() => onStudentClick?.(student.id)}
                className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${statusConfig.bgColor}`}
              >
                <div className="flex items-center gap-3">
                  {/* 상태 표시 */}
                  <StudentStatusBadge status={student.status} showLabel={false} />

                  {/* 학생 정보 */}
                  <div className="text-left">
                    <div className="font-medium text-gray-800">{student.name}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className={domainConfig.color}>
                        {domainConfig.icon} {student.currentDomain}
                      </span>
                      <span>Unit {student.currentUnit}</span>
                    </div>
                  </div>
                </div>

                {/* 오른쪽 정보 */}
                <div className="text-right">
                  {student.status === 'learning' && student.todayLearningTime && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {student.todayLearningTime}분
                    </div>
                  )}
                  {student.status === 'offline' && student.lastActivity && (
                    <div className="text-xs text-gray-400">
                      {formatLastActivity(student.lastActivity)}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LevelStudentPopover;
