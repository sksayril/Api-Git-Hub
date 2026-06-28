"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Search, ShoppingCart, User, CreditCard, DollarSign } from "lucide-react";

interface OrderItem {
  projectId: string;
  title: string;
  price: number;
  image: string;
}

interface BillingDetails {
  fullName: string;
  email: string;
  phone: string;
}

interface AdminOrder {
  _id: string;
  user: { name: string; email: string } | null;
  billingDetails: BillingDetails;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "stripe" | "paypal" | "razorpay";
  paymentDetails: {
    cardNumber?: string;
    upiId?: string;
    paypalEmail?: string;
  };
  status: "completed" | "pending" | "failed";
  createdAt: string;
}

export default function AdminOrdersView() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to load orders.");
      }
      setOrders(data.orders || []);
    } catch (err: any) {
      setError(err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const billing = order.billingDetails;
      const searchStr = `${billing.fullName} ${billing.email} ${billing.phone} ${order.paymentMethod}`.toLowerCase();
      return !query || searchStr.includes(query.toLowerCase());
    });
  }, [orders, query]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderVal = orders.length > 0 ? totalRevenue / orders.length : 0;
    return {
      totalCount: orders.length,
      revenue: totalRevenue,
      average: avgOrderVal,
    };
  }, [orders]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Orders</h1>
        <p className="mt-1 text-sm text-zinc-500">
          View customer orders, transaction totals, billing details, and payment histories.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-5 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-white">{stats.totalCount}</p>
            <p className="text-xs uppercase tracking-wider text-zinc-500 mt-1">Total Orders</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-5 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-white">${stats.revenue.toFixed(2)}</p>
            <p className="text-xs uppercase tracking-wider text-zinc-500 mt-1">Total Revenue</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-5 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-white">${stats.average.toFixed(2)}</p>
            <p className="text-xs uppercase tracking-wider text-zinc-500 mt-1">Average Order Value</p>
          </div>
          <div className="p-3 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-white/8 bg-[#111827] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500/40"
            placeholder="Search orders by customer info or payment..."
          />
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-8 text-center text-sm text-zinc-500">
          <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-blue-400" />
          Loading orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-8 text-center text-sm text-zinc-500">
          No orders found matching the filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-white/6 bg-[#111827] p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 space-y-4">
                  {/* Header Row */}
                  <div className="flex flex-wrap items-center gap-3 justify-between pb-3 border-b border-white/5">
                    <div>
                      <p className="text-xs text-zinc-500 font-mono">Order ID: {order._id}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                      {order.status}
                    </span>
                  </div>

                  {/* Customer & Billing Details */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-zinc-400">
                        <User className="w-4 h-4" />
                        <h4 className="text-xs font-semibold uppercase tracking-wider">Billing Customer</h4>
                      </div>
                      <p className="text-sm font-semibold text-white">{order.billingDetails.fullName}</p>
                      <p className="text-xs text-zinc-400 mt-1">{order.billingDetails.email}</p>
                      <p className="text-xs text-zinc-400">{order.billingDetails.phone}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2 text-zinc-400">
                        <CreditCard className="w-4 h-4" />
                        <h4 className="text-xs font-semibold uppercase tracking-wider">Payment Details</h4>
                      </div>
                      <p className="text-sm font-semibold text-white capitalize">{order.paymentMethod}</p>
                      {order.paymentMethod === "stripe" && order.paymentDetails?.cardNumber && (
                        <p className="text-xs text-zinc-400 mt-1 font-mono">Card: **** **** **** {order.paymentDetails.cardNumber.slice(-4)}</p>
                      )}
                      {order.paymentMethod === "paypal" && order.paymentDetails?.paypalEmail && (
                        <p className="text-xs text-zinc-400 mt-1">Paypal: {order.paymentDetails.paypalEmail}</p>
                      )}
                      {order.paymentMethod === "razorpay" && order.paymentDetails?.upiId && (
                        <p className="text-xs text-zinc-400 mt-1 font-mono">UPI: {order.paymentDetails.upiId}</p>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Purchased Items ({order.items.length})</h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {order.items.map((item) => (
                        <div key={item.projectId} className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-[#0b1120]">
                          <div
                            className="h-10 w-10 shrink-0 rounded-lg bg-zinc-900 overflow-hidden border border-white/8"
                            style={{
                              backgroundImage: `url(${item.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Total Panel */}
                <div className="w-full lg:w-64 rounded-2xl border border-white/8 bg-[#0b1120] p-5 self-stretch flex flex-col justify-between">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Subtotal</span>
                      <span className="text-white">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Tax</span>
                      <span className="text-white">${order.tax.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-brand-accent">
                        <span>Discount</span>
                        <span>-${order.discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500">Total Paid</p>
                      <p className="text-2xl font-bold text-white mt-1">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
