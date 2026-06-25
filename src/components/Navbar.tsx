"use client";

import Link from "next/link";
import Image from "next/image";
import CartDrawer from "@/components/CartDrawer";
import NavLinks from "@/components/NavLinks";
import NavActions from "@/components/NavActions";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0e1117]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
        
        {/* Left Side Logo & Branding */}
        <Link href="/" aria-label="Go to home" className="flex items-center gap-2 group">
          <Image
            src="/images/api_github_logo.png"
            alt="Api GitHub logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-brand-primary/20 transition-opacity group-hover:opacity-90"
          />
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
