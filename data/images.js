/**
 * Image helpers for local catalog assets and fallbacks.
 */
export const unsplash = {
  hero: ["/hero.png", "/hero-1.png"],
  category: {
    "Corner Sofas": "/Metro_Product_Images/MTC-101_Alaska_Corner.jpg",
    Sofas: "/Metro_Product_Images/MTC-104_Cairo_Sofa.jpg",
    Dining: "/Gallery/IMG-20260815-WA0023.jpg",
    Chairs: "/chair-furniture (1).jpg",
    Mattresses: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop",
    Chandeliers: "/Lights_Products/LL-D5463.jpg",
    "Wall Lights": "/Lights_Products/LL-D6054.jpg",
    "Bathroom Fittings":
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80&auto=format&fit=crop",
  },
  showroom: [
    "/Gallery/IMG-20260815-WA0018.jpg",
    "/Gallery/IMG-20260815-WA0019.jpg",
    "/Gallery/IMG-20260815-WA0030.jpg",
    "/Gallery/IMG-20260815-WA0038.jpg",
  ],
};

export function categoryFallback(category) {
  return unsplash.category[category] || unsplash.category.Sofas;
}

export function resolveImage(category, current) {
  if (current) return current;
  return categoryFallback(category);
}

export function resolveCategoryImage(categoryId, productsInCategory = []) {
  const fromProduct = productsInCategory[0]?.image;
  if (fromProduct) return fromProduct;
  return categoryFallback(categoryId);
}
