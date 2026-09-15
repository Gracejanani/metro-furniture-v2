import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  canManageProducts,
  getStaffProfile,
} from "@/lib/pos/require-staff";
import { normalizeProductBody } from "@/lib/products/normalize-payload";

export async function GET(request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const categorySlug = searchParams.get("category");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(48, parseInt(searchParams.get("limit") || "24", 10));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*, categories(name, slug)", { count: "exact" })
    .eq("is_active", true)
    .order("name")
    .range(from, to);

  if (q) {
    query = query.or(
      `name.ilike.%${q}%,sku.ilike.%${q}%,barcode.ilike.%${q}%,product_code.ilike.%${q}%`
    );
  }

  if (categorySlug) {
    if (categorySlug === "more") {
      const moreSlugs = [
        "bathroom-fittings",
        "wall-lights",
        "accessories",
        "wardrobes",
        "recliners",
      ];
      const { data: cats } = await supabase
        .from("categories")
        .select("id")
        .in("slug", moreSlugs);
      const ids = (cats || []).map((c) => c.id);
      if (ids.length) query = query.in("category_id", ids);
    } else {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .maybeSingle();
      if (cat?.id) query = query.eq("category_id", cat.id);
    }
  }

  const { data, error, count } = await query;
  if (error) {
    return NextResponse.json({ error: "Unable to load products" }, { status: 500 });
  }

  return NextResponse.json({
    products: data || [],
    total: count ?? 0,
    page,
    limit,
  });
}

export async function POST(request) {
  const auth = await getStaffProfile();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  if (!canManageProducts(auth.profile.role)) {
    return NextResponse.json(
      { error: "Only Admin or Manager can add products" },
      { status: 403 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const normalized = normalizeProductBody(body);
  if (normalized.error) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  const { data, error } = await auth.supabase
    .from("products")
    .insert(normalized.payload)
    .select("id, sku, name")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "SKU, barcode, or product code already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Could not create product" }, { status: 500 });
  }

  await auth.supabase.from("inventory").upsert(
    {
      product_id: data.id,
      quantity: normalized.payload.stock_quantity,
    },
    { onConflict: "product_id" }
  );

  return NextResponse.json({ product: data });
}
