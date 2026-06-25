"use client";

import { useMemo, useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  TrendingUp,
  DollarSign,
  Eye,
  MousePointerClick,
  Pause,
  Play,
  BarChart3,
  Target,
  Users,
} from "lucide-react";

type CampaignStatus = "Active" | "Paused" | "Completed" | "Draft";
type CampaignObjective = "Conversions" | "Traffic" | "Awareness" | "Leads";

interface MetaCampaign {
  id: string;
  name: string;
  status: CampaignStatus;
  objective: CampaignObjective;
  budget: string;
  spend: string;
  impressions: string;
  clicks: string;
  ctr: string;
  roas: string;
  startDate: string;
  platform: "Facebook" | "Instagram" | "Both";
}

const allCampaigns: MetaCampaign[] = [
  { id: "c1", name: "Summer Sale 2026", status: "Active", objective: "Conversions", budget: "$500/day", spend: "$2,450", impressions: "124K", clicks: "3,820", ctr: "3.08%", roas: "4.2x", startDate: "Jun 1, 2026", platform: "Both" },
  { id: "c2", name: "Brand Awareness Q2", status: "Paused", objective: "Awareness", budget: "$200/day", spend: "$1,820", impressions: "890K", clicks: "1,240", ctr: "0.14%", roas: "—", startDate: "Apr 15, 2026", platform: "Facebook" },
  { id: "c3", name: "Lead Gen Campaign", status: "Active", objective: "Leads", budget: "$350/day", spend: "$3,100", impressions: "56K", clicks: "2,100", ctr: "3.75%", roas: "5.1x", startDate: "May 10, 2026", platform: "Instagram" },
  { id: "c4", name: "ProjectHub Launch", status: "Active", objective: "Traffic", budget: "$150/day", spend: "$980", impressions: "42K", clicks: "1,680", ctr: "4.00%", roas: "2.8x", startDate: "Jun 10, 2026", platform: "Both" },
  { id: "c5", name: "Retargeting — Cart Abandon", status: "Active", objective: "Conversions", budget: "$100/day", spend: "$1,540", impressions: "18K", clicks: "920", ctr: "5.11%", roas: "6.3x", startDate: "May 20, 2026", platform: "Both" },
  { id: "c6", name: "App Install Drive", status: "Completed", objective: "Traffic", budget: "$300/day", spend: "$4,200", impressions: "210K", clicks: "8,400", ctr: "4.00%", roas: "3.5x", startDate: "Mar 1, 2026", platform: "Instagram" },
  { id: "c7", name: "Holiday Promo Draft", status: "Draft", objective: "Conversions", budget: "$400/day", spend: "$0", impressions: "—", clicks: "—", ctr: "—", roas: "—", startDate: "Not started", platform: "Both" },
  { id: "c8", name: "B2B Lead Capture", status: "Paused", objective: "Leads", budget: "$250/day", spend: "$2,330", impressions: "34K", clicks: "680", ctr: "2.00%", roas: "3.9x", startDate: "Apr 28, 2026", platform: "Facebook" },
];

const statusStyles: Record<CampaignStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Paused: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Completed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Draft: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
};

const objectiveStyles: Record<CampaignObjective, string> = {
  Conversions: "bg-violet-500/10 text-violet-400",
  Traffic: "bg-blue-500/10 text-blue-400",
  Awareness: "bg-cyan-500/10 text-cyan-400",
  Leads: "bg-emerald-500/10 text-emerald-400",
};

