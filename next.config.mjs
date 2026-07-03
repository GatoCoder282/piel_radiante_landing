/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three / r3f ship ESM; transpile for stable builds
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Permitir SVG (placeholders y logos de marca propios). Seguro: contenido propio.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
