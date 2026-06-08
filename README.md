# AACO — AI-Powered AAC

**보완대체의사소통(AAC) 웹 · 모바일 애플리케이션**

말로 의사를 전달하기 어려운 사용자가 카테고리에서 단어를 고르면, AI가 자연스러운 한국어 문장을 완성해 주고 음성으로 읽어줍니다.

---

## 주요 기능

| 기능 | 설명 |
|---|---|
| 카테고리 단어 선택 | 음식·감정·행동·장소·사람·숫자·시간·몸·물건 9개 카테고리에서 원하는 단어를 고릅니다 |
| AI 문장 생성 | 선택한 단어 조합을 바탕으로 AI가 자연스러운 한국어 문장을 즉시 만들어 줍니다 |
| 음성 출력(TTS) | 생성된 문장을 한 번의 탭으로 소리 내어 읽어줍니다 |
| Google 로그인 | Google 계정으로 간편하게 로그인하고 이용 기록을 유지합니다 |
| 고대비 모드 | `data-theme="high-contrast"` 전환으로 시인성이 낮은 환경에서도 사용할 수 있습니다 |

---

## 모노레포 구조

```
aac/
├── client/   # 웹 프론트엔드 (React + Vite)
└── app/      # 모바일 앱 (React Native + Expo)
```

---

## 시작하기

### 요구 사항

- Node.js 20+
- pnpm 9+

### 설치

```bash
pnpm install
```

### 개발 서버

```bash
# 웹 (http://localhost:5173)
pnpm dev

# 모바일
pnpm app:start
pnpm app:ios
pnpm app:android
```

### 빌드

```bash
pnpm build
```

---

## 기술 스택

### 웹 (`client/`)

| 항목 | 선택 | 이유 |
|---|---|---|
| 번들러 | Vite 8 | 빠른 HMR, 프로덕션 최적화 |
| 프레임워크 | React 19 + React Compiler | 자동 메모이제이션으로 불필요한 재렌더링 제거 |
| 언어 | TypeScript 6 strict | 타입 안전성, 유지보수성 |
| 라우팅 | React Router v7 | 파일 기반 라우팅 |
| 서버 상태 | TanStack Query v5 | AI API 호출, 캐싱, 로딩/에러 상태 처리 |
| 클라이언트 상태 | Zustand v5 | 선택된 단어·사용자 설정 최소 전역 상태 |
| 스타일 | CSS Modules + CSS Custom Properties | 스코프 격리, 테마 전환 |

### 모바일 (`app/`)

| 항목 | 선택 |
|---|---|
| 프레임워크 | React Native 0.79 |
| 플랫폼 | Expo 53 + Expo Router |

---

## 아키텍처 (웹)

[Feature-Sliced Design(FSD)](https://feature-sliced.design/) 을 기반으로 레이어를 분리합니다.

```
app          — Provider, 라우팅
pages        — home, auth-callback
widgets      — word-selector, sentence-result
features     — select-word, generate-sentence, speak-sentence, auth
entities     — category, word, sentence, user
shared       — ui, api, tokens, model
```

- 레이어는 **위에서 아래 방향**으로만 import 가능합니다.
- 동일 레이어 간 cross-import는 금지합니다.
- 각 슬라이스는 `index.ts` 를 통해서만 외부에 공개됩니다.

---

## 접근성

복합 의사소통 요구자(CCN), 아동, 지체 장애인을 핵심 사용자로 설정하여 접근성을 최우선으로 구현합니다.

- 모든 터치 타겟 **최소 44×44 px** 보장
- `<div onClick>` 사용 금지 — 상호작용 요소는 반드시 `<button>` 사용
- `aria-live`, `aria-pressed`, `aria-busy` 적용으로 스크린 리더 대응
- `prefers-reduced-motion` 미디어 쿼리로 모션 감소 모드 지원

---

## 환경 변수

| 변수 | 패키지 | 설명 |
|---|---|---|
| `VITE_API_BASE_URL` | `client` | 백엔드 API 서버 주소 |

---

## 라이선스

MIT
