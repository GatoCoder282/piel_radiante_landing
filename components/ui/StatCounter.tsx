"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

/**
 * Contador animado: cuenta de 0 a `value` cuando entra en viewport.
 * Respeta reduced-motion (muestra el valor final sin animar).
 */
export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(counter.n)),
      scrollTrigger: { trigger: el, start: "top 85%" },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);

  return (
    <div className="text-center">
      <span
        ref={numRef}
        className="font-display text-5xl text-gradient-gold sm:text-6xl"
      >
        {display.toLocaleString("es-BO")}
        {suffix}
      </span>
      <p className="mt-2 text-sm uppercase tracking-widest text-white/60">
        {label}
      </p>
    </div>
  );
}
