import PosPageShell from "@/components/pos/PosPageShell";
import { createClient } from "@/lib/supabase/server";

export default async function StockMovementsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stock_movements")
    .select("*, products(name, sku)")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <PosPageShell title="Stock Movements" description="Audit trail for every quantity change">
      <div className="overflow-hidden rounded-2xl border bg-white text-sm">
        <table className="w-full">
          <thead className="bg-[#faf9f6] text-left text-xs text-body">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Before → After</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(data || []).map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3">{m.products?.name}</td>
                <td className="px-4 py-3">{m.movement_type}</td>
                <td className="px-4 py-3">{m.quantity}</td>
                <td className="px-4 py-3">{m.previous_quantity} → {m.new_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PosPageShell>
  );
}
