import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { brand } from "@/content/site";

// Serif display de lujo (títulos) — Cormorant Garamond
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Sans limpia (cuerpo / UI)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Distribuidora de cosméticos premium en Santa Cruz, Bolivia. Marcas originales y autorizadas, precios para revender y soporte para distribuidoras. Únete a la Red de Distribuidoras Autorizadas.",
  keywords: [
    "cosméticos",
    "distribuidora",
    "Bolivia",
    "Santa Cruz",
    "skin care",
    "maquillaje",
    "La Roche-Posay",
    "Vichy",
    "CeraVe",
    "distribuidoras autorizadas",
  ],
  metadataBase: new URL("https://www.pielradiante.bo"),
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Cosméticos premium originales y soporte para distribuidoras en Bolivia.",
    type: "website",
    locale: "es_BO",
    siteName: brand.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1B4332",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-BO" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Analytics />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
