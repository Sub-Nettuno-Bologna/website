/** RFC 8288 Link header for homepage agent discovery. */
export const SERVICE_DESC_PATH = "/.well-known/service-desc.json";
export const SITEMAP_PATH = "/sitemap-index.xml";

export const homepageLinkHeader = [
  `<${SERVICE_DESC_PATH}>; rel="service-desc"; type="application/json"`,
  `<${SITEMAP_PATH}>; rel="describedby"; type="application/xml"`,
].join(", ");
