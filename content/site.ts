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
  phoneDisplay: "+591 67405100", // TODO: verificar número (el original tenía un carácter inválido)
  minOrder: "Bs. 300",
  logo: "/logo.png",
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
  { value: 4, suffix: "", label: "Marcas autorizadas" },
  { value: 100, suffix: "+", label: "Productos en catálogo" },
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
  /** Presentación/tamaño visible en la tarjeta (el precio se consulta por WhatsApp). */
  presentation: string;
  image: string; // /public/products/*
}

export const featuredProducts: Product[] = [
  {
    id: "acido-salicilico-libra",
    name: "Loción Ácido Salicílico 2% + Niacinamida 3%",
    brand: "Libra Cosmética",
    category: "Skin Care",
    presentation: "500 ml",
    image: "/products/acido-salicilico-libra.jpeg",
  },
  {
    id: "colageno-libra",
    name: "Sérum Collagen — Therapy N°04",
    brand: "Libra Cosmética",
    category: "Skin Care",
    presentation: "50 ml",
    image: "/products/colageno-libra.jpeg",
  },
  {
    id: "vitamina-c-libra",
    name: "Booster C Vitamin — Therapy N°08",
    brand: "Libra Cosmética",
    category: "Skin Care",
    presentation: "50 ml",
    image: "/products/vitamina-c-libra.jpeg",
  },
  {
    id: "gel-multitask-libra",
    name: "Gel Mask Multi C — Renovador Celular",
    brand: "Libra Cosmética",
    category: "Skin Care",
    presentation: "Pote profesional",
    image: "/products/gel-multitask-libra.jpeg",
  },
  {
    id: "tensor-colageno-libra",
    name: "Velo de Colágeno Hidrolizado",
    brand: "Libra Cosmética",
    category: "Skin Care",
    presentation: "Pote profesional",
    image: "/products/tensor-colageno-libra.jpeg",
  },
  {
    id: "gel-descongestivo-libra",
    name: "Gel Descongestivo — Uso Profesional",
    brand: "Libra Cosmética",
    category: "Skin Care",
    presentation: "Pote profesional",
    image: "/products/gel-descongestivo-libra.jpeg",
  },
];

export interface BrandLogo {
  name: string;
  logo: string; // /public/brands/*
}

export const brandLogos: BrandLogo[] = [
  { name: "Libra Cosmética", logo: "/brands/libra.jpeg" },
  { name: "Rouse Arey — Cosmética Natural", logo: "/brands/rouse-arey.jpeg" },
  { name: "Vital Blue", logo: "/brands/vital-blue.jpeg" },
  { name: "Zo-é Biocosmética", logo: "/brands/zoe.jpeg" },
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
