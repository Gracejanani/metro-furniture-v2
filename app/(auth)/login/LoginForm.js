"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Lock, LogIn, Mail } from "lucide-react";
import { posBusiness } from "@/data/pos-business";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    const redirect = searchParams.get("redirect") || "/dashboard";
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c8a96a] to-[#8a6d3b] text-lg font-bold text-[#121316]">
            MF
          </div>
          <h1 className="text-2xl font-bold tracking-wide">{posBusiness.name}</h1>
          <p className="mt-1 text-xs tracking-[0.2em] text-[#c8a96a]">{posBusiness.tagline}</p>
          <p className="mt-4 text-sm text-white/50">Staff login — POS & Billing</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-4"
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1a1c20] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-[#c8a96a]/50"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" aria-hidden />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#1a1c20] py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-[#c8a96a]/50"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c8a96a] to-[#a8843a] py-3 text-sm font-semibold text-[#121316] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Signing in…
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" aria-hidden />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
