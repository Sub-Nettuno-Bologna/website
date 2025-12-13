// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import sitemaps from "@astrojs/sitemap";
import react from "@astrojs/react";
import playformCompress from "@playform/compress";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://subnettuno.it",

  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      RESEND_CONTACT_TO: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      SANITY_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      SANITY_DATASET: envField.string({
        context: "client",
        access: "public",
      }),
      SANITY_API_VERSION: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },

  adapter: cloudflare(),

  integrations: [
    sitemaps(),
    react(),
    sanity({
      projectId: import.meta.env.SANITY_PROJECT_ID,
      dataset: import.meta.env.SANITY_DATASET,
      useCdn: false,
      studioBasePath: "/admin",
      studioRouterHistory: "hash",
      stega: {
        studioUrl: "/admin#",
      },
    }),
    playformCompress(),
  ],
});
