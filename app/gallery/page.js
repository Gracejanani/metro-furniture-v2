import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import { business } from "@/data/business";
import { images } from "@/data/content";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description: `Explore ${business.name} showroom displays. Follow @metrofurnituredpi on Instagram for latest photos.`,
  path: "/gallery",
  keywords: ["Gallery", "Instagram", "Showroom", "Furniture Photos"],
});

export default function GalleryPage() {
  const featured = getFeaturedProducts();
  const galleryItems = [
    ...images.showroom.map((src, i) => ({
      id: `showroom-${i}`,
      src,
      alt: `Metro Furniture showroom display ${i + 1}`,
      href: "/contact",
    })),
    ...featured.slice(0, 6).map((p) => ({
      id: p.id,
      src: p.image,
      alt: p.name,
      href: `/product/${p.slug}`,
    })),
    ...categories.slice(0, 3).map((c) => ({
      id: `cat-${c.id}`,
      src: c.image,
      alt: c.name,
      href: `/shop/${c.slug}`,
    })),
  ];

  return (
    <>
      <PageBanner
        title="Gallery"
        description="A glimpse of our premium showroom on Salem Main Road."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={business.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
          >
            Follow @metrofurnituredpi
          </Link>
        </div>

        <SectionHeading
          title="Showroom & Collections"
          description="Premium furniture displays from our Dharmapuri showroom."
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group mb-4 block break-inside-avoid overflow-hidden rounded-3xl glass-card luxury-shadow-hover"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="px-4 py-3 text-sm font-medium">{item.alt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
