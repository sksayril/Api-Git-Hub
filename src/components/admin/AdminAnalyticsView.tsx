"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  DollarSign,
  MousePointerClick,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  Activity,
  ShoppingCart,
  Target,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";

type TabId = "overview" | "traffic" | "revenue" | "users" | "realtime";
type DateRange = "7d" | "30d" | "90d" | "12m";

interface TopPage {
  id: string;
  path: string;
  views: number;
  unique: number;
  bounce: string;
  avgTime: string;
  trend: number;
}

interface TrafficSource {
  id: string;
  source: string;
  sessions: number;
  pct: number;
  color: string;
}

interface RevenueItem {
  id: string;
  product: string;
  sales: number;
  revenue: string;
  trend: number;
}

interface CountryStat {
  id: string;
  country: string;
  flag: string;
  sessions: number;
  pct: number;
}

interface LiveEvent {
  id: string;
  event: string;
  page: string;
  time: string;
  type: "view" | "purchase" | "signup";
}

const topPages: TopPage[] = [
  { id: "p1", path: "/", views: 18420, unique: 12340, bounce: "32%", avgTime: "2m 48s", trend: 18 },
  { id: "p2", path: "/marketplace", views: 12850, unique: 8920, bounce: "28%", avgTime: "3m 12s", trend: 24 },
  { id: "p3", path: "/explore", views: 9640, unique: 7100, bounce: "41%", avgTime: "1m 56s", trend: -5 },
  { id: "p4", path: "/projects/p1", views: 4820, unique: 3940, bounce: "22%", avgTime: "4m 05s", trend: 12 },
  { id: "p5", path: "/checkout", views: 2140, unique: 1980, bounce: "18%", avgTime: "5m 30s", trend: 8 },
  { id: "p6", path: "/about", views: 1890, unique: 1620, bounce: "45%", avgTime: "1m 22s", trend: 3 },
  { id: "p7", path: "/list-project", views: 1240, unique: 980, bounce: "52%", avgTime: "0m 58s", trend: -12 },
];

const trafficSources: TrafficSource[] = [
  { id: "s1", source: "Organic Search", sessions: 28400, pct: 42, color: "bg-emerald-500" },
  { id: "s2", source: "Direct", sessions: 16200, pct: 24, color: "bg-blue-500" },
  { id: "s3", source: "Social Media", sessions: 9800, pct: 15, color: "bg-violet-500" },
  { id: "s4", source: "Referral", sessions: 7200, pct: 11, color: "bg-amber-500" },
  { id: "s5", source: "Email", sessions: 5400, pct: 8, color: "bg-cyan-500" },
];

const revenueItems: RevenueItem[] = [
  { id: "r1", product: "E-commerce Backend API", sales: 48, revenue: "$14,400", trend: 22 },
  { id: "r2", product: "Admin Dashboard Template", sales: 36, revenue: "$10,800", trend: 15 },
  { id: "r3", product: "Mobile App UI Kit", sales: 29, revenue: "$8,700", trend: 8 },
  { id: "r4", product: "Booking System API", sales: 22, revenue: "$6,600", trend: -3 },
  { id: "r5", product: "Real-time Chat Module", sales: 18, revenue: "$5,400", trend: 12 },
];

const countryStats: CountryStat[] = [
  { id: "c1", country: "India", flag: "🇮🇳", sessions: 22400, pct: 33 },
  { id: "c2", country: "United States", flag: "🇺🇸", sessions: 14200, pct: 21 },
  { id: "c3", country: "United Kingdom", flag: "🇬🇧", sessions: 6800, pct: 10 },
  { id: "c4", country: "Germany", flag: "🇩🇪", sessions: 4200, pct: 6 },
  { id: "c5", country: "Bangladesh", flag: "🇧🇩", sessions: 3900, pct: 6 },
  { id: "c6", country: "Others", flag: "🌍", sessions: 16500, pct: 24 },
];

