# 알공스마트리 LMS (공부방용) 프로젝트 문서

## 📋 프로젝트 개요

알공스마트리 LMS는 공부방 환경에 최적화된 학습 관리 시스템입니다. 학생들의 학습 진행 상황을 추적하고, 미션을 할당하며, 다양한 학습 활동(강의듣기, 액티비티, AI 대화, 영어도서관)을 관리할 수 있습니다.

## 🛠 기술 스택

### Frontend
- **React 18+** with TypeScript
- **Vite** (빌드 도구)
- **Tailwind CSS** (스타일링)
- **React Query (TanStack Query)** (서버 상태 관리)
- **React Router** (라우팅)
- **Zustand** (클라이언트 상태 관리, 필요시)

### Backend (예정)
- Node.js + Express 또는 Next.js API Routes
- MySQL 또는 PostgreSQL

### 배포
- Vercel / Netlify 지원
- GitHub Actions CI/CD

## 📁 프로젝트 구조

```
LMS/
├── src/
│   ├── api/              # API 클라이언트 및 엔드포인트
│   │   ├── client.ts     # Axios 기반 API 클라이언트
│   │   ├── missions.ts   # 미션 관련 API
│   │   ├── library.ts    # 영어도서관 API
│   │   ├── progress.ts  # 학습 진행도 API
│   │   ├── units.ts      # 단원 관리 API
│   │   ├── students.ts  # 학생 관리 API
│   │   └── quiz.ts       # 퀴즈 API
│   │
│   ├── components/       # React 컴포넌트
│   │   ├── common/       # 공통 컴포넌트
│   │   │   ├── Header.tsx           # 헤더 (로고, 네비게이션, 설정)
│   │   │   ├── Layout.tsx           # 레이아웃
│   │   │   ├── SettingsModal.tsx    # 설정 모달
│   │   │   └── HelpModal.tsx         # 도움말 모달
│   │   │
│   │   ├── dashboard/    # 대시보드 컴포넌트
│   │   │   ├── DashboardStats.tsx      # 주간 통계 (완료 학생, 완료율, 정답률)
│   │   │   └── SmartreeLevelDisplay.tsx # SMARTree 레벨 표시
│   │   │
│   │   ├── task/         # 과제 선택 컴포넌트
│   │   │   ├── TaskSelector.tsx         # 4개 과제 유형 메인 컨테이너
│   │   │   ├── LectureTaskCard.tsx      # 강의듣기 (1-6차시)
│   │   │   ├── ActivityTaskCard.tsx     # 액티비티 (듣기/읽기/말하기/쓰기)
│   │   │   ├── AiChatTaskCard.tsx       # AI 대화
│   │   │   ├── LibraryTaskCard.tsx       # 영어도서관
│   │   │   └── LibraryBookSelector.tsx  # 도서 선택 모달
│   │   │
│   │   ├── mission/      # 미션 관리
│   │   │   ├── MissionForm.tsx     # 미션 생성 폼 (8단계)
│   │   │   └── MissionList.tsx     # 미션 목록
│   │   │
│   │   ├── progress/     # 학습 진행도
│   │   │   ├── StudentListTable.tsx     # 학생 목록 테이블
│   │   │   ├── StudentDetailModal.tsx  # 학생 상세 모달
│   │   │   ├── UnitProgressDetail.tsx  # 단원별 상세 진행도
│   │   │   ├── ProgressByType.tsx      # 과제 유형별 진행도
│   │   │   ├── LectureProgressDetail.tsx
│   │   │   ├── ActivityProgressDetail.tsx
│   │   │   ├── AiChatProgressDetail.tsx
│   │   │   └── LibraryProgressDetail.tsx
│   │   │
│   │   ├── units/         # 단원 관리
│   │   │   ├── CurriculumSelector.tsx   # 커리큘럼 선택 (Phonics/Reading/Grammar/Writing)
│   │   │   └── CurriculumModal.tsx      # 커리큘럼 PDF 뷰어
│   │   │
│   │   ├── library/      # 영어도서관
│   │   │   └── QuizComponent.tsx        # 독후 퀴즈
│   │   │
│   │   └── report/       # 리포트
│   │       └── StudentProgressReport.tsx # AI 종합 학습 레포트
│   │
│   ├── hooks/            # React Query 훅
│   │   ├── useMissions.ts
│   │   ├── useLibraryBooks.ts
│   │   ├── useStudentProgress.ts
│   │   ├── useUnits.ts
│   │   ├── useStudents.ts
│   │   └── useQuiz.ts
│   │
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── LearningStatusPage.tsx    # 학습현황 (메인)
│   │   ├── LearningSettingsPage.tsx   # 학습설정
│   │   ├── ClassViewPage.tsx         # 수업보기
│   │   └── SmartreePage.tsx          # 스마트리
│   │
│   ├── types/            # TypeScript 타입 정의
│   │   ├── user.ts       # 사용자/학생 타입
│   │   ├── unit.ts       # 단원 타입
│   │   ├── mission.ts    # 미션 타입
│   │   ├── library.ts    # 도서관 타입
│   │   ├── progress.ts   # 진행도 타입
│   │   ├── task.ts       # 과제 타입
│   │   ├── quiz.ts       # 퀴즈 타입
│   │   └── api.ts        # API 응답 타입
│   │
│   ├── utils/            # 유틸리티 함수
│   │   ├── arlexLevel.ts     # ArLex 36레벨 시스템 (SA1-6, SB1-6, MA1-6, MB1-6, AA1-6, AB1-6)
│   │   ├── formatDate.ts     # 날짜 포맷팅
│   │   └── ...
│   │
│   ├── styles/           # 스타일
│   │   ├── globals.css
│   │   ├── index.css
│   │   └── variables.css
│   │
│   ├── App.tsx           # 메인 앱 컴포넌트 (라우터 설정)
│   └── main.tsx          # 진입점
│
├── database/
│   └── schema.sql        # 데이터베이스 스키마
│
├── public/               # 정적 파일
│   ├── logo.png
│   ├── smartphonics-cover-1~5.png
│   ├── myfirstreading-cover-1~3.png
│   ├── myfirstgrammar-cover-1~3.jpeg
│   ├── myfirstwriting-cover-1~3.jpg
│   └── smartree_curriculum.pdf
│
└── dist/                 # 빌드 결과물
```

