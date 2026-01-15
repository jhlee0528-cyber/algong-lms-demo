# 알공 스마트리 LMS 작업 현황

## 📋 프로젝트 개요

알공 스마트리 LMS는 학습 현황 관리, 커리큘럼 탐색, 학습 설정 등을 제공하는 학습 관리 시스템입니다.

---

## ✅ 완료된 작업

### Phase 1: 사용자 온보딩 및 피드백 시스템

#### 1. In-app Help and Tutorial System
- **파일**: `src/components/common/OnboardingTour.tsx`
- **기능**:
  - 다단계 온보딩 투어 구현
  - 주요 컴포넌트 하이라이트 (`data-tour` 속성)
  - 투어 완료/건너뛰기 기능
  - localStorage에 완료 상태 저장
- **통합**: `src/pages/LearningStatusPage.tsx`에서 첫 방문 시 자동 시작

#### 2. Feedback Collection Feature
- **파일**: `src/components/common/FeedbackButton.tsx`
- **기능**:
  - 플로팅 피드백 버튼
  - 피드백 모달 (텍스트 입력, 카테고리 선택)
  - localStorage에 피드백 데이터 저장
- **통합**: `src/App.tsx`에 전역 배치

#### 3. Parent Notification Settings
- **파일**: 
  - `src/types/parent.ts` (타입 정의)
  - `src/components/student/ParentContactModal.tsx`
- **기능**:
  - 부모 연락처 관리
  - 알림 설정 (완료 알림, 경고 알림, 주간 리포트)
  - 알림 템플릿 관리
  - localStorage에 설정 저장
- **통합**: `src/components/progress/StudentDetailModal.tsx`에 통합

---

### Phase 2: 학습 현황 뷰 탭 기능

#### 1. View Mode Tabs
- **파일**: `src/components/dashboard/ViewModeTabs.tsx`
- **기능**: 단원별 / 과제유형별 / 기간별 탭 전환

#### 2. Task Type View (과제유형별)
- **파일**: `src/components/dashboard/TaskTypeView.tsx`
- **기능**:
  - 4가지 과제 유형 카드 (Lecture, Activity, AI Chat, Library)
  - 도넛 차트로 완료 현황 표시
  - 주간 완료 추이 그래프
  - 학생별 과제 유형 완료율 테이블

#### 3. Period View (기간별)
- **파일**: `src/components/dashboard/PeriodView.tsx`
- **기능**:
  - 기간 선택 버튼 (이번 주, 지난 1개월, 지난 3개월, 전체)
  - 완료율 추이 라인 그래프
  - 주간 비교 카드
  - 주요 성과 요약
  - 학생별 활동 테이블

#### 4. Unit View (단원별 - 기본)
- **기능**: 단원명, 진행률 바, 완료 학생 수/전체 학생 수 표시

#### 5. 타입 정의
- **파일**: `src/types/learningView.ts`
- **내용**: `ViewMode`, `PeriodFilter`, `TaskTypeStats`, `PeriodStats` 타입 정의

---

### Phase 3: 주간 학습 현황 데이터 동기화 및 현실화

#### 1. 주간 데이터 타입 정의
- **파일**: `src/types/weeklyData.ts`
- **내용**:
  - `WeeklyStudentData`: 주간별 학생 학습 데이터
  - `WeeklySummary`: 주간 요약 통계
  - `WeekData`: 주간 데이터 전체

#### 2. 주간 데이터 생성 유틸리티
- **파일**: `src/utils/generateWeeklyData.ts`
- **기능**:
  - 주간 타입별 (last/this/next) 더미 데이터 생성
  - 현실적인 통계 분포 (완료 학생 수, 상태 분포)
  - 학생 데이터에서 요약 통계 계산

#### 3. 주간 데이터 관리 훅
- **파일**: `src/hooks/useWeeklyData.ts`
- **기능**:
  - 주간 데이터 생성 및 관리
  - 활성 주간 선택 (`activeWeek`)
  - 현재 주간 데이터 및 요약 제공
  - 주간 데이터와 기본 학생 데이터 병합

#### 4. 컴포넌트 동기화
- **DashboardStats.tsx**: 주간 데이터 기반 통계 표시
- **StudentListTable.tsx**: 주간 데이터 반영된 학생 목록
- **StudentStatusBar.tsx**: 주간 상태 우선 표시

