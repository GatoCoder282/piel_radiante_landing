# Piel Radiante — Landing Page

Landing page de una sola página, nivel premium, para **Piel Radiante** —
distribuidora de cosméticos en Santa Cruz, Bolivia. Construida con efectos
WebGL/3D optimizados, scroll suave y animaciones de scroll, con fallbacks para
dispositivos sin WebGL o con `prefers-reduced-motion`.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS v4** (tokens de marca en `app/globals.css`)
- **Three.js + React Three Fiber + drei** — partículas, frasco 3D, distorsión líquida
- **GSAP + ScrollTrigger** + **SplitType** — timelines, scroll horizontal, reveals
- **Lenis** — smooth scroll global
- **Framer Motion** — disponible para micro-interacciones

### Sistema de diseño

Paleta (tokens en `app/globals.css`, utilidades Tailwind entre paréntesis):

| Token        | Valor     | Utilidad           | Uso                                            |
| ------------ | --------- | ------------------ | ---------------------------------------------- |
| primary      | `#1B4332` | `bg/text-primary`  | Verde botella — hero, header, botones primarios|
| accent       | `#C9A84C` | `bg/text-accent`   | Dorado — CTAs destacados, bordes, iconos, hover|
| accent-soft  | `#DEC57A` | `*-accent-soft`    | Dorado claro — glow / hovers suaves            |
| background   | `#F5F0E8` | `bg-background`    | Crema — fondo general, tarjetas                |
| surface      | `#FFFFFF` | `text-white`       | Blanco — superficies, texto sobre oscuros      |
| ink          | `#1A1A1A` | `text-ink`         | Texto principal sobre fondos claros            |
| muted        | `#6B7280` | `text-muted`       | Texto secundario, placeholders, labels         |

Tipografía (`next/font`): **Cormorant Garamond** (serif) para títulos/`font-display`,
**Inter** (sans) para UI/cuerpo.

## Cómo correr

```bash
npm install
cp .env.local.example .env.local   # completa tus valores
npm run dev                        # http://localhost:3000
npm run build && npm start         # producción
```

## Estructura

```
app/            layout (fonts, SEO, analytics) + page (ensambla secciones)
components/
  layout/       Navbar, Footer, SmoothScroll, Analytics
  sections/     Hero, QuienesSomos, Categorias, ProductosTop, Marcas,
                Programa, Testimonios, Contacto
  three/        Particles, Bottle, HeroScene, ParticlesScene, LiquidImage
  ui/           Button, SectionHeading, StatCounter, CurtainReveal
content/site.ts  TODO el contenido editable (marca, productos, categorías, etc.)
lib/             gsap, whatsapp, analytics, useDeviceCapability, useRevealOnScroll, cn
public/          assets (placeholders SVG — reemplazar por reales)
```

## Efectos 3D implementados

1. **Partículas doradas reactivas al mouse** (Hero) — `three/Particles.tsx`
2. **Distorsión líquida en hover** de productos — `three/LiquidImage.tsx`
3. **Frasco 3D procedimental flotante** (Hero) — `three/Bottle.tsx`
4. **Transición "cortina"** entre secciones — `ui/CurtainReveal.tsx`

Cada efecto degrada con elegancia: sin WebGL o en móvil de gama baja se usa una
versión CSS/imagen. Todo respeta `prefers-reduced-motion` vía `gsap.matchMedia`.

## ✅ Pendientes para producción (reemplazar placeholders)

Los assets en `/public` son **placeholders SVG generados**. Reemplázalos por los
reales (mismos nombres, o actualiza las rutas en `content/site.ts`):

- `public/logo.svg` — logo real de Piel Radiante
- `public/about.svg` — foto para la sección Nosotros
- `public/products/*.svg` — fotos reales de productos (puedes usar `.jpg`/`.png` y
  actualizar la extensión en `content/site.ts`)
- `public/categories/*.svg` — imágenes de categorías
- `public/brands/*.svg` — logos oficiales de las marcas

Variables de entorno (`.env.local`):

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — **número real** de WhatsApp (formato `59170000000`)
- `NEXT_PUBLIC_GA_ID` — Measurement ID de Google Analytics 4 (opcional)
- `NEXT_PUBLIC_META_PIXEL_ID` — ID del Meta Pixel (opcional)

Contenido a confirmar en `content/site.ts`: precios, estadísticas reales del
contador (distribuidoras/marcas/productos) y testimonios reales.

> Regenerar placeholders: `node scripts/gen-placeholders.mjs`

## Deploy

Pensado para **Vercel**: importar el repo, definir las env vars y desplegar.
