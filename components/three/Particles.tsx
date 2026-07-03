"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Campo de partículas doradas que flotan y reaccionan al cursor.
 * (Efecto 3D #1 del prompt — "moléculas de belleza / polvo de diamante").
 *
 * Técnica: THREE.Points + BufferGeometry. Un ShaderMaterial mueve cada
 * partícula con ruido sutil (uTime) y las aleja suavemente del mouse (uMouse).
 */
export function Particles({ count = 6000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  // Posiciones y tamaños aleatorios (una sola vez)
  const { positions, sizes, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribución en una nube elíptica alrededor del centro
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i] = Math.random() * 1.5 + 0.4;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, sizes, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
      uColorA: { value: new THREE.Color("#C9A84C") }, // accent (dorado)
      uColorB: { value: new THREE.Color("#DEC57A") }, // accent-soft
      uSize: { value: 22 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;

    // Mapear el puntero (NDC -1..1) a coordenadas del mundo en el plano z=0
    const px = (state.pointer.x * viewport.width) / 2;
    const py = (state.pointer.y * viewport.height) / 2;
    mouse.current.lerp(new THREE.Vector3(px, py, 0), 0.08);
    matRef.current.uniforms.uMouse.value.copy(mouse.current);

    // Rotación global muy lenta para dar vida
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          count={count}
          array={seeds}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uSize;

  attribute float aSize;
  attribute float aSeed;

  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Deriva orgánica: cada partícula oscila según su semilla
    pos.x += sin(uTime * 0.3 + aSeed) * 0.25;
    pos.y += cos(uTime * 0.25 + aSeed * 1.3) * 0.25;

    // Repulsión suave respecto al mouse (en XY)
    vec2 toMouse = pos.xy - uMouse.xy;
    float dist = length(toMouse);
    float force = smoothstep(2.5, 0.0, dist) * 1.2;
    pos.xy += normalize(toMouse + 0.0001) * force;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Tamaño atenuado por profundidad
    gl_PointSize = uSize * aSize * (1.0 / -mvPosition.z);

    // Las más cercanas brillan más
    vAlpha = clamp(0.35 + force * 0.5, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;

  void main() {
    // Punto circular suave (descartar esquinas)
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);

    vec3 color = mix(uColorA, uColorB, glow);
    gl_FragColor = vec4(color, glow * vAlpha);
  }
`;
