"use client";

import { ShoppingCart, Bell, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function NavActions() {
  const { cartCount, setCartOpen } = useCart();

  return (
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
      <Link href="/list-project" className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-brand-primary px-4 text-xs font-semibold text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all active:scale-95 cursor-pointer">
        List Project
      </Link>

      {/* User Profile Avatar */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-brand-primary/40 to-brand-accent/40 border border-white/10 text-brand-accent cursor-pointer hover:border-brand-accent transition-colors">
        <User className="h-4 w-4" />
      </div>
    </div>
  );
}
