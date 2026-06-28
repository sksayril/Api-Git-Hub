"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingCart,
  Bell,
  User,
  Shield,
  Lock,
  CreditCard,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import AuthOverlay from "@/components/AuthOverlay";

/* ------------------------------------------------------------------ */
/* Promo Codes                                                          */
/* ------------------------------------------------------------------ */
const PROMO_CODES: Record<string, number> = {
  LUMINA20: 0.2,
  SAVE10: 0.1,
  PROJECTHUB15: 0.15,
};

const VAT_RATE = 0.05;

/* ------------------------------------------------------------------ */
/* Fallback order item (shown when cart is empty — matches screenshot) */
/* ------------------------------------------------------------------ */
const FALLBACK_ITEM = {
  id: "lumina-saas-dashboard",
  title: "Lumina SaaS Dashboard",
  subtitle: "Commercial License",
  price: 129,
  image: "/images/lumina_dashboard.png",
  quantity: 1,
};

/* ------------------------------------------------------------------ */
/* Payment method icons (inline SVGs to avoid lucide compatibility)    */
/* ------------------------------------------------------------------ */
function StripeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7zm2 0v10h16V7H4zm2 3h4v2H6v-2zm0 4h8v2H6v-2z" />
    </svg>
  );
}
function PayPalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M7.076 21.337H4.28a.641.641 0 0 1-.633-.74L6.26 3.177a.771.771 0 0 1 .765-.666h5.844c2.44 0 4.168.587 5.129 1.743.923 1.107 1.084 2.567.476 4.34-.01.032-.02.065-.03.097C17.144 11.83 14.7 13 11.518 13H9.467a.892.892 0 0 0-.882.756l-.509 3.581zm9.91-14.26c-.623 2.806-2.695 4.186-6.088 4.186H8.935l1.07-6.783h3.143c2.3 0 3.476.856 3.839 2.596z" />
    </svg>
  );
}
function RazorpayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="3" width="6" height="6" rx="1" opacity="0.6" />
      <rect x="15" y="3" width="6" height="6" rx="1" opacity="0.3" />
      <rect x="3" y="9" width="6" height="6" rx="1" opacity="0.6" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <rect x="15" y="9" width="6" height="6" rx="1" opacity="0.6" />
      <rect x="3" y="15" width="6" height="6" rx="1" opacity="0.3" />
      <rect x="9" y="15" width="6" height="6" rx="1" opacity="0.6" />
      <rect x="15" y="15" width="6" height="6" rx="1" />
    </svg>
  );
}

type PaymentMethod = "stripe" | "paypal" | "razorpay";

