"use client";

import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { performAdminLogout } from "@/lib/admin-session";

export function showLogoutConfirmation(onComplete: () => void) {
  toast.custom(
    (t) => (
      <div
        className={`flex flex-col gap-4 w-full max-w-sm transition-opacity duration-200 ${
          t.visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-red-500/10 shrink-0">
            <LogOut className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Log out?</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Your session will be cleared and you will be redirected to the login page.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            No
          </button>
          <button
            type="button"
            onClick={async () => {
              toast.dismiss(t.id);
              const loadingId = toast.loading("Logging out...");
              try {
                await performAdminLogout(onComplete);
                toast.success("Logged out successfully", { id: loadingId });
              } catch {
                toast.error("Logout failed. Please try again.", { id: loadingId });
              }
            }}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors"
          >
            Yes, Log out
          </button>
        </div>
      </div>
    ),
    { duration: Infinity, id: "admin-logout-confirm" }
  );
}
