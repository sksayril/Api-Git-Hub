"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LivePreviewModal from "@/components/LivePreviewModal";
import { useCart } from "@/context/CartContext";
import { seedProjects, Project } from "@/data/projects";
import {
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
  ShoppingCart,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Explore() {
  const { addToCart } = useCart();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Load category and search query filters from URL parameter on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) {
        setSelectedCategory(cat);
      }
      const q = params.get("query");
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const handleTechChange = (techName: string) => {
    setSelectedTech((prev) =>
      prev.includes(techName) ? prev.filter((t) => t !== techName) : [...prev, techName]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedTech([]);
    setPriceRange(1000);
    setMinRating(false);
    setSortOption("newest");
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return seedProjects.filter((project) => {
      // Search matches
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.longDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category matches
      const matchesCategory =
        selectedCategory === "All Categories" || project.category === selectedCategory;

      // Tech Stack matches (logical AND: project must contain all selected tech tags)
      const matchesTech =
        selectedTech.length === 0 || selectedTech.every((t) => project.tech.includes(t));

      // Price matches
      const matchesPrice = project.price <= priceRange;

      // Rating matches
      const matchesRating = !minRating || project.rating >= 4.0;

      return matchesSearch && matchesCategory && matchesTech && matchesPrice && matchesRating;
    });
  }, [searchQuery, selectedCategory, selectedTech, priceRange, minRating]);

  // Sorting Logic
  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    switch (sortOption) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "popular":
        return list.sort((a, b) => b.sales - a.sales);
      default: // newest/default - simulate by original array index order or ID
        return list;
    }
  }, [filteredProjects, sortOption]);

  // Pagination Logic
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProjects, currentPage]);

  const totalPages = Math.max(1, Math.ceil(sortedProjects.length / ITEMS_PER_PAGE));

  return (
    <div className="flex flex-col min-h-screen bg-[#0e1117] text-zinc-100 font-sans selection:bg-brand-primary selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar: Filters */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-6 border border-white/5 flex flex-col gap-6 text-left">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <SlidersHorizontal className="h-4.5 w-4.5 text-brand-primary" />
                  Filters
                </h3>
                <span className="text-[10px] text-zinc-500 font-semibold">Refine your search</span>
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-3">
                <h4 className="font-display font-semibold text-xs text-zinc-400 tracking-wider uppercase">
                  Categories
                </h4>
                <div className="flex flex-col gap-1.5">
                  {["All Categories", "Web Templates", "Mobile Apps", "AI Tools"].map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setCurrentPage(1);
                        }}
                        className={`w-full h-10 px-4 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-brand-primary/15 text-brand-accent border border-brand-primary/20"
                            : "text-zinc-400 hover:bg-white/3 hover:text-white border border-transparent"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technology Stack */}
              <div className="flex flex-col gap-3">
                <h4 className="font-display font-semibold text-xs text-zinc-400 tracking-wider uppercase">
                  Technology Stack
                </h4>
                <div className="flex flex-col gap-2.5">
                  {["React / Next.js", "Flutter", "Node.js"].map((tech) => (
                    <label
                      key={tech}
                      className="flex items-center gap-2.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTech.includes(tech)}
                        onChange={() => handleTechChange(tech)}
                        className="rounded border-zinc-700 bg-black/40 text-brand-primary focus:ring-brand-primary/30 h-4 w-4 cursor-pointer"
                      />
                      <span>{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-semibold text-xs text-zinc-400 tracking-wider uppercase">
                    Price Range
                  </h4>
                  <span className="text-xs font-bold text-brand-accent">${priceRange === 1000 ? "1000+" : priceRange}</span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-brand-primary cursor-pointer bg-zinc-800 rounded-lg h-1.5"
                />
                
                <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
                  <span>$0</span>
                  <span>$1000+</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="flex flex-col gap-3">
                <h4 className="font-display font-semibold text-xs text-zinc-400 tracking-wider uppercase">
                  Minimum Rating
                </h4>
                <label className="flex items-center gap-2.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={minRating}
                    onChange={(e) => {
                      setMinRating(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded border-zinc-700 bg-black/40 text-brand-primary focus:ring-brand-primary/30 h-4 w-4 cursor-pointer"
                  />
                  <div className="flex items-center gap-1">
                    <div className="flex text-brand-accent">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-brand-accent text-brand-accent" />
                      ))}
                    </div>
                    <span>4.0+</span>
                  </div>
                </label>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={handleClearFilters}
                className="w-full h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/3 text-xs font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer active:scale-98"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Right Side: Main Content */}
          <section className="lg:col-span-3 flex flex-col gap-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1 text-left w-full sm:w-auto">
                <h2 className="font-display text-2xl font-bold text-white">Explore Projects</h2>
                <p className="text-xs text-zinc-500">
                  Showing {sortedProjects.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}-
                  {Math.min(currentPage * ITEMS_PER_PAGE, sortedProjects.length)} of {sortedProjects.length} premium projects
                </p>
              </div>

              {/* Filter inputs / toggles */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                {/* Search Bar Input */}
                <div className="relative flex items-center bg-black/40 border border-white/5 rounded-xl px-3 py-1.5 max-w-[200px] w-full focus-within:border-brand-primary/30 transition-all">
                  <Search className="h-4 w-4 text-zinc-500 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search..."
                    className="w-full bg-transparent border-0 pl-2 text-xs text-white placeholder-zinc-500 focus:ring-0 focus:outline-none"
                  />
                </div>

                {/* Sort Option Dropdown */}
                <div className="relative flex items-center bg-black/40 border border-white/5 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-white/2 transition-colors select-none text-xs">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-transparent border-0 text-xs font-semibold text-zinc-300 pr-4 focus:ring-0 focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="newest" className="bg-[#0e1117]">Newest First</option>
                    <option value="price-asc" className="bg-[#0e1117]">Price: Low to High</option>
                    <option value="price-desc" className="bg-[#0e1117]">Price: High to Low</option>
                    <option value="popular" className="bg-[#0e1117]">Most Popular</option>
                  </select>
                  <ChevronDown className="absolute right-3 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                </div>

                {/* Grid / List View Toggle */}
                <div className="flex items-center bg-black/40 border border-white/5 rounded-xl p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === "grid" ? "bg-white/5 text-brand-accent" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === "list" ? "bg-white/5 text-brand-accent" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty Results State */}
            {paginatedProjects.length === 0 ? (
              <div className="glass-panel rounded-3xl py-20 px-6 border border-white/5 flex flex-col items-center gap-4 text-center">
                <span className="text-zinc-500 text-sm">No projects match your active filter settings.</span>
                <button
                  onClick={handleClearFilters}
                  className="h-10 px-6 rounded-xl bg-brand-primary text-xs font-semibold text-white hover:bg-brand-primary-dark transition-colors active:scale-95"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid Layout */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="glass-panel glass-panel-hover flex flex-col rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
                  >
                    {/* Card Media */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 block"
                    >
                      <span className="absolute top-3 left-3 z-10 rounded-lg bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-brand-accent border border-white/5">
                        {project.category}
                      </span>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    </Link>

                    {/* Card Copy */}
                    <div className="flex flex-col flex-1 p-5 gap-4">
                      <div className="flex flex-col gap-1 text-left">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/projects/${project.id}`}
                            className="font-display font-bold text-sm text-zinc-100 group-hover:text-brand-accent transition-colors line-clamp-1 block"
                          >
                            {project.title}
                          </Link>
                          <span className="font-display font-semibold text-sm text-zinc-300 shrink-0">
                            ${project.price}
                          </span>
                        </div>
                        
                        {/* Rating stars & sales */}
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium mt-1">
                          <div className="flex items-center gap-0.5 text-brand-accent">
                            <Star className="h-3 w-3 fill-brand-accent text-brand-accent" />
                            <span className="font-semibold">{project.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{project.sales} sales</span>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex gap-2 border-t border-white/5 pt-4 mt-auto">
                        <button
                          onClick={() => setPreviewProject(project)}
                          className="flex-1 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/3 text-[10px] font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                        >
                          Live Preview
                        </button>
                        <Link
                          href={`/projects/${project.id}`}
                          className="flex-1 h-9 flex items-center justify-center rounded-lg bg-brand-primary text-[10px] font-semibold text-white hover:bg-brand-primary-dark transition-colors cursor-pointer"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List Layout */
              <div className="flex flex-col gap-4">
                {paginatedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="glass-panel glass-panel-hover flex flex-col sm:flex-row rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
                  >
                    {/* List Media */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="relative w-full sm:w-48 aspect-[16/10] shrink-0 bg-zinc-950 block"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* List Copy */}
                    <div className="flex-1 flex flex-col sm:flex-row justify-between p-5 gap-4">
                      <div className="flex flex-col gap-1.5 text-left flex-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-accent">
                          {project.category}
                        </span>
                        <Link
                          href={`/projects/${project.id}`}
                          className="font-display font-bold text-base text-zinc-100 group-hover:text-brand-accent transition-colors block text-left"
                        >
                          {project.title}
                        </Link>
                        <p className="text-zinc-500 text-xs line-clamp-1 max-w-md">
                          {project.longDescription}
                        </p>
                        
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium mt-1">
                          <div className="flex items-center gap-0.5 text-brand-accent">
                            <Star className="h-3 w-3 fill-brand-accent text-brand-accent" />
                            <span className="font-semibold">{project.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{project.sales} sales</span>
                        </div>
                      </div>

                      {/* List Price & Actions */}
                      <div className="flex flex-col sm:items-end justify-between gap-4 shrink-0">
                        <span className="font-display font-bold text-xl text-white">
                          ${project.price}
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => setPreviewProject(project)}
                            className="h-9 px-4 flex items-center justify-center rounded-lg border border-white/10 bg-white/3 text-[10px] font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                          >
                            Live Preview
                          </button>
                          <Link
                            href={`/projects/${project.id}`}
                            className="h-9 px-4 flex items-center justify-center rounded-lg bg-brand-primary text-[10px] font-semibold text-white hover:bg-brand-primary-dark transition-colors cursor-pointer"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-9 w-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-brand-primary/20 text-brand-accent border border-brand-primary/30"
                          : "border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 rounded-lg border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />

      {/* Live Preview Simulated Frame Overlay */}
      <LivePreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </div>
  );
}
