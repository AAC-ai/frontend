const BASE = import.meta.env.VITE_API_BASE_URL as string;

async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
}

export async function exchangeGoogleCode(code: string): Promise<void> {
  const res = await authFetch(`/auth/google/callback?code=${encodeURIComponent(code)}`);
  if (!res.ok) throw new Error('Google 인증에 실패했어요');
}

export async function logout(): Promise<void> {
  const res = await authFetch('/auth/logout', { method: 'POST' });
  if (!res.ok && res.status !== 204) throw new Error('로그아웃에 실패했어요');
}
