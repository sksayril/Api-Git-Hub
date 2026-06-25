"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  TrendingUp,
  Globe,
  Link2,
  Target,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ArrowUp,
  ArrowDown,
  Minus,
  BarChart3,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
  ExternalLink,
  Zap,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

type TabId = "overview" | "keywords" | "pages" | "audits";
type KeywordTrend = "up" | "down" | "stable";
type PageStatus = "Good" | "Needs Work" | "Critical";
type AuditStatus = "Completed" | "Running" | "Scheduled";

interface Keyword {
  id: string;
  keyword: string;
  page: string;
  position: number;
  volume: string;
  difficulty: number;
  trend: KeywordTrend;
  change: number;
}

interface SitePage {
  id: string;
  path: string;
  title: string;
  score: number;
  status: PageStatus;
  metaTitle: string;
  metaDesc: string;
  issues: number;
  lastCrawled: string;
}

interface SeoAudit {
  id: string;
  url: string;
  score: number;
  status: AuditStatus;
  issues: { critical: number; warning: number; passed: number };
  date: string;
}

const allKeywords: Keyword[] = [
  { id: "k1", keyword: "api marketplace", page: "/marketplace", position: 3, volume: "8.1K", difficulty: 42, trend: "up", change: 2 },
  { id: "k2", keyword: "buy source code online", page: "/explore", position: 7, volume: "5.4K", difficulty: 58, trend: "up", change: 4 },
  { id: "k3", keyword: "nextjs admin dashboard", page: "/projects/p3", position: 12, volume: "3.2K", difficulty: 51, trend: "down", change: -3 },
  { id: "k4", keyword: "project hub github", page: "/", position: 5, volume: "2.8K", difficulty: 35, trend: "stable", change: 0 },
  { id: "k5", keyword: "web templates download", page: "/explore", position: 18, volume: "6.7K", difficulty: 64, trend: "up", change: 6 },
  { id: "k6", keyword: "mobile app api backend", page: "/list-project", position: 24, volume: "1.9K", difficulty: 47, trend: "down", change: -2 },
  { id: "k7", keyword: "cripocode technologies", page: "/about", position: 1, volume: "720", difficulty: 18, trend: "stable", change: 0 },
  { id: "k8", keyword: "ui kits marketplace", page: "/marketplace", position: 9, volume: "4.1K", difficulty: 55, trend: "up", change: 3 },
];

const sitePages: SitePage[] = [
  { id: "pg1", path: "/", title: "Home", score: 92, status: "Good", metaTitle: "Api GitHub — Project Marketplace", metaDesc: "Discover APIs, templates, and source code...", issues: 1, lastCrawled: "2 hours ago" },
  { id: "pg2", path: "/marketplace", title: "Marketplace", score: 88, status: "Good", metaTitle: "Marketplace | Api GitHub", metaDesc: "Browse premium projects and digital assets.", issues: 2, lastCrawled: "2 hours ago" },
  { id: "pg3", path: "/explore", title: "Explore", score: 76, status: "Needs Work", metaTitle: "Explore Projects", metaDesc: "Explore", issues: 4, lastCrawled: "5 hours ago" },
  { id: "pg4", path: "/about", title: "About Us", score: 94, status: "Good", metaTitle: "About Cripcocode Technologies", metaDesc: "Learn about our team and mission.", issues: 0, lastCrawled: "1 day ago" },
  { id: "pg5", path: "/help-center", title: "Help Center", score: 81, status: "Good", metaTitle: "Help Center | Api GitHub", metaDesc: "FAQs and support resources.", issues: 2, lastCrawled: "1 day ago" },
  { id: "pg6", path: "/list-project", title: "List Project", score: 58, status: "Critical", metaTitle: "List Your Project", metaDesc: "", issues: 7, lastCrawled: "3 days ago" },
];

const recentAudits: SeoAudit[] = [
  { id: "a1", url: "apigithub.com", score: 84, status: "Completed", issues: { critical: 2, warning: 8, passed: 42 }, date: "Jun 22, 2026" },
  { id: "a2", url: "apigithub.com/marketplace", score: 88, status: "Completed", issues: { critical: 0, warning: 5, passed: 38 }, date: "Jun 20, 2026" },
  { id: "a3", url: "apigithub.com/explore", score: 71, status: "Completed", issues: { critical: 3, warning: 11, passed: 31 }, date: "Jun 18, 2026" },
  { id: "a4", url: "apigithub.com/list-project", score: 0, status: "Running", issues: { critical: 0, warning: 0, passed: 0 }, date: "Running now" },
];

