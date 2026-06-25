"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Pencil,
  Download,
  Send,
  Eye,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  Building2,
  Calendar,
  CreditCard,
} from "lucide-react";

type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft" | "Cancelled";
type ViewMode = "list" | "grid";

interface Invoice {
  id: string;
  number: string;
  client: string;
  company: string;
  email: string;
  amount: string;
  tax: string;
  total: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate: string | null;
  project: string;
  items: number;
}

const allInvoices: Invoice[] = [
  { id: "inv1", number: "INV-2026-0042", client: "Rahul Sharma", company: "ShopWave Inc.", email: "rahul@shopwave.io", amount: "$10,500", tax: "$1,890", total: "$12,390", status: "Paid", issueDate: "Jun 1, 2026", dueDate: "Jun 15, 2026", paidDate: "Jun 12, 2026", project: "E-commerce Backend", items: 3 },
  { id: "inv2", number: "INV-2026-0041", client: "Sarah Mitchell", company: "TravelNest", email: "sarah@travelnest.com", amount: "$6,800", tax: "$1,224", total: "$8,024", status: "Pending", issueDate: "Jun 10, 2026", dueDate: "Jun 24, 2026", paidDate: null, project: "Booking API", items: 2 },
  { id: "inv3", number: "INV-2026-0040", client: "James Chen", company: "FitTrack", email: "james@fittrack.app", amount: "$4,200", tax: "$756", total: "$4,956", status: "Paid", issueDate: "May 28, 2026", dueDate: "Jun 11, 2026", paidDate: "Jun 8, 2026", project: "Mobile App API", items: 1 },
  { id: "inv4", number: "INV-2026-0039", client: "Emily Watson", company: "PayFlow", email: "emily@payflow.co", amount: "$12,000", tax: "$2,160", total: "$14,160", status: "Overdue", issueDate: "May 15, 2026", dueDate: "May 29, 2026", paidDate: null, project: "Payment Gateway", items: 4 },
  { id: "inv5", number: "INV-2026-0038", client: "Arjun Patel", company: "DataPulse", email: "arjun@datapulse.in", amount: "$8,400", tax: "$1,512", total: "$9,912", status: "Pending", issueDate: "Jun 18, 2026", dueDate: "Jul 2, 2026", paidDate: null, project: "Analytics Engine", items: 2 },
  { id: "inv6", number: "INV-2026-0037", client: "Marcus Weber", company: "ConnectLive", email: "marcus@connectlive.de", amount: "$5,600", tax: "$1,008", total: "$6,608", status: "Paid", issueDate: "May 20, 2026", dueDate: "Jun 3, 2026", paidDate: "Jun 1, 2026", project: "Real-time Chat API", items: 2 },
  { id: "inv7", number: "INV-2026-0036", client: "Lisa Nguyen", company: "DesignHub", email: "lisa@designhub.co", amount: "$3,200", tax: "$576", total: "$3,776", status: "Cancelled", issueDate: "Apr 10, 2026", dueDate: "Apr 24, 2026", paidDate: null, project: "UI Kit Marketplace", items: 1 },
  { id: "inv8", number: "INV-2026-0035", client: "Biplop Roy", company: "Cripcocode", email: "biplop@cripocode.com", amount: "$4,800", tax: "$864", total: "$5,664", status: "Paid", issueDate: "May 5, 2026", dueDate: "May 19, 2026", paidDate: "May 17, 2026", project: "Admin Dashboard", items: 2 },
  { id: "inv9", number: "INV-2026-0043", client: "Priya Das", company: "EduLearn", email: "priya@edulearn.in", amount: "$7,500", tax: "$1,350", total: "$8,850", status: "Draft", issueDate: "Jun 22, 2026", dueDate: "Jul 6, 2026", paidDate: null, project: "E-learning Platform", items: 3 },
  { id: "inv10", number: "INV-2026-0034", client: "Sarah Mitchell", company: "TravelNest", email: "sarah@travelnest.com", amount: "$2,400", tax: "$432", total: "$2,832", status: "Overdue", issueDate: "Apr 28, 2026", dueDate: "May 12, 2026", paidDate: null, project: "Booking API", items: 1 },
];

