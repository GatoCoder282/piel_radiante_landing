"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import { brandLogos } from "@/content/site";

/**
 * MARCAS — logo wall con entrada staggered + tilt 3D en hover
 * (perspective CSS + JS, sin librerías).
 */
export function Marcas() {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, { y: 30, stagger: 0.06 });

  return (
    <section id="marcas" className="bg-background pb-[var(--spacing-section)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Marcas autorizadas"
          title="Distribuimos lo mejor del mundo"
          subtitle="Trabajamos solo con marcas originales y proveedores autorizados que respaldan cada producto."
        />

        <div
          ref={ref}
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {brandLogos.map((b) => (
            <TiltCard key={b.name}>
              <div className="flex h-28 items-center justify-center rounded-2xl border border-accent/15 bg-white px-6 shadow-[0_8px_30px_rgba(26,23,20,0.05)]">
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={140}
                  height={48}
                  className="max-h-12 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
            </TiltCard>
          ))}
        </div>
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
    el.style.transform = `perspective(700px) rotateY(${px * 12}deg) rotateX(${
      -py * 12
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
      data-reveal
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="transition-transform duration-200 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
