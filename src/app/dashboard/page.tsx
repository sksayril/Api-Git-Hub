"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

interface PurchasedProject {
  id: string;
  name: string;
  version: string;
  license: string;
  date: string;
  price: string;
  image: string;
  color: string;
}

interface UserOrder {
  id: string;
  total: string;
  date: string;
  status: string;
  itemCount: number;
}

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<{ name: string; email: string; id: string } | null>(null);
  const [purchased, setPurchased] = useState<PurchasedProject[]>([]);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        // Fetch purchased projects
        return fetch("/api/user/purchased");
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.purchased) setPurchased(data.purchased);
        if (data.orders) setOrders(data.orders);
      })
      .catch(() => {
        router.push("/explore");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/explore");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e1117] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "US";

  return (
    <div className="flex h-screen overflow-hidden bg-[#0e1117] text-white font-sans">
      {/* Sidebar */}
      <aside className="flex w-[230px] shrink-0 flex-col border-r border-white/5 bg-[#111520] overflow-y-auto">
        <div className="flex items-center gap-2.5 px-5 py-6 border-b border-white/5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent">
            <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-display font-bold text-base text-white tracking-tight">
            ProjectHub
          </span>
        </div>

        <nav className="flex flex-col gap-6 px-3 pt-6 flex-1">
          <div>
            <p className="mb-2.5 px-2 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
              Overview
            </p>
            <ul className="flex flex-col gap-0.5">
              {overviewNav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveNav(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                      activeNav === item.id
                        ? "bg-brand-primary/20 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className={activeNav === item.id ? "text-brand-accent" : "text-zinc-500"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2.5 px-2 text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
              Account
            </p>
            <ul className="flex flex-col gap-0.5">
              {accountNav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveNav(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                      activeNav === item.id
                        ? "bg-brand-primary/20 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className={activeNav === item.id ? "text-brand-accent" : "text-zinc-500"}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="h-2 w-2 rounded-full bg-brand-accent shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 rounded-xl bg-white/4 px-3 py-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
              <span className="text-xs font-bold text-white">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-zinc-500 truncate">Customer</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-1"
              title="Logout"
            >
              <IconLogout />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#0e1117] px-8">
          <h1 className="font-display font-bold text-2xl text-white">
            Welcome back, {user?.name.split(" ")[0]}
          </h1>

          <div className="flex items-center gap-4">
            <Link
              href="/explore"
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white hover:opacity-95 transition-all active:scale-95 shadow-md shadow-brand-primary/25"
            >
              List Project
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-7">
          {activeNav === "settings" ? (
            <div className="rounded-2xl border border-white/8 bg-[#141720] p-8 max-w-xl">
              <h2 className="font-display font-bold text-xl text-white mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">Name</label>
                  <input
                    type="text"
                    disabled
                    value={user?.name}
                    className="w-full mt-1.5 rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-zinc-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">Email</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email}
                    className="w-full mt-1.5 rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-zinc-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#141720] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-3">
                        Total Purchases
                      </p>
                      <div className="flex items-end gap-3">
                        <span className="font-display font-bold text-5xl text-white">{purchased.length}</span>
                      </div>
                    </div>
                    <div className="text-zinc-700 opacity-60">
                      <IconTrendingUp />
                    </div>
                  </div>
                  <div className="h-0.5 w-16 rounded-full bg-amber-500" />
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#141720] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-3">
                        Total Downloads
                      </p>
                      <div className="flex items-end gap-3">
                        <span className="font-display font-bold text-5xl text-white">{purchased.length}</span>
                        <span className="mb-1.5 text-xs font-semibold text-zinc-400">Active</span>
                      </div>
                    </div>
                    <div className="text-zinc-700 opacity-60">
                      <IconDownloadCloud />
                    </div>
                  </div>
                  <div className="h-0.5 w-16 rounded-full bg-brand-primary" />
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#141720] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-3">
                        Orders Placed
                      </p>
                      <div className="flex items-end gap-3">
                        <span className="font-display font-bold text-5xl text-white">{orders.length}</span>
                        <span className="mb-1.5 text-xs font-semibold text-zinc-400">Total</span>
                      </div>
                    </div>
                    <div className="text-zinc-700 opacity-60">
                      <IconBookmark />
                    </div>
                  </div>
                  <div className="h-0.5 w-16 rounded-full bg-sky-500" />
                </div>
              </div>

              {/* Table */}
              <div className="rounded-2xl border border-white/8 bg-[#141720] overflow-hidden">
                <div className="flex items-start justify-between px-7 pt-7 pb-6 border-b border-white/5">
                  <div>
                    <h2 className="font-display font-bold text-xl text-white">
                      Purchased Projects
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1">
                      Manage and access your premium digital assets.
                    </p>
                  </div>
                </div>

                {purchased.length === 0 ? (
                  <div className="p-12 text-center text-zinc-500 text-sm">
                    No purchased projects found. Visit the <Link href="/explore" className="text-brand-accent underline">Marketplace</Link> to buy templates!
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-[1fr_160px_120px_140px] px-7 py-3 border-b border-white/5">
                      {["PROJECT", "PURCHASE DATE", "PRICE", "ACTIONS"].map((col) => (
                        <span key={col} className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">
                          {col}
                        </span>
                      ))}
                    </div>

                    <div className="divide-y divide-white/4">
                      {purchased.map((proj) => (
                        <div key={proj.id} className="grid grid-cols-[1fr_160px_120px_140px] items-center px-7 py-5 hover:bg-white/2 transition-colors">
                          <div className="flex items-center gap-4">
                            <div
                              className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 overflow-hidden border border-white/10"
                              style={{
                                backgroundImage: `url(${proj.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                            <div>
                              <p className="font-semibold text-sm text-white">{proj.name}</p>
                              <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                                {proj.version} • {proj.license}
                              </p>
                            </div>
                          </div>

                          <span className="text-sm text-zinc-400">{proj.date}</span>
                          <span className="font-display font-bold text-sm text-white">{proj.price}</span>

                          <div>
                            <button
                              onClick={() => alert("Downloading asset bundle...")}
                              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:border-brand-primary/40 hover:bg-brand-primary/10 transition-all cursor-pointer active:scale-95"
                            >
                              <IconDownload />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
