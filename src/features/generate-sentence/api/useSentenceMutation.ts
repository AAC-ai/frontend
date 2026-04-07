import { useMutation } from '@tanstack/react-query';
import type { SentenceGenerateRequest } from '@/entities/sentence';
import { generateSentence } from './sentenceApi';

export function useSentenceMutation() {
  return useMutation({
    mutationFn: (request: SentenceGenerateRequest) => generateSentence(request),
  });
}
