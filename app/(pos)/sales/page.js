import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/billing/calculate";

export default async function SalesPage() {
  const supabase = await createClient();
  const { data: sales } = await supabase
    .from("invoices")
    .select("id, invoice_number, grand_total, payment_status, status, created_at, customers(name)")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
      <h1 className="text-2xl font-bold">Sales</h1>
      <p className="text-sm text-body mb-4">Invoices and billing history</p>
      <div className="overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#faf9f6] text-left text-xs text-body">
            <tr>
              <th className="px-4 py-3">Invoice</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(sales || []).map((row) => (
              <tr key={row.id} className="hover:bg-[#faf9f6]/50">
                <td className="px-4 py-3">
                  <Link href={`/sales/${row.id}`} className="font-semibold hover:text-[#8a6d3b]">
                    {row.invoice_number}
                  </Link>
                </td>
                <td className="px-4 py-3">{row.customers?.name || "Walk-in"}</td>
                <td className="px-4 py-3 font-medium">{formatINR(row.grand_total)}</td>
                <td className="px-4 py-3 text-xs">{row.payment_status}</td>
                <td className="px-4 py-3 text-xs text-body">
                  {new Date(row.created_at).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!sales?.length && (
          <p className="p-8 text-center text-sm text-body">No sales recorded yet.</p>
        )}
      </div>
    </div>
  );
}
