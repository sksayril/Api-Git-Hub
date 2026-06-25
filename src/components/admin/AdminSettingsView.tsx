"use client";

import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Plug,
  Key,
  Palette,
  Building2,
  Save,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
  Smartphone,
} from "lucide-react";

type SettingsTab = "general" | "profile" | "security" | "notifications" | "integrations" | "api" | "appearance";

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: Building2 },
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "api", label: "API Keys", icon: Key },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const integrations = [
  { id: "mongo", name: "MongoDB Atlas", desc: "Database connection", connected: true, icon: "🍃" },
  { id: "stripe", name: "Stripe", desc: "Payment processing", connected: true, icon: "💳" },
  { id: "meta", name: "Meta Business", desc: "Facebook & Instagram ads", connected: false, icon: "📢" },
  { id: "ga", name: "Google Analytics", desc: "Traffic & analytics", connected: false, icon: "📊" },
  { id: "aws", name: "AWS S3", desc: "File storage & backups", connected: true, icon: "☁️" },
  { id: "smtp", name: "SMTP / Email", desc: "Transactional emails", connected: true, icon: "✉️" },
];

const apiKeys = [
  { id: "k1", name: "Production API", prefix: "ag_live_••••••••4f2a", created: "Mar 15, 2025", lastUsed: "2 hours ago" },
  { id: "k2", name: "Staging API", prefix: "ag_test_••••••••8b1c", created: "Apr 2, 2025", lastUsed: "1 day ago" },
  { id: "k3", name: "Webhook Secret", prefix: "whsec_••••••••9d3e", created: "May 10, 2025", lastUsed: "Never" },
];

