// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import sitemaps from "@astrojs/sitemap";
import react from "@astrojs/react";
import playformCompress from "@playform/compress";
import vercel from "@astrojs/vercel";
import node from "@astrojs/node";
import orama from "@orama/plugin-astro";

let adapter = vercel();

if (process.argv[3] === "--node" || process.argv[4] === "--node") {
  adapter = node({ mode: "standalone" });
}

export default defineConfig({
  site: "https://subnettuno.it",

  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },

  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
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

  adapter,

  integrations: [orama({
    search: {
      // Exclude the Studio and the events pagination routes from indexing
      // - /admin/**
      // - /eventi/page/*
      pathMatcher: /^(?!admin)(?!eventi\/page\/).*$/,
      language: "italian",
      contentSelectors: ["main#content"],
    },
  }), sitemaps(), react(), sanity({
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
  }), playformCompress()],
});