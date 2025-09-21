// lib/http.ts
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data?.error as string) || `HTTP ${res.status}`);
  }
  return data as T;
}