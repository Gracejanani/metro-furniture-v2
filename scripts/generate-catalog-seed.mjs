/**
 * Generates supabase/seed_catalog.sql from data/catalog-products.json
 * Run: node scripts/generate-catalog-seed.mjs
 */
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const CATEGORY_SLUG = {
  "Corner Sofas": "corner-sofas",
  Sofas: "sofas",
  Mattresses: "mattresses",
  Dining: "dining",
  Chairs: "chairs",
  Tables: "tables",
  Chandeliers: "chandeliers",
  "Wall Lights": "wall-lights",
  "Bathroom Fittings": "bathroom-fittings",
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sqlStr(v) {
  if (v == null || v === "") return "NULL";
  return `'${String(v).replace(/'/g, "''")}'`;
}

const catalog = JSON.parse(
  await readFile(path.join(root, "data", "catalog-products.json"), "utf8")
);

const catMap = new Map();
for (const item of catalog) {
  const slug = CATEGORY_SLUG[item.category] || slugify(item.category);
  if (!catMap.has(slug)) {
    catMap.set(slug, { name: item.category, slug, sort: catMap.size + 1 });
  }
}

let sql = `-- Metro Furniture — catalog seed (generated from catalog-products.json)
-- Run AFTER: 001_pos_schema.sql, 005_product_images_storage.sql
-- Images: paths under /public (e.g. /Metro_Product_Images/...) — work in Next.js POS.
-- For Supabase Storage URLs, use /products → Import Catalog JSON (with SERVICE_ROLE_KEY).

-- Categories
INSERT INTO categories (name, slug, sort_order, is_active) VALUES
`;

sql += [...catMap.values()]
  .map((c) => `  (${sqlStr(c.name)}, ${sqlStr(c.slug)}, ${c.sort}, true)`)
  .join(",\n");

sql += `
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  sort_order = EXCLUDED.sort_order,
  is_active = true;

-- Products
`;

for (const item of catalog) {
  const slug = item.slug || item.id;
  const sku = (item.model || item.id || slug).toUpperCase();
  const catSlug = CATEGORY_SLUG[item.category] || slugify(item.category);
  const image = item.image || item.images?.[0] || null;
  const desc = [
    item.tagline,
    item.description,
    item.configuration ? `Configuration: ${item.configuration}` : "",
    item.upholstery ? `Upholstery: ${item.upholstery}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  sql += `
INSERT INTO products (
  name, slug, product_code, sku, category_id,
  selling_price, mrp, gst_rate, stock_quantity, minimum_stock,
  unit, material, color, size, description, image_url, is_active
) VALUES (
  ${sqlStr(item.name)},
  ${sqlStr(slug)},
  ${sqlStr(item.model || item.id)},
  ${sqlStr(sku)},
  (SELECT id FROM categories WHERE slug = ${sqlStr(catSlug)} LIMIT 1),
  ${Number(item.price || 0)},
  ${Number(item.mrp || item.price || 0)},
  18,
  5,
  2,
  ${sqlStr(item.priceUnit === "set" ? "set" : "pc")},
  ${sqlStr(item.material)},
  ${sqlStr(item.color)},
  ${sqlStr(item.configuration)},
  ${sqlStr(desc)},
  ${sqlStr(image)},
  true
)
ON CONFLICT (sku) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category_id = EXCLUDED.category_id,
  selling_price = EXCLUDED.selling_price,
  mrp = EXCLUDED.mrp,
  material = EXCLUDED.material,
  color = EXCLUDED.color,
  size = EXCLUDED.size,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_active = true;
`;
}

const out = path.join(root, "supabase", "seed_catalog.sql");
await writeFile(out, sql, "utf8");
console.log(`Wrote ${out} (${catalog.length} products, ${catMap.size} categories)`);
