import PosPageShell from "@/components/pos/PosPageShell";

export default function AnalyticsPage() {
  return (
    <PosPageShell title="Analytics" description="Charts driven by live sales data">
      <div className="rounded-2xl border border-black/6 bg-white p-8 text-sm text-body">
        Connect category and payment breakdown charts to Supabase aggregates from the dashboard queries.
      </div>
    </PosPageShell>
  );
}
