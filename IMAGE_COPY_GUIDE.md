# 스마트 파닉스 표지 이미지 복사 가이드

## 📸 이미지 파일 복사 방법

다음 이미지 파일들을 `public` 폴더로 복사해야 합니다:

### 복사할 파일들
1. `LMS img/스마트파닉스 표지1.png` → `public/smart-phonics-cover-1.png`
2. `LMS img/스마트파닉스 표지2.png` → `public/smart-phonics-cover-2.png`
3. `LMS img/스마트파닉스 표지3.png` → `public/smart-phonics-cover-3.png`
4. `LMS img/스마트파닉스 표지4.png` → `public/smart-phonics-cover-4.png`
5. `LMS img/스마트파닉스 표지5.png` → `public/smart-phonics-cover-5.png`

### 방법 1: 수동 복사 (Windows 탐색기)
1. `LMS img` 폴더 열기
2. `스마트파닉스 표지1.png` ~ `스마트파닉스 표지5.png` 파일 선택
3. `public` 폴더로 복사
4. 파일명을 위의 이름으로 변경

### 방법 2: PowerShell 명령어
```powershell
# 프로젝트 루트에서 실행
Copy-Item "LMS img\스마트파닉스 표지1.png" "public\smart-phonics-cover-1.png"
Copy-Item "LMS img\스마트파닉스 표지2.png" "public\smart-phonics-cover-2.png"
Copy-Item "LMS img\스마트파닉스 표지3.png" "public\smart-phonics-cover-3.png"
Copy-Item "LMS img\스마트파닉스 표지4.png" "public\smart-phonics-cover-4.png"
Copy-Item "LMS img\스마트파닉스 표지5.png" "public\smart-phonics-cover-5.png"
```

### 방법 3: 배치 파일 사용
`copy-images.bat` 파일 생성:
```batch
@echo off
copy "LMS img\스마트파닉스 표지1.png" "public\smart-phonics-cover-1.png"
copy "LMS img\스마트파닉스 표지2.png" "public\smart-phonics-cover-2.png"
copy "LMS img\스마트파닉스 표지3.png" "public\smart-phonics-cover-3.png"
copy "LMS img\스마트파닉스 표지4.png" "public\smart-phonics-cover-4.png"
copy "LMS img\스마트파닉스 표지5.png" "public\smart-phonics-cover-5.png"
echo Images copied successfully!
pause
```

## ✅ 확인 방법

복사가 완료되면 `public` 폴더에 다음 파일들이 있어야 합니다:
- `smart-phonics-cover-1.png`
- `smart-phonics-cover-2.png`
- `smart-phonics-cover-3.png`
- `smart-phonics-cover-4.png`
- `smart-phonics-cover-5.png`

## 🎨 기능 설명

각 표지 이미지를 클릭하면:
- **표지1**: 1~8단원 표시
- **표지2**: 9~16단원 표시
- **표지3**: 17~24단원 표시
- **표지4**: 25~32단원 표시
- **표지5**: 33~40단원 표시

각 단원을 클릭하면 해당 단원의 학습 결과를 확인할 수 있습니다.
