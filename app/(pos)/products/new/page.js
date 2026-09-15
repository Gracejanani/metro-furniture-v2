import PosPageShell from "@/components/pos/PosPageShell";
import ProductForm from "@/components/products/ProductForm";
import { createClient } from "@/lib/supabase/server";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .eq("is_active", true)
    .order("sort_order");

  return (
    <PosPageShell title="New Product" description="Add to showroom catalog">
      <ProductForm categories={categories || []} />
    </PosPageShell>
  );
}
