"use client";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#1f0a38] via-[#5c2f8b] to-[#1f0a38]">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#000000] via-[#5c2f8b] to-[#5c2f8b] shadow-lg p-4 border-r-7 border-[#8e44ad]">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="hover:bg-[#8e44ad] p-2 rounded">🏠 Overview</Link>
          <Link href="/dashboard/products" className="hover:bg-[#8e44ad] p-2 rounded">📦 Products</Link>
          <Link href="/dashboard/auctions" className="hover:bg-[#8e44ad] p-2 rounded">⏳ Auctions</Link>
          <Link href="/dashboard/users" className="hover:bg-[#8e44ad] p-2 rounded">👤 Users</Link>
          <Link href="/dashboard/payments" className="hover:bg-[#8e44ad] p-2 rounded">💰 Payments</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