function Toggle({ enabled, onChange, label }: { enabled: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
        enabled ? "bg-blue-600" : "bg-zinc-700"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function InputField({
  label,
  type = "text",
  defaultValue,
  placeholder,
  hint,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full bg-[#0d1117] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
      />
      {hint && <p className="text-[10px] text-zinc-600 mt-1">{hint}</p>}
    </div>
  );
}

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5">
        <h2 className="font-semibold text-white">{title}</h2>
        {description && <p className="text-xs text-zinc-500 mt-0.5">{description}</p>}
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

export default function AdminSettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReport: true,
    ticketUpdates: true,
    invoiceReminders: false,
    serverAlerts: true,
    marketingEmails: false,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Settings</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage your account, security, integrations, and platform preferences.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings sidebar */}
        <nav className="lg:w-56 shrink-0 flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                    : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* General */}
          {activeTab === "general" && (
            <>
              <SectionCard title="Company Information" description="CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Company Name" defaultValue="CRIPCOCODE TECHNOLOGIES PRIVATE LIMITED" />
                  <InputField label="Brand Name" defaultValue="Api GitHub / ProjectHub" />
                  <InputField label="CIN" defaultValue="U62013WB2025PTC277922" hint="Corporate Identification Number" />
                  <InputField label="Registration No." defaultValue="277922" />
                  <InputField label="Support Email" type="email" defaultValue="support@cripocode.com" />
                  <InputField label="Website" defaultValue="https://apigithub.com" />
                </div>
              </SectionCard>
              <SectionCard title="Regional Settings">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Timezone</label>
                    <select className="w-full bg-[#0d1117] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer">
                      <option>Asia/Kolkata (IST, UTC+5:30)</option>
                      <option>UTC</option>
                      <option>America/New_York (EST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Language</label>
                    <select className="w-full bg-[#0d1117] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Bengali</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Currency</label>
                    <select className="w-full bg-[#0d1117] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer">
                      <option>USD ($)</option>
                      <option>INR (₹)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Date Format</label>
                    <select className="w-full bg-[#0d1117] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer">
                      <option>MMM DD, YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </SectionCard>
            </>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <>
              <SectionCard title="Admin Profile">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold">
                    BR
                  </div>
                  <div>
                    <button type="button" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-[10px] text-zinc-600 mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Full Name" defaultValue="Biplop Roy" />
                  <InputField label="Email" type="email" defaultValue="biplop@cripocode.com" />
                  <InputField label="Phone" defaultValue="+91 98765 43210" />
                  <InputField label="Role" defaultValue="Super Admin" hint="Contact admin to change role" />
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Bio</label>
                    <textarea
                      rows={3}
                      defaultValue="Co-founder & CEO at Cripcocode Technologies. Building Api GitHub marketplace."
                      className="w-full bg-[#0d1117] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 resize-none"
                    />
                  </div>
                </div>
              </SectionCard>
            </>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <>
              <SectionCard title="Change Password">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                  <div className="sm:col-span-2 relative">
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Current Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-[#0d1117] border border-white/8 rounded-xl py-2.5 px-4 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[34px] text-zinc-500 hover:text-white"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <InputField label="New Password" type="password" placeholder="••••••••" />
                  <InputField label="Confirm Password" type="password" placeholder="••••••••" />
                </div>
              </SectionCard>
              <SectionCard title="Two-Factor Authentication" description="Add an extra layer of security to your account">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Authenticator App</p>
                      <p className="text-[10px] text-zinc-600">Not enabled · Recommended</p>
                    </div>
                  </div>
                  <button type="button" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </SectionCard>
              <SectionCard title="Active Sessions">
                <div className="space-y-3">
                  {[
                    { device: "Windows · Chrome", location: "Kolkata, IN", current: true, time: "Active now" },
                    { device: "Android · Chrome", location: "Kolkata, IN", current: false, time: "2 days ago" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-zinc-500" />
                        <div>
                          <p className="text-sm text-white flex items-center gap-2">
                            {s.device}
                            {s.current && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                                Current
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-zinc-600">{s.location} · {s.time}</p>
                        </div>
                      </div>
                      {!s.current && (
                        <button type="button" className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <SectionCard title="Notification Preferences" description="Choose what updates you receive">
              <div className="space-y-4">
                {[
                  { key: "emailAlerts" as const, label: "Email Alerts", desc: "Important account and system alerts" },
                  { key: "pushNotifications" as const, label: "Push Notifications", desc: "Browser push notifications" },
                  { key: "weeklyReport" as const, label: "Weekly Report", desc: "Summary of projects, revenue, and analytics" },
                  { key: "ticketUpdates" as const, label: "Support Ticket Updates", desc: "New tickets and status changes" },
                  { key: "invoiceReminders" as const, label: "Invoice Reminders", desc: "Pending and overdue invoice alerts" },
                  { key: "serverAlerts" as const, label: "Server Alerts", desc: "Downtime and performance warnings" },
                  { key: "marketingEmails" as const, label: "Marketing Emails", desc: "Product updates and newsletters" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/4 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-[10px] text-zinc-600">{item.desc}</p>
                    </div>
                    <Toggle
                      enabled={notifications[item.key]}
                      onChange={() =>
                        setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                      }
                      label={item.label}
                    />
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <SectionCard title="Connected Services" description="Manage third-party integrations">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {integrations.map((int) => (
                  <div
                    key={int.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{int.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{int.name}</p>
                        <p className="text-[10px] text-zinc-600">{int.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {int.connected ? (
                        <>
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            Connected
                          </span>
                          <button type="button" className="text-[10px] font-semibold text-zinc-500 hover:text-red-400 transition-colors">
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button type="button" className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* API Keys */}
          {activeTab === "api" && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{apiKeys.length} API keys active</p>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Generate Key
                </button>
              </div>
              <SectionCard title="API Keys" description="Manage access keys for external integrations">
                <div className="space-y-3">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{key.name}</p>
                        <p className="text-xs font-mono text-zinc-500 mt-0.5">{key.prefix}</p>
                        <p className="text-[10px] text-zinc-600 mt-1">
                          Created {key.created} · Last used {key.lastUsed}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" className="p-2 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Copy key">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button type="button" className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" aria-label="Revoke key">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-amber-500/80 mt-4 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Never share your API keys publicly or commit them to version control.
                </p>
              </SectionCard>
            </>
          )}

          {/* Appearance */}
          {activeTab === "appearance" && (
            <>
              <SectionCard title="Theme" description="Choose how the admin panel looks">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "dark" as const, label: "Dark", icon: Moon },
                    { id: "light" as const, label: "Light", icon: Sun },
                    { id: "system" as const, label: "System", icon: Monitor },
                  ].map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTheme(t.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                          theme === t.id
                            ? "border-blue-500/40 bg-blue-500/10 text-blue-400"
                            : "border-white/6 bg-white/[0.02] text-zinc-500 hover:border-white/12 hover:text-white"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs font-semibold">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </SectionCard>
              <SectionCard title="Display Options">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Compact Sidebar</p>
                      <p className="text-[10px] text-zinc-600">Reduce sidebar width</p>
                    </div>
                    <Toggle enabled={false} onChange={() => {}} label="Compact Sidebar" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Show Animations</p>
                      <p className="text-[10px] text-zinc-600">Enable UI transitions and effects</p>
                    </div>
                    <Toggle enabled={true} onChange={() => {}} label="Show Animations" />
                  </div>
                </div>
              </SectionCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
