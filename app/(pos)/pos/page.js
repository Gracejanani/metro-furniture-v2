import { createClient } from "@/lib/supabase/server";
import POSClient from "@/components/pos/POSClient";

export default async function POSPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return <POSClient initialCategories={categories || []} />;
}
