# 알공공부방 LMS 개발 정리 (클로드 전달용)

> **목적**: 알공스마트리 LMS(공부방용) 프로젝트의 현재까지 개발 내용을 정리하여 다른 AI(Claude 등)에게 컨텍스트로 전달할 때 사용하는 문서입니다.  
> **최종 정리일**: 2026년 3월 9일

---

## 1. 프로젝트 개요

- **프로젝트명**: 알공스마트리 LMS (공부방용)
- **설명**: 영어 파닉스 학습 관리 시스템의 **공부방/소규모 학원 최적화 버전**
- **도메인**: argong.com
- **버전**: 1.0.0
- **저작권**: Copyright © DNSOFT. All rights reserved.

### 1.1 핵심 가치

- **학습 현황 관리**: 단원별·과제유형별·기간별 진행률, 주간 통계
- **과제 미션 관리**: 4가지 과제 유형(강의듣기, 액티비티, AI 대화, 영어도서관) 할당
- **수업보기**: 접속중/학습중/오프라인 상태, 레벨별 학생 맵
- **스마트리**: 커리큘럼 브라우저, 레벨 트리, 학생별 진행률
- **역할 기반**: 관리자(Admin) / 선생님(Teacher) / 학습자(Student) 분리

---

## 2. 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | React 18.2, TypeScript 5.2 |
| **빌드** | Vite 5.0 |
| **스타일** | Tailwind CSS 3.3 |
| **상태** | TanStack React Query 5.12, Zustand 4.4 |
| **라우팅** | React Router DOM 6.20 |
| **HTTP** | Axios 1.6 |
| **차트** | Recharts 2.15 |
| **알림** | react-hot-toast 2.6 |

- **Backend**: Node.js + Express 또는 Next.js API Routes 예정 (현재 프론트 중심)
- **DB**: MySQL (스키마 정의 완료, `database/schema.sql`)
- **배포**: Vercel/Netlify, GitHub Actions CI/CD 지원

---

## 3. 프로젝트 구조 (요약)

```
LMS/
├── src/
│   ├── app/                    # 역할별 앱 영역
│   │   ├── admin/              # 관리자 (대시보드, 사용자/콘텐츠/학원 관리, 분석, 설정, 감사로그)
│   │   ├── teacher/            # 선생님 (학습현황, 학습설정, 수업보기, 스마트리, AI알림)
│   │   └── student/            # 학습자 (내 학습, 오늘 과제, 스트릭, 성장기록, 업적, 스마트리)
│   ├── api/                    # API 클라이언트
│   │   ├── client.ts           # Axios 기본 설정
│   │   ├── missions.ts, library.ts, progress.ts, units.ts, students.ts
│   │   ├── quiz.ts, weekly.ts, streak.ts, growth.ts, difficulty.ts
│   │   ├── churnAlert.ts, ariMessage.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── common/             # Header, Layout, Sidebar, 설정/도움말/피드백/온보딩, 학생관리
│   │   ├── dashboard/          # 주간 통계, 뷰 모드 탭, 과제유형별/기간별 뷰, 학생 상태
│   │   ├── task/               # TaskSelector, Lecture/Activity/AiChat/Library 카드, 도서 선택
│   │   ├── mission/            # MissionForm(8단계), MissionList
│   │   ├── progress/           # 학생 목록, 학생 상세 모달, 단원별/유형별 진행도
│   │   ├── units/              # 커리큘럼 선택, 커리큘럼 모달
│   │   ├── library/            # 독후 퀴즈
│   │   ├── report/             # AI 종합 학습 레포트
│   │   ├── student/            # 부모 연락처 모달
│   │   ├── classroom/          # 수업보기 (레벨 카드, 레벨 맵, 학생 상태 뱃지)
│   │   ├── smartree/           # 스마트리 (레벨 트리, 학생 선택, 커리큘럼 브라우저)
│   │   └── weekly/             # 주간 관련 UI
│   ├── hooks/                  # useMissions, useLibraryBooks, useStudentProgress, useUnits,
│   │                           # useStudents, useQuiz, useWeeklyData 등
│   ├── pages/                  # (레거시/공통 페이지 참조용)
│   ├── routes/
│   │   └── AppRoutes.tsx       # 역할별 라우트 + 접근 제어
│   ├── stores/
│   │   └── authStore.ts       # 인증 상태 (role: admin | teacher | student)
│   ├── types/                  # user, unit, mission, library, progress, task, quiz, weekly, classroom, smartree 등
│   ├── utils/                  # formatDate, arlexLevel, generateWeeklyData 등
│   ├── data/                   # curriculum, 더미 데이터
│   ├── styles/                 # globals.css, variables.css
│   ├── App.tsx                 # 라우터/레이아웃 루트
│   └── main.tsx
├── database/
│   └── schema.sql              # 전체 DB 스키마
├── public/                     # 로고, 커버 이미지, PDF 등
├── scripts/                    # 터널 URL 저장 등
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 4. 역할별 라우트 및 기능

- **인증**: `useAuthStore` 기반, 미인증 시 `/login`으로 리다이렉트.
- **기본 경로**:  
  - admin → `/admin`  
  - teacher → `/teacher/learning-status`  
  - student → `/student`

### 4.1 관리자 (Admin)

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/admin` | AdminDashboard | 관리자 대시보드 |
| `/admin/users` | UserManagement | 사용자 관리 |
| `/admin/content` | ContentManagement | 콘텐츠 관리 |
| `/admin/academies` | AcademyManagement | 학원 관리 |
| `/admin/analytics` | Analytics | 분석 |
| `/admin/settings` | SystemSettings | 시스템 설정 |
| `/admin/logs` | AuditLogs | 감사 로그 |

