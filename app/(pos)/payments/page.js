import PosPageShell from "@/components/pos/PosPageShell";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/billing/calculate";

export default async function PaymentsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("*, invoices(invoice_number)")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <PosPageShell title="Payments" description="Payment records by method">
      <div className="overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#faf9f6] text-left text-xs text-body">
            <tr>
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(data || []).map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">{p.invoices?.invoice_number}</td>
                <td className="px-4 py-3">{p.method}</td>
                <td className="px-4 py-3 font-medium">{formatINR(p.amount)}</td>
                <td className="px-4 py-3 text-body">{p.reference_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PosPageShell>
  );
}
