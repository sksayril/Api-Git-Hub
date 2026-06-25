"use client";

import { useMemo, useState } from "react";
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  Clock,
  Calendar,
  User,
  Flag,
  FolderKanban,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Circle,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Eye,
} from "lucide-react";

type TaskStatus = "To Do" | "In Progress" | "Review" | "Done";
type TaskPriority = "Low" | "Medium" | "High" | "Urgent";
type ViewMode = "board" | "list";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  project: string;
  dueDate: string;
  comments: number;
  attachments: number;
  tags: string[];
}

const allTasks: Task[] = [
  { id: "tk1", title: "Implement JWT auth middleware", description: "Add route protection for admin panel", status: "Done", priority: "High", assignee: "Arnav Gupta", project: "Admin Dashboard", dueDate: "Jun 20, 2026", comments: 4, attachments: 1, tags: ["Backend", "Auth"] },
  { id: "tk2", title: "Design Meta Ads dashboard UI", description: "Create campaign management interface", status: "Done", priority: "Medium", assignee: "Meera Shah", project: "Admin Dashboard", dueDate: "Jun 22, 2026", comments: 2, attachments: 3, tags: ["UI", "Design"] },
  { id: "tk3", title: "MongoDB connection pooling", description: "Optimize database connection handling", status: "In Progress", priority: "High", assignee: "Rohan Das", project: "E-commerce Backend", dueDate: "Jun 26, 2026", comments: 6, attachments: 0, tags: ["Backend", "DB"] },
  { id: "tk4", title: "SEO meta tags for all pages", description: "Add title, description, OG tags", status: "In Progress", priority: "Medium", assignee: "Sneha Iyer", project: "Admin Dashboard", dueDate: "Jun 25, 2026", comments: 1, attachments: 0, tags: ["SEO", "Frontend"] },
  { id: "tk5", title: "Payment webhook integration", description: "Stripe webhook for checkout flow", status: "Review", priority: "Urgent", assignee: "Arnav Gupta", project: "Payment Gateway", dueDate: "Jun 24, 2026", comments: 8, attachments: 2, tags: ["API", "Payments"] },
  { id: "tk6", title: "Client onboarding email template", description: "Welcome email for new clients", status: "To Do", priority: "Low", assignee: "Ananya Reddy", project: "Operations", dueDate: "Jun 28, 2026", comments: 0, attachments: 0, tags: ["Support"] },
  { id: "tk7", title: "Server monitoring alerts", description: "Set up uptime alerts for production", status: "To Do", priority: "High", assignee: "Vikram Singh", project: "Servers", dueDate: "Jun 27, 2026", comments: 3, attachments: 1, tags: ["DevOps"] },
  { id: "tk8", title: "Analytics chart components", description: "Revenue and traffic visualizations", status: "Review", priority: "Medium", assignee: "SK Sayril Amed", project: "Admin Dashboard", dueDate: "Jun 23, 2026", comments: 5, attachments: 0, tags: ["Frontend"] },
  { id: "tk9", title: "Backup schedule automation", description: "Cron jobs for daily DB backups", status: "To Do", priority: "High", assignee: "Rohan Das", project: "Backups", dueDate: "Jun 30, 2026", comments: 2, attachments: 0, tags: ["DevOps", "DB"] },
  { id: "tk10", title: "Marketplace search optimization", description: "Improve filter and search performance", status: "In Progress", priority: "Medium", assignee: "Biplop Roy", project: "UI Kit Marketplace", dueDate: "Jun 29, 2026", comments: 7, attachments: 1, tags: ["Frontend"] },
  { id: "tk11", title: "Fix mobile nav responsiveness", description: "Sidebar collapse on small screens", status: "To Do", priority: "Urgent", assignee: "Meera Shah", project: "Admin Dashboard", dueDate: "Jun 24, 2026", comments: 1, attachments: 2, tags: ["UI", "Bug"] },
  { id: "tk12", title: "Invoice PDF generation", description: "Generate downloadable invoice PDFs", status: "Done", priority: "Medium", assignee: "Kavya Nair", project: "Operations", dueDate: "Jun 18, 2026", comments: 3, attachments: 1, tags: ["Backend"] },
];

