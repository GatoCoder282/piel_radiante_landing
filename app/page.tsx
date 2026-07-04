import { Hero } from "@/components/sections/Hero";
import { QuienesSomos } from "@/components/sections/QuienesSomos";
import { Categorias } from "@/components/sections/Categorias";
import { ProductosTop } from "@/components/sections/ProductosTop";
import { Marcas } from "@/components/sections/Marcas";
import { Programa } from "@/components/sections/Programa";
import { Testimonios } from "@/components/sections/Testimonios";
import { Contacto } from "@/components/sections/Contacto";
import { CurtainReveal } from "@/components/ui/CurtainReveal";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Franja cinética: reacciona a la velocidad y dirección del scroll */}
      <VelocityMarquee
        text="PIEL RADIANTE"
        className="border-y border-accent/15 bg-background py-6 font-display text-6xl font-semibold uppercase tracking-tight text-primary/10 sm:text-8xl"
      />
      <QuienesSomos />
      <Categorias />
      {/* Transición "cortina" dorada al revelar los productos */}
      <CurtainReveal>
        <ProductosTop />
        <Marcas />
      </CurtainReveal>
      <VelocityMarquee
        text="BELLEZA QUE DISTRIBUYE CONFIANZA"
        baseSpeed={45}
        className="bg-primary py-5 font-display text-4xl uppercase tracking-wide text-accent/25 sm:text-6xl"
      />
      <Programa />
      <Testimonios />
      <Contacto />
    </>
  );
}
