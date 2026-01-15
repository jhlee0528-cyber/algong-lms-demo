# 스마트 파닉스 표지 이미지 매핑 가이드

## 현재 매핑

| 파일명 | 단원 범위 | 라벨 |
|--------|----------|------|
| smartphonics-cover-1.png | 1~8단원 | 1~8단원 |
| smartphonics-cover-2.png | 9~16단원 | 9~16단원 |
| smartphonics-cover-3.png | 17~24단원 | 17~24단원 |
| smartphonics-cover-4.png | 25~32단원 | 25~32단원 |
| smartphonics-cover-5.png | 33~40단원 | 33~40단원 |

## 매핑 수정 방법

만약 파일명과 단원 범위가 맞지 않다면, `src/components/units/UnitCoverSelector.tsx` 파일의 `COVER_CONFIG` 배열을 수정하세요.

예를 들어, `smartphonics-cover-1.png`가 실제로는 9~16단원을 나타내야 한다면:

```typescript
const COVER_CONFIG = [
  { id: 1, image: '/smartphonics-cover-1.png', startUnit: 9, endUnit: 16, label: '9~16단원' },
  // ...
];
```

## 확인 방법

1. 각 표지 이미지를 클릭했을 때 올바른 단원 범위가 표시되는지 확인
2. 예: cover-1을 클릭했을 때 1~8단원이 나와야 함
3. 만약 다른 범위가 나온다면 매핑을 수정해야 함
