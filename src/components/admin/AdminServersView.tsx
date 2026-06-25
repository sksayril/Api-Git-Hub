"use client";

import { useMemo, useState } from "react";
import {
  Server,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  MoreHorizontal,
  Pencil,
  Trash2,
  RefreshCw,
  Power,
  Globe,
  Cpu,
  HardDrive,
  Activity,
  AlertTriangle,
} from "lucide-react";

type ServerStatus = "Online" | "Offline" | "Maintenance" | "Degraded";
type ServerEnv = "Production" | "Staging" | "Development";

interface AdminServer {
  id: string;
  name: string;
  env: ServerEnv;
  region: string;
  ip: string;
  status: ServerStatus;
  uptime: string;
  cpu: number;
  ram: number;
  disk: number;
  lastChecked: string;
}

const allServers: AdminServer[] = [
  { id: "s1", name: "backend-server-01", env: "Production", region: "Mumbai, IN", ip: "103.21.45.10", status: "Online", uptime: "99.9%", cpu: 42, ram: 68, disk: 55, lastChecked: "2 min ago" },
  { id: "s2", name: "api-server-02", env: "Production", region: "Singapore, SG", ip: "52.74.128.44", status: "Online", uptime: "100%", cpu: 28, ram: 51, disk: 38, lastChecked: "1 min ago" },
  { id: "s3", name: "staging-server-01", env: "Staging", region: "Mumbai, IN", ip: "103.21.45.88", status: "Online", uptime: "99.5%", cpu: 15, ram: 34, disk: 22, lastChecked: "5 min ago" },
  { id: "s4", name: "db-server-01", env: "Production", region: "Mumbai, IN", ip: "103.21.45.12", status: "Online", uptime: "99.8%", cpu: 61, ram: 82, disk: 71, lastChecked: "3 min ago" },
  { id: "s5", name: "cdn-edge-01", env: "Production", region: "Frankfurt, DE", ip: "185.12.44.20", status: "Degraded", uptime: "97.2%", cpu: 78, ram: 74, disk: 45, lastChecked: "1 min ago" },
  { id: "s6", name: "worker-server-01", env: "Production", region: "Singapore, SG", ip: "52.74.128.90", status: "Online", uptime: "99.7%", cpu: 35, ram: 48, disk: 30, lastChecked: "4 min ago" },
  { id: "s7", name: "dev-server-01", env: "Development", region: "Mumbai, IN", ip: "103.21.45.99", status: "Maintenance", uptime: "—", cpu: 0, ram: 0, disk: 12, lastChecked: "30 min ago" },
  { id: "s8", name: "backup-server-01", env: "Production", region: "Mumbai, IN", ip: "103.21.45.15", status: "Offline", uptime: "0%", cpu: 0, ram: 0, disk: 88, lastChecked: "2 hours ago" },
];

const statusStyles: Record<ServerStatus, string> = {
  Online: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Offline: "bg-red-500/15 text-red-400 border-red-500/20",
  Maintenance: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Degraded: "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

const envStyles: Record<ServerEnv, string> = {
  Production: "bg-blue-500/10 text-blue-400",
  Staging: "bg-violet-500/10 text-violet-400",
  Development: "bg-zinc-500/10 text-zinc-400",
};

function UsageBar({ value, color }: { value: number; color: string }) {
  const barColor =
    value >= 80 ? "bg-red-500" : value >= 60 ? "bg-amber-500" : color;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[10px] text-zinc-500 w-8 text-right">{value}%</span>
    </div>
  );
}

