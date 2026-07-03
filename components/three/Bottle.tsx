"use client";

import { useMemo } from "react";
import { Float } from "@react-three/drei";
import { gsap } from "@/lib/gsap";
import * as THREE from "three";

/**
 * Frasco de cosmético premium generado de forma procedimental
 * (sin necesidad de un .glb). El cuerpo se crea con LatheGeometry a partir
 * de un perfil 2D; el vidrio usa MeshPhysicalMaterial (transmission) para
 * reflejos realistas con el Environment del HeroScene.
 *
 * (Efecto 3D #3 — "frasco de producto flotante"). Entra en escena con GSAP.
 */
export function Bottle() {
  // Perfil del frasco (revolución alrededor del eje Y)
  const bodyPoints = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.0, -1.3)); // base centro
    pts.push(new THREE.Vector2(0.62, -1.3)); // base borde
    pts.push(new THREE.Vector2(0.7, -1.0));
    pts.push(new THREE.Vector2(0.72, 0.2)); // cuerpo recto
    pts.push(new THREE.Vector2(0.66, 0.7)); // hombro
    pts.push(new THREE.Vector2(0.34, 0.95)); // cuello inferior
    pts.push(new THREE.Vector2(0.3, 1.25)); // cuello
    return pts;
  }, []);

  // Animación de entrada: aparece con escala tipo "spring"
  const onGroupRef = (g: THREE.Group | null) => {
    if (!g) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      g.scale.setScalar(1);
      return;
    }
    g.scale.setScalar(0);
    gsap.to(g.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.4,
      ease: "elastic.out(1, 0.6)",
      delay: 0.4,
    });
  };

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <group ref={onGroupRef} rotation={[0, 0, 0.06] as const}>
        {/* Cuerpo de vidrio */}
        <mesh castShadow>
          <latheGeometry args={[bodyPoints, 64]} />
          <meshPhysicalMaterial
            color="#eef3ea"
            roughness={0.08}
            metalness={0}
            transmission={0.92}
            thickness={1.2}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.1}
            attenuationColor="#9fc3ad"
            attenuationDistance={2.4}
          />
        </mesh>

        {/* Líquido interior (dorado) */}
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.64, 0.6, 1.5, 48]} />
          <meshPhysicalMaterial
            color="#c9a84c"
            roughness={0.25}
            transmission={0.55}
            thickness={1}
            ior={1.33}
          />
        </mesh>

        {/* Tapa dorada (metal pulido) */}
        <mesh position={[0, 1.45, 0]}>
          <cylinderGeometry args={[0.34, 0.32, 0.5, 48]} />
          <meshStandardMaterial
            color="#c9a84c"
            roughness={0.18}
            metalness={1}
          />
        </mesh>

        {/* Anillo del cuello */}
        <mesh position={[0, 1.15, 0]}>
          <torusGeometry args={[0.31, 0.05, 16, 48]} />
          <meshStandardMaterial color="#b8924c" roughness={0.2} metalness={1} />
        </mesh>
      </group>
    </Float>
  );
}
