"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "low" | "fallback";

export interface DeviceCapability {
  /** ¿El navegador soporta WebGL? Si no, usar fallbacks CSS. */
  hasWebGL: boolean;
  /** Usuario pidió menos movimiento. */
  reducedMotion: boolean;
  /** Heurística de móvil (viewport + touch). */
  isMobile: boolean;
  /**
   * Nivel sugerido para densidad de efectos:
   * - "high": desktop con buena GPU → todos los efectos a tope
   * - "low": móvil o pocos núcleos → efectos reducidos
   * - "fallback": sin WebGL o reduced-motion → versión CSS/estática
   */
  tier: DeviceTier;
  /** Densidad sugerida de partículas (0 = no renderizar 3D). */
  particleCount: number;
  /** ¿Listo? (evita decisiones antes de montar en cliente). */
  ready: boolean;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Detecta capacidad del dispositivo para decidir densidad de efectos 3D
 * y si se usa el fallback. Se evalúa una vez en el cliente.
 */
export function useDeviceCapability(): DeviceCapability {
  const [cap, setCap] = useState<DeviceCapability>({
    hasWebGL: true,
    reducedMotion: false,
    isMobile: false,
    tier: "high",
    particleCount: 6000,
    ready: false,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasWebGL = detectWebGL();
    const isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window;
    const cores = navigator.hardwareConcurrency || 4;

    let tier: DeviceTier = "high";
    if (!hasWebGL || reducedMotion) tier = "fallback";
    else if (isMobile || cores <= 4) tier = "low";

    const particleCount =
      tier === "fallback" ? 0 : tier === "low" ? 2500 : 6500;

    setCap({
      hasWebGL,
      reducedMotion,
      isMobile,
      tier,
      particleCount,
      ready: true,
    });
  }, []);

  return cap;
}
