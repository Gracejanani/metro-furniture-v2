import { TrendingUp } from "lucide-react";
import { formatINR } from "@/lib/billing/calculate";

function StatCard({ title, value, sub }) {
  return (
    <div className="rounded-2xl border border-black/6 bg-white p-4 shadow-sm">
      <p className="text-xs text-body">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {sub && (
        <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-600">
          <TrendingUp className="h-3 w-3" /> {sub}
        </p>
      )}
    </div>
  );
}

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard title="Today's Sales" value={formatINR(stats.todaySales)} />
      <StatCard title="Total Orders" value={String(stats.todayOrders)} />
      <StatCard
        title="Pending Payments"
        value={formatINR(stats.pendingAmount)}
        sub={stats.pendingCount ? `${stats.pendingCount} invoices` : undefined}
      />
      <StatCard
        title="Low Stock Items"
        value={String(stats.lowStock)}
        sub={stats.lowStock ? "Need attention" : undefined}
      />
    </div>
  );
}
