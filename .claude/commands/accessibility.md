# 접근성 원칙 및 리뷰

AAC 사용자(운동 제어 어려움, 인지 부하 높음)를 위한 접근성 기준.

## 핵심 원칙

### 터치 타겟
- 최소 44×44px (WCAG 2.5.5)
- WordCard 권장: 60px 이상
- `padding`으로 영역 확장 가능

### 시맨틱 HTML
- `<div onClick>` / `<span onClick>` **절대 금지** → `<button>` 사용
- 목록형 UI: `<ul>/<li>` 또는 `role="list"`
- 영역 구분: `<main>`, `<nav>`, `<section>`

### ARIA 필수 패턴
```tsx
// 동적 콘텐츠 (생성된 문장)
<div aria-live="polite" aria-atomic="true">{sentence}</div>

// 선택 토글 버튼
<button aria-pressed={isSelected}>{label}</button>

// 로딩 상태
<button aria-busy={isPending} disabled={isPending}>문장 만들기</button>

// 아이콘만 있는 버튼
<button aria-label="선택 초기화"><Icon aria-hidden="true" /></button>

// 로딩 스피너
<div role="status" aria-label="로딩 중"><Spinner /></div>
```

### 키보드
- Tab으로 모든 인터랙티브 요소 접근 가능
- Enter/Space로 버튼 활성화
- `outline: none` 제거 **금지**
```css
:focus-visible { outline: 3px solid var(--color-primary); outline-offset: 2px; }
```

### 색상 대비
- 일반 텍스트: 4.5:1 이상 (WCAG AA)
- 대형 텍스트(18px+): 3:1 이상
- 선택 상태: 색상 + 테두리 병용 (색상만 사용 금지)

### 모션
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 인지 부하
- 한 화면 선택지 **최대 8개**
- 비가역적 행동(초기화) 전 확인 단계 필수
- 에러 메시지: 아이콘 + 한국어 텍스트 조합

---

## 리뷰 체크리스트

인자로 파일 또는 디렉토리 지정. 예: `/accessibility src/features/select-word/`

### 심각 (즉시 수정)
- [ ] `<div onClick>` / `<span onClick>` 없음
- [ ] 터치 타겟 44px 이상
- [ ] `outline: none` 제거 없음
- [ ] 이미지/아이콘에 `alt` 또는 `aria-label`

### 경고 (가능한 빨리)
- [ ] `aria-live="polite"` — 동적 콘텐츠
- [ ] `aria-pressed` — 선택 토글
- [ ] `aria-busy="true"` — 로딩 중
- [ ] `prefers-reduced-motion` 적용 (애니메이션 있을 때)
- [ ] 선택 상태: 색상 + 테두리 병용

## 결과 형식

```
[접근성 리뷰] src/features/select-word/ui/WordCard.tsx

심각:
- <div onClick> 발견 → <button>으로 교체
  before: <div onClick={onToggle}>
  after:  <button type="button" onClick={onToggle}>

경고:
- aria-pressed 누락 → isSelected 상태에 aria-pressed 추가

통과:
- 터치 타겟 60px 확인
- aria-label 적용 확인
```
