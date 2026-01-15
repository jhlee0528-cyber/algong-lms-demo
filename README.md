# 알공스마트리 LMS (공부방용)

영어 파닉스 학습 관리 시스템의 공부방/소규모 학원 최적화 버전

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 3. 빌드

```bash
npm run build
```

## 📁 프로젝트 구조

```
LMS/
├── src/
│   ├── api/              # API 엔드포인트
│   ├── components/       # React 컴포넌트
│   ├── hooks/            # Custom React Hooks
│   ├── pages/            # 페이지 컴포넌트
│   ├── types/            # TypeScript 타입 정의
│   ├── utils/            # 유틸리티 함수
│   ├── styles/           # 전역 스타일
│   ├── App.tsx           # 메인 App 컴포넌트
│   └── main.tsx          # 진입점
├── database/
│   └── schema.sql        # 데이터베이스 스키마
├── package.json
└── vite.config.ts
```

## 🎯 주요 기능

### Phase 1: 핵심 기능
- ✅ DB 스키마 설계 및 생성
- ✅ TypeScript 타입 정의
- ✅ API 엔드포인트 구현
- ✅ 과제 선택 UI 컴포넌트 (4개 유형)

### Phase 2: 과제 선택 확장
- ✅ 강의듣기 (스마트리) - 1~6차시 선택
- ✅ 액티비티 - 4대 영역 선택
- ✅ AI 대화 - 교과서 대화
- ✅ 영어도서관 - 도서 선택

### Phase 3: 학습현황 연동
- ✅ 과제 유형별 진행률 표시
- ✅ 학생 과제 현황 테이블 확장
- ✅ 과제유형별 뷰 추가

### Phase 4: 고도화
- ✅ 영어도서관 독후 퀴즈 시스템
- ✅ AI 종합 학습 레포트
- ✅ 앱 라우팅 및 통합

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query) + Zustand
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **HTTP Client**: Axios

## 📋 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📚 참조 문서

- `algong-lms-improvement-plan.md` - 상세 개발 명세
- `database/schema.sql` - 데이터베이스 스키마
- `LMS img/` - UI 디자인 참고 이미지

## 📝 라이선스

Copyright © DNSOFT. All rights reserved.
