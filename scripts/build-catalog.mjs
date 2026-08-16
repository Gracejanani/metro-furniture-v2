/**
 * Build data/catalog-products.json from Metro Furniture & Lights catalogs.
 * Run: node scripts/build-catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatPriceLabel(amount) {
  if (amount == null) return "Get Best Price";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function parseRs(value) {
  if (!value) return null;
  const n = parseInt(String(value).replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

function lightCategory(raw) {
  const c = raw.toLowerCase();
  if (c.includes("wall")) return "Wall Lights";
  return "Chandeliers";
}

function furnitureCategory(name, configuration) {
  const cfg = (configuration || "").toLowerCase();
  const n = name.toLowerCase();
  if (cfg.includes("corner") || cfg.includes("sectional") || cfg.includes("l-shape") || cfg.includes("u-shape")) {
    return "Corner Sofas";
  }
  return "Sofas";
}

const furniture = [
  { model: "MTC-101", name: "Alaska Corner", image: "MTC-101_Alaska_Corner.jpg", tagline: "Contemporary L-shape corner sofa with built-in storage consoles", configuration: "6-Seater L-Shape Corner (3+2+1 modular)", upholstery: "Premium teal velvet-finish fabric, channel tufted backrests", material: "Engineered hardwood frame, tapered metal legs", highlights: ["Fold-down side consoles with drawer storage", "Built-in USB charging port"], mrp: 52990, price: 38999, color: "Teal", featured: true },
  { model: "MTC-102", name: "Dollar Corner", image: "MTC-102_Dollar_Corner.jpg", tagline: "Classic Chesterfield-style tufted corner sofa", configuration: "6-Seater L-Shape Corner", upholstery: "Caramel brown suede-touch fabric, deep button tufting", material: "Solid wood trim armrests, wooden block legs", highlights: ["Adjustable pillow headrests", "Box-cushion seating for extra depth"], mrp: 47990, price: 33499, color: "Caramel Brown", featured: true },
  { model: "MTC-103", name: "Sagar Corner", image: "MTC-103_Sagar_Corner.jpg", tagline: "Reclining corner sofa in rich wine upholstery", configuration: "6-Seater L-Shape Corner with 2 manual recliners", upholstery: "Wine-red textured fabric, stitched panel backrests", material: "Reinforced steel recliner mechanism, engineered wood base", highlights: ["Dual pull-out footrests", "Deep-cushion tufted seating"], mrp: 54990, price: 39999, color: "Wine Red", featured: true },
  { model: "MTC-104", name: "Cairo Sofa", image: "MTC-104_Cairo_Sofa.jpg", tagline: "Diamond-quilted 3+1+1 sofa set with polished wood arms", configuration: "3-Seater + 2 Single Recliners (5-Seater set)", upholstery: "Taupe-brown fabric with diamond quilted backrests", material: "Glossy walnut-finish wooden armrests, block legs", highlights: ["Matching armchair pair", "Quilted cushion detailing"], mrp: 44990, price: 31999, color: "Taupe Brown", featured: true },
  { model: "MTC-105", name: "Stuart Sofa", image: "MTC-105_Stuart_Sofa.jpg", tagline: "Soft-blush recliner sofa set for a warm, elegant living room", configuration: "3-Seater + 2 Single Recliners (5-Seater set)", upholstery: "Dusty rose fabric, box-tufted seat and back cushions", material: "Wooden armrest trim, manual recliner mechanism", highlights: ["Extendable footrests on both armchairs", "Plush pillow-top arms"], mrp: 41990, price: 29999, color: "Dusty Rose", featured: true },
  { model: "MTC-106", name: "Dinesh Sofa", image: "MTC-106_Dinesh_Sofa.jpg", tagline: "Everyday-comfort sofa set with contrast stitching", configuration: "3-Seater + 2 Single Recliners (5-Seater set)", upholstery: "Camel-tan fabric with box-tufted cushions, contrast topstitch", material: "Dark walnut base trim, sturdy engineered wood frame", highlights: ["Bolster armrest cushions", "Medium-firm foam seating"], mrp: 38990, price: 27499, color: "Camel Tan" },
  { model: "MTC-107", name: "Rolex Sofa", image: "MTC-107_Rolex_Sofa.jpg", tagline: "Petrol-blue channel-tufted sofa set, statement centrepiece", configuration: "3-Seater + 2 Single Recliners (5-Seater set)", upholstery: "Deep teal fabric, vertical channel tufting on back and seat", material: "Compact block legs, engineered wood frame", highlights: ["Rolled bolster arms", "Tailored piping along seams"], mrp: 40990, price: 28999, color: "Deep Teal" },
  { model: "MTC-108", name: "Monaco Corner", image: "MTC-108_Monaco_Corner.jpg", tagline: "Deep-tufted wine velvet L-shape corner with gold-band accents", configuration: "6-Seater L-Shape Corner", upholstery: "Wine velvet fabric, diamond-stitched backrests", material: "Engineered wood frame, block legs", highlights: ["Gold-tone metallic accent band on bolster cushions"], mrp: 49990, price: 35499, color: "Wine Velvet" },
  { model: "MTC-109", name: "Sierra Sofa", image: "MTC-109_Sierra_Sofa.jpg", tagline: "Warm beige sofa set with glossy wood armrest trim", configuration: "3-Seater + 2 Single Recliners (5-Seater set)", upholstery: "Warm beige fabric, box-tufted cushions", material: "Polished wood armrest trim, block legs", highlights: ["Matching armchair pair", "Soft pillow-top backrests"], mrp: 39990, price: 27999, color: "Warm Beige" },
  { model: "MTC-110", name: "Windsor Recliner Sofa", image: "MTC-110_Windsor_Recliner_Sofa.jpg", tagline: "Rugged suede-finish reclining sofa with channel-stitched cushions", configuration: "3-Seater manual recliner sofa", upholstery: "Warm brown suede-touch fabric, channel-stitched back and seat", material: "Reinforced recliner mechanism, engineered wood base", highlights: ["Extendable footrest", "Contrast top-stitching along seams"], mrp: 36990, price: 25999, color: "Warm Brown" },
  { model: "MTC-111", name: "Oxford Corner", image: "MTC-111_Oxford_Corner.jpg", tagline: "Button-tufted grey corner sofa with built-in wooden tray tables", configuration: "6-Seater L-Shape Corner", upholstery: "Grey fabric, deep button tufting throughout", material: "Polished wood tray-table armrests, block legs", highlights: ["Built-in flip-out wooden side tables on both arms"], mrp: 51990, price: 36999, color: "Grey" },
  { model: "MTC-112", name: "Ruby Velvet Sofa", image: "MTC-112_Ruby_Velvet_Sofa.jpg", tagline: "Statement red velvet sofa set with gold-band bolster cushions", configuration: "3-Seater sofa (matching armchairs available)", upholstery: "Deep red velvet fabric, gold-piped edges", material: "Engineered wood frame, block legs", highlights: ["Gold metallic-band bolster cushions", "Tailored box seating"], mrp: 43990, price: 30999, color: "Deep Red" },
  { model: "MTC-113", name: "Nova Corner", image: "MTC-113_Nova_Corner.jpg", tagline: "Grey fabric corner sofa with a built-in cup-holder console", configuration: "6-Seater L-Shape Corner with center console", upholstery: "Charcoal-grey fabric, contrast top-stitching", material: "Engineered wood frame, block legs", highlights: ["Fold-down center console with twin cup holders"], mrp: 48990, price: 34499, color: "Charcoal Grey" },
  { model: "MTC-114", name: "Grand Bay Corner", image: "MTC-114_Grand_Bay_Corner.jpg", tagline: "Oversized U-shape sectional for large living rooms", configuration: "8-Seater U-Shape Sectional with 2 recliner ends", upholstery: "Grey-brown textured fabric, box-tufted cushions", material: "Wood-trim armrests, reinforced recliner mechanism", highlights: ["Dual recliner ends", "Deep bench seating", "Center console"], mrp: 68990, price: 47999, color: "Grey Brown", featured: true },
  { model: "MTC-115", name: "Onyx Leather Sofa", image: "MTC-115_Onyx_Leather_Sofa.jpg", tagline: "Sleek black leatherette sofa for a modern living room", configuration: "3-Seater sofa", upholstery: "Black leatherette upholstery, box-cushion back", material: "Engineered wood frame, block legs", highlights: ["Water-resistant leatherette finish", "Easy-clean surface"], mrp: 42990, price: 30499, color: "Black" },
];

const lights = [
  { model: "LL-D6054", name: "Cosmo Ring Wall Sconce — Astronaut Edition", category: "LED Wall Light", image: "LL-D6054.jpg", specs: { "Light Mode": "3-in-1 LED — Warm White + RGB + Action", "Body Finish": "White Body, Wood Finish Shelf", Diameter: "300 mm", "List Price": "Rs 1,737" }, description: "A playful ring-form sconce that doubles as a display shelf, the halo of light framing a hand-finished walnut ledge. Perfect for kids' rooms, reading nooks, or a whimsical accent wall — the built-in RGB action mode adds color-changing ambience on demand." },
  { model: "LL-D6056", name: "Cosmo Ring Wall Sconce — Golden Bear Edition", category: "LED Wall Light", image: "LL-D6056.jpg", specs: { "Light Mode": "3-in-1 LED — Warm White + RGB + Action", "Body Finish": "White Body, Wood Finish Shelf", Diameter: "300 mm", "List Price": "Rs 1,737" }, description: "The same beloved ring silhouette as its Cosmo sibling, styled here with a gilded bear figurine on a warm wood shelf. A soft-glow companion piece for nurseries, hallways, and gallery walls that calls for a touch of charm." },
  { model: "LL-D5463", name: "Bubble Drop Chandelier — 16 Strand", category: "LED Cluster Chandelier", image: "LL-D5463.jpg", specs: { "Light Mode": "3-in-1 LED — White + Warm White", Hangings: "16 Strands", "Body Finish": "French Gold, Crystal", "List Price": "Rs 34,750" }, description: "Sixteen crystal bubble pendants cascade from a French-gold ceiling plate at staggered heights, each strand tipped with a faceted glass rod. Designed for stairwells and double-height foyers where a shimmering, jewellery-like drop makes the strongest first impression." },
  { model: "LL-D5464", name: "Bubble Drop Chandelier — 25 Strand Grand", category: "LED Cluster Chandelier", image: "LL-D5464.jpg", specs: { "Light Mode": "3-in-1 LED — White + Warm White", Hangings: "25 Strands", "Body Finish": "French Gold, Crystal", "List Price": "Rs 54,750" }, description: "The full-scale expression of our Bubble Drop family — twenty-five crystal-and-gold strands fill out a wide canopy for a fuller, more theatrical spill of light. Built for grand stairwells, banquet entries, and living rooms with generous ceiling height." },
  { model: "LL-D5462", name: "Icicle Cascade Chandelier", category: "LED Cluster Chandelier", image: "LL-D5462.jpg", specs: { "Light Mode": "3-in-1 LED — White + Warm White", Hangings: "25 Strands", "Body Finish": "French Gold, Crystal", "List Price": "Rs 60,000" }, description: "Elongated crystal icicles taper to soft points, spiralling down from a brushed-gold canopy in an irregular, frozen-waterfall pattern. A striking centrepiece for stairwells and lobby ceilings that calls for real drama and scale." },
  { model: "LL-D5221", name: "Orbit Ring Spiral Pendant", category: "LED Spiral Chandelier", image: "LL-D5221.jpg", specs: { "Light Mode": "3-in-1 LED — White + Warm White", Hangings: "12 Rings", "Body Finish": "Gold, Acrylic", "List Price": "Rs 29,975" }, description: "Twelve illuminated acrylic rings wind down a spiral path like a slow-motion helix, each one glowing from its own gold-trimmed edge. A sculptural, contemporary choice for open stairwells and double-volume dining spaces." },
  { model: "LL-D5246", name: "Feather Leaf Spiral Pendant", category: "LED Spiral Chandelier", image: "LL-D5246.jpg", specs: { "Light Mode": "3-in-1 LED — White + Warm White", Hangings: "10 Leaves", "Body Finish": "Rose Gold, Acrylic", "List Price": "Rs 17,475" }, description: "Ten rose-gold leaf forms spiral gently downward, each lit along its curved edge for a soft, organic glow. Its compact drop suits stairwells, bedside niches, and smaller foyers looking for a graceful sculptural moment." },
  { model: "LL-D5460", name: "Petal Bloom Crystal Chandelier", category: "Crystal Chandelier", image: "LL-D5460.jpg", specs: { "Lamp Holder": "E14", Material: "Heavy Glass + Crystal", Diameter: "600 mm", "List Price": "Rs 22,250" }, description: "Layered glass petals ring the frame like a flower in full bloom, finished with a fringe of hand-cut crystal drops beneath. A romantic, traditional silhouette suited to formal living rooms and dining tables." },
  { model: "LLA1707", name: "Empire Tiered Crystal Chandelier", category: "Crystal Chandelier", image: "LLA1707.jpg", specs: { "Lamp Holder": "E14", "Body Finish": "Gold, Crystal", Diameter: "600 mm", "List Price": "Rs 31,250" }, description: "A classic Empire-style silhouette built from tiers of beaded crystal strands, cinched at the waist and flaring into a full crystal skirt. Timeless proportions make this the natural centrepiece for a formal dining room or grand entry." },
  { model: "LL-D5461", name: "Double-Tier Crystal Drum Chandelier", category: "LED Crystal Chandelier", image: "LL-D5461.jpg", specs: { "Light Mode": "3-in-1 LED — White + Warm White", Material: "Crystal", Diameter: "500 + 350 mm (two tiers)", "List Price": "Rs 29,750" }, description: "Two beaded-crystal drums stack at different diameters, suspended on fine cables for a modern, architectural take on the traditional chandelier. Well suited to contemporary dining rooms and statement islands." },
  { model: "LL-D5459", name: "Peacock Leaf Crystal Chandelier — Small", category: "Crystal Chandelier", image: "LL-D5459.jpg", specs: { "Lamp Holder": "E14", Material: "Heavy Glass + Crystal", Diameter: "600 mm", "List Price": "Rs 19,750" }, description: "Textured glass leaves fan outward in an intricate, feather-like layering, each edge caught with hand-set crystal beads. A refined statement piece sized for standard-height dining rooms and bedrooms." },
  { model: "LL-D5458", name: "Peacock Leaf Crystal Chandelier — Grand", category: "Crystal Chandelier", image: "LL-D5458.jpg", specs: { "Lamp Holder": "E14", Material: "Heavy Glass + Crystal", Diameter: "800 mm", "List Price": "Rs 32,250" }, description: "The larger sibling in the Peacock Leaf family, scaled up to 800mm for double-height living rooms and grand dining spaces. Tier upon tier of etched glass leaves catch and scatter light from every angle." },
  { model: "LL-D5457", name: "Botanical Leaf Crystal Chandelier", category: "Crystal Chandelier", image: "LL-D5457.jpg", specs: { "Lamp Holder": "E14", Material: "Heavy Glass + Crystal", Diameter: "600 mm", "List Price": "Rs 19,750" }, description: "Rounded glass leaves layer into a full, textural canopy over a crystal-fringed underside, finished with a hand-twisted stem. A softer, botanical take on the crystal chandelier for bedrooms and reading rooms." },
  { model: "LL.A41700/11C FGD", name: "Vortex Ring Cascade Chandelier — 11 Ring", category: "LED Spiral Chandelier", image: "LL.A41700-11C-FGD.jpg", specs: { "Light Mode": "3-in-1 LED — White + Warm White", "Drop Range": "1200 mm to 200 mm (adjustable)", Controls: "Dimmer Option, Remote Option", "Ring Count": "11 rings" }, description: "Eleven illuminated gold rings twist downward in a tightening spiral, evoking a slow tornado of light. Fully adjustable drop height plus dimmer and remote control make this a striking, flexible centrepiece for tall stairwells and atriums.", onRequest: true },
  { model: "LL.A41700/9C FGD", name: "Vortex Ring Cascade Chandelier — 9 Ring", category: "LED Spiral Chandelier", image: "LL.A41700-9C-FGD.jpg", specs: { "Light Mode": "3-in-1 LED — White + Warm White", "Drop Range": "1000 mm to 200 mm (adjustable)", Controls: "Dimmer Option, Remote Option", "Ring Count": "9 rings" }, description: "A more compact version of our Vortex Ring Cascade, with nine spiralling rings suited to standard-height stairwells and living rooms. Same adjustable drop, dimmer, and remote-control convenience in a tighter footprint.", onRequest: true },
  { model: "7921", name: "Lantern Globe Wall Light", category: "LED Wall Light", image: "MODEL-7921.jpg", specs: { "Light Mode": "3-in-1 LED", "Body Finish": "Gold", Style: "Lantern-cage with crystal globe base", "Fixture Type": "Wall Sconce" }, description: "A gilded lantern cage frames a beaded crystal globe, throwing a soft starburst of light across the wall behind it. A compact, jewel-like wall light for hallways, staircases, and either side of a bed or mirror.", onRequest: true },
  { model: "8206", name: "Twist Sphere Wall Light", category: "LED Wall Light — 3-in-1", image: "8206.jpg", specs: { "Light Mode": "3-in-1 LED", "Body Finish": "Gold", Style: "Twin textured-glass spheres, spiral wrap", "Fixture Type": "Wall Sconce" }, description: "Two textured glass spheres bookend a gold spiral that winds between them, casting a warm radial glow in both directions. A symmetrical, sculptural wall light suited to corridors and either side of a console or headboard.", onRequest: true },
  { model: "8128", name: "Halo Orb Wall Light", category: "LED Wall Light — 3-in-1, Warm White", image: "8128.jpg", specs: { "Light Mode": "LED, Warm White", "Body Finish": "Gold", Style: "Ringed halo over a fluted glass orb", "Fixture Type": "Wall Sconce" }, description: "A glowing gold halo ring frames a fluted crystal orb below, layering two light sources into one compact fixture. Warm, inviting, and detailed enough to stand alone as an accent beside artwork or a bathroom mirror.", onRequest: true },
  { model: "S185/50", name: "Floral Bloom Cluster Chandelier", category: "LED Cluster Chandelier — 3-in-1", image: "S185-50.jpg", specs: { "Light Mode": "3-in-1 LED", "Body Finish": "Gold, Crystal Bubble Rods", Style: "Multi-tier floral-clip cluster drop", "Fixture Type": "Ceiling Chandelier" }, description: "Dozens of crystal bubble rods hang in loose floral-clipped clusters at staggered heights, building a dense, glittering canopy from a single round plate. A show-stopping choice for tall stairwells and grand double-height rooms.", onRequest: true },
];

const furnitureProducts = furniture.map((item, index) => {
  const category = furnitureCategory(item.name, item.configuration);
  const imagePath = `/Metro_Product_Images/${item.image}`;
  const discount = item.mrp && item.price ? Math.round((1 - item.price / item.mrp) * 100) : null;

  return {
    id: `mtc-${index + 101}`,
    slug: slugify(item.name),
    model: item.model,
    name: item.name,
    category,
    tagline: item.tagline,
    price: item.price,
    mrp: item.mrp,
    priceUnit: "set",
    priceLabel: formatPriceLabel(item.price),
    material: item.material,
    color: item.color,
    configuration: item.configuration,
    upholstery: item.upholstery,
    image: imagePath,
    images: [imagePath],
    warranty: true,
    onRequest: false,
    featured: Boolean(item.featured),
    offer: discount ? `${discount}% OFF` : null,
    description: `${item.tagline}. ${item.configuration}. ${item.upholstery}.`,
    features: [
      item.configuration,
      item.upholstery,
      item.material,
      ...item.highlights,
      "Available at Metro Furniture showroom, Dharmapuri",
    ],
    specs: [
      { label: "Configuration", value: item.configuration },
      { label: "Upholstery", value: item.upholstery },
      { label: "Frame & Legs", value: item.material },
      ...(item.color ? [{ label: "Colour", value: item.color }] : []),
    ],
    tags: [category.toLowerCase(), item.color?.toLowerCase(), "sofa", "furniture"].filter(Boolean),
    related: [],
    source: "catalog",
  };
});

const lightProducts = lights.map((item, index) => {
  const category = lightCategory(item.category);
  const isChandelier = category === "Chandeliers";
  const imagePath = `/Lights_Products/${item.image}`;
  const listPrice = isChandelier ? null : parseRs(item.specs?.["List Price"]);
  const onRequest = isChandelier || item.onRequest || listPrice == null;
  const specsList = Object.entries(item.specs || {})
    .filter(([label]) => !(isChandelier && label === "List Price"))
    .map(([label, value]) => ({ label, value }));

  return {
    id: `light-${index + 1}`,
    slug: slugify(item.name),
    model: item.model,
    name: item.name,
    category,
    tagline: item.category,
    price: onRequest ? null : listPrice,
    mrp: null,
    priceUnit: "pc",
    priceLabel: onRequest ? "Get Best Price" : formatPriceLabel(listPrice),
    material: item.specs?.Material || item.specs?.["Body Finish"] || "Crystal & Metal",
    color: item.specs?.["Body Finish"]?.includes("Gold") ? "Gold" : undefined,
    image: imagePath,
    images: [imagePath],
    warranty: true,
    onRequest,
    featured: index < 4,
    offer: onRequest ? null : null,
    description: item.description,
    features: specsList.map((s) => `${s.label}: ${s.value}`),
    specs: specsList,
    tags: [category.toLowerCase(), "lighting", "led", item.category.toLowerCase()],
    related: [],
    source: "catalog",
  };
});

const upcoming = [
  {
    model: "BF-501",
    name: "Designer Wash Basin",
    category: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80&auto=format&fit=crop",
    tagline: "Counter-top ceramic wash basin",
    material: "Ceramic",
    description: "Elegant counter-top wash basin — pairs with premium taps and fittings.",
    features: ["Ceramic construction", "Counter-top mount", "Easy-clean glaze", "Multiple colours"],
  },
  {
    model: "BF-502",
    name: "Chrome Basin Mixer Tap",
    category: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80&auto=format&fit=crop",
    tagline: "Single-lever chrome mixer tap",
    material: "Chrome Brass",
    description: "Premium chrome basin mixer with ceramic disc cartridge and smooth single-lever control.",
    features: ["Chrome finish", "Ceramic disc", "Single-lever", "Anti-drip"],
  },
  {
    model: "BF-503",
    name: "Wall Mixer Tap",
    category: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
    tagline: "Wall-mounted hot & cold mixer",
    material: "Chrome Brass",
    description: "Wall-mounted mixer tap for bathroom basins — compact, modern Indian bathroom fit.",
    features: ["Wall mount", "Hot & cold", "Chrome body", "Easy install"],
  },
  {
    model: "BF-504",
    name: "Pillar Cock Tap",
    category: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&auto=format&fit=crop",
    tagline: "Classic pillar cock for wash basins",
    material: "Chrome Brass",
    description: "Traditional pillar cock tap with cross-head handles — durable brass body for everyday use.",
    features: ["Pillar mount", "Cross handles", "Brass body", "Long-lasting"],
  },
  {
    model: "BF-505",
    name: "Health Faucet Jet Spray",
    category: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80&auto=format&fit=crop",
    tagline: "Handheld health faucet with hose",
    material: "Chrome ABS",
    description: "Wall-mounted health faucet with flexible hose — essential for modern Indian bathrooms.",
    features: ["Flexible hose", "Wall bracket", "Chrome finish", "Easy grip"],
  },
  {
    model: "BF-506",
    name: "Concealed Shower Mixer",
    category: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&auto=format&fit=crop",
    tagline: "Concealed diverter with overhead shower",
    material: "Chrome Brass",
    description: "Concealed shower mixer with diverter — clean wall look with overhead rain shower option.",
    features: ["Concealed body", "Diverter", "Rain shower ready", "Premium chrome"],
  },
  {
    model: "BF-507",
    name: "Sensor Automatic Tap",
    category: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
    tagline: "Touchless infrared sensor tap",
    material: "Chrome & Sensor Module",
    description: "Automatic sensor tap for basins — hygienic, water-saving option for homes and offices.",
    features: ["Infrared sensor", "Water saving", "Battery/AC option", "Chrome spout"],
  },
  {
    model: "BF-508",
    name: "Rain Shower Head Set",
    category: "Bathroom Fittings",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80&auto=format&fit=crop",
    tagline: "Overhead rain shower with hand shower",
    material: "Stainless Steel & Chrome",
    description: "Luxury rain shower set with adjustable hand shower and anti-clog nozzles.",
    features: ["Rain head", "Hand shower", "Anti-clog", "Chrome arm"],
  },
];

const chairs = [
  {
    model: "CHR-201",
    name: "Executive Mesh Chair",
    category: "Chairs",
    image: "/chair-furniture (1).jpg",
    tagline: "Ergonomic office & study chair with breathable mesh back",
    material: "Mesh & Metal Frame",
    description: "Premium ergonomic chair with adjustable height, lumbar support and smooth swivel base — ideal for home office and study.",
    features: ["Adjustable height", "Breathable mesh back", "360° swivel", "Sturdy metal base"],
  },
  {
    model: "CHR-202",
    name: "Premium Lounge Chair",
    category: "Chairs",
    image: "/chair-furniture (2).jpg",
    tagline: "Comfort lounge chair for living room & reception",
    material: "Fabric & Wood",
    description: "Elegant lounge chair with cushioned seat and curved wooden arms — perfect for living rooms and reading corners.",
    features: ["Plush cushioning", "Wooden armrests", "Compact footprint", "Showroom display piece"],
  },
];

const mattresses = [
  {
    model: "MAT-401",
    name: "Orthopaedic Memory Foam Mattress",
    category: "Mattresses",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop",
    tagline: "Doctor-recommended orthopaedic support",
    material: "Memory Foam",
    description: "High-density memory foam mattress with orthopaedic support — available in king, queen and custom sizes.",
    features: ["Orthopaedic support", "Memory foam comfort", "King & queen sizes", "10-year warranty option"],
  },
  {
    model: "MAT-402",
    name: "Pocket Spring Mattress",
    category: "Mattresses",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80&auto=format&fit=crop",
    tagline: "Individual pocket springs for zero partner disturbance",
    material: "Pocket Spring",
    description: "Premium pocket spring mattress with quilted top layer — ideal for couples who want independent support.",
    features: ["Pocket spring core", "Quilted comfort layer", "Anti-microbial fabric", "Custom sizes available"],
  },
];

function buildExtraProduct(item, index, prefix, { upcoming: isUpcoming = false } = {}) {
  return {
    id: `${prefix}-${index + 1}`,
    slug: slugify(item.name),
    model: item.model,
    name: item.name,
    category: item.category,
    tagline: item.tagline,
    price: null,
    mrp: null,
    priceUnit: "pc",
    priceLabel: "Get Best Price",
    material: item.material,
    image: item.image,
    images: [item.image],
    warranty: true,
    onRequest: true,
    featured: !isUpcoming,
    upcoming: isUpcoming,
    offer: isUpcoming ? "Coming Soon" : null,
    description: item.description,
    features: item.features,
    specs: item.features.map((f, i) => ({ label: `Feature ${i + 1}`, value: f })),
    tags: [item.category.toLowerCase(), isUpcoming ? "upcoming" : "enquire"],
    related: [],
    source: isUpcoming ? "upcoming" : "catalog",
  };
}

const chairProducts = chairs.map((item, i) => buildExtraProduct(item, i, "chair"));
const mattressProducts = mattresses.map((item, i) => buildExtraProduct(item, i, "mattress"));
const upcomingProducts = upcoming.map((item, i) =>
  buildExtraProduct(item, i, "upcoming", { upcoming: true })
);

const products = [
  ...furnitureProducts,
  ...lightProducts,
  ...chairProducts,
  ...mattressProducts,
  ...upcomingProducts,
];

for (const product of products) {
  product.related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
    .map((p) => p.id);
}

const outPath = path.join(ROOT, "data", "catalog-products.json");
fs.writeFileSync(outPath, JSON.stringify(products, null, 2));
console.log(`Built ${products.length} catalog products -> data/catalog-products.json`);
