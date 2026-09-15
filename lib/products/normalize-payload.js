export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeProductBody(body, { isUpdate = false } = {}) {
  const name = body.name?.trim();
  if (!name) return { error: "Product name is required" };

  const sku = body.sku?.trim()?.toUpperCase();
  if (!sku) return { error: "SKU is required" };

  const selling = Number(body.selling_price);
  if (Number.isNaN(selling) || selling < 0) {
    return { error: "Valid selling price is required" };
  }

  const slug = body.slug?.trim() || slugify(name);

  const payload = {
    name,
    slug,
    sku,
    product_code: (body.product_code || sku).trim(),
    barcode: body.barcode?.trim() || null,
    category_id: body.category_id || null,
    brand: body.brand?.trim() || "Metro Furniture",
    description: body.description?.trim() || null,
    cost_price: Number(body.cost_price) || 0,
    mrp: Number(body.mrp) || selling,
    selling_price: selling,
    offer_price: body.offer_price != null && body.offer_price !== ""
      ? Number(body.offer_price)
      : null,
    gst_rate: Number(body.gst_rate ?? 18),
    stock_quantity: Math.max(0, Math.floor(Number(body.stock_quantity) || 0)),
    minimum_stock: Math.max(0, Math.floor(Number(body.minimum_stock) || 2)),
    unit: body.unit === "set" ? "set" : "pc",
    material: body.material?.trim() || null,
    color: body.color?.trim() || null,
    size: body.size?.trim() || null,
    dimensions: body.dimensions?.trim() || null,
    weight: body.weight?.trim() || null,
    warranty: body.warranty?.trim() || null,
    image_url: body.image_url?.trim() || null,
    is_active: body.is_active !== false,
  };

  if (!isUpdate) {
    payload.created_at = undefined;
  }

  return { payload };
}
