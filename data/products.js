import catalogProducts from "@/data/catalog-products.json";

/** Product catalogue — Metro Furniture sofas & designer lighting. */
export const products = catalogProducts;

export const trustBadges = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "Curated sofas and designer lighting from trusted manufacturers",
  },
  {
    id: "range",
    title: "Signature Collection",
    description: "15 sofa & corner models plus 19 designer light fixtures",
  },
  {
    id: "custom",
    title: "Custom Options",
    description: "Fabric, size and finish choices tailored to your home",
  },
  {
    id: "local",
    title: "Trusted in Dharmapuri",
    description: "Serving Salem Main Road and surrounding areas since years",
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Vediyappan",
    location: "Dharmapuri",
    quote:
      "Excellent furniture collection at Metro Furniture. Good quality sofas and helpful staff on Salem Main Road.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Priya M.",
    location: "Senthil Nagar",
    quote:
      "Our Alaska Corner fits perfectly in the living room. Fair pricing and professional service.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Suresh V.",
    location: "Lakkiampatti",
    quote:
      "Beautiful chandelier for our stairwell. Staff was patient and never pushed us to buy.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Divya K.",
    location: "Dharmapuri",
    quote:
      "Purchased the Sagar Corner recliner set. Delivery was on time and the quality is excellent.",
    rating: 5,
  },
];

export const heroSlides = [
  {
    id: "slide-1",
    image: "/hero.png",
    alt: "Metro Furniture — Premium furniture showroom, Dharmapuri",
  },
  // {
  //   id: "slide-2",
  //   image: "/sofa.png",
  //   alt: "Metro Furniture — Stylish sofas and home furniture",
  // },
  // {
  //   id: "slide-3",
  //   image: "/bathroom-fitting.png",
  //   alt: "Alaska Corner — Signature Collection",
  // }
 
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product) {
  if (!product?.related?.length) return [];
  return product.related
    .map((id) => products.find((item) => item.id === id))
    .filter(Boolean);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

export function getOfferProducts() {
  return products.filter((product) => product.offer && !product.onRequest);
}

export function getBestsellers() {
  const featured = getFeaturedProducts();
  if (featured.length >= 6) return featured.slice(0, 6);
  return products.slice(0, 6);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) => {
    const haystack = [
      product.name,
      product.model,
      product.category,
      product.material,
      product.color,
      product.description,
      product.tagline,
      product.configuration,
      ...(product.tags || []),
      ...(product.features || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getShowroomImages() {
  return products
    .filter((p) => p.image?.startsWith("/Metro_Product_Images"))
    .map((p) => p.image)
    .slice(0, 12);
}

export function getUpcomingProducts() {
  return products.filter((p) => p.upcoming);
}

export function getBestFurniture() {
  const featured = products.filter((p) => p.featured && !p.upcoming);
  if (featured.length >= 8) return featured.slice(0, 10);
  return products.filter((p) => !p.upcoming).slice(0, 10);
}
