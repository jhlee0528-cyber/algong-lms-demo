# 이미지 파일 설정 가이드

## 📸 로고 이미지 설정

### 1. 로고 이미지 파일 준비
- 원본 위치: `LMS img/LMS 헤더.png` (또는 다른 로고 이미지)
- 대상 위치: `public/logo.png`
- 권장 크기: 200x50px 또는 비슷한 비율
- 형식: PNG, JPG, SVG

### 2. 이미지 복사 방법

#### Windows PowerShell:
```powershell
# 로고 이미지를 public 폴더로 복사
Copy-Item "LMS img\LMS 헤더.png" -Destination "public\logo.png"
```

#### Windows CMD:
```cmd
copy "LMS img\LMS 헤더.png" "public\logo.png"
```

#### 수동 복사:
1. `LMS img` 폴더에서 로고 이미지 파일 찾기
2. 파일을 `public` 폴더로 복사
3. 파일명을 `logo.png`로 변경

### 3. 이미지가 없을 경우
로고 이미지가 없으면 텍스트 로고("알공스마트리 LMS")가 자동으로 표시됩니다.

## 🎨 헤더 구성 요소

### 좌측
- **로고 이미지** (`/logo.png`)
- **텍스트 로고** (이미지가 없을 경우)

### 우측
- **공부방 정보**: 공부방 이름 / 선생님 이름
- **설정 아이콘** (⚙️): 설정 모달 열기
- **물음표 아이콘** (❓): 도움말 모달 열기
- **나가기 아이콘** (로그아웃)

## 📋 참고 이미지 파일

다음 이미지 파일들은 UI 개발 시 참고용으로 사용됩니다:
- `LMS img/LMS 헤더.png` - 헤더 디자인 참고
- `LMS img/설정_*.png` - 설정 화면 참고
- `LMS img/물음표_*.png` - 도움말 화면 참고

## ✅ 확인 사항

1. `public/logo.png` 파일이 존재하는지 확인
2. 이미지 파일이 올바른 형식인지 확인
3. 브라우저에서 `/logo.png`로 직접 접근 가능한지 확인
