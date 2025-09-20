"use client";

import { login } from "@/lib/services/auth";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link  from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {


  const { refresh } = useAuth();
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null); setLoading(true);
    const f = new FormData(e.currentTarget);
    try {
      await login({ email: String(f.get("email")), password: String(f.get("password")) });
      await refresh();           // /me → levanta el usuario al contexto
      router.push("/Dashboard"); // listo
    } catch (e: any) {
      setErr(e.message ?? "Invalid credentials");
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="email@example.com" maxLength={200} required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/LostPassword"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" minLength={16} maxLength={64} required />
        </div>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "..." : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/SignUp" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}
