import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import eslintPluginAstro from 'eslint-plugin-astro';

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ["**/*.{ts,mts,cts}"], extends: [tseslint.configs.recommended], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  eslintPluginAstro.configs.recommended,
  // @ts-expect-error json plugin
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/commonmark", extends: ["markdown/recommended"] },
  // @ts-expect-error css plugin
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },

]);
