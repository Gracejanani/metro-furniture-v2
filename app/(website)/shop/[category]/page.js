import { Suspense } from "react";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ProductGridSkeleton from "@/components/ProductSkeleton";
import ShopCatalog from "@/components/ShopCatalog";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return buildMetadata({
      title: "Category Not Found",
      description: "Furniture category not found.",
      path: "/shop",
    });
  }
  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/shop/${category.slug}`,
    keywords: [category.name, category.id],
  });
}

export default async function CategoryPage({ params }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.id);

  return (
    <>
      <PageBanner
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: category.name },
        ]}
        compact
      />

      <section className="container mx-auto px-4 py-8 md:py-12">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ShopCatalog products={items} />
        </Suspense>
      </section>
    </>
  );
}