/* ================================================================== */
/* Main Checkout Page                                                   */
/* ================================================================== */
export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, cartCount, setCartOpen, clearCart } = useCart();

  /* ---- Auth State ---- */
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  /* ---- Form State ---- */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [upiId, setUpiId] = useState("");

  /* ---- Payment Method ---- */
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");

  /* ---- Promo Code ---- */
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  /* ---- Order Success ---- */
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
          setFullName(data.user.name || "");
          setEmail(data.user.email || "");
        }
      })
      .catch(() => {})
      .finally(() => setCheckingAuth(false));
  }, []);

  /* ---- Compute order items (cart or fallback) ---- */
  const orderItems =
    cartItems.length > 0
      ? cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          subtitle: "Commercial License",
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        }))
      : [FALLBACK_ITEM];

  const subtotal =
    cartItems.length > 0
      ? cartTotal
      : FALLBACK_ITEM.price * FALLBACK_ITEM.quantity;

  const tax = subtotal * VAT_RATE;
  const discount = subtotal * promoDiscount;
  const total = subtotal + tax - discount;

  /* ---- Format card number with spaces every 4 digits ---- */
  const handleCardNumber = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 16);
    setCardNumber(clean.replace(/(.{4})/g, "$1 ").trim());
  };

  /* ---- Format expiry as MM / YY ---- */
  const handleExpiry = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    if (clean.length >= 3) {
      setExpiry(clean.slice(0, 2) + " / " + clean.slice(2));
    } else {
      setExpiry(clean);
    }
  };

  /* ---- Apply promo code ---- */
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code] !== undefined) {
      setPromoDiscount(PROMO_CODES[code]);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoDiscount(0);
      setPromoApplied(false);
      setPromoError("Invalid promo code. Try LUMINA20");
    }
  };

  /* ---- Complete purchase ---- */
  const handleCompletePurchase = async () => {
    if (!fullName || !email || !phone) {
      alert("Please fill out all billing details.");
      return;
    }

    setIsProcessing(true);
    try {
      const billingDetails = { fullName, email, phone };
      const items = orderItems.map((item) => ({
        projectId: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      }));

      const payload = {
        billingDetails,
        items,
        subtotal,
        tax,
        discount,
        total,
        paymentMethod,
        paymentDetails: paymentMethod === "stripe"
          ? { cardNumber }
          : paymentMethod === "paypal"
          ? { paypalEmail }
          : { upiId }
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Order placement failed.");
      }

      setOrderSuccess(true);
      setTimeout(() => {
        clearCart();
        router.push("/dashboard");
      }, 3000);
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0e1117] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <AuthOverlay
        onSuccess={(user) => {
          setCurrentUser(user);
          setFullName(user.name);
          setEmail(user.email);
        }}
      />
    );
  }

  /* ================================================================ */
  /* SUCCESS OVERLAY                                                   */
  /* ================================================================ */
  if (orderSuccess) {
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0e1117] text-white">
        <div className="flex flex-col items-center gap-6 text-center px-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 animate-bounce">
            <CheckCircle className="h-14 w-14" />
          </div>
          <h1 className="font-display font-bold text-4xl text-white">
            Order Successful!
          </h1>
          <p className="text-zinc-400 text-base max-w-sm leading-relaxed">
            Thank you for your purchase. Your digital assets are now ready for
            download in your dashboard.
          </p>
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
            Redirecting to home…
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /* MAIN LAYOUT                                                       */
  /* ================================================================ */
  return (
    <div className="flex flex-col min-h-screen bg-[#0e1117] text-zinc-100 font-sans antialiased">
      {/* ---- Navbar ---- */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0e1117]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent shadow-lg shadow-brand-primary/20">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-brand-accent">
              Project<span className="text-brand-primary">Hub</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/explore"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/explore"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Explore
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              License
            </Link>
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[8px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 flex h-1.5 w-1.5 rounded-full bg-brand-accent" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-brand-primary/40 to-brand-accent/40 border border-white/10 text-brand-accent cursor-pointer hover:border-brand-accent transition-colors">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
        <CartDrawer />
      </header>

      {/* ---- Page Body ---- */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 sm:px-8 py-12">
        {/* Page Title */}
        <h1 className="font-display font-bold text-2xl text-white mb-8">
          Secure Checkout
        </h1>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* ============================================================ */}
          {/* LEFT COLUMN                                                   */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-6">
            {/* ---- Customer Information Card ---- */}
            <div className="rounded-2xl border border-white/8 bg-[#141720] p-7">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-5 w-5 text-zinc-400" />
                <h2 className="font-display font-bold text-xl text-white">
                  Customer Information
                </h2>
              </div>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                    Full Name
                  </label>
                  <input
                    id="checkout-full-name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                    Email Address
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
                  />
                </div>
              </div>

              {/* Phone row */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                  Phone Number
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
                />
              </div>
            </div>

            {/* ---- Payment Method Card ---- */}
            <div className="rounded-2xl border border-white/8 bg-[#141720] p-7">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="h-5 w-5 text-zinc-400" />
                <h2 className="font-display font-bold text-xl text-white">
                  Payment Method
                </h2>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {/* Stripe */}
                <button
                  id="payment-tab-stripe"
                  onClick={() => setPaymentMethod("stripe")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border py-4 px-3 transition-all cursor-pointer ${
                    paymentMethod === "stripe"
                      ? "border-brand-primary bg-brand-primary/10 text-white"
                      : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <StripeIcon />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Stripe
                  </span>
                </button>

                {/* PayPal */}
                <button
                  id="payment-tab-paypal"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border py-4 px-3 transition-all cursor-pointer ${
                    paymentMethod === "paypal"
                      ? "border-brand-primary bg-brand-primary/10 text-white"
                      : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <PayPalIcon />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    PayPal
                  </span>
                </button>

                {/* Razorpay */}
                <button
                  id="payment-tab-razorpay"
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border py-4 px-3 transition-all cursor-pointer ${
                    paymentMethod === "razorpay"
                      ? "border-brand-primary bg-brand-primary/10 text-white"
                      : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <RazorpayIcon />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Razorpay
                  </span>
                </button>
              </div>

              {/* Payment Fields — Stripe */}
              {paymentMethod === "stripe" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        id="stripe-card-number"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={(e) => handleCardNumber(e.target.value)}
                        maxLength={19}
                        className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors font-mono"
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                        Expiry Date
                      </label>
                      <input
                        id="stripe-expiry"
                        type="text"
                        placeholder="MM / YY"
                        value={expiry}
                        onChange={(e) => handleExpiry(e.target.value)}
                        maxLength={7}
                        className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                        CVC
                      </label>
                      <input
                        id="stripe-cvc"
                        type="text"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) =>
                          setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                        }
                        maxLength={4}
                        className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Fields — PayPal */}
              {paymentMethod === "paypal" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                      PayPal Email
                    </label>
                    <input
                      id="paypal-email"
                      type="email"
                      placeholder="your@paypal.com"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-zinc-500">
                    You will be redirected to PayPal to complete your payment
                    securely.
                  </p>
                </div>
              )}

              {/* Payment Fields — Razorpay */}
              {paymentMethod === "razorpay" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 tracking-widest uppercase">
                      UPI ID / VPA
                    </label>
                    <input
                      id="razorpay-upi"
                      type="text"
                      placeholder="yourname@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-zinc-500">
                    Supports UPI, Net Banking, cards, and wallets via Razorpay.
                  </p>
                </div>
              )}
            </div>

            {/* ---- Trust Signals Row ---- */}
            <div className="flex flex-wrap items-center gap-6 px-1">
              {[
                { icon: Shield, label: "Secure Checkout" },
                { icon: Lock, label: "SSL Encryption" },
                { icon: CheckCircle, label: "Money Back Guarantee" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-zinc-500"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="text-[11px] font-semibold tracking-widest uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN — Order Summary                                  */}
          {/* ============================================================ */}
          <div className="rounded-2xl border border-white/8 bg-[#141720] p-7 lg:sticky lg:top-28">
            <h2 className="font-display font-bold text-xl text-white mb-6">
              Order Summary
            </h2>

            {/* Order Items */}
            <div className="flex flex-col gap-3 mb-6">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-white/6 bg-white/3 p-3"
                >
                  {/* Thumbnail */}
                  <div
                    className="h-14 w-14 shrink-0 rounded-lg bg-zinc-900 overflow-hidden border border-white/8"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-white truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {item.subtitle}
                    </p>
                    <p className="font-display font-bold text-sm text-white mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="flex flex-col gap-2.5 mb-5 border-t border-white/6 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Subtotal</span>
                <span className="text-sm font-semibold text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Tax (VAT 5%)</span>
                <span className="text-sm font-semibold text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-brand-accent">Discount</span>
                <span className="text-sm font-semibold text-brand-accent">
                  -${discount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo Code Field */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <input
                  id="checkout-promo-code"
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value.toUpperCase());
                    setPromoError("");
                  }}
                  className="flex-1 rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-colors"
                />
                <button
                  id="checkout-apply-promo"
                  onClick={handleApplyPromo}
                  className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-white tracking-widest uppercase hover:border-brand-primary/40 hover:bg-brand-primary/10 transition-all cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="mt-1.5 text-xs text-rose-400">{promoError}</p>
              )}
              {promoApplied && (
                <p className="mt-1.5 text-xs text-emerald-400">
                  ✓ Promo code applied! {Math.round(promoDiscount * 100)}% off
                </p>
              )}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between border-t border-white/6 pt-5 mb-5">
              <span className="font-display font-bold text-lg text-white">
                Total
              </span>
              <span className="font-display font-bold text-2xl text-white">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Complete Purchase Button */}
            <button
              id="checkout-complete-purchase"
              onClick={handleCompletePurchase}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent py-4 text-base font-bold text-white shadow-lg shadow-brand-primary/25 hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing…
                </>
              ) : (
                <>
                  Complete Purchase
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Terms note */}
            <p className="mt-4 text-center text-xs text-zinc-500 leading-relaxed">
              By completing this purchase, you agree to our{" "}
              <Link
                href="/legal"
                className="text-zinc-400 underline underline-offset-2 hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-white/5 bg-[#0e1117] pt-8 pb-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex flex-col gap-1">
            <span className="font-display font-bold text-xs tracking-widest uppercase text-white">
              ProjectHub
            </span>
            <span className="text-xs text-zinc-500">
              © 2024 ProjectHub Marketplace. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-zinc-500 font-medium">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/help-center" className="hover:text-white transition-colors">
              Help Center
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
