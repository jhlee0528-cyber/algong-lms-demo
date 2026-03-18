// 과목별 학습 현황 컴포넌트
import React from 'react';
import { StudentSubject } from '../../data/mockStudents';

interface SubjectProgressProps {
  subjects: StudentSubject[];
}

const SubjectProgress: React.FC<SubjectProgressProps> = ({ subjects }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 과목별 학습 현황</h3>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            {/* 과목명 + 레벨 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {subject.subjectName.includes('영어') ? '🇬🇧' : '🧮'}
                </span>
                <span className="font-semibold text-gray-800">{subject.subjectName}</span>
              </div>
              <span className="text-sm font-medium text-blue-600">{subject.currentLevel}</span>
            </div>

            {/* 진행률 바 */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>진행률</span>
                <span className="font-semibold">{subject.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </div>

            {/* 세부 정보 */}
            <div className="grid grid-cols-2 gap-4 mt-3">
              {/* 최근 점수 */}
              {subject.recentScore !== undefined && (
                <div className="text-sm">
                  <p className="text-gray-500 mb-1">최근 점수</p>
                  <p className="font-semibold text-gray-800">{subject.recentScore}점</p>
                </div>
              )}

              {/* 시작일 */}
              <div className="text-sm">
                <p className="text-gray-500 mb-1">시작일</p>
                <p className="font-semibold text-gray-800">
                  {new Date(subject.startDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* 약점 영역 */}
            {subject.weakPoints && subject.weakPoints.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">약점 영역</p>
                <div className="flex flex-wrap gap-1">
                  {subject.weakPoints.map((point, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 진행 상태 메시지 */}
            <div className="mt-3">
              {subject.progress >= 80 ? (
                <p className="text-xs text-green-600">✅ 우수하게 진행 중입니다!</p>
              ) : subject.progress >= 50 ? (
                <p className="text-xs text-blue-600">📈 순조롭게 진행 중입니다.</p>
              ) : (
                <p className="text-xs text-yellow-600">⚠️ 진도가 조금 느립니다.</p>
              )}
            </div>
          </div>
        ))}

        {/* 과목 추가 버튼 */}
        <button className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors">
          + 과목 추가
        </button>
      </div>
    </div>
  );
};

export default SubjectProgress;
