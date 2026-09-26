import AnimateIn from "@/components/AnimateIn";

export default function SectionHeading({
  title,
  description,
  align = "center",
  className = "",
}) {
  const alignClass =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <AnimateIn className={`site-section-heading mb-10 flex flex-col gap-2 ${alignClass} ${className}`}>
      <h2 className="max-w-3xl font-heading text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-body md:text-base">
          {description}
        </p>
      ) : null}
    </AnimateIn>
  );
}
