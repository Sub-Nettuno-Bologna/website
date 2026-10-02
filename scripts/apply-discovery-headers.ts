import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { homepageLinkHeader } from "../src/lib/discoveryLinks";

type VercelRoute = {
  src?: string;
  handle?: string;
  headers?: Record<string, string>;
  continue?: boolean;
};

type VercelConfig = {
  routes?: VercelRoute[];
};

const homepageRoute: VercelRoute = {
  src: "^/$",
  headers: { link: homepageLinkHeader },
  continue: true,
};

export function addDiscoveryHeaderRoutes(config: VercelConfig): VercelConfig {
  const routes = Array.isArray(config.routes) ? config.routes : [];
  const alreadyPresent = routes.some(
    (route) => route.src === homepageRoute.src && route.headers?.link
  );
  if (!alreadyPresent) {
    const filesystemIndex = routes.findIndex((route) => route.handle === "filesystem");
    const index = filesystemIndex === -1 ? routes.length : filesystemIndex;
    routes.splice(index, 0, homepageRoute);
  }
  config.routes = routes;
  return config;
}

const isDirectRun = Boolean(
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
);

if (isDirectRun) {
  const configPath = join(process.cwd(), ".vercel/output/config.json");

  if (existsSync(configPath)) {
    const config = JSON.parse(readFileSync(configPath, "utf8")) as VercelConfig;
    addDiscoveryHeaderRoutes(config);
    writeFileSync(configPath, JSON.stringify(config));
    console.log("Added homepage Link header to .vercel/output/config.json");
  } else {
    console.log("No .vercel/output/config.json; skipped Vercel Link header route");
  }
}
