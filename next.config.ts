import type { NextConfig } from "next";

const THIRTY_DAYS = "public, max-age=2592000, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  experimental: {
    // Pagina 404 brandizzata con più root layout (route group per lingua)
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  async redirects() {
    // URL del vecchio sito WordPress ancora presenti nell'indice di Google.
    return [
      { source: "/menu-di-natale", destination: "/menu", permanent: true },
      { source: "/menu-di-capodanno", destination: "/menu", permanent: true },
      { source: "/gallery", destination: "/#gallery", permanent: true },
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
    ];
  },
};

export default nextConfig;
