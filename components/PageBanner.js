import Breadcrumb from "@/components/Breadcrumb";

export default function PageBanner({
  title,
  description,
  breadcrumbs = [],
  compact = false,
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-surface via-muted/35 to-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-30%,rgba(200,169,106,0.12),transparent)]"
        aria-hidden="true"
      />
      <div
        className={`container relative mx-auto px-4 ${
          compact ? "py-8 md:py-10" : "py-10 md:py-14"
        }`}
      >
        <div className="glass-banner rounded-3xl px-5 py-6 sm:px-7 md:px-9 md:py-8">
          {breadcrumbs.length ? (
            <div className="mb-4">
              <Breadcrumb items={breadcrumbs} />
            </div>
          ) : null}
          <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-body md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
