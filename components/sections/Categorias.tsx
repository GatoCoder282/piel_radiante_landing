"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { categories } from "@/content/site";

/**
 * CATEGORÍAS — scroll horizontal con pin + scrub en desktop (GSAP).
 * En móvil/reduced-motion degrada a un carrusel con scroll-snap nativo.
 */
export function Categorias() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Solo desktop con movimiento permitido: scroll horizontal "pineado"
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="categorias"
      ref={sectionRef}
      className="relative overflow-hidden bg-primary py-[var(--spacing-section)] lg:py-0"
    >
      {/* Encabezado */}
      <div className="mx-auto max-w-7xl px-6 pb-10 lg:absolute lg:left-1/2 lg:top-12 lg:z-20 lg:-translate-x-1/2 lg:px-10 lg:text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          Explora por categoría
        </p>
        <h2 className="font-display text-4xl text-white sm:text-5xl">
          Todo para tu <span className="text-gradient-gold">ritual de belleza</span>
        </h2>
      </div>

      {/* Track: horizontal en desktop (lg), carrusel snap en móvil */}
      <div className="lg:flex lg:h-screen lg:items-center">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:overflow-visible lg:px-10 lg:pb-0 lg:pt-24"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat, i) => (
            <article
              key={cat.id}
              className="group relative h-[440px] w-[78vw] flex-shrink-0 snap-center overflow-hidden rounded-[1.75rem] sm:w-[360px] lg:w-[340px]"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 78vw, 340px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              {/* Degradado para legibilidad */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,40,30,0) 40%, rgba(20,40,30,0.88) 100%)",
                }}
              />
              <span
                className="absolute left-5 top-5 h-1.5 w-10 rounded-full"
                style={{ background: cat.accent }}
              />
              <div className="absolute inset-x-5 bottom-5">
                <span className="text-xs uppercase tracking-widest text-white/60">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl text-white">{cat.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {cat.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
