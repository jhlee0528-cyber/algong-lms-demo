/**
 * 신규 미션 생성 폼 컴포넌트
 * 8단계로 구성된 미션 생성 폼
 */

import React, { useState } from 'react';
import { useCreateMission } from '../../hooks/useMissions';
import { useUnits } from '../../hooks/useUnits';
import { useStudents } from '../../hooks/useStudents';
import TaskSelector from '../task/TaskSelector';
import type { CreateMissionRequest, TaskSelection, TaskTimeEstimate } from '../../types';

interface MissionFormProps {
  teacherId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const MissionForm: React.FC<MissionFormProps> = ({ teacherId, onSuccess, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CreateMissionRequest>>({
    mission_name: '',
    unit_id: 0,
    tasks: [],
    target_students: [],
    reward: {
      stone: 0,
      gold: 0,
    },
    period: {
      start: '',
      end: '',
    },
    class_mode: false,
  });

  const [taskSelection, setTaskSelection] = useState<TaskSelection>({});
  const [timeEstimate, setTimeEstimate] = useState<TaskTimeEstimate>({
    lecture: 0,
    activity: 0,
    ai_chat: 0,
    library: 0,
    total: 0,
  });

  const { data: units } = useUnits();
  const { data: students } = useStudents({ teacher_id: teacherId });
  const createMission = useCreateMission();

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleTaskSelectionChange = (selection: TaskSelection) => {
    setTaskSelection(selection);
    
    // TaskSelection을 Task 배열로 변환
    const tasks: CreateMissionRequest['tasks'] = [];
    
    if (selection.lecture) {
      tasks.push(selection.lecture);
    }
    if (selection.activity) {
      tasks.push(selection.activity);
    }
    if (selection.ai_chat) {
      tasks.push(selection.ai_chat);
    }
    if (selection.library) {
      tasks.push(selection.library);
    }

    setFormData((prev) => ({ ...prev, tasks }));
  };

  const handleSubmit = async () => {
    if (!formData.mission_name || !formData.unit_id || formData.tasks?.length === 0) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      await createMission.mutateAsync(formData as CreateMissionRequest);
      onSuccess?.();
    } catch (error) {
      console.error('미션 생성 실패:', error);
      alert('미션 생성에 실패했습니다.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">
                1. 과제명
              </span>
              <input
                type="text"
                maxLength={16}
                value={formData.mission_name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, mission_name: e.target.value }))
                }
                placeholder="16자 이내로 과제명을 작성해주세요."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-gray-500 mt-1 block">
                {formData.mission_name?.length || 0}/16자
              </span>
            </label>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">
                2. 단원 선택
              </span>
              <select
                value={formData.unit_id || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, unit_id: Number(e.target.value) }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">단원을 선택해주세요</option>
                {units?.map((unit) => (
                  <option key={unit.unit_id} value={unit.unit_id}>
                    {unit.unit_number}. {unit.unit_title}
                  </option>
                ))}
              </select>
            </label>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <TaskSelector
              value={taskSelection}
              onChange={handleTaskSelectionChange}
              onTimeEstimateChange={setTimeEstimate}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">
                4. 과제별 횟수 선택
              </span>
              <span className="text-sm text-gray-600">
                총 예상 소요 시간: 약 {timeEstimate.total}분
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                과제별 횟수는 각 과제 유형의 설정에서 관리됩니다.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <span className="text-sm font-semibold text-gray-700 block mb-2">
              5. 전송 대상 설정
            </span>
            <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4">
              {students?.map((student) => (
                <label
                  key={student.student_id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.target_students?.includes(student.student_id) || false}
                    onChange={(e) => {
                      const current = formData.target_students || [];
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          target_students: [...current, student.student_id],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          target_students: current.filter((id) => id !== student.student_id),
                        }));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{student.name}</span>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                const allIds = students?.map((s) => s.student_id) || [];
                setFormData((prev) => ({ ...prev, target_students: allIds }));
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              전체 선택
            </button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <span className="text-sm font-semibold text-gray-700 block mb-2">
              6. 보상 설정
            </span>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs text-gray-600 mb-1 block">스톤</span>
                <input
                  type="number"
                  min="0"
                  value={formData.reward?.stone || 0}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reward: {
                        ...prev.reward!,
                        stone: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-xs text-gray-600 mb-1 block">골드</span>
                <input
                  type="number"
                  min="0"
                  value={formData.reward?.gold || 0}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reward: {
                        ...prev.reward!,
                        gold: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <span className="text-sm font-semibold text-gray-700 block mb-2">
              7. 기간 설정
            </span>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs text-gray-600 mb-1 block">시작일</span>
                <input
                  type="date"
                  value={formData.period?.start || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      period: {
                        ...prev.period!,
                        start: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-xs text-gray-600 mb-1 block">종료일</span>
                <input
                  type="date"
                  value={formData.period?.end || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      period: {
                        ...prev.period!,
                        end: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-4">
            <span className="text-sm font-semibold text-gray-700 block mb-2">
              8. 수업 모드 설정
            </span>
            <label className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.class_mode || false}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, class_mode: e.target.checked }))
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">수업 모드로 진행</span>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* 진행 단계 표시 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">신규미션 생성</h2>
          <span className="text-sm text-gray-500">
            {step} / 8
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${(step / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* 단계별 폼 */}
      <div className="mb-6 min-h-[400px]">{renderStep()}</div>

      {/* 버튼 */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            >
              이전
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            >
              취소
            </button>
          )}
          {step < 8 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              다음
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={createMission.isPending}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {createMission.isPending ? '저장 중...' : '과제 저장'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionForm;
