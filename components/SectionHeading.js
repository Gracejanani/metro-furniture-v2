import AnimateIn from "@/components/AnimateIn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  const alignClass =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <AnimateIn className={`mb-12 flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-3xl font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-body md:text-lg">
          {description}
        </p>
      ) : null}
    </AnimateIn>
  );
}
