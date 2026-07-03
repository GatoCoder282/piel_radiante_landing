"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { nav, brand } from "@/content/site";
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { trackDistribuidoraCTA } from "@/lib/analytics";

/**
 * Navbar que pasa de transparente (sobre el Hero oscuro) a sólido
 * (fondo background + sombra) al hacer scroll, vía ScrollTrigger.
 */
export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Dispara el estado sólido al pasar (casi) el alto del viewport (fin del Hero)
    const st = ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => setSolid(self.scroll() > 80),
    });
    return () => st.kill();
  }, []);

  // Entrada del navbar al cargar
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current, {
      y: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  const waUrl = buildWhatsAppUrl(WHATSAPP_MESSAGES.distribuidora);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-background/85 shadow-[0_2px_30px_rgba(26,23,20,0.08)] backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2" aria-label={brand.name}>
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full font-display text-lg font-semibold transition-colors",
              solid ? "bg-accent text-white" : "bg-white/15 text-white backdrop-blur"
            )}
          >
            R
          </span>
          <span
            className={cn(
              "font-display text-lg tracking-wide transition-colors",
              solid ? "text-ink" : "text-white"
            )}
          >
            PIEL RADIANTE
          </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  "text-sm tracking-wide transition-colors hover:text-accent",
                  solid ? "text-ink/80" : "text-white/85"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden lg:block">
          <Button
            as="a"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            onClick={() => trackDistribuidoraCTA("navbar")}
          >
            Quiero distribuir
          </Button>
        </div>

        {/* Toggle móvil */}
        <button
          className={cn(
            "lg:hidden",
            solid ? "text-ink" : "text-white"
          )}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="border-t border-accent/10 bg-background px-6 py-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-ink/80 hover:text-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            as="a"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full"
            onClick={() => trackDistribuidoraCTA("navbar-mobile")}
          >
            Quiero distribuir
          </Button>
        </div>
      )}
    </header>
  );
}
