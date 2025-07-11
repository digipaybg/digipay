import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DIGIPAY",
    short_name: "Next.js App",
    description: "Next.js App",
    start_url: "/",
    display: "standalone",
  };
}
