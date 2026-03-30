# 알공 LMS 데모 - Claude 작업 규칙

## 프로젝트 기본 정보
- 프레임워크: Vue.js (Vue CLI)
- 배포: GitHub Pages (gh-pages 브랜치)
- 로컬 실행: npm run serve → localhost:8080
- 빌드: npm run build
- 브랜치 구조: 이재호-수정(작업) → demo(소스) → gh-pages(배포)

## 배포 규칙 (반드시 준수)
1. 코드 수정 후 반드시 npm run build 실행해서 빌드 성공 확인
2. gh-pages 배포 시 dist 파일이 반드시 루트(/)에 위치해야 함
3. 배포 후 반드시 아래 검증 명령어 실행할 것:
   - grep 으로 수정한 함수가 실제 파일에 있는지 확인
   - git log --oneline -3 으로 커밋 확인

## 반복된 실수 기록
- [2026-03] getStudentStatus import 누락: DashboardView.vue에 import 추가 필수
- [2026-03] gh-pages 배포 시 파일이 하위폴더에 들어가는 문제: dist/* 를 루트에 직접 복사
- [2026-03] Math.random() 사용 금지: 학생 데이터는 반드시 seededRandom(studentId 기반) 사용
- [2026-03] getStudentSeed에 undefined 전달 방지: 항상 null/undefined 방어 코드 포함

## 작업 순서 원칙
1. 파일 읽기 → 2. 문제 분석 보고 → 3. 수정 → 4. grep으로 수정 확인 → 5. 빌드 → 6. 배포

## 더미 데이터 원칙
- 학생별 데이터는 반드시 studentId 기반 seededRandom 사용
- Math.random() 절대 사용 금지 (새로고침마다 데이터가 바뀌는 문제 발생)
- 더미 데이터 useDummyData = true 스위치 구조 유지
