import PosPageShell from "@/components/pos/PosPageShell";
import { createClient } from "@/lib/supabase/server";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*").order("sort_order");

  return (
    <PosPageShell title="Categories" description="Product categories for POS tabs">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(data || []).map((c) => (
          <li key={c.id} className="rounded-2xl border border-black/6 bg-white p-4 shadow-sm">
            <p className="font-semibold">{c.name}</p>
            <p className="text-xs text-body">{c.slug}</p>
          </li>
        ))}
      </ul>
    </PosPageShell>
  );
}
