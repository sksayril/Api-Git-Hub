"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Tag,
  Server,
  Megaphone,
  Search,
  Database,
  BarChart3,
  Users,
  UserCog,
  CheckSquare,
  FileText,
  Headphones,
  Settings,
  Activity,
  Bell,
  Sun,
  ChevronDown,
  LogOut,
  TrendingUp,
  Zap,
  HelpCircle,
  ShoppingCart,
  BadgeCheck,
} from "lucide-react";

import AdminProjectsView from "@/components/admin/AdminProjectsView";
import AdminServersView from "@/components/admin/AdminServersView";
import AdminMetaAdsView from "@/components/admin/AdminMetaAdsView";
import AdminCategoriesView from "@/components/admin/AdminCategoriesView";
import AdminSeoToolsView from "@/components/admin/AdminSeoToolsView";
import AdminBackupsView from "@/components/admin/AdminBackupsView";
import AdminAnalyticsView from "@/components/admin/AdminAnalyticsView";
import AdminClientsView from "@/components/admin/AdminClientsView";
import AdminTeamMembersView from "@/components/admin/AdminTeamMembersView";
import AdminTasksView from "@/components/admin/AdminTasksView";
import AdminInvoicesView from "@/components/admin/AdminInvoicesView";
import AdminSupportTicketsView from "@/components/admin/AdminSupportTicketsView";
import AdminSettingsView from "@/components/admin/AdminSettingsView";
import AdminActivityLogsView from "@/components/admin/AdminActivityLogsView";
import AdminHelpView from "@/components/admin/AdminHelpView";
import AdminOrdersView from "@/components/admin/AdminOrdersView";
import AdminSellersView from "@/components/admin/AdminSellersView";
import { showLogoutConfirmation } from "@/components/admin/LogoutConfirmToast";

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

const mainNav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "servers", label: "Servers", icon: Server },
  { id: "meta-ads", label: "Meta Ads", icon: Megaphone },
  { id: "seo", label: "SEO Tools", icon: Search },
  { id: "backups", label: "Backups", icon: Database },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const mgmtNav = [
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "sellers", label: "Seller Requests", icon: BadgeCheck },
  { id: "clients", label: "Clients", icon: Users },
  { id: "team", label: "Team Members", icon: UserCog },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "tickets", label: "Support Tickets", icon: Headphones },
];

const settingsNav = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logs", label: "Activity Logs", icon: Activity },
];

const stats = [
  { label: "Total Projects", value: "24", change: "+12%", sub: "from last month", icon: FolderKanban, color: "text-blue-400" },
  { label: "Active Servers", value: "8", change: "All systems operational", sub: "", icon: Server, color: "text-emerald-400", badge: true },
  { label: "Meta Ads Campaigns", value: "15", change: "+18%", sub: "from last month", icon: Megaphone, color: "text-violet-400" },
  { label: "Total Ad Spend", value: "$18,420", change: "+8%", sub: "from last month", icon: TrendingUp, color: "text-amber-400" },
];

const servers = [
  { name: "backend-server-01", env: "Production", uptime: "99.9%", status: "online" },
  { name: "api-server-02", env: "Production", uptime: "100%", status: "online" },
  { name: "staging-server-01", env: "Staging", uptime: "99.5%", status: "online" },
  { name: "db-server-01", env: "Production", uptime: "99.8%", status: "online" },
];

const projects = [
  { name: "E-commerce Backend", stack: "Node.js, MongoDB", status: "Active" },
  { name: "Booking API", stack: "Node.js, MongoDB", status: "In Progress" },
  { name: "Admin Dashboard", stack: "Next.js, Tailwind", status: "Active" },
  { name: "Mobile App API", stack: "Express, MongoDB", status: "Active" },
];

const campaigns = [
  { name: "Summer Sale 2026", status: "Active", spend: "$2,450" },
  { name: "Brand Awareness Q2", status: "Paused", spend: "$1,820" },
  { name: "Lead Gen Campaign", status: "Active", spend: "$3,100" },
];

