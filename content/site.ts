/**
 * Fuente única de contenido del sitio Piel Radiante.
 * Editar aquí para actualizar textos, productos, marcas y datos de contacto.
 * (Las imágenes referenciadas viven en /public; usar placeholders si faltan.)
 */

export const brand = {
  name: "Piel Radiante",
  tagline: "Belleza que distribuye confianza",
  shortName: "Piel Radiante",
  business: "Distribuidora de cosméticos premium",
  location: "Santa Cruz, Bolivia",
  website: "www.pielradiante.bo",
  instagram: "@pielradiante.distribuidora",
  instagramUrl: "https://instagram.com/pielradiante.distribuidora",
  email: "info@pielradiante.bo",
  phoneDisplay: "+591 700 00000",
  minOrder: "Bs. 300",
} as const;

export const nav = [
  { label: "Promos", href: "#promos" },
  { label: "Productos", href: "#productos" },
  { label: "Skin Care", href: "#categorias" },
  { label: "Maquillaje", href: "#categorias" },
  { label: "Distribuidoras", href: "#programa" },
  { label: "Opiniones", href: "#testimonios" },
  { label: "Nosotros", href: "#nosotros" },
] as const;

export const stats = [
  { value: 500, suffix: "+", label: "Distribuidoras activas" },
  { value: 8, suffix: "", label: "Marcas autorizadas" },
  { value: 1200, suffix: "+", label: "Productos en catálogo" },
  { value: 72, suffix: "h", label: "Envíos a todo el país" },
] as const;

export const valueProps = [
  {
    title: "Productos originales",
    desc: "Marcas autorizadas y de prestigio internacional, 100% auténticas.",
  },
  {
    title: "Precios para revender",
    desc: "Precios competitivos pensados para que tu negocio crezca.",
  },
  {
    title: "Asesoramiento profesional",
    desc: "Te acompañamos con capacitación continua para distribuidoras.",
  },
  {
    title: "Envíos seguros",
    desc: "A todo el país en 24–72h, con empaque cuidado.",
  },
] as const;

export interface Category {
  id: string;
  name: string;
  desc: string;
  image: string; // /public/categories/*.jpg (placeholder si falta)
  accent: string;
}

export const categories: Category[] = [
  {
    id: "skincare",
    name: "Skin Care",
    desc: "Sérum facial, crema regeneradora, agua micelar, mascarillas.",
    image: "/categories/skincare.svg",
    accent: "#C9A84C",
  },
  {
    id: "maquillaje",
    name: "Maquillaje",
    desc: "Base líquida, labial matte, alta pigmentación.",
    image: "/categories/maquillaje.svg",
    accent: "#DEC57A",
  },
  {
    id: "capilar",
    name: "Capilar",
    desc: "Shampoo reparador, tratamientos de nutrición.",
    image: "/categories/capilar.svg",
    accent: "#2D6A4F",
  },
  {
    id: "corporal",
    name: "Corporal",
    desc: "Body lotion hidratante para una piel suave.",
    image: "/categories/corporal.svg",
    accent: "#245741",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    desc: "Brochas, esponjas y complementos de belleza.",
    image: "/categories/accesorios.svg",
    accent: "#C9A84C",
  },
];

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  image: string; // /public/products/*.jpg (placeholder si falta)
}

export const featuredProducts: Product[] = [
  {
    id: "serum-vichy",
    name: "Sérum Facial Mineral 89",
    brand: "Vichy",
    category: "Skin Care",
    price: "Bs. 210",
    image: "/products/serum.svg",
  },
  {
    id: "crema-cerave",
    name: "Crema Hidratante Regeneradora",
    brand: "CeraVe",
    category: "Skin Care",
    price: "Bs. 165",
    image: "/products/crema.svg",
  },
  {
    id: "base-maybelline",
    name: "Base Líquida Fit Me",
    brand: "Maybelline",
    category: "Maquillaje",
    price: "Bs. 95",
    image: "/products/base.svg",
  },
  {
    id: "labial-loreal",
    name: "Labial Matte Color Riche",
    brand: "L'Oréal Paris",
    category: "Maquillaje",
    price: "Bs. 80",
    image: "/products/labial.svg",
  },
  {
    id: "agua-larocheposay",
    name: "Agua Micelar Ultra",
    brand: "La Roche-Posay",
    category: "Skin Care",
    price: "Bs. 140",
    image: "/products/micelar.svg",
  },
  {
    id: "shampoo-garnier",
    name: "Shampoo Reparador",
    brand: "Garnier",
    category: "Capilar",
    price: "Bs. 70",
    image: "/products/shampoo.svg",
  },
];

export interface BrandLogo {
  name: string;
  logo: string; // /public/brands/*.svg
}

export const brandLogos: BrandLogo[] = [
  { name: "La Roche-Posay", logo: "/brands/la-roche-posay.svg" },
  { name: "Vichy", logo: "/brands/vichy.svg" },
  { name: "Maybelline", logo: "/brands/maybelline.svg" },
  { name: "CeraVe", logo: "/brands/cerave.svg" },
  { name: "Revlon", logo: "/brands/revlon.svg" },
  { name: "L'Oréal Paris", logo: "/brands/loreal.svg" },
  { name: "Garnier", logo: "/brands/garnier.svg" },
  { name: "elf", logo: "/brands/elf.svg" },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  city: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "María Fernanda",
    role: "Distribuidora desde 2023",
    city: "Santa Cruz",
    quote:
      "Empecé revendiendo a mis amigas y hoy tengo mi propia cartera de clientas. El soporte de Piel Radiante fue clave.",
  },
  {
    name: "Lucía Áñez",
    role: "Distribuidora autorizada",
    city: "Cochabamba",
    quote:
      "Los productos son originales y llegan rapidísimo. Mis clientas notan la diferencia y vuelven a comprar.",
  },
  {
    name: "Daniela Roca",
    role: "Emprendedora de belleza",
    city: "La Paz",
    quote:
      "La capacitación me dio confianza para asesorar. Ahora mi negocio crece mes a mes con márgenes reales.",
  },
];
