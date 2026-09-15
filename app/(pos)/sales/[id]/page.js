import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import InvoicePreview from "@/components/invoice/InvoicePreview";

export default async function SaleDetailPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!invoice) notFound();

  const [{ data: items }, { data: payments }, { data: customer }, { data: settings }, { data: cashier }] =
    await Promise.all([
      supabase
        .from("invoice_items")
        .select("*, products(image_url, material)")
        .eq("invoice_id", id),
      supabase.from("payments").select("*").eq("invoice_id", id),
      invoice.customer_id
        ? supabase.from("customers").select("*").eq("id", invoice.customer_id).maybeSingle()
        : Promise.resolve({ data: null }),
      supabase.from("business_settings").select("*").limit(1).maybeSingle(),
      invoice.created_by
        ? supabase.from("profiles").select("full_name").eq("id", invoice.created_by).maybeSingle()
        : Promise.resolve({ data: null }),
    ]);

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
      <div className="no-print mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{invoice.invoice_number}</h1>
          <Link href="/sales" className="mt-1 inline-flex items-center gap-1.5 text-sm text-[#8a6d3b]">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to sales
          </Link>
        </div>
      </div>
      <InvoicePreview
        invoice={invoice}
        items={items || []}
        payments={payments || []}
        customer={customer}
        settings={settings}
        cashier={cashier}
      />
    </div>
  );
}
