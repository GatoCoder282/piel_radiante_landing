"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Particles } from "./Particles";
import { Bottle } from "./Bottle";

/**
 * Escena 3D del Hero: un solo <Canvas> que contiene el campo de partículas
 * y el frasco flotante, iluminado con un Environment (HDRI de drei) para
 * reflejos de vidrio realistas.
 *
 * Se monta vía next/dynamic (ssr:false) desde Hero.tsx. `particleCount`
 * llega desde useDeviceCapability para degradar en móvil.
 */
export function HeroScene({ particleCount = 6000 }: { particleCount?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      {/* Luces de apoyo (el Environment hace el grueso del trabajo) */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#dec57a" />

      {/* HDRI para reflejos del vidrio/metal */}
      <Environment preset="studio" />

      <Particles count={particleCount} />

      {/* Frasco desplazado a la derecha en desktop */}
      <Float speed={1} floatIntensity={0.4}>
        <group position={[2.1, -0.1, 0]} scale={1.05}>
          <Bottle />
        </group>
      </Float>
    </Canvas>
  );
}
