"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  DollarSign,
  BarChart3,
  Megaphone,
  Plus,
  ShoppingBag,
  TrendingUp,
  Users,
  Percent,
  LogOut,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import SellerAuthOverlay from "@/components/SellerAuthOverlay";

type SellerSession = { sellerId: string; name: string; email: string; status: string; verified: boolean };

type SellerTab = "dashboard" | "products" | "revenue" | "analytics" | "ads";

export default function SellerPanelPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SellerTab>("dashboard");
  const [user, setUser] = useState<SellerSession | null>(null);
  const [loading, setLoading] = useState(true);

  /* Form State for New Product */
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Templates");
  const [productsList, setProductsList] = useState([
    { id: "p1", name: "Astra Tailwind UI Kit", category: "UI Kits", price: 49, sales: 18, status: "Active" },
    { id: "p2", name: "Lumina Next.js Boilerplate", category: "Templates", price: 89, sales: 32, status: "Active" },
    { id: "p3", name: "Quantum Crypto Template", category: "Boilerplates", price: 129, sales: 5, status: "Review" },
  ]);

  /* Form State for New Ad Campaign */
  const [campName, setCampName] = useState("");
  const [campBudget, setCampBudget] = useState("");
  const [adsList, setAdsList] = useState([
    { id: "ad1", name: "Tailwind UI Kit Launch Promo", budget: "$150", spent: "$84.20", clicks: 1240, status: "Active" },
    { id: "ad2", name: "Boilerplate Sales Booster", budget: "$300", spent: "$290.10", clicks: 3105, status: "Paused" },
  ]);

  useEffect(() => {
    fetch("/api/seller/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.seller);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/seller/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productPrice) return;
    const newProduct = {
      id: `p${productsList.length + 1}`,
      name: productName,
      category: productCategory,
      price: Number(productPrice),
      sales: 0,
      status: "Review",
    };
    setProductsList([newProduct, ...productsList]);
    setProductName("");
    setProductDesc("");
    setProductPrice("");
    alert("Product submitted for review successfully!");
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName || !campBudget) return;
    const newCamp = {
      id: `ad${adsList.length + 1}`,
      name: campName,
      budget: `$${campBudget}`,
      spent: "$0.00",
      clicks: 0,
      status: "Active",
    };
    setAdsList([newCamp, ...adsList]);
    setCampName("");
    setCampBudget("");
    alert("Ad campaign launched successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06080e] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <SellerAuthOverlay
        onSuccess={(sellerData) => {
          setUser(sellerData);
        }}
      />
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex h-screen bg-[#07090e] text-zinc-100 font-sans overflow-hidden">
      {/* Dynamic colorful glowing spots for backdrop glass reflection */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {/* LEFT SIDEBAR PANEL (Translucent Glass) */}
      <aside className="w-[240px] shrink-0 border-r border-white/5 bg-[#0a0d14]/40 backdrop-blur-md flex flex-col justify-between z-10">
        <div>
          {/* Logo Branding */}
          <div className="px-6 py-6 border-b border-white/5 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-lg shadow-brand-primary/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white tracking-widest leading-none">SELLER PORTAL</p>
              <p className="text-[9px] text-zinc-500 mt-1">PROJECT HUB CREATOR</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "products", label: "My Products", icon: FolderKanban },
              { id: "revenue", label: "My Revenue", icon: DollarSign },
              { id: "analytics", label: "Analytics Report", icon: BarChart3 },
              { id: "ads", label: "Ad Center", icon: Megaphone },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SellerTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-brand-accent border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                      : "text-zinc-400 border border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Account Panel */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 bg-white/[0.04] border border-white/5 rounded-xl p-3">
            <div className="relative h-8 w-8 shrink-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center text-xs font-bold text-white">
                {initials}
              </div>
              {user.verified && (
                <span
                  title="Verified Seller"
                  className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-blue-500 border border-[#0a0d14] flex items-center justify-center"
                >
                  <svg viewBox="0 0 10 10" className="w-2 h-2 fill-white">
                    <path d="M1.5 5.5l2 2 5-4" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate flex items-center gap-1">
                {user.name}
                {user.verified && (
                  <span title="Verified" className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-blue-500">
                    <svg viewBox="0 0 10 10" className="w-2 h-2"><path d="M1.5 5.5l2 2 5-4" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                )}
              </p>
              <p className="text-[9px] text-zinc-500 truncate">Seller ID: #{(user.sellerId ?? "").slice(-5)}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-1"
              title="Logout"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#07090e]/60 backdrop-blur-sm z-10">
        {/* Header Bar */}
        <header className="h-16 border-b border-white/5 bg-[#0a0d14]/30 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-bold text-white capitalize font-display">
            Seller {activeTab.replace("-", " ")}
          </h1>
          <div className="text-xs text-zinc-500 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Store Status: <span className="text-emerald-400 font-semibold">Live &amp; Verified</span>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* TAB: DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Revenue", value: "$3,842.00", change: "+14.8%", sub: "vs last month", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { label: "Product Sales", value: "55 units", change: "+24.2%", sub: "vs last month", icon: ShoppingBag, color: "text-blue-400", bg: "bg-blue-500/10" },
                  { label: "Visits / Reach", value: "4.8K views", change: "+8.5%", sub: "vs last month", icon: Users, color: "text-violet-400", bg: "bg-violet-500/10" },
                  { label: "Conversion Rate", value: "1.15%", change: "+0.4%", sub: "vs last month", icon: Percent, color: "text-amber-400", bg: "bg-amber-500/10" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-2xl font-bold text-white mt-1.5">{stat.value}</p>
                        <p className="text-[10px] text-zinc-500 mt-1">
                          <span className="text-emerald-400 font-semibold">{stat.change}</span> {stat.sub}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} border border-white/5`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Middle Row Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                  <h2 className="font-semibold text-white text-sm mb-1">Sales Performance</h2>
                  <p className="text-[10px] text-zinc-500 mb-4">Total revenue trends over the last 7 days</p>
                  <svg viewBox="0 0 500 150" className="w-full h-36">
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[0, 30, 60, 90, 120, 150].map((y) => (
                      <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.03)" />
                    ))}
                    <path d="M0,120 Q50,90 100,110 T200,60 T300,75 T400,30 T500,45 L500,150 L0,150 Z" fill="url(#salesGrad)" />
                    <path d="M0,120 Q50,90 100,110 T200,60 T300,75 T400,30 T500,45" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-2 px-1">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                {/* Conversion breakdown */}
                <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                  <div>
                    <h2 className="font-semibold text-white text-sm mb-1">Traffic Channels</h2>
                    <p className="text-[10px] text-zinc-500 mb-4">Top channels generating sales</p>
                  </div>
                  <div className="space-y-3.5">
                    {[
                      { label: "Marketplace Search", pct: "64%", value: 35, color: "bg-brand-accent" },
                      { label: "Direct Referral", pct: "22%", value: 12, color: "bg-brand-primary" },
                      { label: "Ad Campaigns", pct: "14%", value: 8, color: "bg-amber-400" },
                    ].map((channel) => (
                      <div key={channel.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-400">{channel.label}</span>
                          <span className="text-zinc-500 font-semibold">{channel.pct} ({channel.value} sales)</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <div className={`h-full rounded-full ${channel.color}`} style={{ width: channel.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity Logs */}
              <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                <h3 className="font-semibold text-white text-sm mb-4">Recent Shop Activities</h3>
                <div className="divide-y divide-white/4">
                  {[
                    { id: 1, text: "Lumina Boilerplate was purchased by Rahul Sharma", time: "2 hours ago", icon: CheckCircle, color: "text-emerald-400" },
                    { id: 2, text: "Payout of $450.00 processed successfully", time: "Yesterday", icon: DollarSign, color: "text-blue-400" },
                    { id: 3, text: "Astra UI Kit ad campaign reached 1,000 views milestone", time: "3 days ago", icon: Sparkles, color: "text-violet-400" },
                  ].map((act) => {
                    const Icon = act.icon;
                    return (
                      <div key={act.id} className="py-3.5 flex items-start justify-between gap-3 text-sm">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg bg-white/4 shrink-0 ${act.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-zinc-200">{act.text}</span>
                        </div>
                        <span className="text-xs text-zinc-500">{act.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* TAB: MY PRODUCTS */}
          {activeTab === "products" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
              {/* Product Form */}
              <form onSubmit={handleAddProduct} className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <Plus className="w-5 h-5 text-brand-accent" />
                  <h2 className="text-base font-semibold text-white">List New Product</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lumina SaaS Template"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">Category</label>
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary cursor-pointer"
                    >
                      <option value="Templates">Templates</option>
                      <option value="UI Kits">UI Kits</option>
                      <option value="Boilerplates">Boilerplates</option>
                      <option value="3D Assets">3D Assets</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="99.00"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">Description (Markdown)</label>
                  <textarea
                    rows={4}
                    placeholder="Write a compelling markdown product description..."
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:opacity-95 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Submit Product
                </button>
              </form>

              {/* Product List */}
              <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                <h3 className="font-semibold text-white text-sm mb-4">My Products</h3>
                <div className="space-y-3">
                  {productsList.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-white/5 bg-black/[0.15] flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{p.name}</p>
                        <p className="text-[10px] text-zinc-500 mt-1">
                          {p.category} • <span className="font-bold text-zinc-300">${p.price}</span> • {p.sales} sales
                        </p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        p.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MY REVENUE */}
          {activeTab === "revenue" && (
            <div className="space-y-6">
              {/* Financial cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Account Balance</p>
                  <p className="text-3xl font-bold text-white mt-2">$2,192.40</p>
                  <button className="mt-4 w-full rounded-xl bg-brand-primary py-2 text-xs font-semibold hover:opacity-95 transition-all active:scale-[0.98]">
                    Request Payout
                  </button>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                  <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Pending Payouts</p>
                    <p className="text-3xl font-bold text-zinc-400 mt-2">$150.00</p>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">Next scheduled payout: July 1st</p>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                  <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Lifetime Earnings</p>
                    <p className="text-3xl font-bold text-emerald-400 mt-2">$8,450.00</p>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">Started seller account: Jan 2025</p>
                </div>
              </div>

              {/* Transactions log */}
              <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                <h3 className="font-semibold text-white text-sm mb-4">Payout Histories</h3>
                <div className="divide-y divide-white/4">
                  {[
                    { id: "pay1", date: "June 25, 2026", amount: "$450.00", method: "Stripe Connect", status: "Paid" },
                    { id: "pay2", date: "June 10, 2026", amount: "$890.00", method: "Stripe Connect", status: "Paid" },
                    { id: "pay3", date: "May 25, 2026", amount: "$1,200.00", method: "Bank Wire", status: "Paid" },
                  ].map((pay) => (
                    <div key={pay.id} className="py-3 flex items-center justify-between text-sm">
                      <div>
                        <p className="font-semibold text-white">{pay.amount}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{pay.date} • {pay.method}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        {pay.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Traffic details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traffic source */}
                <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                  <h3 className="font-semibold text-white text-sm mb-4">Unique Visitors</h3>
                  <svg viewBox="0 0 500 150" className="w-full h-36">
                    <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" />
                    <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.05)" />
                    <path d="M0,120 Q80,40 160,80 T320,30 T500,50" fill="none" stroke="#2563eb" strokeWidth="3" />
                  </svg>
                  <div className="flex justify-between text-[9px] text-zinc-600 mt-2 px-1">
                    <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                  </div>
                </div>

                {/* Country distribution */}
                <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                  <h3 className="font-semibold text-white text-sm mb-4">Geographic Distribution</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { country: "United States", share: "45%", count: "2,160 views" },
                      { country: "India", share: "28%", count: "1,344 views" },
                      { country: "United Kingdom", share: "12%", count: "576 views" },
                      { country: "Canada", share: "8%", count: "384 views" },
                    ].map((c) => (
                      <div key={c.country} className="flex justify-between items-center text-zinc-300">
                        <span>{c.country}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500">{c.count}</span>
                          <span className="font-bold text-brand-accent">{c.share}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ADS */}
          {activeTab === "ads" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
              {/* Add Campaign form */}
              <form onSubmit={handleAddCampaign} className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <Megaphone className="w-5 h-5 text-brand-primary" />
                  <h2 className="text-base font-semibold text-white">Create Advertising Campaign</h2>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">Campaign Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Summer Promo Special"
                    value={campName}
                    onChange={(e) => setCampName(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">Total Budget ($ USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="250.00"
                    value={campBudget}
                    onChange={(e) => setCampBudget(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 hover:opacity-95 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Launch Campaign
                </button>
              </form>

              {/* Active Campaigns list */}
              <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-md rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                <h3 className="font-semibold text-white text-sm mb-4">Ad Campaigns</h3>
                <div className="space-y-3">
                  {adsList.map((ad) => (
                    <div key={ad.id} className="p-4 rounded-xl border border-white/5 bg-black/[0.15] flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{ad.name}</p>
                        <p className="text-[10px] text-zinc-500 mt-1.5">
                          Budget: <span className="font-semibold text-zinc-300">{ad.budget}</span> • Spent: {ad.spent} • {ad.clicks} clicks
                        </p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        ad.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                          : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/25"
                      }`}>
                        {ad.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
