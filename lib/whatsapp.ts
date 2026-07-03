/**
 * Helpers para enviar a los visitantes a WhatsApp con un mensaje pre-armado.
 * El número se lee de NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional sin '+').
 */

const FALLBACK_NUMBER = "59170000000"; // placeholder del prompt (+591 700 00000)

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_NUMBER;
}

/**
 * Construye la URL wa.me con el mensaje codificado.
 * @example buildWhatsAppUrl("Hola, quiero ser distribuidora")
 */
export function buildWhatsAppUrl(message: string, number?: string): string {
  const phone = number || getWhatsAppNumber();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Mensajes predefinidos por contexto/CTA. */
export const WHATSAPP_MESSAGES = {
  distribuidora:
    "¡Hola Piel Radiante! 🌟 Quiero unirme a la Red de Distribuidoras Autorizadas. ¿Me cuentan cómo empezar?",
  pedido:
    "¡Hola Piel Radiante! Me gustaría hacer un pedido. ¿Me pueden ayudar?",
  info: "¡Hola Piel Radiante! Quisiera más información sobre sus productos.",
  producto: (nombre: string) =>
    `¡Hola Piel Radiante! Me interesa el producto "${nombre}". ¿Está disponible?`,
} as const;
