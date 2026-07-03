"use client";

import { Suspense, useRef, useState } from "react";
import Image from "next/image";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { useDeviceCapability } from "@/lib/useDeviceCapability";
import { cn } from "@/lib/cn";

/**
 * Imagen con distorsión tipo "vidrio líquido" al hacer hover (efecto 3D #2).
 * - Desktop con WebGL: ShaderMaterial sobre un plano, distorsión animada con GSAP.
 * - Móvil / sin WebGL / reduced-motion: <Image> normal con un sutil zoom CSS.
 *
 * frameloop="demand": el Canvas solo renderiza cuando hay interacción → coste
 * idle casi nulo aunque haya varias tarjetas en la grilla.
 */

interface LiquidImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LiquidImage({ src, alt, className }: LiquidImageProps) {
  const cap = useDeviceCapability();
  const useWebGL = cap.ready && cap.tier === "high";

  if (!useWebGL) {
    return (
      <div className={cn("group relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <LiquidPlane src={src} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function LiquidPlane({ src }: { src: string }) {
  const texture = useTexture(src);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { invalidate, size } = useThree();
  const [hovered, setHovered] = useState(false);

  const img = texture.image as HTMLImageElement;
  const imageAspect = img ? img.width / img.height : 1;
  const planeAspect = size.width / size.height;

  const uniforms = useRef({
    uTex: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uImageAspect: { value: imageAspect },
    uPlaneAspect: { value: planeAspect },
  }).current;

  uniforms.uPlaneAspect.value = planeAspect;

  useFrame((_, delta) => {
    if (hovered && matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      invalidate(); // seguir renderizando mientras hay hover
    }
  });

  const animateHover = (to: number) => {
    if (!matRef.current) return;
    gsap.to(matRef.current.uniforms.uHover, {
      value: to,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: invalidate,
    });
  };

  return (
    <mesh
      scale={[2, 2, 1]}
      onPointerOver={() => {
        setHovered(true);
        animateHover(1);
      }}
      onPointerOut={() => {
        setHovered(false);
        animateHover(0);
      }}
      onPointerMove={(e) => {
        uniforms.uMouse.value.set(e.uv?.x ?? 0.5, e.uv?.y ?? 0.5);
        invalidate();
      }}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={liquidVertex}
        fragmentShader={liquidFragment}
      />
    </mesh>
  );
}

const liquidVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const liquidFragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform float uImageAspect;
  uniform float uPlaneAspect;
  varying vec2 vUv;

  void main() {
    // object-fit: cover
    vec2 uv = vUv;
    float aspect = uPlaneAspect / uImageAspect;
    if (aspect > 1.0) {
      uv.y = (uv.y - 0.5) / aspect + 0.5;
    } else {
      uv.x = (uv.x - 0.5) * aspect + 0.5;
    }

    // Distorsión líquida: olas que emanan del cursor, moduladas por uHover
    float dist = distance(vUv, uMouse);
    float ripple = sin(dist * 18.0 - uTime * 3.0) * 0.02;
    vec2 dir = normalize(vUv - uMouse + 0.0001);
    uv += dir * ripple * uHover;

    // Pequeño desplazamiento ondulante general
    uv.x += sin(uv.y * 10.0 + uTime) * 0.006 * uHover;

    vec4 color = texture2D(uTex, uv);

    // Realce dorado sutil en hover
    color.rgb += vec3(0.06, 0.045, 0.02) * uHover;
    gl_FragColor = color;
  }
`;
