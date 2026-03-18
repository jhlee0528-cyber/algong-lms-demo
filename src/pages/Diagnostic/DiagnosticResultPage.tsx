// 진단테스트 결과 페이지
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import DiagnosticResultCard from '../../components/diagnostic/DiagnosticResultCard';
import ParentReportCard from '../../components/diagnostic/ParentReportCard';

const DiagnosticResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { students } = useDemoStore();
  const [teacherComment, setTeacherComment] = useState('');

  const student = students.find(s => s.id === id);

  if (!student || !student.diagnosticResult) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">진단 결과를 찾을 수 없습니다</h2>
          <button
            onClick={() => navigate('/students')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            학생 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 기본 코멘트 생성
  const defaultComment = `${student.name}가 지난 2개월 동안 정말 열심히 했습니다. 특히 어휘력과 독해력이 눈에 띄게 향상되었어요. 추론 능력을 더 키우면 상위 10% 진입도 가능합니다. 화이팅!`;

  const handleSend = () => {
    console.log('Sending diagnostic report to parent...');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(`/students/${student.id}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{student.name} 학생 상세로 돌아가기</span>
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            🎯 ArLex 진단테스트 결과
          </h1>
          <p className="text-gray-600">{student.name} (초{student.grade}) - {student.diagnosticResult.level}</p>
        </div>
      </div>

      {/* 메인 그리드 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽: 원장님용 결과 */}
        <DiagnosticResultCard
          result={student.diagnosticResult}
          studentName={student.name}
          grade={student.grade}
        />

        {/* 오른쪽: 학부모용 리포트 */}
        <div className="space-y-6">
          {/* 코멘트 입력 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">✍️ 원장님 코멘트 작성</h3>
            <textarea
              value={teacherComment || defaultComment}
              onChange={(e) => setTeacherComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="학부모에게 전달할 코멘트를 작성하세요..."
            />
            <p className="mt-2 text-xs text-gray-500">
              💡 AI가 생성한 기본 코멘트를 수정할 수 있습니다
            </p>
          </div>

          {/* 학부모용 리포트 */}
          <ParentReportCard
            result={student.diagnosticResult}
            studentName={student.name}
            grade={student.grade}
            teacherComment={teacherComment || defaultComment}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResultPage;
