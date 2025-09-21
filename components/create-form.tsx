"use client";
import { useState } from "react";
import { signup } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateUserForm({ className, ...props }: React.ComponentProps<"form">) {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const f = new FormData(e.currentTarget);

    const fullName = String(f.get("fullName") ?? "");
    const email = String(f.get("email") ?? "");
    const password = String(f.get("password") ?? "");
    const confirmPassword = String(f.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signup({ fullName, email, password });
      router.push("/");
    } catch (e: any) {
      setErr(e.message ?? "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Fill your information in order to create your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" type="text" placeholder="John Doe" maxLength={200} required />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="email@example.com" maxLength={200} required />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" minLength={16} maxLength={64} required />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" minLength={16} maxLength={64} required />
        </div>

        {err && <p className="text-red-600 text-sm">{err}</p>}

        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
}