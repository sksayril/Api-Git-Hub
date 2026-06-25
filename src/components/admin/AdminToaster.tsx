"use client";

import { Toaster } from "react-hot-toast";

export default function AdminToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#111827",
          color: "#f4f4f5",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "16px",
          maxWidth: "420px",
        },
        success: {
          iconTheme: { primary: "#10b981", secondary: "#111827" },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#111827" },
        },
      }}
    />
  );
}
