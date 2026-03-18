// 학부모 정보 컴포넌트
import React from 'react';
import { Student } from '../../data/mockStudents';

interface ParentInfoProps {
  student: Student;
}

const ParentInfo: React.FC<ParentInfoProps> = ({ student }) => {
  // 최근 소통일 계산 (주간 리포트 기준)
  const getLastCommunicationDate = () => {
    const activities = student.recentActivities?.filter(a => a.type === 'communication');
    if (activities && activities.length > 0) {
      return activities[0].date;
    }
    return null;
  };

  const lastCommDate = getLastCommunicationDate();

  const formatPhoneNumber = (phone: string) => {
    // 010-1234-5678 형식 유지
    return phone;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">👨‍👩‍👧 학부모 정보</h3>

      <div className="space-y-4">
        {/* 학부모 이름 */}
        {student.parentName && (
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">학부모</span>
            <span className="font-medium text-gray-800">{student.parentName}</span>
          </div>
        )}

        {/* 연락처 */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">연락처</span>
          <a
            href={`tel:${student.parentPhone}`}
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {formatPhoneNumber(student.parentPhone)}
          </a>
        </div>

        {/* 카카오톡 알림 동의 */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">카카오톡 알림</span>
          <div className="flex items-center gap-2">
            {student.notificationSettings.weeklyReport ? (
              <>
                <span className="text-green-600 text-sm font-medium">동의</span>
                <span className="text-lg">✅</span>
              </>
            ) : (
              <>
                <span className="text-red-600 text-sm font-medium">미동의</span>
                <span className="text-lg">❌</span>
              </>
            )}
          </div>
        </div>

        {/* 알림 설정 상세 */}
        <div className="py-2">
          <p className="text-sm text-gray-600 mb-2">알림 설정</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">출석 알림</span>
              <span className={student.notificationSettings.attendance ? 'text-green-600' : 'text-gray-400'}>
                {student.notificationSettings.attendance ? 'ON' : 'OFF'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">진도 알림</span>
              <span className={student.notificationSettings.progress ? 'text-green-600' : 'text-gray-400'}>
                {student.notificationSettings.progress ? 'ON' : 'OFF'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">주간 리포트</span>
              <span className={student.notificationSettings.weeklyReport ? 'text-green-600' : 'text-gray-400'}>
                {student.notificationSettings.weeklyReport ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* 최근 소통 */}
        {lastCommDate && (
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">최근 소통</span>
            <span className="text-sm text-gray-800">
              {new Date(lastCommDate).toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        )}

        {/* 등록일 */}
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-600">등록일</span>
          <span className="text-sm text-gray-800">
            {new Date(student.registeredDate).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* 학부모에게 메시지 보내기 버튼 */}
        <button className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          💬 학부모에게 메시지 보내기
        </button>
      </div>
    </div>
  );
};

export default ParentInfo;
