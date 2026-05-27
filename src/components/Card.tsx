import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass shine rounded-2xl p-6 sm:p-7 ${className}`} role="group">
      {children}
    </div>
  );
}
