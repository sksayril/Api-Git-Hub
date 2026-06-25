"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  DollarSign,
  FolderKanban,
  MapPin,
  UserPlus,
  TrendingUp,
  Star,
  MoreHorizontal,
} from "lucide-react";

type ClientStatus = "Active" | "Inactive" | "Lead" | "Churned";
type ClientPlan = "Enterprise" | "Pro" | "Starter" | "Custom";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: ClientStatus;
  plan: ClientPlan;
  projects: number;
  revenue: string;
  joined: string;
  lastContact: string;
  rating: number;
}

const allClients: Client[] = [
  { id: "cl1", name: "Rahul Sharma", company: "ShopWave Inc.", email: "rahul@shopwave.io", phone: "+91 98765 43210", location: "Mumbai, IN", status: "Active", plan: "Enterprise", projects: 3, revenue: "$28,400", joined: "Jan 2025", lastContact: "2 hours ago", rating: 5 },
  { id: "cl2", name: "Sarah Mitchell", company: "TravelNest", email: "sarah@travelnest.com", phone: "+1 555 012 3456", location: "New York, US", status: "Active", plan: "Pro", projects: 2, revenue: "$16,800", joined: "Mar 2025", lastContact: "1 day ago", rating: 4 },
  { id: "cl3", name: "James Chen", company: "FitTrack", email: "james@fittrack.app", phone: "+65 8123 4567", location: "Singapore", status: "Active", plan: "Pro", projects: 1, revenue: "$9,400", joined: "Apr 2025", lastContact: "3 days ago", rating: 5 },
  { id: "cl4", name: "Emily Watson", company: "PayFlow", email: "emily@payflow.co", phone: "+44 7700 900123", location: "London, UK", status: "Active", plan: "Enterprise", projects: 2, revenue: "$22,100", joined: "Feb 2025", lastContact: "5 days ago", rating: 4 },
  { id: "cl5", name: "Arjun Patel", company: "DataPulse", email: "arjun@datapulse.in", phone: "+91 87654 32109", location: "Bangalore, IN", status: "Active", plan: "Custom", projects: 1, revenue: "$11,200", joined: "May 2025", lastContact: "1 week ago", rating: 3 },
  { id: "cl6", name: "Lisa Nguyen", company: "DesignHub", email: "lisa@designhub.co", phone: "+1 555 987 6543", location: "San Francisco, US", status: "Inactive", plan: "Starter", projects: 1, revenue: "$4,500", joined: "Jun 2024", lastContact: "2 weeks ago", rating: 4 },
  { id: "cl7", name: "Marcus Weber", company: "ConnectLive", email: "marcus@connectlive.de", phone: "+49 170 1234567", location: "Berlin, DE", status: "Active", plan: "Pro", projects: 1, revenue: "$7,600", joined: "Jun 2025", lastContact: "4 days ago", rating: 5 },
  { id: "cl8", name: "Priya Das", company: "EduLearn", email: "priya@edulearn.in", phone: "+91 99887 76655", location: "Kolkata, IN", status: "Lead", plan: "Starter", projects: 0, revenue: "$0", joined: "Jun 2026", lastContact: "Today", rating: 0 },
  { id: "cl9", name: "Tom Bradley", company: "CloudSync", email: "tom@cloudsync.io", phone: "+1 555 234 5678", location: "Austin, US", status: "Churned", plan: "Pro", projects: 0, revenue: "$8,900", joined: "Nov 2024", lastContact: "3 months ago", rating: 2 },
  { id: "cl10", name: "Nadia Hassan", company: "MediCare Plus", email: "nadia@medicare.ae", phone: "+971 50 123 4567", location: "Dubai, AE", status: "Lead", plan: "Enterprise", projects: 0, revenue: "$0", joined: "Jun 2026", lastContact: "Yesterday", rating: 0 },
];

const statusStyles: Record<ClientStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Inactive: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
  Lead: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Churned: "bg-red-500/15 text-red-400 border-red-500/20",
};

const planStyles: Record<ClientPlan, string> = {
  Enterprise: "bg-violet-500/10 text-violet-400",
  Pro: "bg-blue-500/10 text-blue-400",
  Starter: "bg-cyan-500/10 text-cyan-400",
  Custom: "bg-amber-500/10 text-amber-400",
};

function ClientAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const colors = [
    "bg-blue-500/20 text-blue-400",
    "bg-violet-500/20 text-violet-400",
    "bg-emerald-500/20 text-emerald-400",
    "bg-amber-500/20 text-amber-400",
    "bg-pink-500/20 text-pink-400",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  if (rating === 0) return <span className="text-[10px] text-zinc-600">No rating</span>;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < rating ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`}
        />
      ))}
    </div>
  );
}

export default function AdminClientsView() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = useMemo(() => {
    return allClients.filter((c) => {
      const matchQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.company.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase()) ||
        c.location.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchPlan = planFilter === "all" || c.plan === planFilter;
      return matchQuery && matchStatus && matchPlan;
    });
  }, [query, statusFilter, planFilter]);

  const stats = useMemo(() => {
    const totalRevenue = allClients.reduce((sum, c) => {
      const num = parseFloat(c.revenue.replace(/[$,]/g, "")) || 0;
      return sum + num;
    }, 0);
    return {
      total: allClients.length,
      active: allClients.filter((c) => c.status === "Active").length,
      leads: allClients.filter((c) => c.status === "Lead").length,
      revenue: `$${totalRevenue.toLocaleString()}`,
    };
  }, []);

  const statusBreakdown = useMemo(() => {
    const counts = { Active: 0, Inactive: 0, Lead: 0, Churned: 0 };
    allClients.forEach((c) => counts[c.status]++);
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Clients</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage client relationships, contacts, and account details.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Clients", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: Users },
          { label: "Active", value: stats.active, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: TrendingUp },
          { label: "New Leads", value: stats.leads, color: "text-violet-400", bg: "bg-violet-500/10", icon: UserPlus },
          { label: "Total Revenue", value: stats.revenue, color: "text-amber-400", bg: "bg-amber-500/10", icon: DollarSign },
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
        <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-1">Client Status</h2>
          <p className="text-[10px] text-zinc-500 mb-4">{stats.total} clients total</p>
          <div className="space-y-3">
            {[
              { label: "Active", count: statusBreakdown.Active, color: "bg-emerald-500" },
              { label: "Leads", count: statusBreakdown.Lead, color: "bg-blue-500" },
              { label: "Inactive", count: statusBreakdown.Inactive, color: "bg-zinc-500" },
              { label: "Churned", count: statusBreakdown.Churned, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="text-zinc-500">{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${(item.count / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#111827] border border-white/6 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">Top Clients by Revenue</h2>
          <div className="space-y-3">
            {allClients
              .filter((c) => c.status === "Active")
              .sort((a, b) => parseFloat(b.revenue.replace(/[$,]/g, "")) - parseFloat(a.revenue.replace(/[$,]/g, "")))
              .slice(0, 4)
              .map((c, i) => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-600 w-4">#{i + 1}</span>
                  <ClientAvatar name={c.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                    <p className="text-[10px] text-zinc-600">{c.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-emerald-400">{c.revenue}</p>
                    <p className="text-[10px] text-zinc-600">{c.projects} projects</p>
                  </div>
                </div>
              ))}
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
              placeholder="Search clients..."
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
              <option value="Inactive">Inactive</option>
              <option value="Lead">Lead</option>
              <option value="Churned">Churned</option>
            </select>
          </div>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[140px]"
          >
            <option value="all">All Plans</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Starter">Starter</option>
            <option value="Custom">Custom</option>
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

      {/* List view */}
      {view === "list" ? (
        <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
          <div className="hidden xl:grid grid-cols-[1.5fr_1fr_120px_80px_80px_90px_100px_80px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Client</span>
            <span>Contact</span>
            <span>Location</span>
            <span>Status</span>
            <span>Plan</span>
            <span>Projects</span>
            <span>Revenue</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-white/4">
            {filtered.map((client) => (
              <div
                key={client.id}
                className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr_120px_80px_80px_90px_100px_80px] gap-3 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ClientAvatar name={client.name} />
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {client.name}
                    </p>
                    <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {client.company}
                    </p>
                  </div>
                </div>
                <div className="hidden xl:block space-y-0.5">
                  <p className="text-xs text-zinc-400 flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 shrink-0" />
                    {client.email}
                  </p>
                  <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 shrink-0" />
                    {client.phone}
                  </p>
                </div>
                <p className="hidden xl:flex items-center gap-1 text-xs text-zinc-500">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {client.location}
                </p>
                <span className={`hidden xl:inline-flex text-[10px] font-semibold px-2 py-1 rounded-full border w-fit ${statusStyles[client.status]}`}>
                  {client.status}
                </span>
                <span className={`hidden xl:inline text-[10px] font-semibold px-2 py-1 rounded-md w-fit ${planStyles[client.plan]}`}>
                  {client.plan}
                </span>
                <p className="hidden xl:block text-xs text-zinc-400">{client.projects} active</p>
                <p className="hidden xl:block text-sm font-bold text-white">{client.revenue}</p>
                <div className="hidden xl:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Edit client">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors" aria-label="Email client">
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" aria-label="Delete client">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="xl:hidden flex flex-wrap gap-2 text-[10px]">
                  <span className={`font-semibold px-2 py-0.5 rounded-full border ${statusStyles[client.status]}`}>{client.status}</span>
                  <span className={`font-semibold px-2 py-0.5 rounded-md ${planStyles[client.plan]}`}>{client.plan}</span>
                  <span className="text-zinc-500">{client.revenue} · {client.projects} projects</span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm">No clients found.</div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((client) => (
            <div
              key={client.id}
              className="bg-[#111827] border border-white/6 rounded-2xl p-5 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <ClientAvatar name={client.name} />
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[client.status]}`}>
                    {client.status}
                  </span>
                  <button type="button" className="p-1 rounded-lg text-zinc-600 hover:text-white transition-colors" aria-label="More options">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                {client.name}
              </h3>
              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5 mb-3">
                <Building2 className="w-3 h-3" />
                {client.company}
              </p>
              <div className="space-y-1.5 text-xs text-zinc-500 mb-4">
                <p className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {client.email}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {client.location}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/5 mb-4">
                <div>
                  <p className="text-sm font-bold text-white">{client.projects}</p>
                  <p className="text-[10px] text-zinc-600">Projects</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-400">{client.revenue}</p>
                  <p className="text-[10px] text-zinc-600">Revenue</p>
                </div>
                <div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${planStyles[client.plan]}`}>
                    {client.plan}
                  </span>
                  <p className="text-[10px] text-zinc-600 mt-1">Plan</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <StarRating rating={client.rating} />
                <div className="flex items-center gap-1">
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors" aria-label="Email">
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors ml-1">
                    <FolderKanban className="w-3.5 h-3.5" />
                    Projects
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allClients.length}</strong> clients
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
