/**
 * Build data/products.js from JustDial catalogue JSON
 * Run: node scripts/build-products.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const catalogue = JSON.parse(
  fs.readFileSync(path.join(__dirname, "justdial-catalogue.json"), "utf8")
);

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueName(name, used) {
  let base = name.trim();
  if (!used.has(base)) {
    used.add(base);
    return base;
  }
  let n = 2;
  while (used.has(`${base} (${n})`)) n++;
  const unique = `${base} (${n})`;
  used.add(unique);
  return unique;
}

const usedNames = new Set();
const products = catalogue.map((item, index) => {
  const name = uniqueName(item.name, usedNames);
  const slug = slugify(name);
  const onRequest = item.onRequest || item.price == null;

  return {
    id: `metro-${index + 1}`,
    slug,
    name,
    category: item.category,
    price: item.price,
    priceUnit: item.priceUnit || "pc",
    priceLabel: item.priceLabel,
    material: item.material,
    color: item.color,
    images: item.images,
    image: item.image,
    warranty: item.warranty !== false,
    onRequest,
    featured: item.featured === true,
    offer: onRequest ? "Custom Quote" : null,
    description: onRequest
      ? `${name} — enquire for dimensions, finish options and pricing at Metro Furniture, Dharmapuri.`
      : `${name} in ${item.material}. Premium quality at ${item.priceLabel} per ${item.priceUnit === "set" ? "set" : "piece"}.`,
    features: [
      item.material,
      "Quality Assured",
      `Sold as ${item.priceUnit === "set" ? "set" : "piece"}`,
      "Available at Metro Furniture showroom",
    ],
    tags: [item.category.toLowerCase(), item.material?.toLowerCase()].filter(Boolean),
    related: [],
    source: "justdial",
  };
});

for (const product of products) {
  product.related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
    .map((p) => p.id);
}

const outPath = path.join(__dirname, "..", "data", "justdial-products.json");
fs.writeFileSync(outPath, JSON.stringify(products, null, 2));
console.log(`Built ${products.length} products -> data/justdial-products.json`);
