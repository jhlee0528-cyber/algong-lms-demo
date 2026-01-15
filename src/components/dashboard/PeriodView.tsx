import React, { useState } from 'react';
import type { PeriodFilter, PeriodStats } from '../../types/learningView';
import type { StudentWithStats } from '../progress/StudentListTable';

interface Props {
  students: StudentWithStats[];
}

const PeriodView: React.FC<Props> = ({ students }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>('thisWeek');

  const periodOptions: { id: PeriodFilter; label: string }[] = [
    { id: 'thisWeek', label: '이번 주' },
    { id: 'lastMonth', label: '지난 1개월' },
    { id: 'last3Months', label: '지난 3개월' },
    { id: 'all', label: '전체' },
  ];

  // 주차별 통계 (더미 데이터)
  const weeklyStats: PeriodStats[] = [
    { period: '이번 주', completionRate: 75, totalCompleted: 120, avgStudyTime: 48, changeFromPrevious: 7 },
    { period: '지난 주', completionRate: 68, totalCompleted: 108, avgStudyTime: 42, changeFromPrevious: 6 },
    { period: '2주 전', completionRate: 62, totalCompleted: 96, avgStudyTime: 38, changeFromPrevious: 4 },
    { period: '3주 전', completionRate: 58, totalCompleted: 88, avgStudyTime: 35, changeFromPrevious: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* 기간 선택 */}
      <div className="flex gap-2">
        {periodOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedPeriod(option.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedPeriod === option.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* 주차별 비교 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {weeklyStats.map((stat, idx) => (
          <div 
            key={stat.period}
            className={`rounded-xl p-5 ${idx === 0 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white border'}`}
          >
            <h4 className="text-sm text-gray-500 mb-1">{stat.period}</h4>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {stat.completionRate}%
            </div>
            {stat.changeFromPrevious > 0 && (
              <div className="text-sm text-green-600">
                ▲ +{stat.changeFromPrevious}%p
              </div>
            )}
            {stat.changeFromPrevious === 0 && idx > 0 && (
              <div className="text-sm text-gray-400">
                ─ 기준
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 추이 그래프 (간단 버전) */}
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <h3 className="font-bold text-gray-800 mb-4">📈 학습 완료율 추이</h3>
        <div className="h-48 flex items-end justify-around gap-4 px-4">
          {weeklyStats.slice().reverse().map((stat) => (
            <div key={stat.period} className="flex flex-col items-center flex-1">
              <div className="text-sm font-medium mb-2">{stat.completionRate}%</div>
              <div 
                className="w-full bg-blue-500 rounded-t-lg transition-all"
                style={{ height: `${stat.completionRate * 1.5}px` }}
              />
              <div className="text-xs text-gray-500 mt-2 text-center">
                {stat.period}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 기간 내 성과 요약 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
        <h3 className="font-bold text-gray-800 mb-4">🏆 기간 내 성과</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500">총 학습 완료</div>
            <div className="text-2xl font-bold text-blue-600">480건</div>
            <div className="text-xs text-gray-400">일평균 68건</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500">최고 활동일</div>
            <div className="text-lg font-bold text-green-600">1월 13일 (월)</div>
            <div className="text-xs text-gray-400">92건 완료</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500">레벨업 학생</div>
            <div className="text-2xl font-bold text-purple-600">3명</div>
            <div className="text-xs text-gray-400">김민수, 박준호, 최서연</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500">평균 학습시간</div>
            <div className="text-2xl font-bold text-orange-600">45분</div>
            <div className="text-xs text-gray-400">일평균</div>
          </div>
        </div>
      </div>

      {/* 학생별 기간 내 활동 */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-bold text-gray-800">👨‍🎓 학생별 기간 내 활동</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="p-3 text-left">학생명</th>
                <th className="p-3 text-center">완료 건수</th>
                <th className="p-3 text-center">학습 시간</th>
                <th className="p-3 text-center">정답률</th>
                <th className="p-3 text-center">추이</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.slice(0, 10).map((student) => {
                const completed = Math.floor(Math.random() * 20) + 10;
                const hours = Math.floor(Math.random() * 5) + 2;
                const accuracy = Math.floor(Math.random() * 25) + 70;
                const trends = ['▲ 상승', '─ 유지', '▼ 하락'];
                const trendColors = ['text-green-600', 'text-gray-500', 'text-red-500'];
                const trendIdx = Math.floor(Math.random() * 3);

                return (
                  <tr key={student.student_id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{student.name}</td>
                    <td className="p-3 text-center">{completed}건</td>
                    <td className="p-3 text-center">{hours}시간</td>
                    <td className="p-3 text-center">{accuracy}%</td>
                    <td className={`p-3 text-center ${trendColors[trendIdx]}`}>
                      {trends[trendIdx]}
                    </td>
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

export default PeriodView;
