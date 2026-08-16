import PageBanner from "@/components/PageBanner";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import { getOfferProducts, products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Offers & Deals",
  description:
    "Seasonal furniture deals at Metro Furniture — sofas, lighting and combo savings in Dharmapuri.",
  path: "/offers",
  keywords: ["Offers", "Deals", "Discount", "Sofa Offer"],
});

export default function OffersPage() {
  const offers = getOfferProducts();
  const budget = products
    .filter((p) => p.price != null && p.price <= 10000)
    .slice(0, 8);

  return (
    <>
      <PageBanner
        title="Offers & Deals"
        description="Limited seasonal prices — enquire on WhatsApp for today’s best rate."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Offers" },
        ]}
      />

      <section className="bg-accent/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="inline-flex rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white">
            Special Offer Strip
          </p>
          <h2 className="mt-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            Folding Table from ₹1.6K · VK Sofa from ₹8.5K
          </h2>
          <p className="mt-2 text-sm text-body">
            *Prices are starting rates and may vary by size/finish.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeading
          title="Featured Offers"
          description="Grab these showroom specials while they last."
        />
        <ProductGrid products={offers} />
      </section>

      <section className="bg-muted/60 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Budget-Friendly Picks"
            description="Affordable chairs, trolleys, benches and more."
          />
          <ProductGrid products={budget} />
        </div>
      </section>
    </>
  );
}
