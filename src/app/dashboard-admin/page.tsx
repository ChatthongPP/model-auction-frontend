"use client";
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Products" value="120" />
        <StatCard title="Active Auctions" value="45" />
        <StatCard title="Users" value="850" />
        
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#6a0dad] p-6 rounded shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
