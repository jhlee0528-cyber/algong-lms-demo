/**
 * 학습설정 페이지
 * 과제 미션 관리 및 학생 과제 현황
 */

import React, { useState } from 'react';
import { MissionForm, MissionList } from '../components/mission';
import { StudentProgressTable } from '../components/progress';
import { useStudents } from '../hooks/useStudents';

const LearningSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'missions' | 'status'>('missions');
  const [showMissionForm, setShowMissionForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  // TODO: teacherId는 실제로는 인증에서 가져와야 함
  const teacherId = 1;
  const { data: students } = useStudents({ teacher_id: teacherId });

  const handleMissionFormSuccess = () => {
    setShowMissionForm(false);
    // 미션 목록 새로고침은 React Query가 자동으로 처리
  };

  return (
    <div className="w-full space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">학습설정</h2>
      </div>

      {/* 탭 메뉴 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('missions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'missions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            과제 미션 관리
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'status'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            학생 과제 현황
          </button>
        </nav>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="mt-6">
        {activeTab === 'missions' && (
          <div className="space-y-6">
            {/* 신규미션 생성 버튼 */}
            {!showMissionForm && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowMissionForm(true)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
                >
                  + 신규미션 생성
                </button>
              </div>
            )}

            {/* 미션 생성 폼 */}
            {showMissionForm && (
              <MissionForm
                teacherId={teacherId}
                onSuccess={handleMissionFormSuccess}
                onCancel={() => setShowMissionForm(false)}
              />
            )}

            {/* 미션 목록 */}
            {!showMissionForm && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <MissionList teacherId={teacherId} />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-6">
            {/* 학생 선택 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                학생 선택
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {students?.map((student) => (
                  <button
                    key={student.student_id}
                    onClick={() => setSelectedStudent(student.student_id)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      selectedStudent === student.student_id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">
                        {student.name}
                      </div>
                      {student.grade && (
                        <div className="text-xs text-gray-500 mt-1">
                          {student.grade}학년
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 학생 과제 현황 테이블 */}
            {selectedStudent && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  과제 현황
                </h3>
                <StudentProgressTable studentId={selectedStudent} />
              </div>
            )}

            {!selectedStudent && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center py-8 text-gray-500">
                  학생을 선택해주세요.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningSettingsPage;
