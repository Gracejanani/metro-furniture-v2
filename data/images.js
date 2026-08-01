/**
 * Curated, category-matched image URLs.
 * JustDial (jdmagicbox) preferred for real showroom photos.
 * Unsplash used only as fallback — each URL verified for the matching category.
 */
export const unsplash = {
  hero: [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1920&q=80",
  ],
  category: {
    Sofas: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    Beds: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    Dining: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    Wardrobes: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    "TV Units": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    "Office Furniture": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    Mattresses: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    Recliners: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "Coffee Tables": "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80",
  },
  showroom: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  ],
};

export function isJustDialImage(url) {
  return Boolean(url && /jdmagicbox\.com/i.test(url));
}

export function categoryFallback(category) {
  return unsplash.category[category] || unsplash.category.Sofas;
}

/** Pick best image: keep JustDial if valid, else category-matched Unsplash */
export function resolveImage(category, current) {
  if (isJustDialImage(current)) return current;
  return categoryFallback(category);
}

export function resolveCategoryImage(categoryId, productsInCategory = []) {
  const fromProduct = productsInCategory.find((p) => isJustDialImage(p.image));
  if (fromProduct) return fromProduct.image;
  const anyProduct = productsInCategory[0]?.image;
  if (anyProduct && isJustDialImage(anyProduct)) return anyProduct;
  return categoryFallback(categoryId);
}
