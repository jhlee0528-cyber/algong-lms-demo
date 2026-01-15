/**
 * 수업보기 페이지
 * 접속중(○) / 학습중(●) 실시간 모니터링
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useStudents } from '../hooks/useStudents';

type StudentStatus = 'offline' | 'online' | 'learning';

interface StudentStatusData {
  student_id: number;
  name: string;
  status: StudentStatus;
  current_activity?: string | null;
  last_active?: string;
}

const ClassViewPage: React.FC = () => {
  // TODO: teacherId는 실제로는 인증에서 가져와야 함
  const teacherId = 1;
  const { data: students } = useStudents({ teacher_id: teacherId });

  const [studentStatuses, setStudentStatuses] = useState<StudentStatusData[]>([]);

  // 더미 학생 이름 목록 (20명)
  const dummyStudentNames = useMemo(() => [
    '김민수', '이지은', '박준호', '최서연', '정현우',
    '강소영', '윤도현', '임수진', '한지훈', '오나은',
    '신동욱', '배미래', '조성민', '홍예린', '송태현',
    '유하늘', '문지원', '양준혁', '백서아', '남도윤',
  ], []);

  useEffect(() => {
    // 더미 데이터 생성: 전체 20명, 접속중 18명, 학습중 16명, 오프라인 2명
    // 학습중 16명은 접속중 18명에 포함됨
    const statuses: StudentStatusData[] = dummyStudentNames.map((name, index) => {
      let status: StudentStatus;
      let current_activity: string | null = null;
      let last_active: string = '방금 전';

      // 오프라인 2명 (마지막 2명: 18-19번째)
      if (index >= 18) {
        status = 'offline';
        last_active = '10분 전';
      }
      // 학습중 16명 (처음 16명: 0-15번째)
      else if (index < 16) {
        status = 'learning';
        const activities = [
          'Unit 5 학습 중',
          'Unit 3 미션 진행',
          'Unit 7 복습 중',
          'Unit 2 퀴즈 풀이',
          'Unit 6 듣기 연습',
          'Unit 4 읽기 연습',
          'Unit 8 말하기 연습',
          'Unit 1 쓰기 연습',
          'Unit 9 학습 중',
          'Unit 10 미션 진행',
          'Unit 11 복습 중',
          'Unit 12 퀴즈 풀이',
          'Unit 13 듣기 연습',
          'Unit 14 읽기 연습',
          'Unit 15 말하기 연습',
          'Unit 16 쓰기 연습',
        ];
        current_activity = activities[index] || '학습 중';
      }
      // 접속중이지만 학습중이 아닌 2명 (16-17번째)
      else {
        status = 'online';
        last_active = '2분 전';
      }

      return {
        student_id: index + 1,
        name,
        status,
        current_activity,
        last_active,
      };
    });

    setStudentStatuses(statuses);
  }, [dummyStudentNames]);

  const getStatusIcon = (status: StudentStatus) => {
    switch (status) {
      case 'online':
        return '○';
      case 'learning':
        return '●';
      default:
        return '○';
    }
  };

  const getStatusColor = (status: StudentStatus) => {
    switch (status) {
      case 'online':
        return 'text-blue-500';
      case 'learning':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusLabel = (status: StudentStatus) => {
    switch (status) {
      case 'online':
        return '접속중';
      case 'learning':
        return '학습중';
      default:
        return '오프라인';
    }
  };

  const onlineCount = studentStatuses.filter((s) => s.status === 'online' || s.status === 'learning').length;
  const learningCount = studentStatuses.filter((s) => s.status === 'learning').length;
  const offlineCount = studentStatuses.filter((s) => s.status === 'offline').length;

  return (
    <div className="w-full space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">수업보기</h2>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-blue-500">○</span>
            <span>접속중: {onlineCount}명</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">●</span>
            <span>학습중: {learningCount}명</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">○</span>
            <span>오프라인: {offlineCount}명</span>
          </div>
        </div>
      </div>

      {/* 학생 상태 카드 그리드 - 5x4 (가로 5 x 세로 4) */}
      <div className="grid grid-cols-5 gap-2">
        {studentStatuses.map((studentStatus) => (
          <div
            key={studentStatus.student_id}
            className={`bg-white rounded-lg shadow-sm p-2 border-2 transition-all ${
              studentStatus.status === 'learning'
                ? 'border-green-500 bg-green-50'
                : studentStatus.status === 'online'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="text-center">
              {/* 상태 아이콘 */}
              <div className={`text-xl mb-1 ${getStatusColor(studentStatus.status)}`}>
                {getStatusIcon(studentStatus.status)}
              </div>

              {/* 학생 이름 */}
              <div className="text-xs font-semibold text-gray-800 mb-0.5">
                {studentStatus.name}
              </div>

              {/* 상태 라벨 */}
              <div className={`text-xs font-medium ${getStatusColor(studentStatus.status)}`}>
                {getStatusLabel(studentStatus.status)}
              </div>

              {/* 현재 활동 */}
              {studentStatus.current_activity && (
                <div className="text-[10px] text-gray-500 mt-1 line-clamp-1">
                  {studentStatus.current_activity}
                </div>
              )}

              {/* 마지막 활동 시간 */}
              {studentStatus.last_active && (
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {studentStatus.last_active}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        <h3 className="text-xs font-semibold text-gray-700 mb-2">상태 설명</h3>
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-500 text-sm">○</span>
            <span className="text-gray-600">접속중: 학생이 접속해 있지만 학습 중이 아님</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-green-500 text-sm">●</span>
            <span className="text-gray-600">학습중: 현재 학습 활동을 진행 중</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-sm">○</span>
            <span className="text-gray-600">오프라인: 접속하지 않음</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassViewPage;
