# AI 문장 생성 API

## 스펙 (확정)

```
POST /api/sentence/generate
Content-Type: application/json
```

```typescript
interface SentenceGenerateRequest {
  words: Array<{
    category: string;  // 예: "음식"
    label: string;     // 예: "밥"
  }>;
}

interface SentenceGenerateResponse {
  sentence: string;
}
```

요청 예시:
```json
{
  "words": [
    { "category": "음식", "label": "밥" },
    { "category": "감정", "label": "배고파" },
    { "category": "행동", "label": "먹고싶어" }
  ]
}
```

## 파일 구조

```
src/features/generate-sentence/
  model/sentence.types.ts      # Request/Response 타입
  api/sentenceApi.ts           # fetch 함수
  api/useSentenceMutation.ts   # TanStack Query mutation
  ui/GenerateButton.tsx
  index.ts
```

## 구현 패턴

### sentenceApi.ts
```typescript
export async function generateSentence(
  request: SentenceGenerateRequest
): Promise<SentenceGenerateResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/sentence/generate`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    }
  );
  if (!response.ok) throw new Error(`문장 생성에 실패했어요 (${response.status})`);
  return response.json() as Promise<SentenceGenerateResponse>;
}
```

### useSentenceMutation.ts
```typescript
export function useSentenceMutation() {
  return useMutation({
    mutationFn: (request: SentenceGenerateRequest) => generateSentence(request),
  });
}
```

### 컴포넌트 사용
```typescript
const { mutate, isPending, isError, reset, data } = useSentenceMutation();
// 빈 단어 목록 방지 필수
if (selectedWords.length === 0) return;
mutate({ words: selectedWords });
```

## 환경 변수

`.env.local` (gitignore에 포함):
```
VITE_API_BASE_URL=http://localhost:8080
```
`.env.example` (저장소에 커밋):
```
VITE_API_BASE_URL=
```

## UI 반영 체크리스트

- [ ] `isPending` → 버튼 `disabled` + `aria-busy="true"` + LoadingSpinner
- [ ] `isError` → ErrorMessage (아이콘+텍스트) + 재시도 버튼 (`reset()`)
- [ ] `data.sentence` → `aria-live="polite"` 영역에 표시
- [ ] 빈 words 배열 클라이언트 검증
- [ ] `.env.local` + `.env.example` 파일 생성
