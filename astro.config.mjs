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
    },
  },

  adapter: cloudflare(),

  integrations: [sitemaps(), react(), sanity({
    projectId: "h3gj11wn",
    dataset: "production",
    useCdn: false,
    studioBasePath: '/admin',
    studioRouterHistory: 'hash',
    stega: {
      studioUrl: '/admin#',
    },
  }), playformCompress()],
});