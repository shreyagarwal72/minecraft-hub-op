/** Post-build: writes dist/<route>/index.html with the right <title>, description, canonical and social tags,
 *  so crawlers that do not run JavaScript (WhatsApp, Discord, many SEO tools) see per-page metadata. */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { ROUTE_SEO } from "../src/config/seo.ts";
import { SITE_URL } from "../src/config/site.ts";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const base = readFileSync("dist/index.html", "utf8");

const setMeta = (html: string, attr: "name" | "property", key: string, value: string) =>
  html.replace(new RegExp(`(<meta data-rh="true" ${attr}="${key}" content=")[^"]*(")`), `$1${esc(value)}$2`);

for (const [route, seo] of Object.entries(ROUTE_SEO)) {
  const url = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>`);
  html = html.replace(/(<link data-rh="true" rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "name", "description", seo.description);
  html = setMeta(html, "name", "keywords", seo.keywords);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", seo.title);
  html = setMeta(html, "property", "og:description", seo.description);
  html = setMeta(html, "name", "twitter:title", seo.title);
  html = setMeta(html, "name", "twitter:description", seo.description);
  if (route === "/") { writeFileSync("dist/index.html", html); continue; }
  mkdirSync(`dist${route}`, { recursive: true });
  writeFileSync(`dist${route}/index.html`, html);
  console.log("prerendered head for", route);
}
