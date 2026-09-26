import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";

export default function LocationCard({ branch }) {
  return (
    <article className="flex h-full flex-col rounded-3xl glass-card p-6 luxury-shadow-hover">
      <h3 className="flex items-center gap-2 font-heading text-xl font-bold">
        <span className="glass-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-accent-dark">
          <MapPin className="h-5 w-5" aria-hidden />
        </span>
        {branch.name}
      </h3>
      <address className="mt-4 flex-1 not-italic text-sm leading-relaxed text-body">
        {branch.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className="mt-2 block font-medium text-accent">{branch.landmark}</span>
      </address>
      <Link
        href={branch.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="premium-button mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-sm font-semibold text-primary transition"
      >
        Open in Google Maps
        <ExternalLink className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}
