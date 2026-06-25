"use client";

import { useMemo, useState } from "react";
import {
  Headphones,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Pencil,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Tag,
  Circle,
  PlayCircle,
  PauseCircle,
  XCircle,
  Send,
} from "lucide-react";

type TicketStatus = "Open" | "In Progress" | "Waiting" | "Resolved" | "Closed";
type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
type TicketCategory = "Billing" | "Technical" | "Account" | "General" | "Bug Report";
type ViewMode = "list" | "board";

interface SupportTicket {
  id: string;
  number: string;
  subject: string;
  description: string;
  requester: string;
  email: string;
  assignee: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  created: string;
  updated: string;
  messages: number;
}

const allTickets: SupportTicket[] = [
  { id: "st1", number: "TKT-1042", subject: "Payment failed on checkout", description: "Stripe returns error 402 during payment", requester: "Rahul Sharma", email: "rahul@shopwave.io", assignee: "Ananya Reddy", status: "In Progress", priority: "Urgent", category: "Billing", created: "Jun 24, 2026 · 9:15 AM", updated: "2 hours ago", messages: 6 },
  { id: "st2", number: "TKT-1041", subject: "API rate limit exceeded", description: "Getting 429 errors on production API", requester: "Sarah Mitchell", email: "sarah@travelnest.com", assignee: "Arnav Gupta", status: "Open", priority: "High", category: "Technical", created: "Jun 24, 2026 · 8:30 AM", updated: "3 hours ago", messages: 3 },
  { id: "st3", number: "TKT-1040", subject: "Cannot reset admin password", description: "Password reset email not received", requester: "James Chen", email: "james@fittrack.app", assignee: "Ananya Reddy", status: "Waiting", priority: "Medium", category: "Account", created: "Jun 23, 2026 · 4:20 PM", updated: "1 day ago", messages: 4 },
  { id: "st4", number: "TKT-1039", subject: "Invoice PDF download broken", description: "PDF returns blank page on mobile", requester: "Emily Watson", email: "emily@payflow.co", assignee: null, status: "Open", priority: "Medium", category: "Bug Report", created: "Jun 23, 2026 · 11:00 AM", updated: "1 day ago", messages: 1 },
  { id: "st5", number: "TKT-1038", subject: "Project listing not visible", description: "Listed project not showing in marketplace", requester: "Arjun Patel", email: "arjun@datapulse.in", assignee: "Kavya Nair", status: "Resolved", priority: "High", category: "Technical", created: "Jun 22, 2026 · 2:45 PM", updated: "2 days ago", messages: 8 },
  { id: "st6", number: "TKT-1037", subject: "Refund request for cancelled order", description: "Requesting refund for order #ORD-8821", requester: "Lisa Nguyen", email: "lisa@designhub.co", assignee: "Ananya Reddy", status: "In Progress", priority: "High", category: "Billing", created: "Jun 22, 2026 · 10:00 AM", updated: "2 days ago", messages: 5 },
  { id: "st7", number: "TKT-1036", subject: "How to integrate webhook?", description: "Need documentation for webhook setup", requester: "Marcus Weber", email: "marcus@connectlive.de", assignee: "Rohan Das", status: "Resolved", priority: "Low", category: "General", created: "Jun 21, 2026 · 3:30 PM", updated: "3 days ago", messages: 7 },
  { id: "st8", number: "TKT-1035", subject: "Server downtime notification", description: "Did not receive downtime alert email", requester: "Vikram Singh", email: "vikram@cripocode.com", assignee: "Ananya Reddy", status: "Closed", priority: "Medium", category: "Technical", created: "Jun 20, 2026 · 9:00 AM", updated: "4 days ago", messages: 4 },
  { id: "st9", number: "TKT-1034", subject: "Duplicate charge on account", description: "Charged twice for same subscription", requester: "Priya Das", email: "priya@edulearn.in", assignee: null, status: "Open", priority: "Urgent", category: "Billing", created: "Jun 24, 2026 · 7:00 AM", updated: "4 hours ago", messages: 2 },
  { id: "st10", number: "TKT-1033", subject: "Update company billing address", description: "Need to update invoice billing details", requester: "Nadia Hassan", email: "nadia@medicare.ae", assignee: "Kavya Nair", status: "Waiting", priority: "Low", category: "Account", created: "Jun 19, 2026 · 1:15 PM", updated: "5 days ago", messages: 3 },
];

