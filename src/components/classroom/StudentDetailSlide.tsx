/**
 * 수업보기 - 학생 상세 슬라이드 패널
 * 학생 카드 클릭 시 우측에서 나타나는 상세 정보 패널
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ClassroomStudent } from '../../data/mockClassroom';

interface StudentDetailSlideProps {
  student: ClassroomStudent | null;
  onClose: () => void;
}

const StudentDetailSlide: React.FC<StudentDetailSlideProps> = ({ student, onClose }) => {
  const navigate = useNavigate();

  if (!student) return null;

  const isOffline = student.status === 'offline';

  // 예상 종료 시간 계산
  const getEstimatedEndTime = () => {
    if (!student.estimatedMinutesLeft) return null;
    const now = new Date();
    now.setMinutes(now.getMinutes() + student.estimatedMinutesLeft);
    return now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* 슬라이드 패널 */}
      <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-out">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors flex items-center gap-1"
            >
              <span>←</span>
              <span>돌아가기</span>
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕ 닫기
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-blue-100">초{student.grade}학년</p>
            </div>
            {!isOffline && (
              <div className="bg-white bg-opacity-20 px-3 py-2 rounded-lg flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    student.status === 'learning' ? 'bg-green-400' : 'bg-yellow-400'
                  } animate-pulse`}
                />
                <span className="font-medium">
                  {student.status === 'learning' ? '학습 중' : '일시 정지'}
                </span>
              </div>
            )}
            {isOffline && (
              <div className="bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                <span className="font-medium">미접속</span>
              </div>
            )}
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-6">
          {isOffline ? (
            /* 오프라인 상태 */
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">😴</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                현재 접속하지 않음
              </h3>
              <p className="text-sm text-gray-600">
                {student.name} 학생이 아직 학습을 시작하지 않았어요
              </p>
            </div>
          ) : (
            <>
              {/* 현재 학습 정보 */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  <span>현재 학습 정보</span>
                </h3>

                <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">과목</span>
                    <span className="font-semibold text-gray-800">{student.currentSubject}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">레벨</span>
                    <span className="font-semibold text-gray-800">
                      {student.currentLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">현재 진행</span>
                    <span className="font-semibold text-gray-800">{student.currentActivity}</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">진행률</span>
                      <span className="font-semibold text-gray-800">{student.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${student.progressPercent}%` }}
                      />
                    </div>
                  </div>
                  {student.estimatedMinutesLeft && (
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">예상 종료</span>
                      <span className="font-semibold text-indigo-600">
                        약 {student.estimatedMinutesLeft}분 후 ({getEstimatedEndTime()} 경)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* 오늘 학습 이력 */}
              {student.todayHistory && student.todayHistory.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📅</span>
                    <span>오늘 학습 이력</span>
                  </h3>

                  <div className="space-y-2">
                    {student.todayHistory.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3"
                      >
                        <div className="text-sm font-medium text-gray-600 w-16">
                          {item.time}
                        </div>
                        <div className="flex-1 text-sm text-gray-800">{item.activity}</div>
                        <div className="text-lg">
                          {item.completed ? '✅' : '🔄'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* 액션 버튼 */}
          <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                navigate(`/students/${student.id}`);
                onClose();
              }}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>👤</span>
              <span>학생 상세보기</span>
            </button>
            <button
              onClick={() => {
                navigate('/reports/communication');
                onClose();
              }}
              className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span>📨</span>
              <span>학부모 연락</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetailSlide;
