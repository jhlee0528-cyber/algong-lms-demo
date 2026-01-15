/**
 * 강의듣기 (스마트리) 과제 카드 컴포넌트
 */

import React, { useState } from 'react';
import type { LectureTask, LectureSession } from '../../types';

interface LectureTaskCardProps {
  value?: LectureTask;
  onChange?: (task: LectureTask | null) => void;
}

const LECTURE_SESSIONS: { value: LectureSession; label: string; subtitle: string; time: number }[] = [
  { value: 1, label: '1차시', subtitle: "Let's Do the Chant (챈트)", time: 5 },
  { value: 2, label: '2차시', subtitle: "Let's Listen and Repeat (듣고 따라 말하기)", time: 8 },
  { value: 3, label: '3차시', subtitle: "Let's Trace (따라쓰기)", time: 7 },
  { value: 4, label: '4차시', subtitle: 'Game (게임)', time: 8 },
  { value: 5, label: '5차시', subtitle: "Let's Read the Story (스토리 읽기)", time: 8 },
  { value: 6, label: '6차시', subtitle: "Let's Scratch (복습하기)", time: 5 },
];

const LectureTaskCard: React.FC<LectureTaskCardProps> = ({ value, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState<LectureSession[]>(
    value?.sessions || []
  );

  const handleSessionToggle = (session: LectureSession) => {
    const newSessions = selectedSessions.includes(session)
      ? selectedSessions.filter((s) => s !== session)
      : [...selectedSessions, session].sort((a, b) => a - b);

    setSelectedSessions(newSessions);

    if (newSessions.length > 0) {
      onChange?.({ type: 'lecture', sessions: newSessions });
    } else {
      onChange?.(null);
    }
  };

  const handleSelectAll = () => {
    const allSessions: LectureSession[] = [1, 2, 3, 4, 5, 6];
    setSelectedSessions(allSessions);
    onChange?.({ type: 'lecture', sessions: allSessions });
  };

  const handleDeselectAll = () => {
    setSelectedSessions([]);
    onChange?.(null);
  };

  const allSelected = selectedSessions.length === 6;
  const hasSelection = selectedSessions.length > 0;

  return (
    <div
      className={`border-2 rounded-lg p-4 transition-all ${
        hasSelection
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-white hover:border-gray-400'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📺</span>
          <h4 className="font-semibold text-gray-800">강의듣기</h4>
          <span className="text-xs text-gray-500">(스마트리)</span>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>

      {expanded && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {LECTURE_SESSIONS.map((session) => (
              <label
                key={session.value}
                className={`flex items-start gap-2 p-3 rounded border-2 transition-colors cursor-pointer ${
                  selectedSessions.includes(session.value)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSessions.includes(session.value)}
                  onChange={() => handleSessionToggle(session.value)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{session.label}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{session.subtitle}</div>
                  <div className="text-xs text-gray-500 mt-1">약 {session.time}분</div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t">
            <button
              type="button"
              onClick={allSelected ? handleDeselectAll : handleSelectAll}
              className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
            >
              {allSelected ? '전체 해제' : '전체 선택'}
            </button>
            {hasSelection && (
              <span className="text-sm text-gray-600 self-center">
                선택: {selectedSessions.length}개 차시
              </span>
            )}
          </div>
        </div>
      )}

      {!expanded && hasSelection && (
        <div className="text-sm text-gray-600">
          선택된 차시: {selectedSessions.join(', ')}차시
          <span className="ml-2 text-gray-500">
            (총 {selectedSessions.reduce((sum, s) => {
              const session = LECTURE_SESSIONS.find((ls) => ls.value === s);
              return sum + (session?.time || 0);
            }, 0)}분)
          </span>
        </div>
      )}
    </div>
  );
};

export default LectureTaskCard;
