import AdminSidebar from "@/components/admin/AdminSidebar";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <header className="border-b border-[#ddd] bg-white px-6 py-4 md:px-8">
          <p className="text-[10px] uppercase tracking-[3px] text-[#999]">Content management</p>
        </header>
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
