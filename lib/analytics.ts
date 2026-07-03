/**
 * Helpers de analytics. GA4 y Meta Pixel solo se cargan si sus env vars
 * (NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_META_PIXEL_ID) están presentes.
 * Ver <Analytics /> en components/layout para la inyección de scripts.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export const analyticsEnabled = {
  ga: GA_ID.length > 0,
  pixel: META_PIXEL_ID.length > 0,
};

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/** Evento genérico enviado a GA4 y Meta Pixel (si están activos). */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;

  if (analyticsEnabled.ga && w.gtag) {
    w.gtag("event", name, params);
  }
  if (analyticsEnabled.pixel && w.fbq) {
    w.fbq("trackCustom", name, params);
  }
}

/** CTA principal: click hacia el programa de distribuidoras. */
export function trackDistribuidoraCTA(source: string): void {
  trackEvent("distribuidora_cta_click", { source });
}
