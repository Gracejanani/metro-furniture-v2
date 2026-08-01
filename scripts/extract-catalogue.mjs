/**
 * Extract full JustDial catalogue from wap-captured.json API responses
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "wap-captured.json"), "utf8"));

const CDN = "https://content.jdmagicbox.com";

function buildImageUrl(io) {
  if (!io) return null;
  if (io.startsWith("http")) return io.split("?")[0];
  return `${CDN}${io.startsWith("/") ? "" : "/"}${io}`.split("?")[0];
}

function parseCapturedImages() {
  const items = [];
  for (const cap of data.captured || []) {
    if (!cap.body?.includes("9999p4342") && !cap.body?.includes("images")) continue;
    try {
      const json = JSON.parse(cap.body);
      const all = json?.images?.All?.res || [];
      for (const item of all) {
        const image = buildImageUrl(item.io);
        if (!image) continue;
        items.push({
          image,
          name: (item.in || "").trim(),
          caption: (item.il || "").trim(),
          pid: item.pid || "",
        });
      }
    } catch {
      /* ignore */
    }
  }
  return items;
}

function titleFromFilename(url) {
  const file = url.split("/").pop()?.replace(/\.jpg.*$/i, "") || "";
  const cleaned = file
    .replace(/^metro-furniture-dharmapuri-ho-dharmapuri-furniture-dealers-/i, "")
    .replace(/^metro-furniture-dharmapuri-ho-dharmapuri-furniture-dealers/i, "")
    .replace(/^nilkamal-furniture-/i, "Nilkamal ")
    .replace(/^furniture-dealers-supreme-/i, "Supreme ")
    .replace(/^supreme-furniture-/i, "Supreme ")
    .replace(/^godrej-interio-office-furniture-/i, "Godrej Interio ")
    .replace(/^plastic-furniture-dealers-supreme-/i, "Supreme ")
    .replace(/^pipe-fitting-dealers-supreme-/i, "Supreme ")
    .replace(/-furniture-dealers-[a-z0-9-]+$/i, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

  if (/^\d+ Office Furniture Dealers \d+/.test(cleaned)) {
    const num = cleaned.match(/Office Furniture Dealers (\d+)/)?.[1];
    return `Office Workstation Set ${num}`;
  }
  if (/^Office Furniture Dealers \d+$/.test(cleaned)) {
    const num = cleaned.match(/(\d+)$/)?.[1];
    return `Office Workstation Set ${num}`;
  }

  return cleaned || "Metro Furniture Display";
}

function resolveName(item) {
  const raw = (item.name || "").trim();
  if (/^front view$/i.test(raw)) return "Metro Furniture Showroom Front View";
  if (/^inside view$/i.test(raw)) return "Metro Furniture Showroom Interior";
  if (raw.length > 2 && !/^general$/i.test(raw)) {
    return raw.replace(/\s+/g, " ").trim();
  }
  const fromFile = titleFromFilename(item.image);
  if (fromFile && !/^Metro Furniture Display$/i.test(fromFile)) return fromFile;
  if (/supreme-m3nx66zfer|supreme-05576tw3f5|supreme-6k1xsa4zlg/.test(item.image)) {
    return "Supreme Sofa Collection Display";
  }
  return "Metro Furniture Showroom Display";
}

function guessCategory(name, caption, image) {
  const n = `${name} ${caption} ${image}`.toLowerCase();
  if (/pipe fitting|pipe-fitting/.test(n)) return null;
  if (/recliner/.test(n)) return "Recliners";
  if (/sofa|sectional|settee|l shape|ornate|buffet grey/.test(n)) return "Sofas";
  if (/mattress|foam|spring|coir|latex|ortho/.test(n)) return "Mattresses";
  if (/bed|cot|bunk|headboard|queen bed|king bed/.test(n)) return "Beds";
  if (/dining|dinner|table set|6 seater|8 seater/.test(n)) return "Dining";
  if (/wardrobe|almirah|cupboard|sliding/.test(n)) return "Wardrobes";
  if (/tv unit|media|console|panel|entertainment/.test(n)) return "TV Units";
  if (/office|desk|workstation|executive|filing|reception|godrej/.test(n)) return "Office Furniture";
  if (/coffee|centre table|center table|side table/.test(n)) return "Coffee Tables";
  if (/plastic furniture|anchor globus|aqua.*degree/.test(n)) return "Coffee Tables";
  if (/front view|inside view|showroom|general|9999p4342/.test(n) && /metro-furniture/.test(image)) return "Sofas";
  return "Sofas";
}

function guessMaterial(name) {
  const n = name.toLowerCase();
  if (/fabric|upholst|grey|beige|charcoal|velvet|buffet/.test(n)) return "Fabric";
  if (/leather|leatherette/.test(n)) return "Leatherette";
  if (/marble|glass|aqua.*degree/.test(n)) return "Marble Top";
  if (/wood|sheesham|teak|walnut|brown|wooden|beech/.test(n)) return "Wood";
  if (/engineered|plywood|laminate|supreme|nilkamal|godrej|plastic/.test(n)) return "Engineered Wood";
  if (/steel|metal/.test(n)) return "Metal";
  if (/memory foam|spring|coir|mattress/.test(n)) return "Memory Foam";
  return "Wood";
}

function estimatePrice(category, name) {
  const n = name.toLowerCase();
  const base = {
    Sofas: 28000,
    Beds: 32000,
    Dining: 42000,
    Wardrobes: 28000,
    "TV Units": 18500,
    "Office Furniture": 16500,
    Mattresses: 14000,
    Recliners: 38000,
    "Coffee Tables": 8500,
  }[category] || 20000;

  if (/l shape|7 seater|8 seater|6 seater dining/.test(n)) return base + 18000;
  if (/3 seater|king|hydraulic|sliding|motor|reception/.test(n)) return base + 10000;
  if (/2 seater|queen|compact|single|set 1|set 2/.test(n)) return Math.max(base - 7000, 9500);
  if (/office workstation set 1[5-9]|office workstation set 20/.test(n)) return base + 5000;
  return base;
}

function makePriceLabel(price) {
  if (price == null) return "Price on request";
  const k = price / 1000;
  const num = Number.isInteger(k) ? `${k}.0` : k.toFixed(1);
  return `₹${num}K`;
}

const raw = parseCapturedImages();
for (const src of data.pageData?.imgs || []) {
  if (src.includes("9999p4342") && src.includes("/catalogue/")) {
    raw.push({ image: src.split("?")[0], name: "", caption: "" });
  }
}

const seen = new Set();
const products = [];

for (const item of raw) {
  const key = item.image.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);

  const name = resolveName(item);
  const category = guessCategory(name, item.caption, item.image);
  if (!category) continue;

  const material = guessMaterial(name);
  const price = estimatePrice(category, name);

  products.push({
    name,
    category,
    price,
    priceUnit: /set|seater|dining set|sofa set/i.test(name) ? "set" : "pc",
    material,
    image: item.image,
    images: [item.image],
    featured: products.length < 12,
    warranty: true,
    onRequest: false,
    priceLabel: makePriceLabel(price),
    caption: item.caption,
    pid: item.pid,
  });
}

fs.writeFileSync(path.join(__dirname, "justdial-catalogue.json"), JSON.stringify(products, null, 2));
console.log("Products extracted:", products.length);
