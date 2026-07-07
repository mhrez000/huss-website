import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds a fully static site for GitHub Pages
 * (demo hosting): no API routes, unoptimized images, served
 * under the /huss-website base path. Production (Vercel) runs
 * without these flags and keeps the booking/contact APIs live.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export" as const,
    basePath,
    trailingSlash: true,
  }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport && { unoptimized: true }),
  },
};

export default nextConfig;
