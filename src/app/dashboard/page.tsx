"use client";

import { useState } from "react";
import Link from "next/link";

/* ================================================================== */
/* ICONS — inline SVGs to avoid any lucide compatibility issues        */
/* ================================================================== */

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function IconPackage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconCart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
}
function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}
function IconLayoutGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function IconDownloadCloud() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-8 w-8">
      <polyline points="8 17 12 21 16 17" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
    </svg>
  );
}
function IconBookmark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-8 w-8">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}
function IconTrendingUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-8 w-8">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconDollar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}

/* ================================================================== */
/* DATA                                                                */
/* ================================================================== */

const purchasedProjects = [
  {
    id: 1,
    name: "Lumina SaaS Dashboard",
    version: "v2.4.0",
    license: "Commercial License",
    date: "Oct 24, 2023",
    price: "$49.00",
    image: "/images/lumina_dashboard.png",
    color: "from-violet-600 to-indigo-500",
  },
  {
    id: 2,
    name: "Nebula 3D Asset Pack",
    version: "v1.1.0",
    license: "Full Access",
    date: "Sep 12, 2023",
    price: "$120.00",
    image: "/images/synthetix_ai.png",
    color: "from-sky-500 to-cyan-400",
  },
  {
    id: 3,
    name: "Fintech Iconography Set",
    version: "v3.0.1",
    license: "Multi-use",
    date: "Aug 30, 2023",
    price: "$35.00",
    image: "/images/collab_flow.png",
    color: "from-emerald-500 to-teal-400",
  },
];

const recentActivity = [
  {
    id: 1,
    icon: "clock",
    text: "Update available for Lumina Dashboard",
    time: "2 hours ago",
    color: "bg-violet-500/15 text-violet-400",
  },
  {
    id: 2,
    icon: "star",
    text: "You reviewed Nebula 3D Pack",
    time: "Yesterday at 4:32 PM",
    color: "bg-amber-500/15 text-amber-400",
  },
  {
    id: 3,
    icon: "dollar",
    text: "Payout of $450.00 processed",
    time: "3 days ago",
    color: "bg-emerald-500/15 text-emerald-400",
  },
];

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: boolean;
};

