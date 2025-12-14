// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import sitemaps from "@astrojs/sitemap";
import react from "@astrojs/react";
import playformCompress from "@playform/compress";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://subnettuno.it",

  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      RESEND_TO_EMAIL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      RESEND_FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      PUBLIC_SANITY_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_SANITY_DATASET: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },

  adapter: netlify({}),

  integrations: [
    sitemaps(),
    react(),
    sanity({
      // TODO: temporary hardcoded values
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "r56dtkaq",
      dataset: process.env.PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2023-01-01",
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
