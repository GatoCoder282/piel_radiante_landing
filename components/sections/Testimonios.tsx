"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import { testimonials } from "@/content/site";

/**
 * TESTIMONIOS — tarjetas con glass morphism y reveal al hacer scroll.
 * (Contenido placeholder hasta tener testimonios reales.)
 */
export function Testimonios() {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, { y: 40, stagger: 0.12 });

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden py-[var(--spacing-section)]"
      style={{
        background:
          "radial-gradient(90% 70% at 80% 10%, rgba(201,168,76,0.22) 0%, rgba(245,240,232,0) 55%), radial-gradient(80% 60% at 10% 90%, rgba(27,67,50,0.10) 0%, rgba(245,240,232,0) 50%), #F5F0E8",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Opiniones"
          title="Historias que inspiran"
          subtitle="Distribuidoras reales construyendo su independencia con Piel Radiante."
        />

        <div ref={ref} className="mt-16 grid gap-7 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-reveal
              className="glass-light flex flex-col rounded-[1.5rem] p-8"
            >
              <span className="font-display text-5xl leading-none text-accent">
                “
              </span>
              <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-ink/80">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-accent/20 pt-5">
                <p className="font-display text-lg text-ink">{t.name}</p>
                <p className="text-sm text-muted">
                  {t.role} · {t.city}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
