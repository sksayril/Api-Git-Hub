"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LivePreviewModal from "@/components/LivePreviewModal";
import { seedProjects, Project } from "@/data/projects";
import { useCart } from "@/context/CartContext";
import {
  Star,
  Eye,
  ShoppingCart,
  Heart,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Sliders,
  Award,
  BookOpen,
  ArrowRight,
  Activity,
  History,
  ChevronDown,
  Check,
  ShieldCheck,
  FileText
} from "lucide-react";

export default function ProjectDetails() {
  const params = useParams();
  const { addToCart } = useCart();

  const projectId = params.id as string;
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Active display gallery image
  const [activeImage, setActiveImage] = useState("");
  // Wishlist toggle state
  const [inWishlist, setInWishlist] = useState(false);
  // Live Preview Modal state
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  // License selection open state
  const [licenseDropdownOpen, setLicenseDropdownOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState("Single License");

  // Fetch project details dynamically on mount
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        if (res.ok && data.project) {
          setProject(data.project);
          setActiveImage(data.project.image || "/images/placeholder.png");
        } else {
          const found = seedProjects.find((p) => p.id === projectId);
          if (found) {
            setProject(found);
            setActiveImage(found.image);
          }
        }
      } catch (error) {
        console.error("Failed to fetch project details, using fallback:", error);
        const found = seedProjects.find((p) => p.id === projectId);
        if (found) {
          setProject(found);
          setActiveImage(found.image);
        }
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      void fetchProjectDetails();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#060612] text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-brand-primary border-t-transparent animate-spin"></div>
          <p className="text-zinc-400 text-sm font-medium">Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0e1117] text-white">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-xl font-bold font-display">Project Not Found</h2>
          <Link href="/explore" className="text-brand-accent text-sm hover:underline">
            Go back to marketplace
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Find 3 similar templates
  const similarProjects = seedProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const handleBuyNow = () => {
    addToCart({
      id: project.id,
      title: project.title,
      price: project.price,
      image: project.image,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#060612] text-zinc-100 font-sans selection:bg-brand-primary selection:text-white relative">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 py-10 flex flex-col gap-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2.5 text-xs text-zinc-500 font-medium text-left">
          <Link href="/explore" className="hover:text-white transition-colors">
            Marketplace
          </Link>
          <span>&gt;</span>
          <Link
            href={`/explore?category=${encodeURIComponent(project.category)}`}
            className="hover:text-white transition-colors"
          >
            {project.category}
          </Link>
          <span>&gt;</span>
          <span className="text-zinc-400 font-semibold">{project.title}</span>
        </nav>

        {/* Hero Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left border-b border-white/5 pb-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="rounded-lg bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-0.5 font-semibold text-brand-accent">
                {project.category}
              </span>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <div className="flex text-brand-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(project.rating) ? "fill-brand-accent text-brand-accent" : "text-zinc-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-white">{project.rating}</span>
                <span>({project.reviewsCount} reviews)</span>
              </div>
              <span className="text-zinc-800">|</span>
              <span className="text-zinc-400 font-medium flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {project.sales} sales
              </span>
            </div>
          </div>
        </div>

        {/* Primary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Left Column: Product Gallery & Content (3/5 layout) */}
          <div className="lg:col-span-3 flex flex-col gap-10 text-left">
            
            {/* Gallery Module */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 shadow-2xl">
                <Image
                  src={activeImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails list */}
              <div className="grid grid-cols-5 gap-3">
                {(project.thumbnails || []).map((thumb: string, idx: number) => {
                  const isActive = activeImage === thumb;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(thumb)}
                      className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-950 border transition-all cursor-pointer ${
                        isActive ? "border-brand-primary ring-2 ring-brand-primary/20 scale-95" : "border-white/5 hover:border-white/20"
                      }`}
                    >
                      <Image
                        src={thumb}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description Accent Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 border-l-4 border-brand-primary pl-4 py-1">
                <h3 className="font-display font-bold text-lg text-white">Premium Dashboard Solution</h3>
              </div>
              
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
                {project.longDescription || project.description}
              </p>

              {/* Highlight grids */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="rounded-2xl border border-white/5 bg-white/2 p-5 flex gap-4 transition-colors hover:border-white/10">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-accent">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-display font-semibold text-sm text-white">Real-time Analytics</span>
                    <span className="text-xs text-zinc-500 leading-normal">
                      Instant data updates with WebSockets integration for live monitoring.
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/2 p-5 flex gap-4 transition-colors hover:border-white/10">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-accent">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <span className="font-display font-semibold text-sm text-white">Adaptive Theming</span>
                    <span className="text-xs text-zinc-500 leading-normal">
                      Seamlessly switch between Dark and Light mode with a single toggle.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="flex flex-col gap-6 border-t border-white/5 pt-8">
              <h3 className="font-display font-bold text-lg text-white">Key Benefits</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2.5 text-left">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-300">
                    <Layers className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="font-display font-semibold text-sm text-zinc-200">Fully Responsive</h4>
                  <p className="text-zinc-500 text-xs leading-normal">
                    Optimized for every device from mobile layouts to ultra-wide desktop monitors.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 text-left">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-300">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="font-display font-semibold text-sm text-zinc-200">SEO Optimized</h4>
                  <p className="text-zinc-500 text-xs leading-normal">
                    Fast loading speed and clean semantic HTML for excellent search indexing.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 text-left">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-zinc-300">
                    <Sliders className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="font-display font-semibold text-sm text-zinc-200">Easy Customization</h4>
                  <p className="text-zinc-500 text-xs leading-normal">
                    Modular variables structure with Tailwind config and CSS stylesheets.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Stack */}
            <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
              <h3 className="font-display font-bold text-lg text-white">Technical Stack</h3>
              <div className="flex flex-wrap gap-2.5">
                {(project.tech || []).map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/5 bg-white/3 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                <span className="rounded-lg border border-white/5 bg-white/3 px-3 py-1.5 text-xs font-semibold text-zinc-300">TypeScript</span>
                <span className="rounded-lg border border-white/5 bg-white/3 px-3 py-1.5 text-xs font-semibold text-zinc-300">JSON API</span>
              </div>
            </div>

            {/* Update History */}
            <div className="flex flex-col gap-6 border-t border-white/5 pt-8">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <History className="h-4.5 w-4.5 text-brand-primary" />
                Update History
              </h3>
              
              <div className="relative border-l border-white/5 pl-6 ml-2 flex flex-col gap-6">
                {(project.updates || []).map((log: any, idx: number) => (
                  <div key={idx} className="relative text-left">
                    {/* Circle Indicator */}
                    <span className="absolute left-[-31px] top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-brand-primary ring-4 ring-[#060612]" />
                    
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-sm text-zinc-200">{log.version}</span>
                        <span className="text-[10px] text-zinc-500 font-semibold">{log.date}</span>
                      </div>
                      <ul className="flex flex-col gap-1.5 text-xs text-zinc-400 pl-4 list-disc font-medium">
                        {(log.changes || []).map((change: string, i: number) => (
                          <li key={i}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                {(!project.updates || project.updates.length === 0) && (
                  <p className="text-zinc-500 text-xs italic">No updates logged yet.</p>
                )}
              </div>
            </div>

            {/* User Reviews */}
            <div className="flex flex-col gap-6 border-t border-white/5 pt-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white">What users are saying</h3>
                <span className="text-xs text-brand-accent font-semibold hover:underline cursor-pointer">
                  View All {project.reviewsCount || 0} Reviews
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(project.reviews || []).map((review: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/5 bg-white/2 p-6 flex flex-col gap-4 text-left hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-accent text-xs font-bold text-white shadow">
                        {review.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-100">{review.name}</span>
                        <div className="flex text-brand-accent mt-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-2.5 w-2.5 fill-brand-accent text-brand-accent" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
                {(!project.reviews || project.reviews.length === 0) && (
                  <p className="text-zinc-500 text-xs italic col-span-2">No reviews yet. Be the first to leave a review!</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Spec card & technical specs (2/5 layout) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Purchase Panel */}
            <div className="glass-panel rounded-3xl border border-white/10 p-6 flex flex-col gap-5 text-left shadow-xl relative">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{selectedLicense}</span>
                  <div className="flex flex-col items-end text-right">
                    <div className="flex items-baseline gap-2">
                      {project.actualPrice && project.actualPrice > project.price && (
                        <span className="text-rose-500 font-bold text-2xl font-display">
                          -{Math.round(((project.actualPrice - project.price) / project.actualPrice) * 100)}%
                        </span>
                      )}
                      <span className="font-display font-bold text-4xl text-white">
                        ${(project.price || 0).toFixed(2)}
                      </span>
                    </div>
                    {project.actualPrice && project.actualPrice > project.price && (
                      <span className="text-zinc-500 text-xs mt-0.5">
                        M.R.P.: <span className="line-through">${project.actualPrice.toFixed(2)}</span>
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Select License Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setLicenseDropdownOpen(!licenseDropdownOpen)}
                    className="flex items-center gap-1 text-[11px] text-brand-accent font-semibold hover:underline cursor-pointer ml-auto"
                  >
                    <span>Select option</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  
                  {licenseDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#141720] p-1.5 shadow-2xl z-20">
                      {["Single License", "Extended License", "Unlimited License"].map((lic) => (
                        <button
                          key={lic}
                          onClick={() => {
                            setSelectedLicense(lic);
                            setLicenseDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          {lic}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleBuyNow}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-xs font-semibold text-white shadow-lg shadow-brand-primary/20 hover:from-brand-primary-dark hover:to-brand-primary transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Buy Now
                </button>

                <button
                  onClick={() => setPreviewProject(project)}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 text-xs font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-all active:scale-95 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  Live Demo
                </button>
                
                <button
                  onClick={() => setInWishlist(!inWishlist)}
                  className={`w-full h-12 flex items-center justify-center gap-2 rounded-xl border px-6 text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                    inWishlist
                      ? "border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/15"
                      : "border-white/5 bg-white/1 text-zinc-400 hover:bg-white/5 hover:text-zinc-300"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${inWishlist ? "fill-rose-500 text-rose-500 animate-pulse" : ""}`} />
                  {inWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>

              {/* Guarantees list */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-4 mt-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Award className="h-4.5 w-4.5 text-brand-accent shrink-0" />
                  <span>Quality verified by ProjectHub</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4.5 w-4.5 text-brand-accent shrink-0" />
                  <span>Future updates included</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-brand-accent shrink-0" />
                  <span>6 months support from author</span>
                </div>
              </div>
            </div>

            {/* Technical Details panel */}
            <div className="glass-panel rounded-3xl border border-white/5 p-6 flex flex-col gap-4 text-left">
              <h3 className="font-display font-semibold text-xs tracking-wider text-zinc-400 uppercase">
                Technical Details
              </h3>
              
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Last updated
                  </span>
                  <span className="font-semibold text-zinc-300">{project.details?.lastUpdated}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Released
                  </span>
                  <span className="font-semibold text-zinc-300">{project.details?.released}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    High Resolution
                  </span>
                  <span className="font-semibold text-zinc-300">{project.details?.highResolution ? "Yes" : "No"}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    Documentation
                  </span>
                  <span className="font-semibold text-zinc-300 hover:text-brand-accent hover:underline cursor-pointer">
                    {project.details?.documentation}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    File types
                  </span>
                  <span className="font-semibold text-zinc-300">{(project.details?.fileTypes || []).join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Author Profile card */}
            <div className="rounded-2xl border border-white/5 bg-white/2 p-5 flex items-center gap-4 text-left transition-colors hover:border-white/10">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent text-sm font-bold text-white shadow-md">
                {project.creator?.avatar}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Created by</span>
                <span className="font-display font-bold text-zinc-200">{project.creator?.name}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Similar Templates Showcase */}
        <div className="flex flex-col gap-8 border-t border-white/5 pt-12 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">Similar Templates</h3>
            <Link
              href="/explore"
              className="text-xs text-brand-accent font-semibold flex items-center gap-1 hover:underline"
            >
              Explore More
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProjects.map((similar) => (
              <div
                key={similar.id}
                className="glass-panel glass-panel-hover flex flex-col rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
              >
                {/* Related Media */}
                <Link
                  href={`/projects/${similar.id}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 block"
                >
                  <Image
                    src={similar.image}
                    alt={similar.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </Link>

                {/* Related Copy */}
                <div className="flex flex-col p-5 gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/projects/${similar.id}`}
                      className="font-display font-bold text-sm text-zinc-100 group-hover:text-brand-accent transition-colors block text-left"
                    >
                      {similar.title}
                    </Link>
                    <span className="font-display font-bold text-sm text-zinc-300">
                      ${similar.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-3">
                    <span className="font-medium text-brand-accent">{similar.category}</span>
                    <div className="flex items-center gap-0.5 font-bold">
                      <Star className="h-3 w-3 fill-brand-accent text-brand-accent" />
                      <span>{similar.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
