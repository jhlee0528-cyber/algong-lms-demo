# LMS 작업 요약 문서

## 📅 작업 일시
2026년 1월 15일

---

## 🔧 주요 작업 내용

### 1. 도메인 주소 변경
**작업 내용**: 아이디 주소를 `algong.com`에서 `argong.com`으로 변경

**수정 파일**:
- `src/pages/LearningStatusPage.tsx`
  - 이메일 주소 도메인 변경: `student${idx + 1}@algong.com` → `student${idx + 1}@argong.com`

---

### 2. 학습설정 탭 아이콘 변경
**작업 내용**: 학습설정 탭 아이콘을 톱니바퀴(⚙️)에서 연필(✏️)로 변경

**수정 파일**:
- `src/components/common/Sidebar.tsx`
- `src/components/common/Header.tsx`

**변경 내용**:
- 기존: ⚙️ (톱니바퀴)
- 변경: ✏️ (연필)

---

### 3. 도서 선택하기 오류 수정
**작업 내용**: 학습설정 > 과제 미션 관리 > 신규미션 생성 > 도서 선택하기 버튼 클릭 시 발생하던 오류 수정

**문제점**:
- `LibraryBookSelector.tsx`에서 `books`가 `undefined`일 때 `filter` 호출 오류
- `LevelTreeView.tsx`에서 `selectedDomain`이 `DOMAIN_LEVELS`에 없을 때 오류

**수정 파일**:
- `src/components/task/LibraryBookSelector.tsx`
  - `response?.books || []`로 안전 처리
  - catch 블록에서 `setBooks([])` 추가
  - `books.filter`를 `(books || [])`로 처리
  - 도서 목록이 없을 때 빈 메시지 표시

- `src/components/smartree/LevelTreeView.tsx`
  - `DOMAIN_LEVELS[selectedDomain] || SERIES_ORDER`로 기본값 처리

---

### 4. 탭 구조 개편 작업

#### 4-1. 1~2단계: 타입 및 데이터 정의

**생성 파일**:
- `src/types/classroom.ts`
  - `StudentStatus` 타입 (learning/online/offline)
  - `STUDENT_STATUS_CONFIG` 설정 객체
  - `ClassroomStudent` 인터페이스
  - `LevelStudentGroup` 인터페이스
  - `LevelDisplayMode` 타입

**수정 파일**:
- `src/data/dummyStudentData.ts`
  - `CLASSROOM_STUDENTS` 배열 추가 (20명 학생 데이터, 상태 포함)
  - `getStudentsByLevel` 함수 추가
  - `getLevelStudentGroup` 함수 추가
  - `getAllLevelGroups` 함수 추가

#### 4-2. 3~4단계: 수업보기 컴포넌트 및 페이지

**생성 파일**:
- `src/components/classroom/StudentStatusBadge.tsx`
  - 학생 상태 뱃지 컴포넌트 (학습중/접속중/오프라인)
  - 학습중일 때 펄스 애니메이션

- `src/components/classroom/LevelStudentPopover.tsx`
  - 레벨 클릭 시 학생 목록 팝오버
  - 상태별 정렬 (학습중 > 접속중 > 오프라인)
  - 학생 정보 및 활동 시간 표시

- `src/components/classroom/ClassroomLevelCard.tsx`
  - 레벨 카드 컴포넌트
  - 상태별 색상 구분 (초록/파랑/회색)
  - 학생 수 및 상태 점 표시

- `src/components/classroom/ClassroomLevelMap.tsx`
  - 전체 레벨 맵 컴포넌트
  - 영역별 필터링 지원
  - 그룹별 레벨 표시 (Spark/Motivate/Activate)

- `src/components/classroom/index.ts`
  - 컴포넌트 export 파일

- `src/pages/ClassroomPage.tsx`
  - 수업보기 메인 페이지
  - 학생 선택 드롭다운
  - 영역 필터 탭 (전체/Phonics/Speaking/Reading/Grammar/Writing)
  - 레벨 맵 표시
  - 학생 상세보기 모달 연동

#### 4-3. 5~6단계: 새 스마트리 페이지 및 라우팅

**생성 파일**:
- `src/data/curriculum/saStories.ts`
  - SA 레벨 레슨 더미 데이터
  - 단어, 스토리 포함

- `src/data/curriculum/index.ts`
  - 커리큘럼 데이터 export

- `src/components/smartree/CurriculumBrowser.tsx`
  - 커리큘럼 브라우저 컴포넌트
  - 레벨 선택 기능
  - 레슨 펼치기/접기
  - 단어 및 스토리 표시
  - 음성 재생 기능
  - 퀴즈 시작 버튼

**수정 파일**:
- `src/pages/SmartreePage.tsx` (재작성)
  - 커리큘럼 + 학습도구 탭 구조
  - 탭: 커리큘럼, 단어 퀴즈, 플래시카드, 파닉스, 문장 읽기
  - 레벨 선택 기능
  - 퀴즈 모드 선택 (예습/복습)

- `src/App.tsx`
  - `/class-view` 라우트를 `ClassroomPage`로 변경
  - `ClassroomPage` import 추가

---

