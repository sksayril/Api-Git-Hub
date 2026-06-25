"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Search,
  Filter,
  Download,
  LogIn,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Shield,
  AlertTriangle,
  Server,
  DollarSign,
  User,
  Settings,
  FileText,
  Headphones,
  Database,
  Clock,
  RefreshCw,
} from "lucide-react";

type LogAction =
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "payment"
  | "error"
  | "security"
  | "system";
type LogSeverity = "info" | "success" | "warning" | "error";
type LogModule =
  | "Auth"
  | "Projects"
  | "Clients"
  | "Invoices"
  | "Tickets"
  | "Servers"
  | "Backups"
  | "Settings"
  | "Team"
  | "System";

interface ActivityLog {
  id: string;
  action: LogAction;
  severity: LogSeverity;
  module: LogModule;
  user: string;
  description: string;
  metadata?: string;
  ip: string;
  timestamp: string;
  relative: string;
}

const allLogs: ActivityLog[] = [
  { id: "l1", action: "login", severity: "info", module: "Auth", user: "Biplop Roy", description: "Logged in to admin panel", ip: "103.21.45.88", timestamp: "Jun 24, 2026 · 2:45 PM", relative: "Just now" },
  { id: "l2", action: "payment", severity: "success", module: "Invoices", user: "System", description: "Payment received for INV-2026-0040 — $4,956", metadata: "FitTrack · Stripe", ip: "—", timestamp: "Jun 24, 2026 · 2:30 PM", relative: "15 min ago" },
  { id: "l3", action: "create", severity: "info", module: "Tickets", user: "Ananya Reddy", description: "Created support ticket TKT-1042", metadata: "Payment failed on checkout", ip: "103.21.45.90", timestamp: "Jun 24, 2026 · 9:15 AM", relative: "5 hours ago" },
  { id: "l4", action: "update", severity: "info", module: "Projects", user: "Arnav Gupta", description: "Updated project status to Active", metadata: "E-commerce Backend", ip: "52.74.128.44", timestamp: "Jun 24, 2026 · 8:50 AM", relative: "6 hours ago" },
  { id: "l5", action: "security", severity: "warning", module: "Auth", user: "Unknown", description: "Failed login attempt — invalid credentials", ip: "185.12.44.99", timestamp: "Jun 24, 2026 · 7:22 AM", relative: "7 hours ago" },
  { id: "l6", action: "system", severity: "success", module: "Backups", user: "System", description: "Daily MongoDB backup completed", metadata: "2.4 GB · 4m 12s", ip: "—", timestamp: "Jun 24, 2026 · 3:00 AM", relative: "12 hours ago" },
  { id: "l7", action: "create", severity: "info", module: "Clients", user: "Kavya Nair", description: "Added new client EduLearn", metadata: "Priya Das · priya@edulearn.in", ip: "103.21.45.88", timestamp: "Jun 23, 2026 · 4:10 PM", relative: "1 day ago" },
  { id: "l8", action: "error", severity: "error", module: "Servers", user: "System", description: "Server backup-server-01 went offline", metadata: "Uptime dropped to 0%", ip: "—", timestamp: "Jun 23, 2026 · 2:00 PM", relative: "1 day ago" },
  { id: "l9", action: "update", severity: "info", module: "Settings", user: "SK Sayril Amed", description: "Updated notification preferences", ip: "103.21.45.88", timestamp: "Jun 23, 2026 · 11:30 AM", relative: "1 day ago" },
  { id: "l10", action: "delete", severity: "warning", module: "Team", user: "Biplop Roy", description: "Removed team member access", metadata: "Dev Patel · Developer", ip: "103.21.45.88", timestamp: "Jun 22, 2026 · 5:45 PM", relative: "2 days ago" },
  { id: "l11", action: "create", severity: "info", module: "Invoices", user: "Kavya Nair", description: "Created invoice INV-2026-0043", metadata: "EduLearn · $8,850", ip: "103.21.45.88", timestamp: "Jun 22, 2026 · 3:20 PM", relative: "2 days ago" },
  { id: "l12", action: "login", severity: "info", module: "Auth", user: "Meera Shah", description: "Logged in to admin panel", ip: "49.36.128.10", timestamp: "Jun 22, 2026 · 10:00 AM", relative: "2 days ago" },
  { id: "l13", action: "logout", severity: "info", module: "Auth", user: "Vikram Singh", description: "Logged out of admin panel", ip: "103.21.45.91", timestamp: "Jun 21, 2026 · 6:30 PM", relative: "3 days ago" },
  { id: "l14", action: "system", severity: "warning", module: "Servers", user: "System", description: "High CPU usage on cdn-edge-01", metadata: "CPU 78% · RAM 74%", ip: "—", timestamp: "Jun 21, 2026 · 2:15 PM", relative: "3 days ago" },
  { id: "l15", action: "update", severity: "success", module: "Tickets", user: "Ananya Reddy", description: "Resolved ticket TKT-1038", metadata: "Project listing not visible", ip: "103.21.45.90", timestamp: "Jun 20, 2026 · 4:00 PM", relative: "4 days ago" },
];

