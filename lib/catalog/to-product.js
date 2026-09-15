import { catalogCategorySlug } from "./category-map";

export function catalogItemToProductRow(item, categoryIdBySlug) {
  const slug = item.slug || item.id;
  const sku = (item.model || item.id || slug).toUpperCase();
  const categorySlug = catalogCategorySlug(item.category);
  const categoryId = categoryIdBySlug[categorySlug] || null;

  const specsText = Array.isArray(item.specs)
    ? item.specs.map((s) => `${s.label}: ${s.value}`).join("\n")
    : "";

  const description = [
    item.tagline,
    item.description,
    item.configuration ? `Configuration: ${item.configuration}` : "",
    item.upholstery ? `Upholstery: ${item.upholstery}` : "",
    specsText,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    name: item.name,
    slug,
    product_code: item.model || item.id,
    sku,
    barcode: item.barcode || null,
    category_id: categoryId,
    brand: "Metro Furniture",
    description,
    cost_price: 0,
    mrp: Number(item.mrp || item.price || 0),
    selling_price: Number(item.price || 0),
    offer_price: null,
    gst_rate: 18,
    stock_quantity: item.stock_quantity ?? 5,
    minimum_stock: 2,
    unit: item.priceUnit === "set" ? "set" : "pc",
    material: item.material || null,
    color: item.color || null,
    size: item.configuration || null,
    dimensions: null,
    weight: null,
    warranty: item.warranty ? "Manufacturer warranty" : null,
    image_url: item.image || item.images?.[0] || null,
    is_active: true,
    _catalogId: item.id,
    _localImage: item.image || item.images?.[0],
    _categorySlug: categorySlug,
    _categoryName: item.category,
  };
}

export function uniqueCatalogCategories(catalog) {
  const map = new Map();
  for (const item of catalog) {
    if (!item.category) continue;
    const slug = catalogCategorySlug(item.category);
    if (!map.has(slug)) {
      map.set(slug, { name: item.category, slug });
    }
  }
  return [...map.values()];
}
