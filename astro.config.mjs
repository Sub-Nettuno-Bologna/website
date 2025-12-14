// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import sitemaps from "@astrojs/sitemap";
import react from "@astrojs/react";
import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://subnettuno.it",

  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      PUBLIC_SANITY_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_SANITY_DATASET: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_CONTACT_API_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },

  output: "static",

  integrations: [
    sitemaps(),
    // react(),
    // sanity({
    //   // TODO: temporary hardcoded values
    //   projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "r56dtkaq",
    //   dataset: process.env.PUBLIC_SANITY_DATASET || "production",
    //   apiVersion: "2023-01-01",
    //   useCdn: false,
    //   // Removed studioBasePath - Sanity Studio requires SSR
    //   // Studio should be deployed separately if needed
    //   stega: {
    //     enabled: false, // Disable stega for static build
    //   },
    // }),
    playformCompress(),
  ],
});
