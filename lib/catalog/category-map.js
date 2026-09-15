/** Map catalog JSON `category` labels → DB category slug */
export const CATALOG_CATEGORY_TO_SLUG = {
  "Corner Sofas": "corner-sofas",
  Sofas: "sofas",
  Mattresses: "mattresses",
  Dining: "dining",
  Chairs: "chairs",
  Tables: "tables",
  Chandeliers: "chandeliers",
  "Wall Lights": "wall-lights",
  "Bathroom Fittings": "bathroom-fittings",
  "Cots & Beds": "cots-beds",
  Lighting: "lighting",
  Wardrobes: "wardrobes",
  Accessories: "accessories",
};

export function catalogCategorySlug(catalogCategory) {
  if (!catalogCategory) return "accessories";
  return (
    CATALOG_CATEGORY_TO_SLUG[catalogCategory] ||
    catalogCategory
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}
