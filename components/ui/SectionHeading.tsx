"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean; // sobre fondos oscuros
  className?: string;
}

/**
 * Encabezado de sección reutilizable con reveal al hacer scroll.
 * El título se anima palabra por palabra (stagger) vía useRevealOnScroll.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref);

  return (
    <div
      ref={ref}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          data-reveal
          className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent"
        >
          {eyebrow}
        </p>
      )}
      <h2
        data-reveal
        className={cn(
          "font-display text-4xl leading-tight sm:text-5xl",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-reveal
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-white/70" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
