"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import { brandLogos } from "@/content/site";

/**
 * MARCAS — cinta infinita (marquee) con los logos reales de las marcas
 * distribuidas. Se pausa al pasar el cursor y cada tarjeta tiene tilt 3D.
 * El loop es CSS puro (keyframes) → cero costo JS y respeta reduced-motion
 * vía la regla global que congela animaciones.
 */
export function Marcas() {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, { y: 30, stagger: 0.06 });

  // Duplicamos la lista para el wrap seamless de -50%
  const loop = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section id="marcas" className="bg-background pb-[var(--spacing-section)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Marcas autorizadas"
          title="Distribuimos marcas que cuidan tu piel"
          subtitle="Cosmética profesional y natural, 100% original, respaldada por cada laboratorio."
        />
      </div>

      {/* Marquee full-bleed con máscara de desvanecido en los bordes */}
      <div
        ref={ref}
        data-reveal
        className="group/marquee mt-14 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="brand-marquee flex w-max items-center gap-6 py-2 group-hover/marquee:[animation-play-state:paused]">
          {loop.map((b, i) => (
            <TiltCard key={`${b.name}-${i}`}>
              <div className="flex h-32 w-56 items-center justify-center overflow-hidden rounded-2xl border border-accent/15 bg-white px-6 shadow-[0_8px_30px_rgba(26,26,26,0.06)]">
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={190}
                  height={90}
                  className="max-h-24 w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Nombres de marca como refuerzo textual */}
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 text-sm tracking-wide text-muted">
        {brandLogos.map((b) => (
          <span key={b.name} className="flex items-center gap-2">
            <span className="text-accent">✦</span>
            {b.name}
          </span>
        ))}
      </div>
    </section>
  );
}

/** Tarjeta con inclinación 3D según la posición del cursor. */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${px * 10}deg) rotateX(${
      -py * 10
    }deg) translateZ(6px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el)
      el.style.transform =
        "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="shrink-0 transition-transform duration-200 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
