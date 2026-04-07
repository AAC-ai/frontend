새 기능을 구현할 때 아래 순서로 진행해라.

## 1. FSD 레이어 결정

아래 기준으로 레이어를 결정한다.

| 레이어 | 기준 |
|---|---|
| `shared/ui` | 도메인 개념 없는 범용 컴포넌트 (Button, Spinner 등) |
| `entities` | Category, Word, Sentence 등 도메인 타입과 기본 UI |
| `features` | 단일 사용자 행동 (단어 선택, 문장 생성, 선택 초기화) |
| `widgets` | 여러 feature/entity 조합 독립 블록 |
| `pages` | URL 대응 페이지, 레이아웃 조합만 |

레이어 결정 후 슬라이스 이름을 kebab-case로 정한다.

## 2. 파일 구조 계획

```
src/<layer>/<slice>/
  ui/          # React 컴포넌트
  model/       # 타입, Zustand store
  api/         # API 훅 (필요 시)
  index.ts     # public API export
```

생성할 파일 목록을 먼저 나열하고 확인한다.

## 3. 상태 관리 선택

| 상황 | 선택 |
|---|---|
| AI 문장 생성 | TanStack Query `useMutation` |
| 선택된 단어 (여러 컴포넌트 공유) | Zustand store |
| 단일 컴포넌트 UI 상태 | `useState` |
| URL 공유 필요 | `useSearchParams` |

## 4. 구현

- Props 타입: 파일 상단 `interface ComponentNameProps`
- CSS: `.module.css` 사용
- `<div onClick>` 금지 → `<button>` 사용
- 터치 타겟 44px 이상 확인
- 로딩/에러/빈 상태 UI 반드시 구현

## 5. index.ts public API 작성

외부에 노출할 것만 export. 내부 구현은 export 금지.

```typescript
export { WordCard } from './ui/WordCard';
export type { WordCardProps } from './ui/WordCard';
```

## 6. 구현 후 검증

- `/fsd-check` 실행 → import 방향 검증
- UI 컴포넌트 있으면 `/a11y-review` 실행
- `/commit`으로 한국어 커밋
