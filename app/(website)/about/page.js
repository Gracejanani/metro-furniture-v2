import CallButton from "@/components/CallButton";
import LocationCard from "@/components/LocationCard";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import TrustBadges from "@/components/TrustBadges";
import WhatsAppButton from "@/components/WhatsAppButton";
import { branches, business } from "@/data/business";
import { trustBadges } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: `Learn about ${business.name} — ${business.tagline}. Premium furniture showroom on Salem Main Road, Dharmapuri.`,
  path: "/about",
  keywords: ["About", "Showroom", "Dharmapuri", "Premium Furniture"],
});

const whyChoose = [
  {
    id: "w1",
    title: "Premium Selection",
    description: "Curated sofas, beds, dining and storage from trusted manufacturers.",
  },
  {
    id: "w2",
    title: "Custom Options",
    description: "Fabric, size and finish choices tailored to your home and budget.",
  },
  {
    id: "w3",
    title: "Local Trust",
    description: "Serving Dharmapuri and nearby towns from our Salem Main Road showroom.",
  },
  {
    id: "w4",
    title: "Honest Pricing",
    description: "Transparent starting rates — final price by size, material and finish.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title={`About ${business.name}`}
        description={`${business.tagline} — ${business.taglineSecondary}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Our Story
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
              {business.name}
            </h2>
            <p className="mt-2 font-tamil text-lg text-body">{business.nameTamil}</p>
            <p className="mt-5 text-base leading-relaxed text-body">
              Metro Furniture is Dharmapuri&apos;s trusted destination for stylish sofas
              and quality home furniture. From our showroom on Salem Main Road near
              Senthil Nagar Bus Stop, we offer a premium range of beds, dining sets,
              wardrobes, mattresses, recliners and more.
            </p>
            <p className="mt-4 text-base leading-relaxed text-body">
              Our team helps you choose the right pieces for your space — with honest
              pricing, custom options and a showroom experience you&apos;ll enjoy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CallButton />
              <WhatsAppButton />
            </div>
          </div>

          <div className="rounded-3xl glass-card p-6 md:p-8">
            <h3 className="font-heading text-xl font-bold">Why Choose Us</h3>
            <ul className="mt-6 space-y-5">
              {whyChoose.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-border pb-5 last:border-0 last:pb-0"
                >
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="mt-1 text-sm text-body">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="Visit Our Showroom" description="One location. Premium experience." />
          <div className="mx-auto max-w-2xl">
            {branches.map((branch) => (
              <LocationCard key={branch.id} branch={branch} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeading title="Our Promise" />
        <TrustBadges badges={trustBadges} />
      </section>
    </>
  );
}
