"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Shield,
  Users,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";

type AuthTab = "signin" | "signup";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Track revenue, users, and performance live",
  },
  {
    icon: Users,
    title: "User & Access Management",
    desc: "Control roles, permissions, and team access",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security for your platform",
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mt-10 perspective-[1200px]">
      <div className="absolute -inset-4 bg-violet-600/20 blur-3xl rounded-full" />
      <div className="relative rotate-[-6deg] translate-x-2 rounded-2xl border border-white/10 bg-[#111114] p-4 shadow-2xl shadow-violet-900/40">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-red-500/80" />
          <div className="h-2 w-2 rounded-full bg-amber-500/80" />
          <div className="h-2 w-2 rounded-full bg-emerald-500/80" />
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {["$128K", "12.4K", "892"].map((v) => (
            <div key={v} className="rounded-lg bg-white/5 p-2 text-center">
              <p className="text-[10px] font-bold text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="h-16 rounded-lg bg-gradient-to-t from-violet-600/30 to-transparent border border-violet-500/20 relative overflow-hidden">
          <svg viewBox="0 0 200 60" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M0,50 C30,45 50,30 80,35 C110,40 130,15 160,20 C180,23 190,10 200,5" fill="none" stroke="#8b5cf6" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface AdminAuthPanelProps {
  defaultTab?: AuthTab;
}

export default function AdminAuthPanel({ defaultTab = "signin" }: AdminAuthPanelProps) {
  const router = useRouter();
  const [tab, setTab] = useState<AuthTab>(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchTab = (next: AuthTab) => {
    setTab(next);
    setError("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-[1100px] rounded-3xl border border-white/8 bg-[#0d0d10] overflow-hidden shadow-2xl shadow-black/60 flex flex-col lg:flex-row min-h-[640px]">
        {/* Left Hero */}
        <div className="hidden lg:flex lg:w-[42%] flex-col justify-between p-10 bg-gradient-to-br from-[#0a0a0b] via-[#0f0a18] to-[#0a0a0b] border-r border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.15),transparent_55%)] pointer-events-none" />

          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-3 group mb-10">
              <Image
                src="/images/api_github_logo.png"
                alt="ProjectHub"
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl object-cover ring-2 ring-violet-500/30 group-hover:ring-violet-500/50 transition-all"
              />
              <div>
                <p className="font-display font-bold text-lg text-white leading-none">ProjectHub</p>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500 uppercase mt-1">
                  Admin Portal
                </p>
              </div>
            </Link>

            <h1 className="text-3xl xl:text-4xl font-display font-bold text-white leading-tight mb-4">
              Manage. Monitor. Scale{" "}
              <span className="text-violet-400">Your Platform.</span>
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              Access your admin dashboard to manage projects, users, orders, and analytics — all in one place.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title} className="flex items-start gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-lg bg-violet-600/15 border border-violet-500/20 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-200">{f.title}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{f.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <DashboardPreview />
        </div>

        {/* Right Form */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-12 bg-[#111114]">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
            <Image
              src="/images/api_github_logo.png"
              alt="ProjectHub"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="font-display font-bold text-white">ProjectHub</span>
          </Link>

          {/* Tabs */}
          <div className="flex border-b border-white/8 mb-8">
            {(
              [
                { id: "signin" as const, label: "Sign In" },
                { id: "signup" as const, label: "Create Account" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => switchTab(t.id)}
                className={`relative pb-3 px-1 mr-8 text-sm font-semibold transition-colors ${
                  tab === t.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                )}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-white mb-1">
              {tab === "signin" ? "Welcome Back 👋" : "Create Account ✨"}
            </h2>
            <p className="text-sm text-zinc-500">
              {tab === "signin"
                ? "Sign in to access your admin dashboard"
                : "Register to get started with admin access"}
            </p>
          </div>

          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {tab === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label htmlFor="signin-email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="w-full bg-[#0a0a0b] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="signin-password" className="text-sm font-medium text-zinc-300">
                    Password
                  </label>
                  <button type="button" className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#0a0a0b] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-[#0a0a0b] text-violet-600 focus:ring-violet-500/30 focus:ring-offset-0"
                />
                <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  Keep me signed in on this device
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-zinc-300 mb-2">
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full bg-[#0a0a0b] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                />
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="w-full bg-[#0a0a0b] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    required
                    className="w-full bg-[#0a0a0b] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="signup-confirm" className="block text-sm font-medium text-zinc-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    id="signup-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    required
                    className="w-full bg-[#0a0a0b] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-zinc-600 whitespace-nowrap">or continue with</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-[#0a0a0b] border border-white/10 hover:border-white/20 rounded-xl py-3 text-sm font-medium text-zinc-300 transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-[#0a0a0b] border border-white/10 hover:border-white/20 rounded-xl py-3 text-sm font-medium text-zinc-300 transition-colors"
            >
              <GitHubIcon className="h-4 w-4" />
              Continue with GitHub
            </button>
          </div>

          <p className="text-center text-sm text-zinc-500 mt-6">
            {tab === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("signup")}
                  className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchTab("signin")}
                  className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Page footer */}
      <div className="mt-8 text-center space-y-2">
        <p className="flex items-center justify-center gap-2 text-xs text-zinc-600">
          <Shield className="w-3.5 h-3.5" />
          Secured with enterprise-grade encryption
        </p>
        <p className="text-xs text-zinc-700">© 2025 ProjectHub. All rights reserved.</p>
      </div>
    </div>
  );
}
