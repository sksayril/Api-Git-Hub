"use client";

import { useMemo, useState } from "react";
import {
  Database,
  Plus,
  Search,
  Filter,
  Download,
  RotateCcw,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HardDrive,
  Cloud,
  Server,
  FileArchive,
  Calendar,
  Play,
  Pause,
  RefreshCw,
  Shield,
  FolderOpen,
} from "lucide-react";

type TabId = "overview" | "backups" | "schedules" | "storage";
type BackupStatus = "Success" | "Failed" | "Running" | "Partial";
type BackupType = "Full" | "Incremental" | "Database" | "Files";
type ScheduleFrequency = "Hourly" | "Daily" | "Weekly" | "Monthly";

interface BackupRecord {
  id: string;
  name: string;
  type: BackupType;
  source: string;
  size: string;
  status: BackupStatus;
  createdAt: string;
  duration: string;
  retention: string;
}

interface BackupSchedule {
  id: string;
  name: string;
  type: BackupType;
  frequency: ScheduleFrequency;
  time: string;
  destination: string;
  enabled: boolean;
  lastRun: string;
  nextRun: string;
}

interface StorageBucket {
  id: string;
  label: string;
  used: string;
  total: string;
  pct: number;
  color: string;
  icon: React.ElementType;
}

const allBackups: BackupRecord[] = [
  { id: "b1", name: "mongodb-prod-daily", type: "Database", source: "db-server-01", size: "2.4 GB", status: "Success", createdAt: "Jun 24, 2026 · 03:00 AM", duration: "4m 12s", retention: "30 days" },
  { id: "b2", name: "api-files-incremental", type: "Incremental", source: "api-server-02", size: "840 MB", status: "Success", createdAt: "Jun 24, 2026 · 02:00 AM", duration: "1m 48s", retention: "14 days" },
  { id: "b3", name: "full-system-backup", type: "Full", source: "All servers", size: "18.6 GB", status: "Success", createdAt: "Jun 23, 2026 · 01:00 AM", duration: "22m 05s", retention: "7 days" },
  { id: "b4", name: "media-assets-backup", type: "Files", source: "cdn-edge-01", size: "5.2 GB", status: "Partial", createdAt: "Jun 23, 2026 · 12:00 AM", duration: "8m 30s", retention: "60 days" },
  { id: "b5", name: "mongodb-staging", type: "Database", source: "staging-server-01", size: "620 MB", status: "Success", createdAt: "Jun 22, 2026 · 11:00 PM", duration: "2m 01s", retention: "14 days" },
  { id: "b6", name: "config-snapshot", type: "Files", source: "backend-server-01", size: "48 MB", status: "Success", createdAt: "Jun 22, 2026 · 06:00 PM", duration: "0m 32s", retention: "90 days" },
  { id: "b7", name: "mongodb-prod-daily", type: "Database", source: "db-server-01", size: "—", status: "Failed", createdAt: "Jun 21, 2026 · 03:00 AM", duration: "0m 18s", retention: "30 days" },
  { id: "b8", name: "worker-queue-backup", type: "Incremental", source: "worker-server-01", size: "1.1 GB", status: "Running", createdAt: "Running now", duration: "—", retention: "7 days" },
];

const schedules: BackupSchedule[] = [
  { id: "s1", name: "MongoDB Production", type: "Database", frequency: "Daily", time: "03:00 AM IST", destination: "AWS S3 · ap-south-1", enabled: true, lastRun: "Jun 24, 03:00 AM", nextRun: "Jun 25, 03:00 AM" },
  { id: "s2", name: "Full System Backup", type: "Full", frequency: "Weekly", time: "Sun 01:00 AM IST", destination: "AWS S3 · ap-south-1", enabled: true, lastRun: "Jun 22, 01:00 AM", nextRun: "Jun 29, 01:00 AM" },
  { id: "s3", name: "API Files Incremental", type: "Incremental", frequency: "Hourly", time: "Every hour", destination: "Local · backup-server-01", enabled: true, lastRun: "Jun 24, 02:00 PM", nextRun: "Jun 24, 03:00 PM" },
  { id: "s4", name: "Media Assets", type: "Files", frequency: "Daily", time: "12:00 AM IST", destination: "Cloudflare R2", enabled: false, lastRun: "Jun 20, 12:00 AM", nextRun: "Paused" },
  { id: "s5", name: "Staging DB Snapshot", type: "Database", frequency: "Daily", time: "11:00 PM IST", destination: "Local · staging-server-01", enabled: true, lastRun: "Jun 23, 11:00 PM", nextRun: "Jun 24, 11:00 PM" },
  { id: "s6", name: "Config & Env Files", type: "Files", frequency: "Monthly", time: "1st · 06:00 AM IST", destination: "AWS S3 · ap-south-1", enabled: true, lastRun: "Jun 1, 06:00 AM", nextRun: "Jul 1, 06:00 AM" },
];

