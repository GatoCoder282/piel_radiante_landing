import Image from "next/image";
import { brand, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-primary text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <span className="font-display text-lg tracking-wide text-white">
                PIEL RADIANTE
              </span>
            </div>
            <p className="mt-4 max-w-xs font-display text-lg italic text-accent-soft">
              “{brand.tagline}”
            </p>
            <p className="mt-4 text-sm text-white/50">
              {brand.business}
              <br />
              {brand.location}
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Navegación
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-2">
              {nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Contacto
            </h3>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="transition-colors hover:text-white"
                >
                  {brand.email}
                </a>
              </li>
              <li>{brand.phoneDisplay}</li>
              <li>
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {brand.instagram}
                </a>
              </li>
              <li>{brand.website}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}. Todos los derechos
            reservados.
          </p>
          <p>Pedido mínimo {brand.minOrder} · Envíos a todo el país</p>
        </div>
      </div>
    </footer>
  );
}
