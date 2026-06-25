"use client";

import { useMemo, useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  MoreHorizontal,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  PauseCircle,
  ArrowUpRight,
} from "lucide-react";

type ProjectStatus = "Active" | "In Progress" | "Completed" | "On Hold";

interface AdminProject {
  id: string;
  name: string;
  client: string;
  stack: string;
  category: string;
  status: ProjectStatus;
  progress: number;
  updated: string;
  budget: string;
}

const allProjects: AdminProject[] = [
  { id: "p1", name: "E-commerce Backend", client: "ShopWave Inc.", stack: "Node.js, MongoDB", category: "Backend", status: "Active", progress: 78, updated: "2 hours ago", budget: "$12,500" },
  { id: "p2", name: "Booking API", client: "TravelNest", stack: "Node.js, MongoDB", category: "API", status: "In Progress", progress: 45, updated: "5 hours ago", budget: "$8,200" },
  { id: "p3", name: "Admin Dashboard", client: "Cripcocode", stack: "Next.js, Tailwind", category: "Frontend", status: "Active", progress: 92, updated: "1 day ago", budget: "$6,800" },
  { id: "p4", name: "Mobile App API", client: "FitTrack", stack: "Express, MongoDB", category: "Backend", status: "Active", progress: 65, updated: "2 days ago", budget: "$9,400" },
  { id: "p5", name: "Payment Gateway", client: "PayFlow", stack: "Node.js, Stripe", category: "Integration", status: "Completed", progress: 100, updated: "3 days ago", budget: "$15,000" },
  { id: "p6", name: "Analytics Engine", client: "DataPulse", stack: "Python, PostgreSQL", category: "Data", status: "In Progress", progress: 32, updated: "4 days ago", budget: "$11,200" },
  { id: "p7", name: "UI Kit Marketplace", client: "DesignHub", stack: "React, Figma", category: "Design", status: "On Hold", progress: 20, updated: "1 week ago", budget: "$4,500" },
  { id: "p8", name: "Real-time Chat API", client: "ConnectLive", stack: "Socket.io, Redis", category: "API", status: "Active", progress: 55, updated: "1 week ago", budget: "$7,600" },
];

const statusStyles: Record<ProjectStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Completed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "On Hold": "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
};

const statusIcons: Record<ProjectStatus, React.ElementType> = {
  Active: CheckCircle2,
  "In Progress": Clock,
  Completed: CheckCircle2,
  "On Hold": PauseCircle,
};

export default function AdminProjectsView() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("list");

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      const matchQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.client.toLowerCase().includes(query.toLowerCase()) ||
        p.stack.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [query, statusFilter]);

  const stats = useMemo(() => ({
    total: allProjects.length,
    active: allProjects.filter((p) => p.status === "Active").length,
    inProgress: allProjects.filter((p) => p.status === "In Progress").length,
    completed: allProjects.filter((p) => p.status === "Completed").length,
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Projects</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage and track all client projects and development work.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Active", value: stats.active, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "In Progress", value: stats.inProgress, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Completed", value: stats.completed, color: "text-violet-400", bg: "bg-violet-500/10" },
        ].map((s) => (
          <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4 flex items-center gap-4">
            <div className={`p-2.5 rounded-xl ${s.bg}`}>
              <FolderKanban className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-zinc-500">{s.label}</p>
            </div>
          </div>
        ))}
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
              placeholder="Search projects..."
              className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[160px]"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
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
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_100px_120px_80px_60px] gap-4 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Project</span>
            <span>Client</span>
            <span>Stack</span>
            <span>Status</span>
            <span>Progress</span>
            <span>Budget</span>
            <span />
          </div>
          <div className="divide-y divide-white/4">
            {filtered.map((project) => {
              const StatusIcon = statusIcons[project.status];
              return (
                <div
                  key={project.id}
                  className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_100px_120px_80px_60px] gap-3 md:gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                >
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{project.category} · {project.updated}</p>
                  </div>
                  <p className="text-sm text-zinc-400 hidden md:block">{project.client}</p>
                  <p className="text-xs text-zinc-500 hidden md:block font-mono">{project.stack}</p>
                  <div className="hidden md:block">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[project.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      {project.status}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-zinc-500 w-8">{project.progress}%</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white hidden md:block">{project.budget}</p>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  {/* Mobile meta */}
                  <div className="md:hidden flex flex-wrap items-center gap-2 mt-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyles[project.status]}`}>
                      {project.status}
                    </span>
                    <span className="text-[10px] text-zinc-500">{project.progress}% · {project.budget}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm">No projects found.</div>
          )}
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project) => {
            const StatusIcon = statusIcons[project.status];
            return (
              <div
                key={project.id}
                className="bg-[#111827] border border-white/6 rounded-2xl p-5 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10">
                    <FolderKanban className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[project.status]}`}>
                    <StatusIcon className="w-3 h-3" />
                    {project.status}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-zinc-500 mb-3">{project.client}</p>
                <p className="text-[10px] font-mono text-zinc-600 bg-white/5 px-2 py-1 rounded-md inline-block mb-4">
                  {project.stack}
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-violet-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-sm font-bold text-white">{project.budget}</p>
                    <p className="text-[10px] text-zinc-600">{project.updated}</p>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allProjects.length}</strong> projects
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
