import { notFound } from "next/navigation";
import Link from "next/link";
import PosPageShell from "@/components/pos/PosPageShell";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/billing/calculate";

export default async function CustomerDetailPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: customer } = await supabase.from("customers").select("*").eq("id", id).maybeSingle();
  if (!customer) notFound();

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, invoice_number, grand_total, created_at")
    .eq("customer_id", id)
    .order("created_at", { ascending: false });

  const total = (invoices || []).reduce((s, i) => s + Number(i.grand_total), 0);

  return (
    <PosPageShell title={customer.name} description={customer.mobile || customer.email}>
      <p className="text-sm">Total spent: <strong>{formatINR(total)}</strong></p>
      <ul className="mt-4 divide-y rounded-2xl border bg-white">
        {(invoices || []).map((inv) => (
          <li key={inv.id} className="flex justify-between px-4 py-3 text-sm">
            <Link href={`/sales/${inv.id}`} className="font-medium hover:text-[#8a6d3b]">
              {inv.invoice_number}
            </Link>
            <span>{formatINR(inv.grand_total)}</span>
          </li>
        ))}
      </ul>
    </PosPageShell>
  );
}