### 4.2 선생님 (Teacher)

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/teacher/learning-status` | LearningStatus | 학습 현황 (주간 통계, 뷰 모드, 학생 목록, 상세) |
| `/teacher/learning-settings` | LearningSettings | 학습 설정 (미션 생성/목록, 학생 과제 현황) |
| `/teacher/class-view` | ClassView | 수업보기 (접속/학습중/오프라인, 레벨별 맵) |
| `/teacher/smartree` | TeacherSmartree | 스마트리 (레벨 트리, 학생별 진행률) |
| `/teacher/ai-alerts` | AIAlerts | AI 알림 |

### 4.3 학습자 (Student)

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/student` | MyLearning | 내 학습 |
| `/student/today` | TodayTasks | 오늘 과제 |
| `/student/streak` | MyStreak | 연속 학습일(스트릭) |
| `/student/growth` | GrowthRecord | 성장 기록 |
| `/student/achievements` | Achievements | 업적 |
| `/student/smartree` | StudentSmartree | 스마트리 |

---

## 5. 주요 기능 상세

### 5.1 학습 현황 (선생님)

- **주간 통계**: 완료 학생 수, 완료율, 평균 정답률, 진행 중 학생 수, 이번 주/지난 주 전환.
- **학생 상태 분류**: 우수 / 정상 / 주의 / 미흡 (달성률·정답률 기준).
- **뷰 모드 탭**:
  - **단원별**: 단원명, 진행률 바, 완료 학생 수/전체.
  - **과제유형별**: 강의듣기·액티비티·AI대화·영어도서관 카드, 도넛 차트, 주간 추이, 학생별 완료율 테이블.
  - **기간별**: 이번 주/1개월/3개월/전체, 완료율 추이, 주간 비교, 학생별 활동 테이블.
- **학생 목록 테이블**: 레벨(ArLex 36레벨), 진행 상태 뱃지(선행/정상/지연), 학습·미션 진행률, 이번 주 달성률, 정답률, 학습시간, 학습상세(More → 상세 모달).
- **학생 상세 모달**: 아바타, 보석/코인, 게임 미션 진행도, 탭(전체/과제유형별/단원별/학습 추이), 부모 연락처·알림 설정.

### 5.2 학습 설정 – 과제 미션

- **신규 미션 생성 (8단계)**  
  1. 미션명 (16자 이내)  
  2. 단원 선택  
  3. **과제 선택 (4개 유형)**  
     - **강의듣기(스마트리)**: 1~6차시 선택 (챈트, 듣고 따라 말하기, 따라쓰기, 게임, 스토리, 복습)  
     - **액티비티**: 듣기/읽기/말하기/쓰기  
     - **AI 대화**: 교과서 대화  
     - **영어도서관**: 도서 선택 (검색·레벨·카테고리 필터, 복수 선택)  
  4. 전송 대상(학생) 선택  
  5. 보상(스톤, 골드)  
  6. 기간  
  7. 수업 모드  
  8. 확인 및 전송  
