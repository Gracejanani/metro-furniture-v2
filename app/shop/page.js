import { Suspense } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import PageBanner from "@/components/PageBanner";
import ProductGridSkeleton from "@/components/ProductSkeleton";
import SearchBar from "@/components/SearchBar";
import ShopCatalog from "@/components/ShopCatalog";
import { categories } from "@/data/categories";
import { business } from "@/data/business";
import { products, searchProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Shop Sofas & Designer Lighting",
  description: `Browse corner sofas, sofa sets and designer lighting at ${business.name}, Dharmapuri.`,
  path: "/shop",
  keywords: ["Shop", "Sofa", "Corner Sofa", "Chandelier", "Wall Light", "Dharmapuri"],
});

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";
  const category = params?.category || "all";
  const material = params?.material || "all";

  let filtered = query ? searchProducts(query) : [...products];
  if (category && category !== "all") {
    const match = categories.find(
      (c) => c.slug === category || c.id === category
    );
    const id = match?.id || category;
    filtered = filtered.filter((product) => product.category === id);
  }
  if (material && material !== "all") {
    filtered = filtered.filter(
      (product) =>
        product.material?.toLowerCase() === material.toLowerCase()
    );
  }

  return (
    <>
      <PageBanner
        title="Shop"
        description="Premium sofas, corner sets & designer lighting — filter by category."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
        compact
      />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="rounded-3xl glass-card p-4 sm:p-6">
          <div className="mb-5 max-w-2xl">
            <Suspense
              fallback={<div className="skeleton h-14 rounded-2xl" aria-hidden="true" />}
            >
              <SearchBar />
            </Suspense>
          </div>

          <Suspense
            fallback={<div className="skeleton h-10 rounded-full" aria-hidden="true" />}
          >
            <CategoryTabs categories={categories} basePath="/shop" />
          </Suspense>
        </div>

        <div className="mt-8 md:mt-10">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ShopCatalog products={filtered} query={query} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
