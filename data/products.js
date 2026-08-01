import justdialProducts from "@/data/justdial-products.json";

/** Product catalogue sourced from JustDial Metro Furniture gallery. */
export const products = justdialProducts;

export const trustBadges = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "Curated furniture from trusted manufacturers and craftsmen",
  },
  {
    id: "range",
    title: "Wide Selection",
    description: "Sofas, beds, dining, wardrobes, mattresses and more under one roof",
  },
  {
    id: "custom",
    title: "Custom Options",
    description: "Fabric, size and finish choices tailored to your home",
  },
  {
    id: "local",
    title: "Trusted in Dharmapuri",
    description: "Serving Salem Main Road and surrounding areas",
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
      "Our sofa set fits perfectly in the living room. Fair pricing and professional service.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Suresh V.",
    location: "Lakkiampatti",
    quote:
      "Great range of dining sets and office furniture. Staff was patient and never pushed us to buy.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Divya K.",
    location: "Dharmapuri",
    quote:
      "Purchased a Nilkamal bed and dining set. Delivery was on time and both pieces are excellent.",
    rating: 5,
  },
];

export const heroSlides = [
  {
    id: "slide-1",
    image: "/hero.png",
    alt: "Metro Furniture showroom — Salem Main Road, Dharmapuri",
  },
  {
    id: "slide-2",
    image: "/hero-1.png",
    alt: "Metro Furniture premium collection",
  },
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
  return products.filter((product) => product.onRequest);
}

export function getBestsellers() {
  const slugs = [
    "sofa-set",
    "nilkamal-hermiston-6-seater-dining-set-brown",
    "nilkamal-czar-2-queen-bed-beech-walnut",
    "supreme-furniture-ornate-black-red",
    "godrej-interio-office-furniture-reception-tables-first-impression",
    "wall-mounted-tv-unit-7ft",
  ];
  const picked = slugs.map((slug) => getProductBySlug(slug)).filter(Boolean);
  if (picked.length >= 4) return picked;
  return getFeaturedProducts().slice(0, 6);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) => {
    const haystack = [
      product.name,
      product.category,
      product.material,
      product.color,
      product.description,
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
  const urls = products
    .filter((p) => p.image?.includes("9999p4342"))
    .map((p) => p.image);
  return [...new Set(urls)];
}
