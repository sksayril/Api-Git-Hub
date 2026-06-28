"use client";

import { useState } from "react";
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";

interface AuthOverlayProps {
  onSuccess: (user: { name: string; email: string; id: string }) => void;
}

export default function AuthOverlay({ onSuccess }: AuthOverlayProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const payload = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      onSuccess(data.user);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0c10]/80 backdrop-blur-lg px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e1117] p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative backdrop glow */}
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-6 relative">
          <div className="h-12 w-12 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-accent mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            {isLogin
              ? "Sign in to complete your checkout and access files."
              : "Register to manage purchases and get instant access."}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-rose-500/10 border border-rose-500/25 p-3 text-xs text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                  <User className="h-4 w-4" />
                </span>
                <input
                  id="auth-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/4 pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                <Mail className="h-4 w-4" />
              </span>
              <input
                id="auth-email"
                type="email"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/4 pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
                <Lock className="h-4 w-4" />
              </span>
              <input
                id="auth-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/4 pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-white/5 pt-4 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-xs text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Sign up here"
              : "Already have an account? Log in here"}
          </button>
        </div>
      </div>
    </div>
  );
}
