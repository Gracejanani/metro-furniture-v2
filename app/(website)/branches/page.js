import LocationCard from "@/components/LocationCard";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import CallButton from "@/components/CallButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { branches, business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Branches & Locations",
  description: `Visit ${business.name} at Settikarai and Mathikonpalayam, Dharmapuri. Maps, hours and contact details.`,
  path: "/branches",
  keywords: ["Branches", "Settikarai", "Mathikonpalayam", "Showroom"],
});

export default function BranchesPage() {
  return (
    <>
      <PageBanner
        title="Our Branches"
        description="Two convenient showrooms in Dharmapuri district."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Branches" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeading
          title="Visit Us"
          description={`${business.hours} · Call +91 ${business.primaryPhone}`}
        />
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <LocationCard key={branch.id} branch={branch} />
          ))}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <CallButton />
          <WhatsAppButton />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {branches.map((branch) => (
            <div
              key={`${branch.id}-map`}
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
            >
              <div className="border-b border-border px-4 py-3">
                <h3 className="font-heading font-semibold text-foreground">
                  {branch.name}
                </h3>
                <p className="text-sm text-body">{branch.landmark}</p>
              </div>
              <iframe
                title={`Map of ${branch.name}`}
                src={branch.embedUrl}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
