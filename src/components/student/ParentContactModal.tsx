import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { ParentContact, NotificationSettings } from '../../types/parent';

interface Props {
  studentId: number;
  studentName: string;
  initialContact?: ParentContact;
  initialSettings?: NotificationSettings;
  onSave: (contact: ParentContact, settings: NotificationSettings) => void;
  onClose: () => void;
}

const ParentContactModal: React.FC<Props> = ({
  studentId,
  studentName,
  initialContact,
  initialSettings,
  onSave,
  onClose
}) => {
  const [contact, setContact] = useState<ParentContact>(initialContact || {
    studentId,
    parentName: '',
    phone: '',
    kakaoId: '',
    email: '',
    preferredMethod: 'kakao'
  });

  const [settings, setSettings] = useState<NotificationSettings>(initialSettings || {
    studentId,
    enabled: true,
    events: {
      dailyReport: false,
      weeklyReport: true,
      missionComplete: true,
      lowProgress: true,
      levelUp: true
    },
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  const [activeTab, setActiveTab] = useState<'contact' | 'settings'>('contact');

  const handleSave = () => {
    // 로컬스토리지에 임시 저장
    const key = `parent-contact-${studentId}`;
    localStorage.setItem(key, JSON.stringify({ contact, settings }));
    onSave(contact, settings);
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-5">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">👨‍👩‍👧 학부모 연락처 설정</h3>
              <p className="text-sm text-green-100">{studentName} 학생</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-xl">✕</button>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'contact' 
                ? 'text-green-600 border-b-2 border-green-500' 
                : 'text-gray-500'
            }`}
          >
            📱 연락처 정보
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'settings' 
                ? 'text-green-600 border-b-2 border-green-500' 
                : 'text-gray-500'
            }`}
          >
            🔔 알림 설정
          </button>
        </div>

        <div className="p-5">
          {activeTab === 'contact' ? (
            /* 연락처 입력 */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  학부모 성함 *
                </label>
                <input
                  type="text"
                  value={contact.parentName}
                  onChange={(e) => setContact({...contact, parentName: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  휴대폰 번호 *
                </label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({...contact, phone: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="010-1234-5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카카오톡 ID (선택)
                </label>
                <input
                  type="text"
                  value={contact.kakaoId || ''}
                  onChange={(e) => setContact({...contact, kakaoId: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="카카오톡 ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  선호 연락 방법
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'kakao', label: '💬 카카오톡', color: 'yellow' },
                    { value: 'sms', label: '📱 문자', color: 'blue' },
                    { value: 'email', label: '📧 이메일', color: 'gray' },
                  ].map((method) => (
                    <button
                      key={method.value}
                      onClick={() => setContact({...contact, preferredMethod: method.value as any})}
                      className={`flex-1 p-2 text-sm rounded-lg border-2 transition-all ${
                        contact.preferredMethod === method.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* 알림 설정 */
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">알림 활성화</span>
                <button
                  onClick={() => setSettings({...settings, enabled: !settings.enabled})}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.enabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">알림 받을 이벤트</p>
                {[
                  { key: 'weeklyReport', label: '📊 주간 학습 리포트', desc: '매주 월요일 발송' },
                  { key: 'missionComplete', label: '✅ 미션 완료', desc: '미션 완료 시 즉시 알림' },
                  { key: 'lowProgress', label: '⚠️ 학습 부진 알림', desc: '진행률 50% 미만 시' },
                  { key: 'levelUp', label: '🎉 레벨업 축하', desc: '레벨 상승 시 알림' },
                ].map((event) => (
                  <div 
                    key={event.key}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{event.label}</p>
                      <p className="text-xs text-gray-400">{event.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.events[event.key as keyof typeof settings.events]}
                      onChange={(e) => setSettings({
                        ...settings,
                        events: {...settings.events, [event.key]: e.target.checked}
                      })}
                      className="w-5 h-5 text-green-500 rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">🌙 방해금지 시간</span>
                  <input
                    type="checkbox"
                    checked={settings.quietHours.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      quietHours: {...settings.quietHours, enabled: e.target.checked}
                    })}
                    className="w-5 h-5 text-yellow-500 rounded"
                  />
                </div>
                {settings.quietHours.enabled && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="time"
                      value={settings.quietHours.start}
                      onChange={(e) => setSettings({
                        ...settings,
                        quietHours: {...settings.quietHours, start: e.target.value}
                      })}
                      className="p-1 border rounded"
                    />
                    <span>~</span>
                    <input
                      type="time"
                      value={settings.quietHours.end}
                      onChange={(e) => setSettings({
                        ...settings,
                        quietHours: {...settings.quietHours, end: e.target.value}
                      })}
                      className="p-1 border rounded"
                    />
                    <span className="text-gray-400">알림 차단</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 버튼 */}
        <div className="p-5 bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!contact.parentName || !contact.phone}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ParentContactModal;
