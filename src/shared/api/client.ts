export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`요청에 실패했어요 (${response.status})`);
  }

  return response.json() as Promise<T>;
}
