// 학부모용 진단 리포트 (카카오톡 발송용)
import React from 'react';
import { DiagnosticResult } from '../../data/mockStudents';

interface ParentReportCardProps {
  result: DiagnosticResult;
  studentName: string;
  grade: number;
  teacherComment?: string;
  onSend?: () => void;
}

const ParentReportCard: React.FC<ParentReportCardProps> = ({
  result,
  studentName,
  grade,
  teacherComment,
  onSend
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">📱 학부모용 리포트 (카카오톡 발송용)</h2>

      {/* 카카오톡 UI */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-yellow-200">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-lg">💬</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">알공공부방</p>
            <p className="text-xs text-gray-500">카카오톡 알림톡</p>
          </div>
        </div>

        {/* 메시지 내용 */}
        <div className="bg-white rounded-lg p-4 mb-2">
          <div className="space-y-4 text-sm text-gray-800">
            <div>
              <p className="font-bold text-lg text-purple-700 mb-1">📊 ArLex 렉사일 진단테스트 결과</p>
              <p className="text-xs text-gray-600">
                {studentName} 학생 (초등 {grade}학년)
              </p>
              <p className="text-xs text-gray-500">
                진단일: {new Date(result.testDate).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '월',
                  day: '일'
                })}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <p className="font-semibold mb-2">🎉 축하합니다!</p>
              <p>{studentName}의 영어 읽기 능력이 향상되었습니다!</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">현재 레벨</span>
                <span className="font-bold text-purple-700">{result.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">전국 초{grade} 평균 대비</span>
                <span className="font-bold text-purple-700">상위 {result.nationalRank}%</span>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2 text-xs text-gray-600">[레벨 변화 그래프]</p>
              <div className="flex items-end gap-2 mb-2">
                <div className="flex-1 bg-purple-200 rounded-t h-12 flex items-center justify-center text-xs">
                  Lv.12
                </div>
                <div className="flex-1 bg-purple-300 rounded-t h-16 flex items-center justify-center text-xs">
                  Lv.14
                </div>
                <div className="flex-1 bg-purple-500 rounded-t h-20 flex items-center justify-center text-xs text-white font-bold">
                  Lv.{result.level.replace('Lv.', '')}
                </div>
              </div>
              <p className="text-center text-xs text-gray-600">▲▲▲ 꾸준히 성장하고 있어요!</p>
            </div>

            {teacherComment && (
              <div className="border-t border-gray-100 pt-3">
                <p className="font-semibold mb-1 text-xs text-gray-600">💬 정혜진 원장님 코멘트:</p>
                <p className="text-gray-700">{teacherComment}</p>
              </div>
            )}

            <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
              - 정혜진 원장 010-1234-5678
            </div>
          </div>
        </div>

        {/* 타임스탬프 */}
        <div className="text-right">
          <span className="text-xs text-gray-400">
            {new Date().toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      {/* 발송 버튼 */}
      {onSend && (
        <button
          onClick={() => {
            onSend();
            alert('✅ 학부모에게 진단 리포트가 발송되었습니다! (데모)');
          }}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          발송하기
        </button>
      )}
    </div>
  );
};

export default ParentReportCard;
