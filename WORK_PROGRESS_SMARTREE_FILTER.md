# 스마트리 탭 영역별 필터링 기능 구현

## 📅 작업 일시
2026년 1월 14일

---

## 🎯 작업 개요

스마트리 탭에 영역별 필터링 기능을 추가하여, 각 영역(Phonics, Speaking, Reading, Grammar, Writing)에 포함된 레벨만 표시하도록 구현했습니다. 또한 레벨 그룹 이름을 변경했습니다.

---

## 1. 레벨 그룹 이름 변경

### 작업 내용
스마트리 탭의 레벨 그룹 이름을 변경했습니다.

### 변경 사항
- **Starter** → **Spark**
- **Main** → **Motivate**
- **Advanced** → **Activate**

### 수정된 파일

#### 1. `src/types/smartree.ts`
- `LevelGroup` 타입 정의 변경
  ```typescript
  export type LevelGroup = 'Spark' | 'Motivate' | 'Activate';
  ```

#### 2. `src/data/curriculumLevels.ts`
- `SERIES_TO_GROUP` 매핑 업데이트
  - SA, SB → Spark
  - MA, MB → Motivate
  - AA, AB → Activate
- `LEVELS_BY_GROUP` 키 업데이트
- `GROUP_CONFIG` 키 업데이트

#### 3. `src/components/smartree/LevelTreeView.tsx`
- `groups` 배열 업데이트: `['Spark', 'Motivate', 'Activate']`
- 그룹 이름 조건문 업데이트

### 결과
- Spark (이전 Starter): SA, SB 시리즈
- Motivate (이전 Main): MA, MB 시리즈
- Activate (이전 Advanced): AA, AB 시리즈

---

## 2. 영역별 필터링 기능 구현

### 작업 내용
각 영역(Phonics, Speaking, Reading, Grammar, Writing)에 포함된 레벨만 표시하도록 필터링 기능을 구현했습니다.

### 영역별 포함 레벨 정의

| 영역 | 포함 시리즈 | 레벨 수 | 범위 |
|------|------------|--------|------|
| **Phonics** | SA, SB, MA | 18개 | Spark 전체 + Motivate A |
| **Speaking** | SA, SB, MA, MB, AA, AB | 36개 | 전체 |
| **Reading** | SA, SB, MB | 18개 | Spark 전체 + Motivate B |
| **Grammar** | MA, AA, AB | 18개 | Motivate A + Activate 전체 |
| **Writing** | MB, AA, AB | 18개 | Motivate B + Activate 전체 |

### 수정된 파일

#### 1. `src/data/curriculumLevels.ts`

**추가된 내용:**

```typescript
// ⭐ 영역별 포함 레벨 정의 (핵심!)
export const DOMAIN_LEVELS: Record<Domain, LevelSeries[]> = {
  Phonics: ['SA', 'SB', 'MA'],           // 18레벨
  Speaking: ['SA', 'SB', 'MA', 'MB', 'AA', 'AB'],  // 36레벨 전체
  Reading: ['SA', 'SB', 'MB'],           // 18레벨
  Grammar: ['MA', 'AA', 'AB'],           // 18레벨
  Writing: ['MB', 'AA', 'AB'],           // 18레벨
};

// 영역별 레벨 목록 가져오기
export const getLevelsForDomain = (domain: Domain): LevelInfo[] => {
  const allowedSeries = DOMAIN_LEVELS[domain];
  return ALL_LEVELS.filter((level) => allowedSeries.includes(level.series));
};

// 특정 레벨이 특정 영역에 포함되는지 확인
export const isLevelInDomain = (levelCode: LevelCode, domain: Domain): boolean => {
  const series = levelCode.slice(0, 2) as LevelSeries;
  return DOMAIN_LEVELS[domain].includes(series);
};

// 영역별 레벨 수
export const DOMAIN_LEVEL_COUNT: Record<Domain, number> = {
  Phonics: 18,
  Speaking: 36,
  Reading: 18,
  Grammar: 18,
  Writing: 18,
};
```

#### 2. `src/components/smartree/LevelTreeView.tsx`

**주요 변경사항:**

1. **Props에 `selectedDomain` 추가**
   ```typescript
   interface LevelTreeViewProps {
     levelProgress: LevelProgress;
     highlightLevel?: LevelCode;
     selectedDomain: Domain | 'all';  // ⭐ 추가
     onLevelClick: (levelCode: LevelCode) => void;
   }
   ```

2. **필터링 로직 구현**
   ```typescript
   // ⭐ 영역별 허용 시리즈 가져오기
   const allowedSeries: LevelSeries[] = selectedDomain === 'all' 
     ? SERIES_ORDER 
     : DOMAIN_LEVELS[selectedDomain];
   
   // ⭐ 선택된 영역에 포함되는 레벨만 필터링
   const levels = allLevels.filter((l) => allowedSeries.includes(l.series));
   
   // 해당 그룹에 표시할 레벨이 없으면 그룹 전체 숨김
   if (levels.length === 0) return null;
   ```

