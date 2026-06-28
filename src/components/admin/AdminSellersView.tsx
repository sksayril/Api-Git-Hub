"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Loader2,
  User,
  Mail,
  MapPin,
  IdCard,
  Building2,
  CreditCard,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

type SellerStatus = "pending" | "approved" | "rejected";

interface SellerDoc {
  _id: string;
  name: string;
  email: string;
  idProofNumber: string;
  idProofImage: string;
  address: string;
  bankAccountNumber: string;
  bankAccountName: string;
  bankIFSC: string;
  bankPassbookImage: string;
  status: SellerStatus;
  verified: boolean;
  createdAt: string;
}

const statusStyle: Record<SellerStatus, string> = {
  pending:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusIcon: Record<SellerStatus, React.ReactNode> = {
  pending:  <Clock className="w-3.5 h-3.5" />,
  approved: <CheckCircle className="w-3.5 h-3.5" />,
  rejected: <XCircle className="w-3.5 h-3.5" />,
};

export default function AdminSellersView() {
  const [sellers, setSellers] = useState<SellerDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadSellers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/sellers");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch seller requests.");
      setSellers(data.sellers || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionLoading(`${id}-${action}`);
    try {
      const res = await fetch(`/api/admin/sellers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed.");
      setSellers((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: data.seller.status, verified: data.seller.verified } : s))
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => { void loadSellers(); }, []);

  const stats = {
    total: sellers.length,
    pending: sellers.filter((s) => s.status === "pending").length,
    approved: sellers.filter((s) => s.status === "approved").length,
    rejected: sellers.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <BadgeCheck className="w-6 h-6 text-blue-400" />
            Seller Requests
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Review and verify seller applications with KYC documents.</p>
        </div>
        <button
          onClick={loadSellers}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-white/8 bg-white/4 px-3 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: stats.total, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Pending Review", value: stats.pending, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Approved", value: stats.approved, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Rejected", value: stats.rejected, color: "text-red-400", bg: "bg-red-500/10" },
        ].map((s) => (
          <div key={s.label} className="bg-[#111827] border border-white/6 rounded-2xl p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-8 text-center text-sm text-zinc-500">
          <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-blue-400" />
          Loading seller applications...
        </div>
      ) : sellers.length === 0 ? (
        <div className="rounded-2xl border border-white/6 bg-[#111827] p-12 text-center text-zinc-500 text-sm">
          No seller applications found.
        </div>
      ) : (
        <div className="space-y-4">
          {sellers.map((seller) => (
            <div
              key={seller._id}
              className="bg-[#111827] border border-white/6 rounded-2xl p-5 space-y-4"
            >
              {/* Top row: identity + status */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-primary/30 to-brand-accent/30 border border-brand-primary/20 flex items-center justify-center text-sm font-bold text-white">
                    {seller.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white flex items-center gap-2">
                      {seller.name}
                      {seller.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                          <BadgeCheck className="w-3 h-3" /> Verified
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-zinc-500">{seller.email}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusStyle[seller.status]}`}>
                  {statusIcon[seller.status]}
                  {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                </span>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <InfoChip icon={<MapPin className="w-3.5 h-3.5" />} label="Address" value={seller.address} />
                <InfoChip icon={<IdCard className="w-3.5 h-3.5" />} label="ID Proof No." value={seller.idProofNumber} />
                <InfoChip icon={<Building2 className="w-3.5 h-3.5" />} label="Bank Name" value={seller.bankAccountName} />
                <InfoChip icon={<CreditCard className="w-3.5 h-3.5" />} label="Account No." value={seller.bankAccountNumber} />
                <InfoChip icon={<CreditCard className="w-3.5 h-3.5" />} label="IFSC Code" value={seller.bankIFSC} />
                <InfoChip icon={<Mail className="w-3.5 h-3.5" />} label="Applied On" value={new Date(seller.createdAt).toLocaleDateString()} />
              </div>

              {/* Document previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DocPreview label="ID Proof Document" url={seller.idProofImage} />
                <DocPreview label="Bank Passbook / Statement" url={seller.bankPassbookImage} />
              </div>

              {/* Action Buttons */}
              {seller.status === "pending" && (
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => handleAction(seller._id, "approve")}
                    disabled={!!actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold py-2.5 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {actionLoading === `${seller._id}-approve` ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <><CheckCircle className="w-4 h-4" /> Approve Seller</>
                    )}
                  </button>
                  <button
                    onClick={() => handleAction(seller._id, "reject")}
                    disabled={!!actionLoading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-bold py-2.5 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {actionLoading === `${seller._id}-reject` ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <><XCircle className="w-4 h-4" /> Reject</>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3">
      <span className="text-zinc-500 mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="text-[9px] text-zinc-600 font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-zinc-300 font-medium mt-0.5 break-all">{value}</p>
      </div>
    </div>
  );
}

function DocPreview({ label, url }: { label: string; url: string }) {
  const isImage = url && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url);
  return (
    <div className="rounded-xl border border-white/5 bg-black/20 overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
        <p className="text-[10px] font-semibold text-zinc-500">{label}</p>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300">
            <ExternalLink className="w-3 h-3" /> View
          </a>
        )}
      </div>
      {isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={label} className="w-full h-32 object-cover" />
      ) : (
        <div className="h-20 flex items-center justify-center text-xs text-zinc-600">
          {url ? "PDF / non-image document — click View to open" : "Not uploaded"}
        </div>
      )}
    </div>
  );
}
