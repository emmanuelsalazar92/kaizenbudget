// app/providers/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { me, logout as apiLogout } from "@/lib/services/auth";

type User = { id: string; email: string; fullName: string | null };
type Ctx = { user: User | null; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void> };

const AuthCtx = createContext<Ctx>({ user: null, loading: true, refresh: async () => {}, logout: async () => {} });
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try { const r = await me(); setUser(r.user); } 
    catch { setUser(null); } 
    finally { setLoading(false); }
  };

  const logout = async () => { await apiLogout(); setUser(null); };

  useEffect(() => { refresh(); }, []);

  return <AuthCtx.Provider value={{ user, loading, refresh, logout }}>{children}</AuthCtx.Provider>;
}