- **미션 목록**: 생성된 미션 목록 표시.  
- **학생 과제 현황**: 학생별 과제 완료 현황 테이블.

### 5.3 수업보기

- **상태 표시**: 학습중(초록), 접속중(파랑), 오프라인(회색).
- **레벨별 맵**: ArLex 36레벨(Spark/Motivate/Activate), 레벨 클릭 시 해당 레벨 학생 팝오버(이름, Unit, 영역, 학습시간, 마지막 활동, 상태 정렬).
- **영역 필터**: 전체, Phonics, Speaking, Reading, Grammar, Writing.
- **학생 선택**: 드롭다운, 빠른 접근 패널, 상세 모달 연동.

### 5.4 스마트리

- **커리큘럼 브라우저**: 레벨(SA1~SA6 등) 선택, 레슨 목록, 단어/스토리, 음성 재생, 퀴즈/플래시카드 등 액션.
- **전체 보기 / 학생별 보기**: 레벨별 수강생 수, 학생 선택 시 진행률, 영역 필터.
- **학습도구 탭**: 커리큘럼, 단어 퀴즈(예습/복습), 플래시카드 등.

### 5.5 기타 구현 기능

- **영어도서관**: 도서 선택 모달, 독후 퀴즈 시스템.
- **AI 종합 학습 레포트**: 리포트 컴포넌트(`StudentProgressReport`).
- **온보딩 투어**: 첫 방문 시 주요 UI 가이드, `data-tour` 하이라이트.
- **피드백 수집**: 플로팅 버튼, 카테고리/텍스트 입력, localStorage 저장.
- **부모 연락처·알림**: ParentContactModal, 완료/경고/주간 리포트 알림 설정.
- **노션 스타일 사이드바**: 토글, 접힌 상태 호버 펼침, localStorage 저장, 모바일 오버레이.

---

## 6. 데이터베이스 스키마 요약

- **파일**: `database/schema.sql` (MySQL, utf8mb4)

| 테이블 | 용도 |
|--------|------|
| `users` | 교사/학생 계정 (email, role: teacher/student) |
| `students` | 학생 확장 정보 (teacher_id, grade, 부모, status) |
| `units` | 스마트 파닉스 40단원 (unit_number, unit_title, learning_goals, target_words, sentence_patterns) |
| `mission_assignments` | 과제 미션 (mission_type: lecture/activity/ai_chat/library/mixed, lecture_sessions, activity_types, library_book_ids 등) |
| `library_books` | 영어도서관 도서 (book_id, level, category, quiz_id, unit_relation 등) |
| `student_progress` | 학습 진행도 (progress_type: lecture/activity/ai_chat/library, 차시·액티비티·도서별 완료) |
| `ai_chat_sessions` | AI 대화 세션 (conversation_type, messages, total_turns) |
| `library_quizzes` / `library_quiz_responses` | 독후 퀴즈·응답 |
| `student_streaks` | 연속 학습일(스트릭) |
| `ai_message_templates` / `student_ai_messages` | AI 친구 "아리" 메시지 |
| `student_growth_records` / `student_milestones` | 성장 기록·마일스톤 |

- 40단원 제목용 초기 INSERT, AI 메시지 템플릿 시드 포함.

---

## 7. API 모듈 (클라이언트)

- **Base**: `api/client.ts` (Axios, `VITE_API_BASE_URL` 등).
- **주요 모듈**: missions, library, progress, units, students, quiz, weekly, streak, growth, difficulty, churnAlert, ariMessage.
- **환경 변수**: `.env`에 `VITE_API_BASE_URL` 설정 (예: `http://localhost:3000/api`).

---

## 8. 타입·데이터 요약

