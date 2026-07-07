export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HussMedia — Real Estate Photography",
    short_name: "HussMedia",
    description: site.description,
    theme_color: "#1d1d1f",
    background_color: "#ffffff",
    display: "standalone",
    start_url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`,
    icons: [
      {
        src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
