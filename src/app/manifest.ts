import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HussMedia — Real Estate Photography",
    short_name: "HussMedia",
    description: site.description,
    theme_color: "#191817",
    background_color: "#faf8f4",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
