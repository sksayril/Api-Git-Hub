"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { seedProjects } from "@/data/projects";
import { Search, ChevronDown, Star, ChevronLeft, ChevronRight, LayoutTemplate, Box, Type, FileCode2 } from "lucide-react";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("UI Kits");
  const [priceRange, setPriceRange] = useState(500);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  const categories = ["UI Kits", "Templates", "Icons", "3D Assets", "Fonts"];
  const software = ["Figma", "Adobe XD", "React", "Tailwind"];

  const handleTechChange = (techName: string) => {
    setSelectedTech((prev) =>
      prev.includes(techName) ? prev.filter((t) => t !== techName) : [...prev, techName]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedTech([]);
    setPriceRange(500);
    setMinRating(false);
    setSortOption("newest");
  };

  const filteredProjects = seedProjects; // Simplifying filter logic for now to show all

  const getTechIcon = (tech: string) => {
    switch (tech) {
      case "Figma": return <LayoutTemplate className="w-3 h-3 text-pink-400" />;
      case "React": return <FileCode2 className="w-3 h-3 text-cyan-400" />;
      case "Adobe XD": return <Box className="w-3 h-3 text-purple-400" />;
      case "Tailwind": return <Type className="w-3 h-3 text-blue-400" />;
      default: return <Box className="w-3 h-3 text-zinc-400" />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0f111a] text-zinc-100 font-sans selection:bg-brand-primary selection:text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8 flex gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-64 shrink-0 flex flex-col gap-8 hidden lg:flex">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1b1e2b] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-primary/50 transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-1">Categories</h3>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'border-[#8b7fff] bg-[#8b7fff]/20' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                  {selectedCategory === cat && <div className="w-2 h-2 rounded-full bg-[#8b7fff]" />}
                </div>
                <span className={`text-sm ${selectedCategory === cat ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{cat}</span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-1">Price Range</h3>
            <div className="w-full relative mt-2">
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-zinc-700 rounded-full appearance-none outline-none accent-[#8b7fff] cursor-pointer relative z-10"
              />
            </div>
            <div className="flex justify-between text-xs text-zinc-400 mt-1">
              <span>$0</span>
              <span>$500+</span>
            </div>
          </div>

          {/* Software */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-1">Software</h3>
            {software.map((tech) => (
              <label key={tech} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${selectedTech.includes(tech) ? 'bg-[#8b7fff] border-[#8b7fff]' : 'border border-zinc-600 group-hover:border-zinc-400'}`}>
                  {selectedTech.includes(tech) && (
                    <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-white">
                      <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm text-zinc-400 group-hover:text-zinc-200">{tech}</span>
              </label>
            ))}
          </div>

          {/* Ratings */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-1">Ratings</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${minRating ? 'bg-[#8b7fff] border-[#8b7fff]' : 'border border-zinc-600 group-hover:border-zinc-400'}`}>
                {minRating && (
                  <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-white">
                    <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#8b7fff] text-[#8b7fff]" />
                ))}
                <Star className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-sm text-zinc-400 ml-1">& up</span>
              </div>
            </label>
          </div>

          {/* Clear Filters */}
          <button
            onClick={handleClearFilters}
            className="w-full mt-4 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors"
          >
            Clear Filters
          </button>
        </aside>

        {/* Right Content */}
        <section className="flex-1 flex flex-col">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 p-6 bg-[#171a26] border border-white/5 rounded-2xl">
            <div>
              <h1 className="text-xl font-medium text-white mb-1">Browse All Projects</h1>
              <p className="text-sm text-zinc-400">Showing 1,458 premium assets</p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <span className="text-sm text-zinc-400">Sort by:</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-[#1b1e2b] border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none cursor-pointer hover:border-white/20 transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#171a26] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#8b7fff]/30 transition-all">
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Price Tag */}
                  <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium text-sm px-2.5 py-1 rounded-lg shadow-xl">
                    ${project.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 bg-white/5 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                      <span className="text-xs font-medium text-blue-400">{project.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-4 line-clamp-1 group-hover:text-[#8b7fff] transition-colors cursor-pointer">
                    {project.title}
                  </h3>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-sm text-zinc-400">{project.sales.toLocaleString()} Sales</span>
                    <div className="flex items-center gap-1.5">
                      {project.tech.map((t, idx) => (
                        <div key={idx} className="w-6 h-6 rounded bg-black/30 border border-white/5 flex items-center justify-center" title={t}>
                           {getTechIcon(t)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-12 mb-8">
            <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-[#8b7fff] text-white font-medium shadow-lg shadow-[#8b7fff]/20">
              1
            </button>
            <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
              3
            </button>
            <span className="text-zinc-500 px-2">...</span>
            <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
              146
            </button>
            <button className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}
