import Link from "next/link";
import { PackageOpen } from "lucide-react";

export default function EmptyState({
  title = "No products found",
  description = "Try a different search, category, or material filter.",
  href = "/shop",
  actionLabel = "Browse Shop",
}) {
  return (
    <div className="glass-card rounded-3xl px-6 py-20 text-center">
      <div className="glass-icon mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-accent-dark">
        <PackageOpen className="h-7 w-7" strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-body">
        {description}
      </p>
      <Link
        href={href}
        className="mt-7 inline-flex rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