const storageBuckets: StorageBucket[] = [
  { id: "st1", label: "Database Backups", used: "42.8 GB", total: "100 GB", pct: 43, color: "bg-blue-500", icon: Database },
  { id: "st2", label: "File & Media", used: "28.4 GB", total: "50 GB", pct: 57, color: "bg-violet-500", icon: FolderOpen },
  { id: "st3", label: "Full Snapshots", used: "56.2 GB", total: "200 GB", pct: 28, color: "bg-emerald-500", icon: FileArchive },
  { id: "st4", label: "Config & Logs", used: "3.1 GB", total: "20 GB", pct: 16, color: "bg-amber-500", icon: Shield },
];

const statusStyles: Record<BackupStatus, string> = {
  Success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Failed: "bg-red-500/15 text-red-400 border-red-500/20",
  Running: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Partial: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

const typeStyles: Record<BackupType, string> = {
  Full: "bg-violet-500/10 text-violet-400",
  Incremental: "bg-cyan-500/10 text-cyan-400",
  Database: "bg-blue-500/10 text-blue-400",
  Files: "bg-amber-500/10 text-amber-400",
};

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: HardDrive },
  { id: "backups", label: "Backups", icon: FileArchive },
  { id: "schedules", label: "Schedules", icon: Calendar },
  { id: "storage", label: "Storage", icon: Cloud },
];

function StatusIcon({ status }: { status: BackupStatus }) {
  if (status === "Success") return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  if (status === "Failed") return <XCircle className="w-4 h-4 text-red-400" />;
  if (status === "Running") return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />;
  return <AlertTriangle className="w-4 h-4 text-amber-400" />;
}

