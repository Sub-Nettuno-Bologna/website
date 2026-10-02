import { defineMiddleware } from "astro:middleware";
import { homepageLinkHeader } from "@/lib/discoveryLinks";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (context.url.pathname === "/") {
    response.headers.append("Link", homepageLinkHeader);
  }
  return response;
});
