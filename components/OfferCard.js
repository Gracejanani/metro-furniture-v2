import Link from "next/link";
import { formatPrice } from "@/lib/format";

export default function OfferCard({
  title,
  priceLabel,
  price,
  badge,
  description,
  href = "/offers",
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:scale-[1.03] hover:shadow-md">
      {badge ? (
        <span className="mb-3 w-fit rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-dark">
          {badge}
        </span>
      ) : null}
      <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
          {description}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {priceLabel ? (
          <span className="text-xl font-bold text-primary">{priceLabel}</span>
        ) : price != null ? (
          <span className="text-xl font-bold text-primary">
            {formatPrice(price)}
          </span>
        ) : null}
      </div>
      <Link
        href={href}
        className="mt-5 inline-flex items-center justify-center rounded-xl border-2 border-accent px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-white"
      >
        View Offer
      </Link>
    </article>
  );
}