export default function AdminBackupsView() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const stats = useMemo(
    () => ({
      total: allBackups.filter((b) => b.status !== "Running").length,
      storageUsed: "130.5 GB",
      storageTotal: "370 GB",
      lastBackup: "2 hours ago",
      successRate: "94.2%",
      running: allBackups.filter((b) => b.status === "Running").length,
      failed: allBackups.filter((b) => b.status === "Failed").length,
    }),
    []
  );

  const filteredBackups = useMemo(() => {
    return allBackups.filter((b) => {
      const matchQuery =
        !query ||
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.source.toLowerCase().includes(query.toLowerCase());
      const matchType = typeFilter === "all" || b.type === typeFilter;
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      return matchQuery && matchType && matchStatus;
    });
  }, [query, typeFilter, statusFilter]);

  const recentActivity = useMemo(
    () => [
      { time: "2 hours ago", event: "mongodb-prod-daily completed successfully", type: "success" as const },
      { time: "3 hours ago", event: "api-files-incremental completed · 840 MB", type: "success" as const },
      { time: "1 day ago", event: "full-system-backup completed · 18.6 GB", type: "success" as const },
      { time: "2 days ago", event: "mongodb-prod-daily failed — connection timeout", type: "error" as const },
      { time: "2 days ago", event: "media-assets-backup partial — 3 files skipped", type: "warning" as const },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Backups</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage database snapshots, file backups, and automated recovery schedules.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 text-zinc-300 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Sync Now
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Backup
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Backups", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: FileArchive },
          { label: "Storage Used", value: stats.storageUsed, color: "text-violet-400", bg: "bg-violet-500/10", icon: HardDrive },
          { label: "Last Backup", value: stats.lastBackup, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: Clock },
          { label: "Success Rate", value: stats.successRate, color: "text-cyan-400", bg: "bg-cyan-500/10", icon: CheckCircle2 },
          { label: "Active Jobs", value: stats.running, color: "text-amber-400", bg: "bg-amber-500/10", icon: RefreshCw },
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
                activeTab === tab.id ? "bg-blue-600/20 text-blue-400" : "text-zinc-500 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Storage gauge */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-1">Storage Usage</h2>
              <p className="text-[10px] text-zinc-500 mb-4">
                {stats.storageUsed} of {stats.storageTotal} used
              </p>
              <div className="relative h-28 w-28 mx-auto mb-4">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="35.3 64.7"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-white">35%</span>
                  <span className="text-[9px] text-zinc-500">used</span>
                </div>
              </div>
              <div className="space-y-2">
                {storageBuckets.slice(0, 3).map((b) => (
                  <div key={b.id} className="flex items-center gap-2 text-xs">
                    <span className={`h-2 w-2 rounded-full ${b.color}`} />
                    <span className="text-zinc-400 flex-1">{b.label}</span>
                    <span className="text-zinc-500">{b.used}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backup trend */}
            <div className="lg:col-span-2 bg-[#111827] border border-white/6 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-white">Backup Volume</h2>
                  <p className="text-[10px] text-zinc-500">Daily backup size — last 14 days</p>
                </div>
                <span className="text-xs font-semibold text-emerald-400">+8% vs last week</span>
              </div>
              <div className="h-28">
                <svg viewBox="0 0 400 90" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="backupVolGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 22, 45, 68, 90].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" />
                  ))}
                  <path
                    d="M0,70 C30,65 60,55 90,50 C120,45 150,60 180,40 C210,25 240,35 270,30 C300,20 330,45 360,25 C380,18 400,15 400,15 L400,90 L0,90 Z"
                    fill="url(#backupVolGrad)"
                  />
                  <path
                    d="M0,70 C30,65 60,55 90,50 C120,45 150,60 180,40 C210,25 240,35 270,30 C300,20 330,45 360,25 C380,18 400,15 400,15"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
                {[
                  { label: "Today", value: "3.2 GB" },
                  { label: "This Week", value: "24.8 GB" },
                  { label: "Avg. Duration", value: "6m 42s" },
                  { label: "Failed (30d)", value: stats.failed },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-sm font-bold text-white">{m.value}</p>
                    <p className="text-[10px] text-zinc-500">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent backups */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h2 className="font-semibold text-white">Recent Backups</h2>
              </div>
              <div className="divide-y divide-white/4">
                {allBackups.slice(0, 5).map((b) => (
                  <div key={b.id} className="px-5 py-3.5 flex items-center gap-3">
                    <StatusIcon status={b.status} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{b.name}</p>
                      <p className="text-[10px] text-zinc-600">{b.createdAt}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-zinc-300">{b.size}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${typeStyles[b.type]}`}>
                        {b.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity log */}
            <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5">
                <h2 className="font-semibold text-white">Activity Log</h2>
              </div>
              <div className="divide-y divide-white/4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="px-5 py-3.5 flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                        a.type === "success"
                          ? "bg-emerald-500"
                          : a.type === "error"
                            ? "bg-red-500"
                            : "bg-amber-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm text-zinc-300">{a.event}</p>
                      <p className="text-[10px] text-zinc-600 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backups list */}
      {activeTab === "backups" && (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search backups..."
                className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[140px]"
              >
                <option value="all">All Types</option>
                <option value="Full">Full</option>
                <option value="Incremental">Incremental</option>
                <option value="Database">Database</option>
                <option value="Files">Files</option>
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Running">Running</option>
              <option value="Partial">Partial</option>
            </select>
          </div>

          <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
            <div className="hidden xl:grid grid-cols-[1.4fr_90px_110px_80px_90px_140px_80px_100px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              <span>Backup Name</span>
              <span>Type</span>
              <span>Source</span>
              <span>Size</span>
              <span>Status</span>
              <span>Created</span>
              <span>Retention</span>
              <span>Actions</span>
            </div>
            <div className="divide-y divide-white/4">
              {filteredBackups.map((b) => (
                <div
                  key={b.id}
                  className="grid grid-cols-1 xl:grid-cols-[1.4fr_90px_110px_80px_90px_140px_80px_100px] gap-3 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Database className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {b.name}
                      </p>
                      <p className="text-[10px] text-zinc-600">{b.duration !== "—" ? `Duration: ${b.duration}` : "In progress..."}</p>
                    </div>
                  </div>
                  <span className={`hidden xl:inline text-[10px] font-semibold px-2 py-1 rounded-md w-fit ${typeStyles[b.type]}`}>
                    {b.type}
                  </span>
                  <p className="hidden xl:block text-xs text-zinc-500 truncate">{b.source}</p>
                  <p className="hidden xl:block text-sm font-bold text-white">{b.size}</p>
                  <span className={`hidden xl:inline-flex text-[10px] font-semibold px-2 py-1 rounded-full border w-fit ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                  <p className="hidden xl:block text-[10px] text-zinc-500">{b.createdAt}</p>
                  <p className="hidden xl:block text-xs text-zinc-400">{b.retention}</p>
                  <div className="hidden xl:flex items-center gap-1">
                    {b.status === "Success" && (
                      <>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                          aria-label="Download backup"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                          aria-label="Restore backup"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    {b.status !== "Running" && (
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        aria-label="Delete backup"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="xl:hidden flex flex-wrap gap-2 text-[10px] text-zinc-500">
                    <span className={`font-semibold px-1.5 py-0.5 rounded ${typeStyles[b.type]}`}>{b.type}</span>
                    <span className={`font-semibold px-1.5 py-0.5 rounded-full border ${statusStyles[b.status]}`}>{b.status}</span>
                    {b.size} · {b.retention}
                  </div>
                </div>
              ))}
            </div>
            {filteredBackups.length === 0 && (
              <div className="py-16 text-center text-zinc-500 text-sm">No backups found.</div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-zinc-500">
            <span>
              Showing <strong className="text-zinc-300">{filteredBackups.length}</strong> of{" "}
              <strong className="text-zinc-300">{allBackups.length}</strong> backups
            </span>
          </div>
        </>
      )}

      {/* Schedules */}
      {activeTab === "schedules" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">{schedules.filter((s) => s.enabled).length} active schedules</p>
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Schedule
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {schedules.map((s) => (
              <div
                key={s.id}
                className={`bg-[#111827] border rounded-2xl p-5 transition-all ${
                  s.enabled ? "border-white/6 hover:border-blue-500/30" : "border-white/4 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${s.enabled ? "bg-blue-500/10" : "bg-zinc-500/10"}`}>
                      <Calendar className={`w-5 h-5 ${s.enabled ? "text-blue-400" : "text-zinc-500"}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{s.name}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${typeStyles[s.type]}`}>
                        {s.type}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`p-2 rounded-lg transition-colors ${
                      s.enabled
                        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20"
                    }`}
                    aria-label={s.enabled ? "Pause schedule" : "Enable schedule"}
                  >
                    {s.enabled ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-zinc-600 mb-1">Frequency</p>
                    <p className="font-semibold text-white">{s.frequency}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{s.time}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-zinc-600 mb-1">Destination</p>
                    <p className="font-semibold text-white truncate">{s.destination}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] text-zinc-500">
                  <span>Last: {s.lastRun}</span>
                  <span className={s.enabled ? "text-blue-400" : "text-zinc-600"}>Next: {s.nextRun}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storage */}
      {activeTab === "storage" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Capacity", value: "370 GB", icon: HardDrive, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Used Space", value: "130.5 GB", icon: Database, color: "text-violet-400", bg: "bg-violet-500/10" },
              { label: "Free Space", value: "239.5 GB", icon: Cloud, color: "text-emerald-400", bg: "bg-emerald-500/10" },
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

          <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
            <h2 className="font-semibold text-white mb-4">Storage Breakdown</h2>
            <div className="space-y-5">
              {storageBuckets.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-zinc-300">{b.label}</span>
                      </div>
                      <span className="text-xs text-zinc-500">
                        {b.used} / {b.total}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${b.color} transition-all`}
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-600 mt-1">{b.pct}% used</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5">
              <h2 className="font-semibold text-white">Storage Destinations</h2>
            </div>
            <div className="divide-y divide-white/4">
              {[
                { name: "AWS S3 · ap-south-1", type: "Primary", used: "98.2 GB", status: "Connected", icon: Cloud },
                { name: "Local · backup-server-01", type: "Secondary", used: "22.4 GB", status: "Offline", icon: Server },
                { name: "Cloudflare R2", type: "Media", used: "9.9 GB", status: "Connected", icon: Cloud },
              ].map((dest) => {
                const Icon = dest.icon;
                return (
                  <div key={dest.name} className="px-5 py-4 flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{dest.name}</p>
                      <p className="text-[10px] text-zinc-600">{dest.type} · {dest.used} stored</p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                        dest.status === "Connected"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {dest.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