#### 5. 개선 목표 달성
- ✅ 지난 주 완료: 18-20명
- ✅ 이번 주 완료: 10-12명
- ✅ 우수 학생: 5-6명
- ✅ 정상 학생: 11-12명
- ✅ 주의 학생: 2명
- ✅ 미흡 학생: 1명
- ✅ 단일 데이터 소스 (Single Source of Truth)
- ✅ 계산 기반 통계 (Calculated Statistics)

---

### Phase 4: 노션 스타일 사이드바 + 메뉴 구조 재편

#### 1. Sidebar 컴포넌트
- **파일**: `src/components/common/Sidebar.tsx`
- **기능**:
  - 토글 버튼으로 열기/닫기
  - 접힌 상태에서 호버 시 임시 펼침
  - localStorage에 상태 저장
  - 모바일 반응형 (오버레이 + 백드롭)
  - 메뉴 항목:
    - 📊 학습현황 (`/learning-status`)
    - 📚 커리큘럼 (`/curriculum`)
    - ⚙️ 학습설정 (`/learning-settings`)
    - 📺 수업보기 (`/class-view`)
    - 🌳 스마트리 (`/smartree`)

#### 2. Layout 컴포넌트 수정
- **파일**: `src/components/common/Layout.tsx`
- **변경사항**:
  - Header 제거, Sidebar 통합
  - 메인 콘텐츠 마진 자동 조정 (사이드바 너비에 따라)
  - 헤더 영역 추가 (알림, 도움말, 프로필)

#### 3. CurriculumPage 생성
- **파일**: `src/pages/CurriculumPage.tsx`
- **기능**:
  - 커리큘럼 선택 (`CurriculumSelector`)
  - 단원 목록 표시
  - 단원 상세 현황 (`UnitProgressDetail`)

#### 4. LearningStatusPage 정리
- **파일**: `src/pages/LearningStatusPage.tsx`
- **변경사항**:
  - 커리큘럼 관련 코드 제거 (`useUnits`, `selectedUnit`, `CurriculumSelector`, `UnitProgressDetail`)
  - 학습 현황에 집중 (주간 통계, 학생 목록, 뷰 모드)

#### 5. App.tsx 라우팅 수정
- **변경사항**:
  - `/curriculum` 경로 추가
  - 모든 페이지 라우팅 설정

#### 6. 스타일 추가
- **파일**: `src/styles/globals.css`
- **내용**:
  - 사이드바 전환 애니메이션
  - 스크롤바 스타일링
  - 호버 효과

---

## 📁 주요 파일 구조

```
src/
├── components/
│   ├── common/
│   │   ├── OnboardingTour.tsx          # 온보딩 투어
│   │   ├── FeedbackButton.tsx          # 피드백 버튼
│   │   ├── Sidebar.tsx                 # 사이드바
│   │   ├── Layout.tsx                  # 레이아웃
│   │   └── HelpModal.tsx               # 도움말 모달
│   ├── dashboard/
│   │   ├── DashboardStats.tsx          # 대시보드 통계
│   │   ├── ViewModeTabs.tsx             # 뷰 모드 탭
│   │   ├── TaskTypeView.tsx             # 과제유형별 뷰
│   │   ├── PeriodView.tsx               # 기간별 뷰
│   │   └── StudentStatusBar.tsx         # 학생 상태 바
│   ├── progress/
│   │   ├── StudentListTable.tsx         # 학생 목록 테이블
│   │   ├── StudentDetailModal.tsx       # 학생 상세 모달
│   │   └── UnitProgressDetail.tsx       # 단원 진행 상세
│   └── student/
│       └── ParentContactModal.tsx       # 부모 연락처 모달
├── pages/
│   ├── LearningStatusPage.tsx           # 학습 현황 페이지
│   ├── CurriculumPage.tsx                # 커리큘럼 페이지
│   ├── LearningSettingsPage.tsx          # 학습 설정 페이지
│   ├── ClassViewPage.tsx                 # 수업보기 페이지
│   └── SmartreePage.tsx                  # 스마트리 페이지
├── hooks/
│   ├── useWeeklyData.ts                  # 주간 데이터 훅
│   ├── useUnits.ts                       # 단원 훅
│   ├── useStudents.ts                    # 학생 훅
│   └── ...
├── types/
│   ├── learningView.ts                   # 학습 뷰 타입
│   ├── weeklyData.ts                     # 주간 데이터 타입
│   ├── parent.ts                         # 부모 관련 타입
│   └── ...
├── utils/
│   ├── generateWeeklyData.ts             # 주간 데이터 생성
│   └── ...
└── styles/
    └── globals.css                       # 전역 스타일
```

