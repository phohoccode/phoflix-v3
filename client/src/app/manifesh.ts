import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PHOFLIX-V3",
    short_name: "PHOFLIX-V3",
    description:
      "Website xem phim online - Được xây dựng bởi phohococde",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/icon/logo.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
