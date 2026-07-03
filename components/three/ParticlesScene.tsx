"use client";

import { Canvas } from "@react-three/fiber";
import { Particles } from "./Particles";

/**
 * Canvas ligero solo con el campo de partículas, para usar como fondo
 * secundario (p. ej. la sección Programa Distribuidoras).
 * Se monta vía next/dynamic (ssr:false).
 */
export function ParticlesScene({
  particleCount = 3000,
}: {
  particleCount?: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <Particles count={particleCount} />
    </Canvas>
  );
}