---

## 🎯 핵심 기능 요약

### 1. 학습 현황 관리
- **주간 통계**: 이번 주/지난 주/다음 주 비교
- **학생 상태 분류**: 우수/정상/주의/미흡
- **뷰 모드**: 단원별, 과제유형별, 기간별
- **데이터 동기화**: 단일 데이터 소스 기반 통계

### 2. 커리큘럼 탐색
- **교재 선택**: Phonics, Reading, Grammar, Writing
- **단원 목록**: 단원별 진행률 표시
- **단원 상세**: 학생별 학습 현황

### 3. 사용자 경험
- **온보딩 투어**: 첫 방문 시 가이드
- **피드백 수집**: 사용자 의견 수렴
- **부모 알림**: 학생 학습 현황 알림 설정
- **사이드바 네비게이션**: 노션 스타일 메뉴

---

## 🔧 기술 스택

- **Frontend**: React 18+ with TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: 
  - React Query (TanStack Query) - 서버 상태
  - Zustand - 클라이언트 상태
  - useState, useMemo - 로컬 상태
- **라우팅**: React Router v6
- **빌드 도구**: Vite

---

## 📊 데이터 흐름

### 주간 데이터 동기화 흐름

```
Base Students Data
    ↓
useWeeklyData Hook
    ↓
Generate Weekly Data (last/this/next)
    ↓
Merge with Base Data
    ↓
Calculate Summary Statistics
    ↓
Provide to Components
    ├── DashboardStats (통계)
    ├── StudentListTable (학생 목록)
    ├── TaskTypeView (과제유형별)
    └── PeriodView (기간별)
```

### 사이드바 상태 관리

```
Sidebar Component
    ↓
localStorage (sidebar-expanded)
    ↓
Layout Component (동기화)
    ↓
Main Content (마진 조정)
```

---

## 🐛 해결된 이슈

### 1. React Hooks 규칙 위반
- **문제**: `useMemo` 내부에서 `useMemo` 호출
- **해결**: `completedStudentIndices`를 `useMemo` 밖으로 이동

### 2. 의존성 배열 크기 변경
- **문제**: `students`가 `undefined`일 수 있어 의존성 배열 크기 변경
- **해결**: `students || []`로 항상 배열 보장

### 3. activeWeek 미정의 오류
- **문제**: `useWeeklyData`에서 `activeWeek`을 destructure하지 않음
- **해결**: `activeWeek`, `setActiveWeek`을 올바르게 destructure

### 4. StatusBadge 미정의 오류
- **문제**: `StatusBadge` 컴포넌트가 정의되지 않음
- **해결**: `DashboardStats.tsx` 파일 끝에 `StatusBadge` 컴포넌트 추가

---

## 📝 다음 단계 (제안)

### 1. 백엔드 연동
- [ ] API 엔드포인트 구현
- [ ] React Query로 데이터 페칭
- [ ] localStorage 대신 서버 저장소 사용

### 2. 기능 개선
- [ ] 실제 단원 데이터 연동
- [ ] 학생 상세 리포트 개선
- [ ] 부모 알림 실제 발송 기능

### 3. UI/UX 개선
- [ ] 다크 모드 지원
- [ ] 접근성 개선 (ARIA 속성)
- [ ] 성능 최적화 (코드 스플리팅)

### 4. 테스트
- [ ] 단위 테스트 작성
- [ ] 통합 테스트 작성
- [ ] E2E 테스트 작성

---

## 📅 작업 일정

- **Phase 1**: 사용자 온보딩 및 피드백 시스템 ✅
- **Phase 2**: 학습 현황 뷰 탭 기능 ✅
- **Phase 3**: 주간 학습 현황 데이터 동기화 ✅
- **Phase 4**: 노션 스타일 사이드바 + 메뉴 구조 재편 ✅

---

## 📌 참고 사항

- 모든 피드백 및 부모 설정은 현재 `localStorage`에 저장됩니다.
- 주간 데이터는 더미 데이터로 생성되며, 실제 API 연동 시 교체 필요합니다.
- 사이드바 상태는 `localStorage`에 저장되어 새로고침 후에도 유지됩니다.

---

**최종 업데이트**: 2025년 1월
