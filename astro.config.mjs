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
    plugins: [
      tailwindcss(),
    ],
  },

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      CONTACT_TO: envField.string({ context: "server", access: "secret", optional: true }),
      PUBLIC_SANITY_PROJECT_ID: envField.string({ context: "client" }),
      PUBLIC_SANITY_DATASET: envField.string({ context: "client" }),
      PUBLIC_SANITY_API_VERSION: envField.string({ context: "client", optional: true }),
    },
  },

  adapter: cloudflare(),

  integrations: [sitemaps(), react(), sanity({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    useCdn: false,
    studioBasePath: '/admin',
    studioRouterHistory: 'hash',
    stega: {
      studioUrl: '/admin#',
    },
  }), playformCompress()],
});