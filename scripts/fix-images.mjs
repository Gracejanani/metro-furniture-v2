/**
 * Apply category-matched Unsplash fallbacks where JustDial images are missing
 * or categories have no real product photos.
 * Run: node scripts/fix-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const unsplash = {
  Sofas: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  Beds: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
  Dining: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  Wardrobes: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
  "TV Units": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
  "Office Furniture": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  Mattresses: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  Recliners: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  "Coffee Tables": "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80",
};

function isJd(url) {
  return url && /jdmagicbox\.com/i.test(url);
}

/** Stock catalogue images from brands — keep only when category aligns */
function isRelevantJdImage(category, url, name) {
  if (!isJd(url)) return false;
  const n = `${name} ${url}`.toLowerCase();
  const map = {
    Sofas: /sofa|sectional|ornate|buffet|supreme|metro-furniture/,
    Beds: /bed|cot|queen|king|nilkamal-czar/,
    Dining: /dining|seater|table-set|hermiston/,
    Wardrobes: /wardrobe|almirah|cupboard|closet/,
    "TV Units": /tv|media|console|entertainment/,
    "Office Furniture": /office|desk|workstation|godrej|reception/,
    Mattresses: /mattress|foam|spring/,
    Recliners: /recliner|rocker/,
    "Coffee Tables": /coffee|centre-table|table|plastic-furniture|anchor-globus|aqua/,
  };
  const pattern = map[category] || /./;
  return pattern.test(n);
}

const inputPath = path.join(__dirname, "..", "data", "justdial-products.json");
const products = JSON.parse(fs.readFileSync(inputPath, "utf8"));

let fixed = 0;
for (const p of products) {
  const relevant = isRelevantJdImage(p.category, p.image, p.name);
  if (!relevant) {
    const fallback = unsplash[p.category] || unsplash.Sofas;
    p.image = fallback;
    p.images = [fallback];
    p.imageSource = "unsplash";
    fixed++;
  } else {
    p.imageSource = "justdial";
  }
}

// Add products for categories missing from JustDial catalogue
const existing = new Set(products.map((p) => p.category));
const supplements = [
  ["Wardrobes", "4 Door Sliding Wardrobe with Mirror", 38000, "Engineered Wood"],
  ["Wardrobes", "3 Door Hinged Wardrobe", 28000, "Engineered Wood"],
  ["Wardrobes", "2 Door Compact Wardrobe", 18500, "Engineered Wood"],
  ["TV Units", "Wall Mounted TV Unit 7ft", 24000, "Engineered Wood"],
  ["TV Units", "Modern TV Console with Storage", 16500, "Engineered Wood"],
  ["TV Units", "Floating TV Panel Unit", 32000, "Engineered Wood"],
  ["Mattresses", "Orthopaedic Memory Foam Mattress (King)", 18500, "Memory Foam"],
  ["Mattresses", "Pocket Spring Mattress (Queen)", 15000, "Spring"],
  ["Mattresses", "Dual Comfort Coir Mattress", 11000, "Coir"],
  ["Recliners", "Manual Recliner with Rocker", 28000, "Fabric"],
  ["Recliners", "Motorised Recliner Sofa (Single)", 42000, "Leatherette"],
  ["Recliners", "2 Seater Recliner Set", 58000, "Leatherette"],
  ["Beds", "King Size Hydraulic Storage Bed", 42000, "Engineered Wood"],
  ["Beds", "Platform Bed with Headboard", 28500, "Wood"],
  ["Dining", "6 Seater Wooden Dining Table Set", 38000, "Wood"],
  ["Dining", "4 Seater Glass Top Dining Set", 24000, "Glass"],
  ["Sofas", "L-Shape 6 Seater Fabric Sofa", 52000, "Fabric"],
  ["Sofas", "3 Seater Chesterfield Sofa", 35000, "Fabric"],
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makePriceLabel(price) {
  const k = price / 1000;
  return `₹${Number.isInteger(k) ? `${k}.0` : k.toFixed(1)}K`;
}

let nextId = products.length + 1;
for (const [category, name, price, material] of supplements) {
  if (products.some((p) => p.slug === slugify(name))) continue;
  const image = unsplash[category];
  products.push({
    id: `metro-${nextId++}`,
    slug: slugify(name),
    name,
    category,
    price,
    priceUnit: /set|seater|dining/i.test(name) ? "set" : "pc",
    priceLabel: makePriceLabel(price),
    material,
    image,
    images: [image],
    warranty: true,
    onRequest: false,
    featured: ["Wardrobes", "Mattresses", "Recliners", "TV Units"].includes(category),
    offer: null,
    description: `${name} in ${material}. Premium quality at ${makePriceLabel(price)}.`,
    features: [material, "Quality Assured", "Available at Metro Furniture showroom"],
    tags: [category.toLowerCase(), material.toLowerCase()],
    related: [],
    source: "catalogue",
    imageSource: "unsplash",
  });
}

for (const p of products) {
  p.related = products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .slice(0, 4)
    .map((x) => x.id);
}

fs.writeFileSync(inputPath, JSON.stringify(products, null, 2));
console.log(`Fixed ${fixed} mismatched images. Total products: ${products.length}`);
