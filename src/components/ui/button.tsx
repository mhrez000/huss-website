import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
    "transition-all duration-300 ease-[var(--ease-out-expo)]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold",
    "active:scale-[0.98] select-none whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-cream hover:bg-charcoal hover:shadow-card-hover hover:-translate-y-0.5",
        gold: "bg-gold text-white hover:bg-[#9c7c4b] hover:shadow-card-hover hover:-translate-y-0.5",
        outline:
          "border border-line bg-transparent text-ink hover:border-ink hover:-translate-y-0.5",
        "outline-light":
          "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:-translate-y-0.5",
        light:
          "bg-cream text-ink hover:bg-white hover:shadow-card-hover hover:-translate-y-0.5",
        ghost: "text-ink hover:bg-ivory",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
} & (
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as { href: string } & Record<string, unknown>;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
