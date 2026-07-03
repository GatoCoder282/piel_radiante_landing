"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import { brand } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackDistribuidoraCTA } from "@/lib/analytics";

/**
 * CONTACTO — formulario minimalista. No usa backend: arma un mensaje
 * con los datos y abre WhatsApp (el CTA principal del sitio).
 */
export function Contacto() {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref);

  const [form, setForm] = useState({
    nombre: "",
    ciudad: "",
    interes: "Quiero ser distribuidora",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // buildWhatsAppUrl codifica el texto; armamos un mensaje legible
    const plain =
      `¡Hola ${brand.name}! 🌟\n\n` +
      `Nombre: ${form.nombre}\n` +
      `Ciudad: ${form.ciudad}\n` +
      `Interés: ${form.interes}\n` +
      (form.mensaje ? `Mensaje: ${form.mensaje}` : "");
    trackDistribuidoraCTA("contacto-form");
    window.open(buildWhatsAppUrl(plain), "_blank", "noopener,noreferrer");
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-accent";

  return (
    <section id="contacto" className="bg-primary py-[var(--spacing-section)]">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-10"
      >
        {/* Info */}
        <div>
          <SectionHeading
            eyebrow="Hablemos"
            title="Da el primer paso hoy"
            subtitle="Déjanos tus datos y te contactamos por WhatsApp para empezar. Sin compromiso."
            align="left"
            light
          />
          <ul data-reveal className="mt-10 space-y-4 text-white/70">
            <li>
              <span className="text-xs uppercase tracking-widest text-accent">
                Email
              </span>
              <br />
              <a className="hover:text-white" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </li>
            <li>
              <span className="text-xs uppercase tracking-widest text-accent">
                Teléfono
              </span>
              <br />
              {brand.phoneDisplay}
            </li>
            <li>
              <span className="text-xs uppercase tracking-widest text-accent">
                Instagram
              </span>
              <br />
              <a
                className="hover:text-white"
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {brand.instagram}
              </a>
            </li>
            <li>
              <span className="text-xs uppercase tracking-widest text-accent">
                Ubicación
              </span>
              <br />
              {brand.location}
            </li>
          </ul>
        </div>

        {/* Formulario */}
        <form
          data-reveal
          onSubmit={handleSubmit}
          className="glass rounded-[1.75rem] p-8"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="nombre" className="sr-only">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                required
                value={form.nombre}
                onChange={onChange}
                placeholder="Tu nombre"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="ciudad" className="sr-only">
                Ciudad
              </label>
              <input
                id="ciudad"
                name="ciudad"
                required
                value={form.ciudad}
                onChange={onChange}
                placeholder="Tu ciudad"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="interes" className="sr-only">
                Interés
              </label>
              <select
                id="interes"
                name="interes"
                value={form.interes}
                onChange={onChange}
                className={inputClass}
              >
                <option className="text-ink">
                  Quiero ser distribuidora
                </option>
                <option className="text-ink">Quiero hacer un pedido</option>
                <option className="text-ink">Información general</option>
              </select>
            </div>
            <div>
              <label htmlFor="mensaje" className="sr-only">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={form.mensaje}
                onChange={onChange}
                placeholder="Mensaje (opcional)"
                className={inputClass}
              />
            </div>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full">
            Enviar por WhatsApp
          </Button>
          <p className="mt-3 text-center text-xs text-white/40">
            Se abrirá WhatsApp con tu mensaje listo para enviar.
          </p>
        </form>
      </div>
    </section>
  );
}
