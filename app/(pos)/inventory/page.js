import PosPageShell from "@/components/pos/PosPageShell";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/billing/calculate";

function stockStatus(p) {
  if (p.stock_quantity <= 0) return { label: "OUT OF STOCK", tone: "text-red-600" };
  if (p.stock_quantity <= p.minimum_stock) return { label: "LOW STOCK", tone: "text-amber-600" };
  return { label: "IN STOCK", tone: "text-emerald-600" };
}

export default async function InventoryPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, sku, stock_quantity, minimum_stock, selling_price, cost_price")
    .eq("is_active", true)
    .order("name");

  const list = products || [];
  const stockValue = list.reduce(
    (s, p) => s + p.stock_quantity * Number(p.cost_price || p.selling_price || 0),
    0
  );
  const low = list.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.minimum_stock).length;
  const out = list.filter((p) => p.stock_quantity <= 0).length;

  return (
    <PosPageShell title="Inventory" description="Stock levels and valuation">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["Total Products", list.length],
          ["Stock Value", formatINR(stockValue)],
          ["Low Stock", low],
          ["Out of Stock", out],
        ].map(([t, v]) => (
          <div key={t} className="rounded-2xl border border-black/6 bg-white p-4 shadow-sm">
            <p className="text-xs text-body">{t}</p>
            <p className="mt-1 text-xl font-bold">{v}</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#faf9f6] text-left text-xs text-body">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Min</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.map((p) => {
              const st = stockStatus(p);
              return (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-body">{p.sku}</td>
                  <td className="px-4 py-3">{p.stock_quantity}</td>
                  <td className="px-4 py-3">{p.minimum_stock}</td>
                  <td className="px-4 py-3">{formatINR(p.selling_price)}</td>
                  <td className={`px-4 py-3 text-xs font-semibold ${st.tone}`}>{st.label}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PosPageShell>
  );
}
