const BASE = import.meta.env.VITE_API_BASE_URL as string;

async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  return res;
}

export async function exchangeGoogleCode(code: string): Promise<{ accessToken: string }> {
  const res = await authFetch(`/auth/google/callback?code=${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error('Google 인증에 실패했어요');
  return res.json() as Promise<{ accessToken: string }>;
}

export async function refreshAccessToken(): Promise<{ accessToken: string }> {
  const res = await authFetch('/auth/refresh', { method: 'POST' });
  if (!res.ok) throw new Error('토큰 재발급에 실패했어요');
  return res.json() as Promise<{ accessToken: string }>;
}

export async function reissueToken(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await authFetch('/auth/reissue', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw new Error('토큰 재발급에 실패했어요');
  const json = await res.json() as { status: number; message: string; data: { accessToken: string; refreshToken: string } };
  return json.data;
}

export async function logout(): Promise<void> {
  const res = await authFetch('/auth/logout', { method: 'POST' });
  if (!res.ok && res.status !== 204) throw new Error('로그아웃에 실패했어요');
}
