"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Marquee cinético: una franja de texto display gigante que se desplaza en
 * loop infinito y reacciona al scroll — acelera con la velocidad del scroll
 * e invierte su dirección cuando el usuario scrollea hacia arriba.
 *
 * Con prefers-reduced-motion el texto queda estático (sin loop).
 */
export function VelocityMarquee({
  text,
  className,
  baseSpeed = 60, // px/segundo del desplazamiento base
}: {
  text: string;
  className?: string;
  baseSpeed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // El track contiene el contenido duplicado: desplazamos 0 → -50% y
      // el wrap lo hace parecer infinito.
      const half = track.scrollWidth / 2;
      let pos = 0;
      let direction = 1; // 1 = izquierda, -1 = derecha
      let boost = 0; // impulso extra proveniente de la velocidad de scroll

      // La velocidad del scroll alimenta el impulso y decide la dirección
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v < 0) direction = -1;
          else if (v > 0) direction = 1;
          boost = Math.min(Math.abs(v) / 250, 12); // cap del impulso
        },
      });

      const tick = (_t: number, delta: number) => {
        // delta viene en ms → convertir a segundos
        const dt = delta / 1000;
        pos -= direction * (baseSpeed + baseSpeed * boost) * dt;
        // wrap en ambos sentidos
        if (pos <= -half) pos += half;
        if (pos > 0) pos -= half;
        // decaimiento suave del impulso
        boost *= 0.94;
        gsap.set(track, { x: pos });
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    });

    return () => mm.revert();
  }, [baseSpeed]);

  // Item repetido para poder duplicar el contenido (loop sin costuras)
  const items = Array.from({ length: 4 }, (_, i) => (
    <span key={i} className="flex shrink-0 items-center gap-8 pr-8">
      <span>{text}</span>
      <span aria-hidden className="text-accent">
        ✦
      </span>
    </span>
  ));

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none select-none overflow-hidden whitespace-nowrap",
        className
      )}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {/* contenido x2 para el wrap de -50% */}
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0">{items}</div>
      </div>
    </div>
  );
}
