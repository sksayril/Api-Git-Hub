"use client";

import Link from "next/link";
import { Package, ShoppingCart, Bell, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const { cartCount, setCartOpen } = useCart();

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
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/explore" className="text-sm font-medium text-white hover:text-brand-accent transition-colors">
            Browse
          </Link>
          <Link href="/explore" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Marketplace
          </Link>
          <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Community
          </Link>
          <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Support
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Cart Icon trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[8px] font-bold text-white shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications Bell */}
          <button className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 flex h-1.5 w-1.5 rounded-full bg-brand-accent" />
          </button>

          {/* Sell button */}
          <button className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-brand-primary px-4 text-xs font-semibold text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all active:scale-95 cursor-pointer">
            List Project
          </button>

          {/* User Profile Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-brand-primary/40 to-brand-accent/40 border border-white/10 text-brand-accent cursor-pointer hover:border-brand-accent transition-colors">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Slide-over cart list */}
      <CartDrawer />
    </header>
  );
}
