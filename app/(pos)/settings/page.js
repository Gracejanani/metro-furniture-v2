import PosPageShell from "@/components/pos/PosPageShell";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("business_settings").select("*").limit(1).maybeSingle();

  return (
    <PosPageShell title="Settings" description="GST, discounts & store details (Admin)">
      <div className="max-w-xl rounded-2xl border border-black/6 bg-white p-6 text-sm space-y-2">
        <p><span className="text-body">Store:</span> {settings?.store_name}</p>
        <p><span className="text-body">GSTIN:</span> {settings?.gstin || "—"}</p>
        <p><span className="text-body">Tax mode:</span> {settings?.tax_mode}</p>
        <p><span className="text-body">Cashier max discount:</span> {settings?.cashier_max_discount_percent}%</p>
      </div>
    </PosPageShell>
  );
}