const seoMetrics = [
  { label: "Total Keywords", value: "1,284", trend: "+12%" },
  { label: "Top 3 Rankings", value: "342", trend: "+8%" },
  { label: "Organic Traffic", value: "48.2K", trend: "+24%" },
  { label: "Backlinks", value: "2,891", trend: "+5%" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const activeNav = params.route as string || "dashboard";
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.admin) setAdmin(data.admin);
      })
      .catch(() => {});
  }, []);

  const handleLogoutClick = () => {
    if (loggingOut) return;
    showLogoutConfirmation(() => {
      setAdmin(null);
      setLoggingOut(true);
      router.push("/admin/login");
      router.refresh();
    });
  };

  const initials = admin?.name
    ? admin.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  const NavItem = ({
    item,
    active,
    onClick,
  }: {
    item: { id: string; label: string; icon: React.ElementType };
    active: boolean;
    onClick: () => void;
  }) => {
    const Icon = item.icon;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
          active
            ? "bg-blue-600/20 text-blue-400"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <Icon className="w-4 h-4 shrink-0" />
        {item.label}
      </button>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b1120] text-zinc-100 font-sans">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 flex flex-col bg-[#0f1729] border-r border-white/5 overflow-y-auto">
        <div className="px-5 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Image
              src="/images/api_github_logo.png"
              alt="Cripcocode"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-cover"
            />
            <div>
              <p className="text-[11px] font-bold text-white leading-tight">CRIPCOCODE</p>
              <p className="text-[9px] text-zinc-500 leading-tight">TECHNOLOGIES PVT LTD</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-6">
          <div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Main</p>
            <div className="space-y-0.5">
              {mainNav.map((item) => (
                <NavItem key={item.id} item={item} active={activeNav === item.id} onClick={() => router.push(`/admin/${item.id}`)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Management</p>
            <div className="space-y-0.5">
              {mgmtNav.map((item) => (
                <NavItem key={item.id} item={item} active={activeNav === item.id} onClick={() => router.push(`/admin/${item.id}`)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Settings</p>
            <div className="space-y-0.5">
              {settingsNav.map((item) => (
                <NavItem key={item.id} item={item} active={activeNav === item.id} onClick={() => router.push(`/admin/${item.id}`)} />
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            type="button"
            onClick={() => router.push("/admin/help")}
            className={`w-full text-left rounded-xl p-4 mb-3 transition-all ${
              activeNav === "help"
                ? "bg-blue-600/20 border border-blue-500/40"
                : "bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/15 hover:border-blue-500/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <p className="text-xs font-semibold text-white">Need Help?</p>
            </div>
            <p className="text-[10px] text-zinc-500">Contact support team</p>
          </button>
          <button
            type="button"
            onClick={handleLogoutClick}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 shrink-0 flex items-center justify-between border-b border-white/5 bg-[#0b1120] px-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search projects, servers, ads, or tasks..."
              className="w-full bg-[#111827] border border-white/8 rounded-xl py-2 pl-10 pr-16 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-blue-600 text-[9px] font-bold flex items-center justify-center text-white">3</span>
            </button>
            <button type="button" className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Sun className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 bg-[#111827] border border-white/8 rounded-xl px-3 py-1.5">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                {initials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white leading-none">{admin?.name || "Admin"}</p>
                <p className="text-[10px] text-zinc-500 capitalize mt-0.5">{admin?.role?.replace("_", " ") || "Super Admin"}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeNav === "projects" ? (
            <AdminProjectsView />
          ) : activeNav === "orders" ? (
            <AdminOrdersView />
          ) : activeNav === "categories" ? (
            <AdminCategoriesView />
          ) : activeNav === "servers" ? (
            <AdminServersView />
          ) : activeNav === "meta-ads" ? (
            <AdminMetaAdsView />
          ) : activeNav === "seo" ? (
            <AdminSeoToolsView />
          ) : activeNav === "backups" ? (
            <AdminBackupsView />
          ) : activeNav === "analytics" ? (
            <AdminAnalyticsView />
          ) : activeNav === "clients" ? (
            <AdminClientsView />
          ) : activeNav === "sellers" ? (
            <AdminSellersView />
          ) : activeNav === "team" ? (
            <AdminTeamMembersView />
          ) : activeNav === "tasks" ? (
            <AdminTasksView />
          ) : activeNav === "invoices" ? (
            <AdminInvoicesView />
          ) : activeNav === "tickets" ? (
            <AdminSupportTicketsView />
          ) : activeNav === "settings" ? (
            <AdminSettingsView />
          ) : activeNav === "logs" ? (
            <AdminActivityLogsView />
          ) : activeNav === "help" ? (
            <AdminHelpView onNavigate={(dest) => router.push(`/admin/${dest}`)} />
          ) : activeNav === "dashboard" ? (
          <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
              <p className="text-sm text-zinc-500 mt-1">Overview of your systems, campaigns, and performance.</p>
            </div>
            <button type="button" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0">
              <Zap className="w-4 h-4" />
              Quick Actions
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-white/5 ${s.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {s.badge ? (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">{s.change}</span>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-400">{s.change}</span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{s.value}</p>
                  <p className="text-xs text-zinc-500">{s.label}</p>
                  {s.sub && <p className="text-[10px] text-zinc-600 mt-0.5">{s.sub}</p>}
                </div>
              );
            })}
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Server Status */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">Server Status</h2>
              <div className="space-y-3">
                {servers.map((srv) => (
                  <div key={srv.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{srv.name}</p>
                      <p className="text-[10px] text-zinc-500">{srv.env}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-400">{srv.uptime}</p>
                      <div className="flex items-center gap-1 justify-end">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[10px] text-zinc-500">Online</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-1">System Performance</h2>
              <p className="text-[10px] text-zinc-500 mb-4">Last 7 days</p>
              <svg viewBox="0 0 280 100" className="w-full h-28">
                <defs>
                  <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 25, 50, 75, 100].map((y) => (
                  <line key={y} x1="0" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,0.04)" />
                ))}
                <path d="M0,70 C40,65 60,50 90,45 C120,40 140,55 170,35 C200,20 230,30 280,15 L280,100 L0,100 Z" fill="url(#perfGrad)" />
                <path d="M0,70 C40,65 60,50 90,45 C120,40 140,55 170,35 C200,20 230,30 280,15" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M0,80 C40,78 80,72 120,68 C160,62 200,70 240,60 C260,55 270,58 280,55" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 2" />
              </svg>
              <div className="flex gap-4 mt-2">
                {["CPU", "RAM", "Disk"].map((l, i) => (
                  <div key={l} className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                    <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-blue-500" : i === 1 ? "bg-violet-500" : "bg-emerald-500"}`} />
                    {l}
                  </div>
                ))}
              </div>
            </div>

            {/* Meta Ads Donut */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-1">Meta Ads Overview</h2>
              <p className="text-[10px] text-zinc-500 mb-4">15 campaigns total</p>
              <div className="flex items-center gap-6">
                <div className="relative h-24 w-24 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="53 47" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="27 73" strokeDashoffset="-53" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="13 87" strokeDashoffset="-80" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6b7280" strokeWidth="3" strokeDasharray="7 93" strokeDashoffset="-93" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">15</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Active", pct: "53%", color: "bg-blue-500" },
                    { label: "Paused", pct: "27%", color: "bg-amber-500" },
                    { label: "Completed", pct: "13%", color: "bg-emerald-500" },
                    { label: "Draft", pct: "7%", color: "bg-zinc-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${item.color}`} />
                      <span className="text-zinc-400">{item.label}</span>
                      <span className="text-zinc-500 ml-auto">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent Projects */}
            <div className="lg:col-span-1 bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h2 className="font-semibold text-white">Recent Projects</h2>
              </div>
              <div className="divide-y divide-white/4">
                {projects.map((p) => (
                  <div key={p.name} className="px-5 py-3.5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{p.name}</p>
                      <p className="text-[10px] text-zinc-500">{p.stack}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${
                      p.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Campaigns */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h2 className="font-semibold text-white">Recent Ad Campaigns</h2>
              </div>
              <div className="divide-y divide-white/4">
                {campaigns.map((c) => (
                  <div key={c.name} className="px-5 py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-blue-400 shrink-0" />
                      <p className="text-sm font-medium text-zinc-200">{c.name}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-white">{c.spend}</p>
                      <span className={`text-[10px] ${c.status === "Active" ? "text-emerald-400" : "text-amber-400"}`}>{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Overview */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h2 className="font-semibold text-white">SEO Overview</h2>
              </div>
              <div className="divide-y divide-white/4">
                {seoMetrics.map((m) => (
                  <div key={m.label} className="px-5 py-3.5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">{m.label}</p>
                      <p className="text-lg font-bold text-white">{m.value}</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">{m.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="p-4 rounded-2xl bg-white/5 mb-4">
                <LayoutDashboard className="w-8 h-8 text-zinc-500" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2 capitalize">{activeNav.replace("-", " ")}</h2>
              <p className="text-sm text-zinc-500 max-w-sm">This section is coming soon. Stay tuned for updates.</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="h-10 shrink-0 flex items-center justify-between px-6 border-t border-white/5 text-[11px] text-zinc-600">
          <span>© 2025 Cripcocode Technologies Pvt Ltd. All rights reserved.</span>
          <span>Version 1.0.0</span>
        </footer>
      </div>
    </div>
  );
}