const statusConfig: Record<TicketStatus, { icon: React.ElementType; color: string; border: string; header: string; badge: string }> = {
  Open: { icon: Circle, color: "text-blue-400", border: "border-blue-500/30", header: "bg-blue-500/10", badge: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  "In Progress": { icon: PlayCircle, color: "text-amber-400", border: "border-amber-500/30", header: "bg-amber-500/10", badge: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  Waiting: { icon: PauseCircle, color: "text-violet-400", border: "border-violet-500/30", header: "bg-violet-500/10", badge: "bg-violet-500/15 text-violet-400 border-violet-500/20" },
  Resolved: { icon: CheckCircle2, color: "text-emerald-400", border: "border-emerald-500/30", header: "bg-emerald-500/10", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  Closed: { icon: XCircle, color: "text-zinc-400", border: "border-zinc-500/30", header: "bg-zinc-500/10", badge: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20" },
};

const priorityStyles: Record<TicketPriority, string> = {
  Low: "bg-zinc-500/10 text-zinc-400",
  Medium: "bg-blue-500/10 text-blue-400",
  High: "bg-amber-500/10 text-amber-400",
  Urgent: "bg-red-500/10 text-red-400",
};

const categoryStyles: Record<TicketCategory, string> = {
  Billing: "bg-emerald-500/10 text-emerald-400",
  Technical: "bg-cyan-500/10 text-cyan-400",
  Account: "bg-violet-500/10 text-violet-400",
  General: "bg-zinc-500/10 text-zinc-400",
  "Bug Report": "bg-red-500/10 text-red-400",
};

const boardColumns: TicketStatus[] = ["Open", "In Progress", "Waiting", "Resolved"];

function AssigneeBadge({ name }: { name: string | null }) {
  if (!name) {
    return <span className="text-[10px] text-zinc-600 italic">Unassigned</span>;
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-5 w-5 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-[8px] font-bold">
        {initials}
      </div>
      <span className="text-[10px] text-zinc-400 truncate max-w-[80px]">{name.split(" ")[0]}</span>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: SupportTicket }) {
  return (
    <div className="bg-[#0d1117] border border-white/6 rounded-xl p-4 hover:border-blue-500/30 transition-all group cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] font-mono text-blue-400">{ticket.number}</span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${priorityStyles[ticket.priority]}`}>
          {ticket.priority}
        </span>
      </div>
      <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
        {ticket.subject}
      </h4>
      <p className="text-[10px] text-zinc-600 line-clamp-2 mb-3">{ticket.description}</p>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[9px] px-1.5 py-0.5 rounded ${categoryStyles[ticket.category]}`}>
          {ticket.category}
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 mb-3">
        <User className="w-3 h-3" />
        {ticket.requester}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <AssigneeBadge name={ticket.assignee} />
        <div className="flex items-center gap-2 text-zinc-600">
          <span className="flex items-center gap-0.5 text-[10px]">
            <MessageSquare className="w-3 h-3" />
            {ticket.messages}
          </span>
          <span className="text-[10px]">{ticket.updated}</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminSupportTicketsView() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [view, setView] = useState<ViewMode>("list");

  const filtered = useMemo(() => {
    return allTickets.filter((t) => {
      const matchQuery =
        !query ||
        t.subject.toLowerCase().includes(query.toLowerCase()) ||
        t.number.toLowerCase().includes(query.toLowerCase()) ||
        t.requester.toLowerCase().includes(query.toLowerCase()) ||
        t.email.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
      const matchCategory = categoryFilter === "all" || t.category === categoryFilter;
      return matchQuery && matchStatus && matchPriority && matchCategory;
    });
  }, [query, statusFilter, priorityFilter, categoryFilter]);

  const stats = useMemo(
    () => ({
      total: allTickets.length,
      open: allTickets.filter((t) => t.status === "Open").length,
      inProgress: allTickets.filter((t) => t.status === "In Progress").length,
      waiting: allTickets.filter((t) => t.status === "Waiting").length,
      resolved: allTickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length,
      urgent: allTickets.filter((t) => t.priority === "Urgent" && !["Resolved", "Closed"].includes(t.status)).length,
      unassigned: allTickets.filter((t) => !t.assignee && !["Resolved", "Closed"].includes(t.status)).length,
    }),
    []
  );

  const ticketsByStatus = useMemo(() => {
    const map: Record<TicketStatus, SupportTicket[]> = {
      Open: [],
      "In Progress": [],
      Waiting: [],
      Resolved: [],
      Closed: [],
    };
    filtered.forEach((t) => map[t.status].push(t));
    return map;
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Support Tickets</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage client support requests, assign agents, and track resolutions.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-3">
        {[
          { label: "Total", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: Headphones },
          { label: "Open", value: stats.open, color: "text-blue-400", bg: "bg-blue-500/10", icon: Circle },
          { label: "In Progress", value: stats.inProgress, color: "text-amber-400", bg: "bg-amber-500/10", icon: PlayCircle },
          { label: "Waiting", value: stats.waiting, color: "text-violet-400", bg: "bg-violet-500/10", icon: PauseCircle },
          { label: "Resolved", value: stats.resolved, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 },
          { label: "Urgent", value: stats.urgent, color: "text-red-400", bg: "bg-red-500/10", icon: AlertCircle },
          { label: "Unassigned", value: stats.unassigned, color: "text-zinc-400", bg: "bg-zinc-500/10", icon: User },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-3 flex items-center gap-2">
              <div className={`p-2 rounded-lg ${s.bg} shrink-0`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="text-[9px] text-zinc-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[#111827] border border-white/6 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {allTickets.slice(0, 4).map((t) => {
              const config = statusConfig[t.status];
              const StatusIcon = config.icon;
              return (
                <div key={t.id} className="flex items-center gap-3 py-2 border-b border-white/4 last:border-0">
                  <StatusIcon className={`w-4 h-4 shrink-0 ${config.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{t.subject}</p>
                    <p className="text-[10px] text-zinc-600">{t.requester} · {t.updated}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${priorityStyles[t.priority]}`}>
                    {t.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#111827] border border-white/6 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-1">Avg. Response Time</h2>
          <p className="text-3xl font-bold text-emerald-400 mb-1">2h 14m</p>
          <p className="text-[10px] text-zinc-500 mb-4">Last 30 days · -18% vs previous</p>
          <div className="space-y-2 text-xs">
            {[
              { label: "First response", value: "1h 42m" },
              { label: "Resolution time", value: "8h 30m" },
              { label: "Satisfaction", value: "4.6 / 5" },
            ].map((m) => (
              <div key={m.label} className="flex justify-between text-zinc-500">
                <span>{m.label}</span>
                <span className="text-zinc-300 font-semibold">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tickets..."
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
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting">Waiting</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[130px]"
          >
            <option value="all">All Priority</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[140px]"
          >
            <option value="all">All Categories</option>
            <option value="Billing">Billing</option>
            <option value="Technical">Technical</option>
            <option value="Account">Account</option>
            <option value="General">General</option>
            <option value="Bug Report">Bug Report</option>
          </select>
        </div>
        <div className="flex items-center gap-1 bg-[#111827] border border-white/8 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              view === "list" ? "bg-blue-600/20 text-blue-400" : "text-zinc-500 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
            List
          </button>
          <button
            type="button"
            onClick={() => setView("board")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              view === "board" ? "bg-blue-600/20 text-blue-400" : "text-zinc-500 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Board
          </button>
        </div>
      </div>

      {/* List view */}
      {view === "list" && (
        <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
          <div className="hidden xl:grid grid-cols-[90px_1.4fr_110px_90px_90px_100px_80px_100px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Ticket #</span>
            <span>Subject</span>
            <span>Requester</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Assignee</span>
            <span>Msgs</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-white/4">
            {filtered.map((ticket) => {
              const config = statusConfig[ticket.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={ticket.id}
                  className="grid grid-cols-1 xl:grid-cols-[90px_1.4fr_110px_90px_90px_100px_80px_100px] gap-3 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                >
                  <p className="text-xs font-mono font-semibold text-blue-400">{ticket.number}</p>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {ticket.subject}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${categoryStyles[ticket.category]}`}>
                        {ticket.category}
                      </span>
                      <span className="text-[10px] text-zinc-600">{ticket.updated}</span>
                    </div>
                  </div>
                  <div className="hidden xl:block">
                    <p className="text-xs text-zinc-300">{ticket.requester}</p>
                    <p className="text-[10px] text-zinc-600 truncate">{ticket.email}</p>
                  </div>
                  <span className={`hidden xl:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border w-fit ${config.badge}`}>
                    <StatusIcon className="w-3 h-3" />
                    {ticket.status}
                  </span>
                  <span className={`hidden xl:inline text-[10px] font-semibold px-2 py-1 rounded-md w-fit ${priorityStyles[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                  <div className="hidden xl:block">
                    <AssigneeBadge name={ticket.assignee} />
                  </div>
                  <p className="hidden xl:flex items-center gap-1 text-xs text-zinc-500">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {ticket.messages}
                  </p>
                  <div className="hidden xl:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Reply">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors" aria-label="Assign">
                      <User className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors" aria-label="Edit">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="xl:hidden flex flex-wrap gap-2 text-[10px]">
                    <span className={`font-semibold px-2 py-0.5 rounded-full border ${config.badge}`}>{ticket.status}</span>
                    <span className={`font-semibold px-2 py-0.5 rounded-md ${priorityStyles[ticket.priority]}`}>{ticket.priority}</span>
                    <span className="text-zinc-500">{ticket.requester}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm">No tickets found.</div>
          )}
        </div>
      )}

      {/* Board view */}
      {view === "board" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {boardColumns.map((status) => {
            const config = statusConfig[status];
            const Icon = config.icon;
            const tickets = ticketsByStatus[status];
            return (
              <div key={status} className="flex flex-col min-h-[360px]">
                <div className={`flex items-center justify-between px-4 py-3 rounded-t-xl border border-b-0 ${config.border} ${config.header}`}>
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${config.color}`} />
                    <span className="text-sm font-semibold text-white">{status}</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full">
                    {tickets.length}
                  </span>
                </div>
                <div className={`flex-1 space-y-3 p-3 rounded-b-xl border ${config.border} bg-[#111827]/50`}>
                  {tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                  {tickets.length === 0 && (
                    <div className="py-8 text-center text-zinc-600 text-xs">No tickets</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allTickets.length}</strong> tickets
        </span>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Avg. response: 2h 14m
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            {stats.urgent} urgent open
          </span>
        </div>
      </div>
    </div>
  );
}
