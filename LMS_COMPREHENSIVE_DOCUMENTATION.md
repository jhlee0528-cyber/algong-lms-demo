# 알공스마트리 LMS 종합 문서

## 📋 프로젝트 개요

**알공스마트리 LMS**는 공부방 환경에 최적화된 학습 관리 시스템입니다. 학생들의 학습 진행 상황을 추적하고, 미션을 할당하며, 다양한 학습 활동(강의듣기, 액티비티, AI 대화, 영어도서관)을 관리할 수 있습니다.

### 프로젝트 정보
- **프로젝트명**: 알공스마트리 LMS (공부방용)
- **버전**: 1.0.0
- **도메인**: argong.com
- **최종 업데이트**: 2026년 1월 15일

---

## 🛠 기술 스택

### Frontend
- **React 18.2.0** with **TypeScript 5.2.2**
- **Vite 5.0.8** (빌드 도구)
- **Tailwind CSS 3.3.6** (스타일링)
- **React Query (TanStack Query) 5.12.0** (서버 상태 관리)
- **React Router DOM 6.20.0** (라우팅)
- **Zustand 4.4.7** (클라이언트 상태 관리)
- **Axios 1.6.2** (HTTP 클라이언트)

### Backend (예정)
- Node.js + Express 또는 Next.js API Routes
- MySQL 또는 PostgreSQL

### 배포
- Vercel / Netlify 지원
- GitHub Actions CI/CD

---

## 📁 프로젝트 구조

