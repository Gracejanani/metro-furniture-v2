import CallButton from "@/components/CallButton";
import ContactForm from "@/components/ContactForm";
import LocationCard from "@/components/LocationCard";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { branches, business } from "@/data/business";
import { formatPhone, telHref } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Contact ${business.name} on Salem Main Road, Senthil Nagar. Call +91 ${business.primaryPhone} or WhatsApp for furniture enquiries.`,
  path: "/contact",
  keywords: ["Contact", "WhatsApp", "Google Maps", "Dharmapuri"],
});

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        description="Call, WhatsApp or visit our Salem Main Road showroom."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              title="Send an Enquiry"
              description="Share your requirement and we will get back quickly."
              className="mb-6"
            />
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl glass-card p-6">
              <h2 className="font-heading text-xl font-bold">Quick Contact</h2>
              <p className="mt-2 text-sm text-body">{business.hours}</p>
              <ul className="mt-5 space-y-3">
                {business.phones.map((phone) => (
                  <li key={phone}>
                    <Link
                      href={telHref(phone)}
                      className="text-lg font-semibold text-accent hover:text-accent-dark"
                    >
                      +91 {formatPhone(phone)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`mailto:${business.email}`}
                    className="text-body hover:text-accent hover:underline"
                  >
                    {business.email}
                  </Link>
                </li>
              </ul>
              <div className="mt-4">
                <Link
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-body hover:text-accent hover:underline"
                >
                  @metrofurnituredpi on Instagram
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <CallButton />
                <WhatsAppButton />
              </div>
            </div>

            <div className="grid gap-4">
              {branches.map((branch) => (
                <LocationCard key={branch.id} branch={branch} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Find Us on Google Maps"
            description="Near Senthil Nagar Bus Stop, Salem Main Road."
          />
          <div className="mx-auto max-w-2xl">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="overflow-hidden rounded-3xl glass-card"
              >
                <div className="border-b border-border px-4 py-3">
                  <h3 className="font-semibold">{branch.name}</h3>
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
        </div>
      </section>
    </>
  );
}
