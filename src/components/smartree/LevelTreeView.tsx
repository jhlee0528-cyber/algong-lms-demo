import React from 'react';
import { LEVELS_BY_GROUP, GROUP_CONFIG, SERIES_ORDER, DOMAIN_LEVELS } from '../../data/curriculumLevels';
import { LevelGroup, LevelCode, LevelSeries, Domain } from '../../types/smartree';
import LevelCard from './LevelCard';

interface LevelProgress {
  [levelCode: string]: number;  // 레벨별 진행률 (0~100)
}

interface LevelTreeViewProps {
  levelProgress: Record<string, number>;
  studentCountByLevel?: Record<string, number>;  // ⭐ 추가
  highlightLevel?: LevelCode;      // 학생 선택 시 하이라이트할 레벨
  selectedDomain: Domain | 'all';  // 선택된 영역
  selectedStudentId: string | null;  // ⭐ 추가: null이면 전체 보기 모드
  onLevelClick: (levelCode: LevelCode) => void;
}

const LevelTreeView: React.FC<LevelTreeViewProps> = ({
  levelProgress,
  studentCountByLevel,
  highlightLevel,
  selectedDomain,
  selectedStudentId,  // ⭐ 추가
  onLevelClick,
}) => {
  const groups: LevelGroup[] = ['Spark', 'Motivate', 'Activate'];
  
  // ⭐ 영역별 허용 시리즈 가져오기
  const allowedSeries: LevelSeries[] = selectedDomain === 'all' 
    ? SERIES_ORDER 
    : (DOMAIN_LEVELS[selectedDomain] || SERIES_ORDER);
  
  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const config = GROUP_CONFIG[group];
        const allLevels = LEVELS_BY_GROUP[group];
        
        // ⭐ 선택된 영역에 포함되는 레벨만 필터링
        const levels = allLevels.filter((l) => allowedSeries.includes(l.series));
        
        // 해당 그룹에 표시할 레벨이 없으면 그룹 전체 숨김
        if (levels.length === 0) return null;
        
        // 그룹 내 시리즈별로 분리 (A, B) - 허용된 시리즈만
        const seriesA = levels.filter((l) => l.series.endsWith('A'));
        const seriesB = levels.filter((l) => l.series.endsWith('B'));
        
        // 그룹 전체 진행률 계산
        const groupProgress = Math.round(
          levels.reduce((sum, l) => sum + (levelProgress[l.code] || 0), 0) / levels.length
        );
        
        return (
          <div key={group} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* 그룹 헤더 */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{config.icon}</span>
                <span className={`font-bold text-lg ${config.color}`}>{group}</span>
                <span className="text-sm text-gray-500">
                  ({group === 'Spark' ? 'SA, SB' : group === 'Motivate' ? 'MA, MB' : 'AA, AB'})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${groupProgress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">{groupProgress}%</span>
              </div>
            </div>
            
            {/* 레벨 카드 그리드 */}
            <div className="p-4">
              {/* Series A - 해당 영역에 포함될 때만 표시 */}
              {seriesA.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {group} A ({seriesA[0]?.series})
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                  {seriesA.map((level) => (
                    <LevelCard
                      key={level.code}
                      level={level}
                      progress={levelProgress[level.code] || 0}
                      studentCount={studentCountByLevel?.[level.code] || 0}
                      isOverviewMode={selectedStudentId === null}  // ⭐ 전체 보기 여부
                      isHighlighted={highlightLevel === level.code}
                      onClick={() => onLevelClick(level.code)}
                    />
                  ))}
                  </div>
                </div>
              )}
              
              {/* Series B - 해당 영역에 포함될 때만 표시 */}
              {seriesB.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    {group} B ({seriesB[0]?.series})
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                  {seriesB.map((level) => (
                    <LevelCard
                      key={level.code}
                      level={level}
                      progress={levelProgress[level.code] || 0}
                      studentCount={studentCountByLevel?.[level.code] || 0}
                      isOverviewMode={selectedStudentId === null}  // ⭐ 전체 보기 여부
                      isHighlighted={highlightLevel === level.code}
                      onClick={() => onLevelClick(level.code)}
                    />
                  ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LevelTreeView;
