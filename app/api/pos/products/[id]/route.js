import { NextResponse } from "next/server";
import {
  canDeleteProducts,
  canManageProducts,
  getStaffProfile,
} from "@/lib/pos/require-staff";
import { normalizeProductBody } from "@/lib/products/normalize-payload";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const auth = await getStaffProfile();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  if (!canManageProducts(auth.profile.role)) {
    return NextResponse.json(
      { error: "Only Admin or Manager can edit products" },
      { status: 403 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const normalized = normalizeProductBody(body, { isUpdate: true });
  if (normalized.error) {
    return NextResponse.json({ error: normalized.error }, { status: 400 });
  }

  const { data, error } = await auth.supabase
    .from("products")
    .update({ ...normalized.payload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id, sku, name")
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "SKU, barcode, or product code already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Could not update product" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  await auth.supabase.from("inventory").upsert(
    {
      product_id: id,
      quantity: normalized.payload.stock_quantity,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "product_id" }
  );

  return NextResponse.json({ product: data });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const auth = await getStaffProfile();
  if (auth.error) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  if (!canDeleteProducts(auth.profile.role)) {
    return NextResponse.json(
      { error: "Only Admin or Manager can delete products" },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const hard = searchParams.get("hard") === "1" && auth.profile.role === "ADMIN";

  if (hard) {
    const { count } = await auth.supabase
      .from("invoice_items")
      .select("*", { count: "exact", head: true })
      .eq("product_id", id);

    if ((count ?? 0) > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot permanently delete: product exists on invoices. Deactivate instead.",
        },
        { status: 400 }
      );
    }

    const { error } = await auth.supabase.from("products").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: "Could not delete product" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, deleted: true });
  }

  const { data, error } = await auth.supabase
    .from("products")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Could not deactivate product" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deactivated: true });
}
