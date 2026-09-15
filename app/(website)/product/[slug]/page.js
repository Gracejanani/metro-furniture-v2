import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductBuyBox from "@/components/ProductBuyBox";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { getCategoryById } from "@/data/categories";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return buildMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: "/shop",
    });
  }

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/product/${product.slug}`,
    keywords: [product.category, product.material, product.model, ...(product.tags || [])],
  });
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);
  const gallery = product.images?.length ? product.images : [product.image];
  const category = getCategoryById(product.category);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    ...(category
      ? [{ label: category.name, href: `/shop/${category.slug}` }]
      : []),
    { label: product.name },
  ];

  return (
    <>
      <div className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-white/80 to-background/50">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,162,77,0.12),transparent)]" />
        <div className="container relative mx-auto px-4 py-4">
          <Breadcrumb items={crumbs} />
        </div>
      </div>

      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <Suspense
            fallback={
              <div className="space-y-4" aria-hidden="true">
                <div className="skeleton aspect-[4/5] rounded-3xl" />
                <div className="flex gap-3">
                  <div className="skeleton h-20 w-20 rounded-2xl" />
                  <div className="skeleton h-20 w-20 rounded-2xl" />
                </div>
              </div>
            }
          >
            <ProductGallery
              images={gallery}
              name={product.name}
              offer={product.offer}
            />
          </Suspense>

          <ProductBuyBox product={product} />
        </div>
      </section>

      {related.length ? (
        <section className="border-t border-border/60 bg-gradient-to-b from-muted/40 via-background to-background py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                title="You may also like"
                description="More from the same category."
                align="left"
                className="mb-0"
              />
              {category ? (
                <Link
                  href={`/shop/${category.slug}`}
                  className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  View all {category.name}
                </Link>
              ) : null}
            </div>
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </>
  );
}
