import { Hero } from "@/components/sections/Hero";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Categorias } from "@/components/sections/Categorias";
import { ProductosTop } from "@/components/sections/ProductosTop";
import { Marcas } from "@/components/sections/Marcas";
import { Programa } from "@/components/sections/Programa";
import { Testimonios } from "@/components/sections/Testimonios";
import { Contacto } from "@/components/sections/Contacto";
import { CurtainReveal } from "@/components/ui/CurtainReveal";

export default function Home() {
  return (
    <>
      <Hero />
      <QuienesSomos />
      <Categorias />
      {/* Transición "cortina" dorada al revelar los productos */}
      <CurtainReveal>
        <ProductosTop />
        <Marcas />
      </CurtainReveal>
      <Programa />
      <Testimonios />
      <Contacto />
    </>
  );
}
