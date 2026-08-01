import { siteUrl } from "@/data/business";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/gallery",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteUrl}/shop/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
