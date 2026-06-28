"use client";

import { useState, useRef } from "react";
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  IdCard,
  MapPin,
  Building2,
  CreditCard,
  Upload,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";

type SellerSession = {
  sellerId: string;
  name: string;
  email: string;
  status: string;
  verified: boolean;
};

interface Props {
  onSuccess: (seller: SellerSession) => void;
}

type OverlayView = "login" | "signup";
type SignupStep = 1 | 2;

export default function SellerAuthOverlay({ onSuccess }: Props) {
  const [view, setView] = useState<OverlayView>("login");
  const [step, setStep] = useState<SignupStep>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingStatus, setPendingStatus] = useState<"pending" | "rejected" | null>(null);
  const [showPass, setShowPass] = useState(false);

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup Step 1
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [sAddress, setSAddress] = useState("");

  // Signup Step 2
  const [sIdNumber, setSIdNumber] = useState("");
  const [sBankName, setSBankName] = useState("");
  const [sBankAccount, setSBankAccount] = useState("");
  const [sBankIFSC, setSBankIFSC] = useState("");
  const [sIdFile, setSIdFile] = useState<File | null>(null);
  const [sPassbookFile, setSPassbookFile] = useState<File | null>(null);
  const [signupDone, setSignupDone] = useState(false);

  const idFileRef = useRef<HTMLInputElement>(null);
  const passbookFileRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setPendingStatus(null);
    try {
      const res = await fetch("/api/seller/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.status === "pending") {
          setPendingStatus("pending");
        } else if (data.status === "rejected") {
          setPendingStatus("rejected");
        } else {
          setError(data.error || "Login failed.");
        }
        return;
      }
      onSuccess(data.seller);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sIdFile || !sPassbookFile) {
      setError("Please upload both ID proof and bank passbook images.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", sName);
      formData.append("email", sEmail);
      formData.append("password", sPassword);
      formData.append("address", sAddress);
      formData.append("idProofNumber", sIdNumber);
      formData.append("bankAccountName", sBankName);
      formData.append("bankAccountNumber", sBankAccount);
      formData.append("bankIFSC", sBankIFSC);
      formData.append("idProofImage", sIdFile);
      formData.append("bankPassbookImage", sPassbookFile);

      const res = await fetch("/api/seller/signup", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed.");
        return;
      }
      setSignupDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Pending / Rejected screens ──────────────────────────────────────────────

  if (pendingStatus === "pending") {
    return (
      <SellerAuthShell>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Under Review</h2>
          <p className="text-sm text-zinc-400 max-w-xs">
            Your seller application is currently under review by our admin team. You will receive an update once verified.
          </p>
          <button
            onClick={() => setPendingStatus(null)}
            className="mt-2 text-xs text-zinc-500 hover:text-zinc-300 underline cursor-pointer"
          >
            ← Back to login
          </button>
        </div>
      </SellerAuthShell>
    );
  }

  if (pendingStatus === "rejected") {
    return (
      <SellerAuthShell>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Application Rejected</h2>
          <p className="text-sm text-zinc-400 max-w-xs">
            Unfortunately, your seller application was rejected. Please contact our support team for more information.
          </p>
          <button
            onClick={() => setPendingStatus(null)}
            className="mt-2 text-xs text-zinc-500 hover:text-zinc-300 underline cursor-pointer"
          >
            ← Back to login
          </button>
        </div>
      </SellerAuthShell>
    );
  }

  if (signupDone) {
    return (
      <SellerAuthShell>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Application Submitted!</h2>
          <p className="text-sm text-zinc-400 max-w-xs">
            Your seller account and KYC documents have been submitted. Our team will review and approve your account shortly.
          </p>
          <button
            onClick={() => { setSignupDone(false); setView("login"); }}
            className="mt-4 w-full rounded-xl bg-brand-primary py-3 text-sm font-bold text-white hover:opacity-90 transition-all cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      </SellerAuthShell>
    );
  }

  // ─── LOGIN ───────────────────────────────────────────────────────────────────
  if (view === "login") {
    return (
      <SellerAuthShell>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-brand-primary/20 border border-brand-primary/30">
            <ShieldCheck className="w-5 h-5 text-brand-accent" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Seller Login</h2>
            <p className="text-[11px] text-zinc-500">Access your seller dashboard</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <FieldInput
            label="Email Address"
            icon={<Mail className="w-4 h-4" />}
            type="email"
            placeholder="seller@example.com"
            value={loginEmail}
            onChange={setLoginEmail}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><Lock className="w-4 h-4" /></span>
              <input
                type={showPass ? "text" : "password"}
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary/60"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Sign In</>}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-600 mt-5">
          New seller?{" "}
          <button onClick={() => { setView("signup"); setStep(1); setError(""); }} className="text-brand-accent hover:underline cursor-pointer">
            Register here
          </button>
        </p>
      </SellerAuthShell>
    );
  }

  // ─── SIGNUP ──────────────────────────────────────────────────────────────────
  return (
    <SellerAuthShell>
      {/* Progress stepper */}
      <div className="flex items-center gap-3 mb-6">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
              step >= s
                ? "bg-brand-primary border-brand-primary text-white"
                : "bg-white/5 border-white/10 text-zinc-500"
            }`}>
              {s}
            </div>
            <div className={`h-0.5 flex-1 rounded-full transition-all ${step > s ? "bg-brand-primary" : "bg-white/5"}`} />
          </div>
        ))}
        <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
          step >= 2
            ? "bg-brand-primary border-brand-primary text-white"
            : "bg-white/5 border-white/10 text-zinc-500"
        }`}>✓</div>
      </div>

      <div className="mb-5">
        <h2 className="text-lg font-bold text-white">
          {step === 1 ? "Basic Information" : "KYC & Bank Details"}
        </h2>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          {step === 1 ? "Step 1 of 2 — Tell us about yourself" : "Step 2 of 2 — Document verification required"}
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setError(""); setStep(2); }} className="space-y-3.5">
          <FieldInput label="Full Name" icon={<User className="w-4 h-4" />} type="text" placeholder="Your full legal name" value={sName} onChange={setSName} required />
          <FieldInput label="Email Address" icon={<Mail className="w-4 h-4" />} type="email" placeholder="seller@example.com" value={sEmail} onChange={setSEmail} required />
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"><Lock className="w-4 h-4" /></span>
              <input
                type={showPass ? "text" : "password"}
                required
                minLength={6}
                value={sPassword}
                onChange={(e) => setSPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary/60"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <FieldInput label="Full Address" icon={<MapPin className="w-4 h-4" />} type="text" placeholder="Your complete address" value={sAddress} onChange={setSAddress} required />
          <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-bold text-white hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer mt-1">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSignup} className="space-y-3.5">
          <FieldInput label="ID Proof Number (Aadhar / Passport)" icon={<IdCard className="w-4 h-4" />} type="text" placeholder="XXXX-XXXX-XXXX" value={sIdNumber} onChange={setSIdNumber} required />

          {/* ID Proof Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">ID Proof Image</label>
            <button
              type="button"
              onClick={() => idFileRef.current?.click()}
              className="w-full rounded-xl border border-dashed border-white/15 bg-white/[0.02] py-3 text-sm text-zinc-400 hover:border-brand-primary/40 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              {sIdFile ? sIdFile.name : "Upload ID card / Aadhar / Passport"}
            </button>
            <input ref={idFileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => setSIdFile(e.target.files?.[0] ?? null)} />
          </div>

          <FieldInput label="Bank Account Holder Name" icon={<Building2 className="w-4 h-4" />} type="text" placeholder="Name as per bank account" value={sBankName} onChange={setSBankName} required />
          <FieldInput label="Bank Account Number" icon={<CreditCard className="w-4 h-4" />} type="text" placeholder="Account number" value={sBankAccount} onChange={setSBankAccount} required />
          <FieldInput label="Bank IFSC Code" icon={<CreditCard className="w-4 h-4" />} type="text" placeholder="e.g. SBIN0001234" value={sBankIFSC} onChange={setSBankIFSC} required />

          {/* Passbook Upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Bank Passbook / Statement</label>
            <button
              type="button"
              onClick={() => passbookFileRef.current?.click()}
              className="w-full rounded-xl border border-dashed border-white/15 bg-white/[0.02] py-3 text-sm text-zinc-400 hover:border-brand-primary/40 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              {sPassbookFile ? sPassbookFile.name : "Upload passbook or statement (image/PDF)"}
            </button>
            <input ref={passbookFileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => setSPassbookFile(e.target.files?.[0] ?? null)} />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => { setStep(1); setError(""); }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-semibold text-zinc-300 hover:bg-white/[0.07] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent py-3 text-sm font-bold text-white hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShieldCheck className="w-4 h-4" /> Submit Application</>}
            </button>
          </div>
        </form>
      )}

      <p className="text-center text-xs text-zinc-600 mt-5">
        Already a seller?{" "}
        <button onClick={() => { setView("login"); setError(""); }} className="text-brand-accent hover:underline cursor-pointer">
          Sign in here
        </button>
      </p>
    </SellerAuthShell>
  );
}

// ─── Shell wrapper ────────────────────────────────────────────────────────────
function SellerAuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e]">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md mx-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl shadow-black/60 p-7 overflow-y-auto max-h-[90vh]">
        {children}
      </div>
    </div>
  );
}

// ─── Reusable field ───────────────────────────────────────────────────────────
function FieldInput({
  label, icon, type, placeholder, value, onChange, required,
}: {
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</span>
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary/60"
        />
      </div>
    </div>
  );
}