export default function AdminServersView() {
  const [query, setQuery] = useState("");
  const [envFilter, setEnvFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = useMemo(() => {
    return allServers.filter((s) => {
      const matchQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.ip.includes(query) ||
        s.region.toLowerCase().includes(query.toLowerCase());
      const matchEnv = envFilter === "all" || s.env === envFilter;
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      return matchQuery && matchEnv && matchStatus;
    });
  }, [query, envFilter, statusFilter]);

  const stats = useMemo(
    () => ({
      total: allServers.length,
      online: allServers.filter((s) => s.status === "Online").length,
      offline: allServers.filter((s) => s.status === "Offline").length,
      degraded: allServers.filter((s) => s.status === "Degraded" || s.status === "Maintenance").length,
    }),
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Servers</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Monitor server health, uptime, and resource usage across all environments.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 bg-[#111827] border border-white/8 hover:border-white/15 text-zinc-300 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Server
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Servers", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: Server },
          { label: "Online", value: stats.online, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Activity },
          { label: "Offline", value: stats.offline, color: "text-red-400", bg: "bg-red-500/10", icon: Power },
          { label: "Issues", value: stats.degraded, color: "text-amber-400", bg: "bg-amber-500/10", icon: AlertTriangle },
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

      {/* System alert */}
      {stats.offline > 0 && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-sm text-red-300">
            <strong>{stats.offline} server(s) offline.</strong> Immediate attention required.
          </p>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search servers, IP, region..."
              className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <select
              value={envFilter}
              onChange={(e) => setEnvFilter(e.target.value)}
              className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[150px]"
            >
              <option value="all">All Environments</option>
              <option value="Production">Production</option>
              <option value="Staging">Staging</option>
              <option value="Development">Development</option>
            </select>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[130px]"
          >
            <option value="all">All Status</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Degraded">Degraded</option>
            <option value="Maintenance">Maintenance</option>
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

      {/* List View */}
      {view === "list" ? (
        <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
          <div className="hidden lg:grid grid-cols-[1.4fr_90px_1fr_110px_90px_1fr_60px] gap-4 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Server</span>
            <span>Env</span>
            <span>Region / IP</span>
            <span>Status</span>
            <span>Uptime</span>
            <span>Resources</span>
            <span />
          </div>
          <div className="divide-y divide-white/4">
            {filtered.map((srv) => (
              <div
                key={srv.id}
                className="grid grid-cols-1 lg:grid-cols-[1.4fr_90px_1fr_110px_90px_1fr_60px] gap-3 lg:gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${srv.status === "Online" ? "bg-emerald-500/10" : srv.status === "Offline" ? "bg-red-500/10" : "bg-amber-500/10"}`}>
                    <Server className={`w-4 h-4 ${srv.status === "Online" ? "text-emerald-400" : srv.status === "Offline" ? "text-red-400" : "text-amber-400"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white font-mono">{srv.name}</p>
                    <p className="text-[10px] text-zinc-600">{srv.lastChecked}</p>
                  </div>
                </div>
                <span className={`hidden lg:inline text-[10px] font-semibold px-2 py-1 rounded-md ${envStyles[srv.env]}`}>
                  {srv.env}
                </span>
                <div className="hidden lg:block">
                  <p className="text-xs text-zinc-400 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {srv.region}
                  </p>
                  <p className="text-[10px] text-zinc-600 font-mono mt-0.5">{srv.ip}</p>
                </div>
                <span className={`hidden lg:inline-flex text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[srv.status]}`}>
                  {srv.status}
                </span>
                <p className={`hidden lg:block text-sm font-bold ${srv.status === "Online" ? "text-emerald-400" : srv.status === "Offline" ? "text-red-400" : "text-zinc-500"}`}>
                  {srv.uptime}
                </p>
                <div className="hidden lg:block space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                    <Cpu className="w-3 h-3" /> CPU
                    <div className="flex-1"><UsageBar value={srv.cpu} color="bg-blue-500" /></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                    <Activity className="w-3 h-3" /> RAM
                    <div className="flex-1"><UsageBar value={srv.ram} color="bg-violet-500" /></div>
                  </div>
                </div>
                <div className="hidden lg:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" aria-label="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors" aria-label="More">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Mobile */}
                <div className="lg:hidden flex flex-wrap gap-2 mt-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyles[srv.status]}`}>{srv.status}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${envStyles[srv.env]}`}>{srv.env}</span>
                  <span className="text-[10px] text-zinc-500">{srv.uptime} · {srv.ip}</span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm">No servers found.</div>
          )}
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((srv) => (
            <div
              key={srv.id}
              className={`bg-[#111827] border rounded-2xl p-5 transition-all hover:border-blue-500/30 ${
                srv.status === "Offline" ? "border-red-500/20" : "border-white/6"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${srv.status === "Online" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                    <Server className={`w-5 h-5 ${srv.status === "Online" ? "text-emerald-400" : "text-red-400"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white font-mono">{srv.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${envStyles[srv.env]}`}>{srv.env}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[srv.status]}`}>
                  {srv.status}
                </span>
              </div>

              <div className="space-y-2 mb-4 text-xs text-zinc-500">
                <p className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> {srv.region}
                </p>
                <p className="font-mono text-zinc-600">{srv.ip}</p>
              </div>

              <div className="flex items-center justify-between mb-4 py-3 border-y border-white/5">
                <div className="text-center">
                  <p className={`text-lg font-bold ${srv.status === "Online" ? "text-emerald-400" : "text-zinc-500"}`}>{srv.uptime}</p>
                  <p className="text-[10px] text-zinc-600">Uptime</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{srv.cpu}%</p>
                  <p className="text-[10px] text-zinc-600">CPU</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{srv.ram}%</p>
                  <p className="text-[10px] text-zinc-600">RAM</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{srv.disk}%</p>
                  <p className="text-[10px] text-zinc-600 flex items-center gap-0.5 justify-center">
                    <HardDrive className="w-2.5 h-2.5" /> Disk
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <UsageBar value={srv.cpu} color="bg-blue-500" />
                <UsageBar value={srv.ram} color="bg-violet-500" />
                <UsageBar value={srv.disk} color="bg-emerald-500" />
              </div>

              <p className="text-[10px] text-zinc-600 mt-3">Last checked: {srv.lastChecked}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allServers.length}</strong> servers
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
