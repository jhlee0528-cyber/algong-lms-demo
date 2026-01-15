# src/ 폴더 구조

알공스마트리 LMS (공부방용) 소스 코드 디렉토리

## 📁 디렉토리 구조

```
src/
├── components/     # React 컴포넌트
│   ├── mission/    # 과제 미션 관련 컴포넌트
│   ├── task/       # 과제 선택 관련 컴포넌트
│   ├── progress/   # 학습 진행도 관련 컴포넌트
│   └── common/     # 공통 컴포넌트
│
├── hooks/          # Custom React Hooks
│   ├── useMissions.ts
│   ├── useLibraryBooks.ts
│   └── useStudentProgress.ts
│
├── api/            # API 클라이언트 및 엔드포인트
│   ├── missions.ts
│   ├── library.ts
│   └── progress.ts
│
├── types/          # TypeScript 타입 정의
│   ├── mission.ts
│   ├── library.ts
│   ├── progress.ts
│   └── user.ts
│
├── utils/          # 유틸리티 함수
│   ├── formatDate.ts
│   ├── calculateTime.ts
│   └── validation.ts
│
├── pages/          # 페이지 컴포넌트
│   ├── LearningStatus/      # 학습현황 탭
│   ├── LearningSettings/    # 학습설정 탭
│   ├── ClassView/           # 수업보기 탭
│   └── Smartree/            # 스마트리 탭
│
└── styles/         # 전역 스타일
    ├── globals.css
    └── variables.css
```

## 🎯 주요 컴포넌트 (Phase 1)

### 과제 선택 관련
- `TaskSelector.tsx` - 메인 과제 선택 컨테이너
- `LectureTaskCard.tsx` - 강의듣기 (스마트리) 카드 🆕
- `ActivityTaskCard.tsx` - 액티비티 카드
- `AiChatTaskCard.tsx` - AI 대화 카드
- `LibraryTaskCard.tsx` - 영어도서관 카드 🆕
- `LibraryBookSelector.tsx` - 도서 선택 모달 🆕

### 미션 관리 관련
- `MissionForm.tsx` - 신규미션 생성 폼
- `MissionList.tsx` - 과제 미션 목록
- `StudentMissionStatus.tsx` - 학생 과제 현황 테이블

### 학습 진행도 관련
- `ProgressByType.tsx` - 과제 유형별 현황 🆕
- `UnitProgress.tsx` - 단원별 진행도
- `ProgressChart.tsx` - 진행도 차트

## 📝 코딩 컨벤션

### 파일 명명 규칙
- 컴포넌트: PascalCase (예: `TaskSelector.tsx`)
- 훅: camelCase with 'use' prefix (예: `useMissions.ts`)
- 유틸리티: camelCase (예: `formatDate.ts`)
- 타입 정의: camelCase (예: `mission.ts`)

### 컴포넌트 구조
```tsx
// 1. imports
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. types/interfaces
interface Props {
  // ...
}

// 3. component
const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // hooks
  // state
  // handlers
  // effects
  // render
  return <div>...</div>;
};

export default ComponentName;
```

## 🎨 스타일 가이드

### 색상 변수
```css
/* 과제 유형별 색상 */
--lecture-color: #4A90D9;    /* 📺 강의듣기 - 파랑 */
--activity-color: #7CB342;   /* 📝 액티비티 - 초록 */
--ai-chat-color: #9C27B0;    /* 💬 AI대화 - 보라 */
--library-color: #FF9800;    /* 📚 영어도서관 - 주황 */
```

### Tailwind CSS 사용
- 기존 알공 LMS 디자인과 일관성 유지
- `LMS img/` 폴더의 스크린샷 참고

## 🔗 관련 파일

- `../database/schema.sql` - 데이터베이스 스키마
- `../algong-lms-improvement-plan.md` - 상세 개발 명세
- `../LMS img/` - UI 디자인 참고 이미지
