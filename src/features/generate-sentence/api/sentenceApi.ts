import { apiFetch } from '@/shared/api/client';
import type { SentenceGenerateRequest, SentenceGenerateResponse } from '@/entities/sentence';

export function generateSentence(
  request: SentenceGenerateRequest,
): Promise<SentenceGenerateResponse> {
  return apiFetch<SentenceGenerateResponse>('/sentence/generate', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
