import Link from "next/link";
import DashboardStats from "@/components/pos/DashboardStats";
import { getDashboardStats } from "@/lib/pos/dashboard";
import { formatINR } from "@/lib/billing/calculate";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-body">Showroom overview — live from Supabase</p>
        </div>
        <Link
          href="/pos"
          className="inline-flex justify-center rounded-xl bg-[#1a1c20] px-4 py-2.5 text-sm font-semibold text-white"
        >
          New Sale
        </Link>
      </div>
      <DashboardStats stats={stats} />
      <section className="rounded-2xl border border-black/6 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-bold">Recent Sales</h2>
        {stats.recentSales.length === 0 ? (
          <p className="text-sm text-body">No sales yet. Complete a sale from POS.</p>
        ) : (
          <ul className="divide-y text-sm">
            {stats.recentSales.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between py-2.5">
                <div>
                  <Link href={`/sales/${inv.id}`} className="font-semibold hover:text-[#8a6d3b]">
                    {inv.invoice_number}
                  </Link>
                  <p className="text-xs text-body">
                    {inv.customers?.name || "Walk-in"}
                  </p>
                </div>
                <span className="font-bold">{formatINR(inv.grand_total)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
