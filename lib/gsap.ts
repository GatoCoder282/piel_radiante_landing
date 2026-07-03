"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Punto único de registro de plugins de GSAP.
 * Importar { gsap, ScrollTrigger } desde aquí en componentes cliente
 * garantiza que los plugins se registran una sola vez.
 *
 * SplitText es plugin de pago (GSAP Club); usamos SplitType (gratis)
 * en los componentes que dividen texto.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Defaults de marca: eases suaves tipo "luxe"
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

export { gsap, ScrollTrigger };
