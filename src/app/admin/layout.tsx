import AdminToaster from "@/components/admin/AdminToaster";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <AdminToaster />
      {children}
    </div>
  );
}
