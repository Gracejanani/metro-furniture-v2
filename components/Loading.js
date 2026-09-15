import { Loader2 } from "lucide-react";

export default function Loading({ label = "Loading..." }) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
      <p className="text-sm text-body">{label}</p>
    </div>
  );
}
