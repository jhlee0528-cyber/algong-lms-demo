export interface ParentContact {
  studentId: number;
  parentName: string;
  phone: string;
  kakaoId?: string;
  email?: string;
  preferredMethod: 'kakao' | 'sms' | 'email';
}

export interface NotificationSettings {
  studentId: number;
  enabled: boolean;
  events: {
    dailyReport: boolean;      // 일일 학습 리포트
    weeklyReport: boolean;     // 주간 학습 리포트
    missionComplete: boolean;  // 미션 완료 시
    lowProgress: boolean;      // 진행률 저조 시
    levelUp: boolean;          // 레벨업 시
  };
  quietHours: {
    enabled: boolean;
    start: string;  // "22:00"
    end: string;    // "08:00"
  };
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'mission' | 'alert' | 'levelup';
  template: string;  // 변수: {studentName}, {progress}, {accuracy}, {date}
}
