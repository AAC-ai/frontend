import type { SentenceGenerateRequest, SentenceGenerateResponse } from '@/entities/sentence';

export async function generateSentence(
  request: SentenceGenerateRequest,
): Promise<SentenceGenerateResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/sentence/generate`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    throw new Error(`문장 생성에 실패했어요 (${response.status})`);
  }

  return response.json() as Promise<SentenceGenerateResponse>;
}
