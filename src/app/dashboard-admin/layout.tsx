"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ฟังก์ชันสร้างคลาสของลิงก์เมนู
  const linkClass = (path: string) =>
    `p-2 rounded transition-colors duration-200 ${
      pathname === path
        ? "bg-[#8e44ad] text-white font-semibold shadow-inner" // active
        : "hover:bg-[#8e44ad] text-gray-200" // normal
    }`;

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1f0a38] via-[#5c2f8b] to-[#1f0a38]">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#000000] via-[#5c2f8b] to-[#5c2f8b] shadow-lg p-4 border-r-4 border-[#8e44ad]">
        <h2 className="text-2xl font-bold mb-6 text-white">Admin</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard-admin" className={linkClass("/dashboard-admin")}>🏠 Overview</Link>
          <Link href="/dashboard-admin/products" className={linkClass("/dashboard-admin/products")}>📦 Products</Link>
          <Link href="/dashboard-admin/auctions" className={linkClass("/dashboard-admin/auctions")}>⏳ Auctions</Link>
          <Link href="/dashboard-admin/users" className={linkClass("/dashboard-admin/users")}>👤 Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