const liveEvents: LiveEvent[] = [
  { id: "e1", event: "Page view", page: "/marketplace", time: "Just now", type: "view" },
  { id: "e2", event: "Purchase completed", page: "/checkout", time: "12s ago", type: "purchase" },
  { id: "e3", event: "Page view", page: "/explore", time: "28s ago", type: "view" },
  { id: "e4", event: "New signup", page: "/dashboard", time: "45s ago", type: "signup" },
  { id: "e5", event: "Page view", page: "/projects/p1", time: "1m ago", type: "view" },
  { id: "e6", event: "Purchase completed", page: "/checkout", time: "2m ago", type: "purchase" },
  { id: "e7", event: "Page view", page: "/", time: "2m ago", type: "view" },
  { id: "e8", event: "Page view", page: "/about", time: "3m ago", type: "view" },
];

const dateRanges: { id: DateRange; label: string }[] = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
  { id: "12m", label: "12 months" },
];

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "traffic", label: "Traffic", icon: Globe },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "users", label: "Users", icon: Users },
  { id: "realtime", label: "Real-time", icon: Activity },
];

function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${
        positive ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {positive ? "+" : ""}
      {value}%
    </span>
  );
}

function AreaChart({ id, color }: { id: string; color: string }) {
  return (
    <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" />
      ))}
      <path
        d="M0,80 C40,72 80,55 120,48 C160,42 200,58 240,38 C280,22 320,30 360,18 C380,12 400,8 400,8 L400,100 L0,100 Z"
        fill={`url(#${id})`}
      />
      <path
        d="M0,80 C40,72 80,55 120,48 C160,42 200,58 240,38 C280,22 320,30 360,18 C380,12 400,8 400,8"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}