- **학생**: `StudentWithStats` (learningProgress, missionProgress, accuracyRate, studyTime, weeklyCompleted, weeklyStatus, lecture/activity/aiChat/libraryProgress, gems, coins, progressStatus, weeksDiff 등).
- **주간**: `WeeklyStudentData`, `WeeklySummary`, `WeekData` (useWeeklyData, generateWeeklyData 연동).
- **뷰 모드**: `ViewMode` (단원별/과제유형별/기간별), `TaskTypeStats`, `PeriodStats` 등 (`learningView.ts`).
- **과제 유형**: 강의듣기(1~6차시), 액티비티(듣기/읽기/말하기/쓰기), AI 대화(교과서 대화), 영어도서관(도서+독후 퀴즈).
- **ArLex 36레벨**: SA1~6, SB1~6, MA1~6, MB1~6, AA1~6, AB1~6 (Spark / Motivate / Activate). 영역별 레벨 매핑 존재(Phonics, Speaking, Reading, Grammar, Writing).

---

## 9. 개발 단계(Phase) 완료 현황

| Phase | 내용 | 상태 |
|-------|------|------|
| Phase 1 | DB 스키마, TypeScript 타입, API 엔드포인트, 과제 선택 UI 4유형 | ✅ |
| Phase 2 | 강의듣기 1~6차시, 액티비티 4영역, AI 대화, 영어도서관 도서 선택 | ✅ |
| Phase 3 | 과제 유형별 진행률, 학생 과제 현황 테이블 확장, 과제유형별 뷰 | ✅ |
| Phase 4 | 영어도서관 독후 퀴즈, AI 종합 학습 레포트, 앱 라우팅·역할별 통합 | ✅ |
| 추가 | 온보딩·피드백·부모 알림, 주간 뷰·기간별 뷰, 사이드바·커리큘럼 페이지, 수업보기·스마트리 재구성, 관리자/학생 라우트 | ✅ |

---

## 10. 참고 문서 (프로젝트 내)

- `README.md` – 프로젝트 소개, 실행 방법, 구조 요약
- `src/README.md` – src 폴더 구조, 컴포넌트·코딩 컨벤션, 스타일 가이드
- `algong-lms-improvement-plan.md` – 과제 선택 확장·학습현황 연동 등 상세 설계
- `LMS_COMPREHENSIVE_DOCUMENTATION.md` – 종합 문서(기능·데이터·구조)
- `WORK_PROGRESS.md` – Phase별 작업 내역, 해결 이슈, 다음 단계 제안
- `WORK_PROGRESS_SESSION.md`, `WORK_PROGRESS_SMARTREE_FILTER.md` – 세션/스마트리 필터 작업
- `DEPLOYMENT_GUIDE.md`, `SETUP_GUIDE.md`, `TUNNEL_GUIDE.md`, `EXTERNAL_ACCESS.md` – 배포·설정·터널
- `DEBUGGING_CHECKLIST.md` – 디버깅 체크리스트
- `database/schema.sql` – 전체 DB 스키마
- `LMS img/` – UI 디자인 참고 이미지

---

## 11. 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 (기본 http://localhost:3000)
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

- 터널: `npm run tunnel` (cloudflared), `npm run tunnel:lt` (localtunnel), `npm run dev:tunnel` (동시 실행).

---

## 12. 클로드에게 전달 시 추천 문구

아래 문장을 프롬프트에 포함하면 컨텍스트로 활용하기 좋습니다.

- “알공공부방 LMS는 공부방/소규모 학원용 영어 파닉스 LMS입니다. 역할은 관리자/선생님/학생으로 나뉘고, 선생님은 학습현황(단원별·과제유형별·기간별), 학습설정(4가지 과제 유형으로 미션 생성), 수업보기(레벨별 학생 맵), 스마트리를 사용합니다. 과제 유형은 강의듣기(1~6차시), 액티비티(듣기/읽기/말하기/쓰기), AI 대화, 영어도서관(도서+독후 퀴즈)입니다. 스택은 React 18 + TypeScript + Vite + Tailwind + React Query + Zustand이고, DB 스키마는 `database/schema.sql`에 정의되어 있습니다. 자세한 구조와 Phase별 완료 내용은 `알공공부방_LMS_개발_정리_클로드전달용.md`를 참고해 주세요.”

---

*이 문서는 프로젝트 루트의 `알공공부방_LMS_개발_정리_클로드전달용.md`로 저장되어 있으며, 필요 시 프로젝트 구조나 Phase 현황에 맞춰 수정해 사용하면 됩니다.*
