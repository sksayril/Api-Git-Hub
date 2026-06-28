"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?query=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/explore");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-24 pb-20 px-6 text-center sm:px-8 overflow-hidden">
      {/* Background glowing light spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/15 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* Main Content */}
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-6 z-10">
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Discover Premium <br />
          <span className="bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text text-transparent">
            Digital Assets
          </span>
        </h1>
        
        <p className="max-w-2xl text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
          The elite destination for digital assets, high-end code templates, and futuristic UI systems.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl mt-4 p-2 rounded-2xl glass-panel flex items-center gap-2 border border-white/5 shadow-2xl focus-within:border-brand-primary/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 pl-3 flex-1">
            <Search className="h-5 w-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for templates, apps, or code..."
              className="w-full bg-transparent border-0 text-sm text-white placeholder-zinc-500 focus:ring-0 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-6 rounded-xl bg-brand-primary text-sm font-semibold text-white transition-all hover:bg-brand-primary-dark hover:shadow-lg hover:shadow-brand-primary/25 active:scale-95 cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/explore"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary-dark hover:shadow-brand-primary/35 active:scale-95 group"
            >
              Browse Categories
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/explore"
              className="inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold text-zinc-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-95"
            >
              View Marketplace
            </Link>
          </div>
          
          <Link
            href="/list-project"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-primary/10 border border-brand-primary/30 px-8 text-sm font-semibold text-brand-accent hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all active:scale-95 shadow-sm shadow-brand-primary/5 mt-2"
          >
            Become a Seller
          </Link>
        </div>
      </div>
    </section>
  );
}
