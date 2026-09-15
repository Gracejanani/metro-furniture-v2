import PosPageShell from "@/components/pos/PosPageShell";

export default function ReportsPage() {
  return (
    <PosPageShell
      title="Reports"
      description="Sales, GST, inventory & profit — extend with Supabase views/RPC"
    >
      <div className="rounded-2xl border border-dashed border-black/15 bg-white p-12 text-center text-sm text-body">
        Report modules are wired to Supabase. Use SQL views for heavy aggregates by date, category, and cashier.
      </div>
    </PosPageShell>
  );
}
