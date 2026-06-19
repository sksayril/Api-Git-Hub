"use client";

import { useState } from "react";
import { X, Laptop, Tablet, Smartphone, ArrowLeft, ShoppingCart, RefreshCw, Layers } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Project } from "@/data/projects";

interface LivePreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

type ViewMode = "desktop" | "tablet" | "mobile";

export default function LivePreviewModal({ project, onClose }: LivePreviewModalProps) {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [key, setKey] = useState(0); // to reload mock preview

  if (!project) return null;

  const handleBuyNow = () => {
    addToCart({
      id: project.id,
      title: project.title,
      price: project.price,
      image: project.image,
    });
    onClose();
  };

  // Dimensions based on mode
  const getWidthClass = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px] max-w-full h-[667px] border-x-[12px] border-y-[40px] border-zinc-800 rounded-[36px] shadow-2xl relative my-auto";
      case "tablet":
        return "w-[768px] max-w-full h-[1024px] border-x-[10px] border-y-[30px] border-zinc-800 rounded-[24px] shadow-2xl relative my-auto";
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#080813] text-white">
      {/* Top Navigation Bar */}
      <div className="flex h-16 items-center justify-between border-b border-white/5 bg-[#0e1117] px-4 sm:px-6">
        
        {/* Left Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Exit Preview</span>
          </button>
          
          <span className="hidden sm:inline-block text-zinc-600">|</span>
          
          <h2 className="hidden sm:inline-block font-display font-bold text-sm text-zinc-100">
            {project.title}
          </h2>
        </div>

        {/* Center Device Toggles */}
        <div className="flex items-center gap-1 bg-black/40 rounded-xl p-1 border border-white/5">
          <button
            onClick={() => setViewMode("desktop")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === "desktop" ? "bg-brand-primary text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Desktop view"
          >
            <Laptop className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setViewMode("tablet")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === "tablet" ? "bg-brand-primary text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Tablet view"
          >
            <Tablet className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setViewMode("mobile")}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              viewMode === "mobile" ? "bg-brand-primary text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Mobile view"
          >
            <Smartphone className="h-4 w-4" />
          </button>

          <button
            onClick={() => setKey(k => k + 1)}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors cursor-pointer"
            title="Refresh preview"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-sm text-zinc-300">${project.price}</span>
          <button
            onClick={handleBuyNow}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-brand-primary px-4 text-xs font-semibold text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Buy Now
          </button>
        </div>
      </div>

      {/* Main Preview Frame Container */}
      <div className="flex-1 overflow-auto bg-[#0a0a14] flex justify-center p-6 md:p-8">
        <div className={`transition-all duration-300 flex flex-col bg-[#02020a] border border-white/5 overflow-hidden ${getWidthClass()}`}>
          {/* Simulated Browser Bar (Only for tablet/mobile frame overlays or desktop mockup tops) */}
          {viewMode !== "desktop" && (
            <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-800 rounded-full z-20 pointer-events-none" />
          )}

          {/* Viewport Frame */}
          <div key={key} className="flex-1 w-full h-full overflow-y-auto custom-scrollbar flex flex-col text-left">
            {/* Template Header simulation */}
            <div className="h-14 border-b border-white/5 bg-black/40 flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-brand-primary" />
                <span className="text-xs font-bold font-display uppercase tracking-wider">{project.title} Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] text-zinc-500 font-semibold">Active Demo</span>
              </div>
            </div>

            {/* Template Content Area - Render a mock layout specific to the asset type */}
            <div className="p-8 flex flex-col gap-6 flex-1 bg-gradient-to-br from-black to-[#050512]">
              {project.category.toLowerCase().includes("dashboard") || project.category.toLowerCase().includes("saas") ? (
                /* Mock Dashboard Template */
                <div className="flex flex-col gap-6 w-full">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-white/5 bg-white/2 p-4 flex flex-col gap-1.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Net Sales</span>
                      <span className="text-xl font-bold font-display text-white">$24,930</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">+18.2% vs last week</span>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/2 p-4 flex flex-col gap-1.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Active Users</span>
                      <span className="text-xl font-bold font-display text-white">4,812</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">+4.6% vs last week</span>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/2 p-4 flex flex-col gap-1.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Server Load</span>
                      <span className="text-xl font-bold font-display text-white">28.4%</span>
                      <span className="text-[10px] text-zinc-400 font-semibold">Optimal status</span>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border border-white/5 bg-white/2 p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold tracking-wider uppercase text-zinc-400">Visitor Overview</h4>
                      <span className="text-[10px] bg-brand-primary/15 text-brand-accent px-2 py-0.5 rounded font-semibold">Live Feed</span>
                    </div>
                    <div className="h-40 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center p-4 relative overflow-hidden">
                      {/* Fake graph lines */}
                      <svg className="w-full h-full text-brand-primary opacity-60" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <path d="M0,80 Q30,20 60,60 T120,40 T180,80 T240,30 T300,10" fill="none" stroke="currentColor" strokeWidth="3" />
                      </svg>
                      <span className="absolute text-[10px] text-zinc-500 font-mono">Simulated chart graphics</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-white/5 bg-white/2 p-4 flex flex-col gap-3">
                      <h5 className="text-[10px] font-bold text-zinc-400 uppercase">Recent Activity</h5>
                      <ul className="flex flex-col gap-2 text-[10px] text-zinc-500">
                        <li className="flex justify-between py-1 border-b border-white/2"><span>User logged in</span><span className="text-zinc-600">2m ago</span></li>
                        <li className="flex justify-between py-1 border-b border-white/2"><span>Payment received</span><span className="text-zinc-600">12m ago</span></li>
                        <li className="flex justify-between py-1"><span>Settings updated</span><span className="text-zinc-600">1h ago</span></li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/2 p-4 flex flex-col gap-3">
                      <h5 className="text-[10px] font-bold text-zinc-400 uppercase">Active Nodes</h5>
                      <div className="flex gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 my-auto" />
                        <span className="text-[10px] text-zinc-300">US-EAST-1 (Healthy)</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 my-auto" />
                        <span className="text-[10px] text-zinc-300">EU-WEST-2 (Healthy)</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500 my-auto" />
                        <span className="text-[10px] text-zinc-400">AP-SOUTH-1 (Rebuilding)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : project.category.toLowerCase().includes("mobile") ? (
                /* Mock Mobile App Template */
                <div className="flex flex-col gap-6 items-center w-full max-w-sm mx-auto">
                  <div className="w-full rounded-2xl border border-white/5 bg-white/2 p-6 flex flex-col gap-4 text-center">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Available Balance</span>
                    <span className="text-2xl font-bold font-display text-white">$14,892.40</span>
                    <div className="flex justify-center gap-2 text-xs">
                      <span className="px-3 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/5 cursor-pointer">Send</span>
                      <span className="px-3 py-1 rounded-full bg-brand-primary text-white shadow-md cursor-pointer">Receive</span>
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-3">
                    <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-left">Your Assets</h5>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/2">
                        <span className="text-xs font-semibold">Bitcoin (BTC)</span>
                        <div className="text-right flex flex-col">
                          <span className="text-xs font-bold">$64,281.00</span>
                          <span className="text-[10px] text-emerald-400">+2.4%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/2">
                        <span className="text-xs font-semibold">Ethereum (ETH)</span>
                        <div className="text-right flex flex-col">
                          <span className="text-xs font-bold">$3,429.50</span>
                          <span className="text-[10px] text-emerald-400">+4.1%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/2">
                        <span className="text-xs font-semibold">Solana (SOL)</span>
                        <div className="text-right flex flex-col">
                          <span className="text-xs font-bold">$148.20</span>
                          <span className="text-[10px] text-rose-400">-1.8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Mock Standard Website Template */
                <div className="flex flex-col gap-8 w-full text-center">
                  <div className="flex flex-col items-center gap-4 py-8">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white max-w-md">
                      Crafting Ethereal Digital Experiences
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed">
                      Custom minimal template built for creators, designers, and visual developers who want to show off high-fidelity products.
                    </p>
                    <button className="h-10 px-5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all mt-2">
                      Explore Projects
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-square rounded-xl bg-zinc-950 border border-white/5 overflow-hidden flex items-center justify-center p-4">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Project Alpha</span>
                    </div>
                    <div className="relative aspect-square rounded-xl bg-zinc-950 border border-white/5 overflow-hidden flex items-center justify-center p-4">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Project Beta</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