const statusStyles: Record<InvoiceStatus, string> = {
  Paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Overdue: "bg-red-500/15 text-red-400 border-red-500/20",
  Draft: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
  Cancelled: "bg-zinc-500/15 text-zinc-500 border-zinc-500/20 line-through",
};

const statusIcons: Record<InvoiceStatus, React.ElementType> = {
  Paid: CheckCircle2,
  Pending: Clock,
  Overdue: AlertCircle,
  Draft: FileText,
  Cancelled: XCircle,
};

function parseAmount(value: string): number {
  return parseFloat(value.replace(/[$,]/g, "")) || 0;
}

export default function AdminInvoicesView() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<ViewMode>("list");

  const filtered = useMemo(() => {
    return allInvoices.filter((inv) => {
      const matchQuery =
        !query ||
        inv.number.toLowerCase().includes(query.toLowerCase()) ||
        inv.client.toLowerCase().includes(query.toLowerCase()) ||
        inv.company.toLowerCase().includes(query.toLowerCase()) ||
        inv.project.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || inv.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [query, statusFilter]);

  const stats = useMemo(() => {
    const paid = allInvoices.filter((i) => i.status === "Paid");
    const pending = allInvoices.filter((i) => i.status === "Pending");
    const overdue = allInvoices.filter((i) => i.status === "Overdue");
    const totalRevenue = paid.reduce((sum, i) => sum + parseAmount(i.total), 0);
    const pendingAmount = [...pending, ...overdue].reduce((sum, i) => sum + parseAmount(i.total), 0);
    return {
      total: allInvoices.length,
      paid: paid.length,
      pending: pending.length,
      overdue: overdue.length,
      revenue: `$${totalRevenue.toLocaleString()}`,
      outstanding: `$${pendingAmount.toLocaleString()}`,
    };
  }, []);

  const statusBreakdown = useMemo(() => {
    const counts = { Paid: 0, Pending: 0, Overdue: 0, Draft: 0, Cancelled: 0 };
    allInvoices.forEach((i) => counts[i.status]++);
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Invoices</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Create, send, and track client invoices and payments for Cripcocode.
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Invoices", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10", icon: FileText },
          { label: "Paid", value: stats.paid, color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 },
          { label: "Pending", value: stats.pending, color: "text-amber-400", bg: "bg-amber-500/10", icon: Clock },
          { label: "Overdue", value: stats.overdue, color: "text-red-400", bg: "bg-red-500/10", icon: AlertCircle },
          { label: "Total Revenue", value: stats.revenue, color: "text-violet-400", bg: "bg-violet-500/10", icon: TrendingUp },
          { label: "Outstanding", value: stats.outstanding, color: "text-cyan-400", bg: "bg-cyan-500/10", icon: DollarSign },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${s.bg} shrink-0`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-white truncate">{s.value}</p>
                <p className="text-[10px] text-zinc-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status pills + overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-wrap gap-2">
          {[
            { id: "all", label: "All", count: stats.total },
            { id: "Paid", label: "Paid", count: statusBreakdown.Paid },
            { id: "Pending", label: "Pending", count: statusBreakdown.Pending },
            { id: "Overdue", label: "Overdue", count: statusBreakdown.Overdue },
            { id: "Draft", label: "Draft", count: statusBreakdown.Draft },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setStatusFilter(pill.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                statusFilter === pill.id
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "bg-[#111827] text-zinc-500 border border-white/6 hover:text-white hover:border-white/12"
              }`}
            >
              {pill.label}
              <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded-full">{pill.count}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#111827] border border-white/6 rounded-2xl p-4 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10">
            <CreditCard className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500">Last payment received</p>
            <p className="text-sm font-bold text-white">$4,956 · FitTrack</p>
            <p className="text-[10px] text-zinc-600">Jun 8, 2026</p>
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
              placeholder="Search invoices..."
              className="w-full bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#111827] border border-white/8 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/40 cursor-pointer min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Draft">Draft</option>
              <option value="Cancelled">Cancelled</option>
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

      {/* List view */}
      {view === "list" ? (
        <div className="bg-[#111827] border border-white/6 rounded-2xl overflow-hidden">
          <div className="hidden xl:grid grid-cols-[110px_1.2fr_90px_90px_90px_100px_100px_110px] gap-3 px-6 py-3 border-b border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <span>Invoice #</span>
            <span>Client</span>
            <span>Amount</span>
            <span>Tax</span>
            <span>Total</span>
            <span>Status</span>
            <span>Due Date</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-white/4">
            {filtered.map((inv) => {
              const StatusIcon = statusIcons[inv.status];
              return (
                <div
                  key={inv.id}
                  className="grid grid-cols-1 xl:grid-cols-[110px_1.2fr_90px_90px_90px_100px_100px_110px] gap-3 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    <p className="text-xs font-mono font-semibold text-white">{inv.number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {inv.client}
                    </p>
                    <p className="text-[10px] text-zinc-600 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {inv.company} · {inv.project}
                    </p>
                  </div>
                  <p className="hidden xl:block text-xs text-zinc-400">{inv.amount}</p>
                  <p className="hidden xl:block text-xs text-zinc-600">{inv.tax}</p>
                  <p className="hidden xl:block text-sm font-bold text-white">{inv.total}</p>
                  <span className={`hidden xl:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border w-fit ${statusStyles[inv.status]}`}>
                    <StatusIcon className="w-3 h-3" />
                    {inv.status}
                  </span>
                  <p className={`hidden xl:block text-[10px] ${inv.status === "Overdue" ? "text-red-400 font-semibold" : "text-zinc-500"}`}>
                    {inv.dueDate}
                  </p>
                  <div className="hidden xl:flex items-center gap-1">
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" aria-label="View invoice">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors" aria-label="Download PDF">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    {inv.status !== "Paid" && inv.status !== "Cancelled" && (
                      <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors" aria-label="Send invoice">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button type="button" className="p-1.5 rounded-lg text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Edit invoice">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="xl:hidden flex flex-wrap gap-2 text-[10px]">
                    <span className={`font-semibold px-2 py-0.5 rounded-full border ${statusStyles[inv.status]}`}>{inv.status}</span>
                    <span className="text-white font-bold">{inv.total}</span>
                    <span className="text-zinc-500">Due {inv.dueDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-zinc-500 text-sm">No invoices found.</div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((inv) => {
            const StatusIcon = statusIcons[inv.status];
            return (
              <div
                key={inv.id}
                className="bg-[#111827] border border-white/6 rounded-2xl p-5 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-mono text-blue-400 font-semibold">{inv.number}</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">Issued {inv.issueDate}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border ${statusStyles[inv.status]}`}>
                    <StatusIcon className="w-3 h-3" />
                    {inv.status}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {inv.client}
                </h3>
                <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5 mb-4">
                  <Building2 className="w-3 h-3" />
                  {inv.company}
                </p>
                <p className="text-[10px] text-zinc-600 mb-4">{inv.project} · {inv.items} line items</p>
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-4 text-center">
                  <div>
                    <p className="text-xs text-zinc-500">Subtotal</p>
                    <p className="text-sm font-semibold text-zinc-300">{inv.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Tax</p>
                    <p className="text-sm font-semibold text-zinc-400">{inv.tax}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Total</p>
                    <p className="text-sm font-bold text-white">{inv.total}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Due {inv.dueDate}
                  </span>
                  {inv.paidDate && (
                    <span className="text-emerald-500">Paid {inv.paidDate}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button type="button" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-xs font-semibold text-blue-400 transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </button>
                  {inv.status !== "Paid" && inv.status !== "Cancelled" && (
                    <button type="button" className="p-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 transition-colors" aria-label="Send">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && view === "grid" && (
        <div className="py-16 text-center text-zinc-500 text-sm bg-[#111827] border border-white/6 rounded-2xl">
          No invoices found.
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing <strong className="text-zinc-300">{filtered.length}</strong> of{" "}
          <strong className="text-zinc-300">{allInvoices.length}</strong> invoices
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
