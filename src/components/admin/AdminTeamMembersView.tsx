"use client";

import { useMemo, useState } from "react";
import {
  UserCog,
  UserPlus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  Mail,
  Shield,
  Briefcase,
  Clock,
  CheckCircle2,
  Circle,
  MinusCircle,
  MoreHorizontal,
  Users,
  Code2,
  Palette,
  Headphones,
  Crown,
} from "lucide-react";

type MemberStatus = "Active" | "Away" | "Offline" | "On Leave";
type MemberRole = "Super Admin" | "Admin" | "Developer" | "Designer" | "Support" | "Manager";
type Department = "Engineering" | "Design" | "Operations" | "Support" | "Management";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  department: Department;
  status: MemberStatus;
  joined: string;
  lastActive: string;
  projects: number;
  tasks: number;
  location: string;
}

const allMembers: TeamMember[] = [
  { id: "t1", name: "Biplop Roy", email: "biplop@cripocode.com", role: "Super Admin", department: "Management", status: "Active", joined: "Mar 2025", lastActive: "Online now", projects: 6, tasks: 12, location: "Kolkata, IN" },
  { id: "t2", name: "SK Sayril Amed", email: "sayril@cripocode.com", role: "Super Admin", department: "Management", status: "Active", joined: "Mar 2025", lastActive: "5 min ago", projects: 8, tasks: 15, location: "Kolkata, IN" },
  { id: "t3", name: "Arnav Gupta", email: "arnav@cripocode.com", role: "Developer", department: "Engineering", status: "Active", joined: "Apr 2025", lastActive: "12 min ago", projects: 4, tasks: 9, location: "Bangalore, IN" },
  { id: "t4", name: "Meera Shah", email: "meera@cripocode.com", role: "Designer", department: "Design", status: "Away", joined: "May 2025", lastActive: "1 hour ago", projects: 3, tasks: 6, location: "Mumbai, IN" },
  { id: "t5", name: "Rohan Das", email: "rohan@cripocode.com", role: "Developer", department: "Engineering", status: "Active", joined: "Jun 2025", lastActive: "30 min ago", projects: 2, tasks: 7, location: "Kolkata, IN" },
  { id: "t6", name: "Ananya Reddy", email: "ananya@cripocode.com", role: "Support", department: "Support", status: "Active", joined: "Jul 2025", lastActive: "Online now", projects: 0, tasks: 18, location: "Hyderabad, IN" },
  { id: "t7", name: "Vikram Singh", email: "vikram@cripocode.com", role: "Manager", department: "Operations", status: "Offline", joined: "Aug 2025", lastActive: "Yesterday", projects: 5, tasks: 4, location: "Delhi, IN" },
  { id: "t8", name: "Kavya Nair", email: "kavya@cripocode.com", role: "Admin", department: "Operations", status: "Active", joined: "Sep 2025", lastActive: "2 hours ago", projects: 1, tasks: 11, location: "Kochi, IN" },
  { id: "t9", name: "Dev Patel", email: "dev@cripocode.com", role: "Developer", department: "Engineering", status: "On Leave", joined: "Oct 2025", lastActive: "3 days ago", projects: 2, tasks: 0, location: "Ahmedabad, IN" },
  { id: "t10", name: "Sneha Iyer", email: "sneha@cripocode.com", role: "Designer", department: "Design", status: "Active", joined: "Nov 2025", lastActive: "45 min ago", projects: 2, tasks: 5, location: "Chennai, IN" },
];

const statusStyles: Record<MemberStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Away: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Offline: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
  "On Leave": "bg-blue-500/15 text-blue-400 border-blue-500/20",
};

const roleStyles: Record<MemberRole, string> = {
  "Super Admin": "bg-violet-500/10 text-violet-400",
  Admin: "bg-blue-500/10 text-blue-400",
  Developer: "bg-cyan-500/10 text-cyan-400",
  Designer: "bg-pink-500/10 text-pink-400",
  Support: "bg-emerald-500/10 text-emerald-400",
  Manager: "bg-amber-500/10 text-amber-400",
};

const deptIcons: Record<Department, React.ElementType> = {
  Engineering: Code2,
  Design: Palette,
  Operations: Briefcase,
  Support: Headphones,
  Management: Crown,
};

function MemberAvatar({ name, status }: { name: string; status: MemberStatus }) {
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
  const dotColor =
    status === "Active"
      ? "bg-emerald-400"
      : status === "Away"
        ? "bg-amber-400"
        : status === "On Leave"
          ? "bg-blue-400"
          : "bg-zinc-500";
  return (
    <div className="relative shrink-0">
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold ${color}`}>
        {initials}
      </div>
      <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#111827] ${dotColor}`} />
    </div>
  );
}

function StatusIcon({ status }: { status: MemberStatus }) {
  if (status === "Active") return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
  if (status === "Away") return <Clock className="w-3.5 h-3.5 text-amber-400" />;
  if (status === "On Leave") return <MinusCircle className="w-3.5 h-3.5 text-blue-400" />;
  return <Circle className="w-3.5 h-3.5 text-zinc-500" />;
}

