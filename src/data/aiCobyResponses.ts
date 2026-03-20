/**
 * AI코비 키워드 응답 매핑 데이터
 * 원장님 입력 → 선택안 제시
 */

export interface CobyOption {
  icon: string;
  title: string;
  description: string;
  navigateTo: string; // 클릭 시 이동할 경로
}

export interface CobyResponse {
  message: string;
  alert?: string; // 경고/알림 메시지 (있으면 표시)
  options: CobyOption[];
}

// 키워드 → 응답 매핑
export const keywordMap: Record<string, CobyResponse> = {
  '채점': {
    message: '채점과 관련해서 도와드릴게요!',
    options: [
      {
        icon: '📸',
        title: '빠른 채점하기',
        description: '워크시트를 선택해서 AI 자동 채점',
        navigateTo: '/grading/quick',
      },
      {
        icon: '📋',
        title: '채점 결과 확인',
        description: '이전에 채점한 결과 목록 보기',
        navigateTo: '/grading/quick',
      },
      {
        icon: '📊',
        title: '학생별 오답 분석',
        description: '자주 틀리는 유형 분석 보기',
        navigateTo: '/students',
      },
    ],
  },
  '학부모': {
    message: '학부모 소통 관련 안내드릴게요!',
    alert: '📬 발송 대기 중인 리포트: 8건',
    options: [
      {
        icon: '📨',
        title: '주간 리포트 발송하기',
        description: '대기 중인 8건 미리보기 후 발송',
        navigateTo: '/reports/communication',
      },
      {
        icon: '📝',
        title: '개별 메시지 보내기',
        description: '특정 학생 학부모에게 직접 메시지',
        navigateTo: '/reports/communication',
      },
    ],
  },
  '출석': {
    message: '출석 현황을 안내드릴게요!',
    alert: '✅ 오늘 출석: 12/15명 (미출석: 박지우, 한지민, 홍길동)',
    options: [
      {
        icon: '📋',
        title: '오늘 출석 현황 보기',
        description: '전체 학생 출석 상태 확인',
        navigateTo: '/class-view',
      },
      {
        icon: '📞',
        title: '미출석 학부모 연락',
        description: '미출석 3명 학부모에게 알림',
        navigateTo: '/reports/communication',
      },
    ],
  },
  '진도': {
    message: '학생 진도 현황을 안내드릴게요!',
    alert: '🟡 이번 주 진도 미달 학생: 2명',
    options: [
      {
        icon: '📊',
        title: '전체 진도 현황',
        description: '학생별 주간 학습 진행률 확인',
        navigateTo: '/learning-status',
      },
      {
        icon: '⚠️',
        title: '진도 미달 학생 보기',
        description: '주의 필요 학생 2명 상세 확인',
        navigateTo: '/students',
      },
      {
        icon: '📝',
        title: '학습 설정 변경',
        description: '레벨/과목 재설정',
        navigateTo: '/learning-settings',
      },
    ],
  },
  '문제': {
    message: '문제 만들기를 도와드릴게요!',
    options: [
      {
        icon: '⭐',
        title: 'AI 문제 만들기',
        description: '학생 맞춤 문제 자동 생성',
        navigateTo: '/smartree',
      },
      {
        icon: '🔤',
        title: '파닉스 연습문제',
        description: '파닉스 관련 문제 만들기',
        navigateTo: '/smartree',
      },
    ],
  },
  '설정': {
    message: '설정 관련 안내드릴게요!',
    options: [
      {
        icon: '📚',
        title: '학습 설정',
        description: '과목/레벨 설정 변경',
        navigateTo: '/learning-settings',
      },
      {
        icon: '👥',
        title: '학생 관리',
        description: '학생 목록 및 정보 관리',
        navigateTo: '/students',
      },
    ],
  },
  '리포트': {
    message: '학부모 소통 관련 안내드릴게요!',
    alert: '📬 발송 대기 중인 리포트: 8건',
    options: [
      {
        icon: '📨',
        title: '주간 리포트 발송하기',
        description: '대기 중인 8건 미리보기 후 발송',
        navigateTo: '/reports/communication',
      },
      {
        icon: '📝',
        title: '개별 메시지 보내기',
        description: '특정 학생 학부모에게 직접 메시지',
        navigateTo: '/reports/communication',
      },
    ],
  },
};

// 학생 이름으로 검색 (mockStudents 15명 이름)
export const studentNames = [
  '김민지', '이서준', '박지우', '최서연', '정현우',
  '강소영', '윤도현', '임수진', '한지훈', '오나은',
  '신동욱', '배미래', '조성민', '홍예린', '송태현',
];

// 학생 이름 입력 시 응답 생성 함수
export const getStudentResponse = (studentName: string): CobyResponse | null => {
  if (!studentNames.includes(studentName)) {
    return null;
  }

  // 더미: 일부 학생은 주의 필요 상태로 설정
  const warningStudents = ['박지우', '오나은', '홍예린'];
  const isWarning = warningStudents.includes(studentName);

  return {
    message: `${studentName} 학생에 대해 안내해 드릴게요!`,
    alert: isWarning ? `⚠️ 3일 연속 미접속 상태입니다.` : undefined,
    options: [
      {
        icon: '👤',
        title: `${studentName} 학생 상세보기`,
        description: '학습현황, 출결, 진도 한눈에 보기',
        navigateTo: '/students',
      },
      {
        icon: '📨',
        title: '학부모에게 연락하기',
        description: isWarning ? '미접속 안내 메시지 발송' : '학습 현황 알림',
        navigateTo: '/reports/communication',
      },
      {
        icon: '📝',
        title: '출석 기록 확인',
        description: '최근 30일 출석 현황 보기',
        navigateTo: '/class-view',
      },
    ],
  };
};

// 기본 응답 (매칭 안 될 때)
export const defaultResponse: CobyResponse = {
  message: '무엇을 도와드릴까요? 아래에서 선택하시거나 다시 입력해 주세요.',
  options: [
    {
      icon: '📊',
      title: '학습현황 요약',
      description: '오늘의 전체 현황 한눈에 보기',
      navigateTo: '/learning-status',
    },
    {
      icon: '📸',
      title: '빠른 채점',
      description: '워크시트 AI 자동 채점',
      navigateTo: '/grading/quick',
    },
    {
      icon: '📨',
      title: '학부모 알림',
      description: '주간 리포트 발송',
      navigateTo: '/reports/communication',
    },
    {
      icon: '👥',
      title: '학생 검색',
      description: '학생 정보 찾기',
      navigateTo: '/students',
    },
  ],
};

// 오늘의 알림 (더미 데이터)
export const todayAlerts = [
  { icon: '🔴', text: '박지우 3일 미접속', priority: 'high' },
  { icon: '🟡', text: '진도 미달 2명', priority: 'medium' },
  { icon: '💰', text: '김철수 미납 D+15', priority: 'medium' },
  { icon: '✅', text: '출석 12/15명', priority: 'normal' },
];

// 자주 쓰는 요청 (quickActions)
export const quickActions = [
  { icon: '📊', text: '학습현황 요약', navigateTo: '/learning-status' },
  { icon: '📝', text: '채점하기', navigateTo: '/grading/quick' },
  { icon: '📨', text: '학부모 알림 보내기', navigateTo: '/reports/communication' },
  { icon: '🔍', text: '학생 검색', navigateTo: '/students' },
];
