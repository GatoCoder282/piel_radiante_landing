// Genera SVGs placeholder para que el sitio se vea completo sin assets reales.
// Reemplaza estos archivos en /public con tus fotos/logos reales.
// Paleta: verde botella #1B4332 · dorado #C9A84C · crema #F5F0E8.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const PRIMARY = "#1B4332";
const PRIMARY_SOFT = "#245741";
const ACCENT = "#C9A84C";
const ACCENT_SOFT = "#DEC57A";
const CREAM = "#F5F0E8";
const INK = "#1A1A1A";
const MUTED = "#6B7280";

const w = (rel, svg) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim());
  console.log("✓", rel);
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/'/g, "&apos;");

// --- Producto (vertical 4:5) con silueta de frasco ---
const product = (name, brand, c2 = ACCENT_SOFT) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 600" width="480" height="600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CREAM}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="480" height="600" fill="url(#g)"/>
  <g transform="translate(240 300)" fill="none" stroke="${PRIMARY}" stroke-width="3" opacity="0.85">
    <rect x="-55" y="-90" width="110" height="200" rx="22"/>
    <rect x="-26" y="-130" width="52" height="42" rx="8"/>
    <line x1="-55" y1="20" x2="55" y2="20"/>
  </g>
  <text x="240" y="500" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="${INK}">${esc(name)}</text>
  <text x="240" y="535" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" letter-spacing="3" fill="${MUTED}">${esc(brand.toUpperCase())}</text>
</svg>`;

// --- Categoría (vertical) sobre verde botella ---
const category = (name, accent) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 880" width="680" height="880">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${PRIMARY_SOFT}"/><stop offset="1" stop-color="${PRIMARY}"/>
    </linearGradient>
    <radialGradient id="r" cx="0.5" cy="0.35" r="0.7">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="680" height="880" fill="url(#g)"/>
  <rect width="680" height="880" fill="url(#r)"/>
  <circle cx="340" cy="330" r="120" fill="none" stroke="${accent}" stroke-width="2" opacity="0.7"/>
  <text x="340" y="345" text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="${CREAM}">${esc(name)}</text>
</svg>`;

// --- Logo de marca (wordmark gris) ---
const brandLogo = (name) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" width="280" height="80">
  <rect width="280" height="80" fill="none"/>
  <text x="140" y="50" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="${INK}">${esc(name)}</text>
</svg>`;

// --- About (vertical) verde → dorado ---
const about = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 960" width="800" height="960">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PRIMARY}"/><stop offset="0.6" stop-color="${PRIMARY_SOFT}"/><stop offset="1" stop-color="${ACCENT}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="960" fill="url(#g)"/>
  <circle cx="400" cy="380" r="150" fill="${CREAM}" opacity="0.18"/>
  <text x="400" y="520" text-anchor="middle" font-family="Georgia, serif" font-size="48" fill="${CREAM}">Piel Radiante</text>
  <text x="400" y="565" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" letter-spacing="4" fill="${CREAM}" opacity="0.7">SANTA CRUZ · BOLIVIA</text>
</svg>`;

// --- Logo principal (ícono R) ---
const logo = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <circle cx="30" cy="30" r="26" fill="${PRIMARY}"/>
  <text x="30" y="40" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="${ACCENT}">R</text>
  <text x="68" y="38" font-family="Georgia, serif" font-size="22" letter-spacing="2" fill="${INK}">PIEL RADIANTE</text>
</svg>`;

// Productos (c2 alterna dorado suave / sage / crema cálida)
const SAGE = "#CFE0D5";
const WARM = "#E7E0D2";
const products = [
  ["serum", "Sérum Mineral 89", "Vichy", SAGE],
  ["crema", "Crema Regeneradora", "CeraVe", ACCENT_SOFT],
  ["base", "Base Fit Me", "Maybelline", WARM],
  ["labial", "Labial Color Riche", "L'Oréal", ACCENT_SOFT],
  ["micelar", "Agua Micelar Ultra", "La Roche-Posay", SAGE],
  ["shampoo", "Shampoo Reparador", "Garnier", WARM],
];
for (const [id, name, brand, c2] of products)
  w(`products/${id}.svg`, product(name, brand, c2));

// Categorías
const cats = [
  ["skincare", "Skin Care", ACCENT],
  ["maquillaje", "Maquillaje", ACCENT_SOFT],
  ["capilar", "Capilar", "#2D6A4F"],
  ["corporal", "Corporal", "#245741"],
  ["accesorios", "Accesorios", ACCENT],
];
for (const [id, name, accent] of cats) w(`categories/${id}.svg`, category(name, accent));

// Marcas
const brands = [
  ["la-roche-posay", "LA ROCHE-POSAY"],
  ["vichy", "VICHY"],
  ["maybelline", "MAYBELLINE"],
  ["cerave", "CeraVe"],
  ["revlon", "REVLON"],
  ["loreal", "L'ORÉAL PARIS"],
  ["garnier", "GARNIER"],
  ["elf", "e.l.f."],
];
for (const [id, name] of brands) w(`brands/${id}.svg`, brandLogo(name));

// Otros
w("about.svg", about);
w("logo.svg", logo);

console.log("\nPlaceholders generados en /public");
