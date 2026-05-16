import { create, insert, save } from "@orama/orama";
import { compile } from "html-to-text";
import { existsSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// With the Vercel adapter, the static output lives under dist/client/;
// without it, it's directly in dist/.
const vercelDir = join(root, "dist", "client");
const plainDir = join(root, "dist");
const distDir = existsSync(vercelDir) ? vercelDir : plainDir;

const publicAssetsDir = join(root, "public", "assets");

const PATH_MATCHER = /^(?!admin)(?!eventi\/page\/).*$/;
const SCHEMA = { path: "string", title: "string", h1: "string", content: "string" };

const toTitle = compile({ baseElements: { selectors: ["title"] } });
const toH1 = compile({ baseElements: { selectors: ["h1"] } });
const toContent = compile({ baseElements: { selectors: ["main#content"] } });

function filePathToUrl(fp) {
  let url = fp
    .replace(/^dist[/\\]/, "")
    .replace(/[/\\]index\.html$/, "")
    .replace(/\.html$/, "");
  return "/" + url;
}

function collectHtmlFiles(dir) {
  const results = [];
  function walk(current) {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      const s = statSync(full);
      if (s.isDirectory()) {
        walk(full);
      } else if (s.isFile() && entry.endsWith(".html")) {
        results.push(full);
      }
    }
  }
  walk(dir);
  return results;
}

async function main() {
  if (!existsSync(distDir)) {
    console.error("Build output not found at %s. Run `astro build` first.", distDir);
    process.exit(1);
  }

  const htmlFiles = collectHtmlFiles(distDir);
  const db = create({ schema: SCHEMA, language: "italian" });

  let indexed = 0;

  for (const filePath of htmlFiles) {
    const urlPath = filePathToUrl(relative(root, filePath));
    if (!PATH_MATCHER.test(urlPath.replace(/^\//, ""))) continue;

    const html = readFileSync(filePath, "utf-8");
    const title = toTitle(html) || "";
    const h1 = toH1(html) || "";
    const content = toContent(html) || "";

    if (!content.trim()) continue;

    await insert(db, { path: urlPath, title, h1, content });
    indexed++;
  }

  const dbData = JSON.stringify(await save(db));

  // Write to the build output so it's served at /assets/oramaDB_search.json
  const outDir = join(distDir, "assets");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "oramaDB_search.json"), dbData, "utf-8");

  // Also write to public/assets for reference (e.g. local dev without build)
  if (!existsSync(publicAssetsDir)) mkdirSync(publicAssetsDir, { recursive: true });
  writeFileSync(join(publicAssetsDir, "oramaDB_search.json"), dbData, "utf-8");

  console.log("Indexed " + indexed + " pages -> " + join(outDir, "oramaDB_search.json"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
