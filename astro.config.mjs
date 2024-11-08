import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  integrations: [tailwind(), react()],
  output: "server",
  adapter: vercel(),
  image: {
    domains: ["pexels.com", "bcl.streetcrisis.online"],
    remotePatterns: [{ protocol: "http" }],
  },
});