### 5. lucide-react 오류 수정
**작업 내용**: `lucide-react` 패키지가 설치되어 있지 않아 발생한 오류를 SVG 아이콘으로 대체

**수정 파일**:
- `src/components/classroom/LevelStudentPopover.tsx`
  - `Clock` 아이콘 → SVG 시계 아이콘으로 대체

- `src/components/classroom/ClassroomLevelCard.tsx`
  - `Users` 아이콘 → SVG 사용자 그룹 아이콘으로 대체

- `src/components/smartree/CurriculumBrowser.tsx`
  - `ChevronDown`, `ChevronRight` → SVG 화살표 아이콘으로 대체
  - `Volume2` → SVG 스피커 아이콘으로 대체
  - `Play` → SVG 재생 아이콘으로 대체

---

### 6. 음성 재생 기능 개선
**작업 내용**: 단어를 읽어주는 음성을 여성 목소리로 변경

**수정 파일**:
- `src/components/smartree/CurriculumBrowser.tsx`

**주요 변경사항**:
1. **음성 목록 로드 처리**
   - `useEffect`를 추가하여 음성 목록 비동기 로드 처리
   - Chrome 등에서 `voiceschanged` 이벤트 대기

2. **여성 목소리 자동 선택**
   - 영어 여성 목소리 자동 검색
   - 지원 플랫폼:
     - Microsoft Zira (Windows)
     - Apple Samantha, Karen, Susan, Victoria (macOS)
     - Google UK/US/Australian English Female
     - 기타 "female" 포함 음성

3. **음성 설정 조정**
   - `pitch: 1.1`로 여성 목소리에 가깝게 조정
   - 여성 목소리를 찾지 못한 경우 영어 음성 중 하나 선택

---

## 📁 새로 생성된 파일 목록

### 타입 정의
- `src/types/classroom.ts`

### 데이터 파일
- `src/data/curriculum/saStories.ts`
- `src/data/curriculum/index.ts`

### 컴포넌트
- `src/components/classroom/StudentStatusBadge.tsx`
- `src/components/classroom/LevelStudentPopover.tsx`
- `src/components/classroom/ClassroomLevelCard.tsx`
- `src/components/classroom/ClassroomLevelMap.tsx`
- `src/components/classroom/index.ts`
- `src/components/smartree/CurriculumBrowser.tsx`

### 페이지
- `src/pages/ClassroomPage.tsx`

---

## 🔄 수정된 파일 목록

### 페이지
- `src/pages/LearningStatusPage.tsx` (도메인 변경)
- `src/pages/SmartreePage.tsx` (재작성)

### 컴포넌트
- `src/components/common/Sidebar.tsx` (아이콘 변경)
- `src/components/common/Header.tsx` (아이콘 변경)
- `src/components/task/LibraryBookSelector.tsx` (오류 수정)
- `src/components/smartree/LevelTreeView.tsx` (오류 수정)
- `src/components/classroom/LevelStudentPopover.tsx` (lucide-react 제거, 음성 개선)
- `src/components/classroom/ClassroomLevelCard.tsx` (lucide-react 제거)
- `src/components/smartree/CurriculumBrowser.tsx` (lucide-react 제거, 음성 개선)

### 데이터
- `src/data/dummyStudentData.ts` (CLASSROOM_STUDENTS 추가)

### 라우팅
- `src/App.tsx` (라우트 수정)

---

## ✨ 주요 기능

### 수업보기 탭
- **학생 상태별 색상 구분**
  - 학습중: 초록색 (🟢)
  - 접속중: 파란색 (🔵)
  - 오프라인: 회색 (⚪)

- **레벨별 학생 관리**
  - 레벨 클릭 시 해당 레벨 학생 목록 팝오버 표시
  - 학생의 현재 Unit 및 영역 정보 표시
  - 학습 시간 및 마지막 활동 시간 표시

- **영역별 필터링**
  - 전체, Phonics, Speaking, Reading, Grammar, Writing 필터 지원

### 스마트리 탭 (새 버전)
- **커리큘럼 브라우저**
  - 레벨별 레슨 목록 표시
  - 단어 및 스토리 표시
  - 음성 재생 기능 (여성 목소리)
  - 레슨별 퀴즈 시작 기능

- **학습도구 탭**
  - 단어 퀴즈 (예습/복습 모드)
  - 플래시카드
  - 파닉스
  - 문장 읽기

---

## 🎯 작업 완료 상태

- ✅ 도메인 주소 변경
- ✅ 학습설정 탭 아이콘 변경
- ✅ 도서 선택하기 오류 수정
- ✅ 탭 구조 개편 (1~6단계 완료)
- ✅ lucide-react 오류 수정
- ✅ 음성 재생 기능 개선 (여성 목소리)

---

## 📝 참고사항

1. **음성 재생**: 브라우저와 OS에 따라 사용 가능한 여성 음성이 다를 수 있습니다.
2. **학습도구**: 현재는 UI만 구현되어 있으며, 실제 기능은 추후 구현 예정입니다.
3. **커리큘럼 데이터**: 현재는 SA 레벨만 더미 데이터가 있으며, 다른 레벨은 추후 추가 예정입니다.

---

## 🔗 관련 문서

- `cursor-prompt-tab-restructure.md` - 탭 구조 개편 상세 명세서
