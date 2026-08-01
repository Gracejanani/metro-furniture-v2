/**
 * Parse wap-captured.json and build product seed from JustDial catalogue images
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "wap-captured.json"), "utf8"));

const METRO_PREFIX =
  "9999p4342.4342.160219180223.a7p4/catalogue/metro-furniture";

function parseNameFromUrl(url) {
  const file = url.split("/").pop()?.replace(/\.jpg.*$/i, "") || "";
  // metro-furniture-dharmapuri-ho-dharmapuri-furniture-dealers-supreme-m3nx66zfer
  const parts = file
    .replace(/^metro-furniture-dharmapuri-ho-dharmapuri-furniture-dealers-/i, "")
    .replace(/^metro-furniture-dharmapuri-ho-dharmapuri-furniture-dealers/i, "")
    .replace(/-/g, " ")
    .trim();

  if (!parts || parts.length < 3) return null;
  // Title case
  return parts.replace(/\b\w/g, (c) => c.toUpperCase());
}

function guessCategory(name, url) {
  const n = (name + url).toLowerCase();
  if (/sofa|sectional|chester|recliner|settee|l shape|l-shape/.test(n)) return "Sofas";
  if (/recliner|rocker/.test(n)) return "Recliners";
  if (/bed|cot|bunk|mattress|queen|king/.test(n)) return "Beds";
  if (/mattress|foam|spring|coir|latex/.test(n)) return "Mattresses";
  if (/dining|table set|6 seater|8 seater|dinner/.test(n)) return "Dining";
  if (/wardrobe|almirah|cupboard|sliding/.test(n)) return "Wardrobes";
  if (/tv unit|media|console|panel/.test(n)) return "TV Units";
  if (/office|desk|workstation|chair|cabinet|filing/.test(n)) return "Office Furniture";
  if (/coffee|centre table|center table|nested/.test(n)) return "Coffee Tables";
  if (/buffet|ornate|nilkamal|supreme|plastic/.test(n)) return "Sofas";
  return "Sofas";
}

function guessMaterial(name) {
  const n = name.toLowerCase();
  if (/wood|sheesham|teak|walnut|brown/.test(n)) return "Wood";
  if (/fabric|upholst|grey|beige|charcoal/.test(n)) return "Fabric";
  if (/leather|leatherette/.test(n)) return "Leatherette";
  if (/marble|glass/.test(n)) return "Marble Top";
  if (/engineered|plywood|laminate/.test(n)) return "Engineered Wood";
  if (/steel|metal/.test(n)) return "Metal";
  if (/plastic|supreme|nilkamal/.test(n)) return "Engineered Wood";
  if (/memory foam|spring|coir|mattress/.test(n)) return "Memory Foam";
  return "Wood";
}

function estimatePrice(category) {
  const ranges = {
    Sofas: [15000, 85000],
    Beds: [18000, 55000],
    Dining: [12000, 78000],
    Wardrobes: [18000, 65000],
    "TV Units": [12000, 38000],
    "Office Furniture": [8500, 35000],
    Mattresses: [9000, 32000],
    Recliners: [22000, 65000],
    "Coffee Tables": [4500, 18000],
  };
  const [min, max] = ranges[category] || [10000, 40000];
  const step = 2500;
  return Math.round((min + Math.random() * (max - min)) / step) * step;
}

// Collect all unique metro catalogue images
const imgs = new Set();
for (const src of data.pageData?.imgs || []) {
  if (src.includes(METRO_PREFIX)) imgs.add(src.split("?")[0]);
}

// Also scan captured API bodies for image URLs
for (const cap of data.captured || []) {
  const matches = cap.body?.match(/https:\/\/content[^"'\s]+9999p4342[^"'\s]+\.jpg/gi) || [];
  for (const m of matches) imgs.add(m.split("?")[0]);
}

const products = [];
let idx = 0;

for (const image of [...imgs].sort()) {
  const name = parseNameFromUrl(image);
  if (!name) continue;
  const category = guessCategory(name, image);
  const material = guessMaterial(name);
  const price = estimatePrice(category);

  products.push({
    id: `metro-jd-${++idx}`,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name,
    category,
    price,
    priceUnit: category === "Dining" && /set|seater/.test(name.toLowerCase()) ? "set" : "pc",
    material,
    image,
    images: [image],
    featured: idx <= 12,
    warranty: true,
    onRequest: false,
    source: "justdial",
  });
}

// Dedupe by slug
const seen = new Set();
const unique = products.filter((p) => {
  if (seen.has(p.slug)) return false;
  seen.add(p.slug);
  return true;
});

console.log(`Metro catalogue images: ${unique.length}`);
unique.forEach((p) => console.log(`- [${p.category}] ${p.name}`));

fs.writeFileSync(
  path.join(__dirname, "justdial-catalogue.json"),
  JSON.stringify(unique, null, 2)
);

console.log(`\nWrote ${unique.length} products to justdial-catalogue.json`);
