import Link from "next/link";
import Image from "next/image";
import CategoryCard from "@/components/CategoryCard";
import CollectionCard from "@/components/CollectionCard";
import CtaBanner from "@/components/CtaBanner";
import FAQ from "@/components/FAQ";
import ProductSlider from "@/components/ProductSlider";
import UpcomingSlider from "@/components/UpcomingSlider";
import GalleryCarousel from "@/components/GalleryCarousel";
import HeroSlider from "@/components/HeroSlider";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import TrustBadges from "@/components/TrustBadges";
import AnimateIn from "@/components/AnimateIn";
import CallButton from "@/components/CallButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { business } from "@/data/business";
import { categories } from "@/data/categories";
import { collections, faqs, images } from "@/data/content";
import {
  getBestFurniture,
  getBestsellers,
  getUpcomingProducts,
  heroSlides,
  testimonials,
  trustBadges,
} from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${business.name} | Premium Furniture Showroom`,
  description: `${business.name} on Salem Main Road, Dharmapuri — ${business.tagline}. Corner sofas, sofa sets & designer lighting.`,
  path: "/",
});

export default function HomePage() {
  const featured = getBestsellers();
  const bestFurniture = getBestFurniture();
  const upcoming = getUpcomingProducts();

  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="glass-ribbon">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 text-center text-sm text-body">
          <span className="font-medium text-foreground">{business.tagline}</span>
          <span className="hidden text-border sm:inline">|</span>
          <span>{business.taglineSecondary}</span>
          <span className="hidden text-border sm:inline">|</span>
          <span>Salem Main Road, Senthil Nagar</span>
        </div>
      </section>

      <section id="categories" className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeading
          title="Shop by Category"
          description="Sofas, dining, chairs, mattresses, lighting and bathroom fittings."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <ProductSlider
        products={bestFurniture}
        title="Best Furniture"
        description="Signature sofas, corners and designer lighting from our showroom."
        className="bg-muted/25"
      />

      <UpcomingSlider items={upcoming} />

      <ProductSlider
        products={featured}
        title="Premium Picks"
        description="Handpicked favourites — available to view and order on WhatsApp."
      />

      <section className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeading
          title="Room Collections"
          description="Curated sets to complete your living room, dining and bathroom."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      <section id="about" className="bg-muted/25 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimateIn>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                <Image
                  src={images.showroom[0]}
                  alt={`${business.name} showroom`}
                  fill
                  sizes="600px"
                  className="object-cover"
                />
              </div>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <h2 className="font-heading text-2xl font-semibold md:text-3xl">
                {business.name}
              </h2>
              <p className="mt-1 font-tamil text-base text-body">{business.nameTamil}</p>
              <p className="mt-4 text-sm leading-relaxed text-body md:text-base">
                Dharmapuri&apos;s trusted destination for corner sofas, premium sofa sets,
                designer lighting and home furnishings. Visit us on Salem Main Road near
                Senthil Nagar Bus Stop, or order quickly via WhatsApp.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CallButton />
                <WhatsAppButton />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeading
          title="Why Metro Furniture"
          description="Quality products, honest pricing and helpful showroom staff."
        />
        <TrustBadges badges={trustBadges} />
      </section>

      <section id="gallery" className="bg-muted/25 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Showroom Gallery"
            description="Real photos from our Salem Main Road display."
          />
          <GalleryCarousel images={images.showroom} />
          <div className="mt-6 text-center">
            <Link
              href="/gallery"
              className="inline-flex h-10 items-center rounded-xl border border-border px-5 text-sm font-medium transition hover:border-foreground hover:text-foreground"
            >
              View all photos
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 md:py-20">
        <SectionHeading
          title="Customer Reviews"
          description="Trusted by families across Dharmapuri."
        />
        <Testimonials items={testimonials} />
      </section>

      <section id="faq" className="bg-muted/25 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Common Questions"
            description="Showroom timings, delivery and how to order."
          />
          <FAQ items={faqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
