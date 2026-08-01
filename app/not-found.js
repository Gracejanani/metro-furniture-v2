import Link from "next/link";
import CallButton from "@/components/CallButton";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
        404
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-body">
        The page may have moved. Browse our furniture catalog or contact our Salem
        Main Road showroom for help.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex rounded-2xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          Go Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex rounded-2xl border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
        >
          Browse Shop
        </Link>
        <CallButton />
        <WhatsAppButton />
      </div>
    </section>
  );
}
