/**
 * 과제 선택 메인 컴포넌트
 * 4가지 과제 유형을 선택할 수 있는 컨테이너
 */

import React, { useState, useCallback } from 'react';
import LectureTaskCard from './LectureTaskCard';
import ActivityTaskCard from './ActivityTaskCard';
import AiChatTaskCard from './AiChatTaskCard';
import LibraryTaskCard from './LibraryTaskCard';
import type { TaskSelection, TaskTimeEstimate } from '../../types';

interface TaskSelectorProps {
  value?: TaskSelection;
  onChange?: (selection: TaskSelection) => void;
  onTimeEstimateChange?: (estimate: TaskTimeEstimate) => void;
}

const TaskSelector: React.FC<TaskSelectorProps> = ({
  value = {},
  onChange,
  onTimeEstimateChange,
}) => {
  const [selection, setSelection] = useState<TaskSelection>(value);

  const handleSelectionChange = useCallback(
    (type: keyof TaskSelection, task: any) => {
      const newSelection = {
        ...selection,
        [type]: task,
      };

      // 선택되지 않은 타입은 제거
      if (!task) {
        delete newSelection[type];
      }

      setSelection(newSelection);
      onChange?.(newSelection);

      // 예상 시간 계산
      const estimate = calculateTimeEstimate(newSelection);
      onTimeEstimateChange?.(estimate);
    },
    [selection, onChange, onTimeEstimateChange]
  );

  const calculateTimeEstimate = (sel: TaskSelection): TaskTimeEstimate => {
    let lecture = 0;
    let activity = 0;
    let ai_chat = 0;
    let library = 0;

    // 강의듣기: 차시별 예상 시간 (개선 계획서 기준)
    // 1차시: 5분, 2차시: 8분, 3차시: 7분, 4차시: 8분, 5차시: 8분, 6차시: 5분
    const sessionTimes: { [key: number]: number } = {
      1: 5,
      2: 8,
      3: 7,
      4: 8,
      5: 8,
      6: 5,
    };

    if (sel.lecture?.sessions) {
      lecture = sel.lecture.sessions.reduce(
        (sum, session) => sum + (sessionTimes[session] || 7),
        0
      );
    }

    // 액티비티: 유형당 평균 5분
    if (sel.activity?.activities) {
      activity = sel.activity.activities.length * 5;
    }

    // AI 대화: 평균 10분
    if (sel.ai_chat?.enabled) {
      ai_chat = 10;
    }

    // 영어도서관: 도서별 예상 시간 합산
    if (sel.library?.books) {
      library = sel.library.books.reduce(
        (sum, book) => sum + (book.estimated_time || 10),
        0
      );
    }

    return {
      lecture,
      activity,
      ai_chat,
      library,
      total: lecture + activity + ai_chat + library,
    };
  };

  const estimate = calculateTimeEstimate(selection);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">3. 과제 선택</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            총 예상 소요 시간: 약 {estimate.total}분
          </span>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            title="과제 선택 도움말"
          >
            ❓
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 강의듣기 (스마트리) */}
        <LectureTaskCard
          value={selection.lecture}
          onChange={(task) => handleSelectionChange('lecture', task)}
        />

        {/* 액티비티 */}
        <ActivityTaskCard
          value={selection.activity}
          onChange={(task) => handleSelectionChange('activity', task)}
        />

        {/* AI 대화 */}
        <AiChatTaskCard
          value={selection.ai_chat}
          onChange={(task) => handleSelectionChange('ai_chat', task)}
        />

        {/* 영어도서관 */}
        <LibraryTaskCard
          value={selection.library}
          onChange={(task) => handleSelectionChange('library', task)}
        />
      </div>
    </div>
  );
};

export default TaskSelector;
