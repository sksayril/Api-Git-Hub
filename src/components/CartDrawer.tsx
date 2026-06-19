"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle } from "lucide-react";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const [isCheckingOut, setCheckingOut] = useState(false);
  const [checkoutSuccess] = useState(false);
  const router = useRouter();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckingOut(true);
    setCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => !isCheckingOut && !checkoutSuccess && setCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#0e1117] border-l border-white/5 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <h3 className="font-display font-bold text-lg text-white">Your Shopping Cart</h3>
          <button
            onClick={() => setCartOpen(false)}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
            disabled={isCheckingOut || checkoutSuccess}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {checkoutSuccess ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 animate-bounce">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h4 className="font-display font-bold text-xl text-white">Order Successful!</h4>
              <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                Thank you for your purchase. Your digital assets are ready for download in your dashboard.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-zinc-500">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-zinc-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h4 className="font-display font-semibold text-base text-zinc-300">Your cart is empty</h4>
              <p className="text-zinc-500 text-xs max-w-xs">
                Explore the marketplace and add premium design systems or code kits to your cart.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-white/5 bg-white/2 p-4 transition-colors hover:border-white/10"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-bold text-sm text-zinc-100 line-clamp-1">
                        {item.title}
                      </h4>
                      <span className="font-display font-semibold text-sm text-zinc-300">
                        ${item.price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-lg border border-white/10 bg-black/40 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          disabled={isCheckingOut}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          disabled={isCheckingOut}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer p-1"
                        disabled={isCheckingOut}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && !checkoutSuccess && (
          <div className="border-t border-white/5 px-6 py-6 flex flex-col gap-4 bg-[#0e1117]/90">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm font-medium">Subtotal</span>
              <span className="font-display font-bold text-xl text-white">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full h-12 flex items-center justify-center rounded-xl bg-brand-primary text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isCheckingOut ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Going to Checkout...
                </div>
              ) : (
                "Checkout Now"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
