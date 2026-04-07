# 디자인 시스템

## 토큰: `src/shared/tokens/`

### colors.ts
```typescript
// CSS custom properties로 관리 → 고대비 모드 전환 용이
export const colors = {
  '--color-primary':            '#2563EB',
  '--color-primary-hover':      '#1D4ED8',
  '--color-primary-foreground': '#FFFFFF',
  '--color-surface':            '#FFFFFF',
  '--color-surface-secondary':  '#F8FAFC',
  '--color-border':             '#E2E8F0',
  '--color-success':            '#16A34A',
  '--color-error':              '#DC2626',
  '--color-text-primary':       '#0F172A',   // 대비비 16.75:1
  '--color-text-secondary':     '#475569',   // 대비비 5.9:1
} as const;
```
`index.css` `:root {}` 블록으로 주입.  
고대비 모드: `[data-theme="high-contrast"]` 셀렉터로 오버라이드.

### typography.ts
```typescript
// rem 단위 필수 (브라우저 폰트 크기 설정 존중)
export const fontSize = {
  sm:   '0.875rem',  // 14px
  base: '1rem',      // 16px — 최소 기준
  lg:   '1.125rem',  // 18px
  xl:   '1.25rem',   // 20px
  '2xl': '1.5rem',   // 24px
} as const;
```

### spacing.ts
```typescript
// 4px 기반 배수
export const spacing = {
  1: '0.25rem', 2: '0.5rem', 3: '0.75rem',
  4: '1rem', 6: '1.5rem', 8: '2rem',
  12: '3rem', 16: '4rem',
} as const;
```

---

## 컴포넌트: `src/shared/ui/`

### Button
```typescript
interface ButtonProps {
  size: 'sm' | 'md' | 'lg' | 'xl';  // xl = 64px (AAC 주요 터치 타겟)
  variant: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}
```

### WordCard
```typescript
interface WordCardProps {
  label: string;
  category: string;
  emoji?: string;
  isSelected: boolean;
  onToggle: () => void;
}
// 최소 60×60px, aria-pressed 필수, 이모지(상단)+텍스트(하단) 수직 배치
// 선택 상태: 색상 변경 + 테두리 변경 (둘 다)
```

### SentenceDisplay
```typescript
interface SentenceDisplayProps {
  sentence: string;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}
// aria-live="polite" aria-atomic="true" 필수
```

### ErrorMessage
```typescript
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
// 아이콘 + 텍스트 조합 필수, 재시도 버튼 포함
```

---

## 새 컴포넌트 추가 체크리스트

- [ ] `src/shared/ui/<Name>/` 디렉토리 생성
- [ ] `Name.tsx` + `Name.module.css` + `index.ts` 생성
- [ ] Props 타입 `interface NameProps` 파일 상단 선언
- [ ] `src/shared/ui/index.ts` export 추가
- [ ] 터치 타겟 44px 이상 확인
- [ ] `<button>` 사용, `aria-*` 속성 적용
- [ ] `/accessibility` 실행