3. **Series A/B 조건부 렌더링**
   - 해당 영역에 포함될 때만 Series A/B 표시
   - 빈 시리즈는 렌더링하지 않음

#### 3. `src/components/smartree/DomainTabs.tsx`

**주요 변경사항:**

1. **레벨 수 표시 추가**
   ```typescript
   import { DOMAIN_LEVEL_COUNT } from '../../data/curriculumLevels';
   
   // 전체 탭
   📚 전체 (36)
   
   // 영역별 탭
   🔤 Phonics (18)
   🎤 Speaking (36)
   📖 Reading (18)
   📝 Grammar (18)
   ✍️ Writing (18)
   ```

#### 4. `src/pages/SmartreePage.tsx`

**주요 변경사항:**

1. **`selectedDomain`을 `LevelTreeView`에 전달**
   ```typescript
   <LevelTreeView
     levelProgress={DUMMY_PROGRESS}
     highlightLevel={selectedStudent?.currentLevel}
     selectedDomain={selectedDomain}  // ⭐ 추가
     onLevelClick={handleLevelClick}
   />
   ```

---

## 🎨 필터링 동작 예시

### 전체 보기
```
┌─────────────────────────────────────────────────────────────┐
│  [📚 전체 (36)] [🔤 Phonics] [🎤 Speaking] ...             │
│                                                             │
│  🌱 Spark (SA, SB)                                          │
│  ┌────┬────┬────┬────┬────┬────┐  SA                       │
│  │SA1 │SA2 │SA3 │SA4 │SA5 │SA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  ┌────┬────┬────┬────┬────┬────┐  SB                       │
│  │SB1 │SB2 │SB3 │SB4 │SB5 │SB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│                                                             │
│  🌿 Motivate (MA, MB)                                       │
│  ┌────┬────┬────┬────┬────┬────┐  MA                       │
│  │MA1 │MA2 │MA3 │MA4 │MA5 │MA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  ┌────┬────┬────┬────┬────┬────┐  MB                       │
│  │MB1 │MB2 │MB3 │MB4 │MB5 │MB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│                                                             │
│  🌳 Activate (AA, AB)                                       │
│  ┌────┬────┬────┬────┬────┬────┐  AA                       │
│  │AA1 │AA2 │AA3 │AA4 │AA5 │AA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  ┌────┬────┬────┬────┬────┬────┐  AB                       │
│  │AB1 │AB2 │AB3 │AB4 │AB5 │AB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### Phonics 선택 시 (SA, SB, MA만 - 18레벨)
```
┌─────────────────────────────────────────────────────────────┐
│  [📚 전체] [🔤 Phonics✓ (18)] [🎤 Speaking] ...            │
│                                                             │
│  🌱 Spark (SA, SB)                                          │
│  ┌────┬────┬────┬────┬────┬────┐  SA                       │
│  │SA1 │SA2 │SA3 │SA4 │SA5 │SA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  ┌────┬────┬────┬────┬────┬────┐  SB                       │
│  │SB1 │SB2 │SB3 │SB4 │SB5 │SB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│                                                             │
│  🌿 Motivate (MA만 표시)                                    │
│  ┌────┬────┬────┬────┬────┬────┐  MA                       │
│  │MA1 │MA2 │MA3 │MA4 │MA5 │MA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  (MB 없음 - Phonics에 포함되지 않음)                        │
│                                                             │
│  (🌳 Activate 그룹 전체 숨김 - Phonics에 없음)              │
└─────────────────────────────────────────────────────────────┘
```

### Reading 선택 시 (SA, SB, MB만 - 18레벨)
```
┌─────────────────────────────────────────────────────────────┐
│  [📚 전체] [🔤 Phonics] [📖 Reading✓ (18)] ...            │
│                                                             │
│  🌱 Spark (SA, SB)                                          │
│  ┌────┬────┬────┬────┬────┬────┐  SA                       │
│  │SA1 │SA2 │SA3 │SA4 │SA5 │SA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  ┌────┬────┬────┬────┬────┬────┐  SB                       │
│  │SB1 │SB2 │SB3 │SB4 │SB5 │SB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│                                                             │
│  🌿 Motivate (MB만 표시)                                    │
│  (MA 없음 - Reading에 포함되지 않음)                        │
│  ┌────┬────┬────┬────┬────┬────┐  MB                       │
│  │MB1 │MB2 │MB3 │MB4 │MB5 │MB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│                                                             │
│  (🌳 Activate 그룹 전체 숨김 - Reading에 없음)              │
└─────────────────────────────────────────────────────────────┘
```

### Grammar 선택 시 (MA, AA, AB만 - 18레벨)
```
┌─────────────────────────────────────────────────────────────┐
│  [📚 전체] [🔤 Phonics] [📝 Grammar✓ (18)] ...             │
│                                                             │
│  (🌱 Spark 그룹 전체 숨김 - Grammar에 없음)                 │
│                                                             │
│  🌿 Motivate (MA만 표시)                                    │
│  ┌────┬────┬────┬────┬────┬────┐  MA                       │
│  │MA1 │MA2 │MA3 │MA4 │MA5 │MA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  (MB 없음 - Grammar에 포함되지 않음)                         │
│                                                             │
│  🌳 Activate (AA, AB)                                       │
│  ┌────┬────┬────┬────┬────┬────┐  AA                       │
│  │AA1 │AA2 │AA3 │AA4 │AA5 │AA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  ┌────┬────┬────┬────┬────┬────┐  AB                       │
│  │AB1 │AB2 │AB3 │AB4 │AB5 │AB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### Writing 선택 시 (MB, AA, AB만 - 18레벨)
```
┌─────────────────────────────────────────────────────────────┐
│  [📚 전체] [🔤 Phonics] [✍️ Writing✓ (18)] ...              │
│                                                             │
│  (🌱 Spark 그룹 전체 숨김 - Writing에 없음)                 │
│                                                             │
│  🌿 Motivate (MB만 표시)                                    │
│  (MA 없음 - Writing에 포함되지 않음)                        │
│  ┌────┬────┬────┬────┬────┬────┐  MB                       │
│  │MB1 │MB2 │MB3 │MB4 │MB5 │MB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│                                                             │
│  🌳 Activate (AA, AB)                                       │
│  ┌────┬────┬────┬────┬────┬────┐  AA                       │
│  │AA1 │AA2 │AA3 │AA4 │AA5 │AA6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
│  ┌────┬────┬────┬────┬────┬────┐  AB                       │
│  │AB1 │AB2 │AB3 │AB4 │AB5 │AB6 │                           │
│  └────┴────┴────┴────┴────┴────┘                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 작업 통계

### 수정된 파일
- `src/types/smartree.ts` - 레벨 그룹 타입 변경
- `src/data/curriculumLevels.ts` - 영역별 레벨 정의 및 유틸리티 함수 추가
- `src/components/smartree/LevelTreeView.tsx` - 필터링 로직 구현
- `src/components/smartree/DomainTabs.tsx` - 레벨 수 표시 추가
- `src/pages/SmartreePage.tsx` - selectedDomain 전달

### 총 작업 파일 수
- **수정: 5개**

---

## ✅ 완료 체크리스트

### 레벨 그룹 이름 변경
- [x] `LevelGroup` 타입 정의 변경
- [x] `SERIES_TO_GROUP` 매핑 업데이트
- [x] `LEVELS_BY_GROUP` 키 업데이트
- [x] `GROUP_CONFIG` 키 업데이트
- [x] `LevelTreeView` 그룹 배열 및 조건문 업데이트

### 영역별 필터링 기능
- [x] `DOMAIN_LEVELS` 영역별 포함 레벨 정의
- [x] `getLevelsForDomain()` 함수 추가
- [x] `isLevelInDomain()` 함수 추가
- [x] `DOMAIN_LEVEL_COUNT` 상수 추가
- [x] `LevelTreeView`에 `selectedDomain` prop 추가
- [x] 영역별 레벨 필터링 로직 구현
- [x] 해당 영역에 없는 그룹/시리즈 숨김 처리
- [x] `DomainTabs`에 레벨 수 표시 추가
- [x] `SmartreePage`에서 `selectedDomain` 전달

### 영역별 레벨 표시 확인
- [x] **전체**: 36레벨 모두 표시
- [x] **Phonics**: SA, SB, MA만 표시 (18레벨)
- [x] **Speaking**: 전체 36레벨 표시
- [x] **Reading**: SA, SB, MB만 표시 (18레벨)
- [x] **Grammar**: MA, AA, AB만 표시 (18레벨)
- [x] **Writing**: MB, AA, AB만 표시 (18레벨)

---

## 🔍 기술 세부사항

### 필터링 로직 흐름

1. **사용자가 영역 탭 선택**
   - `DomainTabs`에서 `selectedDomain` 상태 업데이트

2. **허용된 시리즈 계산**
   ```typescript
   const allowedSeries: LevelSeries[] = selectedDomain === 'all' 
     ? SERIES_ORDER  // 전체: 모든 시리즈
     : DOMAIN_LEVELS[selectedDomain];  // 특정 영역: 해당 영역의 시리즈만
   ```

3. **레벨 필터링**
   ```typescript
   const levels = allLevels.filter((l) => allowedSeries.includes(l.series));
   ```

4. **그룹/시리즈 숨김 처리**
   - 필터링 후 레벨이 없으면 그룹 전체 숨김 (`return null`)
   - Series A/B가 비어있으면 해당 시리즈 섹션 숨김

### 성능 고려사항

- 필터링은 메모이제이션 없이 매 렌더링마다 수행되지만, 레벨 수가 적어(36개) 성능 문제 없음
- 향후 레벨 수가 증가하면 `useMemo`로 최적화 가능

---

## 🎉 완료

모든 작업이 성공적으로 완료되었으며, 린터 오류 없이 모든 파일이 수정되었습니다.

스마트리 페이지에서 영역 탭을 선택하면 해당 영역에 포함된 레벨만 표시되며, 포함되지 않는 그룹과 시리즈는 자동으로 숨겨집니다.
