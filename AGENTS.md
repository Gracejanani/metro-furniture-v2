# AGENTS.md — Metro Furniture Website

Instructions for AI coding agents building/editing this project. Keep answers and diffs terse.

## Brand
- Name: Metro Furniture | Salem Main Road, Senthil Nagar, Dharmapuri, TN, India
- Tagline: "Dharmapuri's Trusted Furniture Destination"
- Subtitle: "Stylish Sofas • Quality Furniture"
- Phone: +91 93676 47555 | Email: metrodharmapuri@gmail.com
- Social: instagram.com/metrofurnituredpi

## Design Tokens
```
--background:#F8FAFC  --surface:#FFFFFF
--accent:#C8A96A       --foreground:#111827
--body:#6B7280
font-head: Playfair Display
font-body: Inter
font-ta: Noto Sans Tamil
```
Style: premium luxury, glassmorphism, soft shadows, large rounded corners, Framer Motion animations.

## Pages
`/` `/shop` `/shop/:category` `/product/:slug` `/gallery` `/about` `/contact`

Every page needs: sticky WhatsApp+Call FAB, mobile-first, lazy-loaded images, SEO meta per product/category.

## Data Model
```ts
type Product = {
  slug: string; name: string; category: Category;
  price: number | null;
  priceUnit: "pc" | "set";
  priceLabel: string;
  material: string; color?: string;
  images: string[]; warranty: boolean;
  onRequest: boolean;
};
type Category = "Sofas"|"Beds"|"Dining"|"Wardrobes"|"TV Units"|"Office Furniture"|"Mattresses"|"Recliners"|"Coffee Tables";
```

## Rules
1. Precompute `priceLabel` at seed/build time.
2. `null` price → "Get Best Price" / "Add to Quote" via WhatsApp with prefilled product name.
3. Reuse `<ProductCard>` and `<ProductGrid>` — don't duplicate markup.
4. WhatsApp CTA: `https://wa.me/919367647555?text=Enquiry%20about%20{product.name}`
5. Keep copy bilingual-ready for future EN/TA toggle.