export default function AdminMetaAdsView() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [objectiveFilter, setObjectiveFilter] = useState<string>("all");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = useMemo(() => {
    return allCampaigns.filter((c) => {
      const matchQuery =
        !query || c.name.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchObjective =
        objectiveFilter === "all" || c.objective === objectiveFilter;
      return matchQuery && matchStatus && matchObjective;
    });
  }, [query, statusFilter, objectiveFilter]);

  const stats = useMemo(() => {
    const active = allCampaigns.filter((c) => c.status === "Active").length;
    const totalSpend = allCampaigns.reduce((sum, c) => {
      const num = parseFloat(c.spend.replace(/[$,]/g, "")) || 0;
      return sum + num;
    }, 0);
    return {
      total: allCampaigns.length,
      active,
      totalSpend: `$${totalSpend.toLocaleString()}`,
      avgRoas: "4.1x",
    };
  }, []);

  const statusBreakdown = useMemo(() => {
    const counts = { Active: 0, Paused: 0, Completed: 0, Draft: 0 };
    allCampaigns.forEach((c) => counts[c.status]++);
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Meta Ads</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage Facebook &amp; Instagram ad campaigns, budgets, and performance.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Campaigns", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: Megaphone },
          { label: "Active", value: stats.active, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Play },
          { label: "Total Ad Spend", value: stats.totalSpend, color: "text-amber-400", bg: "bg-amber-500/10", icon: DollarSign },
          { label: "Avg. ROAS", value: stats.avgRoas, color: "text-violet-400", bg: "bg-violet-500/10", icon: TrendingUp },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4 flex items-center gap-4">
              <div className={`p-2.5 rounded-xl ${s.bg}`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-zinc-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Donut */}
        <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-1">Campaign Overview</h2>
          <p className="text-[10px] text-zinc-500 mb-4">{stats.total} campaigns total</p>
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${(statusBreakdown.Active / stats.total) * 100} ${100 - (statusBreakdown.Active / stats.total) * 100}`} />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray={`${(statusBreakdown.Paused / stats.total) * 100} ${100 - (statusBreakdown.Paused / stats.total) * 100}`} strokeDashoffset={`-${(statusBreakdown.Active / stats.total) * 100}`} />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray={`${(statusBreakdown.Completed / stats.total) * 100} ${100 - (statusBreakdown.Completed / stats.total) * 100}`} strokeDashoffset={`-${((statusBreakdown.Active + statusBreakdown.Paused) / stats.total) * 100}`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{stats.total}</span>
              </div>
            </div>
            <div className="space-y-2 text-xs flex-1">
              {[
                { label: "Active", count: statusBreakdown.Active, color: "bg-emerald-500" },
                { label: "Paused", count: statusBreakdown.Paused, color: "bg-amber-500" },
                { label: "Completed", count: statusBreakdown.Completed, color: "bg-blue-500" },
                { label: "Draft", count: statusBreakdown.Draft, color: "bg-zinc-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="text-zinc-500 ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance metrics */}
        <div className="lg:col-span-2 bg-[#111827] border border-white/6 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">Performance Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Impressions", value: "1.37M", icon: Eye, color: "text-blue-400" },
              { label: "Clicks", value: "18.8K", icon: MousePointerClick, color: "text-violet-400" },
              { label: "Avg. CTR", value: "3.2%", icon: Target, color: "text-emerald-400" },
              { label: "Reach", value: "842K", icon: Users, color: "text-amber-400" },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <Icon className={`w-4 h-4 ${m.color} mx-auto mb-2`} />
                  <p className="text-lg font-bold text-white">{m.value}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{m.label}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 h-24">
            <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 20, 40, 60, 80].map((y) => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" />
              ))}
              <path d="M0,60 C50,55 80,40 130,35 C180,30 220,45 280,25 C330,15 370,20 400,10 L400,80 L0,80 Z" fill="url(#spendGrad)" />
              <path d="M0,60 C50,55 80,40 130,35 C180,30 220,45 280,25 C330,15 370,20 400,10" fill="none" stroke="#3b82f6" strokeWidth="2" />
            </svg>
            <p className="text-[10px] text-zinc-600 text-center mt-1">Daily ad spend — last 30 days</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <select
            value={objectiveFilter}
            onChange={(e) => setObjectiveFilter(e.target.value)}
            className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[150px]"
          >
            <option value="all">All Objectives</option>
            <option value="Conversions">Conversions</option>
            <option value="Traffic">Traffic</option>
            <option value="Awareness">Awareness</option>
            <option value="Leads">Leads</option>
          </select>
        </div>
        <div className="flex items-center gap-1 bg-[#111827] border border-white/8 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-blue-600/20 text-blue-400" : "text-zinc-500 hover:text-white"}`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-blue-600/20 text-blue-400" : "text-zinc-500 hover:text-white"}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Campaign List */}
      {view === "list" ? (
        <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
          <div className="hidden xl:grid grid-cols-[1.5fr_90px_100px_90px_80px_80px_70px_70px_60px_50px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Campaign</span>
            <span>Status</span>
            <span>Objective</span>
            <span>Budget</span>
            <span>Spend</span>
            <span>Clicks</span>
            <span>CTR</span>
            <span>ROAS</span>
            <span />
            <span />
          </div>
          <div className="divide-y divide-white/4">
            {filtered.map((campaign) => (
              <div
                key={campaign.id}
                className="grid grid-cols-1 xl:grid-cols-[1.5fr_90px_100px_90px_80px_80px_70px_70px_60px_50px] gap-3 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Megaphone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {campaign.name}
                    </p>
                    <p className="text-[10px] text-zinc-600">{campaign.platform} · {campaign.startDate}</p>
                  </div>
                </div>
                <span className={`hidden xl:inline-flex text-[10px] font-semibold px-2 py-1 rounded-full border w-fit ${statusStyles[campaign.status]}`}>
                  {campaign.status}
                </span>
                <span className={`hidden xl:inline text-[10px] font-semibold px-2 py-1 rounded-md w-fit ${objectiveStyles[campaign.objective]}`}>
                  {campaign.objective}
                </span>
                <p className="hidden xl:block text-xs text-zinc-400">{campaign.budget}</p>
                <p className="hidden xl:block text-sm font-bold text-white">{campaign.spend}</p>
                <p className="hidden xl:block text-xs text-zinc-400">{campaign.clicks}</p>
                <p className="hidden xl:block text-xs text-emerald-400 font-semibold">{campaign.ctr}</p>
                <p className="hidden xl:block text-xs text-violet-400 font-bold">{campaign.roas}</p>
                <div className="hidden xl:flex gap-1">
                  {campaign.status === "Active" ? (
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors" aria-label="Pause">
                      <Pause className="w-3.5 h-3.5" />
                    </button>
                  ) : campaign.status === "Paused" ? (
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors" aria-label="Resume">
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>
                <div className="hidden xl:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" aria-label="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Mobile */}
                <div className="xl:hidden flex flex-wrap gap-2 mt-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyles[campaign.status]}`}>{campaign.status}</span>
                  <span className="text-[10px] text-zinc-500">{campaign.spend} · {campaign.ctr} CTR · {campaign.roas} ROAS</span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm">No campaigns found.</div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-[#111827] border border-white/6 rounded-2xl p-5 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10">
                  <Megaphone className="w-5 h-5 text-blue-400" />
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[campaign.status]}`}>
                  {campaign.status}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {campaign.name}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${objectiveStyles[campaign.objective]}`}>
                  {campaign.objective}
                </span>
                <span className="text-[10px] text-zinc-600">{campaign.platform}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/5 mb-4">
                <div>
                  <p className="text-sm font-bold text-white">{campaign.spend}</p>
                  <p className="text-[10px] text-zinc-600">Spend</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-400">{campaign.ctr}</p>
                  <p className="text-[10px] text-zinc-600">CTR</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-violet-400">{campaign.roas}</p>
                  <p className="text-[10px] text-zinc-600">ROAS</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-zinc-600">{campaign.budget} · {campaign.impressions} imp.</p>
                <button type="button" className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allCampaigns.length}</strong> campaigns
        </span>
        <div className="flex items-center gap-2">
          <button type="button" className="px-3 py-1.5 rounded-lg border border-white/8 hover:bg-white/5 transition-colors text-xs">
            Previous
          </button>
          <button type="button" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold">
            1
          </button>
          <button type="button" className="px-3 py-1.5 rounded-lg border border-white/8 hover:bg-white/5 transition-colors text-xs">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
