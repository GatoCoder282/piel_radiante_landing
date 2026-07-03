"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { useDeviceCapability } from "@/lib/useDeviceCapability";
import { brand } from "@/content/site";
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { trackDistribuidoraCTA } from "@/lib/analytics";

// La escena WebGL se carga solo en cliente (ssr:false)
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  const cap = useDeviceCapability();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Tagline: las letras caen desde arriba con stagger (SplitType + GSAP)
  useEffect(() => {
    if (!headlineRef.current || !cap.ready) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const split = new SplitType(headlineRef.current, { types: "chars,words" });
    const tl = gsap.timeline();

    if (reduced) {
      gsap.set(split.chars, { opacity: 1, y: 0 });
    } else {
      tl.from(split.chars, {
        y: -120,
        opacity: 0,
        rotateX: -90,
        stagger: 0.025,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.3,
      });
    }

    // Resto del contenido (subtítulo + CTAs) aparece después
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll("[data-hero-item]");
      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
      } else {
        tl.from(
          items,
          { y: 30, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out" },
          "-=0.4"
        );
      }
    }

    return () => {
      split.revert();
      tl.kill();
    };
  }, [cap.ready]);

  const showCanvas = cap.ready && cap.tier !== "fallback";
  const waDistribuidora = buildWhatsAppUrl(WHATSAPP_MESSAGES.distribuidora);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-primary"
    >
      {/* Fondo: gradiente cálido + halo dorado (base y fallback) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 30%, rgba(201,168,76,0.28) 0%, rgba(27,67,50,0) 55%), radial-gradient(100% 100% at 20% 80%, rgba(45,106,79,0.45) 0%, rgba(27,67,50,0) 55%), #1B4332",
        }}
      />

      {/* Capa WebGL (partículas + frasco). Fallback: granito dorado animado CSS */}
      {showCanvas ? (
        <div className="absolute inset-0">
          <HeroScene particleCount={cap.particleCount} />
        </div>
      ) : (
        <div aria-hidden className="hero-fallback absolute inset-0" />
      )}

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p
            data-hero-item
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-accent-soft backdrop-blur"
          >
            ✦ {brand.business} · {brand.location}
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            style={{ perspective: "600px" }}
          >
            Belleza que <span className="text-gradient-gold">distribuye</span>{" "}
            confianza
          </h1>

          <div ref={contentRef}>
            <p
              data-hero-item
              className="mt-7 max-w-lg text-lg leading-relaxed text-white/75"
            >
              Cosméticos premium originales de las marcas más prestigiosas del
              mundo. Construye tu negocio con la Red de Distribuidoras
              Autorizadas de {brand.name}.
            </p>

            <div data-hero-item className="mt-10 flex flex-wrap gap-4">
              <Button
                as="a"
                href={waDistribuidora}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                onClick={() => trackDistribuidoraCTA("hero")}
              >
                Quiero ser distribuidora
              </Button>
              <Button as="a" href="#productos" variant="outline" size="lg">
                Ver catálogo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}
