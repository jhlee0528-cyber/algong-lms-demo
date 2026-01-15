/**
 * 도움말 모달 컴포넌트
 * 이용가이드, 문의하기
 */

import React, { useState } from 'react';

interface HelpModalProps {
  onClose: () => void;
}

type HelpTab = 'guide' | 'contact';

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<HelpTab>('guide');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: 실제 API 호출
      console.log('문의하기:', contactForm);
      alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('문의하기 실패:', error);
      alert('문의 접수에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadGuide = () => {
    // TODO: 실제 이용가이드 PDF 다운로드
    alert('이용가이드 다운로드 기능은 준비 중입니다.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">도움말</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* 탭 메뉴 */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'guide'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              이용가이드
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'contact'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              문의하기
            </button>
          </nav>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="p-6">
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  알공스마트리 LMS 이용가이드
                </h3>
                
                {/* FAQ 섹션 */}
                <div className="space-y-6">
                  {/* 시작하기 */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      🚀 시작하기
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">알공스마트리 LMS란?</p>
                        <p className="text-sm text-gray-600">
                          공부방 환경에 최적화된 학습 관리 시스템입니다. 학생들의 SMARTree 학습 진행을 추적하고 관리할 수 있습니다.
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">처음 사용하는데 어떻게 해야 하나요?</p>
                        <p className="text-sm text-gray-600">
                          학습현황 페이지에서 커리큘럼(Phonics/Reading 등)을 선택하고, 단원을 선택하면 학생들의 진행 현황을 볼 수 있습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 대시보드 사용법 */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      📊 대시보드 사용법
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">주간 통계는 어떻게 보나요?</p>
                        <p className="text-sm text-gray-600">
                          "이번 주" / "지난 주" 버튼을 클릭하여 주간 데이터를 전환할 수 있습니다.
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">학생 상태 분류 기준은?</p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          우수: 달성률(학습 진행률+미션 진행률 평균) 100%, 정답률 90% 이상{'\n'}
                          정상: 달성률 70-99%, 정답률 70-89%{'\n'}
                          주의: 달성률 50-69%, 정답률 50-69%{'\n'}
                          미흡: 달성률 50% 미만 또는 정답률 50% 미만
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 학생 관리 */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      👨‍🎓 학생 관리
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">학생 상세 정보는 어디서 보나요?</p>
                        <p className="text-sm text-gray-600">
                          학생 목록에서 "More" 버튼을 클릭하면 상세 모달이 열립니다. 보석, 코인, 게임 미션 진행도를 확인할 수 있습니다.
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">ArLex 레벨이란?</p>
                        <p className="text-sm text-gray-600">
                          SA1~AB6까지 36단계로 구성된 레벨 시스템입니다. SA(Spark A), SB(Spark B), MA(Motivate A), MB(Motivate B), AA(Activate A), AB(Activate B)로 구분됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 커리큘럼 */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      📚 커리큘럼
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">어떤 커리큘럼이 있나요?</p>
                        <p className="text-sm text-gray-600">
                          Phonics(파닉스), Reading(리딩), Grammar(문법), Writing(쓰기) 4개 영역이 있습니다.
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">단원은 어떻게 구성되어 있나요?</p>
                        <p className="text-sm text-gray-600">
                          각 커리큘럼마다 여러 단원이 있고, 각 단원에는 강의듣기, 액티비티, AI대화, 영어도서관 과제가 포함됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 과제 유형 */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      📝 과제 유형
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">과제 유형별 차이점은?</p>
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          강의듣기: 1~6차시 영상 학습{'\n'}
                          액티비티: 듣기/읽기/말하기/쓰기 활동{'\n'}
                          AI대화: 교과서 기반 AI 대화 연습{'\n'}
                          영어도서관: 도서 읽기 + 독후 퀴즈
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm text-gray-800 mb-1">과제 완료 기준은?</p>
                        <p className="text-sm text-gray-600">
                          각 과제 유형별로 정해진 활동을 모두 수행하면 완료 처리됩니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 기본 가이드 */}
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      📖 기본 기능
                    </h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div>
                        <h5 className="font-semibold mb-2">1. 학습현황</h5>
                        <p className="text-gray-600">
                          학생들의 학습 진행 상황을 단원별, 과제유형별, 기간별로 확인할 수 있습니다.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">2. 학습설정</h5>
                        <p className="text-gray-600">
                          과제 미션을 생성하고 학생들에게 할당할 수 있습니다. 4가지 과제 유형(강의듣기, 액티비티, AI 대화, 영어도서관)을 선택할 수 있습니다.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">3. 수업보기</h5>
                        <p className="text-gray-600">
                          학생들의 실시간 접속 및 학습 상태를 모니터링할 수 있습니다.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-2">4. 스마트리</h5>
                        <p className="text-gray-600">
                          40개 단원의 학습 콘텐츠와 리뷰 테스트를 제공합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleDownloadGuide}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    이용 가이드 다운로드
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문의 내용
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  {loading ? '전송 중...' : '문의하기'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
