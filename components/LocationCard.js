import Link from "next/link";

export default function LocationCard({ branch }) {
  return (
    <article className="flex h-full flex-col rounded-3xl glass-card p-6 luxury-shadow-hover">
      <h3 className="font-heading text-xl font-bold">{branch.name}</h3>
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
        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
      >
        Open in Google Maps
      </Link>
    </article>
  );
}
