import CustomDesignForm from "@/components/CustomDesignForm";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Custom Design",
  description: `Request custom furniture from ${business.name} — sizes, materials, pooja mandapams and more in Dharmapuri.`,
  path: "/custom-design",
  keywords: ["Custom Furniture", "Pooja Mandapam", "Made to Order"],
});

export default function CustomDesignPage() {
  return (
    <>
      <PageBanner
        title="Custom Design"
        description="Tell us what you need — we craft to your space and budget."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Custom Design" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Made to Order"
              title="Design Your Furniture"
              description="Share dimensions, material preference and a short note. We will reply on WhatsApp with a quote."
              className="mb-6"
            />
            <ul className="space-y-3 text-sm text-body">
              <li className="flex gap-2">
                <span className="text-leaf">✓</span>
                Custom sofas, cupboards, beds & dining sets
              </li>
              <li className="flex gap-2">
                <span className="text-leaf">✓</span>
                Pooja mandapams built to your home temple space
              </li>
              <li className="flex gap-2">
                <span className="text-leaf">✓</span>
                Choose wood, Sheesham, fabric or steel finishes
              </li>
              <li className="flex gap-2">
                <span className="text-leaf">✓</span>
                {business.taglineSecondary}
              </li>
            </ul>
          </div>
          <CustomDesignForm />
        </div>
      </section>
    </>
  );
}
