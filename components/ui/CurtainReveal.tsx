"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Transición entre secciones (efecto 3D/WebGL #4 del prompt, resuelto con
 * GSAP + clip-path: ligero, robusto y con buen fallback).
 *
 * Una "cortina" dorada con borde ondulado barre la pantalla revelando la
 * sección a medida que entra en viewport (scrub). Respeta reduced-motion.
 */
export function CurtainReveal({
  children,
  className,
  color = "#C9A84C",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const curtain = curtainRef.current;
    if (!wrap || !curtain) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // La cortina cubre la parte superior y se retrae hacia arriba (wipe)
      const tween = gsap.fromTo(
        curtain,
        {
          // borde ondulado inferior, cubriendo toda la sección
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 100%, 75% 92%, 50% 100%, 25% 92%, 0% 100%)",
          yPercent: 0,
        },
        {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            end: "top 25%",
            scrub: true,
          },
        }
      );
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // reduced-motion: ocultar la cortina, sin animación
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(curtain, { display: "none" });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      {/* Cortina dorada */}
      <div
        ref={curtainRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[40vh]"
        style={{
          background: `linear-gradient(180deg, ${color} 0%, ${color}cc 100%)`,
        }}
      />
      {children}
    </div>
  );
}
