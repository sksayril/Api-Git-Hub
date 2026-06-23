"use client";

import Link from "next/link";
import { Package } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import NavLinks from "@/components/NavLinks";
import NavActions from "@/components/NavActions";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0e1117]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
        
        {/* Left Side Logo & Branding */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent shadow-lg shadow-brand-primary/20">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-brand-accent">
            Project<span className="text-brand-primary">Hub</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <NavLinks />

        {/* Right Actions */}
        <NavActions />
      </div>

      {/* Slide-over cart list */}
      <CartDrawer />
    </header>
  );
}