/* ================================================================== */
/* MAIN DASHBOARD PAGE                                                  */
/* ================================================================== */
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState(1);

  const overviewNav: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <IconGrid /> },
    { id: "purchased", label: "Purchased Projects", icon: <IconPackage /> },
    { id: "downloads", label: "Downloads", icon: <IconDownload /> },
    { id: "wishlist", label: "Wishlist", icon: <IconHeart /> },
  ];

  const accountNav: NavItem[] = [
    { id: "reviews", label: "Reviews", icon: <IconStar /> },
    { id: "notifications", label: "Notifications", icon: <IconBell />, badge: true },
    { id: "settings", label: "Profile Settings", icon: <IconSettings /> },
  ];

  function ActivityIcon({ type }: { type: string }) {
    if (type === "clock") return <IconClock />;
    if (type === "star") return <IconStar />;
    return <IconDollar />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e1117] text-white font-sans">
      {/* ============================================================ */}
      {/* SIDEBAR                                                       */}
      {/* ============================================================ */}
      <aside className="flex w-[230px] shrink-0 flex-col border-r border-white/5 bg-[#111520] overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-6 border-b border-white/5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500">
            <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-display font-bold text-base text-white tracking-tight">
            Lumina Market
          </span>
        </div>

        {/* Nav Groups */}
        <nav className="flex flex-col gap-6 px-3 pt-6 flex-1">
          {/* OVERVIEW */}
          <div>
            <p className="mb-2.5 px-2 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
              Overview
            </p>
            <ul className="flex flex-col gap-0.5">
              {overviewNav.map((item) => (
                <li key={item.id}>
                  <button
                    id={`nav-${item.id}`}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                      activeNav === item.id
                        ? "bg-violet-600/20 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={
                        activeNav === item.id ? "text-violet-400" : "text-zinc-500"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <p className="mb-2.5 px-2 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
              Account
            </p>
            <ul className="flex flex-col gap-0.5">
              {accountNav.map((item) => (
                <li key={item.id}>
                  <button
                    id={`nav-${item.id}`}
                    onClick={() => setActiveNav(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                      activeNav === item.id
                        ? "bg-violet-600/20 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className={
                        activeNav === item.id ? "text-violet-400" : "text-zinc-500"
                      }
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 rounded-xl bg-white/4 px-3 py-3">
            {/* Avatar */}
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">AR</span>
            </div>
            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Alex Rivera</p>
              <p className="text-[11px] text-zinc-500 truncate">Pro Member</p>
            </div>
            {/* Logout */}
            <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-1">
              <IconLogout />
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* MAIN CONTENT                                                  */}
      {/* ============================================================ */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ---- Top Bar ---- */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#0e1117] px-8">
          <h1 className="font-display font-bold text-2xl text-white">
            Welcome back, Alex
          </h1>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                <IconSearch />
              </span>
              <input
                id="dashboard-search"
                type="text"
                placeholder="Search my projects..."
                className="h-9 w-56 rounded-lg border border-white/8 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>

            {/* Cart */}
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer">
              <IconCart />
              <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-violet-500 border-2 border-[#0e1117]" />
            </button>

            {/* List Project */}
            <Link
              href="/explore"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white hover:bg-violet-700 transition-all active:scale-95 shadow-md shadow-violet-600/25"
            >
              List Project
            </Link>
          </div>
        </header>

        {/* ---- Scrollable Page Body ---- */}
        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-7">

          {/* ---- Stat Cards ---- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Total Purchases */}
            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#141720] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-3">
                    Total Purchases
                  </p>
                  <div className="flex items-end gap-3">
                    <span className="font-display font-bold text-5xl text-white">12</span>
                    <span className="flex items-center gap-1 mb-1.5 text-xs font-semibold text-amber-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-3 w-3">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                      +2 this month
                    </span>
                  </div>
                </div>
                <div className="text-zinc-700 opacity-60">
                  <IconTrendingUp />
                </div>
              </div>
              <div className="h-0.5 w-16 rounded-full bg-amber-500" />
            </div>

            {/* Downloads */}
            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#141720] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-3">
                    Downloads
                  </p>
                  <div className="flex items-end gap-3">
                    <span className="font-display font-bold text-5xl text-white">45</span>
                    <span className="mb-1.5 text-xs font-semibold text-zinc-400">Active</span>
                  </div>
                </div>
                <div className="text-zinc-700 opacity-60">
                  <IconDownloadCloud />
                </div>
              </div>
              <div className="h-0.5 w-16 rounded-full bg-violet-500" />
            </div>

            {/* Wishlist Items */}
            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#141720] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-3">
                    Wishlist Items
                  </p>
                  <div className="flex items-end gap-3">
                    <span className="font-display font-bold text-5xl text-white">08</span>
                    <span className="mb-1.5 text-xs font-semibold text-zinc-400">Items</span>
                  </div>
                </div>
                <div className="text-zinc-700 opacity-60">
                  <IconBookmark />
                </div>
              </div>
              <div className="h-0.5 w-16 rounded-full bg-sky-500" />
            </div>
          </div>

          {/* ---- Purchased Projects Table ---- */}
          <div className="rounded-2xl border border-white/8 bg-[#141720] overflow-hidden">
            {/* Table Header */}
            <div className="flex items-start justify-between px-7 pt-7 pb-6 border-b border-white/5">
              <div>
                <h2 className="font-display font-bold text-xl text-white">
                  Purchased Projects
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  Manage and access your premium digital assets.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/8 bg-white/4 text-zinc-400 hover:text-white hover:border-white/15 transition-all cursor-pointer">
                  <IconFilter />
                </button>
                <button className="flex items-center justify-center h-8 w-8 rounded-lg border border-white/8 bg-white/4 text-zinc-400 hover:text-white hover:border-white/15 transition-all cursor-pointer">
                  <IconLayoutGrid />
                </button>
              </div>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-[1fr_160px_120px_140px] px-7 py-3 border-b border-white/5">
              {["PROJECT", "PURCHASE DATE", "PRICE", "ACTIONS"].map((col) => (
                <span
                  key={col}
                  className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/4">
              {purchasedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="grid grid-cols-[1fr_160px_120px_140px] items-center px-7 py-5 hover:bg-white/2 transition-colors"
                >
                  {/* Project */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br ${proj.color} overflow-hidden`}
                      style={{
                        backgroundImage: `url(${proj.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div>
                      <p className="font-semibold text-sm text-white">{proj.name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {proj.version} • {proj.license}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <span className="text-sm text-zinc-400">{proj.date}</span>

                  {/* Price */}
                  <span className="font-display font-bold text-sm text-white">{proj.price}</span>

                  {/* Download Button */}
                  <div>
                    <button
                      id={`download-${proj.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all cursor-pointer active:scale-95"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-white/5 px-7 py-4">
              <span className="text-xs text-zinc-500">Showing 3 of 12 projects</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/4 text-zinc-400 hover:text-white hover:border-white/15 transition-all cursor-pointer"
                >
                  <IconChevronLeft />
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                      currentPage === p
                        ? "bg-violet-600 text-white shadow-sm shadow-violet-500/30"
                        : "border border-white/8 bg-white/4 text-zinc-400 hover:text-white hover:border-white/15"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-white/4 text-zinc-400 hover:text-white hover:border-white/15 transition-all cursor-pointer"
                >
                  <IconChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* ---- Bottom Row: Upgrade Card + Recent Activity ---- */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
            {/* Upgrade to Premium Plus */}
            <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#1a0d3a] via-[#140d2e] to-[#0e1117] p-8">
              {/* Background glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 h-48 w-48 rounded-full bg-violet-600/15 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-indigo-600/10 blur-2xl" />
              </div>

              <div className="relative">
                <h3 className="font-display font-bold text-2xl text-violet-300 mb-3">
                  Upgrade to Premium Plus
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mb-6">
                  Get early access to exclusive project drops, unlimited commercial
                  licenses, and 24/7 dedicated support from our curator team.
                </p>
                <button
                  id="upgrade-premium-btn"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-violet-600 px-8 text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-700 transition-all active:scale-95 cursor-pointer"
                >
                  Unlock Pro Benefits
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-white/8 bg-[#141720] p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-base text-white">
                  Recent Activity
                </h3>
                <button className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors cursor-pointer">
                  View all
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activity.color}`}
                    >
                      <ActivityIcon type={activity.icon} />
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-200 leading-snug">
                        {activity.text}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---- Footer ---- */}
          <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-4 border-t border-white/5">
            <p className="text-xs text-zinc-600">
              © 2024 Lumina Digital Marketplace. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs text-zinc-600">
              <Link href="#" className="hover:text-zinc-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-zinc-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-zinc-400 transition-colors">
                Help Center
              </Link>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
