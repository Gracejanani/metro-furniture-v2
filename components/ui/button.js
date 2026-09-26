import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "premium-button bg-accent text-primary shadow-sm hover:bg-accent-dark hover:shadow-md active:scale-[0.98] focus-visible:outline-accent",
        primary:
          "bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md active:scale-[0.98] focus-visible:outline-accent",
        accent:
          "premium-button bg-accent text-primary shadow-sm hover:bg-accent-dark hover:shadow-md active:scale-[0.98] focus-visible:outline-accent",
        outline:
          "glass-button border border-white/80 text-foreground hover:border-accent/50 hover:bg-white/85 hover:text-primary focus-visible:outline-accent",
        ghost:
          "text-foreground hover:bg-muted focus-visible:outline-accent",
        glass:
          "glass-button text-foreground transition hover:border-white hover:bg-white/85 focus-visible:outline-accent",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-7 text-base",
        icon: "h-10 w-10 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({
  className,
  variant,
  size,
  asChild,
  children,
  ...props
}) {
  if (asChild) {
    return children;
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
