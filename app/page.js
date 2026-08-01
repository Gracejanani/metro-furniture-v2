import Link from "next/link";
import Image from "next/image";
import CategoryCard from "@/components/CategoryCard";
import CollectionCard from "@/components/CollectionCard";
import CtaBanner from "@/components/CtaBanner";
import FAQ from "@/components/FAQ";
import GalleryCarousel from "@/components/GalleryCarousel";
import HeroSlider from "@/components/HeroSlider";
import LocationCard from "@/components/LocationCard";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import TrustBadges from "@/components/TrustBadges";
import AnimateIn from "@/components/AnimateIn";
import CallButton from "@/components/CallButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { branches, business } from "@/data/business";
import { categories } from "@/data/categories";
import { collections, faqs, images } from "@/data/content";
import {
  getBestsellers,
  heroSlides,
  testimonials,
  trustBadges,
} from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${business.name} | Premium Furniture Showroom`,
  description: `${business.name} on Salem Main Road, Dharmapuri — ${business.tagline}. Sofas, beds, dining sets, wardrobes, mattresses & recliners.`,
  path: "/",
});

export default function HomePage() {
  const featured = getBestsellers();

  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="border-b border-border bg-surface py-4">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 text-center text-sm font-medium text-body md:text-base">
          <span className="font-semibold text-foreground">{business.tagline}</span>
          <span className="hidden text-accent sm:inline">•</span>
          <span>{business.taglineSecondary}</span>
          <span className="hidden text-accent sm:inline">•</span>
          <span>Salem Main Road, Senthil Nagar</span>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container mx-auto px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="Collections"
          title="Shop by Category"
          description="Explore our curated range of premium furniture for every room."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Featured"
            title="Premium Picks"
            description="Handpicked bestsellers from our Salem Main Road showroom."
          />
          <ProductGrid products={featured} />
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center rounded-2xl bg-accent px-6 text-sm font-semibold text-white shadow-md transition hover:bg-accent-dark hover:shadow-lg"
            >
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="Curated"
          title="Room Collections"
          description="Complete your home with thoughtfully paired furniture sets."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimateIn>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass-card">
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                About Us
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
                {business.name}
              </h2>
              <p className="mt-2 font-tamil text-lg text-body">{business.nameTamil}</p>
              <p className="mt-5 text-base leading-relaxed text-body">
                Metro Furniture is Dharmapuri&apos;s trusted destination for stylish sofas,
                quality beds, dining sets and complete home furnishing solutions. Located on
                Salem Main Road near Senthil Nagar Bus Stop, our showroom offers a premium
                selection with expert guidance to help you create the home you envision.
              </p>
              <p className="mt-4 text-base leading-relaxed text-body">
                From compact apartments to spacious villas — we have furniture for every
                budget and style. Visit us or WhatsApp for personalised quotes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CallButton />
                <WhatsAppButton />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Why Metro Furniture */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The Metro Furniture Difference"
          description="Premium quality, honest pricing and a showroom experience you'll love."
        />
        <TrustBadges badges={trustBadges} />
      </section>

      {/* Store Gallery */}
      <section id="gallery" className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Showroom"
            title="Store Gallery"
            description="Step inside our Salem Main Road showroom and explore our premium displays."
          />
          <GalleryCarousel images={images.showroom} />
          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-flex h-11 items-center rounded-2xl border border-border px-5 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="Reviews"
          title="What Our Customers Say"
          description="Trusted by families across Dharmapuri and nearby towns."
        />
        <Testimonials items={testimonials} />
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know before visiting our showroom."
          />
          <FAQ items={faqs} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="Visit Us"
          title="Find Our Showroom"
          description="Conveniently located on Salem Main Road, near Senthil Nagar Bus Stop."
        />
        <div className="mx-auto max-w-2xl">
          {branches.map((branch) => (
            <LocationCard key={branch.id} branch={branch} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CallButton />
          <WhatsAppButton />
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-2xl border border-border px-5 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Contact Form
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
