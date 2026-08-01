export default function Loading({ label = "Loading..." }) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-pulse rounded-full border-4 border-border border-t-primary" />
      <p className="text-sm text-body">{label}</p>
    </div>
  );
}
