import React from 'react';
import type { TaskTypeStats } from '../../types/learningView';
import type { StudentWithStats } from '../progress/StudentListTable';

interface Props {
  students: StudentWithStats[];
}

const TaskTypeView: React.FC<Props> = ({ students }) => {
  // 과제유형별 통계 계산
  const taskTypeStats: TaskTypeStats[] = [
    {
      type: 'lecture',
      label: '강의듣기',
      icon: '🎬',
      color: 'blue',
      completed: 156,
      inProgress: 24,
      notStarted: 20,
      completionRate: 78
    },
    {
      type: 'activity',
      label: '액티비티',
      icon: '🎯',
      color: 'green',
      completed: 130,
      inProgress: 40,
      notStarted: 30,
      completionRate: 65
    },
    {
      type: 'aiChat',
      label: 'AI 대화',
      icon: '🤖',
      color: 'purple',
      completed: 90,
      inProgress: 60,
      notStarted: 50,
      completionRate: 45
    },
    {
      type: 'library',
      label: '영어도서관',
      icon: '📚',
      color: 'orange',
      completed: 104,
      inProgress: 56,
      notStarted: 40,
      completionRate: 52
    }
  ];

  const colorMap: Record<string, { bg: string; text: string; light: string; border: string }> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-100' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-100' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-100' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-100' },
  };

  return (
    <div className="space-y-6">
      {/* 과제유형별 카드 그리드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {taskTypeStats.map((stat) => {
          const colors = colorMap[stat.color];
          const total = stat.completed + stat.inProgress + stat.notStarted;
          
          return (
            <div 
              key={stat.type}
              className={`${colors.light} rounded-xl p-5 border ${colors.border}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <h3 className={`font-bold ${colors.text}`}>{stat.label}</h3>
              </div>

              {/* 도넛 차트 (간단 버전) */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={`${stat.completionRate * 2.51} 251`}
                    className={colors.text}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${colors.text}`}>
                    {stat.completionRate}%
                  </span>
                </div>
              </div>

              {/* 상세 통계 */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">완료</span>
                  <span className="font-medium">{stat.completed}건</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">진행중</span>
                  <span className="font-medium text-yellow-600">{stat.inProgress}건</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">미시작</span>
                  <span className="font-medium text-gray-400">{stat.notStarted}건</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 학생별 과제유형 완료율 테이블 */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-bold text-gray-800">👨‍🎓 학생별 과제유형 완료율</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="p-3 text-left">학생명</th>
                <th className="p-3 text-center">🎬 강의듣기</th>
                <th className="p-3 text-center">🎯 액티비티</th>
                <th className="p-3 text-center">🤖 AI대화</th>
                <th className="p-3 text-center">📚 도서관</th>
                <th className="p-3 text-center">전체</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.slice(0, 10).map((student) => {
                // 더미 데이터 생성
                const lecture = Math.floor(Math.random() * 40) + 60;
                const activity = Math.floor(Math.random() * 50) + 50;
                const aiChat = Math.floor(Math.random() * 60) + 40;
                const library = Math.floor(Math.random() * 50) + 50;
                const total = Math.floor((lecture + activity + aiChat + library) / 4);

                const getStatusIcon = (rate: number) => {
                  if (rate >= 80) return '✅';
                  if (rate >= 50) return '🔄';
                  return '⬜';
                };

                const getStatusColor = (rate: number) => {
                  if (rate >= 80) return 'text-green-600';
                  if (rate >= 50) return 'text-yellow-600';
                  return 'text-gray-400';
                };

                return (
                  <tr key={student.student_id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{student.name}</td>
                    <td className={`p-3 text-center ${getStatusColor(lecture)}`}>
                      {getStatusIcon(lecture)} {lecture}%
                    </td>
                    <td className={`p-3 text-center ${getStatusColor(activity)}`}>
                      {getStatusIcon(activity)} {activity}%
                    </td>
                    <td className={`p-3 text-center ${getStatusColor(aiChat)}`}>
                      {getStatusIcon(aiChat)} {aiChat}%
                    </td>
                    <td className={`p-3 text-center ${getStatusColor(library)}`}>
                      {getStatusIcon(library)} {library}%
                    </td>
                    <td className="p-3 text-center font-bold">{total}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTypeView;