export default function AdminAnalyticsView() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  const stats = useMemo(
    () => ({
      visitors: "67.8K",
      pageViews: "142K",
      revenue: "$46,200",
      conversion: "3.8%",
      bounceRate: "34.2%",
      avgSession: "2m 48s",
      activeNow: 248,
    }),
    []
  );

  const deviceBreakdown = useMemo(
    () => [
      { label: "Desktop", pct: 58, icon: Monitor, color: "text-blue-400" },
      { label: "Mobile", pct: 36, icon: Smartphone, color: "text-violet-400" },
      { label: "Tablet", pct: 6, icon: Tablet, color: "text-amber-400" },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Analytics</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Track visitors, revenue, conversions, and platform performance for Api GitHub.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 bg-[#111827] border border-white/8 rounded-xl p-1">
            {dateRanges.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setDateRange(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  dateRange === r.id ? "bg-blue-600/20 text-blue-400" : "text-zinc-500 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 text-zinc-300 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Visitors", value: stats.visitors, change: 22, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Page Views", value: stats.pageViews, change: 18, icon: Eye, color: "text-violet-400", bg: "bg-violet-500/10" },
          { label: "Revenue", value: stats.revenue, change: 14, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Conversion Rate", value: stats.conversion, change: 6, icon: Target, color: "text-cyan-400", bg: "bg-cyan-500/10" },
          { label: "Bounce Rate", value: stats.bounceRate, change: -8, icon: MousePointerClick, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Avg. Session", value: stats.avgSession, change: 4, icon: Clock, color: "text-pink-400", bg: "bg-pink-500/10" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${s.bg}`}>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <TrendBadge value={s.change} />
              </div>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-[#111827] border border-white/6 rounded-xl p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === tab.id ? "bg-blue-600/20 text-blue-400" : "text-zinc-500 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.id === "realtime" && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main chart */}
            <div className="lg:col-span-2 bg-[#111827] border border-white/6 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-white">Traffic Overview</h2>
                  <p className="text-[10px] text-zinc-500">Visitors &amp; page views — last 30 days</p>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Visitors
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                    Page Views
                  </span>
                </div>
              </div>
              <div className="h-40">
                <AreaChart id="trafficOverviewGrad" color="#3b82f6" />
              </div>
            </div>

            {/* Traffic sources */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-1">Traffic Sources</h2>
              <p className="text-[10px] text-zinc-500 mb-4">Sessions by channel</p>
              <div className="space-y-3">
                {trafficSources.map((s) => (
                  <div key={s.id}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-zinc-400">{s.source}</span>
                      <span className="text-zinc-500">{s.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top pages */}
            <div className="lg:col-span-2 bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-semibold text-white">Top Pages</h2>
                <button type="button" className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  View all
                </button>
              </div>
              <div className="hidden md:grid grid-cols-[1fr_80px_80px_70px_80px_50px] gap-3 px-5 py-2 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase">
                <span>Page</span>
                <span>Views</span>
                <span>Unique</span>
                <span>Bounce</span>
                <span>Avg. Time</span>
                <span>Trend</span>
              </div>
              <div className="divide-y divide-white/4">
                {topPages.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className="grid grid-cols-1 md:grid-cols-[1fr_80px_80px_70px_80px_50px] gap-3 items-center px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                  >
                    <p className="text-sm font-medium text-white font-mono">{p.path}</p>
                    <p className="hidden md:block text-xs text-zinc-400">{p.views.toLocaleString()}</p>
                    <p className="hidden md:block text-xs text-zinc-400">{p.unique.toLocaleString()}</p>
                    <p className="hidden md:block text-xs text-zinc-500">{p.bounce}</p>
                    <p className="hidden md:block text-xs text-zinc-500">{p.avgTime}</p>
                    <div className="hidden md:block">
                      <TrendBadge value={p.trend} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Devices */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">Devices</h2>
              <div className="space-y-4">
                {deviceBreakdown.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.label} className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5">
                        <Icon className={`w-4 h-4 ${d.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-zinc-400">{d.label}</span>
                          <span className="text-white font-bold">{d.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${d.pct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-[10px] text-zinc-600 mb-2">Top Browsers</p>
                {["Chrome 62%", "Safari 21%", "Firefox 9%", "Edge 8%"].map((b) => (
                  <p key={b} className="text-xs text-zinc-400 py-1">{b}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Traffic */}
      {activeTab === "traffic" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">Sessions Over Time</h2>
              <div className="h-36">
                <AreaChart id="sessionsGrad" color="#8b5cf6" />
              </div>
            </div>
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">Top Countries</h2>
              <div className="space-y-3">
                {countryStats.map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-lg">{c.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-zinc-300">{c.country}</span>
                        <span className="text-zinc-500">{c.sessions.toLocaleString()} · {c.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full bg-violet-500" style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5">
              <h2 className="font-semibold text-white">All Pages</h2>
            </div>
            <div className="hidden lg:grid grid-cols-[1fr_90px_90px_70px_80px_60px] gap-3 px-5 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase">
              <span>Page URL</span>
              <span>Page Views</span>
              <span>Unique</span>
              <span>Bounce</span>
              <span>Avg. Time</span>
              <span>Trend</span>
            </div>
            <div className="divide-y divide-white/4">
              {topPages.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_90px_90px_70px_80px_60px] gap-3 items-center px-5 py-4 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-zinc-600 shrink-0" />
                    <p className="text-sm font-medium text-white font-mono group-hover:text-blue-400 transition-colors">
                      {p.path}
                    </p>
                  </div>
                  <p className="hidden lg:block text-sm font-bold text-white">{p.views.toLocaleString()}</p>
                  <p className="hidden lg:block text-xs text-zinc-400">{p.unique.toLocaleString()}</p>
                  <p className="hidden lg:block text-xs text-zinc-500">{p.bounce}</p>
                  <p className="hidden lg:block text-xs text-zinc-500">{p.avgTime}</p>
                  <div className="hidden lg:block">
                    <TrendBadge value={p.trend} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Revenue */}
      {activeTab === "revenue" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Revenue", value: "$46,200", change: 14, icon: DollarSign },
              { label: "Total Orders", value: "153", change: 11, icon: ShoppingCart },
              { label: "Avg. Order Value", value: "$302", change: 3, icon: Target },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4 flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-white">{s.value}</p>
                      <TrendBadge value={s.change} />
                    </div>
                    <p className="text-xs text-zinc-500">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">Revenue Trend</h2>
              <div className="h-40">
                <AreaChart id="revenueGrad" color="#10b981" />
              </div>
            </div>
            <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h2 className="font-semibold text-white">Top Products</h2>
              </div>
              <div className="divide-y divide-white/4">
                {revenueItems.map((r, i) => (
                  <div key={r.id} className="px-5 py-4 flex items-center gap-4">
                    <span className="text-sm font-bold text-zinc-600 w-5">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{r.product}</p>
                      <p className="text-[10px] text-zinc-600">{r.sales} sales</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-emerald-400">{r.revenue}</p>
                      <TrendBadge value={r.trend} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: "8,420", change: 16 },
              { label: "New Users", value: "1,240", change: 22 },
              { label: "Returning", value: "62%", change: 5 },
              { label: "Active (30d)", value: "3,180", change: 9 },
            ].map((s) => (
              <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-zinc-500">{s.label}</p>
                  <TrendBadge value={s.change} />
                </div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">User Growth</h2>
              <div className="h-40">
                <AreaChart id="userGrowthGrad" color="#06b6d4" />
              </div>
            </div>
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">New vs Returning</h2>
              <div className="flex items-center justify-center gap-8 py-6">
                <div className="text-center">
                  <div className="relative h-24 w-24 mx-auto mb-2">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="38 62" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="62 38" strokeDashoffset="-38" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">8.4K</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500">Total Users</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="text-zinc-400">New Users</span>
                    <span className="text-white font-bold ml-auto">38%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                    <span className="text-zinc-400">Returning</span>
                    <span className="text-white font-bold ml-auto">62%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                {[
                  { label: "Signups Today", value: "42" },
                  { label: "Signups This Week", value: "186" },
                ].map((m) => (
                  <div key={m.label} className="text-center p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-lg font-bold text-white">{m.value}</p>
                    <p className="text-[10px] text-zinc-500">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time */}
      {activeTab === "realtime" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#111827] border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="relative">
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <Activity className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.activeNow}</p>
                <p className="text-sm text-zinc-500">Active users right now</p>
              </div>
            </div>
            {[
              { label: "Views (last 30 min)", value: "1,842" },
              { label: "Purchases (today)", value: "12" },
            ].map((s) => (
              <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-5">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className="font-semibold text-white">Live Activity</h2>
              </div>
              <div className="divide-y divide-white/4 max-h-80 overflow-y-auto">
                {liveEvents.map((e) => (
                  <div key={e.id} className="px-5 py-3.5 flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg ${
                        e.type === "purchase"
                          ? "bg-emerald-500/10"
                          : e.type === "signup"
                            ? "bg-blue-500/10"
                            : "bg-zinc-500/10"
                      }`}
                    >
                      {e.type === "purchase" ? (
                        <ShoppingCart className="w-3.5 h-3.5 text-emerald-400" />
                      ) : e.type === "signup" ? (
                        <Users className="w-3.5 h-3.5 text-blue-400" />
                      ) : (
                        <Eye className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-300">{e.event}</p>
                      <p className="text-[10px] text-zinc-600 font-mono">{e.page}</p>
                    </div>
                    <span className="text-[10px] text-zinc-600 shrink-0">{e.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-4">Active Pages Now</h2>
              <div className="space-y-3">
                {[
                  { page: "/marketplace", users: 68 },
                  { page: "/", users: 52 },
                  { page: "/explore", users: 41 },
                  { page: "/projects/p1", users: 28 },
                  { page: "/checkout", users: 19 },
                ].map((p) => (
                  <div key={p.page} className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-zinc-600 shrink-0" />
                    <p className="text-sm text-zinc-300 font-mono flex-1 truncate">{p.page}</p>
                    <span className="text-sm font-bold text-emerald-400">{p.users}</span>
                    <span className="text-[10px] text-zinc-600">users</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-500">Real-time data refreshes every 5s</p>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open in GA4
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
