"use client";

import { useRef } from "react";
import { LiquidImage } from "@/components/three/LiquidImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import { featuredProducts } from "@/content/site";
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

/**
 * PRODUCTOS TOP — grilla de productos estrella. Cada tarjeta usa LiquidImage
 * (distorsión shader en hover sobre desktop; zoom CSS en el resto).
 * CTA por producto abre WhatsApp con el nombre pre-cargado.
 */
export function ProductosTop() {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, { y: 50, stagger: 0.08 });

  return (
    <section id="productos" className="bg-background py-[var(--spacing-section)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Más vendidos"
          title="Productos que enamoran"
          subtitle="Una selección de los favoritos de nuestras distribuidoras. Pasa el cursor para ver el detalle."
        />

        <div
          ref={ref}
          className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProducts.map((p) => {
            const waUrl = buildWhatsAppUrl(WHATSAPP_MESSAGES.producto(p.name));
            return (
              <article
                key={p.id}
                data-reveal
                className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_15px_50px_rgba(26,23,20,0.07)] transition-shadow duration-500 hover:shadow-[0_25px_70px_rgba(201,168,76,0.25)]"
              >
                <LiquidImage
                  src={p.image}
                  alt={p.name}
                  className="aspect-[4/5] w-full bg-white"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs uppercase tracking-widest text-accent">
                    {p.brand} · {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
                    {p.name}
                  </h3>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div>
                      <span className="block font-display text-lg text-ink">
                        {p.presentation}
                      </span>
                      <span className="text-xs text-muted">
                        Precio mayorista por WhatsApp
                      </span>
                    </div>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("producto_whatsapp_click", { product: p.id })
                      }
                      className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm text-white transition-colors hover:bg-accent hover:text-primary"
                    >
                      Consultar
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
