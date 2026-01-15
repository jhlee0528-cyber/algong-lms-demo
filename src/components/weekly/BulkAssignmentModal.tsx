/**
 * 일괄 배정 모달
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { WeeklyPlan } from '../../types/weekly';

interface BulkAssignmentModalProps {
  studentIds: number[];
  weekStart: string;
  onClose: () => void;
  onSave: (template: Partial<WeeklyPlan>) => void;
}

const BulkAssignmentModal: React.FC<BulkAssignmentModalProps> = ({
  studentIds,
  weekStart,
  onClose,
  onSave,
}) => {
  const [targetUnits, setTargetUnits] = useState(3);
  const [targetLectureCount, setTargetLectureCount] = useState(6);
  const [targetActivityCount, setTargetActivityCount] = useState(4);
  const [targetLibraryBooks, setTargetLibraryBooks] = useState(2);
  const [targetAiChatSessions, setTargetAiChatSessions] = useState(3);

  const handleSave = () => {
    const template: Partial<WeeklyPlan> = {
      weekStartDate: weekStart,
      targetUnits: [],
      targetLectureCount,
      targetActivityCount,
      targetLibraryBooks,
      targetAiChatSessions,
      status: 'planned',
    };
    onSave(template);
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      style={{ zIndex: 9999 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">일괄 학습 계획 배정</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              선택된 학생 수: <span className="font-semibold">{studentIds.length}명</span>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                목표 Units 수
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={targetUnits}
                onChange={(e) => setTargetUnits(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                목표 강의 수
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={targetLectureCount}
                onChange={(e) => setTargetLectureCount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                목표 액티비티 수
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={targetActivityCount}
                onChange={(e) => setTargetActivityCount(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                목표 도서 수
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={targetLibraryBooks}
                onChange={(e) => setTargetLibraryBooks(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                목표 AI 대화 수
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={targetAiChatSessions}
                onChange={(e) => setTargetAiChatSessions(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BulkAssignmentModal;
