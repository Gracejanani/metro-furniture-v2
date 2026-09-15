import { notFound } from "next/navigation";
import PosPageShell from "@/components/pos/PosPageShell";
import ProductForm from "@/components/products/ProductForm";
import { createClient } from "@/lib/supabase/server";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("categories").select("id, name").eq("is_active", true).order("sort_order"),
  ]);
  if (!product) notFound();

  return (
    <PosPageShell title="Edit Product" description={product.sku}>
      <ProductForm categories={categories || []} initial={product} />
    </PosPageShell>
  );
}
