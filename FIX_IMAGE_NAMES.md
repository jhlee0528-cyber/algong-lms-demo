# 이미지 파일명 수정 가이드

공백이 있는 파일명이 이미지 로딩에 문제를 일으킬 수 있습니다. 파일명의 공백을 하이픈(-)으로 변경하는 것을 권장합니다.

## 현재 파일명
- `smartphonics cover1.png`
- `smartphonics cover2.png`
- `smartphonics cover3.png`
- `smartphonics cover4.png`
- `smartphonics cover5.png`

## 권장 파일명 (공백을 하이픈으로 변경)
- `smartphonics-cover-1.png`
- `smartphonics-cover-2.png`
- `smartphonics-cover-3.png`
- `smartphonics-cover-4.png`
- `smartphonics-cover-5.png`

## 변경 방법

### 방법 1: Windows 탐색기에서 수동 변경
1. `public` 폴더 열기
2. 각 파일을 우클릭 → 이름 바꾸기
3. 공백을 하이픈으로 변경

### 방법 2: PowerShell 명령어
```powershell
cd public
Rename-Item "smartphonics cover1.png" "smartphonics-cover-1.png"
Rename-Item "smartphonics cover2.png" "smartphonics-cover-2.png"
Rename-Item "smartphonics cover3.png" "smartphonics-cover-3.png"
Rename-Item "smartphonics cover4.png" "smartphonics-cover-4.png"
Rename-Item "smartphonics cover5.png" "smartphonics-cover-5.png"
```

## 파일명 변경 후

파일명을 변경하면 코드가 자동으로 새로운 파일명을 사용하도록 이미 수정되어 있습니다.
