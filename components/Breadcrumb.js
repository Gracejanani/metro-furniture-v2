import Link from "next/link";

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
                  <ChevronIcon />
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

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}
