import Link from "next/link";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  className = "",
  variant = "primary",
  href,
}: CommonProps & { href?: string }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]";
  const styles: Record<NonNullable<CommonProps["variant"]>, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "text-muted hover:text-foreground hover:bg-slate-100",
  };

  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={cls}>
      {children}
    </button>
  );
}
