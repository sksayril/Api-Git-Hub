"use client";

import Link from "next/link";
import { Package, Globe, Share2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0e1117] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Branding Column */}
        <div className="flex flex-col gap-4 text-left">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent shadow-md shadow-brand-primary/20">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-brand-accent">
              Project<span className="text-brand-primary">Hub</span>
            </span>
          </Link>
          
          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs">
            The premier digital marketplace for SaaS templates, UI kits, and professional design assets.
          </p>
        </div>

        {/* Marketplace Links */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-display font-semibold text-xs text-zinc-400 tracking-wider uppercase">
            Marketplace
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-zinc-500 font-medium">
            <li><Link href="/explore" className="hover:text-white transition-colors">Browse Items</Link></li>
            <li><Link href="/explore" className="hover:text-white transition-colors">Newest Releases</Link></li>
            <li><Link href="/explore" className="hover:text-white transition-colors">Top Sellers</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-display font-semibold text-xs text-zinc-400 tracking-wider uppercase">
            Company
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-zinc-500 font-medium">
            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-display font-semibold text-xs text-zinc-400 tracking-wider uppercase">
            Legal
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-zinc-500 font-medium">
            <li><Link href="#" className="hover:text-white transition-colors">License</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: aligned with screenshot */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 border-t border-white/5 pt-8 text-center flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500">
        
        {/* Left Side Copyright */}
        <span>© 2023 ProjectHub Marketplace. All rights reserved.</span>

        {/* Right Side Social Links */}
        <div className="flex items-center justify-center gap-4">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">
            <Globe className="h-4.5 w-4.5" />
          </a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">
            <Share2 className="h-4.5 w-4.5" />
          </a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">
            <Mail className="h-4.5 w-4.5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
