// 학부모 소통 메인 페이지
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import { getPendingReports } from '../../data/mockReports';
import WeeklyReportPreview from '../../components/reports/WeeklyReportPreview';
import SendModal from '../../components/reports/SendModal';

const ParentCommunicationPage: React.FC = () => {
  const navigate = useNavigate();
  const { weeklyReports, sendWeeklyReport } = useDemoStore();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  const pendingReports = getPendingReports();
  const selectedReport = selectedReportId
    ? weeklyReports.find(r => r.id === selectedReportId)
    : null;

  // 전체 발송
  const handleSendAll = () => {
    const count = pendingReports.length;
    pendingReports.forEach(report => {
      sendWeeklyReport(report.id);
    });
    setSentCount(count);
    setShowSendModal(true);
    setSelectedReportId(null);
  };

  // 개별 발송
  const handleSendOne = (reportId: string) => {
    sendWeeklyReport(reportId);
    setSentCount(1);
    setShowSendModal(true);
    setSelectedReportId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* 헤더 */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>대시보드로 돌아가기</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">📬 학부모 소통</h1>
            <p className="text-gray-600">주간 학습 리포트 관리</p>
          </div>
          {pendingReports.length > 0 && (
            <button
              onClick={handleSendAll}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              전체 발송 ({pendingReports.length}명)
            </button>
          )}
        </div>
      </div>

      {/* 메인 그리드 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽: 발송 대기 목록 */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              발송 대기 중 ({pendingReports.length}명)
            </h2>

            {pendingReports.length > 0 ? (
              <div className="space-y-3">
                {pendingReports.map(report => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReportId(report.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedReportId === report.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{report.studentName}</h3>
                        <p className="text-sm text-gray-600">
                          {report.parentName ? `${report.parentName} 학부모님` : '학부모님'}
                        </p>
                      </div>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        대기중
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>📅 {report.weekStart.substring(5)} ~ {report.weekEnd.substring(5)}</span>
                      <span>✅ 출석 {report.attendance.rate}%</span>
                    </div>

                    {/* 간단 미리보기 */}
                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600 line-clamp-2">
                      {report.teacherComment}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="mb-2">📭</p>
                <p>발송 대기 중인 리포트가 없습니다</p>
              </div>
            )}
          </div>

          {/* 새 메시지 작성 (미구현) */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">새 메시지 작성</h2>
            <button className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors">
              + 개별 메시지 작성하기
            </button>
          </div>
        </div>

        {/* 오른쪽: 미리보기 */}
        <div>
          {selectedReport ? (
            <WeeklyReportPreview
              report={selectedReport}
              onEdit={() => alert('수정 기능은 다음 버전에서 지원됩니다')}
              onSend={() => handleSendOne(selectedReport.id)}
            />
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center text-gray-400">
              <p className="text-4xl mb-4">👈</p>
              <p>왼쪽에서 리포트를 선택하면</p>
              <p>미리보기가 표시됩니다</p>
            </div>
          )}
        </div>
      </div>

      {/* 발송 완료 모달 */}
      <SendModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        sentCount={sentCount}
      />
    </div>
  );
};

export default ParentCommunicationPage;