```
LMS/
├── src/
│   ├── api/                    # API 클라이언트 및 엔드포인트
│   │   ├── client.ts          # Axios 기반 API 클라이언트
│   │   ├── missions.ts        # 미션 관련 API
│   │   ├── library.ts          # 영어도서관 API
│   │   ├── progress.ts         # 학습 진행도 API
│   │   ├── units.ts           # 단원 관리 API
│   │   ├── students.ts        # 학생 관리 API
│   │   ├── quiz.ts            # 퀴즈 API
│   │   ├── weekly.ts          # 주간 데이터 API
│   │   └── index.ts           # API 통합 export
│   │
│   ├── components/            # React 컴포넌트
│   │   ├── common/            # 공통 컴포넌트
│   │   │   ├── Header.tsx           # 헤더 (로고, 네비게이션, 설정)
│   │   │   ├── Layout.tsx           # 레이아웃 (사이드바 포함)
│   │   │   ├── Sidebar.tsx          # Notion 스타일 사이드바
│   │   │   ├── SettingsModal.tsx    # 설정 모달
│   │   │   ├── HelpModal.tsx        # 도움말 모달
│   │   │   ├── FeedbackButton.tsx   # 피드백 수집 버튼
│   │   │   ├── OnboardingTour.tsx   # 온보딩 투어
│   │   │   ├── ProgressBadge.tsx     # 진행 상태 뱃지
│   │   │   ├── StudentManagement.tsx # 학생 관리
│   │   │   └── index.ts             # export
│   │   │
│   │   ├── dashboard/         # 대시보드 컴포넌트
│   │   │   ├── DashboardStats.tsx      # 주간 통계
│   │   │   ├── ViewModeTabs.tsx        # 뷰 모드 탭
│   │   │   ├── TaskTypeView.tsx        # 과제유형별 뷰
│   │   │   ├── PeriodView.tsx          # 기간별 뷰
│   │   │   ├── StudentStatusBar.tsx     # 학생 상태 바
│   │   │   ├── StudentStatusPanel.tsx  # 학생 상태 패널
│   │   │   ├── SmartreeLevelDisplay.tsx # SMARTree 레벨 표시
│   │   │   └── index.ts                # export
│   │   │
│   │   ├── task/             # 과제 선택 컴포넌트
│   │   │   ├── TaskSelector.tsx         # 4개 과제 유형 메인 컨테이너
│   │   │   ├── LectureTaskCard.tsx      # 강의듣기 (1-6차시)
│   │   │   ├── ActivityTaskCard.tsx     # 액티비티 (듣기/읽기/말하기/쓰기)
│   │   │   ├── AiChatTaskCard.tsx       # AI 대화
│   │   │   ├── LibraryTaskCard.tsx      # 영어도서관
│   │   │   ├── LibraryBookSelector.tsx  # 도서 선택 모달
│   │   │   └── index.ts                 # export
│   │   │
│   │   ├── mission/          # 미션 관리
│   │   │   ├── MissionForm.tsx     # 미션 생성 폼 (8단계)
│   │   │   ├── MissionList.tsx      # 미션 목록
│   │   │   └── index.ts             # export
│   │   │
│   │   ├── progress/         # 학습 진행도
│   │   │   ├── StudentListTable.tsx     # 학생 목록 테이블
│   │   │   ├── StudentDetailModal.tsx   # 학생 상세 모달
│   │   │   ├── UnitProgressDetail.tsx   # 단원별 상세 진행도
│   │   │   ├── ProgressByType.tsx       # 과제 유형별 진행도
│   │   │   ├── LectureProgressDetail.tsx
│   │   │   ├── ActivityProgressDetail.tsx
│   │   │   ├── AiChatProgressDetail.tsx
│   │   │   ├── LibraryProgressDetail.tsx
│   │   │   ├── StudentProgressSummary.tsx
│   │   │   ├── StudentProgressTable.tsx
│   │   │   └── index.ts                 # export
│   │   │
│   │   ├── units/           # 단원 관리
│   │   │   ├── CurriculumSelector.tsx   # 커리큘럼 선택
│   │   │   ├── CurriculumModal.tsx      # 커리큘럼 PDF 뷰어
│   │   │   └── index.ts                 # export
│   │   │
│   │   ├── library/         # 영어도서관
│   │   │   ├── QuizComponent.tsx        # 독후 퀴즈
│   │   │   └── index.ts                 # export
│   │   │
│   │   ├── report/          # 리포트
│   │   │   ├── StudentProgressReport.tsx # AI 종합 학습 레포트
│   │   │   └── index.ts                 # export
│   │   │
│   │   ├── student/         # 학생 관련
│   │   │   └── ParentContactModal.tsx   # 부모 연락처 모달
│   │   │
│   │   ├── classroom/        # 수업보기 컴포넌트 (신규)
│   │   │   ├── StudentStatusBadge.tsx   # 학생 상태 뱃지
│   │   │   ├── LevelStudentPopover.tsx # 레벨별 학생 팝오버
│   │   │   ├── ClassroomLevelCard.tsx   # 레벨 카드
│   │   │   ├── ClassroomLevelMap.tsx    # 레벨 맵
│   │   │   └── index.ts                # export
│   │   │
│   │   ├── smartree/        # 스마트리 컴포넌트
│   │   │   ├── StudentSelector.tsx      # 학생 선택 드롭다운
│   │   │   ├── LevelTreeView.tsx        # 레벨 트리 뷰
│   │   │   ├── LevelCard.tsx            # 레벨 카드
│   │   │   ├── DomainTabs.tsx          # 영역 필터 탭
│   │   │   ├── StudentQuickAccess.tsx  # 학생 빠른 접근
│   │   │   ├── StudentDetailModal.tsx   # 학생 상세 모달
│   │   │   ├── CurriculumBrowser.tsx   # 커리큘럼 브라우저 (신규)
│   │   │   └── index.ts                # export
│   │   │
│   │   └── weekly/          # 주간 데이터 관련
│   │       └── ... (주간 관련 컴포넌트)
│   │
│   ├── hooks/               # Custom React Hooks
│   │   ├── useMissions.ts
│   │   ├── useLibraryBooks.ts
│   │   ├── useStudentProgress.ts
│   │   ├── useUnits.ts
│   │   ├── useStudents.ts
│   │   ├── useQuiz.ts
│   │   ├── useWeeklyData.ts  # 주간 데이터 관리
│   │   └── ...
│   │
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── LearningStatusPage.tsx    # 학습현황 (메인)
│   │   ├── LearningSettingsPage.tsx # 학습설정
│   │   ├── ClassroomPage.tsx         # 수업보기 (신규)
│   │   ├── ClassViewPage.tsx         # 수업보기 (기존)
│   │   ├── CurriculumPage.tsx         # 커리큘럼
│   │   ├── SmartreePage.tsx          # 스마트리
│   │   └── index.ts                   # export
│   │
│   ├── types/               # TypeScript 타입 정의
│   │   ├── user.ts           # 사용자/학생 타입
│   │   ├── unit.ts           # 단원 타입
│   │   ├── mission.ts        # 미션 타입
│   │   ├── library.ts         # 도서관 타입
│   │   ├── progress.ts        # 진행도 타입
│   │   ├── task.ts            # 과제 타입
│   │   ├── quiz.ts            # 퀴즈 타입
│   │   ├── api.ts             # API 응답 타입
│   │   ├── parent.ts          # 부모 연락처 타입
│   │   ├── weekly.ts          # 주간 데이터 타입
│   │   ├── weeklyData.ts      # 주간 데이터 상세 타입
│   │   ├── learningView.ts    # 학습 뷰 타입
│   │   ├── smartree.ts        # 스마트리 타입
│   │   ├── classroom.ts       # 수업보기 타입 (신규)
│   │   └── index.ts           # export
│   │
│   ├── utils/               # 유틸리티 함수
│   │   ├── arlexLevel.ts     # ArLex 36레벨 시스템
│   │   ├── formatDate.ts     # 날짜 포맷팅
│   │   ├── generateWeeklyData.ts # 주간 데이터 생성
│   │   └── ...
│   │
│   ├── data/                # 데이터 파일
│   │   ├── curriculumLevels.ts  # 커리큘럼 레벨 데이터
│   │   ├── dummyStudentData.ts  # 더미 학생 데이터
│   │   └── curriculum/          # 커리큘럼 데이터
│   │       ├── saStories.ts     # SA 레벨 레슨 데이터
│   │       └── index.ts          # export
│   │
│   ├── styles/              # 스타일
│   │   ├── globals.css
│   │   ├── index.css
│   │   └── variables.css
│   │
│   ├── App.tsx              # 메인 앱 컴포넌트 (라우터 설정)
│   └── main.tsx             # 진입점
│
├── database/
│   └── schema.sql           # 데이터베이스 스키마
│
├── public/                  # 정적 파일
│   ├── logo.png
│   ├── smartphonics-cover-1~5.png
│   ├── magicspeaking-cover-1~3.jpg
│   ├── myfirstreading-cover-1~3.png
│   ├── myfirstgrammar-cover-1~3.jpeg
│   ├── myfirstwriting-cover-1~3.jpg
│   └── smartree_curriculum.pdf
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🎯 주요 기능

### 1. 학습현황 페이지 (LearningStatusPage)

#### 주간 통계 대시보드
- **완료한 학생 수**: 주간 목표를 완료한 학생 수
- **완료율**: 전체 학생 대비 완료율
- **평균 정답률**: 주간 평균 정답률
- **진행 중 학생 수**: 현재 학습 중인 학생 수
- **이번 주 / 지난 주 전환**: 주간 데이터 비교
- **학생 상태 분포**: 우수/정상/주의/미흡 학생 분포 (세그먼트 바)
  - 우수: 달성률 100%, 정답률 90% 이상
  - 정상: 달성률 70-99%, 정답률 70-89%
  - 주의: 달성률 50-69%, 정답률 50-69%
  - 미흡: 달성률 50% 미만 또는 정답률 50% 미만

#### 뷰 모드 탭
- **단원별 뷰 (기본)**: 단원명, 진행률 바, 완료 학생 수/전체 학생 수
- **과제유형별 뷰**: 
  - 4가지 과제 유형 카드 (Lecture, Activity, AI Chat, Library)
  - 도넛 차트로 완료 현황 표시
  - 주간 완료 추이 그래프
  - 학생별 과제 유형 완료율 테이블
- **기간별 뷰**:
  - 기간 선택 버튼 (이번 주, 지난 1개월, 지난 3개월, 전체)
  - 완료율 추이 라인 그래프
  - 주간 비교 카드
  - 주요 성과 요약
  - 학생별 활동 테이블

#### 커리큘럼 선택
- **5개 섹션**: Phonics, Speaking, Reading, Grammar, Writing
- **Phonics**: 5개 커버 이미지 (단원 정보 제거됨)
- **Speaking**: 3개 커버 이미지 (신규 추가)
- **Reading, Grammar, Writing**: 각 3개 커버 이미지
- **커리큘럼 상세표 PDF 뷰어**: 전체화면 지원

#### 학생 목록 테이블
- **학생 정보**: 번호, 레벨(ArLex 36레벨), 이름, 아이디, 닉네임
- **진행 상태 뱃지**: 선행/정상/지연 표시
  - 🚀 N주 선행 (초록)
  - ✅ 정상 (파랑)
  - ⚠️ N주 지연 (노랑)
- **학습 진행률**: 원형 그래프
- **미션 진행률**: 원형 그래프
- **이번 주 달성률**: (학습 진행률 + 미션 진행률) / 2
- **상태**: 우수/정상/주의/미흡 (달성률 기반 자동 계산)
- **정답률**: 프로그레스 바
- **학습시간**: 분 단위
- **학습상세**: More 버튼으로 상세 모달 열기

#### 학생 상세 모달
- 학생 아바타, 이름, 레벨 배지
- 보석 정보 (빨강/파랑/초록/노랑 4종)
- 코인 정보
- 게임 미션 진행도
- 탭: 전체 현황 / 과제 유형별 / 단원별 / 학습 추이
- 부모 연락처 및 알림 설정

### 2. 학습설정 페이지 (LearningSettingsPage)

#### 과제 미션 관리
- **신규 미션 생성**: 8단계 폼
  1. 미션명 입력 (16자 이내)
  2. 단원 선택
  3. 과제 선택 (4개 유형)
     - 강의듣기: 1~6차시 선택
     - 액티비티: 듣기/읽기/말하기/쓰기 선택
     - AI 대화: 교과서 대화
     - 영어도서관: 도서 선택하기 (더미 데이터 지원)
  4. 학생 선택
  5. 보상 설정 (스톤, 골드)
  6. 기간 설정
  7. 수업 모드 선택
  8. 확인 및 전송
- **미션 목록**: 생성된 미션 목록 표시

#### 학생 과제 현황
- 학생별 과제 완료 현황 테이블

### 3. 수업보기 페이지 (ClassroomPage) - 신규

#### 학생 상태별 색상 구분
- **학습중**: 초록색 (🟢) - 현재 콘텐츠 학습 중
- **접속중**: 파란색 (🔵) - 접속했지만 학습 안 함
- **오프라인**: 회색 (⚪) - 미접속

#### 레벨별 학생 관리
- **36레벨 맵**: Spark/Motivate/Activate 그룹별 표시
- **레벨 클릭**: 해당 레벨 학생 목록 팝오버 표시
  - 학생 이름, 현재 Unit, 영역 정보
  - 학습 시간 및 마지막 활동 시간
  - 상태별 정렬 (학습중 > 접속중 > 오프라인)
- **학생 수 표시**: 레벨별 수강생 수
- **상태 점 표시**: 학습중/접속중 학생 수를 점으로 표시

#### 영역별 필터링
- 전체, Phonics, Speaking, Reading, Grammar, Writing 필터 지원
- 영역별 레벨 수 표시

#### 학생 선택 기능
- 학생 선택 드롭다운
- 선택된 학생의 빠른 접근 패널
- 학생 상세보기 모달 연동

### 4. 스마트리 페이지 (SmartreePage) - 재구성

#### 커리큘럼 브라우저
- **레벨 선택**: SA1~SA6 등 레벨별 선택
- **레슨 목록**: 레벨별 레슨 표시
  - 레슨 번호, 제목, 단어 수, 문장 수
  - 레슨 펼치기/접기
- **단어 표시**: 영어 단어, 한글 뜻, 음성 재생 버튼
- **스토리 표시**: 문장별 표시, 음성 재생 버튼
- **음성 재생**: 여성 목소리로 자동 선택
- **액션 버튼**: 퀴즈 시작, 플래시카드 학습

#### 학습도구 탭
- **커리큘럼**: 레슨별 콘텐츠 브라우저
- **단어 퀴즈**: 예습/복습 모드 선택
- **플래시카드**: 암기 학습 (예정)
- **파닉스**: 발음 연습 (예정)
- **문장 읽기**: 읽기 연습 (예정)

#### 전체 보기 / 학생별 보기
- **전체 보기**: 레벨별 수강생 수 표시
- **학생 선택**: 특정 학생 선택 시 진행률 표시
- **영역 필터**: 5개 영역별 레벨 필터링
- **학생 상세 모달**: 학습 현황 상세 정보

### 5. 커리큘럼 페이지 (CurriculumPage)

#### 커리큘럼 탐색
- **5개 섹션**: Phonics, Speaking, Reading, Grammar, Writing
- **커버 이미지**: 각 섹션별 커버 이미지 표시
- **커리큘럼 선택**: 커버 클릭 시 상세 정보 표시

---

## 📊 데이터 구조

### 학생 데이터 (StudentWithStats)
```typescript
interface StudentWithStats {
  student_id: number;
  name: string;
  email: string;
  nickname?: string;
  arlex_level?: number; // 1-36 (SA1-6, SB1-6, MA1-6, MB1-6, AA1-6, AB1-6)
  