## 🎯 주요 기능

### 1. 학습 현황 (LearningStatusPage)
- **주간 통계 대시보드**
  - 완료한 학생 수, 완료율, 평균 정답률, 진행 중 학생 수
  - 이번 주 / 지난 주 전환 및 비교
  - 주간 우수 학생 (상위 5명)
  - 조치 필요 학생 (학습 진행률 < 50% 또는 정답률 < 60%)

- **커리큘럼 선택**
  - Phonics, Reading, Grammar, Writing 4개 섹션 (토글 방식)
  - 각 섹션별 커버 이미지 표시
  - Smart Phonics: 5개 커버 이미지, 각각 8단원씩 (총 40단원)
  - 커리큘럼 상세표 PDF 뷰어 (전체화면 지원)

- **단원별 학습 현황**
  - 전체 과제 수, 완료한 과제 수, 완료율, 평균 점수
  - 전체 진행률 바
  - 과제 유형별 현황 (강의듣기/액티비티/AI 대화/영어도서관)
    - 20명 학생 기준 완료 학생 수 표시 (예: 5/20명)
    - 완료율 프로그레스 바

- **학생 선택 테이블**
  - 학생 정보: 번호, 레벨(ArLex 36레벨), 이름, 아이디, 닉네임
  - 학습 진행률 (원형 그래프)
  - 미션 진행률 (원형 그래프)
  - 정답률 (프로그레스 바)
  - 학습시간
  - 학습상세 (More 버튼)

- **학생 상세 모달**
  - 학생 아바타, 이름, 레벨 배지
  - 보석 정보 (빨강/파랑/초록/노랑 4종)
  - 코인 정보
  - 게임 미션 진행도
  - 탭: 전체 현황 / 과제 유형별 / 단원별 / 학습 추이

### 2. 학습 설정 (LearningSettingsPage)
- 미션 생성 및 관리
- 학생별 과제 할당

### 3. 수업보기 (ClassViewPage)
- 수업 일정 및 정보

