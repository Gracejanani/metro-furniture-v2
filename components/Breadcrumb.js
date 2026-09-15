import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-body">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href || item.label} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span className="text-body/40" aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span
                  className="max-w-[200px] truncate font-medium text-foreground sm:max-w-xs"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="rounded-md px-1 py-0.5 transition hover:bg-primary/5 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
