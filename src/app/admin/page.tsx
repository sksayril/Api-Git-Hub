"use client";

import { useState } from "react";
import Link from "next/link";

/* ================================================================== */
/* INLINE SVG ICONS                                                     */
/* ================================================================== */
const IC = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <rect x="3" y="3" width="7" height="7" rx="1.2" /><rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" /><rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
  ),
  Upload: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Manage: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Orders: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Categories: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  ),
  Analytics: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  Help: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4.5 w-4.5">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  ),
  TrendUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  TrendDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3.5 w-3.5">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  Receipt: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 opacity-30">
      <path d="M4 2v20l3-2 2 2 2-2 2 2 2-2 3 2V2l-3 2-2-2-2 2-2-2-2 2z" />
      <line x1="9" y1="9" x2="15" y2="9" /><line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  ),
  UsersOutline: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 opacity-30">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  ShoppingBag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 opacity-30">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  Rocket: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 opacity-30">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
};

/* ================================================================== */
/* DATA                                                                 */
/* ================================================================== */
const stats = [
  { id: "revenue", label: "Total Revenue", value: "$128,430", change: "+12%", up: true, icon: <IC.Receipt /> },
  { id: "users", label: "Total Users", value: "12,450", change: "+8%", up: true, icon: <IC.UsersOutline /> },
  { id: "orders", label: "Total Orders", value: "8,920", change: "+18%", up: true, icon: <IC.ShoppingBag /> },
  { id: "projects", label: "Total Projects", value: "450", change: "-2%", up: false, icon: <IC.Rocket /> },
];

const recentOrders = [
  { id: "#PH-94210", initials: "SM", name: "Sarah Miller", color: "bg-slate-600", project: "Cyberpunk UI Asset Pack", amount: "$1,250.00", status: "Completed" },
  { id: "#PH-94211", initials: "JD", name: "John Doe", color: "bg-sky-600", project: "SaaS Landing Template", amount: "$890.00", status: "Pending" },
  { id: "#PH-94212", initials: "EK", name: "Elena Kostic", color: "bg-violet-700", project: "Motion Graphic Kit v2", amount: "$2,400.00", status: "Completed" },
  { id: "#PH-94213", initials: "MW", name: "Marcus Wong", color: "bg-purple-700", project: "E-commerce API Module", amount: "$450.00", status: "Completed" },
  { id: "#PH-94214", initials: "LP", name: "Lisa Park", color: "bg-rose-700", project: "Mobile App Design System", amount: "$3,100.00", status: "Pending" },
];

const sideNav = [
  { id: "dashboard", label: "Dashboard", icon: <IC.Dashboard /> },
  { id: "upload", label: "Upload Project", icon: <IC.Upload /> },
  { id: "manage", label: "Manage Projects", icon: <IC.Manage /> },
  { id: "orders", label: "Orders", icon: <IC.Orders /> },
  { id: "users", label: "Users", icon: <IC.Users /> },
  { id: "categories", label: "Categories", icon: <IC.Categories /> },
  { id: "analytics", label: "Analytics", icon: <IC.Analytics /> },
  { id: "settings", label: "Settings", icon: <IC.Settings /> },
];

/* ── Monthly Sales Bar Chart data ── */
const barData = [
  { month: "JAN", h: 38 },
  { month: "FEB", h: 55 },
  { month: "MAR", h: 68 },
  { month: "APR", h: 82 },
  { month: "MAY", h: 100, active: true },
  { month: "JUN", h: 72 },
];

/* ── Revenue Area Chart points (SVG path, 600×160 viewBox) ── */
const areaPoints =
  "M0,148 C60,145 90,138 130,120 C180,100 200,90 240,72 C290,48 320,38 370,22 C410,10 450,6 520,2 L520,160 L0,160 Z";
const linePath =
  "M0,148 C60,145 90,138 130,120 C180,100 200,90 240,72 C290,48 320,38 370,22 C410,10 450,6 520,2";