### 4. 스마트리 (SmartreePage)
- SMARTree 학습 콘텐츠

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
  
  // 게임 요소
  gems: {
    red: number;
    blue: number;
    green: number;
    yellow: number;
  };
  coins: number;
}
```

### 과제 유형 (Task Types)
1. **강의듣기 (Lecture)**: 1-6차시 선택 가능
2. **액티비티 (Activity)**: 듣기/읽기/말하기/쓰기
3. **AI 대화 (AI Chat)**: 교과서 대화
4. **영어도서관 (Library)**: 도서 선택 및 독후 퀴즈

### ArLex 레벨 시스템
- 총 36레벨
- **SA (Spark A)**: 1-6레벨
- **SB (Spark B)**: 7-12레벨
- **MA (Motivate A)**: 13-18레벨
- **MB (Motivate B)**: 19-24레벨
- **AA (Activate A)**: 25-30레벨
- **AB (Activate B)**: 31-36레벨
- 각 레벨별 색상 구분 (파랑/청록/초록/주황/오렌지/빨강)

## 🔌 API 구조

### API 엔드포인트 (예정)
- `GET /api/missions` - 미션 목록 조회
- `POST /api/missions` - 미션 생성
- `GET /api/students` - 학생 목록 조회
- `GET /api/progress` - 학습 진행도 조회
- `GET /api/units` - 단원 목록 조회
- `GET /api/library/books` - 도서 목록 조회
- `POST /api/quiz` - 퀴즈 제출

### API 클라이언트
- Axios 기반
- React Query로 캐싱 및 상태 관리
- 에러 처리 및 기본값 반환

## 🎨 UI/UX 특징

### 디자인 시스템
- Tailwind CSS 기반
- 반응형 디자인
- 일관된 색상 체계:
  - 강의듣기: 파랑 (#3B82F6)
  - 액티비티: 초록 (#10B981)
  - AI 대화: 보라 (#9C27B0)
  - 영어도서관: 주황 (#FF9800)

### 주요 컴포넌트
- **원형 프로그레스 바**: 학습/미션 진행률 표시
- **선형 프로그레스 바**: 정답률, 완료율 표시
- **모달**: React Portal 사용, z-index 9999
- **테이블**: 학생 목록, 과제 현황
- **카드**: 통계, 우수 학생, 조치 필요 학생

## 📝 더미 데이터

### 학생 데이터 (20명)
- 이름: 김민수, 이지은, 박준호, 최서연, 정현우, 강소영, 윤도현, 임수진, 한지훈, 오나은, 신동욱, 배미래, 조성민, 홍예린, 송태현, 유하늘, 문지원, 양준혁, 백서아, 남도윤
- 학습 진행률: 랜덤 (완료 학생 5명은 100%)
- ArLex 레벨: 1-36 중 랜덤 배정
- 보석/코인: 학습 진행률, 미션 진행률, 정답률 기반 계산

### 단원 데이터 (40단원)
- Smart Phonics 커리큘럼
- 각 커버 이미지당 8단원씩 할당

## 🚀 배포

### 빌드
```bash
npm run build
```

### 배포 플랫폼
- Vercel (권장)
- Netlify
- GitHub Pages

### 환경 변수
- `VITE_API_BASE_URL`: API 서버 주소

## 📚 참고 문서

- `algong-lms-improvement-plan.md`: 상세 개발 명세
- `database/schema.sql`: 데이터베이스 스키마
- `DEPLOYMENT_GUIDE.md`: 배포 가이드
- `SETUP_GUIDE.md`: 설정 가이드

## 🔄 개발 상태

### 완료된 기능
- ✅ 학습 현황 페이지 (대시보드, 커리큘럼 선택, 학생 목록, 단원별 상세)
- ✅ 학생 상세 모달 (보석, 코인, 게임 미션 진행도)
- ✅ 주간 통계 (이번 주/지난 주 전환)
- ✅ ArLex 레벨 시스템 (36레벨, 색상 구분)
- ✅ 커리큘럼 선택 (Phonics/Reading/Grammar/Writing)
- ✅ 커리큘럼 PDF 뷰어
- ✅ 과제 유형별 진행도 표시
- ✅ 단원별 학습 현황 (20명 학생 기준)

### 진행 중 / 예정
- ⏳ 백엔드 API 연동
- ⏳ 실제 데이터베이스 연동
- ⏳ 미션 생성 및 관리 기능 완성
- ⏳ 영어도서관 독후 퀴즈 시스템
- ⏳ AI 종합 학습 레포트

## 💡 주요 구현 사항

### 1. 주간 데이터 전환
- `DashboardStats` 컴포넌트에서 `currentWeekOffset` 상태로 주간 전환
- 이번 주/지난 주 데이터를 별도로 계산
- 완료 학생 수, 우수 학생, 조치 필요 학생 정보도 함께 변경

### 2. 더미 데이터 생성
- 학생 데이터: 학습 진행률, 미션 진행률, 정답률 기반
- 보석/코인: 학습 통계에 비례하여 계산
- 지난 주 데이터: 현재 주 데이터를 기반으로 시뮬레이션

### 3. ArLex 레벨 시스템
- `src/utils/arlexLevel.ts`에 레벨 변환 함수 구현
- 레벨 번호(1-36) ↔ 레벨 코드(SA1, MA4 등) 변환
- 레벨별 색상 매핑

### 4. 커리큘럼 선택
- 4개 섹션 토글 방식
- 각 섹션별 커버 이미지 표시
- Smart Phonics: 5개 커버, 각각 8단원씩
- PDF 뷰어: 전체화면 지원, 다운로드 기능

## 🐛 알려진 이슈

- 현재는 더미 데이터 사용 중 (실제 API 연동 필요)
- 이미지 로딩 실패 시 fallback 처리
- PDF 뷰어는 브라우저 지원에 따라 다를 수 있음

## 📞 연락처

프로젝트 관련 문의는 프로젝트 관리자에게 연락하세요.

---

**마지막 업데이트**: 2025년 1월
**버전**: 1.0.0
