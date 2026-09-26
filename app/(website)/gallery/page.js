import Link from "next/link";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import { business } from "@/data/business";
import { galleryImages } from "@/data/gallery";
import { getFeaturedProducts } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description: `Explore ${business.name} showroom displays. Follow @metrofurnituredpi on Instagram for latest photos.`,
  path: "/gallery",
  keywords: ["Gallery", "Instagram", "Showroom", "Furniture Photos"],
});

export default function GalleryPage() {
  const featured = getFeaturedProducts().filter((p) => !p.upcoming);

  return (
    <>
      <PageBanner
        title="Gallery"
        description="Real photos from our Salem Main Road showroom."
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
            className="premium-button rounded-2xl bg-accent px-5 py-2.5 text-sm font-semibold text-primary transition"
          >
            Follow @metrofurnituredpi
          </Link>
        </div>

        <SectionHeading
          title="Showroom Gallery"
          description="Photos from our Dharmapuri showroom — sofas, corners & living room displays."
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((item, i) => (
            <div
              key={item.src}
              className="group glass-card glass-photo-frame luxury-shadow-hover mb-4 break-inside-avoid overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </div>
              <p className="glass-product-info px-4 py-3 text-sm font-medium text-body">{item.alt}</p>
            </div>
          ))}
        </div>

        {featured.length ? (
          <div className="mt-16">
            <SectionHeading
              title="Featured Products"
              description="Catalogue items from our showroom collection."
            />
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {featured.slice(0, 6).map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="group glass-card glass-photo-frame luxury-shadow-hover mb-4 block break-inside-avoid overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="glass-product-info px-4 py-3 text-sm font-semibold">{p.name}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
