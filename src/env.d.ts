/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare module "@orama/plugin-astro/client" {
  export function getOramaDB(name: string): Promise<any>;
  export function search(db: any, params: any): Promise<any>;
}
