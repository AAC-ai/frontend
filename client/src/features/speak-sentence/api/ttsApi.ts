import { API_BASE_URL, HttpError } from '@/shared/api';

const TTS_ERROR_MESSAGES: Record<number, string> = {
  400: '텍스트가 비어있어요.',
  401: '로그인이 필요해요.',
  500: '음성 생성에 실패했어요.',
};

export async function fetchTtsAudio(text: string): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const message = TTS_ERROR_MESSAGES[response.status] ?? `요청에 실패했어요 (${response.status})`;
    throw new HttpError(response.status, message);
  }

  return response.blob();
}
