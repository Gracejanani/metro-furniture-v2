import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import PosPageShell from "@/components/pos/PosPageShell";
import ImportCatalogButton from "@/components/products/ImportCatalogButton";
import ProductRowActions from "@/components/products/ProductRowActions";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/billing/calculate";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, sku, selling_price, stock_quantity, image_url, is_active, categories(name)")
    .order("name")
    .limit(500);

  const active = (products || []).filter((p) => p.is_active);
  const inactive = (products || []).filter((p) => !p.is_active);

  return (
    <PosPageShell
      title="Products"
      description="Add, edit, or deactivate showroom products"
      action={
        <div className="flex flex-wrap items-center gap-2">
          <ImportCatalogButton />
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1a1c20] px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Add Product
          </Link>
        </div>
      }
    >
      <div className="overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#faf9f6] text-left text-xs text-body">
            <tr>
              <th className="w-14 px-4 py-3" />
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {active.map((p) => (
              <tr key={p.id} className="hover:bg-[#faf9f6]/40">
                <td className="px-4 py-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-muted">
                    {p.image_url ? (
                      <Image src={p.image_url} alt="" fill className="object-cover" unoptimized />
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/products/${p.id}`} className="font-medium hover:text-[#8a6d3b]">
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{p.sku}</td>
                <td className="px-4 py-3">{p.categories?.name}</td>
                <td className="px-4 py-3">{formatINR(p.selling_price)}</td>
                <td className="px-4 py-3">{p.stock_quantity}</td>
                <td className="px-4 py-3">
                  <ProductRowActions product={p} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!active.length && (
          <p className="p-8 text-center text-body">No active products. Import catalog or add one.</p>
        )}
      </div>

      {inactive.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-2 text-sm font-bold text-body">Inactive products</h2>
          <ul className="rounded-xl border bg-white divide-y text-sm">
            {inactive.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-2">
                <span>{p.name} <span className="text-body">({p.sku})</span></span>
                <Link href={`/products/${p.id}`} className="text-xs font-semibold text-[#8a6d3b]">
                  Edit &amp; reactivate
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </PosPageShell>
  );
}