const actionConfig: Record<LogAction, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  login: { icon: LogIn, color: "text-blue-400", bg: "bg-blue-500/10", label: "Login" },
  logout: { icon: LogOut, color: "text-zinc-400", bg: "bg-zinc-500/10", label: "Logout" },
  create: { icon: Plus, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Create" },
  update: { icon: Pencil, color: "text-violet-400", bg: "bg-violet-500/10", label: "Update" },
  delete: { icon: Trash2, color: "text-red-400", bg: "bg-red-500/10", label: "Delete" },
  payment: { icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Payment" },
  error: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", label: "Error" },
  security: { icon: Shield, color: "text-amber-400", bg: "bg-amber-500/10", label: "Security" },
  system: { icon: Server, color: "text-cyan-400", bg: "bg-cyan-500/10", label: "System" },
};

const severityStyles: Record<LogSeverity, string> = {
  info: "bg-blue-500/10 text-blue-400",
  success: "bg-emerald-500/10 text-emerald-400",
  warning: "bg-amber-500/10 text-amber-400",
  error: "bg-red-500/10 text-red-400",
};

const moduleIcons: Record<LogModule, React.ElementType> = {
  Auth: User,
  Projects: FileText,
  Clients: User,
  Invoices: DollarSign,
  Tickets: Headphones,
  Servers: Server,
  Backups: Database,
  Settings: Settings,
  Team: User,
  System: Activity,
};

function UserInitials({ name }: { name: string }) {
  if (name === "System") {
    return (
      <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
        <Server className="w-4 h-4 text-cyan-400" />
      </div>
    );
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="h-8 w-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
      {initials}
    </div>
  );
}

export default function AdminActivityLogsView() {
  const [query, setQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filtered = useMemo(() => {
    return allLogs.filter((log) => {
      const matchQuery =
        !query ||
        log.description.toLowerCase().includes(query.toLowerCase()) ||
        log.user.toLowerCase().includes(query.toLowerCase()) ||
        log.module.toLowerCase().includes(query.toLowerCase()) ||
        (log.metadata?.toLowerCase().includes(query.toLowerCase()) ?? false);
      const matchAction = actionFilter === "all" || log.action === actionFilter;
      const matchModule = moduleFilter === "all" || log.module === moduleFilter;
      const matchSeverity = severityFilter === "all" || log.severity === severityFilter;
      return matchQuery && matchAction && matchModule && matchSeverity;
    });
  }, [query, actionFilter, moduleFilter, severityFilter]);

  const stats = useMemo(
    () => ({
      total: allLogs.length,
      today: allLogs.filter((l) => l.relative.includes("min") || l.relative.includes("hour") || l.relative === "Just now").length,
      users: new Set(allLogs.filter((l) => l.user !== "System").map((l) => l.user)).size,
      critical: allLogs.filter((l) => l.severity === "error" || l.severity === "warning").length,
    }),
    []
  );

  const actionBreakdown = useMemo(() => {
    const counts: Partial<Record<LogAction, number>> = {};
    allLogs.forEach((l) => {
      counts[l.action] = (counts[l.action] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Activity Logs</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Audit trail of all admin actions, system events, and security activity.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 text-zinc-300 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: Activity },
          { label: "Today", value: stats.today, color: "text-violet-400", bg: "bg-violet-500/10", icon: Clock },
          { label: "Active Users", value: stats.users, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: User },
          { label: "Warnings & Errors", value: stats.critical, color: "text-amber-400", bg: "bg-amber-500/10", icon: AlertTriangle },
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

      {/* Action breakdown */}
      <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
        <h2 className="font-semibold text-white mb-4">Event Types (Last 7 days)</h2>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(actionBreakdown) as [LogAction, number][]).map(([action, count]) => {
            const config = actionConfig[action];
            const Icon = config.icon;
            return (
              <button
                key={action}
                type="button"
                onClick={() => setActionFilter(actionFilter === action ? "all" : action)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  actionFilter === action
                    ? `${config.bg} ${config.color} border border-current/20`
                    : "bg-white/[0.02] text-zinc-500 border border-white/6 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {config.label}
                <span className="bg-white/5 px-1.5 py-0.5 rounded-full text-[10px]">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search logs..."
            className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[150px]"
          >
            <option value="all">All Modules</option>
            <option value="Auth">Auth</option>
            <option value="Projects">Projects</option>
            <option value="Clients">Clients</option>
            <option value="Invoices">Invoices</option>
            <option value="Tickets">Tickets</option>
            <option value="Servers">Servers</option>
            <option value="Backups">Backups</option>
            <option value="Settings">Settings</option>
            <option value="Team">Team</option>
            <option value="System">System</option>
          </select>
        </div>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[140px]"
        >
          <option value="all">All Severity</option>
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
        {(actionFilter !== "all" || moduleFilter !== "all" || severityFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setActionFilter("all");
              setModuleFilter("all");
              setSeverityFilter("all");
            }}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors px-3"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
        <div className="hidden lg:grid grid-cols-[140px_1fr_100px_100px_120px_100px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
          <span>Time</span>
          <span>Event</span>
          <span>Action</span>
          <span>Module</span>
          <span>User</span>
          <span>IP Address</span>
        </div>
        <div className="divide-y divide-white/4">
          {filtered.map((log) => {
            const config = actionConfig[log.action];
            const ActionIcon = config.icon;
            const ModuleIcon = moduleIcons[log.module];
            return (
              <div
                key={log.id}
                className="grid grid-cols-1 lg:grid-cols-[140px_1fr_100px_100px_120px_100px] gap-3 items-start px-6 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="hidden lg:block">
                  <p className="text-xs font-semibold text-zinc-300">{log.relative}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">{log.timestamp}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.bg} shrink-0`}>
                    <ActionIcon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      {log.description}
                    </p>
                    {log.metadata && (
                      <p className="text-[10px] text-zinc-600 mt-0.5">{log.metadata}</p>
                    )}
                    <div className="lg:hidden flex flex-wrap gap-2 mt-2 text-[10px]">
                      <span className={`font-semibold px-2 py-0.5 rounded ${severityStyles[log.severity]}`}>
                        {log.severity}
                      </span>
                      <span className="text-zinc-500">{log.user} · {log.relative}</span>
                    </div>
                  </div>
                </div>
                <span className={`hidden lg:inline text-[10px] font-semibold px-2 py-1 rounded-md w-fit ${config.bg} ${config.color}`}>
                  {config.label}
                </span>
                <div className="hidden lg:flex items-center gap-1.5">
                  <ModuleIcon className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="text-xs text-zinc-500">{log.module}</span>
                </div>
                <div className="hidden lg:flex items-center gap-2">
                  <UserInitials name={log.user} />
                  <span className="text-xs text-zinc-400 truncate">{log.user}</span>
                </div>
                <p className="hidden lg:block text-[10px] font-mono text-zinc-600">{log.ip}</p>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-zinc-500 text-sm">No activity logs found.</div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allLogs.length}</strong> events
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