export default function AdminTeamMembersView() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"list" | "grid">("grid");

  const filtered = useMemo(() => {
    return allMembers.filter((m) => {
      const matchQuery =
        !query ||
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.email.toLowerCase().includes(query.toLowerCase()) ||
        m.role.toLowerCase().includes(query.toLowerCase()) ||
        m.department.toLowerCase().includes(query.toLowerCase());
      const matchRole = roleFilter === "all" || m.role === roleFilter;
      const matchDept = deptFilter === "all" || m.department === deptFilter;
      const matchStatus = statusFilter === "all" || m.status === statusFilter;
      return matchQuery && matchRole && matchDept && matchStatus;
    });
  }, [query, roleFilter, deptFilter, statusFilter]);

  const stats = useMemo(
    () => ({
      total: allMembers.length,
      active: allMembers.filter((m) => m.status === "Active").length,
      departments: new Set(allMembers.map((m) => m.department)).size,
      onLeave: allMembers.filter((m) => m.status === "On Leave").length,
    }),
    []
  );

  const deptBreakdown = useMemo(() => {
    const counts: Record<Department, number> = {
      Engineering: 0,
      Design: 0,
      Operations: 0,
      Support: 0,
      Management: 0,
    };
    allMembers.forEach((m) => counts[m.department]++);
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Team Members</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage Cripcocode team roles, permissions, and member access.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: Users },
          { label: "Active Now", value: stats.active, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 },
          { label: "Departments", value: stats.departments, color: "text-violet-400", bg: "bg-violet-500/10", icon: Briefcase },
          { label: "On Leave", value: stats.onLeave, color: "text-amber-400", bg: "bg-amber-500/10", icon: MinusCircle },
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

      {/* Department overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(Object.entries(deptBreakdown) as [Department, number][]).map(([dept, count]) => {
          const Icon = deptIcons[dept];
          return (
            <button
              key={dept}
              type="button"
              onClick={() => setDeptFilter(deptFilter === dept ? "all" : dept)}
              className={`bg-[#111827] border rounded-xl p-4 text-left transition-all ${
                deptFilter === dept ? "border-blue-500/40 bg-blue-500/5" : "border-white/6 hover:border-white/12"
              }`}
            >
              <Icon className="w-5 h-5 text-zinc-500 mb-2" />
              <p className="text-lg font-bold text-white">{count}</p>
              <p className="text-[10px] text-zinc-500">{dept}</p>
            </button>
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
              placeholder="Search team members..."
              className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[150px]"
            >
              <option value="all">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Support">Support</option>
            </select>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[140px]"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Away">Away</option>
            <option value="Offline">Offline</option>
            <option value="On Leave">On Leave</option>
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

      {/* Grid view */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((member) => {
            const DeptIcon = deptIcons[member.department];
            return (
              <div
                key={member.id}
                className="bg-[#111827] border border-white/6 rounded-2xl p-5 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <MemberAvatar name={member.name} status={member.status} />
                  <div className="flex items-center gap-1">
                    {(member.role === "Super Admin" || member.role === "Admin") && (
                      <Shield className="w-4 h-4 text-violet-400" />
                    )}
                    <button type="button" className="p-1 rounded-lg text-zinc-600 hover:text-white transition-colors" aria-label="More options">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-zinc-500 truncate mb-3">{member.email}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${roleStyles[member.role]}`}>
                    {member.role}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[member.status]}`}>
                    {member.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                  <DeptIcon className="w-3.5 h-3.5" />
                  {member.department} · {member.location}
                </div>
                <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/5 mb-4">
                  <div>
                    <p className="text-sm font-bold text-white">{member.projects}</p>
                    <p className="text-[10px] text-zinc-600">Projects</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-400">{member.tasks}</p>
                    <p className="text-[10px] text-zinc-600">Tasks</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-zinc-400">{member.joined}</p>
                    <p className="text-[10px] text-zinc-600">Joined</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
                    <StatusIcon status={member.status} />
                    {member.lastActive}
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Edit member">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors" aria-label="Email member">
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" aria-label="Remove member">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
          <div className="hidden xl:grid grid-cols-[1.5fr_1fr_100px_100px_80px_80px_80px_100px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Member</span>
            <span>Email</span>
            <span>Role</span>
            <span>Department</span>
            <span>Status</span>
            <span>Projects</span>
            <span>Tasks</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-white/4">
            {filtered.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr_100px_100px_80px_80px_80px_100px] gap-3 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MemberAvatar name={member.name} status={member.status} />
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                      {member.name}
                      {(member.role === "Super Admin" || member.role === "Admin") && (
                        <Shield className="w-3 h-3 text-violet-400" />
                      )}
                    </p>
                    <p className="text-[10px] text-zinc-600">{member.location} · Joined {member.joined}</p>
                  </div>
                </div>
                <p className="hidden xl:block text-xs text-zinc-400 truncate">{member.email}</p>
                <span className={`hidden xl:inline text-[10px] font-semibold px-2 py-1 rounded-md w-fit ${roleStyles[member.role]}`}>
                  {member.role}
                </span>
                <p className="hidden xl:block text-xs text-zinc-500">{member.department}</p>
                <span className={`hidden xl:inline-flex text-[10px] font-semibold px-2 py-1 rounded-full border w-fit ${statusStyles[member.status]}`}>
                  {member.status}
                </span>
                <p className="hidden xl:block text-xs text-zinc-400">{member.projects}</p>
                <p className="hidden xl:block text-xs text-blue-400 font-semibold">{member.tasks}</p>
                <div className="hidden xl:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="Edit">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors" aria-label="Permissions">
                    <UserCog className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" aria-label="Remove">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="xl:hidden flex flex-wrap gap-2 text-[10px]">
                  <span className={`font-semibold px-2 py-0.5 rounded-md ${roleStyles[member.role]}`}>{member.role}</span>
                  <span className={`font-semibold px-2 py-0.5 rounded-full border ${statusStyles[member.status]}`}>{member.status}</span>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm">No team members found.</div>
          )}
        </div>
      )}

      {filtered.length === 0 && view === "grid" && (
        <div className="py-16 text-center text-zinc-500 text-sm bg-[#111827] border border-white/6 rounded-2xl">
          No team members found.
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allMembers.length}</strong> members
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
