/**
 * AI코비 알림 영역 컴포넌트
 * 오늘의 알림 표시
 */

import React from 'react';
import { todayAlerts } from '../../data/aiCobyResponses';

const AICobyAlerts: React.FC = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span>📌</span>
        <span>오늘의 알림</span>
      </h3>

      <div className="space-y-2">
        {todayAlerts.map((alert, index) => {
          const bgColor =
            alert.priority === 'high'
              ? 'bg-red-50 border-red-200'
              : alert.priority === 'medium'
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-gray-50 border-gray-200';

          return (
            <div
              key={index}
              className={`flex items-center gap-2 p-2.5 rounded-lg border ${bgColor} text-sm`}
            >
              <span>{alert.icon}</span>
              <span className="text-gray-700">{alert.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AICobyAlerts;
