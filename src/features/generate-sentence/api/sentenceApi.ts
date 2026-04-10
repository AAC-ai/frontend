import { apiFetch } from "@/shared/api/client";
import type {
  SentenceGenerateRequest,
  SentenceGenerateResponse,
} from "@/entities/sentence";

export function generateSentence(
  request: SentenceGenerateRequest,
): Promise<SentenceGenerateResponse> {
  // emoji 필드는 프론트 전용 — API에는 category/label만 전송
  const body: SentenceGenerateRequest = {
    words: request.words.map(({ category, label }) => ({ category, label })),
  };
  return apiFetch<SentenceGenerateResponse>("/sentence", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
