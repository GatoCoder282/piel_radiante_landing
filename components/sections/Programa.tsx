"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { StatCounter } from "@/components/ui/StatCounter";
import { useDeviceCapability } from "@/lib/useDeviceCapability";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import { stats, valueProps, brand } from "@/content/site";
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { trackDistribuidoraCTA } from "@/lib/analytics";

const ParticlesScene = dynamic(
  () => import("@/components/three/ParticlesScene").then((m) => m.ParticlesScene),
  { ssr: false }
);

/**
 * Sección PROGRAMA DISTRIBUIDORAS — el CTA estrella de conversión.
 * Fondo de partículas secundario + estadísticas animadas + CTA grande a WhatsApp.
 */
export function Programa() {
  const cap = useDeviceCapability();
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref);

  const showCanvas = cap.ready && cap.tier !== "fallback";
  const waUrl = buildWhatsAppUrl(WHATSAPP_MESSAGES.distribuidora);

  return (
    <section
      id="programa"
      className="relative overflow-hidden bg-primary py-[var(--spacing-section)]"
    >
      {/* Fondo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 80% at 50% 0%, rgba(201,168,76,0.22) 0%, rgba(27,67,50,0) 60%), #1B4332",
        }}
      />
      {showCanvas ? (
        <div className="absolute inset-0 opacity-70">
          <ParticlesScene particleCount={Math.round(cap.particleCount / 2)} />
        </div>
      ) : (
        <div aria-hidden className="hero-fallback absolute inset-0 opacity-50" />
      )}

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Encabezado + CTA */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            Red de Distribuidoras Autorizadas
          </p>
          <h2
            data-reveal
            className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Convierte la belleza en{" "}
            <span className="text-gradient-gold">tu propio negocio</span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            Únete a cientos de emprendedoras que ya generan ingresos revendiendo
            productos originales. Te damos precios mayoristas, capacitación y
            envíos a todo el país. Pedido mínimo {brand.minOrder}.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap justify-center gap-4">
            <Button
              as="a"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              onClick={() => trackDistribuidoraCTA("programa")}
            >
              Empezar por WhatsApp
            </Button>
            <Button as="a" href="#contacto" variant="outline" size="lg">
              Dejar mis datos
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-20 grid grid-cols-2 gap-10 border-y border-white/10 py-12 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>

        {/* Beneficios */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((vp) => (
            <div
              key={vp.title}
              data-reveal
              className="glass rounded-2xl p-6 text-left"
            >
              <h3 className="font-display text-xl text-white">{vp.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {vp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
