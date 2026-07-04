"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import { brand } from "@/content/site";

/**
 * NOSOTROS — texto con parallax suave + imagen con tratamiento limpio.
 */
export function QuienesSomos() {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref);

  // Parallax sutil de la imagen al hacer scroll
  useEffect(() => {
    const el = imageRef.current;
    const frame = frameRef.current;
    if (!el || !frame) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Parallax vertical de la foto dentro de su marco
      const parallax = gsap.to(el, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal: el marco se "descubre" con clip-path al entrar en viewport
      const reveal = gsap.fromTo(
        frame,
        { clipPath: "inset(12% 8% 12% 8% round 2rem)", scale: 0.96 },
        {
          clipPath: "inset(0% 0% 0% 0% round 2rem)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top 90%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );

      return () => {
        parallax.scrollTrigger?.kill();
        parallax.kill();
        reveal.scrollTrigger?.kill();
        reveal.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="nosotros"
      className="bg-background py-[var(--spacing-section)]"
    >
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10"
      >
        {/* Texto */}
        <div>
          <p
            data-reveal
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            Nosotros
          </p>
          <h2
            data-reveal
            className="font-display text-4xl leading-tight text-ink sm:text-5xl"
          >
            Más que productos,
            <br />
            <span className="text-gradient-gold">una red que confía</span>
          </h2>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">
            Desde {brand.location}, {brand.name} distribuye cosméticos premium de
            las marcas más reconocidas del mundo. Trabajamos solo con productos
            originales y proveedores autorizados.
          </p>
          <p data-reveal className="mt-4 text-lg leading-relaxed text-muted">
            Pero nuestra verdadera misión es hacer crecer a las mujeres que
            confían en nosotros: asesoramos, capacitamos y acompañamos a cada
            distribuidora para que su negocio prospere.
          </p>

          <dl data-reveal className="mt-10 grid grid-cols-2 gap-6">
            <div>
              <dt className="font-display text-3xl text-accent">100%</dt>
              <dd className="mt-1 text-sm text-muted">Productos originales</dd>
            </div>
            <div>
              <dt className="font-display text-3xl text-accent">24–72h</dt>
              <dd className="mt-1 text-sm text-muted">Envíos a todo el país</dd>
            </div>
          </dl>
        </div>

        {/* Imagen con parallax + reveal por clip-path */}
        <div
          ref={frameRef}
          className="relative h-[480px] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(26,26,26,0.18)]"
        >
          <div ref={imageRef} className="absolute inset-0 -top-12 h-[120%]">
            <Image
              src="/about.jpeg"
              alt="Únete a la red de distribuidoras de Piel Radiante"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Velo verde sutil */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(27,67,50,0.0) 60%, rgba(27,67,50,0.25) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
