import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import InvoiceDigitalView from "@/components/invoice/InvoiceDigitalView";

function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export default async function PublicInvoicePage({ params, searchParams }) {
  const { id } = await params;
  const { t, download } = await searchParams;
  const token = typeof t === "string" ? t : "";

  if (!token) notFound();

  const supabase = createAnonClient();
  const { data, error } = await supabase.rpc("get_invoice_digital", {
    p_invoice_id: id,
    p_token: token,
  });

  if (error || !data) notFound();

  const invoice = data.invoice;
  const items = Array.isArray(data.items) ? data.items : [];
  const payments = Array.isArray(data.payments) ? data.payments : [];
  const customer = data.customer && typeof data.customer === "object" ? data.customer : null;
  const settings = data.settings && typeof data.settings === "object" ? data.settings : null;

  return (
    <InvoiceDigitalView
      invoice={invoice}
      items={items}
      payments={payments}
      customer={customer}
      settings={settings}
      autoDownload={download === "1"}
    />
  );
}
