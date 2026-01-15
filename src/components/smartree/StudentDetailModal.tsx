import React from 'react';
import { StudentDetail } from '../../data/dummyStudentData';
import { DOMAIN_CONFIG } from '../../data/curriculumLevels';

interface StudentDetailModalProps {
  student: StudentDetail;
  isOpen: boolean;
  onClose: () => void;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* 모달 본체 */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        {/* 헤더 */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{student.name} 학습 현황</h2>
            <p className="text-sm text-gray-500">
              현재 레벨: {student.currentLevel} · {student.currentDomain} Unit {student.currentUnit}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* 1. 통계 카드 */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              icon={
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="총 학습 시간"
              value={`${Math.floor(student.stats.totalLearningTime / 60)}시간 ${student.stats.totalLearningTime % 60}분`}
            />
            <StatCard
              icon={
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="평균 정답률"
              value={`${student.stats.averageAccuracy}%`}
            />
            <StatCard
              icon={
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              label="완료한 레벨"
              value={`${student.stats.completedLevels}개`}
            />
            <StatCard
              icon={
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              label="연속 학습일"
              value={`${student.stats.streakDays}일`}
            />
          </div>
          
          {/* 2. 영역별 학습 완료 현황 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📊 영역별 학습 현황
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {student.domainProgress.map((dp) => {
                const config = DOMAIN_CONFIG[dp.domain];
                const progressPercent = Math.round((dp.completedUnits / dp.totalUnits) * 100);
                
                return (
                  <div
                    key={dp.domain}
                    className={`p-4 rounded-lg ${config.bgColor} border`}
                  >
                    <div className="text-2xl mb-1">{config.icon}</div>
                    <div className={`font-medium ${config.color}`}>{dp.domain}</div>
                    <div className="text-2xl font-bold text-gray-800 mt-2">
                      {progressPercent}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {dp.completedUnits}/{dp.totalUnits} 단원 완료
                    </div>
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-current rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      정답률 {dp.averageAccuracy}%
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          
          {/* 3. 최근 학습 이력 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              📅 최근 학습 이력
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">날짜</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">레벨</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">영역</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">단원</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">소요 시간</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-600">정답률</th>
                  </tr>
                </thead>
                <tbody>
                  {student.recentHistory.map((history, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm">{history.date}</td>
                      <td className="px-4 py-3 text-sm font-medium">{history.levelCode}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${DOMAIN_CONFIG[history.domain].bgColor} ${DOMAIN_CONFIG[history.domain].color}`}>
                          {DOMAIN_CONFIG[history.domain].icon} {history.domain}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">Unit {history.unitNumber}</td>
                      <td className="px-4 py-3 text-sm text-right">{history.duration}분</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className={`font-medium ${history.accuracy >= 80 ? 'text-green-600' : history.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {history.accuracy}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          
          {/* 4. 약점 영역 분석 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              약점 영역 분석
            </h3>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-4">
                {student.weakDomains.map((domain) => (
                  <div
                    key={domain}
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-amber-300"
                  >
                    <span className="text-xl">{DOMAIN_CONFIG[domain].icon}</span>
                    <span className="font-medium text-amber-800">{domain}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-amber-700">
                위 영역들의 정답률이 상대적으로 낮습니다. 집중 학습을 권장합니다.
              </p>
            </div>
          </section>
          
          {/* 5. 추천 다음 학습 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🎯 추천 다음 학습
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{DOMAIN_CONFIG[student.recommendedNext.domain].icon}</span>
                  <span className="font-bold text-lg text-blue-800">
                    {student.recommendedNext.levelCode} - {student.recommendedNext.domain} Unit {student.recommendedNext.unitNumber}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-1">{student.recommendedNext.reason}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                미션 배정하기
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// 통계 카드 서브컴포넌트
const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="bg-gray-50 rounded-lg p-4 border">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <div className="text-xl font-bold text-gray-800">{value}</div>
  </div>
);

export default StudentDetailModal;
