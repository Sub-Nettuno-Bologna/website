// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import sitemaps from "@astrojs/sitemap";
import react from "@astrojs/react";
import playformCompress from "@playform/compress";
import vercel from "@astrojs/vercel";
import node from "@astrojs/node";
let adapter = vercel();

const legacyRedirects = {
  "/contattaci": "/contatti#contatti",
  "/storia": "/chi-siamo",
  "/staff": "/chi-siamo/staff",
  "/dove-siamo": "/contatti#contatti",
  "/didattica": "/corsi",
  "/pagine": "/",
  "/prove-gratuite-in-piscina": "/contatti#contatti",
  "/blog/page": "/blog",
  "/blog/page/1": "/blog",
  "/eventi/page": "/eventi",
  "/eventi/page/1": "/eventi",
};

const excludedSitemapPaths = new Set([
  "/success",
  "/1-grado-instagram",
  ...Object.keys(legacyRedirects),
]);

if (process.argv[3] === "--node" || process.argv[4] === "--node") {
  adapter = node({ mode: "standalone" });
}

export default defineConfig({
  site: "https://subnettuno.it",

  redirects: Object.fromEntries(
    Object.entries(legacyRedirects).map(([path, destination]) => [
      path,
      { status: 301, destination },
    ])
  ),

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

  integrations: [sitemaps({
    filter: (url) => {
      const pathname = new URL(url).pathname.replace(/\/+$/, "") || "/";
      return pathname !== "/admin" &&
        !pathname.startsWith("/admin/") &&
        !excludedSitemapPaths.has(pathname);
    },
  }), react(), sanity({
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
