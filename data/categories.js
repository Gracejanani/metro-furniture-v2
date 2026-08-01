import { resolveCategoryImage } from "@/data/images";
import { products } from "@/data/products";

function byCategory(id) {
  return products.filter((p) => p.category === id);
}

export const categories = [
  {
    id: "Sofas",
    name: "Sofas",
    slug: "sofas",
    description: "3, 5 & 7 seater sofas, L-shape & sectional sets",
    image: resolveCategoryImage("Sofas", byCategory("Sofas")),
    materials: ["Fabric", "Leatherette", "Wood"],
  },
  {
    id: "Beds",
    name: "Beds",
    slug: "beds",
    description: "King, queen & storage beds in solid wood",
    image: resolveCategoryImage("Beds", byCategory("Beds")),
    materials: ["Wood", "Engineered Wood"],
  },
  {
    id: "Dining",
    name: "Dining",
    slug: "dining",
    description: "4 to 8 seater dining table sets",
    image: resolveCategoryImage("Dining", byCategory("Dining")),
    materials: ["Wood", "Marble Top", "Glass"],
  },
  {
    id: "Wardrobes",
    name: "Wardrobes",
    slug: "wardrobes",
    description: "Sliding & hinged wardrobes with mirror options",
    image: resolveCategoryImage("Wardrobes", byCategory("Wardrobes")),
    materials: ["Engineered Wood", "Plywood"],
  },
  {
    id: "TV Units",
    name: "TV Units",
    slug: "tv-units",
    description: "Wall units & media consoles for modern living rooms",
    image: resolveCategoryImage("TV Units", byCategory("TV Units")),
    materials: ["Engineered Wood", "Glass"],
  },
  {
    id: "Office Furniture",
    name: "Office Furniture",
    slug: "office-furniture",
    description: "Executive desks, chairs & filing cabinets",
    image: resolveCategoryImage("Office Furniture", byCategory("Office Furniture")),
    materials: ["Wood", "Metal", "Leatherette"],
  },
  {
    id: "Mattresses",
    name: "Mattresses",
    slug: "mattresses",
    description: "Orthopaedic, memory foam & spring mattresses",
    image: resolveCategoryImage("Mattresses", byCategory("Mattresses")),
    materials: ["Memory Foam", "Spring", "Coir"],
  },
  {
    id: "Recliners",
    name: "Recliners",
    slug: "recliners",
    description: "Manual & motorised recliners for ultimate comfort",
    image: resolveCategoryImage("Recliners", byCategory("Recliners")),
    materials: ["Fabric", "Leatherette"],
  },
  {
    id: "Coffee Tables",
    name: "Coffee Tables",
    slug: "coffee-tables",
    description: "Centre tables, nested sets & glass tops",
    image: resolveCategoryImage("Coffee Tables", byCategory("Coffee Tables")),
    materials: ["Wood", "Glass", "Marble"],
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}
