import { HttpError } from './types';
import type { ApiResponse } from './types';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

async function refreshToken(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new HttpError(401, '인증이 필요합니다.');
}

export async function apiFetch<T>(path: string, options: RequestInit = {}, _retry = false): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401 && !_retry) {
    await refreshToken();
    return apiFetch<T>(path, options, true);
  }

  if (!response.ok) {
    let message = `요청에 실패했어요 (${response.status})`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // 응답 body 파싱 실패 시 기본 메시지 사용
    }
    throw new HttpError(response.status, message);
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  const json = (await response.json()) as ApiResponse<T>;
  return json.data;
}
