# 알공스마트리 LMS (공부방용)

영어 파닉스 학습 관리 시스템의 공부방/소규모 학원 최적화 버전

## 📁 프로젝트 구조

```
C:\Users\DNSOFT\Documents\★작업폴더\LMS\
│
├── 📁 LMS img/                          # 현재 알공 LMS 화면 캡처
│   ├── 학습현황_*.png                    # 학습현황 탭 화면들
│   ├── 학습설정_*.png                    # 학습설정 탭 화면들
│   ├── 수업보기_*.png                    # 수업보기 탭 화면들
│   └── 스마트리_*.png                    # 스마트리 탭 화면들
│
├── 📄 algong-lms-improvement-plan.md    # 개선 계획서 v2 (상세 명세)
├── 📄 알공 LMS 공부방용 개선 계획서.pdf    # 마인드맵 구조도
├── 📄 .cursorrules                      # Cursor AI 설정 파일
├── 📄 README.md                         # 이 파일
│
├── 📁 src/                              # 소스 코드 (생성 예정)
│   ├── 📁 components/
│   ├── 📁 hooks/
│   ├── 📁 api/
│   ├── 📁 types/
│   └── 📁 utils/
│
└── 📁 database/                         # DB 스키마 (생성 예정)
    └── 📄 schema.sql
```

## 🎯 프로젝트 목표

**핵심**: 신규미션 생성 시 과제 선택 옵션 확장 (2개 → 4개)

| 기존 | 개선 후 |
|---|---|
| 액티비티 (듣기/읽기/말하기/쓰기) | 📺 **강의듣기 (스마트리)** 🆕 |
| AI 대화 (교과서 대화) | 📝 액티비티 |
| - | 💬 AI 대화 |
| - | 📚 **영어도서관** 🆕 |

## 🚀 시작하기

### 1. 프로젝트 초기화

```bash
# 프로젝트 폴더로 이동
cd "C:\Users\DNSOFT\Documents\★작업폴더\LMS"

# package.json 생성 (기존 package-lock.json 삭제 후)
npm init -y

# 의존성 설치
npm install react react-dom typescript @types/react @types/node
npm install tailwindcss postcss autoprefixer
npm install @tanstack/react-query zustand axios
npm install -D vite @vitejs/plugin-react
```

### 2. Cursor AI에서 개발 시작

```
1. Cursor로 LMS 폴더 열기
2. .cursorrules 파일이 자동 인식됨
3. Chat에서 개발 요청:
   - "Phase 1의 DB 스키마부터 구현해줘"
   - "LectureTaskCard 컴포넌트 만들어줘"
```

## 📋 참조 문서

### 화면 참조 (`LMS img/` 폴더)
- 현재 UI 디자인 확인
- 색상, 레이아웃, 버튼 스타일 참고
- 기존 컴포넌트와 일관성 유지

### 기능 명세 (`algong-lms-improvement-plan.md`)
- DB 스키마 설계
- API 엔드포인트 명세
- 컴포넌트 구조 및 코드 예시
- 타입 정의

### 시스템 구조 (`알공 LMS 공부방용 개선 계획서.pdf`)
- 전체 메뉴 구조 마인드맵
- 화면 흐름도
- 기능별 연결 관계

## 🔧 개발 순서

### Phase 1: 기반 작업 (Week 1-2)
```
□ DB 스키마 생성
  - library_books 테이블
  - student_lecture_progress 테이블
  - student_library_progress 테이블
  - missions 테이블 필드 추가

□ API 구현
  - POST /api/missions (미션 생성)
  - GET /api/library/books (도서 목록)
  - GET /api/students/:id/progress (진행 현황)

□ 기본 타입 정의
  - mission.ts
  - library.ts
  - progress.ts
```

### Phase 2: 과제 선택 UI (Week 3-4)
```
□ TaskSelector.tsx (메인 컨테이너)
□ LectureTaskCard.tsx (강의듣기 - 신규)
□ ActivityTaskCard.tsx (액티비티 - 리팩토링)
□ AiChatTaskCard.tsx (AI대화 - 리팩토링)
□ LibraryTaskCard.tsx (영어도서관 - 신규)
□ LibraryBookSelector.tsx (도서 선택 모달)
```

### Phase 3: 학습현황 연동 (Week 5-6)
```
□ 학생 과제 현황 테이블에 유형 표시
□ 과제별 진행률 컴포넌트
□ 유형별 필터 기능
```

### Phase 4: 고도화 (Week 7-8)
```
□ 영어도서관 독후 퀴즈
□ AI 종합 학습 레포트 연동
□ 테스트 및 버그 수정
```

## 🎨 디자인 가이드

### 색상 체계
```css
/* 과제 유형별 색상 */
--lecture-color: #4A90D9;    /* 📺 강의듣기 - 파랑 */
--activity-color: #7CB342;   /* 📝 액티비티 - 초록 */
--ai-chat-color: #9C27B0;    /* 💬 AI대화 - 보라 */
--library-color: #FF9800;    /* 📚 영어도서관 - 주황 */

/* 상태 색상 */
--completed: #4CAF50;        /* 완료 - 초록 */
--incomplete: #F48FB1;       /* 미완료 - 핑크 */
--in-progress: #2196F3;      /* 진행중 - 파랑 */
```

### 아이콘 체계
| 용도 | 아이콘 |
|---|---|
| 강의듣기 | 📺 |
| 액티비티 | 📝 |
| AI 대화 | 💬 |
| 영어도서관 | 📚 |
| 완료 | ✅ |
| 미완료 | ❌ |
| 진행중 | ⏳ |

## 💡 Cursor AI 사용 팁

### 효과적인 프롬프트 예시

```
# 컴포넌트 생성
"LMS img 폴더의 학습설정_신규미션_생성1.png을 참고해서 
LectureTaskCard 컴포넌트를 만들어줘. 
algong-lms-improvement-plan.md의 코드 예시를 기반으로 해줘."

# 스타일 일관성
"기존 알공 LMS의 버튼 스타일과 동일하게 만들어줘.
LMS img 폴더의 이미지에서 버튼 스타일 확인해줘."

# API 구현
"algong-lms-improvement-plan.md의 API 명세대로
도서 목록 API를 구현해줘."

# 디버깅
"이 에러가 나는데, LMS img 폴더의 화면처럼 
동작해야 해. 수정해줘."
```

### 파일 참조하기
```
# 특정 파일 참조
@algong-lms-improvement-plan.md 이 파일의 DB 스키마대로 구현해줘

# 이미지 참조
@LMS img/학습설정_신규미션_생성1.png 이 화면과 동일하게 만들어줘
```

## 📞 문의

- **개발사**: DNSOFT
- **이메일**: support@dnsoft.co.kr
- **주소**: 서울시 금천구 디지털로9길 46 이엔씨드림타워 7차 503호
