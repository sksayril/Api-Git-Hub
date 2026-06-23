"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ChevronDown, Star, ArrowLeft, ArrowRight } from "lucide-react";

// Mock data to match the image precisely
const marketplaceItems = [
  {
    id: "nexus-dashboard",
    title: "Nexus Dashboard UI Kit",
    category: "UI KIT",
    price: 49,
    description: "Modern enterprise dashboard with 120+ components and 40+ pre-mad...",
    rating: 4.9,
    sales: "2.1k sales",
    version: "v2.4.0",
    image: "/images/lumina_dashboard.png" // using existing image placeholder
  },
  {
    id: "ethereal-3d",
    title: "Ethereal 3D Icon Set",
    category: "3D ASSETS",
    price: 29,
    description: "50+ high-resolution iridescent 3D icons for modern web and mobile...",
    rating: 4.8,
    sales: "840 sales",
    version: "v1.2.0",
    image: "/images/finflow_wallet.png"
  },
  {
    id: "nova-saas",
    title: "Nova SaaS Landing Page",
    category: "TEMPLATES",
    price: 35,
    description: "Fully responsive Tailwind CSS template with Framer Motion animations.",
    rating: 5.0,
    sales: "1.5k sales",
    version: "v1.0.0",
    image: "/images/synthetix_ai.png"
  },
  {
    id: "gradient-pro",
    title: "Gradient Pro Texture Pack",
    category: "GRAPHICS",
    price: 15,
    description: "20 ultra-high definition gradient textures for backgrounds and...",
    rating: 4.5,
    sales: "520 sales",
    version: "v3.1.0",
    image: "/images/collab_flow.png" // placeholder
  },
  {
    id: "lineas-minimal",
    title: "Lineas Minimal Iconset",
    category: "UI KIT",
    price: 19,
    description: "Over 1,500 pixel-perfect line icons optimized for mobile apps and...",
    rating: 4.9,
    sales: "4.2k sales",
    version: "v5.0.2",
    image: "/images/ethereal_portfolio.png"
  },
  {
    id: "quantum-analytics",
    title: "Quantum Analytics Dashboard",
    category: "TEMPLATES",
    price: 59,
    description: "Advanced data visualization toolkit with 200+ unique chart styles and...",
    rating: 4.7,
    sales: "180 sales",
    version: "v1.1.0",
    image: "/images/lumina_dashboard.png" // placeholder
  },
  {
    id: "character-rig",
    title: "Character Rig Pro Pack",
    category: "3D ASSETS",
    price: 89,
    description: "Ready-to-animate 3D character base meshes with full rigging and skinning.",
    rating: 5.0,
    sales: "124 sales",
    version: "v2.0.0",
    image: "/images/finflow_wallet.png" // placeholder
  },
  {
    id: "cryptowallet-mobile",
    title: "CryptoWallet Mobile Kit",
    category: "UI KIT",
    price: 45,
    description: "Complete mobile application UI kit for DeFi and crypto asset management.",
    rating: 4.8,
    sales: "3.4k sales",
    version: "v4.2.1",
    image: "/images/avenue_fashion.png"
  }
];

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("All Assets");

  return (
    <div className="flex flex-col min-h-screen bg-[#0e111a] text-zinc-100 font-sans">
      <Navbar />

      {/* Secondary Marketplace Header */}
      <div className="w-full border-b border-white/5 bg-[#0e111a]">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold text-white font-display">Marketplace</h1>
            
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {["All Assets", "UI Kits", "3D Models", "SaaS Templates"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-1 transition-colors ${
                    activeTab === tab ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom--4 left-0 w-full h-[2px] bg-brand-primary rounded-t-md" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search premium digital assets..."
                className="w-full bg-[#1b1e2b] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-primary/50 transition-colors"
              />
            </div>
            
            <div className="relative shrink-0">
              <select className="appearance-none bg-[#1b1e2b] border border-white/5 rounded-xl py-2 pl-4 pr-10 text-sm text-white focus:outline-none cursor-pointer hover:border-white/20 transition-colors">
                <option>Newest First</option>
                <option>Most Popular</option>
                <option>Price: Low to High</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-12">
        
        {/* Title Section */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#a78bfa] mb-2 block">
              DISCOVERY
            </span>
            <h2 className="text-3xl font-display font-semibold text-white">
              Featured Creations
            </h2>
          </div>
          <p className="text-sm text-zinc-400 hidden sm:block">
            <strong className="text-white">1,284</strong> assets found
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {marketplaceItems.map((item) => (
            <div key={item.id} className="bg-[#171a26] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#8b7fff]/30 transition-all flex flex-col">
              
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 p-4 pb-0">
                <div className="relative w-full h-full rounded-t-xl overflow-hidden border border-white/5 border-b-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Category Pill - Absolute top left of card */}
                <div className="absolute top-6 left-6 bg-[#1b1e2b]/80 backdrop-blur-md border border-white/10 text-[9px] font-bold tracking-wider text-zinc-300 px-2.5 py-1 rounded-md uppercase">
                  {item.category}
                </div>
                
                {/* Price Pill - Absolute top right of card */}
                <div className="absolute top-6 right-6 bg-[#1b1e2b]/80 backdrop-blur-md border border-white/10 text-white font-semibold text-sm px-2.5 py-1 rounded-md shadow-lg">
                  ${item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 pt-4 flex-1 flex flex-col">
                <h3 className="text-base font-medium text-white mb-2 line-clamp-1 group-hover:text-[#a78bfa] transition-colors cursor-pointer">
                  {item.title}
                </h3>
                
                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 flex-1 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#a78bfa] fill-[#a78bfa]" />
                    <span className="text-xs font-semibold text-white">{item.rating.toFixed(1)}</span>
                    <span className="text-xs text-zinc-500 ml-1">({item.sales})</span>
                  </div>
                  
                  <span className="text-[10px] text-zinc-500 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                    {item.version}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/5">
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 rounded-lg bg-[#a78bfa] text-black font-semibold text-sm flex items-center justify-center">
              1
            </button>
            <button className="w-9 h-9 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-9 h-9 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium flex items-center justify-center transition-colors">
              3
            </button>
            <span className="text-zinc-500 px-2">...</span>
            <button className="w-9 h-9 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white text-sm font-medium flex items-center justify-center transition-colors">
              24
            </button>
          </div>

          <button className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
