import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const configured = isAdminConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-purple px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-[10px] uppercase tracking-[4px] text-white/50">Video Force</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Admin sign in</h1>
        </div>

        {!configured ? (
          <div className="rounded border border-amber-400/40 bg-amber-400/10 px-4 py-4 text-sm text-amber-100">
            Admin is not configured. Add{" "}
            <code className="text-brand-yellow">ADMIN_SESSION_SECRET</code> to your{" "}
            <code className="text-brand-yellow">.env.local</code> file, then restart the dev server.
          </div>
        ) : (
          <AdminLoginForm />
        )}
      </div>
    </div>
  );
}
