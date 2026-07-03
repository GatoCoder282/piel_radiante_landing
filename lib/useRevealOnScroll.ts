"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface RevealOptions {
  /** Selector de los hijos a animar. Default: "[data-reveal]". */
  selector?: string;
  /** Desplazamiento inicial en Y (px). */
  y?: number;
  /** Stagger entre elementos (s). */
  stagger?: number;
  /** % del viewport donde dispara (ScrollTrigger start). */
  start?: string;
}

/**
 * Revela los hijos [data-reveal] de `ref` con un fade-up staggered al
 * entrar en viewport. Respeta prefers-reduced-motion vía gsap.matchMedia:
 * en ese caso los elementos aparecen sin movimiento.
 */
export function useRevealOnScroll(
  ref: RefObject<HTMLElement>,
  opts: RevealOptions = {}
) {
  const { selector = "[data-reveal]", y = 40, stagger = 0.12, start = "top 80%" } =
    opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    const mm = gsap.matchMedia();

    // Con movimiento: fade-up staggered controlado por scroll
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(targets, { opacity: 0, y });
      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // Sin movimiento: simplemente visibles
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(targets, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, [ref, selector, y, stagger, start]);
}
