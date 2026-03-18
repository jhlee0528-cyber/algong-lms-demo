// 진단테스트 결과 카드 (원장님용)
import React from 'react';
import { DiagnosticResult } from '../../data/mockStudents';

interface DiagnosticResultCardProps {
  result: DiagnosticResult;
  studentName: string;
  grade: number;
}

const DiagnosticResultCard: React.FC<DiagnosticResultCardProps> = ({
  result,
  studentName,
  grade
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 진단테스트 결과</h2>

      {/* 학생 정보 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{studentName} (초{grade})</h3>
        <p className="text-sm text-gray-600">
          진단일: {new Date(result.testDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* 렉사일 레벨 */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-600 mb-2">🎯 렉사일 레벨</p>
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-4xl font-bold text-purple-700">{result.level}</span>
          {result.previousLevel && (
            <span className="text-lg text-gray-600">
              (이전: {result.previousLevel} ▲ 1레벨)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 p-3 bg-white bg-opacity-60 rounded-lg">
          <span className="text-sm text-gray-700">전국 초{grade} 평균: Lv.{13 + (grade - 5)}</span>
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="font-semibold text-purple-700">상위 {result.nationalRank}% 수준입니다! 🎉</span>
        </div>
      </div>

      {/* 영역별 분석 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">📈 영역별 분석</h4>
        <div className="space-y-3">
          {[
            { name: '어휘력', score: result.vocabulary, color: 'bg-blue-500' },
            { name: '독해력', score: result.reading, color: 'bg-green-500' },
            { name: '추론력', score: result.reasoning, color: 'bg-purple-500' },
            { name: '속도', score: result.speed, color: 'bg-yellow-500' }
          ].map(area => (
            <div key={area.name}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-700">{area.name}</span>
                <span className="font-semibold text-gray-800">{area.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${area.color} h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${area.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 약점 영역 */}
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            💡 <strong>추론력 향상이 필요합니다</strong> (상대적으로 낮은 점수)
          </p>
        </div>
      </div>

      {/* 다음 학습 추천 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">🎯 다음 학습 추천</h4>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• ArLex {result.level} 교재로 진행</li>
          <li>• 추론 문제 집중 연습 (주 2회)</li>
          <li>• 다음 진단 권장: 2개월 후</li>
        </ul>
      </div>

      {/* 액션 버튼 */}
      <div className="grid grid-cols-2 gap-3">
        <button className="py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          결과 다운로드
        </button>
        <button className="py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          학부모용 리포트 생성
        </button>
      </div>
    </div>
  );
};

export default DiagnosticResultCard;
