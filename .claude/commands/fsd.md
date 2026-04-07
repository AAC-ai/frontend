# FSD 규칙 및 점검

## 레이어 계층 (위 → 아래만 import 가능)

```
app → pages → widgets → features → entities → shared
```

| 레이어 | 역할 | 금지 |
|---|---|---|
| `shared` | 범용 유틸, 디자인 시스템 | 도메인 개념, 상위 레이어 import |
| `entities` | 도메인 타입, 기본 UI | API 호출 |
| `features` | 단일 사용자 행동 | 여러 행동 묶기, 상위 레이어 import |
| `widgets` | feature/entity 조합 | 자체 비즈니스 로직 |
| `pages` | URL 대응, 레이아웃 조합 | 비즈니스 로직 직접 구현 |

동일 레이어 간 cross-import 금지 (예: `features/a` → `features/b`).

## 세그먼트

```
<layer>/<slice>/
  ui/       # React 컴포넌트
  model/    # 타입, Zustand store
  api/      # fetch 함수, TanStack Query hooks
  index.ts  # Public API (외부는 이것만 import 가능)
```

## 디렉토리 구조 예시

```
src/
  app/providers/ app/routes/ app/index.tsx
  pages/home/ui/HomePage.tsx
  widgets/word-selector/ui/ word-selector/model/ word-selector/index.ts
  features/select-word/ui/ select-word/model/selectedWordsStore.ts select-word/index.ts
  features/generate-sentence/ui/ generate-sentence/api/ generate-sentence/index.ts
  entities/category/model/category.types.ts entities/category/model/categoryData.ts
  entities/word/model/word.types.ts entities/word/model/wordData.ts
  shared/tokens/ shared/ui/ shared/api/client.ts
```

## 점검 방법

인자 없으면 최근 변경 파일 대상. 예: `/fsd src/features/select-word/`

**확인할 패턴:**
```bash
# shared에서 상위 레이어 import 탐지
grep -r "from '@/features\|from '@/entities\|from '@/pages" src/shared/

# 동일 레이어 cross-import 탐지
grep -r "from '@/features" src/features/
```

**Public API 위반 탐지:**
```
# 금지
import { X } from '@/features/select-word/ui/WordCard';
# 허용
import { X } from '@/features/select-word';
```

## 점검 결과 형식

```
[FSD 점검]

위반 (수정 필요):
- src/shared/ui/Button.tsx: features/select-word import (방향 위반)
  → import 제거 후 도메인 무관하게 리팩터

경고:
- src/widgets/word-selector/: index.ts 없음

통과:
- src/features/generate-sentence/: 정상
```

위반 항목은 수정 코드 직접 제시.
