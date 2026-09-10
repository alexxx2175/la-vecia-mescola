import type { NextConfig } from "next";

const THIRTY_DAYS = "public, max-age=2592000, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  experimental: {
    // Pagina 404 brandizzata con più root layout (route group per lingua)
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80],
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      // Il dominio tecnico *.vercel.app serve lo stesso sito: lo si reindirizza al dominio canonico.
      {
        source: "/:path*",
        has: [{ type: "host", value: "la-vecia-mescola.vercel.app" }],
        destination: "https://www.laveciamescola.com/:path*",
        permanent: true,
      },
      // URL del vecchio sito WordPress ancora presenti nell'indice di Google.
      { source: "/menu-di-natale", destination: "/menu", permanent: true },
      { source: "/menu-di-capodanno", destination: "/menu", permanent: true },
      { source: "/gallery", destination: "/#gallery", permanent: true },
      { source: "/feed", destination: "/arena", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: THIRTY_DAYS }] },
      { source: "/videos/:path*", headers: [{ key: "Cache-Control", value: THIRTY_DAYS }] },
      { source: "/fonts/:path*", headers: [{ key: "Cache-Control", value: THIRTY_DAYS }] },
      { source: "/(favicon.png|apple-touch-icon.png|og-image.jpg)", headers: [{ key: "Cache-Control", value: THIRTY_DAYS }] },
      // Chunk JS, CSS e font: Google deve poterli scaricare per il rendering, ma non indicizzarli come documenti.
      { source: "/_next/static/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
};

export default nextConfig;
