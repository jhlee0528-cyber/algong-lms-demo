import React, { useState, useMemo } from 'react';
import { Domain, LevelCode, LevelSeries, LevelGroup } from '../../types/smartree';
import { ClassroomStudent, LevelStudentGroup } from '../../types/classroom';
import { ALL_LEVELS, SERIES_ORDER, SERIES_TO_GROUP, GROUP_CONFIG, DOMAIN_LEVELS } from '../../data/curriculumLevels';
import { getAllLevelGroups } from '../../data/dummyStudentData';
import ClassroomLevelCard from './ClassroomLevelCard';
import LevelStudentPopover from './LevelStudentPopover';

interface ClassroomLevelMapProps {
  students: ClassroomStudent[];
  selectedDomain: Domain | 'all';
  highlightStudentId?: string | null;
  onStudentClick?: (studentId: string) => void;
}

const ClassroomLevelMap: React.FC<ClassroomLevelMapProps> = ({
  students,
  selectedDomain,
  highlightStudentId,
  onStudentClick,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelCode | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number } | null>(null);

  // 레벨별 학생 그룹 계산
  const levelGroups = useMemo(() => getAllLevelGroups(students), [students]);

  // 하이라이트할 레벨 (선택된 학생의 현재 레벨)
  const highlightLevel = highlightStudentId
    ? students.find((s) => s.id === highlightStudentId)?.currentLevel
    : undefined;

  // 영역별 허용 시리즈
  const allowedSeries: LevelSeries[] =
    selectedDomain === 'all' ? SERIES_ORDER : (DOMAIN_LEVELS[selectedDomain] || SERIES_ORDER);

  const groups: LevelGroup[] = ['Spark', 'Motivate', 'Activate'];

  const handleLevelClick = (levelCode: LevelCode, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });
    setSelectedLevel(levelCode);
  };

  const handleClosePopover = () => {
    setSelectedLevel(null);
    setPopoverPosition(null);
  };

  return (
    <div className="relative">
      {/* 범례 */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="text-gray-500">상태:</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-700">학습중</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-blue-700">접속중</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="text-gray-500">오프라인</span>
        </div>
      </div>

      {/* 레벨 그룹별 표시 */}
      {groups.map((group) => {
        // 해당 그룹의 시리즈 중 허용된 것만 필터
        const groupSeries = SERIES_ORDER.filter(
          (s) => SERIES_TO_GROUP[s] === group && allowedSeries.includes(s)
        );

        if (groupSeries.length === 0) return null;

        const config = GROUP_CONFIG[group];
        const seriesA = groupSeries.find((s) => s.endsWith('A'));
        const seriesB = groupSeries.find((s) => s.endsWith('B'));

        return (
          <div key={group} className="mb-6">
            {/* 그룹 헤더 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{config.icon}</span>
              <span className={`font-semibold ${config.color}`}>{group}</span>
              <span className="text-sm text-gray-400">
                ({groupSeries.join(', ')})
              </span>
            </div>

            {/* 레벨 카드 그리드 */}
            <div className="bg-white rounded-xl border p-4 space-y-4">
              {/* Series A */}
              {seriesA && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {group} A ({seriesA})
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((stage) => {
                      const levelCode = `${seriesA}${stage}` as LevelCode;
                      const levelInfo = ALL_LEVELS.find((l) => l.code === levelCode);
                      const groupData = levelGroups.get(levelCode);

                      if (!levelInfo || !groupData) return null;

                      return (
                        <ClassroomLevelCard
                          key={levelCode}
                          level={levelInfo}
                          group={groupData}
                          isHighlighted={highlightLevel === levelCode}
                          onClick={(e) => handleLevelClick(levelCode, e)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Series B */}
              {seriesB && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {group} B ({seriesB})
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((stage) => {
                      const levelCode = `${seriesB}${stage}` as LevelCode;
                      const levelInfo = ALL_LEVELS.find((l) => l.code === levelCode);
                      const groupData = levelGroups.get(levelCode);

                      if (!levelInfo || !groupData) return null;

                      return (
                        <ClassroomLevelCard
                          key={levelCode}
                          level={levelInfo}
                          group={groupData}
                          isHighlighted={highlightLevel === levelCode}
                          onClick={(e) => handleLevelClick(levelCode, e)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* 학생 목록 팝오버 */}
      {selectedLevel && (
        <LevelStudentPopover
          group={levelGroups.get(selectedLevel)!}
          isOpen={!!selectedLevel}
          onClose={handleClosePopover}
          onStudentClick={(id) => {
            onStudentClick?.(id);
            handleClosePopover();
          }}
          position={popoverPosition || undefined}
        />
      )}
    </div>
  );
};

export default ClassroomLevelMap;
