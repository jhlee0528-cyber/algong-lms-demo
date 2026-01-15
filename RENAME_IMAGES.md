# 이미지 파일명 변경 가이드

한글 파일명이 브라우저에서 제대로 로드되지 않을 수 있으므로, 영문 파일명으로 변경하는 것을 권장합니다.

## 방법 1: 수동 변경 (Windows 탐색기)

1. `public` 폴더 열기
2. 다음 파일들을 찾아서 이름 변경:
   - `스마트파닉스 표지1.png` → `smart-phonics-cover-1.png`
   - `스마트파닉스 표지2.png` → `smart-phonics-cover-2.png`
   - `스마트파닉스 표지3.png` → `smart-phonics-cover-3.png`
   - `스마트파닉스 표지4.png` → `smart-phonics-cover-4.png`
   - `스마트파닉스 표지5.png` → `smart-phonics-cover-5.png`

## 방법 2: PowerShell 명령어

프로젝트 루트에서 실행:

```powershell
cd public
Rename-Item "스마트파닉스 표지1.png" "smart-phonics-cover-1.png"
Rename-Item "스마트파닉스 표지2.png" "smart-phonics-cover-2.png"
Rename-Item "스마트파닉스 표지3.png" "smart-phonics-cover-3.png"
Rename-Item "스마트파닉스 표지4.png" "smart-phonics-cover-4.png"
Rename-Item "스마트파닉스 표지5.png" "smart-phonics-cover-5.png"
```

## 방법 3: 배치 파일 사용

`rename-images.bat` 파일 생성 후 실행:

```batch
@echo off
cd public
ren "스마트파닉스 표지1.png" "smart-phonics-cover-1.png"
ren "스마트파닉스 표지2.png" "smart-phonics-cover-2.png"
ren "스마트파닉스 표지3.png" "smart-phonics-cover-3.png"
ren "스마트파닉스 표지4.png" "smart-phonics-cover-4.png"
ren "스마트파닉스 표지5.png" "smart-phonics-cover-5.png"
echo Files renamed successfully!
pause
```

## 파일명 변경 후

파일명을 변경한 후에는 코드가 자동으로 영문 파일명을 사용하도록 이미 수정되어 있습니다.