  // 학습 통계
  learningProgress: number; // 0-100%
  missionProgress: number; // 0-100%
  accuracyRate: number; // 0-100%
  studyTime: number; // 분 단위
  
  // 주간 데이터
  weeklyCompleted?: boolean;
  weeklyStatus?: 'excellent' | 'normal' | 'warning' | 'critical';
  lectureProgress?: number;
  activityProgress?: number;
  aiChatProgress?: number;
  libraryProgress?: number;
  
  // 게임 요소
  gems: {
    red: number;
    blue: number;
    green: number;
    yellow: number;
  };
  coins: number;
  
  // 진행 상태
  progressStatus?: 'ahead' | 'onTrack' | 'behind';
  weeksDiff?: number;
}
```

### 수업보기 학생 데이터 (ClassroomStudent)
```typescript
interface ClassroomStudent {
  id: string;
  name: string;
  currentLevel: LevelCode; // SA1, MA3 등
  currentDomain: Domain; // Phonics, Speaking 등
  currentUnit: number;
  status: 'learning' | 'online' | 'offline';
  lastActivity?: Date;
  todayLearningTime?: number; // 분
}
```

### 주간 데이터 (WeeklyStudentData)
```typescript
interface WeeklyStudentData {
  studentId: number;
  weeklyProgress: number; // 0-100
  weeklyCompleted: boolean;
  learningProgress: number; // 0-100
  missionProgress: number; // 0-100
  lectureProgress: number;
  activityProgress: number;
  aiChatProgress: number;
  libraryProgress: number;
  accuracyRate: number;
  studyTimeMinutes: number;
  status: 'excellent' | 'normal' | 'warning' | 'critical';
}
```

### 과제 유형 (Task Types)
1. **강의듣기 (Lecture)**: 1-6차시 선택 가능
2. **액티비티 (Activity)**: 듣기/읽기/말하기/쓰기
3. **AI 대화 (AI Chat)**: 교과서 대화
4. **영어도서관 (Library)**: 도서 선택 및 독후 퀴즈

### ArLex 레벨 시스템 (36레벨)
- **Spark 그룹**:
  - SA (Spark A): SA1-6
  - SB (Spark B): SB1-6
- **Motivate 그룹**:
  - MA (Motivate A): MA1-6
  - MB (Motivate B): MB1-6
- **Activate 그룹**:
  - AA (Activate A): AA1-6
  - AB (Activate B): AB1-6

### 영역별 레벨 분포
- **Phonics**: SA1~6, SB1~6, MA1~6 (18레벨)
- **Speaking**: 전체 36레벨
- **Reading**: SA1~6, SB1~6, MB1~6 (18레벨)
- **Grammar**: MA1~6, AA1~6, AB1~6 (18레벨)
- **Writing**: MB1~6, AA1~6, AB1~6 (18레벨)

---

## 🗄️ 데이터베이스 스키마

### 주요 테이블

#### 1. 사용자 관련
- **users**: 사용자 테이블 (교사, 학생)
  - `user_id`, `email`, `password_hash`, `name`, `role`, `created_at`, `updated_at`
- **students**: 학생 정보 확장 테이블
  - `student_id`, `teacher_id`, `grade`, `parent_name`, `parent_phone`, `status`

#### 2. 단원 관련
- **units**: 스마트 파닉스 40단원 테이블
  - `unit_id`, `unit_number` (1~40), `unit_title`, `learning_goals`, `target_words`, `sentence_patterns`

#### 3. 과제 미션 관련
- **mission_assignments**: 과제 미션 테이블
  - `mission_id`, `mission_name`, `unit_id`, `teacher_id`
  - `mission_type`: lecture, activity, ai_chat, library, mixed
  - `lecture_sessions`: JSON (선택된 강의 차시)
  - `activity_types`: JSON (선택된 액티비티)
  - `ai_chat_enabled`: BOOLEAN
  - `library_book_ids`: JSON (선택된 도서 ID)
  - `target_students`: JSON (전송 대상 학생)
  - `reward_stone`, `reward_gold`
  - `start_date`, `end_date`, `class_mode`
  - `estimated_time`, `status`

#### 4. 영어도서관 관련
- **library_books**: 도서 정보 테이블
  - `book_id`, `title`, `author`, `level` (1~5), `category`, `description`
  - `estimated_time`, `cover_image_url`, `content_url`
  - `quiz_id`, `unit_relation`
- **library_quizzes**: 독후 퀴즈 테이블
  - `quiz_id`, `book_id`, `questions` (JSON)
- **library_quiz_responses**: 독후 퀴즈 응답 테이블
  - `response_id`, `student_id`, `quiz_id`, `book_id`, `answers` (JSON), `score`

#### 5. 학습 진행도 관련
- **student_progress**: 학생 학습 진행도 테이블
  - `progress_id`, `student_id`, `mission_id`, `unit_id`
  - `progress_type`: lecture, activity, ai_chat, library
  - `lecture_session`, `activity_type`, `book_id`, `reading_time`
  - `completion_rate`, `score`, `time_spent`, `completed_at`

#### 6. AI 대화 관련
- **ai_chat_sessions**: AI 대화 세션 테이블
  - `session_id`, `student_id`, `mission_id`, `unit_id`
  - `conversation_type`, `messages` (JSON), `total_turns`, `completed`

#### 7. 뷰
- **v_student_mission_status**: 학생 과제 현황 뷰
  - 학생별 미션 상태 통합 뷰

### 데이터베이스 엔진
- **InnoDB** 엔진 사용
- **UTF-8 MB4** 문자셋 (이모지 지원)

---

## 🔌 API 구조

### API 엔드포인트

#### 미션 관련
- `GET /api/missions` - 미션 목록 조회
- `POST /api/missions` - 미션 생성
- `GET /api/missions/:id` - 미션 상세 조회
- `PUT /api/missions/:id` - 미션 수정
- `DELETE /api/missions/:id` - 미션 삭제

#### 학생 관련
- `GET /api/students` - 학생 목록 조회
- `GET /api/students/:id` - 학생 상세 조회
- `GET /api/students/:id/progress` - 학생 진행도 조회

#### 학습 진행도
- `GET /api/progress` - 학습 진행도 조회
- `GET /api/progress/weekly` - 주간 진행도 조회
- `GET /api/progress/unit/:unitId` - 단원별 진행도

#### 단원 관련
- `GET /api/units` - 단원 목록 조회
- `GET /api/units/:id` - 단원 상세 조회

#### 영어도서관
- `GET /api/library/books` - 도서 목록 조회
- `GET /api/library/books/:id` - 도서 상세 조회
- `POST /api/library/progress` - 도서 읽기 진행도 기록
- `GET /api/library/students/:studentId/progress` - 학생 도서 읽기 이력

#### 퀴즈
- `POST /api/quiz` - 퀴즈 제출
- `GET /api/quiz/:id` - 퀴즈 결과 조회

#### 주간 데이터
- `GET /api/weekly` - 주간 데이터 조회
- `GET /api/weekly/summary` - 주간 요약 통계

### API 클라이언트
- **Axios 기반**: `src/api/client.ts`
- **React Query**: 캐싱 및 상태 관리
- **에러 처리**: 기본값 반환 및 더미 데이터 fallback
- **인증**: Bearer 토큰 (localStorage)

---

## 🎨 UI/UX 특징

### 디자인 시스템
- **Tailwind CSS** 기반
- **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- **일관된 색상 체계**:
  - 강의듣기: 파랑 (#3B82F6)
  - 액티비티: 초록 (#10B981)
  - AI 대화: 보라 (#9C27B0)
  - 영어도서관: 주황 (#FF9800)
  - 학습중: 초록 (#10B981)
  - 접속중: 파랑 (#3B82F6)
  - 오프라인: 회색 (#9CA3AF)

### 주요 컴포넌트
- **원형 프로그레스 바**: 학습/미션 진행률 표시
- **선형 프로그레스 바**: 정답률, 완료율 표시
- **세그먼트 바**: 학생 상태 분포 (그라데이션 효과)
- **도넛 차트**: 과제 유형별 완료 현황
- **라인 그래프**: 주간 완료 추이
- **모달**: React Portal 사용, z-index 9999
- **테이블**: 학생 목록, 과제 현황
- **카드**: 통계, 우수 학생, 조치 필요 학생
- **사이드바**: Notion 스타일, 접기/펼치기, 호버 확장

### 애니메이션
- **펄스 효과**: 학습중 학생 표시
- **페이드 인**: 온보딩 투어 하이라이트
- **트랜지션**: 사이드바 확장/축소, 모달 열기/닫기

---

## 📝 더미 데이터

### 학생 데이터 (20명)
- 이름: 김민준, 이서연, 박지훈, 최지우, 강민수, 정하은, 윤서진, 장현우, 임수아, 한도윤, 송예린, 오준호, 배서현, 황민재, 조아영, 신지현, 권태민, 문하늘, 백소율, 류지안
- 이메일: `student1@argong.com` ~ `student20@argong.com`
- 학습 진행률: 현실적인 분포 (완료 학생 11명, 진행 중 9명)
- ArLex 레벨: 1-36 중 배정
- 보석/코인: 학습 진행률, 미션 진행률, 정답률 기반 계산

### 주간 데이터
- **지난 주**: 18명 완료 (6명 우수, 12명 정상), 2명 미완료 (1명 주의, 1명 미흡)
- **이번 주**: 11명 완료 (6명 우수, 5명 정상), 9명 진행 중 (6명 정상, 2명 주의, 1명 미흡)

### 커리큘럼 데이터
- **SA 레벨**: 5개 레슨 (더미 데이터)
  - 각 레슨당 5개 단어, 4개 문장
- **Smart Phonics**: 5개 커버 이미지, 각각 8단원씩 (총 40단원)

---

## 🚀 배포

### 빌드
```bash
npm run build
```

### 배포 플랫폼
- **Vercel** (권장)
- **Netlify**
- **GitHub Pages**

### 환경 변수
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 배포 가이드
- `DEPLOYMENT_GUIDE.md`: 상세 배포 가이드
- `QUICK_DEPLOY.md`: 빠른 배포 가이드

---

## 📚 참고 문서

- `algong-lms-improvement-plan.md`: 상세 개발 명세
- `database/schema.sql`: 데이터베이스 스키마
- `PROJECT_DOCUMENTATION.md`: 프로젝트 문서
- `WORK_SUMMARY.md`: 최근 작업 요약
- `WORK_PROGRESS.md`: 작업 진행 상황

---

## 🔄 개발 상태

### ✅ 완료된 기능

#### Phase 1: 핵심 기능
- ✅ DB 스키마 설계 및 생성
- ✅ TypeScript 타입 정의
- ✅ API 엔드포인트 구현
- ✅ 과제 선택 UI 컴포넌트 (4개 유형)
- ✅ 사용자 온보딩 및 피드백 시스템
- ✅ 부모 알림 설정

#### Phase 2: 과제 선택 확장
- ✅ 강의듣기 (스마트리) - 1~6차시 선택
- ✅ 액티비티 - 4대 영역 선택
- ✅ AI 대화 - 교과서 대화
- ✅ 영어도서관 - 도서 선택 (더미 데이터 지원)

#### Phase 3: 학습현황 연동
- ✅ 과제 유형별 진행률 표시
- ✅ 학생 과제 현황 테이블 확장
- ✅ 과제유형별 뷰 추가
- ✅ 기간별 뷰 추가
- ✅ 주간 데이터 동기화 및 현실화
- ✅ 진행 상태 뱃지 (선행/정상/지연)

#### Phase 4: 고도화
- ✅ 영어도서관 독후 퀴즈 시스템
- ✅ AI 종합 학습 레포트
- ✅ 앱 라우팅 및 통합
- ✅ Notion 스타일 사이드바
- ✅ 학생 상태 분포 개선
- ✅ 탭 구조 개편 (수업보기/스마트리 재구성)

#### 최근 작업 (2026-01-15)
- ✅ 도메인 주소 변경 (algong.com → argong.com)
- ✅ 학습설정 탭 아이콘 변경 (⚙️ → ✏️)
- ✅ 도서 선택하기 오류 수정
- ✅ 수업보기 페이지 재구성 (레벨 맵, 학생 상태 색상)
- ✅ 스마트리 페이지 재구성 (커리큘럼 브라우저)
- ✅ 음성 재생 기능 개선 (여성 목소리)

### ⏳ 진행 중 / 예정
- ⏳ 백엔드 API 연동
- ⏳ 실제 데이터베이스 연동
- ⏳ 미션 생성 및 관리 기능 완성
- ⏳ 학습도구 기능 구현 (퀴즈, 플래시카드, 파닉스, 문장 읽기)
- ⏳ 커리큘럼 데이터 확장 (SA 외 레벨)

---

## 💡 주요 구현 사항

### 1. 주간 데이터 관리
- `useWeeklyData` 훅으로 주간 데이터 중앙 관리
- Single Source of Truth 원칙
- 계산 기반 통계 (하드코딩 제거)
- 주간별 데이터 분리 (last/this/next)

### 2. 학생 상태 판정
- **달성률**: (학습 진행률 + 미션 진행률) / 2
- **상태 기준**:
  - 우수: 달성률 100%, 정답률 90% 이상
  - 정상: 달성률 70-99%, 정답률 70-89%
  - 주의: 달성률 50-69%, 정답률 50-69%
  - 미흡: 달성률 50% 미만 또는 정답률 50% 미만

### 3. 진행 상태 계산
- **선행**: 현재 레벨이 예상보다 앞서 있음
- **정상**: 예상 레벨과 일치
- **지연**: 현재 레벨이 예상보다 뒤처져 있음
- 현실적인 분포: 선행 15-20%, 정상 60-70%, 지연 15-20%

### 4. ArLex 레벨 시스템
- `src/data/curriculumLevels.ts`에 레벨 상수 정의
- 레벨 번호(1-36) ↔ 레벨 코드(SA1, MA4 등) 변환
- 레벨별 색상 매핑
- 영역별 레벨 필터링

### 5. 커리큘럼 선택
- 5개 섹션: Phonics, Speaking, Reading, Grammar, Writing
- 각 섹션별 커버 이미지 표시
- Smart Phonics: 5개 커버 (단원 정보 제거됨)
- PDF 뷰어: 전체화면 지원, 다운로드 기능

### 6. 음성 재생
- Web Speech API 사용
- 여성 목소리 자동 선택
- 다양한 플랫폼 지원 (Windows, macOS, 브라우저)
- 피치 조정 (1.1)으로 여성 목소리에 가깝게

---

## 🐛 알려진 이슈

- 현재는 더미 데이터 사용 중 (실제 API 연동 필요)
- 이미지 로딩 실패 시 fallback 처리
- PDF 뷰어는 브라우저 지원에 따라 다를 수 있음
- 음성 재생은 브라우저 및 OS에 따라 사용 가능한 음성이 다를 수 있음

---

## 📞 연락처

프로젝트 관련 문의는 프로젝트 관리자에게 연락하세요.

---

**마지막 업데이트**: 2026년 1월 15일  
**버전**: 1.0.0  
**작성자**: AI Assistant
