// lib/services/auth.ts
import { api } from "@/lib/http";

export type SignUpBody = { email: string; password: string; fullName: string };
export const signup = (b: SignUpBody) =>
  api<{ ok: true }>("/api/auth/signup", { method: "POST", body: JSON.stringify(b) });

export type LoginBody = { email: string; password: string; rememberMe?: boolean };

export const login = (b: LoginBody) =>
  api<{ ok: true; user: { id: string; email: string; fullName: string | null } }>(
    "/api/auth/login",
    { method: "POST", body: JSON.stringify(b) },
  );

export const me = () => api<{ user: { id: string; email: string; fullName: string | null } }>("/api/auth/me");

export const logout = () => api<{ ok: true }>("/api/auth/logout", { method: "POST" });