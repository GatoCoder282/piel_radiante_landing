"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "gold" | "primary" | "outline" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  // CTA dorado destacado (texto verde para contraste sobre el dorado)
  gold: "bg-accent text-primary font-semibold shadow-[0_8px_30px_rgba(201,168,76,0.35)] hover:bg-[#b8924c] hover:shadow-[0_10px_40px_rgba(201,168,76,0.5)]",
  // Botón primario verde botella (texto blanco)
  primary:
    "bg-primary text-white shadow-[0_8px_30px_rgba(27,67,50,0.35)] hover:bg-[#245741]",
  // Borde dorado, fondo transparente
  outline:
    "border border-accent/70 text-ink hover:bg-accent hover:text-primary",
  // Mínimo
  ghost: "text-ink hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide " +
  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform " +
  "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Botón / enlace estilizado de marca. Usa `as="a"` con `href` para anclas o WhatsApp. */
type ButtonProps = BaseProps &
  (
    | ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  );

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = "gold", size = "md", className, children, as = "button", ...rest },
    ref
  ) {
    const classes = cn(base, variants[variant], sizes[size], className);

    if (as === "a") {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
