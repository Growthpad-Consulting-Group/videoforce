"use client";

import { adminLogout } from "@/lib/admin-api";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "fa6-solid:gauge-high", exact: true },
  { href: "/admin/blog", label: "Blog", icon: "fa6-solid:newspaper", exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col bg-brand-purple text-white min-h-screen">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-[10px] uppercase tracking-[3px] text-white/50">Video Force</p>
        <p className="mt-1 text-sm font-semibold">Admin</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ href, label, icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded px-3 py-2.5 text-xs uppercase tracking-wider transition-colors ${
                active
                  ? "bg-brand-yellow text-brand-purple font-semibold"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon icon={icon} className="text-base" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/60 hover:text-white px-3 py-2"
        >
          <Icon icon="fa6-solid:arrow-up-right-from-square" />
          View site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded px-3 py-2.5 text-[10px] uppercase tracking-wider text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <Icon icon="fa6-solid:right-from-bracket" />
          Log out
        </button>
      </div>
    </aside>
  );
}