const statusConfig: Record<TaskStatus, { icon: React.ElementType; color: string; border: string; header: string }> = {
  "To Do": { icon: Circle, color: "text-zinc-400", border: "border-zinc-500/30", header: "bg-zinc-500/10" },
  "In Progress": { icon: PlayCircle, color: "text-blue-400", border: "border-blue-500/30", header: "bg-blue-500/10" },
  Review: { icon: Eye, color: "text-amber-400", border: "border-amber-500/30", header: "bg-amber-500/10" },
  Done: { icon: CheckCircle2, color: "text-emerald-400", border: "border-emerald-500/30", header: "bg-emerald-500/10" },
};

const priorityStyles: Record<TaskPriority, string> = {
  Low: "bg-zinc-500/10 text-zinc-400",
  Medium: "bg-blue-500/10 text-blue-400",
  High: "bg-amber-500/10 text-amber-400",
  Urgent: "bg-red-500/10 text-red-400",
};

const priorityIcons: Record<TaskPriority, React.ElementType> = {
  Low: Flag,
  Medium: Flag,
  High: AlertCircle,
  Urgent: AlertCircle,
};

const columns: TaskStatus[] = ["To Do", "In Progress", "Review", "Done"];

function AssigneeInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[9px] font-bold shrink-0"
      title={name}
    >
      {initials}
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const PriorityIcon = priorityIcons[task.priority];
  return (
    <div className="bg-[#0d1117] border border-white/6 rounded-xl p-4 hover:border-blue-500/30 transition-all group cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${priorityStyles[task.priority]}`}>
          <PriorityIcon className="w-3 h-3" />
          {task.priority}
        </span>
        <button type="button" className="p-0.5 rounded text-zinc-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label="More options">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
        {task.title}
      </h4>
      <p className="text-[10px] text-zinc-600 line-clamp-2 mb-3">{task.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag) => (
          <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-500">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 mb-3">
        <FolderKanban className="w-3 h-3" />
        {task.project}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <AssigneeInitials name={task.assignee} />
          <span className="text-[10px] text-zinc-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {task.dueDate}
          </span>
        </div>
        <div className="flex items-center gap-2 text-zinc-600">
          {task.comments > 0 && (
            <span className="flex items-center gap-0.5 text-[10px]">
              <MessageSquare className="w-3 h-3" />
              {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="flex items-center gap-0.5 text-[10px]">
              <Paperclip className="w-3 h-3" />
              {task.attachments}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminTasksView() {
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [view, setView] = useState<ViewMode>("board");

  const assignees = useMemo(() => [...new Set(allTasks.map((t) => t.assignee))].sort(), []);

  const filtered = useMemo(() => {
    return allTasks.filter((t) => {
      const matchQuery =
        !query ||
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.project.toLowerCase().includes(query.toLowerCase()) ||
        t.assignee.toLowerCase().includes(query.toLowerCase());
      const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
      const matchAssignee = assigneeFilter === "all" || t.assignee === assigneeFilter;
      return matchQuery && matchPriority && matchAssignee;
    });
  }, [query, priorityFilter, assigneeFilter]);

  const stats = useMemo(
    () => ({
      total: allTasks.length,
      todo: allTasks.filter((t) => t.status === "To Do").length,
      inProgress: allTasks.filter((t) => t.status === "In Progress").length,
      done: allTasks.filter((t) => t.status === "Done").length,
      urgent: allTasks.filter((t) => t.priority === "Urgent" && t.status !== "Done").length,
    }),
    []
  );

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      "To Do": [],
      "In Progress": [],
      Review: [],
      Done: [],
    };
    filtered.forEach((t) => map[t.status].push(t));
    return map;
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Tasks</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Track and manage team tasks, assignments, and project deliverables.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Tasks", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: CheckSquare },
          { label: "To Do", value: stats.todo, color: "text-zinc-400", bg: "bg-zinc-500/10", icon: Circle },
          { label: "In Progress", value: stats.inProgress, color: "text-blue-400", bg: "bg-blue-500/10", icon: PlayCircle },
          { label: "Completed", value: stats.done, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 },
          { label: "Urgent Open", value: stats.urgent, color: "text-red-400", bg: "bg-red-500/10", icon: AlertCircle },
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

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[140px]"
            >
              <option value="all">All Priority</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[160px]"
          >
            <option value="all">All Assignees</option>
            {assignees.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1 bg-[#111827] border border-white/8 rounded-xl p-1">
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
        </div>
      </div>

      {/* Kanban Board */}
      {view === "board" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {columns.map((status) => {
            const config = statusConfig[status];
            const Icon = config.icon;
            const tasks = tasksByStatus[status];
            return (
              <div key={status} className="flex flex-col min-h-[400px]">
                <div className={`flex items-center justify-between px-4 py-3 rounded-t-xl border border-b-0 ${config.border} ${config.header}`}>
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${config.color}`} />
                    <span className="text-sm font-semibold text-white">{status}</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full">
                    {tasks.length}
                  </span>
                </div>
                <div className={`flex-1 space-y-3 p-3 rounded-b-xl border ${config.border} bg-[#111827]/50`}>
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {tasks.length === 0 && (
                    <div className="py-8 text-center text-zinc-600 text-xs">No tasks</div>
                  )}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-1 py-2 rounded-lg border border-dashed border-white/10 text-zinc-600 hover:text-zinc-400 hover:border-white/20 text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
          <div className="hidden lg:grid grid-cols-[1.5fr_100px_100px_120px_100px_90px_80px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Task</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Assignee</span>
            <span>Project</span>
            <span>Due Date</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-white/4">
            {filtered.map((task) => {
              const config = statusConfig[task.status];
              const StatusIcon = config.icon;
              return (
                <div
                  key={task.id}
                  className="grid grid-cols-1 lg:grid-cols-[1.5fr_100px_100px_120px_100px_90px_80px] gap-3 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <StatusIcon className={`w-4 h-4 mt-0.5 shrink-0 ${config.color}`} />
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {task.title}
                      </p>
                      <p className="text-[10px] text-zinc-600 line-clamp-1">{task.description}</p>
                      <div className="flex gap-1 mt-1">
                        {task.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className={`hidden lg:inline-flex text-[10px] font-semibold px-2 py-1 rounded-full border w-fit ${config.color} border-current/20 bg-current/10`}>
                    {task.status}
                  </span>
                  <span className={`hidden lg:inline text-[10px] font-semibold px-2 py-1 rounded-md w-fit ${priorityStyles[task.priority]}`}>
                    {task.priority}
                  </span>
                  <div className="hidden lg:flex items-center gap-2">
                    <AssigneeInitials name={task.assignee} />
                    <span className="text-xs text-zinc-400 truncate">{task.assignee.split(" ")[0]}</span>
                  </div>
                  <p className="hidden lg:block text-xs text-zinc-500 truncate">{task.project}</p>
                  <p className="hidden lg:block text-[10px] text-zinc-500">{task.dueDate}</p>
                  <div className="hidden lg:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Edit task">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" aria-label="Delete task">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="lg:hidden flex flex-wrap gap-2 text-[10px]">
                    <span className={`font-semibold px-2 py-0.5 rounded-md ${priorityStyles[task.priority]}`}>{task.priority}</span>
                    <span className="text-zinc-500">{task.assignee} · {task.dueDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm">No tasks found.</div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allTasks.length}</strong> tasks
        </span>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {stats.inProgress} in progress
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {assignees.length} assignees
          </span>
        </div>
      </div>
    </div>
  );
}
