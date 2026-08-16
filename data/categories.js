import { resolveCategoryImage } from "@/data/images";
import { products } from "@/data/products";

function byCategory(id) {
  return products.filter((p) => p.category === id);
}

export const categories = [
  {
    id: "Corner Sofas",
    name: "Corner Sofas",
    slug: "corner-sofas",
    description: "L-shape & U-shape corner sets with recliners and storage",
    image: resolveCategoryImage("Corner Sofas", byCategory("Corner Sofas")),
    materials: ["Fabric", "Velvet", "Leatherette"],
  },
  {
    id: "Sofas",
    name: "Sofa Sets",
    slug: "sofas",
    description: "3+1+1 recliner sets and premium sofa collections",
    image: resolveCategoryImage("Sofas", byCategory("Sofas")),
    materials: ["Fabric", "Velvet", "Leatherette"],
  },
  {
    id: "Dining",
    name: "Dining",
    slug: "dining",
    description: "4 to 8 seater dining table sets for Indian homes",
    image: resolveCategoryImage("Dining", byCategory("Dining")),
    materials: ["Wood", "Marble Top", "Glass"],
  },
  {
    id: "Chairs",
    name: "Chairs",
    slug: "chairs",
    description: "Office, lounge & dining chairs for every room",
    image: resolveCategoryImage("Chairs", byCategory("Chairs")),
    materials: ["Mesh", "Fabric", "Wood"],
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
    id: "Chandeliers",
    name: "Chandeliers",
    slug: "chandeliers",
    description: "Crystal, LED cluster & spiral chandeliers for grand spaces",
    image: resolveCategoryImage("Chandeliers", byCategory("Chandeliers")),
    materials: ["Crystal", "Gold Finish", "LED"],
  },
  {
    id: "Wall Lights",
    name: "Wall Lights",
    slug: "wall-lights",
    description: "Designer LED wall sconces for hallways, bedrooms & accents",
    image: resolveCategoryImage("Wall Lights", byCategory("Wall Lights")),
    materials: ["Crystal", "Gold Finish", "LED"],
  },
  {
    id: "Bathroom Fittings",
    name: "Bathroom Fittings",
    slug: "bathroom-fittings",
    description: "Wash basins, taps, vanity units & shower fittings",
    image: resolveCategoryImage("Bathroom Fittings", byCategory("Bathroom Fittings")),
    materials: ["Ceramic", "Chrome", "Stainless Steel"],
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}