/* ================================================================== */
/* PAGE COMPONENT                                                       */
/* ================================================================== */
export default function AdminDashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e1117] text-[#e8eaf0] font-sans antialiased">

      {/* ============================================================ */}
      {/* SIDEBAR                                                       */}
      {/* ============================================================ */}
      <aside className="flex w-[210px] shrink-0 flex-col bg-[#111520] border-r border-white/5 overflow-y-auto">

        {/* Logo */}
        <div className="px-5 pt-7 pb-6">
          <p className="font-display font-bold text-lg text-white leading-tight">ProjectHub</p>
          <p className="text-[11px] text-violet-400 mt-0.5 font-medium">Premium Admin</p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-0.5 px-3 flex-1">
          {sideNav.map((item) => (
            <button
              key={item.id}
              id={`admin-nav-${item.id}`}
              onClick={() => setActiveNav(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all cursor-pointer relative ${
                activeNav === item.id
                  ? "bg-violet-600/15 text-white"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/4"
              }`}
            >
              {activeNav === item.id && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-violet-500" />
              )}
              <span className={activeNav === item.id ? "text-violet-400" : "text-zinc-600"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="flex flex-col gap-1 px-3 pb-4 pt-4 border-t border-white/5">
          {[{ id: "help", label: "Help", icon: <IC.Help /> }, { id: "logout", label: "Logout", icon: <IC.Logout /> }].map((item) => (
            <button
              key={item.id}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-200 hover:bg-white/4 transition-all cursor-pointer"
            >
              <span className="text-zinc-600">{item.icon}</span>
              {item.label}
            </button>
          ))}

          {/* Support Portal */}
          <button
            id="admin-support-portal"
            className="mt-2 w-full rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-600/25 hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
          >
            Support Portal
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* MAIN CONTENT                                                  */}
      {/* ============================================================ */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* ── Top Bar ── */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#0e1117] px-8">
          <h1 className="font-display font-bold text-xl text-white">ProjectHub Admin</h1>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <IC.Search />
              </span>
              <input
                id="admin-search"
                type="text"
                placeholder="Search analytics..."
                className="h-9 w-52 rounded-lg border border-white/6 bg-[#1a1d2e] pl-9 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>

            {/* Bell */}
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer">
              <IC.Bell />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-violet-500" />
            </button>

            {/* Dark mode */}
            <button className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer">
              <IC.Moon />
            </button>

            {/* User */}
            <div className="flex items-center gap-3 rounded-xl border border-white/6 bg-[#1a1d2e] px-3 py-1.5">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-none">Alex Rivera</p>
                <p className="text-[10px] text-zinc-500 tracking-widest uppercase mt-0.5">Super Admin</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold text-white">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* ── Scrollable Body ── */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6">

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div
                key={s.id}
                className="relative rounded-2xl border border-white/6 bg-[#141720] p-5 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
                    {s.up ? <IC.TrendUp /> : <IC.TrendDown />}
                    {s.change}
                  </div>
                  <div className="text-zinc-600">{s.icon}</div>
                </div>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
                  {s.label}
                </p>
                <p className="font-display font-bold text-3xl text-white">{s.value}</p>
              </div>
            ))}
          </div>

          {/* ── Charts Row ── */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* Monthly Sales Bar Chart */}
            <div className="rounded-2xl border border-white/6 bg-[#141720] p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-base text-white">Monthly Sales</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Volume over last 6 months</p>
                </div>
                <button
                  id="admin-export-btn"
                  className="rounded-lg border border-white/10 bg-[#1a1d2e] px-4 py-1.5 text-xs font-bold text-zinc-300 tracking-widest uppercase hover:border-violet-500/40 hover:text-white transition-all cursor-pointer"
                >
                  Export
                </button>
              </div>

              {/* SVG Bar Chart */}
              <div className="relative h-44">
                <svg viewBox="0 0 360 160" className="w-full h-full">
                  {/* Grid lines */}
                  {[0, 40, 80, 120, 160].map((y) => (
                    <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}

                  {/* Bars */}
                  {barData.map((d, i) => {
                    const barW = 36;
                    const gap = 60;
                    const x = i * gap + 12;
                    const barH = (d.h / 100) * 130;
                    const y = 150 - barH;
                    return (
                      <g key={d.month}>
                        <rect
                          x={x}
                          y={y}
                          width={barW}
                          height={barH}
                          rx="5"
                          fill={d.active ? "url(#barGrad)" : "rgba(139,92,246,0.18)"}
                        />
                      </g>
                    );
                  })}

                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#6d28d9" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                  {barData.map((d) => (
                    <span
                      key={d.month}
                      className={`text-[11px] font-semibold ${d.active ? "text-white" : "text-zinc-600"}`}
                    >
                      {d.month}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue Analytics Area Chart */}
            <div className="rounded-2xl border border-white/6 bg-[#141720] p-6">
              <div className="mb-4">
                <h2 className="font-display font-bold text-base text-white">Revenue Analytics</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Growth trends and forecasts</p>
              </div>

              {/* Big number */}
              <div className="flex items-end gap-3 mb-4">
                <span className="font-display font-bold text-3xl text-white">$42,912</span>
                <span className="flex items-center gap-1 mb-0.5 text-xs font-semibold text-emerald-400">
                  <IC.TrendUp />
                  +24.5% vs last month
                </span>
              </div>

              {/* Area Chart SVG */}
              <div className="relative h-36">
                <svg viewBox="0 0 520 160" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[0, 40, 80, 120, 160].map((y) => (
                    <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  {/* Area fill */}
                  <path d={areaPoints} fill="url(#areaGrad)" />
                  {/* Line stroke */}
                  <path d={linePath} fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
                  {/* End dot */}
                  <circle cx="520" cy="2" r="4" fill="#8b5cf6" />
                  <circle cx="520" cy="2" r="8" fill="#8b5cf6" fillOpacity="0.2" />
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                  {["01 JUN", "08 JUN", "15 JUN", "22 JUN", "30 JUN"].map((l) => (
                    <span key={l} className="text-[10px] text-zinc-600 font-medium">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Recent Orders Table ── */}
          <div className="rounded-2xl border border-white/6 bg-[#141720] overflow-hidden">

            {/* Table Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-white/5">
              <h2 className="font-display font-bold text-base text-white">Recent Orders</h2>
              <button
                id="admin-view-all-orders"
                className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-[140px_1fr_1fr_120px_110px] gap-4 px-7 py-3 border-b border-white/5">
              {["ORDER ID", "CUSTOMER", "PROJECT", "AMOUNT", "STATUS"].map((col) => (
                <span key={col} className="text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-[140px_1fr_1fr_120px_110px] gap-4 items-center px-7 py-4 hover:bg-white/2 transition-colors"
                >
                  {/* Order ID */}
                  <span className="text-sm font-mono text-zinc-400">{order.id}</span>

                  {/* Customer */}
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${order.color} text-[11px] font-bold text-white`}>
                      {order.initials}
                    </div>
                    <span className="text-sm text-zinc-200 font-medium">{order.name}</span>
                  </div>

                  {/* Project */}
                  <span className="text-sm text-zinc-400 truncate pr-4">{order.project}</span>

                  {/* Amount */}
                  <span className="font-display font-bold text-sm text-white">{order.amount}</span>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
                        order.status === "Completed"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-amber-500/15 text-amber-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