const statusStyles: Record<PageStatus, string> = {
  Good: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Needs Work": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Critical: "bg-red-500/15 text-red-400 border-red-500/20",
};

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "keywords", label: "Keywords", icon: Target },
  { id: "pages", label: "Pages", icon: FileText },
  { id: "audits", label: "Audits", icon: ShieldCheck },
];

function TrendIcon({ trend, change }: { trend: KeywordTrend; change: number }) {
  if (trend === "up") return <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />;
  if (trend === "down") return <ArrowDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-zinc-500" />;
}

function ScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const color =
    score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : score > 0 ? "#ef4444" : "#52525b";
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${score} ${100 - score}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{score > 0 ? score : "—"}</span>
      </div>
    </div>
  );
}

export default function AdminSeoToolsView() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [query, setQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [pageFilter, setPageFilter] = useState("all");

  const stats = useMemo(
    () => ({
      keywords: "1,284",
      top3: allKeywords.filter((k) => k.position <= 3).length,
      organicTraffic: "48.2K",
      backlinks: "2,891",
      avgScore: Math.round(sitePages.reduce((s, p) => s + p.score, 0) / sitePages.length),
    }),
    []
  );

  const positionBreakdown = useMemo(() => {
    const top3 = allKeywords.filter((k) => k.position <= 3).length;
    const top10 = allKeywords.filter((k) => k.position > 3 && k.position <= 10).length;
    const top20 = allKeywords.filter((k) => k.position > 10 && k.position <= 20).length;
    const beyond = allKeywords.filter((k) => k.position > 20).length;
    return { top3, top10, top20, beyond };
  }, []);

  const filteredKeywords = useMemo(() => {
    return allKeywords.filter((k) => {
      const matchQuery =
        !query ||
        k.keyword.toLowerCase().includes(query.toLowerCase()) ||
        k.page.toLowerCase().includes(query.toLowerCase());
      const matchPosition =
        positionFilter === "all" ||
        (positionFilter === "top3" && k.position <= 3) ||
        (positionFilter === "top10" && k.position <= 10) ||
        (positionFilter === "top20" && k.position <= 20) ||
        (positionFilter === "beyond" && k.position > 20);
      return matchQuery && matchPosition;
    });
  }, [query, positionFilter]);

  const filteredPages = useMemo(() => {
    return sitePages.filter((p) => {
      const matchQuery =
        !query ||
        p.path.toLowerCase().includes(query.toLowerCase()) ||
        p.title.toLowerCase().includes(query.toLowerCase());
      const matchStatus = pageFilter === "all" || p.status === pageFilter;
      return matchQuery && matchStatus;
    });
  }, [query, pageFilter]);

  const siteIssues = useMemo(
    () => [
      { label: "Missing meta descriptions", count: 3, severity: "warning" as const },
      { label: "Slow page load (>3s)", count: 2, severity: "critical" as const },
      { label: "Broken internal links", count: 1, severity: "critical" as const },
      { label: "Images missing alt text", count: 5, severity: "warning" as const },
      { label: "Duplicate title tags", count: 1, severity: "warning" as const },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">SEO Tools</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Track rankings, audit pages, and optimize search visibility for Api GitHub.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 text-zinc-300 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Run Audit
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Keyword
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Keywords", value: stats.keywords, color: "text-blue-400", bg: "bg-blue-500/10", icon: Target },
          { label: "Top 3 Rankings", value: stats.top3, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: TrendingUp },
          { label: "Organic Traffic", value: stats.organicTraffic, color: "text-violet-400", bg: "bg-violet-500/10", icon: Eye },
          { label: "Backlinks", value: stats.backlinks, color: "text-amber-400", bg: "bg-amber-500/10", icon: Link2 },
          { label: "Avg. Page Score", value: `${stats.avgScore}`, color: "text-cyan-400", bg: "bg-cyan-500/10", icon: Globe },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${s.bg}`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-[10px] text-zinc-500">{s.label}</p>
              </div>
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
              onClick={() => {
                setActiveTab(tab.id);
                setQuery("");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Keyword distribution */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-1">Keyword Positions</h2>
              <p className="text-[10px] text-zinc-500 mb-4">Tracked keywords by ranking tier</p>
              <div className="space-y-3">
                {[
                  { label: "Top 3", count: positionBreakdown.top3, color: "bg-emerald-500", pct: 25 },
                  { label: "Top 4–10", count: positionBreakdown.top10, color: "bg-blue-500", pct: 35 },
                  { label: "Top 11–20", count: positionBreakdown.top20, color: "bg-amber-500", pct: 25 },
                  { label: "Beyond 20", count: positionBreakdown.beyond, color: "bg-zinc-500", pct: 15 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-zinc-400">{item.label}</span>
                      <span className="text-zinc-500">{item.count} keywords</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${(item.count / allKeywords.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic chart */}
            <div className="lg:col-span-2 bg-[#111827] border border-white/6 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-white">Organic Traffic</h2>
                  <p className="text-[10px] text-zinc-500">Last 30 days · +24% vs previous period</p>
                </div>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +24%
                </span>
              </div>
              <div className="h-32">
                <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="seoTrafficGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" />
                  ))}
                  <path
                    d="M0,80 C40,75 80,60 120,55 C160,50 200,65 240,45 C280,30 320,35 360,20 C380,15 400,10 400,10 L400,100 L0,100 Z"
                    fill="url(#seoTrafficGrad)"
                  />
                  <path
                    d="M0,80 C40,75 80,60 120,55 C160,50 200,65 240,45 C280,30 320,35 360,20 C380,15 400,10 400,10"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
                {[
                  { label: "Sessions", value: "48.2K" },
                  { label: "Bounce Rate", value: "38.4%" },
                  { label: "Avg. Duration", value: "2m 14s" },
                  { label: "Pages/Session", value: "3.2" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-sm font-bold text-white">{m.value}</p>
                    <p className="text-[10px] text-zinc-500">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Issues + top keywords */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <h2 className="font-semibold text-white">Site Issues</h2>
                <span className="text-[10px] font-semibold text-amber-400">12 total</span>
              </div>
              <div className="divide-y divide-white/4">
                {siteIssues.map((issue) => (
                  <div key={issue.label} className="px-5 py-3.5 flex items-center gap-3">
                    {issue.severity === "critical" ? (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span className="text-sm text-zinc-300 flex-1">{issue.label}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        issue.severity === "critical"
                          ? "bg-red-500/15 text-red-400"
                          : "bg-amber-500/15 text-amber-400"
                      }`}
                    >
                      {issue.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h2 className="font-semibold text-white">Top Performing Keywords</h2>
              </div>
              <div className="divide-y divide-white/4">
                {allKeywords
                  .filter((k) => k.position <= 10)
                  .slice(0, 5)
                  .map((k) => (
                    <div key={k.id} className="px-5 py-3.5 flex items-center gap-3">
                      <div className="flex items-center gap-1.5 w-8">
                        <TrendIcon trend={k.trend} change={k.change} />
                        {k.change !== 0 && (
                          <span
                            className={`text-[10px] font-bold ${
                              k.trend === "up" ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            {Math.abs(k.change)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{k.keyword}</p>
                        <p className="text-[10px] text-zinc-600">{k.page}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-emerald-400">#{k.position}</p>
                        <p className="text-[10px] text-zinc-600">{k.volume}/mo</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keywords Tab */}
      {activeTab === "keywords" && (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keywords or pages..."
                className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[160px]"
              >
                <option value="all">All Positions</option>
                <option value="top3">Top 3</option>
                <option value="top10">Top 10</option>
                <option value="top20">Top 20</option>
                <option value="beyond">Beyond 20</option>
              </select>
            </div>
          </div>

          <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
            <div className="hidden lg:grid grid-cols-[1.5fr_100px_80px_80px_80px_80px_60px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              <span>Keyword</span>
              <span>Page</span>
              <span>Position</span>
              <span>Volume</span>
              <span>Difficulty</span>
              <span>Trend</span>
              <span />
            </div>
            <div className="divide-y divide-white/4">
              {filteredKeywords.map((k) => (
                <div
                  key={k.id}
                  className="grid grid-cols-1 lg:grid-cols-[1.5fr_100px_80px_80px_80px_80px_60px] gap-3 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Target className="w-4 h-4 text-violet-400" />
                    </div>
                    <p className="text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
                      {k.keyword}
                    </p>
                  </div>
                  <p className="hidden lg:block text-xs text-zinc-500 truncate">{k.page}</p>
                  <p
                    className={`hidden lg:block text-sm font-bold ${
                      k.position <= 3
                        ? "text-emerald-400"
                        : k.position <= 10
                          ? "text-blue-400"
                          : "text-zinc-400"
                    }`}
                  >
                    #{k.position}
                  </p>
                  <p className="hidden lg:block text-xs text-zinc-400">{k.volume}</p>
                  <div className="hidden lg:flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          k.difficulty >= 60 ? "bg-red-500" : k.difficulty >= 40 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${k.difficulty}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 w-6">{k.difficulty}</span>
                  </div>
                  <div className="hidden lg:flex items-center gap-1">
                    <TrendIcon trend={k.trend} change={k.change} />
                    {k.change !== 0 && (
                      <span
                        className={`text-xs font-semibold ${
                          k.trend === "up" ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {k.change > 0 ? `+${k.change}` : k.change}
                      </span>
                    )}
                  </div>
                  <div className="hidden lg:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                      aria-label="Edit keyword"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      aria-label="Delete keyword"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="lg:hidden flex flex-wrap gap-2 text-[10px] text-zinc-500">
                    {k.page} · #{k.position} · {k.volume}/mo
                  </div>
                </div>
              ))}
            </div>
            {filteredKeywords.length === 0 && (
              <div className="py-16 text-center text-zinc-500 text-sm">No keywords found.</div>
            )}
          </div>
        </>
      )}

      {/* Pages Tab */}
      {activeTab === "pages" && (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages..."
                className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
              />
            </div>
            <select
              value={pageFilter}
              onChange={(e) => setPageFilter(e.target.value)}
              className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="Good">Good</option>
              <option value="Needs Work">Needs Work</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredPages.map((page) => (
              <div
                key={page.id}
                className="bg-[#111827] border border-white/6 rounded-2xl p-5 hover:border-violet-500/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <ScoreRing score={page.score} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-white group-hover:text-violet-400 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-xs text-zinc-500 font-mono">{page.path}</p>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-1 rounded-full border shrink-0 ${statusStyles[page.status]}`}
                      >
                        {page.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-zinc-600">Title: </span>
                        <span className="text-zinc-300">{page.metaTitle}</span>
                        <span className="text-zinc-600 ml-2">({page.metaTitle.length} chars)</span>
                      </div>
                      <div>
                        <span className="text-zinc-600">Description: </span>
                        <span className={page.metaDesc ? "text-zinc-300" : "text-red-400 italic"}>
                          {page.metaDesc || "Missing meta description"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-3 text-[10px] text-zinc-600">
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          {page.issues} issues
                        </span>
                        <span>Crawled {page.lastCrawled}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit Meta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredPages.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm bg-[#111827] border border-white/6 rounded-2xl">
              No pages found.
            </div>
          )}
        </>
      )}

      {/* Audits Tab */}
      {activeTab === "audits" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Site Health Score", value: "84/100", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: "Issues Fixed (30d)", value: "23", icon: CheckCircle2, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Last Full Audit", value: "Jun 22", icon: Zap, color: "text-violet-400", bg: "bg-violet-500/10" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4 flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${s.bg}`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-zinc-500">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-semibold text-white">Audit History</h2>
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                New Audit
              </button>
            </div>
            <div className="divide-y divide-white/4">
              {recentAudits.map((audit) => (
                <div
                  key={audit.id}
                  className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <ScoreRing score={audit.score} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-white font-mono">{audit.url}</p>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          audit.status === "Completed"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : audit.status === "Running"
                              ? "bg-blue-500/15 text-blue-400"
                              : "bg-zinc-500/15 text-zinc-400"
                        }`}
                      >
                        {audit.status}
                      </span>
                    </div>
                    {audit.status === "Completed" && (
                      <div className="flex flex-wrap gap-3 text-[10px]">
                        <span className="text-red-400">{audit.issues.critical} critical</span>
                        <span className="text-amber-400">{audit.issues.warning} warnings</span>
                        <span className="text-emerald-400">{audit.issues.passed} passed</span>
                      </div>
                    )}
                    {audit.status === "Running" && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-xs h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full w-2/3 rounded-full bg-blue-500 animate-pulse" />
                        </div>
                        <span className="text-[10px] text-zinc-500">Scanning pages...</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-zinc-500">{audit.date}</span>
                    {audit.status === "Completed" && (
                      <button
                        type="button"
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer count */}
      {activeTab === "keywords" && (
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span>
            Showing <strong className="text-zinc-300">{filteredKeywords.length}</strong> of{" "}
            <strong className="text-zinc-300">{allKeywords.length}</strong> keywords
          </span>
        </div>
      )}
    </div>
  );
}
