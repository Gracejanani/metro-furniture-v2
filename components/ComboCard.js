import Image from "next/image";
import Link from "next/link";
import { PriceOnly } from "@/components/PriceTag";
import WhatsAppButton from "@/components/WhatsAppButton";
import { productEnquiryMessage } from "@/lib/whatsapp";

export default function ComboCard({ product }) {
  const href = `/product/${product.slug}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:shadow-md">
      <div className="grid gap-0 md:grid-cols-2">
        <Link href={href} className="relative block aspect-[4/3] bg-muted md:aspect-auto md:min-h-[260px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Link>
        <div className="flex flex-col justify-center gap-4 p-6">
          {product.offer ? (
            <span className="w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-dark">
              {product.offer}
            </span>
          ) : null}
          <h3 className="font-heading text-2xl font-bold text-foreground">
            <Link href={href} className="hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-body">{product.description}</p>
          <PriceOnly product={product} size="lg" />
          <div className="flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
            >
              View Details
            </Link>
            <WhatsAppButton
              message={productEnquiryMessage(product)}
              label="Enquire"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
