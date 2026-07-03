"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Smooth scroll global con Lenis, sincronizado con GSAP ScrollTrigger.
 * Envuelve toda la app (montado en layout). Si el usuario pidió
 * reduced-motion, no inicializamos Lenis (scroll nativo).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Mantener ScrollTrigger en sync con la posición de Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Conducir Lenis desde el ticker de GSAP (un solo RAF)
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
