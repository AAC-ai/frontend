# AAC 프론트엔드

LLM 기반 보완대체의사소통(AAC) 웹 앱. 카테고리에서 단어/기호를 선택하면 AI가 한국어 문장을 생성한다.

**핵심 사용자:** 복합 의사소통 요구자(CCN), 아동, 장애인  
**최우선 원칙:** 접근성 > 낮은 인지 부하 > 개발 편의성

---

## 기술 스택

| 항목 | 선택 |
|---|---|
| 번들러 | Vite 8 |
| 프레임워크 | React 19 (React Compiler 활성화) |
| 언어 | TypeScript 6 (strict) |
| 라우팅 | React Router v7 |
| 서버 상태 | TanStack Query v5 |
| 클라이언트 상태 | Zustand (최소화) |
| 패키지 매니저 | pnpm |
| 린트 | ESLint 9 (flat config) |

React Compiler 활성화 → `useMemo`, `useCallback` 불필요하게 추가 금지.

---

## 아키텍처: FSD

상세 → `/fsd`

```
app → pages → widgets → features → entities → shared
```

- 위 방향으로만 import 가능
- 동일 레이어 간 cross-import 금지
- 각 슬라이스는 `index.ts` public API 필수
- 세그먼트: `ui/` `model/` `api/`

---

## 디자인 시스템

상세 → `/design-system`

- 토큰: `src/shared/tokens/` (colors, typography, spacing, radius)
- 컴포넌트: `src/shared/ui/` (Button, WordCard, CategoryChip, SentenceDisplay, LoadingSpinner, ErrorMessage)
- CSS custom properties 기반 → `data-theme="high-contrast"` 고대비 모드 전환

---

## 상태 관리

| 상황 | 선택 |
|---|---|
| AI 문장 생성 | TanStack Query `useMutation` |
| 선택된 단어 목록 | Zustand (`features/select-word/model/`) |
| 사용자 설정 (글자크기, 고대비) | Zustand + persist (`shared/model/`) |
| 단일 컴포넌트 UI 상태 | `useState` |

**하나의 전역 store 금지.** 슬라이스별로 분리.

---

## AI API 스펙

상세 → `/api`

```
POST /api/sentence/generate
```

```json
{
  "words": [
    { "category": "음식", "label": "밥" },
    { "category": "감정", "label": "배고파" }
  ]
}
```

연동 위치: `features/generate-sentence/api/`

---

## 접근성

상세 → `/accessibility`

- 터치 타겟 최소 44×44px
- `<div onClick>` 금지 → `<button>` 사용
- `aria-live`, `aria-pressed`, `aria-busy` 필수 적용
- `prefers-reduced-motion` 미디어 쿼리 필수

---

## 로컬 데이터 관리

카테고리/단어 데이터는 백엔드 없이 프론트에서 관리.  
위치: `src/entities/<slice>/model/`  
TypeScript 파일로 작성. 순수 객체 배열, 함수/동적 로직 금지.  
이후 백엔드 연동 시 해당 파일만 API 호출로 교체.

---

## 브랜치/커밋/PR

```
feat/#<이슈번호>-<설명>
fix/#<이슈번호>-<설명>
chore/#<이슈번호>-<설명>
```

커밋: `/commit` 스킬 사용 (한국어, 역할별 분류)  
PR: 하나의 PR = 하나의 이슈, `closes #<번호>` 필수  
워크플로우: `/issue-branch`

---

## 커맨드 목록

| 커맨드 | 역할 |
|---|---|
| `/feature` | 새 기능 구현 — FSD 레이어 결정 ~ 코드 생성 |
| `/fsd` | FSD 규칙 확인 및 위반 점검 |
| `/accessibility` | 접근성 원칙 확인 및 리뷰 |
| `/api` | AI 문장 생성 API 스펙 및 연동 코드 생성 |
| `/design-system` | 디자인 시스템 토큰/컴포넌트 가이드 |
| `/issue-branch` | GitHub 이슈 → 브랜치 → PR |
