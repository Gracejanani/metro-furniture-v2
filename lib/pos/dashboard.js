import { createClient } from "@/lib/supabase/server";

function startOfDayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export async function getDashboardStats() {
  const supabase = await createClient();
  const since = startOfDayISO();

  const { data: todayInvoices } = await supabase
    .from("invoices")
    .select("grand_total, payment_status")
    .gte("created_at", since)
    .neq("status", "CANCELLED");

  const todaySales = (todayInvoices || []).reduce(
    (s, i) => s + Number(i.grand_total || 0),
    0
  );
  const todayOrders = todayInvoices?.length || 0;

  const { data: pending } = await supabase
    .from("invoices")
    .select("grand_total")
    .in("payment_status", ["PENDING", "PARTIAL"]);

  const pendingAmount = (pending || []).reduce(
    (s, i) => s + Number(i.grand_total || 0),
    0
  );

  const { data: lowStockProducts } = await supabase
    .from("products")
    .select("id, stock_quantity, minimum_stock")
    .eq("is_active", true);

  const lowStock = (lowStockProducts || []).filter(
    (p) => p.stock_quantity > 0 && p.stock_quantity <= p.minimum_stock
  ).length;

  const { data: recentSales } = await supabase
    .from("invoices")
    .select("id, invoice_number, grand_total, created_at, customers(name)")
    .order("created_at", { ascending: false })
    .limit(8);

  return {
    todaySales,
    todayOrders,
    pendingAmount,
    pendingCount: pending?.length || 0,
    lowStock,
    recentSales: recentSales || [],
  };
}
